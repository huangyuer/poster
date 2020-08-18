<template>
  <div>
    <ep-form
      ref="bodyForm"
      :form="bodyForm"
      name-width="168px"
      :rules="!isDtBody ? page_rules : {}"
    >
      <ep-row :gutter="7">
        <!-- 录入表头 -->
        <!-- <ep-col :col="8">
          <ep-form-item attr="whRecNo" label="仓单编号">
            <ep-input v-model="bodyForm.whRecNo" name="whRecNo" :disabled="!displayBlock"></ep-input>
          </ep-form-item>
        </ep-col>-->
        <ep-col :col="8">
          <ep-form-item attr="consumptionNo" label="耗料清单编号">
            <ep-input
              v-model="bodyForm.consumptionNo"
              name="consumptionNo"
              :disabled="!displayBlock || changeDis"
              :maxlength="64"
            ></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
            <ep-form-item attr="whRecPreentNo"
                          label="进出区提发货凭证编号">
              <ep-input v-model="bodyForm.whRecPreentNo"
                        name="whRecPreentNo"
                        :disabled="displayBlock"
                        :maxlength="64"></ep-input>
            </ep-form-item>
          </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="businessTypecd" label="业务类别">
            <ep-select
              v-model="bodyForm.businessTypecd"
              name="businessTypecd"
              :disabled="!displayBlock || changeDis"
            >
              <ep-select-item index="1" label="普通加工"></ep-select-item>
              <ep-select-item index="2" label="外发加工"></ep-select-item>
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
          <ep-form-item attr="bizopEtpsno" label="经营企业编号">
            <ep-input v-model="bodyForm.bizopEtpsno" name="bizopEtpsno" disabled></ep-input>
          </ep-form-item>
        </ep-col>
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
          <ep-form-item attr="dclData" label="申报时间">
            <ep-date v-model="bodyForm.dclData"  name="dclData" disabled></ep-date>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
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
        </ep-col>
        <!-- 查询明细 -->
        <!-- <ep-col :col="8">
          <ep-form-item attr="grtNo" label="总担保编号">
            <ep-input v-model="bodyForm.grtNo" name="grtNo" :disabled="!displayBlock"></ep-input>
          </ep-form-item>
        </ep-col>-->
        <!-- <ep-col :col="16">
          <ep-form-item attr="rmk" label="备注">
            <ep-input v-model="bodyForm.rmk" name="rmk" :disabled="!displayBlock" :maxlength="2000"></ep-input>
          </ep-form-item>
        </ep-col>-->
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
      loading: false,
      model: false,
      stateValue: this.inExpTypeVal,
      ep_page: {
        page: 1,
        size: 10,
      },
      totalcount: 0,
      buttonStatus: "",
      customSearch: {},
      page_rules: {
        consumptionNo: { required: true, message: "不能为空", trigger: "change" },

        businessTypecd: {
          required: true,
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
  },
  created() {

  },
  updated() {

  
  },
  watch: {
 
  
  },
  mounted() {},
  methods: {

  },
};
</script>
