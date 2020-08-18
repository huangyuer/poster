<template>
  <div>
    <div>
      <ep-model title="关联保证金" v-model="model" width="1200px" :wrap-close="false">
        <ep-form ref="bodyForm" :form="bodyForm" name-width="168px">
          <ep-row :gutter="7">    
            <ep-col :col="8">
              <ep-form-item attr="dpstLevyBlNo" label="保证金清单编号">
                <ep-input v-model="bodyForm.dpstLevyBlNo" name="dpstLevyBlNo" :maxlength="32"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item label="保函状态" attr="ltguaStatus">
                <ep-select v-model="bodyForm.ltguaStatus" name="ltguaStatus">
                  <ep-select-item index="0" label="无效"></ep-select-item>
                  <ep-select-item index="1" label="有效"></ep-select-item>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item label="创建时间" attr="createTime" disabled>
                <ep-input disabled v-model="bodyForm.createTime" :maxlength="30"></ep-input>
              </ep-form-item>
            </ep-col>
          </ep-row>
          <div style="text-align: center;">
            <ep-button type="primary" size="small" @click="model = false" icon="edit">确定</ep-button>
          </div>
        </ep-form>
      </ep-model>
      <div class="ep-card card-margin relative">
        <div class="card-body">
          <div class="block"></div>
          <div class="block">
            <ep-table
              ref="table"
              border
              :height="400"
              :data="tableData"
              :head-color="true"
              @row-dblclick="queryOperStatus"
            >
              <ep-table-item column="dpstLevyBlNo" width="250" title="保证金清单编号"></ep-table-item>
              <ep-table-item column="ltguaStatus" width="200" title="保函状态" :formatter="ltguaStatusFormatter"></ep-table-item>
              <ep-table-item column="grtAmt" title="金额" width="150"></ep-table-item>
              <ep-table-item column="validDateEnd"  title="有效时间结束"></ep-table-item>
            </ep-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "../mixin";
import misList from "src/common/mislist";
import { cloneObj } from "utils";
export default {
     mixins: [mixin, misList],
  data() {
    return {
      model: false,
      bodyForm: {}
    };
  },
  watch: {},
  props: {
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    ModelType: {
      type: String,
      default: "null"
    }
  },
  computed: {},
  mounted() {},
  methods: {
      queryOperStatus(event, row, index) {
      this.bodyForm = row;
      this.model = true;
    }
  }
};
</script>

<style scoped></style>
