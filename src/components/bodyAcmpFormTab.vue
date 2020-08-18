<template>
  <!--表格-->
  <div class="ep-card card-margin relative">
    <div class="card-body">
      <slot></slot>
      <div class="block">
        <ep-table ref="table" :height="400" :data="tableData" head-color @row-dblclick="showDetail">
          <ep-table-item type="select" v-if="!isDetail"></ep-table-item>
          <ep-table-item column="acmpFormSeqno" title="随附单证序号" width="150"></ep-table-item>
          <ep-table-item column="formTypecd" title="文件类型" width="150" :formatter="acmpFormTypecdChange"></ep-table-item>
          <ep-table-item column="formNo" title="随附单证编号" width="150"></ep-table-item>
          <ep-table-item column="fixdNo" title="固定编号" width="240"></ep-table-item>
          <ep-table-item column="acmpFormFileNm" title="文件名称" width="240"></ep-table-item>
          <ep-table-item column="rmk" title="备注" width="350">
            <template slot-scope="props">
              <p class="rmk-style">{{props.row.rmk}}</p>
            </template>
          </ep-table-item>
        </ep-table>
      </div>
    </div>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import { cloneObj } from "utils";

export default {
  name: "bodyAcmpFormTab",
  props: {
    tableData: {
      type: Array,
      required: true
    },
    isDetail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    showDetail(event, row, index) {
      this.$emit('onDetail', cloneObj(row))
    },
    acmpFormTypecdChange(row, index) {
      if (row.formTypecd == "R") {
        return "R-减免税证明";
      } else if (row.formTypecd == "FILE") {
        return "FILE-文件";
      }
    },
  }
}
</script>
