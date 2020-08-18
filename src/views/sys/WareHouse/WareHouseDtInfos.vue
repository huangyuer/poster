<template>
  <div class="panel-main-content">
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <ep-tabs active="进出区提发货凭证表头">
          <ep-tab-item name="进出区提发货凭证表头">
          <formHeader :bodyForm="bodyForm" :displayBlock="false" :isDtBody="true"></formHeader>
          </ep-tab-item>
          <ep-tab-item name="进出区提发货凭证表体" v-if="showdiFly">
         <formBody ref="infoForm" :listData="detailData" :isDtBody="true" :displayBlock="true" :changeState="bodyForm.inExpType"></formBody>
          </ep-tab-item>
          <ep-tab-item name="关联卡口凭证" v-if="showPort">
            <formBody :listData="portData" :isDtBody="true" :isTablePort="true"></formBody>
          </ep-tab-item>
           <ep-tab-item name="飞机试飞表体" v-if="showFly">
            <formBodyfly
              ref="formBodyfly"
              :listData="detailData"
            ></formBodyfly>
          </ep-tab-item>
          <ep-tab-item v-if="out" name="关联耗料单证">
            <outWord
              :listDate="portData"
              :changeType="false"
              :isDtBody="true" :isTablePort="true" :displayBlock="false"
            ></outWord>
          </ep-tab-item>
             <ep-tab-item name="关联出入库" v-if="changeSatus">
           <formInExp :dragEdit="bodyForm.isDrag=='1'?true:false" ref="formInExp" :headerForm="bodyForm" :listData="inExpData" :isDtInExp="true" :showInexp="showInexp"></formInExp>
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
import formBody from './components/formBody'
import  formHeader from './components/formHeader'
import  formInExp from './components/formInExp'
import outWord from './components/outWord'
import misList from "src/common/mislist";
import mixin from "./mixin";
export default {
  name: "WareHouseDtInfo",
  mixins: [misList, mixin], // 务必继承
  components:{formBody,formHeader,formInExp,outWord},
  data() {
    return {
      bodyForm: {},
      detailData: [],
      portData: [],
      operateData: [],
      inExpData:[],
      showPort:false,
      changeSatus:false,
      showInexp:true,
      showFly:false,
      showdiFly:true,
      out:false,
    };
  },

  mounted() {
    this.againDate(parseInt(this.$route.query.id));
  },
  methods: {
    againDate(id) {
      this.$post("wareHouseBscDetails", { id: id }).then(res => {
        this.bodyForm = cloneObj(res.map.data);
        if(this.bodyForm.inexpRltType==1)this.showInexp=false
        if(this.bodyForm.inExpType==3)this.showPort=true;
        if(this.bodyForm.inExpType==7){
          this.showFly=true
          this.showPort=true;
          this.showdiFly=false;
        }else{
          this.showdiFly=true;
        }
        if(this.bodyForm.inExpType==8){
          this.out=true
          this.showPort=false
        }
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
        setTimeout(()=>{
         this.changeSatus = true;
      },20)
      });
    },
  }
};
</script>
<style></style>
