<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    
    <!--表格-->
    <!-- <div class="ep-card card-margin relative">
      <div class="card-body"> -->
        <div class="block">
        
          <div >
            
            <ep-button type="primary" size="small"  icon="checkmark-round">确认</ep-button>
           
          </div>
        </div>

        <div class="block">
          <ep-table
            ref="table"
            :height="400"
            :data="ep_data"
            :head-color="headColor"
            :border="true"
          >
            <ep-table-item type="select"></ep-table-item>
            <ep-table-item column="name1" title="序号" width="200"></ep-table-item>
            <ep-table-item column="name2" title="字段2" width="200"></ep-table-item>
            <ep-table-item column="name3" title="字段3" width="200"></ep-table-item>
            <ep-table-item column="name4" title="字段4" width="200"></ep-table-item>
          </ep-table>
        </div>
        <div class="block">
          <ep-pager
            right
            @size-change="handleSizeChange"
            @change="handleCurrentChange"
            :now-page="ep_page.page"
            :page-size="ep_page.size"
            :total-num="totalcount"
          ></ep-pager>
        </div>
      <!-- </div>
    </div> -->
  </div>
</template>
<script>
import misList from "src/common/mislist";
export default {
  mixins: [misList],
  components: {},
  props: {
   
  },
  data() {
    return {
      loading: false,
      listApi: "", 
      settings: {
        pk: "id" // 主键
      },
      searchForm: {
        
      },
      headColor: true,
      totalcount: 0,
      selectLength: 0,
      selectItems: [],
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      ep_data: [{
          name1:"测试",
          name2:"测试1",
          name3:"测试1",
          name4:"测试2",
      },{
          name1:"测试",
          name2:"测试1",
          name3:"测试1",
          name4:"测试2",
      },{
          name1:"测试",
          name2:"测试1",
          name3:"测试1",
          name4:"测试2",
      },{
          name1:"测试",
          name2:"测试1",
          name3:"测试1",
          name4:"测试2",
      }] //表格数据
    };
  },
  mounted() {
   
  },
  methods: {
      
  }
};
</script>
<style lang='less' scoped>
</style>
