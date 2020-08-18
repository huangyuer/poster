<template>
  <div>
    <ep-model v-model="modelFlag" width="1150px" :wrap-close="false">
      <div class="modelFlagbox">
        <div class="product">
          <div class="table">
            <p
              style="
                height: 60px;
                text-align: center;
                line-height: 60px;
                font-size: 25px;
              "
            >
              {{ title }}
            </p>
            <!-- <p style="text-align:center;padding:5px 0">（凭单提货）</p> -->
            <!-- <p style="padding:5px 0;padding-left:5px">
              <span style="width:49%;display: inline-block;">签发时间 : <span style="font-size:13px">{{Listdata.createTime}}</span></span>
              <span style="width:49%;display: inline-block;text-align:right">NO : <span style="font-size:13px">{{Listdata.whRecNo}}</span></span>
            </p>-->
            <div style>
              <!-- <p style="padding: 0 5px;">
                <span style="display: inline-block; padding:5px 0 ;">出质人（单位名称） :
                  <a>1</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="display: inline-block;padding:5px 0 ;">出质人地址 :
                  <a>1</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="display: inline-block;padding:5px 0 ;">监管仓（单位名称） : <a>{{Listdata.dclEtpsNm}}</a></span>
              </p>
              <p style="padding: 0 5px;">
                <span style="display: inline-block;padding:5px 0 ;">监管仓储地址 : <a>{{Listdata.dclEtpsAdd}}</a></span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:49%;display: inline-block;">仓单状态 : <a>{{Listdata.optStatus}}</a></span>
                <span style="padding:5px 0 ;width:49%;display: inline-block;">仓储合同号 : <a>{{Listdata.contactNoOri}}</a></span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:49%;display: inline-block;">仓单有效期 :
                  <a>{{(Listdata.valueDate||'').split(",")[0]}} {{Listdata.valueDate==''?'':'至'}} {{(Listdata.valueDate||'').split(",")[1]}}</a>
                </span>
                <span style="padding:5px 0 ;width:49%;display: inline-block;">仓单制单人 : <a>{{Listdata.contactor}}</a></span>
              </p>-->

              <p style="padding: 0 5px; padding-top: 10px;">
                <span
                  style="padding: 5px 0; width: 48%; display: inline-block;"
                >
                  经营企业名称 :
                  <a>{{ this.$store.getters.getTradeName }}</a>
                </span>
                <span
                  style="padding: 5px 0; width: 48%; display: inline-block;"
                >
                  经营企业编码 :
                  <a>{{ this.$store.getters.getTradeCode }}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span
                  style="padding: 5px 0; width: 100%; display: inline-block;"
                >
                  经营企业社会信用代码 :
                  <a>{{ this.$store.getters.getOrgCreditCode }}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span
                  style="
                    padding: 5px 0;
                    width: 32%;
                    display: inline-block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  提运单号:
                  <!-- <a v-for="item in businessTypelist" :key='item.index'>{{Listdata.billLodNo==item.index?item.title:''}}</a> -->
                  <a>{{ Listdata.billLodNo }}</a>
                </span>
                <span
                  style="
                    padding: 5px 0;
                    width: 32%;
                    display: inline-block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  英文船名 :

                  <a>{{ Listdata.shipNameEn }}</a>
                </span>
                <span
                  style="
                    padding: 5px 0;
                    width: 32%;
                    display: inline-block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  航次 :
                  <!-- <a v-for="item in transfList" :key='item.trafCode'>{{Listdata.trspModecd==item.trafCode?item.trafSpec:''}}</a> -->
                  <a>{{ Listdata.voyageNo }}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span
                  style="padding: 5px 0; width: 32%; display: inline-block;"
                >
                  毛重 :
                  <!-- <a v-for="item in ImpexpPortcdInfo" :key='item.customCode'>{{Listdata.impexpPortcd==item.customCode?item.customName:''}}</a> -->
                  <a>{{ Listdata.grossWt }}</a>
                </span>
                <span
                  style="padding: 5px 0; width: 32%; display: inline-block;"
                >
                  运输方式 :
                  <a v-for="item in trspModecdlist" :key="item.index">{{
                    Listdata.trspModecd == item.index ? item.title : ""
                  }}</a>
                </span>
                <span
                  v-if="this.Listdata.stockBillType == '2'"
                  style="padding: 5px 0; width: 32%; display: inline-block;"
                >
                  料件/成品标志 :
                  <a v-for="item in mtpckEndprdTypelist" :key="item.index">{{
                    Listdata.mtpckEndprdTypecd == item.index ? item.title : ""
                  }}</a>
                </span>
                <span
                  style="
                    padding: 5px 0;
                    width: 70%;
                    display: inline-block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  备注 :
                  <a>{{ Listdata.rmk }}</a>
                </span>
                <!-- <span style="padding:5px 0 ;width:32%;display: inline-block;">是否报关 : -->
                <!-- <a v-for="item in stockBillType" :key='item.stockBillType'>{{(Listdata.data[0].stockBillType||'')==item.stockBillType?item.dclcusFlag:''}}</a> -->
                <!-- <a>{{dclcusFlag}}</a>
                </span>-->
              </p>

              <div class="one-item-select disabled">
                <!-- <ep-form-item> -->
                <div>
                  <ep-checkbox
                    disabled
                    style="margin-left: 5px;"
                    v-model="checkboxForm1"
                    >不属于国家禁止进出境货物;</ep-checkbox
                  >
                </div>
                <div>
                  <ep-checkbox
                    style="margin-left: 5px;"
                    v-model="checkboxForm2"
                    disabled
                    >不属于依法需进出境检疫的货物以及进境检验的大宗资源性商品、可用作原料的固体废物;</ep-checkbox
                  >
                </div>
                <div>
                  <ep-checkbox
                    style="margin-left: 5px;"
                    v-model="checkboxForm3"
                    disabled
                  >
                    不属于法律、法规等明确规定的,涉及我国缔结或者参加的国际条约、协定的,和涉及安全准入管理,
                    <br />&nbsp;&emsp;&emsp;必须在进出境环节验核相关监管证件的货物。
                  </ep-checkbox>
                </div>
                <!-- </ep-form-item> -->
              </div>

              <!-- <p style="padding: 0 5px;">
              <span style="padding:5px 0 ;width:32%;display: inline-block;"> 报关类型:-->
              <!-- <a v-for="item in stockBillType" :key='item.stockBillType'>{{(Listdata.data[0].stockBillType||'')==item.stockBillType?item.dclcusTypecd:''}}</a> -->
              <!-- <a>{{dclcusTypecd}}</a>
                </span>
              <span style="padding:5px 0 ;width:32%;display: inline-block;">ERP/WMS出入库类型 :-->
              <!-- <a v-for="item in stockBillType" :key='item.stockBillType'>{{(Listdata.data[0].stockBillType||'')==item.stockBillType?item.billType:''}}</a> -->
              <!-- <a>{{billType}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">进出标志 : <a>{{Listdata.setMet}}</a></span>
              </p>-->
            </div>
          </div>

          <table
            style="
              border: 1px solid #666;
              width: 100%;
              border-collapse: collapse;
            "
            v-show="this.Listdata.stockBillType == '2'"
          >
            <tr>
              <td>径予放行自主声明编号</td>
              <td>商品料号</td>
              <td>商品名称</td>
              <td>
                申报数量
                <!-- 及单位 -->
              </td>
              <td>
                申报单位
                <!-- /总价 -->
              </td>
            </tr>
            <tr v-for="item in Listdata.data" :key="item.id">
              <td>{{ item.stockBillNoPre }}</td>
              <td>{{ item.copGNo }}</td>
              <td>{{ item.gName }}</td>
              <td>
                {{ item.qty }}
                <!-- /{{item.gUnit}} -->
              </td>
              <td>
                {{ dclUnitcdTranslate(item) }}
                <!-- /{{item.tradeTotal}} -->
              </td>
            </tr>
          </table>

          <table
            style="
              border: 1px solid #666;
              width: 100%;
              border-collapse: collapse;
            "
            v-show="this.Listdata.stockBillType == '1'"
          >
            <tr>
              <td>商品料号</td>
              <td>商品名称</td>
            </tr>
            <tr v-for="item in Listdata.data" :key="item.id">
              <td>{{ item.copGNo }}</td>
              <td>{{ item.gName }}</td>
            </tr>
          </table>
          <div v-if="this.Listdata.stockBillType == '2'">
            <div>集装箱号:</div>
            <div style="display: flex; flex-flow: wrap;">
              <div
                v-for="item in tableContainer"
                :key="item.id"
                style="
                  border-radius: 4px;
                  min-width: 100px;
                  text-align: center;
                  border: 1px solid #666;
                  border-collapse: collapse;
                "
              >
                <ep-input v-model="item.container"></ep-input>
              </div>
            </div>
          </div>

          <!-- <table style="border:1px solid #666;width:width: 200px;border-collapse: collapse;">
            <tr>
              <td>集装箱号</td>
            </tr>
            <tr v-for="item in tableContainer" :key='item.id'>
              <td>{{item.container}}</td>
            </tr>
          </table>-->
        </div>

        <div class="addgenerate">
          <ep-form
            ref="Listdata"
            :rules="page_rules"
            :form="Listdata"
            name-width="5px"
          >
            <ep-row :gutter="7">
              <div v-if="typeFlag">
                <ep-form-item attr="stockBillType" label>
                  <ep-select
                    :disabled="Listdata.id ? true : false"
                    placeholder="进出库标志"
                    v-model="Listdata.stockBillType"
                    name="stockBillType"
                  >
                    <ep-select-item index="1" label="进库"></ep-select-item>
                    <ep-select-item index="2" label="出库"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </div>

              <ep-form-item attr="billLodNo" label>
                <!-- <ep-select placeholder='业务类别' v-model="Listdata.billLodNo" name="billLodNo">
                  <ep-select-item v-for="item in businessTypelist" :key='item.index' :index="item.index" :label="item.title"></ep-select-item>
                </ep-select>-->
                <ep-input
                  placeholder="提运单号"
                  v-model="Listdata.billLodNo"
                  name="billLodNo"
                  :maxlength="64"
                ></ep-input>
              </ep-form-item>
              <ep-form-item attr="shipNameEn" label>
                <ep-input
                  placeholder="英文船名"
                  v-model="Listdata.shipNameEn"
                  name="shipNameEn"
                  :maxlength="150"
                ></ep-input>
              </ep-form-item>
              <ep-form-item attr="voyageNo" label>
                <!-- <loc-codemap-select placeholder="运输方式" :name="'trspModecd'" :code="'trafCode'" :cName="'trafSpec'" :dataList="transfList" :value.sync="Listdata.trspModecd"></loc-codemap-select> -->
                <ep-input
                  placeholder="航次"
                  v-model="Listdata.voyageNo"
                  name="voyageNo"
                  :maxlength="20"
                ></ep-input>
              </ep-form-item>
              <ep-form-item attr="grossWt" label>
                <!-- <loc-codemap-select placeholder="进出境关别" :name="'impexpPortcd'" :code="'customCode'" :cName="'customName'" :dataList="ImpexpPortcdInfo" :type="'custom'"
                :value.sync="Listdata.impexpPortcd"></loc-codemap-select>-->
                <ep-input
                  placeholder="毛重"
                  v-model="Listdata.grossWt"
                  name="grossWt"
                  :maxlength="20"
                ></ep-input>
              </ep-form-item>
              <ep-form-item attr="trspModecd" label>
                <!-- <ep-input placeholder="毛重" v-model="Listdata.grossWt" name="grossWt" :maxlength="20"></ep-input> -->
                <ep-select
                  placeholder="运输方式"
                  v-model="Listdata.trspModecd"
                  name="trspModecd"
                >
                  <ep-select-item
                    v-for="(item, index) in trspModecdlist"
                    :key="index"
                    :index="item.index"
                    :label="item.title"
                  ></ep-select-item>
                </ep-select>
              </ep-form-item>
              <ep-form-item
                v-if="this.Listdata.stockBillType == '2'"
                attr="mtpckEndprdTypecd"
              >
                <ep-select
                  placeholder="料件/成品标志"
                  v-model="Listdata.mtpckEndprdTypecd"
                  name="mtpckEndprdTypecd"
                >
                  <ep-select-item
                    v-for="item in mtpckEndprdTypelist"
                    :key="item.index"
                    :index="item.index"
                    :label="item.title"
                  ></ep-select-item>
                </ep-select>
              </ep-form-item>
              <ep-form-item label attr="rmk">
                <ep-input
                  placeholder="备注"
                  v-model.trim="Listdata.rmk"
                  name="rmk"
                  :maxlength="400"
                  type="textarea"
                ></ep-input>
              </ep-form-item>

              <ep-form-item>
                <div style="padding-bottom: 8px;">
                  <ep-checkbox style v-model="checkboxForm1"
                    >不属于国家禁止进出境货物;</ep-checkbox
                  >
                </div>
                <div style="padding-bottom: 8px;">
                  <ep-checkbox style v-model="checkboxForm2">
                    不属于依法需进出境检疫的货物以及进境检验的大宗
                    <br />&nbsp;&emsp;&emsp;资源性商品、可用作原料的固体废物;
                  </ep-checkbox>
                </div>
                <div>
                  <ep-checkbox style v-model="checkboxForm3">
                    不属于法律、法规等明确规定的,涉及我国缔结或者参
                    <br />&nbsp;&emsp;&emsp;加的国际条约、协定的,和涉及安全准入管理,必须在进
                    <br />&nbsp;&emsp;&emsp;出境环节验核相关监管证件的货物。
                  </ep-checkbox>
                </div>
              </ep-form-item>
              <ep-form-item>
                <!-- <ep-input placeholder="毛重" v-model="Listdata.grossWt" name="grossWt" :maxlength="20"></ep-input> -->

                <ep-input
                  v-if="this.Listdata.stockBillType == '2'"
                  placeholder="集装箱号"
                  v-model="formContainer.container"
                  name="container"
                  :maxlength="15"
                ></ep-input>
                <ep-button
                  v-if="this.Listdata.stockBillType == '2'"
                  type="success"
                  size="small"
                  @click="addContainer()"
                  icon="checkmark-round"
                  style="margin-top: 10px; float: right;"
                  >新增</ep-button
                >
              </ep-form-item>
              <!-- <ep-form-item attr="dclcusFlag" label="">
                <ep-select placeholder="是否报关" v-model="Listdata.dclcusFlag" name="dclcusFlag" :disabled="false">
                  <ep-select-item v-for="item in dclcusFlaglist" :key='item.index' :index="item.index" :label="item.title"></ep-select-item>
                </ep-select>
              </ep-form-item>
              <ep-form-item attr="dclcusTypecd" label="">
                <ep-select placeholder="报关类型" v-model="Listdata.dclcusTypecd" name="dclcusTypecd">
                  <ep-select-item v-for="item in dclcusTypelist" :key='item.index' :index="item.index" :label="item.title"></ep-select-item>
                </ep-select>
              </ep-form-item>-->
              <!-- <ep-form-item attr="supvModecd" label="">
                <loc-codemap-select placeholder="监管方式" :name="'supvModecd'" :code="'tradeMode'" :cName="'abbrTrade'" :dataList="supvInfo" :value.sync="Listdata.supvModecd"></loc-codemap-select>
              </ep-form-item>-->
            </ep-row>
          </ep-form>
        </div>
      </div>
      <div style="text-align: center;">
        <ep-button
          :loading="saveLoading"
          :disabled="Listdata.id ? true : false"
          type="success"
          size="small"
          @click="success(Listdata)"
          icon="edit"
          >暂存</ep-button
        >
        <ep-button
          :loading="applyLoading"
          type="success"
          size="small"
          @click="declare()"
          icon="checkmark-round"
          >确认</ep-button
        >
        <ep-button type="danger" size="small" icon="close" @click="close()"
          >关闭</ep-button
        >
      </div>
    </ep-model>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import mixin from "../mixin";
import { cloneObj } from "utils/data";
import localStorage from "utils/localStorage";

export default {
  mixins: [mixin],
  extends: misList,
  props: {
    fresh: {
      type: Boolean,
    },
    Listdata: {
      type: Object,
    },
    headerData: {
      type: Array,
    },
    mulFlag: {
      type: Boolean,
    },
  },
  created() {
    let userInfo = localStorage.getLocalStorage("setUserInfo");
    if (userInfo.routerType == 7 || !userInfo.routerType) {
      this.typeFlag = true;
    } else {
      this.typeFlag = false;
    }
  },
  components: {},
  data() {
    return {
      saveLoading: false,
      applyLoading: false,
      typeFlag: false,
      isSave: false,
      title: "径予放行自主声明(出境/进境)",
      formContainer: {
        container: "",
      },
      tableContainer: [],
      checkboxForm1: false,
      checkboxForm2: false,
      checkboxForm3: false,
      timer: "",
      modelFlag: false,
      trspModecdlist: [
        { index: "1", title: "海运" },
        { index: "2", title: "空运" },
      ],
      businessTypelist: [
        { index: "1", title: "中转" },
        { index: "2", title: "集拼" },
        { index: "3", title: "存储" },
        { index: "4", title: "加工" },
        { index: "5", title: "交易" },
        { index: "6", title: "展示" },
        { index: "7", title: "研发" },
        { index: "8", title: "再制造" },
        { index: "9", title: "检测维修" },
      ],
      mtpckEndprdTypelist: [
        { index: "I", title: "料件" },
        { index: "E", title: "成品" },
        { index: "S", title: "设备" },
        { index: "L", title: "边角料" },
        { index: "D", title: "残次品" },
      ],
      dclcusFlaglist: [
        { index: "1", title: "否" },
        { index: "2", title: "是" },
      ],
      dclcusTypelist: [
        { index: "1", title: "关联报关" },
        { index: "2", title: "对应报关" },
      ],

      page_rules: {
        stockBillType: {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
        billLodNo: {
          required: true,
          message: "不能为空",
          trigger: "change, blur",
        },
        shipNameEn: {
          required: true,
          message: "不能为空",
          trigger: "change, blur",
        },
        voyageNo: {
          required: true,
          message: "不能为空",
          trigger: "change, blur",
        },
        grossWt: {
          required: true,
          message: "不能为空",
          trigger: "change,blur",
        },
        trspModecd: {
          required: true,
          message: "不能为空",
          trigger: "change,blur",
        },
        mtpckEndprdTypecd: {
          required: true,
          message: "不能为空",
          trigger: "change",
        },
      },
    };
  },
  computed: {},
  watch: {
    modelFlag(value) {
      if (!value) {
        this.$emit("nowFlagChange", false);
        this.$refs["Listdata"].reset();
        this.checkboxForm1 = false;
        this.checkboxForm2 = false;
        this.checkboxForm3 = false;
        this.tableContainer = [];
        this.formContainer.container = "";
        if (this.Listdata.id) {
          this.$emit("success", true);
          this.Listdata.id = "";
        }
        // this.Listdata.id = "";
      }
    },
    fresh(value) {
      if (value) {
        console.log(this.Listdata, "Listdata");
        this.modelFlag = true;
        if (this.Listdata.stockBillType == "1")
          this.title = "进境径予放行自主声明";
        else if (this.Listdata.stockBillType == "2")
          this.title = "出境径予放行自主声明";
        else this.title = "径予放行自主声明(出境/进境)";
      } else {
        // this.$emit("success", true);
        this.isSave = false;
        this.modelFlag = false;
      }
    },
    "Listdata.stockBillType"(val, oldVal) {
      if (val == "1") this.title = "进境径予放行自主声明";
      else if (val == "2") this.title = "出境径予放行自主声明";
      else this.title = "径予放行自主声明(出境/进境)";
    },
    "Listdata.trspModecd"(val, oldVal) {
      if (val == "2") {
        this.page_rules.shipNameEn.required = false;
        this.page_rules.voyageNo.required = false;
      } else {
        this.page_rules.shipNameEn.required = true;
        this.page_rules.voyageNo.required = true;
      }
    },
    "Listdata.grossWt"(val, oldVal) {
      // let reg = /\d+(\.\d{0,2})?/;
      // if (reg.test(val)) {
      //   setTimeout(() => {
      //     this.Listdata.grossWt = val.match(/\d+(\.\d{0,5})?/)[0] || "";
      //   });
      // } else {
      //   setTimeout(() => {
      //     this.Listdata.grossWt = "";
      //   });
      // }

      if (
        val &&
        val !== null &&
        val.charAt(0) == "0" &&
        val.length > 1 &&
        val.charAt(1) !== "."
      ) {
        this.$pop({
          type: "danger",
          message: "请输入正确的毛重",
        });
      }
      let reg = /^\d{0,14}(\.\d{0,5})?$/;
      if (!reg.test(val)) {
        setTimeout(() => {
          this.Listdata.grossWt = oldVal;
        });
      }
    },
  },

  mounted() {
    // this.time()
    // if(this.Listdata.sstockBillType=='I')this.title='进境径予放行自主声明'
    //   else if(this.Listdata.sstockBillType=='E')this.title='出境径予放行自主声明'
    //   else this.title='径予放行自主声明(出境/进境)'
  },
  methods: {
    addContainer() {
      console.log("-3-2-=====", this.container);
      if (this.formContainer.container) {
        this.tableContainer.push(cloneObj(this.formContainer));
        this.formContainer.container = "";
      }
    },
    close() {
      //关闭当前模块
      this.modelFlag = false;
      // if (this.isSave) {
      // this.$emit("success", true);
      this.isSave = false;
      // }

      this.$refs["Listdata"].reset();
    },

    time() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let H = date.getHours();
      let mm = date.getMinutes();
      let s = date.getSeconds();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      H = H < 10 ? "0" + H : H;
      let timer = `${y + "-" + m + "-" + d + " "}`;
      this.Listdata.createTime = timer;
    },
    // 完成
    declare() {
      if (!this.Listdata.id) {
        this.$pop({
          type: "danger",
          message: "请先暂存!",
        });
        return;
      }
      if (this.Listdata.stockBillType == "1") {
        this.applyLoading = true;

        this.$post("billDirDtDeclare", { ids: [this.Listdata.id] })
          .then((res) => {
            this.applyLoading = false;

            // this.$emit("success", true);
            this.close();
          })
          .catch(() => {
            this.applyLoading = false;
          });
      } else if (this.Listdata.stockBillType == "2") {
        this.applyLoading = true;

        this.$post("billDirExpDtDeclare", { ids: [this.Listdata.id] })
          .then((res) => {
            this.applyLoading = false;

            // this.$emit("success", true);
            this.close();
          })
          .catch(() => {
            this.applyLoading = false;
          });
      }
    },
    success(Listdata) {
      if (this.checkboxForm1 && this.checkboxForm2 && this.checkboxForm3) {
        this.Listdata.agreeConfirm = 1;
      } else {
        this.Listdata.agreeConfirm = 2;
      }
      if (this.Listdata.agreeConfirm == 2) {
        this.$pop({
          type: "danger",
          message: "未承诺货物符合径予放行条件的径予放行货物自主声明无法暂存!",
        });
        return;
      }
      // let bodyFormCopy = cloneObj(this.Listdata);
      // //   bodyFormCopy["billDirExpDt"] = this.tableDataCopy;
      // bodyFormCopy["billDirExpCon"] = this.tableContainer;

      //   this.Listdata.orgId = this.$store.getters.getId
      //   this.Listdata.supvModecd = this.Listdata.data[0].supvMode
      //   this.Listdata.destinationNatcd = this.Listdata.data[0].destinationCode
      //   this.Listdata.tradeCountry = this.Listdata.data[0].stshipTrsarvCode
      //   this.Listdata.tradingRegion = this.Listdata.data[0].tradeCountryCode
      //   this.Listdata.districtCode = this.Listdata.data[0].districtCode
      //   this.Listdata.transMode = this.Listdata.data[0].transMode
      //   this.Listdata.inExpType = this.Listdata.data[0].stockBillType
      //   this.Listdata.dclcusFlag = this.dclcusFlag == '是' ? '2' : '1'
      //   this.Listdata.dclcusTypecd = this.dclcusTypecd == '关联报关' ? '1' : '2'
      //   this.Listdata.ieTypecd = 'E'
      if (this.Listdata.id) {
        this.$pop({
          type: "danger",
          message: "已暂存!",
        });
        return;
      }
      if (this.Listdata.stockBillType == "1") {
        let bodyFormCopy = cloneObj(this.Listdata);
        let billDirDt = [];
        let billDirWh = [];
        this.Listdata.data &&
          this.Listdata.data.forEach((el) => {
            let data = {
              gdsNm: el.gName,
            };
            billDirDt.push(data);
          });
        this.headerData &&
          this.headerData.forEach((el) => {
            if (el.Highlight) {
              let data1 = {
                inExpWhNo: el.stockBillNoPre,
                inExpTime: el.stockDate,
              };
              billDirWh.push(data1);
            }
          });
        bodyFormCopy["billDirDt"] = billDirDt;
        bodyFormCopy["billDirWh"] = billDirWh;
        bodyFormCopy.id = "";
        bodyFormCopy.dragType = "1";
        delete bodyFormCopy.data;
        delete bodyFormCopy.preData;
        delete bodyFormCopy.stockBillType;
        delete bodyFormCopy.mtpckEndprdTypecd;
        this.$refs["Listdata"].validate((valid) => {
          if (valid) {
            this.saveLoading = true;

            this.$post("getStockBillSaveBillAndWh", bodyFormCopy)
              .then((res) => {
                this.Listdata.id = res.map.id;
                this.isSave = true;
                this.saveLoading = false;

                // this.$refs["Listdata"].reset();
                // this.close();
              })
              .catch(() => {
                this.saveLoading = false;
              });
          }
        });
      } else if (this.Listdata.stockBillType == "2") {
        if (this.tableContainer.length <= 0) {
          this.$pop({
            type: "danger",
            message: "未找到对应集装箱信息!",
          });
          return;
        }
        let bodyFormCopy = cloneObj(this.Listdata);
        let billDirExpDt = [];
        let billDirExpWh = [];
        this.Listdata.data &&
          this.Listdata.data.forEach((el) => {
            let data = {
              gdsNm: el.gName,
              gdsMtno: el.copGNo,
              dclQty: el.qty,
              dclUnitcd: el.gUnit,
            };

            billDirExpDt.push(data);
          });

        this.headerData &&
          this.headerData.forEach((el) => {
            if (el.Highlight) {
              let data1 = {
                inExpWhNo: el.stockBillNoPre,
                inExpTime: el.stockDate,
              };
              billDirExpWh.push(data1);
            }
          });
        bodyFormCopy["billDirExpDt"] = billDirExpDt;
        bodyFormCopy["billDirExpCon"] = this.tableContainer;
        bodyFormCopy["billDirExpWh"] = billDirExpWh;
        bodyFormCopy.id = "";
        bodyFormCopy.dragType = "1";
        delete bodyFormCopy.data;
        delete bodyFormCopy.preData;
        delete bodyFormCopy.stockBillType;
        //   delete this.Listdata.data
        // delete this.Listdata.preData
        this.$refs["Listdata"].validate((valid) => {
          if (valid) {
            this.saveLoading = true;

            this.$post("getStockBillSaveBillExpAndWh", bodyFormCopy)
              .then((res) => {
                this.Listdata.id = res.map.id;
                this.isSave = true;
                this.saveLoading = false;

                // this.$refs["Listdata"].reset();
                // this.$emit('success', true)
                // this.close();
              })
              .catch(() => {
                this.saveLoading = false;
              });
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.ep-form--item.is-required:before {
  content: "*";
  color: #e74c3c;
  position: absolute;
  margin-top: 7px;
  margin-left: -7px;
}
.modelFlagbox {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  height: 670px;
  /* padding-bottom: 50px; */
  /* max-height: 710px; */
  /* overflow: auto; */
  /* justify-content: space-between;
  flex-wrap:wrap; */
}
.addgenerate {
  width: 35%;
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
  background: #fff;
}
.product {
  padding: 8px;
  width: 65%;
  /* padding: 10px; */
  display: flex;
  /* max-height: 710px;  */
  /* flex-wrap: wrap; */
  background: rgb(183, 211, 228);
  display: flex;
  height: 100%;
  overflow: auto;
  flex-direction: column;
}
.table {
  width: 100%;
}
.table a {
  color: rgb(194, 0, 5);
}
span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
p {
  margin: 0;
  font-size: 14px;
}
td {
  border: 1px solid #666;
  font-size: 14px;
}
input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
}
</style>
