<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <ep-form ref="searchForm" :form="searchForm" name-width="120px">
          <ep-row :gutter="7">
            <ep-col :col="8">
              <ep-form-item attr="transMode" label="成交方式代码">
                <ep-input placeholder="成交方式代码" v-model="searchForm.transMode" name="transMode" :maxlength="50"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="transSpec" label="成交方式名称">
                <ep-input placeholder="成交方式名称" v-model="searchForm.transSpec" name="transSpec" :maxlength="100"></ep-input>
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
        </div>
        <div class="block">
          <ep-table ref="table" :height="400" :data="ep_data" @selection-change="handleSelectionChange" can-edit :loading="loading">
            <ep-table-item type="select"></ep-table-item>
            <ep-table-item column="transMode" title="成交方式代码" width="200"></ep-table-item>
            <ep-table-item column="transSpec" title="成交方式名称" width="180"></ep-table-item>

          </ep-table>
        </div>
        <div class="block">
          <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import misList from "src/common/mislist";

export default {
  name: "TransacInfo",

  extends: misList,
  created() {
    this.refresh(true);
  },

  data() {
    return {
      loading: false,
      listApi: "queryTransac",

      settings: {
        pk: "rechargeType"
      },
      searchForm: {
        transMode: "",
        transSpec: ""
      },
      selectLength: 0,
      totalcount: 0,
      ep_page: {
        size: 10,
        page: 1
      },
      ep_data: []
    };
  }
};
</script>
