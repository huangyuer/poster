ComfirmationDtInfo
<template>
  <div class="panel-main-content">
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <ep-tabs active="进出库确认明细表头">
          <ep-tab-item name="进出库确认明细表头">
          <formheader :bodyForm="bodyForm" ></formHeader>
          </ep-tab-item>
          <ep-tab-item name="进出库确认明细表体">
         <formbody ref="infoForm" :dtFormBody="tableData" ></formBody>
          </ep-tab-item>
          <!-- <ep-tab-item name="关联卡口凭证" v-if="showPort">
            <formBody :listData="portData" :isDtBody="true" :isTablePort="true"></formBody>
          </ep-tab-item>
             <ep-tab-item name="关联出入库" v-if="changeSatus">
           <formInExp ref="formInExp" :headerForm="bodyForm" :listData="inExpData" :isDtInExp="true"></formInExp>
          </ep-tab-item>
          <ep-tab-item name="操作记录" v-if="changeSatus">
            <WholeOptStatus :tableData="operateData"></WholeOptStatus>
          </ep-tab-item> -->
        </ep-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { cloneObj } from "utils";
import formbody from './components/formbody'
import  formheader from './components/formheader'
import misList from "src/common/mislist";
import mixin from "./mixin";
export default {
  name: "WareHouseDtInfo",
  mixins: [misList, mixin], // 务必继承
  components:{formheader,formbody},
  data() {
    return {
      bodyForm: {},
      tableData: [],
      
    };
  },

  mounted() {
    this.againDate(String(this.$route.query.id));
  },
  methods: {
    againDate(id) {
      this.$post("getStockBillGetDetails", { stockBillNoPre: id,tradeCode:this.$store.getters.getTradeCode}).then(res => {
        this.bodyForm=res.map.data
        this.tableData=res.map.data.dtDtos
      });
    },
  }
};
</script>
<style></style>
