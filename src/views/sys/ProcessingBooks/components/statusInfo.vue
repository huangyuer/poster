<template>
<div>


    <ep-model title="商品编码" v-model="modelFlag" width="1350px" :wrap-close="false">
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
                        <ep-table ref="table" :height="400" :data="ep_data" :head-color="true"  :loading="loading">
                        <!-- <ep-table-item type="select"></ep-table-item> -->
                            <ep-table-item column="gdecd" title="商品编码" width="200"></ep-table-item>
                            <ep-table-item column="originalLawfUnitcd" title="原法定计量单位" width="200" :formatter="originalLawfUnitcdTranslate"></ep-table-item>
                            <ep-table-item column="lawfUnitcd" title="法定计量单位" width="200" :formatter="lawfUnitcdTranslate"></ep-table-item>
                            <ep-table-item column="originalSecdLawfUnitcd" title="原第二法定计量单位" :formatter="originalSecdLawfUnitcdTranslate"></ep-table-item>
                            <ep-table-item column="secdLawfUnitcd" title="第二法定计量单位" :formatter="secdLawfUnitcdTranslate"></ep-table-item>
                         
                        </ep-table>
                        </div>
                        <div class="block">
                        <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
                        </div>
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
           default:""
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
           
            listApi: 'paramModifyGdecdGetDetail',
            
        }
    },
    computed:{
        // listApi(){
        //     return  'orgGetTrdStatus'
        // },
        searchForm(){
            let data = {}
            data.id = this.searchStatusId

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
        lawfUnitcdTranslate(row, index) {
            let UnitList = this.$store.getters.getUnitList;
            for (let i = 0; i < UnitList.length; i++) {
                if (row.lawfUnitcd == UnitList[i].unit) {
                return UnitList[i].unitName+" "+UnitList[i].unit;
                }
            }
        },
        originalLawfUnitcdTranslate(row, index) {
            let UnitList = this.$store.getters.getUnitList;
            for (let i = 0; i < UnitList.length; i++) {
                if (row.originalLawfUnitcd == UnitList[i].unit) {
                return UnitList[i].unitName+" "+UnitList[i].unit;
                }
            }
        },
        originalSecdLawfUnitcdTranslate(row, index) {
            let UnitList = this.$store.getters.getUnitList;
            for (let i = 0; i < UnitList.length; i++) {
                if (row.originalSecdLawfUnitcd == UnitList[i].unit) {
                return UnitList[i].unitName+" "+UnitList[i].unit;
                }
            }
        },
        secdLawfUnitcdTranslate(row, index) {
            let UnitList = this.$store.getters.getUnitList;
            for (let i = 0; i < UnitList.length; i++) {
                if (row.secdLawfUnitcd == UnitList[i].unit) {
                return UnitList[i].unitName+" "+UnitList[i].unit;
                }
            }
        },
        addData(){
            
        },
    
    }
}
</script>



<style>

</style>