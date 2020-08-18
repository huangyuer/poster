<template>
  <div class="panel-main-content">
    <div class="contents-card card-margin">
      <div class="panel panel-default">
        <ep-tabs active="出入库预增减表头">
          <!-- 汇总的表体 -->
          <ep-tab-item name="出入库预增减表头">
            <formHeader :bodyForm="bodyForm" :displayBlock="false" :isDtBody="true"></formHeader>
          </ep-tab-item>
          <ep-tab-item name="出入库预增减表体">
            <headerinfo :tableData="detailData"></headerinfo>
          </ep-tab-item>
          <ep-tab-item name="操作记录">
            <WholeOptStatus :tableData="operateData"></WholeOptStatus>
          </ep-tab-item>
          
          <!-- 操作记录部分 -->
          
        </ep-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import misList from 'src/base/mixins/mislist';
// import bodyinfo from './components/importBondedbodyinfo';
import formHeader from "./components/formHeader";
import headerinfo from './components/Bondedheaderinfo';
import WholeOptStatus from "src/components/WholeOptStatus";

import mixin from "./mixin";
import { cloneObj, getToken } from "utils";
export default {
  mixins: [mixin, misList],
  name: 'importBondedInfosdraw',
  components: {  headerinfo,formHeader },
  data () {
    return {
      detailData: [],
      bodyForm: {},
      tableData: [],
      operateData: [],
      ep_page1: {
        size: 10,
        page: 1
      },
      ep_page: {
        limit: 10,
        offset: 1
      },
      searchForm: {},
      loading: false,
      model: false,
      headColor: true,

    }
  },
  created () {
      if (this.$route.query.id) {
      this.againDate(this.$route.query.id);
    }
    // this.againDate(this.$route.query.id);
  },
  // mounted(){
  //   this.againDate(this.$route.query.id);
  // },

  methods: {
    handleSizeChange (val) {
      this.ep_page.size = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page
      );
    },
    handleCurrentChange (val) {
      this.ep_page.page = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page
      );
    },

    againDate (id) {
      this.$post("drawfindDetail", { id: id }).then(res => {
        this.bodyForm = cloneObj(res.map.data);
        this.searchForm = res.map.data
        this.operateData = res.map.data.preIncreaseStatus;
        this.detailData = res.map.data.preIncreaseDt;
      }).catch((res=>{
        
      }))
    }
  }
}
</script>