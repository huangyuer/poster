<!--提货变更修改页面-->

<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">
          <!-- <ep-button
            type="success"
            size="small"
            @click="doSave"
            icon="edit"
            :loading="saveLoading"
          >暂存变更</ep-button>
          <ep-button
            type="success"
            size="small"
            @click="declare"
            icon="checkmark-round"
            :loading="applyLoading"
          >确认变更</ep-button>-->
          <WmsButton :loading="saveLoading" @click="doSave">暂存变更</WmsButton>
          <WmsButton :loading="applyLoading" @click="declare">确认变更</WmsButton>
        </div>
        <ep-tabs active="径予放行货物自主声明表头-变更">
          <ep-tab-item name="径予放行货物自主声明表头-变更">
            <ep-form
              class="demo-form"
              ref="bodyForm"
              :form="bodyForm"
              :rules="page_rules"
              name-width="168px"
            >
              <ep-row :gutter="10">
                <!--第一行-->
                <!-- <ep-col :col="8">
                  <ep-form-item label="径予放行自主声明编号" attr="billNo">
                    <ep-input v-model="bodyForm.billNo" name="billNo" :maxlength="18" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="提运单号" attr="billLodNo">
                    <ep-input v-model="bodyForm.billLodNo" name="billLodNo" :maxlength="64" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>-->
                <!--新增行-->

                <ep-col :col="8">
                  <ep-form-item label="经营单位名称" attr="bizopEtpsNm">
                    <ep-input
                      v-model="bodyForm.bizopEtpsNm"
                      name="bizopEtpsNm"
                      :maxlength="20"
                      :disabled="true"
                    ></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="经营企业编号" attr="bizopEtpsNo">
                    <ep-input
                      v-model="bodyForm.bizopEtpsNo"
                      name="bizopEtpsNo"
                      :maxlength="20"
                      :disabled="true"
                    ></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="经营单位社会信用代码" attr="bizopEtpsSccd">
                    <ep-input
                      v-model="bodyForm.bizopEtpsSccd"
                      name="bizopEtpsSccd"
                      :maxlength="20"
                      :disabled="true"
                    ></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="申报单位名称" attr="bizopEtpsNmAttr">
                    <ep-input
                      v-model="bodyForm.bizopEtpsNmAttr"
                      name="bizopEtpsNmAttr"
                      :maxlength="20"
                      :disabled="true"
                    ></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="申报企业编号" attr="bizopEtpsNoAttr">
                    <ep-input
                      v-model="bodyForm.bizopEtpsNoAttr"
                      name="bizopEtpsNoAttr"
                      :maxlength="20"
                      :disabled="true"
                    ></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="申报单位社会信用代码" attr="bizopEtpsSccdAttr">
                    <ep-input
                      v-model="bodyForm.bizopEtpsSccdAttr"
                      name="bizopEtpsSccdAttr"
                      :maxlength="20"
                      :disabled="true"
                    ></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="自主声明预录入编号">
                    <ep-input
                      v-model="bodyForm.orderNo"
                      name="orderNo"
                      :maxlength="20"
                      :disabled="true"
                    ></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="提运单号" attr="billLodNo">
                    <ep-input
                      v-model="bodyForm.billLodNo"
                      name="billLodNo"
                      :maxlength="150"
                      :disabled="true"
                    ></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="英文船名" attr="shipNameEn">
                    <ep-input
                      v-model="bodyForm.shipNameEn"
                      name="shipNameEn"
                      :maxlength="150"
                      :disabled="true"
                    ></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="航次" attr="voyageNo">
                    <ep-input
                      v-model="bodyForm.voyageNo"
                      name="voyageNo"
                      :maxlength="20"
                      :disabled="true"
                    ></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="毛重" attr="grossWt">
                    <ep-input
                      v-model="bodyForm.grossWt"
                      name="grossWt"
                      :maxlength="20"
                      :disabled="true"
                    ></ep-input>
                  </ep-form-item>
                </ep-col>

                <ep-col :col="8">
                  <ep-form-item label="运输方式" attr="trspModecd">
                    <ep-select
                      v-model="bodyForm.trspModecd"
                      name="trspModecd"
                      @change="trspChange"
                      :disabled="true"
                    >
                      <ep-select-item index="1" label="海运"></ep-select-item>
                      <ep-select-item index="2" label="空运"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="16">
                  <ep-form-item label="备注" attr="rmk">
                    <ep-input v-model="bodyForm.rmk" name="rmk" :maxlength="1000" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>

                <ep-col :col="24">
                  <div class="one-item-select">
                    <ep-form-item>
                      <div>
                        <ep-checkbox
                          style="margin-left: 5px"
                          v-model="checkboxForm1"
                          :disabled="true"
                        >不属于国家禁止进出境货物;</ep-checkbox>
                      </div>
                      <div>
                        <ep-checkbox
                          style="margin-left: 5px"
                          v-model="checkboxForm2"
                          :disabled="true"
                        >不属于依法需进出境检疫的货物以及进境检验的大宗资源性商品、可用作原料的固体废物;</ep-checkbox>
                      </div>
                      <div>
                        <ep-checkbox
                          style="margin-left: 5px"
                          v-model="checkboxForm3"
                          :disabled="true"
                        >不属于法律、法规等明确规定的,涉及我国缔结或者参加的国际条约、协定的,和涉及安全准入管理,必须在进出境环节验核相关监管证件的货物。</ep-checkbox>
                      </div>
                    </ep-form-item>
                  </div>
                </ep-col>

                <!-- - <ep-col :col="8">
                  <ep-form-item label="数量" attr="dclQty">
                    <ep-input v-model="bodyForm.dclQty" name="dclQty" :maxlength="20" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="过卡时间" attr="passTime">
                    <ep-date v-model="bodyForm.passTime" name="passTime" type="dateTime" :disabled="true"></ep-date>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="申报类型" attr="type">
                    <ep-select v-model="bodyForm.type" name="type" :disabled="true">
                      <ep-select-item index="0" label="自主申报"></ep-select-item>
                      <ep-select-item index="1" label="委托申报"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="危禁品确认标志" attr="hazardousConfirm">
                    <ep-select v-model="bodyForm.hazardousConfirm" name="hazardousConfirm" :disabled="true">
                      <ep-select-item index="1" label="是"></ep-select-item>
                      <ep-select-item index="2" label="否"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>-->
                <!-- <ep-col :col="8">
                  <ep-form-item label="危禁品" attr="hazardous">
                    <ep-input v-model="bodyForm.hazardous" name="hazardous"></ep-input>
                  </ep-form-item>
                </ep-col>               
                <ep-col :col="8">
                  <ep-form-item label="监管方式" attr="supvModecd" >
                     <loc-codemap-select
                    :name="'supvModecd'"
                    :code="'tradeMode'"
                    :cName="'abbrTrade'"
                    :dataList="supvInfo"

                    :value.sync="bodyForm.supvModecd" :disabled="true">
                     </loc-codemap-select>
                  </ep-form-item>
                </ep-col>

                <ep-col :col="8">
                  <ep-form-item label="是否涉证涉检" attr="involveConfirm">
                    <ep-select v-model="bodyForm.involveConfirm" name="involveConfirm" :disabled="true">
                      <ep-select-item index="1" label="涉证"></ep-select-item>
                      <ep-select-item index="2" label="涉检"></ep-select-item>
                      <ep-select-item index="3" label="涉证涉检"></ep-select-item>
                      <ep-select-item index="0" label="均不涉"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="是否承诺货物符合径予放行条件" attr="agreeConfirm" title="是否承诺货物符合径予放行条件">
                    <ep-select v-model="bodyForm.agreeConfirm" name="agreeConfirm" :disabled="true">
                      <ep-select-item index="1" label="是"></ep-select-item>
                      <ep-select-item index="2" label="否"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>-->
              </ep-row>
            </ep-form>
          </ep-tab-item>
          <ep-tab-item name="径予放行货物自主声明明细">
            <ep-model title="径予放行货物自主声明明细" v-model="model" width="1250px" :wrap-close="false">
              <ep-form ref="bodyDtForm" :form="bodyDtForm" :rules="page_rules1" name-width="168px">
                <ep-row :gutter="7">
                   <ep-col :col="8">
                    <ep-form-item attr="billNo" label="径予放行自主声明编号">
                      <ep-input
                        v-model="bodyDtForm.billNo"
                        name="billNo"
                        :maxlength="20"
                        :disabled="true"
                      ></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <!--<ep-col :col="8">
                    <ep-form-item attr="gdecd" label="商品编码">
                      <ep-input
                        v-model="bodyDtForm.gdecd"
                        name="gdecd"
                        :maxlength="10"
                        @blur="searchCode"
                      ></ep-input>
                    </ep-form-item>
                  </ep-col>-->
                  <ep-col :col="8">
                    <ep-form-item attr="gdsNm" label="商品名称">
                      <ep-input v-model.trim="bodyDtForm.gdsNm" name="gdsNm" :maxlength="256"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <!-- <ep-col :col="8">
                    <ep-form-item attr="dclQty" label="申报数量">
                      <ep-input v-model="bodyDtForm.dclQty" name="dclQty" :maxlength="20"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item attr="dclUnitcd" label="申报单位">
                      <ep-select v-model="bodyDtForm.dclUnitcd" name="dclUnitcd" filterable>
                        <ep-select-item
                          v-for="(item, index) in unitList"
                          :key="index"
                          :index="item.unit"
                          :label="item.unitName+' '+item.unit"
                        ></ep-select-item>
                      </ep-select>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item attr="dclTotalAmt" label="总价">
                      <ep-input v-model="bodyDtForm.dclTotalAmt" name="dclTotalAmt" :maxlength="26"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item attr="dclCurrcd" label="原产国">
                      <loc-codemap-select
                        :name="'dclCurrcd'"
                        :code="'countryCode'"
                        :cName="'nameCn'"
                        :disabled="isClip"
                        :dataList="countrys"
                        :value.sync="bodyDtForm.dclCurrcd"
                      ></loc-codemap-select>
                    </ep-form-item>
                  </ep-col>

                  <ep-col :col="16">
                    <ep-form-item attr="rmk" label="备注">
                      <ep-input v-model="bodyDtForm.rmk" name="rmk" type="textarea"></ep-input>
                    </ep-form-item>
                  </ep-col>-->
                </ep-row>
                <div style="text-align:center">
                  <!-- <ep-button
                    type="primary"
                    size="small"
                    @click="makeSure(localType)"
                    icon="checkmark-round"
                  >确定</ep-button>
                  <ep-button
                    type="danger"
                    size="small"
                    @click="model=!model"
                    icon="close"
                    :loading="loading"
                  >关闭</ep-button>-->

                  <WmsButton @click="makeSure(localType)">确定</WmsButton>
                  <WmsButton :loading="loading" @click="model=!model">关闭</WmsButton>
                </div>
              </ep-form>
            </ep-model>
            <!-- <div class="search-card contents-card card-margin">
              <div class="panel panel-default">
                <div class="card-title zero-padding">
                  <span class="weight">查询列表</span>
                </div>
                <ep-form ref="customSearch" :form="customSearch" name-width="150px">
                  <ep-row :gutter="7">
                    <ep-col :col="6">
                      <ep-form-item label="径予放行自主声明编号" attr="billNo">
                        <ep-input v-model="customSearch.billNo" name="billNo"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="6">
                      <ep-form-item label="商品编码" attr="gdecd">
                        <ep-input v-model="customSearch.gdecd" name="gdecd"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="6">
                      <ep-form-item label="商品名称" attr="gdsNm">
                        <ep-input v-model="customSearch.gdsNm" name="gdsNm"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                  <ep-row :gutter="7">
                    <ep-col :col="24">
                      <ep-button
                        type="warning"
                        size="small"
                        icon="refresh"
                        @click="reset('customSearch')"
                      >重置</ep-button>
                      <ep-button
                        type="primary"
                        size="small"
                        icon="search"
                        @click="customSearchBtn"
                      >查询</ep-button>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
            </div>-->
            <div class="ep-card card-margin relative">
              <div class="card-body">
                <div class="block" v-if="bodyForm.col4!='1'">
                  <WmsButton style="margin:0" @click="doBodyAdd">添加</WmsButton>
                  <!-- <ep-button type="primary" size="small" @click="doBodyAdd" icon="plus-round">添加</ep-button>
                  <ep-button type="primary" size="small" @click="doBodyUpdate" icon="edit">修改</ep-button>
                  <ep-button type="danger" size="small" @click="doBodyDelete" icon="trash-a">删除</ep-button>
                  <ep-button type="danger" size="small" @click="clearTable" icon="trash-a">清空</ep-button>-->
                </div>
                <div class="block">
                  <ep-table border ref="table" :height="400" :data="tableData" :head-color="headColor">
                    <!-- <ep-table-item type="select"></ep-table-item> -->
                    <ep-table-item column="opt" title="操作" width="200" v-if="bodyForm.col4!='1'">
                      <template slot-scope="props">
                        <wms-icon type="edit" @click="doBodyUpdate(props.row,props.row.id)"></wms-icon>
                        <wms-icon type="cancel" @click="doBodyDelete(props.row,props.row.id)"></wms-icon>
                      </template>
                    </ep-table-item>
                    <ep-table-item column="billNo" width="200" title="径予放行自主声明编号"></ep-table-item>
                    <!-- <ep-table-item column="gdecd" width="150" title="商品编码"></ep-table-item> -->
                    <ep-table-item column="gdsNm" title="商品名称"></ep-table-item>
                    <!-- <ep-table-item column="dclQty" width="150" title="申报数量"></ep-table-item>
                    <ep-table-item
                      column="dclUnitcd"
                      width="150"
                      title="申报单位"
                      :formatter="dclUnitcdTranslate"
                    ></ep-table-item>
                    <ep-table-item column="dclTotalAmt" width="150" title="总价"></ep-table-item>
                    <ep-table-item
                      column="dclCurrcd"
                      width="150"
                      title="原产国"
                      :formatter="natcdTranslate"
                    ></ep-table-item>
                    <ep-table-item column="rmk" title="备注" width="350" :tooltip-show="true">-->
                    <!-- <template slot-scope="props">
                          <p class="rmk-style">{{props.row.rmk}}</p>
                    </template>-->
                    <!-- </ep-table-item> -->
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
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneObj, getToken, isEmpty } from "utils";
export default {
  name: "BillDirDtModify",
  data() {
    return {
      loading: false,
      saveLoading: false, //暂存loading
      applyLoading: false, //申报loading
      pageFlag: false,
      isClip: false,
      isDeclare: false,
      headColor: true,
      localType: "",
      checkboxForm1: false,
      checkboxForm2: false,
      checkboxForm3: false,
      // rcvgdEtpsNo: this.$store.getters.getOrganizationCode,//收发货人代码
      // rvsngdEtpsSccd: this.$store.getters.getOrgCreditCode,//收发货人社会信用代码
      // rcvgdEtpsNm: this.$store.getters.getOrganizationName,//收发货人名称
      // dclEtpsNo: this.$store.getters.getTradeCode,//申报单位代码
      // dclEtpsSccd: this.$store.getters.getCreditCode,//申报单位社会信用代码
      // dclEtpsNm: this.$store.getters.getTradeName,//申报单位名称
      bodyForm: {
        id: "",
        orgId: "",
        tradeId: "",
        masterCuscd: "",
        billNo: "", //径予放行自主声明编号	BILL_NO
        orderNo: "", //自主声明申请单编号	ORDER_NO
        billLodNo: "", //提运单号	BILL_LOD_NO
        shipNameEn: "", //英文船名	SHIP_NAME_EN
        voyageNo: "", //航次	VOYAGE_NO
        grossWt: "", //毛重	GROSS_WT
        dclQty: "", //数量	DCL_QTY
        trspModecd: "", //运输方式	TRSP_MODECD
        dclTime: "", //申报时间	DCL_TIME
        passTime: "", //过卡时间	PASS_TIME
        type: "", //申报类型	TYPE
        optStatus: "", //状态	OPT_STATUS
        hazardousConfirm: "2", //危禁品确认标志	HAZARDOUS_CONFIRM
        hazardous: "", //危禁品	HAZARDOUS
        supvModecd: "", //监管方式	SUPV_MODECD
        proxyOrgId: "", //代理组织ID	PROXY_ORG_ID
        rmk: "", //备注	RMK
        emapvMarkcd: "", //待审批标志代码	EMAPV_MARKCD
        involveConfirm: "0", //是否涉证涉检	INVOLVE_CONFIRM
        agreeConfirm: "",
        passPortUsedTypecd: "", //核放单绑定标志	PASSPORT_USED_TYPECD
        bizopEtpsNo: this.$store.getters.getTradeCode, //经营企业编号
        bizopEtpsNm: this.$store.getters.getTradeName, //经营单位名称
        bizopEtpsSccd: this.$store.getters.getCreditCode, //经营单位社会信用代码
        bizopEtpsNoAttr: this.$store.getters.getTradeCode, //经营企业编号
        bizopEtpsNmAttr: this.$store.getters.getTradeName, //经营单位名称
        bizopEtpsSccdAttr: this.$store.getters.getCreditCode //经营单位社会信用代码
      },
      // involveConfirm1:false,//涉证checkbox
      // involveConfirm2:false,//涉检checkbox
      // agreeConfirm1: true,//承诺符合放行checkbox
      customSearch: {
        billNo: "",
        gdsNm: "",
        gdecd: ""
      },
      model: false,
      dclUnitcd: [],
      bodyDtForm: {
        billNo: "",
        gdecd: "",
        gdsNm: "",
        dclQty: "",
        dclUnitcd: "",
        dclTotalAmt: "",
        dclCurrcd: "",
        rmk: ""
      },
      tableData: [], // 表体表格
      tableDataCopy: [],
      ep_page: {
        page: 1,
        size: 10
      },
      totalcount: 0,
      page_rules: {
        orderNo: { required: true, message: "不能为空", trigger: "change" },
        billLodNo: { required: true, message: "不能为空", trigger: "change" },
        shipNameEn: { required: false, message: "不能为空", trigger: "change" },
        voyageNo: { required: false, message: "不能为空", trigger: "change" },
        grossWt: { required: true, message: "不能为空", trigger: "change" },
        //        dclQty: {required: true, message: "不能为空", trigger: "change" },
        trspModecd: { required: true, message: "不能为空", trigger: "change" },
        dclTime: { required: true, message: "不能为空", trigger: "change" },
        type: { required: true, message: "不能为空", trigger: "change" },
        optStatus: { required: true, message: "不能为空", trigger: "change" },
        hazardousConfirm: {
          required: true,
          message: "不能为空",
          trigger: "change"
        }
        //        supvModecd: {required: true, message: "不能为空", trigger: "change" }
      },
      page_rules1: {
        // gdecd: { required: true, message: "不能为空", trigger: "change" },
        gdsNm: { required: true, message: "不能为空", trigger: "change" }
        //        dclQty: { required: true, message: "不能为空", trigger: "change" }
        // dclUnitcd: { required: true, message: "不能为空", trigger: "change" },
        // dclCurrcd: { required: true, message: "不能为空", trigger: "change" }
      }
    };
  },
  created() {
    //监管方式 用到贸易方式表
    let tradeModeList = this.$store.getters.getTradeModeList;
    this.supvInfo = tradeModeList;
  },
  mounted() {
    this.againDate(this.$route.query.id);
  },
  computed: {
    tradeInfo() {
      return this.$store.getters.getCustomList;
    },
    unitList() {
      return this.$store.getters.getUnitList;
    },
    countrys() {
      return this.$store.getters.getCountryList;
    },
    curr() {
      return this.$store.getters.getCurrList;
    }
  },

  methods: {
    handleCurrentChange(val) {
      this.ep_page.page = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.tableDataCopy)
      );
    },
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.tableDataCopy)
      );
    },
    natcdTranslate(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.dclCurrcd == countryList[i].countryCode) {
          return countryList[i].nameCn;
        }
      }
    },
    dclUnitcdTranslate(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.dclUnitcd == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
    doModifyConfirm() {
      this.$refs["bodyForm"].validate(valid => {
        console.log(this.bodyForm);
        if (valid) {
          var billDirDt = this.bodyForm.billDirDt;
          var quantity = 0;
          for (let i = 0; i < billDirDt.length; i++) {
            quantity = Math.floor(billDirDt[i].dclQty) + Math.floor(quantity);
          }

          if (this.bodyForm.dclQty != quantity) {
            this.$pop({
              type: "danger",
              message: "数量不匹配，无法变更!"
            });
            return;
          }
          let bodyFormCopy = cloneObj(this.bodyForm);
          bodyFormCopy["billDirDt"] = this.tableDataCopy;
          this.saveLoading = true;
          this.$post("modifySave", bodyFormCopy)
            .then(res1 => {
              this.saveLoading = false;
              this.isDeclare = true;
              this.bodyForm.id = res1.map.id;
              //在变更完成之后重载页面123
              this.againDate(this.bodyForm.id, 2);
            })
            .catch(() => {
              this.saveLoading = false;
            });
        } else {
          this.$pop({
            type: "danger",
            message: "表单验证失败!"
          });
          return;
        }
      });
    },
    //变更
    doSave() {
      this.$refs["bodyForm"].validate(valid => {
        console.log(this.bodyForm);
        if (valid) {
          let billDirDt = this.tableDataCopy;
          let quantity = 0;
          for (let i = 0; i < billDirDt.length; i++) {
            quantity = Math.floor(billDirDt[i].dclQty) + Math.floor(quantity);
          }
          let tempDclQty = isEmpty(this.bodyForm.dclQty)
            ? quantity
            : this.bodyForm.dclQty;

          // if (tempDclQty != quantity) {
          //   this.$pop({
          //     type: "danger",
          //     message: "数量不匹配，无法变更!"
          //   });
          //   return;
          // }
          let bodyFormCopy = cloneObj(this.bodyForm);
          bodyFormCopy["billDirDt"] = this.tableDataCopy;
          this.saveLoading = true;
          this.$post("modifySave", bodyFormCopy)
            .then(res1 => {
              this.saveLoading = false;
              this.isDeclare = true;
              this.bodyForm.id = res1.map.id;
              this.againDate(this.bodyForm.id, 2);
            })
            .catch(() => {
              this.saveLoading = false;
            });
        } else {
          this.$pop({
            type: "danger",
            message: "表单验证失败!"
          });
          return;
        }
      });
    },
    againDate(id, type) {
      this.$post("queryModifyGetById", { id: id, type: type }).then(res => {
        this.bodyForm = res.map.data;

        if (this.bodyForm.agreeConfirm == 1) {
          this.checkboxForm1 = true;
          this.checkboxForm2 = true;
          this.checkboxForm3 = true;
        }
        if (this.bodyForm.agreeConfirm == 2) {
          this.checkboxForm1 = false;
          this.checkboxForm2 = false;
          this.checkboxForm3 = false;
        }

        // this.involveConfirm1 = (this.bodyForm.involveConfirm == "1" || this.bodyForm.involveConfirm == "3");
        // this.involveConfirm2 = (this.bodyForm.involveConfirm == "2" || this.bodyForm.involveConfirm == "3");
        // this.agreeConfirm1 = (this.bodyForm.agreeConfirm == "1");
        this.tableDataCopy = res.map.data.billDirDt;
        let tableDataCopy = cloneObj(this.tableDataCopy);
        tableDataCopy.forEach((e, i) => {
          e.leadId = i;
        });
        this.tableDataCopy = tableDataCopy;
        this.ep_page.size = 10;
        this.ep_page.page = 1;
        this.makePaging(10, 1, tableDataCopy);
      });
    },
    makePaging(size, page, data) {
      let begin = (page - 1) * size;
      let end = begin + size;
      let newData = data.slice(begin, end);
      this.totalcount = data.length;
      this.tableData = newData;
    },
    doBodyAdd() {
      this.$refs.bodyDtForm && this.$refs.bodyDtForm.reset();
      this.model = true;
      this.localType = "添加";
    },
    doBodyUpdate(row, rowId) {
      // let selectData = this.$refs.table.getData("select");
      let selectData = [row];

      if (selectData.length === 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
      } else if (selectData.length > 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
      } else {
        this.localType = "修改"; //代表选中一条
        this.bodyDtForm = cloneObj(selectData[0]);
        this.model = true;
      }
    },
    doBodyDelete() {
      //删除table数据
      // let selectData = this.$refs.table.getData("select");
      let selectData = [row];
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择数据"
        });
        return;
      }
      this.$confirm({
        word: "是否要删除所选条目信息！",
        callback: errorInfo => {
          if (errorInfo) {
            let allDelectIndex = [];
            // let selectData = this.$refs.table.getData("select");
            let selectData = [row];
            selectData.forEach(e => {
              let updateDate = this.tableDataCopy.findIndex(value => {
                return value.leadId == e.leadId;
              });
              allDelectIndex.push(updateDate);
            });
            allDelectIndex = allDelectIndex.sort((a, b) => b - a);
            allDelectIndex.forEach((num, i) => {
              this.tableDataCopy.splice(num, 1);
            });
            let filterData = this.filterData(
              this.customSearch,
              this.tableDataCopy
            );
            this.makePaging(10, 1, filterData);
            this.ep_page.page = 1;
            this.localType = "";
          } else {
            return;
          }
        }
      });
    },
    clearTable() {
      this.$confirm({
        word: "是否要清空明细",
        callback: info => {
          if (info) {
            this.tableDataCopy = [];
            this.tableData = [];
          }
        }
      });
    },
    makeSure(value) {
      this.$refs["bodyDtForm"].validate(valid => {
        if (valid) {
          if (value == "添加") {
            this.bodyDtForm.leadId =
              this.tableDataCopy[this.tableDataCopy.length - 1] == undefined
                ? 0
                : this.tableDataCopy[this.tableDataCopy.length - 1].leadId + 1;

            let bodyForm = this.bodyDtForm;
            this.tableData.push(cloneObj(bodyForm));
            this.tableDataCopy.push(cloneObj(bodyForm));
            this.totalcount++;
            this.ep_page.page = Math.ceil(this.totalcount / this.ep_page.size);
            this.localType = "添加";
            this.$refs.bodyDtForm && this.$refs.bodyDtForm.reset();
            this.model = false;
          }
          if (value == "修改") {
            let bodyForm = this.bodyDtForm;
            this.indexChange = this.$refs.table.getDataIndex("select")[0];
            this.tableData.splice(this.indexChange, 1, cloneObj(bodyForm));
            let updateDate = this.tableDataCopy.findIndex(value => {
              return value.leadId == bodyForm.leadId;
            });
            this.tableDataCopy.splice(updateDate, 1, cloneObj(bodyForm));
            this.$refs.bodyDtForm && this.$refs.bodyDtForm.reset();
            this.model = false;
            this.localType = "";
          }
        }
      });
    },
    customSearchBtn() {
      let filterData = this.filterData(this.customSearch, this.tableDataCopy);
      this.makePaging(10, 1, filterData);
      this.totalcount = filterData.length;
    },
    //数据筛选
    filterData(condition, data) {
      let filter = (condition, data) => {
        return data.filter(item => {
          return Object.keys(condition).every(key => {
            if (condition[key] == "") return true;
            let diff =
              String(item[key]).toLowerCase() ==
              String(condition[key])
                .trim()
                .toLowerCase();
            return diff;
          });
        });
      };
      return filter(condition, data);
    },
    trspChange() {
      if (this.bodyForm.trspModecd == "1") {
        this.page_rules.shipNameEn.required = true;
        this.page_rules.voyageNo.required = true;
      } else {
        this.page_rules.shipNameEn.required = false;
        this.page_rules.voyageNo.required = false;
      }
    },
    makePaging(size, page, data) {
      let begin = (page - 1) * size;
      let end = begin + size;
      let newData = data.slice(begin, end);
      this.totalcount = data.length;
      this.tableData = newData;
    },
    declare() {
      this.$refs["bodyForm"].validate(valid => {
        if (!valid) {
          this.$pop({
            type: "danger",
            message: "表单验证失败"
          });
          return;
        } else {
          //不再对状态进行判断
          //            if (this.bodyForm.optStatus != "1") {
          //              this.$pop({
          //                type: "danger",
          //                message: "当前状态无法申报"
          //              });
          //              return;
          //            }
          if (this.bodyForm.hazardousConfirm != "2") {
            this.$pop({
              type: "danger",
              message: "危禁品，无法变更"
            });
            return;
          }
          if (this.bodyForm.involveConfirm != "0") {
            this.$pop({
              type: "danger",
              message: "涉证或涉检，无法变更"
            });
            return;
          }
          //            if (this.bodyForm.agreeConfirm != "1") {
          //              this.$pop({
          //                type: "danger",
          //                message: "未承诺符合径予放行条件，无法申报"
          //              });
          //              return;
          //            }
          this.bodyForm.billDirDt = this.tableDataCopy;
          let vm = this;
          this.$confirm({
            word: "是否要确认变更？",
            async callback(info) {
              if (info) {
                try {
                  let data = vm.bodyForm;
                  vm.applyLoading = true;
                  let result = await vm.$post("modifySave", data);
                  let id = String(data.id);
                  let response = await vm.$post("modifyDeclare", { ids: [id] });
                  vm.applyLoading = false;
                  vm.againDate(id, 2);
                } catch (err) {
                  vm.applyLoading = false;
                  console.log(err);
                  //                    this.$pop({
                  //                      type: "danger",
                  //                      message: "变更失败"
                  //                    });
                }
              }
            }
          });
        }
      });
    },
    reset(e) {
      this.$refs[e].reset();
    },
    searchCode() {
      let codeT = this.bodyDtForm.gdecd;
      this.$post("oneComplex", { gdecd: codeT })
        .then(res => {
          if (res.map.data.length == 0) {
            this.$pop({
              type: "danger",
              message: "表体商品编码数据有误！"
            });
            return;
          }
          this.bodyDtForm.gdsNm = res.map.data[0].gname;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
