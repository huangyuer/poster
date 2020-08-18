<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="card-title zero-padding"><span class="weight">菜单列表</span></div>
        <ep-form ref="searchForm" :form="searchForm" name-width="90px">
          <ep-row :gutter="7">
            <ep-col :col="6">
              <ep-form-item attr="eq_menuCode" label="菜单编码">
                <ep-input placeholder="菜单编码" v-model="searchForm.eq_menuCode" name="eq_menuCode" :maxlength="20"></ep-input>
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
      <div v-if="selectLength !== 0" class="ep-table-selected-header">
        选择了 {{ selectLength }} 项
        <span style="text-align: right">
          <ep-button type="text" icon="trash-a" @click="doDelete"></ep-button>
        </span>
      </div>
      <div class="card-body">
        <div class="block">
          <ep-button type="primary" size="small" @click="doAdd" icon="plus">新增</ep-button>
          <ep-button type="success" size="small" @click="doSave" icon="edit">保存</ep-button>
          <ep-button type="warning" size="small" @click="doReset" icon="pricetag">重置</ep-button>
          <ep-button type="primary" size="small" @click="doRefresh" icon="ios-refresh">刷新</ep-button>
        </div>
        <div class="block">
          <ep-table ref="table" :data="ep_data" :height="700"
            @selection-change="handleSelectionChange" can-edit :loading="loading">
            <!-- 表格item在此 -->
          </ep-table>
        </div>
        <div class="block">
          <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange"
            :now-page="ep_page.offset" :page-size="ep_page.limit" :total-num="totalcount"></ep-pager>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
  import misList from 'src/common/mislist'

  export default {
    name: 'testRouter',  // 保持和文件名一致，否则keep-alive不会动态缓存

    extends: misList,  // 务必继承

    created () {
      this.refresh(true)  // 调用继承方法
    },

    mounted () {
      
    },

    methods: {
      searchCallback (json) {
        // 搜索成功回调，做特殊处理在此
      }
    },

    data () {
      return {
        loading: false,
        listApi: 'menusSearch',  //搜索，取api.json里面的key值
        saveApi: 'menuSave',     //保存，取api.json里面的key值
        settings: {
          pk: 'id'    // 主键
        },
        searchForm: {    // 筛选条件
          eq_menuCode: ''
        },
        selectLength: 0,
        totalcount: 0,
        ep_page: {    // 分页
          limit: 10,
          offset: 1
        },
        ep_data: []    //表格数据
      }
    }
  }
</script>