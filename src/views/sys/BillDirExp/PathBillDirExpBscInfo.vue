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
            <!-- 原name-width=“150px” 未防止自主声明超长改为200 -->
            <ep-form ref="searchForm" :form="searchForm" name-width="138px">
              <ep-row :gutter="7">
                <ep-col :col="8">
                  <ep-form-item label="径予放行自主声明编号" attr="billExpNo">
                    <ep-input v-model="searchForm.billExpNo" name="billExpNo"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="自主声明申请单编号" attr="orderNo">
                    <ep-input v-model="searchForm.orderNo" name="orderNo"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="提运单号" attr="billLodNo">
                    <ep-input v-model="searchForm.billLodNo" name="billLodNo"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="英文船名" attr="shipNameEn">
                    <ep-input v-model="searchForm.shipNameEn" name="shipNameEn"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="航次" attr="voyageNo">
                    <ep-input v-model="searchForm.voyageNo" name="voyageNo"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="运输方式" attr="trspModecd">
                    <ep-select v-model="searchForm.trspModecd" name="trspModecd" filterable>
                      <ep-select-item :index="1" label="海运"></ep-select-item>
                      <ep-select-item :index="2" label="空运"></ep-select-item>
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
                <ep-col :col="8" v-show="searchType">
                  <ep-form-item label="状态" attr="optStatus">
                    <ep-select v-model="searchForm.optStatus" name="optStatus">
                      <ep-select-item index="1" label="暂存"></ep-select-item>
                      <ep-select-item index="18" label="已确认"></ep-select-item>
                      <ep-select-item index="3" label="海关入库成功"></ep-select-item>
                      <ep-select-item index="4" label="海关入库失败"></ep-select-item>
                      <ep-select-item index="5" label="审核通过"></ep-select-item>
                      <ep-select-item index="6" label="审核拒绝"></ep-select-item>
                      <ep-select-item index="17" label="待审核"></ep-select-item>
                      <ep-select-item index="603" label="作废入库成功"></ep-select-item>
                      <ep-select-item index="604" label="作废入库失败"></ep-select-item>
                      <ep-select-item index="605" label="作废审核通过"></ep-select-item>
                      <ep-select-item index="606" label="作废审核拒绝"></ep-select-item>
                      <ep-select-item index="618" label="作废已确认"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="12">
                  <ep-form-item label="确认时间" attr="dclTime">
                    <ep-date-range v-model="searchForm.dclTime" name="dclTime" type="dateTime"></ep-date-range>
                  </ep-form-item>
                </ep-col>
              </ep-row>
              <ep-row :gutter="7">
                <ep-col :col="24">
                  <!-- <ep-button type="warning" size="small" icon="refresh" @click="reset('searchForm')">重置</ep-button>
                  <ep-button type="primary" size="small" @click="refresh(true)" icon="search" :loading="loading">查询</ep-button>-->
                  <WmsButton v-if="searchType" @click="addOther">新增</WmsButton>
                  <WmsButton @click="reset('searchForm')">重置</WmsButton>
                  <WmsButton :loading="loading" @click="refresh(true)">查询</WmsButton>
                  <file-upload v-if="searchType" :uploadData="uploadData" :uploadType="1" />
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
            <div v-show="searchType">
              <!-- <ep-button type="primary" size="small" @click="doUpdate" icon="edit">修改</ep-button>
              <ep-button type="danger" size="small" @click="doDelete" icon="trash-a">删除</ep-button>
              <ep-button type="primary" size="small" @click="doDeclare" icon="checkmark-round">确认</ep-button>

              <ep-button type="primary" size="small" @click="doModify" icon="arrow-swap">变更</ep-button>
              <ep-button type="primary" size="small" @click="doInvalid" icon="close">作废</ep-button>

              <ep-button type="success" size="small" @click="doPrint" icon="printer">打印</ep-button>
              <ep-button type="info" size="small" @click="dataFollowing" icon="eye">货物详情</ep-button>
              <file-upload :uploadData="uploadData" :uploadType="1" />-->
            </div>

            <!--<span style="color:red;font-size:25px;position:absolute;padding-top:8px;padding-left:3px;">*</span>
            <span style="padding-top: 10px;padding-left: 13px;position: absolute;font-size: 4px;color: rgba(0,0,0,.87);">双击列表信息，可进入详情页面</span>-->
          </div>

          <div class="block">
            <ep-table border ref="table" :height="400" :data="ep_data" :head-color="headColor" @selection-change="handleSelectionChange">
              <ep-table-item v-if="!searchType" type="select"></ep-table-item>
              <ep-table-item v-if="searchType" column="opt" title="操作" width="200">
                <template slot-scope="props">
                  <wms-icon type="edit" @click="doUpdate(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="cancel" @click="doDelete(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="confirm" @click="doDeclare(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="void" @click="doInvalid(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="print" @click="doPrint(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="detail" @click="detailInfo($event,props.row)"></wms-icon>
                  <!-- <wms-icon type="change" @click="doModify(props.row,props.row.id)"></wms-icon> -->
                  <wms-icon type="goods" @click="dataFollowing(props.row,props.row.id)"></wms-icon>
                </template>
              </ep-table-item>
              <ep-table-item column="billExpNo" title="径予放行自主声明编号" width="200"></ep-table-item>
              <ep-table-item column="orderNo" title="自主声明申请单编号" width="200"></ep-table-item>
              <!-- <ep-table-item column="dclTypecd" title="申报类型" width="120" :formatter="optDclTypecdFormatter"></ep-table-item> -->
              <ep-table-item column="optStatus" title="状态" :formatter="optStatusFormatter" width="130"></ep-table-item>
              <ep-table-item column="isRltInexp" title="是否关联出入库" :formatter="isRltInexpFormatter" width="180"></ep-table-item>
              <ep-table-item column="col1" title="已出运状态" :formatter="col1Formatter" width="130"></ep-table-item>
              <ep-table-item column="masterCuscd" title="主管海关" width="150" :formatter="masterCuscdFormatter"></ep-table-item>
              <ep-table-item column="billLodNo" title="提运单号" width="200"></ep-table-item>
              <ep-table-item column="shipNameEn" title="英文船名" width="150"></ep-table-item>
              <ep-table-item column="voyageNo" title="航次" width="100"></ep-table-item>
              <ep-table-item column="grossWt" title="毛重" width="180"></ep-table-item>
              <ep-table-item column="dclQty" title="件数" width="180"></ep-table-item>
              <ep-table-item column="mtpckEndprdTypecd" title="料件、成品标志" width="150" :formatter="mtpckEndprdTypecdFormatter"></ep-table-item>
              <ep-table-item column="trspModecd" title="运输方式" :formatter="trspModecdFormatter" width="130"></ep-table-item>
              <ep-table-item column="dclTime" title="申报时间" width="220"></ep-table-item>
              <ep-table-item column="passTime" title="过卡时间" width="220"></ep-table-item>
              <ep-table-item column="type" title="申报类型" width="150" :formatter="declareFormatter"></ep-table-item>
              <ep-table-item column="hazardousConfirm" title="危禁品确认标志" width="180" :formatter="hazardousConfirmFormatter"></ep-table-item>
              <!--<ep-table-item column="hazardous" title="危禁品" width="160"></ep-table-item>-->
              <ep-table-item column="supvModecd" title="监管方式" :formatter="supvModecdFormatter" width="200"></ep-table-item>
              <!-- <ep-table-item column="proxyOrgId" title="代理组织ID" width="180"></ep-table-item> -->
              <!-- <ep-table-item column="involveConfirm" title="是否涉证涉检" :formatter="involveConfirmFormatter" width="180"></ep-table-item> -->
              <!-- <ep-table-item column="passportUsedTypecd" width="150" title="核放单绑定标志" :formatter="passportUsedTypecdFormatter"></ep-table-item> -->
              <!-- <ep-table-item column="agreeConfirm" width="150" title="是否承诺货物符合径予放行条件" :formatter="agreeConfirmFormatter"></ep-table-item> -->

              <!--<ep-table-item column="rcvgdEtpsno" title="收发货人代码" width="180"></ep-table-item>
              <ep-table-item column="rvsngdEtpsSccd" title="收发货人社会信用代码" width="200"></ep-table-item>
              <ep-table-item column="rcvgdEtpsNm" title="收发货人名称" width="180"></ep-table-item>
              <ep-table-item column="dclEtpsno" title="申报单位代码" width="180"></ep-table-item>
              <ep-table-item column="dclEtpsSccd" title="申报单位社会信用代码" width="180"></ep-table-item>
              <ep-table-item column="dclEtpsNm" title="申报单位名称" width="180"></ep-table-item>-->
              <ep-table-item column="rmk" title="备注" width="350">
                <template slot-scope="props">
                  <p class="rmk-style">{{props.row.rmk}}</p>
                </template>
              </ep-table-item>
            </ep-table>
          </div>
          <ep-model title="提示:" v-model="model2" width="500px">
            <span>是否作废所选条目信息?</span>

            <div class="block" style="text-align:center">
              <!-- <ep-button type="danger" @click="doInvalidCalcle">取消</ep-button>
              <ep-button type="primary" @click="doInvalidConfirm">确定</ep-button>-->
              <WmsButton @click="doInvalidCalcle">取消</WmsButton>
              <WmsButton @click="doInvalidConfirm">确定</WmsButton>
            </div>
          </ep-model>
          <div class="block">
            <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
          </div>
        </div>
      </div>
    </div>
    <ep-model title="货物详情" v-model="model1" moveable>
      <div class="block" v-if="model1">
        <ep-table border ref="table" :height="400" :data="ep_data2" :head-color="headColor" @selection-change="handleSelectionChange" @row-dblclick="detailInfo">
          <!-- <ep-table-item type="select"></ep-table-item> -->
          <ep-table-item column="stockBillNo" title="ERP/WMS出入库单编号" width="200"></ep-table-item>
          <ep-table-item column="stockBillType" title="出入库单进出类型" :formatter="stockBillTypeFormatter" width="200"></ep-table-item>
          <ep-table-item column="stockType" title="库存类型" :formatter="stockTypeFormatter" width="150"></ep-table-item>
          <!--
                    <ep-table-item column="billType" title="出入库类型" :formatter="billTypeFormatter" width="150"></ep-table-item>
          -->
          <ep-table-item column="businessType" title="业务类别" :formatter="businessTypeFormatter" width="150"></ep-table-item>
          <ep-table-item column="copGNo" title="商品料号" width="170"></ep-table-item>
          <!--
                    <ep-table-item column="hsCode" title="商品编码" width="150"></ep-table-item>
          -->
          <ep-table-item column="ciqCode" title="商检编码" width="150"></ep-table-item>
          <ep-table-item column="gName" title="商品名称" width="200"></ep-table-item>
          <ep-table-item column="gModel" title="商品规格型号" width="200"></ep-table-item>
          <ep-table-item column="gQty" title="数量" width="100"></ep-table-item>
          <ep-table-item column="gUnit" title="数量单位" :formatter="gUnitFormatter" width="100"></ep-table-item>
          <ep-table-item column="qty1" title="法定数量" width="150"></ep-table-item>
          <ep-table-item column="unit1" title="法定单位" width="100" :formatter="unit1Formatter"></ep-table-item>
          <ep-table-item column="qty2" title="法定第二数量" width="150"></ep-table-item>
          <ep-table-item column="unit2" title="法定第二计量单位" width="180" :formatter="unit2Formatter"></ep-table-item>
          <ep-table-item column="tradeCurr" title="币制" width="100" :formatter="tradeCurrFormatter"></ep-table-item>
          <!--
                    <ep-table-item column="unitPrice" width="120" title="单价"></ep-table-item>
          -->
          <!--<ep-table-item column="tradeTotal" width="120" title="总价"></ep-table-item>-->
          <ep-table-item column="transMode" title="成交方式" width="100" :formatter="transModeFormatter"></ep-table-item>
          <ep-table-item column="actrualStockDate" title="实际出入库时间" width="200"></ep-table-item>
        </ep-table>

        <!--<div class="block">
          <ep-pager right @size-change="handleSizeChange1" @change="handleCurrentChange1" :now-page="ep_page1.page" :page-size="ep_page1.size" :total-num="totalcount1"></ep-pager>
        </div>-->
        <CustomPager v-if="model3" @size-change="handleSizeChange1" @change="handleCurrentChange1" :ep_data="ep_data2" v-bind:nowPage="ep_page1.page" v-bind:pageSize="ep_page1.size"></CustomPager>
        <!-- <div class="block">
          <ep-pager right @size-change="handleSizeChange1" @change="handleCurrentChange1" :now-page="ep_page1.page" :page-size="ep_page1.size" :total-num="totalcount1"></ep-pager>
        </div>-->
      </div>
    </ep-model>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import { getToken } from "utils";
import fileUpload from "src/components/FileUpload";

export default {
  name: "PathBillDirExpBscInfo",
  extends: misList, // 务必继承
  components: {
    fileUpload,
  },
  props: {
    searchType: {
      default: true,
    },
    optStatus: {
      default: "",
    },
    bindTypecd: {
      default: "",
    },
    mtpckEndprdTypecd: {
      // 料件成品标志
      default: "",
    },
  },
  created() {},
  mounted() {
    // if (!this.searchType) {
    //   this.refresh();
    // }
    this.refresh();
  },
  computed: {
    trspInfo() {
      return this.$store.getters.getTransfList;
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
    bindTypecd: {
      // 绑定类型改变
      handler(newData, oldData) {
        this.searchForm.bindTypecd = newData;
        if (!this.searchType) {
          this.refresh();
        }
      },
    },
    model1(val) {
      if (!val) {
        setTimeout(() => {
          this.model3 = false;
          this.ep_page1.size = 10;
          this.ep_page1.page = 1;
        }, 1000);
      } else {
        this.model3 = val;
      }
    },
    exportStyle(e) {
      if (!e) {
        this.optType = "1";
      }
    },
  },
  methods: {
    mtpckEndprdTypecdFormatter(row, index) {
      if (row.mtpckEndprdTypecd == "I") {
        return "料件";
      } else if (row.mtpckEndprdTypecd == "E") {
        return "成品";
      } else if (row.mtpckEndprdTypecd == "S") {
        return "设备";
      } else if (row.classifyType == "L") {
        return "边角料";
      } else if (row.classifyType == "D") {
        return "残次品";
      }
    },
    optDclTypecdFormatter(row) {
      if (row.dclTypecd == "1") {
        return "备案";
      } else if (row.dclTypecd == "2") {
        return "变更";
      } else if (row.dclTypecd == "3") {
        return "作废";
      }
    },
    addOther() {
      // this.$app.trigger("add-new-tab", "BillDirExpDtAdd");
      this.$router.push({
        path: "/BillDirExpDtAdd",
      });
    },
    //货物详情
    dataFollowing(row, rowId) {
      // let selectData = this.selectItems;
      if (row) {
        let selectData = [row];
        this.selectItems = selectData;
      }
      // if (this.selectItems.length !== 1) {
      //   this.$pop({
      //     type: "danger",
      //     message: "请选择一条数据"
      //   });
      //   return;
      // }
      this.ep_data2 = [];
      if (this.selectItems[0].optStatus == "5") {
        // this.ep_data2=[]
        /* let data = {};
              let id = this.selectItems[0].id;
              data["id"] = id;
              this.$post("getStockListExp", data)
                .then(responseData => {
                  this.ep_data2 = responseData.map.data;
                })
                .catch(e => {
                });*/
        this.model1 = true;
        let enterpriseInfo = this.$store.getters.getCreditCode;
        let data = {};
        let id = this.selectItems[0].id;
        data["id"] = id;
        data["creditCode"] = enterpriseInfo;
        data["page"] = this.ep_page1.page;
        data["size"] = this.ep_page1.size;
        this.$post("getStockListExp", data)
          .then((responseData) => {
            this.ep_data2 = responseData.map.data.reqData.dataList;
            // this.totalcount1 = parseInt(responseData.map.data.pageCount);
            // this.totalcount1 = responseData.map.data.reqData.dataList.length;
          })
          .catch((e) => {});
      } else {
        this.$pop({
          type: "danger",
          message: "非审核通过不能查询",
        });
        return;
      }
    },
    //出入库单进出类型
    stockBillTypeFormatter(row, index) {
      if (row.stockBillType == "1") {
        return "进库";
      } else if (row.stockBillType == "2") {
        return "出库";
      } else {
        return "未知";
      }
    },
    //库存类型
    stockTypeFormatter(row, index) {
      if (row.stockType == "1") {
        return "保税";
      } else if (row.stockType == "2") {
        return "非保";
      } else {
        return "未知";
      }
    },
    //出入库类型
    /*billTypeFormatter(row,index){
        if (row.billType == "1") {
          return "一线";
        } else if (row.billType == "2") {
          return "二线";
        } else if (row.billType == "3") {
          return "区内";
        } else if (row.billType == "4") {
          return "区间";
        }else {
          return "未知";
        }
      },*/
    //业务类别
    businessTypeFormatter(row, index) {
      if (row.businessType == "1") {
        return "区内用途中转";
      } else if (row.businessType == "2") {
        return "集拼";
      } else if (row.businessType == "3") {
        return "存储";
      } else if (row.businessType == "4") {
        return "加工";
      } else if (row.businessType == "5") {
        return "交易";
      } else if (row.businessType == "6") {
        return "展示";
      } else if (row.businessType == "7") {
        return "研发";
      } else if (row.businessType == "8") {
        return "再制造";
      } else if (row.businessType == "9") {
        return "检测维修";
      } else if (row.businessType == "10") {
        return "其他";
      } else {
        return "未知";
      }
    },
    //数量单位
    gUnitFormatter(row, index) {
      let unitList = this.$store.getters.getUnitList;
      for (let i = 0; i < unitList.length; i++) {
        if (row.gUnit == unitList[i].unit) {
          return unitList[i].unitName;
        }
      }
    },
    unit1Formatter(row, index) {
      let unitList = this.$store.getters.getUnitList;
      for (let i = 0; i < unitList.length; i++) {
        if (row.unit1 == unitList[i].unit) {
          return unitList[i].unitName;
        }
      }
    },
    unit2Formatter(row, index) {
      let unitList = this.$store.getters.getUnitList;
      for (let i = 0; i < unitList.length; i++) {
        if (row.unit2 == unitList[i].unit) {
          return unitList[i].unitName;
        }
      }
    },
    //币制
    tradeCurrFormatter(row, index) {
      let currList = this.$store.getters.getCurrList;
      for (let i = 0; i < currList.length; i++) {
        if (row.tradeCurr == currList[i].currSymb) {
          return currList[i].currName;
        }
      }
    },
    //成交方式
    transModeFormatter(row, index) {
      let transModeList = this.$store.getters.getTransacList;
      for (let i = 0; i < transModeList.length; i++) {
        if (row.transMode == transModeList[i].transMode) {
          return transModeList[i].transSpec;
        }
      }
    },
    reset(el) {
      this.$refs[el].reset();
      this.fixTime = "";
    },
    handleSelectionChange(val) {
      this.selectLength = val.length;
      this.selectItems = val;
    },
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.refresh(false);
    },
    handleCurrentChange(val) {
      this.ep_page.page = val;
      this.refresh(false);
    },
    handleSizeChange1(val) {
      if (val) {
        this.ep_page1.size = val;
        this.ep_page1.page = 1;
        this.dataFollowing();
      }
    },
    handleCurrentChange1(val) {
      this.ep_page1.page = val;
      this.dataFollowing();
    },
    // 是否关联出入库单证
    isRltInexpFormatter(row) {
      if (row.isRltInexp == 1) {
        return "已关联";
      } else {
        return "未关联";
      }
    },
    //运输方式
    trspModecdFormatter(row, index) {
      if (row.trspModecd == "1") {
        return "海运";
      } else if (row.trspModecd == "2") {
        return "空运";
      } else {
        return "未知";
      }
    },
    //监管方式
    supvModecdFormatter(row, index) {
      let tradeModeList = this.$store.getters.getTradeModeList;
      for (let i = 0; i < tradeModeList.length; i++) {
        if (row.supvModecd == tradeModeList[i].tradeMode) {
          return tradeModeList[i].abbrTrade;
        }
      }
    },
    //主管海关
    masterCuscdFormatter(row, index) {
      let tradeMasterCuscd = this.$store.getters.getCustomList;
      for (let i = 0; i < tradeMasterCuscd.length; i++) {
        if (row.masterCuscd == tradeMasterCuscd[i].customCode) {
          return tradeMasterCuscd[i].customName;
        }
      }
    },
    //申报类型
    declareFormatter(row, index) {
      if (row.type == "0") {
        return "自主申报";
      } else if (row.type == "1") {
        return "委托申报";
      } else {
        return "未知";
      }
    },
    //是否涉险
    involveConfirmFormatter(row, index) {
      if (row.involveConfirm == "1") {
        return "涉证";
      } else if (row.involveConfirm == "2") {
        return "涉检";
      } else if (row.involveConfirm == "3") {
        return "涉证涉检";
      } else {
        return "均不涉";
      }
    },
    //核放单生成标准
    passportUsedTypecdFormatter(row, index) {
      if (row.passportUsedTypecd == "0") {
        return "未生成";
      } else if (row.passportUsedTypecd == "1") {
        return "已生成";
      }
    },
    //是否承诺货物符合径予放行条件
    agreeConfirmFormatter(row, index) {
      if (row.agreeConfirm == "2") {
        return "否";
      } else if (row.agreeConfirm == "1") {
        return "是";
      }
    },
    // 已出运状态
    col1Formatter(row, index) {
      if (row.col1 == "20") {
        return "待出运";
      } else if (row.col1 == "22") {
        return "已出运";
      }
    },
    //状态
    optStatusFormatter(row, index) {
      if (row.optStatus == "99") {
        return "已删除";
      } else if (row.optStatus == "1") {
        return "暂存";
      } else if (row.optStatus == "18") {
        return "已确认";
      } else if (row.optStatus == "3") {
        return "海关入库成功";
      } else if (row.optStatus == "4") {
        return "海关入库失败";
      } else if (row.optStatus == "5") {
        return "审核通过";
      } else if (row.optStatus == "6") {
        return "审核拒绝";
      } else if (row.optStatus == "17") {
        return "待审核";
      } else if (row.optStatus == "505") {
        return "变更成功";
      } else if (row.optStatus == "506") {
        return "变更拒绝";
      } else if (row.optStatus == "606") {
        return "作废审核拒绝";
      } else if (row.optStatus == "501") {
        return "变更暂存";
      } else if (row.optStatus == "503") {
        return "变更入库成功";
      } else if (row.optStatus == "504") {
        return "变更入库失败";
      } else if (row.optStatus == "518") {
        return "变更已确认";
      } else if (row.optStatus == "605") {
        return "作废审核通过";
      } else if (row.optStatus == "601") {
        return "作废暂存";
      } else if (row.optStatus == "603") {
        return "作废入库成功";
      } else if (row.optStatus == "604") {
        return "作废入库失败";
      } else if (row.optStatus == "517") {
        return "待审核";
      } else if (row.optStatus == "617") {
        return "待审核";
      } else if (row.optStatus == "618") {
        return "作废已确认";
      } else if (row.optStatus == "7") {
        return "审核退单";
      } else if (row.optStatus == "101") {
        return "单证绑定";
      } else if (row.optStatus == "103") {
        return "单证解绑";
      } else if (row.optStatus == "104") {
        return "单证过卡";
      } else if (row.optStatus == "19") {
        return "转人工";
      } else if (row.optStatus == "22") {
        return "已出运";
      } else if (row.optStatus == "20") {
        return "待出运";
      } else {
        return "未知";
      }
    },
    //危禁品确认标志
    hazardousConfirmFormatter(row, index) {
      if (row.hazardousConfirm == "1") {
        return "是";
      } else if (row.hazardousConfirm == "2") {
        return "否";
      } else {
        return "未知";
      }
    },
    //删除
    doDelete(row, rowId) {
      // let selectData = this.selectItems;
      let selectData = [row];

      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
        return;
      }
      if (
        selectData[0].optStatus == "1" ||
        selectData[0].optStatus == "4" ||
        selectData[0].optStatus == "6" ||
        selectData[0].optStatus == "501" ||
        selectData[0].optStatus == "506" ||
        selectData[0].optStatus == "504" ||
        selectData[0].optStatus == "601" ||
        selectData[0].optStatus == "604" ||
        selectData[0].optStatus == "606"
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
              let data = {};
              data["bscIds"] = bscIds;
              this.$post("deletePathBillDirExpBscInfoGetList", data)
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
          message: "该径予放行货物自主声明无法删除，请选择其他状态",
          // message:
          //   "该径予放行货物自主声明无法删除，请选择状态为暂存、入库失败、审核拒绝、变更拒绝、变更暂存、作废暂存、作废拒绝、海关变更入库失败状态下的径予放行货物自主声明"
        });
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
        let id = selectData[0].id;
        let data = {};
        data["id"] = id;
        this.$post("queryModifyGetByIdExp", data)
          .then((responseData) => {
            console.log(responseData);
            if ("1" === responseData.status) {
              //                //如果通过数据校验的话进行跳转
              this.$app.trigger("locate-tab", "BillDirExpDtModify", id);
            } else {
              //  不做处理
              this.$pop({
                type: "danger",
                message: responseData.note,
              });
            }
          })
          .catch((e) => {
            //网络发送异常
            this.$pop({
              type: "danger",
              message: e.note,
            });
          });
      } else {
        this.$pop({
          type: "danger",
          message: "审核未通过，不允许变更！",
        });
        return;
      }
    },
    //作废按钮
    doInvalid(row, rowId) {
      // let selectData = this.selectItems;
      let selectData = [row];
      this.selectItems = [row];
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
        return;
      }
      if (row.optStatus == 5 || row.optStatus == 18 || row.optStatus == 606) {
        this.model2 = true;
      } else {
        this.$pop({
          type: "danger",
          message: "当前状态无法作废！",
        });
      }
    },

    //作废取消
    doInvalidCalcle() {
      this.model2 = false;
    },

    //作废确认
    doInvalidConfirm() {
      let selectData = this.selectItems;
      if (selectData.length !== 1) {
        this.$pop({
          type: "danger",
          message: "请只选择一条数据",
        });
        return;
      }
      //判断未过卡的，未绑定到卡口核放凭证的，可以进行作废操作。
      //参数传递
      let data = {};
      data["id"] = this.selectItems[0].id;
      //真正执行作废
      this.$post("billDirExpDtInvalid", data)
        .then((responseData) => {
          //作废完成
          if ("1" === responseData.status) {
            this.$pop({
              type: "success",
              message: responseData.note,
            });
          } else {
            // 作废异常弹窗提醒后端数据
            this.$pop({
              type: "danger",
              message: responseData.note,
            });
          }
          this.model2 = false;
        })
        .catch((e) => {
          //网络发送异常
          this.$pop({
            type: "danger",
            message: e.note,
          });
          this.model2 = false;
        });
    },

    //修改
    doUpdate(row, rowId) {
      // let selectData = this.selectItems;
      let selectData = [row];
      if (selectData.length !== 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
        return;
      }
      /*if (selectData[0].optStatus == "18") {
          this.$pop({
            type: "danger",
            message: "已确认单证，不能修改"
          });
          return;
        }
        if (selectData[0].optStatus == "99") {
          this.$pop({
            type: "danger",
            message: "已删除单证，不能修改"
          });
          return;
        }*/
      if (
        selectData[0].optStatus == "1" ||
        selectData[0].optStatus == "4" ||
        selectData[0].optStatus == "6" ||
        selectData[0].optStatus == "501" ||
        selectData[0].optStatus == "506" ||
        selectData[0].optStatus == "504" ||
        selectData[0].optStatus == "601"
      ) {
        let id = selectData[0].id;
        let data = {};
        data["id"] = id;
        this.$app.trigger("locate-tab", "BillDirExpDtUpdate", id);
      } else {
        this.$pop({
          type: "danger",
          message: "请选择其他状态下的径予放行货物自主声明进行修改",
          // message:
          //   "只有暂存、入库失败、审核拒绝、变更拒绝、变更暂存、作废暂存、作废拒绝、海关变更入库失败状态下的径予放行货物自主声明可以修改"
        });
        return;
      }
      /*if (selectData[0].dclTypecd == "3") {
          if (selectData[0].optStatus == "6") {
            this.$pop({
              type: "danger",
              message: "结案审核拒绝，请重新发起结案申报或删除该单证"
            });
            return;
          } else {
            this.$pop({
              type: "danger",
              message: "申报类型为结案，不能修改"
            });
            return;
          }
        }

        if (selectData[0].optStatus == "5") {
          this.$pop({
            type: "danger",
            message: "已审核通过单证，不能修改"
          });
          return;
        }*/
    },
    // 申报
    doDeclare(row, rowId) {
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
        selectData[0].optStatus == "1" ||
        selectData[0].optStatus == "501" ||
        selectData[0].optStatus == "601"
      ) {
        if (selectData[0].hazardousConfirm == "1") {
          this.$pop({
            type: "danger",
            message: "危险品和危化品无法申报",
          });
          return;
        }
        let ids = [];
        selectData.forEach((c) => {
          if (c.id) {
            ids.push(c.id);
          }
        });
        let data = {};
        data["ids"] = ids;

        this.$confirm({
          word: "是否要确认申报？",
          callback(info) {
            if (info) {
              vm.declareLoading = true;
              vm.$post("billDirExpDtDeclare", data)
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
          message: "非暂存、变更暂存、作废暂存的径予放行货物自主声明不能申报",
        });
        return;
      }
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
          message: "最多可打印10条单证",
        });
        return;
      }
      for (let i = 0; i < selectData.length; i++) {
        if (selectData[i].optStatus != "5") {
          this.$pop({
            type: "danger",
            message: "只有审核通过的径予放行货物自主声明才可以打印",
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
      window.location.href =
        global.HOST +
        "/billDirBsc/billDirExpBscPDF?id=" +
        id +
        "&token=" +
        token;
    },
    detailInfo(event, row, index) {
      this.$app.trigger("locate-tab", "BillDirExpDtInfo", row.id);
    },
  },
  data() {
    return {
      uploadData: {
        businessType: "billDirExp",
        sysCode: "lgsa",
      },
      counter: 0,
      model3: false,
      tradeInfo: [],
      fileUploadLoading: false,
      loading: false,
      listApi: "pathBillDirExpBscInfoGetList", // 搜索，取api.json里面的key值
      deleteData: "enterpriseDelete",
      exportStyle: false,
      optType: "1",
      model1: false,
      model2: false,
      settings: {
        pk: "id", // 主键
      },
      searchForm: {
        trspModecd: "",
        billExpNo: "",
        optStatus: this.optStatus,
        billLodNo: "",
        orderNo: "",
        shipNameEn: "",
        voyageNo: "",
        carryWay: "",
        dclTime: "",
        bindTypecd: this.bindTypecd,
        mtpckEndprdTypecd: "",
        // boundFlag: this.searchType == false ? "0" : ""
      },
      headForm: {
        dclTime: "",
      },
      orgId: this.$store.getters.getId,
      orgCode: this.$store.getters.getOrgCode,
      masterCuscd: this.$store.getters.getOrgCustomId,

      rvsngdEtpsSccd: this.$store.getters.getOrgCreditCode, //收发货人社会信用代码
      rcvgdEtpsno: this.$store.getters.getOrganizationCode, //收发货人代码========
      rcvgdEtpsNm: this.$store.getters.getOrganizationName, //收发货人名称
      dclEtpsSccd: this.$store.getters.getCreditCode, //申报单位社会信用代码
      dclEtpsno: this.$store.getters.getTradeCode, //申报单位代码
      dclEtpsNm: this.$store.getters.getTradeName, //申报单位名称

      bizopEtpsSccd: this.$store.getters.getCreditCode, //经营企业信用代码
      bizopEtpsno: this.$store.getters.getTradeCode, //经营企业编号
      bizopEtpsNm: this.$store.getters.getTradeName, //经营企业名称
      headColor: true,
      selectLength: 0,
      selectItems: [],
      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1,
      },
      totalcount1: 0,
      ep_page1: {
        // 分页
        size: 10,
        page: 1,
      },
      ep_data: [], //表格数据
      ep_data2: [],
    };
  },
};
</script>

<style scoped>
</style>
