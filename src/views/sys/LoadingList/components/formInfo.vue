<template>
  <div>
    <div class="search-card contents-card card-margin">
      <ep-form
        class="demo-form"
        ref="bodyForm"
        :form="bodyForm"
        :rules="infoFlag?ruleHeader:{}"
        name-width="168px"
      >
        <ep-row :gutter="10">
          <ep-col :col="8">
            <ep-form-item attr="packageListNo" label="装车单单证号">
              <ep-input v-model="bodyForm.packageListNo" disabled name="packageListNo"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="customCode" label="关区">
              <!-- <ep-select  v-model="bodyForm.customCode" name="customCode"  filterable disabled>
                      <ep-select-item v-for="(item, index) in tradeInfo" :key="index" :index="item.customCode" :label="item.customName+' '+item.customCode"></ep-select-item>
              </ep-select>-->
              <loc-codemap-select
                :name="'customCode'"
                :code="'customCode'"
                :cName="'customName'"
                :dataList="tradeInfo"
                :type="'custom'"
                disabled
                :value.sync="bodyForm.customCode"
              ></loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="iePack" label="进出区标志">
              <ep-select v-model="bodyForm.iePack" name="iePack" disabled>
                <ep-select-item index="I" label="I-进区"></ep-select-item>
                <ep-select-item index="E" label="E-出区"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="dclTypecd" label="申报类型">
              <ep-select v-model="bodyForm.dclTypecd" name="dclTypecd" disabled>
                <ep-select-item index="1" label="备案"></ep-select-item>
                <ep-select-item index="3" label="作废"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="vehicleNo" label="车牌号">
              <ep-input v-model="bodyForm.vehicleNo" disabled :maxlength="64" name="vehicleNo"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="weight" label="总重量(kg)">
              <ep-input v-model="bodyForm.weight" name="weight" :disabled="!infoFlag"></ep-input>
            </ep-form-item>
          </ep-col>
        </ep-row>
      </ep-form>
    </div>
    <div class="search-card contents-card card-margin">
      <div class="card-body">
        <div class="block">
          <slot name="out-form" :data="this.$refs.table"></slot>
        </div>
        <div class="block">
          <ep-table border ref="table" :height="400" :data="tableData" :head-color="true">
            <!-- <ep-table-item v-if="infoFlag" type="select"></ep-table-item> -->
             <ep-table-item v-if="infoFlag" column="opt" title="操作" width="200">
                <template slot-scope="props">
                  <slot name="out-form1" :data="props.row"></slot>
                </template>
              </ep-table-item>
            <ep-table-item column="sasPassportPreentNo" title="关联单证编号" width="210"></ep-table-item>
            <ep-table-item
              column="passportTypecd"
              title="出入库类型"
              :formatter="pasFormatter"
              width="210"
            ></ep-table-item>
            <ep-table-item
              column="customCode"
              :formatter="dclPlcCuscdFormatter"
              title="关区"
              width="210"
            ></ep-table-item>
            <ep-table-item column="ioTypecd" title="进出区标志" :formatter="ioTypecdFormatter"></ep-table-item>
            <ep-table-item
              v-if="!infoFlag"
              column="sasOptStatus"
              title="单证状态"
              :formatter="typeFormatter"
            ></ep-table-item>
            <ep-table-item
              v-if="!infoFlag"
              column="isInspection"
              title="查验状态"
              :formatter="isInspectionFormatter"
            ></ep-table-item>
            <ep-table-item
              v-if="!infoFlag"
              column="isDischarge"
              title="卸货状态"
              :formatter="isDischargeFormatter"
            ></ep-table-item>
          </ep-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "../mixin";
export default {
  mixins: [mixin],
  props: {
    bodyForm: {
      type: Object,
    },
    tableData: {
      type: Array,
    },
    infoFlag: {
      type: Boolean,
    },
  },
  data() {
    return {
      ruleHeader: {
        weight: { required: true, message: "不能为空", trigger: "change" },
        // customCode: { required: true, message: '不能为空', trigger: 'change' },
        // iePack: { required: true, message: '不能为空', trigger: 'change' }
      },
    };
  },
  methods: {},
  components: {},
};
</script>

<style>
</style>
