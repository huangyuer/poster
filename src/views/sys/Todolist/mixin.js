const mixin = {
  methods: {
    // 启用
    Matterstatus(row, index) {
      if (row.status == "0") {
        return "未完成";
      }
      if (row.status == "1") {
        return "已完成";
      }
    },
    orderType(row, index) {
      if (row.orderType == "wht") {
        return "进出区提发货凭证";
      }
      if (row.orderType == "port") {
        return "卡口验放凭证";
      }
      if (row.orderType == "bill") {
        return "进出境径行提离";
      }
    },
    MatterwaroptStatus(row, index) {
      if (row.optStatus == "0") {
        return "未完成";
      }
      if (row.optStatus == "1") {
        return "已完成";
      }
    },
  },
  mounted() {},
};

export default mixin;
