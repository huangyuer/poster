[<template>

  <div>
      <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">
          <ep-button type="success" size="small" @click="success(searchForm)"  icon="checkmark-round"  :loading="loading">确认</ep-button>
          <ep-button type="success" size="small" @click="add('searchForm')"  icon="checkmark-round"  :loading="loading">新增</ep-button>
        </div>
        <ep-tabs active="待办事项录入">
          <ep-tab-item name="待办事项录入">
              
            <ep-form ref="searchForm" :form="searchForm" :rules="page_rules" name-width="130px">
                <ep-row :gutter="7">
                <!-- <ep-col :col="8">
                    <ep-form-item label="系统代码" attr="sysCode">
                    <ep-select v-model="searchForm.sysCode" disabled name="sysCode">
                        <ep-select-item index="1" label="NEPZ"></ep-select-item>
                    </ep-select>
                    </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                    <ep-form-item label="类型" attr="type">
                    <ep-select v-model="searchForm.type" disabled name="type">
                        <ep-select-item index="3" label="个人待办"></ep-select-item>
                    </ep-select>
                    </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                    <ep-form-item label="分类" attr="classify">
                    <ep-select v-model="searchForm.classify" disabled  name="classify">
                        <ep-select-item index="1" label="NEPZ"></ep-select-item>
                    </ep-select>
                    </ep-form-item>
                </ep-col> -->
                <!-- <ep-col :col="8">
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
                      <ep-date-range v-model="searchForm.valueDate" type="dateTime"></ep-date-range>
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
                <!-- <div  style="text-align:center">
                            <ep-button
                                type="success"
                                size="small"
                                @click="success(searchForm)"
                                icon="checkmark-round"
                                :loading="loading"
                            >确认</ep-button>
                            <ep-button type="danger" size="small" icon="close" @click="close()">关闭</ep-button>
                </div> -->
            </ep-form>
          </ep-tab-item>  
        </ep-tabs>

      </div>
    </div>
  </div>
  </div>
</template>



<script>
import misList from "src/common/mislist";
export default {
  name: "ItemEntry",
  extends: misList,
   data() {
    return {
      settings: {
        pk: "id" // 主键
      },
      timer:"",
      loading: false,
       searchForm: {
        status: "1",
        sysCode: "",
        type: "",
        classify: "",
        title: "",
        warningRank: "",
        createDate: "",
        endDate: "",
        valueDate:"",
        describe: "",
        rmk: "",
        id:"",
      } ,
      page_rules: {
        // sysCode: { required: true, message: '不能为空', trigger: 'change, blur' },
        // type: { required: true, message: '不能为空', trigger: 'change, blur' },
        // classify: { required: true, message: '不能为空', trigger: 'change, blur' },
        // warningRank: { required: true, message: '不能为空', trigger: 'change, blur' },
         title: { required: true, message: '不能为空', trigger: 'change, blur' },
         valueDate: { required: true, message: '不能为空', trigger: 'change, blur' },
        //  endDate: { required: true, message: '不能为空', trigger: 'change, blur' },
        // describe: { required: true, message: '不能为空', trigger: 'change, blur' },
      }
    };
  },
  computed: {},
  watch: {
  },

  mounted() {
  },
  methods: {
    add(searchForm) {
      this.searchForm.id=""
      this.$refs[searchForm].reset();
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
            // 新增
            this.searchForm.treadCode=this.$store.getters.getTradeCode
            this.searchForm.orgId=this.$store.getters.getOrgCode
            this.searchForm.userName=this.$store.getters.getUserName
            this.$post("MattergetSave",this.searchForm)
            .then(res=>{
              this.searchForm.id=res.map.data
            })
        }
      });
    }
  }
};
</script>



<style>
.ep-time-pick-timmer .ep-time-single{
       width: 33% !important;
 }
</style>