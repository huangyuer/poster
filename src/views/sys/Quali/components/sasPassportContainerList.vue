<template>
 
  <div>
       <ep-model title="集装箱" v-model="model" width="600px"  :wrap-close="false">
        <!-- <div class="ep-card card-margin relative" style="padding:10px 0;"> -->
        <ep-form ref="bodyForm" :form="bodyForm"  name-width="128px" :rules="page_rules">
        <ep-row :gutter="7">

            
            <ep-col :col="18">
            <ep-form-item attr="container" label="集装箱号">
                <ep-input v-model="bodyForm.container" name="container" :disabled="!displayBlock" :maxlength="15" ></ep-input>
            </ep-form-item>
            </ep-col>
        </ep-row>
        <div style="text-align:center">
            <ep-button type="primary" size="small" @click="makeSure()" v-show="displayBlock" icon="checkmark-round" >确定</ep-button>
            <ep-button type="danger" size="small" @click="closeModel()" icon="close" >关闭</ep-button>
        </div>
        </ep-form>
        <!-- </div> -->
    </ep-model>
    
    <!--表格-->
    <div class="ep-card card-margin relative">
    <div class="card-body">
        <div class="block" v-show="displayBlock">
        <ep-button type="primary" size="small" @click="doBodyAdd"  icon="plus-round">添加</ep-button>
        <ep-button type="primary" size="small" @click="doBodyUpdate" icon="edit">修改</ep-button>
        <ep-button type="danger" size="small"  @click="doBodyDelete"  icon="trash-a">删除</ep-button>
        </div>
        <div class="block">
        <ep-table ref="table" :height="400" :data="tableData" :head-color="headColor" @row-dblclick="lookInfo">
            <ep-table-item type="select"></ep-table-item>
            <ep-table-item column="container" title="集装箱号"></ep-table-item>
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
import { cloneObj } from "utils";

export default {
  name: "sasPassportContainerList", // 保持和文件名一致，否则keep-alive不会动态缓存
  extends: misList, // 务必继承
  components: {
   
  },
  props:{
    listDate:{
      type:Array,
      default:function(){
        return []
      }
    },
    displayBlock:{
      default:true
    }
  },
  created() {
   
  },
  mounted() {
    this.makePaging(10,1,this.listDate)
  },
  data() {
    return {
      bodyForm:{
          container:""
      },
      page_rules:{
        container: { required: true, message: "不能为空", trigger: "change" },
      },
      headColor:false,
      tableData:[],
      tableDataCopy:this.listDate,
      loading:false,
      model:false,
      ep_page:{
          page:1,
          size:10
      },
      totalcount:0,
      buttonStatus:"",
      customSearch:{}
    }
  },
  watch:{
      
  },
  methods: {
    lookInfo(event, row, index) {
      if(this.displayBlock){
        return
      }
      this.bodyForm = row;
      this.model = true;
    },
    doBodyAdd(){
        this.buttonStatus = 2
        this.model = true
    },
    doBodyDelete(){
        
      //删除table数据
      let selectData = this.$refs.table.getData("select");
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择数据"
        });
        return;
      }
      this.$confirm({
        word: "是否要删除所选条目信息！",
        callback: errorInfo => {
          if (errorInfo) {
              let allDelectIndex = []
              let selectData = this.$refs.table.getData("select")
              selectData.forEach(e=>{
                let updateDate = this.tableDataCopy.findIndex(value=>{
                  return value.leadId == e.leadId
                })
                allDelectIndex.push(updateDate)
              })
              allDelectIndex = allDelectIndex.sort((a, b) => b - a)
              allDelectIndex.forEach((num, i)=>{
                this.tableDataCopy.splice(num,1)
              })
              let filterData = this.filterData(this.customSearch,this.tableDataCopy)
              this.makePaging(10,1,filterData)
              this.ep_page.page = 1
              this.buttonStatus = 2;
          } else {
            return;
          }
        }
      });
    },
    doBodyUpdate(){
        let selectData =this.$refs.table.getData("select");
        if (selectData.length === 0) {
            this.$pop({
            type: "danger",
            message: "请选择一条数据"
            });
        } else if (selectData.length > 1) {
            this.$pop({
            type: "danger",
            message: "请选择一条数据"
            });
        } else {
            this.buttonStatus = 1; //代表选中一条
            this.bodyForm = cloneObj(selectData[0]);
            this.model = true;
        }
    },
    handleSelect(){

    },
    handleSizeChange(val){
        this.ep_page.size = val
        this.makePaging(this.ep_page.size,this.ep_page.page, this.filterData(this.customSearch,this.tableDataCopy))
    },
    handleCurrentChange(val){
        this.ep_page.page = val
        this.makePaging(this.ep_page.size,this.ep_page.page,this.filterData(this.customSearch,this.tableDataCopy))
    },
    makeSure(){
        this.$refs["bodyForm"].validate(valid => {
        if (valid) {
          if (this.buttonStatus == 0) {
            return;
          } else if (this.buttonStatus == 1) {
             let bodyForm = this.bodyForm;
            this.indexChange = this.$refs.table.getDataIndex("select")[0]
            this.tableData.splice(
              this.indexChange,
              1,
              cloneObj(bodyForm)
            );
           let updateDate = this.tableDataCopy.findIndex(value=>{
              return value.leadId == bodyForm.leadId
            })
            this.tableDataCopy.splice(updateDate,1,cloneObj(bodyForm))
            this.$refs.bodyForm && this.$refs.bodyForm.reset()
            this.model = false;
            this.buttonStatus = 0;
          } else if (this.buttonStatus == 2) {
             this.bodyForm.leadId =this.tableDataCopy[(this.tableDataCopy.length)-1]==undefined?0:
                  (this.tableDataCopy[(this.tableDataCopy.length)-1].leadId)+1
           
            let bodyForm = this.bodyForm;
            this.tableData.push(cloneObj(bodyForm));
            this.tableDataCopy.push(cloneObj(bodyForm))
            this.totalcount++
            this.ep_page.page =  Math.ceil(this.totalcount/this.ep_page.size)
            this.buttonStatus = 2;
            this.$refs.bodyForm && this.$refs.bodyForm.reset()
            this.model = false;
          }
        }
      });
    },
    closeModel(){

    this.model = false

    },
    makePaging(size,page,data){
      let begin = (page-1)*size
      let end = begin + size
      let newData = data.slice(begin,end)
      this.totalcount = data.length
      this.tableData = newData
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
    }

  }
}
</script>


