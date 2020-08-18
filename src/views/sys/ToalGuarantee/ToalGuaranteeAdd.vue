<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">
          <WmsButton  @click="doSave" :loading="saveLoading">暂存</WmsButton>
           <WmsButton @click="declare(isDeclare)">确认</WmsButton>
          <WmsButton  @click="addOther">新增</WmsButton>
          <!-- <ep-button type="success" size="small" @click="doPrint" icon="printer">打印</ep-button>:class= "(RelationStatus === 3) ? 'show' : 'hidden' " -->
        </div>
       <ep-tabs active="总担保">
          <ep-tab-item name="总担保">
            <fromBady
              :bodyForm="bodyForm"
              ref="formHeader"
            ></fromBady>
          </ep-tab-item>
          <ep-tab-item name="关联保证金">
            <fromBadyre
              ref="formBody"
              :listData="tableData"
            ></fromBadyre>
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import misList from "src/common/mislist";
import fromBady from "./components/fromBady";
import { cloneObj, getToken } from "utils";
import fromBadyre from "./components/fromBadyre";
export default {
  name: "ToalGuaranteeAdd",
  extends: misList, // 务必继承
  components: {
    fromBady,
    fromBadyre,
  },
  watch: {
 
  },
  created() {
  
  },

  mounted() {},
  data() {
    return {
      changeBody: true,
      tableDataCopy: [],
      grtLevy: [],
     bodyForm: {
        id: "",
        orgId: this.$store.getters.getId,
        orgCode: this.$store.getters.getOrgCode,
        // gsarNo:'',//总担保编号
        // usableAmt:'',//可用金额
        // lockAmt:'',//锁定金额
        // grtAmt:'',//金额
        // dclData:'',//申报时间
        dclTypecd:'0',//申报类型
        // Status:'',
        rmk:'',
        // dpstLevyBlNo:'',
        // createTime:'',//创建时间
        // ltguaStatus:'',//保函状态
        // dpstLevyBlNo:'',//清单编号
      },
      dclcusState: 1,
      customSearch: {},
      formRef: null,
      saveLoading: false, //暂存loading
      applyLoading: false, //申报loading
      isDeclare: false,
      tableData: [], // 表体表格
      dtDetailArr: [],
      inExpData: [],
      saveStatus: 0,
      page_rules: {
        orgId: { required: true, message: "不能为空", trigger: "change" },
        // createTime: { required: true, message: "不能为空", trigger: "change" },
        // ltguaStatus: {
        //   required: true,
        //   message: "不能为空",
        //   trigger: "change"
        // },
        dpstLevyBlNo: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        grtAmt: { required: true, message: "不能为空", trigger: "change" },
        dclTypecd: { required: true, message: "不能为空", trigger: "change" },
        createTime: { required: true, message: "不能为空", trigger: "change" },
        lockAmt: { required: true, message: "不能为空", trigger: "change" },
        usableAmt: { required: true, message: "不能为空", trigger: "change" },
        // dclData: { required: true, message: "不能为空", trigger: "change" },
        // gsarNo: { required: true, message: "不能为空", trigger: "change" },
      }

    };
  },
  methods: {
    doRefresh(id) {
      console.log(id)
      this.$post("selectGrtBsc", { id: parseInt(id) }).then(res => {
        this.bodyForm = res.map.data;
        this.tableData = res.map.data.grtLevy;
        let tableData = cloneObj(this.tableData);
        tableData.forEach((e, i) => {
          e.leadId = i;
        });
        this.tableData = tableData;
      });
    },
    // 暂存操作
     doSave() {
      
      let bodyForm = this.$refs.formHeader.bodyForm; 
      this.$refs.formHeader.$refs["bodyForm"].validate(valid => {    
        if(valid){
          bodyForm["grtLevy"] = this.$refs.formBody
        ? this.$refs.formBody.tableData
        : []
          
          this.$post("grtSaving", bodyForm)
            .then(res => {
              this.inExpTypeStatus = true;
              this.doRefresh(res.map.id);
              this.saveLoading = false;
              this.isDeclare = true;
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
    declare(isDeclare){
       if (!isDeclare) {
        this.$pop({
          type: "danger",
          message: "请先暂存"
        });
        return;
      }
      let bodyForm = this.$refs.formHeader.bodyForm; 
      this.$refs.formHeader.$refs["bodyForm"].validate(valid=>{
        if (!valid) {
          this.$pop({
            type: "danger",
            message: "表单验证失败"
          });
          return;
        }else{
           bodyForm["grtLevy"] = this.$refs.formBody
          ? this.$refs.formBody.tableData
          : []
          let vm = this;
          this.$confirm({
            word: "是否要确认？",
            async callback(info) {
              if (info) {
                try {
                  let data = bodyForm;
                  console.log(data.id)
                  let result = await vm.$post("grtSaving", data);
                  let ids = Number(data.id);
                  let response = await vm.$post("grtDeclare", {
                    ids: [ids]
                  });
                  this.doRefresh(res.map.data);
                } catch (err) {

                }
              }
            }
          });
        }
      })
    },
    // 增加操作
    addOther() {
      this.$app.trigger("add-new-tab","ToalGuaranteeAdd")
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