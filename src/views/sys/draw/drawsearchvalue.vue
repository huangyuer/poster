<template>
  <div>
    <div class="panel-main-content">
      <!--筛选栏组-->
      <div class="search-card contents-card card-margin">
        <wms-title title="">
        <div class="panel panel-default">
          <!-- <div class="card-title zero-padding">
            <span class="weight">查询列表</span>
          </div> -->
          <ep-form ref="searchForm" :form="searchForm" name-width="168px">
            <ep-row :gutter="10">
              <ep-col :col="8">
                <ep-form-item label="预增减字段名称" attr="preIncreaseName">
                  <ep-input v-model="searchForm.preIncreaseName" name="preIncreaseName" :maxlength="64"></ep-input>
                </ep-form-item>
              </ep-col>
            </ep-row>
            <!-- </ep-tab-item>
            </ep-tabs> -->
            <ep-row :gutter="7">
              <ep-col :col="24">
                <WmsButton  @click="reset('searchForm')">重置</WmsButton>
                <WmsButton :loading="loading" @click="refresh(true)">查询</WmsButton>
              </ep-col>
            </ep-row>
          </ep-form>
        </div>
        </wms-title>
         <!--表格-->
            <div class="wms-dividing-line"></div>
              <div class="card-body">
                <div class="block">
                  <slot name="out-form"> </slot>
                </div>
                <div class="block">
                  <ep-table ref="table" border :height="400" :data="ep_data" :head-color="headColor" @selection-change="handleSelectionChange" :loading="loading">
                    <!-- <ep-table-item type="select"></ep-table-item> -->
                    <ep-table-item column="preIncreaseName" title="预增减字段名称" width="350"></ep-table-item>
                    <ep-table-item column="preIncreaseValue" title="预增减字段值" width="350"></ep-table-item>
                    <!-- <ep-table-item column="optStatus" title="状态" width="140" :formatter="statusFormatter"></ep-table-item> -->
                    <ep-table-item column="tradeValue" title="企业字段值"></ep-table-item>
                    <ep-table-item column="orgId" title="组织"></ep-table-item>
                    <!-- <ep-table-item column="type" title="表头标识" width="200" :formatter="type"></ep-table-item>          -->
                  </ep-table>
                </div>

                <div class="block">
                  <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
                </div>
              </div>
       </div>
     

    </div>
  </div>
</template>

<script>
import misList from 'src/common/mislist'
import { delToken, getToken, getOrgId } from 'utils'
import localStorage from 'utils/localStorage'
import mixin from './mixin'
export default {
  name: 'drawsearchvalue', // 保持和文件名一致，否则keep-alive不会动态缓存
  mixins: [misList, mixin],
components: {  },
  computed: {},
  watch: {
   
  },
  mounted() {
    this.refresh(true)
  },
  methods: {
    reset(e) {
      this.$refs[e].reset()
      this.fixTime = ''
    },
    changeTime() {
      let fixTime = this.fixTime.split(',')
      this.searchForm.passTimeStart = fixTime[0]
      this.searchForm.passTimeEnd = fixTime[1]
    },
    handleSizeChange(val) {
      this.ep_page.size = val
      this.refresh(false)
    },
    handleCurrentChange(val) {
      this.ep_page.page = val
      this.refresh(false)
    },

    handleSelectionChange(val) {
      this.selectLength = val.length
      this.selectItems = val
    },
    searchCallback(json) {
      // 搜索成功回调，做特殊处理在此
      let res = json.map.data.content
      let res1 = json.map.data
      if (res1 == null) {
        // console.log('1111111', res1)
        this.ep_data = []
      } else {
        let table_data = []
        res.forEach(function(item, index) {
          res[index]['link'] = res[index].id
        })
      }
    },
  
  },
  data() {
    return {
      allData: '',
      counter: 0,
      optType: '1',
      applyLoading: false,
      fileUploadLoading: false,
      loading: false,
      listApi: 'findValueMapping', // 搜索，取api.json里面的key值
      deleteData: 'enterpriseDelete',
      //importLoading: false,
      settings: {
        pk: 'id' // 主键
      },
      headColor: true,
      searchForm: {
      preIncreaseName:"",
      },
      bodyForm: {
 
      },
      selectLength: 0,
      selectItems: [],
      totalcount: 0,
      doEdit: false,
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      ep_data: [] //表格数据
    }
  }
}
</script>

<style></style>
