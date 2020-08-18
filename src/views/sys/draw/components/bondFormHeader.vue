<template>
  <ep-form class="demo-form" ref="dateFrom" :form="dateFrom" :rules="page_rules" name-width="168px">
    <ep-row :gutter="10">
      <ep-col :col="8">
        <ep-form-item label="汇总统计编号" attr="sumPreentNo">
          <ep-input v-model="bodyForm.sumPreentNo" name="sumPreentNo" :maxlength="20"></ep-input>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="监管方式" attr="supvModecd">
          <ep-input v-model="bodyFormsupvModecd" name="supvModecd" :maxlength="20"></ep-input>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="进出境关别" attr="impexpPortcd">
          <ep-input v-model="bodyFormimpexpPortcd" name="impexpPortcd" :maxlength="20"></ep-input>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="境内收发货企业名称" attr="rcvgdEtpsNm">
         <ep-input v-model="bodyFormrcvgdEtpsNm" name="rcvgdEtpsNm" :maxlength="20"></ep-input>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="进出标志" attr="ieTypecd">
          <ep-select v-model="bodyFormieTypecd" name="ieTypecd">
            <ep-select-item index="I" label="进区"></ep-select-item>
            <ep-select-item index="E" label="出区"></ep-select-item>
          </ep-select>
          </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="汇总统计时间" :attr="sumPreentNoFlag? 'bodyFormSumBeginTime': ''">
          <ep-date-range v-model="dateFrom.bodyFormSumBeginTime" :date-options="!sumPreentNoFlag? {} : dateOptions" @change="sumChange"></ep-date-range>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="确认日期">
          <ep-date-range v-model="declareTime"></ep-date-range>
        </ep-form-item>
      </ep-col>
      <slot></slot>
    </ep-row>
  </ep-form>
</template>

<script>
import { cloneObj } from 'utils'
import mixin from '../mixin'
import { getData } from 'src/utils/date'
export default {
  mixins: [mixin],
  data () {
    return {
      dateFrom: {
        bodyFormSumBeginTime: '', //汇总日期 
      },
      declareTime: '', // 申报日期
      bodyFormsumPreentNo: '', // 汇总统计编号
      sumPreentNoFlag: true, // 控制查询和录入的显示和隐藏
      bodyForm: {
        id: '',
        orgId: '',
        sumPreentNo: '', //汇总统计编号
        dclEtpsNm: this.$store.getters.getTradeName, //申报企业名称
        dclEtpsNo: this.$store.getters.getTradeCode, //申报企业编号
        dclEtpsSccd: this.$store.getters.getCreditCode, //申报企业信用代码
        sumBeginTime: '', //汇总统计开始时间
        sumDueTime: '', //汇总统计截止时间
        sumDclTime: '', //申报日期
        masterCuscd: this.$store.getters.getOrgCustomId, //主管关区代码
        rcvgdEtpsNm: '' ,//操作状态
        supvModecd:'',
        impexpPortcd:'',
        ieTypecd:'',
      },
      page_rules: {
        bodyFormSumBeginTime: {
          required: true,
          message: '不能为空',
          trigger: 'change'
        }
      },
      isDeclare: false,
      // 禁用之后的日期
      dateOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
      }
    }
  },
  methods: {
    // 发起校验
    getValidate () {
      this.$refs['dateFrom'].validate(valid => {
        if (valid) {
          this.isDeclare = true
        } else {
          this.$pop({
            type: 'danger',
            message: '暂存失败!'
          })
          this.isDeclare = false
          return
        }
      })
    },
    // 日期改变时根据数据来切割开始时间和截止时间
    sumChange (e) {
      if (e.length > 10) {
        let timer = e.split(',')
        this.bodyForm.sumBeginTime = timer[0]
        this.bodyForm.sumDueTime = timer[1]
      } else {
        this.bodyForm.sumBeginTime = ''
        this.bodyForm.sumDueTime = ''
      }
    },
    reset () {
      this.$refs.dateFrom.reset()
    }
  }
}
</script>

<style></style>
