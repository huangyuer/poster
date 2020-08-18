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
        { value: "17", label: "转人工" },
        { value: "51", label: "已过卡" },
        { value: "50", label: "未过卡" },
        { value: "52", label: "拒绝过卡" },
        { value: "53", label: "卡口放行" },
        { value: "99", label: "删除" },
        { value: "95", label: "作废申报" },
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
    type(row, index) {
      if (row.type == "1") {
        return "表头";
      } else if (row.type == "2") {
        return "表体";
      } else{
        return row.type
      }
    },
    //进出标志
    optUserFormatter(row, index) {
      if (row.optUserId == "0") {
        return "海关回执";
      } else {
        return row.optUserId;
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
      if (row.status == "99") {
        return "已删除";
      } else if (row.status == "1") {
        return "暂存";
      } else if (row.status == "18") {
        return "已确认";
      } else if (row.status == "3") {
        return "海关入库成功";
      } else if (row.status == "4") {
        return "海关入库失败";
      } else if (row.status == "5") {
        return "审核通过";
      } else if (row.status == "6") {
        return "审核拒绝";
      } else if (row.status == "17") {
        return "待审核";
      } else {
        return "未知";
      }
    },


  
    bizTypecdFormatter(row, index) {
      if (row.bizTypecd == "1") {
        return "账册设立/变更";
      } else if (row.bizTypecd == "2") {
        return "手册设立变更";
      } else if (row.bizTypecd == "3") {
        return "余料结转";
      } else if (row.bizTypecd == "4") {
        return "外发加工";
      } else if (row.bizTypecd == "5") {
        return "单耗管理";
      } else if (row.bizTypecd == "6") {
        return "集中内销";
      } else if (row.bizTypecd == "7") {
        return "其他";
      }
    },
    gurModecdFormatter(row, index) {
      if (row.ltguaType == "1") {
        return "保证金";
      } else if (row.ltguaType == "2") {
        return "保函";
      }
    },
    ltguaStatusFormatter(row, index) {
      if (row.ltguaStatus == "0") {
        return "无效";
      } else if (row.ltguaStatus == "1") {
        return "有效";
      }
    },
    dclTypecdFormatter(row,index){
      if(row.dclTypecd=="0"){
        return "备案"
      }
       if(row.dclTypecd=="1"){
        return "变更"
      }
    },
    gurTypecdFormatter(row, index) {
      if (row.gurTypecd == "1") {
        return "总担保";
      } else if (row.gurTypecd == "2") {
        return "单笔担保";
      }
    },
    paymnModecdFormatter(row, index) {
      if (row.paymnModecd == "1") {
        return "柜台支付";
      } else if (row.paymnModecd == "2") {
        return "电子支付";
      }
    },
    levyBlStucdFormatter(row, index) {
      if (row.levyBlStucd == "1") {
        return "未缴款（未登记）";
      } else if (row.levyBlStucd == "2") {
        return "已缴款（已登记）";
      } else if (row.levyBlStucd == "3") {
        return "无需征收）";
      }
    },
    emapvMarkcdFormatter(row, index) {
      if (row.emapvMarkcd == "0") {
        return "录入";
      } else if (row.emapvMarkcd == "1") {
        return "通过";
      } else if (row.emapvMarkcd == "2") {
        return "转人工";
      } else if (row.emapvMarkcd == "3") {
        return "转岗";
      } else if (row.emapvMarkcd == "4") {
        return "退单";
      } else if (row.emapvMarkcd == "5") {
        return "担保类型转企业确认";
      } else if (row.emapvMarkcd == "6") {
        return "担保类型审核退单";
      }
    },
    dataSrccdFormatter(row, index) {
      if (row.dataSrccd == "0") {
        return "未确认";
      } else if (row.dataSrccd == "1") {
        return "已确认";
      }
    },
    gurPropertyFormatter(row, index) {
      if (row.gurProperty == "1") {
        return "风险类担保金（不退利息）";
      } else if (row.gurProperty == "2") {
        return "限制类担保金（退利息）";
      }
    }
  },
};

// export default mixin;
