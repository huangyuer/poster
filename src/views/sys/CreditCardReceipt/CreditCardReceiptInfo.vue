<template>
  <div>
    <div class="panel-main-content">
      <!--筛选栏组-->
      <div class="search-card contents-card card-margin">
        <wms-title title>
          <div class="panel panel-default">
            <ep-form ref="searchForm" :form="searchForm" name-width="138px" :rules="rules">
              <!-- <ep-tabs active="查询列表">
              <ep-tab-item name="查询列表">-->
              <ep-row :gutter="7">
                <ep-col :col="8">
                  <ep-form-item label="凭证编号" attr="preentNo">
                    <ep-input v-model="searchForm.preentNo" name="preentNo" :maxlength="30" :disabled="doEdit1"></ep-input>
                  </ep-form-item>
                </ep-col>
                <!-- <ep-col :col="8">
                    <ep-form-item label="凭证编号" attr="portNo">
                      <ep-input
                        v-model="searchForm.portNo"
                        name="portNo"
                        :maxlength="30"
                      ></ep-input>
                    </ep-form-item>
                </ep-col>-->
                <ep-col :col="8" v-show="searchType">
                  <ep-form-item label="单证状态" attr="optStatus">
                    <ep-select v-model="searchForm.optStatus" name="optStatus">
                      <ep-select-item :index="item.value" v-for="(item, k) in optionStatusList" :key="k" :label="item.label"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8" v-show="searchType">
                  <ep-form-item label="ERP/WMS出入库类型" attr="inExpType">
                    <ep-select v-model="searchForm.inExpType" name="inExpType">
                      <ep-select-item index="6" label="进出境径予放行"></ep-select-item>
                      <ep-select-item index="1" label="非径予放行货物"></ep-select-item>
                      <ep-select-item index="2" label="先报后送"></ep-select-item>
                      <ep-select-item index="3" label="分送集报"></ep-select-item>
                      <ep-select-item index="4" label="区内流转"></ep-select-item>
                      <ep-select-item index="5" label="区间流转"></ep-select-item>
                      <ep-select-item index="7" label="临时进出区"></ep-select-item>
                      <ep-select-item index="8" label="外发加工"></ep-select-item>

                      <ep-select-item index="0" label="空车进出区"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
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
                <ep-col :col="8">
                  <ep-form-item label="进出标志" attr="ieTypecd">
                    <ep-select v-model="searchForm.ieTypecd" name="ieTypecd" :disabled="doEdit">
                      <ep-select-item index="I" label="I-进区"></ep-select-item>
                      <ep-select-item index="E" label="E-出区"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="关联单证编号" attr="rltNo">
                    <ep-input v-model="searchForm.rltNo" name="rltNo" :maxlength="64"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item attr="vehicleNo" label="承运车车牌号">
                    <ep-input v-model="searchForm.vehicleNo" name="vehicleNo" :maxlength="128"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="12" v-show="searchType">
                  <ep-form-item label="确认时间" attr="dclTime">
                    <ep-date-range v-model="fixTime" @change="changeTime" type="dateTime"></ep-date-range>
                    <!-- <ep-date-range v-model="searchForm.dclTime" name="dclTime"></ep-date-range> -->
                  </ep-form-item>
                </ep-col>
              </ep-row>
              <!-- </ep-tab-item>
              </ep-tabs>-->
            </ep-form>

            <ep-row :gutter="7">
              <ep-col :col="24">
                <WmsButton @click="addOther" v-if="searchType">新增</WmsButton>
                <WmsButton @click="reset('searchForm')">重置</WmsButton>
                <WmsButton :loading="loading" @click="refresh(true)">查询</WmsButton>
                <file-upload :uploadData="uploadData" :uploadType="1" v-if="searchType" />
                <!-- <ep-button type="warning" size="small" icon="refresh" @click="reset('searchForm')">重置</ep-button> -->
                <!-- <ep-button type="primary" size="small" icon="search" :loading="loading" @click="refresh(true)">查询</ep-button> -->
              </ep-col>
            </ep-row>
          </div>
        </wms-title>
        <div class="wms-dividing-line"></div>
        <!-- </div> -->
        <!--表格-->
        <!-- <div class="ep-card card-margin relative"> -->
        <div class="card-body">
          <div class="block">
            <slot name="out-form"></slot>
            <div v-show="searchType">
              <!-- <ep-button type="primary" size="small" v-show="this.$store.getters.getOrgType != '10'" @click="doUpdate" icon="edit">修改</ep-button> -->
              <!-- <ep-button type="danger" size="small" @click="doDelete" icon="trash-a">删除</ep-button>
              <ep-button type="primary" @click="doDeclare" size="small" :loading="applyLoading" icon="checkmark-round">确认</ep-button>-->
              <!-- <ep-button
                type="primary"
                @click="doCancel"
                size="small"
                icon="close"
                >作废</ep-button
              >-->
              <!-- <file-upload :uploadData="uploadData" :uploadType="1" /> -->
              <!-- <ep-button
                type="success"
                size="small"
                icon="android-upload"
                :loading="importLoading"
                @click="importExcel"
                >Excel导入</ep-button
              >-->
              <!-- <ep-button type="success" size="small" @click="doPrint" icon="printer">打印</ep-button> -->
              <!-- <span style="
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
              ">双击列表信息，可进入详情页面</span>-->
            </div>
          </div>

          <div class="block">
            <ep-table ref="table" border :height="400" :data="ep_data" :head-color="headColor" @selection-change="handleSelectionChange" :loading="loading">
              <!-- <ep-table-item type="expand">
                <template slot-scope="props">
                  <opt-records-tab
                    :recordsTable="props.row.rows.records"
                  ></opt-records-tab>
                </template>
              </ep-table-item>-->
              <ep-table-item v-if="!searchType" type="select"></ep-table-item>
              <ep-table-item v-if="searchType" column="opt" title="操作" width="200">
                <template slot-scope="props">
                  <wms-icon type="edit" @click="doUpdate(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="cancel" @click="doDelete(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="confirm" @click="doDeclare(props.row,props.row.id)"></wms-icon>
                  <!-- <wms-icon type="void"></wms-icon> -->
                  <wms-icon type="print" @click="doPrint(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="detail" @click="detailInfo($event,props.row)"></wms-icon>
                  <wms-icon type="void" @click="doInvalid(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="entrust" @click="entrust(props.row,props.row.id)"></wms-icon>
                  <!-- <wms-icon type="change" @click="doModify(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="goods"></wms-icon>-->
                </template>
              </ep-table-item>
              <ep-table-item column="preentNo" title="凭证编号" width="210"></ep-table-item>
              <!-- <ep-table-item
                column="preentNo"
                title="预录入编号"
                width="230"
              ></ep-table-item>-->
              <ep-table-item column="dclTypecd" title="申报类型" width="120" :formatter="optDclTypecdFormatter"></ep-table-item>
              <ep-table-item column="optStatus" title="状态" width="140" :formatter="statusFormatter"></ep-table-item>
              <ep-table-item column="inExpType" title="ERP/WMS出入库类型" width="200" :formatter="inExpTypeFormatter"></ep-table-item>
              <ep-table-item column="bindTypecd" title="绑定类型" width="150" :formatter="binFormatter"></ep-table-item>
              <ep-table-item column="ieTypecd" title="进出标志" width="120" :formatter="ieTypecdFormatter"></ep-table-item>
              <ep-table-item column="mtpckEndprdTypecd" title="料件/成品标志" width="150" :formatter="mtpckEndprdTypecdFormatter"></ep-table-item>
              <ep-table-item column="impexpPortcd" title="进出境关别" :formatter="impexpPortcdFormatter"></ep-table-item>
              <ep-table-item column="bizopEtpsNo" title="经营企业编号" width="150"></ep-table-item>
              <ep-table-item column="bizopEtpsNm" title="经营企业名称" width="200"></ep-table-item>
              <ep-table-item column="bizopEtpsSccd" title="经营单位社会信用代码" width="200"></ep-table-item>
              <ep-table-item column="rcvgdEtpsNo" title="境内收发货企业编码" width="180"></ep-table-item>
              <ep-table-item column="rcvgdEtpsNm" title="境内收发货企业名称" width="200"></ep-table-item>
              <ep-table-item column="rcvgdEtpsSccd" title="境内收发货企业社会信用代码" width="280"></ep-table-item>
              <ep-table-item column="masterCuscd" title="主管海关" :formatter="masterCuscdFormatter"></ep-table-item>
              <ep-table-item column="dclTime" title="申报日期" width="200"></ep-table-item>
              <ep-table-item column="vehicleNo" title="承运车车牌号"></ep-table-item>
              <!-- 17IC卡号 -->
              <ep-table-item column="vehicleIcNo" title="IC卡号(电子车牌)" width="220"></ep-table-item>
              <ep-table-item column="isReturnArea" title="是否回区" width="220" :formatter="isReturnAreaFormatter"></ep-table-item>

              <ep-table-item column="containerNo" title="集装箱号" width="120"></ep-table-item>
              <ep-table-item column="vehicleWt" title="车自重" width="120"></ep-table-item>
              <ep-table-item column="vehicleFrameNo" title="车架号" width="120"></ep-table-item>
              <ep-table-item column="vehicleFrameWt" title="车架重" width="120"></ep-table-item>
              <ep-table-item column="containerType" title="集装箱箱型" width="120"></ep-table-item>
              <ep-table-item column="containerWt" title="集装箱重" width="120"></ep-table-item>
              <!-- 24总重量 -->
              <ep-table-item column="totalWt" title="总重量" width="150"></ep-table-item>
              <ep-table-item column="passCollectWt" title="卡口地磅采集重量" width="200"></ep-table-item>
              <ep-table-item column="wtError" title="重量比对误差" width="150"></ep-table-item>
              <ep-table-item column="totalGrossWt" title="货物总毛重" width="120"></ep-table-item>
              <ep-table-item column="totalNetWt" title="货物总净重" width="200"></ep-table-item>
              <!-- 29进出卡口状态 -->
              <ep-table-item column="portIochkptStucd" title="进出卡口状态" width="150" :formatter="portIochkptStucdFormatter"></ep-table-item>
              <ep-table-item column="passTime" title="过卡时间1" width="200"></ep-table-item>
              <ep-table-item column="secdPassTime" title="过卡时间2" width="200"></ep-table-item>
              <ep-table-item column="preRecAccountTime" title="预记入企业账户时间" width="200"></ep-table-item>
              <ep-table-item column="recAccountTime" title="正式记入企业账户时间" width="200"></ep-table-item>
              <ep-table-item column="recAccountFlag" title="是否记入企业账户标记" width="200" :formatter="recAccountFlagFormatter"></ep-table-item>
              <ep-table-item column="bindUsedTypecd" title="分送集报标志" width="200" :formatter="bindUsedTypecdFormatter"></ep-table-item>
              <!-- <ep-table-item column="inExpWhNo" title="ERP/WMS出入库编号" width="200"></ep-table-item>
              <ep-table-item column="inExpTime" title="ERP/WMS出入库日期" width="200"></ep-table-item>-->
              <!-- 38操作状态 -->

              <ep-table-item column="rmk" title="备注" width="350">
                <template slot-scope="props">
                  <p class="rmk-style">{{ props.row.rmk }}</p>
                </template>
              </ep-table-item>
            </ep-table>
          </div>
          <!-- <ep-model title="提示:" v-model="model2" width="500px">
            <span>是否需要申报所选条目信息?</span>
            <div class="block" style="margin-top: 15px;">
              <ep-checkbox v-model="Fradio" @change="FradioChange"
                >校验</ep-checkbox
              >
              <ep-checkbox v-model="Sradio" @change="SradioChange"
                >不校验</ep-checkbox
              >
            </div>

            <div class="block" style="text-align: center;">
              <ep-button type="danger" @click="cancel">取消</ep-button>
              <ep-button type="primary" :loading="sureLoading" @click="apply"
                >确定</ep-button
              >
            </div>
          </ep-model>-->
          <div class="block">
            <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
          </div>
          <!-- <ep-model title="选择导出方式" v-model="exportStyle" width="500px">
            <ep-radio class="radio" v-model="optType" label="1"
              >按票导出</ep-radio
            >
            <ep-radio class="radio" v-model="optType" label="2"
              >按表导出</ep-radio
            >

            <div class="block" style="text-align:right;margin-top:30px;">
              <ep-button type="danger" @click="cancelBtn">取消</ep-button>
              <ep-button
                style="margin-left:20px;"
                type="primary"
                @click="applyBtn"
                >确定</ep-button
              >
            </div>
          </ep-model>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import { delToken, getToken, getOrgId } from "utils";
import localStorage from "utils/localStorage";
import mixin from "./mixin";
//import FileUploadButton from "src/components/FileUploadButton";
import fileUpload from "src/components/FileUpload";
//import optRecordsTab from "src/components/optRecordsTab";
export default {
  name: "CreditCardReceiptInfo", // 保持和文件名一致，否则keep-alive不会动态缓存
  // extends: misList, // 务必继承
  // mixins: [mixin],
  mixins: [misList, mixin],

  components: {
    fileUpload,
  },
  props: {
    rules: {
      type: Object,
      default: function () {
        return {};
      },
    },
    addFlag: {
      default: true,
    },
    getDetail: {
      default: "",
    },
    searchinExp: {
      default: "",
    },
    searchType: {
      default: true,
    },
    optStatus: {
      default: "",
    },
    ieState: {
      default: "",
    },
    iswhRecPreentNo: {
      default: "",
    },
    bindUsedTypecdStatus: {
      default: "",
    },
    mtpckEndprdTypecd: {
      // 料件成品标志
      default: "",
    },
  },
  // updated() {
  //   this.addFlag1();
  // },
  computed: {},
  watch: {
    mtpckEndprdTypecd: {
      handler(val, oldVal) {
        this.searchForm.mtpckEndprdTypecd = val;
      },
      immediate: true,
    },
    addFlag: {
      handler(val, oldVal) {
        this.ep_data = [];
        console.log(val);
        if (val) {
          this.searchForm.preentNo = "";
          this.doEdit1 = false;
        } else {
          this.searchForm.preentNo = this.iswhRecPreentNo;
          this.doEdit1 = true;
        }
      },
      immediate: true,
    },
    iswhRecPreentNo: {
      handler(val, oldVal) {
        this.ep_data = [];

        console.log("单证变化", val);
      },
      immediate: true,
    },
    ieState: {
      immediate: true,
      handler: function (val, oldval) {
        // console.log("ieState", this.ieState);
        if (this.ieState) {
          this.searchForm.ieTypecd = this.ieState;
          this.doEdit = true;
        } else {
          this.searchForm.ieTypecd = "";
          this.doEdit = false;
        }
        if (val != oldval) {
          // console.log("ooooooooooo", this.ep_data);
          this.ep_data = [];
        }
      },
    },
  },
  mounted() {
    // if (!this.searchType && this.searchinExp != 7) {
    //   this.refresh();
    // }
    this.refresh(true);
  },
  // created(){
  //   this.refresh(true);
  // },
  methods: {
    entrust(row) {
      if (
        row.entrustSign != "0" ||
        row.optStatus != "5" ||
        row.optStatus == "51"
      ) {
        this.$pop({
          type: "danger",
          message: "只有审核通过且未委托或者未过卡的卡口验放凭证才可以委托",
        });
        return;
      } else {
        let token = getToken();
        let userName = this.$store.getters.getUserName;
        let orgId = this.$store.getters.getId;
        let href =
          `${global.PINPINURL}/ep-entrust/list?from=ep&token=` +
          token +
          "&userName=" +
          userName +
          "&orgId=" +
          orgId;
        window.open(href, "_blank");
      }
    },
    reset(e) {
      this.$refs[e].reset();
      this.fixTime = "";
    },
    changeTime() {
      let fixTime = this.fixTime.split(",");
      this.searchForm.before_dclTime = fixTime[1];
      this.searchForm.after_dclTime = fixTime[0];
    },
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.refresh(false);
    },
    handleCurrentChange(val) {
      this.ep_page.page = val;
      this.refresh(false);
    },

    FradioChange() {
      if (this.Fradio) {
        this.radio = "Y";
        this.Sradio = false;
      }
    },
    SradioChange() {
      if (this.Sradio) {
        this.radio = "N";
        this.Fradio = false;
      }
    },
    handleSelectionChange(val) {
      this.selectLength = val.length;
      this.selectItems = val;
    },
    handleRemoteCall(val, oldVal, callback) {
      console.log(val);
      setTimeout(() => {
        if (val === "") {
          this.$post("queryCustom", { page: 1, size: 1000 })
            .then((res) => {
              this.tradeInfo = res.map.data.content;
            })
            .catch((e) => {
              console.log(e);
            });
          callback.done();
        } else if (val.length == 4) {
          this.$post("queryCustom", {
            page: 1,
            size: 1000,
            customCode: parseInt(val),
          })
            .then((res) => {
              this.tradeInfo = res.map.data.content;
            })
            .catch((e) => {
              console.log(e);
            });
          callback.done();
        } else {
          callback.done();
        }
      }, 0);
    },
    searchCallback(json) {
      // 搜索成功回调，做特殊处理在此
      let res = json.map.data.content;
      let res1 = json.map.data;
      if (res1 == null) {
        console.log("1111111", res1);
        this.ep_data = [];
      } else {
        let table_data = [];
        res.forEach(function (item, index) {
          res[index]["link"] = res[index].id;
        });
      }
    },

    doUpdate(row) {
      let vm = this;
      let selectData = [row];
      // if (selectData.length === 0) {
      //   this.$pop({
      //     type: "danger",
      //     message: "请选择一条数据"
      //   });
      //   return;
      // }
      // if (selectData.length > 1) {
      //   this.$pop({
      //     type: "danger",
      //     message: "请选择一条数据"
      //   });
      //   return;
      // }
      if (
        (selectData[0].optStatus == 6 && selectData[0].dclTypecd == 3) ||
        (selectData[0].optStatus == 4 && selectData[0].dclTypecd == 3)
      ) {
        this.$pop({
          type: "danger",
          message: "当前状态无法修改！",
        });
        return;
      }
      if (
        selectData[0].optStatus == 1 ||
        selectData[0].optStatus == 4 ||
        selectData[0].optStatus == 6
      ) {
        //this.loading = true;
        let id = selectData[0].id;
        let data = {};
        data["id"] = id;
        console.log(id);

        let menusList = this.$store.getters.getMenuTabInstance.items;
        menusList.forEach(function (item, index) {
          if (item.link == "/CreditCardReceiptUpdate") {
            menusList.splice(index, 1);
          }
        });
        this.$app.trigger("locate-tab", "CreditCardReceiptUpdate", id);
      } else {
        this.$pop({
          type: "danger",
          message: "当前状态无法修改！",
        });
        return;
      }
    },
    //打印
    doPrint(row) {
      let selectData = [row];
      // if (selectData.length > 10) {
      //   this.$pop({
      //     type: "danger",
      //     message: "最多同时打印10条数据！"
      //   });
      //   return;
      // }
      // if (selectData.length == 0) {
      //   this.$pop({
      //     type: "danger",
      //     message: "请选择一条数据！"
      //   });
      //   return;
      // }
      for (let i = 0; i < selectData.length; i++) {
        if (
          selectData[i].optStatus !== "5" &&
          selectData[i].optStatus !== "51"
        ) {
          this.$pop({
            type: "danger",
            message: "只有审核通过或者已过卡的卡口验放凭证才可以打印",
          });
          return;
        }
      }

      let ids = [];
      selectData.forEach((item) => {
        ids.push(item.id);
      });
      let id = ids.join();
      let token = getToken();
      //   let orgId = localStorage.getLocalStorage("orgIdOri")
      window.location.href =
        global.HOST +
        "/portRelease/pdf?id=" +
        id +
        "&token=" +
        token +
        "&orgId=" +
        this.$store.getters.getId;
    },
    doDelete(row) {
      let selectData = [row];
      // if (selectData.length == 0) {
      //   this.$pop({
      //     type: "danger",
      //     message: "请选择数据"
      //   });
      //   return;
      // }
      if (
        (selectData[0].optStatus == 6 && selectData[0].dclTypecd == 3) ||
        (selectData[0].optStatus == 4 && selectData[0].dclTypecd == 3)
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
              let SasPpBscIds = [];
              selectData.forEach((c) => {
                if (c.id) {
                  SasPpBscIds.push(c.id);
                }
              });
              let data = {};
              data["ids"] = SasPpBscIds;
              this.$post("protReleaseDelete", data)
                .then((responseData) => {
                  this.$pop({
                    type: "success",
                    message: "删除成功",
                  });
                  setTimeout(() => {
                    this.refresh(true);
                  });
                })
                .catch((e) => {
                  this.loading = false;
                });
            } else {
              return;
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
    doInvalid(row, rowId) {
      // let selectData = this.selectItems;
      let selectData = [row];
      if (row.optStatus == "5" || row.optStatus == "51") {
        if (
          (row.inExpType == 3 && row.bindUsedTypecd == 1) ||
          row.inExpType != 3 ||
          (row.inExpType == 7 && row.ieTypecd == "E" && row.isBandPlane == "0")
        ) {
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
                data["bscIds"] = SasPpBscIds;
                this.$post("portUseless", data)
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
    doDeclare(row) {
      let vm = this;
      //let selectData = this.$refs.table.getData("select");
      let selectData = [row];
      // if (selectData.length == 0) {
      //   this.$pop({
      //     type: "danger",
      //     message: "请选择数据"
      //   });
      //   return;
      // }

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

              vm.$post("portReleasedeclare", data)
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
          message: "该状态的卡口验放凭证不能进行确认",
        });
        return;
      }
    },
    // addFlag1() {
    //   if (this.addFlag) {
    //     // console.log('vvvvvvvvvvvvvvvvv')
    //     // this.searchForm.preentNo = "";
    //     // this.doEdit1 = false;
    //   } else {
    //     // console.log("aaaaaaaaaaaaaaaa")
    //     if (this.iswhRecPreentNo) {
    //       this.searchForm.preentNo = this.iswhRecPreentNo;
    //       this.doEdit1 = true;
    //     }
    //   }
    // },
    addOther() {
      this.$router.push({ path: "/CreditCardReceiptAdd" });
    },
    detailInfo(event, row, index) {
      this.$app.trigger("locate-tab", "CreditCardReceiptDtInfo", row.id);
    },
  },

  data() {
    return {
      fixTime: "",
      Fradio: "",
      Sradio: "",
      radio: "Y",
      sureLoading: false,
      allData: "",
      model2: false,
      counter: 0,
      tradeInfo: [],
      model1: false,
      exportStyle: false,
      optType: "1",
      applyLoading: false,
      fileUploadLoading: false,
      loading: false,
      listApi: "portReleasegetList", // 搜索，取api.json里面的key值
      deleteData: "enterpriseDelete",
      //importLoading: false,
      settings: {
        pk: "id", // 主键
      },
      headColor: true,
      searchForm: {
        id: "",
        pid: "",
        orgId: "",
        portNo: "", //凭证编号
        preentNo: "", // 预录入变化
        inExpType: this.searchinExp, //ERP/WMS出入库类型
        businessTypecd: "", //业务类别
        impexpPortcd: "", //进出境关别
        invtIochkptStucd: "", // 进出卡口状态
        rltNo: "",
        optStatus: this.optStatus, // 操作状态
        bindTypecd: "", // 绑定类型
        ieTypecd: "", //进出标志   必填
        bindUsedTypecd: this.bindUsedTypecdStatus || "", // 分送集报标志
        getDtDetail: this.getDetail, // 获取仓单表体数据
        mtpckEndprdTypecd: "",
      },
      bodyForm: {
        id: "",
        pid: "",
        orgId: "",
        portNo: "",
        preentNo: "",
        optStatus: "",
        inExpType: "",
        bindTypecd: "",
        ieTypecd: "",
        mtpckEndprdTypecd: "",
        impexpPortcd: "",
        bizopEtpsNo: "", //经营企业编号
        bizopEtpsNm: "",
        bizopEtpsSccd: "",
        rcvgdEtpsNo: "", //境内收发关企业编号
        bizopEtpsNm: "",
        bizopEtpsSccd: "",
        rcvgdEtpsNo: "",
        masterCuscd: "",
        rcvgdEtpsNm: "",
        dclTime: "",
        vehicleNo: "", //承运车牌号
        vehicleIcNo: "", //17ic卡号
        containerNo: "",
        vehicleWt: "",
        vehicleFrameNo: "",
        vehicleFrameWt: "",
        containerType: "",
        containerWt: "",
        totalWt: "", //24总重量
        passCollectWt: "",
        wtError: "",
        totalGrossWt: "",
        totalNetWt: "", //货物总净重
        portIochkptStucd: "", //29进出卡口状态
        passTime: "",
        secdPassTime: "",
        preRecAccountTime: "",
        recAccountTime: "",
        recAccountFlag: "",
        bindUsedTypecd: "",
        inExpWhNo: "",
        inExpTime: "",
        optStatus: "", //38操作状态
        rmk: "", //备注
      },
      // bizopEtpsSccd: "",//经营单位社会信用代码
      // portIochkptStucd:''//进出卡口状态
      selectLength: 0,
      selectItems: [],
      totalcount: 0,
      doEdit: false,
      doEdit1: false,
      ep_page: {
        // 分页
        size: 10,
        page: 1,
      },
      uploadData: {
        businessType: "port",
        sysCode: "lgsa",
      },
      ep_data: [], //表格数据
    };
  },
};
</script>

<style></style>
