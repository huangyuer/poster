<template>
  <div>
    <div style="margin-bottom: 7px;">
      <!-- <ep-button type="primary" size="small" @click="doUpdate" icon="edit">修改</ep-button>
      <ep-button type="primary" size="small" @click="doDeclare" icon="checkmark-round">确认</ep-button>
      <ep-button type="primary" size="small">重新汇总</ep-button>
      <ep-button type="success" size="small" @click="doPrint" icon="printer">打印</ep-button> -->

      <!-- <ep-button type="danger" size="small" @click="doDelete" icon="trash-a">删除</ep-button> -->
      <!-- <ep-button type="success" size="small" @click="createFile">生成平文件</ep-button> -->

      <!-- <file-upload :uploadData="uploadData" :uploadType="1" /> -->
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
    </div>

    <div class="block">
      <ep-table ref="table" border :height="400" :data="ep_data" :head-color="headColor" :row-class="setRowClass" @selection-change="handleSelectionChange">
        <!-- <ep-table-item type="select"></ep-table-item> -->
        <ep-table-item column="opt" title="操作" width="200">
          <template slot-scope="props">
            <!-- <wms-icon type="edit" @click="doUpdate(props.row,props.row.id)"></wms-icon>
            <wms-icon type="cancel" @click="doDelete(props.row,props.row.id)"></wms-icon>
            <wms-icon type="confirm" @click="doDeclare(props.row,props.row.id)"></wms-icon>

            <!-- <wms-icon type="void"></wms-icon> -->
            <!-- <wms-icon type="print" @click="doPrint(props.row,props.row.id)"></wms-icon> -->
            <wms-icon type="detail" @click="detailInfo($event,props.row)"></wms-icon>
            <!-- <wms-icon type="change" @click="doModify(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="goods"></wms-icon> -->
          </template>
        </ep-table-item>
        <!-- <ep-table-item column="sumPreentNo" title="汇总统计编号" width="200"></ep-table-item>
        <ep-table-item column="optStatus" title="状态" width="100" :formatter="optStatusFormatter"></ep-table-item> -->
        <ep-table-item column="dclEtpsNo" title="企业编号" width="160"></ep-table-item>
        <ep-table-item column="dclEtpsNm" title="企业名称" width="260"></ep-table-item>
        <ep-table-item column="dclEtpsSccd" title="企业信用代码" width="190"></ep-table-item>
        <ep-table-item column="masterCuscd" title="主管地海关" width="130" :formatter="masterCuscdFormatter"></ep-table-item>
        <ep-table-item column="sumRmbTotalAmt" title="人民币总金额" width="190"></ep-table-item>
        <ep-table-item column="sumUsdTotalAmt" title="美元总金额" width="190"></ep-table-item>

        <ep-table-item column="sumBeginTime" title="汇总统计开始时间" width="180"></ep-table-item>
        <ep-table-item column="sumDueTime" title="汇总统计截至时间" width="180"></ep-table-item>

        <!-- <ep-table-item column="sumDclTime" title="确认日期" width="190"></ep-table-item> -->
        <!-- <ep-table-item column="rmk" title="备注" width="300">
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
</template>
<script>
import misList from "src/common/mislist";
import mixin from "../mixin";
import { getToken, getId } from "utils";
import FileUpload from "src/components/FileUpload";
export default {
  name: "bondFormHeaderTable",
  extends: misList, // 务必继承
  mixins: [mixin],
  components: {
    FileUpload
  },
  props: {
    epData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    searchForm: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  watch: {
    epData(val) {
      this.ep_data = val;
      this.totalcount = this.$parent.totalcount;
    }
  },
  data() {
    return {
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      listApi: "importBondedList", // 搜索，取api.json里面的key值
      ep_data: [], //表格数据
      totalcount: 0,
      headColor: true,
      uploadData: {
        businessType: "sum",
        sysCode: "lgsa"
      },
      settings: {
        pk: "id" // 主键
      }
    };
  },
  methods: {
    // 生成平文件
    // createFile() {
    //   let selectData = this.$refs.table.getData("select");
    //   console.log("selectData", selectData);
    //   if (selectData.length == 0) {
    //     this.$pop({
    //       type: "danger",
    //       message: "请选择数据"
    //     });
    //     return;
    //   }
    //   if (selectData.length > 1) {
    //     this.$pop({
    //       type: "danger",
    //       message: "请选择一条数据"
    //     });
    //     return;
    //   }
    //   let data = {
    //     dclEtpsSccd: "",
    //     id: ""
    //   };
    //   console.log("selectdata", selectData);
    //   data.dclEtpsSccd = selectData[0].dclEtpsSccd;
    //   data.id = selectData[0].id;
    //   this.$post("importBondedGetFile", data).then(res => {
    //     console.log("生成平文件", res);
    //   });
    // },
    setRowClass(index) {
      if (this.ep_data[index].unusualMark == 1) {
        return "light-error";
      } else if (this.ep_data[index].unusualMark == 2) {
        return "error";
      }
    },
    // 跳转明细页面
    detailInfo(event, row, index) {
      this.$app.trigger("locate-tab", "ImportBondedDtInfo", row.id);
      sessionStorage.setItem("headerFrom", JSON.stringify(row));
    },
    //删除
    doDelete() {
      let selectData = this.$refs.table.getData("select");
      if (selectData.length <= 0) {
        this.$pop({
          type: "danger",
          message: "请选择数据"
        });
        return;
      }
      if (
        selectData.every(item => item.optStatus == "1") ||
        selectData.every(item => item.optStatus == "4") ||
        selectData.every(item => item.optStatus == "6")
      ) {
        this.$confirm({
          word: "是否要删除所选条目！",
          callback: errorInfo => {
            if (errorInfo) {
              let bscIds = [];
              selectData.forEach(c => {
                if (c.id) {
                  bscIds.push(c.id);
                }
              });
              let data = {};
              data["bscIds"] = bscIds;
              this.$post("importBondedDelete", data)
                .then(responseData => {
                  this.refresh(true);
                  this.$pop({
                    type: "success",
                    message: "删除成功"
                  });
                })
                .catch(e => {
                  this.loading = false;
                });
            }
          }
        });
      } else {
        this.$pop({
          type: "danger",
          message:
            "该进出境货物统计汇总无法删除，请选择状态为暂存、入库失败或审核拒绝状态下的进出境货物统计汇总"
        });
        return;
      }
    },
    //修改
    doUpdate() {
      let selectData = this.$refs.table.getData("select");
      if (selectData.length !== 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
        return;
      }
      if (
        selectData[0].optStatus == "1" ||
        selectData[0].optStatus == "4" ||
        selectData[0].optStatus == "6"
      ) {
        let id = selectData[0].id;
        let data = {};
        data["id"] = id;
        let menusList = this.$store.getters.getMenuTabInstance.items;
        menusList.forEach(function(item, index) {
          if (item.link == "/importBondedupdate") {
            menusList.splice(index, 1);
          }
        });
        this.$app.trigger("locate-tab", "importBondedupdate", id);
      } else {
        this.$pop({
          type: "danger",
          message: "只有暂存，审核拒绝和海关入库失败的货物统计汇总可以修改"
        });
        return;
      }
    },
    // 申报
    doDeclare() {
      let vm = this;
      let selectData = this.$refs.table.getData("select");
      console.log("selectData", selectData);
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择数据"
        });
        return;
      }
      if (selectData.length > 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
        return;
      }
      if (selectData.every(item => item.optStatus == "1")) {
        let bscIds = [];
        selectData.forEach(c => {
          if (c.id) {
            bscIds.push(c.id);
          }
        });
        let data = {};
        data["bscIds"] = bscIds;
        if (selectData[0].unusualMark == 1) {
          if (selectData[0].rmk) {
            vm.$confirm({
              word: "是否要确认？",
              callback(info) {
                if (info) {
                  vm.declareLoading = true;
                  vm.$post("importBondedDeclare", data)
                    .then(responseData => {
                      vm.declareLoading = false;
                      vm.refresh(true);
                    })
                    .catch(e => {
                      vm.declareLoading = false;
                      vm.refresh(true);
                    });
                }
              }
            });
          } else {
            this.$confirm({
              word: "是否填写情况说明？",
              callback(info) {
                if (info) {
                  let menusList = vm.$store.getters.getMenuTabInstance.items;
                  menusList.forEach(function(item, index) {
                    if (item.link == "/importBondedupdate") {
                      menusList.splice(index, 1);
                    }
                  });
                  vm.$app.trigger(
                    "locate-tab",
                    "importBondedupdate",
                    selectData[0].id
                  );
                } else {
                  vm.$confirm({
                    word: "是否要确认？",
                    callback(info) {
                      if (info) {
                        vm.declareLoading = true;
                        vm.$post("importBondedDeclare", data)
                          .then(responseData => {
                            vm.declareLoading = false;
                            vm.refresh(true);
                          })
                          .catch(e => {
                            vm.declareLoading = false;
                            vm.refresh(true);
                          });
                      }
                    }
                  });
                }
              }
            });
          }
        } else {
          vm.$confirm({
            word: "是否要确认？",
            callback(info) {
              if (info) {
                vm.declareLoading = true;
                vm.$post("importBondedDeclare", data)
                  .then(responseData => {
                    vm.declareLoading = false;
                    vm.refresh(true);
                  })
                  .catch(e => {
                    vm.declareLoading = false;
                    vm.refresh(true);
                  });
              }
            }
          });
        }
      } else {
        this.$pop({
          type: "danger",
          message:
            "该进出境货物统计汇总无法确认，请选择状态为暂存进出境货物统计汇总"
        });
        return;
      }
    },
    // 打印
    doPrint() {
      let selectData = this.$refs.table.getData("select");
      if (selectData.length === 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
        return;
      }
      if (selectData.length > 10) {
        this.$pop({
          type: "danger",
          message: "最多可打印10条货物统计汇总"
        });
        return;
      }
      for (let i = 0; i < selectData.length; i++) {
        if (selectData[i].optStatus !== "5") {
          this.$pop({
            type: "danger",
            message: "只有审核通过才可以打印"
          });
          return;
        }
      }
      let ids = [];
      selectData.forEach(item => {
        ids.push(item.id);
      });
      let id = ids.join();
      let token = getToken();
      window.location.href =
        global.HOST + "/sumStat/pdf?id=" + id + "&token=" + token;
    }
  }
};
</script>
<style lang="less">
.light-error {
  td {
    color: #f39c12;
  }
}
.error {
  td {
    color: #e74c3c;
  }
}
</style>
