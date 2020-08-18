<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <ep-form ref="searchForm" :form="searchForm" name-width="120px">
          <ep-row :gutter="7">
            <ep-col :col="8">
              <ep-form-item  attr="G_NAME" label="商品名称">
                <ep-input  v-model="searchForm.gName" name="gName" :maxlength="50"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="CODE_S" label="CODE_S">
                <ep-input  v-model="searchForm.codeS" name="codeS" :maxlength="100"></ep-input>
              </ep-form-item>
            </ep-col>
			<ep-col :col="8">
              <ep-form-item attr="CODE_T" label="商品编码">
                <ep-input  v-model="searchForm.codeT" name="codeT" :maxlength="100"></ep-input>
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
          <ep-table ref="table" :data="ep_data"  
              @selection-change="handleSelectionChange" can-edit :loading="loading">
            <ep-table-item type="select"></ep-table-item>
            <ep-table-item column="codeT" title="CODE_T" width="200"></ep-table-item>
            <ep-table-item column="codeS" title="CODE_S" width="200"></ep-table-item>
			
            <ep-table-item column="gname" title="G_NAME" width="180"></ep-table-item>
             <ep-table-item column="lowRate" title="LOW_RATE" width="180"></ep-table-item>
            <ep-table-item column="highRate" title="HIGH_RATE" width="200"></ep-table-item>
            <ep-table-item column="outRate" title="OUT_RATE" width="180"></ep-table-item>
             <ep-table-item column="regMark" title="REG_MARK" width="180"></ep-table-item>
			 <ep-table-item column="regRate" title="REG_RATE" width="200"></ep-table-item>
            <ep-table-item column="taxType" title="TAX_TYPE" width="180"></ep-table-item>
             <ep-table-item column="taxRate" title="TAX_RATE" width="180"></ep-table-item>
			 <ep-table-item column="commRate" title="COMM_RATE" width="200"></ep-table-item>
            <ep-table-item column="taiwanRat" title="TAIWAN_RAT" width="180"></ep-table-item>
             <ep-table-item column="otherType" title="OTHER_TYPE" width="180"></ep-table-item>
			 <ep-table-item column="otherRate" title="OTHER_RATE" width="200"></ep-table-item>
            <ep-table-item column="unit1" title="UNIT_1" width="180"></ep-table-item>
             <ep-table-item column="unit2" title="UNIT_2" width="180"></ep-table-item>
			 <ep-table-item column="ilowPrice" title="ILOW_PRICE" width="200"></ep-table-item>
            <ep-table-item column="ihighPrice" title="IHIGH_PRIC" width="180"></ep-table-item>
             <ep-table-item column="elowPrice" title="ELOW_PRICE" width="180"></ep-table-item>
			 
			 
			 <ep-table-item column="ehighPrice" title="EHIGH_PRIC" width="180"></ep-table-item>
             <ep-table-item column="maxIn" title="MAX_IN" width="180"></ep-table-item>
			 <ep-table-item column="maxOut" title="MAX_OUT" width="200"></ep-table-item>
            <ep-table-item column="controlMa" title="CONTROL_MA" width="180"></ep-table-item>
             <ep-table-item column="chkPrice" title="CHK_PRICE" width="180"></ep-table-item>
			 <ep-table-item column="tarifMark" title="TARIF_MARK" width="200"></ep-table-item>
            <ep-table-item column="noteS" title="NOTE_S" width="180"></ep-table-item>
             <ep-table-item column="serverId" title="SERVER_ID" width="180"></ep-table-item>
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
    name: 'ComplexInfo',

    extends: misList,
    created() {
      this.refresh(true)
    },

    data () {
      return {
        loading: false,
        listApi: 'queryComplex',
       
        settings: {
          pk: 'rechargeType'
        },
        searchForm: {
        G_NAME : '',
		CODE_S : ''
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
