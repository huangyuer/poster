<template>
  <div>
    <ep-form ref="bodyForm" :form="bodyForm" name-width="168px" :rules="!detail?page_rules:{}">
      <ep-row :gutter="20">
        <ep-col :col="8">
          <ep-form-item label="业务申报编号" attr="businessDeclareNo">
            <ep-input v-model="bodyForm.businessDeclareNo" name="businessDeclareNo" :maxlength="64" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="企业名称" attr="bizopEtpsNm">
            <ep-input v-model="bodyForm.bizopEtpsNm" name="bizopEtpsNm" :maxlength="20" :disabled="true"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="企业编号" attr="bizopEtpsNo">
            <ep-input v-model="bodyForm.bizopEtpsNo" name="bizopEtpsNo" :maxlength="20" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="订单/合同号" attr="contractNo">
            <ep-input v-model.trim="bodyForm.contractNo" name="contractNo" :maxlength="64" :disabled="detail"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="承揽企业名称" attr="outsourceEtpsNm">
            <ep-input v-model="bodyForm.outsourceEtpsNm" name="outsourceEtpsNm" :maxlength="20" :disabled="detail"></ep-input>
          </ep-form-item>
        </ep-col>

        <ep-col :col="8">
          <ep-form-item :label="lableStatus?'承揽企业地址':'试飞地址'" attr="address">
            <ep-input v-model.trim="bodyForm.address" name="address" :maxlength="64" :disabled="detail"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="业务类型" attr="type">
            <ep-select v-model="bodyForm.type" name="type" :disabled="detail" @change="typeChange">
              <ep-select-item index="1" label="外发加工"></ep-select-item>
              <!-- <ep-select-item index="2" label="飞机试飞"></ep-select-item>  暂时禁用  -->

            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8" v-if='showtype'>
          <ep-form-item attr="dclTime" label="确认时间">
            <ep-date v-model="bodyForm.dclTime" type="dateTime" name="dclTime" :disabled="detail"></ep-date>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="开始时间" attr="createTime">
            <!-- <ep-date v-model="month" name="month"></ep-date> -->
            <ep-date v-model="bodyForm.createTime" :disabled="detail" :date-options="dateOptions"></ep-date>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="结束时间" attr="endTime">
            <!-- <ep-date v-model="month" name="month"></ep-date> -->
            <ep-date v-model="bodyForm.endTime" :disabled="detail" :date-options="dateOptions"></ep-date>
          </ep-form-item>
        </ep-col>
        <!-- <ep-col :col="8" v-if='showtype'>
          <ep-form-item label="绑定状态" attr="passportUsedTypecd">
            <ep-select v-model="bodyForm.passportUsedTypecd" name="passportUsedTypecd" :disabled="detail">
              <ep-select-item index="1" label="未绑定"></ep-select-item>
              <ep-select-item index="2" label="部分绑定"></ep-select-item>
              <ep-select-item index="3" label="已绑定"></ep-select-item>

            </ep-select>
          </ep-form-item>
        </ep-col> -->
        <ep-col :col="8" v-if='showtype'>
          <ep-form-item label="状态" attr="optStatus">
            <ep-select v-model="bodyForm.optStatus" name="status" :disabled="detail">
              <ep-select-item index="1" label="暂存"></ep-select-item>
              <ep-select-item index="18" label="已确认"></ep-select-item>
              <ep-select-item index="3" label="海关入库"></ep-select-item>
              <ep-select-item index="4" label="海关入库失败"></ep-select-item>
              <ep-select-item index="5" label="审核通过"></ep-select-item>
              <ep-select-item index="6" label="审核拒绝"></ep-select-item>
              <ep-select-item index="17" label="待审核"></ep-select-item>
              <ep-select-item index="99" label="删除"></ep-select-item>
              <ep-select-item index="95" label="作废确认"></ep-select-item>
              <ep-select-item index="96" label="已作废"></ep-select-item>
              <ep-select-item index="100" label="海关删除"></ep-select-item>
              <ep-select-item index="30" label="结案确认"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="申报类型" attr="dclTypecd" v-if='showtype'>
            <ep-select v-model="bodyForm.dclTypecd" name="dclTypecd" disabled>
              <ep-select-item index="1" label="备案"></ep-select-item>
              <ep-select-item index="2" label="变更"></ep-select-item>
              <ep-select-item index="3" label="作废"></ep-select-item>
              <ep-select-item index="4" label="结案"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="16">
          <ep-form-item label="备注" attr="rmk">
            <ep-input v-model="bodyForm.rmk" name="rmk" :disabled="detail"></ep-input>
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
      lableStatus: true,
      headColor: true,
      page_rules: {
        orgId: { required: true, message: "不能为空", trigger: "change" },
        outsourceEtpsNm: {
          required: true,
          message: "不能为空",
          trigger: "change",
        },
        createTime: {
          required: true,
          message: "不能为空",
          trigger: "change",
        },
        endTime: {
          required: true,
          message: "不能为空",
          trigger: "change",
        },
        address: {
          required: false,
          message: "不能为空",
          trigger: "change",
        },
        contractNo: {
          required: true,
          message: "不能为空",
          trigger: "change",
        },
        type: { required: true, message: "不能为空", trigger: "change" },
      },
      dateOptions: {
        disabledDate(time) {
          return time.getTime() + 86400000 < Date.now();
        },
      },
    };
  },
  mixins: [misList],
  components: {},
  props: {
    bodyForm: {
      type: Object,
      required: true,
    },
    detail: {
      type: Boolean,
      default: false,
    },
    showtype: {
      type: Boolean,
      default: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    timeChange() {
      console.log("00000000000000000");
    },
    checkDate(strDate1, strDate2) {
      var t1 = new Date(Date.parse(strDate1.replace(/-/g, "/"))).getTime();
      var t2 = new Date(Date.parse(strDate2.replace(/-/g, "/"))).getTime();
      if (t1 - t2 > 0) {
        return false;
      } else {
        return true;
      }
    },
    typeChange() {
      if (this.bodyForm.type == 2) {
        this.lableStatus = false;
        this.page_rules.outsourceEtpsNm.required = false;
        this.page_rules.address.required = true;
      } else if (this.bodyForm.type == 1) {
        this.lableStatus = true;
        this.page_rules.outsourceEtpsNm.required = true;
        this.page_rules.address.required = false;
      }
    },
  },
};
</script>
