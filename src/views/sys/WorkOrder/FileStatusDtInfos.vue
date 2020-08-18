<template>
	<div>

		<div class="panel-main-content">
			<!--筛选栏组-->
			<div class="search-card contents-card card-margin">
				<div class="panel panel-default">
					<div class="card-title zero-padding"><span class="weight">查询列表</span></div>
					<ep-form ref="searchForm" :form="searchForm" name-width="138px">
						<ep-row :gutter="7">
							<ep-col :col="6">
								<ep-form-item label="工单日期" attr="woDate">
                  <ep-date v-model="searchForm.woDate" name="woDate"></ep-date>
								</ep-form-item>
							</ep-col>
              <ep-col :col="6">
                <ep-form-item label="文件状态" attr="status">
                  <ep-select v-model="searchForm.status" name="status">
                    <ep-select-item index="0" label="未收到"></ep-select-item>
                    <ep-select-item index="1" label="已收到"></ep-select-item>
                    <ep-select-item index="2" label="已入库"></ep-select-item>
                    <ep-select-item index="3" label="存在错误"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
						</ep-row>
						<ep-row :gutter="7">
							<ep-col :col="24">
								<ep-button type="warning" size="small" @click="reset('searchForm')" icon="refresh">重置</ep-button>
								<ep-button type="primary" size="small" @click="refresh(true)" icon="search" :loading="loading">查询</ep-button>
							</ep-col>
						</ep-row>
					</ep-form>
				</div>
			</div>

      <!-- 详情 -->
      <ep-model 
        title="文件状态明细"
        :wrap-close="false"
        v-model="isShowModel"
        width="1400px">
        <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="138px">
            <ep-row :gutter="10">
              <ep-col :col="8">
                <ep-form-item label="企业编码" attr="tradeCode" required>
                  <ep-input v-model="bodyForm.tradeCode" name="tradeCode" disabled></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="16">
                <ep-form-item label="文件名称" attr="fileName">
                  <ep-input v-model="bodyForm.fileName" name="fileName" disabled></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="工单日期" attr="woDate">
                  <ep-input v-model="bodyForm.woDate" name="woDate" disabled></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="创建时间" attr="createTime">
                  <ep-input v-model="bodyForm.createTime" name="createTime" disabled></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="文件状态" attr="status">
                  <ep-select v-model="bodyForm.status" name="status" disabled>
                    <ep-select-item index="0" label="未收到"></ep-select-item>
                    <ep-select-item index="1" label="已收到"></ep-select-item>
                    <ep-select-item index="2" label="已入库"></ep-select-item>
                    <ep-select-item index="3" label="存在错误"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="文件MD5" attr="md5">
                  <ep-input v-model="bodyForm.md5" name="md5" disabled></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="版本号" attr="version">
                  <ep-input v-model="bodyForm.version" name="version" disabled></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="16">
                <ep-form-item label="备注" attr="rmk">
                  <ep-input readonly v-model="bodyForm.rmk" name="rmk" type="textarea"></ep-input>
                </ep-form-item>
              </ep-col>
            </ep-row>
          </ep-form>
      </ep-model>

      <!-- 修改 -->
      <ep-model 
        title="修改工单文件"
        :wrap-close="false"
        v-model="isShowModel2"
        width="1400px">
        <div class="file-tips">注：修改MD5值将删除当前文件对应的工单数据！</div>
        <ep-form class="demo-form" ref="updateForm" :form="bodyForm"  :rules="page_rules" name-width="138px">
            <ep-row :gutter="10">
              <ep-col :col="8">
                <ep-form-item label="企业编码" attr="tradeCode">
                  <ep-input v-model="bodyForm.tradeCode" name="tradeCode" disabled></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="16">
                <ep-form-item label="文件名称" attr="fileName">
                  <ep-input v-model="bodyForm.fileName" name="fileName" disabled></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="工单日期" attr="woDate">
                  <ep-input v-model="bodyForm.woDate" name="woDate" disabled></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="创建时间" attr="createTime">
                  <ep-input v-model="bodyForm.createTime" name="createTime" disabled></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="文件状态" attr="status">
                  <ep-select v-model="bodyForm.status" name="status" disabled>
                    <ep-select-item index="0" label="未收到"></ep-select-item>
                    <ep-select-item index="1" label="已收到"></ep-select-item>
                    <ep-select-item index="2" label="已入库"></ep-select-item>
                    <ep-select-item index="3" label="存在错误"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="文件MD5" attr="md5">
                  <ep-input v-model="bodyForm.md5" name="md5"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="版本号" attr="version">
                  <ep-input v-model="bodyForm.version" name="version" disabled></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="16">
                <ep-form-item label="备注" attr="rmk">
                  <ep-input readonly v-model="bodyForm.rmk" name="rmk" type="textarea"></ep-input>
                </ep-form-item>
              </ep-col>
            </ep-row>
            <div style="text-align:center;">
              <ep-button type="primary" size="small" @click="makeSure()" :loading="updateLoading" icon="checkmark-round">确定</ep-button>
              <ep-button type="danger" size="small" @click="closeModel()" icon="close">关闭</ep-button>
            </div>
          </ep-form>
      </ep-model>
			<!--表格-->
			<div class="ep-card card-margin relative">
				<div class="card-body">
					<div class="block">
						<ep-button type="primary" size="small" @click="doUpdate" :loading="updateLoading" icon="edit">修改</ep-button>
						<span style="color:red;font-size:25px;position:absolute;">*</span>
						<span style="padding-left: 15px;font-size: 4px;color: rgba(0,0,0,.87);">双击列表信息，可进入详情页面</span>
					</div>
					<div class="block">
						<ep-table ref="table" :height="400" :data="ep_data" head-color @selection-change="handleSelectionChange" :loading="loading" @row-dblclick="detailInfo">
              <ep-table-item type="select"></ep-table-item>
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
import { getToken } from 'utils'

export default {
  name: "fileStatusDtInfos", // 保持和文件名一致，否则keep-alive不会动态缓存
  extends: misList, // 务必继承
  data() {
    return {
      isShowModel: false,
      isShowModel2: false,
      loading: false,
      updateLoading: false,
      listApi: "getWoFileList", // 搜索，取api.json里面的key值
      settings: {
        pk: "id" // 主键
      },
      searchForm: {
        // 筛选条件
        tradeCode: this.$store.getters.getTradeCode,
        pid: "",
        emsNo: "",
        woDate: "",
        status: ""
      },

      bodyForm: {
        tradeCode: "",
        fileName: "",
        woDate: "",
        createTime: "",
        status: "",
        md5: "",
        rmk: "",
      },
      page_rules: {
        md5: { required: true, message: "不能为空", trigger: "change" },
      },

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
  computed: {
    tradeCode() {
      return this.$store.getters.getTradeCode;
    }
  },

  async created() {
    try {
      let data = { orgId:this.$store.getters.getId, page:1, size:1000 };
      let res = await this.$post("getOrgIdByAccountBook", data)
      let bookNoList = res.map.data.content.filter( item => {
        return item.accountType == '1';
      })
      this.searchForm.emsNo = bookNoList[0].accountNo;
      this.searchForm.pid = this.$route.query.id;
    } catch (err) {
      console.log(err)
    }

    this.refresh(true); // 调用继承方法
  },

  mounted() {

  },

  methods: {

    doUpdate() {
      let selectData = this.$refs.table.getData("select");
      if (selectData.length !== 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
        return;
      }

      this.isShowModel2 = true;
      selectData[0].md5 = ''; // 清空md5值
      this.bodyForm = selectData[0];
    },

    makeSure() {
      this.$refs.updateForm.validate(valid => {
        if (!valid) {
          this.$pop({
            type: "danger",
            message: "表单验证失败！"
          });
          return;
        }
        let data = this.bodyForm;
        this.updateLoading = true;
        this.$post('updateFile', data)
          .then(res => {
            this.refresh(false);
            this.updateLoading = false;
            this.isShowModel2 = false;
          })
          .catch(err => {
            console.warn(err)
            this.updateLoading = false;
            this.isShowModel2 = false;
          })
      })
    },

    closeModel() {
      this.isShowModel2 = false;
    },

    // 跳转详情
    detailInfo(event, row, index) {
      this.isShowModel = true;
      this.bodyForm = row;
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
  }

};
</script>

<style lang="less" scoped>
  .file-tips {
    margin-bottom: 20px;
    margin-left: 72px;
    color: red;
    font-size: 14px;
  }
</style>
