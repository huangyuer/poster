<template>
<div>

    
            <ep-model title="单证列表" v-model="modelFlag" width="850px" :wrap-close="false">
        <div class="search-table" >
                <div class="ep-card card-margin relative" style="top:10px;">
                    <div class="card-body" v-show="onedata.businessType!=4">
                        <div class="block">
                        <!-- <ep-button type="primary" size="small" icon="checkmark-round" @click="successResult" v-show="onedata.businessType!=5" :loading="applyLoading">已解决</ep-button> -->
                        </div>
                        <div class="block">
                        <ep-table ref="table" :height="400" :data="ep_data" :head-color="true"   :loading="loading" >
                             <!-- <ep-table-item type="select"></ep-table-item> -->
                            <ep-table-item column="businessNo" title="单证号" width="300">
                                     <template slot-scope="props">
                                        <p class="declareNoHover" style="cursor:pointer;color:#3f88bf;"  @click="searchList(props.row.businessNo,props.row.businessType)">{{props.row.businessNo}}</p>
                                    </template>
                            </ep-table-item>
                            <ep-table-item column="businessType" title="业务类型"  :formatter="businessTypeChange" ></ep-table-item>
						</ep-table>
                        </div>
                        <div class="block">
                        <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
                        </div>
                    </div>

                     <div class="card-body" v-show="onedata.businessType==4">
                        <div class="block">
                        <!-- <ep-button type="primary" size="small" icon="checkmark-round" @click="successResult" v-show="onedata.businessType!=5" :loading="applyLoading">已解决</ep-button> -->
                        </div>
                        <div class="block">
                        <ep-table ref="table" :height="400" :data="ep_data" :head-color="true"   :loading="loading" >
                             <!-- <ep-table-item type="select"></ep-table-item> -->
                            <ep-table-item column="businessNo" title="预录入编号" width="200">
                                     <template slot-scope="props">
                                        <p class="declareNoHover" style="cursor:pointer;color:#3f88bf;"  @click="searchList(props.row.businessNo,props.row.businessType)">{{props.row.businessNo}}</p>
                                    </template>
                            </ep-table-item>
                            <ep-table-item column="rmk" title="核注清单编号"  width="220"></ep-table-item>
                            <ep-table-item column="businessType" title="业务类型"  :formatter="businessTypeChange" ></ep-table-item>
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
    
    name:"differentCard",
    extends: misList,
    props:{
        fresh:{
            type:Boolean,
            default:false
        },
        searchStatusId:{
            type:String
        },
        onedata:{
            type:Object
        }
    },
    data(){
        return{
            loading:false,
            totalcount:0,
            applyLoading:false,
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
            
            listApi: 'lockGetPreMonitorWarnList'
            
        }
    },
    computed:{
        // listApi(){
        //     return  'orgGetTrdStatus'
        // },
       
        searchForm(){
            let data = {}
            data.businessType = this.searchStatusId
            data.page = this.ep_page.page
            data.size = this.ep_page.size
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
                // if(this.onedata.businessType==5){
                //     setTimeout(() => {
                //       $($(".eptb_1_column_3")[0]).text("时间")
                //     }, 100);
                // }else{
                //     setTimeout(() => {
                //       $($(".eptb_1_column_3")[0]).text("状态")
                //     }, 100);
                // }
                //  if(this.onedata.businessType==4){
                //     setTimeout(() => {
                //       $($(".eptb_1_column_0")[0]).text("核注清单编号")
                //     }, 100);
                // }else{
                //    setTimeout(() => {
                //       $($(".eptb_1_column_0")[0]).text("单证号")
                //     }, 100);
                // }
                
            }else{
                this.modelFlag = false
            }
        }
    },
    filters:{
        optStatusChange(row){
            console.log(row)
            if(row=="0"){
                return "未解决"
            }
            if(row=="1"){
                return "已解决"
            }
        },
    },
    mounted(){
        //  this.refresh(true)
        console.log($)
    },
    methods:{
        searchList(businessNo,type){
            if(type==1){
                 let menusList = this.$store.getters.getMenuTabInstance.items;
                    menusList.forEach(function(item, index) {
                    if (item.name == "账册报核查询") {
                        menusList.splice(index, 1);
                    }
                    });
                    this.$router.push({name: "首页"})
                    setTimeout(()=>{
                         this.$router.push({path:"/verificationInfo",query:{searchName:businessNo}})
                    },10)
            }
            if(type==2){
                     let menusList = this.$store.getters.getMenuTabInstance.items;
                    menusList.forEach(function(item, index) {
                    if (item.name == "业务申报表查询") {
                        menusList.splice(index, 1);
                    }
                    });
                    this.$router.push({name: "首页"})
                    setTimeout(()=>{
                         this.$router.push({path:"/businessDeclarationInfo",query:{searchName:businessNo}})
                    },10)
               
            }
            if(type==3){
                   let menusList = this.$store.getters.getMenuTabInstance.items;
                    menusList.forEach(function(item, index) {
                    if (item.name == "出入库单查询") {
                        menusList.splice(index, 1);
                    }
                    });
                    this.$router.push({name: "首页"})
                    setTimeout(()=>{
                         this.$router.push({path:"/inoutStockInfo",query:{searchName:businessNo}})
                    },10)
            }
            if(type==4){
                  let menusList = this.$store.getters.getMenuTabInstance.items;
                    menusList.forEach(function(item, index) {
                    if (item.name == "核注清单查询") {
                        menusList.splice(index, 1);
                    }
                    });
                    this.$router.push({name: "首页"})
                    setTimeout(()=>{
                         this.$router.push({path:"/findBondInvtPage",query:{searchName:businessNo}})
                    },10)
            }
            if(type==5){
                  let menusList = this.$store.getters.getMenuTabInstance.items;
                    menusList.forEach(function(item, index) {
                    if (item.name == "核放单查询") {
                        menusList.splice(index, 1);
                    }
                    });
                    this.$router.push({name: "首页"})
                    setTimeout(()=>{
                         this.$router.push({path:"/nuclearReleaseInfo",query:{searchName:businessNo}})
                    },10)
            }
        },
        
        
        businessTypeChange(row,index){
            if(row.businessType=="1"){
            return "账册核销到期提醒"
            }
            if(row.businessType=="2"){
                return "业务申报表到期提醒"
            }
            if(row.businessType=="3"){
                return "出入库单未集报提醒"
            }
            if(row.businessType=="4"){
                return `核注清单超${this.onedata.preMonitorWarn[0].rmk}天未核扣提醒`
            }
            if(row.businessType=="5"){
                return "被布控的核放单"
            }
        },
        successResult(){
           let selectData =  this.$refs.table.getData("select")
           if(selectData.length==0){
               this.$pop({
                    type: "danger",
                    message: "请选择一条单子！"
                });
                return
           }
            this.$confirm({
                    word: "是否要更改选中的单证状态?",
                    callback: errorInfo => {
                    if (errorInfo) {
                        this.applyLoading = true
                        let bwsBscIds = [];
                        selectData.forEach(c => {
                        if (c.id) {
                            bwsBscIds.push(c.id);
                        }
                        });
                        let data = {};
                        data["ids"] = bwsBscIds;
                        this.$post("lockUpdatePreMonWarStatus", data)
                        .then(res=> {
                            this.refresh(true);
                            this.applyLoading = false
                        })
                        .catch(e => {
                            this.applyLoading = false;
                        });
                    } else {
                    }
                    }
                });
        },
        refresh(){
            this.$post("lockGetPreMonitorWarnList",this.searchForm).then(res=>{
                this.ep_data=res.map.data.content
                this.totalcount = res.map.data.totalElements
            })
        }
    }
}
</script>



<style scoped>
    .declareNoHover:hover{
    text-decoration: underline;
  }
</style>