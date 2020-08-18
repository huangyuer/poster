<template>
  <el-upload
    class="import-upload"
    multiple
    name="file"
    ref="upload"
    :action="uploadUrl"
    :headers="headers"
    :data="uploadParams"
    :before-upload="handleBeforeUpload"
    :on-success="handleUploadSuccess"
    :on-error="handleUploadError"
    :show-file-list="false"
  >
    <ep-button type="success" size="small" icon="android-upload">{{excelName}}</ep-button>
  </el-upload>
</template>

<script>
import { getToken, getId } from "utils";
import misList from "src/common/mislist";

// import func from '../../vue-temp/vue-editor-bridge';

export default {
  name: "FileUploadButton", // 保持和文件名一致，否则keep-alive不会动态缓存
  props: {
    uploadData: {
      type: Object
    },
    excelName: {
      type: String,
      default: "Excel导入"
    },
    urlAddress: {
      type: String
    },
    propsUrl: {
      type: String,
      default: "/tool/import/upload"
    }
  },

  data() {
    return {
      uploadParam: {
        // sysCode: "nepz",
        // orgId: this.$store.getters.getId,
        // userId:this.$store.getters.getUserId,
        // userName: this.$store.getters.getUserName,
        // customId: this.$store.getters.getCustomId,
        // tradeCode: this.$store.getters.getTradeCode,
        // tradeName: this.$store.getters.getTradeName,
        // creditCode: this.$store.getters.getCreditCode,
        // orgCode: this.$store.getters.getOrgCode,
        // orgType: this.$store.getters.getOrgType,
        // organizationCode: this.$store.getters.getOrganizationCode,
        // organizationName: this.$store.getters.getOrganizationName,
        // orgCreditCode: this.$store.getters.getOrgCreditCode,
        // orgCustomId: this.$store.getters.getOrgCustomId,
        fileName: ""
      }
    };
  },

  computed: {
    // 设置请求头
    headers() {
      return {
        token: getToken()
        // orgId: getId()
      };
    },
    // 设置上传地址
    uploadUrl() {
      return global.HOST + this.propsUrl;
    },
    // 请求的额外参数
    uploadParams() {
      // return Object.assign(this.uploadParam, this.uploadData);
      if (this.uploadData) {
        return Object.assign(this.uploadParam, this.uploadData);
      } else {
        return this.uploadParam;
      }
    }
  },

  methods: {
    // 上传前校验
    handleBeforeUpload(file) {
      this.uploadParams.fileName = file.name;

      let fileName = file.name.split(".");
      let isxls = fileName[fileName.length - 1] === "xls";
      let isxlsx = fileName[fileName.length - 1] === "xlsx";

      let isLt2M = file.size / 1024 / 1024 < 2;

      if (!isxls && !isxlsx) {
        this.$pop({
          type: "danger",
          message: "上传模板只能是xls、xlsx格式!"
        });
        return false;
      }

      if (!isLt2M) {
        this.$pop({
          type: "danger",
          message: "上传模板大小不能超过2M!"
        });
        return false;
      }
    },

    // 上传成功回调
    handleUploadSuccess(response, file, fileList) {
      console.log(response);
      if (response.status == "1") {
        this.$pop({
          type: "success",
          message: response.note
        });
      }
      if (response.status == "0") {
        this.$pop({
          type: "danger",
          message: response.note
        });
      }
      this.$router.push({ name: "Excel导入" });
    },

    // 上传失败回调
    handleUploadError(err, file, fileList) {
      console.log(err);
    }
  }
};
</script>

<style lang="less" scoped>
.import-upload {
  display: inline-block;
  margin-left: 8px;
  margin-right: 8px;
}
</style>
