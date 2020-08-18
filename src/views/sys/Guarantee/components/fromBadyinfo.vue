<template>
  <div>
    <ep-form ref="bodyForm" :form="bodyForm" name-width="168px">
      <ep-row :gutter="20">
        <ep-col :col="8">
          <ep-form-item label="清单编号" attr="dpstLevyBlNo">
            <ep-input v-model="bodyForm.dpstLevyBlNo" name="dpstLevyBlNo" :maxlength="64" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="dclData" label="申报时间">
            <ep-date v-model="bodyForm.dclData" type="dateTime" name="dclData" disabled></ep-date>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="保函编号" attr="ltguaNo">
            <ep-input v-model="bodyForm.ltguaNo" name="ltguaNo" :maxlength="64" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="保函类型" attr="ltguaType">
            <ep-select v-model="bodyForm.ltguaType" name="ltguaType" disabled>
              <ep-select-item index="1" label="保证金"></ep-select-item>
              <ep-select-item index="2" label="保函"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="validDateStart" label="有效时间开始">
            <ep-date v-model="bodyForm.validDateStart" type="dateTime" name="validDateStart" disabled></ep-date>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="validDateEnd" label="有效时间结束">
            <ep-date v-model="bodyForm.validDateEnd" type="dateTime" name="validDateEnd" disabled></ep-date>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="申报类型" attr="dclTypecd">
            <ep-select v-model="bodyForm.dclTypecd" name="dclTypecd" disabled>
              <ep-select-item index="0" label="备案"></ep-select-item>
              <ep-select-item index="1" label="变更"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="金额" attr="grtAmt">
            <ep-input v-model="bodyForm.grtAmt" name="grtAmt" :maxlength="30" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="保函状态" attr="ltguaStatus">
            <ep-select v-model="bodyForm.ltguaStatus" name="ltguaStatus" disabled>
              <ep-select-item index="0" label="无效"></ep-select-item>
              <ep-select-item index="1" label="有效"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="绑定状态" attr="passportUsedTypecd">
            <ep-select v-model="bodyForm.passportUsedTypecd" name="passportUsedTypecd" disabled>
              <ep-select-item index="0" label="未绑定"></ep-select-item>
              <ep-select-item index="1" label="已绑定"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="被担保企业编号" attr="assuredEtpsno">
            <ep-input v-model="bodyForm.assuredEtpsno" name="assuredEtpsno" :maxlength="20" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="被担保企业名称" attr="assuredEtpsNm">
            <ep-input v-model="bodyForm.assuredEtpsNm" name="assuredEtpsNm" :maxlength="50" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="被担保企业信用代码" attr="assuredEtpsSccd">
            <ep-input v-model="bodyForm.assuredEtpsSccd" name="assuredEtpsSccd" :maxlength="20" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="收款单位名称" attr="mkclUnitNm">
            <ep-input v-model="bodyForm.mkclUnitNm" name="mkclUnitNm" :maxlength="50" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="收款单位开户银行" attr="mkclUnitOpaccBankNm">
            <ep-input
              v-model="bodyForm.mkclUnitOpaccBankNm"
              name="mkclUnitOpaccBankNm"
              :maxlength="50"
              disabled
            ></ep-input>
          </ep-form-item>
        </ep-col>
        <!-- <ep-col :col="8">
          <ep-form-item label="缴款单位银行账户" attr="pmEtpsBankAcctnum">
            <ep-input v-model="bodyForm.pmEtpsBankAcctnum" name="pmEtpsBankAcctnum" :maxlength="32" disabled></ep-input>
          </ep-form-item>
        </ep-col> -->
        <ep-col :col="8">
          <ep-form-item label="缴款企业名称" attr="pmnEtpsNm">
            <ep-input v-model="bodyForm.pmnEtpsNm" name="pmnEtpsNm" :maxlength="50" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="缴款企业信用代码" attr="pmnEtpsSccd">
            <ep-input v-model="bodyForm.pmnEtpsSccd" name="pmnEtpsSccd" :maxlength="20" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <!-- <ep-col :col="8">
          <ep-form-item label="缴款企业编号" attr="pmnEtpsno">
            <ep-input v-model="bodyForm.pmnEtpsno" name="pmnEtpsno" :maxlength="20" disabled></ep-input>
          </ep-form-item>
        </ep-col> -->
        <ep-col :col="8">
          <ep-form-item label="缴款企业开户银行" attr="pmnEtpsOpaccBankNm">
            <ep-input
              v-model="bodyForm.pmnEtpsOpaccBankNm"
              name="pmnEtpsOpaccBankNm"
              :maxlength="50"
              disabled
            ></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="缴款企业银行开户账号" attr="pmnEtpsBankAcctnum">
            <ep-input
              v-model="bodyForm.pmnEtpsBankAcctnum"
              name="pmnEtpsBankAcctnum"
              :maxlength="32"
              disabled
            ></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="状态" attr="status">
            <ep-select v-model="bodyForm.status" name="status" disabled>
              <ep-select-item index="1" label="暂存"></ep-select-item>
              <ep-select-item index="18" label="已确认"></ep-select-item>
              <ep-select-item index="3" label="海关入库"></ep-select-item>
              <ep-select-item index="4" label="海关入库失败"></ep-select-item>
              <ep-select-item index="5" label="审核通过"></ep-select-item>
              <ep-select-item index="6" label="审核拒绝"></ep-select-item>
              <ep-select-item index="17" label="转人工"></ep-select-item>
              <ep-select-item index="60" label="担保类型转企业确认"></ep-select-item>
              <ep-select-item index="61" label="担保类型审核退单"></ep-select-item>
              <ep-select-item index="99" label="删除"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="16">
          <ep-form-item label="备注" attr="rmk">
            <ep-input v-model="bodyForm.rmk" name="rmk" type="textarea" disabled></ep-input>
          </ep-form-item>
        </ep-col>
      </ep-row>
    </ep-form>
  </div>
</template>

<script>
import misList from "src/common/mislist";
export default {
  extends: misList, // 务必继承
  name: "fromBadyinfo",
  data() {
    return {
      headColor: true,
    };
  },
  mixins: [misList],
  components: {},
  props: {
    bodyForm: {
      type: Object,
      required: true
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
