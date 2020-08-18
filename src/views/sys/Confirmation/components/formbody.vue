<template>
  <div>
    <ep-model title="进出库确认表体" v-model="model" width="1200px" :wrap-close="false">
      <ep-form ref="confirmationDt" :form="confirmationDt" name-width="168px">
        <ep-row :gutter="7">
          <ep-col :col="8">
            <ep-form-item label="ERP/WMS预出入库单编号" attr="stockBillNoPre" disabled>
              <ep-input disabled v-model="confirmationDt.stockBillNoPre"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="关联报关单商品序号" attr="entryGdsSeqno" disabled>
              <ep-input disabled v-model="confirmationDt.entryGdsSeqno"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="商品料号" attr="copGNo" disabled>
              <ep-input disabled v-model="confirmationDt.copGNo"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="商品编码" attr="hsCode" disabled>
              <ep-input disabled v-model="confirmationDt.hsCode"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="商检编码" attr="ciqCode" disabled>
              <ep-input disabled v-model="confirmationDt.ciqCode"></ep-input>
            </ep-form-item>
          </ep-col>

          <ep-col :col="8">
            <ep-form-item label="商品名称" attr="gName" disabled>
              <ep-input disabled v-model="confirmationDt.gName"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="商品规格型号" attr="gModel" disabled>
              <ep-input disabled v-model="confirmationDt.gModel"></ep-input>
            </ep-form-item>
          </ep-col>
              <ep-col :col="8">
            <ep-form-item label="已用数量" attr="qty" disabled>
              <ep-input disabled v-model="confirmationDt.usedQty"></ep-input>
            </ep-form-item>
          </ep-col>
              <ep-col :col="8">
            <ep-form-item label="剩余数量" attr="qty" disabled>
              <ep-input disabled v-model="confirmationDt.remainQty"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="数量" attr="qty" disabled>
              <ep-input disabled v-model="confirmationDt.qty"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="数量单位" attr="gUnit" disabled>
              <ep-select v-model="confirmationDt.gUnit" name="gUnit" filterable disabled>
                <ep-select-item
                  v-for="(item, index) in dclUnitcdList"
                  :key="index"
                  :index="item.unit"
                  :label="item.unitName"
                ></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="单价" attr="unitPrice" disabled>
              <ep-input disabled v-model="confirmationDt.unitPrice"></ep-input>
            </ep-form-item>
          </ep-col>

          <ep-col :col="8">
            <ep-form-item label="总价" attr="tradeTotal" disabled>
              <ep-input disabled v-model="confirmationDt.tradeTotal"></ep-input>
            </ep-form-item>
          </ep-col>

          <ep-col :col="8">
            <ep-form-item label="币制" attr="tradeCurr" disabled>
              <ep-select v-model="confirmationDt.tradeCurr" name="tradeCurr" filterable disabled>
                <ep-select-item
                  v-for="(item, index) in currList"
                  :key="index"
                  :index="item.currCode"
                  :label="item.currName"
                ></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>

          <ep-col :col="8">
            <ep-form-item label="法定数量" attr="qty1" disabled>
              <ep-input disabled v-model="confirmationDt.qty1"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="法定单位" attr="unit1" disabled>
              <ep-select v-model="confirmationDt.unit1" name="unit1" filterable disabled>
                <ep-select-item
                  v-for="(item, index) in dclUnitcdList"
                  :key="index"
                  :index="item.unit"
                  :label="item.unitName"
                ></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="法定第二数量" attr="qty2" disabled>
              <ep-input disabled v-model="confirmationDt.qty2"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="法定第二计量单位" attr="unit2" disabled>
              <ep-select v-model="confirmationDt.unit2" name="unit2" filterable disabled>
                <ep-select-item
                  v-for="(item, index) in dclUnitcdList"
                  :key="index"
                  :index="item.unit"
                  :label="item.unitName"
                ></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>

          <ep-col :col="8">
            <ep-form-item label="原产国(地区)" attr="originCountryCode" disabled>
              <ep-select
                v-model="confirmationDt.originCountryCode"
                name="originCountryCode"
                filterable
                disabled
              >
                <ep-select-item
                  v-for="(item, index) in countryList"
                  :key="index"
                  :index="item.countryCode"
                  :label="item.nameCn"
                ></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>

          <ep-col :col="8">
            <ep-form-item label="净重" attr="netWt" disabled>
              <ep-input disabled v-model="confirmationDt.netWt"></ep-input>
            </ep-form-item>
          </ep-col>

          <ep-col :col="8">
            <ep-form-item label="毛重" attr="grossWt" disabled>
              <ep-input disabled v-model="confirmationDt.grossWt"></ep-input>
            </ep-form-item>
          </ep-col>
        </ep-row>
        <div style="text-align: center;">
          <!-- <WmsButton @click="model = false">确定</WmsButton> -->
          <ep-button type="primary" size="small" @click="model = false" icon="edit">确定</ep-button>
        </div>
      </ep-form>
    </ep-model>
    <div class="block">
      <ep-table
        ref="table"
        border
        :height="400"
        :data="dtFormBody"
        @selection-change="handleSelect"
        @row-dblclick="select1Info"
        :head-color="headColor"
      >
        <!-- <ep-table-item type="select"></ep-table-item> -->
        <ep-table-item column="stockBillNoPre" title="ERP/WMS预出入库单编号" width="210"></ep-table-item>
        <ep-table-item column="entryGdsSeqno" title="关联报关单商品序号"></ep-table-item>

        <ep-table-item column="copGNo" title="商品料号" width="120"></ep-table-item>
        <ep-table-item column="hsCode" width="130" title="商品编码"></ep-table-item>
        <ep-table-item column="ciqCode" width="130" title="商检编码"></ep-table-item>

        <ep-table-item column="gName" title="商品名称" width="180"></ep-table-item>
        <ep-table-item column="gModel" title="商品规格型号" width="300"></ep-table-item>
         <ep-table-item column="usedQty" title="已用数量"></ep-table-item>
        <ep-table-item column="remainQty" title="剩余数量"></ep-table-item>
         <ep-table-item column="qty" title="数量"></ep-table-item>
        <ep-table-item column="gUnit" title="数量单位" width="130" :formatter="dclUnitcdTranslate1"></ep-table-item>
        <ep-table-item column="unitPrice" title="单价"></ep-table-item>
        <ep-table-item column="tradeTotal" title="总价"></ep-table-item>
        <ep-table-item column="tradeCurr" title="币制" :formatter="dclCurrcdFormatter1"></ep-table-item>
        <ep-table-item column="qty1" title="法定数量"></ep-table-item>
        <ep-table-item column="unit1" title="法定单位" width="130" :formatter="dclUnitcdTranslate2"></ep-table-item>
        <ep-table-item column="qty2" title="法定第二数量"></ep-table-item>
        <ep-table-item column="unit2" title="法定第二计量单位" width="130" :formatter="dclUnitcdTranslate3"></ep-table-item>

        <ep-table-item
          column="originCountryCode"
          width="130"
          title="原产国(地区)"
          :formatter="natcdTranslateFormatter"
        ></ep-table-item>

        <ep-table-item column="netWt" title="净重"></ep-table-item>
        <ep-table-item column="grossWt" title="毛重"></ep-table-item>
      </ep-table>
    </div>
    <div class="block">
      <ep-pager
        right
        @size-change="handleSizeChange"
        @change="handleCurrentChange"
        :now-page="ep_page.page"
        :page-size="ep_page.size"
        :total-num="totalcount"
      ></ep-pager>
    </div>
  </div>
</template>
<script>
import misList from "src/common/mislist";
import mixin from "../mixin";
export default {
  extends: misList, // 务必继承
  mixins: [mixin],
  props: {
    dtFormBody: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      model: false,
      confirmationDt: {},
      headColor: true,
      totalcount: 0,
      ep_page: {
        size: 10,
        page: 1
      },
      headColor: true,
      dclUnitcd: [],
      customSearch: {},
      tableData: [],
      selectItems: []
    };
  },
  watch: {},
  created() {
    let curr = this.$store.getters.getCurrList;
    this.currList = curr;
    let countrys = this.$store.getters.getCountryList;
    this.countryList = countrys;
    let unitList = this.$store.getters.getUnitList;
    this.dclUnitcdList = unitList;
  },
  computed: {},
  mounted() {
    this.makePaging(10, 1, this.dtFormBody);
  },
  methods: {
    handleSelect(val, index) {
      this.selectItems = val;
      this.indexChange = index;
    },
    select1Info(event, row, index) {
      this.confirmationDt = row;
      this.model = true;
    },

    // 分页
    makePaging(size, page, data) {
      let begin = (page - 1) * size;
      let end = begin + size;
      let newData = data.slice(begin, end);
      this.totalcount = data.length;
      this.tableData = newData;
    },
    // 翻页
    handleCurrentChange(val) {
      this.ep_page.page = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.dtFormBody)
      );
    },
    // 每页条数
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.dtFormBody)
      );
    },
    filterData(condition, data) {
      let filter = (condition, data) => {
        return data.filter(item => {
          return Object.keys(condition).every(key => {
            if (condition[key] == "") return true;
            let diff =
              key == "gdsNm"
                ? String(item[key])
                    .toLowerCase()
                    .indexOf(
                      String(condition[key])
                        .trim()
                        .toLowerCase()
                    ) !== -1
                : String(item[key]).toLowerCase() ==
                  String(condition[key])
                    .trim()
                    .toLowerCase();
            return diff;
          });
        });
      };
      return filter(condition, data);
    },
    closeModel() {
      this.model = false;
    }
  }
};
</script>
