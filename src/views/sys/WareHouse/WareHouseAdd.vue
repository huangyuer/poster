<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">
          <!-- <ep-button
            type="success"
            size="small"
            @click="doSave"
            icon="edit"
            :loading="saveLoading"
          >暂存</ep-button>
          <ep-button
            type="success"
            size="small"
            @click="declare(isDeclare)"
            icon="checkmark-round"
            :loading="applyLoading"
          >确认</ep-button>
          <ep-button type="success" size="small" icon="plus-round" @click="addOther">新增</ep-button> -->
          <!-- <ep-button type="success" size="small" @click="doPrint" icon="printer">打印</ep-button>:class= "(RelationStatus === 3) ? 'show' : 'hidden' " -->
        
        <WmsButton :loading="saveLoading"  @click="doSave">暂存</WmsButton>
        <WmsButton :loading="applyLoading"  @click="declare(isDeclare)">确认</WmsButton>
        <WmsButton   @click="addOther">新增</WmsButton>
        
        </div>
        <ep-tabs active="进出区提发货凭证表头">
          <ep-tab-item name="进出区提发货凭证表头">
            <formHeader
              @inExpStateChange="stateChange"
              :bodyForm="headerForm"
              ref="formHeader"
              :inExpTypeStatus="inExpTypeStatus"
              @ieTypecdChange="ieTypecdChange"
              @rltWhRecNochange="rltWhRecNochange"
              :ieTypecdStatus="ieTypecdStatus"
              @changeGrossWt="changeGrossWt"
              @mtpckEndprdT="mtpckEndprdT"
            ></formHeader>
          </ep-tab-item>
          <ep-tab-item name="进出区提发货凭证表体" v-if="changeSatus">
            <formBody
              @dclcusStateChange="dclcusChange"
              ref="formBody"
              :headerForm="headerForm"
              :listData="tableData"
              :dtDetailArr="dtDetailArr"
              :changeState="RelationStatus"
              :changeDclcus="dclcusState"
              :ieTypecdState="ieTypecdChangeState"
              :changeType="false"
            ></formBody>
          </ep-tab-item>
          <!-- <ep-tab-item name="飞机试飞表体" v-if="fly">
            <formBodyfly
              ref="formBodyfly"
              :headerForm="headerForm"
              :listData="tableData"
            ></formBodyfly>
          </ep-tab-item> -->
          <ep-tab-item v-if="changeBody" name="关联卡口凭证">
            <formRelation
              :listDate="warehousePort"
              ref="formRelation"
              :headerForm="headerForm"
              :ieTypecdState="ieTypecdChangeState"
              @getDtDetail="getDtDetailList"
              :changeType="false"
              :mtpckEndprd="mtpckEndprd"
            ></formRelation>
          </ep-tab-item>
          <ep-tab-item v-if="out" name="关联耗料单证">
            <outWord
              :listDate="warehousePort"
              ref="outWord"
              :headerForm="headerForm"
              :ieTypecdState="ieTypecdChangeState"
              :rltWhRecNoState="rltWhRecNochangeState"
              @getDtDetail="getDtDetailList"
              :changeType="false"
            ></outWord>
          </ep-tab-item>
          <ep-tab-item name="关联出入库" v-if="changeSatus || fly">
            <formInExp ref="formInExp" :headerForm="headerForm" :listData="inExpData"></formInExp>
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import misList from "src/common/mislist";
import formHeader from "./components/formHeader";
import formBody from "./components/formBody";
import formRelation from "./components/formRelation";
import formInExp from "./components/formInExp";
import outWord from "./components/outWord"
import { cloneObj, getToken } from "utils";
// import formBodyfly from './components/formBodyfly'
import bus from "./components/bus";
export default {
  name: "WareHouseAdd",
  extends: misList, // 务必继承
  components: {
    formHeader,
    formBody,
    formRelation,
    formInExp,
    // formBodyfly,
    outWord
  },
  watch: {
    "headerForm.inExpType"(val, oldVal) {
      if (val && val == 3) {
        this.tableData = [];
        this.warehousePort = [];
      }
      if (oldVal && oldVal == 3) {
        this.tableData = [];
        this.warehousePort = [];
      }
    },
    "headerForm.ieTypecd"(val, oldVal) {
      if (oldVal && val != oldVal) {
        this.tableData = [];
        this.warehousePort = [];
      }

      // if(val&&val==3){
      //     this.tableData = [];
      // this.warehousePort = [];
      // }
      //      if(oldVal&&oldVal==3){
      //     this.tableData = [];
      // this.warehousePort = [];
      // }
    }
  },
  created() {
    //  bus.$on("AddFly",data=>{
    //   console.log("data")
    // })  
    bus.$on("passBodyDt", data => {
      data.forEach(item => {
        this.tableData.push(item);
      });
         let t;
        this.tableData.forEach((el, index) => {
          el.whRecPreentNo=this.headerForm.whRecPreentNo
          t=el.gdsSeqno;
          el.gdsSeqno=el.rltPortSeqno;
          el.rltPortSeqno=t;
          el.leadId = index;
        });
    });
    bus.$on("passBodyDtOut", data => {
      console.log(data,'1111')
      data.forEach(item => {
        this.tableData.push(item);
      });
         let t;
        this.tableData.forEach((el, index) => {
          el.whRecPreentNo=el.consumptionNo
          // this.headerForm.whRecPreentNo=el.consumptionNo
          el.dclUnitcd= el.bizopEtpsNo
          t=el.gdsSeqno;
          el.gdsSeqno=el.gdsSeqno;
          el.rltPortSeqno=t;
          el.leadId = index;
        });
    });
    bus.$on("deleteDtDetail", data => {
      // this.tableData.forEach((table, i) => {
      //   data.forEach(item => {
      //     if (item.portNo === table.portNo) {
      //       this.tableData.splice(table,1);
      //     }
      //   });
      // });
      let table = [];
      for (var i = 0; i < this.tableData.length; i++) {
        let flag = true;
        for (var j = 0; j < data.length; j++) {
          if (this.tableData[i].portNo == data[j].portNo) {
            flag = false;
            break;
          }
        }
        if (flag) table.push(this.tableData[i]);
      }
      this.tableData = table;
    });
    bus.$on("deleteDtDetailOut", data => {
      // this.tableData.forEach((table, i) => {
      //   data.forEach(item => {
      //     if (item.portNo === table.portNo) {
      //       this.tableData.splice(table,1);
      //     }
      //   });
      // });
      let table = [];
      for (var i = 0; i < this.tableData.length; i++) {
        let flag = true;
        for (var j = 0; j < data.length; j++) {
          if (this.tableData[i].portNo == data[j].consumptionNo) {
            flag = false;
            break;
          }
        }
        if (flag) table.push(this.tableData[i]);
      }
      this.tableData = table;
    });
  },
  beforeDestroy() {
    //组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    bus.$off("passBodyDt");
    bus.$off("deleteDtDetail");
    bus.$off("passBodyDtOut");
    bus.$off("deleteDtDetailOut");
  },
  mounted() {},
  data() {
    return {
      inExpTypeStatus: false,
      ieTypecdStatus: false,
      changeSatus: true,
      changeBody: true,
      tableDataCopy: [],
      table2List: [],
      warehousePort: [],
      fly:false,
      out:false,
      headerForm: {
        id: "",
        orgId: this.$store.getters.getId,
        whRecPreentNo: "", // 仓单对应的编号
        inExpWhNo: "", // ERP/WMS出入库编号
        inExpType: "3", // ERP/WMS出入库类型
        bizopEtpsno: this.$store.getters.getTradeCode, //经营企业编号
        bizopEtpsNm: this.$store.getters.getTradeName, //经营企业名称
        bizopEtpsSccd: this.$store.getters.getCreditCode, //经营企业社会信用代码
        businessTypecd: "", // 业务类别
        inExpTime: "", // ERP/WMS出入库日期
        mtpckEndprdTypecd: "", // 料件、成品标志
        supvModecd: "", // 监管方式
        trspModecd: "", // 运输方式
        impexpPortcd: "", // 进出境关别
        masterCuscd: this.$store.getters.getCustomId, // 主管海关
        rltEntryNo: "", // 关联报关单编号
        rltWhRecNo: "", // 关联仓单编号
        whRecNo: "", // 仓单编号
        dclTime: "", // 申报日期
        dclcusFlag: "2", // 是否报关
        dclcusTypecd: "2", // 报关类型
        preRecAccountTime: "", // 预记入企业账户时间
        recAccountTime: "", // 正式记入企业账户时间
        invtIochkptStucd: "", // 进出卡口状态
        vrfdedMarkcd: "", // 核扣标记
        rmk: "", // 备注
        entryStucd: "", // 报关状态
        optStatus: "", // 操作状态
        destinationNatcd: "", // 最终目的国
        tradeCountry: "", // 启运国/运抵国
        tradingRegion: "", // 贸易国（地区）
        districtCode: "", // 境内目的地
        grossWt: "", // 毛重
        transMode: "", // 成交方式
        ieTypecd: "", // 进出标志
        value: "" // ERP/WMS出入库状态变化
      },
      RelationStatus: 3,
      ieTypecdChangeState: "",
      rltWhRecNochangeState:'',
      dclcusState: 1,
      customSearch: {},
      formRef: null,
      saveLoading: false, //暂存loading
      applyLoading: false, //申报loading
      isDeclare: false,
      tableData: [], // 表体表格
      dtDetailArr: [],
      inExpData:[],
      mtpckEndprd:'',
    };
  },
  methods: {
    getDtDetailList(dtDetailList) {
      dtDetailList.forEach((item, index) => {
        this.$set(this.tableData, index, item);
      });
    },
    changeGrossWt(val) {
      let reg = /^\d*\.{0,1}\d{0,5}$/;
      if (!reg.test(val)) {
        this.headerForm.grossWt = val;
        return;
      }
      if (val) {
        this.headerForm.grossWt = parseFloat(val).toString();
      }
    },
    mtpckEndprdT(value){
      this.mtpckEndprd=value
    },
    stateChange(value) {
      this.changeBody = false;
      this.changeSatus = false;
      this.RelationStatus = Number(value);
      if (this.RelationStatus == 3 || this.RelationStatus==7) {
        this.changeBody = true;
      } 
      else {
        this.changeBody = false;
      }
      if(this.RelationStatus==7){
        this.fly=true
      }else{
          setTimeout(() => {
          this.changeSatus = true;
        }, 20);
        this.fly=false
      }
      if(this.RelationStatus==8){
        this.out=true
      }else{
        this.out=false
      }  
    },
    // 进出标志的值
    ieTypecdChange(value) {
      this.ieTypecdChangeState = value;
    },
    rltWhRecNochange(value){
      this.rltWhRecNochangeState=value
    },
    dclcusChange(value) {
      this.dclcusState = Number(value);
    },
    doRefresh(id) {
      this.$post("wareHouseBscDetails", { id: parseInt(id) }).then(res => {
        this.headerForm = res.map.data;
            this.tableData = res.map.data.warehouseReceiptDt;
        let tableData = cloneObj(this.tableData);
        tableData.forEach((e, i) => {
          e.leadId = i;
        });
        this.tableData = tableData;

             this.inExpData = res.map.data.warehouseInExp;
        let inExpData = cloneObj(this.inExpData);
        inExpData.forEach((e, i) => {
          e.leadId = i;
        });
        this.inExpData = inExpData;
      });
    },
    // 暂存操作
    doSave() {
      this.headerForm = this.$refs.formHeader.bodyForm;
      this.$refs.formHeader.$refs["bodyForm"].validate(valid => {
        if (valid) {
          this.headerForm.warehouseReceiptDt =
            (this.$refs.formBody && this.$refs.formBody.tableDataCopy) ||
            this.tableData;
          this.headerForm.warehousePort =
            (this.$refs.formRelation &&
              this.$refs.formRelation.tableDataCopy) ||
            this.warehousePort;
          this.headerForm.warehouseInExp =
            (this.$refs.formInExp && this.$refs.formInExp.tableDataCopy) || [];
          this.saveLoading = true;
          this.$post("wareHouseSave", this.headerForm)
            .then(res => {
              (this.saveLoading = false), (this.isDeclare = true);
              this.inExpTypeStatus = true;
              this.doRefresh(res.map.data);
              if (this.RelationStatus == 3) {
                this.ieTypecdStatus = true;
              } else {
                this.ieTypecdStatus = false;
              }
            })
            .catch(() => {
              this.saveLoading = false;
            });
        } else {
          this.$pop({
            type: "danger",
            message: "表单验证失败!"
          });
          return;
        }
      });
    },
    // 确认操作
    declare(isDeclare) {
      if (!isDeclare) {
        this.$pop({
          type: "danger",
          message: "请先暂存"
        });
        return;
      }
      this.headerForm = this.$refs.formHeader.bodyForm;
      this.headerForm.warehouseReceiptDt =
        (this.$refs.formBody && this.$refs.formBody.tableDataCopy) ||
        this.tableData;
      this.headerForm.warehousePort =
        (this.$refs.formRelation && this.$refs.formRelation.tableDataCopy) ||
        this.warehousePort;
      this.headerForm.warehouseInExp =
        (this.$refs.formInExp && this.$refs.formInExp.tableDataCopy) || [];
      this.$refs["formHeader"].$refs.bodyForm.validate(valid => {
        if (!valid) {
          this.$pop({
            type: "danger",
            message: "表单验证失败"
          });
          return;
        } else {
          let vm = this;
          this.$confirm({
            word: "是否要确认？",
            async callback(info) {
              if (info) {
                try {
                  let data = vm.headerForm;
                  vm.applyLoading = true;
                  let result = await vm.$post("wareHouseSave", data);
                  let arr = parseInt(data.id);
                  let response = await vm.$post("wareHouseSubmit", {
                    // id: [id]
                    bscIds: [arr]
                  });
                  vm.applyLoading = false;
                } catch (err) {
                  vm.applyLoading = false;
                }
              }
            }
          });
        }
      });
    },
    // 增加操作
    addOther() {
      this.$app.trigger("add-new-tab", "WareHouseAdd");
      // let menusList = this.$store.getters.getMenuTabInstance.items;
      // menusList.forEach(function(item, index) {
      //   if (item.link == "/WareHouseAdd") {
      //     menusList.splice(index, 1);
      //   }
      // });
      // this.$router.push({ name: "首页" });
      // setTimeout(() => {
      //   this.$router.push({
      //     path: "/WareHouseAdd"
      //   });
      // }, 10);
    }
  }
};
</script>


<style scoped>
.hidden {
  display: none;
}
.show {
  display: inline-block;
}
</style>