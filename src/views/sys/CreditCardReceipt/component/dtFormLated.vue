<template>
  <div>
    <div>
      <ep-model title="关联单证" v-model="model1" width="1000px" :wrap-close="false">
        <ep-form ref="portReleaseRtlForm" :form="portReleaseRtlForm" name-width="150px">
          <ep-row :gutter="7">
            <ep-col :col="8">
              <ep-form-item attr="portNo" label="凭证编号">
                <ep-input v-model="portReleaseRtlForm.portNo" name="portNo" :maxlength="20" :disabled="true"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="rltTbTypecd" label="关联单证类型">
                <ep-select v-model="portReleaseRtlForm.rltTbTypecd" name="rltTbTypecd" :disabled="true">
                  <ep-select-item index="1" label="进出区提发货"></ep-select-item>
                  <ep-select-item index="2" label="径予提发货"></ep-select-item>
                  <ep-select-item index="4" label="临时进出区"></ep-select-item>
                  <ep-select-item index="5" label="外发加工"></ep-select-item>
                </ep-select>
              </ep-form-item>
            </ep-col>

            <ep-col :col="8">
              <ep-form-item attr="rltNo" label="关联单证编号">
                <ep-input disabled v-model="portReleaseRtlForm.rltNo" name="rltNo" :maxlength="20"></ep-input>
              </ep-form-item>
            </ep-col>
            <!-- <ep-col :col="8" v-if="inExpTypes == 6 && ieTypecdStatus=='I'">
              <ep-form-item attr="grossWt" label="毛重">
                <ep-input disabled v-model="portReleaseRtlForm.grossWt" name="grossWt" :maxlength="20"></ep-input>
              </ep-form-item> -->
            <!-- 修改 716 -->
          </ep-row>

          <div style="text-align: center;">
            <WmsButton @click="model1 = false">确定</WmsButton>

            <!-- <ep-button type="primary" size="small" @click="model1 = false" icon="edit">确定</ep-button> -->
          </div>
        </ep-form>
      </ep-model>
      <!--表格-->
      <div class="ep-card card-margin relative">
        <div class="card-body">
          <div class="block">
            <ep-table ref="table1" border :height="400" :data="tableDataLated" @selection-change="handleSelect1" :loading="loading" :head-color="headColor" @row-dblclick="select2Info">
              <!-- <ep-table-item type="select"></ep-table-item> -->
              <ep-table-item column="portNo" width="300" title="凭证编号"></ep-table-item>
              <ep-table-item column="rltTbTypecd" title="关联单证类型" :formatter="rltTbTypecdFormatter" width="350"></ep-table-item>
              <ep-table-item column="rltNo" width="300" title="关联单证编号"></ep-table-item>
              <!-- <ep-table-item v-if="inExpTypes == 6 && ieTypecdStatus=='I'" column="grossWt" title="毛重" width="300"></ep-table-item> -->
            </ep-table>
          </div>
        </div>
      </div>
    </div>
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
    inExpTypes: {
      default: "",
    },
    ieTypecdStatus: {
      default: "",
    },
    tableDataLated: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      headColor: true,
      portReleaseRtlForm: {},
      model1: false,
      loading: false,
    };
  },
  watch: {},
  created() {},
  computed: {},
  mounted() {},
  methods: {
    handleSelect1(val, index) {
      this.select1Items = val;
      this.indexChange = index;
    },
    select1Info(event, row, index) {
      this.portReleaseDtForm = row;
      this.model = true;
    },
    select2Info(event, row, index) {
      this.portReleaseRtlForm = row;
      this.model1 = true;
    },
    close1Model() {
      this.model1 = false;
    },
  },
};
</script>
