<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block"></div>
        <ep-tabs active="卡口验放凭证表头">
          <ep-tab-item name="卡口验放凭证表头">
            <dtFormHeader ref="dtFormHeader" :bodyForm="bodyForm" :classify='classifyType'></dtFormHeader>
          </ep-tab-item>
          <ep-tab-item name="卡口验放凭证表体" v-if="disabledDt">
            <dtFormBody ref="dtFormBody" :dtFormBody="dtFormBody" :classify='classifyType'></dtFormBody>
          </ep-tab-item>
          <ep-tab-item name="卡口验放凭证关联单证表" v-if="disabledRt">
            <dtFormLated ref="dtFormLated" :tableDataLated="tableDataLated" :inExpTypes='inExpTypes' :ieTypecdStatus='ieTypecdStatus'></dtFormLated>
            <!-- // 716修改 增加两个参数 -->
          </ep-tab-item>

          <ep-tab-item name="卡口验放凭证操作记录表">
            <WholeOptStatus ref="WholeOptStatus" :tableData="tableData"></WholeOptStatus>
          </ep-tab-item>
          <ep-tab-item name="关联出入库单证" v-if="InExpTypeLated">
            <dtFormInExpTypeLated :inexpRltType='inexpRltType' @childrenClick="childrenClick1" ref="dtFormInExpTypeLated" :dtFormInExpTypeLatedList="dtFormInExpTypeLatedData" :optStatus="optStatu"></dtFormInExpTypeLated>
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import { cloneObj } from "utils";

import dtFormHeader from "./component/dtFormHeader";
import dtFormBody from "./component/dtFormBody";
import dtFormLated from "./component/dtFormLated";
import dtFormInExpTypeLated from "./component/dtFormInExpTypeLated";
import WholeOptStatus from "src/components/WholeOptStatus";
export default {
  name: "CreditCardReceiptDtInfo",
  extends: misList, // 务必继承
  props: {
    fatherPassportNo: {
      default: "",
    },
  },
  created() {
    // let customList = this.$store.getters.getCustomList;
    // this.tradeInfo = customList;
    // let unitList = this.$store.getters.getUnitList;
    // this.dclUnitcd = unitList;
    // let ImpexpPortcd = this.$store.getters.getCustomList;
    // let masterCuscd = this.$store.getters.getCustomId;
    // this.ImpexpPortcdInfo = ImpexpPortcd;
  },
  components: {
    dtFormHeader,
    dtFormBody,
    dtFormLated,
    dtFormInExpTypeLated,
    WholeOptStatus,
    // portReleaseContainerList,
    // portReleaseSkyList
  },
  computed: {},
  mounted() {
    if (this.fatherPassportNo != "") {
      this.getPassForm();
    } else {
      this.getFormData();
    }
  },
  data() {
    var test = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else {
        if (value.substring(0, 3) === "EDI") {
          callback("不能为EDI开头");
        }
        callback();
      }
    };
    return {
      classifyType: "",
      inexpRltType: "", //关联出入库是否申报过
      inExpTypes: "", // 出入库类型   // 716修改
      ieTypecdStatus: "", //进出类型   // 716修改
      optStatu: "", //状态
      // optStatusList:this.$store.getters.getAgentList,
      // inexpRltPreentNo: "",
      // inexpRltPid: "",
      inExpTypeFlag: "",
      model: false,
      model1: false,
      drop: [],
      ep_page1: {
        size: 10,
        page: 1,
      },
      //containerList: [],
      skyList: [],
      dtFormBody: [],
      totalcount1: 0,
      customSearch: {
        // putrecSeqno:"",
        gdsMtno: "",
        gdecd: "",
        gdsNm: "",
      },
      grossWtFlag: false,
      netWtFlag: false,
      loading: false,
      changeInfo: false,
      changeInfo1: false,
      headColor: true,
      dclChange: true,
      indexChange: "",
      headFormId: "",
      dclUnitcd: [],
      disabledRt: true,
      readonly: false,
      disabledDt: true,
      InExpTypeLated: true,
      bodyForm: {
        id: "",
        pid: "",
        orgId: "",
        portNo: "",
        inExpType: "",
        optStatus: "",
        ieTypecd: "",
        bizopEtpsNo: "",
        preentNo: "",
        dlcTypeCd: "",
        impexpPortcd: "",
        bindTypecd: "",
        masterCuscd: "",
        bizopEtpsNm: "",
        bizopEtpsSccd: "",
        rcvgdEtpsNo: "",
        rcvgdEtpsNm: "",
        rcvgdEtpsSccd: "",
        masterCuscd: "",
        totalNetWt: "",
        vehicleNo: "",
        vehicleIcNo: "",
        containerNo: "",
        vehicleWt: "",
        vehicleFrameNo: "",
        vehicleFrameWt: "",
        containerType: "",
        containerWt: "",
        totalWt: "",
        passCollectWt: "",
        wtError: "",
        totalGrossWt: "",
        dclTime: "",
        portIochkptStucd: "",
        portIochkptrecAccountTime: "",
        passTime: "",
        secdPassTime: "",
        preRecAccountTime: "",
        recAccountTime: "",
        recAccountFlag: "",
        bindUsedTypecd: "",
        inExpWhNo: "",
        rmk: "",
        portReleaseDt: [],
        portReleaseRtl: [],
      },
      tableData: [],
      tableDataLated: [],
      dtFormInExpTypeLatedData: [],
      tableDataDt: [],
      table1Data: [],
      table2Data: [],
      //table4Data: [],
      masterCuscdName: "",
      tradeInfo: [],
      portReleaseStatusForm: {
        id: "",
        pid: "",
        createTime: "",
        optStatus: "",
        optUserId: "",
        optTime: "",
        remark: "",
        fileName: "",
      },
      portReleaseDt: {
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
      },

      portReleaseRtlForm: {
        portNo: "",
        rltTbTypecd: "",
        rltNo: "",
      },
      // dtFormInExpTypeLatedForm: {

      // },
      checkFlag: "",
      selectLength: 0,
      select1Length: 0,
      select2Length: 0,
      selectItems: [],
      select1Items: [],
      select2Items: [],
      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1,
      },
      ep_data: [], //表格数据
    };
  },
  methods: {
    childrenClick1(data) {
      console.log(data);
      this.tableData = data;
    },
    getPassForm() {
      this.$post("portReleaseFindByPort", { billno: this.fatherPassportNo })
        .then((responseData) => {
          this.bodyForm = responseData.map.data;
          let bodyForm = responseData.map.data;

          this.tableData = responseData.map.data.portReleaseStatus;
          this.tableDataDt = responseData.map.data.portReleaseDt;
          this.tableDataLated = responseData.map.data.portReleaseRlt;
          this.dtFormInExpTypeLatedData =
            responseData.map.data.portReleaseInexpRlt;
          let dtFormBody = cloneObj(responseData.map.data.portReleaseDt);
          dtFormBody.forEach((e, i) => {
            e.leadId = i;
          });
          this.dtFormBody = dtFormBody;
          this.makePaging(10, 1, this.dtFormBody);

          this.headFormId = this.bodyForm.id;
        })
        .catch((e) => {
          this.loading = false;
        });
    },
    getFormData() {
      let data = {};
      data["id"] = this.$route.query.id;
      this.$post("protReleasegetDetail", data)
        .then((responseData) => {
          this.bodyForm = responseData.map.data;
          let bodyForm = responseData.map.data;
          this.inExpTypes = bodyForm.inExpType; // 716修改
          this.ieTypecdStatus = bodyForm.ieTypecd; // 716 修改
          this.inexpRltType = bodyForm.inexpRltType;
          console.log(
            "this.inExpTypes:",
            this.inExpTypes,
            "ieTypecdStatus",
            this.ieTypecdStatus
          );
          if (bodyForm.inExpType == 8 && bodyForm.ieTypecd == "I") {
            this.classifyType = true;
          } else {
            this.classifyType = false;
          }
          this.optStatu = responseData.map.data.optStatus;
          this.tableData = responseData.map.data.portReleaseStatus;
          this.tableDataDt = responseData.map.data.portReleaseDt;
          this.tableDataLated = responseData.map.data.portReleaseRlt;
          this.dtFormInExpTypeLatedData =
            responseData.map.data.portReleaseInexpRlt;
          // let inexpRltPreentNo1 = responseData.map.data.preentNo;
          // this.inexpRltPreentNo = inexpRltPreentNo1;
          // let inexpRltPid1 = responseData.map.data.id;
          // this.inexpRltPid = inexpRltPid1;
          let dtFormBody = cloneObj(responseData.map.data.portReleaseDt);
          this.inExpTypeFlag = responseData.map.data.inExpType;
          if (this.inExpTypeFlag == 3 || this.inExpTypeFlag == 0) {
            this.disabledRt = false;
          } else {
            this.disabledRt = true;
          }
          if (this.inExpTypeFlag == 0) {
            this.InExpTypeLated = false;
          }
          dtFormBody.forEach((e, i) => {
            e.leadId = i;
          });
          this.dtFormBody = dtFormBody;
          this.makePaging(10, 1, this.dtFormBody);

          this.headFormId = this.bodyForm.id;
          //this.table4Data = responseData.map.data.portReleaseStatus;
        })
        .catch((e) => {
          this.loading = false;
        });
    },
  },
};
</script>
