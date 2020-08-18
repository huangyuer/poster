<template>
  <div>
    <ep-model title="过卡凭证明细" v-model="model" width="1250px" :wrap-close="false">
      <ep-form ref="bodyDtForm" :form="bodyDtForm" :rules="page_rules1" name-width="168px">
        <ep-row :gutter="7">
          <!-- <ep-col :col="8">
            <ep-form-item attr="portNo" label="凭证编号">
              <ep-input v-model="bodyDtForm.portNo" disabled name="portNo" :maxlength="20"></ep-input>
            </ep-form-item>
          </ep-col>-->
          <ep-col :col="8">
            <ep-form-item attr="gdsSeqno" label="明细序号">
              <ep-input v-model.trim="bodyDtForm.gdsSeqno" disabled name="gdsSeqno"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="rltNo" label="关联单证编号">
              <ep-input v-model.trim="bodyDtForm.rltNo" disabled name="rltNo"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <!-- 用户填写 -->
            <ep-form-item attr="rltSeqno" label="关联表体序号" v-if="rltSeqnoStatus || disabledStatus">
              <ep-input v-model.trim="bodyDtForm.rltSeqno" name="rltSeqno" :maxlength="10" @blur="rltSeqnoBlur" :disabled='editBody'></ep-input>
            </ep-form-item>
          </ep-col>

          <ep-col :col="8">
            <ep-form-item attr="gdsMtno" label="商品料号">
              <ep-input v-model.trim="bodyDtForm.gdsMtno" :disabled="rltSeqnoStatus|| status || dragEdit || disabledStatus" name="gdsMtno" :maxlength="32"></ep-input>
            </ep-form-item>
          </ep-col>

          <ep-col :col="8">
            <ep-form-item attr="gdecd" label="商品编码">
              <ep-input v-model.trim="bodyDtForm.gdecd" :disabled="rltSeqnoStatus ||status || dragEdit || disabledStatus" name="gdecd" :maxlength="10"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="gdsNm" label="商品名称">
              <ep-input v-model.trim="bodyDtForm.gdsNm" :disabled="rltSeqnoStatus ||status || dragEdit || disabledStatus " name="gdsNm" :maxlength="768"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="gdsSpcfModelDesc" label="规格型号">
              <ep-input v-model.trim="bodyDtForm.gdsSpcfModelDesc" :disabled="rltSeqnoStatus|| dragEdit  || disabledStatus" name="gdsSpcfModelDesc" :maxlength="768"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="dclCurrcd" label="币制">
              <ep-select ref="dclCurrcdSelect" v-model="bodyDtForm.dclCurrcd" :disabled="rltSeqnoStatus || dragEdit || disabledStatus" name="dclCurrcd" filterable>
                <ep-select-item v-for="(item, index) in currList" :key="index" :index="item.currCode" :label="item.currName + ' ' + item.currCode"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <!-- 用户只允许修改数量 -->
            <ep-form-item attr="dclQty" label="申报数量">
              <ep-input v-if="stockBillNo" v-model.trim="bodyDtForm.dclQty" name="dclQty" :maxlength="19" @blur="checkDclQty(bodyDtForm.dclQty)"></ep-input>
              <ep-input v-else v-model.trim="bodyDtForm.dclQty" name="dclQty" :maxlength="19"></ep-input>
            </ep-form-item>

          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="dclUnitcd" label="申报计量单位">
              <loc-codemap-select :disabled="rltSeqnoStatus ||status || dragEdit || disabledStatus" :name="'dclUnitcd'" :code="'unit'" :cName="'unitName'" :dataList="dclUnitcds" :value.sync="bodyDtForm.dclUnitcd"></loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="natcd" label="原产国(地区)">
              <loc-codemap-select :disabled="rltSeqnoStatus || dragEdit || disabledStatus" :name="'natcd'" :code="'countryCode'" :cName="'nameCn'" :dataList="countrys" :value.sync="bodyDtForm.natcd"></loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="netWt" label="净重">
              <ep-input v-model.trim="bodyDtForm.netWt" :disabled="rltSeqnoStatus || dragEdit || disabledStatus" name="netWt" :maxlength="19"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="dclTotalAmt" label="总价">
              <ep-input v-model.trim="bodyDtForm.dclTotalAmt" :disabled="rltSeqnoStatus|| dragEdit || disabledStatus" name="dclTotalAmt" :maxlength="19"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
              <ep-form-item attr="classifyType" label="料件 /成品标志" v-if='classifyTypeStatus'>
                 <ep-select v-model="bodyDtForm.classifyType"  name="classifyType" :disabled="rltSeqnoStatus|| dragEdit || disabledStatus"  >
                                  <ep-select-item index="I" label="料件"></ep-select-item>
                                  <ep-select-item index="E" label="成品"></ep-select-item>
                                  <ep-select-item index="S" label="设备"></ep-select-item>
                                  <ep-select-item index="L" label="边角料"></ep-select-item>
                                  <ep-select-item index="D" label="残次品"></ep-select-item>
                                </ep-select>
                            </ep-form-item>
                        </ep-col>
           <ep-col :col="8">
                          <ep-form-item attr="goodsType" label="货物类型" v-if='classifyTypeStatus'>
                              <ep-select                   v-model="bodyDtForm.goodsType"   name="goodsType"                   disabled       >
                                  <ep-select-item index="1" label="普通"></ep-select-item>
                <!--                   <ep-select-item index="2" label="增料"></ep-select-item> -->
                                </ep-select>
                            </ep-form-item>
                        </ep-col> 
        </ep-row>
        <div style="text-align: center;">
          <WmsButton @click="makeSure(localType)">确定</WmsButton>
          <WmsButton @click="model = !model" icon="close" :loading="loading">关闭</WmsButton>

          <!-- <ep-button type="primary" size="small" @click="makeSure(localType)" icon="checkmark-round">确定</ep-button> -->
          <!-- <ep-button type="danger" size="small" @click="model = !model" icon="close" :loading="loading">关闭</ep-button> -->
        </div>
      </ep-form>
      <SearchBody @oneDates="bindBody" v-if="dragEdits" :stockBillNo="stockBillNo" :tableDataBody="tableDataUpdata"></SearchBody>
      <SearchTable :needDate='searchData' @oneDate="oneDate" :updata="updata" v-if='validateStatus' />
    </ep-model>

    <div class="ep-card card-margin relative">
      <div class="card-body">
        <div class="block">
          <!-- <ep-button type="primary" size="small" @click="doBodyAdd" icon="plus-round">添加</ep-button> -->
          <WmsButton v-if='dragFlag' style="margin-left:0px;" @click="doBodyAdd">添加</WmsButton>
          <!--
          <ep-button type="primary" size="small" @click="doBodyUpdate" icon="edit">修改</ep-button>
          <ep-button type="danger" size="small" @click="doBodyDelete" icon="trash-a">删除</ep-button> -->
          <!-- <ep-button type="danger" size="small" @click="clearTable" icon="trash-a">清空</ep-button> -->
        </div>
        <div class="block">
          <ep-table ref="table" border :height="400" :data="updata?tableDataUpdata:tableData" :head-color="headColor">
            <!-- <ep-table-item type="select"></ep-table-item> -->
            <ep-table-item column="opt" title="操作" width="200" v-if='dragFlag'>
              <template slot-scope="props">
                <wms-icon type="edit" @click="doBodyUpdate(props.row,props.row.id)"></wms-icon>
                <wms-icon type="cancel" @click="doBodyDelete(props.row,props.row.id)"></wms-icon>
              </template>
            </ep-table-item>
            <ep-table-item column="portNo" width="210" title="凭证编号"></ep-table-item>
            <ep-table-item column="gdsSeqno" width="120" title="明细序号"></ep-table-item>
            <ep-table-item column="rltNo" width="210" title="关联单证编号"></ep-table-item>
            <ep-table-item column="rltSeqno" width="140" title="关联表体序号"></ep-table-item>
            <ep-table-item column="gdsMtno" width="200" title="商品料号"></ep-table-item>
            <ep-table-item column="gdecd" width="180" title="商品编码"></ep-table-item>
            <ep-table-item column="gdsNm" width="200" title="商品名称"></ep-table-item>
            <ep-table-item column="gdsSpcfModelDesc" width="200" title="规格型号"></ep-table-item>
            <ep-table-item column="dclCurrcd" width="180" title="币制" :formatter="dclCurrcdFormatter"></ep-table-item>
            <ep-table-item column="dclQty" width="150" title="申报数量"></ep-table-item>
            <ep-table-item column="dclUnitcd" width="140" title="申报计量单位" :formatter="dclUnitcdTranslate"></ep-table-item>
            <ep-table-item column="natcd" width="150" title="原产国(地区)" :formatter="natcdTranslate"></ep-table-item>
            <ep-table-item column="netWt" width="150" title="净重"></ep-table-item>
            <ep-table-item column="dclTotalAmt" width="150" title="总价"></ep-table-item>
            <ep-table-item column="classifyType" width="150" title='料件/成品标志' :formatter="classifyType" v-if='classifyTypeStatus'></ep-table-item>
            <ep-table-item column="goodsType" width="150" title='货物类型' :formatter="goodsType" v-if='classifyTypeStatus'></ep-table-item>

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
import mixin from "../mixin";
import { cloneObj } from "utils";
import SearchTable from "./SearchTable";
import SearchBody from "./SearchBody";

export default {
  extends: misList, // 务必继承
  mixins: [mixin],
  components: {
    SearchTable,
    SearchBody,
  },
  props: {
    stockBillNo: {
      type: String,
      default: "",
    },
    dragFlag: {
      type: Boolean,
      default: true,
    },
    dragEdit: {
      type: Boolean,
      default: false,
    },
    listData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    listDataUpdata: {
      type: Array,
      default: function () {
        return [];
      },
    },
    updata: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
  },
  data() {
    return {
      editBody: false,
      classifyTypeStatus: false, // 料件成品是否有
      disabledStatus: false, // 外发加工兼容卡口表体做处理
      dragEdits: false,
      status1: false,
      status: false,
      rltSeqnoStatu: false,
      validateStatus: true,
      searchData: {},
      dclQtyTotal: 0,
      disabledDt: true, // 表体是否显示
      model: false, // 表体弹窗
      loading: false,
      headColor: true,
      rltSeqnoStatus: false, // 关联表体序号是否存在
      rltSe: false,
      ep_page: {
        page: 1,
        size: 10,
      },
      totalcount: 0,
      tableData: [],
      tableDataUpdata: [], //  修改页面
      tableDataCopy: this.listData,
      tableDataCopyUpdata: this.listDataUpdata,
      dclUnitcd: [],
      bodyDtForm: {
        id: "",
        pid: "",
        orgId: this.$store.getters.getId, //  必填
        portNo: "", //凭证编号
        rltNo: "", //关联单证编号
        rltSeqno: "", // 关联表体序号
        gdsSeqno: "", // 明细序号 必填
        gdsMtno: "", // 商品料号  必填
        gdecd: "", //  商品编码   必填
        gdsNm: "", // 商品名称   必填
        gdsSpcfModelDesc: " ", // 规格型号
        dclCurrcd: "", // 币制
        dclQty: "", // 申报数量  必填
        dclUnitcd: "", //  申报计量单位  必填
        natcd: "", //原产国（地区）
        netWt: "", // 净重
        dclTotalAmt: "", // 总价
        classifyType: "",
        goodsType: "",
      },
      page_rules1: {
        orgId: { required: true, message: "不能为空", trigger: "change" },
        dclCurrcd: { required: true, message: "不能为空", trigger: "change" },
        gdsMtno: { required: true, message: "不能为空", trigger: "change" },
        gdecd: { required: true, message: "不能为空", trigger: "change" },
        gdsNm: { required: true, message: "不能为空", trigger: "change" },
        dclQty: { required: true, message: "不能为空", trigger: "change" },
        dclUnitcd: { required: true, message: "不能为空", trigger: "change" },
        natcd: { required: true, message: "不能为空", trigger: "change" },
        dclTotalAmt: {
          required: false,
          message: "不能为空",
          trigger: "change",
        },
        classifyType: {
          required: false,
          message: "不能为空",
          trigger: "change",
        },
        rltSeqno: { required: false, message: "不能为空", trigger: "change" },
      },
      unitList: [],
      customSearch: {
        rltSeqno: "", // 关联表体序号
        // 关联单证编号
      },
      firstLoad: false,
      localType: "",
      selectItem: {},
    };
  },
  created() {
    let unitList = this.$store.getters.getUnitList;
    this.dclUnitcds = unitList;
    this.currList = this.$store.getters.getCurrList;
  },
  mounted() {
    if (this.updata) {
      this.makePaging(10, 1, this.tableDataCopyUpdata);
    } else {
      this.makePaging(10, 1, this.tableDataCopy);
    }
  },
  watch: {
    dragEdit: {
      handler(newData, olddata) {
        if (newData) {
          this.dragEdits = true;
        }
      },
      immediate: true,
    },
    listData: {
      handler(newData, olddata) {
        console.log("数据发生编号");
        this.tableDataCopy = newData;
        this.makePaging(
          this.ep_page.size,
          this.ep_page.page,
          this.tableDataCopy
        );
      },
      immediate: true,
      deep: true,
    },
    listDataUpdata: {
      handler(newData, olddata) {
        console.log("数据发生编号", newData);
        this.tableDataCopyUpdata = newData;
        this.makePaging(
          this.ep_page.size,
          this.ep_page.page,
          this.tableDataCopyUpdata
        );
      },
      immediate: true,
      deep: true,
    },
    "bodyDtForm.dclQty": {
      handler(newName, oldName) {
        if (newName === "0") {
          this.$pop({
            type: "danger",
            message: "申报数量不能是零",
          });
          setTimeout(() => {
            this.bodyDtForm.dclQty = "";
          });
          return;
        }
        if (
          newName !== null &&
          newName.charAt(0) == "0" &&
          newName.length > 1 &&
          newName.charAt(1) !== "."
        ) {
          this.$pop({
            type: "danger",
            message: "请输入正确的确认数量",
          });
        }
        if (isNaN(newName * 1)) {
          this.$pop({
            type: "danger",
            message: "请输入正确的确认数量",
          });
        }
        let reg = /^\d{0,13}(\.\d{0,5})?$/;
        if (!reg.test(newName)) {
          setTimeout(() => {
            this.bodyDtForm.dclQty = oldName;
          });
        }
      },
    },
    "bodyDtForm.dclTotalAmt": {
      handler(newName, oldName) {
        if (
          newName !== null &&
          newName.charAt(0) == "0" &&
          newName.length > 1 &&
          newName.charAt(1) !== "."
        ) {
          this.$pop({
            type: "danger",
            message: "请输入正确的总价",
          });
        }
        let reg = /^\d{0,13}(\.\d{0,5})?$/;
        if (!reg.test(newName)) {
          setTimeout(() => {
            this.bodyDtForm.dclTotalAmt = oldName;
          });
        }
        if (isNaN(newName * 1)) {
          this.$pop({
            type: "danger",
            message: "请输入正确的总价",
          });
        }
      },
    },
    "bodyDtForm.netWt": {
      handler(newName, oldName) {
        if (
          newName !== null &&
          newName.charAt(0) == "0" &&
          newName.length > 1 &&
          newName.charAt(1) !== "."
        ) {
          this.$pop({
            type: "danger",
            message: "请输入正确的净重",
          });
        }
        let reg = /^\d{0,13}(\.\d{0,5})?$/;
        if (!reg.test(newName)) {
          setTimeout(() => {
            this.bodyDtForm.netWt = oldName;
          });
        }
        // let reg = /\d+(\.\d{0,5})?/
        // if (reg.test(newName)) {
        //   setTimeout(() => {
        //     this.bodyDtForm.netWt = newName.match(/\d+(\.\d{0,5})?/)[0] || ''
        //   })
        // } else {
        //   setTimeout(() => {
        //     this.bodyDtForm.netWt = ''
        //   })
        // }
        if (isNaN(newName * 1)) {
          this.$pop({
            type: "danger",
            message: "请输入正确的净重",
          });
        }
      },
      immediate: true,
      deep: true,
    },
    rltTbTypecdStatus: {
      handler(newName, oldName) {
        let bindtype = this.$store.getters.getBindTypecd;
        console.log("进出区", newName, oldName);
        if (newName == 1 || newName == 2 || newName == 4 || newName == 5) {
          this.validateStatus = false;
          if (bindtype == 3) {
            this.rltSeqnoStatus = true;
            this.rltSeqnoStatu = true;
          } else {
            this.rltSeqnoStatus = false;
            this.rltSeqnoStatu = false;
          }
        } else if (
          newName == 3 ||
          newName == 7 ||
          newName == 8 ||
          newName == 9
        ) {
          // 出入库类型 3 7 8 总价必填
          if (this.ieTypecdStatus == "E") {
            this.page_rules1.dclTotalAmt.required = true;
          } else {
            this.page_rules1.dclTotalAmt.required = false;
          }
        } else if (newName == 6) {
          this.validateStatus = true;
          this.rltSeqnoStatus = false;
          this.status = true;
          this.page_rules1.gdecd.required = false;
        }
        // else if(newName==7 && this.ieTypecdStatus == "I"){
        //   this.rltSeqnoStatus = true;
        // }
        else {
          this.validateStatus = false;
          this.rltSeqnoStatus = false;
          this.status = false;
          this.page_rules1.gdecd.required = true;
        }
        if (newName == 8 && this.ieTypecdStatus == "I") {
          this.classifyTypeStatus = true;
        } else {
          this.classifyTypeStatus = false;
        }
      },
      immediate: true,
      deep: true,
    },

    editStatus: {
      handler(newName, oldName) {
        console.log("bangdingleix", newName);
        let rltstatus = this.rltTbTypecdStatus;
        if (
          rltstatus == 1 ||
          rltstatus == 2 ||
          rltstatus == 4 ||
          rltstatus == 5
        ) {
          if (newName == 3) {
            this.rltSeqnoStatus = true;
          } else {
            this.rltSeqnoStatus = false;
          }
        } else {
          this.rltSeqnoStatus = false;
        }
      },
      immediate: true,
      deep: true,
    },
    // 进出口类型改变
    ieTypecdStatus: {
      handler(newName, oldName) {
        let rltstatus = this.rltTbTypecdStatus;
        if (
          (newName == "E" && rltstatus == 3) ||
          (newName == "E" && rltstatus == 7) ||
          (newName == "E" && rltstatus == 8) ||
          (newName == "E" && rltstatus == 9)
        ) {
          //  判断总价是否必填
          this.page_rules1.dclTotalAmt.required = true;
        } else {
          this.page_rules1.dclTotalAmt.required = false;
        }
        if (newName == "I" && this.rltTbTypecdStatus == "8") {
          this.classifyTypeStatus = true;
        } else {
          this.classifyTypeStatus = false;
        }
      },
    },
    clearDetatype: {
      handler(newName, oldName) {
        if (this.$route.query.id && this.firstLoad) {
          console.log("清空数据-表体-updata页面");
          this.tableDataUpdata = [];
          this.tableDataCopyUpdata = [];
        } else {
          console.log("清空数据 -表体-生成页面");
          this.tableData = [];
          this.tableDataCopy = [];
        }
        this.firstLoad = true;
      },
      immediate: true,
    },
  },
  computed: {
    // creditCardStatus () {
    //   return this.disabledDt;
    // },
    editStatus() {
      if (this.updata) {
        console.log(
          "body----修改页面，绑定类型",
          this.$store.getters.getBindTypecdEdit
        );

        return this.$store.getters.getBindTypecdEdit;
      } else {
        console.log("body----生成页面,绑定类型");

        return this.$store.getters.getBindTypecd;
      }
    },
    countrys() {
      return this.$store.getters.getCountryList;
    },
    rltTbTypecdStatus() {
      if (this.updata) {
        console.log(
          "body----修改页面",
          this.$store.getters.getInExpTypeStatusEdit
        );
        return this.$store.getters.getInExpTypeStatusEdit;
      } else {
        console.log("body----生成页面");

        return this.$store.getters.getInExpTypeStatus;
      }
    },
    ieTypecdStatus() {
      // 进出标志
      if (this.updata) {
        return this.$store.getters.getIoTypecdStatusEdit;
      } else {
        return this.$store.getters.getIoTypecdStatus;
      }
    },
    // 清空表体书
    clearDetatype() {
      if (this.updata) {
        return this.$store.getters.getClearDataEdit;
      } else {
        return this.$store.getters.getClearData;
      }
    },
  },
  methods: {
    // 拖拽生成的校验申报数量
    checkDclQty(value) {
      console.log("value", value);
      let data = {
        stockBillNoPre: "",
        dtId: "",
      };
      data.stockBillNoPre = this.stockBillNo;
      if (this.dragEdits) {
        data.dtId = this.bodyDtForm.stockDtId;
      } else {
        data.dtId = this.selectItem.stockDtId;
      }
      this.$post("getStockDtQty", data).then((res) => {
        if (res.status == 1) {
          let useQty = res.map.data.usedQty; // 已用数量
          let remainQty = res.map.data.remainQty; // 剩余数量
          let total = useQty * 1 + remainQty * 1;
          if (value > total) {
            this.$pop({
              type: "danger",
              message: "确认数量超过总数量",
            });
            this.bodyDtForm.dclQty = total + "";
            this.bodyDtForm.dclTotalAmt =
              (total * res.map.data.unitPrice).toFixed(5) + "";
          } else {
            this.bodyDtForm.dclTotalAmt =
              (value * 1 * res.map.data.unitPrice).toFixed(5) + "";
          }
        }
        console.log(res);
      });
    },
    oneDate(value) {
      console.log("传递过来的数据", value);
      let values = value;
      values.netWt = null;
      this.bodyDtForm = cloneObj(values);
      if (values.remainQty) {
        this.bodyDtForm.dclQty = values.remainQty + "";
      } else {
        this.bodyDtForm.dclQty = "";
      }
      setTimeout(() => {
        this.bodyDtForm.rltNo = value.billNo;
        this.bodyDtForm.rltSeqno = value.gdsSeqno;
      }, 10);
      this.bodyDtForm.gdsSeqno = null;
    },
    bindBody(value) {
      console.log(value);
      this.bodyDtForm = cloneObj(value);
    },
    dclQtyChange(value) {
      let count = this.dclQtyTotal;
      console.log("数量发生改变", value, count, this.dclQtyTotal);
      if (value * 1 > this.dclQtyTotal && this.editStatus == 3) {
        this.$pop({
          type: "danger",
          message: "确认数量超过总数量",
        });
        setTimeout(() => {
          this.bodyDtForm.dclQty = count;
        });
      }
    },
    // 根据表体序号 查询表体数据
    rltSeqnoBlur() {
      let whareHouse = null;
      if (this.updata) {
        whareHouse = JSON.parse(sessionStorage.getItem("formlated1"));
      } else {
        whareHouse = JSON.parse(sessionStorage.getItem("formlated"));
      }

      if (!whareHouse) {
        this.$pop({
          type: "danger",
          message: "请选择关联单证",
        });
        return;
      }

      if (this.rltTbTypecdStatus == 7 || this.rltTbTypecdStatus == 9) {
        let data = {
          rltNo: "",
          rltSeqno: "",
        };
        data.rltNo = whareHouse.rltNo;
        data.rltSeqno = this.bodyDtForm.rltSeqno;
        this.$refs.bodyDtForm && this.$refs.bodyDtForm.reset();
        this.$post("getPortRltSeqno", data)
          .then((res) => {
            this.bodyDtForm = res.map.data;
            this.bodyDtForm.rltSeqno = res.map.data.gdsSeqno;
            this.bodyDtForm.dclQty = res.map.data.remainQty;
            this.bodyDtForm.rltNo = res.map.data.portNo;
            this.bodyDtForm.portNo = "";
            this.bodyDtForm.gdsSeqno = "";
          })
          .catch((e) => {
            this.forreset();
            console.log(e);
          });
      } else if (this.rltTbTypecdStatus == 8) {
        let data = {
          consumptionNo: "",
          gdsSeqNos: "",
        };
        data.consumptionNo = whareHouse.rltNo;
        data.gdsSeqNos = this.bodyDtForm.rltSeqno;

        this.$post("expendGetBodyBySeqNo", data)
          .then((res) => {
            this.bodyDtForm = res.map.data;
            this.bodyDtForm.rltSeqno = res.map.data.gdsSeqno;
            this.dclQtyTotal = res.map.data.dclQty;
            this.bodyDtForm.dclTotalAm = "";
            this.bodyDtForm.dclTotalAmt = "";
            this.bodyDtForm.dclQty = res.map.data.remainQty;
            this.bodyDtForm.netWt = "";
            this.bodyDtForm.rltNo = whareHouse.rltNo;
            this.bodyDtForm.dclUnitcd = res.map.data.bizopEtpsNo;
            this.bodyDtForm.gdsSeqno = "";
          })
          .catch((e) => {
            this.forreset();
            console.log(e);
          });
      } else {
        let data = {
          whNo: null,
          gdsSeqNos: null,
        };
        data.whNo = whareHouse.rltNo;
        data.gdsSeqNos = this.bodyDtForm.rltSeqno;

        this.$post("getDtDetailsListBySeqNo", data)
          .then((res) => {
            if (res.map) {
              this.bodyDtForm = cloneObj(res.map.data);
              this.bodyDtForm.rltSeqno = res.map.data.gdsSeqno;
              this.dclQtyTotal = res.map.data.dclQty;
              this.bodyDtForm.rltNo = res.map.data.whRecPreentNo;
              this.bodyDtForm.gdsSeqno = "";
            } else {
              console.log("----------");

              this.forreset();
            }
          })
          .catch((e) => {
            this.forreset();

            console.log(e);
          });
      }
    },
    forreset() {
      console.log("----------");
      this.bodyDtForm = {
        id: "",
        pid: "",
        orgId: this.$store.getters.getId, //  必填
        portNo: "", //凭证编号
        rltNo: "", //关联单证编号
        rltSeqno: "", // 关联表体序号
        gdsSeqno: "", // 明细序号 必填
        gdsMtno: "", // 商品料号  必填
        gdecd: "", //  商品编码   必填
        gdsNm: "", // 商品名称   必填
        gdsSpcfModelDesc: " ", // 规格型号
        dclCurrcd: "", // 币制
        dclQty: "", // 申报数量  必填
        dclUnitcd: "", //  申报计量单位  必填
        natcd: "", //原产国（地区）
        netWt: "", // 净重
        dclTotalAmt: "", // 总价
        classifyType: "",
        goodsType: "",
      };
      this.$refs.bodyDtForm && this.$refs.bodyDtForm.reset();
    },
    // 分页
    makePaging(size, page, data) {
      let begin = (page - 1) * size;
      let end = begin + size;
      let newData = data.slice(begin, end);
      this.totalcount = data.length;
      if (this.$route.query.id) {
        console.log("this.tableDataUpdata", data, newData);
        this.tableDataUpdata = newData;
      } else {
        this.tableData = newData;
      }
    },
    // 翻页
    handleCurrentChange(val) {
      this.ep_page.page = val;
      if (this.updata) {
        this.makePaging(
          this.ep_page.size,
          this.ep_page.page,
          this.filterData(this.customSearch, this.tableDataCopyUpdata)
        );
      } else {
        this.makePaging(
          this.ep_page.size,
          this.ep_page.page,
          this.filterData(this.customSearch, this.tableDataCopy)
        );
      }
    },
    // 每页条数
    handleSizeChange(val) {
      this.ep_page.size = val;
      if (this.updata) {
        this.makePaging(
          this.ep_page.size,
          this.ep_page.page,
          this.filterData(this.customSearch, this.tableDataCopyUpdata)
        );
      } else {
        this.makePaging(
          this.ep_page.size,
          this.ep_page.page,
          this.filterData(this.customSearch, this.tableDataCopy)
        );
      }
    },
    doBodyDelete(row, rowId) {
      //删除table数据
      let selectDatas = row;
      // console.log("llllll", selectData);
      // if (selectData.length == 0) {
      //   this.$pop({
      //     type: "danger",
      //     message: "请选择数据"
      //   });
      //   return;
      // }
      this.$confirm({
        word: "是否要删除所选条目信息！",
        callback: (errorInfo) => {
          if (errorInfo) {
            let allDelectIndex = [];
            let selectData = [selectDatas];
            console.log("selectData", selectData);
            if (this.$route.query.id) {
              selectData.forEach((e) => {
                if (e.leadId == undefined) {
                  filterData = this.tableDataCopyUpdata.filter((value) => {
                    return value.id !== e.id;
                  });
                } else {
                  filterData = this.tableDataCopyUpdata.filter((value) => {
                    return value.leadId !== e.leadId;
                  });
                }
                this.tableDataCopyUpdata = filterData;
              });
              // allDelectIndex = allDelectIndex.sort((a, b) => b - a);
              // allDelectIndex.forEach((num, i) => {
              //   this.tableDataCopy.splice(num, 1)
              // })
              let filterData = this.filterData(
                this.customSearch,
                this.tableDataCopyUpdata
              );
              this.makePaging(this.ep_page.size, this.ep_page.page, filterData);
              // this.ep_page.page = 1
            } else {
              selectData.forEach((e) => {
                if (e.leadId == undefined) {
                  filterData = this.tableDataCopy.filter((value) => {
                    return value.id !== e.id;
                  });
                } else {
                  filterData = this.tableDataCopy.filter((value) => {
                    return value.leadId !== e.leadId;
                  });
                }
                this.tableDataCopy = filterData;
              });
              // allDelectIndex = allDelectIndex.sort((a, b) => b - a);
              // allDelectIndex.forEach((num, i) => {
              //   this.tableDataCopy.splice(num, 1)
              // })
              let filterData = this.filterData(
                this.customSearch,
                this.tableDataCopy
              );
              this.makePaging(this.ep_page.size, this.ep_page.page, filterData);
              // this.ep_page.page = 1
            }
            this.localType = "";
          } else {
            return;
          }
        },
      });
    },
    //修改
    doBodyUpdate(row, rowId) {
      this.editBody = true;

      if (this.dragEdit) {
        this.dragEdits = false;
        this.selectItem = row;
      }
      console.log("bodyDtForm.dclQty", this.selectItem);
      // this.dragEdit = false;
      let selectData = row;
      // if (selectData.length === 0) {
      //   this.$pop({
      //     type: "danger",
      //     message: "请选择一条数据"
      //   });
      // } else if (selectData.length > 1) {
      //   this.$pop({
      //     type: "danger",
      //     message: "请选择一条数据"
      //   });
      // } else {
      this.localType = "修改"; //代表选中一条
      this.bodyDtForm = cloneObj(selectData);
      this.model = true;
      if (this.rltTbTypecdStatus == 6 && this.editStatus == 3) {
        // 径予类型，表体校验
        this.validateStatus = false;
        setTimeout(() => {
          this.validateStatus = true;
        });
        this.status = true;
        this.page_rules1.gdecd.required = false;
        if (this.ieTypecdStatus == "I") {
          this.page_rules1.gdecd.required = false;
          this.page_rules1.dclCurrcd.required = false;
          this.page_rules1.gdsMtno.required = false;
          this.page_rules1.gdecd.required = false;
          this.page_rules1.dclQty.required = false;
          this.page_rules1.dclUnitcd.required = false;
          this.page_rules1.natcd.required = false;
        } else if (this.ieTypecdStatus == "E") {
          this.page_rules1.gdecd.required = false;
          this.page_rules1.gdsMtno.required = true;
          this.page_rules1.dclQty.required = true;
          this.page_rules1.dclUnitcd.required = true;
          this.page_rules1.dclCurrcd.required = false;
          this.page_rules1.natcd.required = false;
          this.page_rules1.classifyType.required = false;
        }
      } else {
        this.validateStatus = false;
        this.status = false;
        this.page_rules1.gdecd.required = true;
        this.page_rules1.dclCurrcd.required = true;
        this.page_rules1.gdsMtno.required = true;
        this.page_rules1.gdecd.required = true;
        this.page_rules1.dclQty.required = true;
        this.page_rules1.dclUnitcd.required = true;
        this.page_rules1.natcd.required = true;
        this.page_rules1.classifyType.required = false;
      }
      // 出入库类型 7,8 表体校验
      if (
        (this.rltTbTypecdStatus == 7 && this.ieTypecdStatus == "I") ||
        (this.rltTbTypecdStatus == 9 && this.ieTypecdStatus == "I")
      ) {
        this.page_rules1.classifyType.required = true;
        this.rltSeqnoStatus = true;
        this.page_rules1.rltSeqno.required = true;
      } else if (
        (this.rltTbTypecdStatus == 7 && this.ieTypecdStatus == "E") ||
        (this.rltTbTypecdStatus == 8 && this.ieTypecdStatus == "E") ||
        (this.rltTbTypecdStatus == 9 && this.ieTypecdStatus == "E")
      ) {
        this.rltSeqnoStatus = false;
        this.disabledStatus = false;
        this.page_rules1.classifyType.required = true;
        this.page_rules1.rltSeqno.required = false;
      }
      if (this.rltTbTypecdStatus == 8 && this.ieTypecdStatus == "I") {
        // this.page_rules1.dclCurrcd.required = false;
        // this.page_rules1.natcd.required = false;
        this.rltSeqnoStatus = false;
        this.page_rules1.classifyType.required = true;
        this.disabledStatus = true;
      } else {
        this.disabledStatus = false;
      }
      // else {
      //   this.page_rules1.dclCurrcd.required = true;
      //   this.page_rules1.natcd.required = true;
      //   this.disabledStatus = false;
      //   this.rltSeqnoStatus = false;
      // }
      // }
    },
    doBodyAdd() {
      this.editBody = false;
      if (this.dragEdit) {
        this.dragEdits = true;
      }
      this.model = true;
      this.bodyDtForm = {
        id: "",
        pid: "",
        orgId: this.$store.getters.getId, //  必填
        portNo: "", //凭证编号
        rltNo: "", //关联单证编号
        rltSeqno: "", // 关联表体序号
        gdsSeqno: "", // 明细序号 必填
        gdsMtno: "", // 商品料号  必填
        gdecd: "", //  商品编码   必填
        gdsNm: "", // 商品名称   必填
        gdsSpcfModelDesc: " ", // 规格型号
        dclCurrcd: "", // 币制
        dclQty: "", // 申报数量  必填
        dclUnitcd: "", //  申报计量单位  必填
        natcd: "", //原产国（地区）
        netWt: "", // 净重
        dclTotalAmt: "", // 总价
        classifyType: "",
        goodsType: "",
      };
      this.$refs.bodyDtForm && this.$refs.bodyDtForm.reset();
      this.localType = "添加";
      // if(this.rltTbTypecdStatus==7&&this.ieTypecdStatus=="I"){

      // }
      if (this.rltTbTypecdStatus == 6 && this.editStatus == 3) {
        this.validateStatus = false;
        setTimeout(() => {
          this.validateStatus = true;
        });
        this.status = true;
        this.page_rules1.gdecd.required = false;
        if (this.ieTypecdStatus == "I") {
          this.page_rules1.gdecd.required = false;
          this.page_rules1.dclCurrcd.required = false;
          this.page_rules1.gdsMtno.required = false;
          this.page_rules1.gdecd.required = false;
          this.page_rules1.dclQty.required = false;
          this.page_rules1.dclUnitcd.required = false;
          this.page_rules1.natcd.required = false;
          this.page_rules1.classifyType.required = false;
        } else if (this.ieTypecdStatus == "E") {
          this.page_rules1.gdecd.required = false;
          this.page_rules1.gdsMtno.required = true;
          this.page_rules1.dclQty.required = true;
          this.page_rules1.dclUnitcd.required = true;
          this.page_rules1.dclCurrcd.required = false;
          this.page_rules1.natcd.required = false;
          this.page_rules1.classifyType.required = false;
        }
      } else {
        this.validateStatus = false;
        this.status = false;
        this.page_rules1.gdecd.required = true;
        this.page_rules1.dclCurrcd.required = true;
        this.page_rules1.gdsMtno.required = true;
        this.page_rules1.gdecd.required = true;
        this.page_rules1.dclQty.required = true;
        this.page_rules1.dclUnitcd.required = true;
        this.page_rules1.natcd.required = true;
        this.page_rules1.classifyType.required = false;
      }
      if (
        (this.rltTbTypecdStatus == 7 && this.ieTypecdStatus == "I") ||
        (this.rltTbTypecdStatus == 9 && this.ieTypecdStatus == "I")
      ) {
        this.rltSeqnoStatus = true;
        this.page_rules1.rltSeqno.required = true;
        this.page_rules1.classifyType.required = true;
      } else if (
        (this.rltTbTypecdStatus == 7 && this.ieTypecdStatus == "E") ||
        (this.rltTbTypecdStatus == 8 && this.ieTypecdStatus == "E") ||
        (this.rltTbTypecdStatus == 9 && this.ieTypecdStatus == "E")
      ) {
        this.rltSeqnoStatus = false;
        this.disabledStatus = false;
        this.page_rules1.rltSeqno.required = false;
        this.page_rules1.classifyType.required = true;
      }
      if (this.rltTbTypecdStatus == 8 && this.ieTypecdStatus == "I") {
        this.page_rules1.classifyType.required = true;

        // this.page_rules1.dclCurrcd.required = false;
        // this.page_rules1.natcd.required = false;
        this.rltSeqnoStatus = false;

        this.disabledStatus = true;
      } else {
        this.disabledStatus = false;
      }
      if (
        this.rltTbTypecdStatus == 1 ||
        this.rltTbTypecdStatus == 2 ||
        this.rltTbTypecdStatus == 3 ||
        this.rltTbTypecdStatus == 5 ||
        this.rltTbTypecdStatus == 7 ||
        this.rltTbTypecdStatus == 8
      ) {
        this.page_rules1.classifyType.required = true;
      } else {
        this.page_rules1.classifyType.required = false;
      }

      // else {
      //   this.page_rules1.dclCurrcd.required = true;
      //   this.page_rules1.natcd.required = true;
      //   this.disabledStatus = false;
      // }
    },
    // 过卡凭证明细搜索
    customSearchBtn() {
      let filterData = this.filterData(this.customSearch, this.tableDataCopy);
      this.makePaging(10, 1, filterData);
      this.totalcount = filterData.length;
    },
    // 搜索条件重置
    reset(e) {
      this.$refs[e].reset();
    },
    // 关联单证编号 是否与商品编码一致
    searchCode() {
      let codeT = this.bodyDtForm.gdecd;
      this.$post("oneComplex", { gdecd: codeT })
        .then((res) => {
          if (res.map.data.length == 0) {
            this.$pop({
              type: "danger",
              message: "表体商品编号数据有误！",
            });
            return;
          }
          this.bodyDtForm.gdsNm = res.map.data[0].gname;
        })
        .catch((e) => {
          console.log(e);
        });
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
    // 表体添加数据
    makeSure(value) {
      this.$refs["bodyDtForm"].validate((valid) => {
        if (valid) {
          if (this.$route.query.id) {
            if (value == "添加") {
              if (
                this.tableDataCopyUpdata[this.tableDataCopyUpdata.length - 1] ==
                  undefined ||
                this.tableDataCopyUpdata[this.tableDataCopyUpdata.length - 1]
                  .leadId == undefined
              ) {
                this.bodyDtForm.leadId = 0;
              } else {
                this.bodyDtForm.leadId =
                  this.tableDataCopyUpdata[this.tableDataCopyUpdata.length - 1]
                    .leadId + 1;
              }
              // this.bodyDtForm.leadId =
              //   this.tableDataCopy[this.tableDataCopy.length - 1] == undefined
              //     ? 0
              //     : this.tableDataCopy[this.tableDataCopy.length - 1].leadId +
              //       1;
              let bodyForm = this.bodyDtForm;
              this.tableDataUpdata.push(cloneObj(bodyForm));
              this.tableDataCopyUpdata.push(cloneObj(bodyForm));
              this.totalcount++;
              this.ep_page.page = Math.ceil(
                this.totalcount / this.ep_page.size
              );
              this.localType = "添加";
              // this.$refs.bodyDtForm && this.$refs.bodyDtForm.reset();
              this.model = false;
              console.log("表体添加数据", this.bodyDtForm, bodyForm);
            }
            if (value == "修改") {
              let bodyForm = this.bodyDtForm;
              let copy = cloneObj(bodyForm);
              console.log("copy----0-----", copy);
              if (copy.leadId == undefined) {
                this.tableDataCopyUpdata.forEach((item, index) => {
                  if (item.id == copy.id) {
                    this.tableDataCopyUpdata[index] = copy;
                  }
                });
              } else {
                console.log("this.tableDataUpdata----------------", copy);
                this.tableDataCopyUpdata.forEach((item, index) => {
                  if (item.leadId == copy.leadId) {
                    this.tableDataCopyUpdata[index] = copy;
                  }
                });
              }
              // console.log("ddddd", bodyForm);
              // this.indexChange = this.$refs.table.getDataIndex("select")[0];
              // this.tableData.splice(this.indexChange, 1, cloneObj(bodyForm));
              // let updateDate =
              //   this.indexChange + (this.ep_page.page - 1) * this.ep_page.size;
              // this.tableDataCopy.splice(updateDate, 1, cloneObj(bodyForm));
              this.makePaging(
                this.ep_page.size,
                this.ep_page.page,
                this.tableDataCopyUpdata
              );

              // this.$refs.bodyDtForm && this.$refs.bodyDtForm.reset();
              this.model = false;
              this.localType = "";
            }
          } else {
            if (value == "添加") {
              if (
                this.tableDataCopy[this.tableDataCopy.length - 1] ==
                  undefined ||
                this.tableDataCopy[this.tableDataCopy.length - 1].leadId ==
                  undefined
              ) {
                this.bodyDtForm.leadId = 0;
              } else {
                this.bodyDtForm.leadId =
                  this.tableDataCopy[this.tableDataCopy.length - 1].leadId + 1;
              }
              // this.bodyDtForm.leadId =
              //   this.tableDataCopy[this.tableDataCopy.length - 1] == undefined
              //     ? 0
              //     : this.tableDataCopy[this.tableDataCopy.length - 1].leadId +
              //       1;
              let bodyForm = this.bodyDtForm;
              this.tableData.push(cloneObj(bodyForm));
              this.tableDataCopy.push(cloneObj(bodyForm));
              this.totalcount++;
              this.ep_page.page = Math.ceil(
                this.totalcount / this.ep_page.size
              );
              this.localType = "添加";
              // this.$refs.bodyDtForm && this.$refs.bodyDtForm.reset();
              this.model = false;
              console.log("表体添加数据", this.bodyDtForm, bodyForm);
            }
            if (value == "修改") {
              let bodyForm = this.bodyDtForm;
              let copy = cloneObj(bodyForm);
              if (copy.leadId == undefined) {
                this.tableDataCopy.forEach((item, index) => {
                  if (item.id == copy.id) {
                    this.tableDataCopy[index] = copy;
                  }
                });
              } else {
                console.log("this.tableData", this.tableDataCopy);
                this.tableDataCopy.forEach((item, index) => {
                  if (item.leadId == copy.leadId) {
                    this.tableDataCopy[index] = copy;
                  }
                });
              }
              // console.log("ddddd", bodyForm);
              // this.indexChange = this.$refs.table.getDataIndex("select")[0];
              // this.tableData.splice(this.indexChange, 1, cloneObj(bodyForm));
              // let updateDate =
              //   this.indexChange + (this.ep_page.page - 1) * this.ep_page.size;
              // this.tableDataCopy.splice(updateDate, 1, cloneObj(bodyForm));
              this.makePaging(
                this.ep_page.size,
                this.ep_page.page,
                this.tableDataCopy
              );

              // this.$refs.bodyDtForm && this.$refs.bodyDtForm.reset();
              this.model = false;
              this.localType = "";
            }
          }
        }
      });
    },
  },
};
</script>
