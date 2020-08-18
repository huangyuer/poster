const mixin = {
  data() {
    return {

    }
  },
  computed: {
    // 币制
    currLists() {
      return this.$store.getters.getCurrList;
    },
    // 国别
    countrys() {
      return this.$store.getters.getCountryList;
    },
    // 计量单位
    unitLists() {      
      return this.$store.getters.getUnitList;
    },

  },
  mounted() {

  },
  methods: {
    optDclTypecdFormatter(row) {
      if (row.dclTypecd == "1") {
        return "备案"
      } else if (row.dclTypecd == "2") {
        return "变更"
      } else {
        return "未知"
      }
    },
    // 操作状态
    optStatusFormatter(row, index) {
      if (row.optStatus == "96") {
        return "已作废";
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
        return "转人工";
      } else if (row.optStatus == "20") {
        return "变更申报";
      } else {
        return "未知";
      }
    },
    // 国别格式化
    destinationTranslate(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.natcd == countryList[i].countryCode) {
          return countryList[i].nameCn;
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
    // 计量单位格式化
    lawfUnitcdTranslate(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.dclUnitcd == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    }
  }
}

export default mixin