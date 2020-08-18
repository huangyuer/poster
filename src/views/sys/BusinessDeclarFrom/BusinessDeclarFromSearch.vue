<template>
  <div>
    <div class="panel-main-content">
      <!--筛选栏组-->
      <div class="search-card contents-card card-margin">
        <wms-title title="">
          <div class="panel panel-default">
            <ep-form ref="searchForm" :form="searchForm" name-width="138px">
              <ep-row :gutter="7">
                <ep-col :col="8">
                  <ep-form-item label="业务申报编号" attr="businessDeclareNo">
                    <ep-input v-model="searchForm.businessDeclareNo" name="businessDeclareNo" :maxlength="64"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="状态" attr="optStatus">
                    <ep-select v-model="searchForm.optStatus" name="optStatus">
                      <ep-select-item index="1" label="暂存"></ep-select-item>
                      <ep-select-item index="18" label="已确认"></ep-select-item>
                      <ep-select-item index="3" label="海关入库"></ep-select-item>
                      <ep-select-item index="4" label="海关入库失败"></ep-select-item>
                      <ep-select-item index="5" label="审核通过"></ep-select-item>
                      <ep-select-item index="17" label="待审核"></ep-select-item>
                      <ep-select-item index="6" label="审核拒绝"></ep-select-item>
                      <ep-select-item index="99" label="删除"></ep-select-item>
                      <!-- <ep-select-item index="95" label="作废确认"></ep-select-item> -->
                      <ep-select-item index="96" label="已作废"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>

                <ep-col :col="8">
                  <ep-form-item attr="dclTypecd" label="申报类型">
                    <ep-select v-model="searchForm.dclTypecd" name="dclTypecd">
                      <ep-select-item index="1" label="备案"></ep-select-item>
                      <!-- <ep-select-item index="2" label="变更"></ep-select-item> -->
                      <ep-select-item index="3" label="作废"></ep-select-item>
                      <ep-select-item index="4" label="结案"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="12">
                  <ep-form-item label="确认时间" attr="dclTime">
                    <!-- <ep-date-range v-model="appointmentTime" @change="changeTime"></ep-date-range> -->
                    <ep-date-range v-model="dclTime" @change="changeTimeDcl" type="dateTime"></ep-date-range>
                  </ep-form-item>
                </ep-col>
              </ep-row>
              <ep-row :gutter="7">
                <ep-col :col="24">
                  <!-- <ep-button type="warning" size="small" @click="reset('searchForm')" icon="refresh">重置</ep-button>
                <ep-button type="primary" size="small" @click="refresh(true)" icon="search" :loading="loading">查询</ep-button> -->
                  <WmsButton @click="addOther" v-if="!addType">新增</WmsButton>
                  <WmsButton @click="reset('searchForm')">重置</WmsButton>
                  <WmsButton :loading="loading" @click="refresh(true)">查询</WmsButton>
                </ep-col>
              </ep-row>
            </ep-form>
          </div>
        </wms-title>
        <!--表格-->

        <div class="wms-dividing-line"></div>
        <div class="block">
          <slot name="out-form"> </slot>
        </div>
        <div class="card-body">
          <div class="block">
            <!-- <ep-button type="primary" size="small" @click="doUpdate" icon="edit">修改/确认</ep-button>
            <ep-button type="danger" size="small" @click="doDelete" icon="trash-a">删除</ep-button>
            <ep-button type="primary" size="small" @click="doDeclare" :loading="declareLoading" icon="checkmark-round">申报</ep-button>
            <ep-button type="success" size="small" @click="doPrint" icon="printer">打印</ep-button> -->
            <!-- <span style="color:red;font-size:25px;position:absolute;padding-top:8px;padding-left:3px;">*</span>
            <span style="padding-top: 10px;padding-left: 13px;position: absolute;font-size: 4px;color: rgba(0,0,0,.87);">双击列表信息，可进入详情页面</span> -->
          </div>
          <div class="block">
            <ep-table ref="table" border :height="400" :data="ep_data" head-color @selection-change="handleSelectionChange" :loading="loading">
              <ep-table-item v-if="!searchType" type="select"></ep-table-item>
              <ep-table-item column="opt" title="操作" width="200" v-if="searchType">
                <template slot-scope="props">
                  <wms-icon type="edit" @click="doUpdate(props.row, props.row.id)"></wms-icon>
                  <wms-icon type="cancel" @click="doDelete(props.row, props.row.id)"></wms-icon>
                  <wms-icon type="confirm" @click="doDeclare(props.row, props.row.id)"></wms-icon>
                  <!-- <wms-icon type="void"></wms-icon> -->
                  <!-- <wms-icon type="print"></wms-icon> -->
                  <wms-icon type="void" @click="doInvalid(props.row, props.row.id)"></wms-icon>
                  <wms-icon type="detail" @click="detailInfo($event, props.row)"></wms-icon>
                  <wms-icon type="case" @click="doCaseClose(props.row,props.row.id)"></wms-icon>

                  <!-- <wms-icon type="goods"></wms-icon> -->
                </template>
              </ep-table-item>
              <ep-table-item column="businessDeclareNo" title="业务申报编号" width="200"></ep-table-item>
              <ep-table-item column="dclTypecd" title="申报类型" width="150" :formatter="dclTypecdFormatter"></ep-table-item>
              <ep-table-item column="optStatus" title="状态" :formatter="optStatusFormatter" width="150"></ep-table-item>
              <ep-table-item column="bizopEtpsNm" title="企业名称" width="200"></ep-table-item>
              <ep-table-item column="bizopEtpsNo" title="企业编号" width="200"></ep-table-item>
              <ep-table-item column="outsourceEtpsNm" title="承揽企业名称" width="200"></ep-table-item>
              <ep-table-item column="contractNo" title="订单/合同号" width="200"></ep-table-item>
              <ep-table-item column="type" title="业务类型" width="150" :formatter="typeFormatter"></ep-table-item>
              <!-- <ep-table-item column="passportUsedTypecd" title="绑定状态" width="150" :formatter="passportUsedTypecdFormatter"></ep-table-item> -->
              <ep-table-item column="dclTime" title="申报时间" width="200"></ep-table-item>
              <!-- <ep-table-item column="" title="变更次数" width="200"></ep-table-item> -->

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
  </div>
</template>

<script>
import misList from "src/common/mislist";
import { getToken } from "utils";
import mixin from "./mixin";
export default {
  name: "BusinessDeclarFromSearch", // 保持和文件名一致，否则keep-alive不会动态缓存
  extends: misList, // 务必继承
  mixins: [mixin, misList],
  props: {
    searchType: {
      default: true,
    },
    addType: {
      default: false,
    },
    optstatus: {
      default: "",
    },
    ltguaStatus: {
      default: "",
    },
    passportUsedTypecd: {
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      declareLoading: false,
      listApi: "sasDeclaresSlectBsc", // 搜索，取api.json里面的key值
      settings: {
        pk: "id", // 主键
      },
      searchForm: {
        // 筛选条件
        businessDeclareNo: "",
        optStatus: this.optstatus,
        validCreateDate: "",
        validEndDate: "",
        dclTimeStart: "",
        dclTimeEnd: "",
        dclTypecd: "",
        // ltguaStatus: this.ltguaStatus,
        // passportUsedTypecd: this.passportUsedTypecd,
      },
      appointmentTime: "",
      dclTime: "",
      selectLength: 0,
      selectItems: [],
      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1,
      },
      ep_data: [], //表格数据
    };
  },

  created() {
    this.refresh(); // 调用继承方法
  },

  computed: {
    customList() {
      return this.$store.getters.getCustomList;
    },
  },

  methods: {
    // changeTime() {
    //   let appointmentTime = this.appointmentTime.split(",");
    //   this.searchForm.validEndDate = appointmentTime[1];
    //   this.searchForm.validCreateDate = appointmentTime[0];
    // },
    changeTimeDcl() {
      let dclTime = this.dclTime.split(",");
      this.searchForm.dclTimeStart = dclTime[0];
      this.searchForm.dclTimeEnd = dclTime[1];
    },
    addOther() {
      this.$router.push({
        path: "/BusinessDeclarFromAdd",
      });
    },
    // 修改
    doUpdate(row, rowId) {
      if (
        (row.optStatus == 6 && row.dclTypecd == 3) ||
        (row.optStatus == 4 && row.dclTypecd == 3)
      ) {
        this.$pop({
          type: "danger",
          message: "当前状态无法修改！",
        });
        return;
      }
      if (
        row.optStatus == "1" ||
        row.optStatus == "4" ||
        row.optStatus == "6"
      ) {
        let id = row.id;
        let data = {};
        data["id"] = id;
        let menusList = this.$store.getters.getMenuTabInstance.items;
        menusList.forEach(function (item, index) {
          if (item.link == "/BusinessDeclarFromUpdate") {
            menusList.splice(index, 1);
          }
        });
        this.$app.trigger("locate-tab", "BusinessDeclarFromUpdate", id);
      } else {
        this.$pop({
          type: "danger",
          message: "当前状态无法修改!",
        });
        return;
      }
    },
    doInvalid(row, rowId) {
      // let selectData = this.selectItems;
      let selectData = [row];
      if (row.optStatus == "5") {
        if (row.passportUsedTypecd == 1) {
          this.$confirm({
            word: "是否要作废所选条目信息！",
            callback: (errorInfo) => {
              if (errorInfo) {
                let SasPpBscIds = [];
                selectData.forEach((c) => {
                  if (c.id) {
                    SasPpBscIds.push(c.id);
                  }
                });
                let data = {};
                data["id"] = row.id;
                this.$post("sasDeclareCancel", data)
                  .then((responseData) => {
                    this.$pop({
                      type: "success",
                      message: "作废确认提交成功",
                    });
                    setTimeout(() => {
                      this.refresh(true);
                    });
                  })
                  .catch((e) => {});
              } else {
                return;
              }
            },
          });
        } else {
          this.$pop({
            type: "danger",
            message: "已有绑定，不可作废",
          });
        }
      } else {
        this.$pop({
          type: "danger",
          message: "当前状态无法作废！",
        });
      }
    },
    // 删除
    doDelete(row, rowId) {
      // let selectData = this.selectItems;
      let selectData = [row];
      if (
        (row.optStatus == 6 && selectData[0].dclTypecd == 3) ||
        (row.optStatus == 4 && selectData[0].dclTypecd == 3)
      ) {
        this.$pop({
          type: "danger",
          message: "当前状态无法修改！",
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
              let ids = [];
              selectData.forEach((c) => {
                if (c.id) {
                  ids.push(c.id);
                }
              });
              let data = {};
              data["id"] = row.id;
              this.$post("sasDeclareDeleteBs", data)
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
    //结案
    doCaseClose(row, rowId) {
      let vm = this;
      let selectData = [row];

      if (row.optStatus != "5") {
        this.$pop({
          type: "danger",
          message: "该状态不能进行结案",
        });
        return;
      }

      let data = {};
      data["id"] = row.id;
      this.$confirm({
        word: "是否要结案？",
        callback(info) {
          if (info) {
            vm.declareLoading = true;
            vm.$post("sasDeclareEndCase", data)
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
    },
    // 申报
    doDeclare(row, rowId) {
      let vm = this;
      //let selectData = this.$refs.table.getData("select");
      let selectData = [row];

      if (selectData[0].optStatus == "1") {
        let ids = [];
        selectData.forEach((c) => {
          if (c.id) {
            ids.push(c.id);
          }
        });
        let data = {};
        data["id"] = row.id;

        this.$confirm({
          word: "是否要确认？",
          callback(info) {
            if (info) {
              vm.declareLoading = true;

              vm.$post("sasDeclareDeclare", data)
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
          message: "该状态的业务单证表不能进行确认",
        });
        return;
      }
    },
    reset(e) {
      this.$refs[e].reset();
      this.appointmentTime = "";
      this.dclTime = "";
    },
    // 打印
    // doPrint(row, rowId) {
    //   let selectData = this.selectItems;
    //   if (selectData.length === 0) {
    //     this.$pop({
    //       type: "danger",
    //       message: "请选择一条数据"
    //     });
    //     return;
    //   }
    //   if (selectData.length > 10) {
    //     this.$pop({
    //       type: "danger",
    //       message: "最多可打印10条单证"
    //     });
    //     return;
    //   }

    //   let ids = [];
    //   selectData.forEach(item => {
    //     ids.push(item.id);
    //   });
    //   let id = ids.join();

    //   let token = getToken();
    //   window.location.href = global.HOST + "/grt/pdfDlb?id=" + id + "&token=" + token;
    // },

    // 跳转详情
    detailInfo(event, row, index) {
      this.$app.trigger("locate-tab", "BusinessDeclarFromDtInfo", row.id);
    },
  },
};
</script>
