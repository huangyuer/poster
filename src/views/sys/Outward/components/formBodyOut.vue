<template>
  <div>
    <div>
      <ep-model title="耗料清单耗用表体" v-model="model" width="1250px" :wrap-close="false" append-to-body>
        <ep-form ref="bodyForm" :form="bodyForm" :rules="page_rules" name-width="168px">
          <ep-row :gutter="7">
            <ep-col :col="8">
              <ep-form-item attr="classifyType" label="料件/成品标志">
                <ep-select
                  v-model="bodyForm.classifyType"
                  name="classifyType"
                  :disabled="isDisabled || displayBlock || editBody"
                >
                  <ep-select-item index="I" label="料件"></ep-select-item>
                  <ep-select-item index="E" label="成品"></ep-select-item>
                  <ep-select-item index="S" label="设备"></ep-select-item>
                  <ep-select-item index="L" label="边角料"></ep-select-item>
                  <ep-select-item index="D" label="残次品"></ep-select-item>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="gdsMtno" label="商品料号">
                <ep-input
                  :disabled="isDisabled || displayBlock || editBody"
                  v-model="bodyForm.gdsMtno"
                  name="gdsMtno"
                  :maxlength="32"
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="gdecd" label="商品编码">
                <ep-input
                  :disabled="isDisabled || displayBlock || editBody"
                  v-model="bodyForm.gdecd"
                  name="gdecd"
                  :maxlength="10"
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="gdsNm" label="商品名称">
                <ep-input
                  :disabled="isDisabled || displayBlock || editBody"
                  v-model="bodyForm.gdsNm"
                  name="gdsNm"
                  :maxlength="256"
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="gdsSpcfModelDesc" label="商品规格型号">
                <ep-input
                  :disabled="isDisabled || displayBlock || editBody"
                  v-model="bodyForm.gdsSpcfModelDesc"
                  name="gdsSpcfModelDesc"
                  :maxlength="768"
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="dclQty" label="申报数量">
                <ep-input
                  :disabled="isDisabled || displayBlock"
                  v-model.trim="bodyForm.dclQty"
                  name="dclQty"
                  :maxlength="20"
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="bizopEtpsNo" label="申报计量单位">
                <loc-codemap-select
                  :name="'bizopEtpsNo'"
                  :code="'unit'"
                  :cName="'unitName'"
                  :dataList="dclUnitcds"
                  :value.sync="bodyForm.bizopEtpsNo"
                  :disabled="isDisabled || displayBlock || editBody"
                ></loc-codemap-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="unit1" label="法定单位">
                <loc-codemap-select
                  :name="'unit1'"
                  :code="'unit'"
                  :cName="'unitName'"
                  :dataList="dclUnitcds"
                  :value.sync="bodyForm.unit1"
                  :disabled="isDisabled || displayBlock || editBody"
                ></loc-codemap-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="unit2" label="法定第二计量单位">
                <loc-codemap-select
                  :name="'unit2'"
                  :code="'unit'"
                  :cName="'unitName'"
                  :dataList="dclUnitcds"
                  :value.sync="bodyForm.unit2"
                  :disabled="isDisabled || displayBlock || editBody"
                ></loc-codemap-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8" v-if="changeType">
              <ep-form-item label="修改标志代码" attr="modfMarkcd">
                <ep-select
                  v-model="bodyForm.modfMarkcd"
                  name="modfMarkcd"
                  :disabled="disAbled"
                >
                  <ep-select-item index="1" label="修改"></ep-select-item>
                  <ep-select-item index="2" label="删除"></ep-select-item>
                  <ep-select-item index="3" label="增加" :disabled="disa"></ep-select-item>
                </ep-select>
              </ep-form-item>
            </ep-col>
          </ep-row>
          <div style="text-align: center;" v-if="!displayBlock">
            <!-- <ep-button type="primary" size="small" @click="makeSure()" icon="checkmark-round">确定</ep-button>
            <ep-button
              type="danger"
              size="small"
              @click="model = !model"
              icon="close"
              :loading="loading"
            >关闭</ep-button>-->

            <WmsButton @click="makeSure()">确定</WmsButton>
            <WmsButton :loading="loading" @click="model = !model">关闭</WmsButton>
          </div>
        </ep-form>
        <!-- <SearchBody @oneDates="bindBody" v-if="dragEdits" :stockBillNo="headerForm.inExpWhNo" :tableDataBody="tableData"></SearchBody> -->
      </ep-model>
      <div class="ep-card card-margin relative">
        <div class="card-body">
          <div class="block" v-if="bodyOutChange">
            <!-- <ep-button type="primary" size="small" @click="doUpdate" icon="edit">修改</ep-button>
          <ep-button type="danger" size="small" @click="doDelete" icon="trash-a">删除</ep-button>
            <ep-button type="primary" size="small" @click="doDeclare" icon="checkmark-round">确认</ep-button>-->

            <WmsButton style="margin:0" @click="doBodyAdd">添加</WmsButton>
            <WmsButton style="margin:0" @click="doBodyChange" v-if="changeType">变更</WmsButton>

            <!-- <ep-button
              type="primary"
              size="small"
              @click="doBodyAdd"
              icon="plus-round"
              v-show="btnShow"
            >添加</ep-button>
            <ep-button type="primary" size="small" @click="doBodyUpdate" icon="edit">修改</ep-button>
            <ep-button
              type="danger"
              size="small"
              @click="doBodyDelete"
              icon="trash-a"
              v-show="btnShow"
            >删除</ep-button>-->
            <!--<ep-button type="danger" size="small" @click="clearTable" icon="trash-a">清空</ep-button>-->
          </div>
          <div class="block">
            <ep-table border ref="table" :height="400" :data="tableData" :head-color="headColor" @row-dblclick="queryOperStatus">
              <!-- <ep-table-item type="select" v-if="!isDtBody"></ep-table-item> -->
              <ep-table-item column="opt" title="操作" width="200" v-if="bodyOutChange">
                <template slot-scope="props">
                  <wms-icon type="edit" v-if="updateShow||props.row.modfMarkcd==1 || props.row.modfMarkcd==3" @click="doBodyUpdate(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="cancel" @click="doBodyDelete(props.row,props.row.id)"></wms-icon>
                </template>
              </ep-table-item>
              <ep-table-item column="gdsMtno" width="150" title="商品料号">
                <template slot-scope="props">
                  <p class="text-style">{{ props.row.gdsMtno }}</p>
                </template>
              </ep-table-item>
              <ep-table-item column="gdecd" width="150" title="商品编码"></ep-table-item>
              <ep-table-item column="gdsNm" width="150" title="商品名称">
                <template slot-scope="props">
                  <p class="text-style">{{ props.row.gdsNm }}</p>
                </template>
              </ep-table-item>
              <ep-table-item column="gdsSpcfModelDesc" width="150" title="规格型号">
                <template slot-scope="props">
                  <p class="text-style">{{ props.row.gdsSpcfModelDesc }}</p>
                </template>
              </ep-table-item>
              <ep-table-item column="dclQty" width="150" title="申报数量"></ep-table-item>
              <ep-table-item
                column="unit1"
                width="150"
                title="法定单位"
                :formatter="dclUnitcdTranslate1"
              ></ep-table-item>
              <ep-table-item
                column="unit2"
                width="200"
                title="法定第二计量单位"
                :formatter="dclUnitcdTranslate2"
              ></ep-table-item>
              <ep-table-item
                column="bizopEtpsNo"
                width="150"
                title="申报计量单位"
                :formatter="dclUnitcdTranslate"
              ></ep-table-item>
              <ep-table-item column="modfMarkcd" width="150" title="修改标志代码" :formatter="modfMarkcdFormatter"></ep-table-item>
            </ep-table>
          </div>
          <div class="block">
            <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
          </div>
        </div>
      </div>
    </div>
    <ep-model title="变更表体" v-model="isShowSasDtModel" width="1600px">
      <bodyFormModel :bodyForm="bodyForm" :isShowModel="isShowSasDtModel" @onSelectDt="handleSelectDt" :tableData="tableData"></bodyFormModel>
    </ep-model>
  </div>
</template>

<script>
import mixin from "../mixin";
import misList from "src/common/mislist";
import { cloneObj } from "utils";
import bodyFormModel from "./bodyFormModel";
import SearchBody from "./SearchBody";
import bus from "./bus";
// import bus from "./bus";
export default {
  mixins: [mixin, misList],
  data() {
    return {
      changeEdit: false, //变更不允许修改的内容
      selectItem: {},
      dragEdits: false,
      editBody: false,
      customSearch: {},
      bodyForm: {
        whRecPreentNo: this.headerForm.whRecPreentNo,
        // gdsSeqno: "",
        gdsMtno: "",
        gdecd: "",
        gdsNm: "",
        gdsSpcfModelDesc: "",
        dclQty: "",
        bizopEtpsNo: "",//申报计量单位
        unit2: "",//法定第二计量单位
        unit1: "",//法定单位
        classifyType:'',//料件成本标志
      },
      isShowSasDtModel: false,
      page_rules: {
        gdsMtno: { required: true, message: "不能为空", trigger: "change" },
        gdecd: { required: true, message: "不能为空", trigger: "change" },
        gdsNm: { required: true, message: "不能为空", trigger: "change" },
        classifyType: { required: true, message: "不能为空", trigger: "change" },
        dclQty: { required: true, message: "不能为空", trigger: "change" },
        bizopEtpsNo: { required: true, message: "不能为空", trigger: "change" },
        natcd: { required: true, message: "不能为空", trigger: "change" },
      },
      isDisabled: false,

      headColor: true,
      tableData: [],
      tableDataCopy: this.listData,
      loading: false,
      model: false,
      ep_page: {
        page: 1,
        size: 10,
      },
      totalcount: 0,
      buttonStatus: "",
      disAbled: false,
      disa: false,
    };
  },
  props: {
    dragEdit: {
      type: Boolean,
      default: false,
    },
    headerForm: {
      type: Object,
      default: function () {
        return {};
      },
    },
    bodyOutChange: {
      // 变更时，根据单证类型判断表体是否可以变更
      type: Boolean,
      default: true,
    },
    updateShow: {
      type: Boolean,
      default: true,
    },
    listData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    changeType: {
      default: false,
    },

    displayBlock: {
      default: false,
    },

    dtDetailList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    // ieTypecdState: {
    //   type: String,
    //   default: ""
    // }
  },
  components: { bodyFormModel, SearchBody },
  created() {
    let unitList = this.$store.getters.getUnitList;
    this.dclUnitcds = unitList;
    let curr = this.$store.getters.getCurrList;
    this.currList = curr;
    if (this.isDtBody) this.page_rules = {};
  },
  beforeDestroy() {
    // bus.$off("deleteDtDetail");
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
      deep: true,
    },
    "bodyForm.dclQty"(val, oldVal) {
      if (
        val &&
        val !== null &&
        val.charAt(0) == "0" &&
        val.length > 1 &&
        val.charAt(1) !== "."
      ) {
        // this.$pop({
        //   type: 'danger',
        //   message: '请输入正确的数量'
        // })
      }
      let reg = /^\d{0,14}(\.\d{0,5})?$/;
      if (!reg.test(val)) {
        setTimeout(() => {
          this.bodyForm.dclQty = oldVal;
        });
      }
    },
  },
  methods: {
    // 拖拽生成的校验申报数量
    // checkDclQty(value) {
    //   console.log("value", value);
    //   let data = {
    //     stockBillNoPre: "",
    //     dtId: "",
    //   };
    //   data.stockBillNoPre = this.headerForm.inExpWhNo;
    //   data.dtId = this.selectItem.stockDtId;
    //   this.$post("getStockDtQty", data).then((res) => {
    //     if (res.status == 1) {
    //       let useQty = res.map.data.usedQty; // 已用数量
    //       let remainQty = res.map.data.remainQty; // 剩余数量
    //       let total = useQty * 1 + remainQty * 1;
    //       if (value > total) {
    //         this.$pop({
    //           type: "danger",
    //           message: "确认数量超过总数量",
    //         });
    //         this.bodyForm.dclQty = "";
    //       }
    //     }
    //     console.log(res);
    //   });
    // },
    bindBody(value) {
      console.log(value);
      this.bodyForm = cloneObj(value);
      this.selectItem = cloneObj(value);
    },
    doBodyChange() {
      this.isShowSasDtModel = true;
      this.disa = true;
    },
    queryOperStatus(event, row, index) {
      if (this.displayBlock) {
        this.bodyForm = row;
        this.model = true;
      }
    },
    reset(el) {
      this.$refs[el].reset();
    },
    doBodyAdd() {
      this.bodyForm = {
        gdsMtno: "",
        gdecd: "",
        gdsNm: "",
        gdsSpcfModelDesc: "",
        dclQty: "",
        bizopEtpsNo: "",//申报计量单位
        unit2: "",//法定第二计量单位
        unit1: "",//法定单位
        classifyType:'',
        modfMarkcd: "3",
      };

      this.buttonStatus = 2;
      this.model = true;
      if (this.changeType) {
        this.disAbled = true;
        this.disa = false;
      }
      this.$refs.bodyForm && this.$refs.bodyForm.reset();
    },
    doBodyUpdate(row, rowId) {
      let selectData = [row];
      if (this.changeType) {
        if (row.modfMarkcd == 3 || row.modfMarkcd == 1) {
          this.disAbled = true;
        } else {
          this.disAbled = false;
        }
        if (row.modfMarkcd == 1) {
          this.changeEdit = true;
        } else {
          this.changeEdit = false;
        }
      }
      this.buttonStatus = 1;

      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
      } else if (selectData.length > 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
      } else {
        this.localType = "修改"; //代表选中一条
        this.model = true;
        console.log(row);

        setTimeout(() => {
          this.bodyForm = cloneObj(selectData[0]);
        }, 100);
      }
      console.log("......");
      console.log(row);
    },
    doBodyDelete(row, rowId) {
      //删除table数据
      // let selectData = this.$refs.table.getData("select");
      let selectData = [row];

      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择数据",
        });
        return;
      }
      this.$confirm({
        word: "是否要删除所选条目信息！",
        callback: (errorInfo) => {
          if (errorInfo) {
            let allDelectIndex = [];

            let selectData = [row];
            selectData.forEach((e) => {
              let updateDate = this.tableDataCopy.findIndex((value) => {
                return value.leadId == e.leadId;
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
        },
      });
    },
    clearTable() {
      this.$emit("clearTable");
      this.$confirm({
        word: "是否要清空明细",
        callback: (info) => {
          if (info) {
            this.tableDataCopy = [];
            this.tableData = [];
          }
        },
      });
    },
    handleSelectDt(value) {
      // console.log("aaaaaaaaaaa")
      // console.log(value)
      // data.modfMarkcd = '1';
      // 变更
      this.bodyForm = cloneObj(value);
      this.model = true;
      this.buttonStatus = 2;
    },
    // 添加模板的确定按钮
    makeSure() {
      setTimeout(() => {
        this.$refs["bodyForm"].validate((valid) => {
          if (valid) {
            if (this.buttonStatus == 0) {
              return;
            } else if (this.buttonStatus == 1) {
              let bodyForm = this.bodyForm;
              this.indexChange = this.$refs.table.getDataIndex("select")[0];
              this.tableData.splice(this.indexChange, 1, cloneObj(bodyForm));
              let updateDate = this.tableDataCopy.findIndex((value) => {
                return value.leadId == bodyForm.leadId;
              });
              this.tableDataCopy.splice(updateDate, 1, cloneObj(bodyForm));
              this.$refs.bodyForm && this.$refs.bodyForm.reset();
              this.isShowSasDtModel = false;
              this.model = false;
              this.$refs.bodyForm && this.$refs.bodyForm.reset();
              this.buttonStatus = 0;
            } else if (this.buttonStatus == 2) {
              this.bodyForm.leadId =
                this.tableDataCopy[this.tableDataCopy.length - 1] == undefined
                  ? 0
                  : this.tableDataCopy[this.tableDataCopy.length - 1].leadId +
                    1;
              let bodyForm = this.bodyForm;
              this.tableData.push(cloneObj(bodyForm));
              this.tableDataCopy.push(cloneObj(bodyForm));
              this.totalcount++;
              this.ep_page.page = Math.ceil(
                this.totalcount / this.ep_page.size
              );
              this.buttonStatus = 2;
              this.$refs.bodyForm && this.$refs.bodyForm.reset();
              this.model = false;
              this.isShowSasDtModel = false;
            }
          }
        });
      }, 200);
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
        return data.filter((item) => {
          return Object.keys(condition).every((key) => {
            if (condition[key] == "") return true;
            let diff =
              key == "gdsNm"
                ? String(item[key])
                    .toLowerCase()
                    .indexOf(String(condition[key]).trim().toLowerCase()) !== -1
                : String(item[key]).toLowerCase() ==
                  String(condition[key]).trim().toLowerCase();
            return diff;
          });
        });
      };
      return filter(condition, data);
    },
  },
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

