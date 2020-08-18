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
                <ep-form-item label="组织编号" attr="orgCode"   >
                  <ep-input v-model="searchForm.orgCode" name="orgCode"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="6">
                <ep-form-item label="业务类型" attr="businessType" >
                  <ep-select v-model="searchForm.businessType" name="businessType">
                    <ep-select-item index="1" label="整报分出"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="6">
                <ep-form-item label="操作状态" attr="optStatus" >
                  <ep-select v-model="searchForm.optStatus" name="optStatus">
                    <ep-select-item index="1" label="暂存"></ep-select-item>
                    <ep-select-item index="18" label="已申报"></ep-select-item>
                    <ep-select-item index="4" label="入库失败"></ep-select-item>
                    <ep-select-item index="5" label="审核通过"></ep-select-item>
                    <ep-select-item index="6" label="审核拒绝"></ep-select-item>
                    <ep-select-item index="99" label="删除"></ep-select-item>
                    <ep-select-item index="17" label="转人工"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
            </ep-row>
            <ep-row :gutter="7">
              <ep-col :col="24">
                <!-- <ep-button type="warning" size="small" icon="refresh" @click="reset('searchForm')">重置</ep-button>
                <ep-button type="primary" size="small" @click="refresh(true)" icon="search" :loading="loading">查询</ep-button> -->
                <WmsButton @click="reset('searchForm')">重置</WmsButton>
                <WmsButton  @click="refresh(true)" icon="search" :loading="loading">查询</WmsButton>
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

      <ep-model title="修改" v-model="isShowUpdateModel" width="1200px" :wrap-close="false">
        <QualificationModel 
          ref="modelForm" 
          :bodyForm="bodyForm" 
          :layout="layout"
          :isShowModel="isShowUpdateModel"
          @onMakeSure="handleMakeSure" 
          @onCloseModel="handleCloseModel"
        />
      </ep-model>

      <ep-model title="详情" v-model="isShowDetailModel" width="1200px" :wrap-close="false">
        <QualificationModel 
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
            <ep-button type="primary" size="small" @click="doAdd" icon="plus-round">新增</ep-button>
            <ep-button type="primary" size="small" @click="doUpdate" :loading="updateLoading" icon="edit">修改</ep-button>
            <ep-button type="danger" size="small" @click="doDelete" :loading="delLoading" icon="trash-a">删除</ep-button>
            <ep-button type="primary" size="small" @click="doDeclare" :loading="declareLoading" icon="checkmark-round">申报</ep-button>
            <ep-button  type="primary" size="small" @click="doRecords">操作记录</ep-button>
            <ep-button type="info" size="small" @click="doRefresh" icon="ios-refresh">刷新</ep-button>
          </div>
          <div class="block">
            <ep-table ref="table" :height="400" :data="ep_data" head-color @selection-change="handleSelectionChange" :loading="loading"  @row-dblclick="showDetail">
              <ep-table-item type="select"></ep-table-item>
              <ep-table-item column="orgCode" title="组织编码" width="150"></ep-table-item>
              <ep-table-item column="customName" title="关区" width="150"></ep-table-item>
              <ep-table-item column="businessType" title="业务类型" width="150" :formatter="businessTypeFormatter"></ep-table-item>
              <!-- <ep-table-item column="tradeCode" title="企业编码" width="150"></ep-table-item> -->
              <!-- <ep-table-item column="tradeName" title="企业名称" width="160"></ep-table-item> -->
              <!-- <ep-table-item column="creditCode" title="企业社会信用代码" width="160"></ep-table-item> -->
              <!-- <ep-table-item column="storageAddress" title="仓库地址" width="200"></ep-table-item> -->
              <!-- <ep-table-item column="storageArea" title="仓库面积" width="150"></ep-table-item> -->
              <ep-table-item column="dclTbStucd" title="状态" width="120" :formatter="dclTbStucdFormatter"></ep-table-item>
              <ep-table-item column="optStatus" title="操作状态" width="120" :formatter="optStatusFormatter"></ep-table-item>
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
  </div>
</template>

<script>
  import misList from 'src/common/mislist'
  import QualificationModel from './components/QualificationModel'
  import optRecordsTab from 'src/components/optRecordsTab'

  export default {
    name: 'qualification',  // 保持和文件名一致，否则keep-alive不会动态缓存
    extends: misList,  // 务必继承
    components: {
      QualificationModel,
      optRecordsTab
    },
    
    data () {
      return {
        loading: false,
        updateLoading: false,
        delLoading: false,
        declareLoading: false,
        isShowAddModel: false,
        isShowUpdateModel: false,
        isShowDetailModel: false,
        isShowRecordsModel: false,
        layout: 'add',
        listApi: 'qualifyGetList', // 搜索，取api.json里面的key值
        settings: {
          pk: 'id'    // 主键
        },
        searchForm: {    // 筛选条件
          orgCode: '',
          businessType:"",
          optStatus:"",
        },

        bodyForm: {
          id: '',
          orgCode: '',
          masterCuscd: '',
          businessType: '',
          tradeCode: this.$store.getters.getTradeCode,
          tradeName: this.$store.getters.getTradeName,
          creditCode: this.$store.getters.getCreditCode,
          storageAddress: '',
          storageArea: '',
          dclTbStucd: '',
          optStatus: '',
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
      this.refresh(true)  // 调用继承方法
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
        
        if (row.optStatus != 1 && row.optStatus != 4 && row.optStatus != 6) {
          this.$pop({
            type: "danger",
            message: "只能修改暂存、入库失败和审核拒绝操作状态的单证"
          });
          return;
        }

        let { id } = selectData[0];
        this.updateLoading = true;
        this.$post("qualifyGetDetail", {id})
          .then(res => {
            let rowData = res.map.data;
            for (let item in this.bodyForm) {
              if (this.bodyForm.hasOwnProperty(item)) {
                this.bodyForm[item] = rowData[item];
              }
            }
            this.layout = 'update'
            this.isShowUpdateModel = true;
            this.updateLoading = false;
          })
          .catch(e => {
            this.updateLoading = false;
            console.warn(e)
          });
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

        let ids = [];
        selectData.forEach(item => {
          ids.push(item.id);
        });
        let data = {bscIds: ids};

        this.$confirm({
          word: "是否要确认删除？",
          callback: info => {
            if (info) {
              this.delLoading = true;
              this.$post("qualifyDelete", data)
                .then(res => {
                  this.delLoading = false;
                  this.refresh(false);
                })
                .catch(e => {
                  this.delLoading = false;
                });
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

        let optStatusFlag = selectData.some(item => {
          return item.optStatus != 1;
        })
        if (optStatusFlag) {
          this.$pop({
            type: "danger",
            message: "只能申报暂存状态的单证！"
          });
          return;
        }

        let bscIds = [];
        selectData.forEach(c => {
          bscIds.push(c.id);
        });
        let data = {};
        data["bscIds"] = bscIds;
        data["userId"] = this.$store.getters.getUserId;

        this.$confirm({
          word: '是否要确认申报？',
          callback: info => {
            if (info) {
              this.declareLoading = true;
              this.$post("qualifyDeclare", data)
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
        if (selectData.length != 1) {
          this.$pop({
            type: "danger",
            message: "请选择一条数据"
          });
          return;
        }
        let { id } = selectData[0];
        this.$post("qualifyGetStatus", {id})
          .then(res => {
            this.isShowRecordsModel = true;
            this.recordsTable = res.map.data;
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

      showDetail(event,row,index) {
        let { id } = row;
        this.loading = true;
        this.$post("qualifyGetDetail", {id})
          .then(res => {
            let rowData = res.map.data;
            for (let item in this.bodyForm) {
              if (this.bodyForm.hasOwnProperty(item)) {
                this.bodyForm[item] = rowData[item];
              }
            }
            this.bodyForm.storageAddress = rowData.address;
            this.bodyForm.storageArea = rowData.area;
            this.layout = 'detail';
            this.isShowDetailModel = true;
            this.loading = false;
          })
          .catch(e => {
            this.loading = false;
            console.warn(e)
          });
      },

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
