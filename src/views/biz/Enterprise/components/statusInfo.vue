<template>
<div>


    <ep-model title="企业操作记录" v-model="modelFlag" width="1350px" :wrap-close="false">
        <div class="search-table">
                <div class="ep-card card-margin relative" style="top:10px;">
                    <div class="card-body">
                        <div class="block">
                       
                        <div style="display: inline-block;margin-left:20px;">
                            <!-- <span>商品料号</span>
                                <ep-input v-model="searchForm.gdsMtno" style="width:150px;display:inline-block;font-size:14px"></ep-input>
                                <ep-button type="primary" size="small"  icon="ios-search" @click="refresh(true)">查询</ep-button> -->
                        </div>
                        
                        </div>
                        <div class="block">
                        <ep-table ref="table" border :height="400" :data="ep_data" :head-color="true"  :loading="loading">
                        <!-- <ep-table-item type="select"></ep-table-item> -->
                            <ep-table-item column="optUserId" title="操作人" width="200"></ep-table-item>
                            <ep-table-item column="createtime" title="创建时间" width="200"></ep-table-item>
                            <ep-table-item column="optStatus" title="操作状态" :formatter="statusFormatter" width="200"></ep-table-item>
                            <ep-table-item column="remark" title="备注"></ep-table-item>
                        </ep-table>
                        </div>
                        <!-- <div class="block">
                        <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
                        </div> -->
                    </div>
                </div>
        </div>
    </ep-model>
    </div>
</template>



<script>
import misList from "src/common/mislist";
export default {
    
    name:"statusinfo",
    extends: misList,
    props:{
        needDate:{
            type:Object
        },
        fresh:{
            type:Boolean,
            default:false
        },
        searchStatusId:{
            type:String
        }
    },
    data(){
        return{
            loading:false,
            totalcount:0,
            gdsMtno:"",
            ep_data:[],
            ep_page:{
                page:1,
                size:10
            },
            modelFlag:false,
             settings: {
                pk: "id" // 主键
            },
           
            // listApi: 'bondInvtListGetBondInvtDt',
            
        }
    },
    computed:{
        // listApi(){
        //     return  'orgGetTrdStatus'
        // },
        searchForm(){
            let data = {}
            data.pid = this.searchStatusId
            return  data
        }
    },
    watch:{
        modelFlag(value){
            if(!value){
                this.$emit("nowFlagChange",false)
            }
        },
        fresh (value){
            if(value){  
                this.modelFlag = true
                this.refresh(true)
                
            }else{
                this.modelFlag = false
            }
        }
    },

    mounted(){
        //  this.refresh(true)
    },
    methods:{
        refresh(){
            this.$post("orgGetTrdStatus",this.searchForm).then(res=>{
                this.ep_data=res.map.data
            })
        },
        addData(){
            
        },
    statusFormatter (row, index) {

        if (row.optStatus == '1') {
          return '暂存'
        } else if (row.optStatus == '18') {
          return '已申报'
        } else if(row.optStatus == '3'){
          return '海关入库'
        }else if(row.optStatus == '4'){
          return '海关入库失败'
        }else if(row.optStatus == '5'){
          return '审核通过'
        }else if(row.optStatus == '17'){
          return '转人工'
        }else if(row.optStatus == '6'){
          return '审核拒绝'
        }
      },
    }
}
</script>



<style>

</style>