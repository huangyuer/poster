<template>
  <div class="panel-main-content main-in-style">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="card-title zero-padding">
          <span class="weight">查询</span>
        </div>
        <ep-form ref="searchForm" :form="searchForm" name-width="168px" :rules="page_rules">
          <ep-row :gutter="7">
            <ep-col :col="8">
              <ep-form-item attr="rtlTypecd" label="单证类型">
                <ep-select v-model="searchForm.rtlTypecd" @change="rtlTypecdS" name="rtlTypecd">
                  <div>
                    <ep-select-item index="1" label="进境径予自主声明"></ep-select-item>
                    <ep-select-item index="2" label="出境径予自主声明"></ep-select-item>
                    <ep-select-item index="3" label="进出区提发货凭证"></ep-select-item>
                  </div>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item label="ERP/WMS出入库类型" attr="inExpType">
                <ep-select v-model="searchForm.inExpType" name="inExpType" @change="trspChange" :disabled="inExpTypeShow">
                  <ep-select-item index="1" label="非径予放行货物"></ep-select-item>
                  <ep-select-item index="2" label="先报后送"></ep-select-item>
                  <!-- <ep-select-item index="3" label="分送集报"></ep-select-item> -->
                  <!-- <ep-select-item index="4" label="区内流转"></ep-select-item> -->
                  <ep-select-item index="5" label="区间流转"></ep-select-item>
                  <!-- <ep-select-item index="0" label="空车进出区"></ep-select-item> -->
                  <ep-select-item index="6" label="进出境径予放行" disabled></ep-select-item>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item label="绑定类型" attr="bindTypecd">
                <ep-select v-model="searchForm.bindTypecd" name="bindTypecd" :disabled="bindTypecdShow" @change="bindTypecdChange">
                  <ep-select-item index="1" label="一车多票"></ep-select-item>
                  <ep-select-item index="2" label="一车一票"></ep-select-item>
                  <ep-select-item :disabled="bindTypecdStatus" index="3" label="一票多车"></ep-select-item>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="sstockBillType" label="进出标志">
                <ep-select v-model="searchForm.sstockBillType" name="sstockBillType" :disabled="sstockBillTypeShow">
                  <div>
                    <ep-select-item index="I" label="进区"></ep-select-item>
                    <ep-select-item index="E" label="出区"></ep-select-item>
                  </div>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <!-- <ep-col :col="10">
              <ep-form-item label="时间" attr="valueDate">
                <ep-date-range v-model="searchForm.valueDate"></ep-date-range>
              </ep-form-item>
            </ep-col> -->
          </ep-row>
          <ep-row :gutter="7">
            <ep-col :col="24">
              <ep-button type="warning" size="small" icon="refresh" @click="reset('searchForm')">重置</ep-button>
              <ep-button type="primary" size="small" @click="getlistData()" icon="search" :loading="loading">查询</ep-button>
            </ep-col>
          </ep-row>
        </ep-form>
      </div>
    </div>
    <!-- <TableData v-if="tableshow==0" :fresh='tableshow' :listData="todo"></TableData> -->
    <TableData1 v-if="tableshow==1" :fresh='tableshow' :tableThree='tableOne' ref="TableData3" :judgeForm='searchForm' :formats='format' @formatChange="format=!format"></TableData1>
    <TableData2 v-if="tableshow==2" :fresh='tableshow' :tableThree='tableTwo' ref="TableData3" :judgeForm='searchForm' :formats='format' @formatChange="format=!format"></TableData2>
    <TableData3 v-if="tableshow==3" :fresh='tableshow' :tableThree='tableThree' ref="TableData3" :judgeForm='searchForm' :formats='format' @formatChange="format=!format"></TableData3>
  </div>
</template>

<script>
import { cloneObj } from '../../../utils/data'
import mixin from './mixin'
import generate from './components/generate'
import generate1 from './components/generate1'
import generate2 from './components/generate2'
import TableData from './components/TableData'
import TableData1 from './components/TableData1'
import TableData2 from './components/TableData2'
import TableData3 from './components/TableData3'
import Sortable from 'sortablejs'
import misList from 'src/common/mislist'
export default {
  name: 'BayonetGeneration',
  mixins: [mixin],
  extends: misList, // 务必继承
  data() {
    return {
      format: true,
      searchForm: {
        // sstockBillType: 'I',
        // valueDate: '',
        // rtlTypecd: '3',
        // bindTypecd: '3',
        // inExpType: '1'
        sstockBillType: '',
        valueDate: '',
        rtlTypecd: '',
        bindTypecd: '',
        inExpType: ''
      },
      data: {
        optStatus: '5',
        dclTime: '',
        size: 100,
        page: 1
      },
      loading: false,
      tableshow: 1, //展示哪个模块
      bindTypecdStatus: false, //一票多车是否可以选择
      bindTypecdShow: true, // 绑定状态是否显示
      inExpTypeShow: true, // 出入库类型是否显示
      sstockBillTypeShow: false, //进出标志是否显示
      page_rules: {
        rtlTypecd: { required: true, message: '不能为空', trigger: 'change' },
        inExpType: { required: false, message: '不能为空', trigger: 'change' },
        bindTypecd: { required: false, message: '不能为空', trigger: 'change' },
        sstockBillType: {
          required: true,
          message: '不能为空',
          trigger: 'change'
        }
      },
      //   进境
      tableThree: {
        optStatus: '5',
        size: 10,
        page: 1
      },
      //   出境
      tableTwo: {
        optStatus: '5',
        size: 10,
        page: 1
      },
      //   进出区
      tableOne: {
        optStatus: '5',
        size: 10,
        page: 1
      }
    }
  },
  components: {
    TableData,
    TableData1,
    TableData2,
    TableData3
  },
  computed: {},
  watch: {},
  mounted() {
    // this.getData()
  },
  methods: {
    reset(searchForm) {
      this.$refs[searchForm].reset()
    },
    bindTypecdChange(value) {
      this.$refs.TableData3.eliminate1()
    },
    // 出入库
    trspChange(value) {
      //   console.log('切换 ERP/WMS出入库类型', value)
      if (value == 0) {
        this.searchForm.bindTypecd = ''
      }
      if (value == 3 || value == 0) {
        this.bindTypecdShow = true
        this.searchForm.bindTypecd = ''
        this.page_rules.bindTypecd.required = false
      } else {
        this.bindTypecdShow = false
        this.page_rules.bindTypecd.required = true
      }
      if (value == 2) {
        this.bindTypecdStatus = true
        this.searchForm.bindTypecd = ''
      } else {
        this.bindTypecdStatus = false
      }
    },
    rtlTypecdS(val) {
      if (val == '1') {
        this.$set(this.searchForm, 'inExpType', '6')
        // this.searchForm.inExpType = '进出境径予放行'
        this.inExpTypeShow = true
        this.sstockBillTypeShow = true
        // this.searchForm.inExpType = ''
        this.page_rules.inExpType.required = false
        this.$set(this.searchForm, 'sstockBillType', 'I')
      } else if (val == '2') {
        this.$set(this.searchForm, 'inExpType', '6')
        this.inExpTypeShow = true
        this.sstockBillTypeShow = true
        // this.searchForm.inExpType = ''
        this.page_rules.inExpType.required = false
        this.$set(this.searchForm, 'sstockBillType', 'E')
      } else if (val == '3') {
        this.searchForm.inExpType = ''
        this.inExpTypeShow = false
        this.page_rules.inExpType.required = true
        this.sstockBillTypeShow = false
      }
    },

    headerClick(data, val) {},
    getlistData() {
      this.$refs.TableData3.ep_data = []
      this.$refs.TableData3.clear()
      this.$refs['searchForm'].validate(valid => {
        if (valid) {
          this.getData()
        }
      })
    },
    getData() {
      // 进境  进区
      if (
        this.searchForm.sstockBillType == 'I' &&
        this.searchForm.rtlTypecd == '1'
      ) {
        this.tableshow = 1
        if (
          this.searchForm.valueDate == '' ||
          this.searchForm.valueDate == undefined
        ) {
          delete this.tableOne.startTime
          delete this.tableOne.endTime
        } else {
          let arr = (this.searchForm.valueDate || '').split(',')
          this.tableOne.startTime = `${arr[0]} 00:00:00`
          this.tableOne.endTime = `${arr[1]} 00:00:00`
        }
        this.tableOne.bindType = this.searchForm.bindTypecd //绑定类型
        setTimeout(() => {
          this.$refs.TableData3.getlistData()
        }, 100)
      } else if (
        this.searchForm.sstockBillType == 'E' &&
        this.searchForm.rtlTypecd == '2'
      ) {
        // let searchdata = {
        //   size: 10,
        //   page: 1
        // }
        this.tableshow = 2
        if (
          this.searchForm.valueDate == '' ||
          this.searchForm.valueDate == undefined
        ) {
          delete this.tableTwo.startTime
          delete this.tableTwo.endTime
        } else {
          let arr = (this.searchForm.valueDate || '').split(',')
          this.tableTwo.startTime = `${arr[0]} 00:00:00`
          this.tableTwo.endTime = `${arr[1]} 00:00:00`
        }
        this.tableTwo.bindType = this.searchForm.bindTypecd //绑定类型
        setTimeout(() => {
          this.$refs.TableData3.getlistData()
        }, 100)
      } else if (this.searchForm.rtlTypecd == '3') {
        this.tableshow = 3
        //  进出区提发货
        if (
          this.searchForm.valueDate == '' ||
          this.searchForm.valueDate == undefined
        ) {
          delete this.tableThree.after_dclTime
          delete this.tableThree.before_dclTime
        } else {
          let arr = (this.searchForm.valueDate || '').split(',')
          this.tableThree.after_dclTime = arr[0]
          this.tableThree.before_dclTime = arr[1]
        }
        this.tableThree.ieTypecd = this.searchForm.sstockBillType
        if (this.searchForm.sstockBillType == '') {
          delete this.tableThree.ieTypecd
        }
        this.tableThree.inExpType = this.searchForm.inExpType || '1' //出入库类型
        // searchdata.portSwitch = this.searchForm.bindTypecd || '2' //绑定类型
        this.tableThree.portSwitch =
          this.searchForm.bindTypecd == '3' ? '2' : '1' //绑定类型
        this.tableThree.optStatus = +this.tableThree.optStatus
        setTimeout(() => {
          this.$refs.TableData3.getlistData()
        }, 100)
      } else {
        this.$pop({
          type: 'danger',
          message: '请选择单证类型!'
        })
        // let timer = JSON.parse(JSON.stringify(this.searchForm)).valueDate
        // let arr = (timer || '').split(',')
        // this.searchForm.startDate = arr[0]
        // this.searchForm.endDate = arr[1] == undefined ? '' : arr[1]
        // let data = this.searchForm
        // if (data.valueDate == '') {
        //   delete data.valueDate
        // }
        // if (data.startDate == '') {
        //   delete data.startDate
        // }
        // if (data.endDate == '') {
        //   delete data.endDate
        // }
        // if (data.sstockBillType == '') {
        //   delete data.sstockBillType
        // }
        // this.$post('getStockBillNolistS', data).then(res => {
        //   let respondList = res.map.data
        //   this.todo = respondList
        // })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.main-in-style {
  .ep-table-empty-block {
    position: relative;
    border-top: 1px solid #e0e0e0;
    min-height: 380px;
    text-align: center;
    width: 100%;
    height: 100%;
  }
  .ep-input-number {
    display: inline-block;
    width: 115px;
    position: relative;
  }
  .ep-input-number-increase {
    right: 15px;
  }
  .ep-input-number-decrease,
  .ep-input-number-increase {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    line-height: 15px;
    top: 12px;
    background-color: #2196f3;
    text-align: center;
    color: #fff;
    cursor: pointer;
    position: absolute;
    z-index: 1;
    -webkit-transition: opacity 0.2s linear;
    transition: opacity 0.2s linear;
  }
}
</style>
