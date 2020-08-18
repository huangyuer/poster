<template>
  <div>
    <div class="panel-main-content">
      <!--筛选栏组-->

      <div class="search-card contents-card card-margin">
        <ep-tabs>
          <ep-tab-item name="事项详情">
            <div class="panel panel-default">
              <ep-form ref="searchForm" :form="searchForm" name-width="130px">
                <ep-row :gutter="7">
                  <!-- <ep-col :col="8">
                    <ep-form-item label="系统代码" attr="sysCode">
                      <ep-select v-model="searchForm.sysCode" disabled name="sysCode">
                    <ep-select-item index="1" label="NEPZ"></ep-select-item>
                      </ep-select>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="类型" attr="type">
                      <ep-select v-model="searchForm.type" disabled name="type">
                        <ep-select-item index="1" label="企业待办"></ep-select-item>
                        <ep-select-item index="2" label="组织待办"></ep-select-item>
                        <ep-select-item index="3" label="个人待办"></ep-select-item>
                      </ep-select>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="分类" attr="classify">
                      <ep-select v-model="searchForm.classify" disabled name="classify">
                    <ep-select-item index="1" label="NEPZ"></ep-select-item>
                        <ep-select-item index="1" label="企业待办"></ep-select-item>
                        <ep-select-item index="2" label="组织待办"></ep-select-item>
                        <ep-select-item index="3" label="个人待办"></ep-select-item>
                      </ep-select>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="预警级别" attr="warningRank">
                      <ep-select v-model="searchForm.warningRank" disabled name="warningRank">
                        <ep-select-item index="1" label="重要"></ep-select-item>
                        <ep-select-item index="2" label="一般"></ep-select-item>
                        <ep-select-item index="3" label="低"></ep-select-item>
                      </ep-select>
                    </ep-form-item>
                  </ep-col> -->
                  <ep-col :col="8">
                    <ep-form-item label="标题" attr="title">
                      <ep-input
                        v-model="searchForm.title"
                        disabled
                        name="title"
                      ></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="描述" attr="describe">
                      <ep-input
                        disabled
                        v-model="searchForm.describe"
                      ></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="类型" attr="orderType">
                      <ep-select
                        v-model="searchForm.orderType"
                        disabled
                        name="orderType"
                      >
                        <ep-select-item
                          index="wht"
                          label="进出区提发货凭证"
                        ></ep-select-item>
                        <ep-select-item
                          index="port"
                          label="卡口验放凭证"
                        ></ep-select-item>
                        <ep-select-item
                          index="bill"
                          label="进出境径行提离"
                        ></ep-select-item>
                      </ep-select>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="创建时间" disabled attr="createDate">
                      <ep-date
                        v-model="searchForm.createDate"
                        disabled
                        type="dateTime"
                      ></ep-date>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="状态" attr="status">
                      <ep-select
                        v-model="searchForm.status"
                        disabled
                        name="status"
                      >
                        <ep-select-item
                          index="0"
                          label="未完成"
                        ></ep-select-item>
                        <ep-select-item
                          index="1"
                          label="已完成"
                        ></ep-select-item>
                      </ep-select>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="备注" attr="rmk">
                      <ep-input
                        placeholder="请输入内容"
                        type="textarea"
                        disabled
                        v-model="searchForm.rmk"
                        :autosize="{ minRows: 2, maxRows: 4 }"
                      ></ep-input>
                    </ep-form-item>
                  </ep-col>
                </ep-row>
              </ep-form>
            </div>
          </ep-tab-item>
          <ep-tab-item name="操作记录">
            <div class="card-body">
              <div class="block">
                <ep-table
                  ref="table"
                  :height="400"
                  border
                  :data="tableDataRecord"
                  :head-color="headColor"
                  :loading="loading"
                >
                  <ep-table-item
                    column="createTime"
                    width="200"
                    title="创建时间"
                  ></ep-table-item>
                  <ep-table-item
                    column="optStatus"
                    title="操作状态"
                    :formatter="MatterwaroptStatus"
                    width="200"
                  ></ep-table-item>
                  <ep-table-item
                    column="userName"
                    title="操作人"
                    width="160"
                  ></ep-table-item>
                  <!-- <ep-table-item column="optDate" width='200' title="操作时间"></ep-table-item> -->
                  <ep-table-item column="rmk" title="备注"> </ep-table-item>
                </ep-table>
              </div>
            </div>
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import { cloneObj } from "utils";
import mixin from "./mixin";
export default {
  name: "sqlTestdateInfo", // 保持和文件名一致，否则keep-alive不会动态缓存
  mixins: [mixin],
  extends: misList, // 务必继承

  created() {
    // 调用继承方法
  },

  mounted() {
    console.log(123, this.$route.query);
    this.searchForm = this.$route.query;
    this.$post("MattergetgetStatus", { pid: this.$route.query.id }).then(
      (res) => {
        this.tableDataRecord = res.map.data.content;
        // console.log(444,res.map.data)
      }
    );
  },
  computed: {},
  watch: {},
  methods: {},
  data() {
    return {
      searchForm: {
        status: "",
        sysCode: "",
        type: "",
        classify: "",
        title: "",
        warningRank: "",
        createDate: "",
        endDate: "",
        describe: "",
        rmk: "",
      },
      headColor: true,
      loading: false,
      tableDataRecord: [], //表格数据
    };
  },
};
</script>
<style scoped>
.text-style {
  height: 350px;
  overflow-y: auto;
  border: 1px solid black;
}
</style>
