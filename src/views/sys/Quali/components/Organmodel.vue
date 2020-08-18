<template>
  <ep-form ref="bodyForm" :form="bodyForm" name-width="135px" :rules="page_rules">
    <ep-row :gutter="8" style="margin-top:20px;">
      <ep-col :col="8">
        <ep-form-item attr="orgId" label="组织编码">
          <ep-select filterable  v-model="bodyForm.orgId" name="orgId"  @change="idChange"  :disabled="layout == 'detail'">
              <ep-select-item v-for="item in orgList" :key="item.id" :index="item.id" :label="item.orgCode"></ep-select-item>
            </ep-select>
        </ep-form-item>
      </ep-col>
       <ep-col :col="8">
        <ep-form-item attr="tradeQualId" label="业务类型">
          <ep-select filterable  v-model="bodyForm.tradeQualId" name="tradeQualId"  @change="idChange"  :disabled="layout == 'detail'">
              <ep-select-item v-for="item in organlist" :key="item.id" :index="item.id" :label="item.description"></ep-select-item>
            </ep-select>
        </ep-form-item>
      </ep-col>

      <ep-col :col="8">
          <ep-form-item label="企业编码" attr="tradeCode" >
            <ep-input v-model="bodyForm.tradeCode" name="tradeCode" disabled ></ep-input>
          </ep-form-item>
        </ep-col>
    </ep-row>
   

    <div style="text-align:center" v-if="layout == 'detail'">
      <ep-button type="primary" size="small" @click="closeModel()" icon="checkmark-round">确定</ep-button>
    </div>
    <div style="text-align:center" v-else>
      <ep-button type="primary" size="small" @click="doSave()" :loading="loading" icon="checkmark-round">确定</ep-button>
      <ep-button type="primary" size="small" @click="closeModel()" icon="close">取消</ep-button>
    </div>
  </ep-form>
</template>

<script>
  import misList from 'src/common/mislist'
  export default {
    name: 'Organmodel',  // 保持和文件名一致，否则keep-alive不会动态缓存
    extends: misList,  // 务必继承

    props: {
      bodyForm: {
        type: Object,
        required: true
      },
      layout: {
        type: String,
        default: 'add'
      },
      isShowModel: {
        type: Boolean
      }
    },
    
    data () {
      return {
        loading: false,
        orgList: [],
        organlist: [],
        page_rules: {
          orgId: { required: true, message: "不能为空", trigger: "change" },
          tradeQualId: { required: true, message: "不能为空", trigger: "change" },
          // tradeCode: { required: true, message: "不能为空", trigger: "change" },
        },
      }
    },

    computed: {
    
    },

    watch: {
      bodyForm(value) {
        if (isShowModel) {
          this.bodyForm = value;
        }
      }
    },

    created() {
      this.getOrgList();
      this.getQualifyByTradeCode();
    },

    methods: {
      doSave() {
        this.$refs["bodyForm"].validate( valid => {
          if (!valid) {
            this.$pop({
              type: "danger",
              message: "验证失败！"
            });
            return;
          }

          let data = this.bodyForm;
          let url = this.layout == 'add' ? 'orgQualRtlsave' : 'orgQualRtlupdate';
          this.$post(url, data)
            .then(res => {
              this.loading = false;
              this.$emit('onMakeSure')
            })
            .catch(e => {
              console.log(e)
              this.loading = false;
            });

        })
      },

      // 组织编码带出相关组织数据
      idChange(id) {
        if (id) {
          this.orgList.forEach(item => {
            if (item.id == id) {
              this.bodyForm.masterCuscd = item.customId;
            }
          })
        } else {
          this.bodyForm.masterCuscd = '';
        }
      },

      // 组织数据
      getOrgList() {
        let { tradeCode } = this.bodyForm;
        this.$post("getOrganizationByTradeCode", {tradeCode})
          .then(res=>{
            this.orgList = res.map.data;
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
            console.log(this.organlist)
          })
          .catch(err => {
            console.log(err)
          })
      },

      closeModel() {
        this.$emit('onCloseModel', false)
      }
      
        
    },

      
    
  }
</script>
