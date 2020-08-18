<template>
  <div class="panel-main-content">
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <ep-tabs active="外发加工表头">
          <ep-tab-item name="外发加工表头">
            <formHeader :bodyForm="bodyForm" :displayBlock="false" :isDtBody="true"></formHeader>
          </ep-tab-item>
          <ep-tab-item name="外发加工出区表体">
            <formBodyOut ref="infoForm" :bodyOutChange="false" :listData="detailData" :isDtBody="true" :displayBlock="true"></formBodyOut>
          </ep-tab-item>
          <ep-tab-item name="外发加工入区表体">
            <formBodyIn ref="infoForm" :bodyInChange="false" :listData="detailData" :isDtBody="true" :displayBlock="true"></formBodyIn>
          </ep-tab-item>
          <ep-tab-item name="操作记录" v-if="changeSatus">
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
      this.$post("wareHouseBscDetails", { id: id }).then((res) => {
        this.bodyForm = cloneObj(res.map.data);
        if (this.bodyForm.inexpRltType == 1) this.showInexp = false;
        this.detailData = res.map.data.warehouseReceiptDt;
        let detailData = cloneObj(this.detailData);
        detailData.forEach((e, i) => {
          e.leadId = i;
        });
        this.detailData = detailData;
        this.portData = res.map.data.warehousePort;
        let portData = cloneObj(this.portData);
        portData.forEach((e, i) => {
          e.leadId = i;
        });
        this.portData = portData;

        this.inExpData = res.map.data.warehouseInExp;

        let inExpData = cloneObj(this.inExpData);
        inExpData.forEach((e, i) => {
          e.leadId = i;
        });
        this.inExpData = inExpData;
        this.operateData = res.map.data.warehouseStatus;
        setTimeout(() => {
          this.changeSatus = true;
        }, 20);
      });
    },
  },
};
</script>
<style></style>
