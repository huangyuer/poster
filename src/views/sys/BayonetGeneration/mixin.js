const mixin = {
  data() {
    return {
      stockBillTypelist: [
        {
          stockBillType: "1",
          billType: "一线进出",
          dclcusFlag: "是",
          dclcusTypecd: "关联报关",
        },
        {
          stockBillType: "2",
          billType: "先报后送",
          dclcusFlag: "是",
          dclcusTypecd: "对应报关",
        },
        {
          stockBillType: "3",
          billType: "分送集报",
          dclcusFlag: "是",
          dclcusTypecd: "对应报关",
        },
        {
          stockBillType: "4",
          billType: "区内流转",
          dclcusFlag: "否",
          dclcusTypecd: "无",
        },
        {
          stockBillType: "5",
          billType: "区间流转",
          dclcusFlag: "是",
          dclcusTypecd: "对应报关",
        },
      ],
    };
  },
  filters: {
    transform(value) {
      if (value == 1) {
        return "是";
      }
      if (value == 2) {
        return "是";
      }
      if (value == 3) {
        return "是";
      }
      if (value == 4) {
        return "否";
      }
      if (value == 5) {
        return "是";
      }
    },
    dclcusTypecd(value) {
      if (value == 1) {
        return "关联报关";
      }
      if (value == 2) {
        return "对应报关";
      }
      if (value == 3) {
        return "对应报关";
      }
      if (value == 4) {
        return "无";
      }
      if (value == 5) {
        return "对应报关";
      }
    },
    billType(value) {
      if (value == 1) {
        return "一线进出";
      }
      if (value == 2) {
        return "先报后送";
      }
      if (value == 3) {
        return "分送集报";
      }
      if (value == 4) {
        return "区内流转";
      }
      if (value == 5) {
        return "区间流转";
      }
      if (value == 6) {
        return "进出境径予放行";
      }
    },
    ieTypecdS(value) {
      if (value == "I") {
        return "进区";
      }
      if (value == "E") {
        return "出区";
      }
    },
    table1title(value) {
      if (value == "1") {
        return "进境径予";
      }
      if (value == "2") {
        return "出境径予";
      }
      if (value == "3") {
        return "进出区";
      }
      return "出入库单号";
    },
    table2title(value) {
      if (value == "1") {
        return "进境径予详情";
      }
      if (value == "2") {
        return "出境径予详情";
      }
      if (value == "3") {
        return "进出区详情";
      }
      return "出入库详情";
    },
    table3title(value) {
      if (value == "1") {
        return "进境径予自主声明";
      }
      if (value == "2") {
        return "出境径予自主声明";
      }
      if (value == "3") {
        return "进出区提发货凭证";
      }
      return "进出区提发货凭证";
    },
    bindTypecds(value) {
      if (value == "1") {
        return "一车多票";
      }
      if (value == "2") {
        return "一车一票";
      }
      if (value == "3") {
        return "一票多车";
      }
    },
    mtpckEndprdTypecdS(value) {
      if (value == "I") {
        return "料件";
      }
      if (value == "E") {
        return "成品";
      }
      if (value == "S") {
        return "设备";
      }
    },
    rltTbTypecdS(value){
        if (value == "1") {
            return "进出区提发货";
          }
        if (value == "2") {
            return "径予提发货";
          }
          
    }
  },
  watch: {},
  computed: {
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
      
    // 币制格式化
    dclCurrcdFormatter(row, index) {
      let currList = this.$store.getters.getCurrList;
      for (let i = 0; i < currList.length; i++) {
        if (row == currList[i].currCode) {
          return currList[i].currName;
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
    UsedTypeTranslate(row, index) {
      for (let i = 0; i < this.stockBillTypelist.length; i++) {
        if (row.stockBillType == this.stockBillTypelist[i].stockBillType) {
          return this.stockBillTypelist[i].billType;
        }
      }
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
        if (row.dclUnitcd == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
  },
  mounted() {},
};

export default mixin;
