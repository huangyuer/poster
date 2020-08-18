<template>
  <div>
    <ep-model title="卡口验放凭证表体" v-model="model" width="1200px" :wrap-close="false">
      <ep-form ref="portReleaseDt" :form="portReleaseDt" name-width="168px">
        <ep-row :gutter="7">
          <ep-col :col="8">
            <ep-form-item label="凭证编号" attr="portNo" disabled>
              <ep-input disabled v-model="portReleaseDt.portNo" :maxlength="30"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="明细序号" attr="gdsSeqno" disabled>
              <ep-input disabled v-model="portReleaseDt.gdsSeqno" :maxlength="30"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="关联单证编号" attr="rltNo" disabled>
              <ep-input disabled v-model="portReleaseDt.rltNo" :maxlength="30"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="商品料号" attr="gdsMtno" disabled>
              <ep-input disabled v-model="portReleaseDt.gdsMtno" :maxlength="30"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="商品编码" attr="gdecd" disabled>
              <ep-input disabled v-model="portReleaseDt.gdecd" :maxlength="30"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="商品名称" attr="gdsNm" disabled>
              <ep-input disabled v-model="portReleaseDt.gdsNm" :maxlength="30"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="规格型号" attr="gdsSpcfModelDesc" disabled>
              <ep-input disabled v-model="portReleaseDt.gdsSpcfModelDesc" :maxlength="30"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="币制" attr="dclCurrcd" disabled>
              <ep-select v-model="portReleaseDt.dclCurrcd" name="dclCurrcd" :maxlength="26" filterable disabled>
                <ep-select-item v-for="(item, index) in currList" :key="index" :index="item.currCode" :label="item.currName"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="申报数量" attr="dclQty" disabled>
              <ep-input disabled v-model="portReleaseDt.dclQty" :maxlength="30"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="申报计量单位" attr="dclUnitcd" disabled>
              <ep-select v-model="portReleaseDt.dclUnitcd" name="dclUnitcd" filterable disabled>
                <ep-select-item v-for="(item, index) in dclUnitcdList" :key="index" :index="item.unit" :label="item.unitName">
                </ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="原产国(地区)" attr="natcd" disabled>
              <ep-select v-model="portReleaseDt.natcd" name="natcd" :maxlength="26" filterable disabled>
                <ep-select-item v-for="(item, index) in countryList" :key="index" :index="item.countryCode" :label="item.nameCn"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>

          <ep-col :col="8">
            <ep-form-item label="净重" attr="netWt" disabled>
              <ep-input disabled v-model="portReleaseDt.netWt" :maxlength="30"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="dclTotalAmt" label="总价">
              <ep-input v-model.trim="portReleaseDt.dclTotalAmt" disabled name="dclTotalAmt" :maxlength="19"></ep-input>
            </ep-form-item>
          </ep-col>
          <!-- <ep-col :col="8">
            <ep-form-item attr="classifyType" label="料件 /成品标志">
              <ep-select v-model="portReleaseDt.classifyType"  name="classifyType" disabled>
                 <ep-select-item index="I" label="料件"></ep-select-item>
                <ep-select-item index="E" label="成品"></ep-select-item>
                <ep-select-item index="S" label="设备"></ep-select-item>
                <ep-select-item index="L" label="边角料"></ep-select-item>
                        <ep-select-item index="D" label="残次品"></ep-select-item>
                           
              </ep-select>
                
            </ep-form-item>
             
          </ep-col> -->
          <!--  <ep-col :col="8">
               <ep-form-item attr="goodsType" label="货物类型">
                          <ep-select                   v-model="portReleaseDt.goodsType"   name="goodsType"                   disabled       >
                                  <ep-select-item index="1" label="普通"></ep-select-item>
                                  <ep-select-item index="2" label="增料"></ep-select-item>
                                </ep-select>
                            </ep-form-item>
                        </ep-col>  -->
        </ep-row>
        <div style="text-align: center;">
          <WmsButton @click="model = false">确定</WmsButton>

        </div>
      </ep-form>
    </ep-model>
    <div class="block">
      <ep-table ref="table" border :height="400" :data="tableData" @selection-change="handleSelect" @row-dblclick="select1Info" :head-color="headColor">
        <!-- <ep-table-item type="select"></ep-table-item> -->
        <ep-table-item column="portNo" title="凭证编号" width="210"></ep-table-item>
        <ep-table-item column="gdsSeqno" title="明细序号"></ep-table-item>
        <ep-table-item column="rltNo" width="210" title="关联单证编号"></ep-table-item>
        <ep-table-item column="rltSeqno" width="140" title="关联表体序号"></ep-table-item>
        <ep-table-item column="gdsMtno" title="商品料号" width="120"></ep-table-item>
        <ep-table-item column="gdecd" width="130" title="商品编码"></ep-table-item>
        <ep-table-item column="gdsNm" title="商品名称" width="180"></ep-table-item>
        <ep-table-item column="gdsSpcfModelDesc" title="规格型号" width="100"></ep-table-item>
        <ep-table-item column="dclCurrcd" title="币制" :formatter="dclCurrcdFormatter"></ep-table-item>
        <ep-table-item column="dclQty" title="申报数量"></ep-table-item>
        <ep-table-item column="dclUnitcd" title="申报计量单位" width="130" :formatter="dclUnitcdTranslate3"></ep-table-item>
        <ep-table-item column="natcd" width="130" title="原产国(地区)" :formatter="natcdTranslate"></ep-table-item>
        <ep-table-item column="netWt" title="净重"></ep-table-item>
        <ep-table-item column="dclTotalAmt" width="150" title="总价"></ep-table-item>
        <!-- <ep-table-item column="classifyType" width="150" title='料件/成品标志' :formatter="classifyType"></ep-table-item>
        <ep-table-item column="goodsType" width="150" title='货物类型' :formatter="goodsType"></ep-table-item> -->
      </ep-table>
    </div>
    <div class="block">
      <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
    </div>
  </div>
</template>
<script>
import misList from "src/common/mislist";
import mixin from "../mixin";
export default {
  extends: misList, // 务必继承
  mixins: [mixin],
  components: {},
  props: {
    buNo: {
      default: "",
    },
    inExpTypes: {
      default: "",
    },
  },
  data() {
    return {
      model: false,
      portReleaseDt: {},
      headColor: true,
      totalcount: 0,
      ep_page: {
        size: 10,
        page: 1,
      },
      headColor: true,
      dclUnitcd: [],
      customSearch: {},
      tableData: [],
      selectItems: [],
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
    this.getDetailBody();
  },
  methods: {
    getDetailBody() {
      this.ep_page.businessDeclareNo = this.buNo;
      this.ep_page.inExpType = this.inExpTypes;
      this.ep_page.ieTypecd = "E";
      this.ep_page.dclTypecd = "1";
      this.$post("getPortPlaneDts", this.ep_page).then((res) => {
        this.totalcount = res.map.data.totalElements;
        this.tableData = res.map.data.content;
      });
    },
    handleSelect(val, index) {
      this.selectItems = val;
      this.indexChange = index;
    },
    select1Info(event, row, index) {
      this.portReleaseDt = row;
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
      console.log(val);
      this.ep_page.page = val;
      this.getDetailBody();
    },
    // 每页条数
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.getDetailBody();
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
    closeModel() {
      this.model = false;
    },
  },
};
</script>
