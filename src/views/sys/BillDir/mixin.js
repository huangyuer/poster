const mixin = {
  data() {
    return {
      optionStatusList: [
        { value: "1", label: "暂存" },
        { value: "18", label: "已确认" },
        { value: "3", label: "海关入库" },
        { value: "4", label: "海关入库失败" },
        { value: "5", label: "审核通过" },
        { value: "6", label: "审核拒绝" },
        { value: "17", label: "待审核" },
        { value: "51", label: "已过卡" },
        { value: "50", label: "未过卡" },
        { value: "52", label: "拒绝过卡" },
        { value: "53", label: "卡口放行" },
        { value: "99", label: "删除" },
        { value: "95", label: "作废确认" },
        { value: "96", label: "已作废" },
        { value: "100", label: "海关删除" },
      ],
      dcTypeList: [
        {
          id: "1",
          value: "备案",
        },
        {
          id: "2",
          value: "变更",
        },
        {
          id: "3",
          value: "作废",
        },
      ],
    };
  },
  watch: {},
  methods: {
    // 申报类型
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
    // 启用
    ieTypecdFormatter(row, index) {
      if (row.ieTypecd == "I") {
        return "I-进区";
      } else if (row.ieTypecd == "E") {
        return "E-出区";
      }
    },
    portIochkptStucdFormatter(row, index) {
      if (row.portIochkptStucd == "1") {
        return "未过卡";
      } else if (row.portIochkptStucd == "2") {
        return "已过卡";
      }
    },
    //绑定类型
    binFormatter(row, index) {
      if (row.bindTypecd == "1") {
        return "一车多票";
      } else if (row.bindTypecd == "2") {
        return "一车一票";
      } else if (row.bindTypecd == "3") {
        return "一票多车";
      }
    },
    statusFormatter(row, index) {
      for (let i = 0; i < this.optionStatusList.length; i++) {
        if (row.optStatus == this.optionStatusList[i].value) {
          return this.optionStatusList[i].label;
        }
      }
    },
    //主管地海关
    masterCuscdFormatter(row, index) {
      let tradeMasterCuscd = this.$store.getters.getCustomList;
      for (let i = 0; i < tradeMasterCuscd.length; i++) {
        if (row.masterCuscd == tradeMasterCuscd[i].customCode) {
          return tradeMasterCuscd[i].customName;
        }
      }
    },
    //关联单证类型
    rltTbTypecdFormatter(row, index) {
      if (row.rltTbTypecd == "1") {
        return "进出区提发货";
      } else if (row.rltTbTypecd == "2") {
        return "径予提发货";
      }
    },
    //出入库类型
    inExpTypeFormatter(row, index) {
      if (row.inExpType == "0") {
        return "空车进出区";
      } else if (row.inExpType == "1") {
        return "非径予放行货物";
      } else if (row.inExpType == "2") {
        return "先报后送";
      } else if (row.inExpType == "3") {
        return "分送集报";
      } else if (row.inExpType == "4") {
        return "区内流转";
      } else if (row.inExpType == "5") {
        return "区间流转";
      } else if (row.inExpType == "6") {
        return "进出境径予放行";
      }
    },
    //材料成品标志
    //材料成品标志
    mtpckEndprdTypecdFormatter(row, index) {
      if (row.mtpckEndprdTypecd == "I") {
        return "料件";
      } else if (row.mtpckEndprdTypecd == "E") {
        return "成品";
      } else if (row.mtpckEndprdTypecd == "S") {
        return "设备";
      } else if (row.classifyType == "L") {
        return "边角料";
      } else if (row.classifyType == "D") {
        return "残次品";
      }
    },
    //分送集报标志
    bindUsedTypecdFormatter(row, index) {
      if (row.bindUsedTypecd == "1") {
        return "未集报";
      } else if (row.bindUsedTypecd == "2") {
        return "已绑定未集报";
      } else if (row.bindUsedTypecd == "3") {
        return "已集报";
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
    //进出境关别
    impexpPortcdFormatter(row, index) {
      let customList = this.$store.getters.getCustomList;
      for (let i = 0; i < customList.length; i++) {
        if (row.iEPort == customList[i].customCode) {
          return customList[i].customName;
        }
      }
    },
    // 主管海关
    impexpPortcdFormatter1(row, index) {
      let customList = this.$store.getters.getCustomList;
      for (let i = 0; i < customList.length; i++) {
        if (row.customMaster == customList[i].customCode) {
          return customList[i].customName;
        }
      }
    },
    //是否计入企业用户标志
    recAccountFlagFormatter(row, index) {
      if (row.recAccountFlag == "0") {
        return "不计入";
      } else if (row.recAccountFlag == "1") {
        return "计入";
      }
    },
    // 申报单位格式化
    dclUnitcdTranslate(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.gUnit == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
    //法定计量单位
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
    tradeCurrFormatter(row, index) {
      let currList = this.$store.getters.getCurrList;
      for (let i = 0; i < currList.length; i++) {
        if (row.tradeCurr == currList[i].currSymb) {
          return currList[i].currName;
        }
      }
    },
    isRltInexpFormatter(row) {
      if (row.isRltInexp == 1) {
        return "已关联";
      } else {
        return "未关联";
      }
    },
    // 原产国(地区) 格式化
    natcdTranslate(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.originCountry == countryList[i].countryCode) {
          return countryList[i].nameCn;
        }
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
    // 最终目的国代码（地区）
    natcdTranslate1(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.destinationCountry == countryList[i].countryCode) {
          return countryList[i].nameCn;
        }
      }
    },
    // 启运国/运抵国代码（地区
    natcdTranslate2(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.tradeCountry == countryList[i].countryCode) {
          return countryList[i].nameCn;
        }
      }
    },
    //境内目的地
    districtCodeFormatter(row, index) {
      let districtCode = this.$store.getters.getDistrictList;
      for (let i = 0; i < districtCode.length; i++) {
        if (row.districtCode == districtCode[i].districtCode) {
          return districtCode[i].districtName;
        }
      }
    },
    //// 贸易国代码（地区）
    natcdTranslate2(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.tradeAreaCode == countryList[i].countryCode) {
          return countryList[i].nameCn;
        }
      }
    },
    natcdTranslate3(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.tradeAreaCode == countryList[i].countryCode) {
          return countryList[i].nameCn;
        }
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
    //监管方式
    supvModecdFormatter(row, index) {
      let tradeModeList = this.$store.getters.getTradeModeList;
      for (let i = 0; i < tradeModeList.length; i++) {
        if (row.tradeMode == tradeModeList[i].tradeMode) {
          return tradeModeList[i].abbrTrade;
        }
      }
    },

    //运输方式
    trspModecdFormatter(row, index) {
      let transfList = this.$store.getters.getTransfList;
      for (let i = 0; i < transfList.length; i++) {
        if (row.trafMode == transfList[i].trafCode) {
          return transfList[i].trafSpec;
        }
      }
    },
  },
  mounted() {},
};

export default mixin;
