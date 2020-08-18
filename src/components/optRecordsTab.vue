<template>
  <!--表格-->
  <div>
    <ep-model title="操作记录" v-model="statusModel" width="1200px" wrap-close>
      <ep-form ref="bodyForm" :form="statusForm" name-width="168px">
        <ep-row :gutter="7">
          <ep-col :col="8">
            <ep-form-item attr="createTime" label="创建时间">
              <ep-input v-model="statusForm.createTime" name="pid" disabled></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="optStatus" label="操作状态" required>
              <ep-select disabled v-model="statusForm.optStatus" name="optStatus">
                <ep-select-item index="1" label="暂存"></ep-select-item>
                <ep-select-item index="18" label="已确认"></ep-select-item>
                <ep-select-item index="3" label="海关入库"></ep-select-item>
                <ep-select-item index="4" label="海关入库失败"></ep-select-item>
                <ep-select-item index="5" label="审核通过"></ep-select-item>
                <ep-select-item index="6" label="审核拒绝"></ep-select-item>
                <ep-select-item index="17" label="转人工"></ep-select-item>
                <ep-select-item index="16" label="正在申报"></ep-select-item>
                <ep-select-item index="19" label="申报失败"></ep-select-item>
                <ep-select-item index="50" label="未过卡"></ep-select-item>
                <ep-select-item index="51" label="已过卡"></ep-select-item>
                <ep-select-item index="52" label="拒绝过卡"></ep-select-item>
                <ep-select-item index="53" label="卡口放行"></ep-select-item>
                <ep-select-item index="54" label="正在过卡"></ep-select-item>
                <ep-select-item index="95" label="作废申报"></ep-select-item>
                <ep-select-item index="96" label="已作废"></ep-select-item>
                <ep-select-item index="99" label="删除"></ep-select-item>
                <ep-select-item index="40" label="预核扣"></ep-select-item>
                <ep-select-item index="11" label="正在暂存"></ep-select-item>
                <ep-select-item index="41" label="通过(已核扣)"></ep-select-item>
                <ep-select-item index="42" label="通过(未核扣)"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>

          <ep-col :col="8">
            <ep-form-item attr="optUserName" label="操作人">
              <ep-input v-model="statusForm.optUserName" name="pid" disabled></ep-input>
            </ep-form-item>
          </ep-col>

          <ep-col :col="8">
            <ep-form-item attr="optTime" label="操作时间">
              <ep-input v-model="statusForm.optTime" name="pid" disabled></ep-input>
            </ep-form-item>
          </ep-col>

          <ep-col :col="24">
            <ep-form-item attr="remark" label="备注">
              <ep-input :rows="4" v-model="statusForm.remark" name="rmk" type="textarea" :readonly="true"></ep-input>
            </ep-form-item>
          </ep-col>
        </ep-row>
      </ep-form>
    </ep-model>
    <div class="ep-card card-margin relative">
      <div class="card-body">
        <div class="block">
          <ep-table ref="table" :height="400" :data="recordsTable" head-color @row-dblclick="showDetail">
            <ep-table-item column="createTime" title="创建时间" width="200"></ep-table-item>
            <ep-table-item column="optStatus" title="操作状态" :formatter="optStatusFormatter" width="160"></ep-table-item>
            <ep-table-item column="optUserName" title="操作人" width="160"></ep-table-item>
            <ep-table-item column="optTime" title="操作时间" width="200"></ep-table-item>
            <ep-table-item column="remark" title="备注" width="450">
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
import misList from 'src/common/mislist'

export default {
  name: 'optRecordsTab',
  props: {
    recordsTable: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      statusModel: false,
      statusForm: {
        id: '',
        pid: '',
        createTime: '',
        optStatus: '',
        optUserId: '',
        optUserName: '',
        optTime: '',
        remark: '',
        fileName: ''
      }
    }
  },
  methods: {
    showDetail(event, row, index) {
      this.statusForm = row
      this.statusModel = true
    },
    optStatusFormatter(row, index) {
      if (row.optStatus == '1') {
        return '暂存'
      } else if (row.optStatus == '18') {
        return '已确认'
      } else if (row.optStatus == '3') {
        return '海关入库'
      } else if (row.optStatus == '4') {
        return '海关入库失败'
      } else if (row.optStatus == '6') {
        return '审核拒绝'
      } else if (row.optStatus == '5') {
        return '审核通过'
      } else if (row.optStatus == '7') {
        return '数据中心入库成功'
      } else if (row.optStatus == '8') {
        return '数据中心入库失败'
      } else if (row.optStatus == '17') {
        return '转人工'
      } else if (row.optStatus == '24') {
        return '已结案'
      } else if (row.optStatus == '25') {
        return '结案申报'
      } else if (row.optStatus == '51') {
        return '已过卡'
      } else if (row.optStatus == '50') {
        return '未过卡'
      } else if (row.optStatus == '52') {
        return '拒绝过卡'
      } else if (row.optStatus == '53') {
        return '卡口放行'
      } else if (row.optStatus == '54') {
        return '正在过卡'
      } else if (row.optStatus == '99') {
        return '删除'
      } else if (row.optStatus == '96') {
        return '已作废'
      } else if (row.optStatus == '95') {
        return '作废申报'
      } else if (row.optStatus == '100') {
        return '海关删除'
      } else if (row.optStatus == '70') {
        return '已失效'
      } else if (row.optStatus == '16') {
        return '正在申报'
      } else if (row.optStatus == '19') {
        return '申报失败'
      } else if (row.optStatus == '40') {
        return '预核扣'
      } else if (row.optStatus == '41') {
        return '通过(已核扣)'
      } else if (row.optStatus == '42') {
        return '通过(未核扣)'
      } else if (row.optStatus == '11') {
        return '正在暂存'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn-group {
  text-align: center;
}
.rmk-style {
  max-width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
}
</style>