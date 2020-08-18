<template>
  <div class="wms-icon" @click.stop="handClick" @dblclick.stop :title="imgUrlShow.name" :class="[{'vib':disabled||loading},{'notclick':loading}]">
    <svg class="ep-button-loading isloading" v-if="loading" width="15px" height="15px" viewBox="0 0 66 66">
      <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30" style="stroke:#FFF" />
    </svg>
    <img :src="imgUrlShow.url" alt />
  </div>
</template>



<script>
export default {
  name: "wms-icon",
  props: {
    type: {
      type: String,
      default: "default",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      imgUrl: [
        {
          type: "cancel",
          name: "删除",
          url: require("../../assets/wms-icon-i/icon_cancel.png"),
        },
        {
          type: "confirm",
          url: require("../../assets/wms-icon-i/icon_confirm.png"),
          name: "确认",
        },
        {
          type: "detail",
          name: "详情",
          url: require("../../assets/wms-icon-i/icon_detail.png"),
        },
        {
          type: "save",
          name: "暂存",
          url: require("../../assets/wms-icon-i/icon_save.png"),
        },
        {
          type: "add",
          name: "添加",
          url: require("../../assets/wms-icon-i/icon_add.png"),
        },
        {
          type: "edit",
          name: "修改",
          url: require("../../assets/wms-icon-i/icon_edit.png"),
        },
        {
          type: "case",
          name: "结案",
          url: require("../../assets/wms-icon-i/icon_case.png"),
        },
        {
          type: "print",
          name: "打印",
          url: require("../../assets/wms-icon-i/icon_print.png"),
        },
        {
          type: "goods",
          name: "货物详情",
          url: require("../../assets/wms-icon-i/icon_goods.png"),
        },
        {
          type: "receipt",
          name: "确认收货",
          url: require("../../assets/wms-icon-i/icon_receipt.png"),
        },
        { type: "time", url: require("../../assets/wms-icon-i/icon_time.png") },
        { type: "zd", url: require("../../assets/wms-icon-i/icon_zd.png") },
        { type: "zz", url: require("../../assets/wms-icon-i/icon_zz.png") },
        {
          type: "change",
          url: require("../../assets/wms-icon-i/icon_change.png"),
          name: "变更",
        },
        {
          type: "void",
          url: require("../../assets/wms-icon-i/icon_void.png"),
          name: "作废",
        },
        {
          type: "entrust",
          name: "委托",
          url: require("../../assets/wms-icon-i/icon_zz.png"),
        },
          {
          type: "unloading",
          name: "卸货",
          url: require("../../assets/wms-icon-i/icon_unloading.png") ,
        },
      ],
    };
  },
  computed: {
    imgUrlShow() {
      let url = this.imgUrl.find((item) => item.type === this.type);
      if (this.title != "") {
        url.name = this.title;
      }
      return url;
    },
  },

  methods: {
    handClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="less" scoped>
.isloading {
  position: absolute;
  left: 2px;
  top: 2px;
  z-index: 999;
}
.notclick {
  pointer-events: none;
}
.wms-icon {
  display: inline-block;
  cursor: pointer;
  position: relative;
}
.vib {
  opacity: 0.3;
  cursor: default;
}
</style>
