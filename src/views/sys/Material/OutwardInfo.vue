<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <wms-title title>
        <div class="panel panel-default">
          <!-- <div class="card-title zero-padding">
          <span class="weight">查询列表</span>
          </div>-->
          <ep-form ref="searchForm" :form="searchForm" name-width="138px">
            <ep-row :gutter="7">
              <!-- <ep-col :col="8">
              <ep-form-item label="仓单编号" attr="whRecNo">
                <ep-input v-model="searchForm.whRecNo" name="whRecNo"></ep-input>
              </ep-form-item>
              </ep-col>-->
              <ep-col :col="8">
                <ep-form-item label="耗料清单编号" attr="consumptionNo" v-if="searchTypes">
                  <ep-input v-model="searchForm.consumptionNo" name="consumptionNo"></ep-input>
                </ep-form-item>
              </ep-col>

              <ep-col :col="8" v-show="searchType">
                <ep-form-item label="状态" attr="optStatus">
                  <ep-select v-model="searchForm.optStatus" name="optStatus">
                    <ep-select-item :index="1" label="暂存"></ep-select-item>
                    <ep-select-item :index="18" label="已确认"></ep-select-item>
                    <ep-select-item :index="3" label="海关入库成功"></ep-select-item>
                    <ep-select-item :index="4" label="海关入库失败"></ep-select-item>
                    <ep-select-item :index="17" label="待审核"></ep-select-item>
                    <ep-select-item :index="5" label="审核通过"></ep-select-item>
                    <ep-select-item :index="6" label="审核拒绝"></ep-select-item>
                    <ep-select-item :index="99" label="已删除"></ep-select-item>
                    <ep-select-item :index="96" label="已作废"></ep-select-item>
                    <!-- <ep-select-item :index="95" label="作废确认"></ep-select-item>
                    <ep-select-item :index="20" label="变更确认"></ep-select-item> -->
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item attr="businessTypecd" label="业务类别" v-if="searchTypes">
                  <ep-select v-model="searchForm.businessTypecd" :disabled="!searchType" name="businessTypecd">
                    <ep-select-item index="3" label="一般加工"></ep-select-item>
                    <ep-select-item index="1" label="外发加工"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item attr="dclTypecd" label="申报类型" v-show="searchType">
                  <ep-select v-model="searchForm.dclTypecd" name="dclTypecd">
                    <ep-select-item index="1" label="备案"></ep-select-item>
                    <!-- <ep-select-item index="2" label="变更"></ep-select-item> -->
                    <ep-select-item index="3" label="作废"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item label="确认时间" attr="dclTime">
                  <ep-date-range v-model="fixTime" @change="changeTime" type="dateTime"></ep-date-range>
                  <!-- <ep-date-range v-model="searchForm.dclTime" name="dclTime"></ep-date-range> -->
                </ep-form-item>
              </ep-col>
            </ep-row>
            <ep-row :gutter="7">
              <ep-col :col="24">
                <!-- <ep-button type="warning" size="small" icon="refresh" @click="reset('searchForm')">重置</ep-button>
                <ep-button type="primary" size="small" @click="refresh(true)" icon="search" :loading="loading">查询</ep-button>-->
                <WmsButton @click="addOther" v-if="searchType">新增</WmsButton>
                <WmsButton @click="reset('searchForm')">重置</WmsButton>
                <WmsButton @click="refresh(true)" :loading="loading">查询</WmsButton>
                <file-upload v-show="searchType" :uploadData="uploadData" :uploadType="1" />
                <!-- <exportFile :excelData="excelData" @click="ExcleClick" :totalcount="totalcount" :searchForm="searchForm" v-show="searchType"></exportFile> -->
              </ep-col>
            </ep-row>
          </ep-form>
        </div>
      </wms-title>
      <div class="wms-dividing-line"></div>

      <!--表格-->

      <div class="card-body">
        <div class="block">
          <slot name="out-form"></slot>
          <!-- <div v-show="searchType">


            <ep-button type="primary" size="small" @click="doUpdate" icon="edit">修改</ep-button>
            <ep-button type="danger" size="small" @click="doDelete" icon="trash-a">删除</ep-button>
            <ep-button type="primary" size="small" @click="doDeclare" icon="checkmark-round">确认</ep-button>
            <ep-button type="success" size="small" @click="doPrint" icon="printer">打印</ep-button>
            <file-upload :uploadData="uploadData" :uploadType="1" />
            <ep-button type="primary" size="small" @click="doReceipt" icon="checkmark-round">确认收货</ep-button>
            <span style="
                color: red;
                font-size: 25px;
                position: absolute;
                padding-top: 8px;
                padding-left: 3px;
              ">*</span>
            <span style="
                padding-top: 10px;
                padding-left: 13px;
                position: absolute;
                font-size: 4px;
                color: rgba(0, 0, 0, 0.87);
              ">双击列表信息，可进入详情页面</span>
          </div>-->
        </div>
        <div class="block">
          <ep-table border ref="table" :height="400" :data="ep_data" :head-color="headColor" @selection-change="handleSelectionChange">
            <ep-table-item type="select" v-if="!searchType"></ep-table-item>
            <ep-table-item column="opt" title="操作" width="200" v-if="searchType">
              <template slot-scope="props">
                <wms-icon type="edit" @click="doUpdate(props.row,props.row.id)"></wms-icon>
                <wms-icon type="cancel" @click="doDelete(props.row,props.row.id)"></wms-icon>
                <wms-icon type="confirm" @click="doDeclare(props.row,props.row.id)"></wms-icon>
                <wms-icon type="void" @click="doInvalid(props.row,props.row.id)"></wms-icon>
                <!-- <wms-icon type="print" @click="doPrint(props.row,props.row.id)"></wms-icon> -->
                <!-- <wms-icon type="receipt" @click="doReceipt(props.row,props.row.id)"></wms-icon> -->
                <wms-icon type="detail" @click="detailInfo($event,props.row)"></wms-icon>
                <!-- <wms-icon type="change" @click="doModify(props.row,props.row.id)"></wms-icon> -->
              </template>
            </ep-table-item>
            <ep-table-item column="consumptionNo" title="耗料清单编号" width="200"></ep-table-item>
            <!-- <ep-table-item column="contractNo" title="合同号" width="200"></ep-table-item> -->
            <ep-table-item column="dclTypecd" title="申报类型" width="120" :formatter="optDclTypecdFormatter"></ep-table-item>
            <ep-table-item column="optStatus" title="操作状态" width="150" :formatter="optStatusFormatter"></ep-table-item>
            <ep-table-item column="businessTypecd" title="业务类型" width="180" :formatter="businessTypecdFormatter"></ep-table-item>

            <ep-table-item column="dclData" title="申报时间" width="180"></ep-table-item>

            <ep-table-item column="passportUsedTypecd" title="绑定状态" width="150" :formatter="passportUsedTypecd"></ep-table-item>
            <ep-table-item column="bizopEtpsNm" title="经营企业名称" width="180"></ep-table-item>
            <ep-table-item column="bizopEtpsNo" title="经营企业编码" width="180"></ep-table-item>

            <!-- <ep-table-item column="rmk" title="备注" width="350">
              <template slot-scope="props">
                <p class="rmk-style">{{ props.row.rmk }}</p>
              </template>
            </ep-table-item> -->
          </ep-table>
        </div>
        <div class="block">
          <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import misList from "src/common/mislist";
import mixin from "./mixin";
import { getToken, getId } from "utils";
import FileUpload from "src/components/FileUpload";
import exportFile from "../../../wms/excelexport/index";
export default {
  name: "OutwardInfo",
  mixins: [misList, mixin],
  // extends: misList,mixin, // 务必继承
  components: { FileUpload, exportFile },
  props: {
    searchType: {
      default: true,
    },
    searchTypes: {
      default: true,
    },
    optStatus: {
      default: "",
    },
    getDtDetail: {
      default: "",
    },
    businessTypecd: {
      default: "",
    },
    businessDeclareNo: {
      default: "",
    },
    ieTypecd: {
      default: "",
    },
    isAllDt: {
      default: "",
    },
    isChange: {
      default: "",
    },
    rltPortRecNoValue: {
      default: "",
    },
    bindTypecd: {
      default: "",
    },
  },
  watch: {
    rltPortRecNoValue: {
      handler(val, oldVal) {
        this.searchForm.businessDeclareNo = val;
        if (!this.searchType) {
          this.refresh();
        }
      },
      immediate: true,
    },
    bindTypecd: {
      handler(val, oldVal) {
        this.searchForm.bindTypecd = val;
        if (!this.searchType) {
          this.refresh();
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      uploadData: {
        businessType: "material",
        sysCode: "lgsa",
      },
      fixTime: "",
      loading: false,
      listApi: "MaterialselectBsc", //wareHouseList pathBillOfladingInfoGetList
      settings: {
        pk: "id", // 主键
      },
      searchForm: {
        consumptionNo: "",
        optStatus: this.optStatus,
        before_dclTime: "",
        after_dclTime: "",
        businessTypecd: this.businessTypecd,
        dclTypecd: "",
        businessDeclareNo: this.businessDeclareNo,
        getDtDetail: this.getDtDetail,
        ieTypecd: this.ieTypecd,
        isAllDt: this.isAllDt,
        isChange: this.isChange,
        bindTypecd: this.bindTypecd,
      },
      excelData: {},
      headColor: true,
      model2: false,
      totalcount: 0,
      showbusinessType: true,
      selectLength: 0,
      selectItems: [],
      ep_page: {
        // 分页
        size: 10,
        page: 1,
      },
      ep_data: [], //表格数据
      ieTypecdState: "",
      stateValue: "",
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    ExcleClick() {
      let data = {};
      data.param = this.$refs.table.getData("select");
      data.busFlag = "wht";
      this.excelData = data;
    },
    addOther() {
      // this.$app.trigger("add-new-tab", "WareHouseAdd");
      this.$router.push({
        path: "/OutwardAdd",
      });
    },
    inExpChange(value) {
      this.stateValue = value;
    },
    ieTypecdChange(value) {
      this.ieTypecdState = value;
    },
    // 打印
    doPrint(row, rowId) {
      // let selectData = this.selectItems;
      let selectData = [row];
      if (selectData.length === 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
        return;
      }
      if (selectData.length > 10) {
        this.$pop({
          type: "danger",
          message: "最多可打印10条凭证",
        });
        return;
      }
      for (let i = 0; i < selectData.length; i++) {
        if (selectData[i].optStatus != "5") {
          this.$pop({
            type: "danger",
            message: "只有审核通过的才可以打印",
          });
          console.log(selectData[i]);
          return;
        }
      }
      let ids = [];
      selectData.forEach((item) => {
        ids.push(item.id);
      });
      let id = ids.join();
      let token = getToken();
      window.location.href =
        global.HOST + "/wareHouse/pdf?id=" + id + "&token=" + token;
    },
    //修改
    doUpdate(row, id) {
      let selectData = [row];
      if (selectData.length !== 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
        return;
      }
      if (
        selectData[0].optStatus == "1" ||
        (selectData[0].optStatus == "4" && selectData[0].dclTypecd == "1") ||
        (selectData[0].optStatus == "6" && selectData[0].dclTypecd == "1")
      ) {
        let id = selectData[0].id;
        let data = {};
        data["id"] = id;

        let menusList = this.$store.getters.getMenuTabInstance.items;
        menusList.forEach(function (item, index) {
          if (item.link == "/OutwardUpdate") {
            menusList.splice(index, 1);
          }
        });
        this.$app.trigger("locate-tab", "OutwardUpdate", id);
      } else {
        this.$pop({
          type: "danger",
          message: "当前状态无法修改！",
        });
        return;
      }
    },
    //作废
    doInvalid(row, id) {
      let selectData = [row];
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
        return;
      }
      if (selectData[0].optStatus === "5" && selectData[0].dclTypecd != "3") {
        if (
          selectData[0].inExpType == "3" ||
          (selectData[0].inExpType != "3" &&
            selectData[0].passportUsedTypecd == "1")
        ) {
          this.$confirm({
            word: "是否要作废",
            callback: (errorInfo) => {
              if (errorInfo) {
                // let bscIds = [];
                // selectData.forEach((c) => {
                //   if (c.id) {
                //     bscIds.push(c.id);
                //   }
                // });
                // let data = {};
                // data = {
                //   ids: bscIds.join(",")
                // };
                let id = selectData[0].id;
                let data = {};
                data["id"] = id;
                // let data = {};
                // data["bscIds"] = bscIds;
                this.$post("Materialcancel", data)
                  .then((responseData) => {
                    this.refresh(true);
                    this.$pop({
                      type: "success",
                      message: "作废成功",
                    });
                  })
                  .catch((e) => {
                    this.loading = false;
                  });
              } else {
              }
            },
          });
        } else {
          this.$pop({
            type: "danger",
            message: "已有绑定，不可作废",
          });
          return;
        }
      } else {
        this.$pop({
          type: "danger",
          message: "当前状态不可作废！",
        });
        return;
      }
    },
    //删除
    doDelete(row, id) {
      let selectData = [row];
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
        return;
      }
      if (
        (selectData[0].optStatus == 6 && selectData[0].dclTypecd != 1) ||
        (selectData[0].optStatus == 4 && selectData[0].dclTypecd != 1)
      ) {
        this.$pop({
          type: "danger",
          message: "当前状态无法删除！",
        });
        return;
      }
      if (
        selectData[0].optStatus == "1" ||
        selectData[0].optStatus == "4" ||
        selectData[0].optStatus == "6"
      ) {
        this.$confirm({
          word: "是否要删除所选条目信息！",
          callback: (errorInfo) => {
            if (errorInfo) {
              // let bscIds = {};
              // selectData.forEach((c) => {
              //   if (c.id) {
              //     bscIds.push(c.id);
              //   }
              // });
              // let data = {};
              // data = {
              //   ids: bscIds.join(",")
              // };
              let id = selectData[0].id;
              let data = {};
              data["id"] = id;
              // data["id"] = bscIds;
              this.$post("MaterialdeleteBsc", data)
                .then((responseData) => {
                  this.refresh(true);
                  this.$pop({
                    type: "success",
                    message: "删除成功",
                  });
                })
                .catch((e) => {
                  this.loading = false;
                });
            } else {
            }
          },
        });
      } else {
        this.$pop({
          type: "danger",
          message: "当前状态无法删除！",
        });
        return;
      }
    },
    // 申报
    doDeclare(row, id) {
      let vm = this;
      // let selectData = this.selectItems;
      let selectData = [row];

      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择数据",
        });
        return;
      }
      if (selectData[0].optStatus == "1") {
        // let ids = [];
        // selectData.forEach((c) => {
        //   if (c.id) {
        //     ids.push(c.id);
        //   }
        // });
        let id = selectData[0].id;
        let data = {};
        data["id"] = id;

        this.$confirm({
          word: "是否要确认？",
          callback(info) {
            if (info) {
              vm.declareLoading = true;

              vm.$post("Materialdeclare", data)
                .then((responseData) => {
                  vm.declareLoading = false;

                  vm.refresh(true);
                })
                .catch((e) => {
                  vm.declareLoading = false;
                });
            }
          },
        });
      } else {
        this.$pop({
          type: "danger",
          message: "该状态的不能进行确认",
        });
        return;
      }
    },
    //确认收货
    doReceipt(row, rowId) {
      let vm = this;
      // let selectData = this.selectItems;
      let selectData = [row];

      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择数据",
        });
        return;
      }
      if (
        selectData[0].optStatus == "5" &&
        selectData[0].inExpType == "4" &&
        selectData[0].ieTypecd == "I" &&
        selectData[0].dclTypecd != "3"
      ) {
        let ids = [];
        selectData.forEach((c) => {
          if (c.id) {
            ids.push(c.id);
          }
        });
        let data = {};
        data["bscIds"] = ids;

        this.$confirm({
          word: "是否要确认？",
          callback(info) {
            if (info) {
              vm.declareLoading = true;

              vm.$post("confirmReceipt", data)
                .then((responseData) => {
                  vm.declareLoading = false;

                  vm.refresh(true);
                })
                .catch((e) => {
                  vm.declareLoading = false;
                });
            }
          },
        });
      } else {
        if (selectData[0].optStatus == "40") {
          this.$pop({
            type: "danger",
            message: "该状态已确认收货",
          });
        } else if (selectData[0].optStatus != "5") {
          this.$pop({
            type: "danger",
            message: "该状态通过",
          });
        } else if (selectData[0].inExpType !== "4") {
          this.$pop({
            type: "danger",
            message: "该状态的不是区内流转类型",
          });
        } else {
          this.$pop({
            type: "danger",
            message: "该状态的不能进行确认收货",
          });
        }
        return;
      }
    },
    // 变更
    doModify(row, rowId) {
      // let selectData = this.selectItems;
      let selectData = [row];
      if (selectData.length !== 1) {
        this.$pop({
          type: "danger",
          message: "请只选择一条数据",
        });
        return;
      }
      if (selectData[0].optStatus === "5") {
        if (
          selectData[0].inExpType == "3" ||
          (selectData[0].inExpType != "3" &&
            selectData[0].passportUsedTypecd == "1")
        ) {
          let id = selectData[0].id;
          let data = {};
          data["id"] = id;
          let menusList = this.$store.getters.getMenuTabInstance.items;
          menusList.forEach(function (item, index) {
            if (item.link == "/OutwardChange") {
              menusList.splice(index, 1);
            }
          });
          this.$app.trigger("locate-tab", "OutwardChange", id);
        } else {
          this.$pop({
            type: "danger",
            message: "已有绑定，不可变更",
          });
          return;
        }
      } else {
        this.$pop({
          type: "danger",
          message: "请选择审核通过以及未绑定状态的进行变更！",
        });
        return;
      }
    },
    reset(el) {
      this.$refs[el].reset();
      this.fixTime = "";
    },
    changeTime() {
      let fixTime = this.fixTime.split(",");
      this.searchForm.before_dclTime = fixTime[0];
      this.searchForm.after_dclTime = fixTime[1];
    },
    handleSelectionChange(val) {
      this.selectLength = val.length;
      this.selectItems = val;
    },
    detailInfo(event, row, index) {
      this.$app.trigger("locate-tab", "OutwardDtInfo", row.id);
    },
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.refresh(false);
    },
    handleCurrentChange(val) {
      this.ep_page.page = val;
      this.refresh(false);
    },
  },
};
</script>
<style lang="less" scoped></style>
