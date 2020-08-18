<template>
  <div>
    <div class="panel-main-content">
      <!--筛选栏组-->
      <div class="search-card contents-card card-margin">
        <div class="panel panel-default">
          <div class="card-title zero-padding"><span class="weight">查询条件</span></div>
          <ep-form ref="searchForm" :form="searchForm" name-width="120px">
            <ep-row :gutter="7">
              <ep-col :col="8">
                <ep-form-item attr="orgId" label="组织编码">
                  <ep-select filterable  v-model="searchForm.orgId" name="orgId">
                      <ep-select-item v-for="item in orgList" :key="item.id" :index="item.id" :label="item.orgCode"></ep-select-item>
                    </ep-select>
                </ep-form-item>
              </ep-col>
              <!-- <ep-col :col="6">
                <ep-form-item label="业务类型" attr="businessType" >
                  <ep-select v-model="searchForm.businessType" name="businessType">
                    <ep-select-item index="1" label="整报分出"></ep-select-item>
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
        <Organmodel 
          ref="modelForm" 
          :bodyForm="bodyForm" 
          :layout="layout"
          :isShowModel="isShowAddModel"
          @onMakeSure="handleMakeSure" 
          @onCloseModel="handleCloseModel"
        />
      </ep-model>

      <!-- <ep-model title="修改" v-model="isShowUpdateModel" width="1200px" :wrap-close="false">
        <Organmodel 
          ref="modelForm" 
          :bodyForm="bodyForm" 
          :layout="layout"
          :isShowModel="isShowUpdateModel"
          @onMakeSure="handleMakeSure" 
          @onCloseModel="handleCloseModel"
        />
      </ep-model> -->

      <ep-model title="详情" v-model="isShowDetailModel" width="1200px" :wrap-close="false">
        <Organmodel 
          ref="modelForm" 
          :bodyForm="bodyForm" 
          :layout="layout"
          :isShowModel="isShowDetailModel"
          @onMakeSure="handleDetailMakeSure" 
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
            <ep-button type="primary" size="small" @click="doAdd" icon="plus-round">增加</ep-button>
            <ep-button type="primary" size="small" @click="doUpdate" :loading="updateLoading" icon="edit">修改</ep-button>
            <ep-button type="danger" size="small" @click="doDelete" :loading="delLoading" icon="trash-a">删除</ep-button>
            <!-- <ep-button type="primary" size="small" @click="doDeclare" :loading="declareLoading" icon="checkmark-round">申报</ep-button> -->
            <!-- <ep-button  type="primary" size="small" @click="doRecords">操作记录</ep-button> -->
            <ep-button type="info" size="small" @click="doRefresh" icon="ios-refresh">刷新</ep-button>
          </div>
          <div class="block">
            <ep-table ref="table" :height="400" :data="ep_data" head-color @selection-change="handleSelectionChange" :loading="loading">
              <ep-table-item type="select"></ep-table-item>
              <!-- <ep-table-item column="id" title="id" width="150"></ep-table-item> -->
              <!-- <ep-table-item column="businessType" title="业务类型" width="150" :formatter="businessTypeFormatter"></ep-table-item> -->
              <ep-table-item column="tradeCode" title="企业编码" width="150"></ep-table-item>
              <ep-table-item column="orgCode" title="组织编码" width="160"></ep-table-item>
              <ep-table-item column="description" title="资质类型说明" width="200"></ep-table-item>
              <ep-table-item column="createTime" title="创建时间" width="200"></ep-table-item>
              
              <!-- <ep-table-item column="orgId" title="状态" width="120" :formatter="dclTbStucdFormatter"></ep-table-item>
              <ep-table-item column="optStatus" title="操作状态" width="120" :formatter="optStatusFormatter"></ep-table-item> -->
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
    <Organupdate :fresh="statusFlag" :Statusdata="Statusdata" @nowFlagChange="statusFlag=false" :bodyForm="bodyForm"></Organupdate>
  </div>
</template>

<script>
  import misList from 'src/common/mislist'
  import Organmodel from './components/Organmodel'
  import optRecordsTab from 'src/components/optRecordsTab'
  import Organupdate from './components/Organupdate'
  import { cloneObj } from "utils"
  export default {
    name: 'Organ',  // 保持和文件名一致，否则keep-alive不会动态缓存
    extends: misList,  // 务必继承
    components: {
      Organmodel,
      optRecordsTab,
      Organupdate
    },
    
    data () {
      return {
        loading: false,
        statusFlag:false,
        updateLoading: false,
        delLoading: false,
        declareLoading: false,
        isShowAddModel: false,
        isShowUpdateModel: false,
        isShowDetailModel: false,
        isShowRecordsModel: false,
        id:'',
        Statusdata:{},
        tradeQualId:'',
        orgList: [],
        createTime:'',
        orgId:'',
        layout: 'add',
        listApi: 'orgQualRtlfindList', // 搜索，取api.json里面的key值
        settings: {
          pk: 'id'    // 主键
        },
        searchForm: {    // 筛选条件
          orgCode: '',
          businessType:"",
          optStatus:"",
          orgId:''
        },

        bodyForm: {
            orgId:'',
            tradeCode: this.$store.getters.getTradeCode,
            tradeQualId:'',
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
    watch: {
    statusFlag(value) {
      if (!value) {
        this.refresh(true);
      }
    },
  },
    created () {
      this.refresh(true)  // 调用继承方法
      this.getOrgList();
    },

    mounted () {

    },

    methods: {
      doAdd() {
        this.layout = 'add'
        this.resetForm(); // 清空bodyForm
        this.isShowAddModel = true;
      },

      doUpdate() {
        let selectData = this.$refs.table.getData("select");
        let row = selectData[0];
        if (selectData.length != 1) {
          this.$pop({
            type: "danger",
            message: "请选择一条数据"
          });
          return;
        }
        else{
          this.statusFlag=true
          this.Statusdata=cloneObj(selectData[0]);
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
               let selectData = this.$refs.table.getData("select");
               console.log(selectData)
              selectData.forEach(item=>{
                let data  = {id : item.id}
                this.$post("orgQualRtldelete", data)
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

  getOrgList() {
        let { tradeCode } = this.bodyForm;
        this.$post("getOrganizationByTradeCode", {tradeCode})
          .then(res=>{
            this.orgList = res.map.data;
          })
          .catch(err => {
            console.log(err)
          })
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
            let keys = ['tradeCode', 'orgId'];
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
        };
        return status[row[index.column]];
      },
      dclTbStucdFormatter(row, index) {
        let status = {
          "1": '正常',
          "2": '暂停',
        };
        return status[row[index.column]];
      },
      optStatusFormatter(row, index) {
        let status = {
          "1": '暂存',
          "18": '已申报',
          "4": '入库失败',
          "5": '审核通过',
          "6": '审核拒绝',
          "99": '删除',
          "17": '转人工',
        };
        return status[row[index.column]];
      }
      
    }
    
  }
</script>
