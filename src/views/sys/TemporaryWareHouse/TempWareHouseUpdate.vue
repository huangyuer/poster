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
          >暂存</ep-button>
          <ep-button
            type="success"
            size="small"
            @click="declare(isDeclare)"
            icon="checkmark-round"
            :loading="applyLoading"
          >确认</ep-button>-->

          <WmsButton :loading="saveLoading" @click="doSave">暂存</WmsButton>
          <WmsButton :loading="applyLoading" @click="declare(isDeclare)">确认</WmsButton>
        </div>
        <ep-tabs active="临时进出区表头">
          <ep-tab-item name="临时进出区表头">
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
          <ep-tab-item name="临时进出区表体">
            <!-- <formBody ref="formBody" :listData="tableDataCopy"></formBody> -->
            <formBody
              :dragEdit="bodyDrag"
              v-if="changeSatus"
              @dclcusStateChange="dclcusChange"
              ref="formBody"
              :listData="tableDataCopy"
              :changeState="RelationStatus"
              :changeDclcus="dclcusState"
              :headerForm="headerForm"
              :changeType="false"
            ></formBody>
          </ep-tab-item>
          <ep-tab-item v-if="RelationStatus === 3" name="关联卡口凭证">
            <formRelation
              :typeUpdate="true"
              ref="warehousePort"
              :headerForm="headerForm"
              :listDate="warehousePort"
              :ieTypecdState="ieTypecdChangeState"
              :changeRe="false"
            ></formRelation>
          </ep-tab-item>
          <ep-tab-item name="关联出入库">
            <formInExp
              :dragEdit="headerForm.isDrag=='1'?true:false"
              ref="formInExp"
              :listData="warehouseInExp"
              :headerForm="headerForm"
            ></formInExp>
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import formHeader from "./components/formHeader";
import formBody from "./components/formBody";
import formRelation from "./components/formRelation";
import formInExp from "./components/formInExp";
import { cloneObj, getToken } from "utils";
import mixin from "./mixin";
import misList from "src/common/mislist";
import bus from "./components/bus";
export default {
  name: "TempWareHouseUpdate",
  mixins: [mixin, misList],
  components: {
    formHeader,
    formBody,
    formRelation,
    formInExp
  },
  created() {
    let curr = this.$store.getters.getCurrList;
    this.currList = curr;
    bus.$on("passBodyDtUp", data => {
      data.forEach(item => {
        let t;
        item.whRecPreentNo = this.headerForm.whRecPreentNo;
        t = item.gdsSeqno;
        item.gdsSeqno = item.rltPortSeqno;
        item.rltPortSeqno = t;
        // item.leadId = this.tableDataCopy.length;
        this.tableDataCopy.push(item);
      });
      this.tableDataCopy.forEach((el, index) => {
        el.leadId = index;
      });
    });
    bus.$on("deleteDtDetailUp", data => {
      // this.tableDataCopy.forEach((table, i) => {
      //   data.forEach(item => {
      //     if (item.portNo === table.portNo) {
      //       console.log("-----00000",item.portNo, table.portNo)
      //       this.tableDataCopy.splice(table,1);
      //     }
      //   });
      // });

      // const newArr = this.tableDataCopy.filter(arr => {
      //       data.forEach(item => !item.portNo.includes(arr.portNo));
      // })
      // console.log("------",newArr)

      let table = [];
      for (var i = 0; i < this.tableDataCopy.length; i++) {
        let flag = true;
        for (var j = 0; j < data.length; j++) {
          if (this.tableDataCopy[i].portNo == data[j].portNo) {
            flag = false;
            break;
          }
        }
        if (flag) table.push(this.tableDataCopy[i]);
      }
      this.tableDataCopy = table;
    });
  },
  beforeDestroy() {
    //组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    bus.$off("passBodyDtUp");
    bus.$off("deleteDtDetailUp");
  },
  mounted() {
    this.againDate(parseInt(this.$route.query.id));
  },
  // mounted() {},
  data() {
    return {
      bodyDrag: false,
      warehouseInExp: [],
      inExpTypeStatus: true,
      ieTypecdStatus: false,
      changeSatus: true,
      warehousePort: [],
      inExpTypeVal: "",
      headerForm: {
        id: "",
        orgId: this.$store.getters.getId,
        whRecPreentNo: "", // 仓单对应的编号
        inExpWhNo: "", // ERP/WMS出入库编号
        inExpType: "", // ERP/WMS出入库类型
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
      this.$post("wareHouseBscDetails", { id: parseInt(id) }).then(res => {
        this.headerForm = res.map.data;
        if (this.headerForm.inExpType == 3) this.ieTypecdStatus = true;
        this.ieTypecdChangeState = this.headerForm.ieTypecd;
        this.inExpTypeVal = this.headerForm.inExpType;
        this.$refs.formHeader.page_rules.inExpType.required = false;
        this.tableDataCopy = res.map.data.warehouseReceiptDt;
        let tableDataCopy = cloneObj(this.tableDataCopy);
        tableDataCopy.forEach((e, i) => {
          e.leadId = i;
        });
        this.tableDataCopy = tableDataCopy;
        this.warehousePort = res.map.data.warehousePort;
        let warehousePort = cloneObj(this.warehousePort);
        warehousePort.forEach((e, i) => {
          e.leadId = i;
        });
        this.warehousePort = warehousePort;

        this.warehouseInExp = res.map.data.warehouseInExp;
        let warehouseInExp = cloneObj(this.warehouseInExp);
        warehouseInExp.forEach((e, i) => {
          e.leadId = i;
        });
        this.warehouseInExp = warehouseInExp;
        if (this.headerForm.isDrag == "1") {
          if (this.warehouseInExp.length == 1) {
            this.bodyDrag = true;
          } else {
            this.bodyDrag = false;
          }
        }
        console.log("----2-32-3-", this.headerForm.isDrag, this.bodyDrag);
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
      this.headerForm = this.$refs.formHeader.bodyForm;
      this.$refs.formHeader.$refs["bodyForm"].validate(valid => {
        if (valid) {
          this.headerForm.warehouseReceiptDt =
            (this.$refs.formBody && this.$refs.formBody.tableDataCopy) ||
            this.tableDataCopy;
          this.headerForm.warehousePort =
            (this.$refs.warehousePort &&
              this.$refs.warehousePort.tableDataCopy) ||
            this.warehousePort;
          this.headerForm.warehouseInExp =
            (this.$refs.formInExp && this.$refs.formInExp.tableDataCopy) ||
            this.warehouseInExp;
          this.saveLoading = true;
          this.$post("wareHouseSave", this.headerForm)
            .then(res => {
              this.saveLoading = false;
              this.isDeclare = true;
              this.inExpTypeStatus = true;
              this.againDate(res.map.data);
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
    // 确认操作
    declare(isDeclare) {
      if (!isDeclare) {
        this.$pop({
          type: "danger",
          message: "请先暂存"
        });
        return;
      }
      this.headerForm = this.$refs.formHeader.bodyForm;
      this.headerForm.warehouseReceiptDt =
        (this.$refs.formBody && this.$refs.formBody.tableDataCopy) ||
        this.tableDataCopy;
      this.headerForm.warehousePort =
        (this.$refs.warehousePort && this.$refs.warehousePort.tableDataCopy) ||
        this.warehousePort;
      this.headerForm.warehouseInExp =
        (this.$refs.formInExp && this.$refs.formInExp.tableDataCopy) ||
        this.warehouseInExp;

      this.$refs["formHeader"].$refs.bodyForm.validate(valid => {
        if (!valid) {
          this.$pop({
            type: "danger",
            message: "表单验证失败"
          });
          return;
        } else {
          let vm = this;
          this.$confirm({
            word: "是否要确认？",
            async callback(info) {
              if (info) {
                try {
                  let data = vm.headerForm;
                  vm.applyLoading = true;
                  // let result = await vm.$post("wareHouseSave", data);
                  let id = parseInt(data.id);
                  let response = await vm.$post("wareHouseSubmit", {
                    // id: [id]
                    bscIds: [id]
                  });
                  vm.applyLoading = false;
                } catch (err) {
                  vm.applyLoading = false;
                }
              }
            }
          });
        }
      });
    }
  }
};
</script>
