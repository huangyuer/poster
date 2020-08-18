<template>
  <div>
    <div v-if="isOperate">
      <ep-model
        title="操作记录"
        :wrap-close="false"
        v-model="model"
        width="1250px"
      >
        <ep-form ref="table" :form="operateForm" name-width="168px">
          <ep-row :gutter="7">
            <ep-col :col="8">
              <ep-form-item attr="createTime" label="创建时间">
                <ep-input
                  disabled
                  v-model="operateForm.createTime"
                  name="createTime"
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="optStatus" label="操作状态">
                <ep-select
                  disabled
                  v-model="operateForm.optStatus"
                  name="optStatus"
                >
                  <ep-select-item index="1" label="暂存"></ep-select-item>
                  <ep-select-item index="18" label="已确认"></ep-select-item>
                  <ep-select-item
                    index="3"
                    label="海关入库成功"
                  ></ep-select-item>
                  <ep-select-item
                    index="4"
                    label="海关入库失败"
                  ></ep-select-item>
                  <ep-select-item index="5" label="审核通过"></ep-select-item>
                  <ep-select-item index="6" label="审核拒绝"></ep-select-item>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="optUserName" label="操作人">
                <ep-input
                  disabled
                  v-model="operateForm.optUserName"
                  name="optUserName"
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="optTime" label="操作时间">
                <ep-input
                  disabled
                  v-model="operateForm.optTime"
                  name="optTime"
                ></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="24">
              <ep-form-item attr="remark" label="备注">
                <ep-input
                  :rows="4"
                  :readonly="true"
                  type="textarea"
                  v-model="operateForm.remark"
                  name="remark"
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
            <ep-table
              border
              ref="table"
              :height="400"
              :data="operateData"
              :loading="loading"
              head-color
              @row-dblclick="queryOperStatus2"
            >
              <ep-table-item
                column="createTime"
                title="创建时间"
                width="200"
              ></ep-table-item>
              <ep-table-item
                column="optStatus"
                title="操作状态"
                :formatter="optStatusFormatter"
                width="160"
              ></ep-table-item>
              <ep-table-item
                column="optUserName"
                title="操作人"
                width="160"
              ></ep-table-item>
              <ep-table-item
                column="optTime"
                title="操作时间"
                width="200"
              ></ep-table-item>
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
    <div v-else>
      <ep-model
        title="关联卡口凭证"
        v-model="model"
        width="1250px"
        :wrap-close="false"
      >
        <ep-form ref="table2" :form="portForm" name-width="168px">
          <ep-row :gutter="7">
            <ep-col :col="8">
              <ep-form-item attr="portNo" label="卡口凭证编号">
                <ep-input
                  disabled
                  v-model="portForm.portNo"
                  name="portNo"
                ></ep-input>
              </ep-form-item>
            </ep-col>

            <ep-col :col="8">
              <ep-form-item attr="rtlTypecd" label="单证类型">
                <ep-input
                  disabled
                  v-model="portForm.rtlTypecd"
                  name="rtlTypecd"
                ></ep-input>
              </ep-form-item>
            </ep-col>
          </ep-row>
        </ep-form>
      </ep-model>
      <div class="ep-card card-margin relative">
        <div class="card-body">
          <div class="block">
            <ep-table
              border
              ref="table"
              :height="400"
              :data="portData"
              :loading="loading"
              head-color
              @row-dblclick="queryOperStatus1"
            >
              <ep-table-item
                column="portNo"
                width="200"
                title="卡口凭证编号"
              ></ep-table-item>
              <ep-table-item
                column="rtlTypecd"
                title="单证类型"
                :formatter="rtlTypecd"
              ></ep-table-item>
            </ep-table>
          </div>
          <!-- 
                  <div class="block">
                    <ep-pager
                      right
                      @size-change="handleSizeChange2"
                      @change="handleCurrentChange2"
                      :now-page="ep_page2.page"
                      :page-size="ep_page2.size"
                      :total-num="totalcount2"
                    ></ep-pager>
                  </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import misList from "src/common/mislist";
import mixin from "../mixin";
export default {
  name: "formDtOperate",
  mixins: [misList, mixin], // 务必继承
  props: {
    operateForm: {
      type: Object,
      default: function() {
        return {};
      }
    },
    operateData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    portForm: {
      type: Object,
      default: function() {
        return {};
      }
    },
    portData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    isOperate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      selectBwsStatus: false,
      bwsStatusDtForm: {},
      model:false,
    };
  },
  methods: {
    queryOperStatus2(event, row, index) {
      this.operateForm = row;
      this.model = true;
    },
    queryOperStatus1(event, row, index) {
      this.portForm = row;
      this.model = true;
    }
  }
};
</script>
<style lang="less" scoped></style>
