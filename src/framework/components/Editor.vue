<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
    <!-- <button v-on:click="getContent">查看内容</button> -->
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "editor",
  data() {
    return {
      editorContent: "",
      editor: null
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  watch: {
    value(val) {
      this.editor.txt.html(val);
    }
  },
  methods: {
    getContent: function() {
      this.$emit("getContent", this.editorContent);
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editor);
    this.editor.customConfig.zIndex = 0;
    this.editor.customConfig.pasteFilterStyle = true
    this.editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "table", // 表格
      "undo", // 撤销
      "redo" // 重复
    ];
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
      this.getContent();
    };
    this.editor.create();
  }
};
</script>

<style scoped>
</style>
