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

      //   <!-- //表头
      //   FIELD_NAME_MAP.put("orgId","组织id");
      //   FIELD_NAME_MAP.put("stockBillType","进出类型");
      //   FIELD_NAME_MAP.put("stockBillNoPre","ERP/WMS预出入库单编号");
      //   FIELD_NAME_MAP.put("stockBillNo","ERP/WMS实际出库单编号");
      //   FIELD_NAME_MAP.put("stockType","库存类型");
      //   FIELD_NAME_MAP.put("billType","出入库类型");
      //   FIELD_NAME_MAP.put("tradeCode","经营企业单位编码");
      //   FIELD_NAME_MAP.put("tradeName","经营企业名称");
      //   FIELD_NAME_MAP.put("tradeSccd","经营企业社会信用代码");
      //   FIELD_NAME_MAP.put("masterCuscd","主管海关");
      //   FIELD_NAME_MAP.put("billNo","提运单号");
      //   FIELD_NAME_MAP.put("shipNameEn","英文船名");
      //   FIELD_NAME_MAP.put("voyageNo","航次");
      //   FIELD_NAME_MAP.put("grossWt","毛重");
      //   FIELD_NAME_MAP.put("trafMode","运输方式");
      //   FIELD_NAME_MAP.put("businessType","业务类别");
      //   FIELD_NAME_MAP.put("classifyType","料件成品标志");
      //   FIELD_NAME_MAP.put("supvMode","监管方式");
      //   FIELD_NAME_MAP.put("iEPort","进出境关别");
      //   FIELD_NAME_MAP.put("transMode","成交方式");
      //   FIELD_NAME_MAP.put("stshipTrsarvCode","启运国/运抵国代码（地区）");
      //   FIELD_NAME_MAP.put("tradeCountryCode","贸易国代码（地区）");
      //   FIELD_NAME_MAP.put("districtCode","境内目的地/货源地代码");
      //   FIELD_NAME_MAP.put("destinationCode","最终目的国代码（地区）");
      //   FIELD_NAME_MAP.put("stockDate","创建时间");
      //   FIELD_NAME_MAP.put("rltEntryNo","关联报关单（备案清单、简易申报单）编号");
      //   FIELD_NAME_MAP.put("whNo","仓库号");
      //   FIELD_NAME_MAP.put("whLoc","库位");
      //   FIELD_NAME_MAP.put("orderNo","客户订单号");
      //   FIELD_NAME_MAP.put("ownerName","货主名称");
      //   FIELD_NAME_MAP.put("col1","备选1");
      //   FIELD_NAME_MAP.put("col2","备选2");
      //   FIELD_NAME_MAP.put("col3","备选3");
      //   FIELD_NAME_MAP.put("col4","备选4");
      //   FIELD_NAME_MAP.put("rmk","备注");
      //   FIELD_NAME_MAP.put("optStatus","操作状态");

      //   //表体
      //   FIELD_NAME_MAP.put("entryGdsSeqno","关联报关单（备案清单、简易申报单）商品序号");
      //   FIELD_NAME_MAP.put("copGNo","商品料号");
      //   FIELD_NAME_MAP.put("hsCode","商品编码");
      //   FIELD_NAME_MAP.put("ciqCode","商检编码");
      //   FIELD_NAME_MAP.put("GName","商品名称");
      //   FIELD_NAME_MAP.put("GModel","商品规格型号");
      //   FIELD_NAME_MAP.put("qty","数量");
      //   FIELD_NAME_MAP.put("GUnit","数量单位");
      //   FIELD_NAME_MAP.put("unitPrice","单价");
      //   FIELD_NAME_MAP.put("tradeTotal","总价");
      // FIELD_NAME_MAP.put("tradeCurr","币制");
      // FIELD_NAME_MAP.put("qty1","法定数量");
      // FIELD_NAME_MAP.put("unit1","法定单位");
      // FIELD_NAME_MAP.put("qty2","法定第二数量");
      // FIELD_NAME_MAP.put("unit2","法定第二计量单位");
      // FIELD_NAME_MAP.put("originCountryCode","原产国");
      // FIELD_NAME_MAP.put("netWt","净重");
      // FIELD_NAME_MAP.put("grossWt","毛重");
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
    //卡口验放凭证
    rtlTypecd(row, index) {
      if (row.rtlTypecd == "1") return "卡口验放凭证";
    },
    //原产国
    natcdTranslate(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.originCountryCode == countryList[i].countryCode) {
          return countryList[i].nameCn;
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
      }
    },
    type(row, index) {
      if (row.type == "1") {
        return "表头";
      } else if (row.type == "2") {
        return "表体";
      }
    },
    //进出标志
    ioTypecdFormatter(row, index) {
      if (row.stockBillType != "4") {
        if (row.stockBillType == "I") {
          return "进区";
        } else if (row.stockBillType == "E") {
          return "出区";
        } else {
          return row.stockBillType;
        }
      } else {
        if (row.stockBillType == "I") {
          return "入库";
        } else if (row.stockBillType == "E") {
          return "出库";
        } else {
          return row.stockBillType;
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
      }
    },
    businessType(row, index) {
      if (row.businessType == "1") {
        return "自用设备";
      } else if (row.businessType == "2") {
        return "简单加工";
      } else if (row.businessType == "3") {
        return "保税加工";
      } else if (row.businessType == "4") {
        return "保税仓储";
      } else if (row.businessType == "5") {
        return "转口贸易";
      } else if (row.businessType == "6") {
        return "跨境电商";
      } else if (row.businessType == "7") {
        return "汽车平行进口";
      } else if (row.businessType == "8") {
        return "融资租赁";
      } else if (row.businessType == "9") {
        return "期货保税交割";
      } else if (row.businessType == "10") {
        return "保税维修";
      } else if (row.businessType == "11") {
        return "进口汽车保税存储";
      } else if (row.businessType == "12") {
        return "保税研发";
      } else if (row.businessType == "13") {
        return "委托加工";
      } else if (row.businessType == "14") {
        return "大宗商品现货保税交易";
      }
    },

    //进出卡口状态
    invtIFormatter(row, index) {
      if (row.invtIochkptStucd == "1") {
        return "未过卡";
      } else if (row.invtIochkptStucd == "2") {
        return "部分过卡";
      } else if (row.invtIochkptStucd == "3") {
        return "全部过卡";
      }
    },
    //核扣标记
    vrfFormatter(row, index) {
      if (row.vrfdedMarkcd == "0") {
        return "未核扣";
      } else if (row.vrfdedMarkcd == "1") {
        return "预核扣";
      } else if (row.vrfdedMarkcd == "2") {
        return "已核扣";
      } else if (row.vrfdedMarkcd == "3") {
        return "已核销";
      }
    },

    //料件、成品标志
    classifyTypeFormatter(row, index) {
      if (row.classifyType == "I") {
        return "料件";
      } else if (row.classifyType == "E") {
        return "成品";
      } else if (row.classifyType == "S") {
        return "设备";
      }
    },
    //监管方式
    supvModecdFormatter(row, index) {
      let tradeModeList = this.$store.getters.getTradeModeList;
      for (let i = 0; i < tradeModeList.length; i++) {
        if (row.supvMode == tradeModeList[i].tradeMode) {
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

    //进出境关别
    impexpPortcdFormatter(row, index) {
      let customList = this.$store.getters.getCustomList;
      for (let i = 0; i < customList.length; i++) {
        if (row.ieport == customList[i].customCode) {
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
        if (row.tradeCurr == currList[i].currCode) {
          return currList[i].currName;
        }
      }
    },
    // 申报单位格式化
    dclUnitcdTranslate(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.unit1 == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
    dclUnitcdTranslate1(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.unit2 == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
    dclUnitcdTranslate2(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.gunit == UnitList[i].unit) {
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
    // 库存类型
    stockType(row, index) {
      if (row.stockType == "1") {
        return "保税";
      } else if (row.stockType == "2") {
        return "非保";
      }
    },
    //ERP/WMS出入库类型
    billType(row, index) {
      // 1一线2二线3区内4区间5径予6分送集报
      if (row.billType == "1") {
        return "一线进出";
      } else if (row.billType == "2") {
        return "先报后送";
      } else if (row.billType == "3") {
        return "分送集报";
      } else if (row.billType == "4") {
        return "区内流转";
      } else if (row.billType == "5") {
        return "区间流转";
      }
    },
    // 出入库类型
    // billType(row, index) {
    //   if (row.billType == "1") {
    //     return "一线";
    //   } else if (row.billType == "2") {
    //     return "二线";
    //   }else if (row.billType == "3") {
    //     return "区内";
    //   }else if (row.billType == "4") {
    //     return "区间";
    //   }else if (row.billType == "5") {
    //     return "径予";
    //   }else if (row.billType == "6") {
    //     return "分送集报";
    //   }
    // },
    //报关状态
    entFormatter(row, index) {
      if (row.entryStucd == "0") {
        return "未放行";
      } else if (row.entryStucd == "1") {
        return "已放行";
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
    //最终目的国
    destinationTranslate(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.destinationCode == countryList[i].countryCode) {
          return countryList[i].nameCn;
        }
      }
    },
    tradingRegion(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.tradeCountryCode == countryList[i].countryCode) {
          return countryList[i].nameCn;
        }
      }
    },
    // 启运国/运抵国
    setDestinationNatcd(row, index) {
      for (let i = 0; i < this.countrys.length; i++) {
        if (row.stshipTrsarvCode == this.countrys[i].countryCode) {
          return this.countrys[i].nameCn;
        }
      }
    },
  },
};

// export default mixin;
