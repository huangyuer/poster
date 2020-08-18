<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">
          <WmsButton  @click="doSave" :loading="saveLoading">暂存</WmsButton>
          <WmsButton  @click="addOther">新增</WmsButton>
          <!-- <ep-button type="success" size="small" @click="doPrint" icon="printer">打印</ep-button>:class= "(RelationStatus === 3) ? 'show' : 'hidden' " -->
        </div>
        <ep-tabs active="出入库预增减表头">
          <ep-tab-item name="出入库预增减表头">
            <formHeader
              @inExpStateChange="stateChange"
              :bodyForm="headerForm"
              ref="formHeader"
              :inExpTypeStatus="inExpTypeStatus"
              @ieTypecdChange="ieTypecdChange"
              :ieTypecdStatus="ieTypecdStatus"
              @changeGrossWt="changeGrossWt"
            ></formHeader>
          </ep-tab-item>
          <ep-tab-item name="出入库预增减表体">
            <formBody
              @dclcusStateChange="dclcusChange"
              ref="formBody"
              :headerForm="headerForm"
              :listData="tableData"
              :dtDetailArr="dtDetailArr"
              :changeState="RelationStatus"
              :changeDclcus="dclcusState"
              :ieTypecdState="ieTypecdChangeState"
            ></formBody>
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import misList from "src/common/mislist";
import formHeader from "./components/formHeader";
import { cloneObj, getToken } from "utils";
import formBody from "./components/formBody";
export default {
  name: "importAdd",
  extends: misList, // 务必继承
  components: {
    formHeader,
    formBody,
  },
  watch: {
 
  },
  created() {
  
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
      PreIncreaseDt: [],
      headerForm: {
        id: "",
        orgId: this.$store.getters.getId,
        // whRecPreentNo: "", // 仓单对应的编号
        stockBillNoPre: "", // ERP/WMS出入库编号
        stockBillNo:'',
        billType: "", // ERP/WMS出入库类型
        stockType:'',//库存类型
        tradeCode: this.$store.getters.getTradeCode, //经营企业编号
        tradeName: this.$store.getters.getTradeName, //经营企业名称
        tradeSccd: this.$store.getters.getCreditCode, //经营企业社会信用代码
        // businessTypecd: "", // 业务类别
        // inExpTime: "", // ERP/WMS出入库日期
        classifyType: "", // 料件、成品标志
        supvMode: "", // 监管方式
        trafMode: "", // 运输方式
        ieport: "", // 进出境关别
        masterCuscd: this.$store.getters.getCustomId, // 主管海关
        // rcvgdEtpsNo: this.$store.getters.getOrganizationCode,//收发货人代码
        // rcvgdEtpsSccd: this.$store.getters.getOrgCreditCode,//收发货人社会信用代码
        rltEntryNo: "", // 关联报关单编号
        // rltWhRecNo: "", // 关联仓单编号
        // whRecNo: "", // 仓单编号
        // dclTime: "", // 申报日期
        // dclcusFlag: "1", // 是否报关
        // dclcusTypecd: "", // 报关类型
        rmk: "", // 备注
        masterCuscd: "",
        // entryStucd: "", // 报关状态
        // optStatus: "", // 操作状态
        // stockDate:'',//创建时间
        businessType:"",
        destinationCode: "", // 最终目的国
        stshipTrsarvCode: "", // 启运国/运抵国
        tradeCountryCode: "", // 贸易国（地区）
        districtCode: "", // 境内目的地
        grossWt: "", // 毛重
        transMode: "", // 成交方式
        stockBillType: "", // 进出标志
        billNo:'',//提运单号
        shipNameEn:'',//英文船名
        voyageNo:'',//航次
        whNo:'',//仓库号
        whLoc:'',//库位
        orderNo:'',//客户订单号
        ownerName:'',//货主名称
        // value: "" // ERP/WMS出入库状态变化
      },
      RelationStatus: 3,
      ieTypecdChangeState: "",
      dclcusState: 1,
      customSearch: {},
      formRef: null,
      saveLoading: false, //暂存loading
      applyLoading: false, //申报loading
      isDeclare: false,
      tableData: [], // 表体表格
      dtDetailArr: [],
      inExpData: []
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
    stateChange(value) {
      this.changeBody = false;
      this.changeSatus = false;
      this.RelationStatus = Number(value);
      if (this.RelationStatus == 3) {
        this.changeBody = true;
      } else {
        this.changeBody = false;
      }
      setTimeout(() => {
        this.changeSatus = true;
      }, 20);
    },
    // 进出标志的值
    ieTypecdChange(value) {
      this.ieTypecdChangeState = value;
    },
    dclcusChange(value) {
      this.dclcusState = Number(value);
    },
    doRefresh(id) {
      this.$post("drawfindDetail", { id: parseInt(id) }).then(res => {
        this.headerForm = res.map.data;
        this.tableData = res.map.data.preIncreaseDt;
        let tableData = cloneObj(this.tableData);
        // tableData.forEach((e, i) => {
        //   e.leadId = i;
        // });
        this.tableData = tableData;
      });
    },
    // 暂存操作
    doSave() {
      //  this.doRefresh();
      
      let preIncreaseDt = this.$refs.formBody
        ? this.$refs.formBody.tableData
        : []
        // console.log(PreIncreaseDt)
        // console.log(this.$refs.formBody.tableData)
      this.headerForm = this.$refs.formHeader.bodyForm;
      this.$refs.formHeader.$refs["bodyForm"].validate(valid => {    
        if(valid){
          this.headerForm.preIncreaseDt = preIncreaseDt
          // this.headerForm.warehouseInExp =
          //   (this.$refs.formInExp && this.$refs.formInExp.tableDataCopy) || [];
          this.saveLoading = true;
          this.$post("drawsave", this.headerForm)
            .then(res => {
              (this.saveLoading = false), (this.isDeclare = true);
              this.inExpTypeStatus = true;
              this.doRefresh(res.map.id);
              this.headerForm.id=res.map.id
              // this.headerForm.reset()
              // this.headerForm=''
              
              if (this.RelationStatus == 3) {
                this.ieTypecdStatus = true;
              } else {
                this.ieTypecdStatus = false;
              }
            })
            .catch(() => {
              this.saveLoading = false;
            });
        } else{
          this.$pop({
            type: 'danger',
            message: '表单验证失败!'
          })
          return
        } 
      });
    },
    // 增加操作
    addOther() {
      this.$app.trigger("add-new-tab","importAdd")
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