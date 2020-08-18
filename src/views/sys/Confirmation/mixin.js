const mixin = {
  data() {
    return {
      stockBillType: [{
          stockBillType: "1",
          billType: "一线",
          dclcusFlag: "是",
          dclcusTypecd: "关联报关",
        },
        {
          stockBillType: "2",
          billType: "二线",
          dclcusFlag: "是",
          dclcusTypecd: "对应报关",
        },
        {
          stockBillType: "3",
          billType: "区内",
          dclcusFlag: "否",
          dclcusTypecd: "无",
        },
        {
          stockBillType: "4",
          billType: "区间",
          dclcusFlag: "是",
          dclcusTypecd: "对应报关",
        },
        {
          stockBillType: "5",
          billType: "径予",
          dclcusFlag: "是",
          dclcusTypecd: "对应报关",
        }, {
          stockBillType: "6",
          billType: "分送集报",
          dclcusFlag: "是",
          dclcusTypecd: "对应报关",
        },
      ],
    };
  },
  watch: {},
  computed: {
    //境内目的地
    districtList() {
      return this.$store.getters.getDistrictList;
    },
    //成交方式
    TransacList() {
      return this.$store.getters.getTransacList;
    },
    //运输方式
    transfList() {
      return this.$store.getters.getTransfList;
    },
    // 进出境关别
    ImpexpPortcdInfo() {
      return this.$store.getters.getCustomList;
    },
    // 监管方式
    supvInfo() {
      return this.$store.getters.getTradeModeList;
    },
    // 原产国
    countrys() {
      return this.$store.getters.getCountryList;
    },
    // 是否报关
    dclcusFlag() {
      for (let i = 0; i < this.stockBillType.length; i++) {
        if (
          (this.Listdata.preData.stockBillType || "") ==
          this.stockBillType[i].stockBillType
        ) {
          return this.stockBillType[i].dclcusFlag;
        }
      }
    },
    // 报关类型
    dclcusTypecd() {
      for (let i = 0; i < this.stockBillType.length; i++) {
        if (
          (this.Listdata.preData.stockBillType || "") ==
          this.stockBillType[i].stockBillType
        ) {
          return this.stockBillType[i].dclcusTypecd;
        }
      }
    },
    // ERP/WMS出入库类型
    billType() {
      console.log("------d-d-f-df", this.Listdata)
      for (let i = 0; i < this.stockBillType.length; i++) {
        if (
          (this.Listdata.preData.billType || "") ==
          this.stockBillType[i].stockBillType
        ) {
          return this.stockBillType[i].billType;
        }
      }
    },
    // 原产国（地区）
    natcdTranslate: function (row, index) {
      return function (row) {
        let countryList = this.$store.getters.getCountryList;
        for (let i = 0; i < countryList.length; i++) {
          if (row == countryList[i].countryCode) {
            return countryList[i].nameCn;
          }
        }
      };
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
    stockBillTypeFormatter(row, index) {

      if (row.stockBillType == "1") {
        return "进库";
      } else if (row.stockBillType == "2") {
        return "出库";
      } else {
        return row.stockBillType;
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
      }
    },
    //ERP/WMS出入库类型(卡口)
    inExpTypeFormatter1(row, index) {
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
    //料件、成品标志
    mtpckEndprdTypecdFormatter(row, index) {
      if (row.mtpckEndprdTypecd == "I") {
        return "料件";
      } else if (row.mtpckEndprdTypecd == "E") {
        return "成品";
      } else {
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
    // 币制格式化
    dclCurrcdFormatter(row, index) {
      let currList = this.$store.getters.getCurrList;
      for (let i = 0; i < currList.length; i++) {
        if (row == currList[i].currCode) {
          return currList[i].currName;
        }
      }
    },
    // 币制格式化
    dclCurrcdFormatter1(row, index) {
      let currList = this.$store.getters.getCurrList;
      for (let i = 0; i < currList.length; i++) {
        if (row.tradeCurr == currList[i].currCode) {
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

    //是否报关
    dclcusFlagFormatter(row, index) {
      if (row.dclcusFlag == "1") {
        return "否";
      } else if (row.dclcusFlag == "2") {
        return "是";
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
    // 原产国(地区) 格式化
    natcdTranslateFormatter(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.originCountryCode == countryList[i].countryCode) {
          return countryList[i].nameCn;
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
    UsedTypeTranslate(row, index) {
      for (let i = 0; i < this.stockBillType.length; i++) {
        if (row.billType == this.stockBillType[i].stockBillType) {
          return this.stockBillType[i].billType;
        }
      }
      //   if (row.stockBillType == 1) {
      //     return "一线进出";
      //   }
      //   if (row.stockBillType == 2) {
      //     return "先报后送";
      //   }
      //   if (row.stockBillType == 3) {
      //     return "区内流转";
      //   }
      //   if (row.stockBillType == 4) {
      //     return "区间流转";
      //   }
    },
    dclUnitcdTranslate(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.gUnit == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
    dclUnitcdTranslate1(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.gUnit == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
    dclUnitcdTranslate2(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.unit1 == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
    dclUnitcdTranslate3(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.unit2 == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
  },
  mounted() {},
};

export default mixin;
