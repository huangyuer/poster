<template>
  <div class="panel-main-content">
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <ep-tabs active="耗料清单表头">
          <ep-tab-item name="耗料清单表头">
            <formHeader :bodyForm="bodyForm" :displayBlock="false" :isDtBody="true" :dcldata="true"></formHeader>
          </ep-tab-item>
          <ep-tab-item name="耗料清单耗用表体">
            <formBodyIn ref="infoForm" :bodyInChange="false" :listData="detailData" :isDtBody="true" :displayBlock="true"></formBodyIn>
          </ep-tab-item>
          <ep-tab-item name="耗料清单产出表体">
            <formBodyOut ref="infoForm" :bodyOutChange="false" :listData="portData" :isDtBody="true" :displayBlock="true"></formBodyOut>
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
import formBodyIn from "./components/formBodyIn";
import formBodyOut from "./components/formBodyOut";
import formHeader from "./components/formHeader";
// import formInExp from "./components/formInExp";
import misList from "src/common/mislist";
import mixin from "./mixin";
export default {
  name: "OutwardDtInfos",
  mixins: [misList, mixin], // 务必继承
  components: { formBodyIn, formBodyOut, formHeader },
  data() {
    return {
      bodyForm: {},
      detailData: [],
      portData: [],
      operateData: [],
      inExpData: [],
      showPort: false,
      changeSatus: false,
      showInexp: true,
    };
  },

  mounted() {
    this.againDate(parseInt(this.$route.query.id));
  },
  methods: {
    againDate(id) {
      this.$post("MaterialselectDetail", { id: id }).then((res) => {
        this.bodyForm = cloneObj(res.map.data);
        if (this.bodyForm.inexpRltType == 1) this.showInexp = false;
        this.detailData = res.map.data.consumDt;
        let detailData = cloneObj(this.detailData);
        detailData.forEach((e, i) => {
          e.leadId = i;
        });
        this.detailData = detailData;
        this.portData = res.map.data.produceDt;
        let portData = cloneObj(this.portData);
        portData.forEach((e, i) => {
          e.leadId = i;
        });
        this.portData = portData;
        this.operateData = res.map.data.materialUseStatus;
      });
    },
  },
};
</script>
<style></style>
