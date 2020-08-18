<template>
  <div>
    <div v-if="!isTablePort">
      <ep-model title="进出区提发货凭证表体" v-model="model" width="1250px" wrap-close append-to-body>
        <ep-form ref="bodyForm" :form="bodyForm" :rules="page_rules" name-width="168px">
          <ep-row :gutter="7">
            <ep-col :col="8">
              <ep-form-item attr="gdsSeqno" label="明细序号">
                <ep-input disabled v-model="bodyForm.gdsSeqno" name="gdsSeqno" :maxlength="10"></ep-input>
              </ep-form-item>
            </ep-col>
            <!-- <ep-col :col="8">
            <ep-form-item attr="portNo" label="卡口凭证序号">
              <ep-input v-model="bodyForm.portNo" name="portNo" :maxlength="10"></ep-input>
            </ep-form-item>
            </ep-col>-->
            <ep-col :col="8">
              <ep-form-item attr="portNo" label="关联单证编号">
                <ep-input v-model="bodyForm.portNo" name="portNo" :disabled="true"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="rltPortSeqno" label="关联单证表体序号">
                <ep-input v-model="bodyForm.rltPortSeqno" name="rltPortSeqno" :disabled="true"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="gdsMtno" label="商品料号">
                <ep-input
                  :disabled="isDisabled || displayBlock || editBody||dragEdit"
                  v-model="bodyForm.gdsMtno"
                  name="gdsMtno"
                  :maxlength="32"
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="gdecd" label="商品编码">
                <ep-input
                  :disabled="isDisabled || displayBlock || editBody||dragEdit"
                  v-model="bodyForm.gdecd"
                  name="gdecd"
                  :maxlength="10"
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="gdsNm" label="商品名称">
                <ep-input
                  :disabled="isDisabled || displayBlock || editBody||dragEdit"
                  v-model="bodyForm.gdsNm"
                  name="gdsNm"
                  :maxlength="256"
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="gdsSpcfModelDesc" label="规格型号">
                <ep-input
                  :disabled="isDisabled || displayBlock || editBody||dragEdit"
                  v-model="bodyForm.gdsSpcfModelDesc"
                  name="gdsSpcfModelDesc"
                  :maxlength="768"
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="entryGdsSeqno" label="报关单商品序号">
                <ep-input
                  :disabled="isDisabled || displayBlock || editBody||dragEdit"
                  v-model="bodyForm.entryGdsSeqno"
                  name="entryGdsSeqno"
                  :maxlength="10"
                  required
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="dclCurrcd" label="币制">
                <ep-select
                  ref="dclCurrcdSelect"
                  v-model="bodyForm.dclCurrcd"
                  name="dclCurrcd"
                  filterable
                  :disabled="isDisabled || displayBlock||dragEdit"
                >
                  <ep-select-item
                    v-for="(item, index) in currList"
                    :key="index"
                    :index="item.currCode"
                    :label="item.currName + ' ' + item.currCode"
                  ></ep-select-item>
                </ep-select>
                <!-- <ep-input v-model="bodyForm.dclCurrcd" name="dclCurrcd" :maxlength="26"></ep-input> -->
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="dclQty" label="申报数量">
                <ep-input
                  v-if="dragEdit"
                  :disabled="isDisabled || displayBlock"
                  v-model.trim="bodyForm.dclQty"
                  name="dclQty"
                  :maxlength="20"
                  @blur="checkDclQty(bodyForm.dclQty)"
                ></ep-input>
                <ep-input
                  v-else
                  :disabled="isDisabled || displayBlock"
                  v-model.trim="bodyForm.dclQty"
                  name="dclQty"
                  :maxlength="20"
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="dclUnitcd" label="申报计量单位">
                <loc-codemap-select
                  :name="'dclUnitcd'"
                  :code="'unit'"
                  :cName="'unitName'"
                  :dataList="dclUnitcds"
                  :value.sync="bodyForm.dclUnitcd"
                  :disabled="isDisabled || displayBlock || editBody||dragEdit"
                ></loc-codemap-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="dclUprcAmt" label="单价">
                <ep-input
                  :disabled="true"
                  v-model="bodyForm.dclUprcAmt"
                  name="dclUprcAmt"
                  :maxlength="26"
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="dclTotalAmt" label="总价">
                <ep-input
                  :disabled="displayBlock||dragEdit"
                  v-model="bodyForm.dclTotalAmt"
                  name="dclTotalAmt"
                  :maxlength="26"
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <!-- <ep-col :col="8">
            <ep-form-item attr="sumRmbVal" label="统计人民币值">
              <ep-input v-model="bodyForm.sumRmbVal" name="sumRmbVal" :maxlength="26"></ep-input>
            </ep-form-item>
            </ep-col>-->
            <!-- <ep-col :col="8">
            <ep-form-item attr="sumUsaVal" label="统计美元值">
              <ep-input v-model="bodyForm.sumUsaVal" name="sumUsaVal" :maxlength="26"></ep-input>
            </ep-form-item>
            </ep-col>-->
            <ep-col :col="8">
              <ep-form-item attr="natcd" label="原产国(地区)">
                <loc-codemap-select
                  :disabled="displayBlock||dragEdit ||isDisabled"
                  :name="'natcd'"
                  :code="'countryCode'"
                  :cName="'nameCn'"
                  :dataList="countrys"
                  :value.sync="bodyForm.natcd"
                ></loc-codemap-select>
                <!-- <ep-select
               :disabled="displayBlock"
              :label="countrys"
              v-model="bodyForm.natcd"
              name="natcd"
            >
              <ep-select-item
                v-for="(item, index) in countrys"
                :key="index"
                :index="item.countryCode"
                :label="item.nameCn + ' ' + item.countryCode"
              ></ep-select-item>
                </ep-select>-->
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="netWt" label="净重">
                <ep-input
                  :disabled="displayBlock || editBody||dragEdit"
                  v-model="bodyForm.netWt"
                  name="netWt"
                  :maxlength="20"
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8" v-if="changeType">
              <ep-form-item label="修改标志代码" attr="modfMarkcd">
                <ep-select
                  v-model="bodyForm.modfMarkcd"
                  name="modfMarkcd"
                  :disabled="disAbled||dragEdit"
                >
                  <ep-select-item index="1" label="修改"></ep-select-item>
                  <ep-select-item index="2" label="删除"></ep-select-item>
                  <ep-select-item index="3" label="增加" :disabled="disa"></ep-select-item>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <!-- <ep-col :col="16">
              <ep-form-item attr="rmk" label="备注">
                <ep-input :disabled="displayBlock" v-model="bodyForm.rmk" name="rmk" type="textarea"></ep-input>
              </ep-form-item>
            </ep-col>-->
          </ep-row>
          <div style="text-align: center;" v-if="!isDtBody">
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
        <SearchBody
          @oneDates="bindBody"
          v-if="dragEdits"
          :stockBillNo="headerForm.inExpWhNo"
          :tableDataBody="tableData"
        ></SearchBody>
      </ep-model>
      <div class="ep-card card-margin relative">
        <div class="card-body">
          <div class="block" v-if="!isDtBody">
            <!-- <ep-button type="primary" size="small" @click="doUpdate" icon="edit">修改</ep-button>
          <ep-button type="danger" size="small" @click="doDelete" icon="trash-a">删除</ep-button>
            <ep-button type="primary" size="small" @click="doDeclare" icon="checkmark-round">确认</ep-button>-->

            <WmsButton v-show="btnShow" style="margin:0" @click="doBodyAdd">添加</WmsButton>
            <WmsButton v-show="btnShow" style="margin:0" @click="doBodyChange" v-if="changeType">变更</WmsButton>

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
            <ep-table
              border
              ref="table"
              :height="400"
              :data="tableData"
              :head-color="headColor"
              @row-dblclick="queryOperStatus"
            >
              <!-- <ep-table-item type="select" v-if="!isDtBody"></ep-table-item> -->
              <ep-table-item column="opt" title="操作" width="200" v-if="!isDtBody">
                <template slot-scope="props">
                  <wms-icon
                    type="edit"
                    v-if="updateShow||props.row.modfMarkcd==1 || props.row.modfMarkcd==3"
                    @click="doBodyUpdate(props.row,props.row.id)"
                  ></wms-icon>
                  <wms-icon
                    type="cancel"
                    v-if="btnShow"
                    @click="doBodyDelete(props.row,props.row.id)"
                  ></wms-icon>
                </template>
              </ep-table-item>
              <ep-table-item column="whRecPreentNo" width="220" title="凭证编号"></ep-table-item>
              <ep-table-item column="gdsSeqno" width="100" title="明细序号"></ep-table-item>
              <ep-table-item column="portNo" width="220" title="关联单证编号" v-if="changeState==3"></ep-table-item>
              <ep-table-item
                column="rltPortSeqno"
                width="200"
                title="关联单证表体序号"
                v-if="changeState==3"
              ></ep-table-item>
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
              <ep-table-item column="entryGdsSeqno" width="200" title="报关单商品序号"></ep-table-item>
              <ep-table-item
                column="dclCurrcd"
                width="150"
                title="币制"
                :formatter="dclCurrcdFormatter"
              ></ep-table-item>
              <ep-table-item column="dclQty" width="150" title="申报数量"></ep-table-item>
              <ep-table-item
                column="dclUnitcd"
                width="100"
                title="申报计量单位"
                :formatter="dclUnitcdTranslate"
              ></ep-table-item>
              <ep-table-item column="dclUprcAmt" width="150" title="单价"></ep-table-item>
              <ep-table-item column="dclTotalAmt" width="150" title="总价"></ep-table-item>
              <!-- <ep-table-item
                column="sumRmbVal"
                width="150"
                title="统计人民币值"
              ></ep-table-item>
              <ep-table-item
                column="sumUsaVal"
                width="150"
                title="统计美元值"
              ></ep-table-item>-->
              <ep-table-item column="natcd" width="150" title="原产国(地区)" :formatter="natcdTranslate"></ep-table-item>
              <ep-table-item column="netWt" width="150" title="净重"></ep-table-item>
              <ep-table-item
                column="modfMarkcd"
                width="150"
                title="修改标志代码"
                :formatter="modfMarkcdFormatter"
                v-if="changeType"
              ></ep-table-item>
              <!-- <ep-table-item column="rmk" title="备注" width="350">
                <template slot-scope="props">
                  <p class="rmk-style">{{ props.row.rmk }}</p>
                </template>
              </ep-table-item>-->
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
    <div v-else>
      <ep-model title="关联卡口凭证" v-model="model" width="1250px" :wrap-close="false">
        <ep-form ref="table2" :form="bodyForm" name-width="168px">
          <ep-row :gutter="7">
            <ep-col :col="8">
              <ep-form-item attr="portNo" label="关联单证编号">
                <ep-input disabled v-model="bodyForm.portNo" name="portNo"></ep-input>
              </ep-form-item>
            </ep-col>

            <ep-col :col="8">
              <ep-form-item attr="rtlTypecd" label="总担保编号">
                <ep-input disabled v-model="bodyForm.rtlTypecd" name="rtlTypecd"></ep-input>
              </ep-form-item>
            </ep-col>
          </ep-row>
        </ep-form>
      </ep-model>
      <div class="ep-card card-margin relative">
        <div class="card-body">
          <div class="block">
            <ep-table
              border
              ref="table"
              :height="400"
              :data="tableData"
              :loading="loading"
              head-color
              @row-dblclick="queryOperStatus"
            >
              <ep-table-item column="portNo" width="250" title="关联单证编号"></ep-table-item>
              <!-- <ep-table-item column="rtlTypecd" title="单证类型" :formatter="rtlTypecd"></ep-table-item> -->
              <ep-table-item column="rtlTypecd" title="总担保编号"></ep-table-item>
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
    <ep-model title="变更表体" v-model="isShowSasDtModel" width="1600px">
      <bodyFormModel
        :bodyForm="bodyForm"
        :isShowModel="isShowSasDtModel"
        @onSelectDt="handleSelectDt"
        :tableData="tableData"
      ></bodyFormModel>
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
      selectItem: {},
      dragEdits: false,
      editBody: false,
      customSearch: {},
      bodyForm: {
        whRecPreentNo: this.headerForm.whRecPreentNo,
        gdsSeqno: "",
        portNo: "",
        rltPortSeqno: "",
        gdsMtno: "",
        gdecd: "",
        gdsNm: "",
        gdsSpcfModelDesc: "",
        entryGdsSeqno: "",
        dclCurrcd: "",
        dclQty: "",
        dclUnitcd: "",
        dclUprcAmt: "",
        dclTotalAmt: "",
        sumRmbVal: "",
        sumUsaVal: "",
        natcd: "",
        netWt: "",
        rmk: "",
        modfMarkcd: "3"
      },
      isShowSasDtModel: false,
      page_rules: {
        // portNo: { required: true, message: "不能为空", trigger: "change" },
        gdsMtno: { required: true, message: "不能为空", trigger: "change" },
        gdecd: { required: true, message: "不能为空", trigger: "change" },
        gdsNm: { required: true, message: "不能为空", trigger: "change" },
        modfMarkcd: { required: true, message: "不能为空", trigger: "change" },
        // gdsSpcfModelDesc: { required: true, message: "不能为空", trigger: "change" },
        entryGdsSeqno: {
          required: false,
          message: "不能为空",
          trigger: "change"
        },
        urrcd: { required: true, message: "不能为空", trigger: "change" },
        dclQty: { required: true, message: "不能为空", trigger: "change" },
        dclUnitcd: { required: true, message: "不能为空", trigger: "change" },
        dclUprcAmt: { required: false, message: "不能为空", trigger: "change" },
        dclTotalAmt: { required: true, message: "不能为空", trigger: "change" },
        sumRmbVal: { required: true, message: "不能为空", trigger: "change" },
        sumUsaVal: { required: true, message: "不能为空", trigger: "change" },
        netWt: { required: true, message: "不能为空", trigger: "change" },
        natcd: { required: true, message: "不能为空", trigger: "change" },
        dclCurrcd: { required: true, message: "不能为空", trigger: "change" }
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
      disAbled: false,
      disa: false
    };
  },
  props: {
    dragEdit: {
      type: Boolean,
      default: false
    },
    ietycp: {
      type: String,
      default: ""
    },
    headerForm: {
      type: Object,
      default: function() {
        return {};
      }
    },
    updateShow: {
      type: Boolean,
      default: true
    },
    listData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    changeType: {
      default: false
    },
    isDtBody: {
      type: Boolean,
      default: false
    },
    isTablePort: {
      type: Boolean,
      default: false
    },
    displayBlock: {
      default: false
    },
    changeState: {
      default: 3
    },
    changeDclcus: {
      default: 1
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
  components: { bodyFormModel, SearchBody },
  created() {
    let unitList = this.$store.getters.getUnitList;
    this.dclUnitcds = unitList;
    let curr = this.$store.getters.getCurrList;
    this.currList = curr;
    if (this.isDtBody) this.page_rules = {};
    // this.makePaging(10, 1, this.tableDataCopy);
    //删除卡口对应的表体数据
    // bus.$on("deleteDtDetail", (data) => {
    //     //  console.log("=====ddd3333333")
    //  data.forEach((item)=>{
    //    this.tableDataCopy.forEach((data,i)=>{
    //      if(item.preentNo===data.portNo)
    //         this.tableDataCopy.splice(i,1);
    //    })
    //  })
    //
    // });
  },
  beforeDestroy() {
    // bus.$off("deleteDtDetail");
  },
  mounted() {
    this.makePaging(10, 1, this.listData);
    if (this.changeState === 3||this.changeState===8) {
      this.btnShow = false;
    } else {
      this.btnShow = true;
    }
  },
  watch: {
    dragEdit: {
      handler(newData, olddata) {
        console.log("----3-23", newData);
        if (newData) {
          this.dragEdits = true;
        } else {
          this.dragEdits = false;
        }
      },
      immediate: true
    },
    ieTypecdState(val, oldval) {
      console.log("-------val", val);
      // if(val!=oldval){
      //   this.tableData = []
      //   this.tableDataCopy = []
      // }
      // this.makePaging(10, 1, this.listData);
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
    },
    "bodyForm.dclQty"(val, oldVal) {
      // // let reg = /^[1-9]\d*$/;
      // let reg = /\d+(\.\d{0,2})?/;
      // if (reg.test(val)) {
      //   setTimeout(() => {
      //     // this.bodyForm.dclQty = val.match(/^[1-9]\d*$/)[0] || "";
      //     this.bodyForm.dclQty = val.match(/\d+(\.\d{0,5})?/)[0] || "";
      //   });
      // } else {
      //   setTimeout(() => {
      //     this.bodyForm.dclQty = "";
      //   });
      // }
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
    "bodyForm.entryGdsSeqno"(val, oldVal) {
      let reg = /[+]?([0-9]+(.[0-9]{1,4})?)/;
      if (reg.test(val)) {
        setTimeout(() => {
          this.bodyForm.entryGdsSeqno =
            val.match(/[+]?([0-9]+(.[0-9]{1,4})?)/)[0] || "";
        });
      } else {
        setTimeout(() => {
          this.bodyForm.entryGdsSeqno = "";
        });
      }
    },
    "bodyForm.dclTotalAmt"(val, oldVal) {
      // let reg = /\d+(\.\d{0,2})?/;
      // if (reg.test(val)) {
      //   setTimeout(() => {
      //     this.bodyForm.dclTotalAmt = val.match(/\d+(\.\d{0,5})?/)[0] || "";
      //   });
      // } else {
      //   setTimeout(() => {
      //     this.bodyForm.dclTotalAmt = "";
      //   });
      // }
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
      let reg = /^\d{0,20}(\.\d{0,5})?$/;
      if (!reg.test(val)) {
        setTimeout(() => {
          this.bodyForm.dclTotalAmt = oldVal;
        });
      }
    },
    "bodyForm.netWt"(val, oldVal) {
      // let reg = /\d+(\.\d{0,2})?/;
      // if (reg.test(val)) {
      //   setTimeout(() => {
      //     this.bodyForm.netWt = val.match(/\d+(\.\d{0,5})?/)[0] || "";
      //   });
      // } else {
      //   setTimeout(() => {
      //     this.bodyForm.netWt = "";
      //   });
      // }

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
          this.bodyForm.netWt = oldVal;
        });
      }
    }
  },
  methods: {
    // 拖拽生成的校验申报数量
    checkDclQty(value) {
      console.log("value", value);
      let data = {
        stockBillNoPre: "",
        dtId: ""
      };
      data.stockBillNoPre = this.headerForm.inExpWhNo;
      // data.dtId = this.selectItem.stockDtId;
      console.log(this.bodyForm)
      if (this.dragEdits) {
        data.dtId = this.bodyForm.stockDtId;
      } else {
        data.dtId = this.selectItem.stockDtId;
      }
      this.$post("getStockDtQty", data).then(res => {
        if (res.status == 1) {
          let useQty = res.map.data.usedQty; // 已用数量
          let remainQty = res.map.data.remainQty; // 剩余数量
          let total = useQty * 1 + remainQty * 1;
          if (value > total) {
            this.$pop({
              type: "danger",
              message: "确认数量超过总数量"
            });
            this.bodyForm.dclQty = total + "";
            this.bodyForm.dclTotalAmt =
              (total * res.map.data.unitPrice).toFixed(5) + "";
          } else {
            this.bodyForm.dclTotalAmt =
              (value * 1 * res.map.data.unitPrice).toFixed(5) + "";
          }
        }
        console.log(res);
      });
    },
    bindBody(value) {
      console.log(value);
      this.bodyForm = cloneObj(value);
      this.selectItem= cloneObj(value);
    },
    doBodyChange() {
      this.isShowSasDtModel = true;
      this.disa = true;
      if (this.changeType) {
        if (
          this.ietycp == 1 ||
          this.ietycp == 2 ||
          this.ietycp == 4 ||
          this.ietycp == 5
        ) {
          this.editBody = true;
        } else {
          this.editBody = false;
        }
      }
    },
    queryOperStatus(event, row, index) {
      if (!this.isDtBody) return;
      this.bodyForm = row;
      this.model = true;
    },
    reset(el) {
      this.$refs[el].reset();
    },
    doBodyAdd() {
      this.bodyForm = {
        whRecPreentNo: this.headerForm.whRecPreentNo,
        gdsSeqno: "",
        portNo: "",
        rltPortSeqno: "",
        gdsMtno: "",
        gdecd: "",
        gdsNm: "",
        gdsSpcfModelDesc: "",
        entryGdsSeqno: "",
        dclCurrcd: "",
        dclQty: "",
        dclUnitcd: "",
        dclUprcAmt: "",
        dclTotalAmt: "",
        sumRmbVal: "",
        sumUsaVal: "",
        natcd: "",
        netWt: "",
        rmk: "",
        modfMarkcd: "3"
      };
      console.log(this.bodyForm);
      if (this.dragEdit) {
        this.dragEdits = true;
      }
      this.editBody = false;
      this.disAbled = true;
      this.disa = false;
      this.buttonStatus = 2;

      // this.bodyForm=""

      this.model = true;
      this.localType = "添加";

      // 先报后进时， 商品序号必填
      let seqnoState = this.changeState;
      if (seqnoState === 2) {
        this.page_rules.entryGdsSeqno.required = true;
      } else {
        this.page_rules.entryGdsSeqno.required = false;
      }
      // 分送集报时， 必填项设置为非必填
      if (seqnoState === 3) {
        this.isDisabled = true;
        this.page_rules.gdsMtno.required = false; // 商品料号
        this.page_rules.gdecd.required = false; // 商品编码
        this.page_rules.gdsNm.required = false; // 商品名称
      } else {
        this.isDisabled = false;
        this.page_rules.gdsMtno.required = true;
        this.page_rules.gdecd.required = true;
        this.page_rules.gdsNm.required = true;
      }
    },
    doBodyUpdate(row, rowId) {
    let selectData = [row];
      if (this.dragEdit) {
        this.dragEdits = false;
        this.selectItem = row;
      }
      if (this.changeType) {
        if (
          this.ietycp == 1 ||
          this.ietycp == 2 ||
          this.ietycp == 4 ||
          this.ietycp == 5
        ) {
          if(row.modfMarkcd==3){
            this.editBody = false;
          }else{
            this.editBody = true;
          }   
        }else{
          this.editBody = false;
        }
      }
      this.disa = true;
      console.log("----d--d-d-");
      this.buttonStatus = 1;
      // let selectData = this.$refs.table.getData("select");
 

      let seqnoState = this.changeState;
      if (seqnoState === 3) {
        this.isDisabled = true;
        this.page_rules.gdsMtno.required = false; // 商品料号
        this.page_rules.gdecd.required = false; // 商品编码
        this.page_rules.gdsNm.required = false; // 商品名称
      } else {
        this.isDisabled = false;
        this.page_rules.gdsMtno.required = true;
        this.page_rules.gdecd.required = true;
        this.page_rules.gdsNm.required = true;
      }
      if (selectData.length == 0) {
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
        this.localType = "修改"; //代表选中一条
        this.model = true;
        console.log(row);

        setTimeout(() => {
          this.bodyForm = cloneObj(selectData[0]);
        }, 100);
      }
      console.log("......");
      console.log(row);
      if (!this.updateShow) {
        this.disAbled = true;
      } else {
        this.disAbled = false;
      }
    },
    doBodyDelete(row, rowId) {
      //删除table数据
      // let selectData = this.$refs.table.getData("select");
      let selectData = [row];

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
            let allDelectIndex = [];
            // let selectData = this.$refs.table.getData("select");
            // let selectData = this.$refs.table.getData("select");
            let selectData = [row];
            selectData.forEach(e => {
              let updateDate = this.tableDataCopy.findIndex(value => {
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
        }
      });
    },
    clearTable() {
      this.$emit("clearTable");
      this.$confirm({
        word: "是否要清空明细",
        callback: info => {
          if (info) {
            this.tableDataCopy = [];
            this.tableData = [];
          }
        }
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
      setTimeout(()=>{
        this.disAbled=false
      },300)
    },
    // 添加模板的确定按钮
    makeSure() {
      setTimeout(() => {
        this.$refs["bodyForm"].validate(valid => {
          if (valid) {
            if (this.buttonStatus == 0) {
              return;
            } else if (this.buttonStatus == 1) {
              let bodyForm = this.bodyForm;
              this.indexChange = this.$refs.table.getDataIndex("select")[0];
              this.tableData.splice(this.indexChange, 1, cloneObj(bodyForm));
              let updateDate = this.tableDataCopy.findIndex(value => {
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

