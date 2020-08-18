<template>
  <div>
    <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" :rules="page_rules" name-width="168px">
      <ep-row :gutter="10">
        <!-- <ep-col :col="8">
          <ep-form-item label="凭证编号" attr="portNo">
            <ep-input disabled v-model="bodyForm.portNo" name="portNo" :maxlength="64"></ep-input>
          </ep-form-item>
        </ep-col>-->
        <ep-col :col="8">
          <ep-form-item label="凭证编号" attr="preentNo">
            <ep-input disabled v-model.trim="bodyForm.preentNo" name="preentNo" :maxlength="64"></ep-input>
          </ep-form-item>
        </ep-col>

        <!-- <ep-col :col="8">
          <ep-form-item label="出入库编号" attr="inExpWhNo">
            <ep-input disabled v-model="bodyForm.inExpWhNo" name="inExpWhNo" :maxlength="64"></ep-input>
          </ep-form-item>
        </ep-col>-->
        <ep-col :col="8">
          <ep-form-item label="ERP/WMS出入库类型" attr="inExpType">
            <ep-select :disabled="inExpTypeDisabled" v-model="bodyForm.inExpType" name="inExpType" @change="trspChange">
              <ep-select-item index="6" label="进出境径予放行"></ep-select-item>
              <ep-select-item index="1" label="非径予放行货物"></ep-select-item>
              <ep-select-item index="2" label="先报后送"></ep-select-item>
              <ep-select-item index="3" label="分送集报"></ep-select-item>
              <!-- <ep-select-item index="4" disabled label="区内流转"></ep-select-item> -->
              <ep-select-item index="5" label="区间流转"></ep-select-item>
              <ep-select-item index="0" label="空车进出区"></ep-select-item>
              <ep-select-item index="7" label="临时进出区"></ep-select-item>
              <ep-select-item index="8" label="外发加工"></ep-select-item>
              <!-- <ep-select-item index="9" label="飞机试飞"></ep-select-item>  暂时禁用 -->

            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="绑定类型" attr="bindTypecd" v-if="bandType">
            <ep-select v-model="bodyForm.bindTypecd" name="bindTypecd" @change="bindTypecdChange" :disabled="bindTypecdShow">
              <ep-select-item :disabled="bindTypecdStatus" index="1" label="一车多票"></ep-select-item>
              <ep-select-item index="2" label="一车一票"></ep-select-item>
              <ep-select-item index="3" label="一票多车"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="进出标志" attr="ieTypecd">
            <ep-select v-model="bodyForm.ieTypecd" name="ieTypecd" @change="ioTypecdChange">
              <ep-select-item index="I" label="I-进区"></ep-select-item>
              <ep-select-item index="E" label="E-出区"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <!-- <ep-col :col="8">
          <ep-form-item label="经营企业编号" attr="bizopEtpsno">
            <ep-input v-model="bodyForm.bizopEtpsno" name="bizopEtpsno"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="经营单位名称" attr="bizopEtosNm">
            <ep-input v-model="bodyForm.bizopEtpsNm" name="bizopEtosNm"></ep-input>
          </ep-form-item>
        </ep-col>-->
        <!-- 新增 -->
        <!-- 新增 -->

        <ep-col :col="8">
          <ep-form-item label="料件/成品标志" attr="mtpckEndprdTypecd" v-if="mtpckEndprdTypecdShow">
            <ep-select v-model="bodyForm.mtpckEndprdTypecd" name="mtpckEndprdTypecd" @change="mtpckEndprdTypecdChange" :disabled="mtpckEndprdTypecdStatus">
              <ep-select-item index="I" label="料件"></ep-select-item>
              <ep-select-item index="E" label="成品"></ep-select-item>
              <ep-select-item index="S" label="设备"></ep-select-item>
              <ep-select-item index="L" label="边角料"></ep-select-item>
               <ep-select-item index="D" label="残次品"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="进出境关别" attr="impexpPortcd">
            <loc-codemap-select :name="'impexpPortcd'" :code="'customCode'" :cName="'customName'" :dataList="tradeInfo" :type="'custom'" :value.sync="bodyForm.impexpPortcd"></loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="rcvgdEtpsNo" label="境内收发货企业编号">
            <ep-input v-model.trim="bodyForm.rcvgdEtpsNo" :maxlength="10" name="rcvgdEtpsNo"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="rcvgdEtpsNm" label="境内收发货企业名称">
            <ep-input v-model.trim="bodyForm.rcvgdEtpsNm" name="rcvgdEtpsNm" :maxlength="768"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item title="境内收发货企业社会信用代码" attr="rcvgdEtpsSccd" label="境内收发货企业社会信用代码">
            <ep-input v-model.trim="bodyForm.rcvgdEtpsSccd" :maxlength="18" name="rcvgdEtpsSccd"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="vehicleNo" label="承运车车牌号">
            <ep-input v-model.trim="bodyForm.vehicleNo" name="vehicleNo" :maxlength="128"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="containerNo" label="集装箱号">
            <ep-input v-model.trim="bodyForm.containerNo" name="containerNo" :maxlength="12"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="vehicleWt" label="车自重">
            <ep-input v-model.trim="bodyForm.vehicleWt" name="vehicleWt" :maxlength="19"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="vehicleFrameNo" label="车架号">
            <ep-input v-model.trim="bodyForm.vehicleFrameNo" name="vehicleFrameNo" :maxlength="256"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="vehicleFrameWt" label="车架重">
            <ep-input v-model.trim="bodyForm.vehicleFrameWt" name="vehicleFrameWt" :maxlength="19"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="containerType" label="集装箱箱型">
            <ep-input v-model.trim="bodyForm.containerType" name="containerType" :maxlength="256"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="containerWt" label="集装箱重">
            <ep-input v-model.trim="bodyForm.containerWt" name="containerWt" :maxlength="19"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="totalWt" label="总重量">
            <ep-input v-model.trim="bodyForm.totalWt" name="totalWt" :maxlength="19" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="totalGrossWt" label="货物总毛重">
            <ep-input :disabled="weightStatus" v-model.trim="bodyForm.totalGrossWt" name="totalGrossWt" :maxlength="19"></ep-input>
          </ep-form-item>
        </ep-col>

        <ep-col :col="8">
          <ep-form-item attr="totalNetWt" label="货物总净重">
            <ep-input :disabled="weightStatus" v-model.trim="bodyForm.totalNetWt" name="totalNetWt" :maxlength="19"></ep-input>
          </ep-form-item>
        </ep-col>
        <!-- <ep-col :col="8">
          <ep-form-item label="ERP/WMS出入库日期" attr="inExpTime">
            <ep-date v-model="bodyForm.inExpTime" name="inExpTime" type="dateTime"></ep-date>
          </ep-form-item>
        </ep-col> -->
        <!-- <ep-col :col="8">
          <ep-form-item
            label="申报日期"
            attr="dclTime"
          >
            <ep-date
              v-model="bodyForm.dclTime"
              name="dclTime"
            ></ep-date>
          </ep-form-item>
        </ep-col>-->
        <ep-col :col="8">
          <ep-form-item label="预记入企业账户时间" attr="preRecAccountTime">
            <ep-date v-model="bodyForm.preRecAccountTime" type="dateTime" name="preRecAccountTime"></ep-date>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="正式记入企业账户时间" attr="recAccountTime">
            <ep-date v-model="bodyForm.recAccountTime" type="dateTime" name="recAccountTime"></ep-date>
          </ep-form-item>
        </ep-col>
        <!-- <ep-col :col="8">
          <ep-form-item label="进出卡口状态" attr="invtIochkptStucd">
            <ep-select
              v-model="bodyForm.invtIochkptStucd"
              name="invtIochkptStucd"
            >
              <ep-select-item index="1" label="未过卡"></ep-select-item>
              <ep-select-item index="2" label="已过卡"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>-->
        <!-- <ep-col :col="8">
          <ep-form-item
            label="是否记入企业账户标记"
            attr="recAccountFlag"
          >
            <ep-select
              v-model="bodyForm.recAccountFlag"
              name="recAccountFlag"
            >
              <ep-select-item
                index="0"
                label="不计入"
              ></ep-select-item>
              <ep-select-item
                index="1"
                label="计入"
              ></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>-->
        <!-- <ep-col :col="8">
          <ep-form-item label="ERP/WMS出入库编号" attr="inExpWhNo">
            <ep-input v-model.trim="bodyForm.inExpWhNo" name="inExpWhNo" :maxlength="64"></ep-input>
          </ep-form-item>
        </ep-col> -->

        <!-- <ep-col :col="8">
          <ep-form-item
            attr="vehicleIcNo"
            label="IC卡号"
          >
            <ep-input
              v-model="bodyForm.vehicleIcNo"
              name="vehicleIcNo"
              :maxlength="256"
            ></ep-input>
          </ep-form-item>
        </ep-col>-->

        <!-- <ep-col :col="8">
          <ep-form-item attr="passCollectWt" label="卡口地磅采集重量">
            <ep-input
              v-model="bodyForm.passCollectWt"
              name="passCollectWt"
              :maxlength="256"
            ></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="wtError" label="重量比对误差">
            <ep-input
              v-model="bodyForm.wtError"
              name="wtError"
              :maxlength="256"
            ></ep-input>
          </ep-form-item>
        </ep-col>-->

        <!-- <ep-col :col="8">
          <ep-form-item
            label="过卡时间1"
            attr="passTime"
          >
            <ep-date
              v-model="bodyForm.passTime"
              name="passTime"
              type="dateTime"
            ></ep-date>
          </ep-form-item>
        </ep-col>-->
        <!-- <ep-col :col="8">
          <ep-form-item
            label="过卡时间2"
            attr="secdPassTime"
          >
            <ep-date
              v-model="bodyForm.secdPassTime"
              name="secdPassTime"
              type="dateTime"
            ></ep-date>
          </ep-form-item>
        </ep-col>-->
        <!-- <ep-col :col="8">
          <ep-form-item
            label="分送集报标志"
            attr="bindUsedTypecd"
          >
            <ep-select
              v-model="bodyForm.bindUsedTypecd"
              name="bindUsedTypecd"
            >
              <ep-select-item
                index="1"
                label="未集报"
              ></ep-select-item>
              <ep-select-item
                index="2"
                label="已绑定未集报"
              ></ep-select-item>
              <ep-select-item
                index="3"
                label="已集报"
              ></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>-->
        <ep-col :col="8">
          <ep-form-item label="总担保编号" attr="grtNo">
            <ep-input v-model.trim="bodyForm.grtNo" name="grtNo" :disabled="grtNoStatus" :maxlength="64"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item :label="'关联单证号'" attr="rltPortRecNo" v-if='!rltPortRecNoStatus'>
            <ep-input v-model.trim="bodyForm.rltPortRecNo" name="rltPortRecNo" disabled :maxlength="64"></ep-input>
          </ep-form-item>
          <ep-form-item :label="'关联单证号'" attr="rltPortRecNo" v-if='rltPortRecNoStatus'>
            <!-- <loc-codemap-select :name="'rltPortRecNo'" :code="'code'" :cName="'cName'" :dataList="UsedTypecd" :value.sync="bodyForm.rltPortRecNo"></loc-codemap-select> -->

            <ep-select v-model="bodyForm.rltPortRecNo" name="rltPortRecNo" filterable @change="rltPortRecNoChange">
                <ep-select-item v-for="item in UsedTypecd" :key="item.key" :index="item.buNo" :label="item.buNo" ></ep-select-item>
            </ep-select>
            <!-- <ep-select-item index="I" label="料件"></ep-select-item>
            <ep-select-item index="E" label="成品"></ep-select-item>
            <ep-select-item index="S" label="设备"></ep-select-item> -->
            <!-- </ep-select> -->
            <!-- <ep-input v-model.trim="bodyForm.rltPortRecNo" name="rltPortRecNo" :maxlength="64"></ep-input> -->
            <!--    <ep-select v-model="bodyForm.rltWhRecNo" name="rltWhRecNo"  filterable>
                            <ep-select-item v-for="item in UsedTypecd" :key="item.key" :index="item.buNo" :label="item.buNo" ></ep-select-item>
                          </ep-select> -->
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="申报类型" attr="dclTypecd">
            <ep-select v-model="bodyForm.dclTypecd" name="dclTypecd" disabled>
              <ep-select-item index="1" label="备案"></ep-select-item>
              <ep-select-item index="2" label="变更"></ep-select-item>
              <ep-select-item index="3" label="作废"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="主管海关" attr="masterCuscd">
            <loc-codemap-select disabled :name="'masterCuscd'" :code="'customCode'" :cName="'customName'" :dataList="tradeInfo" :type="'custom'" :value.sync="bodyForm.masterCuscd"></loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="16">
          <ep-form-item label="备注" attr="rmk">
            <ep-input v-model.trim="bodyForm.rmk" name="rmk" :maxlength="400" type="textarea"></ep-input>
          </ep-form-item>
        </ep-col>
      </ep-row>
    </ep-form>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import mixin from "../mixin";

export default {
  extends: misList, // 务必继承
  mixins: [mixin],
  components: {},
  props: {
    bodyForm: {
      type: Object,
      required: true,
    },
    inExpTypeDisabled: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
  },
  data() {
    // let regExp = /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/;
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
      mtpckEndprdTypecdShow: true,
      UsedTypecd: [], // 关联单证号，下拉框
      rltPortRecNoStatus: false, //  出入库类型为 7 8 表头增加字段
      grtNoStatus: false,
      mtpckEndprdTypecdStatus: false,
      bandType: true,
      weightStatus: false,
      rltPortRecNoStauts: false,
      bindTypecdShow: true, // 绑定状态是否显示
      bindTypecdStatus: false, //一票多车是否可以选择
      page_rules: {
        rltPortRecNo: {
          required: false,
          message: "不能为空",
          trigger: "change",
        },
        inExpType: { required: true, message: "不能为空", trigger: "change" },
        // rltPortRecNo:{required: true, message: "不能为空", trigger: "change"},
        impexpPortcd: {
          required: true,
          message: "不能为空",
          trigger: "change",
        },
        businessTypecd: {
          required: true,
          message: "不能为空",
          trigger: "change",
        },
        mtpckEndprdTypecd: {
          required: true,
          message: "不能为空",
          trigger: "change",
        },
        rcvgdEtpsNm: { required: true, message: "不能为空", trigger: "change" },
        rcvgdEtpsNo: { required: true, message: "不能为空", trigger: "change" },
        vehicleNo: {
          required: true,
          validator: validateIdNum,
          trigger: "blur",
        },
        vehicleWt: { required: true, message: "不能为空", trigger: "change" },
        vehicleFrameWt: {
          required: true,
          message: "不能为空",
          trigger: "change",
        },
        bindTypecd: { required: false, message: "不能为空", trigger: "change" },
        totalWt: { required: true, message: "不能为空", trigger: "change" },
        totalGrossWt: {
          required: true,
          message: "不能为空",
          trigger: "change",
        },

        ieTypecd: {
          required: true,
          message: "不能为空",
          trigger: "change",
        },
        grtNo: {
          required: false,
          message: "不能为空",
          trigger: "change",
        },
      },
      firstLoad: false, // 页面首次加载
      firstLoad1: false,
      firstLoad2: false,
      firstLoad3: false,
      firstLoad4: false,
    };
  },
  watch: {
    // 车自重
    "bodyForm.vehicleWt": {
      handler(newName, oldName) {
        if (newName === "0") {
          this.$pop({
            type: "danger",
            message: "车自重不能是零",
          });
          setTimeout(() => {
            this.bodyForm.vehicleWt = "";
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
            message: "请输入正确的车自重",
          });
        }
        let reg = /^\d{0,13}(\.\d{0,5})?$/;
        if (!reg.test(newName)) {
          setTimeout(() => {
            this.bodyForm.vehicleWt = oldName;
          });
        }
        let totalNumber = (
          this.bodyForm.vehicleWt * 1 +
          this.bodyForm.vehicleFrameWt * 1 +
          this.bodyForm.containerWt * 1 +
          this.bodyForm.totalGrossWt * 1
        ).toFixed(5);
        if (isNaN(totalNumber)) {
          this.bodyForm.totalWt = "0.00000";
          this.isNumber();
        } else {
          this.bodyForm.totalWt = totalNumber;
        }
      },
    },
    // 车架重
    "bodyForm.vehicleFrameWt": {
      handler(newName, oldName) {
        if (newName === "0") {
          this.$pop({
            type: "danger",
            message: "车架重不能是零",
          });
          setTimeout(() => {
            this.bodyForm.vehicleFrameWt = "";
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
            message: "请输入正确的车架重",
          });
        }
        let reg = /^\d{0,13}(\.\d{0,5})?$/;
        if (!reg.test(newName)) {
          setTimeout(() => {
            this.bodyForm.vehicleFrameWt = oldName;
          });
        }

        let totalNumber = (
          this.bodyForm.vehicleWt * 1 +
          this.bodyForm.vehicleFrameWt * 1 +
          this.bodyForm.containerWt * 1 +
          this.bodyForm.totalGrossWt * 1
        ).toFixed(5);
        if (isNaN(totalNumber)) {
          this.bodyForm.totalWt = "0.00000";
          this.isNumber();
        } else {
          this.bodyForm.totalWt = totalNumber;
        }
      },
      deep: true,
    },
    // 集中箱重
    "bodyForm.containerWt": {
      handler(newName, oldName) {
        if (newName === "0") {
          this.$pop({
            type: "danger",
            message: "集中箱重不能是零",
          });
          setTimeout(() => {
            this.bodyForm.containerWt = "";
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
            message: "请输入正确的集中箱重",
          });
        }
        // let reg = /\d+(\.\d{0,5})?/
        let reg = /^\d{0,13}(\.\d{0,5})?$/;
        if (!reg.test(newName)) {
          setTimeout(() => {
            this.bodyForm.containerWt = oldName;
          });
        }

        let totalNumber = (
          this.bodyForm.vehicleWt * 1 +
          this.bodyForm.vehicleFrameWt * 1 +
          this.bodyForm.containerWt * 1 +
          this.bodyForm.totalGrossWt * 1
        ).toFixed(5);
        if (isNaN(totalNumber)) {
          this.bodyForm.totalWt = "0.00000";
          this.isNumber();
        } else {
          this.bodyForm.totalWt = totalNumber;
        }
      },
      deep: true,
    },
    // 货物总毛重
    "bodyForm.totalGrossWt": {
      handler(newName, oldName) {
        console.log("newName", newName, this.bodyForm.inExpType);
        if (this.bodyForm.inExpType != 0) {
          if (newName == 0 && newName != "") {
            this.$pop({
              type: "danger",
              message: "货物总毛重不能是零",
            });
            setTimeout(() => {
              this.bodyForm.totalGrossWt = "";
            });
          } else {
          }
        }
        if (
          newName !== null &&
          newName.charAt(0) == "0" &&
          newName.length > 1 &&
          newName.charAt(1) !== "."
        ) {
          this.$pop({
            type: "danger",
            message: "请输入正确的货物总毛重",
          });
        }
        let reg = /^\d{0,13}(\.\d{0,5})?$/;
        if (!reg.test(newName)) {
          setTimeout(() => {
            this.bodyForm.totalGrossWt = oldName;
          });
        }
        let totalNumber = (
          this.bodyForm.vehicleWt * 1 +
          this.bodyForm.vehicleFrameWt * 1 +
          this.bodyForm.containerWt * 1 +
          this.bodyForm.totalGrossWt * 1
        ).toFixed(5);
        if (isNaN(totalNumber)) {
          this.bodyForm.totalWt = "0.00000";
          this.isNumber();
        } else {
          this.bodyForm.totalWt = totalNumber;
        }
      },
      deep: true,
    },
    "bodyForm.totalNetWt": {
      handler(newName, oldName) {
        if (this.bodyForm.inExpType != 0) {
          if (newName == 0 && newName != "") {
            this.$pop({
              type: "danger",
              message: "货物总净重不能是零",
            });
            setTimeout(() => {
              this.bodyForm.totalNetWt = "";
            });
          } else {
          }
        }
        if (
          newName !== null &&
          newName.charAt(0) == "0" &&
          newName.length > 1 &&
          newName.charAt(1) !== "."
        ) {
          this.$pop({
            type: "danger",
            message: "请输入正确的货物总净重",
          });
        }
        let reg = /^\d{0,13}(\.\d{0,5})?$/;
        if (!reg.test(newName)) {
          setTimeout(() => {
            this.bodyForm.totalNetWt = oldName;
          });
        }
      },
    },
  },
  created() {},
  computed: {
    tradeInfo() {
      return this.$store.getters.getCustomList;
    },
  },

  mounted() {
    console.log("ssssss", this.$route.query.id);
  },
  methods: {
    rltPortRecNoChange(value) {
      console.log("业务申报编号", value);
      if (this.$route.query.id) {
        this.$emit("rltPortRecNoChangeU", value);
      } else {
        this.$emit("rltPortRecNoChangeAdd", value);
      }
      if (!this.$route.query.id) {
        this.$store.dispatch("changeClearData", value + "sssss");
        sessionStorage.removeItem("formlated");
      }
      if (this.$route.query.id) {
        this.$store.dispatch("changeClearDataEdit", value + "ssss");
        sessionStorage.removeItem("formlated1");
      }

      this.firstLoad4 = true;
    },
    mtpckEndprdTypecdChange(value) {
      console.log("料件成品标志", value);
      if (this.$route.query.id) {
        this.$emit("mtpckEndprdTypecdChangeU", value);
      } else {
        this.$emit("mtpckEndprdTypecdChangeAdd", value);
        console.log("料件成品标1111志", value);
      }
      if (this.bodyForm.inExpType != 8 && this.bodyForm.ieTypecd == "I") {
        if (this.firstLoad3 && !this.$route.query.id) {
          this.$store.dispatch("changeClearData", value);
          sessionStorage.removeItem("formlated");
        }
        if (this.firstLoad3 && this.$route.query.id) {
          this.$store.dispatch("changeClearDataEdit", value);
          sessionStorage.removeItem("formlated1");
        }
      }
      this.firstLoad3 = true;
    },
    // 获取业务申报编号
    changeTrade(types) {
      let type = types; // console.log(like_tradeName)
      this.$post("sasDeclareFindBuNoByType", { type }).then((res) => {
        let listArr = res.map.data;
        // let listFileter = [];
        // listArr.forEach((item, index) => {
        //   let obj = {};
        //   obj.code = index;
        //   obj.cName = item;
        //   listFileter[index] = obj;
        // });
        // this.UsedTypecd = listFileter;
        this.UsedTypecd = listArr;
        console.log("llllllll", this.UsedTypecd);
      });
    },
    isNumber() {
      let reg = /^(?:[1-9]\d*|0)$/;
      if (isNaN(this.bodyForm.vehicleWt * 1)) {
        this.$pop({
          type: "danger",
          message: "请输入正确的车自重",
        });
      }
      if (isNaN(this.bodyForm.vehicleFrameWt * 1)) {
        this.$pop({
          type: "danger",
          message: "请输入正确的车架重",
        });
      }
      if (isNaN(this.bodyForm.containerWt * 1)) {
        this.$pop({
          type: "danger",
          message: "请输入正确的集中箱重",
        });
      }
      if (isNaN(this.bodyForm.totalGrossWt * 1)) {
        this.$pop({
          type: "danger",
          message: "请输入正确的货物总毛重",
        });
      }
    },
    // 切换 ERP/WMS出入库类型
    trspChange(value) {
      console.log("切换 ERP/WMS出入库类型", value);
      if (this.firstLoad2 && !this.$route.query.id) {
        this.$store.dispatch("changeClearData", value + 30);
      }
      if (this.firstLoad2 && this.$route.query.id) {
        this.$store.dispatch("changeClearDataEdit", value + 30);
      }
      if (this.$route.query.id) {
        this.$store.dispatch("changeinExpTypeEdit", value);
        console.log("修改页面");
      } else {
        this.$store.dispatch("changeinExpType", value);
        sessionStorage.removeItem("formlated");
        console.log("生成页面");
      }
      if (value == 0) {
        this.mtpckEndprdTypecdStatus = true;
        this.page_rules.mtpckEndprdTypecd.required = false;
        this.page_rules.impexpPortcd.required = false;
        this.weightStatus = true;
        this.bodyForm.totalGrossWt = "0";
        this.bodyForm.totalNetWt = "0";
        this.bodyForm.mtpckEndprdTypecd = "";
        this.bodyForm.bindTypecd = "";
        this.bodyForm.impexpPortcd = "";
      } else {
        this.weightStatus = false;
        this.mtpckEndprdTypecdStatus = false;
        this.page_rules.mtpckEndprdTypecd.required = true;
        this.page_rules.impexpPortcd.required = true;
      }
      // 总担保是否需要填写校验
      if (
        (value == 3 && this.bodyForm.ieTypecd == "E") ||
        (value == 8 && this.bodyForm.ieTypecd == "E") ||
        (value == 7 && this.bodyForm.ieTypecd == "E")
      ) {
        // 如果是出入库是 3 8 7 出区 总担保编号必填
        this.page_rules.grtNo.required = true;
        this.grtNoStatus = false;
      } else if (
        (value == 3 && this.bodyForm.ieTypecd == "I") ||
        (value == 8 && this.bodyForm.ieTypecd == "I") ||
        (value == 7 && this.bodyForm.ieTypecd == "I")
      ) {
        // 如果是出入库是 3  8 7进区 总担保编号非必填
        this.page_rules.grtNo.required = false;
        this.grtNoStatus = true;
        if (this.firstLoad2) {
          this.bodyForm.grtNo = "";
        }
        console.log("清空总担保111");
      }
      // 总担保是否需要填写校验结束

      // if (value == 7 || value == 9) {
      //   this.bindTypecdChange("");
      //   this.bandType = false;
      // } else {
      //   this.bandType = true;
      // }
      if (value == 7 && this.bodyForm.ieTypecd == "I") {
        // this.page_rules.rltPortRecNo.required = true;
        this.rltPortRecNoStauts = false;
      } else {
        // this.page_rules.rltPortRecNo.required = false;
        this.rltPortRecNoStauts = true;
      }

      if (
        value == 3 ||
        value == 0 ||
        (value == 8 && this.bodyForm.ieTypecd == "E") ||
        (value == 9 && this.bodyForm.ieTypecd == "E") ||
        value == 7
      ) {
        this.bindTypecdShow = true;
        this.bodyForm.bindTypecd = "";
        this.page_rules.bindTypecd.required = false;
      } else {
        this.bindTypecdShow = false;
        this.page_rules.bindTypecd.required = true;
      }
      if (value == 8 || value == 9) {
        //  出入库类型为 8 的   关联业务单证号
        // this.bodyForm.rltPortRecNo = "";
        this.rltPortRecNoStatus = true;
        this.bindTypecdStatus = true;

        this.page_rules.rltPortRecNo.required = true;
      } else {
        this.rltPortRecNoStatus = false;
        this.bindTypecdStatus = false;
        this.page_rules.rltPortRecNo.required = false;
      }
      if (value == 8) {
        this.changeTrade("1");
      } else if (value == 9) {
        this.changeTrade("2");
      }
      if (this.firstLoad2 && value != 8) {
        this.bodyForm.rltPortRecNo = "";
      }

      if (value == 8 && this.bodyForm.ieTypecd == "E") {
        this.mtpckEndprdTypecdShow = true;
      } else if (value == 8 && this.bodyForm.ieTypecd == "I") {
        this.mtpckEndprdTypecdShow = false;
      } else {
        this.mtpckEndprdTypecdShow = true;
      }
      // if (value == 2) {
      //   this.bindTypecdStatus = true;
      //   if (!this.inExpTypeDisabled) {
      //     this.bodyForm.bindTypecd = "";
      //   }
      // } else {
      //   this.bindTypecdStatus = false;
      // }
      this.firstLoad2 = true;
    },
    //  绑定类型修改
    bindTypecdChange(value) {
      if (this.firstLoad && !this.$route.query.id) {
        this.$store.dispatch("changeClearData", value);
        console.log("绑定类型改变");
        sessionStorage.removeItem("formlated");
      }
      if (this.firstLoad && this.$route.query.id) {
        this.$store.dispatch("changeClearDataEdit", value);
        this.$store.dispatch("changeBindTypecdEdit", value);

        sessionStorage.removeItem("formlated1");
      }
      if (this.$route.query.id) {
        this.$store.dispatch("changeBindTypecdEdit", value);
        // // sessionStorage.removeItem("formlated1");
      } else {
        this.$store.dispatch("changeBindTypecd", value);
        sessionStorage.removeItem("formlated");
      }

      if (this.bodyForm.bindTypecd == "1") {
        this.disabledDt = false;
      } else if (this.bodyForm.bindTypecd == "2") {
        this.disabledDt = false;
      } else {
        this.disabledDt = true;
      }
      this.firstLoad = true;
    },
    // 进出口类型改变
    ioTypecdChange(value) {
      console.log("进出口类型改变");

      if (this.firstLoad1 && !this.$route.query.id) {
        this.$store.dispatch("changeClearData", value);
        console.log("进出口类型改变");
      }
      if (this.$route.query.id && this.firstLoad1) {
        this.$store.dispatch("changeClearDataEdit", value);
        sessionStorage.removeItem("formlated1");
      }
      if (this.$route.query.id) {
        this.$store.dispatch("changeIoTypecdStatusEdit", value);
        // sessionStorage.removeItem("formlated1");
      } else {
        this.$store.dispatch("changeIoTypecdStatus", value);
        sessionStorage.removeItem("formlated");
      }
      if (
        (value == "E" && this.bodyForm.inExpType == "3") ||
        (value == "E" && this.bodyForm.inExpType == "8")
      ) {
        this.page_rules.grtNo.required = true;
        this.grtNoStatus = false;
      } else if (
        (value == "I" && this.bodyForm.inExpType == "3") ||
        (value == "I" && this.bodyForm.inExpType == "7" && this.firstLoad1) ||
        (value == "I" && this.bodyForm.inExpType == "8")
      ) {
        this.page_rules.grtNo.required = false;
        this.grtNoStatus = true;
        if (this.firstLoad1) {
          this.bodyForm.grtNo = "";
        }
        // this.bodyForm.grtNo = "";
        console.log("清空总担保222");
      }
      if (value == "I" && this.bodyForm.inExpType == "7") {
        // this.page_rules.rltPortRecNo.required = true;
        this.rltPortRecNoStauts = false;
      }
      if (
        (value == "E" && this.bodyForm.inExpType == "8") ||
        (value == "E" && this.bodyForm.inExpType == "9")
      ) {
        this.bindTypecdShow = true;
        this.bodyForm.bindTypecd = "";
        this.page_rules.bindTypecd.required = false;
      }
      if (
        (value == "I" && this.bodyForm.inExpType == "8") ||
        (value == "I" && this.bodyForm.inExpType == "9")
      ) {
        this.bindTypecdShow = false;
        // this.bodyForm.bindTypecd = "";

        this.page_rules.bindTypecd.required = true;
      }
      if (value == "E" && this.bodyForm.inExpType == "7") {
        this.bodyForm.rltPortRecNo = "";
        this.page_rules.grtNo.required = true;
        this.grtNoStatus = false;
        this.rltPortRecNoStauts = true;
        if (this.firstLoad1) {
          this.bodyForm.grtNo = "";
        }
      }
      if (value == "E" && this.bodyForm.inExpType == "8") {
        this.mtpckEndprdTypecdShow = true;
      } else if (value == "I" && this.bodyForm.inExpType == "8") {
        this.mtpckEndprdTypecdShow = false;
      } else {
        this.mtpckEndprdTypecdShow = true;
      }
      if (value == "I") {
        // 进区总担保禁止填写
        this.grtNoStatus = true;
        this.page_rules.grtNo.required = false;
        if (this.$route.query.id && this.firstLoad1) {
          this.bodyForm.grtNo = "";
        } else if (!this.$route.query.id) {
          this.bodyForm.grtNo = "";
        }
      } else {
        this.grtNoStatus = false;
      }
      this.firstLoad1 = true;
    },
  },
};
</script>
