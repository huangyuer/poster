<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
	      <div class="block">
          <ep-button style="margin-left:10px;margin-bottom: 10px;" type="primary" :loading="saveLoading" @click="commitUpdate('form')">保存</ep-button>
          <!-- <ep-button type="warning" @click="resetForm('form')">重置</ep-button> -->
       </div>
	    </div>
	    <!-- <ep-tabs active="组织信息">
        <ep-tab-item name="组织信息"> -->
          <div class="contents-card card-margin">
            <div class="ep-detail-title weight" style="color:#2196F3">组织信息</div>
          <ep-form class="demo-form" ref="form" style="margin-top:5px;" :form="form" :rules="page_rules"  name-width="110px">
            <ep-row :gutter="10">
              <ep-col :col="8">
                <ep-form-item label="账户类型" attr="type" required>
                  <ep-select  v-model="form.type" :disabled="NoChange1" v-on:change="typeChange" name="type">
                     <ep-select-item index="1" label="区内加工"></ep-select-item>
                     <ep-select-item index="2" label="区内仓储"></ep-select-item>
                     <!-- <ep-select-item index="3" label="区外仓储"></ep-select-item>
                     <ep-select-item index="4" label="区外加工"></ep-select-item>
                     <ep-select-item index="5" label="非保进出"></ep-select-item>
                      <ep-select-item index="9" label="代理"></ep-select-item>
                      <ep-select-item index="10" disabled label="车队代理"></ep-select-item> -->
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <!--<ep-col :col="8">
                <ep-form-item label="组织编号" attr="orgCode" required>
                  <ep-input placeholder="组织编号" v-model="form.orgCode" name="orgCode" :maxlength="20" :readonly="true"></ep-input>
                </ep-form-item>
              </ep-col>-->
              <ep-col :col="8">
                  <ep-form-item label="申报类型" attr="dclTypecd" >
                   <ep-select v-model="form.dclTypecd" disabled name="dclTypecd">
                      <ep-select-item index="1" label="备案"></ep-select-item>
                      <ep-select-item index="2" label="变更"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
              <ep-col :col="8">
                <ep-form-item label="关区" attr="customId" required>
                  <!-- <ep-select placeholder="关区" :disabled="NoChange" :label="tradeInfo" v-model="form.customId" name="customCode"   filterable>
                    <ep-select-item v-for="(item, index) in tradeInfo"   :key="index" :index="item.customCode" :label="item.customName+' '+item.customCode"></ep-select-item>
                  </ep-select> -->
                  <loc-codemap-select
                    disabled
                    :name="'customId'"
                    :code="'customCode'"
                    :cName="'customName'"
                    :dataList="tradeInfo"
                    :type="'custom'"
                    :value.sync="form.customId">
                     </loc-codemap-select>
                </ep-form-item>
              </ep-col>
              <!-- <ep-col :col="8">
                <ep-form-item label="企业信用代码" attr="creditCode" >
                  <ep-input v-model="form.creditCode" name="creditCode" :maxlength="10" :disabled="creditCodeSwitch"></ep-input>
                </ep-form-item>
              </ep-col> -->
              <!-- <ep-col :col="8">
                <ep-form-item label="仓库编号" attr="organizationCode" >
                  <ep-input v-model="form.organizationCode" name="organizationCode" :maxlength="10" :disabled="organizationCodeSwitch"></ep-input>
                </ep-form-item>
              </ep-col> -->
              <!-- <ep-col :col="8">
                <ep-form-item label="仓库名称" attr="organizationName" >
                  <ep-input v-model="form.organizationName" name="organizationName" :maxlength="150" :disabled="organizationNameSwitch"></ep-input>
                </ep-form-item>
              </ep-col> -->
              <ep-col :col="8">
                  <ep-form-item label="IC卡号" attr="icCard" >
                    <ep-input v-model="form.icCard" name="icCard" :maxlength="50" ></ep-input>
                  </ep-form-item>
                </ep-col>
            </ep-row>
          </ep-form>
           </div>
        <!-- </ep-tab-item> -->
        <!-- <ep-tab-item name="组织详情信息"> -->
           <div class="contents-card card-margin">
                <div class="ep-detail-title weight" style="color:#2196F3">组织详情信息</div>
          <ep-form class="demo-form" ref="organizationE" style="margin-top:5px;" :form="organizationE"  name-width="100px"><!--:rules="page_rules1" -->
            <ep-row>
              <ep-col :col="8">
                <ep-form-item label="地址" attr="address" >
                  <ep-input placeholder="地址" v-model="organizationE.address" name="address" :maxlength="150"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="邮编" attr="zip" >
                  <ep-input placeholder="邮编" v-model="organizationE.zip" name="zip" :maxlength="50"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="联系人" attr="person">
                  <ep-input placeholder="联系人" v-model="organizationE.person" name="person" :maxlength="50"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="电话" attr="tel" >
                  <ep-input placeholder="电话" v-model="organizationE.tel" name="tel" :maxlength="11"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="电子邮箱" attr="email" >
                  <ep-input placeholder="电子邮箱" v-model="organizationE.email" name="email" :maxlength="50"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="仓库面积" attr="area" >
                  <ep-input placeholder="仓库面积" v-model="organizationE.area" name="area" :maxlength="50"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="16">
                <ep-form-item label="备注" attr="remark" >
                  <ep-input placeholder="备注" v-model="organizationE.remark" name="remark"  type="textarea" :maxlength="255"></ep-input>
                </ep-form-item>
              </ep-col>
            </ep-row>
          </ep-form>
           </div>
        <!-- </ep-tab-item> -->
      <!-- </ep-tabs> -->
    </div>
  </div>
</template>


<script>
  import misList from 'src/common/mislist'
  import { checkInput } from 'utils'
  export default {
  name: 'organizationUpdate',  // 保持和文件名一致，否则keep-alive不会动态缓存
  extends: misList,  // 务必继承
  created () {
    //  this.dofresh()
     let customList = this.$store.getters.getCustomList;
    this.tradeInfo = customList;
  },
  mounted () {
    //关区
    let bodyForm = this.$route.params.form
    this.form = bodyForm
		if(this.$route.params.form.organizationE == null){
      this.form.organizationE = bodyForm.organizationE
		}else{
      this.form.organizationE = bodyForm.organizationE
      this.organizationE = bodyForm.organizationE
    }
    if(this.form.type == "9"){
      this.NoChange1 = true
    }
    if(this.form.dclTypecd == "2"){
      this.NoChange1 = true
      this.NoChange = true
    }

  },
  data () {
    //检测电话号码
    var checktel = (rule, value, callback) =>{
      var reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      callback(checkInput(rule, value, callback,'N',reg,'手机号码格式不正确',11));
    };
    //检测email
    var checkEmail = (rule, value, callback) => {
      var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let result = checkInput(rule, value, callback,'N',reg,'邮箱格式不正确',50)
      if(result!=null && result!=''){
        callback(result);
      }else{
        callback();
      }
    };
    //检测地址
    var checkAddress =(rule, value, callback) => {
      callback(checkInput(rule, value, callback,'N','','',150));
    };
    //检测邮编
    var checkZip = (rule, value, callback) => {
      let result = checkInput(rule, value, callback,'N',/[\d]([-])*/,'请输入数字和-',150);
      if(result!=null && result!=''){
        callback(result);
      }else{
        callback();
      }
    };
    //检测联系人
    var checkPerson = (rule, value, callback) => {
      callback(checkInput(rule, value, callback,'N','','',50));
    };

    //仓库面积
    var checkArea = (rule, value, callback) => {
      let result = checkInput(rule, value, callback,'N','','',50);
      if(result!=null && result!=''){
        callback(result);
      }else{
        callback();
      }
    };
    //备注
    var checkRemark = (rule, value, callback) => {
      let result = checkInput(rule, value, callback,'N','','',255);
      if(result!=null && result!=''){
        callback(result);
      }else{
        callback();
      }
    };
    return {
      NoChange:false,
      NoChange1:false,
      creditCodeSwitch:false,
      organizationNameSwitch:false,
      organizationCodeSwitch:false,
      saveLoading:false,
      first:"1",
      drop: [],
      flag : '',
      customName:'',
      tradeInfo:[],
      form: {
          tradeId: '',
          type: '',
          orgCode: this.$store.getters.getOrgCode,
          status: '',
          customId: '',
          bookNo: '',
          dclTypecd:"",
          // creditCode:'',
          // organizationCode:'',
          // organizationName:'',
          icCard:"",
          organizationE :{
            address: '',
            orgId: '',
            zip:'',
            person: '',
            tel: '',
            email: '',
            area: '',
            remark: ''
          }
        },
      organizationE :{
          address: '',
          orgId: '',
          zip:'',
          person: '',
          tel: '',
          email: '',
          area: '',
          remark: ''
      },
      page_rules: {
        tradeId: { required: true, message: '不能为空', trigger: 'change' },
        type: {  required: true, message: '不能为空', trigger: 'change' },
        orgCode: { required: true, message: '不能为空', trigger: 'change' },
		    status: {   required: true, message: '不能为空', trigger: 'change' },
        customId: { required: true, message: '不能为空', trigger: 'change' },
        dclTypecd:{required: true, message: '不能为空', trigger: 'change'},
        // creditCode: { required: true, message: '不能为空', trigger: 'change' },
        // organizationCode:{ required: true, message: '不能为空', trigger: 'change' },
        // organizationName:{ required: true, message: '不能为空', trigger: 'change' },
        icCard:{ required: true, message: '不能为空', trigger: 'change'}
      },
      page_rules1: {
        /*address: {validator:checkAddress, trigger: 'change'},
        person: {validator:checkPerson, trigger: 'change' },
        zip:{validator:checkZip, trigger: 'change'},
        tel: {validator:checktel,  trigger: 'change' },
        email: {validator: checkEmail, trigger: 'change'},
        area: {validator: checkArea, trigger: 'change'},
        remark: {validator: checkRemark, trigger: 'change'}*/
      }
    }
  },
  methods: {
     dofresh (){
			let param = {page:1,size:1,customCode:this.$route.params.form.customCode}
				this.$post('queryCustom',param)
				.then((res) =>{
             this.customName = res.map.data.content[0].customName+" "+res.map.data.content[0].customCode
            this.form.customCode = res.map.data.content[0].customCode
				}).catch(e =>{
				console.log(e)
        })
    },
     resetForm (formName) {
      // this.$refs[formName].reset()
      this.$refs.formName && this.$refs.formName.reset()
      // this.$refs['organizationE'].reset()
      this.$refs.organizationE && this.$refs.organizationE.reset()
    },
     commitUpdate (formName) {
      this.$refs[formName].validate((valid) => {
	   /* this.$refs['organizationE'].validate((validE) => {*/
	    if (valid) {
        // if(this.form.organizationCode.length != 10){
        //   this.$pop({
        //     type: 'danger',
        //     message: '仓库编号只能是10位！'
        //   })
        //   return
        // }
        if(this.organizationE.email != "" && this.organizationE.email != null){
          var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if(!reg.test(this.organizationE.email)){
            this.$pop({
              type: 'danger',
              message: '邮箱格式不正确！'
            })
            return
          }
        }
        if(this.organizationE.tel != "" && this.organizationE.tel != null){
          var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if(!reg.test(this.organizationE.tel)){
            this.$pop({
              type: 'danger',
              message: '电话格式不正确！'
            })
            return
          }
        }
          this.form.organizationE = this.organizationE
          this.saveLoading = true
          this.$post('organizationSave',this.form)
          .then((json) => {
            this.saveLoading = false
          }).catch((e) => {
            this.saveLoading = false
            console.log(e)
          })
      } else {
        this.$pop({
          type: 'danger',
          message: '表单验证失败！'
        })
      }
	  })

	  },
     commitAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$post('addOrganization',this.form).then((json) => {

          }).catch((e) => {
            console.log(e)
          })
        } else {
          this.$pop({
            type: 'danger',
            message: '表单验证失败！'
          })
        }
      });
    },
    typeChange(event){
      if(event=="4"){
        this.page_rules.icCard.required = true
      }else{
        this.page_rules.icCard.required = false
      }
    // let bodyForm = this.$route.params.form
		// if(bodyForm.bookNo!=null||bodyForm.bwsNo!=null){
    //     this.NoChange = true
    //     this.NoChange1 = true
    //     this.organizationNameSwitch =true
    //     this.organizationCodeSwitch = true
    //     this.creditCodeSwitch = true
    //     return
    // }
    
      if(event == '1' || event == '2' || event == '4'){
        // this.page_rules.creditCode.required=true;
        this.creditCodeSwitch = true;
        this.organizationNameSwitch = true;
        this.organizationCodeSwitch = true;
        // this.form.creditCode = this.$store.getters.getCreditCode;
        // this.form.organizationCode = this.$store.getters.getTradeCode;
        // this.form.organizationName = this.$store.getters.getTradeName;
      }
      else if(event == '3'){
        // this.page_rules.creditCode.required=false;
        // this.form.creditCode = '';
        if(this.first == "2"){
        // this.form.organizationCode = '';
        // this.form.organizationName = '';
        }
        this.creditCodeSwitch = true;
        this.organizationNameSwitch = false;
        this.organizationCodeSwitch = false;
      }
      else if (event == "9"){
       
        // this.page_rules.creditCode.required=true;
        this.creditCodeSwitch = true;
        this.organizationNameSwitch = true;
        this.organizationCodeSwitch = true;
        // this.form.creditCode = this.$store.getters.getCreditCode;
        // this.form.organizationCode = this.$store.getters.getTradeCode;
        // this.form.organizationName = this.$store.getters.getTradeName;
      }
      this.first = 2
     
     

    }
  }
}
</script>
