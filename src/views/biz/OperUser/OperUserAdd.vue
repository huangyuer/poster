<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <ep-form class="demo-form" ref="form" :form="form" :rules="page_rules" name-width="90px">
          <ep-row :gutter="10">
            <ep-col :col="12">
              <ep-form-item label="昵称" attr="nickName" >
                <ep-input v-model="form.nickName" name="nickName" :maxlength="30"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="12">
              <ep-form-item label="用户名" attr="userName" required>
                <ep-input v-model="form.userName" name="userName" :maxlength="18"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="12">
              <ep-form-item label="企业编码" attr="tradeCode" required>
                <ep-input v-model="form.tradeCode" name="tradeCode" :maxlength="10"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="12">
              <ep-form-item label="组织编码" attr="orgCode" required>
                <ep-select filterable :label="orgCodes" v-model="form.orgCode" name="orgCode" @change="orgCodeChange">
                  <ep-select-item v-for="(item, index) in orgCodes" :key="index" :index="item.orgCode" :label="item.orgCode"></ep-select-item>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="12">
              <ep-form-item label="关区" attr="customId">
                <!-- <ep-select disabled :label="tradeInfo" v-model="form.customId" name="customId">
                  <ep-select-item v-for="(item, index) in tradeInfo" :key="index" :index="item.customCode" :label="item.customName+' '+item.customCode"></ep-select-item>
                </ep-select> -->
                <loc-codemap-select
                    :name="'customId'"
                    :code="'customCode'"
                    :cName="'customName'"
                    :dataList="tradeInfo"
                    :type="'custom'"
                    disabled
                    :value.sync="form.customId">
                     </loc-codemap-select>
              </ep-form-item>
            </ep-col>
            

           
            <ep-col :col="12">
              <ep-form-item label="用户类型" attr="type" required>
                <ep-select v-model="form.type" name="type" :col="8">

                  <ep-select-item index="2" label="操作员"></ep-select-item>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="12">
              <ep-form-item label="邮箱" attr="email" required>
                <ep-input v-model="form.email" name="email" :maxlength="60"></ep-input>
              </ep-form-item>
            </ep-col>
             <ep-col :col="12">
              <ep-form-item label="状态" attr="status" required>
                <ep-select placeholder="" v-model="form.status" name="status" :col="8">
                  <ep-select-item index="0" label="无效"></ep-select-item>
                  <ep-select-item index="1" label="有效"></ep-select-item>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="12">
              <ep-form-item label="备注" attr="remark" count>
                <ep-input v-model="form.remark" name="remark" type="textarea"></ep-input>
              </ep-form-item>
            </ep-col>
          </ep-row>
          <ep-form-item>
            <div v-if="$route.params.flag">
              <!-- <ep-button type="primary"  @click="commitUpdate('form')">保存</ep-button> -->
               <WmsButton   @click="commitUpdate('form')">保存</WmsButton>
              <!-- <ep-button type="warning" @click="resetForm('form')">重置</ep-button> -->
            </div>
            <div v-else>
                 <WmsButton  :loading="saveLoading" @click="commitAdd('form')">保存</WmsButton>
              <!-- <ep-button type="primary" :loading="saveLoading" @click="commitAdd('form')">保存</ep-button> -->
              <!-- <ep-button type="warning" @click="resetForm('form')">重置</ep-button> -->
            </div>

          </ep-form-item>
        </ep-form>
      </div>
    </div>
  </div>

</template>


<script>
export default {
  name: "operUserAdd",
  created() {
    let customList = this.$store.getters.getCustomList;
    this.tradeInfo = customList;

    this.dofresh();
  },
  mounted() {
    // console.log(this.$store.getters.getOrgorgCode);

    if (this.$route.params.flag) {
      this.form = this.$route.params.form[0];
      //输入时字符串1,selectItem 需要数字1转化过程
    }
  },
  data() {
    var test = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else {
        if (value.substring(0, 3) === "EDI") {
          callback("不能为EDI开头");
        }
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      if (value === "") {
        callback("不能为空");
      }
      var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!reg.test(value)) {
        callback("邮箱格式不正确");
      }
      callback();
    };
    var checkUserName = (rule, value, callback) => {
      if (value === "") {
        callback("不能为空");
      }
      var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
      if (!reg.test(value)) {
        callback("用户名由6-18位字母和数字组成,必须包含字母");
      }
      callback();
    };
    return {
      drop: [],
      tradeInfo: [],
      orgCodes: [],
      saveLoading:false,
      form: {
        nickName: "",
        userName: "",

        customId:"", //其他表中CustomId ，存放的是关区表中的code数据
        tradeCode: this.$store.getters.getTradeCode,
        orgCode: "",
        OrgorgCode: this.$store.getters.getOrgorgCode.OrgorgCode,
        type: "2",
        email: "",
        remark: "",
        status: "1"
      },
      page_rules: {
        userName: { validator: checkUserName, trigger: "change" },
        tradeCode: { required: true, message: "不能为空", trigger: "change" },
        status: { required: true, message: "不能为空", trigger: "change" },
        type: { required: true, message: "不能为空", trigger: "change" },
        orgCode: { required: true, message: "不能为空", trigger: "change" },
        email: { validator: checkEmail, trigger: "change" },
        customId: {required:true, message: "不能为空", trigger: "change" },
        nickName:{ required: true, message: "不能为空", trigger: "change" }
      }
    };
  },

  methods: {
    orgCodeChange(){
      this.$post("queryOrganization",{orgCode:this.form.orgCode,page:1,size:10,tradeCode:this.$store.getters.getTradeCode})
      .then(res=>{
        this.form.customId = res.map.data.content[0].customId
      })
    },
    dofresh() {
      let param = {
        page: 1,
        size: 100,
        tradeCode: this.$store.getters.getTradeCode,
        status:"5"
      };
      this.$post("getOrganizationByTradeCode", param).then(res => {
        let orgCodes = res.map.data;
        this.orgCodes = orgCodes;
      });
    },
    resetForm(formName) {
      // this.$refs[formName].reset();
      this.$refs.formName && this.$refs.formName.reset()
    },
    commitUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$post("userSave", this.form)
            .then(json => {})
            .catch(e => {
              console.log(e);
            });
        } else {
        }
      });
    },
    commitAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true
          this.$post("addOperatorUser", this.form)
            .then(json => {
              this.saveLoading = false
            })
            .catch(e => {
              this.saveLoading = false
              console.log(e);
            });
        } else {
        }
      });
    }
  }
};
</script>