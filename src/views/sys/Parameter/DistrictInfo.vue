<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <ep-form ref="searchForm" :form="searchForm" name-width="120px">
          <ep-row :gutter="7">
            <ep-col :col="9">
              <ep-form-item attr="districtCode" label="境内目的地代码">
                <ep-input placeholder="境内目的地代码" v-model="searchForm.districtCode" name="districtCode" :maxlength="30"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="9">
              <ep-form-item attr="districtName" label="境内目的地">
                <ep-input placeholder="境内目的地" v-model="searchForm.districtName" name="districtName" :maxlength="50"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="9">
              <ep-form-item attr="districtFlag" label="境内目的地标志">
                <ep-input placeholder="境内目的地标志" v-model="searchForm.districtFlag" name="districtFlag" :maxlength="50"></ep-input>
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

          <ep-button type="primary" size="small" @click="doRefresh" icon="ios-refresh">刷新</ep-button>
        </div>
        <div class="block">
          <ep-table ref="table" :height="400" :data="ep_data" @selection-change="handleSelectionChange" can-edit :loading="loading">
            <ep-table-item type="select"></ep-table-item>
            <ep-table-item column="id" title="序号" width="120" :is-edit="false"></ep-table-item>
            <ep-table-item column="districtCode" title="境内目的地代码" width="180"></ep-table-item>
            <ep-table-item column="districtName" title="境内目的地" width="270"></ep-table-item>
            <ep-table-item column="districtFlag" title="境内目的地标志" width="140"></ep-table-item>

          </ep-table>
        </div>
        <div class="block">
          <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.offset" :page-size="ep_page.limit" :total-num="totalcount"></ep-pager>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import misList from "src/common/mislist";

export default {
  name: "DistrictInfo",

  extends: misList,

  created() {
    this.refresh(true);
  },

  data() {
    return {
      loading: false,
      listApi: "queryDistrict",
      saveApi: "bizItemSave",
      settings: {
        pk: "id"
      },
      searchForm: {},
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
