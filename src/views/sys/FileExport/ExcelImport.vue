<template>
  <div>
    <div class="panel-main-content">
      <!--筛选栏组-->
      <div class="search-card contents-card card-margin">
        <div class="panel panel-default">
          <div class="card-title zero-padding">
            <span class="weight">Excel导入</span>
          </div>
          <el-upload
            class="upload-content"
            drag
            multiple
            name="file"
            ref="upload"
            :action="uploadUrl"
            :headers="headers"
            :data="uploadData"
            :before-upload="handleBeforeUpload"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            :show-file-list="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传xls、xlsx文件，且不超过2M
            </div>
            <div class="el-upload__tip" slot="tip">
              文件命名规范:业务类型代码_文件名称_组织代码.xlsx<br />例:sum_进出境货物统计汇总_000621.xlsx
            </div>
          </el-upload>
        </div>
      </div>

      <ep-model title="Excel导入明细" v-model="showModel" width="1200px">
        <ep-form :form="bodyForm" name-width="168px">
          <ep-row :gutter="7">
            <ep-col :col="8">
              <ep-form-item attr="businessType" label="业务类型">
                <ep-select
                  v-model="bodyForm.businessType"
                  name="businessType"
                  disabled
                >
                  <ep-select-item
                    :index="item.code"
                    v-for="(item, index) in selectListData"
                    :key="index"
                    :label="item.name"
                  ></ep-select-item>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="fileName" label="文件名称">
                <ep-input
                  v-model="bodyForm.fileName"
                  name="fileName"
                  disabled
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="userName" label="操作用户名">
                <ep-input
                  v-model="bodyForm.userName"
                  name="userName"
                  disabled
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="beginDate" label="开始时间">
                <ep-input
                  v-model="bodyForm.beginDate"
                  name="beginDate"
                  disabled
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="endDate" label="完成时间">
                <ep-input
                  v-model="bodyForm.endDate"
                  name="endDate"
                  disabled
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="status" label="状态">
                <ep-select v-model="bodyForm.status" name="status" disabled>
                  <ep-select-item index="0" label="处理中"></ep-select-item>
                  <ep-select-item index="1" label="已完成"></ep-select-item>
                  <ep-select-item index="2" label="异常"></ep-select-item>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="16">
              <ep-form-item attr="rmk" label="备注">
                <ep-input
                  v-model="bodyForm.rmk"
                  type="textarea"
                  name="rmk"
                  readonly
                ></ep-input>
              </ep-form-item>
            </ep-col>
          </ep-row>
        </ep-form>
      </ep-model>

      <!--表格-->
      <div class="ep-card card-margin relative">
        <div class="card-body">
          <div class="block">
            <ep-button
              type="info"
              size="small"
              @click="doRefresh"
              icon="ios-refresh"
              >刷新</ep-button
            >
          </div>
          <div class="block">
            <ep-table
              ref="table"
              :height="400"
              :data="ep_data"
              head-color
              @selection-change="handleSelectionChange"
              :loading="loading"
              @row-dblclick="detailInfo"
            >
              <ep-table-item
                column="businessType"
                title="业务类型"
                width="120"
                :formatter="businessTypeFormatter"
              ></ep-table-item>
              <ep-table-item
                column="fileName"
                title="文件名称"
                width="240"
              ></ep-table-item>
              <ep-table-item
                column="userName"
                title="操作用户名"
                width="150"
              ></ep-table-item>
              <ep-table-item
                column="beginDate"
                title="开始时间"
                width="200"
              ></ep-table-item>
              <ep-table-item
                column="endDate"
                title="完成时间"
                width="200"
              ></ep-table-item>
              <ep-table-item
                column="status"
                title="状态"
                width="200"
                :formatter="statusFormatter"
              ></ep-table-item>
              <ep-table-item column="rmk" title="备注" width="350px">
                <template slot-scope="props">
                  <p class="rmk-style">{{ props.row.rmk }}</p>
                </template>
              </ep-table-item>
            </ep-table>
          </div>
          <div class="block">
            <ep-pager
              right
              @size-change="handleSizeChange"
              @change="handleCurrentChange"
              :now-page="ep_page.page"
              :page-size="ep_page.size"
              :total-num="totalcount"
            ></ep-pager>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import { getToken, getId } from "utils";

export default {
  name: "import", // 保持和文件名一致，否则keep-alive不会动态缓存
  extends: misList, // 务必继承
  data() {
    return {
      loading: false,
      showModel: false,
      listApi: "getImportList", // 搜索，取api.json里面的key值
      settings: {
        pk: "id", // 主键
      },
      searchForm: {
        // 筛选条件
        userName: this.$store.getters.getUserName,
        after_beginDate: "",
      },
      bodyForm: {
        orgCode: "",
        businessType: "",
        fileName: "",
        userName: "",
        beginDate: "",
        status: "",
        rmk: "",
      },
      selectListData: [
        { name: "卡口验放凭证", code: "port" },
        { name: "进出区提发货凭证", code: "wareHouse" },
        { name: "进出境货物统计汇总", code: "sum" },
        { name: "径予提货单", code: "billDirBsc" },
        { name: "径予发货单", code: "billDirExp" },
        { name: "货物信息", code: "base" },
      ],
      timer: null,

      // 附带的额外参数
      uploadData: {
        sysCode: "lgsa",
        orgId: this.$store.getters.getId,
        userId: this.$store.getters.getUserId,
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
        businessType: "",
      },

      fileList: [],

      selectLength: 0,
      selectItems: [],
      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1,
      },
      ep_data: [], //表格数据
    };
  },

  created() {
    this.searchForm.after_beginDate = this.nowDate;
    this.refresh(true); // 调用继承方法
  },

  computed: {
    // 设置请求头
    headers() {
      return {
        token: getToken(),
        orgId: getId(),
      };
    },
    // 设置上传地址
    uploadUrl() {
        
      return global.HOST + "/tool/import/upload";
    },
    nowDate() {
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      return `${year}-${month}-${day}`;
    },
  },

  mounted() {
    this.timer = setInterval(() => {
      this.refresh(false);
    }, 10000);
  },

  methods: {
    // 上传前校验
    handleBeforeUpload(file) {
        if(this.$route.query.type==1){
            this.uploadData.checkType = "N"
            return true
        }
      console.log(file);

      // fileName: 业务类型代码_文件名称_组织代码.xlsx
      let fileName1 = file.name.split("_");
      this.uploadData.fileName = file.name;
      this.uploadData.businessType = fileName1[0];
      let businessTypeList = [];
      this.selectListData.forEach((item) => {
        businessTypeList.push(item.code);
      });
      let hasBusinessType = businessTypeList.indexOf(fileName1[0]);

      let fileName2 = file.name.split(".");
      let isxls = fileName2[fileName2.length - 1] === "xls";
      let isxlsx = fileName2[fileName2.length - 1] === "xlsx";

      let isLt2M = file.size / 1024 / 1024 < 2;

      if (fileName1.length != 3 || hasBusinessType == -1) {
        this.$pop({
          type: "danger",
          message: "上传模板命名不规范!",
        });
        return false;
      }

      if (!isxls && !isxlsx) {
        this.$pop({
          type: "danger",
          message: "上传模板只能是xls、xlsx格式!",
        });
        return false;
      }
      if (!isLt2M) {
        this.$pop({
          type: "danger",
          message: "上传模板大小不能超过2M!",
        });
        return false;
      }

      return this.checkParms(file);
    },

    // 上传成功回调
    handleUploadSuccess(response, file, fileList) {
      console.log(response);

      if (response.status != 1) {
        this.$pop({
          type: "danger",
          message: response.note,
        });
        return;
      }
      this.fileList = [];
      this.refresh(false);
    },

    // 上传失败回调
    handleUploadError(err, file, fileList) {
      console.log(err);
      this.fileList = [];
    },

    detailInfo(event, row, index) {
      this.bodyForm = row;
      this.showModel = true;
    },

    checkParms(file) {
      let prefixFile = file.name.split("_")[0];
      let hasEms = this.fileList.indexOf("ems") == -1;
      let hasChgoff = this.fileList.indexOf("chgoff") == -1;
      let hasEtarcrp = this.fileList.indexOf("etarcrp") == -1;

      if (prefixFile == "ems" && !hasEms) {
        this.$pop({
          type: "danger",
          message: "相同的加工账册模板一次只能上传一个文件!",
        });
        return false;
      }
      if (prefixFile == "chgoff" && !hasChgoff) {
        this.$pop({
          type: "danger",
          message: "相同的账册核销模板一次只能上传一个文件!",
        });
        return false;
      }
      if (prefixFile == "etarcrp" && !hasEtarcrp) {
        this.$pop({
          type: "danger",
          message: "相同的档案库模板一次只能上传一个文件!",
        });
        return false;
      }

      this.fileList.push(prefixFile);
      return true;
    },

    businessTypeFormatter(row, index) {
      for (let i = 0; i < this.selectListData.length; i++) {
        if (this.selectListData[i].code == row.businessType) {
          return this.selectListData[i].name;
        }
      }
    },

    statusFormatter(row, index) {
      if (row.status == "0") {
        return "处理中";
      } else if (row.status == "1") {
        return "已完成";
      } else if (row.status == "2") {
        return "异常";
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
.upload-content {
  width: 360px;
}
</style>
