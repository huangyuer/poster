[<template>
  <div>
    <ep-model title="修改" v-model="ismodel" width="1350px" :wrap-close="false">
      <ep-form ref="searchForm" :form="searchForm" name-width="135px" :rules="page_rules">
        <ep-row :gutter="7">
        <!-- <ep-col :col="8">
          <ep-form-item label="id" attr="id" >
            <ep-input v-model="searchForm.id" name="id" disabled></ep-input>
          </ep-form-item>
        </ep-col> -->
        <ep-col :col="8">
          <ep-form-item label="企业编码" attr="tradeCode" >
            <ep-input v-model="searchForm.tradeCode" name="tradeCode" disabled ></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="有效期" attr="validTime">
              <ep-date v-model="searchForm.validTime" name="validTime" type="dateTime"></ep-date>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="操作状态" attr="optStatus" >
            <ep-select v-model="searchForm.optStatus" name="optStatus" disabled>
              <ep-select-item index="1" label="暂存"></ep-select-item>
              <ep-select-item index="18" label="已确认"></ep-select-item>
              <ep-select-item index="4" label="入库失败"></ep-select-item>
              <ep-select-item index="5" label="审核通过"></ep-select-item>
              <ep-select-item index="6" label="审核拒绝"></ep-select-item>
              <ep-select-item index="99" label="删除"></ep-select-item>
              <ep-select-item index="17" label="转人工"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="状态" attr="dclTbStucd" >
            <ep-select v-model="searchForm.dclTbStucd" name="dclTbStucd" disabled>
              <ep-select-item index="1" label="正常"></ep-select-item>
              <ep-select-item index="2" label="暂停"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="6">
            <ep-form-item label="关区" attr="customId" >
              <loc-codemap-select
                :name="'masterCuscd'"
                :code="'customCode'"
                :cName="'customName'"
                :dataList="tradeInfo"
                :type="'custom'"
                :value.sync="searchForm.masterCuscd" disabled>
                  </loc-codemap-select>
            </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="申请说明" attr="applyDesc" >
            <ep-input v-model="searchForm.applyDesc" name="tradeCode" applyDesc ></ep-input>
          </ep-form-item>
        </ep-col>
        </ep-row>
      <div style="text-align:center">
        <ep-button type="success"  @click="doSave(searchForm)"  icon="checkmark-round">确定</ep-button>
        <ep-button type="danger"   @click="close()" icon="close">取消</ep-button>
      </div>
      </ep-form>
    </ep-model>
  </div>
</template>



<script>
import misList from "src/common/mislist";
export default {
  name: "QualificationModel",
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
      listApi: "tradeQualifyfindList", // 搜索，取api.json里面的key值
      ismodel: false,
      settings: {
        pk: "id" // 主键
      },
      tradeInfo:[],
      loading: false,
       searchForm: {
        qualifyType: "",
        id: "",
        tradeCode: "",
        validTime: "",
        optStatus:'',
        customId:'',
        dclTbStucd:'',
        applyDesc:'',
      } ,
      page_rules: {
        qualifyType: { required: true, message: '不能为空', trigger: 'change, blur' },
        // id: { required: true, message: '不能为空', trigger: 'change, blur' },
        tradeCode: { required: true, message: '不能为空', trigger: 'change, blur' },
        validTime: { required: true, message: '不能为空', trigger: 'change, blur' },
        optStatus: { required: true, message: '不能为空', trigger: 'change, blur' },
        applyDesc: { required: true, message: '不能为空', trigger: 'change, blur' },
        // customId: { required: true, message: '不能为空', trigger: 'change, blur' },
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
        this.searchForm=this.Statusdata
        this.ismodel = true;
        console.log(1111111)
      } else {
        this.ismodel = false;
        console.log(22222)
      }
    }
  },
created () {
      // this.refresh(true)  // 调用继承方法
      // let customList = this.$store.getters.getCustomList;
      // this.tradeInfo = customList;
    },
  // mounted() {
  //   console.log(this.fresh);
  // },
  methods: {
    close() {//关闭当前模块
        this.ismodel = false;
    },
    doSave(searchForm) {
      console.log(this.searchForm)
      this.$refs["searchForm"].validate((valid) => {
        if (valid) {
              this.$post("tradeQualifyupdate",this.searchForm)
              .then(res=>{
                  this.ismodel = false;
                  this.refresh(true);
                  
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