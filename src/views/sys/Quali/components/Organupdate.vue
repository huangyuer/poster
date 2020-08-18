[<template>
  <div>
    <ep-model title="修改" v-model="ismodel" width="1350px" :wrap-close="false">
      <ep-form ref="bodyForm" :form="bodyForm" name-width="135px" :rules="page_rules">
        <ep-row :gutter="7">
        <!-- <ep-col :col="8">
          <ep-form-item label="id" attr="id" >
            <ep-input v-model="bodyForm.id" name="id" disabled></ep-input>
          </ep-form-item>
        </ep-col> -->
        <ep-col :col="8">
        <ep-form-item attr="orgCode" label="组织编码">
          <ep-select filterable  v-model="bodyForm.orgId" name="orgCode" >
              <ep-select-item v-for="(item,idx) in orgList" :key="idx" :index="item.organizationE&&item.organizationE.orgId" :label="item.orgCode"></ep-select-item>
            </ep-select>
        </ep-form-item>
      </ep-col>
        <ep-col :col="8">
          <ep-form-item label="企业编码" attr="tradeCode" >
            <ep-input v-model="bodyForm.tradeCode" name="tradeCode" disabled ></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="tradeQualId" label="业务类型">
            <ep-select filterable  v-model="bodyForm.tradeQualId" name="tradeQualId" >
                <ep-select-item v-for="item in organlist" :key="item.id" :index="item.id" :label="item.description"></ep-select-item>
              </ep-select>
          </ep-form-item>
        </ep-col>
        </ep-row>
      <div style="text-align:center">
        <ep-button type="success"  @click="doSave(bodyForm)"  icon="checkmark-round">确定</ep-button>
        <ep-button type="danger"   @click="close()" icon="close">取消</ep-button>
      </div>
      </ep-form>
    </ep-model>
  </div>
</template>



<script>
import misList from "src/common/mislist";
export default {
  name: "Organupdate",
  extends: misList,
  props: {
    fresh: {
      type: Boolean
    },
    Statusdata: {
      type: Object
    }
  },
   data() {
    return {
      // listApi: "MattergetList", // 搜索，取api.json里面的key值
      ismodel: false,
      orgList: [],
        organlist: [],
      settings: {
        pk: "id" // 主键
      },
      tradeInfo:[],
      loading: false,
       bodyForm: {
        id: "",
        orgId: "",
        tradeCode: this.$store.getters.getTradeCode,
        tradeQualId:''
      } ,
      page_rules: {
        qualifyType: { required: true, message: '不能为空', trigger: 'change, blur' },
        // id: { required: true, message: '不能为空', trigger: 'change, blur' },
        description: { required: true, message: '不能为空', trigger: 'change, blur' },
      }
    };
  },
  watch: {
    ismodel(value) {
      if (!value) {
        this.$emit("nowFlagChange", false);
      }
    },
    fresh(value) {
      if (value) {  
        this.bodyForm=this.Statusdata
        this.ismodel = true;
      } else {
        this.ismodel = false;
      }
    }
  },
created () {   
      this.getOrgList();
      this.getQualifyByTradeCode();
      // this.refresh(true)
    },
  methods: {


    // idChange(id) {
    //     if (id) {
    //       this.orgList.forEach(item => {
    //         if (item.id == id) {
    //           this.bodyForm.masterCuscd = item.customId;
    //         }
    //       })
    //     } else {
    //       this.bodyForm.masterCuscd = '';
    //     }
    //   },

      getOrgList() {

        let { tradeCode } = this.bodyForm;
        console.log(tradeCode)
        this.$post("getOrganizationByTradeCode", {tradeCode})
          .then(res=>{
            this.orgList = res.map.data;
            console.log(this.orgList)
          })
          .catch(err => {
            console.log(err)
          })
      },
      getQualifyByTradeCode() {
        let { tradeCode } = this.bodyForm;
        this.$post("getQualifyByTradeCode", {tradeCode})
          .then(res=>{
            this.organlist = res.map.data;
            // console.log(this.organlist)
          })
          .catch(err => {
            console.log(err)
          })
      },
    close() {//关闭当前模块
        this.ismodel = false;
    },
    doSave(bodyForm) {
      console.log(this.bodyForm)
      this.$refs["bodyForm"].validate((valid) => {
        if (valid) {
              this.$post("orgQualRtlupdate",this.bodyForm)
              .then(res=>{
                  this.ismodel = false; 
                  this.refresh(true);
                  console.log(this.ismodel)
              })
              .catch(() => {
              // this.ismodel = false
          })
        }
      });
      console.log(11111)
    }
  }
};
</script>



<style>
</style>