<template>
  <div>
    <div>
      <!-- <ep-model title="表体信息" v-model="model1" width="1000px" :wrap-close="false">
        <portBody :dtFormBody="dtFormBody1"></portBody>
      </ep-model> -->
      <!--表格-->
      <div class="ep-card card-margin relative">
        <div class="card-body">
          <div class="block">
            <ep-table ref="table1" border :height="400" :data="tableDataLated" :loading="loading" :head-color="headColor" @row-dblclick="select2Info">
              <!-- <ep-table-item type="select"></ep-table-item> -->
              <ep-table-item column="whRecPreentNo" width="350" title="凭证编号"></ep-table-item>
              <ep-table-item column="grtNo" width="350" title="总担保编号"></ep-table-item>
              <ep-table-item column="rmk" title="备注">
                <template slot-scope="props">
                  <p class="rmk-style">{{ props.row.rmk }}</p>
                </template>
              </ep-table-item>
              <!-- <ep-table-item column="bizopEtpsNo" title="经营企业编号" width="150"></ep-table-item>
              <ep-table-item column="bizopEtpsNm" title="经营企业名称" width="200"></ep-table-item>
              <ep-table-item column="optStatus" title="状态" width="140" :formatter="optStatusFormatter"></ep-table-item> -->

              <!-- <ep-table-item column="rltTbTypecd" title="关联单证类型" :formatter="rltTbTypecdFormatter" width="350"></ep-table-item>
              <ep-table-item column="rltNo" width="300" title="关联单证编号"></ep-table-item> -->
              <!-- <ep-table-item v-if="inExpTypes == 6 && ieTypecdStatus=='I'" column="grossWt" title="毛重" width="300"></ep-table-item> -->
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
import misList from "src/common/mislist";
import mixin from "../mixin";
export default {
  extends: misList, // 务必继承
  mixins: [mixin],

  props: {
    buNo: {
      default: "",
    },
    inExpTypes: {
      default: "",
    },
    ieTypecdStatus: {
      default: "",
    },
  },
  data() {
    return {
      tableDataLated: [],
      totalcount: "",
      headColor: true,
      dtFormBody1: "",
      portReleaseRtlForm: {},
      model1: false,
      loading: false,
      ep_page: {
        page: 1,
        size: 10,
      },
      totalcount: 0,
    };
  },
  watch: {},
  created() {
    // this.getDetailBody();
  },
  computed: {},
  mounted() {
    this.getDetailBody();
  },
  methods: {
    getDetailBody() {
      this.ep_page.businessDeclareNo = this.buNo;

      this.ep_page.dtType = "1";
      this.$post("businessDeclarSelectBsc", this.ep_page).then((res) => {
        this.totalcount = res.map.data.totalElements;
        this.tableDataLated = res.map.data.content;
      });
    },
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.getDetailBody();
    },
    handleCurrentChange(val) {
      this.ep_page.page = val;
      this.getDetailBody();
    },

    select1Info(event, row, index) {
      this.portReleaseDtForm = row;
      this.model = true;
    },
    select2Info(event, row, index) {
      this.portReleaseRtlForm = row;
      this.model1 = true;
    },
    close1Model() {
      this.model1 = false;
    },
  },
};
</script>
