<template>
  <div>
    <div class="panel-main-content">
      <!--筛选栏组-->
      <div class="search-card contents-card card-margin">
        <wms-title title="">
          <div class="panel panel-default">
            <!-- <div class="card-title zero-padding"><span class="weight">出入库预增减表查询</span></div> -->
            <ep-form ref="searchForm" :form="searchForm" name-width="138px">
              <ep-row :gutter="7">
                <ep-col :col="8">
                  <ep-form-item label="进出类型" attr="stockBillType">
                    <ep-select v-model="searchForm.stockBillType" name="stockBillType">
                      <ep-select-item index="I" label="进库"></ep-select-item>
                      <ep-select-item index="E" label="出库"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="WMS预出入库单编号" attr="stockBillNoPre">
                    <ep-input v-model="searchForm.stockBillNoPre" name="stockBillNoPre"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item attr="stockType" label="库存类型" title="库存类型">
                    <ep-select v-model="searchForm.stockType" name="stockType">
                      <ep-select-item index="1" label="保税"></ep-select-item>
                      <ep-select-item index="2" label="非保"></ep-select-item>

                    </ep-select>
                  </ep-form-item>
                </ep-col>

                <ep-col :col="8">
                  <ep-form-item attr="supvMode" label="监管方式">
                    <loc-codemap-select :name="'supvMode'" :code="'tradeMode'" :cName="'abbrTrade'" :dataList="supvInfo" :value.sync="searchForm.supvMode"></loc-codemap-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item attr="iEPort" label="进出境关别">
                    <loc-codemap-select :name="'iEPort'" :code="'customCode'" :cName="'customName'" :dataList="ImpexpPortcdInfo" :type="'custom'" :value.sync="searchForm.iEPort">
                    </loc-codemap-select>
                  </ep-form-item>
                </ep-col>

                <ep-col :col="10">
                  <ep-form-item label="创建时间" attr="gatetime">
                    <!-- <ep-date-range v-model="gatetime" @change="changeTime" type="dateTime"></ep-date-range> -->
                    <ep-date-range v-model="gatetime" @change="changeTime" type="dateTime"></ep-date-range>
                  </ep-form-item>
                </ep-col>

              </ep-row>

              <ep-row :gutter="7">
                <ep-col :col="24">
                  <WmsButton @click="addOther">新增</WmsButton>
                  <WmsButton @click="reset('searchForm')">重置</WmsButton>
                  <WmsButton :loading="loading" @click="refresh(true)">查询</WmsButton>
                  <file-upload :uploadData="uploadData" :buttonName="'数据导入'" :noType="false" :uploadType="1" />
                </ep-col>
              </ep-row>
            </ep-form>
          </div>
        </wms-title>
        <!--表格-->
        <div class="wms-dividing-line"></div>
        <div class="block">
          <slot name="out-form">

          </slot>
        </div>
        <div class="card-body">
          <BondFormHeaderTable ref="BondFormHeaderTable" :epData="ep_data" :searchForm="searchForm"></BondFormHeaderTable>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import misList from 'src/common/mislist'
import BondFormHeaderTable from './components/bondFormHeaderTable'
import { getToken } from 'utils'
import mixin from './mixin'
import FileUpload from 'src/components/FileUpload'
export default {
  name: 'ImportBondedInfodraw',
  extends: misList, // 务必继承
  mixins: [mixin],
  components: {
    FileUpload,
    BondFormHeaderTable
  },
  data() {
    return {
      uploadData: {
        businessType: 'preIncrease',
        checkType: 'N',
        sysCode: 'lgsa'
      },
      gatetime: '',
      counter: 0,
      // tradeInfo: [],
      fileUploadLoading: false,
      loading: false,
      listApi: 'drawfindlist', // 搜索，取api.json里面的key值
      deleteData: 'enterpriseDelete',
      exportStyle: false,
      optType: '1',
      model1: false,
      settings: {
        pk: 'id' // 主键
      },
      searchForm: {
        stockBillType: '',
        stockBillNoPre: '',
        stockType: '',
        supvMode: '',
        iEPort: '',
        gatetime: ''
      },
      selectLength: 0,
      selectItems: [],
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      ep_data: [], //表格数据
      totalcount: 0
    }
  },
  computed: {},
  watch: {
    exportStyle(e) {
      if (!e) {
        this.optType = '1'
      }
    }
  },
  mounted() {
    this.refresh(true)
  },
  created() {
    let tradeModeList = this.$store.getters.getTradeModeList
    let ImpexpPortcd = this.$store.getters.getCustomList
    let masterCuscd = this.$store.getters.getCustomId
    this.supvInfo = tradeModeList
    this.ImpexpPortcdInfo = ImpexpPortcd
  },
  methods: {
    // 重置
    reset(e) {
      this.$refs[e].reset()
      this.gatetime = ''
    },
    // 新增
    addOther() {
      this.$router.push({
        path: '/importAdd'
      })
    },
    changeTime() {
      let gatetime = this.gatetime.split(',')
      this.searchForm.startTime = gatetime[0]
      this.searchForm.endTime = gatetime[1]
    }
  }
}
</script>

<style scoped>
</style>
