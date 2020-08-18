<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <ep-form ref="searchForm" :form="searchForm" name-width="140px">
          <ep-row :gutter="7">
            <ep-col :col="9">
              <ep-form-item attr="countryCode" label="国家代码">
                <ep-input placeholder="国家代码" v-model="searchForm.countryCode" name="countryCode" :maxlength="30"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="9">
              <ep-form-item attr="nameCn" label="中文名称">
                <ep-input placeholder="中文名称" v-model="searchForm.nameCn" name="nameCn" :maxlength="50"></ep-input>
              </ep-form-item>
            </ep-col>
			<ep-col :col="9">
              <ep-form-item attr="nameEn" label="英文名称">
                <ep-input placeholder="英文名称" v-model="searchForm.nameEn" name="nameEn" :maxlength="50"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="6">
              <ep-button type="warning" size="small" @click="reset('searchForm')">重置</ep-button>
              <ep-button type="primary" size="small" @click="refresh(true)" icon="search" :loading="loading">查询</ep-button>
            </ep-col>
          </ep-row>
        </ep-form>
      </div>
    </div>
    <!--表格-->
    <div class="ep-card card-margin relative">
      
      <div class="card-body">
        <div class="block">
         
          <ep-button type="primary" size="small" @click="doRefresh" icon="ios-refresh">刷新</ep-button>
        </div>
        <div class="block">
          <ep-table ref="table" :height="400" :data="ep_data"  
              @selection-change="handleSelectionChange" can-edit :loading="loading">
            <ep-table-item type="select"></ep-table-item>
            <ep-table-item column="id" title="序号" width="120" :is-edit="false"></ep-table-item>
            <ep-table-item column="countryCode" title="国家代码" width="180"></ep-table-item>
            <ep-table-item column="nameCn" title="中文名称" width="270"></ep-table-item>
            <ep-table-item column="nameEn" title="英文名称" width="140"></ep-table-item>
          
          </ep-table>
        </div>
        <div class="block">
          <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange"
            :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
  import misList from 'src/common/mislist'

  export default {
    name: 'CountryInfo',

    extends: misList,

    created () {
      this.refresh(true)
    },

    data () {
      return {
        loading: false,
        listApi: 'queryCountry',
      
        settings: {
          pk: 'id'
        },
        searchForm: {
          countryCode: '',
          nameCn: '',
		   nameEn: '',
          orderBy: 'id,desc'
        },
        selectLength: 0,
        totalcount: 0,
        ep_page: {
          size: 10,
          page: 1
        },
        ep_data: []
      }
    }
  }
</script>
