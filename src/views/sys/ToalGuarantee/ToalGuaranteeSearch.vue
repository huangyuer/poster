<template>
  <div>

    <div class="panel-main-content">
      <!--筛选栏组-->
      <div class="search-card contents-card card-margin">
        <wms-title title="">
        <div class="panel panel-default">
          <!-- <div class="card-title zero-padding">
            <span class="weight">查询列表</span>

          </div> -->
          <ep-form ref="searchForm" :form="searchForm" name-width="138px">
            <ep-row :gutter="7">
              <ep-col :col="8">
                <ep-form-item label="总担保编号" attr="gsarNo">
                  <ep-input v-model.trim="searchForm.gsarNo" name="gsarNo" :maxlength="30"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="状态" attr="status">
                  <ep-select v-model="searchForm.status" name="status">
                    <ep-select-item index="1" label="暂存"></ep-select-item>
                    <ep-select-item index="18" label="已确认"></ep-select-item>
                    <ep-select-item index="3" label="海关入库"></ep-select-item>
                    <ep-select-item index="4" label="海关入库失败"></ep-select-item>
                    <ep-select-item index="5" label="审核通过"></ep-select-item>
                    <ep-select-item index="17" label="待审核"></ep-select-item>
                    <ep-select-item index="6" label="审核拒绝"></ep-select-item>
                    <ep-select-item index="99" label="删除"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>

            </ep-row>
            <ep-row :gutter="7">
              <ep-col :col="24">
                <!-- <ep-button type="warning" size="small" @click="reset('searchForm')" icon="refresh">重置</ep-button>
                <ep-button type="primary" size="small" @click="refresh(true)" icon="search" :loading="loading">查询</ep-button> -->
                <WmsButton  @click="addOther">新增</WmsButton>
                <WmsButton  @click="reset('searchForm')">重置</WmsButton>
                <WmsButton :loading="loading" @click="refresh(true)">查询</WmsButton>
              </ep-col>
            </ep-row>
          </ep-form>
        </div>
        </wms-title>
        <div class="wms-dividing-line"></div>
      
      <!--表格-->
      <!-- <div class="ep-card card-margin relative"> -->
        <div class="card-body">
          <div class="block">
            <!-- <ep-button type="primary" size="small" @click="doUpdate" icon="edit">修改/确认</ep-button>
            <ep-button type="danger" size="small" @click="doDelete" icon="trash-a">删除</ep-button>
            <ep-button type="primary" size="small" @click="doDeclare" :loading="declareLoading" icon="checkmark-round">申报</ep-button>
            <ep-button type="success" size="small" @click="doPrint" icon="printer">打印</ep-button> -->
            <!-- <span style="color:red;font-size:25px;position:absolute;padding-top:8px;padding-left:3px;">*</span>
            <span style="padding-top: 10px;padding-left: 13px;position: absolute;font-size: 4px;color: rgba(0,0,0,.87);">双击列表信息，可进入详情页面</span> -->
          </div>
          <div class="block">
            
            <ep-table ref="table" border :height="400" :data="ep_data" head-color @selection-change="handleSelectionChange" :loading="loading" @row-dblclick="detailInfo">
              <!-- <ep-table-item v-if="!searchType" type="select"></ep-table-item> -->
              <ep-table-item column="opt" title="操作" width="200">
                <template slot-scope="props">
                  <wms-icon type="edit" @click="doUpdate(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="cancel" @click="doDelete(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="confirm" @click="doDeclare(props.row,props.row.id)"></wms-icon>
                  <!-- <wms-icon type="void"></wms-icon> -->
                  <!-- <wms-icon type="print"></wms-icon> -->
                  <wms-icon type="detail" @click="detailInfo($event,props.row)"></wms-icon>
                  <!-- <wms-icon type="change" @click="doModify(props.row,props.row.id)"></wms-icon> -->
                  <!-- <wms-icon type="goods"></wms-icon> -->
                </template>
              </ep-table-item>
              <!-- <ep-table-item column="dpstLevyBlNo" title="清单编号" width="200"></ep-table-item> -->
              <ep-table-item column="gsarNo" title="总担保编号" width="200"></ep-table-item>
              <ep-table-item column="grtAmt" title="金额" width="150"></ep-table-item>
              <ep-table-item column="usableAmt" title="可用金额" width="150"></ep-table-item>
              <ep-table-item column="lockAmt" title="锁定金额" width="150"></ep-table-item>
              <ep-table-item column="invalidAmt" title="失效金额" width="150"></ep-table-item>
              <ep-table-item column="status" title="状态" :formatter="optStatusFormatter"></ep-table-item>
              <!-- <ep-table-item column="ltguaType" title="保函类型" :formatter="gurModecdFormatter"></ep-table-item> -->
              <ep-table-item column="dclTypecd" title="申报类型" width="150" :formatter="dclTypecdFormatter"></ep-table-item>
              <!-- <ep-table-item column="dclData" title="申报时间" width="250"></ep-table-item> -->

              <!-- <ep-table-item column="rmk" title="备注" width="250"></ep-table-item> -->



            </ep-table>
          </div>
          <div class="block">
            <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
          </div>
        </div>  
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
import misList from "src/common/mislist";
import { getToken } from 'utils'
import mixin from "./mixin";
export default {
  name: "ToalGuaranteeSearch", // 保持和文件名一致，否则keep-alive不会动态缓存
  extends: misList, // 务必继承
  mixins: [mixin, misList],
  data() {
    return {
      loading: false,
      declareLoading: false,
      listApi: "grtGetList", // 搜索，取api.json里面的key值
      settings: {
        pk: "id" // 主键
      },
      searchForm: {
        // 筛选条件
        gsarNo: "",
        status: ""
      },
      selectLength: 0,
      selectItems: [],
      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      ep_data: [] //表格数据
    };
  },

  created() {
    this.refresh(true); // 调用继承方法
  },

  computed: {
    customList() {
      return this.$store.getters.getCustomList;
    }
  },

  methods: {

    addOther() {
        this.$router.push({
          path: "/ToalGuaranteeAdd"
        });
    },
    // 修改
    doUpdate(row, rowId) {
      if (
        row.status == '1' ||
        row.status == '4' ||
        row.status == '6'
      ) {
        let id = row.id
        let data = {}
        data['id'] = id
        let menusList = this.$store.getters.getMenuTabInstance.items;     
        menusList.forEach(function (item, index) {
          if (item.link == "/ToalGuaranteeUpdate") {
            menusList.splice(index, 1);
          }
        });
        this.$app.trigger('locate-tab', 'ToalGuaranteeUpdate', id)
      } else {
        this.$pop({
          type: 'danger',
          message: '只有暂存，审核拒绝和海关入库失败的可以修改'
        })
        return
      }    
    },

    // 删除
     doDelete(row, rowId) {
      let selectData = [row];

      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
        return;
      }
      if (
        selectData[0].status == "1" ||
        selectData[0].status == "4" ||
        selectData[0].status == "6"
      ) {
        this.$confirm({
          word: "是否要删除所选条目信息！",
          callback: errorInfo => {
            if (errorInfo) {
              let ids = [];
              selectData.forEach(c => {
                if (c.id) {
                  ids.push(c.id);
                }
              });
              let data = {};
              data["ids"] = ids;
              this.$post("grtDelete", data)
                .then(responseData => {
                  this.refresh(true);
                  this.$pop({
                    type: "success",
                    message: "删除成功"
                  });
                })
                .catch(e => {
                  this.loading = false;
                });
            } else {
            }
          }
        });
      } else {
        this.$pop({
          type: "danger",
          message: "当前状态无法删除！"
        });
        return;
      }
    },
    doDeclare(row, rowId) {
      let vm = this;
      let selectData = [row];
      let optStatusFlag = selectData.some(item => {
        if (item.status != 1) {
          return true;
        }
      })
      if (optStatusFlag) {
        this.$pop({
          type: "danger",
          message: "该状态的总担保不能进行确认"
        });
        return;
      }

      let ids = [];
      selectData.forEach(c => {
        if (c.id) {
          ids.push(c.id);
        }
      });
      let data = {};
      data["ids"] = ids;

      this.$confirm({
        word: "是否要确认？",
        callback(info) {
          if (info) {
            vm.declareLoading = true;
            vm.$post("grtDeclare", data)
              .then(responseData => {
                vm.declareLoading = false;
                vm.refresh(true);
              })
              .catch(e => {
                vm.declareLoading = false;
              });
          }
        }
      });
    },
    reset(e) {
      this.$refs[e].reset();
    },  
    // 跳转详情
    detailInfo(event, row, index) {
      this.$app.trigger("locate-tab", "ToalGuaranteeDtInfo", row.id);
    },
  }
};
</script>
