<template>
  <div class="search-table card">
    <div class="footer">

      <slot></slot>
    </div>
    <div class="block">
      <ep-table ref="table" border :height="400" highlight-row :data="ep_data" :head-color="headColor">
        <ep-table-item type="num"></ep-table-item>
        <ep-table-item column="orderNo" title="客户订单号" width="150"></ep-table-item>
        <!-- <ep-table-item column="billNo" title="提单号" width="210"></ep-table-item> -->
        <!-- <ep-table-item column="entSccd" title="企业信用代码" width="190"></ep-table-item>
        <ep-table-item column="enterpriseName" title="企业名称" width="240"></ep-table-item> -->
        <ep-table-item column="stockBillNo" title="ERP/WMS出入库单编号" width="210"></ep-table-item>
        <ep-table-item column="stockBillTypeName" title="出入库单进出类型" width="170"></ep-table-item>
        <!-- <ep-table-item column="stockTypeName" title="库存类型" width="140"></ep-table-item> -->
        <ep-table-item column="inOutBondedTypeName" title="出入库类型" width="140"></ep-table-item>
        <!-- <ep-table-item column="tradeCode" title="经营企业单位编码" width="180"></ep-table-item> -->
        <!-- <ep-table-item column="tradeName" title="经营企业" width="210"></ep-table-item> -->
        <!-- <ep-table-item column="ownerName" title="货主" width="210"></ep-table-item> -->
        <!-- <ep-table-item column="businessTypeName" title="业务类别" width="120"></ep-table-item> -->
        <!-- <ep-table-item column="declStockDate" title="出入库申报时间" width="180"></ep-table-item> -->
        <ep-table-item column="actrualStockDate" title="实际出入库时间" width="180"></ep-table-item>
        <!-- <ep-table-item column="presentStockStatus" title="当前记录出入库状态" width="200"></ep-table-item> -->
        <ep-table-item column="gTypeName" title="料件成品标志" width="160"></ep-table-item>
        <ep-table-item column="tradeMode" title="监管方式" width="200" :formatter="supvModecdFormatter"></ep-table-item>
        <ep-table-item column="iEPort" title="进出境关别" width="200" :formatter="impexpPortcdFormatter"></ep-table-item>
        <!-- <ep-table-item column="customMaster" title="主管海关" width="200" :formatter="impexpPortcdFormatter1"></ep-table-item> -->
        <ep-table-item column="declTypeName" title="报关标志" width="200"></ep-table-item>
        <!-- <ep-table-item column="entryNo" title="报关单号" width="200"></ep-table-item> -->
        <!-- <ep-table-item column="rltEntryNo" title="关联报关单（备案清单、简易申报单）编号" width="200"></ep-table-item>
        <ep-table-item column="gNo" title="关联报关单（备案清单、简易申报单）商品序号" width="200"></ep-table-item> -->
        <!-- <ep-table-item column="cusLetpasTime" title="放行时间" width="200"></ep-table-item>
        <ep-table-item column="rltInvtNo" title="关联保税核注清单编号" width="200"></ep-table-item>
        <ep-table-item column="transitTime" title="核放时间" width="200"></ep-table-item> -->
        <ep-table-item column="inOutBondedNo" title="出入库单明细序号" width="200"></ep-table-item>
        <ep-table-item column="copGNo" title="商品料号" width="200"></ep-table-item>
        <ep-table-item column="codeTs" title="商品编码" width="200"></ep-table-item>
        <!-- <ep-table-item column="ciqCode" title="商检编码" width="200"></ep-table-item> -->
        <ep-table-item column="gName" title="商品名称" width="200"></ep-table-item>
        <ep-table-item column="gModel" title="商品规格型号" width="200"></ep-table-item>
        <ep-table-item column="gQty" title="数量" width="200"></ep-table-item>
        <ep-table-item column="gUnit" width="140" title="数量单位" :formatter="dclUnitcdTranslate"></ep-table-item>
        <ep-table-item column="qty1" width="140" title="法定数量"></ep-table-item>
        <ep-table-item column="unit1" width="140" title="法定单位" :formatter="dclUnitcdTranslate1"></ep-table-item>
        <ep-table-item column="qty2" width="140" title="法定第二数量"></ep-table-item>
        <ep-table-item column="unit2" width="200" title="法定第二计量单位" :formatter="dclUnitcdTranslate2"></ep-table-item>
        <ep-table-item column="tradeCurr" width="180" title="币制" :formatter="tradeCurrFormatter"></ep-table-item>
        <ep-table-item column="declPrice" width="180" title="单价"></ep-table-item>
        <ep-table-item column="declTotal" width="180" title="总价"></ep-table-item>
        <!-- <ep-table-item column="transMode" width="180" title="成交方式"></ep-table-item> -->
        <ep-table-item column="originCountry" width="150" title="原产国(地区)" :formatter="natcdTranslate"></ep-table-item>
        <ep-table-item column="destinationCountry" width="200" title="最终目的国代码(地区)" :formatter="natcdTranslate1"></ep-table-item>
        <ep-table-item column="tradeCountry" width="220" title="启运国/运抵国代码(地区)" :formatter="natcdTranslate2"></ep-table-item>
        <!-- <ep-table-item column="tradeAreaCode" width="150" title="贸易国代码(地区)" :formatter="natcdTranslate3"></ep-table-item> -->
        <!-- <ep-table-item column="districtCode" width="150" title="境内目的地/货源地代码" :formatter="districtCodeFormatter"></ep-table-item> -->
        <ep-table-item column="netWt" width="180" title="净重"></ep-table-item>
        <ep-table-item column="grossWt" width="180" title="毛重"></ep-table-item>
        <!-- <ep-table-item column="warehouseNo" width="180" title="仓库号"></ep-table-item>
        <ep-table-item column="warehouseLoc" width="180" title="库位"></ep-table-item> -->

      </ep-table>
    </div>
    <div class="block bootom">
      <EpPage :ep_data='ep_data' :pageSize='size' :nowPage="nowPage" @change="currtenChange" @size-change='sizeChange' />
    </div>

  </div>
</template>



<script>
import EpPage from "src/template/customPager";
import mixin from "./mixin";
export default {
  name: "",
  // extends: misList,
  mixins: [mixin],
  components: {
    EpPage
  },
  props: {
    bodyForm: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      size: 10,
      loading: true,
      nowPage: 1,
      search: {},
      headColor: true,
      ep_data: [],
      tradeInfo: []
    };
  },
  computed: {},
  created() {},

  watch: {
    bodyForm: {
      handler(newData, olddata) {
        console.log("传过来的数据", newData);
        this.search = newData;
      },
      deep: true
    }
  },

  mounted() {
    // this.refresh();
  },
  methods: {
    reset() {
      this.ep_data = [];
    },
    getlist() {
      this.$refs.table.reset();
      let data = {};
      data.inExpWhNo = this.bodyForm.inExpWhNo;
      data.page = this.nowPage;
      data.size = this.size;
      data.orgCode = this.$store.getters.getCreditCode; // "913100006929421297"; //
      this.$post("getStockDtDetails", data).then(res => {
        console.log("res", res);
        this.ep_data = res.map.data.content;
        if (!res.map.data.content.length) {
          this.$pop({
            type: "danger",
            message: "未查到数据"
          });
        }
      });
    },
    currtenChange(value) {
      console.log("当前是第几页", value);
      this.nowPage = value;
      this.getlist();
    },
    sizeChange(val) {
      this.size = val;
      this.nowPage = 1;
      this.getlist();
      console.log("几条数据", val);
    }
  }
};
</script>



<style lang="" scoped>
.bootom {
  margin-top: 20px;
}
.footer {
  margin-bottom: 10px;
  text-align: center;
  /* display: flex;
  flex-direction: row;
  justify-content: center; */
}
</style>
