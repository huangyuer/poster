<template>
   <div>

		<div class="panel-main-content">
			<!--筛选栏组-->
			<div class="search-card contents-card card-margin">
				<div class="panel panel-default">
					<div class="card-title zero-padding"><span class="weight">查询列表</span></div>
					<ep-form ref="searchForm" :form="searchForm" name-width="120px">
						<ep-row :gutter="7">
                             <slot name="out-form">

                             </slot>
							
              	
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
						<span style="color:red;font-size:25px;padding-top:8px;padding-left:3px;">*</span>
						<span style="padding-top: 10px;font-size: 4px;color: rgba(0,0,0,.87);">双击列表信息，可进入详情页面</span>
					</div>

					<div class="block">
						<ep-table ref="table" :height="400" :data="ep_data" :head-color="true" @row-dblclick="detailInfo" :loading="loading" >
                             <slot name="out-table">
                                 
                             </slot>
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
import misList from "src/common/mislist";
    export default {
		name:"searchTable",
		extends: misList, 
        data(){
			return {
				settings: {
					pk: "id" // 主键
				},
				loading:false,
				ep_data:[],
				ep_page: {
					// 分页
					size: 10,
					page: 1,
				
				},
				totalcount:0
				}
			},
			watch:{

			},
			props:{
				isflash:Boolean,
				searchForm:{
						type: Object
				},
				listApi:String
			},
			methods:{
				detailInfo(event, row, index){
					this.$emit("row-dblclick",row)
				}
			}

    }
</script>

<style scoped>
    

</style>