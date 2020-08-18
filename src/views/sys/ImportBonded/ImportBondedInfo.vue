<template>
  <div>
    <div class="panel-main-content">
      <!--筛选栏组-->
      <div class="search-card contents-card card-margin">
        <wms-title title="">
          <div class="panel panel-default">
            <BondFormHeader ref="BondFormHeader">
              <template>
                <ep-row>
                  <ep-col :col="24">
                    <WmsButton @click="reset()">重置</WmsButton>
                    <WmsButton :loading="loading" @click="search" icon="search">查询</WmsButton>
                    <!-- <ep-button type="warning" size="small" icon="refresh" @click="reset()">重置</ep-button>
                    <ep-button type="primary" size="small" @click="search" icon="search" :loading="loading">查询</ep-button> -->
                  </ep-col>
                </ep-row>
              </template>
            </BondFormHeader>
          </div>
        </wms-title>
        <div class="wms-dividing-line"></div>
        <div class="card-body">
          <BondFormHeaderTable ref="BondFormHeaderTable" :epData="ep_data" :searchForm="searchForm"></BondFormHeaderTable>
        </div>
      </div>
      <!--表格-->
      <!-- <div class="ep-card card-margin relative">
        <div class="card-body">
          <BondFormHeaderTable ref="BondFormHeaderTable" :epData="ep_data" :searchForm="searchForm"></BondFormHeaderTable>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import BondFormHeader from "./components/bondFormHeader";
import BondFormHeaderTable from "./components/bondFormHeaderTable";
import { getToken } from "utils";
import mixin from "./mixin";
export default {
  name: "ImportBondedInfo",
  extends: misList, // 务必继承
  mixins: [mixin],
  components: {
    BondFormHeader,
    BondFormHeaderTable
  },
  data() {
    return {
      counter: 0,
      tradeInfo: [],
      fileUploadLoading: false,
      loading: false,
      listApi: "importBondedGetListSum", // 搜索，取api.json里面的key值
      deleteData: "enterpriseDelete",
      exportStyle: false,
      optType: "1",
      model1: false,
      settings: {
        pk: "id" // 主键
      },
      searchForm: {
        billExpNo: "",
        optStatus: this.optStatus,
        dclEtpsNo: "", //申报企业编号
        dclEtpsNm: "", //申报企业名称
        sumPreentNo: "", //汇总统计编号
        dclEtpsSccd: "", //企业信用代码
        sumBeginTime: "", // 汇总统计开始时间
        sumDueTime: "" // 汇总结束统计时间
      },
      selectLength: 0,
      selectItems: [],
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      ep_data: [], //表格数据
      totalcount: 0,
      uploadData: {
        businessType: "etarcrp"
      }
    };
  },
  computed: {
    trspInfo() {
      return this.$store.getters.getTransfList;
    }
  },
  watch: {
    exportStyle(e) {
      if (!e) {
        this.optType = "1";
      }
    }
  },
  mounted() {
    // 修改表头的禁用状态
    this.$refs.BondFormHeader.sumPreentNoFlag = false;
    this.search();
  },
  methods: {
    // 重置
    reset() {
      // 以前查询条件
      // this.$refs.BondFormHeader.dateFrom.bodyFormSumBeginTime = "";
      // this.$refs.BondFormHeader.bodyFormsumPreentNo = "";
      // this.$refs.BondFormHeader.declareTime = "";
      // this.$refs.BondFormHeader.declareTime = "";
      // this.searchForm.declareBeginTime = "";
      // this.searchForm.declareEndTime = "";
      // this.$refs.BondFormHeader.dateFrom.optStatus = "";
      // 以前查询条件
      this.$refs.BondFormHeader.bodyForm.isSumMonth = "";
      this.$refs.BondFormHeader.month = "";
    },
    // 查询
    search() {
      // 企业代码
      this.searchForm.dclEtpsNo = this.$store.getters.getTradeCode;
      this.searchForm.isSumMonth = this.$refs.BondFormHeader.bodyForm.isSumMonth;
      // 以前查询条件
      let monthDay = this.$refs.BondFormHeader.month;
      if (monthDay) {
        let month = new Date(monthDay).getMonth() + 1;
        let year = new Date(monthDay).getFullYear();
        let nexMonth = null;
        let nexYear = null;
        if (month == 1) {
          nexYear = year * 1 - 1;
          nexMonth = 12;
        } else {
          nexYear = year;
          nexMonth = month * 1 - 1;
        }
        if (month < 10) {
          month = "0" + month;
        }
        if (nexMonth < 10) {
          nexMonth = "0" + nexMonth;
        }
        this.searchForm.sumBeginTime = `${nexYear}-${nexMonth}-25 00:00:00`;

        this.searchForm.sumDueTime = `${year}-${month}-24 23:59:59`;
      } else {
        this.searchForm.sumBeginTime = "";
        this.searchForm.sumDueTime = "";
      }

      console.log("month", this.$refs.BondFormHeader.month);
      // // 获取到table的ep_page数据
      // this.ep_page = this.$refs.BondFormHeaderTable.ep_page;
      // // 获取到header组件的查询框的值
      // this.searchForm.sumPreentNo =
      //   this.$refs.BondFormHeader.bodyFormsumPreentNo || "";
      // let bodyFormSumBeginTime = this.$refs.BondFormHeader.dateFrom
      //   .bodyFormSumBeginTime;
      // let declareTime = this.$refs.BondFormHeader.declareTime;
      // this.searchForm.optStatus = this.$refs.BondFormHeader.dateFrom.optStatus;
      // if (bodyFormSumBeginTime) {
      //   this.searchForm.sumBeginTime =
      //     this.$refs.BondFormHeader.bodyForm.sumBeginTime + " 00:00:00";
      //   this.searchForm.sumDueTime =
      //     this.$refs.BondFormHeader.bodyForm.sumDueTime + " 23:59:59";
      // } else {
      //   this.searchForm.sumBeginTime = "";
      //   this.searchForm.sumDueTime = "";
      // }
      // if (declareTime) {
      //   this.searchForm.declareBeginTime =
      //     this.$refs.BondFormHeader.declareTime.split(",")[0] + " 00:00:00";
      //   this.searchForm.declareEndTime =
      //     this.$refs.BondFormHeader.declareTime.split(",")[1] + " 23:59:59";
      // } else {
      //   this.searchForm.declareBeginTime = "";
      //   this.searchForm.declareEndTime = "";
      // }
      // 以前查询条件

      this.refresh(true);
    }
  }
};
</script>

<style scoped>
</style>
