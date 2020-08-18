<template>
 <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
	      <div class="block">
          <div>
            <!-- <ep-button type="warning" @click="resetForm('form')">重置</ep-button> -->
            <!-- <ep-button type="primary" @click="commitUpdate()" :loading="saveLoading">保存</ep-button> -->
            <WmsButton @click="commitUpdate()" :loading="saveLoading">保存</WmsButton>
          </div>
        </div>
	      <ep-tabs :active="nameActive">
          <ep-tab-item name="企业信息" style="height:600px">
            <ep-form class="demo-form" ref="form" :form="form" :rules="page_rules0"  name-width="135px">
              <ep-row :gutter="10">
                <ep-col :col="8">
                  <ep-form-item label="海关编码" attr="tradeCode"   >
                    <ep-input v-model="form.tradeCode"  name="tradeCode" :maxlength="30" disabled></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="企业中文名称" attr="tradeName" >
                    <ep-input v-model="form.tradeName" name="tradeName" :maxlength="150"></ep-input>
                  </ep-form-item>
                </ep-col>
                 <ep-col :col="8">
                  <ep-form-item label="申报类型" attr="dclTypecd" >
                   <ep-select v-model="form.dclTypecd" disabled name="dclTypecd">
                      <ep-select-item index="1" label="备案"></ep-select-item>
                      <ep-select-item index="2" label="变更"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="关区" attr="customId" >
                      <loc-codemap-select
                    :name="'customId'"
                    :code="'customCode'"
                    :cName="'customName'"
                    :type="'custom'"
                    :dataList="tradeInfo"
                    disabled
                    :value.sync="form.customId">
                     </loc-codemap-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="企业组织机构编码" attr="orgNo" >
                    <ep-input v-model="form.orgNo" name="orgNo" disabled :maxlength="30" ></ep-input>
                  </ep-form-item>
                 </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="社会信用代码" attr="creditCode" >
                    <ep-input v-model="form.creditCode" disabled name="creditCode" :maxlength="20"></ep-input>
                  </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                  <ep-form-item label="EDI代码" attr="ediCode"  >
                    <ep-input v-model="form.ediCode" name="ediCode" :maxlength="50"></ep-input>
                  </ep-form-item>
                </ep-col>
              </ep-row>
            </ep-form>
          </ep-tab-item>
          <ep-tab-item name="企业详情信息" style="height:600px">
            <ep-form class="demo-form" ref="tradeE" :form="tradeE" :rules="page_rules1"  name-width="135px">
              <ep-row>
                <ep-col :col="8">
                  <ep-form-item label="企业英文名称" attr="tradeNameEn">
                    <ep-input v-model="tradeE.tradeNameEn" name="tradeNameEn" :maxlength="150"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="企业地址" attr="address" >
                    <ep-input v-model="tradeE.address" name="address" :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="邮编" attr="zip" >
                    <ep-input v-model="tradeE.zip" name="zip" ></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="法人代表" attr="corporation" >
                    <ep-input v-model="tradeE.corporation" name="corporation" :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="负责人" attr="manager" >
                    <ep-input v-model="tradeE.manager" name="manager" :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="负责人电话" attr="tel" >
                    <ep-input v-model="tradeE.tel" name="tel" :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="负责人传真" attr="fax" >
                    <ep-input v-model="tradeE.fax" name="fax" :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="负责人Email" attr="email" >
                    <ep-input v-model="tradeE.email" name="email" :maxlength="50"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="企业性质" attr="tradeType">
                   <ep-select v-model="tradeE.tradeType" name="tradeType">
                      <ep-select-item index="1" label="国有企业"></ep-select-item>
                      <ep-select-item index="2" label="三资企业"></ep-select-item>
                      <ep-select-item index="3" label="集体企业"></ep-select-item>
                      <ep-select-item index="4" label="私营企业"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                    <ep-form-item label="投资国别" attr="country" >
                      <ep-select :label="countrys" v-model="tradeE.country" name="country" filterable>
                        <ep-select-item v-for="(item, index) in countrys" :key="index"
                        :index="item.countryCode" :label="item.nameCn"></ep-select-item>
                      </ep-select>
                    </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="注册资金" attr="registeredCapital" >
                    <ep-input v-model="tradeE.registeredCapital" name="registeredCapital" :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="工商注册开始日期" attr="busiRegBeginDate" >
                    <ep-date v-model="tradeE.busiRegBeginDate" name="busiRegBeginDate" ></ep-date>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="工商注册结束日期" attr="busiRegEndDate" >
                    <ep-date v-model="tradeE.busiRegEndDate" name="busiRegEndDate" ></ep-date>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="租赁合同开始日期" attr="leaseContractBeginDate" >
                    <ep-date v-model="tradeE.leaseContractBeginDate" name="leaseContractBeginDate" ></ep-date>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="租赁合同结束日期" attr="leaseContractEndDate" >
                    <ep-date v-model="tradeE.leaseContractEndDate" name="leaseContractEndDate" ></ep-date>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="租赁方" attr="lessor" >
                    <ep-input v-model="tradeE.lessor" name="lessor" :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="海关注册开始日期" attr="cusRegBeginDate" >
                    <ep-date v-model="tradeE.cusRegBeginDate" name="cusRegBeginDate" ></ep-date>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="海关注册结束日期" attr="cusRegEndDate" >
                    <ep-date v-model="tradeE.cusRegEndDate" name="cusRegEndDate"></ep-date>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="经营范围" attr="business" >
                    <ep-input v-model="tradeE.business" name="business" :maxlength="1000"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="16">
                  <ep-form-item label="备注" attr="remark" >
                    <ep-input placeholder="备注" v-model="tradeE.remark" name="remark" type="textarea"></ep-input>
                  </ep-form-item>
                </ep-col>
              </ep-row>
            </ep-form>
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
 </div>
</template>
<script>
	import {cloneObj} from 'utils'
  import misList from 'src/common/mislist'
  import localStorage from 'utils/localStorage'
  import store from 'src/store';
export default {
  name: 'EnterpriseChange',  // 保持和文件名一致，否则keep-alive不会动态缓存
  extends: misList,  // 务必继承
	created () {
     let customList = this.$store.getters.getCustomList;
      this.tradeInfo = customList;
      let countryList = this.$store.getters.getCountryList;
      this.countrys = countryList;
    },
  mounted () {
    
      this.$post("getTradeById", {id:this.$route.params.id}).then(res=>{
         this.form  =  res.map.data
         this.form.dclTypecd = "2"
         this.form.id=""
         
         let tradeE = this.form.tradeE
          if(tradeE!=null){
            
            this.tradeE = tradeE
            this.tradeE.id = ""
          }else{

          }
      })
    },
  data () {
    
    return {
      nameActive:"企业信息",
      drop: [],
			countrys: [],
			tradeInfo:[],
      countryCode:'',
      countryName:'',
      customName:'',
      saveLoading:false,
	    tradeE:{
        id:'',
        tradeId:'',
        tradeNameEn: '',
        country:"",
        address: '',
        zip: '',
        corporation: '',
        manager : '',
        tel: '',
        fax: '',
        email: '',
        tradeType: '',
        registeredCapital: '',
        busiRegBeginDate: '',
        busiRegEndDate: '',
        leaseContractBeginDate: '',
        leaseContractEndDate: '',
        lessor: '',
        cusRegBeginDate: '',
        cusRegEndDate: '',
        business: '',
        remark: ''
      },
      form: {
        ediCode:"",
	      id:'',
        tradeCode: this.$store.getters.getTradeCode,
        tradeName: '',
        customId: '',
        dclTypecd:"",
        orgNo: '',
        creditCode: '',
	      tradeE :{}
      },
      page_rules0: {
         tradeCode: { required: true, message: '不能为空', trigger: 'change' },
          tradeName: { required: true,message: '不能为空', trigger: 'change' },
          customId: { required: true, message: '不能为空', trigger: 'change' },
          customCode: { required: true, message: '不能为空', trigger: 'change' },
          status: { required: true, message: '不能为空', trigger: 'change' },
          orgNo: { required: true, message: '不能为空',trigger: 'change' },
          creditCode: { required: true, message: '不能为空', trigger: 'change' },
          dclTypecd:{required: true, message: '不能为空', trigger: 'change'}
      },
      page_rules1: {
            address: { required: true,message: '不能为空', trigger: 'change'},
            corporation: { required: true, message: '不能为空', trigger: 'change' },
            manager: { required: true, message: '不能为空', trigger: 'change' },
            tradeType: {required: true, message: '不能为空', trigger: 'change' },
            country: { required: true, message: '不能为空', trigger: 'change' },
            registeredCapital: { required: true, message: '不能为空', trigger: 'change' },
            busiRegBeginDate: { required: true, message: '不能为空', trigger: 'change' },
            busiRegEndDate: { required: true, message: '不能为空', trigger: 'change' },
            cusRegBeginDate: { required: true, message: '不能为空', trigger: 'change' },
            cusRegEndDate: { required: true, message: '不能为空', trigger: 'change' },
            business: { required: true,message: '不能为空', trigger: 'change' },
            tel: { required: true,message: '不能为空', trigger: 'change'},

      }
    }
  },
  methods: {
       saveEnterInfo(){
        this.$post("queryEnterprise",{page:1,size:10,tradeCode:this.$store.getters.getTradeCode})
        .then(res=>{
           this.$store.dispatch('setEnterpriseInfo',res.map.data.content[0])
            let data = res.map.data.content[0]
            const enterpriseInfo = {
                  tradeName: data.tradeName,
                  creditCode: data.creditCode,
                  id: data.id
                }
            localStorage.setLocalStorage('setEnterpriseInfo', enterpriseInfo, 15)
        })
      },
      resetForm (formName) {
        this.$refs.formName && this.$refs.formName.reset()
        this.$refs.tradeE && this.$refs.tradeE.reset()
        this.form.tradeCode=this.cloneForm.tradeCode
        this.form.customId=this.cloneForm.customId
      },
      commitUpdate () {
        this.nameActive  = "企业详情信息"
        this.$nextTick(()=>{
             this.loading = true
        this.$refs["form"].validate((valid) => {
         
          this.$refs['tradeE'].validate((validE) => {
            if (valid && validE) {
              this.form.tradeE = this.tradeE
              this.saveLoading = true
              this.$post('addEnterprise',this.form).then((json) => {
                this.saveLoading = false
                this.saveEnterInfo()
                this.form.id= json.map.id
                this.tradeE.id= json.map.id
                this.loading = false
              }).catch((e) => {
                this.saveLoading = false
                this.loading = false
                console.log(e)
              })
            } else {
              this.$pop({
               type: 'danger',
               message: '表单验证失败！'
              })
            }
          })
        });
        })
       
      },
  }
}
</script>
