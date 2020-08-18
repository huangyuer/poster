<template>
<div>


    <ep-model title="涉及转人工商品编码" v-model="modelFlag" width="1250px" :wrap-close="false">
        <div class="search-table">
                <div class="ep-card card-margin relative" style="top:10px;">
                    <div class="card-body">
                        <div class="block">
                         <ep-form ref="formInput" :form="formInput" name-width="120px" :rules="page_rules" v-if="isShowModel">
                                <ep-row :gutter="7">
                                    <ep-col :col="8">
                                        <ep-form-item label="账户编号" attr="putrecNo"   >
                                            <ep-select v-model="formInput.putrecNo" name="putrecNo" > 
                                            <ep-select-item v-for="(item, index) in putre" :key="index" :index="item" :label="item"></ep-select-item>
                                            </ep-select>
                                        </ep-form-item>
                                    </ep-col>
                                     <ep-col :col="8">
                                        <ep-form-item label="商品编码" attr="gdecd"   >
                                             <ep-input v-model="formInput.gdecd" name="gdecd" ></ep-input>
                                        </ep-form-item>
                                    </ep-col>
                                    <ep-col :col="16">
                                         <ep-form-item label="描述" attr="rmk">
                                     <ep-input 
                                        v-model="formInput.rmk"
                                        name="rmk"
                                        :rows="4"
                                        type="textarea"
                                        ></ep-input>
                                         </ep-form-item>
                                         </ep-col>
                                    <ep-col :col="8" style="padding-top: 3px;">
                                        <ep-button type="primary" size="small" @click="makeSure" :loading="saveLoading"  icon="checkmark-round">确定</ep-button>
                                    </ep-col>
                                </ep-row>
                                
                        </ep-form>
                        </div>
                        <div class="block">
                            <ep-button type="primary" size="small" @click="add" icon="plus-round">新增</ep-button>
                            <ep-button type="primary" size="small" @click="update" icon="edit">修改</ep-button>
                            <ep-button type="danger" size="small"   @click="delect" icon="trash-a">删除</ep-button>
                            <ep-button type="primary" size="small" @click="refresh(true)" icon="search" :loading="loading">查询</ep-button>
                        </div>
                        <div class="block">
                               
                        <ep-table ref="table" :height="400" :data="ep_data" :head-color="true"  :loading="loading">
                        <ep-table-item type="select"></ep-table-item>
                            <ep-table-item column="emsNo" title="账户编号" ></ep-table-item>
                            <ep-table-item column="gdecd" title="商品编码"  ></ep-table-item>
                            <ep-table-item column="rmk" title="描述"  ></ep-table-item>
                         
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
    
    name:"artificialInfo",
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
        },
        putre:{
           
        }
    },
    data(){
        return{
            isShowModel:false,
            loading:false,
            totalcount:0,
            formInput:{
                putrecNo:"",
                gdecd:"",
                id:"",
                rmk:""
            },
            saveLoading:false,
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
           
            listApi: 'emsArticifalGdecdGetList',
            page_rules:{
                putrecNo: { required: true, message: "不能为空", trigger: "change" },
                gdecd: { required: true, message: "不能为空", trigger: "change" },
            }
            
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
                this.isShowModel = false
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
         this.refresh(true)
         
        
    },
    methods:{
        add(){
            this.isShowModel = true
            this.formInput.id =""
            this.formInput.putrecNo = ""
            this.formInput.gdecd = ""
            this.formInput.rmk= ""
        },  
        delect(){
            let selectData = this.$refs.table.getData("select")
            if(selectData.length==0){
                this.$pop({
                        type: "danger",
                        message: "请选择一条数据！"
                    });
                    return
            }
            this.$confirm({
            word: "是否要删除选中的数据？",
            callback: errorInfo => {
            if (errorInfo) {
                    let id = []
                    selectData.forEach((e)=>{
                        id.push(e.id)
                    })
                    this.$post("emsArticifalGdecdDelete",{ids:id}).then(res=>{
                            this.refresh(true)
                    })
            }}})
           
        },
        update(){
           
            let selectData = this.$refs.table.getData("select")
            if(selectData.length!=1){
                this.$pop({
                        type: "danger",
                        message: "请选择一条数据！"
                    });
                    return
            }
            this.isShowModel = true
            this.formInput.id = selectData[0].id
            this.formInput.putrecNo = selectData[0].emsNo
            this.formInput.gdecd = selectData[0].gdecd
            this.formInput.rmk = selectData[0].rmk
        },
        makeSure(){
            this.$refs["formInput"].validate(valid => {
                if(valid){
                    this.saveLoading = true
                    this.$post("emsArticifalGdecdSave",this.formInput).then(res=>{
                        
                        this.saveLoading = false
                        this.$refs.formInput.reset()
                        this.refresh(true)
                        this.isShowModel = false
                    })
                    .catch(()=>{
                        this.saveLoading = false
                    })
                }else{
                     this.$pop({
                        type: "danger",
                        message: "表单验证失败！"
                    });
                    return
                }
            })
            
        },
       
      
    
    }
}
</script>



<style>

</style>