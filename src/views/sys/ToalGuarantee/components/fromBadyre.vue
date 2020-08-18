<template>
  <div>
    <div>
      <ep-model title="关联保证金" v-model="model" width="1250px" :wrap-close="false">
         <GuaranteeSearch ref="GuaranteeSearch"  :searchType="false" :status="'5'" :ltguaStatus="'1'" :passportUsedTypecd="'0'" :addType="true">
            <template slot="out-form">
            <WmsButton @click="dobind">绑定保证金</WmsButton>
            </template>
        </GuaranteeSearch>
      </ep-model>
      <div class="ep-card card-margin relative">
        <div class="card-body">
          <div class="block">
            <!-- <ep-button type="primary" size="small" @click="doUpdate" icon="edit">修改</ep-button>
          <ep-button type="danger" size="small" @click="doDelete" icon="trash-a">删除</ep-button>
            <ep-button type="primary" size="small" @click="doDeclare" icon="checkmark-round">确认</ep-button>-->
            <!-- <ep-button type="primary" size="small" @click="doBodyAdd" icon="plus-round">添加</ep-button> -->
            <WmsButton   @click="doBodyAdd" style="margin:1px">添加</WmsButton>
            <!-- <WmsButton   @click="doBodyUpdate" style="margin:1px">修改</WmsButton> -->
            <!-- <ep-button type="primary" size="small" @click="doBodyUpdate" icon="edit">修改</ep-button> -->
            <!-- <ep-button
              type="danger"
              size="small"
              @click="doBodyDelete"
              icon="trash-a"
              v-show="btnShow"
            >删除</ep-button>-->
            <!--<ep-button type="danger" size="small" @click="clearTable" icon="trash-a">清空</ep-button>-->
          </div>
          <div class="block">
            <ep-table
              ref="table"
              :height="400"
              :data="tableData"
              :head-color="headColor"
              border
            >
            <ep-table-item column="opt" title="操作" width="200">
                <template slot-scope="props">
                  <!-- <wms-icon type="edit" @click="doBodyUpdate(props.row,props.row.id)"></wms-icon> -->
                  <wms-icon
                    type="cancel"
                    @click="doBodyDelete(props.row,props.row.id)"
                  ></wms-icon>
                </template>
              </ep-table-item>
              <ep-table-item column="dpstLevyBlNo" width="250" title="保证金清单编号"></ep-table-item>
              <ep-table-item column="ltguaStatus" width="200" title="保函状态" :formatter="ltguaStatusFormatter"></ep-table-item>
              <ep-table-item column="grtAmt" title="金额" width="150"></ep-table-item>
              <ep-table-item column="validDateEnd"  title="有效时间结束"></ep-table-item>
              
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "../mixin";
import misList from "src/common/mislist";
import { cloneObj } from "utils";
import GuaranteeSearch from "../../Guarantee/GuaranteeSearch"
export default {
  mixins: [mixin, misList],
  components:{
    GuaranteeSearch
  },
  data() {
    return {
      customSearch: {},
      bodyForm: {
          dpstLevyBlNo:'',
        //   ltguaStatus:'',
        //   createTime:'',
      },
      page_rules: {
        dpstLevyBlNo: { required: true, message: "不能为空", trigger: "change" },
        
      },
      isDisabled: false,
      btnShow: true,
      headColor: true,
      tableData: [],
      tableDataCopy: this.listData,
      loading: false,
      model: false,
      ep_page: {
        page: 1,
        size: 10
      },
      totalcount: 0,
      buttonStatus: "",
      list:[]
    };
  },
  props: {
    headerForm: {
      type: Object,
      default: function() {
        return {};
      }
    },
    listData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    displayBlock: {
      default: false
    },
    dtDetailList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    ieTypecdState: {
      type: String,
      default: ""
    }
  },
  created() {
    let unitList = this.$store.getters.getUnitList;
    this.dclUnitcds = unitList;
    let curr = this.$store.getters.getCurrList;
    this.currList = curr;
    if (this.isDtBody) this.page_rules = {};
  },
  beforeDestroy() {

  },
  mounted() {
    this.makePaging(10, 1, this.listData);
    // if (this.changeState === 3) {
    //   this.btnShow = false;
    // } else {
    //   this.btnShow = true;
    // }
  },
  watch: {
    ieTypecdState(val, oldval) {
      console.log("-------val", val);
      if (val != oldval) {
        this.tableData = [];
        this.tableDataCopy = [];
      }
      this.makePaging(10, 1, this.listData);
    },
    model(e) {
      if (!e) {
        this.$refs.bodyForm && this.$refs.bodyForm.reset();
      }
    },
    listData: {
      handler(newData, oldData) {
        this.tableDataCopy = newData;
        // this.makePaging(10, 1, this.tableDataCopy);
        this.makePaging(
          this.ep_page.size,
          this.ep_page.page,
          this.tableDataCopy
        );
      },
      deep: true
    }
  },
  methods: {
    dobind() {
        let selectData = this.$refs.GuaranteeSearch.$refs.table.getData("select");
        if (selectData.length == 0) {
          this.$pop({
            type: "danger",
            message: "请选择一条单子！"
          });
          return;
        }
        let isnNull = false 
        
        selectData.forEach(item=>{
            this.tableData.forEach(e=>{
                if(item.id==e.id){
                    this.$pop({
                    type: "danger",
                    message: "请选择不同的关联"
                    });
                    isnNull = true
                    // return
                }else{
                    
                    
                }

            })
        })
        if(!isnNull){
             selectData.forEach(item=>{
                 this.tableData.push(item)
                 this.tableDataCopy.push(item)
             })
             this.model = false;
        } else{

        } 
        this.totalcount++;
        this.ep_page.page = Math.ceil(this.totalcount / this.ep_page.size);
        // this.model = false;
          // console.log(this.tableData)
        // if(this.tableData.length<1){
        //     this.tableData=cloneObj(selectData)
        // }else{
        //         selectData.forEach(item=>{ 
        //             this.tableData.forEach((value,index) => {
        //             if(value.id !=item.id){
        //                     // return value
        //                     filterData[index]=item
        //                 }
        //             // return value.id!==item.id
        //             });
        //         // this.tableData = filterData; 
                
        //     })
        //     console.log(filterData,"bbbbbbbbbbbbbbb")
        //     this.tableData=[...this.tableData,...filterData]
        //     // this.tableData.push(cloneObj(filterData))
        //     console.log(this.tableData)
        // }    
        // this.tableData.push(cloneObj(selectData))
        // console.log(this.tableData)
        // this.tableDataCopy.push(cloneObj(selectData));
    },
    reset(el) {
      this.$refs[el].reset();
    },
    doBodyAdd() {
    //   this.$refs.bodyForm && this.$refs.bodyForm.reset();
      this.model = true;
      this.localType = "添加";
    },
    doBodyDelete(row, rowId) {
      //删除table数据
      // let selectData = this.$refs.table.getData("select");
      let tableData = [row];
    //   console.log(selectData)
      if (tableData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择数据"
        });
        return;
      }
    //   this.$confirm({
    //     word: "是否要删除所选条目信息！",
    //     callback: errorInfo => {
    //       if (errorInfo) {
    //         let allDelectIndex = [];
    //         // let selectData = this.$refs.table.getData("select");
    //         // let selectData = this.$refs.table.getData("select");
    //         let selectData = [row];
    //         let filterData = [];
    //        tableData.forEach(e => {
    //             // console.log("table", selectData);
    //             filterData = this.tableData.filter(value => {
    //               return value.id !== e.id;
    //             });
    //             this.tableData = filterData;
    //           });
    //       } else {
    //         return;
    //       }
    //     }
    //   });
        this.$confirm({
        word: "是否要删除所选条目信息！",
        callback: errorInfo => {
          if (errorInfo) {
            let allDelectIndex = [];
            // let selectData = this.$refs.table.getData("select");
            // let selectData = this.$refs.table.getData("select");
            let tableData = [row];
            tableData.forEach(e => {
              let updateDate = this.tableDataCopy.findIndex(value => {
                return value.id == e.id;
              });
              allDelectIndex.push(updateDate);
            });
            allDelectIndex = allDelectIndex.sort((a, b) => b - a);
            allDelectIndex.forEach((num, i) => {
              this.tableDataCopy.splice(num, 1);
            });
            let filterData = this.filterData(
              this.customSearch,
              this.tableDataCopy
            );
            this.makePaging(this.ep_page.size, this.ep_page.page, filterData);
            // this.ep_page.page = 1;
            this.localType = "";
          } else {
            return;
          }
        }
      });
    },
    // 添加操作最终关闭按钮
    closeModel() {
      // this.model = false;
    },
    customSearchBtn() {},
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.tableDataCopy)
      );
    },
    handleCurrentChange(val) {
      this.ep_page.page = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.tableDataCopy)
      );
    },
    makePaging(size, page, data) {
      let begin = (page - 1) * size;
      let end = begin + size;
      let newData = data.slice(begin, end);
      this.totalcount = data.length;
      this.tableData = newData;
    },
    filterData(condition, data) {
      let filter = (condition, data) => {
        return data.filter(item => {
          return Object.keys(condition).every(key => {
            if (condition[key] == "") return true;
            let diff =
              key == "gdsNm"
                ? String(item[key])
                    .toLowerCase()
                    .indexOf(
                      String(condition[key])
                        .trim()
                        .toLowerCase()
                    ) !== -1
                : String(item[key]).toLowerCase() ==
                  String(condition[key])
                    .trim()
                    .toLowerCase();
            return diff;
          });
        });
      };
      return filter(condition, data);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .text-style {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100px;
}
</style>

