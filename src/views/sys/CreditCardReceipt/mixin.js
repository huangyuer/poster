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
    isReturnAreaFormatter(row) {
      if (row.isReturnArea == "1") {
        return "未回区";
      } else if (row.isReturnArea == "2") {
        return "部分回区";
      } else if (row.isReturnArea == "3") {
        return "全部回区";
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
      } else if (row.rltTbTypecd == "4") {
        return "临时进出区";
      } else if (row.rltTbTypecd == "5") {
        return "外发加工";
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
      } else if (row.inExpType == "7") {
        return "临时进出区";
      } else if (row.inExpType == "8") {
        return "外发加工";
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
      } else if (row.mtpckEndprdTypecd == "L") {
        return "边角料";
      } else if (row.mtpckEndprdTypecd == "D") {
        return "残次品";
      }
    },
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
    //进出境关别
    impexpPortcdFormatter(row, index) {
      let customList = this.$store.getters.getCustomList;
      for (let i = 0; i < customList.length; i++) {
        if (row.impexpPortcd == customList[i].customCode) {
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
        if (row.dclUnitcd == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
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

    // 原产国(地区) 格式化
    natcdTranslate(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.natcd == countryList[i].countryCode) {
          return countryList[i].nameCn;
        }
      }
    },
  },
  mounted() {},
};

export default mixin;
