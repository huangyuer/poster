<template>
  <div class="card-body searchForm">
    <ep-form :form="searchForm" ref="searchForm" name-width="140px">
      <ep-row>
        <!-- <ep-col :col="8">
          <ep-form-item label="汇总统计编号">
            <ep-input type="text" v-model='searchForm.sumPreentNo' disabled></ep-input>
          </ep-form-item>
        </ep-col> -->
        <ep-col :col="8">
          <ep-form-item label="企业信用代码">
            <ep-input type="text" v-model='searchForm.dclEtpsSccd' disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="企业名称">
            <ep-input type="text" v-model='searchForm.dclEtpsNm' disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="企业编号">
            <ep-input type="text" v-model='searchForm.dclEtpsNo' disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="汇总统计开始时间">
            <ep-input type="text" v-model='searchForm.sumBeginTime' disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="汇总统计截止时间">
            <ep-input type="text" v-model='searchForm.sumDueTime' disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <!-- <ep-col :col="8">
          <ep-form-item label="确认日期">
            <ep-input type="text" v-model='searchForm.sumDclTime' disabled></ep-input>
          </ep-form-item>
        </ep-col> -->
        <ep-col :col="8">
          <ep-form-item label="主管关区" attr="masterCuscd" :class="searchForm.masterCuscd!=2249&&searchForm.masterCuscd?'error':''">
            <!-- <ep-input type="text" v-model='searchForm.masterCuscd' disabled></ep-input> -->
            <loc-codemap-select :name="'masterCuscd'" :code="'customCode'" :cName="'customName'" :dataList="tradeInfo" :type="'custom'" :value.sync="searchForm.masterCuscd" :disabled="true">
            </loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <!-- <ep-col :col="8">
          <ep-form-item label="状态">
            <ep-select disabled v-model="searchForm.optStatus" name="optStatus">
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
        <!-- <ep-col :col="16">
          <ep-form-item label="情况说明">
            <ep-input v-model="searchForm.rmk" disabled name="rmk" type="textarea"></ep-input>
          </ep-form-item>
        </ep-col> -->
      </ep-row>
    </ep-form>
  </div>
</template>
<script>
import mixin from "../mixin";
import misList from "src/common/mislist";
import { cloneObj } from "utils";
export default {
  mixins: [mixin, misList],
  props: {
    searchForm: {
      type: Object,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      customSearch: {},
      loading: false,
      model: false,
      ep_page: {
        page: 1,
        size: 10
      },
      totalcount: 0,
      buttonStatus: ""
    };
  },
  computed: {
    tradeInfo() {
      return this.$store.getters.getCustomList;
    }
  },
  mounted() {
    console.log(this.searchForm);
  }
};
</script>
<style lang="less">
.error {
  .ep-form--label {
    color: #e74c3c;
  }
  .ep-select {
    .ep-input__inner {
      border-color: #e74c3c;
      color: #e74c3c;
    }
  }
}
</style>
