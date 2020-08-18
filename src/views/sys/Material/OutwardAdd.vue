<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">

          <WmsButton :loading="saveLoading" @click="doSave">暂存</WmsButton>
          <WmsButton :loading="applyLoading" @click="declare(isDeclare)">确认</WmsButton>
          <WmsButton @click="addOther">新增</WmsButton>

        </div>
        <ep-tabs active="耗料清单表头">
          <ep-tab-item name="耗料清单表头">
            <formHeader :bodyForm="headerForm" ref="formHeader" @businessType="businessType"></formHeader>
          </ep-tab-item>
          <ep-tab-item name="耗料清单耗用表体">
            <formBodyIn ref="formBody" :listData="tableData" :dtDetailArr="dtDetailArr" :businessY="businessY"></formBodyIn>
          </ep-tab-item>
          <ep-tab-item name="耗料清单产出表体">
            <formBodyOut ref="formBody1" :listData="tableData1" :dtDetailArr="dtDetailArr" ></formBodyOut>
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import misList from "src/common/mislist";
import formHeader from "./components/formHeader";
import formBodyIn from "./components/formBodyIn";
import formBodyOut from "./components/formBodyOut";
import { cloneObj, getToken } from "utils";
import bus from "./components/bus";
export default {
  name: "OutwardAdd",
  extends: misList, // 务必继承
  components: {
    formHeader,
    formBodyIn,
    formBodyOut,
  },
  watch: {

  },
  created() {
    // bus.$on("passBodyDt", data => {
    //   data.forEach(item => {
    //     this.tableData.push(item);
    //   });
    //   let t;
    //   this.tableData.forEach((el, index) => {
    //     el.whRecPreentNo = this.headerForm.whRecPreentNo;
    //     t = el.gdsSeqno;
    //     el.gdsSeqno = el.rltPortSeqno;
    //     el.rltPortSeqno = t;
    //     el.leadId = index;
    //   });
    // });
    // bus.$on("deleteDtDetail", data => {
    //   // this.tableData.forEach((table, i) => {
    //   //   data.forEach(item => {
    //   //     if (item.portNo === table.portNo) {
    //   //       this.tableData.splice(table,1);
    //   //     }
    //   //   });
    //   // });
    //   let table = [];
    //   for (var i = 0; i < this.tableData.length; i++) {
    //     let flag = true;
    //     for (var j = 0; j < data.length; j++) {
    //       if (this.tableData[i].portNo == data[j].portNo) {
    //         flag = false;
    //         break;
    //       }
    //     }
    //     if (flag) table.push(this.tableData[i]);
    //   }
    //   this.tableData = table;
    // });
  },
  beforeDestroy() {
    //组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    // bus.$off("passBodyDt");
    // bus.$off("deleteDtDetail");
  },
  mounted() {},
  data() {
    return {
      changeSatus: true,
      changeBody: true,
      tableDataCopy: [],
      tableDataCopy1: [],
      table2List: [],
      // warehousePort: [],
      headerForm: {
        id: "",
        orgId: this.$store.getters.getId,
        consumptionNo: "", // 清单料号编号
        bizopEtpsNo: this.$store.getters.getTradeCode, //经营企业编号
        bizopEtpsNm: this.$store.getters.getTradeName, //经营企业名称
        // bizopEtpsSccd: this.$store.getters.getCreditCode, //经营企业社会信用代码
        businessTypecd: "", // 业务类别
        dclData: "", // 申报日期
        optStatus: "", // 操作状态
        // contractNo:"",//合同号
        chgTmsCnt:"0",//变更次数
        dclTypecd:"1",//申报类型
        businessDeclareNo:'',
        passportUsedTypecd:'',//绑定标志
        rmk:"",
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
      tableData1: [], // 表体表格
      dtDetailArr: [],
      inExpData: [],
      consumDt:[],
      produceDt:[],
      businessY:'',
    };
  },
  methods: {
    businessType(value){
      this.businessY = value     
      // if(this.businessY==3&&this.$refs.formBody){
      //   this.$refs.formBody.tableData=[]
      // }
    },
    doRefresh(id) {
      this.$post("MaterialselectDetail", { id: parseInt(id) }).then(res => {
        this.headerForm = res.map.data;
        this.tableData = res.map.data.consumDt;
        this.tableData1 = res.map.data.produceDt;
        let tableData = cloneObj(this.tableData);
        tableData.forEach((e, i) => {
          e.leadId = i;
        });
        this.tableData = tableData;
        let tableData1 = cloneObj(this.tableData1);
        tableData1.forEach((e, i) => {
          e.leadId = i;
        });
        this.tableData1 = tableData1;
      });
    },
    // 暂存操作
    doSave() {   
         
      if(this.headerForm.businessTypecd==3&&this.$refs.formBody){
          // this.$refs.formBody.tableData=[]
          let Nan = true;   
          this.$refs.formBody.tableData.forEach(item=>{
            console.log(item.goodsType)
            if(item.goodsType==3){
              this.$pop({
                  type: "danger",
                  message: "一般加工货物类型不能有内销!"
                });
                Nan=false
                // console.log(this.Nan)
                return;
            }else{
              // Nan=true
            }
          })
          if(Nan){
              this.save();
          }
        }else{
            this.save();
        }
    },
    save(){
        this.headerForm = this.$refs.formHeader.bodyForm;
        this.$refs.formHeader.$refs["bodyForm"].validate(valid => {
          if (valid) {
            this.headerForm.consumDt =
              (this.$refs.formBody && this.$refs.formBody.tableDataCopy) ||
              this.tableData;
            this.headerForm.produceDt =
            (this.$refs.formBody1 && this.$refs.formBody1.tableDataCopy1) ||
            this.tableData1;
            this.saveLoading = true;
            this.$post("Materialsave", this.headerForm)
              .then(res => {
                (this.saveLoading = false), (this.isDeclare = true);
                this.inExpTypeStatus = true;
                this.doRefresh(res.map.id);
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
    if(this.headerForm.businessTypecd==3&&this.$refs.formBody){
      let Nan = true;
      this.$refs.formBody.tableData.forEach(item=>{
        if(item.goodsType==3){
              this.$pop({
                  type: "danger",
                  message: "一般加工货物类型不能有内销!"
                });
                Nan=false;
                return;
          }else{
            
          }
      })
      if(Nan){
        this.dealare();
      }
    }else{
        this.dealare();
      }  
    },
  dealare(){
    this.headerForm = this.$refs.formHeader.bodyForm;
    this.headerForm.consumDt =
      (this.$refs.formBody && this.$refs.formBody.tableDataCopy) ||
      this.tableData;
    this.headerForm.produceDt =
      (this.$refs.formBody1 && this.$refs.formBody1.tableDataCopy1) ||
      this.tableData1;
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
                let result = await vm.$post("Materialsave", data);
                // let arr = parseInt(map.data.id);
                let id = result.map.id
                let response = await vm.$post("Materialdeclare", {
                  id:id
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
      this.$app.trigger("add-new-tab", "OutwardAdd");
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
