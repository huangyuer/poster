<template>
  <div>
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
                <ep-col :col="8">
                  <ep-form-item label="装车单单证号" attr="packageListNo">
                    <ep-input v-model="searchForm.packageListNo" name="packageListNo"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item attr="vehicleNo" label="车牌号">
                    <ep-input v-model="searchForm.vehicleNo" :maxlength="64" name="vehicleNo"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item attr="iePack" label="进出区标志">
                    <ep-select v-model="searchForm.iePack" name="iePack">
                      <ep-select-item index="I" label="I-进区"></ep-select-item>
                      <ep-select-item index="E" label="E-出区"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item attr="sasPassportPreentNo" label="关联单证编号">
                    <ep-input v-model="searchForm.sasPassportPreentNo" name="sasPassportPreentNo"></ep-input>
                  </ep-form-item>
                </ep-col>
                <!-- <ep-col :col="6">
                <ep-form-item attr="tradeName" label="企业名称">
                  <ep-input v-model="searchForm.tradeName" :maxlength="64" name="tradeName"></ep-input>
                </ep-form-item>
                </ep-col>-->
                <ep-col :col="6">
                  <ep-form-item attr="optStatus" label="状态">
                    <ep-select v-model="searchForm.optStatus" name="optStatus">
                      <ep-select-item index="1" label="暂存"></ep-select-item>
                      <ep-select-item index="3" label="海关入库"></ep-select-item>
                      <ep-select-item index="4" label="海关入库失败"></ep-select-item>
                      <ep-select-item index="5" label="审核通过"></ep-select-item>
                      <ep-select-item index="6" label="审核拒绝"></ep-select-item>
                      <ep-select-item index="17" label="转人工"></ep-select-item>
                      <ep-select-item index="18" label="已确认"></ep-select-item>
                      <ep-select-item index="95" label="作废申报"></ep-select-item>
                      <ep-select-item index="96" label="作废"></ep-select-item>
                      <ep-select-item index="99" label="删除"></ep-select-item>
                      <ep-select-item index="100" label="海关删除"></ep-select-item>
                      <ep-select-item index="51" label="已过卡"></ep-select-item>
                      <!-- <ep-select-item index="50" label="未过卡"></ep-select-item> -->
                      <ep-select-item index="52" label="查验"></ep-select-item>
                      <!-- <ep-select-item index="53" label="卡口放行"></ep-select-item> -->
                    </ep-select>
                  </ep-form-item>
                </ep-col>
              </ep-row>
              <ep-row :gutter="7">
                <ep-col :col="24">
                  <!-- <ep-button
                    type="warning"
                    size="small"
                    icon="refresh"
                    @click="reset('searchForm')"
                  >重置</ep-button>
                  <ep-button
                    type="primary"
                    size="small"
                    @click="refresh(true)"
                    icon="search"
                    :loading="loading"
                  >查询</ep-button>-->
                  <WmsButton @click="generate">新增</WmsButton>
                  <WmsButton @click="reset('searchForm')">重置</WmsButton>
                  <WmsButton @click="refresh(true)" :loading="loading">查询</WmsButton>
                </ep-col>
              </ep-row>
            </ep-form>
          </div>
        </wms-title>
        <div class="wms-dividing-line"></div>

        <!--表格-->

        <div class="card-body">
          <div class="block">
            <!-- <ep-button type="primary" icon="android-add" size="small" @click="generate">生成</ep-button> -->
            <!-- <ep-button type="primary" size="small" @click="doUpdate" icon="edit">修改</ep-button> -->
            <!-- <ep-button type="danger" size="small" @click="doDelete" icon="trash-a">删除</ep-button> -->
            <!-- <ep-button
              type="primary"
              size="small"
              icon="checkmark-round"
              :loading="applyLoading"
              @click="doDeclare"
            >确认</ep-button>-->
            <!-- <ep-button type="primary" size="small" icon="close" @click="toVoid">作废</ep-button> -->
            <!-- <ep-button type="success" size="small" icon="printer" @click="doPrint">打印</ep-button> -->
            <!-- <ep-button type="primary" size="small" @click="manualUnBind">卸货</ep-button> -->

            <!-- <ep-button type="success" size="small"  icon="android-download" @click="exportFile" >Excel导出</ep-button> -->
          </div>

          <div class="block">
            <ep-table
              border
              ref="table"
              :height="400"
              :data="ep_data"
              :head-color="headColor"
              :loading="loading"
              @row-dblclick="detailInfo"
            >
              <ep-table-item column="opt" title="操作" width="200">
                <template slot-scope="props">
                  <wms-icon type="edit" @click="doUpdate(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="cancel" @click="doDelete(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="confirm" @click="doDeclare(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="void" @click="toVoid(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="print" @click="doPrint(props.row,props.row.id)"></wms-icon>
                </template>
              </ep-table-item>
              <ep-table-item column="packageListNo" title="装车单单证号" width="200"></ep-table-item>
              <ep-table-item column="vehicleNo" title="车牌号" width="200"></ep-table-item>
              <!-- <ep-table-item column="customCode" title="关区" width="150" :formatter="dclPlcCuscdFormatter"></ep-table-item> -->
              <ep-table-item
                column="dclTypecd"
                title="申报类型"
                :formatter="dclTypecdFormatter"
                width="150"
              ></ep-table-item>
              <ep-table-item column="iePack" title="进出区标志" :formatter="iePackFormatter" width="150"></ep-table-item>
              <ep-table-item column="optStatus" title="单证状态" :formatter="statusFormatter"></ep-table-item>
              <ep-table-item column="weight" title="总重量(kg)"></ep-table-item>
              <ep-table-item
                column="isConfirm"
                title="是否装车"
                width="200"
                :formatter="isConfirmFormatter"
              ></ep-table-item>

              <!-- <ep-table-item column="rmk" title="备注" width="350">
								<template slot-scope="props">
									<p class="rmk-style">{{props.row.rmk}}</p>
								</template>
              </ep-table-item>-->
            </ep-table>
          </div>
          <div class="block">
            <ep-pager
              right
              @size-change="handleSizeChange"
              @change="handleCurrentChange"
              :now-page="ep_page.page"
              :page-size="ep_page.size"
              :total-num="totalcount"
            ></ep-pager>
          </div>
        </div>
      </div>
    </div>
    <ep-model title="装车单信息" v-model="manualModel" width="1200px" :wrap-close="false">
      <div class="block" style="margin-bottom: 10px;">
        <ep-button type="danger" @click="manualDel" size="small" icon="trash-a">删除</ep-button>
      </div>
      <div class="block">
        <ep-table
          :loading="manualLoading"
          ref="manualTable"
          :height="400"
          :data="packageSaspassport"
          :head-color="true"
        >
          <ep-table-item type="select"></ep-table-item>

          <ep-table-item column="sasPassportPreentNo" title="关联单证编号" width="210"></ep-table-item>
          <ep-table-item
            column="passportTypecd"
            title="出入库类型"
            :formatter="pasFormatter"
            width="210"
          ></ep-table-item>
          <ep-table-item
            column="customCode"
            :formatter="dclPlcCuscdFormatter"
            title="关区"
            width="210"
          ></ep-table-item>
          <ep-table-item column="ioTypecd" title="进出区标志" :formatter="ioTypecdFormatter"></ep-table-item>
          <ep-table-item column="sasOptStatus" title="单证状态" :formatter="typeFormatter"></ep-table-item>
          <ep-table-item column="isInspection" title="查验状态" :formatter="isInspectionFormatter"></ep-table-item>
          <ep-table-item column="isDischarge" title="卸货状态" :formatter="isDischargeFormatter"></ep-table-item>
        </ep-table>
      </div>
      <div class="block" style="display: flex;justify-content: center;margin-top: 20px;">
        <ep-button
          type="primary"
          @click="manualUnBindBtn"
          size="small"
          icon="checkmark-round"
          :loading="unBindLoading"
          :disabled="manualDelTable.length==0"
        >卸货</ep-button>
      </div>
    </ep-model>
  </div>
</template>

<script>
import misList from "src/common/mislist";
// import { StorgTradeCodeFunction, userTypeFunction } from './require';
import { getToken } from "utils";
import mixin from "./mixin";
export default {
  name: "LoadingListInfo", // 保持和文件名一致，否则keep-alive不会动态缓存

  extends: misList, // 务必继承
  mixins: [mixin],
  components: {},

  created() {
    // this.refresh(true);
  },

  mounted() {
    // this.searchForm.tradeName = StorgTradeCodeFunction();
  },
  computed: {
    tradeInfo() {
      return this.$store.getters.getCustomList;
    },
  },
  watch: {
    manualModel(val, oldVal) {
      if (!val) {
        console.log("-----2--22-2");
        this.manualDelTable = [];
        this.manualLoading = false;
        this.unBindLoading = false;
      }
    },
    exportStyle(e) {
      if (!e) {
        this.optType = "1";
      }
    },
  },
  methods: {
    // 跳转
    generate() {
      //   let url = location.origin
      //   console.log(url)
      //   window.open(`${url}/#/directdelivery?token=${getToken()}&type=7&stockBillType=E`)
      this.$router.push({
        path: "/LoadingListAdd",
      });
    },
    isConfirmFormatter(row, index) {
      if (row.isConfirm == "1") {
        return "已装车";
      } else if (row.isConfirm == "0") {
        return "未装车";
      }
    },
    dclTypecdFormatter(row, index) {
      if (row.dclTypecd == "1") {
        return "备案";
      } else if (row.dclTypecd == "3") {
        return "作废";
      } else if (row.dclTypecd == "4") {
        return "过卡";
      }
    },
    iePackFormatter(row, index) {
      if (row.iePack == "I") {
        return "I-进区";
      } else if (row.iePack == "E") {
        return "E-出区";
      }
    },
    dclPlcCuscdFormatter(row, index) {
      let customList = this.$store.getters.getCustomList;
      for (let i = 0; i < customList.length; i++) {
        if (row.customCode == customList[i].customCode) {
          return customList[i].customName;
        }
      }
    },
    doDelete(row, rowId) {
      // let selectData = this.$refs.table.getData("select");
      let selectData = [row];
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
        return;
      }

      const isCanDelelte = (val) =>
        val.optStatus == "1" || val.optStatus == "4" || val.optStatus == "6";

      let canDelete = selectData.every(isCanDelelte);
      if (!canDelete) {
        this.$pop({
          type: "danger",
          message: "当前状态无法删除！",
        });
        return;
      }

      this.$confirm({
        word: "是否要删除所选条目信息！",
        callback: (errorInfo) => {
          if (errorInfo) {
            let bwsBscIds = [];
            selectData.forEach((c) => {
              if (c.id) {
                bwsBscIds.push(Number(c.id));
              }
            });
            let data = {};
            data["bscIds"] = bwsBscIds;
            this.$post("pickRideDeletePackageListBsc", data)
              .then((res) => {
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
    },
    statusFormatter(row, index) {
      if (row.optStatus == "1") {
        return "暂存";
      } else if (row.optStatus == "3") {
        return "海关入库";
      } else if (row.optStatus == "4") {
        return "海关入库失败";
      } else if (row.optStatus == "6") {
        return "审核拒绝";
      } else if (row.optStatus == "5") {
        return "审核通过";
      } else if (row.optStatus == "18") {
        return "已确认";
      } else if (row.optStatus == "17") {
        return "转人工";
      } else if (row.optStatus == "95") {
        return "作废申报";
      } else if (row.optStatus == "96") {
        return "作废";
      } else if (row.optStatus == "99") {
        return "删除";
      } else if (row.optStatus == "100") {
        return "海关删除";
      } else if (row.optStatus == "51") {
        return "已过卡";
      } else if (row.optStatus == "50") {
        return "未过卡";
      } else if (row.optStatus == "52") {
        return "查验";
      } else if (row.optStatus == "53") {
        return "卡口放行";
      }
    },
    toVoid(row, rowId) {
      // let selectData = this.$refs.table.getData("select");
      let selectData = [row];
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
        return;
      }
      const isCanDelelte = (val) => val.optStatus == "5";

      let canDelete = selectData.every(isCanDelelte);
      if (!canDelete) {
        this.$pop({
          type: "danger",
          message: "该状态的装车单不能进行作废",
        });
        return;
      }

      let bscIds = [];
      selectData.forEach((c) => {
        bscIds.push(Number(c.id));
      });
      let data = {};
      data["bscIds"] = bscIds;
      this.$confirm({
        word: "是否要进行作废处理？",
        callback: (errorInfo) => {
          if (errorInfo) {
            this.$post("pickRidePackageListAbolished", data)
              .then((responseData) => {
                this.refresh(true);
              })
              .catch((e) => {
                this.loading = false;
              });
          }
        },
      });
    },
    doDeclare(row, rowId) {
      // let selectData = this.$refs.table.getData("select");
      let selectData = [row];
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
        return;
      }
      const isCanDelelte = (val) => val.optStatus == "1";

      let canDelete = selectData.every(isCanDelelte);
      if (!canDelete) {
        this.$pop({
          type: "danger",
          message: "该状态的装车单不能进行确认",
        });
        return;
      }

      let bscIds = [];
      selectData.forEach((c) => {
        bscIds.push(Number(c.id));
      });
      let data = {};
      data["bscIds"] = bscIds;
      // data["userId"] = this.$store.getters.getUserId;
      this.$confirm({
        word: "是否确认已装车？",
        callback: (errorInfo) => {
          if (errorInfo) {
            this.applyLoading = true;
            this.$post("pickRidePackageListDeclare", data)
              .then((responseData) => {
                this.applyLoading = false;
                this.refresh(true);
              })
              .catch((e) => {
                this.applyLoading = false;
                this.loading = false;
              });
          }
        },
      });
    },
    doPrint(row, rowId) {
      // let selectData = this.$refs.table.getData("select");
      let selectData = [row];
      // if (selectData.length > 10) {
      //   this.$pop({
      //     type: 'danger',
      //     message: '最多同时打印10条数据！'
      //   });
      //   return;
      // }
      if (selectData.length == 0 || selectData.length != 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据！",
        });
        return;
      }
      let id = [];
      selectData.forEach((e) => {
        id.push(e.id);
      });

      let data = {};
      let token = getToken();
      window.location.href =
        global.HOST + "/pickRide/pdf?id=" + id.join() + "&token=" + token;
    },
    doUpdate(row, rowId) {
      // let selectData = this.$refs.table.getData("select");
      let selectData = [row];
      if (selectData.length != 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
        return;
      }
      if (
        selectData[0].optStatus == 1 ||
        selectData[0].optStatus == 6 ||
        selectData[0].optStatus == 4
      ) {
      } else {
        return this.$pop({
          type: "danger",
          message: "当前状态不允许修改",
        });
      }
      let id = selectData[0].id;
      let menusList = this.$store.getters.getMenuTabInstance.items;
      menusList.forEach((item, index) => {
        if (item.link == "/LoadingListUpdate") {
          menusList.splice(index, 1);
        }
      });
      // this.$router.push({
      //   name: '装车单修改',
      //   params: { id: id }
      // });
      this.$app.trigger("locate-tab", "LoadingListUpdate", id);
    },
    findFormInfo(id) {
      this.manualLoading = true;
      this.$post("pickRidePackageListInfo", { id: id })
        .then((res) => {
          console.log(res);
          this.packageListInfo = res.map.data;
          this.packageSaspassport = res.map.data.packageSaspassport;
          this.manualLoading = false;
          // this.tableData = res.map.data.packageListStatus;
        })
        .catch(() => {
          this.manualLoading = false;
        });
    },
    manualUnBind() {
      let selectData = this.$refs.table.getData("select");
      if (selectData.length != 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
        return;
      }

      if (selectData[0].optStatus != 52) {
        return this.$pop({
          type: "danger",
          message: "状态为查验才能卸货！",
        });
      }
      this.findFormInfo(selectData[0].id);
      this.manualModel = true;
    },
    manualUnBindBtn() {
      this.packageListInfo.packageSaspassport = this.manualDelTable;
      // return
      this.unBindLoading = true;
      this.$post("pickRideManualUnBind", this.packageListInfo).then((res) => {
        this.manualModel = false;
        this.manualDelTable = [];
        console.log(res);
        this.unBindLoading = false;
        // this.packageListInfo = res.map.data;
        // this.packageSaspassport = res.map.data.packageSaspassport;
        // this.tableData = res.map.data.packageListStatus;
      });
    },
    manualDel() {
      let selectData = this.$refs.manualTable.getData("select");
      if (selectData.length <= 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
        return;
      }
      const isCanDelelte = (val) =>
        val.isInspection == "1" && val.isDischarge == "0";
      let canDelete = selectData.every(isCanDelelte);
      if (canDelete) {
        this.manualDelTable = [...this.manualDelTable, ...selectData];
        this.$refs.manualTable.deleteSelectRow();
        this.$refs.manualTable.getData("none");
      } else {
        return this.$pop({
          type: "danger",
          message: "只有查验状态并且是未卸货才可以删除",
        });
      }

      console.log("------", this.manualDelTable);
    },
    detailInfo(event, row, index) {
      this.$app.trigger("locate-tab", "LoadingListDtInfo", row.id);
    },
  },
  data() {
    return {
      manualDelTable: [],
      packageListInfo: {},
      packageSaspassport: [],
      counter: 0,
      manualModel: false,
      manualLoading: false,
      unBindLoading: false,
      fileUploadLoading: false,
      exportStyle: false,
      applyLoading: false,
      optType: "1",
      loading: false,
      listApi: "pickRidePackageListAll", // 搜索，取api.json里面的key值
      deleteData: "",
      settings: {
        pk: "id", // 主键
      },
      searchForm: {
        optStatus: "",
        packageListNo: "",
        vehicleNo: "",
        iePack: "",
        sasPassportPreentNo: "",
        tradeName: this.$store.getters.getTradeName,
        // type:userTypeFunction()
      },
      headColor: true,
      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1,
      },
      ep_data: [], //表格数据

      uploadData: {
        businessType: "sasCmb",
      },
    };
  },
};
</script>
