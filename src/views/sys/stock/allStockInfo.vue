<template>
	<div>

		<div class="panel-main-content">
			<!--筛选栏组-->
			<div class="search-card contents-card card-margin">
				<div class="panel panel-default">
					<div class="card-title zero-padding"><span class="weight">查询列表</span></div>
					<ep-form ref="searchForm" :form="searchForm" name-width="120px">
						<ep-row :gutter="7">
             
                            <ep-col :col="6" >
                                <ep-form-item label="账册号" attr="putrecNo">
                                    <ep-select v-model="searchForm.putrecNo" name="putrecNo">
                                        <ep-select-item v-for="(item, index) in getAccountBook" :key="index" :index="item.accountNo" :label="item.accountNo"></ep-select-item>
                                    </ep-select>
                                </ep-form-item>
                            </ep-col>
                            <ep-col :col="6" >
                                <ep-form-item label="备案序号" attr="gdsSeqno">
                                    <ep-input v-model="searchForm.gdsSeqno" name="gdsSeqno" ></ep-input>
                                </ep-form-item>
                            </ep-col>
                            <ep-col :col="6" >
                                <ep-form-item label="料件成品类型" attr="mtpckEndprdTypecd">
                                    <!-- <ep-input v-model="searchForm.mtpckEndprdTypecd" name="mtpckEndprdTypecd" ></ep-input> -->
                                    <ep-select  v-model="searchForm.mtpckEndprdTypecd" name="mtpckEndprdTypecd">
                                        <ep-select-item index="I" label="I-料件"></ep-select-item>
                                        <ep-select-item index="E" label="E-成品"></ep-select-item>
                                    </ep-select>
                                </ep-form-item>
                            </ep-col>

              
						</ep-row>
						<ep-row :gutter="7">
							<ep-col :col="24">
								<ep-button type="warning" size="small" icon="refresh" @click="reset('searchForm')">重置</ep-button>
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
					
						<!-- <span style="color:red;font-size:25px;position:absolute;padding-top:8px;padding-left:3px;">*</span>
						<span style="padding-top: 10px;padding-left: 13px;position: absolute;font-size: 4px;color: rgba(0,0,0,.87);">双击列表信息，可进入详情页面</span> -->
					</div>

					<div class="block">
						<ep-table ref="table" :height="400" :data="ep_data" :head-color="headColor" :loading="loading" >
							<!-- <ep-table-item type="select"></ep-table-item> -->
                            <ep-table-item column="totalQty" title="总库存" width="200"></ep-table-item>
							<ep-table-item column="bondInventoryQty" title="核注总库存" width="200"></ep-table-item>
                            
                            <ep-table-item column="openingQty" title="期初库存" width="200"></ep-table-item>
                            <ep-table-item column="woInventoryQty" title="工单库存" width="200"></ep-table-item>
                           
						</ep-table>
					</div>
					<!-- <div class="block">
						<ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import misList from "src/common/mislist";

export default {
  name: "allStockInfo", // 保持和文件名一致，否则keep-alive不会动态缓存

  extends: misList, // 务必继承
  components: {
    
  },

  created() {
      this.$store.dispatch('setAccountBook')
    //   console.log(this.$store.getters.getAccountBook[0])
      
    // this.refresh(true); 
  },

  mounted() {
     
  },
  computed:{
    tradeInfo(){
      return this.$store.getters.getCustomList;
    },
     getAccountBook(){
        return this.$store.getters.getAccountBook
    }
  },
  watch:{
    exportStyle(e){
      if(!e){
        this.optType = "1"
      }
    }
  },
  methods: {
    refresh(){
        this.ep_data = []
         this.$post("woInventoryGetInventoryByGdsSeqno",this.searchForm).then(res=>{
          this.ep_data.push(res.map)
        })
    },
    doDelete() {
      let selectData = this.$refs.table.getData("select")
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
        return;
      }
      this.$confirm({
        word: "是否要删除所选条目信息！",
        callback: errorInfo => {
          if (errorInfo) {
            let bwsBscIds = [];
            selectData.forEach(c => {
              if (c.id) {
                bwsBscIds.push(c.id);
              }
            });
            let data = {};
            data["bscIds"] = bwsBscIds;
            this.$post("sasCmbDelete", data)
              .then(res=> {
                this.refresh(true);
                this.$pop({
                  type: "success",
                  message: "删除成功"
                });
              })
              .catch(e => {
                this.loading = false;
              });
          } else {
          }
        }
      });
    }
   
  },
  data() {
    return {
      counter: 0,
      fileUploadLoading: false,
      exportStyle:false,
      applyLoading:false,
      optType:"1",
      loading: false,
      listApi: "", // 搜索，取api.json里面的key值
      deleteData: "enterpriseDelete",
      settings: {
        pk: "id" // 主键
      },
      searchForm: {
          putrecNo:"",
          mtpckEndprdTypecd:"",
          gdsSeqno:""
      },
      headColor: true,
      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      ep_data: [], //表格数据

      uploadData: {
        businessType: "sasCmb",
      }
    };
  }
};
</script>
