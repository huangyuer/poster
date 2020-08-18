<template>
  <ep-form ref="bodyForm" :form="bodyForm" name-width="135px" :rules="page_rules">
    <ep-row :gutter="8" style="margin-top:20px;">
      <ep-col :col="8">
        <ep-form-item attr="orgCode" label="组织编号">
          <ep-select filterable  v-model="bodyForm.orgCode" name="orgCode"  @change="orgCodeChange"  :disabled="layout == 'detail'">
              <ep-select-item v-for="item in orgList" :key="item.id" :index="item.orgCode" :label="item.orgCode"></ep-select-item>
            </ep-select>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="业务类型" attr="businessType" >
          <ep-select v-model="bodyForm.businessType" name="businessType" :disabled="layout == 'detail'">
            <ep-select-item index="1" label="整报分出"></ep-select-item>
          </ep-select>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="关区" attr="masterCuscd"   >
          <!-- <ep-input v-model="bodyForm.masterCuscd" name="masterCuscd" disabled></ep-input> -->
          <loc-codemap-select
            disabled
            :name="'masterCuscd'"
            :code="'customCode'"
            :cName="'customName'"
            :dataList="customList"
            :type="'custom'"
            :value.sync="bodyForm.masterCuscd">
          </loc-codemap-select>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="企业编码" attr="tradeCode"   >
          <ep-input v-model="bodyForm.tradeCode" name="tradeCode" disabled></ep-input>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="企业名称" attr="tradeName"   >
          <ep-input v-model="bodyForm.tradeName" name="tradeName" disabled></ep-input>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="企业社会信用代码" attr="creditCode"   >
          <ep-input v-model="bodyForm.creditCode" name="creditCode" disabled></ep-input>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="仓库地址" attr="storageAddress"   >
          <ep-input v-model="bodyForm.storageAddress" name="storageAddress" disabled></ep-input>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8">
        <ep-form-item label="仓库面积" attr="storageArea"   >
          <ep-input v-model="bodyForm.storageArea" name="storageArea" disabled></ep-input>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8" v-if="layout == 'detail'">
        <ep-form-item label="状态" attr="dclTbStucd">
          <ep-select v-model="bodyForm.dclTbStucd" name="dclTbStucd" disabled>
            <ep-select-item index="1" label="正常"></ep-select-item>
            <ep-select-item index="2" label="暂停"></ep-select-item>
          </ep-select>
        </ep-form-item>
      </ep-col>
      <ep-col :col="8" v-if="layout == 'detail'">
        <ep-form-item label="操作状态" attr="optStatus" >
          <ep-select v-model="bodyForm.optStatus" name="optStatus" disabled>
            <ep-select-item index="1" label="暂存"></ep-select-item>
            <ep-select-item index="18" label="已申报"></ep-select-item>
            <ep-select-item index="4" label="入库失败"></ep-select-item>
            <ep-select-item index="5" label="审核通过"></ep-select-item>
            <ep-select-item index="6" label="审核拒绝"></ep-select-item>
            <ep-select-item index="99" label="删除"></ep-select-item>
            <ep-select-item index="17" label="转人工"></ep-select-item>
          </ep-select>
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
    name: 'QualificationModel',  // 保持和文件名一致，否则keep-alive不会动态缓存
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
        page_rules: {
          // masterCuscd: { required: true, message: "不能为空", trigger: "change" },
          businessType: { required: true, message: "不能为空", trigger: "change" },
          // tradeCode: { required: true, message: "不能为空", trigger: "change" },
        },
      }
    },

    computed: {
      customList() {
        return this.$store.getters.getCustomList;
      }
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
          let url = this.layout == 'add' ? 'qualifySave' : 'qualifyUpdate';
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
      orgCodeChange(orgCode) {
        if (orgCode) {
          this.orgList.forEach(item => {
            if (item.orgCode == orgCode) {
              this.bodyForm.masterCuscd = item.customId;
              this.bodyForm.storageAddress = item.organizationE.address || '';
              this.bodyForm.storageArea = item.organizationE.area || '';
            }
          })
        } else {
          this.bodyForm.masterCuscd = '';
          this.bodyForm.storageAddress = '';
          this.bodyForm.storageArea = '';
        }
      },

      // 组织数据
      getOrgList() {
        let { tradeCode } = this.bodyForm;
        this.$post("getOrgByTradeCodeChange", {tradeCode, status: '5', type: '2,3'})
          .then(res=>{
            this.orgList = res.map.data;
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
