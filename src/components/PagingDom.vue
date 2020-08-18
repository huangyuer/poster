<template>
   <div>

		<div class="panel-main-content">
			<!--筛选栏组-->
			<!-- <div class="search-card contents-card card-margin">
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
			</div> -->
			<!--表格-->
			<div class="ep-card card-margin relative">
				<div class="card-body">
					

					<div class="block">
						<ep-table ref="table" :height="400" :data="tableData" :head-color="true" @row-dblclick="detailInfo" :loading="loading" >
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
		name:"PagingDom",
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
                totalcount:0,
                tableData:[],
                customSearch:{

                }
                }
                
			},
			watch:{

			},
			props:{
                data:{
                    type:Array
                }
				// isflash:Boolean,
				// searchForm:{
				// 		type: Object
				// },
				// listApi:String
            },
            mounted(){
                this.makePaging(this.ep_page.size,this.ep_page.page,this.data)
            },
			methods:{
				detailInfo(event, row, index){
					this.$emit("row-dblclick",event, row, index)
                },
                filterData(condition,data){
                let filter = (condition, data) => {
                    return data.filter( item => {
                    return Object.keys( condition ).every( key => {
                        if(condition[ key ] == '') return true
                        let diff = key == 'gdsNm' 
                        ? String( item[ key ] ).toLowerCase().indexOf( String( condition[ key ] ).trim().toLowerCase() ) !== -1
                        : String( item[ key ] ).toLowerCase() == String( condition[ key ] ).trim().toLowerCase()
                        return diff
                    })
                    
                    })
                }
                return filter(condition,data)
                },
                handleSizeChange(val){
                this.ep_page.size = val
                this.makePaging(this.ep_page.size,this.ep_page.page, this.filterData(this.customSearch,this.data))
                },
                handleCurrentChange(val){
                this.ep_page.page = val
                this.makePaging(this.ep_page.size,this.ep_page.page,this.filterData(this.customSearch,this.data))
                },
                makePaging(size,page,data){
                let begin = (page-1)*size
                let end = begin + size
                let newData = data.slice(begin,end)
                this.totalcount = data.length
                this.tableData = newData
                },
			}

    }
</script>

<style scoped>
    

</style>