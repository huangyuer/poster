export default {
  data() {
    return {
      optionStatusList: [
        {
          value: "1",
          label: "暂存",
        },
        {
          value: "18",
          label: "已确认",
        },
        {
          value: "3",
          label: "海关入库",
        },
        {
          value: "4",
          label: "海关入库失败",
        },
        {
          value: "5",
          label: "审核通过",
        },
        {
          value: "6",
          label: "审核拒绝",
        },
        {
          value: "17",
          label: "转人工",
        },
        {
          value: "51",
          label: "已过卡",
        },
        {
          value: "50",
          label: "未过卡",
        },
        {
          value: "52",
          label: "拒绝过卡",
        },
        {
          value: "53",
          label: "卡口放行",
        },
        {
          value: "99",
          label: "删除",
        },
        {
          value: "95",
          label: "作废申报",
        },
        {
          value: "96",
          label: "已作废",
        },
        {
          value: "100",
          label: "海关删除",
        },
      ],
    };
  },
  mounted() {},
  computed: {
    //主管海关
    tradeInfo() {
      return this.$store.getters.getCustomList;
    },
    //运输方式
    transfList() {
      return this.$store.getters.getTransfList;
    },
    //成交方式
    TransacList() {
      return this.$store.getters.getTransacList;
    },
    countrys() {
      return this.$store.getters.getCountryList;
    },
    tradeInfo() {
      return this.$store.getters.getCustomList;
    },
    unitList() {
      return this.$store.getters.getUnitList;
    },
    curr() {
      return this.$store.getters.getCurrList;
    },
    ImpexpPortcd() {
      return this.$store.getters.getImpexpPortcd;
    },
    //境内目的地
    districtList() {
      return this.$store.getters.getDistrictList;
    },
  },
  methods: {
    //境内目的地
    districtCodeFormatter(row, index) {
      let districtCode = this.$store.getters.getDistrictList;
      for (let i = 0; i < districtCode.length; i++) {
        if (row.districtCode == districtCode[i].districtCode) {
          return districtCode[i].districtName;
        }
      }
    },
    //卡口验放凭证
    // rtlTypecd(row, index) {
    //   if (row.rtlTypecd == "1") return "卡口验放凭证";
    //   else {
    //     return row.rtlTypecd;
    //   }
    // },
    natcdTranslate(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.natcd == countryList[i].countryCode) {
          return countryList[i].nameCn;
        }
      }
    },
    optDclTypecdFormatter(row) {
      if (row.dclTypecd == "1") {
        return "备案";
      } else if (row.dclTypecd == "2") {
        return "变更";
      } else if (row.dclTypecd == "3") {
        return "作废";
      } else {
        return "未知";
      }
    },
    //成交方式
    transModeFormatter(row, index) {
      let transModeList = this.$store.getters.getTransacList;
      for (let i = 0; i < transModeList.length; i++) {
        if (row.transMode == transModeList[i].transMode) {
          return transModeList[i].transSpec;
        }
      }
    },
    //进出标志
    ioTypecdFormatter(row, index) {
      if (row.inExpType != "4") {
        if (row.ieTypecd == "I") {
          return "进区";
        } else if (row.ieTypecd == "E") {
          return "出区";
        } else {
          return row.ieTypecd;
        }
      } else {
        if (row.ieTypecd == "I") {
          return "入库";
        } else if (row.ieTypecd == "E") {
          return "出库";
        } else {
          return row.ieTypecd;
        }
      }
    },
    optUserFormatter(row, index) {
      if (row.optUserId == "0") {
        return "海关回执";
      } else {
        return row.optUserId;
      }
    },
    //状态
    optStatusFormatter(row, index) {
      if (row.optStatus == "99") {
        return "已删除";
      } else if (row.optStatus == "1") {
        return "暂存";
      } else if (row.optStatus == "18") {
        return "已确认";
      } else if (row.optStatus == "3") {
        return "海关入库成功";
      } else if (row.optStatus == "4") {
        return "海关入库失败";
      } else if (row.optStatus == "5") {
        return "审核通过";
      } else if (row.optStatus == "6") {
        return "审核拒绝";
      } else if (row.optStatus == "17") {
        return "待审核";
      } else if (row.optStatus == "95") {
        return "作废确认";
      } else if (row.optStatus == "20") {
        return "变更确认";
      } else if (row.optStatus == "96") {
        return "已作废";
      } else if (row.optStatus == "40") {
        return "确认收货";
      } else {
        return "未知";
      }
    },
    //ERP/WMS出入库类型
    inExpTypeFormatter(row, index) {
      if (row.inExpType == "1") {
        return "一线进出";
      } else if (row.inExpType == "2") {
        return "先报后送";
      } else if (row.inExpType == "3") {
        return "分送集报";
      } else if (row.inExpType == "4") {
        return "区内流转";
      } else if (row.inExpType == "5") {
        return "区间流转";
      } else {
        return "未知";
      }
    },
    modfMarkcdFormatter(row, index) {
      if (row.modfMarkcd == "0") {
        return "未修改";
      } else if (row.modfMarkcd == "1") {
        return "修改";
      } else if (row.modfMarkcd == "2") {
        return "删除";
      } else if (row.modfMarkcd == "3") {
        return "增加";
      } else {
        return "未知";
      }
    },

    //进出卡口状态
    invtIFormatter(row, index) {
      if (row.invtIochkptStucd == "1") {
        return "未过卡";
      } else if (row.invtIochkptStucd == "2") {
        return "部分过卡";
      } else if (row.invtIochkptStucd == "3") {
        return "全部过卡";
      }
    },
    //绑定状态
    passportUsedTypecd(row, index) {
      if (row.passportUsedTypecd == "1") {
        return "未绑定";
      } else if (row.passportUsedTypecd == "2") {
        return "部分绑定";
      } else if (row.passportUsedTypecd == "3") {
        return "已绑定";
      }
    },
    //核扣标记
    vrfFormatter(row, index) {
      if (row.vrfdedMarkcd == "0") {
        return "未核扣";
      } else if (row.vrfdedMarkcd == "1") {
        return "预核扣";
      } else if (row.vrfdedMarkcd == "2") {
        return "已核扣";
      } else if (row.vrfdedMarkcd == "3") {
        return "已核销";
      }
    },

    //料件、成品标志
    mtpckEndprdTypecdFormatter(row, index) {
      if (row.mtpckEndprdTypecd == "I") {
        return "料件";
      } else if (row.mtpckEndprdTypecd == "E") {
        return "成品";
      } else if (row.mtpckEndprdTypecd == "L") {
        return "残次品";
      }else if (row.mtpckEndprdTypecd == "D") {
        return "边角料";
      }else {
        return "设备";
      }
    },
    //监管方式
    supvModecdFormatter(row, index) {
      let tradeModeList = this.$store.getters.getTradeModeList;
      for (let i = 0; i < tradeModeList.length; i++) {
        if (row.supvModecd == tradeModeList[i].tradeMode) {
          return tradeModeList[i].abbrTrade;
        }
      }
    },

    //运输方式
    trspModecdFormatter(row, index) {
      let transfList = this.$store.getters.getTransfList;
      for (let i = 0; i < transfList.length; i++) {
        if (row.trspModecd == transfList[i].trafCode) {
          return transfList[i].trafSpec;
        }
      }
    },

    //进出境关别
    impexpPortcdFormatter(row, index) {
      let customList = this.$store.getters.getCustomList;
      for (let i = 0; i < customList.length; i++) {
        if (row.impexpPortcd == customList[i].customCode) {
          return customList[i].customName;
        }
      }
    },
    //报关类型
    dclcusTypecdFormatter(row, index) {
      if (row.dclcusTypecd == "1") {
        return "关联报关";
      } else if (row.dclcusTypecd == "2") {
        return "对应报关";
      }
    },
    businessTypecdFormatter(row, index) {
      if (row.businessTypecd == "1") {
        return "普通加工";
      } else if (row.businessTypecd == "2") {
        return "外发加工";
      }
    },
    // 币制格式化
    dclCurrcdFormatter(row, index) {
      let currList = this.$store.getters.getCurrList;
      for (let i = 0; i < currList.length; i++) {
        if (row.dclCurrcd == currList[i].currCode) {
          return currList[i].currName;
        }
      }
    },
    // 申报单位格式化
    dclUnitcdTranslate(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.bizopEtpsNo == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
    dclUnitcdTranslate1(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.unit1 == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
    dclUnitcdTranslate2(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.unit2 == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },

    //是否报关
    dclcusFlagFormatter(row, index) {
      if (row.dclcusFlag == "1") {
        return "否";
      } else if (row.dclcusFlag == "2") {
        return "是";
      }
    },
    dclcusFormatter(row, index) {
      if (row.relDclcusFlag == "1") {
        return "未报";
      } else if (row.relDclcusFlag == "2") {
        return "已报";
      }
    },
    //报关状态
    entFormatter(row, index) {
      if (row.entryStucd == "0") {
        return "未放行";
      } else if (row.entryStucd == "1") {
        return "已放行";
      }
    },
    //最终目的国
    destinationTranslate(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.destinationNatcd == countryList[i].countryCode) {
          return countryList[i].nameCn;
        }
      }
    },
    //启运国/运抵国(地区)
    tradeCountryTranslate(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.tradeCountry == countryList[i].countryCode) {
          return countryList[i].nameCn;
        }
      }
    },
    //贸易国(地区)
    regionTranslate(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.tradingRegion == countryList[i].countryCode) {
          return countryList[i].nameCn;
        }
      }
    },
  },
};

// export default mixin;
