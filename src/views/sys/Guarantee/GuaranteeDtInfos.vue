<template>
  <div class="panel-main-content">
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <ep-tabs active="保证金">
          <ep-tab-item name="保证金">
            <fromBadyinfo :bodyForm="bodyForm"></fromBadyinfo>
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
import { cloneObj } from "utils";
import fromBadyinfo from "./components/fromBadyinfo";
import misList from "src/common/mislist";
import WholeOptStatus from "src/components/WholeOptStatus";
// import mixin from "./mixin";
export default {
  name: "GuaranteeDtInfos",
 extends: misList, // 务必继承
  components: { fromBadyinfo ,WholeOptStatus},
  data() {
    return {
      bodyForm: {
        
      },
      detailData: [],
      portData: [],
      operateData: []
    };
  },
  created () {
      if (this.$route.query.id) {
      this.againDate(this.$route.query.id);
    }
    },
  // mounted() {

  //   this.againDate(this.$route.query.id);
  // },
  methods: {
    againDate(id) {
      this.$post("getLevyInvDetails", { id: id }).then(res => {
        this.bodyForm = cloneObj(res.map.data);
        this.operateData = res.map.data.levyInvStatus;
      });
    }
  }
};
</script>
<style></style>
