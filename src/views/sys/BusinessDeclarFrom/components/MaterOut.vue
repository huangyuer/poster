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
            <ep-table ref="table1" border :height="400" :data="tableDataLated" @selection-change="handleSelect1" :loading="loading" :head-color="headColor" @row-dblclick="select2Info">
              <!-- <ep-table-item type="select"></ep-table-item> -->
              <ep-table-item column="portNo" width="300" title="凭证编号"></ep-table-item>
              <ep-table-item column="rltTbTypecd" title="关联单证类型" :formatter="rltTbTypecdFormatter" width="350"></ep-table-item>
              <ep-table-item column="rltNo" width="300" title="关联单证编号"></ep-table-item>
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
    tableDataLated: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      totalcount: "",
      headColor: true,
      dtFormBody1: "",
      portReleaseRtlForm: {},
      model1: false,
      loading: false,
    };
  },
  watch: {},
  created() {
    this.getDetailBody();
  },
  computed: {},
  mounted() {},
  methods: {
    getDetailBody() {
      this.ep_page.buNo = this.buNo;
      this.$post("findConsumDtsByMaterNo", this.ep_page).then((res) => {});
    },
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.getDetailBody();
    },
    handleCurrentChange(val) {
      this.ep_page.page = val;
      this.getDetailBody();
    },

    // select1Info(event, row, index) {
    //   this.portReleaseDtForm = row;
    //   this.model = true;
    // },
    // select2Info(event, row, index) {
    //   this.portReleaseRtlForm = row;
    //   this.model1 = true;
    // },
    // close1Model() {
    //   this.model1 = false;
    // },
  },
};
</script>
