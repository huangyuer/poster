<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="card-title zero-padding">
          <span class="weight">查询列表</span>
        </div>
        <ep-form ref="searchForm" :form="searchForm" name-width="120px">
          <ep-row :gutter="7">
            <ep-col :col="8">
              <ep-form-item  attr="cutMode" label="代码">
                <ep-input  v-model="searchForm.cutMode" name="cutMode" :maxlength="50"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="abbrCut" label="简称">
                <ep-input  v-model="searchForm.abbrCut" name="abbrCut" :maxlength="100"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="fullCut" label="全称">
                <ep-input  v-model="searchForm.fullCut" name="fullCut" :maxlength="100"></ep-input>
              </ep-form-item>
            </ep-col>

            <ep-col :col="4">
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
          <!-- <ep-button type="primary" size="small" @click="doInit" icon="android-sync" :loading="syncLoading">同步</ep-button> -->
        </div>
        <div class="block">
          <ep-table ref="table" :height="400" :data="ep_data"  
              @selection-change="handleSelectionChange" can-edit :loading="loading" head-color>
            <ep-table-item type="select"></ep-table-item>
            <ep-table-item column="cutMode" title="代码" width="200"></ep-table-item>
            <ep-table-item column="abbrCut" title="简称" width="180"></ep-table-item>
            <ep-table-item column="fullCut" title="全称" width="180"></ep-table-item>
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
    name: 'queryCutMode',

    extends: misList,
    created() {
      this.refresh(true)
    },

    data () {
      return {
        syncLoading: false,
        loading: false,
        listApi: 'getLevytypeList',
       
        settings: {
          pk: 'id'
        },
        searchForm: {
        cutMode : '',
        abbrCut : '',
        fullCut:""
        },
        selectLength: 0,
        totalcount: 0,
        ep_page: {
          size: 10,
          page: 1
        },
        ep_data: []
      }
    },
    methods: {
      doInit() {
        this.syncLoading = true;
        this.$post("initLevytype", {})
          .then(res => {
            this.syncLoading = false;
          })
          .catch(e => {
            console.error(e)
            this.syncLoading = false;
          });
      }
    }
  }
</script>
