<template>
  <div>
    <div>
      <ep-model title="操作记录" v-model="model" width="1200px" :wrap-close="false">
        <ep-form ref="bodyForm" :form="bodyForm" name-width="168px">
          <ep-row :gutter="7">
            <ep-col :col="8">
              <ep-form-item label="创建时间" attr="createTime" disabled>
                <ep-input disabled v-model="bodyForm.createTime" :maxlength="30"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item label="操作状态" attr="optStatus" disabled>
                <ep-select disabled v-model="bodyForm.optStatus" name="optStatus">
                  <ep-select-item :index="item.value" v-for="(item, k) in optList" :key="k" :label="item.label"></ep-select-item>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item label="操作人" attr="optUserName" disabled>
                <ep-input disabled v-model="bodyForm.optUserName" :maxlength="30"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item label="操作时间" attr="optTime" disabled>
                <ep-input disabled v-model="bodyForm.optTime" :maxlength="30"></ep-input>
              </ep-form-item>
            </ep-col>

            <ep-col :col="24">
              <ep-form-item label="备注" attr="remark">
                <ep-input :readonly="true" :rows="4" type="textarea" v-model="bodyForm.remark"></ep-input>
              </ep-form-item>
            </ep-col>
          </ep-row>
          <div style="text-align: center;">
            <ep-button type="primary" size="small" @click="model = false" icon="edit">确定</ep-button>
          </div>
        </ep-form>
      </ep-model>
      <div class="ep-card card-margin relative">
        <div class="card-body">
          <div class="block"></div>
          <div class="block">
            <ep-table ref="table" border :height="400" :data="tableData" :head-color="true" @row-dblclick="queryOperStatus">
              <ep-table-item column="createTime" width="200" title="创建时间"></ep-table-item>
              <ep-table-item column="optStatus" width="160" title="操作状态" :formatter="statusFormatter"></ep-table-item>
              <ep-table-item column="optUserName" width="160" title="操作人"></ep-table-item>
              <ep-table-item column="optTime" width="200" title="操作时间"></ep-table-item>
              <ep-table-item column="remark" title="备注">
                <template slot-scope="props">
                  <p class="rmk-style">{{ props.row.remark }}</p>
                </template>
              </ep-table-item>
            </ep-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: false,
      bodyForm: {},
      optionStatusList: [
        { value: "1", label: "暂存" },
        { value: "18", label: "已确认" },
        { value: "3", label: "海关入库" },
        { value: "4", label: "海关入库失败" },
        { value: "5", label: "审核通过" },
        { value: "6", label: "审核拒绝" },
        { value: "17", label: "待审核" },
        { value: "51", label: "已过卡" },
        { value: "50", label: "未过卡" },
        { value: "52", label: "拒绝过卡" },
        { value: "53", label: "卡口放行" },
        { value: "99", label: "删除" },
        { value: "95", label: "作废申报" },
        { value: "96", label: "已作废" },
        { value: "100", label: "海关删除" },
        { value: "102", label: "出入库信息同步" },
        { value: "101", label: "出入库信息新增" },
        { value: "103", label: "出入库信息删除" },
        { value: "104", label: "已委托" },
        { value: "105", label: "取消委托" },
        { value: "40", label: "确认收货" },
        { value: "106", label: "绑定装车单" },
        { value: "107", label: "解绑装车单" }
      ],
      optionStatusListSum: [
        { value: "1", label: "暂存" },
        { value: "18", label: "已确认" },
        { value: "3", label: "海关入库" },
        { value: "4", label: "海关入库失败" },
        { value: "5", label: "审核通过" },
        { value: "6", label: "审核拒绝" },
        { value: "17", label: "待审核" },
        { value: "51", label: "已过卡" },
        { value: "50", label: "未过卡" },
        { value: "52", label: "拒绝过卡" },
        { value: "53", label: "卡口放行" },
        { value: "99", label: "删除" },
        { value: "95", label: "作废申报" },
        { value: "96", label: "已作废" },
        { value: "100", label: "海关删除" },
        { value: "102", label: "出入库信息同步" }
      ]
    };
  },
  watch: {},
  props: {
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    ModelType: {
      type: String,
      default: "null"
    }
  },
  computed: {
    optList() {
      if (this.ModelType == "null") {
        return this.optionStatusList;
      }
      if (this.ModelType == "sum") {
        return this.optionStatusListSum;
      }
    }
  },
  mounted() {},
  methods: {
    statusFormatter(row, index) {
      if (this.ModelType == "null") {
        for (let i = 0; i < this.optionStatusList.length; i++) {
          if (row.optStatus == this.optionStatusList[i].value) {
            return this.optionStatusList[i].label;
          }
        }
      }
      if (this.ModelType == "sum") {
        for (let i = 0; i < this.optionStatusListSum.length; i++) {
          if (row.optStatus == this.optionStatusListSum[i].value) {
            return this.optionStatusListSum[i].label;
          }
        }
      }
    },
    queryOperStatus(event, row, index) {
      this.bodyForm = row;
      this.model = true;
    }
  }
};
</script>

<style scoped></style>
