<template>
  <div>
    <div>
      <ep-model title="耗料清单产出表体" v-model="model" width="1250px" :wrap-close="false" append-to-body>
        <ep-form ref="bodyForm" :form="bodyForm" name-width="168px">
          <ep-row :gutter="7">
            <ep-col :col="8">
              <ep-form-item attr="classifyType" label="料件/成品标志">
                <ep-select v-model="bodyForm.classifyType" name="classifyType" disabled>
                  <ep-select-item index="I" label="料件"></ep-select-item>
                  <ep-select-item index="E" label="成品"></ep-select-item>
                  <ep-select-item index="S" label="设备"></ep-select-item>
                  <ep-select-item index="L" label="边角料"></ep-select-item>
                  <ep-select-item index="D" label="残次品"></ep-select-item>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="goodsType" label="货物类型">
                <ep-select v-model="bodyForm.goodsType" name="goodsType" disabled>
                  <ep-select-item index="1" label="普通"></ep-select-item>
                  <!-- <ep-select-item index="2" label="增料"></ep-select-item> -->
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="gdsMtno" label="商品料号">
                <ep-input disabled v-model="bodyForm.gdsMtno" name="gdsMtno" :maxlength="32"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="gdecd" label="商品编码">
                <ep-input disabled v-model="bodyForm.gdecd" name="gdecd" :maxlength="10"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="gdsNm" label="商品名称">
                <ep-input disabled v-model="bodyForm.gdsNm" name="gdsNm" :maxlength="256"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="gdsSpcfModelDesc" label="商品规格型号">
                <ep-input disabled v-model="bodyForm.gdsSpcfModelDesc" name="gdsSpcfModelDesc" :maxlength="768"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="dclQty" label="申报数量">
                <ep-input disabled v-model.trim="bodyForm.dclQty" name="dclQty" :maxlength="20"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="bizopEtpsNo" label="申报计量单位">
                <loc-codemap-select :name="'bizopEtpsNo'" :code="'unit'" :cName="'unitName'" :dataList="dclUnitcds" :value.sync="bodyForm.bizopEtpsNo" disabled></loc-codemap-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="unit1" label="法定单位">
                <loc-codemap-select :name="'unit1'" :code="'unit'" :cName="'unitName'" :dataList="dclUnitcds" :value.sync="bodyForm.unit1" disabled></loc-codemap-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="unit2" label="法定第二计量单位">
                <loc-codemap-select :name="'unit2'" :code="'unit'" :cName="'unitName'" :dataList="dclUnitcds" :value.sync="bodyForm.unit2" disabled></loc-codemap-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="natcd" label="原产国(地区)">
                <loc-codemap-select disabled :name="'natcd'" :code="'countryCode'" :cName="'nameCn'" :dataList="countrys" :value.sync="bodyForm.natcd"></loc-codemap-select>
              </ep-form-item>
               
            </ep-col>
            <ep-col :col="8">
               <ep-form-item attr="dclCurrcd" label="币制">
                  <ep-select ref="dclCurrcdSelect" v-model="bodyForm.dclCurrcd" disabled filterable>
                      <ep-select-item v-for="(item, index) in curr" :key="index" :index="item.currCode" :label="item.currName + ' ' + item.currCode"></ep-select-item>
                      </ep-select>
                      </ep-form-item>
                </ep-col>

          </ep-row>

        </ep-form>

      </ep-model>
      <div class="ep-card card-margin relative">
        <div class="card-body">
          <div class="block">
            <ep-table border ref="table" :height="400" :data="tableData" :head-color="headColor" @row-dblclick="queryOperStatus">
              <ep-table-item column="consumptionNo" width="300" title="凭证编号"></ep-table-item>
              <ep-table-item column="gdsSeqno" width="120" title="明细序号"></ep-table-item>
              <ep-table-item column="gdsMtno" width="150" title="商品料号">
                <template slot-scope="props">
                  <p class="text-style">{{ props.row.gdsMtno }}</p>
                </template>
              </ep-table-item>
              <ep-table-item column="gdecd" width="150" title="商品编码"></ep-table-item>
              <ep-table-item column="gdsNm" width="150" title="商品名称">
                <template slot-scope="props">
                  <p class="text-style">{{ props.row.gdsNm }}</p>
                </template>
              </ep-table-item>
              <ep-table-item column="gdsSpcfModelDesc" width="150" title="规格型号">
                <template slot-scope="props">
                  <p class="text-style">{{ props.row.gdsSpcfModelDesc }}</p>
                </template>
              </ep-table-item>
              <ep-table-item column="dclQty" width="150" title="申报数量"></ep-table-item>
              <ep-table-item column="dclCurrcd" title="币制" :formatter="dclCurrcdFormatter"></ep-table-item>
              <ep-table-item column="natcd" width="130" title="原产国(地区)" :formatter="natcdTranslate"></ep-table-item>
              <ep-table-item column="unit1" width="150" title="法定单位" :formatter="dclUnitcdTranslate1"></ep-table-item>
              <ep-table-item column="unit2" width="200" title="法定第二计量单位" :formatter="dclUnitcdTranslate2"></ep-table-item>
              <ep-table-item column="bizopEtpsNo" width="150" title="申报计量单位" :formatter="bizopEtpsNo"></ep-table-item>
              <!-- <ep-table-item column="modfMarkcd" width="150" title="修改标志代码" :formatter="modfMarkcdFormatter"></ep-table-item> -->
            </ep-table>
          </div>
          <div class="block">
            <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { cloneObj } from "utils";
import mixin from "../mixin";
export default {
  mixins: [mixin],
  data() {
    return {
      bodyForm: {
        // gdsSeqno: "",
        gdsMtno: "",
        gdecd: "",
        gdsNm: "",
        gdsSpcfModelDesc: "",
        dclQty: "",
        bizopEtpsNo: "", //申报计量单位
        unit2: "", //法定第二计量单位
        unit1: "", //法定单位
        classifyType: "", //料件成本标志
      },
      headColor: true,
      tableData: [],
      tableDataCopy: this.listData,
      loading: false,
      model: false,
      ep_page: {
        page: 1,
        size: 10,
      },
      totalcount: 0,
    };
  },
  props: {
    buNo: {
      default: "",
    },
    listData: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  created() {
    let unitList = this.$store.getters.getUnitList;
    this.dclUnitcds = unitList;
    let curr = this.$store.getters.getCurrList;
    this.currList = curr;
    if (this.isDtBody) this.page_rules = {};
    this.getList();
  },
  beforeDestroy() {
    // bus.$off("deleteDtDetail");
  },
  mounted() {},
  watch: {
    model(e) {
      if (!e) {
        this.$refs.bodyForm && this.$refs.bodyForm.reset();
      }
    },
  },
  methods: {
    getList() {
      this.ep_page.businessDeclareNo = this.buNo;
      this.ep_page.dtType = "2";
      this.$post("findProductDtsByMaterNo", this.ep_page).then((res) => {
        this.totalcount = res.map.data.totalElements;
        this.tableData = res.map.data.content;
        console.log("dddddddddddddd", this.tableData);
      });
    },
    queryOperStatus(event, row, index) {
      this.bodyForm = row;
      this.model = true;
    },
    reset(el) {
      this.$refs[el].reset();
    },

    // 添加操作最终关闭按钮
    closeModel() {
      // this.model = false;
    },
    customSearchBtn() {},
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.ep_page.page = val;
      this.getList();
    },
    makePaging(size, page, data) {
      let begin = (page - 1) * size;
      let end = begin + size;
      let newData = data.slice(begin, end);
      this.totalcount = data.length;
      this.tableData = newData;
    },
    filterData(condition, data) {
      let filter = (condition, data) => {
        return data.filter((item) => {
          return Object.keys(condition).every((key) => {
            if (condition[key] == "") return true;
            let diff =
              key == "gdsNm"
                ? String(item[key])
                    .toLowerCase()
                    .indexOf(String(condition[key]).trim().toLowerCase()) !== -1
                : String(item[key]).toLowerCase() ==
                  String(condition[key]).trim().toLowerCase();
            return diff;
          });
        });
      };
      return filter(condition, data);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .text-style {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100px;
}
</style>

