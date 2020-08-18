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
                <ep-form-item label="进出区提发货凭证编号" attr="like_whRecPreentNo">
                  <ep-input v-model="searchForm.like_whRecPreentNo" name="like_whRecPreentNo"></ep-input>
                </ep-form-item>
              </ep-col>

              <!-- <ep-col :col="8">
              <ep-form-item label="业务类型" attr="businessTypecd">
                <ep-select v-model="searchForm.businessTypecd" name="businessTypecd">
                  <ep-select-item index="1" label="中转"></ep-select-item>
                  <ep-select-item index="2" label="集拼"></ep-select-item>
                  <ep-select-item index="3" label="存储"></ep-select-item>
                  <ep-select-item index="4" label="加工"></ep-select-item>
                  <ep-select-item index="5" label="交易"></ep-select-item>
                  <ep-select-item index="6" label="展示"></ep-select-item>
                  <ep-select-item index="7" label="研发"></ep-select-item>
                  <ep-select-item index="8" label="再制造"></ep-select-item>
                  <ep-select-item index="9" label="检测维修"></ep-select-item>
                </ep-select>
              </ep-form-item>
              </ep-col>-->
              <ep-col :col="8">
                <ep-form-item attr="inExpType" label="ERP/WMS出入库类型" title="ERP/WMS出入库类型">
                  <ep-select :disabled="!searchType" v-model="searchForm.inExpType" @change="inExpChange" name="inExpType">
                    <ep-select-item index="1" label="一线进出"></ep-select-item>
                    <ep-select-item index="2" label="先报后送"></ep-select-item>
                    <ep-select-item index="3" label="分送集报"></ep-select-item>
                    <ep-select-item index="4" label="区内流转"></ep-select-item>
                    <ep-select-item index="5" label="区间流转"></ep-select-item>
                    <!-- <ep-select-item index="8"
                              label="外发加工"></ep-select-item>     -->
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <!-- <ep-col :col="8">
              <ep-form-item label="进出标志" attr="ieTypecd" v-show="searchType">
                <ep-select v-model="searchForm.ieTypecd" name="ieTypecd">
                  <ep-select-item index="I" label="进区"></ep-select-item>
                  <ep-select-item index="E" label="出区"></ep-select-item>
                </ep-select>
              </ep-form-item>
              </ep-col>-->
              <ep-col :col="8">
                <ep-form-item attr="ieTypecd" label="进出标志" v-show="searchType">
                  <ep-select v-model="searchForm.ieTypecd" name="ieTypecd" @change="ieTypecdChange">
                    <div v-if="stateValue == 4">
                      <ep-select-item index="I" label="入库"></ep-select-item>
                      <ep-select-item index="E" label="出库"></ep-select-item>
                    </div>
                    <div v-else>
                      <ep-select-item index="I" label="进区"></ep-select-item>
                      <ep-select-item index="E" label="出区"></ep-select-item>
                    </div>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <!-- <ep-col :col="8" v-show="!searchType">
              <ep-form-item label="绑定类型">
                <ep-select v-model="portSwitch" @change="bindTypecdChange">
                  <ep-select-item index="1" label="一车多票"></ep-select-item>
                  <ep-select-item index="2" label="一车一票"></ep-select-item>
                  <ep-select-item index="3" label="一票多车"></ep-select-item>
                </ep-select>
              </ep-form-item>
              </ep-col>-->
              <ep-col :col="8">
                <ep-form-item attr="mtpckEndprdTypecd" label="料件 /成品标志" v-show="!searchType">
                  <ep-select v-model="searchForm.mtpckEndprdTypecd"  name="mtpckEndprdTypecd" disabled>
                     <ep-select-item index="I" label="料件"></ep-select-item>
                    <ep-select-item index="E" label="成品"></ep-select-item>
                    <ep-select-item index="S" label="设备"></ep-select-item>
                    <ep-select-item index="L" label="边角料"></ep-select-item>
                     <ep-select-item index="D" label="残次品"></ep-select-item>            
                  </ep-select>   
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
                    <ep-select-item :index="40" label="确认收货"></ep-select-item>
                    <ep-select-item :index="96" label="已作废"></ep-select-item>
                    <ep-select-item :index="95" label="作废确认"></ep-select-item>
                    <ep-select-item :index="20" label="变更确认"></ep-select-item>
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
                <exportFile :excelData="excelData" @click="ExcleClick" :totalcount="totalcount" :searchForm="searchForm" v-show="searchType"></exportFile>
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
            <ep-table-item type="select"></ep-table-item>
            <ep-table-item column="opt" title="操作" width="200" v-if="searchType">
              <template slot-scope="props">
                <wms-icon type="edit" @click="doUpdate(props.row,props.row.id)"></wms-icon>
                <wms-icon type="cancel" @click="doDelete(props.row,props.row.id)"></wms-icon>
                <wms-icon type="confirm" @click="doDeclare(props.row,props.row.id)"></wms-icon>
                <wms-icon type="void" @click="doInvalid(props.row,props.row.id)"></wms-icon>
                <wms-icon type="print" @click="doPrint(props.row,props.row.id)"></wms-icon>
                <wms-icon type="receipt" @click="doReceipt(props.row,props.row.id)"></wms-icon>
                <wms-icon type="detail" @click="detailInfo($event,props.row)"></wms-icon>
                <wms-icon type="change" @click="doModify(props.row,props.row.id)"></wms-icon>
              </template>
            </ep-table-item>
            <!-- <ep-table-item column="whRecNo" title="仓单编号" width="200"></ep-table-item> -->
            <ep-table-item column="whRecPreentNo" title="进出区提发货凭证编号" width="220"></ep-table-item>
            <ep-table-item column="dclTypecd" title="申报类型" width="120" :formatter="optDclTypecdFormatter"></ep-table-item>
            <ep-table-item column="optStatus" title="状态" width="120" :formatter="optStatusFormatter"></ep-table-item>
            <!-- <ep-table-item column="inExpWhNo" title="ERP/WMS出入库编号" width="200"></ep-table-item> -->
            <ep-table-item column="inExpType" title="ERP/WMS出入库类型" width="180" :formatter="inExpTypeFormatter"></ep-table-item>
            <!-- <ep-table-item column="inExpTime" title="ERP/WMS出入库日期" width="200"></ep-table-item> -->
            <ep-table-item column="grossWt" title="毛重" width="150"></ep-table-item>
            <ep-table-item column="ioTypecd" title="进出标志" width="100" :formatter="ioTypecdFormatter"></ep-table-item>
            <ep-table-item column="invtIochkptStucd" title="进出卡口状态" width="150" :formatter="invtIFormatter"></ep-table-item>
            <ep-table-item column="vrfdedMarkcd" title="核扣标记" width="100" :formatter="vrfFormatter"></ep-table-item>
            <ep-table-item column="passportUsedTypecd" title="绑定状态" width="150" :formatter="passportUsedTypecd"></ep-table-item>
            <ep-table-item column="mtpckEndprdTypecd" title="料件/成品标志" width="150" :formatter="mtpckEndprdTypecdFormatter"></ep-table-item>
            <ep-table-item column="supvModecd" title="监管方式" width="150" :formatter="supvModecdFormatter"></ep-table-item>
            <ep-table-item column="trspModecd" title="运输方式" width="100" :formatter="trspModecdFormatter"></ep-table-item>
            <ep-table-item column="impexpPortcd" title="进出境关别" width="120" :formatter="impexpPortcdFormatter"></ep-table-item>
            <ep-table-item column="bizopEtpsno" title="经营企业编号" width="150"></ep-table-item>
            <ep-table-item column="bizopEtpsNm" title="经营企业名称" width="180"></ep-table-item>
            <ep-table-item column="rltEntryNo" title="关联报关单编号" width="180"></ep-table-item>
            <ep-table-item column="rltWhRecNo" title="关联编号" width="250"></ep-table-item>
            <ep-table-item column="dclTime" title="确认日期" width="200"></ep-table-item>
            <ep-table-item column="dclcusTypecd" title="报关类型" width="150" :formatter="dclcusTypecdFormatter"></ep-table-item>
            <ep-table-item column="dclcusFlag" title="是否报关" width="100" :formatter="dclcusFlagFormatter"></ep-table-item>
            <ep-table-item column="relDclcusFlag" title="报关标志" width="150" :formatter="dclcusFormatter"></ep-table-item>
            <ep-table-item column="destinationNatcd" title="最终目的国(地区)" width="150" :formatter="destinationTranslate"></ep-table-item>
            <ep-table-item column="tradeCountry" title="启运国/运抵国(地区)" width="200" :formatter="tradeCountryTranslate"></ep-table-item>
            <ep-table-item column="tradingRegion" title="贸易国(地区)" width="150" :formatter="regionTranslate"></ep-table-item>
            <ep-table-item :formatter="districtCodeFormatter" column="districtCode" title="境内目的地/货源地" width="200"></ep-table-item>
            <ep-table-item column="transMode" title="成交方式" width="100" :formatter="transModeFormatter"></ep-table-item>

            <ep-table-item column="rmk" title="备注" width="350">
              <template slot-scope="props">
                <p class="rmk-style">{{ props.row.rmk }}</p>
              </template>
            </ep-table-item>
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
  name: "WareHouseInfo",
  mixins: [misList, mixin],
  // extends: misList,mixin, // 务必继承
  components: { FileUpload, exportFile },
  props: {
    searchType: {
      default: true,
    },
    optStatus: {
      default: "",
    },
    portState: {
      //绑定类型
      default: function () {
        return "";
      },
    },
    ieTypecd: {
      //进出标志
      default: function () {
        return "";
      },
    },
    inExpType: {
      //出入库类型
      default: function () {
        return "";
      },
    },
    mtpckEndprdTypecd: {
      // 料件成品标志
      default: "",
    },
  },
  watch: {
    mtpckEndprdTypecd: {
      handler(val, oldVal) {
        this.searchForm.mtpckEndprdTypecd = val;
        if (!this.searchType) {
          this.refresh();
        }
      },
      immediate: true,
    },
    portState: {
      // 绑定类型改变
      handler(newData, oldData) {
        this.portSwitch = newData;
        if (newData == 1 || newData == 2) {
          this.searchForm.portSwitch = "1";
        } else if (newData == 3) {
          this.searchForm.portSwitch = "2";
        } else {
          this.searchForm.portSwitch = "";
        }
        if (!this.searchType) {
          this.refresh();
        }
      },
      immediate: true,
      deep: true,
    },
    ieTypecd: {
      // 进出标志改变
      handler(newData, oldData) {
        this.searchForm.ieTypecd = newData;
        if (!this.searchType) {
          this.refresh();
        }
      },
      immediate: true,
      deep: true,
    },
    inExpType: {
      //出入库类型
      handler(newData, oldData) {
        this.searchForm.inExpType = newData;
        if (!this.searchType) {
          this.refresh();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      uploadData: {
        businessType: "wareHouse",
        sysCode: "lgsa",
      },

      fixTime: "",
      portSwitch: "",
      loading: false,
      listApi: "wareHouseList", //wareHouseList pathBillOfladingInfoGetList
      settings: {
        pk: "id", // 主键
      },
      searchForm: {
        like_whRecPreentNo: "",
        inExpType: "",
        ieTypecd: "",
        optStatus: this.optStatus,
        before_dclTime: "",
        after_dclTime: "",
        portSwitch: "",
        mtpckEndprdTypecd: "",
      },
      excelData: {},
      headColor: true,
      model2: false,
      totalcount: 0,
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
        path: "/WareHouseAdd",
      });
    },
    inExpChange(value) {
      this.stateValue = value;
    },
    ieTypecdChange(value) {
      this.ieTypecdState = value;
    },

    // //  绑定类型修改
    // bindTypecdChange(value) {
    //   if (value == '1' || value == '2') {
    //     this.searchForm.portSwitch = '1';
    //   } else if (value == '3') {
    //     this.searchForm.portSwitch = '2';
    //   } else {
    //     this.searchForm.portSwitch = '';
    //   }
    // },
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
          message: "最多可打印10条进出区提发货凭证",
        });
        return;
      }
      for (let i = 0; i < selectData.length; i++) {
        if (selectData[i].optStatus != "5") {
          this.$pop({
            type: "danger",
            message: "只有审核通过的进出区提发货凭证才可以打印",
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
          if (item.link == "/WareHouseUpdate") {
            menusList.splice(index, 1);
          }
        });
        this.$app.trigger("locate-tab", "WareHouseUpdate", id);
        // this.$app.trigger("locate-tab", "BillDirExpDtUpdate", id);
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
                let bscIds = [];
                selectData.forEach((c) => {
                  if (c.id) {
                    bscIds.push(c.id);
                  }
                });
                // let data = {};
                // data = {
                //   ids: bscIds.join(",")
                // };
                let data = {};
                data["bscIds"] = bscIds;
                this.$post("whCancel", data)
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
              let bscIds = [];
              selectData.forEach((c) => {
                if (c.id) {
                  bscIds.push(c.id);
                }
              });
              // let data = {};
              // data = {
              //   ids: bscIds.join(",")
              // };
              let data = {};
              data["ids"] = bscIds;
              this.$post("wareHouseDelete", data)
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

              vm.$post("wareHouseSubmit", data)
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
          message: "该状态的进出区提发货凭证不能进行确认",
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
            message: "该状态的进出区提发货凭证已确认收货",
          });
        } else if (selectData[0].optStatus != "5") {
          this.$pop({
            type: "danger",
            message: "该状态的进出区提发货凭证未审核通过",
          });
        } else if (selectData[0].inExpType !== "4") {
          this.$pop({
            type: "danger",
            message: "该状态的进出区提发货凭证不是区内流转类型",
          });
        } else {
          this.$pop({
            type: "danger",
            message: "该状态的进出区提发货凭证不能进行确认收货",
          });
        }
        return;
      }
    },
    //变更
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
        if (selectData[0].inExpType == "8") {
          this.$pop({
            type: "danger",
            message: "当前出入库类型不可变更",
          });
          return;
        }
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
            if (item.link == "/WareHouseChange") {
              menusList.splice(index, 1);
            }
          });
          this.$app.trigger("locate-tab", "WareHouseChange", id);
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
      this.searchForm.before_dclTime = fixTime[1];
      this.searchForm.after_dclTime = fixTime[0];
    },
    handleSelectionChange(val) {
      this.selectLength = val.length;
      this.selectItems = val;
    },
    detailInfo(event, row, index) {
      this.$app.trigger("locate-tab", "WareHouseDtInfo", row.id);
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
