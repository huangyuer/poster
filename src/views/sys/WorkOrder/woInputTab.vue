<template>
  <div>
    <ep-model 
      title="耗用表明细"
      :wrap-close="false"
      v-model="isShowModel"
      width="1200px">
      <ep-form class="demo-form" ref="woInputModel" :form="woInputModel" name-width="168px">
        <ep-row :gutter="10">
          <!-- <ep-col :col="8">
            <ep-form-item label="领料日期" attr="takeDate">
              <ep-input v-model="woInputModel.takeDate" name="takeDate" disabled></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="扣帐编号" attr="processNo">
              <ep-input v-model="woInputModel.processNo" name="processNo" disabled></ep-input>
            </ep-form-item>
          </ep-col> -->
          <ep-col :col="8">
            <ep-form-item label="耗用类型" attr="itemType">
              <ep-select v-model="woInputModel.itemType" name="itemType" disabled>
                <ep-select-item index="1" label="料件"></ep-select-item>
                <ep-select-item index="2" label="成品"></ep-select-item>
                <ep-select-item index="3" label="半成品"></ep-select-item>
                <ep-select-item index="4" label="边角料"></ep-select-item>
                <ep-select-item index="5" label="非保"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="料号" attr="itemNo">
              <ep-input v-model="woInputModel.itemNo" name="itemNo" disabled></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="数量" attr="qty">
              <ep-input v-model="woInputModel.qty" name="qty" disabled></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="申报计量单位" attr="unit">
              <ep-select
                v-model="woInputModel.unit"
                name="unit"
                filterable
                disabled
              >
                <ep-select-item
                  v-for="(item, index) in unitList"
                  :key="index"
                  :index="item.unit"
                  :label="item.unitName+' '+item.unit"
                ></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
        </ep-row>
      </ep-form>
    </ep-model>

    <!-- 表体查询 -->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="card-title zero-padding">
          <span class="weight">查询列表</span>
        </div>
        <ep-form ref="searchForm" :form="searchForm" name-width="150px">
          <ep-row :gutter="7">
            <ep-col :col="6">
              <ep-form-item label="料号" attr="itemNo">
                <ep-input v-model="searchForm.itemNo" name="itemNo"></ep-input>
              </ep-form-item>
            </ep-col>
          </ep-row>
          <ep-row :gutter="7">
            <ep-col :col="24">
              <ep-button type="warning" size="small" @click="reset('searchForm')" icon="refresh">重置</ep-button>
              <ep-button
                type="primary"
                size="small"
                icon="search"
                @click="searchBtn"
              >查询</ep-button>
            </ep-col>
          </ep-row>
        </ep-form>
      </div>
    </div>

    <!--表格-->
    <div class="ep-card card-margin relative">
      <div class="card-body">
        <div class="block">
          <ep-table ref="woInputTable" :height="400" :data="tableData" head-color  @row-dblclick="detailInfo">
            <!-- <ep-table-item column="takeDate" title="领料日期" width="200"></ep-table-item>
            <ep-table-item column="processNo" title="扣帐编号" width="200"></ep-table-item> -->
            <ep-table-item column="itemType" title="耗用类型" width="200" :formatter="takeTypeFormatter"></ep-table-item>
            <ep-table-item column="itemNo" title="料号" width="200"></ep-table-item>
            <ep-table-item column="qty" title="数量" width="200"></ep-table-item>
            <ep-table-item column="unit" title="申报计量单位" width="150" :formatter="unitcdFormatter"></ep-table-item>
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
  name: "woOutputTab", // 保持和文件名一致，否则keep-alive不会动态缓存
  extends: misList, // 务必继承
  props: {
    woInputTable: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isShowModel: false,
      tableData: [],
      woInputModel: {
        itemType: "",
        itemNo: "",
        qty: "",
        unit: "",
      },
      searchForm: {
        itemNo: "",
      },
      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
    };
  },

  computed: {
    unitList() {
      return this.$store.getters.getUnitList;
    }
  },

  created() {},
  mounted() {
    this.makePaging(10, 1, this.woInputTable)
  },

  methods: {
    // 表体点击查询
    searchBtn(){
      let filterData = this.filterData(this.searchForm, this.woInputTable)
      this.makePaging(10,1,filterData)
      this.totalcount = filterData.length
    },

    // 过滤方法
    filterData(condition,data){
      return data.filter( item => {
        return Object.keys( condition ).every( key => {
          if(condition[ key ] == '') return true
          return String( item[ key ] ).toLowerCase() == String( condition[ key ] ).trim().toLowerCase()
        })
        
      })
    },
    handleSizeChange(val){
      this.ep_page.size = val
      this.makePaging(this.ep_page.size,this.ep_page.page, this.filterData(this.searchForm,this.woInputTable))
    },
    handleCurrentChange(val){
      this.ep_page.page = val
      this.makePaging(this.ep_page.size,this.ep_page.page,this.filterData(this.searchForm,this.woInputTable))
    },
    makePaging(size,page,data){
      let begin = (page-1)*size
      let end = begin + size
      let newData = data.slice(begin,end)
      this.totalcount = data.length
      this.tableData = newData
    },

    takeTypeFormatter(row, index) {
      if (row.itemType == '1') {
        return '料件';
      } else if (row.itemType == '2') {
        return '成品'
      } else if (row.itemType == '3') {
        return '半成品'
      } else if (row.itemType == '4') {
        return '边角料'
      } else if (row.itemType == '5') {
        return '非保'
      }
    },
    unitcdFormatter(row, index) {
      let unitList = this.unitList;
      for (let i = 0; i < unitList.length; i++) {
        if (row.unit == unitList[i].unit) {
          return unitList[i].unitName;
        }
      }
    },

    detailInfo(event, row, index) {
      this.isShowModel = true;
      this.woInputModel = row;
    },
    
  }
};
</script>