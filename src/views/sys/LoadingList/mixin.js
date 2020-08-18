const mixin = {
  data() {
    return {
      optionStatusList: [{
          value: "1",
          label: "暂存"
        }, {
          value: "18",
          label: "已确认"
        }, {
          value: "3",
          label: "海关入库"
        }, {
          value: "4",
          label: "海关入库失败"
        }, {
          value: "5",
          label: "审核通过"
        }, {
          value: "6",
          label: "审核拒绝"
        }, {
          value: "17",
          label: "转人工"
        }, {
          value: "51",
          label: "已过卡"
        }, {
          value: "50",
          label: "未过卡"
        },
        {
          value: "52",
          label: "拒绝过卡"
        }, {
          value: "53",
          label: "卡口放行"
        }, {
          value: "99",
          label: "删除"
        }, {
          value: "95",
          label: "作废确认"
        }, {
          value: "96",
          label: "已作废"
        }, {
          value: "100",
          label: "海关删除"
        },
        {
          value: "55",
          label: "正在查验"
        },
        {
          value: "104",
          label: "已委托",
          visible: false
        },
        {
          value: "105",
          label: "取消委托",
          visible: false
        }
      ]
    }
  },
  computed: {
    optStatusList() {
      return this.optionStatusList.filter(item => {
        return item.visible !== false;
      });
    },
    tradeInfo() {
      return this.$store.getters.getCustomList;
    },
  },
  methods: {
    pasFormatter(row, index) {
      if (row.passportTypecd == "0") {
        return "空车进出区";
      } else if (row.passportTypecd == "1") {
        return "非径予放行货物";
      } else if (row.passportTypecd == "2") {
        return "先报后送";
      } else if (row.passportTypecd == "3") {
        return "分送集报";
      } else if (row.passportTypecd == "4") {
        return "区内流转";
      } else if (row.passportTypecd == "5") {
        return "区间流转";
      } else if (row.passportTypecd == "6") {
        return "进出境径予放行";
      }
    },
    dclPlcCuscdFormatter(row, index) {
      let customList = this.$store.getters.getCustomList;
      for (let i = 0; i < customList.length; i++) {
        if (row.customCode == customList[i].customCode) {
          return customList[i].customName;
        }
      }
    },
    ioTypecdFormatter(row, index) {
      if (row.ioTypecd == "I") {
        return "I-进区";
      } else if (row.ioTypecd == "E") {
        return "E-出区";
      }
    },
    typeFormatter(row, index) {
      if (row.sasOptStatus == "1") {
        return "暂存";
      } else if (row.sasOptStatus == "18") {
        return "已申报";
      } else if (row.sasOptStatus == "3") {
        return "海关入库";
      } else if (row.sasOptStatus == "4") {
        return "海关入库失败";
      } else if (row.sasOptStatus == "5") {
        return "审核通过";
      } else if (row.sasOptStatus == "17") {
        return "转人工";
      } else if (row.sasOptStatus == "6") {
        return "审核拒绝";
      } else if (row.sasOptStatus == "99") {
        return "删除";
      } else if (row.sasOptStatus == "95") {
        return "作废申报";
      } else if (row.sasOptStatus == "96") {
        return "已作废";
      } else if (row.sasOptStatus == "100") {
        return "海关删除";
      } else if (row.sasOptStatus == "51") {
        return "已过卡";
      }
    },
    //关区
    masterCuscdFormatter(row, index) {
      let tradeMasterCuscd = this.$store.getters.getCustomList;
      for (let i = 0; i < tradeMasterCuscd.length; i++) {
        if (row.masterCuscd == tradeMasterCuscd[i].customCode) {
          return tradeMasterCuscd[i].customName;
        }
      }
    },
    //关区
    customCodeFormatter(row, index) {
      let tradeMasterCuscd = this.$store.getters.getCustomList;
      for (let i = 0; i < tradeMasterCuscd.length; i++) {
        if (row.customCode == tradeMasterCuscd[i].customCode) {
          return tradeMasterCuscd[i].customName;
        }
      }
    },
    // 进出区标志
    ieTypecdFormatter(row, index) {
      if (row.ieTypecd == "I") {
        return "I-进区";
      } else if (row.ieTypecd == "E") {
        return "E-出区";
      }
    },
    // 进出区标志
    iePackFormatter(row, index) {
      if (row.iePack == "I") {
        return "I-进区";
      } else if (row.iePack == "E") {
        return "E-出区";
      }
    },
    // 类型
    bookTypeFormatter(row, index) {
      if (row.bookType == "1") {
        return "卡口验放凭证";
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
    //查验状态
    isInspectionFormatter(row, index) {
      if (row.isInspection == "1") {
        return "查验";
      }
    },
    //卸货状态
    isDischargeFormatter(row, index) {
      if (row.isDischarge == "0") {
        return "未卸货";
      } else if (row.isDischarge == "1") {
        return "已卸货 ";
      }
    }
  }
}

export default mixin
