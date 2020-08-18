<template>
  <div>
    <div class="panel-main-content">
      <!--筛选栏组-->
      <div class="search-card contents-card card-margin">
        <div class="panel panel-default">
          <div class="card-title zero-padding">
            <span class="weight">查询列表</span>
          </div>
          <ep-form ref="searchForm" :form="searchForm" name-width="130px">
            <ep-row :gutter="7">
              <!-- <ep-col :col="8">
                    <ep-form-item label="系统代码" attr="sysCode">
                    <ep-select v-model="searchForm.sysCode" name="sysCode">
                        <ep-select-item index="1" label="NEPZ"></ep-select-item>
                    </ep-select>
                    </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                    <ep-form-item label="类型" attr="type">
                    <ep-select v-model="searchForm.type" name="type">
                        <ep-select-item index="1" label="企业待办"></ep-select-item>
                        <ep-select-item index="2" label="组织待办"></ep-select-item>
                        <ep-select-item index="3" label="个人待办"></ep-select-item>
                    </ep-select>
                    </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                    <ep-form-item label="分类" attr="classify">
                    <ep-select v-model="searchForm.classify" name="classify">
                        <ep-select-item index="1" label="NEPZ"></ep-select-item>
                        <ep-select-item index="1" label="企业待办"></ep-select-item>
                        <ep-select-item index="2" label="组织待办"></ep-select-item>
                        <ep-select-item index="3" label="个人待办"></ep-select-item>
                    </ep-select>
                    </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                    <ep-form-item label="预警级别" attr="warningRank">
                    <ep-select v-model="searchForm.warningRank" name="warningRank">
                        <ep-select-item index="1" label="重要"></ep-select-item>
                        <ep-select-item index="2" label="一般"></ep-select-item>
                        <ep-select-item index="3" label="低"></ep-select-item>
                    </ep-select>
                    </ep-form-item>
                </ep-col> -->
              <!-- <ep-col :col="8">
                        <ep-form-item label="开始时间" disabled attr="createDate">
                            <ep-date v-model="searchForm.createDate" type="dateTime"></ep-date>
                        </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                        <ep-form-item label="结束时间" disabled attr="endDate">
                            <ep-date v-model="searchForm.endDate" type="dateTime"></ep-date>
                        </ep-form-item>
                    </ep-col> -->

              <ep-col :col="8">
                <ep-form-item label="单证类型" attr="orderType">
                  <ep-select v-model="searchForm.orderType" name="orderType">
                    <ep-select-item
                      index="wht"
                      label="进出区提发货凭证"
                    ></ep-select-item>
                    <ep-select-item
                      index="port"
                      label="卡口验放凭证"
                    ></ep-select-item>
                    <ep-select-item
                      index="bill"
                      label="进出境径行提离"
                    ></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="10">
                <ep-form-item label="时间" attr="valueDate">
                  <ep-date-range
                    v-model="searchForm.valueDate"
                    type="dateTime"
                  ></ep-date-range>
                </ep-form-item>
              </ep-col>
            </ep-row>

            <ep-row :gutter="7">
              <ep-col :col="24">
                <ep-button
                  type="warning"
                  size="small"
                  icon="refresh"
                  @click="reset('searchForm')"
                  >重置</ep-button
                >
                <ep-button
                  type="primary"
                  size="small"
                  @click="query()"
                  icon="search"
                  :loading="loading"
                  >查询</ep-button
                >
              </ep-col>
            </ep-row>
          </ep-form>
        </div>
      </div>
      <!--表格-->
      <div class="ep-card card-margin relative">
        <div class="card-body">
          <div class="block">
            <!-- <ep-button type="primary" size="small" icon="checkmark-round" @click="add">新增</ep-button> -->
            <!-- <ep-button type="primary" icon="edit" size="small" @click="updateData">修改</ep-button>
                <ep-button type="danger" @click="delectData" icon="trash-a" size="small">删除</ep-button>
                <ep-button type="success" size="small" icon="checkmark-round" @click="Release">发布</ep-button> -->
            <!-- <ep-button type="success" size="small" icon="checkmark-round" @click="perform">完成</ep-button> -->
            <span
              style="
                color: red;
                font-size: 25px;
                position: absolute;
                padding-top: 8px;
                padding-left: 3px;
              "
              >*</span
            >
            <span
              style="
                padding-top: 10px;
                padding-left: 13px;
                position: absolute;
                font-size: 4px;
                color: rgba(0, 0, 0, 0.87);
              "
              >双击列表信息，可进入详情页面</span
            >
            <ep-table
              ref="table"
              :height="400"
              :data="ep_data"
              :head-color="headColor"
              :loading="loading"
              @row-dblclick="detailInfo"
            >
              <ep-table-item type="select"></ep-table-item>
              <ep-table-item column="title" width="200" title="标题">
                <template slot-scope="props">
                  <a
                    class="declareNoHover"
                    style="cursor: pointer; color: #3f88bf;"
                    @dblclick.stop
                    @click.stop="routerpush(props.row)"
                    >{{ props.row.title }}</a
                  >
                </template>
              </ep-table-item>
              <ep-table-item
                column="describe"
                width="200"
                title="描述"
              ></ep-table-item>
              <ep-table-item
                column="orderType"
                width="200"
                title="类型"
                :formatter="orderType"
              ></ep-table-item>
              <ep-table-item
                column="createDate"
                width="200"
                title="创建时间"
              ></ep-table-item>
              <ep-table-item
                column="status"
                width="200"
                title="状态"
                :formatter="Matterstatus"
              ></ep-table-item>
              <ep-table-item
                column="rmk"
                width="200"
                tooltip-show
                title="备注"
              ></ep-table-item>
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
    <modification
      :fresh="statusFlag"
      :searchStatus="searchStatus"
      @nowFlagChange="statusFlag = false"
    ></modification>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import modification from "./components/modification";
import { cloneObj } from "utils";
import mixin from "./mixin";
export default {
  mixins: [mixin],
  name: "Todolist", // 保持和文件名一致，否则keep-alive不会动态缓存
  extends: misList, // 务必继承
  components: {
    modification: modification,
  },
  created() {
    // this.refresh(true); // 调用继承方法
  },

  mounted() {},
  watch: {
    statusFlag(value) {
      if (!value) {
        this.refresh(true);
      }
    },
  },
  methods: {
    reset(searchForm) {
      this.$refs[searchForm].reset();
    },
    detailInfo(event, row, index) {
      this.$app.trigger("locate-tab", "Details", row);
    },
    // 跳转
    routerpush(row) {
      if (row.orderType == "wht") {
        this.$router.push({ path: "WareHouseInfo" });
      } else if (row.orderType == "port") {
        this.$router.push({ path: "CreditCardReceiptInfo" });
      } else if (row.orderType == "bill") {
        this.$router.push({ path: "personalCheck" });
      }
    },
    query() {
      this.timer = JSON.parse(JSON.stringify(this.searchForm)).valueDate;
      let arr = this.timer.split(",");
      this.searchForm.createDate = arr[0];
      this.searchForm.endDate = arr[1] == undefined ? "" : arr[1];
      this.refresh(true);
    },
    // 删除
    delectData() {
      let selectData = this.$refs.table.getData("select");
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据！",
        });
        return;
      } else {
        this.$confirm({
          word: "是否要删除所选条目信息！",
          callback: (errorInfo) => {
            if (errorInfo) {
              let selectData = this.$refs.table.getData("select");
              let data = [];
              selectData.forEach((item) => {
                data.push(item.id);
              });
              let id = data.join();
              let params = { ids: id };
              this.$post("MattergetDelete", params)
                .then((res) => {
                  this.refresh(true);
                })
                .catch((e) => {});
              // let selectData = this.$refs.table.getData("select")
              // let data = ''
              // selectData.forEach((num, i)=>{
              //   if(i==0){
              //     data=`${num.id}`
              //   }else{
              //     data=`${data},${num.id}`
              //   }
              // })
              // let params = {ids: data }
              //  this.$post("MattergetDelete",params)
              //     .then(res=>{
              //       this.refresh(true);
              //     })
              //     .catch(e => {

              //     });
            } else {
              return;
            }
          },
        });
      }
    },
    //新增
    // add() {
    //   this.statusFlag=true,
    //   console.log("新增");
    // },
    //完成
    perform() {
      let selectData = this.$refs.table.getData("select");
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据！",
        });
        return;
      } else {
        let selectData = this.$refs.table.getData("select");
        let data = [];
        for (let i = 0; i < selectData.length; i++) {
          if (selectData[i].status != 2) {
            this.$pop({
              type: "danger",
              message: "非发布状态不可以完成",
            });
            return;
          }
        }
        selectData.forEach((item) => {
          data.push(item.id);
        });
        let id = data.join();
        let params = { ids: id };
        this.$post("Mattergetperform", params)
          .then((res) => {
            this.refresh(true);
          })
          .catch((e) => {});
      }
    },
    // 发布
    Release() {
      let selectData = this.$refs.table.getData("select");
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据！",
        });
        return;
      } else {
        let selectData = this.$refs.table.getData("select");
        let data = [];
        for (let i = 0; i < selectData.length; i++) {
          if (selectData[i].status != 1) {
            this.$pop({
              type: "danger",
              message: "非暂存状态不可以发布",
            });
            return;
          }
        }
        selectData.forEach((item) => {
          data.push(item.id);
        });
        let id = data.join();
        let params = { ids: id };
        this.$post("MattergetAnnounce", params)
          .then((res) => {
            this.refresh(true);
          })
          .catch((e) => {});
      }
    },
    //修改
    updateData() {
      let selectData = this.$refs.table.getData("select");
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据！",
        });
        return;
      } else if (selectData.length > 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
      } else {
        // this.KeyType=false
        // this.statusFlag=true,
        // this.searchStatus=cloneObj(selectData[0]);
        if (selectData[0].status != 1) {
          this.$pop({
            type: "danger",
            message: "非暂存状态不可以修改",
          });
        } else {
          this.KeyType = false;
          (this.statusFlag = true),
            (selectData[0].valueDate = `${selectData[0].createDate},${selectData[0].endDate}`);
          this.searchStatus = cloneObj(selectData[0]);
        }
      }
    },
  },
  data() {
    return {
      loading: false,
      listApi: "MattergetgetToDoDone", // 搜索，取api.json里面的key值
      //   deleteData: "enterpriseDelete",
      settings: {
        pk: "id", // 主键
      },

      statusFlag: false, //新增的模态框
      searchStatusId: "",
      timer: "",
      searchForm: {
        sysCode: "",
        type: "",
        classify: "",
        warningRank: "", //预警级别
        createDate: "",
        endDate: "",
        status: "",
        valueDate: "",
      },
      searchStatus: {},
      headColor: true,
      KeyType: true, //新增或修改==true新增
      selectLength: 0,
      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1,
      },
      ep_data: [], //表格数据
    };
  },
};
</script>
<style>
.ep-time-pick-timmer .ep-time-single {
  width: 33% !important;
}
</style>
