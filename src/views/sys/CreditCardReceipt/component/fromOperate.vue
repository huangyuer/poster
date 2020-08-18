<template>
  <div>
    <ep-model title="操作记录" :wrap-close="false" v-model="selectBwsStatus" width="1200px">
      <ep-form ref="bwsStatusDtForm" :form="bwsStatusDtForm" name-width="168px">
        <ep-row :gutter="7">
          <ep-col :col="8">
            <ep-form-item attr="createTime" label="创建时间" required>
              <ep-input disabled v-model="bwsStatusDtForm.createTime" name="createTime"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="optStatus" label="操作状态" required>
              <ep-select disabled v-model="bwsStatusDtForm.optStatus" name="optStatus">
                <ep-select-item index="1" label="暂存"></ep-select-item>
                <ep-select-item index="18" label="已确认"></ep-select-item>
                <ep-select-item index="3" label="海关入库成功"></ep-select-item>
                <ep-select-item index="4" label="海关入库失败"></ep-select-item>
                <ep-select-item index="5" label="审核通过"></ep-select-item>
                <ep-select-item index="6" label="审核拒绝"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="optUserId" label="操作人">
              <ep-input disabled v-model="bwsStatusDtForm.optUserId" name="optUserId"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="optTime" label="操作时间">
              <ep-input disabled v-model="bwsStatusDtForm.optTime" name="optTime"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="24">
            <ep-form-item attr="remark" label="备注" required>
              <ep-input :rows="4" :readonly="true" type="textarea" v-model="bwsStatusDtForm.remark" name="remark"></ep-input>
            </ep-form-item>
          </ep-col>
        </ep-row>
      </ep-form>
    </ep-model>

    <!--表格-->
    <div class="ep-card card-margin relative">
      <div class="card-body">
        <div class="block"></div>
        <div class="block">
          <ep-table ref="table" :height="400" :data="table2Data" :loading="loading" head-color>
            <ep-table-item column="createTime" title="创建时间" width="200"></ep-table-item>
            <ep-table-item column="optStatus" title="操作状态" :formatter="optStatusFormatter" width="160"></ep-table-item>
            <ep-table-item column="optUserId" title="操作人" width="160" :formatter="optUserFormatter"></ep-table-item>
            <ep-table-item column="optTime" title="操作时间" width="200"></ep-table-item>
            <ep-table-item column="remark" title="备注">
              <template slot-scope="props">
                <p class="rmk-style">{{props.row.remark}}</p>
              </template>
            </ep-table-item>
          </ep-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'formDtOperate',
  props: {
    table2Data: {
      type: Array, //// 操作记录表格数据
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      loading: false,
      selectBwsStatus: false,
      bwsStatusDtForm: {}
    }
  },
  methods: {
    optStatusFormatter(row, index) {
      if (row.optStatus == '99') {
        return '已删除'
      } else if (row.optStatus == '1') {
        return '暂存'
      } else if (row.optStatus == '18') {
        return '已确认'
      } else if (row.optStatus == '3') {
        return '海关入库成功'
      } else if (row.optStatus == '4') {
        return '海关入库失败'
      } else if (row.optStatus == '5') {
        return '审核通过'
      } else if (row.optStatus == '6') {
        return '审核拒绝'
      } else if (row.optStatus == '17') {
        return '待审核'
      } else {
        return '未知'
      }
    },
    optUserFormatter(row, index) {
      if (row.optUserId == '0') {
        return '海关回执'
      } else {
        return row.optUserId
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>
