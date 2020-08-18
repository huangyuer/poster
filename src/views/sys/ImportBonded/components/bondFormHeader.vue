<template>
  <ep-form class="demo-form" ref="dateFrom" :form="dateFrom" :rules="page_rules" name-width="138px">
    <ep-row :gutter="7">
      <ep-col :col="8">
        <ep-form-item label="汇总类型">
          <ep-select v-model="bodyForm.isSumMonth" name="isSumMonth" @change="changMonth">
            <ep-select-item index="0" label="按日汇总"></ep-select-item>
            <ep-select-item index="1" label="按月汇总"></ep-select-item>
          </ep-select>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="月份" attr="month" v-if="monthStatus">
          <!-- <ep-date v-model="month" name="month"></ep-date> -->
          <ep-date v-model="month" type="month" name="month"></ep-date>
        </ep-form-item>
      </ep-col>
      <!-- <ep-col :col="8" v-if="!sumPreentNoFlag">
        <ep-form-item label="汇总统计编号" attr="sumPreentNo">
          <ep-input v-model="bodyFormsumPreentNo" name="sumPreentNo" :maxlength="20"></ep-input>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="汇总统计时间" :attr="sumPreentNoFlag? 'bodyFormSumBeginTime': ''">
          <ep-date-range v-model="dateFrom.bodyFormSumBeginTime" :date-options="!sumPreentNoFlag? {} : dateOptions" @change="sumChange"></ep-date-range>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8" v-if="!sumPreentNoFlag">
        <ep-form-item label="确认日期">
          <ep-date-range v-model="declareTime"></ep-date-range>
        </ep-form-item>
      </ep-col>
      <ep-col :col="16" v-if="sumPreentNoFlag">
        <ep-form-item label="情况说明">
          <ep-input v-model="bodyForm.rmk" name="rmk" type="textarea"></ep-input>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="状态" v-if="!sumPreentNoFlag">
          <ep-select v-model="dateFrom.optStatus" name="optStatus">
            <ep-select-item index="1" label="暂存"></ep-select-item>
            <ep-select-item index="18" label="已确认"></ep-select-item>
            <ep-select-item index="3" label="海关入库成功"></ep-select-item>
            <ep-select-item index="4" label="海关入库失败"></ep-select-item>
            <ep-select-item index="5" label="审核通过"></ep-select-item>
            <ep-select-item index="6" label="审核拒绝"></ep-select-item>
            <ep-select-item index="17" label="待审核"></ep-select-item>
            <ep-select-item index="99" label="已删除"></ep-select-item>
          </ep-select>
        </ep-form-item>
      </ep-col> -->
      <slot></slot>
    </ep-row>
  </ep-form>
</template>

<script>
import { cloneObj } from "utils";
import mixin from "../mixin";
import { getData } from "src/utils/date";
export default {
  mixins: [mixin],
  data() {
    return {
      dateFrom: {
        bodyFormSumBeginTime: "", //汇总日期
        rmk: "",
      },
      declareTime: "", // 申报日期
      bodyFormsumPreentNo: "", // 汇总统计编号
      sumPreentNoFlag: true, // 控制查询和录入的显示和隐藏
      month: "",
      monthStatus: false,
      bodyForm: {
        isSumMonth: "0",
        // id: "",
        // orgId: "",
        // sumPreentNo: "", //汇总统计编号
        // dclEtpsNm: this.$store.getters.getTradeName, //申报企业名称
        // dclEtpsNo: this.$store.getters.getTradeCode, //申报企业编号
        // dclEtpsSccd: this.$store.getters.getCreditCode, //申报企业信用代码
        // sumBeginTime: "", //汇总统计开始时间
        // sumDueTime: "", //汇总统计截止时间
        // sumDclTime: "", //申报日期
        // masterCuscd: this.$store.getters.getOrgCustomId, //主管关区代码
        // optStatus: "", //操作状态
        // rmk: ""
      },
      page_rules: {
        bodyFormSumBeginTime: {
          required: true,
          message: "不能为空",
          trigger: "change",
        },
      },
      isDeclare: false,
      // 禁用之后的日期
      dateOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  methods: {
    changMonth(value) {
      if (this.bodyForm.isSumMonth == "1") {
        this.monthStatus = true;
      } else {
        this.monthStatus = false;
        this.month = "";
      }
    },
    // 发起校验
    getValidate() {
      this.$refs["dateFrom"].validate((valid) => {
        if (valid) {
          this.isDeclare = true;
        } else {
          this.$pop({
            type: "danger",
            message: "暂存失败!",
          });
          this.isDeclare = false;
          return;
        }
      });
    },
    // 日期改变时根据数据来切割开始时间和截止时间
    sumChange(e) {
      if (e.length > 10) {
        let timer = e.split(",");
        this.bodyForm.sumBeginTime = timer[0];
        this.bodyForm.sumDueTime = timer[1];
      } else {
        this.bodyForm.sumBeginTime = "";
        this.bodyForm.sumDueTime = "";
      }
    },
    reset() {
      this.$refs.dateFrom.reset();
    },
  },
};
</script>

<style></style>
