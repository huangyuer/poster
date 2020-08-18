[<template>
  <div>
    <ep-model v-model="modelFlag" width="1150px" :wrap-close="false">
      <div class="modelFlagbox">
        <div class="product">
          <div class="table">
            <p style="height:60px;text-align:center;line-height:60px;font-size:25px;">卡口验放凭证</p>
            <!-- <p style="text-align:center;padding:5px 0">（凭单提货）</p> -->
            <!-- <p style="padding:5px 0;padding-left:5px">
              <span style="width:49%;display: inline-block;">签发时间 : <span style="font-size:13px">{{Listdata.createTime}}</span></span>
              <span style="width:49%;display: inline-block;text-align:right">NO : <span style="font-size:13px">{{Listdata.whRecNo}}</span></span>
            </p>-->
            <div style>
              <!-- <p style="padding: 0 5px;">
                <span style="display: inline-block; padding:5px 0 ;">出质人（单位名称） :
                  <a>1</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="display: inline-block;padding:5px 0 ;">出质人地址 :
                  <a>1</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="display: inline-block;padding:5px 0 ;">监管仓（单位名称） : <a>{{Listdata.dclEtpsNm}}</a></span>
              </p>
              <p style="padding: 0 5px;">
                <span style="display: inline-block;padding:5px 0 ;">监管仓储地址 : <a>{{Listdata.dclEtpsAdd}}</a></span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:49%;display: inline-block;">仓单状态 : <a>{{Listdata.optStatus}}</a></span>
                <span style="padding:5px 0 ;width:49%;display: inline-block;">仓储合同号 : <a>{{Listdata.contactNoOri}}</a></span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:49%;display: inline-block;">仓单有效期 :
                  <a>{{(Listdata.valueDate||'').split(",")[0]}} {{Listdata.valueDate==''?'':'至'}} {{(Listdata.valueDate||'').split(",")[1]}}</a>
                </span>
                <span style="padding:5px 0 ;width:49%;display: inline-block;">仓单制单人 : <a>{{Listdata.contactor}}</a></span>
              </p>-->

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
                  style="padding:5px 0 ;width:45%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  境内收发货企业编号:
                  <a>{{Listdata.rcvgdEtpsNo}}</a>
                  <!-- <a
                    v-for="item in businessTypelist"
                    :key="item.index"
                  >{{Listdata.businessTypecd==item.index?item.title:''}}</a>-->
                </span>
                <span
                  style="padding:5px 0 ;width:45%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  境内收发货企业名称 :
                  <a>{{Listdata.rcvgdEtpsNm}}</a>
                </span>
                <span
                  style="padding:5px 0 ;width:45%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  承运车车牌号 :
                  <a>{{Listdata.vehicleNo}}</a>
                </span>
                <span
                  style="padding:5px 0 ;width:45%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  境内收发货企业社会信用代码 :
                  <a>{{Listdata.rcvgdEtpsSccd}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span
                  style="padding:5px 0 ;width:32%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  车自重 :
                  <a>{{Listdata.vehicleWt}}</a>
                </span>
                <span
                  style="padding:5px 0 ;width:32%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  车架重 :
                  <a>{{Listdata.vehicleFrameWt}}</a>
                </span>
                <span
                  style="padding:5px 0 ;width:32%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  总重量 :
                  <a>{{Listdata.totalWt}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span
                  style="padding:5px 0 ;width:32%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  ERP/WMS出入库类型 :
                  <!-- <a v-for="item in stockBillType" :key='item.stockBillType'>{{(Listdata.data[0].stockBillType||'')==item.stockBillType?item.billType:''}}</a> -->
                  <a>{{inExpTypeFormatter1(Listdata)}}</a>
                </span>
                <span
                  style="padding:5px 0 ;width:32%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  进出标志 :
                  <a>{{ioTypecdFormatter(Listdata)}}</a>
                </span>
                <span
                  style="padding:5px 0 ;width:32%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  料件、成品标志 :
                  <a>{{Listdata.mtpckEndprdTypecd&&mtpckEndprdTypecdFormatter(Listdata)}}</a>
                </span>
                <span
                  style="padding:5px 0 ;width:32%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  进出境关别 :
                  <a>{{impexpPortcdFormatter(Listdata)}}</a>
                </span>

                <span
                  style="padding:5px 0 ;width:32%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  集装箱号 :
                  <a>{{Listdata.containerNo}}</a>
                </span>
                <span
                  style="padding:5px 0 ;width:32%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  车架号 :
                  <a>{{Listdata.vehicleFrameNo}}</a>
                </span>
                <span
                  style="padding:5px 0 ;width:32%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  集装箱箱型 :
                  <a>{{Listdata.containerType}}</a>
                </span>
                <span
                  style="padding:5px 0 ;width:32%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  集装箱重 :
                  <a>{{Listdata.containerWt}}</a>
                </span>
                <span
                  style="padding:5px 0 ;width:32%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  货物总毛重 :
                  <a>{{Listdata.totalGrossWt}}</a>
                </span>
                <span
                  style="padding:5px 0 ;width:32%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  货物总净重 :
                  <a>{{Listdata.totalNetWt}}</a>
                </span>
                <span
                  style="padding:5px 0 ;width:50%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  总担保编号 :
                  <a>{{Listdata.grtNo}}</a>
                </span>
                <!-- <span
                  style="padding:5px 0 ;width:45%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  预记入企业账户时间 :
                  <a>{{Listdata.preRecAccountTime}}</a>
                </span>
                <span
                  style="padding:5px 0 ;width:45%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  正式记入企业账户时间 :
                  <a>{{Listdata.recAccountTime}}</a>
                </span>-->
                <span
                  style="padding:5px 0 ;width:70%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >
                  备注 :
                  <a>{{Listdata.rmk}}</a>
                </span>
              </p>
            </div>
          </div>
          <table style="border:1px solid #666;width:100%;border-collapse: collapse;">
            <tr>
              <td style="min-width: 60px;">凭证编号</td>
              <td>商品料号</td>
              <td>商品编码</td>
              <td>商品名称</td>
              <td>规格型号</td>

              <td>币制</td>
              <!-- <td>申报数量</td> -->

              <td style="min-width: 90px;">
                申报数量
                <br />申报计量单位
                <br />净重
              </td>
              <td style="min-width: 60px;">原产国(地区)</td>
              <td>总价</td>
            </tr>
            <tr v-for="item in Listdata.data" :key="item.id">
              <td style="min-width: 60px;">{{item.portNo}}</td>
              <td>{{item.copGNo}}</td>
              <td>{{item.hsCode}}</td>
              <td>{{item.gName}}</td>
              <td>{{item.gModel}}</td>
              <td style="min-width: 50px;">{{dclCurrcdFormatter(item.tradeCurr)}}</td>
              <td style="min-width: 90px;">
                {{item.qty}}
                <br />
                {{dclUnitcdTranslate(item)}}
                <br />
                {{item.netWt}}
                <!-- /{{item.tradeTotal}} -->
              </td>
              <td style="min-width: 60px;">{{natcdTranslate(item.originCountryCode)}}</td>
              <td style="min-width: 60px;">{{item.tradeTotal}}</td>
              <!-- <td>{{item.gdsMtno}}</td>-->
            </tr>
          </table>
        </div>

        <div class="addgenerate">
          <ep-form ref="Listdata" :rules="page_rules" :form="Listdata" name-width="5px">
            <ep-row :gutter="7">
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
              <ep-col :col="12">
                <ep-form-item label attr="mtpckEndprdTypecd">
                  <ep-select
                    placeholder="料件、成品标志"
                    v-model="Listdata.mtpckEndprdTypecd"
                    name="mtpckEndprdTypecd"
                  >
                    <ep-select-item index="I" label="料件"></ep-select-item>
                    <ep-select-item index="E" label="成品"></ep-select-item>
                    <ep-select-item index="S" label="设备"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item label attr="impexpPortcd">
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
                <ep-form-item attr="rcvgdEtpsNo" label>
                  <ep-input
                    placeholder="境内收发货企业编号"
                    v-model="Listdata.rcvgdEtpsNo"
                    name="rcvgdEtpsNo"
                    :maxlength="10"
                  ></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="rcvgdEtpsNm" label>
                  <ep-input
                    placeholder="境内收发货企业名称"
                    v-model.trim="Listdata.rcvgdEtpsNm"
                    name="rcvgdEtpsNm"
                    :maxlength="768"
                  ></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item title attr="rcvgdEtpsSccd" label>
                  <ep-input
                    placeholder="境内收发货企业社会信用代码"
                    v-model.trim="Listdata.rcvgdEtpsSccd"
                    :maxlength="18"
                    name="rcvgdEtpsSccd"
                  ></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="vehicleNo" label>
                  <ep-input
                    placeholder="承运车车牌号"
                    v-model.trim="Listdata.vehicleNo"
                    name="vehicleNo"
                    :maxlength="128"
                  ></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="containerNo" label>
                  <ep-input
                    placeholder="集装箱号"
                    v-model.trim="Listdata.containerNo"
                    name="containerNo"
                    :maxlength="12"
                  ></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="vehicleWt" label>
                  <ep-input
                    placeholder="车自重"
                    v-model.trim="Listdata.vehicleWt"
                    name="vehicleWt"
                    :maxlength="19"
                  ></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="vehicleFrameNo" label>
                  <ep-input
                    placeholder="车架号"
                    v-model.trim="Listdata.vehicleFrameNo"
                    name="vehicleFrameNo"
                    :maxlength="256"
                  ></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="vehicleFrameWt">
                  <ep-input
                    placeholder="车架重"
                    v-model.trim="Listdata.vehicleFrameWt"
                    name="vehicleFrameWt"
                    :maxlength="19"
                  ></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="containerType" label>
                  <ep-input
                    placeholder="集装箱箱型"
                    v-model.trim="Listdata.containerType"
                    name="containerType"
                    :maxlength="256"
                  ></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="containerWt" label>
                  <ep-input
                    placeholder="集装箱重"
                    v-model.trim="Listdata.containerWt"
                    name="containerWt"
                    :maxlength="19"
                  ></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="totalGrossWt" label>
                  <ep-input
                    placeholder="货物总毛重"
                    v-model.trim="Listdata.totalGrossWt"
                    name="totalGrossWt"
                    :maxlength="19"
                  ></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="totalNetWt" label>
                  <ep-input
                    placeholder="货物总净重"
                    v-model.trim="Listdata.totalNetWt"
                    name="totalNetWt"
                    :maxlength="19"
                  ></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="grtNo" label>
                  <ep-input
                    placeholder="总担保编号"
                    v-model.trim="Listdata.grtNo"
                    name="grtNo"
                    :maxlength="64"
                  ></ep-input>
                </ep-form-item>
              </ep-col>
              <!-- <ep-col :col="24">
                <ep-form-item label attr="preRecAccountTime">
                  <ep-date
                    placeholder="预记入企业账户时间"
                    v-model="Listdata.preRecAccountTime"
                    type="dateTime"
                    name="preRecAccountTime"
                  ></ep-date>
                </ep-form-item>
              </ep-col>
              <ep-col :col="24">
                <ep-form-item label attr="recAccountTime">
                  <ep-date
                    placeholder="正式记入企业账户时间"
                    v-model="Listdata.recAccountTime"
                    type="dateTime"
                    name="recAccountTime"
                  ></ep-date>
                </ep-form-item>
              </ep-col>-->
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
                <ep-select placeholder="是否报关" v-model="Listdata.dclcusFlag" name="dclcusFlag" :disabled="false">
                  <ep-select-item v-for="item in dclcusFlaglist" :key='item.index' :index="item.index" :label="item.title"></ep-select-item>
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
      type: Boolean
    },
    Listdata: {
      type: Object
    },
    headerData: {
      type: Array
    },
    mulFlag: {
      type: Boolean
    }
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
    let regExp = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/;

    let validateIdNum = (rule, value, callback) => {
      let newcarnum = value.toUpperCase();
      if (!newcarnum) {
        return callback(new Error("不能为空!!"));
      }
      if (!regExp.test(newcarnum)) {
        callback(new Error("请输入正确的车牌号"));
        return;
      } else {
        callback();
      }
    };
    return {
      saveLoading: false,
      applyLoading: false,
      typeFlag: false,
      isSave: false,
      timer: "",
      modelFlag: false,
      businessTypelist: [
        { index: "1", title: "中转" },
        { index: "2", title: "集拼" },
        { index: "3", title: "存储" },
        { index: "4", title: "加工" },
        { index: "5", title: "交易" },
        { index: "6", title: "展示" },
        { index: "7", title: "研发" },
        { index: "8", title: "再制造" },
        { index: "9", title: "检测维修" }
      ],
      mtpckEndprdTypelist: [
        { index: "I", title: "料件" },
        { index: "E", title: "成品" },
        { index: "S", title: "设备" }
      ],
      dclcusFlaglist: [
        { index: "1", title: "否" },
        { index: "2", title: "是" }
      ],
      dclcusTypelist: [
        { index: "1", title: "关联报关" },
        { index: "2", title: "对应报关" }
      ],
      page_rules: {
        totalGrossWt: {
          required: true,
          message: "不能为空",
          trigger: "change, blur"
        },
        rcvgdEtpsNo: {
          required: true,
          message: "不能为空",
          trigger: "change, blur"
        },
        rcvgdEtpsNm: {
          required: true,
          message: "不能为空",
          trigger: "change, blur"
        },
        vehicleNo: {
          required: true,
          validator: validateIdNum,
          trigger: "change, blur"
        },
        vehicleWt: {
          required: true,
          message: "不能为空",
          trigger: "change, blur"
        },
        bindTypecd: {
          required: true,
          message: "不能为空",
          trigger: "change, blur"
        },
        totalWt: {
          required: true,
          message: "不能为空",
          trigger: "change, blur"
        },
        mtpckEndprdTypecd: {
          required: true,
          message: "不能为空",
          trigger: "change, blur"
        },
        impexpPortcd: {
          required: true,
          message: "不能为空",
          trigger: "change, blur"
        },
        vehicleFrameWt: {
          required: true,
          message: "不能为空",
          trigger: "change, blur"
        },
        inExpType: { required: true, message: "不能为空", trigger: "change" },
        ieTypecd: { required: true, message: "不能为空", trigger: "change" },
        grtNo: { required: false, message: "不能为空", trigger: "change" }
      }
    };
  },
  computed: {},
  watch: {
    //总担保编号
    "Listdata.ieTypecd"(val, oldVal) {
      if (val == "E") {
        this.page_rules.grtNo.required = true;
      } else {
        this.page_rules.grtNo.required = false;
      }
    },
    // 车自重
    "Listdata.vehicleWt": {
      handler(newName, oldName) {
        if (newName === "0") {
          this.$pop({
            type: "danger",
            message: "车自重不能是零"
          });
          return;
        }
        if (
          newName !== null &&
          newName.charAt(0) == "0" &&
          newName.length > 1 &&
          newName.charAt(1) !== "."
        ) {
          this.$pop({
            type: "danger",
            message: "请输入正确的车自重"
          });
        }
        let reg = /^\d{0,13}(\.\d{0,5})?$/;
        if (!reg.test(newName)) {
          setTimeout(() => {
            this.Listdata.vehicleWt = oldName;
          });
        }
        let totalNumber = (
          this.Listdata.vehicleWt * 1 +
          this.Listdata.vehicleFrameWt * 1 +
          this.Listdata.containerWt * 1 +
          this.Listdata.totalGrossWt * 1
        ).toFixed(5);
        if (isNaN(totalNumber)) {
          this.Listdata.totalWt = "0.00000";
          // this.Listdata.totalWt.isNumber();
        } else {
          this.Listdata.totalWt = totalNumber;
        }
      }
    },
    // 车架重
    "Listdata.vehicleFrameWt": {
      handler(newName, oldName) {
        if (newName === "0") {
          this.$pop({
            type: "danger",
            message: "车架重不能是零"
          });
          return;
        }
        if (
          newName !== null &&
          newName.charAt(0) == "0" &&
          newName.length > 1 &&
          newName.charAt(1) !== "."
        ) {
          this.$pop({
            type: "danger",
            message: "请输入正确的车架重"
          });
        }
        let reg = /^\d{0,13}(\.\d{0,5})?$/;
        if (!reg.test(newName)) {
          setTimeout(() => {
            this.Listdata.vehicleFrameWt = oldName;
          });
        }

        let totalNumber = (
          this.Listdata.vehicleWt * 1 +
          this.Listdata.vehicleFrameWt * 1 +
          this.Listdata.containerWt * 1 +
          this.Listdata.totalGrossWt * 1
        ).toFixed(5);
        if (isNaN(totalNumber)) {
          this.Listdata.totalWt = "0.00000";
          // this.Listdata.totalWt.isNumber();
        } else {
          this.Listdata.totalWt = totalNumber;
        }
      },
      deep: true
    },
    // 集中箱重
    "Listdata.containerWt": {
      handler(newName, oldName) {
        if (
          newName !== null &&
          newName.charAt(0) == "0" &&
          newName.length > 1 &&
          newName.charAt(1) !== "."
        ) {
          this.$pop({
            type: "danger",
            message: "请输入正确的集中箱重"
          });
        }
        // let reg = /\d+(\.\d{0,5})?/
        let reg = /^\d{0,13}(\.\d{0,5})?$/;
        if (!reg.test(newName)) {
          setTimeout(() => {
            this.Listdata.containerWt = oldName;
          });
        }

        let totalNumber = (
          this.Listdata.vehicleWt * 1 +
          this.Listdata.vehicleFrameWt * 1 +
          this.Listdata.containerWt * 1 +
          this.Listdata.totalGrossWt * 1
        ).toFixed(5);
        if (isNaN(totalNumber)) {
          this.Listdata.totalWt = "0.00000";
          // this.Listdata.totalWt.isNumber();
        } else {
          this.Listdata.totalWt = totalNumber;
        }
      },
      deep: true
    },
    // 货物总毛重
    "Listdata.totalGrossWt": {
      handler(newName, oldName) {
        if (
          newName !== null &&
          newName.charAt(0) == "0" &&
          newName.length > 1 &&
          newName.charAt(1) !== "."
        ) {
          this.$pop({
            type: "danger",
            message: "请输入正确的货物总毛重"
          });
        }
        let reg = /^\d{0,13}(\.\d{0,5})?$/;
        if (!reg.test(newName)) {
          setTimeout(() => {
            this.Listdata.totalGrossWt = oldName;
          });
        }
        let totalNumber = (
          this.Listdata.vehicleWt * 1 +
          this.Listdata.vehicleFrameWt * 1 +
          this.Listdata.containerWt * 1 +
          this.Listdata.totalGrossWt * 1
        ).toFixed(5);
        if (isNaN(totalNumber)) {
          this.Listdata.totalWt = "0.00000";
          // this.Listdata.totalWt.isNumber();
        } else {
          this.Listdata.totalWt = totalNumber;
        }
      },
      deep: true
    },
    "Listdata.totalNetWt": {
      handler(newName, oldName) {
        if (
          newName !== null &&
          newName.charAt(0) == "0" &&
          newName.length > 1 &&
          newName.charAt(1) !== "."
        ) {
          this.$pop({
            type: "danger",
            message: "请输入正确的货物总净重"
          });
        }
        let reg = /^\d{0,13}(\.\d{0,5})?$/;
        if (!reg.test(newName)) {
          setTimeout(() => {
            this.Listdata.totalNetWt = oldName;
          });
        }
      }
    },
    modelFlag(value) {
      if (!value) {
        this.$emit("nowFlagChange", false);
        this.$refs["Listdata"].reset();
        // this.Listdata.id = "";
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
          this.Listdata.data.forEach(el => {
            if (!el.unitPrice) {
              let price =
                Number(el.tradeTotal) /
                (Number(el.remainQty) + Number(el.usedQty));
              el.unitPrice = price;
            }
            if (Number(el.qty) != Number(el.remainQty) + Number(el.usedQty)) {
              if (this.Listdata.ieTypecd == "I") {
                el.tradeTotal = "";
              } else
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
          message: "请输入正确的毛重"
        });
      }
      let reg = /^\d{0,14}(\.\d{0,5})?$/;
      if (!reg.test(val)) {
        setTimeout(() => {
          this.Listdata.grossWt = oldVal;
        });
      }
    }
  },

  methods: {
    close() {
      //关闭当前模块
      this.modelFlag = false;
      // if (this.isSave) {
      // this.$emit("success", true);
      this.isSave = false;
      // }
      this.$refs["Listdata"].reset();
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

    // 完成
    declare() {
      if (!this.Listdata.id) {
        this.$pop({
          type: "danger",
          message: "请先暂存!"
        });
        return;
      }
      this.applyLoading = true;

      this.$post("portReleasedeclare", { bscIds: [this.Listdata.id] })
        .then(res => {
          this.applyLoading = false;

          // this.$emit("success", true);
          this.close();
        })
        .catch(() => {
          this.applyLoading = false;
        });
    },
    success(Listdata) {
      if (this.Listdata.id) {
        this.$pop({
          type: "danger",
          message: "已暂存!"
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
      // this.Listdata.inExpType = this.Listdata.preData.stockBillType;
      // this.Listdata.dclcusFlag = this.dclcusFlag == "是" ? "2" : "1";
      // this.Listdata.dclcusTypecd = this.dclcusTypecd == "关联报关" ? "1" : "2";
      // this.Listdata.ieTypecd = this.Listdata.preData.stockBillType;
      let portReleaseDt = [];
      let portReleaseInexpRlt = [];
      this.Listdata.data &&
        this.Listdata.data.forEach(el => {
          let data = {
            portNo: el.stockBillNoPre,
            gdsMtno: el.copGNo,
            gdecd: el.hsCode,
            gdsNm: el.gName,
            gdsSpcfModelDesc: el.gModel,
            dclCurrcd: el.tradeCurr,
            dclQty: el.qty,
            dclUnitcd: el.gUnit,
            natcd: el.originCountryCode,
            netWt: el.netWt,
            dclTotalAmt: el.tradeTotal,
            stockDtId: String(el.id)
          };

          portReleaseDt.push(data);
        });
      this.headerData &&
        this.headerData.forEach(el => {
          if (el.Highlight) {
            let data1 = {
              inExpWhNo: el.stockBillNoPre,
              inExpTime: el.stockDate
            };
            portReleaseInexpRlt.push(data1);
          }
        });
      this.Listdata["portReleaseDt"] = portReleaseDt;
      this.Listdata["portReleaseInexpRlt"] = portReleaseInexpRlt;
      this.Listdata.id = "";
      this.Listdata.dragType = "1";
      let form = cloneObj(this.Listdata);
      delete form.data;
      delete form.preData;
      this.$refs["Listdata"].validate(valid => {
        if (valid) {
          this.saveLoading = true;

          this.$post("getStockBillSaveByDrag", form)
            .then(res => {
              this.Listdata.id = JSON.stringify(res.map.data);
              this.isSave = true;
              this.saveLoading = false;

              // this.$refs["Listdata"].reset();
              // this.$emit('success', true)
              // this.close();
            })
            .catch(() => {
              this.saveLoading = false;
            });
        }
      });
    }
  }
};
</script>


<style scoped>
.ep-form--item.is-required:before {
  content: '*';
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
input{
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
}
</style>