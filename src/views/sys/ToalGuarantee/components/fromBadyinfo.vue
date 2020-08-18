<template>
  <div>
    <ep-form ref="bodyForm" :form="bodyForm" name-width="168px">
      <ep-row :gutter="20">
        <ep-col :col="8">
                    <ep-form-item label="总担保编号" attr="gsarNo">
                        <ep-input v-model="bodyForm.gsarNo" name="gsarNo" :maxlength="50" disabled></ep-input>
                    </ep-form-item>
                </ep-col>
                <!-- <ep-col :col="8">
                    <ep-form-item label="保证金清单编号" attr="dpstLevyBlNo">
                        <ep-input v-model="bodyForm.dpstLevyBlNo" name="dpstLevyBlNo" :maxlength="64" disabled></ep-input>
                    </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="保函状态" attr="ltguaStatus">
                    <ep-select v-model="bodyForm.ltguaStatus" name="ltguaStatus" disabled>
                      <ep-select-item index="0" label="无效"></ep-select-item>
                      <ep-select-item index="1" label="有效"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col> -->

                <ep-col :col="8">
                  <ep-form-item label="金额" attr="grtAmt">
                    <ep-input v-model="bodyForm.grtAmt" name="grtAmt" :maxlength="30" disabled></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                    <ep-form-item label="可用金额" attr="usableAmt">
                        <ep-input v-model="bodyForm.usableAmt" name="usableAmt" :maxlength="30" disabled></ep-input>
                    </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                    <ep-form-item label="锁定金额" attr="lockAmt">
                        <ep-input v-model="bodyForm.lockAmt" name="lockAmt" :maxlength="30" disabled></ep-input>
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
                <ep-col :col="8" >
                    <ep-form-item attr="dclData" label="申报时间">
                       <ep-date v-model="bodyForm.dclData"  type="dateTime" name="dclData" disabled></ep-date>
                    </ep-form-item>
                </ep-col>
                <!-- <ep-col :col="8" >
                    <ep-form-item attr="createTime" label="创建时间">
                       <ep-date v-model="bodyForm.createTime"  type="dateTime" name="createTime" disabled></ep-date>
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
                    <ep-input v-model.trim="bodyForm.rmk" name="rmk" type="textarea" disabled></ep-input>
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
  created() {

  },
  mounted() {},
  methods: {}
};
</script>
