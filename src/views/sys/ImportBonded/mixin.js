import { mapGetters } from "vuex";

const mixin = {
  data() {
    return {
      brandTypeList: [
        {
          id: "0",
          brandName: "无品牌",
        },
        {
          id: "1",
          brandName: "境内自主品牌",
        },
        {
          id: "2",
          brandName: "境内收购品牌",
        },
        {
          id: "3",
          brandName: "境外品牌(贴牌生产)",
        },
        {
          id: "4",
          brandName: "境外品牌(其他)",
        },
      ],
      directionTypecdList: [
        {
          id: "E",
          name: "出境",
        },
        {
          id: "I",
          name: "入境",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      countrys: "getCountryList",
      impexpPortcd: "getCustomList",
      supvModecd: "getTradeModeList",
      trspModecd: "getTransfList",
      currList: "getCurrList",
      unitList: "getUnitList",
    }),
  },
  mounted() {},
  filters: {
    //     // 启抵国
    setDestinationFilter: function (value, list) {
      console.log(value, list);
      if (!value) return "";
      for (let i = 0; i < list.length; i++) {
        if (value == list[i].countryCode) {
          return list[i].nameCn;
        }
      }
    },
    // 产终国
    setTableNatcdFilter: function (value, list) {
      if (!value) return "";
      for (let i = 0; i < list.length; i++) {
        if (value == list[i].countryCode) {
          return list[i].nameCn;
        }
      }
    },
  },
  methods: {
    dclUnitcdTranslate2(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.unitOne == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
    dclUnitcdTranslate3(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.unitTwo == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
    // 货物流向
    setDirectionTypecd(row, index) {
      if (row.directionTypecd) {
        if (row.directionTypecd == "I") {
          return "入境";
        } else if (row.directionTypecd == "E") {
          return "出境";
        } else {
          return "错误数据";
        }
      }
    },
    // 进出境关别
    setImpexpPortcd(row, index) {
      if (row.impexpPortcd) {
        for (let i = 0; i < this.impexpPortcd.length; i++) {
          if (row.impexpPortcd == this.impexpPortcd[i].customCode) {
            return this.impexpPortcd[i].customName;
          }
        }
      } else if (!row.impexpPortcd) {
      }
    },
    // 监管方式
    setSupvModecd(row, index) {
      for (let i = 0; i < this.supvModecd.length; i++) {
        if (row.supvModecd == this.supvModecd[i].tradeMode) {
          return this.supvModecd[i].abbrTrade;
        }
      }
    },
    // 运输方式
    setTrspModecd(row, index) {
      let transfList = this.$store.getters.getTransfList;
      for (let i = 0; i < this.trspModecd.length; i++) {
        if (row.trspModecd == this.trspModecd[i].trafCode) {
          return this.trspModecd[i].trafSpec;
        }
      }
    },
    // 启抵国
    setDestinationNatcd(row, index) {
      for (let i = 0; i < this.countrys.length; i++) {
        if (row.destinationNatcd == this.countrys[i].countryCode) {
          return this.countrys[i].nameCn;
        }
      }
    },
    // 产终国
    setTableNatcd(row, index) {
      for (let i = 0; i < this.countrys.length; i++) {
        if (row.natcd == this.countrys[i].countryCode) {
          return this.countrys[i].nameCn;
        }
      }
    },
    // 操作状态
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
      } else {
        return "未知";
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
    optUserFormatter(row, index) {
      if (row.optUserId == "0") {
        return "海关回执";
      } else {
        return row.optUserId;
      }
    },
    // 品牌类型
    setGdsSpcfModelDesc(row, index) {
      for (let i = 0; i < this.brandTypeList.length; i++) {
        if (row.gdsSpcfModelDesc == this.brandTypeList[i].id) {
          return this.brandTypeList[i].brandName;
        }
      }
    },
    // 币值
    setSumRmbVal(row, index) {
      for (let i = 0; i < this.currList.length; i++) {
        if (row.sumRmbVal == this.currList[i].currCode) {
          return this.currList[i].currName;
        }
      }
    },
  },
};

export default mixin;
