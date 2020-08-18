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
          >确认</ep-button>-->

          <WmsButton :loading="saveLoading" @click="doSave">暂存</WmsButton>
          <WmsButton :loading="applyLoading" @click="declare(isDeclare)">确认</WmsButton>
        </div>
        <ep-tabs active="耗料清单表头">
          <ep-tab-item name="耗料清单表头">
            <formHeader :bodyForm="headerForm" ref="formHeader" @businessType="businessType"></formHeader>
          </ep-tab-item>
          <ep-tab-item name="耗料清单耗用表体">
            <formBodyIn ref="formBody" :listData="tableDataCopy" :headerForm="headerForm" :businessY="businessY"></formBodyIn>
          </ep-tab-item>
          <ep-tab-item name="耗料清单产出表体">
            <formBodyOut ref="formBody1" :listData="tableDataCopy1" :headerForm="headerForm"></formBodyOut>
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import formHeader from "./components/formHeader";
import formBodyIn from "./components/formBodyIn";
import formBodyOut from "./components/formBodyOut";
import { cloneObj, getToken } from "utils";
import mixin from "./mixin";
import misList from "src/common/mislist";
import bus from "./components/bus";
export default {
  name: "OutwardUpdate",
  mixins: [mixin, misList],
  components: {
    formHeader,
    formBodyIn,
    formBodyOut,
  },
  created() {
    // let curr = this.$store.getters.getCurrList;
    // this.currList = curr;
    // bus.$on("passBodyDtUp", (data) => {
    //   data.forEach((item) => {
    //     let t;
    //     item.whRecPreentNo = this.headerForm.whRecPreentNo;
    //     t = item.gdsSeqno;
    //     item.gdsSeqno = item.rltPortSeqno;
    //     item.rltPortSeqno = t;
    //     // item.leadId = this.tableDataCopy.length;
    //     this.tableDataCopy.push(item);
    //   });
    //   this.tableDataCopy.forEach((el, index) => {
    //     el.leadId = index;
    //   });
    // });
    // bus.$on("deleteDtDetailUp", (data) => {
    //   let table = [];
    //   for (var i = 0; i < this.tableDataCopy.length; i++) {
    //     let flag = true;
    //     for (var j = 0; j < data.length; j++) {
    //       if (this.tableDataCopy[i].portNo == data[j].portNo) {
    //         flag = false;
    //         break;
    //       }
    //     }
    //     if (flag) table.push(this.tableDataCopy[i]);
    //   }
    //   this.tableDataCopy = table;
    // });
  },
  // beforeDestroy() {
  //   //组件销毁前需要解绑事件。否则会出现重复触发事件的问题
  //   bus.$off("passBodyDtUp");
  //   bus.$off("deleteDtDetailUp");
  // },
  mounted() {
    this.againDate(parseInt(this.$route.query.id));
  },
  // mounted() {},
  data() {
    return {
      bodyDrag: false,
      // warehouseInExp: [],
      inExpTypeStatus: true,
      ieTypecdStatus: false,
      changeSatus: true,
      inExpTypeVal: "",
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
        chgTmsCnt:"",//变更次数
        dclTypecd:"",//申报类型
        businessDeclareNo:"",
        passportUsedTypecd:'',//绑定标志
        rmk:'',
      },
      RelationStatus: 3,
      dclcusState: 1,
      saveLoading: false, //暂存loading
      applyLoading: false, //申报loading
      isDeclare: false,
      tableDataCopy: [],
      tableDataCopy1: [],
      consumDt:[],//耗能表体
      produceDt:[],//产出表体,
      businessY:'',
    };
  },

  methods: {
    businessType(value){
      this.businessY = value
    },
    againDate(id) {
      this.$post("MaterialselectDetail", { id: parseInt(id) }).then((res) => {
        this.headerForm = res.map.data;
        
        this.headerForm.businessDeclareNo=res.map.data.businessDeclareNo
        console.log(this.headerForm.businessDeclareNo,'111111')
        this.tableDataCopy = res.map.data.consumDt;
        this.tableDataCopy1 = res.map.data.produceDt;
        let tableDataCopy = cloneObj(this.tableDataCopy);
        tableDataCopy.forEach((e, i) => {
          e.leadId = i;
        });
        this.tableDataCopy = tableDataCopy;
        let tableDataCopy1 = cloneObj(this.tableDataCopy1);
        tableDataCopy1.forEach((e, i) => {
          e.leadId = i;
        });
        this.tableDataCopy1 = tableDataCopy1;
      });
    },
    // 暂存操作
    doSave() {
      if(this.headerForm.businessTypecd==3&&this.$refs.formBody){
        let Nan = true;
        this.$refs.formBody.tableData.forEach(item=>{
          if(item.goodsType==3){
              this.$pop({
                  type: "danger",
                  message: "一般加工货物类型不能有内销!"
                });
                Nan=false
                return;
            }else{
              
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
        this.$refs.formHeader.$refs["bodyForm"].validate((valid) => {
          if (valid) {
            this.headerForm.consumDt =
              (this.$refs.formBody && this.$refs.formBody.tableDataCopy) ||
              this.tableDataCopy;
            this.headerForm.produceDt =
            (this.$refs.formBody1 && this.$refs.formBody1.tableDataCopy1) ||
            this.tableDataCopy1;
            this.saveLoading = true;
            this.$post("Materialsave", this.headerForm)
              .then((res) => {
                this.saveLoading = false;
                this.isDeclare = true;
                this.againDate(res.map.id);
              })
              .catch(() => {
                this.saveLoading = false;
              });
          } else {
            this.$pop({
              type: "danger",
              message: "表单验证失败!",
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
          message: "请先暂存",
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
            this.dealare();
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
          this.tableDataCopy;
        this.headerForm.produceDt =
        (this.$refs.formBody1 && this.$refs.formBody.tableDataCopy1) ||
        this.tableDataCopy1;

        this.$refs["formHeader"].$refs.bodyForm.validate((valid) => {
          if (!valid) {
            this.$pop({
              type: "danger",
              message: "表单验证失败",
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
                    let id = result.map.id
                    let response = await vm.$post("Materialdeclare", {
                      id:id
                    });
                    vm.applyLoading = false;
                  } catch (err) {
                    vm.applyLoading = false;
                  }
                }
              },
            });
          }
        });
    }
  },
};
</script>
