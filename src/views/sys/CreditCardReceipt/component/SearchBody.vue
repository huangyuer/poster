<template>
  <div class="search-table">
    <div class="ep-card card-margin relative" style="top:10px;">
      <div class="card-body">
        <div class="block">
          <WmsButton @click="addData">添加</WmsButton>

          <!-- <ep-button type="primary" size="small" @click="addData" icon="edit">添加</ep-button> -->
          <div style="display: inline-block;margin-left:20px;">

            <WmsButton @click="search">查询</WmsButton>

            <!-- <ep-button type="primary" size="small" icon="ios-search" @click="search">查询</ep-button> -->
          </div>

        </div>
        <div class="block">
          <ep-table ref="table" border :height="400" :data="ep_data" :head-color="true" :loading="loading">
            <ep-table-item type="select"></ep-table-item>
            <ep-table-item column="portNo" width="210" title="凭证编号"></ep-table-item>
            <ep-table-item column="gdsSeqno" width="120" title="明细序号"></ep-table-item>
            <ep-table-item column="rltNo" width="210" title="关联单证编号"></ep-table-item>
            <ep-table-item column="rltSeqno" width="140" title="关联表体序号"></ep-table-item>
            <ep-table-item column="gdsMtno" width="200" title="商品料号"></ep-table-item>
            <ep-table-item column="gdecd" width="180" title="商品编码"></ep-table-item>
            <ep-table-item column="gdsNm" width="200" title="商品名称"></ep-table-item>
            <ep-table-item column="gdsSpcfModelDesc" width="200" title="规格型号"></ep-table-item>
            <ep-table-item column="dclCurrcd" width="180" title="币制" :formatter="dclCurrcdFormatter"></ep-table-item>
            <ep-table-item column="dclQty" width="150" title="总数量"></ep-table-item>
            <ep-table-item column="dclUnitcd" width="140" title="申报计量单位" :formatter="dclUnitcdTranslate"></ep-table-item>
            <ep-table-item column="natcd" width="150" title="原产国(地区)" :formatter="natcdTranslate"></ep-table-item>
            <ep-table-item column="netWt" width="150" title="净重"></ep-table-item>
            <ep-table-item column="dclTotalAmt" width="150" title="总价"></ep-table-item>
          </ep-table>
        </div>
        <div class="block">
          <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import misList from "src/common/mislist";
import mixin from "../mixin";
export default {
  name: "",
  extends: misList,
  mixins: [mixin],
  props: {
    tableDataBody: {
      type: Array
    },
    stockBillNo: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      totalcount: 0,
      searchForm: {
        page: 1,
        size: 10,
        stockBillNoPre: this.stockBillNo,
        tradeCode: this.$store.getters.getTradeCode
      },
      ep_data: [],
      ep_page: {
        page: 1,
        size: 10
      },
      settings: {
        pk: "id" // 主键
      },
      listApi: "",
      showStatus: true
    };
  },
  computed: {},
  watch: {},

  mounted() {
    // if (this.needDate.passportTypecd != "5") {
    //   if (this.needDate.rltNo == undefined) {
    //     this.$pop({
    //       type: "danger",
    //       message: "请先录入关联单证！"
    //     });
    //     return;
    //   }
    //   this.refresh(true);
    // }
  },
  methods: {
    search() {
      this.ep_data = [];
      // this.refresh(false);
      this.getList();
    },
    getList() {
      this.$post("getStockDetail", this.searchForm)
        .then(res1 => {
          this.loading = true;
          console.log(res1, "获取出入库数据");
          if (res1.status == 1) {
            let date = res1.map.data.dtDtos;

            date.forEach((el, index) => {
              let data = {
                gdsMtno: el.copGNo,
                gdecd: el.hsCode,
                gdsNm: el.gName,
                gdsSpcfModelDesc: el.gModel,
                dclCurrcd: el.tradeCurr,
                dclQty: String(el.remainQty * 1 + el.usedQty * 1),
                dclUnitcd: el.gUnit + "",
                natcd: el.originCountryCode,
                netWt: el.netWt + "",
                stockDtId: String(el.id),
                dclTotalAmt: el.tradeTotal
              };
              this.ep_data[index] = data;
            });
            this.makePaging(10, 1, this.ep_data);
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    addData() {
      let selectData = this.$refs.table.getData("select");
      console.log("请选择一条数据", selectData);
      if (selectData.length != 1) {
        return this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
      }
      let isnNull = false;
      console.log("this.tableDataBody", this.tableDataBody);
      selectData.forEach(item => {
        this.tableDataBody.forEach(e => {
          if (item.stockDtId == e.stockDtId) {
            this.$pop({
              type: "danger",
              message: "请选择不同的数据"
            });
            isnNull = true;
            // return
          } else {
          }
        });
      });
      if (!isnNull) {
        if (selectData[0].dclQty) {
          this.$emit("oneDates", selectData[0]);
        } else {
          this.$pop({
            type: "danger",
            message: "数量不足请选择其他的数据"
          });
        }
      }
    },
    dclUnitcdTranslate(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.dclUnitcd == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
    makePaging(size, page, data) {
      let begin = (page - 1) * size;
      let end = begin + size;
      let newData = data.slice(begin, end);
      this.totalcount = data.length;

      this.ep_data = newData;
    },
    // 翻页
    handleCurrentChange(val) {
      this.ep_page.page = val;

      this.makePaging(this.ep_page.size, this.ep_page.page, this.ep_data);
    },
    // 每页条数
    handleSizeChange(val) {
      this.ep_page.size = val;

      this.makePaging(this.ep_page.size, this.ep_page.page, this.ep_data);
    }
  }
};
</script>



<style>
</style>
