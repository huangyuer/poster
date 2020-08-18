export default {
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
        { value: "30", label: "结案确认" },
        { value: "96", label: "已作废" },
        { value: "100", label: "海关删除" },
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
    classifyType(row) {
      if (row.classifyType == "I") {
        return "料件";
      } else if (row.classifyType == "E") {
        return "成品";
      } else if (row.classifyType == "S") {
        return "设备";
      } else if (row.classifyType == "L") {
        return "边角料";
      } else if (row.classifyType == "D") {
        return "残次品";
      }
    },
    goodsType(row) {
      if (row.goodsType == "1") {
        return "普通";
      } else if (row.goodsType == "2") {
        return "增料";
      }
    },
    // 原产国(地区) 格式化
    natcdTranslate(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.natcd == countryList[i].countryCode) {
          return countryList[i].nameCn;
        }
      }
    },
    //关联单证类型
    rltTbTypecdFormatter(row, index) {
      if (row.rltTbTypecd == "1") {
        return "进出区提发货";
      } else if (row.rltTbTypecd == "2") {
        return "径予提发货";
      } else if (row.rltTbTypecd == "4") {
        return "临时进出区";
      } else if (row.rltTbTypecd == "5") {
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

    // 申报单位格式化
    dclUnitcdTranslate3(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.dclUnitcd == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
    bizopEtpsNo(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.bizopEtpsNo == UnitList[i].unit) {
          return UnitList[i].unitName;
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
    //境内目的地
    districtCodeFormatter(row, index) {
      let districtCode = this.$store.getters.getDistrictList;
      for (let i = 0; i < districtCode.length; i++) {
        if (row.districtCode == districtCode[i].districtCode) {
          return districtCode[i].districtName;
        }
      }
    },

    typeFormatter(row, index) {
      if (row.type == "1") {
        return "外发加工";
      } else if (row.type == "2") {
        return "飞机试飞";
      }
    },

    masterCuscdFormatter(row, index) {
      let tradeMasterCuscd = this.$store.getters.getCustomList;
      for (let i = 0; i < tradeMasterCuscd.length; i++) {
        if (row.masterCuscd == tradeMasterCuscd[i].customCode) {
          return tradeMasterCuscd[i].customName;
        }
      }
    },
    //状态
    optStatusFormatter(row, index) {
      for (let i = 0; i < this.optionStatusList.length; i++) {
        if (row.optStatus == this.optionStatusList[i].value) {
          return this.optionStatusList[i].label;
        }
      }
    },

    dclTypecdFormatter(row, index) {
      if (row.dclTypecd == "1") {
        return "备案";
      }
      if (row.dclTypecd == "2") {
        return "变更";
      }
      if (row.dclTypecd == "3") {
        return "作废";
      }
      if (row.dclTypecd == "4") {
        return "结案";
      }
    },

    passportUsedTypecdFormatter(row, index) {
      if (row.passportUsedTypecd == "1") {
        return "未绑定";
      } else if (row.passportUsedTypecd == "2") {
        return "部分绑定";
      } else if (row.passportUsedTypecd == "3") {
        return "已绑定";
      }
    },
  },
};

// export default mixin;
