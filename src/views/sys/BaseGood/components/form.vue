<template>
  <ep-form
    class="demo-form"
    ref="bodyForm"
    :form="bodyForm"
    :rules="(!isDetail && !isHistoryDetail) ? page_rules : {}"
    name-width="168px"
  >
    <ep-row :gutter="10">
      <ep-col :col="8">
        <ep-form-item label="商品料号" :name="'gdsMtno'" attr="gdsMtno">
          <ep-input
            v-model="bodyForm.gdsMtno"
            name="gdsMtno"
            :maxlength="32"
            :disabled="cantCorrect || isDetail || isGdsMtnoSave"
          ></ep-input>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="商品编码" :name="'gdecd'" attr="gdecd">
          <ep-input v-model="bodyForm.gdecd" name="gdecd" :maxlength="10" :disabled="isDetail"></ep-input>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="商检编码">
          <ep-input v-model="bodyForm.ciqCode" name="ciqCode" :maxlength="10" :disabled="isDetail"></ep-input>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8" v-if="!isDetail">
        <ep-form-item label="商品名称" attr="gdsNm">
          <ep-input v-model="bodyForm.gdsNm" name="gdsNm" :maxlength="768" :disabled="isDetail"></ep-input>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8" v-if="!isDetail">
        <ep-form-item label="规格型号">
          <ep-input
            v-model="bodyForm.gdsSpcfModelDesc"
            name="gdsSpcfModelDesc"
            :maxlength="768"
            :disabled="isDetail"
          ></ep-input>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="国别">
          <ep-select :label="countrys" v-model="bodyForm.natcd" name="natcd" :disabled="isDetail" filterable>
            <ep-select-item
              v-for="(item) in countrys"
              :key="item.id"
              :index="item.countryCode"
              :label="item.nameCn + ' ' + item.countryCode"
            ></ep-select-item>
          </ep-select>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="币制" filterable>
          <ep-select
            :label="currLists"
            :disabled="isDetail"
            v-model="bodyForm.dclCurrcd"
            name="dclCurrcd"
          >
            <ep-select-item
              v-for="(item) in currLists"
              :key="item.id"
              :index="item.currCode"
              :label="item.currName + ' ' + item.currCode"
            ></ep-select-item>
          </ep-select>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="计量单位">
          <ep-select
            :label="unitLists"
            :disabled="isDetail"
            v-model="bodyForm.dclUnitcd"
            name="dclUnitcd"
            filterable
          >
            <ep-select-item
              v-for="(item) in unitLists"
              :key="item.id"
              :index="item.unit"
              :label="item.unitName + ' ' + item.unit"
            ></ep-select-item>
          </ep-select>
        </ep-form-item>
      </ep-col>
      <div v-if="isDetail">
        <ep-col :col="8">
          <ep-form-item label="申报时间">
            <ep-input type="text" v-model="bodyForm.dclTime" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="申报人">
            <ep-input type="text" v-model="bodyForm.dclEr" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="16">
        <ep-form-item label="商品名称" attr="gdsNm">
          <ep-input v-model="bodyForm.gdsNm" name="gdsNm" :maxlength="768" :disabled="isDetail"></ep-input>
        </ep-form-item>
      </ep-col>
      <ep-col :col="16">
        <ep-form-item label="规格型号">
          <ep-input
            v-model="bodyForm.gdsSpcfModelDesc"
            name="gdsSpcfModelDesc"
            :maxlength="768"
            :disabled="isDetail"
          ></ep-input>
        </ep-form-item>
      </ep-col>
      </div>
      <!-- <ep-col :col="8">
        <ep-form-item label="状态">
          <ep-select disabled v-model="bodyForm.optStatus" name="optStatus">
            <ep-select-item index="1" label="暂存"></ep-select-item>
            <ep-select-item index="18" label="已确认"></ep-select-item>
            <ep-select-item index="3" label="海关入库"></ep-select-item>
            <ep-select-item index="4" label="海关入库失败"></ep-select-item>
            <ep-select-item index="5" label="审核通过"></ep-select-item>
            <ep-select-item index="6" label="审核拒绝"></ep-select-item>
            <ep-select-item index="17" label="转人工"></ep-select-item>
            <ep-select-item index="20" label="变更申报"></ep-select-item>
            <ep-select-item index="96" label="已作废"></ep-select-item>
          </ep-select>
        </ep-form-item>
      </ep-col>-->

      <!-- <ep-col :col="8">
        <ep-form-item label="申报类型" attr="dclTypecd">
          <ep-select v-model="bodyForm.dclTypecd" name="dclTypecd" disabled>
            <ep-select-item index="1" label="备案"></ep-select-item>
            <ep-select-item index="2" label="变更"></ep-select-item>
          </ep-select>
        </ep-form-item>
      </ep-col>-->
      
      <ep-col :col="16">
        <ep-form-item label="备注" attr="rmk">
          <ep-input
            placeholder="请输入内容"
            v-model="bodyForm.rmk"
            name="rmk"
            :maxlength="4000"
            :disabled="isDetail"
            style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
          ></ep-input>
        </ep-form-item>
      </ep-col>
    </ep-row>
  </ep-form>
</template>

<script>
import { cloneObj } from "utils";
import mixin from "../mixin";
import { getData } from "src/utils/date";
export default {
  mixins: [mixin],
  props: {
    // 表单数据
    bodyForm: {
      type: Object,
      required: true
    },
    // 是否 - 详情
    isDetail: {
      type: Boolean,
      default: false
    },
    // 是否 - 历史详情
    isHistoryDetail: {
      type: Boolean,
      default: false
    },
    // 是否可修改
    cantCorrect: {
      type: Boolean,
      default: false
    },
    // 料号输入框是否禁用
    isGdsMtnoSave: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      page_rules: {
        dclTypecd: { required: true, message: "不能为空", trigger: "change" }, // 申报类型
        gdsMtno: { required: true, message: "不能为空", trigger: "change" }, // 商品料号
        gdecd: [
          // 商品编码
          {
            required: true,
            message: "不能为空",
            trigger: "change",
            min: 10,
            max: 10,
            message: "请输入10位长度数字"
          }
          // {
          //   pattern: /^\d{10}$/,
          //   message: "请输入10位长度数字",
          //   trigger: "blur"
          // }
        ],
        ciqCode: { required: true, message: "不能为空", trigger: "change" }, // 商检编码
        gdsNm: { required: true, message: "不能为空", trigger: "change" }, // 商品名称
        dclCurrcd: { required: true, message: "不能为空", trigger: "change" } // 商品名称
      },
      isDeclare: false
    };
  },
  methods: {
    // 发起校验
    getValidate() {
      this.$refs["bodyForm"].validate(valid => {
        if (valid) {
          this.isDeclare = true;
        } else {
          this.$pop({
            type: "danger",
            message: "表单验证失败!"
          });
          this.isDeclare = false;
          return;
        }
      });
    }
  },
  watch: {
    // 商品料号
    "bodyForm.gdsMtno": {
      handler(newVal, oldVal) {
        let exp = /^[^\s]*$/;
        // console.log(exp.test(newVal));
        if (!exp.test(newVal)) {
          // console.log("包含空格。。。。。。。");
          setTimeout(() => {
            this.bodyForm.gdsMtno = oldVal;
          }, 100);
        }
      },
      immediate: true,
      deep: true
    },
    // 商品编码
    "bodyForm.gdecd": {
      handler(newVal, oldVal) {
        let exp = /^[^\s]*$/;
        if (!exp.test(newVal)) {
          setTimeout(() => {
            this.bodyForm.gdecd = oldVal;
          }, 100);
        }
      },
      immediate: true,
      deep: true
    },
    // 商检编码
    "bodyForm.ciqCode": {
      handler(newVal, oldVal) {
        let exp = /^[^\s]*$/;
        if (!exp.test(newVal)) {
          setTimeout(() => {
            this.bodyForm.ciqCode = oldVal;
          }, 100);
        }
      },
      immediate: true,
      deep: true
    },
    // 规格型号
    "bodyForm.gdsSpcfModelDesc": {
      handler(newVal, oldVal) {
        let exp = /^[^\s]*$/;
        if(!this.isDetail) {
            if (!exp.test(newVal)) {
          setTimeout(() => {
            this.bodyForm.gdsSpcfModelDesc = oldVal;
          }, 100);
        }
        }
      
      },
      immediate: true,
      deep: true
    },
  }
};
</script>

<style></style>
