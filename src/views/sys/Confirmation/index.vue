<template>
  <div class="panel-main-content main-in-style">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="card-title zero-padding">
          <span class="weight">出入库查询</span>
        </div>
        <ep-form ref="searchForm" :form="searchForm" name-width="168px" :rules="page_rules">
          <ep-row :gutter="7">
            <ep-col :col="8">
              <ep-form-item attr="stockBillType" label="进出库标志">
                <ep-select
                  v-model="searchForm.stockBillType"
                  name="stockBillType"
                  :disabled="this.$route.query.stockBillType?true:false"
                >
                  <!-- <div v-if="this.$route.query.stockBillType">
                    <ep-select-item index="1" label="进库"></ep-select-item>
                    <ep-select-item index="2" label="出库"></ep-select-item>
                  </div>-->
                  <ep-select-item index="1" label="进库"></ep-select-item>
                  <ep-select-item index="2" label="出库"></ep-select-item>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="billType" label="出入库类型">
                <ep-select
                  v-model="searchForm.billType"
                  name="billType"
                  :disabled="(this.$route.query.businessType=='bill'||this.$route.query.businessType=='port')?true:false"
                >
                  <div v-if="this.$route.query.businessType=='bill'">
                    <ep-select-item index="5" label="径予"></ep-select-item>
                  </div>
                  <div v-else-if="this.$route.query.businessType=='port'">
                    <ep-select-item index="6" label="分送集报"></ep-select-item>
                  </div>
                  <div v-else-if="this.$route.query.businessType=='wareHouse'">
                    <ep-select-item index="1" label="一线"></ep-select-item>
                    <ep-select-item index="2" label="二线"></ep-select-item>
                    <ep-select-item index="3" label="区内"></ep-select-item>
                    <ep-select-item index="4" label="区间"></ep-select-item>
                    <ep-select-item index="1,2,3,4" label=" " style="display:none"></ep-select-item>
                  </div>
                  <div v-else>
                    <ep-select-item index="1" label="一线"></ep-select-item>
                    <ep-select-item index="2" label="二线"></ep-select-item>
                    <ep-select-item index="3" label="区内"></ep-select-item>
                    <ep-select-item index="4" label="区间"></ep-select-item>
                    <ep-select-item index="5" label="径予"></ep-select-item>
                    <ep-select-item index="6" label="分送集报"></ep-select-item>
                  </div>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item label="时间" attr="valueDate">
                <ep-date-range v-model="fixTime" @change="changeTime"></ep-date-range>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item label="ERP/WMS预出入库单编号" attr="stockBillNoPre" title="ERP/WMS预出入库单编号">
                <ep-input v-model="searchForm.stockBillNoPre" name="stockBillNoPre"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item label="提运单号" attr="billNo">
                <ep-input v-model="searchForm.billNo" name="billNo"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item label="客户订单号" attr="orderNo">
                <ep-input v-model="searchForm.orderNo" name="orderNo"></ep-input>
              </ep-form-item>
            </ep-col>
          </ep-row>
          <ep-row :gutter="7">
            <ep-col :col="24">
              <ep-button type="warning" size="small" icon="refresh" @click="reset('searchForm')">重置</ep-button>
              <!-- getData  refresh(true) -->
              <ep-button
                type="primary"
                size="small"
                @click="getData"
                icon="search"
                :loading="loading"
              >查询</ep-button>
            </ep-col>
          </ep-row>
        </ep-form>
      </div>
    </div>

    <div class="ep-card card-margin relative">
      <div class="card-body">
        <div class="block">
          <div style="background:#fff;">
            <div
              style="display:flex;justify-content: flex-end;align-items:center;padding-right:20px"
            >
              <ep-button
                v-if="this.$route.query.undisabled"
                type="success"
                @click="generateDrop($route.query.undisabled)"
              >生成</ep-button>
              <ep-dropdown
                @item-click="generateDrop"
                position="right"
                style="margin-right:10px;margin-top: 2px;"
                v-else
              >
                <ep-button slot="item" type="text" size="small" icon="arrow-down-b" right-icon>生成</ep-button>
                <!-- <div>
                  <ep-dropdown-item v-if="this.$route.query.undisabled==1" item-key="1">进出区提发货凭证</ep-dropdown-item>
                  <ep-dropdown-item v-if="this.$route.query.undisabled==2" item-key="2">径予放行自主声明</ep-dropdown-item>
                  <ep-dropdown-item v-if="this.$route.query.undisabled==3" item-key="3">卡口验放凭证(分送集报)</ep-dropdown-item>
                </div>-->
                <!-- <div> -->
                <ep-dropdown-item item-key="1">进出区提发货凭证</ep-dropdown-item>
                <ep-dropdown-item item-key="2">径予放行自主声明</ep-dropdown-item>
                <ep-dropdown-item item-key="3">卡口验放凭证(分送集报)</ep-dropdown-item>
                <!-- </div> -->
              </ep-dropdown>
              <ep-button type="danger" @click="eliminate1">重置</ep-button>
              <ep-switch v-model="format" on-text="横向" off-text="纵向"></ep-switch>
            </div>
            <div class="drag-box" :class="format?'':'drag-box1'">
              <!-- <div> -->

              <div class="drag-box-item1">
                <!-- <div class="button-style">
                  <ep-button type="success" @click="hearderDelete">整体移动</ep-button>
                </div>-->
                <div class="item-title">
                  出入库单号
                  <div>
                    <span style="color:red;font-size:25px;position:absolute;">*</span>
                    <span
                      style="padding-top: 10px;padding-left: 13px;font-size: 4px;color: rgba(0,0,0,.87);"
                    >双击列表信息，可进入详情页面</span>
                  </div>
                </div>
                <!-- <draggable v-model="ep_data" :options="dragOptions" :move="moveFunction">
                <transition-group tag="div" id="ep_data" class="item-ul">-->
                <ep-table
                  ref="table1"
                  :height="format?400:200"
                  :data="ep_data"
                  key="id"
                  :head-color="true"
                  :loading="loading"
                  @row-dblclick="detailInfo"
                  @selection-change="selectChange"
                  :row-class="setRowClass"
                >
                  <ep-table-item type="select"></ep-table-item>
                  <ep-table-item column="stockBillNoPre" title="出库单编号"></ep-table-item>
                  <ep-table-item
                    column="billType"
                    title="出入库类型"
          
                    :formatter="UsedTypeTranslate"
                  ></ep-table-item>
                  <ep-table-item
                    column="stockBillType"
                    title="进出库标志"
                    :formatter="stockBillTypeFormatter"
                  ></ep-table-item>
                </ep-table>
                <!-- </transition-group>
                </draggable>-->
              </div>
              <!-- </div> -->

              <!-- <div> -->
              <div class="drag-box-item2">
                <!-- <div class="button-style">
                  <ep-button type="success" @click="dataInfo">明细移动</ep-button>
                </div>-->
                <div class="item-title">
                  出入库详情
                  <div>
                    <span style="color:red;font-size:25px;position:absolute;">*</span>
                    <span
                      style="padding-top: 10px;padding-left: 13px;font-size: 4px;color: rgba(0,0,0,.87);"
                    >径予放行自主声明不可拆分表体</span>
                  </div>
                </div>
                <ep-table
                  ref="table2"
                  :height="format?400:200"
                  :data="doing"
                  :head-color="true"
                  @row-dblclick="downNumber"
                >
                  <ep-table-item type="select"></ep-table-item>
                  <ep-table-item column="copGNo" title="料号"></ep-table-item>
                  <ep-table-item column="gName" title="品名"></ep-table-item>
                  <ep-table-item column="usedQty" title="已用数量"></ep-table-item>
                  <ep-table-item column="remainQty" title="剩余数量"></ep-table-item>
                  <ep-table-item column="qty" title="数量">
                    <template slot-scope="props">
                      <!-- <ep-input-number :max="props.row.qty*1" :min="0" v-model="props.row.dclQtycut"></ep-input-number> -->

                      <div style="display:flex;justify-content: center;">
                        <div style="width:35px;">{{props.row.qty}}</div>
                        <div style="margin-left:8px;cursor:pointer">
                          <i
                            @click="downNumber($event,props.row)"
                            class="ion-minus-circled"
                            style="font-size:20px;color:#2196f3"
                          ></i>
                        </div>
                      </div>
                      <!-- <ep-button type="primary" icon="minus-circled"></ep-button> -->
                    </template>
                  </ep-table-item>
                  <ep-table-item column="gUnit" title="单位" :formatter="dclUnitcdTranslate"></ep-table-item>
                </ep-table>
              </div>
              <!-- </div> -->

              <!-- <div> -->
              <div class="drag-box-item3">
                <div class="item-title">单证生成</div>
                <ep-table
                  class="table3"
                  ref="table3"
                  :height="format?400:200"
                  :data="done"
                  :head-color="true"
                >
                  <!--<ep-table-item type="select"></ep-table-item>-->
                  <ep-table-item column="copGNo" title="料号"></ep-table-item>
                  <ep-table-item column="gName" title="品名"></ep-table-item>
                  <!-- <ep-table-item column="usedQty" title="已用数量"></ep-table-item>
                  <ep-table-item column="remainQty" title="剩余数量"></ep-table-item>-->

                  <ep-table-item column="qty" title="数量">
                    <!-- <template slot-scope="props">
                      <p>{{props.row.qty | qtyFormat(props.row.remainQty,props.row.usedQty)}}</p>
                    </template>-->
                  </ep-table-item>

                  <ep-table-item column="grossWt" title="毛重"></ep-table-item>
                </ep-table>
              </div>
            </div>
            <ep-model title="表体编辑" v-model="infoModel" width="500px" :wrap-close="false">
              <ep-form ref="infoForm" :form="infoForm" name-width="108px">
                <ep-row :gutter="7">
                  <ep-col :col="24">
                    <ep-form-item attr="copGNo" label="料号">
                      <ep-input v-model="infoForm.copGNo" name="copGNo" disabled></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="24">
                    <ep-form-item attr="gName" label="品名">
                      <ep-input v-model="infoForm.gName" name="gName" disabled></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="24">
                    <ep-form-item attr="usedQty" label="已用数量">
                      <ep-input v-model="infoForm.usedQty" name="usedQty" disabled></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="24">
                    <ep-form-item attr="remainQty" label="剩余数量">
                      <ep-input v-model="infoForm.remainQty" name="remainQty" disabled></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="24">
                    <ep-form-item attr="qty" label="数量">
                      <!-- <ep-input v-model="infoForm.qty" name="qty"  disabled></ep-input> -->
                      <!-- <ep-input-number v-model="infoForm.qty" :max="maxLength*1" @change="changeValue" :min="0"></ep-input-number> -->
                      <el-input-number
                        size="mini"
                        :precision="0"
                        @change="changeValue"
                        v-model="infoForm.qty"
                        :max="maxLength*1"
                        :min="1"
                      ></el-input-number>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="24">
                    <ep-form-item attr="gUnit" label="单位">
                      <!-- <ep-input v-model="infoForm.gUnit" name="gUnit"  disabled></ep-input> -->
                      <ep-select v-model="infoForm.gUnit" name="gUnit" disabled>
                        <ep-select-item
                          v-for="(item, index) in dclUnitcdList"
                          :key="index"
                          :index="item.unit"
                          :label="item.unitName"
                        ></ep-select-item>
                      </ep-select>
                    </ep-form-item>
                  </ep-col>
                </ep-row>
                <div style="text-align:center">
                  <ep-button type="primary" size="small" @click="makeSuer">确定</ep-button>
                </div>
              </ep-form>
            </ep-model>
            <div class="block ep_pager">
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
    </div>
    <generate
      :fresh="modelFlag"
      :Listdata="Listdata"
      :headerData="ep_data"
      @nowFlagChange="modelFlag = false"
      @success="getData"
      :mulFlag="mulData1"
    ></generate>
    <generate1
      :fresh="modelFlag1"
      :Listdata="Listdata1"
      :headerData="ep_data"
      @nowFlagChange="modelFlag1 = false"
      @success="getData"
      :mulFlag="mulData2"
    ></generate1>
    <generate2
      :fresh="modelFlag2"
      :Listdata="Listdata2"
      :headerData="ep_data"
      @nowFlagChange="modelFlag2 = false"
      @success="getData"
      :mulFlag="mulData3"
    ></generate2>
  </div>
</template>

<script>
import { cloneObj } from "../../../utils/data";
import mixin from "./mixin";
import generate from "./components/generate";
import generate1 from "./components/generate1";
import generate2 from "./components/generate2";
import misList from "src/common/mislist";
import Sortable from "sortablejs";
import localStorage from "utils/localStorage";
export default {
  name: "Confirmation",
  mixins: [mixin],
  extends: misList, // 务必继承
  data() {
    return {
      format: true, //设置布局
      listApi: "getStockBillNolist",
      mulData1: false,
      mulData2: false,
      mulData3: false,
      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      settings: {
        pk: "id" // 主键
      },
      fixTime: "",
      Listdatas: [],
      dragOptions: {
        animation: 120,
        scroll: true,
        // disabled:false,
        group: "sortlist",
        ghostClass: "ghost-style",
        store: false
      },
      ep_data: [],
      doing: [],
      done: [],
      done1: [],
      page_rules: {
        stockBillType: {
          required: true,
          message: "不能为空",
          trigger: "change"
        }
      },
      searchForm: {
        // page: 1,
        // size: 10,
        tradeCode: this.$store.getters.getTradeCode,
        // tradeCode: '1100696075',
        stockBillType: this.$route.query.stockBillType || "",
        billType: "",
        startTime: "",
        endTime: "",
        stockBillNoPre: "",
        billNo: "",
        orderNo: ""
      },
      preData: {},
      Listdata: {
        // businessTypecd: "",
        // mtpckEndprdTypecd: "",
        // trspModecd: "",
        // impexpPortcd: "",
        // grossWt: "",
        // dclcusFlag: "1",
        // dclcusTypecd: "",
        // supvModecd: "",
        data: [],
        preData: { stockBillType: "" },
        id: "",
        orgId: this.$store.getters.getId,
        whRecPreentNo: "", // 仓单对应的编号
        inExpWhNo: "", // ERP/WMS出入库编号
        inExpType: "", // ERP/WMS出入库类型
        bizopEtpsno: this.$store.getters.getTradeCode, //经营企业编号
        bizopEtpsNm: this.$store.getters.getTradeName, //经营企业名称
        bizopEtpsSccd: this.$store.getters.getCreditCode, //经营企业社会信用代码
        businessTypecd: "", // 业务类别
        inExpTime: "", // ERP/WMS出入库日期
        mtpckEndprdTypecd: "", // 料件、成品标志
        supvModecd: "", // 监管方式
        trspModecd: "", // 运输方式
        impexpPortcd: "", // 进出境关别
        masterCuscd: this.$store.getters.getCustomId, // 主管海关
        rltEntryNo: "", // 关联报关单编号
        rltWhRecNo: "", // 关联仓单编号
        whRecNo: "", // 仓单编号
        dclTime: "", // 申报日期
        dclcusFlag: "", // 是否报关
        dclcusTypecd: "", // 报关类型
        preRecAccountTime: "", // 预记入企业账户时间
        recAccountTime: "", // 正式记入企业账户时间
        invtIochkptStucd: "", // 进出卡口状态
        vrfdedMarkcd: "", // 核扣标记
        rmk: "", // 备注
        entryStucd: "", // 报关状态
        optStatus: "", // 操作状态
        destinationNatcd: "", // 最终目的国
        tradeCountry: "", // 启运国/运抵国
        tradingRegion: "", // 贸易国（地区）
        districtCode: "", // 境内目的地
        grossWt: "", // 毛重
        transMode: "", // 成交方式
        ieTypecd: "", // 进出标志
        value: "" // ERP/WMS出入库状态变化
      },
      modelFlag: false,
      Listdata1: {
        mtpckEndprdTypecd:'',
        preData: { stockBillType: "" },
        id: "",
        orgId: "",
        tradeId: "",
        billExpNo: "", //径予放行自主声明编号	BILL_ECP_NO
        orderNo: "", //自主声明预录入编号	ORDER_NO
        billLodNo: "", //提运单号	BILL_LOD_NO
        shipNameEn: "", //英文船名	SHIP_NAME_EN
        voyageNo: "", //航次	VOYAGE_NO
        grossWt: "", //毛重	GROSS_WT
        dclQty: "", //数量	DCL_QTY
        trspModecd: "", //运输方式	TRSP_MODECD
        dclTime: "", //申报时间	DCL_TIME
        passTime: "", //过卡时间	PASS_TIME
        type: "0", //申报类型	TYPE
        optStatus: "", //状态	OPT_STATUS
        hazardousConfirm: "2", //危禁品确认标志	HAZARDOUS_CONFIRM
        hazardous: "", //危禁品	HAZARDOUS
        supvModecd: "", //监管方式	SUPV_MODECD
        proxyOrgId: "", //代理组织ID	PROXY_ORG_ID
        rmk: "", //备注	RMK
        emapvMarkcd: "", //待审批标志代码	EMAPV_MARKCD
        agreeConfirm: "1",
        involveConfirm: "0", //是否涉证涉检	INVOLVE_CONFIRM
        passPortUsedTypecd: "", //核放单绑定标志	PASSPORT_USED_TYPECD
        bizopEtpsNo: this.$store.getters.getTradeCode, //经营企业编号
        bizopEtpsNm: this.$store.getters.getTradeName, //经营单位名称
        bizopEtpsSccd: this.$store.getters.getCreditCode, //经营单位社会信用代码
        bizopEtpsNoAttr: this.$store.getters.getTradeCode, //经营企业编号
        bizopEtpsNmAttr: this.$store.getters.getTradeName, //经营单位名称
        bizopEtpsSccdAttr: this.$store.getters.getCreditCode, //经营单位社会信用代码
        stockBillType: ""
      },
      modelFlag1: false,
      Listdata2: {
        data: [],
        preData: { stockBillType: "" },
        id: "",
        orgId: this.$store.getters.getId,
        portNo: "", //凭证编号
        preentNo: "", // 预录入编号
        inExpWhNo: "", //ERP/WMS出入库编号
        inExpType: "", //ERP/WMS出入库类型    必填
        bizopEtpsSccd: this.$store.getters.getCreditCode,
        bizopEtpsNo: this.$store.getters.getTradeCode, // 经营企业编号    必填
        bizopEtpsNm: this.$store.getters.getTradeName, //经营单位名称    必填
        businessTypecd: "", //业务类别    必填
        inExpTime: "", //  ERP/WMS出入库日期
        mtpckEndprdTypecd: "", // 料件、成品标志   必填
        impexpPortcd: "", //进出境关别
        masterCuscd: this.$store.getters.getCustomId, //主管海关     必填
        // dclTime: "", //申报日期
        preRecAccountTime: "", // 预记入企业账户时间
        recAccountTime: "", //正式记入企业账户时间
        // invtIochkptStucd: "", // 进出卡口状态
        // recAccountFlag: "", //  是否记入企业账户标记
        rmk: "", // 备注
        // optStatus: "", // 操作状态
        rcvgdEtpsNm: "", // 境内收发货企业
        rcvgdEtpsNo: "", //境内收发货企业编号
        rcvgdEtpsSccd: "", //境内收发货企业社会信用代码
        vehicleNo: "", // 承运车车牌号
        // vehicleIcNo: "", // IC卡号
        containerNo: "", //集装箱号
        vehicleWt: "", //车自重   必填
        vehicleFrameNo: "", //车架号
        vehicleFrameWt: "", //车架重 必填
        containerType: "", //集装箱箱形
        containerWt: "", //集装箱重
        totalWt: "", //总重量 必填
        // passCollectWt: "", //卡口地磅采集重量
        // wtError: "", // 重量比对误差
        totalGrossWt: "", // 货物总毛重  必填
        totalNetWt: "", //货物总净重
        // passTime: "", //过卡时间1
        // secdPassTime: "", //过卡时间2
        // bindUsedTypecd: "", //分送集报标志
        bindTypecd: "", // 绑定类型
        ieTypecd: "" //进出标志   必填
      },
      modelFlag2: false,
      loading: false,
      infoModel: false,
      maxLength: 0,
      infoForm: {
        gUnit: "",
        qty: "",
        gName: "",
        copGNo: ""
      },
      dataList: []
    };
  },
  components: {
    generate: generate,
    generate1: generate1,
    generate2: generate2
  },
  computed: {
    dclUnitcdList() {
      return this.$store.getters.getUnitList;
    }
  },
  watch: {},
  filters: {
    qtyFormat(qty, remainQty, usedQty) {
      console.log("----3333", remainQty, this);
      if (qty * 1 - usedQty * 1 == remainQty) {
        return Number(remainQty);
      } else return Number(qty);
    }
  },
  created() {
    if (this.$route.query.businessType == "bill") {
      this.searchForm.billType = "5";
    } else if (this.$route.query.businessType == "port") {
      this.searchForm.billType = "6";
    } else if (this.$route.query.businessType == "wareHouse") {
      this.searchForm.billType = "1,2,3,4";
    } else {
      this.searchForm.billType = "";
    }

    let userInfo = localStorage.getLocalStorage("setUserInfo");
    if (userInfo.routerType == 7 || !userInfo.routerType) {
      this.page_rules.stockBillType.required = false;
    } else {
      this.page_rules.stockBillType.required = true;
    }
    console.log("---------12", userInfo.routerType == 7);
  },
  mounted() {
    // this.getData();
    let el = document.querySelectorAll(".ep-table-body > table > tbody")[0];
    let el1 = document.querySelectorAll(".ep-table-body > table > tbody")[1];
    let el2 = document.querySelectorAll(".ep-table-body > table > tbody")[2];
    let box = document.querySelectorAll(".drag-box-item2")[0];
    let box1 = document.querySelectorAll(".drag-box-item3")[0];
    let x1, x2, y, w;
    const sortable = Sortable.create(el, {
      sort: false,
      onStart: function(evt) {
        x1 = evt.originalEvent.clientX;
      },
      onEnd: evt => {
        // //监听拖动结束事件
        x2 = evt.originalEvent.clientX;
        y = evt.originalEvent.clientY;
        w = el.offsetWidth;
        if (this.calculation(el2, box1, x2, y)) {
          // this.eliminate();
          if (this.ep_data[evt.oldIndex].usedType == "1") {
            this.$pop({
              type: "danger",
              message: "该出入库单已生成单证!"
            });
            return;
          }
          if (this.ep_data[evt.oldIndex].Highlight) {
            this.$pop({
              type: "danger",
              message: "您已经拖过了!"
            });
            return;
          }
          if (this.ep_data[evt.oldIndex].dtDtos.length <= 0) {
            this.$pop({
              type: "danger",
              message: "该表体为空!"
            });
            return;
          }

          let highlightData = {};
          let flag = false;
          this.ep_data.forEach(el => {
            if (el.Highlight) {
              highlightData = el;
              flag = true;
              return;
            }
          });
          if (
            flag &&
            highlightData.billType != this.ep_data[evt.oldIndex].billType
          ) {
            console.log("--------1");
            this.$pop({
              type: "danger",
              message: "该出入库类型不一致!"
            });
            return;
          }
          if (this.doing.length >= 1) {
            this.$pop({
              type: "danger",
              message: "请生成或重置!"
            });
            return;
          }
          this.done = [...this.done, ...this.ep_data[evt.oldIndex].dtDtos];
          this.preData = this.ep_data[evt.oldIndex];
          this.done.forEach(el => {
            el.qty = el.remainQty;
          });
          this.$set(this.ep_data[evt.oldIndex], "Highlight", true);
          setTimeout(() => {
            this.sign();
            this.selectUSDCol();
          }, 10);
        }
        if (this.calculation(el1, box, x2, y)) {
          if (this.ep_data[evt.oldIndex].usedType == "1") {
            this.$pop({
              type: "danger",
              message: "该出入库单已生成单证!"
            });
            return;
          }
          if (this.ep_data[evt.oldIndex].Highlight) {
            this.$pop({
              type: "danger",
              message: "您已经拖过了!"
            });
            return;
          }
          if (this.ep_data[evt.oldIndex].dtDtos.length <= 0) {
            this.$pop({
              type: "danger",
              message: "该表体为空!"
            });
            return;
          }
          if (
            this.ep_data[evt.oldIndex] &&
            this.ep_data[evt.oldIndex].billType == "5"
          ) {
            this.$pop({
              type: "danger",
              message: "该类型不可以修改申报数量!"
            });
            return;
          }

          if (this.doing.length >= 1 || this.done.length >= 1) {
            this.$pop({
              type: "danger",
              message: "请生成或重置!"
            });
            return;
          }
          this.eliminate();
          this.preData = this.ep_data[evt.oldIndex];
          this.doing = this.ep_data[evt.oldIndex].dtDtos;
          this.doing.forEach(el => {
            el.qty = el.remainQty;
          });
          this.$set(this.ep_data[evt.oldIndex], "Highlight", true);
          setTimeout(() => {
            this.sign();
            this.selectUSDCol();
          }, 10);
        }
      }
    });
    const sortable1 = Sortable.create(el1, {
      sort: false,
      onStart: function(evt) {
        x1 = evt.originalEvent.clientX;
      },
      onEnd: evt => {
        //监听拖动结束事件
        x2 = evt.originalEvent.clientX;
        y = evt.originalEvent.clientY;
        w = el1.offsetWidth;
        console.log("-------22-2", x2 - x1, w / 2, el2.offsetWidth);
        if (this.calculation(el2, box1, x2, y)) {
          this.done.push(this.doing[evt.oldIndex]);
          this.doing.splice(evt.newIndex, 1);
          this.done = this.func(this.done);
        }
      }
    });

    const sortable2 = Sortable.create(el2, {
      sort: false,
      onStart: function(evt) {
        x1 = evt.originalEvent.clientX;
      },
      onEnd: evt => {
        x2 = evt.originalEvent.clientX;
        y = evt.originalEvent.clientY;
        w = el2.offsetWidth;
        if (this.calculation(el1, box, x2, y)) {
          if (this.preData && this.preData.billType == "5") {
            this.$pop({
              type: "danger",
              message: "该类型不可以修改申报数量!"
            });
            return;
          }
          let highlightData = [];

          this.ep_data.forEach(el => {
            if (el.Highlight) {
              highlightData.push(el);
            }
          });
          if (highlightData.length > 1) {
            console.log("---------2");
            this.$pop({
              type: "danger",
              message: "该情况不可以修改申报数量!"
            });
            return;
          }
          this.doing.push(this.done[evt.oldIndex]);
          this.done.splice(evt.newIndex, 1);
          this.doing = this.func(this.doing);
        }
      }
    });
  },
  methods: {
    //距离判断
    calculation(el, box, x, y) {
      if (
        x > box.getBoundingClientRect().left &&
        x < box.getBoundingClientRect().right &&
        y > box.getBoundingClientRect().top &&
        y < box.getBoundingClientRect().bottom
      ) {
        return true;
      }
    },
    // 标记
    sign(data) {
      let tableEl = document.querySelectorAll(".ep-checkbox--input")[0];
      let dataNum = this.ep_data.filter(item => item.Highlight === true);
      if (data) {
        tableEl.className = `ep-checkbox--input`;
      }
      if (dataNum.length >= 1) {
        tableEl.className = "ep-checkbox--input is-indeterminate";
      }
      if (dataNum.length == this.ep_data.length && this.ep_data.length != 0) {
        tableEl.className = "ep-checkbox--input is-checked";
      }
    },
    //  单选框
    selectUSDCol(column) {
      this.$refs.table1.selectChangeEach(data => {
        return data.Highlight === true;
      });
    },
    //   行高亮
    setRowClass(index) {
      if (this.ep_data[index].Highlight) {
        return "light-success";
      }
    },
    func(arr) {
      var result = [];
      var temp = {};
      for (var i = 0; i < arr.length; i++) {
        var myname = arr[i].id;
        if (temp[myname]) {
          result.map((item, index) => {
            console.log("item", item);
            if (item.id == myname) {
              result[index].qty = JSON.stringify(
                result[index].qty * 1 + arr[i].qty * 1
              );
            }
          });
          continue; //不继续执行接下来的代码，跳转至循环开头
        }
        temp[myname] = true;
        result.push(arr[i]);
      }
      return result;
    },
    changeTime() {
      let fixTime = this.fixTime.split(",");
      this.searchForm.endTime = fixTime[1];
      this.searchForm.startTime = fixTime[0];
    },

    moveFunction(index) {
      console.log("-----ffd", index);
      // const relatedElement = relatedContext.element
      // const draggedElement = draggedContext.element
      // console.log("44444444",relatedElement, draggedElement)
      // return (
      //     (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      // );
    },
    reset(searchForm) {
      this.$refs[searchForm].reset();
    },
    //   生成
    generateDrop(val) {
      let userInfo = localStorage.getLocalStorage("setUserInfo");
      console.log("---------12", userInfo.routerType == 7);
      // let selectData = this.$refs.table3.getData('select')
      if (this.done.length == 0) {
        this.$pop({
          type: "danger",
          message: "请至少选择一条数据!"
        });
        return false;
      }

      let highlightData = [];

      this.ep_data.forEach(el => {
        if (el.Highlight) {
          highlightData.push(el);
        }
      });
      if (val == 1) {
        if (userInfo.routerType != 7 && userInfo.routerType) {
          if (this.preData.billType == 5 || this.preData.billType == 6) {
            this.$pop({
              type: "danger",
              message: "该出入库类型不能生成进出区提发货凭证"
            });
            return;
          }
        }

        this.Listdata.data = this.done;
        this.Listdata.preData = this.preData;
        if (this.preData.billType == "1") {
          this.Listdata.inExpType = "1";
          this.Listdata.dclcusFlag = "2";
          this.Listdata.dclcusTypecd = "2";
        } else if (this.preData.billType == "2") {
          this.Listdata.inExpType = "2";
          this.Listdata.dclcusFlag = "2";
          this.Listdata.dclcusTypecd = "1";
        } else if (this.preData.billType == "3") {
          this.Listdata.inExpType = "4";
          this.Listdata.dclcusFlag = "1";
          this.Listdata.dclcusTypecd = "";
        } else if (this.preData.billType == "4") {
          this.Listdata.inExpType = "5";
          this.Listdata.dclcusFlag = "2";
          this.Listdata.dclcusTypecd = "1";
        } else {
          this.Listdata.inExpType = "";
        }
        // this.Listdata.ieTypecd = this.preData.stockBillType || "";
        if (this.preData.stockBillType == 1) {
          this.Listdata.ieTypecd = "I";
        } else if (this.preData.stockBillType == 2) {
          this.Listdata.ieTypecd = "E";
        }

        this.Listdata.inExpWhNo = this.preData.stockBillNoPre || "";
        this.Listdata.inExpTime = this.preData.stockDate || "";

        if (highlightData.length > 1) {
          this.modelFlag = true;
          this.mulData1 = true;
          return;
        }
        this.Listdata.whRecPreentNo = this.preData.stockBillNoPre;
        this.Listdata.rltEntryNo = this.preData.rltEntryNo;

        this.Listdata.businessTypecd = this.preData.businessType || "";

        this.Listdata.grossWt = this.preData.grossWt || "";

        this.Listdata.supvModecd = this.preData.supvMode || "";
        this.Listdata.trspModecd = this.preData.trafMode || "";

        this.Listdata.impexpPortcd = this.preData.ieport || "";
        this.Listdata.mtpckEndprdTypecd = this.preData.classifyType || "";
        this.Listdata.transMode = this.preData.transMode || "";
        this.Listdata.tradeCountry = this.preData.stshipTrsarvCode || "";
        this.Listdata.tradingRegion = this.preData.tradeCountryCode || "";
        this.Listdata.districtCode = this.preData.districtCode || "";
        this.Listdata.destinationNatcd = this.preData.destinationCode || "";

        this.Listdata.rmk = this.preData.rmk || "";
        this.modelFlag = true;
        console.log("-----", this.Listdata, this.modelFlag);
      } else if (val == 2) {
        if (userInfo.routerType != 7 && userInfo.routerType) {
          if (this.preData.billType != 5) {
            this.$pop({
              type: "danger",
              message: "该出入库类型不能生成径予放行自主声明"
            });
            return;
          }
        }
        let selectData = this.$refs.table1.getData("select");
        let data = [];
        selectData &&
          selectData.forEach(el => {
            if (el.Highlight) {
              data.push(el);
            }
          });
        let dtDtos1 = cloneObj(data[0].dtDtos);
        let dtDtos2 = cloneObj(this.done);
        dtDtos1.sort((a, b) => {
          return a.id - b.id;
        });
        dtDtos2.sort((a, b) => {
          return a.id - b.id;
        });

        if (
          data.length > 1 ||
          JSON.stringify(dtDtos1) != JSON.stringify(dtDtos2)
        ) {
          this.$pop({
            type: "danger",
            message: "径予放行自主声明不可拆分表体"
          });
          return;
        }

        if (highlightData.length > 1) {
          this.modelFlag1 = true;
          this.mulData2 = true;
          return;
        }

        this.Listdata1.data = this.done;
        this.Listdata1.preData = this.preData;
        this.Listdata1.stockBillType = this.preData.stockBillType;
        this.Listdata1.billLodNo = this.preData.billNo || "";
        this.Listdata1.shipNameEn = this.preData.shipNameEn || "";
        this.Listdata1.voyageNo = this.preData.voyageNo || "";
        this.Listdata1.grossWt = this.preData.grossWt || "";
        // this.Listdata1.trspModecd = this.preData.trafMode || "";
        this.Listdata1.rmk = this.preData.rmk;

        this.modelFlag1 = true;
      } else if (val == 3) {
        if (userInfo.routerType != 7 && userInfo.routerType) {
          if (this.preData.billType != 6) {
            this.$pop({
              type: "danger",
              message: "该出入库类型不能生成卡口验放凭证"
            });
            return;
          }
        }
        this.Listdata2.inExpType = "3";
        if (this.preData.stockBillType == 1) {
          this.Listdata2.ieTypecd = "I";
        } else if (this.preData.stockBillType == 2) {
          this.Listdata2.ieTypecd = "E";
        }
        // this.Listdata2.ieTypecd = this.preData.stockBillType || "";
        this.Listdata2.inExpWhNo = this.preData.stockBillNoPre || "";
        this.Listdata2.inExpTime = this.preData.stockDate || "";

        if (highlightData.length > 1) {
          this.modelFlag2 = true;
          this.mulData3 = true;
          return;
        }
        this.Listdata2.data = this.done;
        this.Listdata2.preData = this.preData;

        this.Listdata2.rmk = this.preData.rmk || "";
        this.Listdata2.mtpckEndprdTypecd = this.preData.classifyType || "";
        this.Listdata2.destinationNatcd = this.preData.destinationCode || "";
        this.modelFlag2 = true;
      }
    },
    generate1() {
      let selectData = this.$refs.table4.getData("select");
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请至少选择一条数据!"
        });
        return false;
      }
      this.Listdata1.data = selectData;
      this.modelFlag1 = true;
    },
    // 清除
    eliminate() {
      // this.getData();
      this.done = [];
      this.doing = [];
      // this.preData={};
      this.mulData1 = false;
      this.mulData2 = false;
      this.mulData3 = false;
    },
    // 清除
    eliminate1() {
      // this.getData();
      this.ep_data = [];
      setTimeout(() => {
        this.sign(true);
        this.ep_data = JSON.parse(JSON.stringify(this.Listdatas));
      }, 100);
      // this.preData = {};
      this.done = [];
      this.doing = [];
      this.mulData1 = false;
      this.mulData2 = false;
      this.mulData3 = false;
    },
    changeValue(val, old) {},
    //  model表体移动
    makeSuer() {
      // this.doing.forEach(item=>{
      //     if(item.id==this.infoForm.id){

      //         this.$set(item,"qty",item.qty-this.infoForm.qty)
      //     }
      // })

      for (let i = 0; i < this.doing.length; i++) {
        if (this.doing[i].id == this.infoForm.id) {
          //  this.$set(this.doing[i],"qty",(this.doing[i].qty*1)-this.infoForm.qty)
          let data = this.doing[i];
          data.qty = this.doing[i].qty * 1 - this.infoForm.qty;
          if (data.qty == 0) {
            this.doing.splice(i, 1);
          } else {
            this.doing.splice(i, 1, data);
          }
        }
      }
      // if (this.doing.length == 0) {
      //   this.ep_data.forEach((item, index) => {
      //     if (this.infoForm.pid == item.id) {
      //       this.ep_data.splice(index, 1);
      //     }
      //   });
      // }

      let form = cloneObj(this.infoForm);
      form.qty = form.qty + "";

      this.done.push(form);

      this.done = this.func(this.done);
      this.infoModel = false;
    },
    downNumber(event, row) {
      if (this.preData.billType == "5") return;
      this.infoModel = true;
      this.maxLength = cloneObj(row).qty;
      setTimeout(() => {
        this.infoForm = cloneObj(row);
      }, 10);
    },
    selectChange(selector, index) {
      // if (selector.length > 1 || selector.length == 0) {
      //   this.eliminate();
      //   return;
      // }
      // this.doing = cloneObj(selector[0].dtDtos);
      // if (this.$refs.table1.getData("select")[0])
      //   this.preData = this.$refs.table1.getData("select")[0];
    },
    hearderDelete() {
      let selectData = this.$refs.table1.getData("select");
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请至少选择一条数据!"
        });
        return false;
      }
      // this.doing = [];
      // selectData.forEach(item => {
      //   item.dtDtos.forEach((items, index) => {
      //     this.done.push(items);
      //   });
      // });

      if (this.$refs.table1.getData("select")[0])
        this.preData = this.$refs.table1.getData("select")[0];
      let highlightData = {};
      let flag = false;
      selectData.forEach(el => {
        highlightData = el;
        if (highlightData.billType != this.preData.billType) {
          flag = true;
          this.$pop({
            type: "danger",
            message: "该出入库类型不一致!"
          });
          return;
        }
      });

      if (flag) return;
      this.doing = [];
      this.done = [];
      let highlightCur = this.ep_data;
      this.ep_data.forEach((element, index) => {
        selectData.forEach(item => {
          // if()
          if (
            item.stockBillNoPre == element.stockBillNoPre &&
            item.Highlight != true
          ) {
            this.$set(this.ep_data[index], "Highlight", true);
          }
        });
      });
      selectData.forEach(item => {
        item.dtDtos.forEach((items, index) => {
          this.done.push(items);
        });
      });
      setTimeout(() => {
        this.sign();
        this.selectUSDCol();
      }, 10);
    },
    dataInfo() {
      let selectData = this.$refs.table2.getData("select");
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请至少选择一条数据!"
        });
        return false;
      }
      selectData.forEach((item, index) => {
        this.done.push(item);
        this.doing = this.doing.filter(t => t.id != item.id);
      });
      // data = this.doing.filter(t => t.id != id)

      if (this.$refs.table1.getData("select")[0])
        this.preData = this.$refs.table1.getData("select")[0];
      // console.log("-----e-e-e-", this.$refs.table1.getData("select"),this.preData);
      // let fatherData = this.ep_data.filter(item => {
      //   return item.stockBillNo == selectData[0].stockBillNo;
      // });
      // if (selectData.length == this.$refs.table2.getShowData().length) {
      //   this.ep_data.forEach((item, index) => {
      //     if (fatherData[0].stockBillNo == item.stockBillNo) {
      //       this.ep_data.splice(index, 1);
      //     }
      //   });
      // }
      // this.$refs.table2.deleteSelectRow();
    },
    add(event) {},
    startMovde() {},
    removeHandleFirst(event) {},
    endMove(event) {},
    startMovdeSecond() {},
    removeHandleSecond(event) {},
    endMoveSecond(event) {},
    startMovdeThird() {},
    removeHandleThird(event) {},
    endMoveThird(event) {},
    headerClick(data, val) {},
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.refresh(false);
    },
    handleCurrentChange(val) {
      this.ep_page.page = val;
      console.log("-----3-3-33-");
      this.refresh(false);
    },
    getData() {
      this.eliminate1();
      if (this.$route.query.businessType == "wareHouse") {
        if (!this.searchForm.billType) {
          this.searchForm.billType = "1,2,3,4";
        }
      }
      this.refresh(true);
    },
    searchCallback(json) {
      let data = json.map.data.content;
      // this.sign(true)
      // this.clear()
      this.Listdatas = JSON.parse(JSON.stringify(data));
      if (this.done.length > 0) {
        this.done.forEach(el => {
          data.forEach((el1, index) => {
            if (el.stockBillNoPre == el1.stockBillNoPre) {
              this.$set(this.ep_data[index], "Highlight", true);
            }
          });
        });
      } else if (this.doing.length > 0) {
        this.doing.forEach(el => {
          data.forEach((el1, index) => {
            if (el.stockBillNoPre == el1.stockBillNoPre) {
              this.$set(this.ep_data[index], "Highlight", true);
            }
          });
        });
      }

      setTimeout(() => {
        this.sign();
        this.selectUSDCol();
      }, 10);
      //      setTimeout(() => {

      //   this.sign(true);
      //   this.ep_data = JSON.parse(JSON.stringify(this.Listdatas));
      // }, 100);
      // this.eliminate1();
    },

    detailInfo(event, row, index) {
      //     this.$router.push({
      //   path: "/ComfirmationDtInfo"
      // });
      this.$app.trigger("locate-tab", "ComfirmationDtInfo", row.stockBillNoPre);
    }
  }
};
</script>
<style>
.light-success {
  background: rgba(33, 150, 243, 0.24) !important;
}
</style>
<style lang="less" scoped>
.main-in-style {
  .ep_pager {
    /* position: absolute; */
    /* bottom: 0px; */
    background: #fff;
    margin: 0;
    width: 100%;
  }
  .disable {
    /* pointer-events: none; */
    /* user-select: none; */
    cursor: not-allowed !important;
    color: #999 !important;
  }
  .button-style {
    position: absolute;
    top: -35px;
    left: 0px;
  }
  .in-word {
    width: 150px;
    margin: 0;
    padding: 0;
  }
  .flex-flow {
    /* display: flex; */
  }
  .in-datainfo {
    display: flex;
    /* justify-content: space-around; */
  }
  .drag-box1 {
    display: block !important;
  }
  .drag-box1 > div {
    min-height: 260px !important;
    margin-right: 0px !important;
  }
  .drag-box {
    margin-top: 10px;
    display: flex;
    user-select: none;
  }
  .drag-box > div {
    min-height: 460px;
    background-color: #eff1f5;
    margin-right: 16px;
    border-radius: 6px;
    border: 1px #e1e4e8 solid;
    margin-bottom: 10px;
  }
  .drag-box-item1 {
    flex: 0.75;
    /* max-width: 330px; */
    min-width: 350px;
    background-color: #eff1f5;
    margin-right: 16px;
    border-radius: 6px;
    border: 1px #e1e4e8 solid;
    position: relative;
    min-height: 488px;
  }
  .drag-box-item2 {
    flex: 1.5;
    /* max-width: 330px; */
    min-width: 300px;
    background-color: #eff1f5;
    margin-right: 16px;
    border-radius: 6px;
    border: 1px #e1e4e8 solid;
    position: relative;
    min-height: 488px;
  }
  .drag-box-item3 {
    flex: 1;
    /* max-width: 330px; */
    min-width: 300px;
    background-color: #eff1f5;
    margin-right: 16px;
    border-radius: 6px;
    border: 1px #e1e4e8 solid;
    position: relative;
    min-height: 488px;
  }
  .item-title {
    padding: 8px 8px 8px 12px;
    font-size: 14px;
    line-height: 1.5;
    color: #24292e;
    font-weight: 600;
    display: flex !important;
    justify-content: space-between !important;
  }
  .light-success {
    background: rgba(33, 150, 243, 0.24) !important;
  }

  .ep-table-empty-block {
    position: relative;
    border-top: 1px solid #e0e0e0;
    min-height: 380px;
    text-align: center;
    width: 100%;
    height: 100%;
  }
  .ep-input-number {
    display: inline-block;
    width: 115px;
    position: relative;
  }
  .ep-input-number-increase {
    right: 15px;
  }
  .ep-input-number-decrease,
  .ep-input-number-increase {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    line-height: 15px;
    top: 12px;
    background-color: #2196f3;
    text-align: center;
    color: #fff;
    cursor: pointer;
    position: absolute;
    z-index: 1;
    -webkit-transition: opacity 0.2s linear;
    transition: opacity 0.2s linear;
  }
  .ep-button--text {
    color: #fff;
    padding: 6px 6px;
    font-size: 14px;
    border-radius: 2px;
    background-color: #27ae60;
    border-color: #27ae60;
    margin-bottom: 1px;
  }
}
</style>

