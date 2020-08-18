<template>
<div style="position:relative;display:inline-block">
    <div class="checkStatus" v-show="statusFlag">
         <WmsButton  @click="upClick"  >{{buttonName}}</WmsButton>
    </div>
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
     <WmsButton>{{buttonName}}</WmsButton>
  </el-upload>
</div>
 
</template>

<script>
import { getToken, getId } from 'utils'

export default {
  name: "fileUpload", // 保持和文件名一致，否则keep-alive不会动态缓存
  props: {
    uploadData: {
      type: Object,
      required: true
    },
    uploadType:{
      default:0
    },
    // 传入此参数，用户可自定义增加导入前所进行的操作
    statusFlag:{
        default:false
    },
    noType:{
        default:true
    },
    buttonName:{
        default:"Excel导入"
    }
  },

  data() {
    return {
      uploadParam: {
        sysCode: "nepz",
        orgId: this.$store.getters.getId,
        userId:this.$store.getters.getUserId,
        userName: this.$store.getters.getUserName,
        customId: this.$store.getters.getCustomId,
        tradeCode: this.$store.getters.getTradeCode,
        tradeName: this.$store.getters.getTradeName, 
        creditCode: this.$store.getters.getCreditCode,
        orgCode: this.$store.getters.getOrgCode,
        orgType: this.$store.getters.getOrgType,
        organizationCode: this.$store.getters.getOrganizationCode,
        organizationName: this.$store.getters.getOrganizationName,
        orgCreditCode: this.$store.getters.getOrgCreditCode,
        orgCustomId: this.$store.getters.getOrgCustomId, 
        fileName: "",
      }
    }
  },

  computed: {
    // 设置请求头
    headers() {
      return {
        token: getToken(),
        orgId: getId()
      }
    },
    // 设置上传地址
    uploadUrl() {
      return global.HOST + '/tool/import/upload'
    },
    // 请求的额外参数
    uploadParams() {
      if(this.uploadType==0){
        return Object.assign(this.uploadParam, this.uploadData);
      }else{
        this.uploadParam.sysCode = this.uploadData.sysCode
        return Object.assign(this.uploadParam, this.uploadData);
      }
      
      
    }
  },

  methods: {
    upClick(){
        // 触发click事件
        this.$emit("upButtonClick",true)
       // this.$refs.upload.$refs['upload-inner'].handleClick()
    },
    // 上传前校验
    handleBeforeUpload(file) {
      this.uploadParams.fileName = file.name;

    let fileName = file.name.split('.');
    let isLt2M = file.size / 1024 / 1024 < 2;
    if(this.noType){
        let isxls = fileName[fileName.length-1] === 'xls';
        let isxlsx =  fileName[fileName.length-1]=== 'xlsx';
        if (!isxls && !isxlsx) {
        this.$pop({
          type: 'danger',
          message: '上传模板只能是xls、xlsx格式!'
        });
        return false;
      }
    }
   

      

      if (!isLt2M) {
        this.$pop({
          type: 'danger',
          message: '上传模板大小不能超过2M!'
        });
        return false;
      }

    },

    // 上传成功回调
    handleUploadSuccess(response, file, fileList) {
      if (response.status == '1') {
        this.$pop({
          type: 'success',
          message: response.note
        });
        if(this.noType){
             this.$router.push({path:"/excelImport"});
        }else{
             this.$router.push({path:"/excelImport?type=1"});
        }
       
      }
      
    },

    // 上传失败回调
    handleUploadError(err, file, fileList) {
      console.log(err)
    },

  }

};
</script>

<style lang="less" scoped>
  .import-upload {
    display: inline-block;
    margin-left: 8px;
    margin-right: 8px;
  }
  .checkStatus{
      position: absolute;
      z-index: 999;
      padding: 0 10px;
      left:-1px;
  }

</style>
