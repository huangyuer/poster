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
								<ep-form-item label="工单编号" attr="woNo">
									<ep-input v-model="searchForm.woNo" name="woNo" :maxlength="30"></ep-input>
								</ep-form-item>
							</ep-col>
              <ep-col :col="6">
								<ep-form-item label="工单日期" attr="woDate">
                  <ep-date v-model="searchForm.woDate" name="woDate"></ep-date>
								</ep-form-item>
							</ep-col>
              <ep-col :col="6">
                <ep-form-item label="库存运算状态" attr="calcStatus">
                  <ep-select v-model="searchForm.calcStatus" name="calcStatus">
                    <ep-select-item index="0" label="未计算"></ep-select-item>
                    <ep-select-item index="1" label="待计算"></ep-select-item>
                    <ep-select-item index="2" label="已计算"></ep-select-item>
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
			<!--表格-->
			<div class="ep-card card-margin relative">
				<div class="card-body">
					<div class="block">
						<span style="color:red;font-size:25px;position:absolute;">*</span>
						<span style="padding-left: 15px;font-size: 4px;color: rgba(0,0,0,.87);">双击列表信息，可进入详情页面</span>
					</div>
					<div class="block">
						<ep-table ref="table" :height="400" :data="ep_data" head-color @selection-change="handleSelectionChange" :loading="loading" @row-dblclick="detailInfo">
							<!-- <ep-table-item type="select"></ep-table-item> -->
							<ep-table-item column="woNo" title="工单编号" width="200"></ep-table-item>
							<ep-table-item column="tradeCode" title="企业编码" width="200"></ep-table-item>
							<ep-table-item column="woDate" title="工单日期" width="200"></ep-table-item>
							<ep-table-item column="emsNo" title="帐册编号" width="200"></ep-table-item>
							<ep-table-item column="calcStatus" title="库存运算状态" width="150" :formatter="calcStatusFormatter"></ep-table-item>
              <ep-table-item column="createTime" title="创建时间" width="200"></ep-table-item>
              <ep-table-item column="updateTime" title="更新时间" width="200"></ep-table-item>
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
  name: "woListInfo", // 保持和文件名一致，否则keep-alive不会动态缓存
  extends: misList, // 务必继承
  data() {
    return {
      loading: false,
      listApi: "getWoList", // 搜索，取api.json里面的key值
      settings: {
        pk: "id" // 主键
      },
      searchForm: {
        // 筛选条件
        tradeCode: this.$store.getters.getTradeCode,
        woNo: "",
        calcStatus: "",
        woDate:""
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

  async created() {
		try {
      let data = { orgId:this.$store.getters.getId, page:1, size:1000 };
      let res = await this.$post("getOrgIdByAccountBook", data)
      let bookNoList = res.map.data.content.filter( item => {
        return item.accountType == '1';
      })
      this.searchForm.emsNo = bookNoList[0].accountNo;
    } catch (err) {
      console.log(err)
		}
		
    // this.refresh(true); // 调用继承方法
  },

  mounted() {},

  methods: {
    // 跳转详情
    detailInfo(event, row, index) {
      this.$app.trigger("locate-tab", "woListDtInfo", row.id);
    },

    calcStatusFormatter(row, index) {
      if (row.calcStatus == "0") {
        return "未计算";
      } else if (row.calcStatus == "1") {
        return "待计算";
      } else if (row.calcStatus == "2") {
        return "已计算";
      }
    },
  }

};
</script>
