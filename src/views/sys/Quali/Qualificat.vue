<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">
          <ep-button type="success" size="small" @click="doSave(bodyForm)" icon="edit" :loading="saveLoading">暂存</ep-button>
          <ep-button type="success" size="small" @click="addOther()" icon="checkmark-round" :loading="applyLoading">重置
          </ep-button>
          <!-- <ep-button type="success" size="small"  icon="plus-round"  @click="addOther">新增</ep-button> -->
        </div>
        <ep-tabs active="企业资质申请表头">
          <ep-tab-item name="企业资质申请表头">
            <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" :rules="page_rules" name-width="168px">
              <ep-row :gutter="8">

                <ep-col :col="8">
                  <ep-form-item label="关区" attr="masterCuscd">
                    <loc-codemap-select :name="'masterCuscd'" :code="'customCode'" :cName="'customName'" :dataList="tradeInfo" :type="'custom'" :value.sync="bodyForm.masterCuscd">
                    </loc-codemap-select>
                  </ep-form-item>
                </ep-col>
                <!-- <ep-col :col="8">
                <ep-form-item label="类型资质" attr="qualifyType" >
                  <ep-select v-model="bodyForm.qualifyType" name="qualifyType">
                    <ep-select-item index="1" label="整报分出"></ep-select-item>
                    <ep-select-item index="2" label="业务分出"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col> -->

                <!-- <ep-col :col="8">
                <ep-form-item attr="qualifyType" label="资质类型">
                  <ep-select filterable  v-model="bodyForm.qualifyType" name="qualifyType" >
                      <ep-select-item v-for="item in qualifyTypelist" :key="item.id" :index="item.qualifyType" :label="item.description"></ep-select-item>
                    </ep-select>
                </ep-form-item>
              </ep-col> -->

                <ep-col :col="8">
                  <ep-form-item label="资质类型" attr="qualifyType">
                    <ep-select v-model="bodyForm.qualifyType" name="qualifyType" filterable>
                      <ep-select-item v-for="(item, index) in qualifyTypelist" :key="index" :index="item.switchKeyName" :label="item.switchKeyName"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <!-- <ep-col :col="6">
                <ep-form-item label="操作状态" attr="optStatus" >
                  <ep-select v-model="bodyForm.optStatus" name="optStatus">
                    <ep-select-item index="5" label="审核通过"></ep-select-item>
                    <ep-select-item index="6" label="审核拒绝"></ep-select-item>
                    <ep-select-item index="17" label="待审核"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>  -->
                <!-- <ep-col :col="8">
                <ep-form-item label="申请时间" attr="dclTime">
                    <ep-date v-model="bodyForm.dclTime" name="dclTime" type="dateTime"></ep-date>
                </ep-form-item>
                </ep-col> -->
                <ep-col :col="8">
                  <ep-form-item label="有效期" attr="validTime">
                    <ep-date v-model="bodyForm.validTime" name="validTime" type="dateTime"></ep-date>
                  </ep-form-item>
                </ep-col>

                <ep-col :col="8">
                  <ep-form-item attr="orgId" label="组织编码">
                    <ep-select filterable v-model="bodyForm.orgId" name="orgId" @change="orgIdChange">
                      <ep-select-item v-for="(item, index) in orgList" :key="index" :index="item.id" :label="item.id"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="16">
                  <ep-form-item label="申请说明" attr="applyDesc">
                    <ep-input v-model="bodyForm.applyDesc" name="applyDesc" :maxlength="4000"></ep-input>
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
import misList from 'src/common/mislist'
import { cloneObj, getToken } from 'utils'

export default {
  name: 'Qualificat',
  extends: misList, // 务必继承

  data() {
    return {
      loading: false,
      saveLoading: false, //暂存loading
      applyLoading: false, //申报loading
      pageFlag: false,
      isClip: false,
      isDeclare: false,
      headColor: true,
      localType: '',
      qualifyTypelist: [],
      bodyForm: {
        // id: "",
        // Trade_id:'',
        masterCuscd: '',
        qualifyType: '',
        description: '',
        // optStatus:''
        applyDesc: '',
        // billLodNo:'',
        validTime: '',
        // customId:'',
        orgId:'',
      },
      model: false,
      tableData: [], // 表体表格
      containers: [],
      tableDataCopy: [],
      orgList:[],
      ep_page: {
        page: 1,
        size: 10
      },
      totalcount: 0,
      page_rules: {
        id: { required: true, message: '不能为空', trigger: 'change' },
        qualifyType: { required: true, message: '不能为空', trigger: 'change' },
        // description: {required: true, message: "不能为空", trigger: "change" },
        validTime: { required: true, message: '不能为空', trigger: 'change' },
        masterCuscd: { required: true, message: '不能为空', trigger: 'change' },
        orgId: { required: true, message: '不能为空', trigger: 'change' }
      }
    }
  },
  created() {
    this.qualifyTypefindAll()
    this.orgIdChange()
  },
  mounted() {},
  computed: {
    tradeInfo() {
      let customList = this.$store.getters.getCustomList
      customList.forEach((item, index) => {
        if (item.customCode == '2200') {
          customList.splice(index, 1)
        }
      })
      return customList
    },
    unitList() {
      return this.$store.getters.getUnitList
    },
    countrys() {
      return this.$store.getters.getCountryList
    },
    curr() {
      return this.$store.getters.getCurrList
    }
  },
  methods: {
    //查询企业资质类型
    qualifyTypefindAll() {
      this.$post('getTypelist', { page: 1, size: 1000 })
        .then(res => {
          this.qualifyTypelist = res.map.data.content
        })
        .catch(err => {
          console.log(err)
        })
    },
    //查询企业资质类型
    // qualifyTypefindAll() {
    //     this.$get("qualifyTypefindAll")
    //       .then(res=>{
    //         this.qualifyTypelist = res.map.data;
    //         // console.log(this.qualifyTypelist)
    //       })
    //       .catch(err => {
    //         console.log(err)
    //       })
    //   },
    //  reset(){
    //    this.$refs.bodyForm.reset();
    //  },
    // 所属企业名称
    orgIdChange(value) {
        // console.log(this.$store.getters.getOrgCustomId)
      this.$post('getOrgByCustomCode', {
        size: 1000,
        page: 1,
        tradeCode: this.$store.getters.getTradeCode,
        customCode:this.$store.getters.getOrgCustomId,
      })
        .then(res => {
          this.orgList = res.map.data.content
        })
        .catch(err => {
          console.log(err)
        })
    },
    formatterSwitchType(row, index) {
      for (let i = 0; i < this.qualifyTypelist.length; i++) {
        if (this.qualifyTypelist[i].switchKeyName == row) {
          return this.qualifyTypelist[i].switchKey
        }
      }
    },
    doSave() {
      this.$refs['bodyForm'].validate(valid => {
        if (valid) {
          let bodyFormCopy = cloneObj(this.bodyForm)
          bodyFormCopy.switchKey = this.formatterSwitchType(
            bodyFormCopy.qualifyType
          )
          // console.log(bodyFormCopy)
          let emptyObject = []
          this.saveLoading = true
          this.$post('tradeQualifysave', bodyFormCopy)
            .then(res => {
              console.log(res)
              this.saveLoading = false
              this.$refs.bodyForm.reset()
              this.$router.push({ name: '企业资质查询' })
            })
            .catch(() => {
              this.saveLoading = false
            })
        } else {
          this.$pop({
            type: 'danger',
            message: '表单验证失败!'
          })
          return
        }
      })
    },
    // checkDate(strDate1,strDate2){

    //     var t1 = new Date(Date.parse(strDate1.replace(/-/g,"/"))).getTime();
    //     var t2 = new Date(Date.parse(strDate2.replace(/-/g,"/"))).getTime();
    //       if(t1 - t2 > 0){
    //           return false;
    //       }else{
    //           return true;
    //       }
    //   },
    addOther() {
      let menusList = this.$store.getters.getMenuTabInstance.items
      menusList.forEach(function(item, index) {
        if (item.link == '/Qualificat') {
          menusList.splice(index, 1)
        }
      })
      this.$router.push({ name: '首页' })
      setTimeout(() => {
        this.$router.push({
          path: '/Qualificat'
        })
      }, 10)
    }
  }
}
</script>
