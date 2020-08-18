<template>
  <div>
    <ep-form ref="bodyForm" :form="bodyForm" name-width="168px" :rules="!isDtBody ? page_rules : {}">
      <ep-row :gutter="7">
        <!-- 录入表头 -->
        <!-- <ep-col :col="8">
          <ep-form-item attr="whRecNo" label="仓单编号">
            <ep-input v-model="bodyForm.whRecNo" name="whRecNo" :disabled="!displayBlock"></ep-input>
          </ep-form-item>
        </ep-col>-->
        <ep-col :col="8">
          <ep-form-item attr="consumptionNo" label="耗料清单编号">
            <ep-input v-model="bodyForm.consumptionNo" name="consumptionNo" disabled :maxlength="64"></ep-input>
          </ep-form-item>
        </ep-col>
        <!-- <ep-col :col="8">
          <ep-form-item attr="businessDeclareNo" label="业务申报编号">
            <ep-input
              v-model="bodyForm.businessDeclareNo"
              name="businessDeclareNo"
              disabled
              :maxlength="64"
            ></ep-input>
          </ep-form-item>
        </ep-col> -->
        <ep-col :col="8">
          <ep-form-item label="业务申报编号" attr="businessDeclareNo">
            <ep-select v-model="bodyForm.businessDeclareNo" name="businessDeclareNo" filterable :disabled="!displayBlock || changeDis  || businessDeclareType || changeData">
              <ep-select-item v-for="item in UsedTypecd" :key="item.key" :index="item.buNo" :label="item.buNo"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <!-- <ep-col :col="8">
            <ep-form-item attr="whRecPreentNo"
                          label="进出区提发货凭证编号">
              <ep-input v-model="bodyForm.whRecPreentNo"
                        name="whRecPreentNo"
                        :disabled="displayBlock"
                        :maxlength="64"></ep-input>
            </ep-form-item>
          </ep-col> -->
        <ep-col :col="8">
          <ep-form-item attr="businessTypecd" label="业务类别">
            <ep-select v-model="bodyForm.businessTypecd" name="businessTypecd" :disabled="!displayBlock || changeDis || changeData" @change="businessT">
              <ep-select-item index="1" label="外发加工"></ep-select-item>
              <ep-select-item index="3" label="一般加工"></ep-select-item>

            </ep-select>
          </ep-form-item>
        </ep-col>
        <!-- <ep-col :col="8">
          <ep-form-item attr="mtpckEndprdTypecd" label="料件/成品标志">
            <ep-select v-model="bodyForm.mtpckEndprdTypecd" name="mtpckEndprdTypecd" :disabled="!displayBlock || changeDis">
              <ep-select-item index="I" label="料件"></ep-select-item>
              <ep-select-item index="E" label="成品"></ep-select-item>
              <ep-select-item index="S" label="设备"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>-->
        <ep-col :col="8">
          <ep-form-item attr="chgTmsCnt" label="变更次数">
            <ep-input v-model="bodyForm.chgTmsCnt" name="chgTmsCnt" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="dclTypecd" label="申报类型">
            <ep-select v-model="bodyForm.dclTypecd" name="dclTypecd" disabled>
              <ep-select-item index="1" label="备案"></ep-select-item>
              <ep-select-item index="2" label="变更"></ep-select-item>
              <ep-select-item index="3" label="作废"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="bizopEtpsNo" label="经营企业编号">
            <ep-input v-model="bodyForm.bizopEtpsNo" name="bizopEtpsNo" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <!-- <ep-col :col="8">
          <ep-form-item attr="contractNo" label="合同号">
            <ep-input v-model="bodyForm.contractNo" name="contractNo" disabled></ep-input>
          </ep-form-item>
        </ep-col> -->
        <ep-col :col="8">
          <ep-form-item attr="bizopEtpsNm" label="经营企业名称">
            <ep-input v-model="bodyForm.bizopEtpsNm" name="bizopEtpsNm" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="绑定标志" attr="passportUsedTypecd">
            <ep-select disabled v-model="bodyForm.passportUsedTypecd" name="passportUsedTypecd">
              <ep-select-item index="1" label="未绑定"></ep-select-item>
              <ep-select-item index="2" label="部分绑定"></ep-select-item>
              <ep-select-item index="3" label="已绑定"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="dclData" label="确认时间" v-if="dcldata">
            <ep-date v-model="bodyForm.dclData" name="dclData" disabled></ep-date>
          </ep-form-item>
        </ep-col>
        <!-- <ep-col :col="8">
          <ep-form-item attr="optStatus" label="状态">
            <ep-select
              v-model="bodyForm.optStatus"
              name="optStatus"
              disabled
            >
              <ep-select-item index="1" label="暂存"></ep-select-item>
              <ep-select-item index="18" label="已确认"></ep-select-item>
              <ep-select-item index="3" label="海关入库成功"></ep-select-item>
              <ep-select-item index="4" label="海关入库失败"></ep-select-item>
              <ep-select-item index="17" label="待审核"></ep-select-item>
              <ep-select-item index="5" label="审核通过"></ep-select-item>
              <ep-select-item index="6" label="审核拒绝"></ep-select-item>
              <ep-select-item index="99" label="已删除"></ep-select-item>
              <ep-select-item index="40" label="确认收货"></ep-select-item>
              <ep-select-item index="96" label="确认收货"></ep-select-item>
              <ep-select-item index="96" label="已作废"></ep-select-item>
              <ep-select-item index="95" label="作废确认"></ep-select-item>
              <ep-select-item index="20" label="变更确认"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col> -->
        <!-- 查询明细 -->
        <!-- <ep-col :col="8">
          <ep-form-item attr="grtNo" label="总担保编号">
            <ep-input v-model="bodyForm.grtNo" name="grtNo" :disabled="!displayBlock"></ep-input>
          </ep-form-item>
        </ep-col>-->
        <ep-col :col="16">
          <ep-form-item attr="rmk" label="备注">
            <ep-input v-model="bodyForm.rmk" name="rmk" :disabled="!displayBlock" :maxlength="2000"></ep-input>
          </ep-form-item>
        </ep-col>
      </ep-row>
    </ep-form>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import { cloneObj } from "utils";
import mixin from "../mixin";

export default {
  mixins: [mixin],
  extends: misList, // 务必继承
  data() {
    return {
      headColor: false,
      tableData: [],
      UsedTypecd: [],
      loading: false,
      model: false,
      stateValue: this.inExpTypeVal,
      ep_page: {
        page: 1,
        size: 10,
      },
      totalcount: 0,
      businessDeclareType: true,
      buttonStatus: "",
      customSearch: {},
      page_rules: {
        businessTypecd: {
          required: true,
          message: "不能为空",
          trigger: "change",
        },
        businessDeclareNo: {
          required: false,
          message: "不能为空",
          trigger: "change",
        },
      },
    };
  },
  // extends: misList, // 务必继承
  mixins: [misList, mixin],
  components: {},
  props: {
    changeData: {
      //  变更过来,表头不可以修改
      type: Boolean,
      default: false,
    },
    inExpTypeVal: {
      default: "",
    },
    changeDis: {
      default: false,
    },
    inExpTypeStatus: {
      default: false,
    },
    ieTypecdStatus: {
      default: false,
    },
    bodyForm: {
      type: Object,
      required: true,
    },
    displayBlock: {
      default: true,
    },
    isDtBody: {
      type: Boolean,
      default: false,
    },
    dcldata: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  updated() {},
  watch: {},
  mounted() {},
  methods: {
    changeTrade() {
      let type = this.bodyForm.businessTypecd;
      // console.log(like_tradeName)
      this.$post("findBuNoByType", { type }).then((res) => {
        this.UsedTypecd = res.map.data;
        console.log(this.UsedTypecd);
      });
    },
    businessT(value) {
      this.changeTrade();
      let businessType = value;
      console.log(businessType);
      if (businessType == 1) {
        this.businessDeclareType = false;
        this.page_rules.businessDeclareNo.required = true;
      } else {
        this.businessDeclareType = true;
        this.bodyForm.businessDeclareNo = "";
        this.page_rules.businessDeclareNo.required = false;
      }
      this.$emit("businessType", businessType);
    },
  },
};
</script>
