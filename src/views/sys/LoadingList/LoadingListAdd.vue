<template>
  <div>
    <div class="panel-main-content">
      <!--筛选栏组-->
      <div class="search-card contents-card card-margin">
        <div class="panel panel-default">
          <div class="card-title zero-padding">
            <span class="weight">查询列表</span>
          </div>
          <ep-form ref="searchForm" :form="searchForm" name-width="138px">
            <!-- <ep-tabs active="查询列表">
            <ep-tab-item name="查询列表">-->
            <ep-row :gutter="7">
              <ep-col :col="8">
                <ep-form-item label="卡口验放凭证编号" attr="preentNo">
                  <ep-input v-model="searchForm.preentNo" name="preentNo" :maxlength="30"></ep-input>
                </ep-form-item>
              </ep-col>
              <!-- <ep-col :col="8">
                    <ep-form-item label="凭证编号" attr="portNo">
                      <ep-input
                        v-model="searchForm.portNo"
                        name="portNo"
                        :maxlength="30"
                      ></ep-input>
                    </ep-form-item>
              </ep-col>-->
              <!-- <ep-col :col="8">
                <ep-form-item label="单证状态" attr="optStatus">
                  <ep-select disabled v-model="searchForm.optStatus" name="optStatus">
                    <ep-select-item
                      :index="item.value"
                      v-for="(item, k) in optionStatusList"
                      :key="k"
                      :label="item.label"
                    ></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>-->
              <ep-col :col="8">
                <ep-form-item label="ERP/WMS出入库类型" attr="inExpType">
                  <ep-select
                    v-model="searchForm.inExpType"
                    name="inExpType"
                    @change="changeInExpType"
                  >
                    <ep-select-item index="6" label="进出境径予放行"></ep-select-item>
                    <ep-select-item index="1" label="非径予放行货物"></ep-select-item>
                    <ep-select-item index="2" label="先报后送"></ep-select-item>
                    <ep-select-item index="3" label="分送集报"></ep-select-item>
                    <!-- <ep-select-item index="4" label="区内流转"></ep-select-item> -->
                    <ep-select-item index="5" label="区间流转"></ep-select-item>
                    <ep-select-item index="1,2,3,4,5,6" label=" " style="display:none"></ep-select-item>

                    <!-- <ep-select-item index="0" label="空车进出区"></ep-select-item> -->
                  </ep-select>
                </ep-form-item>
              </ep-col>

              <ep-col :col="8">
                <ep-form-item label="进出区标志" attr="ieTypecd">
                  <ep-select v-model="searchForm.ieTypecd" name="ieTypecd">
                    <ep-select-item index="I" label="I-进区"></ep-select-item>
                    <ep-select-item index="E" label="E-出区"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <!-- <ep-col :col="8">
                <ep-form-item label="委托标识" attr="entrustSign">
                  <ep-select v-model="searchForm.entrustSign" name="entrustSign" disabled>
                    <ep-select-item index="0" label="未委托"></ep-select-item>
                    <ep-select-item index="1" label="委托"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>-->
              <!-- <ep-col :col="8">
                <ep-form-item label="关联单证编号" attr="rltNo">
                  <ep-input v-model="searchForm.rltNo" name="rltNo" :maxlength="64"></ep-input>
                </ep-form-item>
              </ep-col>-->
              <ep-col :col="8">
                <ep-form-item attr="vehicleNo" label="承运车车牌号">
                  <ep-input v-model="searchForm.vehicleNo" name="vehicleNo" :maxlength="128"></ep-input>
                </ep-form-item>
              </ep-col>
            </ep-row>
            <!-- </ep-tab-item>
            </ep-tabs>-->
          </ep-form>

          <ep-row :gutter="7">
            <ep-col :col="24">
              <!-- <ep-button type="warning" size="small" icon="refresh" @click="reset('searchForm')">重置</ep-button>
              <ep-button
                type="primary"
                size="small"
                icon="search"
                :loading="loading"
                @click="getListData"
              >查询</ep-button> -->
              <WmsButton @click="reset('searchForm')">重置</WmsButton>
                <WmsButton @click="getListData" :loading="loading">查询</WmsButton>
            </ep-col>
          </ep-row>
        </div>
      </div>
      <!--表格-->
      <div class="ep-card card-margin relative">
        <div class="card-body">
          <div class="block">
            <div class="drag-box" style="background:#fff;padding:50px 0;">
              <div class="drag-box-item">
                <div class="item-title">
                  卡口验放凭证
                  <div>
                    <span style="color:red;font-size:25px;position:absolute;">*</span>
                    <span
                      style="padding-top: 10px;padding-left: 13px;font-size: 4px;color: rgba(0,0,0,.87);"
                    >双击列表信息，可进入详情页面</span>
                  </div>
                </div>
                <ep-table
                  ref="table"
                  :height="400"
                  :data="ep_data"
                  :head-color="headColor"
                  @selection-change="handleSelectionChange"
                  :loading="loading"
                  @row-dblclick="detailInfo"
                >
                  <!-- <ep-table-item type="expand">
                <template slot-scope="props">
                  <opt-records-tab
                    :recordsTable="props.row.rows.records"
                  ></opt-records-tab>
                </template>
                  </ep-table-item>-->

                  <ep-table-item column="preentNo" title="卡口验放凭证编号" width="210"></ep-table-item>
                  <ep-table-item column="inExpType" title="出入库类型" :formatter="inExpTypeFormatter"></ep-table-item>
                  <ep-table-item column="vehicleNo" title="车牌号"></ep-table-item>
                  <!-- <ep-table-item column="masterCuscd" title="关区" :formatter="masterCuscdFormatter"></ep-table-item> -->
                  <ep-table-item column="ieTypecd" title="进出区标志" :formatter="ieTypecdFormatter"></ep-table-item>
                  <!-- <ep-table-item column="rmk" title="备注">
                    <template slot-scope="props">
                      <p class="rmk-style">{{ props.row.rmk }}</p>
                    </template>
                  </ep-table-item>-->
                </ep-table>
              </div>
              <div class="drag-box-item">
                <div class="button-style">
                  <slot name="out-form"></slot>
                  <ep-button v-show="searchType" @click="generate" type="success">生成</ep-button>
                  <ep-button type="danger" @click="eliminate">重置</ep-button>
                </div>
                <div class="item-title">单证生成</div>
                <ep-table
                  ref="table1"
                  :height="400"
                  :data="done"
                  :head-color="headColor"
                  @selection-change="handleSelectionChange"
                  @row-dblclick="detailInfo"
                >
                  <ep-table-item column="preentNo" title="卡口验放凭证编号" width="210"></ep-table-item>
                  <ep-table-item column="inExpType" title="出入库类型" :formatter="inExpTypeFormatter"></ep-table-item>
                  <ep-table-item column="vehicleNo" title="车牌号"></ep-table-item>

                  <!-- <ep-table-item column="masterCuscd" title="关区" :formatter="masterCuscdFormatter"></ep-table-item> -->
                  <ep-table-item column="ieTypecd" title="进出区标志" :formatter="ieTypecdFormatter"></ep-table-item>

                  <!-- <ep-table-item column="rmk" title="备注">
                    <template slot-scope="props">
                      <p class="rmk-style">{{ props.row.rmk }}</p>
                    </template>
                  </ep-table-item>-->
                </ep-table>
              </div>
            </div>
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
    <generate
      :fresh="modelFlag"
      :Listdata="done"
      @success="getListData"
      @nowFlagChange="modelFlag = false"
    ></generate>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import { delToken, getToken, getOrgId } from "utils";
import localStorage from "utils/localStorage";
import mixin from "./mixin";
import Sortable from "sortablejs";
import generate from "./components/generate";

export default {
  name: "LoadingListAdd", // 保持和文件名一致，否则keep-alive不会动态缓存
  // extends: misList, // 务必继承
  // mixins: [mixin],
  mixins: [misList, mixin],

  components: {
    generate
  },
  props: {
    searchType: {
      default: true
    }
  },

  computed: {},
  watch: {},
  mounted() {
    this.dragFun();
    if (!this.searchType) {
      this.getListData();
    }
  },
  methods: {
    changeInExpType(val) {
      if (!val) {
        this.searchForm.inExpType = "1,2,3,4,5,6";
      }
    },
    eliminate() {
      this.done = [];
      this.ep_data = JSON.parse(JSON.stringify(this.preData));
    },
    generate() {
      if (this.done.length == 0) {
        this.$pop({
          type: "danger",
          message: "请至少选择一条数据!"
        });
        return false;
      }
      this.modelFlag = true;
    },
    dragFun() {
      let el = this.$el.querySelectorAll(".ep-table-body > table > tbody")[0];
      let el1 = this.$el.querySelectorAll(".ep-table-body > table > tbody")[1];
      let x1, x2;
      let flag1 = [],
        flag2 = [],
        flag3 = [];
      const sortable = Sortable.create(el, {
        sort: false,
        onStart: function(evt) {
          x1 = evt.originalEvent.clientX;
        },
        onEnd: evt => {
          // //监听拖动结束事件
          x2 = evt.originalEvent.clientX;

          if (x2 > el1.getBoundingClientRect().left) {
            // this.done = [...this.done, ...this.ep_data[evt.oldIndex]];

            if (
              this.done[0] &&
              this.done[0].orgId != this.ep_data[evt.oldIndex].orgId
            ) {
              this.$pop({
                type: "danger",
                message: "组织ID需要一致!"
              });
              return;
            }
            if (
              this.done[0] &&
              this.done[0].vehicleNo != this.ep_data[evt.oldIndex].vehicleNo
            ) {
              this.$pop({
                type: "danger",
                message: "车牌号需要一致!"
              });
              return;
            }
            if (
              this.done[0] &&
              this.done[0].ieTypecd != this.ep_data[evt.oldIndex].ieTypecd
            ) {
              this.$pop({
                type: "danger",
                message: "进出区方向需要一致!"
              });
              return;
            } else {
              let inExp = this.done[0] && this.done[0].inExpType;
              let curInExp = this.ep_data[evt.oldIndex].inExpType;
              // if (this.done[0] ) {
              if (this.done[0] && this.done[0].ieTypecd == "I") {
                if (flag1.length > 0 && curInExp != "1" && curInExp != "6") {
                  //径予
                  this.$pop({
                    type: "danger",
                    message: "进区方向：一线径予和二线不可以绑到一个车!"
                  });
                  return;
                }
                // if(flag2.length > 0 ){
                //   if(flag1.length > 0&& curInExp != "1" && curInExp != "6"){
                //     //非径予&&径予
                //   this.$pop({
                //     type: "danger",
                //     message: "进区方向：一线径予和二线不可以绑到一个车!"
                //   });
                //   return;
                //   }
                // }
                //  if (flag1.length > 0 && flag2.length > 0 && curInExp != "1" && curInExp != "6") {
                //   //非径予&&径予
                //   this.$pop({
                //     type: "danger",
                //     message: "进区方向：一线径予和二线不可以绑到一个车!"
                //   });
                //   return;
                // }
                if (
                  flag2.length > 0 &&
                  flag3.length > 0 &&
                  flag1.length <= 0 &&
                  curInExp == "6"
                ) {
                  //非径予&&二线
                  this.$pop({
                    type: "danger",
                    message: "进区方向：一线径予和二线不可以绑到一个车!"
                  });
                  return;
                }
                if (flag3.length > 0 && curInExp == "6") {
                  //二线
                  this.$pop({
                    type: "danger",
                    message: "进区方向：一线径予和二线不可以绑到一个车!"
                  });
                  return;
                }
              } else if (this.done[0] && this.done[0].ieTypecd == "E") {
                if (flag1.length > 0 && curInExp != "6") {
                  //径予
                  this.$pop({
                    type: "danger",
                    message: "出区方向：进出境径予放行不可以和其他类型混绑!"
                  });
                  return;
                }
                if (flag2.length > 0 && curInExp == "6") {
                  //非径予
                  this.$pop({
                    type: "danger",
                    message: "出区方向：进出境径予放行不可以和其他类型混绑!"
                  });
                  return;
                }
                if (flag3.length > 0 && curInExp == "6") {
                  //二线
                  this.$pop({
                    type: "danger",
                    message: "出区方向：进出境径予放行不可以和其他类型混绑!"
                  });
                  return;
                }
              }
            }

            // let inExp = this.done[0] && this.done[0].inExpType;
            // let curInExp = this.ep_data[evt.oldIndex].inExpType;
            // if (inExp == "1" || inExp == "6") {
            //   if (curInExp != "1" && curInExp != "6") {
            //     this.$pop({
            //       type: "danger",
            //       message: "该出入库类型非一线!"
            //     });
            //     return;
            //   }
            // }
            // if (inExp == "2" || inExp == "3" || inExp == "5") {
            //   if (curInExp != "2" && curInExp != "3" && curInExp != "5") {
            //     this.$pop({
            //       type: "danger",
            //       message: "该出入库类型非二线!"
            //     });
            //     return;
            //   }
            // }

            this.done.push(this.ep_data[evt.oldIndex]);
            this.ep_data.splice(evt.newIndex, 1);
            flag1 =
              this.done[0] &&
              this.done.filter(item => {
                return item.inExpType.indexOf("6") > -1;
              });
            flag2 =
              this.done[0] &&
              this.done.filter(item => {
                return item.inExpType.indexOf("1") > -1;
              });
            flag3 =
              this.done[0] &&
              this.done.filter(item => {
                return (
                  item.inExpType.indexOf("1") == -1 &&
                  item.inExpType.indexOf("6") == -1
                );
              });
            console.log("------1", flag1, "------2", flag2, "------3", flag3);
          }
        }
      });
      const sortable2 = Sortable.create(el1, {
        sort: false,
        onStart: function(evt) {
          x1 = evt.originalEvent.clientX;
        },
        onEnd: evt => {
          // //监听拖动结束事件
          x2 = evt.originalEvent.clientX;

          if (x2 < el.getBoundingClientRect().right) {
            // this.done = [...this.done, ...this.ep_data[evt.oldIndex]];
            this.ep_data.push(this.done[evt.oldIndex]);
            this.done.splice(evt.newIndex, 1);
            flag1 =
              this.done[0] &&
              this.done.filter(item => {
                return item.inExpType.indexOf("6") > -1;
              });
            flag2 =
              this.done[0] &&
              this.done.filter(item => {
                return item.inExpType.indexOf("1") > -1;
              });
            flag3 =
              this.done[0] &&
              this.done.filter(item => {
                return (
                  item.inExpType.indexOf("1") == -1 &&
                  item.inExpType.indexOf("6") == -1
                );
              });
            console.log("----32-3-2", this.done);
          }
        }
      });
    },
    reset(e) {
      this.$refs[e].reset();
      this.fixTime = "";
    },
    // 接口前处理
    searchCallback(json) {
      let data = json.map.data.content;
      // this.sign(true)
      // this.clear()
      this.preData = JSON.parse(JSON.stringify(data));
    },
    getListData() {
      this.done = [];
      this.refresh(true);
      // setTimeout(() => {
      //   this.preData = JSON.parse(JSON.stringify(this.ep_data));
      // }, 100);
      this.$emit("listData");
    },
    changeTime() {
      let fixTime = this.fixTime.split(",");
      this.searchForm.passTimeStart = fixTime[0];
      this.searchForm.passTimeEnd = fixTime[1];
    },
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.refresh(false);
      // this.preData=this.ep_data
      // setTimeout(() => {
      //   this.preData = JSON.parse(JSON.stringify(this.ep_data));
      // }, 100);
    },
    handleCurrentChange(val) {
      this.ep_page.page = val;
      this.refresh(false);
      // this.preData=this.ep_data
      // setTimeout(() => {
      //   this.preData = JSON.parse(JSON.stringify(this.ep_data));
      // }, 100);
    },

    handleSelectionChange(val) {
      this.selectLength = val.length;
      this.selectItems = val;
    },

    detailInfo(event, row, index) {
      this.$app.trigger("locate-tab", "CreditCardReceiptDtInfo", row.id);
    }
  },
  data() {
    return {
      modelFlag: false,
      done: [],
      preData: [],
      fixTime: "",
      loading: false,
      listApi: "portReleasegetList", // 搜索，取api.json里面的key值

      settings: {
        pk: "id" // 主键
      },
      headColor: true,
      searchForm: {
        inExpType: "1,2,3,4,5,6",
        entrustSign: "0",
        optStatus: "5",
        preentNo: "",
        ieTypecd: "",
        vehicleNo: ""
      },
      // bizopEtpsSccd: "",//经营单位社会信用代码
      // portIochkptStucd:''//进出卡口状态
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
  }
};
</script>

<style scoped>
.drag-box {
  display: flex;
  user-select: none;
}
.drag-box-item {
  flex: 1;
  /* max-width: 330px; */
  min-width: 350px;
  background-color: #eff1f5;
  margin-right: 16px;
  border-radius: 6px;
  border: 1px #e1e4e8 solid;
  position: relative;
  /* height: 488px; */
}
.item-title {
  padding: 8px 8px 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #24292e;
  font-weight: 600;
  display: flex !important;
  justify-content: space-between !important;
}
.button-style {
  position: absolute;
  top: -35px;
  left: 0px;
}
</style>
