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
    };
  },
  watch: {},
  computed: {
    // 监管方式
    supvInfo() {
      return this.$store.getters.getTradeModeList;
    },
    //运输方式
    transfList() {
      return this.$store.getters.getTransfList;
    },
    // 进出境关别
    ImpexpPortcdInfo() {
      return this.$store.getters.getCustomList;
    },
    //成交方式
    TransacList() {
      return this.$store.getters.getTransacList;
    },
    // 原产国
    countrys() {
      return this.$store.getters.getCountryList;
    },
    //境内目的地
    districtList() {
        return this.$store.getters.getDistrictList;
      },
  },
  methods: {
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
        if (row.dclUnitcd == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
      //原产国
    natcdTranslate(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.natcd == countryList[i].countryCode) {
          return countryList[i].nameCn;
        }
      }
    },
    //   修改标志
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
    //境内目的地
    districtCodeFormatter(row, index) {
      let districtCode = this.$store.getters.getDistrictList;
      for (let i = 0; i < districtCode.length; i++) {
        if (row.districtCode == districtCode[i].districtCode) {
          return districtCode[i].districtName;
        }
      }
    },
    //成交方式
    transModeFormatter(row, index) {
      if (row.transMode == "1") {
        return "CTF";
      } else if (row.transMode == "2") {
        return "C&F";
      } else if (row.transMode == "3") {
        return "FOB";
      } else if (row.transMode == "4") {
        return "C&I";
      } else if (row.transMode == "5") {
        return "市场价";
      } else if (row.transMode == "6") {
        return "垫仓";
      } else {
        return row.transMode;
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
    //是否报关
    dclcusFlagFormatter(row, index) {
      if (row.dclcusFlag == "1") {
        return "否";
      } else if (row.dclcusFlag == "2") {
        return "是";
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
    //监管方式
    supvModecdFormatter(row, index) {
      let tradeModeList = this.$store.getters.getTradeModeList;
      for (let i = 0; i < tradeModeList.length; i++) {
        if (row.supvModecd == tradeModeList[i].tradeMode) {
          return tradeModeList[i].abbrTrade;
        }
      }
    },
    //业务类别
    businessTypelistFormatter(row, index) {
      if (row.businessTypecd == "1") {
        return "自用设备";
      } else if (row.businessTypecd == "2") {
        return "简单加工";
      } else if (row.businessTypecd == "3") {
        return "保税加工";
      } else if (row.businessTypecd == "4") {
        return "保税仓储";
      } else if (row.businessTypecd == "5") {
        return "转口贸易";
      } else if (row.businessTypecd == "6") {
        return "跨境电商";
      } else if (row.businessTypecd == "7") {
        return "汽车平行进口";
      } else if (row.businessTypecd == "8") {
        return "融资租赁";
      } else if (row.businessTypecd == "9") {
        return "期货保税交割";
      } else if (row.businessTypecd == "10") {
        return "保税维修";
      } else if (row.businessTypecd == "11") {
        return "进口汽车保税存储";
      } else if (row.businessTypecd == "12") {
        return "保税研发";
      } else if (row.businessTypecd == "13") {
        return "委托加工";
      } else if (row.businessTypecd == "14") {
        return "大宗商品现货保税交易";
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
    statusFormatter(row, index) {
      for (let i = 0; i < this.optionStatusList.length; i++) {
        if (row.optStatus == this.optionStatusList[i].value) {
          return this.optionStatusList[i].label;
        }
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
    //材料成品标志
    mtpckEndprdTypecdFormatter(row, index) {
      if (row.mtpckEndprdTypecd == "I") {
        return "料件";
      } else if (row.mtpckEndprdTypecd == "E") {
        return "成品";
      } else if (row.mtpckEndprdTypecd == "S") {
        return "设备";
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
    //进出境关别
    impexpPortcdFormatter(row, index) {
      let customList = this.$store.getters.getCustomList;
      for (let i = 0; i < customList.length; i++) {
        if (row.impexpPortcd == customList[i].customCode) {
          return customList[i].customName;
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
    //是否计入企业用户标志
    recAccountFlagFormatter(row, index) {
      if (row.recAccountFlag == "0") {
        return "不计入";
      } else if (row.recAccountFlag == "1") {
        return "计入";
      }
    },

    portIochkptStucdFormatter(row, index) {
      if (row.portIochkptStucd == "1") {
        return "未过卡";
      } else if (row.portIochkptStucd == "2") {
        return "已过卡";
      }
    },
  },
  mounted() {},
};

export default mixin;
