<template>
	<div>

		<div class="panel-main-content">
			<!--筛选栏组-->
			<div class="search-card contents-card card-margin">
				<div class="panel panel-default">
					<div class="card-title zero-padding"><span class="weight">工单文件上传</span></div> 
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
            :show-file-list="true"
            :file-list="fileList"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传不超过2M的文件</div>
          </el-upload>
				</div>
			</div>

      <ep-model
        title="Excel导入明细"
        v-model="showModel"
        width="1200px"
      >
        <ep-form
          :form="bodyForm"
          name-width="168px"
        >
          <ep-row :gutter="7">
            <ep-col :col="8">
              <ep-form-item attr="businessType" label="业务类型">
                <ep-select v-model="bodyForm.businessType" name="businessType" disabled>
                  <ep-select-item index="ems" label="加工账册"></ep-select-item>
                  <ep-select-item index="bws" label="物流账册"></ep-select-item>
                  <ep-select-item index="sas" label="业务申报"></ep-select-item>
                  <ep-select-item index="stock" label="出入库"></ep-select-item>
                  <ep-select-item index="sasPort" label="核放单"></ep-select-item>
                  <ep-select-item index="bondinvt" label="核注清单"></ep-select-item>
                  <ep-select-item index="chgoff" label="账册核销"></ep-select-item>
                  <ep-select-item index="etarcrp" label="档案库"></ep-select-item>
                  <ep-select-item index="sasCmb" label="耗料单"></ep-select-item>
                  <ep-select-item index="esp" label="便捷进出区"></ep-select-item>
                  <ep-select-item index="eml" label="加工贸易手册"></ep-select-item>
                  <ep-select-item index="oa" label="出区单"></ep-select-item>
                  <ep-select-item index="non" label="非保清单"></ep-select-item>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="fileName" label="文件名称">
                <ep-input v-model="bodyForm.fileName" name="fileName" disabled></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="userName" label="操作用户名">
                <ep-input v-model="bodyForm.userName" name="userName" disabled></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="beginDate" label="开始时间">
                <ep-input v-model="bodyForm.beginDate" name="beginDate" disabled></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="endDate" label="完成时间">
                <ep-input v-model="bodyForm.endDate" name="endDate" disabled></ep-input>
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
                <ep-input v-model="bodyForm.rmk" type="textarea" name="rmk" readonly></ep-input>
              </ep-form-item>
            </ep-col>
          </ep-row>
        </ep-form>
      </ep-model>

			<!--表格-->
			<div class="ep-card card-margin relative">
				<div class="card-body">
					<div class="block">
						<!-- <ep-button type="info" size="small" @click="doRefresh" icon="ios-refresh">刷新</ep-button> -->
					</div>
					<div class="block">
						<ep-table ref="table" :height="400" :data="ep_data" head-color @selection-change="handleSelectionChange" :loading="loading" @row-dblclick="detailInfo">
              <!-- <ep-table-item type="select"></ep-table-item> -->
							<ep-table-item column="fileName" title="文件名称" width="340"></ep-table-item>
							<ep-table-item column="woDate" title="工单日期" width="160"></ep-table-item>
							<ep-table-item column="createTime" title="创建时间" width="200"></ep-table-item>
							<ep-table-item column="status" title="文件状态" width="150" :formatter="statusFormatter"></ep-table-item>
              <ep-table-item column="md5" title="文件MD5" width="240"></ep-table-item>
              <ep-table-item column="version" title="版本号" width="120"></ep-table-item>
							<ep-table-item column="rmk" title="备注" width="350">
                <template slot-scope="props">
                  <p class="rmk-style">{{props.row.rmk}}</p>
                </template>
              </ep-table-item>
						</ep-table>
					</div>
					<div class="block">
						<ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
import misList from "src/common/mislist";
import { getToken, getId } from 'utils'

export default {
  name: "woUpload", // 保持和文件名一致，否则keep-alive不会动态缓存
  extends: misList, // 务必继承
  data() {
    return {
      loading: false,
      showModel: false,
      listApi: "woGetUploadStatus", // 搜索，取api.json里面的key值
      settings: {
        pk: "id" // 主键
      },
      searchForm: {
        // 筛选条件
        
      },
      idList: [],
      bodyForm: {
        orgCode: "",
        businessType: "",
        fileName: "",
        userName: "",
        beginDate: "",
        status: "",
        rmk: ""
      },
      timer: null,

      // 附带的额外参数
      uploadData: {
        // fileName: "",
      },

      fileList: [],

      selectLength: 0,
      selectItems: [],
      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      ep_data: [] //表格数据
    };
  },

  created() {
    // this.doRefresh(); // 调用继承方法
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
      return global.HOST + '/wo/upload'
    }
  },

  mounted() {
    // this.timer = setInterval(() => {
    //   this.refresh(false)
    // }, 10000);
  },

  methods: {
    getUploadStatus () {
      // console.log(row)
      let data = {idList: this.idList};
      this.$post("woGetUploadStatus", data)
        .then(res => {
          this.ep_data = res.map.data;
        })
        .catch(e => {
          console.log(e)
        });
    },

    // 上传前校验
    handleBeforeUpload(file) {
      // console.log(file)
      let isLt2M = file.size / 1024 / 1024 < 2;
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
      console.log(response)
      
      if (response.status != 1) {
        fileList.pop();
        this.fileList = fileList;

        this.$pop({
          type: 'danger',
          message: response.note
        });
        return;
      }

      let id = response.map.id;
      if (this.idList.indexOf(id) == -1) {
        this.idList.push(id);
      }
      this.getUploadStatus(); 

      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.getUploadStatus()
      }, 10000);
    },

    // 上传失败回调
    handleUploadError(err, file, fileList) {
      // console.log(err)
    },

    detailInfo(event, row, index) {
      this.bodyForm = row;
      this.showModel = true;
    },

    statusFormatter(row, index) {
      if (row.status == "0") {
        return "未收到";
      } else if (row.status == "1") {
        return "已收到";
      } else if (row.status == "2") {
        return "已入库";
      } else if (row.status == "3") {
        return "存在错误";
      } 
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }

};
</script>

<style lang="less" scoped>
  .upload-content {
    width: 360px;
  }
</style>
