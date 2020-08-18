<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">
          <!-- <ep-button
            type="success"
            size="small"
            @click="doSave"
            icon="edit"
            :loading="saveLoading"
          >暂存</ep-button> -->
          <!-- <ep-button
            type="success"
            size="small"
            @click="declare(isDeclare)"
            icon="checkmark-round"
            :loading="applyLoading"
          >确认</ep-button> -->
          <WmsButton :loading="saveLoading" @click="doSave">暂存</WmsButton>
        </div>
        <ep-tabs active="出入库预增减表头">
          <ep-tab-item name="出入库预增减表头">
            <formHeader
              @inExpStateChange="stateChange"
              :bodyForm="headerForm"
              ref="formHeader"
              :inExpTypeStatus="inExpTypeStatus"
              :ieTypecdStatus="ieTypecdStatus"
              @changeGrossWt="changeGrossWt"
              :inExpTypeVal="inExpTypeVal"
            ></formHeader>
          </ep-tab-item>
          <ep-tab-item name="出入库预增减表体">
            <!-- <formBody ref="formBody" :listData="tableDataCopy"></formBody> -->
            <formBody
              v-if="changeSatus"
              @dclcusStateChange="dclcusChange"
              ref="formBody"
              :listData="tableDataCopy"
              :changeState="RelationStatus"
              :changeDclcus="dclcusState"
              :headerForm="headerForm"
            ></formBody>
          </ep-tab-item>
          
        </ep-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import formHeader from "./components/formHeader";
import formBody from "./components/formBody";
// import formRelation from "./components/formRelation";
import { cloneObj, getToken } from "utils";
import mixin from "./mixin";
import misList from "src/common/mislist";
// import bus from "./components/bus";
export default {
  name: "drawupdate",
  mixins: [mixin, misList],
  components: {
    formHeader,
    formBody,
  },
  created() {
    let curr = this.$store.getters.getCurrList;
    this.currList = curr;
  },
  beforeDestroy() {
  },
  mounted() {
    this.againDate(parseInt(this.$route.query.id));
  },
  // mounted() {},
  data() {
    return {
      preIncreaseDt:[],
      inExpTypeStatus: true,
      ieTypecdStatus: false,
      changeSatus: true,
      inExpTypeVal: "",
      headerForm: {
        id: "",
        orgId: this.$store.getters.getId,
        whRecPreentNo: "", // 仓单对应的编号
        inExpWhNo: "", // ERP/WMS出入库编号
        inExpType: "3", // ERP/WMS出入库类型
        bizopEtpsno: this.$store.getters.getTradeCode, //经营企业编号
        bizopEtpsNm: this.$store.getters.getTradeName, //经营企业名称
        bizopEtpsSccd: this.$store.getters.getCreditCode, //经营企业社会信用代码
        businessTypecd: "", // 业务类别
        inExpTime: "", // ERP/WMS出入库日期
        mtpckEndprdTypecd: "", // 料件、成品标志
        supvModecd: "", // 监管方式
        trspModecd: "", // 运输方式
        impexpPortcd: "", // 进出境关别
        masterCuscd: this.$store.getters.getCustomId, // 主管海关
        rltEntryNo: "", // 关联报关单编号
        rltWhRecNo: "", // 关联仓单编号
        whRecNo: "", // 仓单编号
        dclTime: "", // 申报日期
        dclcusFlag: "", // 是否报关
        dclcusTypecd: "", // 报关类型
        preRecAccountTime: "", // 预记入企业账户时间
        recAccountTime: "", // 正式记入企业账户时间
        invtIochkptStucd: "", // 进出卡口状态
        vrfdedMarkcd: "", // 核扣标记
        rmk: "", // 备注
        entryStucd: "", // 报关状态
        optStatus: "", // 操作状态
        destinationNatcd: "", // 最终目的国
        tradeCountry: "", // 启运国/运抵国
        tradingRegion: "", // 贸易国（地区）
        districtCode: "", // 境内目的地
        grossWt: "", // 毛重
        transMode: "", // 成交方式
        ieTypecd: "", // 进出标志
        value: "" // ERP/WMS出入库状态变化
      },
      RelationStatus: 3,
      dclcusState: 1,
      ieTypecdChangeState: "",
      saveLoading: false, //暂存loading
      applyLoading: false, //申报loading
      isDeclare: false,
      tableDataCopy: []
    };
  },

  methods: {
    changeGrossWt(val) {
      let reg = /^\d*\.{0,1}\d{0,5}$/;
      if (!reg.test(val)) {
        this.headerForm.grossWt = val;
        return;
      }
      if (val) {
        this.headerForm.grossWt = parseFloat(val).toString();
      }
    },
    againDate(id) {
      this.$post("drawfindDetail", { id: parseInt(id) }).then(res => {
        this.headerForm = res.map.data;
        if (this.headerForm.inExpType == 3) this.ieTypecdStatus = true;
        this.ieTypecdChangeState = this.headerForm.ieTypecd;
        this.inExpTypeVal = this.headerForm.inExpType;
        // this.$refs.formHeader.page_rules.inExpType.required = false;
        this.tableDataCopy = res.map.data.preIncreaseDt;
        let tableDataCopy = cloneObj(this.tableDataCopy);
        // console.log(tableDataCopy,"0000")
        // tableDataCopy.forEach((e, i) => {
        //   e.leadId = i;
        // });  
      });
    },
    stateChange(value) {
      this.RelationStatus = Number(value);
      this.changeSatus = false;
      setTimeout(() => {
        this.changeSatus = true;
      }, 500);
    },
    // 进出标志的值
    ieTypecdChange(value) {
      this.ieTypecdChangeState = value;
    },
    dclcusChange(value) {
      this.dclcusState = Number(value);
    },
    // 暂存操作
    doSave() {
      let preIncreaseDt = this.$refs.formBody
        ? this.$refs.formBody.tableDataCopy
        : []
      this.headerForm = this.$refs.formHeader.bodyForm;
      this.$refs.formHeader.$refs["bodyForm"].validate(valid => {
        if (valid) {
          this.headerForm.preIncreaseDt = preIncreaseDt
          this.saveLoading = true;
          this.$post("drawsave", this.headerForm)
            .then(res => {
              this.saveLoading = false;
              this.isDeclare = true;
              this.inExpTypeStatus = true;
              this.againDate(res.map.id);
            })
            .catch(() => {
              this.saveLoading = false;
            });
        } else {
          this.$pop({
            type: "danger",
            message: "表单验证失败!"
          });
          return;
        }
      });
    },
  }
};
</script>
