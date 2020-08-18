<template>
  <div>
    <div class="panel-main-content">
      <!--筛选栏组-->
      <div class="search-card contents-card card-margin">
        <div class="panel panel-default">
          <div class="card-title zero-padding"><span class="weight">查询条件</span></div>
          <ep-form ref="searchForm" :form="searchForm" name-width="120px">
            <ep-row :gutter="7">
              <ep-col :col="6">
                <ep-form-item label="关区" attr="masterCuscd">
                  <loc-codemap-select
                    :name="'masterCuscd'"
                    :code="'customCode'"
                    :cName="'customName'"
                    :dataList="tradeInfo"
                    :type="'custom'"
                    :value.sync="searchForm.masterCuscd">
                     </loc-codemap-select>
                </ep-form-item>
              </ep-col>
              <!-- <ep-col :col="6">
                <ep-form-item label="资质类型" attr="qualifyType" >
                  <ep-select v-model="searchForm.qualifyType" name="qualifyType">
                    <ep-select-item index="1" label="整报分出"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col> -->
              <!-- <ep-col :col="6">
                <ep-form-item attr="qualifyType" label="资质类型">
                  <ep-select filterable  v-model="searchForm.qualifyType" name="qualifyType" >
                      <ep-select-item v-for="item in qualifyTypelist" :key="item.id" :index="item.qualifyType" :label="item.description"></ep-select-item>
                    </ep-select>
                </ep-form-item>
              </ep-col> -->
              
                <ep-col :col="6">
                  <ep-form-item label="资质类型" attr="qualifyType">
                    <ep-select v-model="searchForm.qualifyType" name="qualifyType" filterable>
                      <ep-select-item v-for="(item, index) in qualifyTypelist" :key="index" :index="item.switchKeyName" :label="item.switchKeyName"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
              
              <!-- <ep-col :col="6">
                <ep-form-item label="操作状态" attr="opt_Status" >
                  <ep-select v-model="searchForm.opt_Status" name="opt_Status">
                    <ep-select-item index="1" label="暂存"></ep-select-item>
                    <ep-select-item index="18" label="已申报"></ep-select-item>
                    <ep-select-item index="4" label="入库失败"></ep-select-item>
                    <ep-select-item index="5" label="审核通过"></ep-select-item>
                    <ep-select-item index="6" label="审核拒绝"></ep-select-item>
                    <ep-select-item index="99" label="删除"></ep-select-item>
                    <ep-select-item index="17" label="转人工"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col> -->
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

      <ep-model title="新增" v-model="isShowAddModel" width="1200px" :wrap-close="false">
        <QualificationModel 
          ref="modelForm" 
          :bodyForm="bodyForm" 
          :layout="layout"
          :isShowModel="isShowAddModel"
          @onMakeSure="handleMakeSure" 
          @onCloseModel="handleCloseModel"
        />
      </ep-model>
      <ep-model title="操作记录" v-model="isShowRecordsModel" width="1200px" :wrap-close="false">
        <opt-records-tab :recordsTable="recordsTable"></opt-records-tab>
      </ep-model>

      <!--表格-->
      <div class="ep-card card-margin relative">
        <div class="card-body">
          <div class="block">
            <ep-button type="primary" size="small" @click="doUpdate" :loading="updateLoading" icon="edit">修改</ep-button>
            <ep-button type="danger" size="small" @click="doDelete" :loading="delLoading" icon="trash-a">删除</ep-button>
            <ep-button type="primary" size="small" @click="doDeclare" :loading="declareLoading" icon="checkmark-round">确认</ep-button>
            <ep-button  type="primary" size="small" @click="doRecords">操作记录</ep-button>
            <!-- <ep-button type="info" size="small" @click="doRefresh" icon="ios-refresh">刷新</ep-button> -->
          </div>
          <div class="block">
            <!-- <ep-table ref="table" :height="400" :data="ep_data" head-color @selection-change="handleSelectionChange" :loading="loading"  @row-dblclick="showDetail"> -->
              <ep-table ref="table" :height="400" :data="ep_data" head-color @selection-change="handleSelectionChange" :loading="loading">
              <ep-table-item type="select"></ep-table-item>
              <ep-table-item column="tradeCode" title="企业编码" width="200"></ep-table-item>
              <!-- <ep-table-item column="id" title="id" width="150"></ep-table-item> -->
              <!-- <ep-table-item column="tradeId" title="企业id" width="150"></ep-table-item> -->
              <ep-table-item column="dclTbStucd" title="状态" width="150" :formatter="DCL_TB_STUCDFormatter"></ep-table-item>                        
              <ep-table-item column="masterCuscd" title="关区" width="150" :formatter="masterCuscdFormatter"></ep-table-item>
              <ep-table-item column="orgId" title="组织编码" width="150"></ep-table-item>
              <ep-table-item column="applyDesc" title="申请说明" width="150"></ep-table-item>  
              <ep-table-item column="description" title="资质类型说明" width="150" ></ep-table-item>
              <ep-table-item column="optStatus" title="操作状态" width="120" :formatter="opt_StatusFormatter"></ep-table-item>
              <ep-table-item column="dclTime" title="创建时间" width="200"></ep-table-item>
              <ep-table-item column="validTime" title="有效期" width="200"></ep-table-item>
              
            </ep-table>
          </div>
          <div class="block">
            <ep-pager right 
              @size-change="handleSizeChange" 
              @change="handleCurrentChange" 
              :now-page="ep_page.page" 
              :page-size="ep_page.size" 
              :total-num="totalcount">
            </ep-pager>
          </div>
        </div>
      </div>
    </div>
        <QualificationModel :fresh="statusFlag" :Statusdata="Statusdata" @nowFlagChange="statusFlag=false"></QualificationModel>
  </div>
</template>

<script>
  import misList from 'src/common/mislist'
  import QualificationModel from './components/QualificationModel'
  import optRecordsTab from 'src/components/optRecordsTab'
  import { cloneObj } from "utils";
  export default {
    name: 'Qualificatinfo',  // 保持和文件名一致，否则keep-alive不会动态缓存
    extends: misList,  // 务必继承
    components: {
      QualificationModel,
      optRecordsTab,
    },
    
    data () {
      return {
        statusFlag:false,
        loading: false,
        updateLoading: false,
        delLoading: false,
        declareLoading: false,
        isShowAddModel: false,
        isShowUpdateModel: false,
        isShowDetailModel: false,
        isShowRecordsModel: false,
        layout: 'add',
        listApi: 'tradeQualifyfindList', // 搜索，取api.json里面的key值
        tradeInfo:[],
        description:'',
        Statusdata:{},
        qualifyTypelist:[],
        settings: {
          pk: 'id'    // 主键
        },
        searchForm: {
          qualifyType: "",
          description:'',
          masterCuscd:'',
        },

        bodyForm: {
          id:'',
          qualifyType:'',
          validTime:'',
          tradeId:'',
          optStatus:'',
          masterCuscd:'',
          dclTbStucd:'',
          applyDesc:''
        },
        recordsTable: [],
        ep_data: [],   //表格数据
        selectLength: 0,
        selectItems :[],
        totalcount: 0,
        ep_page: {    // 分页
          size: 10,
          page: 1
        },

        
      }
    },
    computed: {

    },
    created () {
      this.qualifyTypefindAll();
      this.refresh(true)  // 调用继承方法
      let customList = this.$store.getters.getCustomList;
      this.tradeInfo = customList;
      
    },

    mounted () {

    },
  watch: {
    statusFlag(value) {
      if (!value) {
        this.refresh(true);
      }
    },
  },
    methods: {

      //查询企业资质类型
        //   qualifyTypefindAll() {
        //       this.$get("qualifyTypefindAll")
        //         .then(res=>{
        //           this.qualifyTypelist = res.map.data;
        //           console.log(this.qualifyTypelist)
        //         })
        //         .catch(err => {
        //           console.log(err)
        //         })
        //     },
        
    qualifyTypefindAll() {
      this.$post('getTypelist', { page: 1, size: 1000 })
        .then(res => {
          this.qualifyTypelist = res.map.data.content
        })
        .catch(err => {
          console.log(err)
        })
    },

      doUpdate() {
        let selectData = this.$refs.table.getData("select");
        console.log(selectData)
        let row = selectData[0];
        console.log(row)
        if (selectData.length != 1) {
          this.$pop({
            type: "danger",
            message: "请选择一条数据"
          });
          return;
        }
        
        if (row.optStatus != 1 && row.optStatus != 4 && row.optStatus != 6) {
          this.$pop({
            type: "danger",
            message: "只能修改暂存、入库失败和审核拒绝操作状态的单证"
          });
          return;
        }else{
          this.statusFlag=true
          this.Statusdata=cloneObj(selectData[0]);
          console.log(22,this.Statusdata)
        }
        
      },

      doDelete() {
        let selectData = this.$refs.table.getData("select");
        if (selectData.length == 0) {
          this.$pop({
           type: "danger",
            message: "请选择一条数据"
          });
          return;
        }
        this.$confirm({
          word: "是否要确认删除？",
          callback: errorInfo => {
            if (errorInfo) {
              console.log('aaa')
               let selectData = this.$refs.table.getData("select");
               console.log(selectData)
              selectData.forEach(item=>{
                let data  = {id : item.id}
                this.$post("tradeQualifydelete", data)
                  .then(res => {
                    this.delLoading = false;
                    this.ep_data.splice(item,1)
                    console.log(this.ep_data)
                    this.refresh(false);
                  })
                  .catch(e => {
                    this.delLoading = false;
                  });
                })
              // this.delLoading = true;
              
            }
          }
        });
      },

      // 申报
      doDeclare() {
        let selectData = this.$refs.table.getData("select");
        if (selectData.length == 0) {
          this.$pop({
            type: "danger",
            message: "请选择一条数据！"
          });
          return;
        }

        let opt_StatusFlag = selectData.some(item => {
          return item.optStatus != 1;
        })
        if (opt_StatusFlag) {
          this.$pop({
            type: "danger",
            message: "只能申报暂存状态的单证！"
          });
          return;
        }

        let idList = [];
        selectData.forEach(c => {
          idList.push(c.id);
        });
        let data = {};
        data["idList"] = idList;
        // data["userId"] = this.$store.getters.getUserId;

        this.$confirm({
          word: '是否要确认申报？',
          callback: info => {
            if (info) {
              this.declareLoading = true;
              this.$post("tradeQualifydeclare", data)
                .then(responseData => {
                  this.declareLoading = false;
                  this.refresh(true);
                })
                .catch(e => {
                  this.declareLoading = false;
                });
            } 
          }
        })
      },

      doRecords() {
        let selectData = this.$refs.table.getData("select");
        console.log(selectData)
        if (selectData.length != 1) {
          this.$pop({
            type: "danger",
            message: "请选择一条数据"
          });
          return;
        }
        // let { id } = selectData[0];
        let {id} = selectData[0]
        let pid = selectData[0].id
        console.log(pid)
        console.log(id)
        // let page = this.ep_page.page
        // let size = this.ep_page.size
        this.$post("tradeQualifyfindOperationLog", {pid})
          .then(res => {
            console.log(res)
            this.isShowRecordsModel = true;
            this.recordsTable = res.map.data.content
            this.declareLoading = false;
          })
          .catch(e => {
            this.declareLoading = false;
          });
        
      },

      handleMakeSure(data) {
        this.isShowAddModel = false;
        this.isShowUpdateModel = false;
        this.refresh(false);
      },

      handleDetailMakeSure(data) {
        this.isShowDetailModel = false;
      },

      handleCloseModel(value) {
        this.isShowAddModel = value;
        this.isShowUpdateModel = value;
        this.isShowDetailModel = value;
      },
    
      resetForm() {
        for (let item in this.bodyForm) {
          if (this.bodyForm.hasOwnProperty(item)) {
            let keys = ['tradeCode', 'tradeName', 'creditCode'];
            if (keys.indexOf(item) != -1) continue;
            this.bodyForm[item] = '';
          }
        }
      },

      // showDetail(event,row,index) {
      //   let { id } = row;
      //   this.loading = true;
      //   this.$post("qualifyGetDetail", {id})
      //     .then(res => {
      //       let rowData = res.map.data;
      //       for (let item in this.bodyForm) {
      //         if (this.bodyForm.hasOwnProperty(item)) {
      //           this.bodyForm[item] = rowData[item];
      //         }
      //       }
      //       this.bodyForm.storageAddress = rowData.address;
      //       this.bodyForm.storageArea = rowData.area;
      //       this.layout = 'detail';
      //       this.isShowDetailModel = true;
      //       this.loading = false;
      //     })
      //     .catch(e => {
      //       this.loading = false;
      //       console.warn(e)
      //     });
      // },

      businessTypeFormatter(row, index) {
        let status = {
          "1": '整报分出',
          "2": '业务分出',
        };
        return status[row[index.column]];
      },
      DCL_TB_STUCDFormatter(row, index) {
        let status = {
          "1": '正常',
          "2": '暂停',
        };
        return status[row[index.column]];
      },
      opt_StatusFormatter(row, index) {
        let status = {
          "1": '暂存',
          "18": '已确认',
          "4": '入库失败',
          "5": '审核通过',
          "6": '审核拒绝',
          "99": '删除',
          "17": '转人工',
        };
        return status[row[index.column]];
      },
      masterCuscdFormatter(row, index) {
        let customList = this.$store.getters.getCustomList;
        for (let i = 0; i < customList.length; i++) {
          if (row[index.column] == customList[i].customCode) {
            return customList[i].customName;
          }
        }
      },
      
    }
    
  }
</script>
