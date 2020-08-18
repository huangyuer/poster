<template>
  <div>
    <ep-form ref="bodyForm" :form="bodyForm" name-width="168px" :rules="page_rules">
      <ep-row :gutter="20">
        <ep-col :col="8">
                    <ep-form-item label="总担保编号" attr="gsarNo">
                        <ep-input v-model="bodyForm.gsarNo" name="gsarNo" :maxlength="50" disabled></ep-input>
                    </ep-form-item>
                </ep-col>
                 <!-- <ep-col :col="8">
                    <ep-form-item label="清单编号" attr="dpstLevyBlNo">
                        <ep-input v-model="bodyForm.dpstLevyBlNo" name="dpstLevyBlNo" :maxlength="64"></ep-input>
                    </ep-form-item>
                </ep-col> -->
                <!-- <ep-col :col="8">
                    <ep-form-item label="总担保编号" attr="gsarNo">
                        <ep-input v-model="bodyForm.gsarNo" name="gsarNo" :maxlength="50" disabled></ep-input>
                    </ep-form-item>
                </ep-col> -->
                <!-- <ep-col :col="8">
                  <ep-form-item label="保函状态" attr="ltguaStatus">
                    <ep-select v-model="bodyForm.ltguaStatus" name="ltguaStatus">
                      <ep-select-item index="0" label="无效"></ep-select-item>
                      <ep-select-item index="1" label="有效"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col> -->

                <ep-col :col="8">
                  <ep-form-item label="金额" attr="grtAmt">
                    <ep-input v-model="bodyForm.grtAmt" name="grtAmt" :maxlength="25" disabled></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                    <ep-form-item label="可用金额" attr="usableAmt">
                        <ep-input v-model="bodyForm.usableAmt" name="usableAmt" :maxlength="25" disabled></ep-input>
                    </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                    <ep-form-item label="锁定金额" attr="lockAmt">
                        <ep-input v-model="bodyForm.lockAmt" name="lockAmt" :maxlength="25" disabled> </ep-input>
                    </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                    <ep-form-item label="失效金额" attr="invalidAmt">
                        <ep-input v-model="bodyForm.invalidAmt" name="invalidAmt" :maxlength="30" disabled></ep-input>
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
                <!-- <ep-col :col="8" >
                    <ep-form-item attr="dclData" label="申报时间">
                       <ep-date v-model="bodyForm.dclData"  type="dateTime" name="dclData" disabled></ep-date>
                    </ep-form-item>
                </ep-col> -->
                <!-- <ep-col :col="8" >
                    <ep-form-item attr="createTime" label="创建时间">
                       <ep-date v-model="bodyForm.createTime"  type="dateTime" name="createTime"></ep-date>
                    </ep-form-item>
                </ep-col> -->
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
                    <ep-input v-model.trim="bodyForm.rmk" name="rmk" type="textarea" :maxlength="1000"></ep-input>
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
  name: "fromBady",
  data() {
    return {
      headColor: true,
       gatetime: "",
      page_rules: {
        orgId: { required: true, message: "不能为空", trigger: "change" },
        // createTime: { required: true, message: "不能为空", trigger: "change" },
        ltguaStatus: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        dpstLevyBlNo: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
      //   bodyForm: {
      //   id: "",
      //   orgId: this.$store.getters.getId,
      //   orgCode: this.$store.getters.getOrgCode,
      //   // gsarNo:'',//总担保编号
      //   // usableAmt:'',//可用金额
      //   // lockAmt:'',//锁定金额
      //   // grtAmt:'',//金额
      //   // dclData:'',//申报时间
      //   dclTypecd:'0',//申报类型
      //   // Status:'',
      //   rmk:'',
      //   // dpstLevyBlNo:'',
      //   // createTime:'',//创建时间
      //   // ltguaStatus:'',//保函状态
      //   // dpstLevyBlNo:'',//清单编号
      // },
        // grtAmt: { required: true, message: "不能为空", trigger: "change" },
        dclTypecd: { required: true, message: "不能为空", trigger: "change" },
        // createTime: { required: true, message: "不能为空", trigger: "change" },
        // lockAmt: { required: true, message: "不能为空", trigger: "change" },
        // usableAmt: { required: true, message: "不能为空", trigger: "change" },
        // dclData: { required: true, message: "不能为空", trigger: "change" },
        // gsarNo: { required: true, message: "不能为空", trigger: "change" },
      }
    };
  },

  components: {},
  props: {
    bodyForm: {
      type: Object,
      required: true
    }
  },
  created() {},
  mounted() {
    // console.log(this.bodyForm)
  },
  methods: {}
};
</script>
