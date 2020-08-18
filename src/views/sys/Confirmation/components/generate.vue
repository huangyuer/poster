[<template>
  <div>
    <ep-model v-model="modelFlag" width="1150px" :wrap-close="false">
      <div class="modelFlagbox">
        <div class="product">
          <div class="table">
            <p style="height:60px;text-align:center;line-height:60px;font-size:25px;">进出区提发货凭证</p>
            <div style>
              <p style="padding: 0 5px;padding-top: 10px;">
                <span style="padding:5px 0 ;width:48%;display: inline-block;">
                  经营企业名称 :
                  <a>{{this.$store.getters.getTradeName}}</a>
                </span>
                <span style="padding:5px 0 ;width:48%;display: inline-block;">
                  经营企业编码 :
                  <a>{{this.$store.getters.getTradeCode}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:100%;display: inline-block;">
                  经营企业社会信用代码 :
                  <a>{{this.$store.getters.getOrgCreditCode}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span
                  style="padding:5px 0 ;width:32%;display: inline-block; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  关联编号 :
                  <a>{{Listdata.rltWhRecNo}}</a>
                </span>
                <span
                  style="padding:5px 0 ;width:65%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  关联报关单编号 :
                  <a>{{Listdata.rltEntryNo}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  ERP/WMS出入库类型 :
                  <!-- <a v-for="item in stockBillType" :key='item.stockBillType'>{{(Listdata.data[0].stockBillType||'')==item.stockBillType?item.billType:''}}</a> -->
                  <a>{{inExpTypeFormatter(Listdata)}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  进出标志 :
                  <a>{{ioTypecdFormatter(Listdata)}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  业务类别:
                  <a>{{businessTypelistFormatter(Listdata)}}</a>
                </span>

                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  料件/成品标志 :
                  <a>{{Listdata.mtpckEndprdTypecd&&mtpckEndprdTypecdFormatter(Listdata)}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  毛重 :
                  <a>{{Listdata.grossWt}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  监管方式 :
                  <a>{{supvModecdFormatter(Listdata)}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  运输方式 :
                  <a>{{trspModecdFormatter(Listdata)}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  进出境关别 :
                  <a>{{impexpPortcdFormatter(Listdata)}}</a>
                </span>

                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  是否报关 :
                  <!-- <a v-for="item in stockBillType" :key='item.stockBillType'>{{(Listdata.data[0].stockBillType||'')==item.stockBillType?item.dclcusFlag:''}}</a> -->
                  <a>{{dclcusFlagFormatter(Listdata)}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  报关类型:
                  <!-- <a v-for="item in stockBillType" :key='item.stockBillType'>{{(Listdata.data[0].stockBillType||'')==item.stockBillType?item.dclcusTypecd:''}}</a> -->
                  <a>{{dclcusTypecdFormatter(Listdata)}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  成交方式 :
                  <a>{{transModeFormatter(Listdata)}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  启运国/运抵国(地区) :
                  <a
                    v-for="item in countrys"
                    :key="item.countryCode"
                  >{{Listdata.tradeCountry==item.countryCode?item.nameCn:''}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  贸易国(地区) :
                  <a
                    v-for="item in countrys"
                    :key="item.countryCode"
                  >{{Listdata.tradingRegion==item.countryCode?item.nameCn:''}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  境内目的地/货源地 :
                  <a>{{districtCodeFormatter(Listdata)}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  最终目的国(地区) :
                  <a
                    v-for="item in countrys"
                    :key="item.countryCode"
                  >{{Listdata.destinationNatcd==item.countryCode?item.nameCn:''}}</a>
                </span>
                <span style="padding:5px 0 ;width:100%;display: inline-block;">
                  备注:
                  <a>{{Listdata.rmk}}</a>
                </span>
              </p>
            </div>
          </div>
          <table style="border:1px solid #666;width:100%;border-collapse: collapse;">
            <tr>
              <td>ERP/WMS出入库编号</td>
              <!--<td>明细序号</td>
              <td>关联单证编号</td>
              <td>关联单证表体序号</td>-->
              <td>商品料号</td>
              <td>
                商品编码
                <!-- 及单位 -->
              </td>
              <td style="min-width: 60px;">
                商品名称
                <!-- /总价 -->
              </td>
              <td>规格型号</td>
              <!-- <td style="min-width: 60px;">报关单商品序号</td> -->
              <td style="min-width: 60px;">
                单价
                <br />币制
                <br />总价
              </td>
              <td style="min-width: 110px;">
                申报数量
                <br />申报计量单位
                <br />净重
              </td>
              <!-- <td>单位</td> -->
              <!-- <td>单价</td>
              <td>总价</td>-->
              <td style="min-width: 60px;">原产国(地区)</td>
              <!-- <td>净重</td> -->

              <!-- <td>序号</td>
              <td>报关单商品序号</td>-->
            </tr>
            <tr v-for="item in Listdata.data" :key="item.id">
              <!-- <td>{{item.whRecPreentNo}}</td>
              <td>{{item.gdsSeqno}}</td>
              <td>{{item.portNo}}</td>
              <td>
                {{item.rltPortSeqno}}
                
              </td>-->
              <td>{{item.stockBillNoPre}}</td>
              <td>{{item.copGNo}}</td>
              <td>{{item.hsCode}}</td>
              <td style="min-width: 60px;">{{item.gName}}</td>

              <td>{{item.gModel}}</td>

              <!-- <td style="min-width: 60px;">{{item.entryGdsSeqno}}</td> -->

              <td style="min-width: 60px;">
                {{item.unitPrice}}
                <br />
                {{dclCurrcdFormatter(item.tradeCurr)}}
                <br />
                {{item.tradeTotal}}
              </td>

              <td style="min-width: 110px;">
                {{item.qty}}
                <br />
                {{dclUnitcdTranslate(item)}}
                <br />
                {{item.netWt}}
              </td>

              <!-- <td>{{item.gUnit}}</td> -->
              <!-- 
              <td>{{item.unitPrice}}</td>

              <td>{{item.tradeTotal}}</td>-->

              <td style="min-width: 60px;">{{natcdTranslate(item.originCountryCode)}}</td>

              <!-- <td>{{item.netWt}}</td> -->

              <!-- <td>{{natcdTranslate(item.originCountryCode)}}</td> -->
              <!-- <td>{{item.gdsNm}}</td>
              <td>{{item.gdsMtno}}</td>-->
            </tr>
          </table>
          <!-- <div class="ep-card card-margin relative">
            <div class="card-body">
              <div class="block">
                <ep-table ref="table" :height="400" :data="Listdata.data">
                  <ep-table-item column="whRecPreentNo" width="220" title="凭证编号"></ep-table-item>
                  <ep-table-item column="gdsSeqno" width="100" title="明细序号"></ep-table-item>
                  <ep-table-item column="gdsMtno" width="150" title="商品料号">
                    <template slot-scope="props">
                      <p class="text-style">{{ props.row.gdsMtno }}</p>
                    </template>
                  </ep-table-item>
                  <ep-table-item column="gdecd" width="150" title="商品编码"></ep-table-item>
                  <ep-table-item column="gdsNm" width="150" title="商品名称">
                    <template slot-scope="props">
                      <p class="text-style">{{ props.row.gdsNm }}</p>
                    </template>
                  </ep-table-item>
                  <ep-table-item column="gdsSpcfModelDesc" width="150" title="规格型号">
                    <template slot-scope="props">
                      <p class="text-style">{{ props.row.gdsSpcfModelDesc }}</p>
                    </template>
                  </ep-table-item>
                  <ep-table-item column="entryGdsSeqno" width="200" title="报关单商品序号"></ep-table-item>
                  <ep-table-item
                    column="dclCurrcd"
                    width="150"
                    title="币制"
                    :formatter="dclCurrcdFormatter"
                  ></ep-table-item>
                  <ep-table-item column="dclQty" width="150" title="数量"></ep-table-item>
                  <ep-table-item
                    column="dclUnitcd"
                    width="100"
                    title="单位"
                    :formatter="dclUnitcdTranslate"
                  ></ep-table-item>
                  <ep-table-item column="dclUprcAmt" width="150" title="单价"></ep-table-item>
                  <ep-table-item column="dclTotalAmt" width="150" title="总价"></ep-table-item>
                  <ep-table-item column="natcd" width="150" title="原产国(地区)"></ep-table-item>
                  <ep-table-item column="netWt" width="150" title="净重"></ep-table-item>
                </ep-table>
              </div>
            </div>
          </div>-->
        </div>

        <div class="addgenerate">
          <ep-form ref="Listdata" :rules="page_rules" :form="Listdata" name-width="5px">
            <ep-row :gutter="7">
              <ep-col :col="24" v-if="typeFlag">
                <ep-form-item attr="inExpType" label>
                  <ep-select
                    placeholder="ERP/WMS出入库类型"
                    v-model="Listdata.inExpType"
                    name="inExpType"
                  >
                    <ep-select-item index="1" label="一线进出"></ep-select-item>
                    <ep-select-item index="2" label="先报后送"></ep-select-item>
                    <ep-select-item index="4" label="区内流转"></ep-select-item>
                    <ep-select-item index="5" label="区间流转"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="24" v-if="typeFlag">
                <ep-form-item attr="ieTypecd" label>
                  <ep-select placeholder="进出库标志" v-model="Listdata.ieTypecd" name="ieTypecd">
                    <div v-if="Listdata.inExpType == 4">
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
              <ep-col :col="24">
                <ep-form-item attr="rltWhRecNo" label>
                  <ep-input
                    placeholder="关联编号"
                    v-model="Listdata.rltWhRecNo"
                    name="rltWhRecNo"
                    :maxlength="64"
                  ></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="24">
                <ep-form-item attr="rltEntryNo" label>
                  <ep-input
                    placeholder="关联报关单编号"
                    v-model="Listdata.rltEntryNo"
                    name="rltEntryNo"
                    :maxlength="18"
                  ></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="businessTypecd" label>
                  <ep-select
                    placeholder="业务类别"
                    v-model="Listdata.businessTypecd"
                    name="businessTypecd"
                  >
                    <ep-select-item
                      v-for="item in businessTypelist"
                      :key="item.index"
                      :index="item.index"
                      :label="item.title"
                    ></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="mtpckEndprdTypecd" label>
                  <ep-select
                    placeholder="料件/成品标志"
                    v-model="Listdata.mtpckEndprdTypecd"
                    name="mtpckEndprdTypecd"
                  >
                    <ep-select-item
                      v-for="item in mtpckEndprdTypelist"
                      :key="item.index"
                      :index="item.index"
                      :label="item.title"
                    ></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="grossWt" label>
                  <ep-input
                    placeholder="毛重"
                    v-model="Listdata.grossWt"
                    name="grossWt"
                    :maxlength="20"
                  ></ep-input>
                </ep-form-item>
              </ep-col>

              <ep-col :col="12">
                <ep-form-item attr="trspModecd" label>
                  <!-- <loc-codemap-select
                    placeholder="运输方式"
                    :disabled="Listdata.preData.trafMode?true:false"
                    :name="'trspModecd'"
                    :code="'trafCode'"
                    :cName="'trafSpec'"
                    :dataList="transfList"
                    :value.sync="Listdata.trspModecd"
                  ></loc-codemap-select>-->
                  <ep-select placeholder="运输方式" v-model="Listdata.trspModecd" name="trspModecd">
                    <ep-select-item
                      v-for="item in transfList"
                      :key="item.trafCode"
                      :index="item.trafCode"
                      :label="item.trafSpec"
                    ></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="dclcusFlag" label>
                  <ep-select
                    placeholder="是否报关"
                    v-model="Listdata.dclcusFlag"
                    name="dclcusFlag"
                    @change="dclcusChange"
                  >
                    <ep-select-item index="1" label="否"></ep-select-item>
                    <ep-select-item index="2" label="是"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="dclcusTypecd" label>
                  <ep-select
                    placeholder="报关类型"
                    v-model="Listdata.dclcusTypecd"
                    name="dclcusTypecd"
                    :disabled="Listdata.dclcusFlag=='1'"
                  >
                    <ep-select-item index="1" label="关联报关"></ep-select-item>
                    <ep-select-item index="2" label="对应报关"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>

              <ep-col :col="12">
                <ep-form-item attr="impexpPortcd" label>
                  <loc-codemap-select
                    placeholder="进出境关别"
                    :name="'impexpPortcd'"
                    :code="'customCode'"
                    :cName="'customName'"
                    :dataList="ImpexpPortcdInfo"
                    :type="'custom'"
                    :value.sync="Listdata.impexpPortcd"
                  ></loc-codemap-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="transMode" label>
                  <ep-select
                    placeholder="成交方式"
                    :label="TransacList"
                    v-model="Listdata.transMode"
                    name="transMode"
                  >
                    <ep-select-item
                      v-for="(item, index) in TransacList"
                      :key="index"
                      :index="item.transMode"
                      :label="item.transSpec + ' ' + item.transMode"
                    ></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="supvModecd" label>
                  <loc-codemap-select
                    placeholder="监管方式"
                    :name="'supvModecd'"
                    :code="'tradeMode'"
                    :cName="'abbrTrade'"
                    :dataList="supvInfo"
                    :value.sync="Listdata.supvModecd"
                  ></loc-codemap-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="tradeCountry" label>
                  <loc-codemap-select
                    placeholder="启运国/运抵国(地区)"
                    :name="'tradeCountry'"
                    :code="'countryCode'"
                    :cName="'nameCn'"
                    :dataList="countrys"
                    :value.sync="Listdata.tradeCountry"
                  ></loc-codemap-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="tradingRegion" label>
                  <loc-codemap-select
                    placeholder="贸易国(地区)"
                    :name="'tradingRegion'"
                    :code="'countryCode'"
                    :cName="'nameCn'"
                    :dataList="countrys"
                    :value.sync="Listdata.tradingRegion"
                  ></loc-codemap-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="districtCode" label>
                  <loc-codemap-select
                    placeholder="境内目的地/货源地"
                    :name="'districtCode'"
                    :code="'districtCode'"
                    :cName="'districtName'"
                    :dataList="districtList"
                    :value.sync="Listdata.districtCode"
                  ></loc-codemap-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="24">
                <ep-form-item attr="destinationNatcd" label>
                  <loc-codemap-select
                    placeholder="最终目的国(地区)"
                    :name="'destinationNatcd'"
                    :code="'countryCode'"
                    :cName="'nameCn'"
                    :dataList="countrys"
                    :value.sync="Listdata.destinationNatcd"
                  ></loc-codemap-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="24">
                <ep-form-item label attr="rmk">
                  <ep-input
                    placeholder="备注"
                    v-model.trim="Listdata.rmk"
                    name="rmk"
                    :maxlength="400"
                    type="textarea"
                  ></ep-input>
                </ep-form-item>
              </ep-col>
              <!-- <ep-form-item attr="dclcusFlag" label="">
                <ep-select placeholder="是否报关" v-model="Listdata.dclcusFlag" name="dclcusFlag" :disabled="Listdata.preData                  <ep-select-item v-for="item in dclcusFlaglist" :key='item.index' :index="item.index" :label="item.title"></ep-select-item>
                </ep-select>
              </ep-form-item>
              <ep-form-item attr="dclcusTypecd" label="">
                <ep-select placeholder="报关类型" v-model="Listdata.dclcusTypecd" name="dclcusTypecd">
                  <ep-select-item v-for="item in dclcusTypelist" :key='item.index' :index="item.index" :label="item.title"></ep-select-item>
                </ep-select>
              </ep-form-item>-->
              <!-- <ep-form-item attr="supvModecd" label="">
                <loc-codemap-select placeholder="监管方式" :name="'supvModecd'" :code="'tradeMode'" :cName="'abbrTrade'" :dataList="supvInfo" :value.sync="Listdata.supvModecd"></loc-codemap-select>
              </ep-form-item>-->
            </ep-row>
          </ep-form>
        </div>
      </div>
      <div style="text-align:center">
        <ep-button
          :loading="saveLoading"
          :disabled="Listdata.id?true:false"
          type="success"
          size="small"
          @click="success(Listdata)"
          icon="edit"
        >暂存</ep-button>
        <ep-button
          :loading="applyLoading"
          type="success"
          size="small"
          @click="declare()"
          icon="checkmark-round"
        >确认</ep-button>

        <ep-button type="danger" size="small" icon="close" @click="close()">关闭</ep-button>
      </div>
    </ep-model>
  </div>
</template>



<script>
import misList from "src/common/mislist";
import mixin from "../mixin";
import localStorage from "utils/localStorage";
import { cloneObj } from "utils/data";

export default {
  mixins: [mixin],
  extends: misList,
  props: {
    fresh: {
      type: Boolean,
    },
    Listdata: {
      type: Object,
    },
    headerData: {
      type: Array,
    },
    mulFlag: {
      type: Boolean,
    },
  },
  created() {
    let userInfo = localStorage.getLocalStorage("setUserInfo");
    if (userInfo.routerType == 7 || !userInfo.routerType) {
      this.typeFlag = true;
    } else {
      this.typeFlag = false;
    }
  },
  components: {},
  data() {
    return {
      saveLoading: false,
      applyLoading: false,
      typeFlag: false,
      timer: "",
      modelFlag: false,
      isSave: false,
      businessTypelist: [
        { index: "1", title: "自用设备" },
        { index: "2", title: "简单加工" },
        { index: "3", title: "保税加工" },
        { index: "4", title: "保税仓储" },
        { index: "5", title: "转口贸易" },
        { index: "6", title: "跨境电商" },
        { index: "7", title: "汽车平行进口" },
        { index: "8", title: "融资租赁" },
        { index: "9", title: "期货保税交割" },
        { index: "10", title: "保税维修" },
        { index: "11", title: "进口汽车保税存储" },
        { index: "12", title: "保税研发" },
        { index: "13", title: "委托加工" },
        { index: "14", title: "大宗商品现货保税交易" },
      ],
      mtpckEndprdTypelist: [
        { index: "I", title: "料件" },
        { index: "E", title: "成品" },
        { index: "S", title: "设备" },
      ],
      dclcusFlaglist: [
        { index: "1", title: "否" },
        { index: "2", title: "是" },
      ],
      dclcusTypelist: [
        { index: "1", title: "关联报关" },
        { index: "2", title: "对应报关" },
      ],
      page_rules: {
        businessTypecd: {
          required: true,
          message: "不能为空",
          trigger: "change, blur",
        },
        mtpckEndprdTypecd: {
          required: true,
          message: "不能为空",
          trigger: "change, blur",
        },
        trspModecd: {
          required: true,
          message: "不能为空",
          trigger: "change, blur",
        },
        impexpPortcd: {
          required: true,
          message: "不能为空",
          trigger: "change, blur",
        },
        grossWt: {
          required: true,
          message: "不能为空",
          trigger: "change, blur",
        },

        supvModecd: {
          required: true,
          message: "不能为空",
          trigger: "change, blur",
        },
        transMode: {
          required: true,
          message: "不能为空",
          trigger: "change, blur",
        },
        tradeCountry: {
          required: true,
          message: "不能为空",
          trigger: "change, blur",
        },
        tradingRegion: {
          required: true,
          message: "不能为空",
          trigger: "change, blur",
        },
        districtCode: {
          required: true,
          message: "不能为空",
          trigger: "change, blur",
        },
        destinationNatcd: {
          required: true,
          message: "不能为空",
          trigger: "change, blur",
        },
        inExpType: { required: true, message: "不能为空", trigger: "change" },
        ieTypecd: { required: true, message: "不能为空", trigger: "change" },
        rltWhRecNo: { required: false, message: "不能为空", trigger: "change" },
        dclcusTypecd: {
          required: true,
          message: "不能为空",
          trigger: "change",
        },
        rltEntryNo: {
          required: false,
          message: "不能为空",
          trigger: "change",
        },
      },
    };
  },
  watch: {
    modelFlag(value) {
      if (!value) {
        this.$emit("nowFlagChange", false);
        this.$refs["Listdata"].reset();
        this.Listdata.ieTypecd = "";
        if (this.Listdata.id) {
          this.$emit("success", true);
          this.Listdata.id = "";
        }
      }
    },
    fresh(value) {
      if (value) {
        console.log(this.Listdata, "Listdata");
        this.modelFlag = true;
        this.Listdata.data &&
          this.Listdata.data.forEach((el) => {
            if (!el.unitPrice) {
              let price =
                Number(el.tradeTotal) /
                (Number(el.remainQty) + Number(el.usedQty));
              el.unitPrice = price;
            }
            if (Number(el.qty) != Number(el.remainQty) + Number(el.usedQty)) {
              el.tradeTotal = parseFloat(
                (Number(el.unitPrice) * Number(el.qty)).toFixed(5)
              );
            }
          });
      } else {
        // this.$emit("success", true);
        this.isSave = false;
        this.modelFlag = false;
      }
    },
    "Listdata.inExpType"(val, oldVal) {
      if (val == "1") {
        this.Listdata.dclcusFlag = "2";
        this.Listdata.dclcusTypecd = "2";
      } else if (val == "2") {
        this.Listdata.dclcusFlag = "2";
        this.Listdata.dclcusTypecd = "1";
      } else if (val == "3") {
        this.Listdata.dclcusFlag = "1";
        this.Listdata.dclcusTypecd = "";
      } else if (val == "4") {
        this.Listdata.dclcusFlag = "1";
        this.page_rules.dclcusTypecd.required = false;
      } else if (val == "5") {
        this.Listdata.dclcusFlag = "2";
        this.Listdata.dclcusTypecd = "1";
      }
      let type = this.Listdata.ieTypecd;
      if (val != "4") {
        this.page_rules.rltEntryNo.required = true;
        this.Listdata.ieTypecd = "";
        setTimeout(() => {
          this.Listdata.ieTypecd = type;
        }, 10);
      } else {
        this.page_rules.rltEntryNo.required = false;
        this.Listdata.ieTypecd = "";
        setTimeout(() => {
          this.Listdata.ieTypecd = type;
        }, 10);
      }
      if (val == "4" && this.Listdata.ieTypecd == "E") {
        this.page_rules.rltWhRecNo.required = true;
      } else {
        this.page_rules.rltWhRecNo.required = false;
      }
    },
    "Listdata.ieTypecd"(val, oldVal) {
      if (this.Listdata.inExpType == "4" && val == "E") {
        this.page_rules.rltWhRecNo.required = true;
      } else {
        this.page_rules.rltWhRecNo.required = false;
      }
    },
    "Listdata.grossWt"(val, oldVal) {
      // let reg = /\d+(\.\d{0,2})?/;
      // if (reg.test(val)) {
      //   setTimeout(() => {
      //     this.Listdata.grossWt = val.match(/\d+(\.\d{0,5})?/)[0] || "";
      //   });
      // } else {
      //   setTimeout(() => {
      //     this.Listdata.grossWt = "";
      //   });
      // }

      if (
        val &&
        val !== null &&
        val.charAt(0) == "0" &&
        val.length > 1 &&
        val.charAt(1) !== "."
      ) {
        this.$pop({
          type: "danger",
          message: "请输入正确的毛重",
        });
      }
      let reg = /^\d{0,14}(\.\d{0,5})?$/;
      if (!reg.test(val)) {
        setTimeout(() => {
          this.Listdata.grossWt = oldVal;
        });
      }
    },
  },

  mounted() {
    // this.time()
  },
  methods: {
    close() {
      //关闭当前模块
      this.modelFlag = false;
      console.log("=======");
      // this.$emit("success", true);
      this.isSave = false;
      this.$refs["Listdata"].reset();
      this.Listdata.ieTypecd = "";
    },

    time() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let H = date.getHours();
      let mm = date.getMinutes();
      let s = date.getSeconds();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      H = H < 10 ? "0" + H : H;
      let timer = `${y + "-" + m + "-" + d + " "}`;
      this.Listdata.createTime = timer;
    },
    dclcusChange(value) {
      if (value == "1") {
        this.page_rules.dclcusTypecd.required = false;
        this.Listdata.dclcusTypecd = "";
      } else {
        this.page_rules.dclcusTypecd.required = true;
      }
    },
    // 完成
    declare() {
      if (!this.Listdata.id) {
        this.$pop({
          type: "danger",
          message: "请先暂存!",
        });
        return;
      }
      this.applyLoading = true;
      this.$post("wareHouseSubmit", { bscIds: [parseInt(this.Listdata.id)] })
        .then((res) => {
          // this.$emit("success", true);
          this.applyLoading = false;
          this.close();
        })
        .catch(() => {
          this.applyLoading = false;
        });
    },
    success(Listdata) {
      console.log("----2---2", this.Listdata);
      if (this.Listdata.id) {
        this.$pop({
          type: "danger",
          message: "已暂存!",
        });
        return;
      }
      // this.Listdata.orgId = this.$store.getters.getId;
      // this.Listdata.supvModecd = this.Listdata.preData.supvMode;
      // this.Listdata.destinationNatcd = this.Listdata.preData.destinationCode;
      // this.Listdata.tradeCountry = this.Listdata.preData.stshipTrsarvCode;
      // this.Listdata.tradingRegion = this.Listdata.preData.tradeCountryCode;
      // this.Listdata.districtCode = this.Listdata.preData.districtCode;
      // this.Listdata.transMode = this.Listdata.preData.transMode;
      // this.Listdata.inExpType = this.Listdata.preData.billType;
      // // this.Listdata.dclcusFlag = this.dclcusFlag == "是" ? "2" : "1";
      // this.Listdata.dclcusTypecd = this.dclcusTypecd == "关联报关" ? "1" : "2";
      // this.Listdata.ieTypecd = this.Listdata.preData.stockBillType;
      let warehouseReceiptDt = [];
      let warehouseInExp = [];
      this.Listdata.data &&
        this.Listdata.data.forEach((el) => {
          let data = {
            whRecPreentNo: el.stockBillNoPre,
            gdsMtno: el.copGNo,
            gdecd: el.hsCode,
            gdsNm: el.gName,
            gdsSpcfModelDesc: el.gModel,
            entryGdsSeqno: el.entryGdsSeqno || "0",
            dclCurrcd: el.tradeCurr,
            dclQty: el.qty,
            dclUnitcd: el.gUnit,
            dclUprcAmt: el.unitPrice,
            dclTotalAmt: el.tradeTotal,
            natcd: el.originCountryCode,
            netWt: el.netWt,
            stockDtId: String(el.id),
          };

          warehouseReceiptDt.push(data);
        });
      this.headerData &&
        this.headerData.forEach((el) => {
          if (el.Highlight) {
            let data1 = {
              inExpWhNo: el.stockBillNoPre,
              inExpTime: el.stockDate,
            };
            warehouseInExp.push(data1);
          }
        });
      this.Listdata["warehouseReceiptDt"] = warehouseReceiptDt;
      this.Listdata["warehouseInExp"] = warehouseInExp;
      this.Listdata.id = "";
      this.Listdata.inExpTime = "";
      this.Listdata.whRecPreentNo = "";
      this.Listdata.dragType = "1";

      let form = cloneObj(this.Listdata);
      delete form.data;
      delete form.preData;
      this.$refs["Listdata"].validate((valid) => {
        if (valid) {
          this.saveLoading = true;
          this.$post("getStockBillDragSaveBsc", form)
            .then((res) => {
              this.Listdata.id = JSON.stringify(res.map.data);
              this.isSave = true;
              this.saveLoading = false;
              // this.close();
            })
            .catch(() => {
              this.saveLoading = false;
            });
        }
      });
    },
  },
};
</script>


<style scoped>
.ep-form--item.is-required:before {
  content: "*";
  color: #e74c3c;
  position: absolute;
  margin-top: 7px;
  margin-left: -7px;
}
.modelFlagbox {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  height: 620px;
  /* padding-bottom: 50px; */
  /* max-height: 710px; */
  /* overflow: auto; */
  /* justify-content: space-between;
  flex-wrap:wrap; */
}
.addgenerate {
  width: 35%;
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
  background: #fff;
}
.product {
  padding: 8px;
  width: 65%;
  /* padding: 10px; */
  display: flex;
  /* max-height: 710px;  */
  /* flex-wrap: wrap; */
  background: rgb(183, 211, 228);
  display: flex;
  height: 100%;
  overflow: auto;
  flex-direction: column;
}
.table {
  width: 100%;
}
.table a {
  color: rgb(194, 0, 5);
}
span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
p {
  margin: 0;
  font-size: 14px;
}
td {
  border: 1px solid #666;
  font-size: 14px;
}
input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
}
</style>
