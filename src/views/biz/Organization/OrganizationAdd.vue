<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">
          <!-- <ep-button  v-show="add" type="primary" :loading="saveLoading" @click="commitAdd('form')">保存</ep-button>
           <ep-button  v-show="!add" type="primary" :loading="saveLoading" @click="updateOrg('form')">保存</ep-button>
            <ep-button type="success" size="small"  icon="plus-round"  @click="addOther" >新增</ep-button> -->
             <WmsButton  v-show="add" @click="commitUpdate('form')">保存</WmsButton>
              <WmsButton  v-show="!add"  :loading="saveLoading" @click="updateOrg('form')">保存</WmsButton>
               <WmsButton   @click="addOther">新增</WmsButton>
          <!-- <ep-button type="warning" @click="resetForm('form')">重置</ep-button> -->
        </div>
        <!-- <ep-tabs active="组织信息">

          <ep-tab-item name="组织信息"> -->
            
          <div class="contents-card card-margin">
            <div class="ep-detail-title weight" style="color:#2196F3">组织信息</div>
            <ep-form class="demo-form" style="margin-top:5px;" ref="form" :form="form" :rules="page_rules"  name-width="110px">
              <ep-row :gutter="10">
                <ep-col :col="8">
                  <ep-form-item label="账户类型" attr="type" required>
                   <ep-select v-model="form.type" v-on:change="typeChange" name="type">
                      <ep-select-item index="1" label="区内加工"></ep-select-item>
                      <ep-select-item index="2" label="区内仓储"></ep-select-item>
                      <!-- <ep-select-item index="3" label="区外仓储"></ep-select-item>
                      <ep-select-item index="4" label="区外加工"></ep-select-item>
                      <ep-select-item index="5" label="非保进出"></ep-select-item>
                      <ep-select-item index="9" label="代理"></ep-select-item>
                      <ep-select-item index="10" label="车队代理"></ep-select-item> -->
                    </ep-select>
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
                  <ep-form-item label="关区" attr="customId">
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
            <ep-form class="demo-form" style="margin-top:5px;" ref="organizationE" :form="organizationE"   name-width="110px"><!--:rules="page_rules1"-->
              <ep-row>
                <ep-col :col="8">
                  <ep-form-item label="地址" attr="address" >
                    <ep-input v-model="organizationE.address" name="address" :maxlength="150"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="邮编" attr="zip" >
                    <ep-input v-model="organizationE.zip" name="zip" :maxlength="50"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="联系人" attr="person">
                    <ep-input v-model="organizationE.person" name="person" :maxlength="50"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="电话" attr="tel" >
                    <ep-input v-model="organizationE.tel" name="tel" :maxlength="11"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="电子邮箱" attr="email">
                    <ep-input v-model="organizationE.email" name="email" :maxlength="50"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="仓库面积" attr="area" >
                    <ep-input v-model="organizationE.area" name="area" :maxlength="50"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="16">
                  <ep-form-item label="备注" attr="remark" >
                    <ep-input v-model="organizationE.remark" name="remark"  type="textarea" :maxlength="255"></ep-input>
                  </ep-form-item>
                </ep-col>
              </ep-row>
            </ep-form>
          <!-- </ep-tab-item>
        </ep-tabs> -->
        </div>
       
      </div>
    </div>
  </div>
</template>


<script>
  import misList from 'src/common/mislist'
  import { checkInput } from 'utils'
export default {
  name: 'organizationAdd',  // 保持和文件名一致，否则keep-alive不会动态缓存
  extends: misList,  // 务必继承
  created(){
    let customList = this.$store.getters.getCustomList;
    this.tradeInfo = customList;
  },
  mounted () {
    
    if(this.$route.params.flag){
      this.form = this.$route.params.form[0]
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
      creditCodeSwitch:true,
      organizationNameSwitch:true,
      organizationCodeSwitch:true,
      drop: [],
      add:true,
      saveLoading:false,
      tradeInfo :[],
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
      form: {
        tradeId: '',
        tradeCode: this.$store.getters.getTradeCode,
        type: '',
        inNo: this.$store.getters.getOrgCode,
        status: '',
        customId: '2249',
        bookNo: '',
        dclTypecd:"1",
        // creditCode:'',
         icCard:"",
        // organizationCode:'',
        // organizationName:'',
        
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
      page_rules: {
        tradeId: { required: true, message: '不能为空', trigger: 'change' },
        type: { required: true, message: '不能为空', trigger: 'change' },
        inNo: { required: true, message: '不能为空', trigger: 'change' },
        status: { required: true, message: '不能为空', trigger: 'change' },
        customId: { required: true, message: '不能为空', trigger: 'change' },
        dclTypecd:{required: true, message: '不能为空', trigger: 'change'},
        // creditCode: { required: true, message: '不能为空', trigger: 'change' },
        // organizationCode:{ required: true, message: '不能为空', trigger: 'change' },
        
        // organizationName:{ required: true, message: '不能为空', trigger: 'change' },
        icCard:{ required: true, message: '不能为空', trigger: 'change'}
      },
      page_rules1 :{
        //address: {validator:checkAddress, trigger: 'change'}
       /* person: {validator:checkPerson, trigger: 'change' },
        zip:{validator:checkZip, trigger: 'change'},
        tel: {validator:checktel,  trigger: 'change' },
        email: {validator: checkEmail, trigger: 'change'},
        area: {validator: checkArea, trigger: 'change'},
        remark: {validator: checkRemark, trigger: 'change'}*/

      }
    }
  },
  methods: {
     addOther(){
          this.$app.trigger("add-new-tab", "organizationAdd");
    //    let menusList = this.$store.getters.getMenuTabInstance.items;
    //     menusList.forEach(function(item, index) {
    //       if (item.name == "组织信息添加") {
    //         menusList.splice(index, 1);
    //       }
    //     });
    //     this.$router.push({name: "首页"})
    //     setTimeout(()=>{
    //         this.$router.push({
    //         name: "组织信息添加"
    //     })
    //     },10)
    },
    againInfo(id){
         this.$post('getOrganizationById', {id:id})
            .then((res) => {
                this.form = res.map.data
                this.organizationE = res.map.data.organizationE
            })
    },
    updateOrg(formName){
      this.$refs[formName].validate((valid) => {
      if (valid) {
        // if(this.form.organizationCode.length != 10){
        //   this.$pop({
        //     type: 'danger',
        //     message: '仓库编号只能是10位！'
        //   })
        //   return
        // }
          this.form.organizationE = this.organizationE
          this.saveLoading = true
          this.$post('organizationSave',this.form).then((json) => {
            this.saveLoading = false
                this.againInfo(json.map.id)
          }).catch(() => {
            this.saveLoading = false
          })

         }
      })
    },
    handleRemoteCall (val, oldVal, callback) {
      setTimeout(() => {
        if(val===''){
          this.$post('queryCustom',{page:1,size:1000}).then((res) =>{
              this.tradeInfo = res.map.data.content
          }).catch(e =>{
              console.log(e)
          })
          callback.done()
        }else if(val.length==4){
          this.$post('queryCustom',{page:1,size:1000,customCode:parseInt(val)}).then((res) =>{
              this.tradeInfo = res.map.data.content
          }).catch(e =>{
              console.log(e)
          })
          callback.done()
        }else{
          callback.done()
        }
      }, 0)
    },
    resetForm (formName) {
      // this.$refs[formName].reset()
      this.$refs.formName && this.$refs.formName.reset()
      // this.$refs['organizationE'].reset()
      this.$refs.organizationE && this.$refs.organizationE.reset()
    },
    commitUpdate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$post('organizationSave',this.form).then((json) => {
        }).catch((e) => {
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
        // if(this.form.organizationCode.length != 10){
        //   this.$pop({
        //     type: 'danger',
        //     message: '仓库编号只能是10位！'
        //   })
        //   return
        // }
          this.form.organizationE = this.organizationE
          this.saveLoading = true
          this.$post('addOrganization',this.form).then((json) => {
            this.saveLoading = false
                this.add = false
                this.againInfo(json.map.id)
          }).catch(() => {
          this.saveLoading = false
          })

         }
      /*})*/
    })
    },
    typeChange(event){
      if(event=="4"){
        this.page_rules.icCard.required = true
      }else{
        this.page_rules.icCard.required = false
      }
      if(event == '1' || event == '2' || event == '4'|| event == '5'){
        // this.$refs.form.rules.creditCode.required=true;
        this.creditCodeSwitch = true;
        this.organizationNameSwitch = true;
        this.organizationCodeSwitch = true;
        // this.form.creditCode = this.$store.getters.getCreditCode;
        // this.form.organizationCode = this.$store.getters.getTradeCode;
        // this.form.organizationName = this.$store.getters.getTradeName;
      
      }else if(event == '3'){
        // this.$refs.form.rules.creditCode.required=false;
        // this.form.creditCode = '';
        // this.form.organizationCode = '';
        // this.form.organizationName = '';
        this.creditCodeSwitch = true;
        this.organizationNameSwitch = false;
        this.organizationCodeSwitch = false;
        
      }else if (event == "9"){
      
        // this.$refs.form.rules.creditCode.required=true;
        this.creditCodeSwitch = true;
        this.organizationNameSwitch = true;
        this.organizationCodeSwitch = true;
       
        // this.form.creditCode = this.$store.getters.getCreditCode;
        // this.form.organizationCode = this.$store.getters.getTradeCode;
        // this.form.organizationName = this.$store.getters.getTradeName;
      }else if(event=='10'){
        this.form.customId = "2200"
        this.creditCodeSwitch = false;
        this.organizationNameSwitch = false;
        this.organizationCodeSwitch = false;
        // this.form.creditCode = this.$store.getters.getCreditCode;
        // this.form.organizationCode = this.$store.getters.getTradeCode;
        // this.form.organizationName = this.$store.getters.getTradeName;
      }
    },
    checkObjisNull(obj){
      for(var o in obj){
        if(obj[o]){
          return false;
        }
      }
      return true;
    }
  }
}
</script>
