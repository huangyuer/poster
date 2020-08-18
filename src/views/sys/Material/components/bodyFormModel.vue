<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <wms-title title="">
        <div class="panel panel-default">
          <ep-form ref="searchForm" :form="searchForm" name-width="138px">
            <ep-row :gutter="7">
              <ep-col :col="8">
                <ep-form-item label="耗料清单编号" attr="consumptionNo">
                  <ep-input v-model="searchForm.consumptionNo" name="consumptionNo" disabled></ep-input>
                </ep-form-item>
                <ep-col :col="8">
                <ep-form-item label="进出区提发货凭证编号" attr="pid" v-if="show">
                  <ep-input v-model="searchForm.pid" name="pid" disabled></ep-input>
                </ep-form-item>
                <ep-form-item label="耗能产出表体" attr="type" v-if="show">
                  <ep-input v-model="searchForm.type" name="type" disabled></ep-input>
                </ep-form-item>
              </ep-col>
              </ep-col>
            </ep-row>
            <ep-row :gutter="7">
              <ep-col :col="24">
                <!-- <WmsButton @click="reset('searchForm')">重置</WmsButton> -->
                <!-- <WmsButton @click="refresh(true)" :loading="loading">查询</WmsButton> -->
              </ep-col>
            </ep-row>
          </ep-form>
        </div>
      </wms-title>
      <div class="wms-dividing-line"></div>

      <!--表格-->

      <div class="card-body">
        <WmsButton @click="doBinding">变更表体</WmsButton>
        <div class="block">
          <slot name="out-form"></slot>

        </div>
        <div class="block">
          <ep-table border ref="table" :height="400" :data="ep_data" :head-color="headColor" @selection-change="handleSelectionChange">
            <ep-table-item type="select"></ep-table-item>
            <!-- <ep-table-item column="inExpWhNo" title="ERP/WMS出入库编号" width="200"></ep-table-item> -->
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
              <ep-table-item
                column="unit1"
                width="150"
                title="法定单位"
                :formatter="dclUnitcdTranslate"
              ></ep-table-item>
              <ep-table-item
                column="unit2"
                width="200"
                title="法定第二计量单位"
                :formatter="dclUnitcdTranslate"
              ></ep-table-item>
              <ep-table-item
                column="bizopEtpsNo"
                width="150"
                title="申报计量单位"
                :formatter="dclUnitcdTranslate"
              ></ep-table-item>
            <ep-table-item column="modfMarkcd" width="150" title="修改标志代码" :formatter="modfMarkcdFormatter"></ep-table-item>
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
import { getToken, getId } from "utils";
import { cloneObj } from "utils";
import mixin from "../mixin";
export default {
  name: "bodyFormModel",
  mixins: [misList, mixin],
  extends: misList, // 务必继承
  props: {
    bodyForm: {
      type: Object,
      required: true,
    },
    isShowModel: {
      type: Boolean,
    },
    consumptionNo:{
      default:""
    },
    searchType: {
      default: true,
    },
    optStatus: {
      default: "",
    },
    type:{
      default:""
    },
    tableData: {
      type: Array,
    },
    portState: {
      //绑定类型
      default: function () {
        return "";
      },
    },
    ieTypecd: {
      //进出标志
      default: function () {
        return "";
      },
    },
    inExpType: {
      //出入库类型
      default: function () {
        return "";
      },
    },
  },
  watch: {
    isShowModel(newVal) {
      if (!newVal) {
        this.$refs.table.selectChangeEach((_) => {
          return false;
        });
      }
    },
    ieTypecd: {
      // 进出标志改变
      handler(newData, oldData) {
        this.searchForm.ieTypecd = newData;
        if (!this.searchType) {
          this.refresh();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      uploadData: {
        businessType: "wareHouse",
        sysCode: "lgsa",
      },
      fixTime: "",
      show: false,
      loading: false,
      listApi: "MaterialgetDtsByPid", //wareHouseList pathBillOfladingInfoGetList
      settings: {
        pk: "id", // 主键
      },
      searchForm: {
        consumptionNo: "",
        optStatus: this.optStatus,
        before_dclTime: "",
        after_dclTime: "",
        type:this.type
      },
      headColor: true,
      totalcount: 0,
      selectLength: 0,
      selectItems: [],
      ep_page: {
        // 分页
        size: 10,
        page: 1,
      },
      ep_data: [], //表格数据
      ieTypecdState: "",
      stateValue: "",
    };
  },
  mounted() {
    if (!this.searchType) {
      this.refresh();
    }
    this.searchForm.consumptionNo = this.consumptionNo;
    this.searchForm.type=this.type
    // this.searchForm.pid = this.$route.query.id;
    // console.log(pid)
    this.refresh(true);
  },
  created() {
    // console.log(this.bodyForm);
    // this.searchForm.consumptionNo = this.bodyForm.consumptionNo;
    // this.searchForm.type=this.bodyForm.type
    // // this.searchForm.pid = this.$route.query.id;
    // // console.log(pid)
    // this.refresh(true);
  },
  methods: {
    doBinding() {
      let selectData = this.$refs.table.getData("select");
      if (selectData.length !== 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
        return;
      }
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条单子！",
        });
        return;
      }
      let isnNull = false;
      selectData.forEach((item) => {
        this.tableData.forEach((e) => {
          if (item.id == e.id) {
            this.$pop({
              type: "danger",
              message: "请选择不同的数据",
            });
            isnNull = true;
            // return
          } else {
          }
        });
      });
      selectData[0].modfMarkcd = "1";
      if (!isnNull) {
        this.$emit("onSelectDt", cloneObj(selectData[0]));
      }
    },
    inExpChange(value) {
      this.stateValue = value;
    },
    ieTypecdChange(value) {
      this.ieTypecdState = value;
    },
    reset(el) {
      this.$refs[el].reset();
      this.fixTime = "";
    },
    changeTime() {
      let fixTime = this.fixTime.split(",");
      this.searchForm.before_dclTime = fixTime[1];
      this.searchForm.after_dclTime = fixTime[0];
    },
    handleSelectionChange(val) {
      this.selectLength = val.length;
      this.selectItems = val;
    },
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.refresh(false);
    },
    handleCurrentChange(val) {
      this.ep_page.page = val;
      this.refresh(false);
    },
  },
};
</script>
<style lang="less" scoped></style>
