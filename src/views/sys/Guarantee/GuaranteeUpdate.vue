<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">
          <!-- <ep-button type="success" size="small" @click="doSave" icon="edit" :loading="saveLoading">暂存</ep-button>
          <ep-button type="success" size="small" @click="doDeclare" icon="checkmark-round" :loading="declareLoading">申报</ep-button>
          <ep-button type="success" size="small" icon="plus-round" @click="doAdd">新增</ep-button> -->
          <WmsButton  @click="doSave" :loading="saveLoading">暂存</WmsButton>
          <WmsButton  @click="doDeclare(isDeclare)">确认</WmsButton>
          <WmsButton  @click="doAdd">新增</WmsButton>
          
        </div>
        <ep-tabs active="保证金">
          <ep-tab-item name="保证金">
            <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" :rules="page_rules" name-width="168px">
              <ep-row :gutter="10">
                <ep-col :col="8">
                    <ep-form-item label="清单编号" attr="dpstLevyBlNo">
                        <ep-input v-model="bodyForm.dpstLevyBlNo" name="dpstLevyBlNo" :maxlength="64" disabled></ep-input>
                    </ep-form-item>
                </ep-col>
                <!-- <ep-col :col="8" >
                    <ep-form-item attr="dclData" label="申报时间">
                       <ep-date v-model="bodyForm.dclData"  type="dateTime" name="dclData"></ep-date>
                    </ep-form-item>
                </ep-col> -->
                <ep-col :col="8">
                    <ep-form-item label="保函(保证金)编号" attr="ltguaNo">
                        <ep-input v-model.trim="bodyForm.ltguaNo" name="ltguaNo" :maxlength="64"></ep-input>
                    </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="保函类型" attr="ltguaType">
                    <ep-select v-model="bodyForm.ltguaType" name="ltguaType">
                      <ep-select-item index="1" label="保证金"></ep-select-item>
                      <ep-select-item index="2" label="保函"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8" >
                    <ep-form-item attr="validDateStart" label="有效时间开始">
                       <ep-date v-model="bodyForm.validDateStart"  type="dateTime" name="validDateStart"></ep-date>
                    </ep-form-item>
                </ep-col>
                <ep-col :col="8" >
                    <ep-form-item attr="validDateEnd" label="有效时间结束">
                       <ep-date v-model="bodyForm.validDateEnd"  type="dateTime" name="validDateEnd"></ep-date>
                    </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="申报类型" attr="dclTypecd">
                    <ep-select v-model.trim="bodyForm.dclTypecd" name="dclTypecd" disabled>
                      <ep-select-item index="0" label="备案"></ep-select-item>
                      <ep-select-item index="1" label="变更"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                
                <!-- <ep-col :col="8">
                  <ep-form-item label="保函状态" attr="ltguaStatus">
                    <ep-select v-model="bodyForm.ltguaStatus" name="ltguaStatus">
                      <ep-select-item index="0" label="无效"></ep-select-item>
                      <ep-select-item index="1" label="有效"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="绑定状态" attr="passportUsedTypecd">
                    <ep-select v-model="bodyForm.passportUsedTypecd" name="passportUsedTypecd">
                      <ep-select-item index="0" label="未绑定"></ep-select-item>
                      <ep-select-item index="1" label="已绑定"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col> -->
                <ep-col :col="8">
                  <ep-form-item label="被担保企业名称" attr="assuredEtpsNm" >
                    <ep-select v-model="bodyForm.assuredEtpsNm" name="assuredEtpsNm"  @change="changeTrade"  filterable>
                      <ep-select-item v-for="item in UsedTypecd" :key="item.id" :index="item.tradeName" :label="item.tradeName"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="被担保企业编号" attr="assuredEtpsno">
                    <ep-input v-model.trim="bodyForm.assuredEtpsno" name="assuredEtpsno" :maxlength="10" disabled></ep-input>
                  </ep-form-item>
                </ep-col>
                
                <ep-col :col="8">
                  <ep-form-item label="被担保企业信用代码" attr="assuredEtpsSccd">
                    <ep-input v-model.trim="bodyForm.assuredEtpsSccd" name="assuredEtpsSccd" :maxlength="18" disabled></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="收款单位名称" attr="mkclUnitNm">
                    <ep-input v-model.trim="bodyForm.mkclUnitNm" name="mkclUnitNm" :maxlength="50"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="收款单位开户银行" attr="mkclUnitOpaccBankNm">
                    <ep-input v-model.trim="bodyForm.mkclUnitOpaccBankNm" name="mkclUnitOpaccBankNm" :maxlength="50"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="金额" attr="grtAmt">
                    <ep-input v-model.trim="bodyForm.grtAmt" name="grtAmt" :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="缴款企业名称" attr="pmnEtpsNm">
                    <ep-input v-model.trim="bodyForm.pmnEtpsNm" name="pmnEtpsNm" :maxlength="50"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="缴款企业信用代码" attr="pmnEtpsSccd">
                    <ep-input v-model.trim="bodyForm.pmnEtpsSccd" name="pmnEtpsSccd" :maxlength="18"></ep-input>
                  </ep-form-item>
                </ep-col>
                <!-- <ep-col :col="8">
                  <ep-form-item label="缴款企业编号" attr="pmnEtpsno">
                    <ep-input v-model="bodyForm.pmnEtpsno" name="pmnEtpsno" :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col> -->
                
                <ep-col :col="8">
                  <ep-form-item label="缴款企业开户银行" attr="pmnEtpsOpaccBankNm">
                    <ep-input v-model.trim="bodyForm.pmnEtpsOpaccBankNm" name="pmnEtpsOpaccBankNm" :maxlength="50"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="缴款企业银行开户账号" attr="pmnEtpsBankAcctnum">
                    <ep-input v-model.trim="bodyForm.pmnEtpsBankAcctnum" name="pmnEtpsBankAcctnum" :maxlength="32"></ep-input>
                  </ep-form-item>
                </ep-col>
                <!-- <ep-col :col="8">
                  <ep-form-item label="状态" attr="Status">
                    <ep-select v-model="bodyForm.Status" name="Status">
                      <ep-select-item index="1" label="暂存"></ep-select-item>
                      <ep-select-item index="18" label="已确认"></ep-select-item>
                      <ep-select-item index="3" label="海关入库"></ep-select-item>
                      <ep-select-item index="4" label="海关入库失败"></ep-select-item>
                      <ep-select-item index="5" label="审核通过"></ep-select-item>
                      <ep-select-item index="6" label="审核拒绝"></ep-select-item>
                      <ep-select-item index="17" label="转人工"></ep-select-item>
                      <ep-select-item index="60" label="担保类型转企业确认"></ep-select-item>
                      <ep-select-item index="61" label="担保类型审核退单"></ep-select-item>
                      <ep-select-item index="99" label="删除"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col> -->
                <ep-col :col="16">
                  <ep-form-item label="备注" attr="rmk">
                    <ep-input v-model.trim="bodyForm.rmk" name="rmk" type="textarea" :maxlength="1000"></ep-input>
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
import misList from "src/common/mislist";
import { cloneObj } from "utils";
import mixin from './mixin'
export default {
  name: "GuaranteeUpdate",
  mixins: [mixin, misList],
  data() {
    return {
      saveLoading: false,
      declareLoading: false,
      gatetime: "",
      isDeclare: false,
      UsedTypecd:[],
      bodyForm: {
        id: "",
        orgId: this.$store.getters.getId,
        orgCode: this.$store.getters.getOrgCode,
        dclTypecd: "0",
        masterCuscd:  this.$store.getters.getCustomId,
        assuredEtpsno: this.$store.getters.getTradeCode,
        assuredEtpsNm: this.$store.getters.getTradeName,
        assuredEtpsSccd: this.$store.getters.getCreditCode,
        mkclUnitNm: "",
        mkclUnitOpaccBankNm: "",
        pmnEtpsNm: "",
        pmnEtpsSccd: "",
        pmnEtpsno: "",
        pmnEtpsOpaccBankNm: "",
        pmnEtpsBankAcctnum: "",
        grtAmt: "",
        ltguaNo: "",
        dclTime: "",
        rmk: "",
        validDateEnd:'',
        validDateStart:'',
        // ltguaStatus:'',
        // passportUsedTypecd:'',
        // Status:'',
        // dpstLevyBlNo:"",
        // dclData:'',
        ltguaType:'',
      },

      page_rules: {
        orgId: { required: true, message: "不能为空", trigger: "change" },
        // dpstLevyBlNo: {
        //   required: true,
        //   message: "不能为空",
        //   trigger: "change"
        // },
        validDateStart: { required: true, message: "不能为空", trigger: "change" },
        validDateEnd: { required: true, message: "不能为空", trigger: "change" },
        dclTypecd: { required: true, message: "不能为空", trigger: "change" },
        // ltguaStatus: {
        //   required: true,
        //   message: "不能为空",
        //   trigger: "change"
        // },
        // passportUsedTypecd: {
        //   required: true,
        //   message: "不能为空",
        //   trigger: "change"
        // },
        grtAmt: { required: true, message: "请输入数字", trigger: "change"},
        ltguaNo: { required: true, message: "不能为空", trigger: "change" },
        ltguaType: { required: true, message: "不能为空", trigger: "change" },
        // Status: { required: true, message: "不能为空", trigger: "change" }
      }
    };
  },
  created() {
    this.changeTrade()
    this.GetEnterprise()
  },
  mounted(){
    this.againDate(parseInt(this.$route.query.id));
  },
  watch:{
    "bodyForm.grtAmt": {
      handler(newName, oldName) {
        if (newName === "0") {
          this.$pop({
            type: "danger",
            message: "金额不能为0"
          });
          setTimeout(()=>{
             this.bodyForm.grtAmt=""
          })
         
          return;
        }
        if (
          newName !== null &&
          newName.charAt(0) == "0" &&
          newName.length > 1 &&
          newName.charAt(1) !== "."
        ) {
          this.$pop({
            type: "danger",
            message: "请输入正确的金额"
          });
        }
        let reg = /^\d{0,13}(\.\d{0,5})?$/;
        if (!reg.test(newName)) {
          setTimeout(() => {
            this.bodyForm.grtAmt = oldName;
          });
        }
        let totalNumber = (
          this.bodyForm.grtAmt * 1 +
          this.bodyForm.vehicleFrameWt * 1 +
          this.bodyForm.containerWt * 1 +
          this.bodyForm.totalGrossWt * 1
        ).toFixed(5);
        if (isNaN(totalNumber)) {
          this.bodyForm.totalWt = "0.00000";
          this.isNumber();
        } else {
          this.bodyForm.totalWt = totalNumber;
        }
      }
    },
  },
  methods: {
    changeTrade(){
      let like_tradeName=this.bodyForm.assuredEtpsNm
      // console.log(like_tradeName)
      this.$post("queryEnterprise1",{page:1,size:20,like_tradeName,customId:2249}).then(res=>{
        this.UsedTypecd=res.map.data.content
        // console.log(this.UsedTypecd)
        this.UsedTypecd.forEach(item=>{
          this.bodyForm.assuredEtpsno=item.tradeCode
          this.bodyForm.assuredEtpsSccd=item.creditCode
            // console.log(this.bodyForm.assuredEtpsno)
        })
        // this.bodyForm.assuredEtpsno=this.UsedTypecd[0].tradeCode
      })
    },
    GetEnterprise(){
      this.$post("queryEnterprise1",{page:1,size:20,customId:2249}).then(res=>{
        this.UsedTypecd=res.map.data.content   
      })
    },
    againDate(id) {
      this.$post("getLevyInvDetails", { id: parseInt(id) }).then(res => {
          this.bodyForm = cloneObj(res.map.data);
      });
    },
    // 暂存
    doSave() {
        let strDate = this.bodyForm.validDateStart
        let endDate  = this.bodyForm.validDateEnd
        if(!this.checkDate(strDate,endDate)){
            this.$pop({
                type: "danger",
                message: "有效结束时间应该大于有效开始时间"
            });
            return
        }
      this.$refs["bodyForm"].validate(valid => {
        if (!valid) {
          this.$pop({
            type: "danger",
            message: "表单验证失败！"
          });
          return;
        }
        let data = this.bodyForm;
        this.saveLoading = true;
        this.$post("saveLevyInv", data)
          .then(res => {
            this.bodyForm.id = res.map.data;
            this.saveLoading = false;
            this.isDeclare = true;
            this.againDate(this.bodyForm.id);
          })
          .then(res => {
            this.bodyForm = res.map.data;
          })
          .catch(e => {
            this.saveLoading = false;
          });
      });
    },
    // 申报
    doDeclare(isDeclare) {
      
      if (!isDeclare) {
        this.$pop({
          type: "danger",
          message: "请先暂存"
        });
        return;
      }

      this.$refs["bodyForm"].validate(valid => {
        if (!valid) {
          this.$pop({
            type: "danger",
            message: "表单验证失败！"
          });
          return;
        }
        let vm = this;
        this.$confirm({
          word: '是否要确认申报？',
          async callback (info) {
            if (info) {
              try {
                vm.declareLoading = true;
                let bodyForm = vm.bodyForm;
                let result = await vm.$post("saveLevyInv", bodyForm);
                let ids = Number(bodyForm.id);
                let response = await vm.$post("declare", {ids: [ids]})
                vm.declareLoading = false;
                vm.againDate(id);
              } catch(err) {
                console.log(err)
                vm.declareLoading = false;
              }
            }
        }
        })
      })
    },
  isNumber() {
      let reg = /^(?:[1-9]\d*|0)$/;
      if (isNaN(this.bodyForm.grtAmt * 1)) {
        this.$pop({
          type: "danger",
          message: "请输入正确的金额"
        });
      }
      if(this.bodyForm.grtAmt=='0'){
        this.bodyForm.grtAmt=''
      }
    },
    // 新增
    doAdd() {
      this.$app.trigger("add-new-tab","GuaranteeAdd")  
    },
    checkDate(strDate1,strDate2){
        var t1 = new Date(Date.parse(strDate1.replace(/-/g,"/"))).getTime();  
        var t2 = new Date(Date.parse(strDate2.replace(/-/g,"/"))).getTime();  
          if(t1 - t2 > 0){     
              return false;   
          }else{  
              return true;  
          }
      },
  }
};
</script>