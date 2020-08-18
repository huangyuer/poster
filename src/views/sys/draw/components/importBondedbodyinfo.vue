<template>
  <div class="card-body searchForm">
    <ep-form :form="searchForm" ref="searchForm" name-width="140px">
      <ep-row>
        <ep-col :col="8">
          <ep-form-item label="汇总统计编号">
            <ep-input type="text" v-model="searchForm.sumPreentNo" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="企业信用代码">
            <ep-input type="text" v-model="searchForm.dclEtpsSccd" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="企业名称">
            <ep-input type="text" v-model="searchForm.dclEtpsNm" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="企业编号">
            <ep-input type="text" v-model="searchForm.dclEtpsNo" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="汇总统计开始时间">
            <ep-input type="text" v-model="searchForm.sumBeginTime" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="汇总统计截止时间">
            <ep-input type="text" v-model="searchForm.sumDueTime" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="确认日期">
            <ep-input type="text" v-model="searchForm.sumDclTime" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="状态">
            <ep-select disabled v-model="searchForm.optStatus" name="optStatus">
              <ep-select-item index="1" label="暂存"></ep-select-item>
              <ep-select-item index="18" label="已确认"></ep-select-item>
              <ep-select-item index="3" label="海关入库成功"></ep-select-item>
              <ep-select-item index="4" label="海关入库失败"></ep-select-item>
              <ep-select-item index="5" label="确认成功"></ep-select-item>
              <ep-select-item index="6" label="确认失败"></ep-select-item>
              <ep-select-item index="99" label="已删除"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
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
  extends: misList,
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
    // tradeInfo() {
    //   return this.$store.getters.getCustomList;
    // }
  },
  mounted() {
    // console.log(this.searchForm);
  }
};
</script>
