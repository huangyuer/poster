<template>
  <div class="panel-main-content">
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <ep-tabs active="业务申报表头">
          <ep-tab-item name="业务申报表头">
            <fromBadyinfo :bodyForm="bodyForm" :detail='true'></fromBadyinfo>
          </ep-tab-item>
          <ep-tab-item name="关联单证">
            <ep-tabs active="卡口出区">
              <ep-tab-item name="卡口出区">
                <portOut :bodyForm="bodyForm" :inExpTypes='type' :buNo='buNo'></portOut>
              </ep-tab-item>
              <ep-tab-item name="卡口进区">
                <portIn :bodyForm="bodyForm" :detail='true' :inExpTypes='type' :buNo='buNo'></portIn>
              </ep-tab-item>
              <ep-tab-item name="耗料清单">
                <MaterIn :detail='true' :buNo='buNo'></MaterIn>
              </ep-tab-item>
              <!-- <ep-tab-item name="进出区提发货">
                <warseHouse :buNo='buNo' :detail='true'></warseHouse>

              </ep-tab-item> -->
            </ep-tabs>
            <!-- <portLated :tableDataLated="tableDataLated" :detail='false'></portLated> -->
          </ep-tab-item>
          <ep-tab-item name="卡口进区表体">
            <portBodyIn :inExpTypes='type' :buNo='buNo'></portBodyIn>
          </ep-tab-item>
          <ep-tab-item name="卡口出区表体">
            <portBodyOut :inExpTypes='type' :buNo='buNo'></portBodyOut>
          </ep-tab-item>
          <ep-tab-item name="耗料清单产出表体">
            <formBodyOut ref="" :listData="detailData1" :isDtBody="true" :buNo='buNo'></formBodyOut>
          </ep-tab-item>
          <ep-tab-item name="耗料清单耗用表体">
            <formBodyIn ref="" :listData="detailData2" :isDtBody="true" :buNo='buNo'></formBodyIn>
          </ep-tab-item>
          <!-- <ep-tab-item name="进出区提发货表体">
            <warseHouseBody ref="" :listData="detailData3" :isDtBody="true" :buNo='buNo'></warseHouseBody>
          </ep-tab-item> -->
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
import formBodyIn from "./components/formBodyIn";
import formBodyOut from "./components/formBodyOut";
import portBodyIn from "./components/dtFormBodyIn";
import portBodyOut from "./components/dtFormBodyOut";
import portIn from "./components/portIn";
import portOut from "./components/portOut";
import MaterIn from "./components/MaterIn";
import warseHouse from "./components/warseHouse";
import warseHouseBody from "./components/warseHouseBody";

// import mixin from "./mixin";
export default {
  name: "BusinessDeclarFromDtInfos",
  extends: misList, // 务必继承
  components: {
    fromBadyinfo,
    WholeOptStatus,
    formBodyIn,
    formBodyOut,
    portBodyIn,
    portBodyOut,
    portIn,
    portOut,
    MaterIn,
    warseHouse,
    warseHouseBody,
  },
  data() {
    return {
      type: "", // 业务类型
      buNo: "",
      bodyForm: {},
      detailData: [],
      portData: [],
      operateData: [],
      tableDataLated: [], //关联出入库单证
      dtFormBody1: [], // 卡口出区表体
      dtFormBody2: [], // 卡口入区表体
      detailData1: [], // 耗料清单耗用表体
      detailData2: [], // 耗料清单产出表体
      detailData3: [], //进出区提发货表体
    };
  },
  created() {
    if (this.$route.query.id) {
      this.againDate(this.$route.query.id);
    }
  },

  methods: {
    againDate(id) {
      this.$post("sasDeclareSelectDetail", { id: id }).then((res) => {
        this.bodyForm = cloneObj(res.map.businessDeclareBsc);
        let types = this.bodyForm.type;
        if (types == 1) {
          this.type = 8;
        } else if (types == 2) {
          this.type = 9;
        }
        this.buNo = this.bodyForm.businessDeclareNo;

        this.operateData = res.map.businessDeclareStatuses;
      });
    },
  },
};
</script>
<style></style>
