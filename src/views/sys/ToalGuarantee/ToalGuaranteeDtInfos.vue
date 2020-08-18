<template>
  <div class="panel-main-content">
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <ep-tabs active="总担保">
          <ep-tab-item name="总担保">
            <fromBadyinfo :bodyForm="bodyForm"></fromBadyinfo>
          </ep-tab-item>
           <ep-tab-item name="关联保证金">
            <fromBadyreinfo :tableData="detailData"></fromBadyreinfo>
          </ep-tab-item>
          <ep-tab-item name="操作记录">
            <WholeOptStatus :tableData="operateData"></WholeOptStatus>
          </ep-tab-item>
         
        </ep-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { cloneObj } from "utils";
import fromBadyinfo from "./components/fromBadyinfo";
import fromBadyreinfo from "./components/fromBadyreinfo";
import misList from "src/common/mislist";
import mixin from "./mixin";
export default {
  name: "ToalGuaranteeDtInfos",
 extends: misList, // 务必继承
 mixins: [mixin, misList],
  components: { fromBadyinfo ,fromBadyreinfo},
  data() {
    return {
      bodyForm: {
        
      },
      detailData:[],
      detailData: [],
      portData: [],
      operateData: []
    };
  },

  mounted() {

    this.againDate(this.$route.query.id);
    // console.log(this.$route.query.id)
  },
  methods: {
    againDate(id) {
      this.$post("selectGrtBsc", { id: id }).then(res => {
        this.bodyForm = cloneObj(res.map.data);
        this.detailData=res.map.data.grtLevy
        this.operateData = res.map.data.grtStatus;
      });
    }
  }
};
</script>
<style></style>
