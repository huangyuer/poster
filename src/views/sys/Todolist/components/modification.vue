[<template>
  <div>
    <ep-model title="修改" v-model="modelFlag" width="1350px" :wrap-close="false">
      <ep-form ref="searchForm" :form="searchForm" :rules="page_rules" name-width="130px">
        <ep-row :gutter="7">
          <!-- <ep-col :col="8">
            <ep-form-item label="系统代码" attr="sysCode">
              <ep-select v-model="searchForm.sysCode" name="sysCode">
                <ep-select-item index="1" label="NEPZ"></ep-select-item>
                <ep-select-item index="1" label="待审核"></ep-select-item>
                <ep-select-item index="2" label="审核通过"></ep-select-item>
                <ep-select-item index="3" label="转人工"></ep-select-item>
                <ep-select-item index="4" label="审核拒绝"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="类型" attr="type">
              <ep-select v-model="searchForm.type" name="type">
                <ep-select-item index="1" label="企业待办"></ep-select-item>
                <ep-select-item index="2" label="组织待办"></ep-select-item>
                <ep-select-item index="3" label="个人待办"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="分类" attr="classify">
              <ep-select v-model="searchForm.classify" name="classify">
                  <ep-select-item index="1" label="NEPZ"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="预警级别" attr="warningRank">
              <ep-select v-model="searchForm.warningRank" name="warningRank">
                <ep-select-item index="1" label="重要"></ep-select-item>
                <ep-select-item index="2" label="一般"></ep-select-item>
                <ep-select-item index="3" label="低"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col> -->
          <ep-col :col="8">
            <ep-form-item label="标题" attr="title">
              <ep-input v-model="searchForm.title" name="title"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="10">
            <ep-form-item label="时间" disabled attr="valueDate">
              <ep-date-range v-model="searchForm.valueDate"  type="dateTime"></ep-date-range>
            </ep-form-item>
          </ep-col>
          <!-- <ep-col :col="8">
            <ep-form-item label="开始时间" disabled attr="createDate">
                <ep-date v-model="searchForm.createDate" type="dateTime"></ep-date>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="结束时间" disabled attr="endDate">
                <ep-date v-model="searchForm.endDate" type="dateTime"></ep-date>
            </ep-form-item>
          </ep-col> -->
          <!-- <ep-col :col="18">
            <ep-form-item label="时间" style="width: 500px" attr="createDate">
              <ep-date-range v-model="searchForm.createDate" type="dateTime"></ep-date-range>
            </ep-form-item>
          </ep-col> -->
          <!-- <ep-col :col="8">
            <ep-form-item label="描述" disabled attr="describe">
              <ep-input
                v-model="searchForm.describe"
              ></ep-input>
            </ep-form-item>
          </ep-col> -->
          <ep-col :col="16">
            <ep-form-item label="备注" attr="rmk">
              <ep-input
                placeholder="请输入内容"
                type="textarea"
                v-model="searchForm.rmk"
                :autosize="{ minRows: 2, maxRows: 4}"
              ></ep-input>
            </ep-form-item>
          </ep-col>
        </ep-row>
        <div  style="text-align:center">
                      <ep-button
                        type="success"
                        size="small"
                        @click="success(searchForm)"
                        icon="checkmark-round"
                      >确认</ep-button>
                      <ep-button type="danger" size="small" icon="close" @click="close()">关闭</ep-button>
        </div>
      </ep-form>
    </ep-model>
  </div>
</template>



<script>
import misList from "src/common/mislist";
export default {
  name: "modification",
  extends: misList,
  props: {
    fresh: {
      type: Boolean
    },
    searchStatus: {
      type: Object
    }
  },
   data() {
    return {
      listApi: "MattergetList", // 搜索，取api.json里面的key值
      modelFlag: false,
      settings: {
        pk: "id" // 主键
      },
      timer:"",
      loading: false,
       searchForm: {
        status: "",
        sysCode: "",
        type: "3",
        classify: "",
        title: "",
        warningRank: "",
        createDate: "",
        endDate: "",
        describe: "",
        rmk: "",
        valueDate:""
      } ,
      page_rules: {
        sysCode: { required: true, message: '不能为空', trigger: 'change, blur' },
        Type: { required: true, message: '不能为空', trigger: 'change, blur' },
        classify: { required: true, message: '不能为空', trigger: 'change, blur' },
        warningRank: { required: true, message: '不能为空', trigger: 'change, blur' },
        title: { required: true, message: '不能为空', trigger: 'change, blur' },
        // createDate: { required: true, message: '不能为空', trigger: 'change, blur' },
        // endDate: { required: true, message: '不能为空', trigger: 'change, blur' },
        valueDate: { required: true, message: '不能为空', trigger: 'change, blur' },
        describe: { required: true, message: '不能为空', trigger: 'change, blur' },
      }
    };
  },
  computed: {},
  watch: {
    modelFlag(value) {
      if (!value) {
        this.$emit("nowFlagChange", false);
      }
    },
    fresh(value) {
      if (value) {  
        this.searchForm=this.searchStatus
        this.modelFlag = true;
        
      } else {
        this.modelFlag = false;
      }
    }
  },

  mounted() {
    // console.log(this.fresh);
  },
  methods: {
    close() {//关闭当前模块
        this.modelFlag = false;
    },
    success(searchForm) {
      
      this.timer=JSON.parse(JSON.stringify(this.searchForm)).valueDate
      let arr=this.timer.split(",")
      this.searchForm.createDate=arr[0]
      this.searchForm.endDate=arr[1]
      let one = new Date(arr[1]).getTime()
      let two = new Date().getTime()
      if(one<two){
        this.$pop({
          type: "danger",
          message: "结束时间不可以小于当前时间"
        });
        return
      }
      this.$refs["searchForm"].validate((valid) => {
        if (valid) {
            this.searchForm.treadCode="1"
            this.searchForm.orgCode=this.$store.getters.getOrgCode
            this.searchForm.userName=this.$store.getters.getUserName
            let params = {BackLogModel: this.searchForm }
              console.log(params)
              this.$post("MattergetSave",this.searchForm)
              .then(res=>{
                  this.modelFlag = false;
                  // this.loading=false
                  this.refresh(true);
              })
              .catch(e => {
              
              });
        }
      });
      console.log(11111)
    }
  }
};
</script>


<style>
 .ep-time-pick-timmer .ep-time-single{
       width: 33% !important;
 }
</style>