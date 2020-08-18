<template>
  <div class="panel-main-content main-in-style">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="card-title zero-padding">
          <span class="weight">出入库查询</span>
        </div>
        <ep-form ref="searchForm" :form="searchForm" name-width="168px">
          <ep-row :gutter="7">
            <ep-col :col="8">
              <ep-form-item attr="sstockBillType" label="进出标志">
                <ep-select v-model="searchForm.sstockBillType" name="sstockBillType">
                  <div>
                    <ep-select-item index="I" label="进区"></ep-select-item>
                    <ep-select-item index="E" label="出区"></ep-select-item>
                  </div>
                </ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="10">
              <ep-form-item label="时间" attr="valueDate">
                <ep-date-range v-model="searchForm.valueDate" type="dateTime"></ep-date-range>
              </ep-form-item>
            </ep-col>
          </ep-row>
          <ep-row :gutter="7">
            <ep-col :col="24">
              <ep-button type="warning" size="small" icon="refresh" @click="reset('searchForm')">重置</ep-button>
              <ep-button type="primary" size="small" @click="getData()" icon="search" :loading="loading">查询</ep-button>
            </ep-col>
          </ep-row>
        </ep-form>
      </div>
    </div>

    <div class="ep-card card-margin relative">
      <div class="card-body">
        <div class="block">
          <div style="background:#fff;padding:50px 0;">
            <div class="drag-box">

              <!-- <div> -->
              <div class="drag-box-item1">
                <div class="button-style">
                  <ep-button type="success" @click="hearderDelete">整体移动</ep-button>
                </div>
                <div class="item-title">出入库单号</div>
                <ep-table ref="table1" :height="400" :data="todo" :head-color="true" :loading="loading" @row-click="headerClick" @selection-change="selectChange">
                  <ep-table-item type="select"></ep-table-item>
                  <ep-table-item column="stockBillNo" title="出库单编号" width='180'></ep-table-item>
                  <ep-table-item column="stockBillType" title="出入库类型" :formatter='UsedTypeTranslate'></ep-table-item>
                </ep-table>
              </div>
              <!-- </div> -->

              <!-- <div> -->
              <div class="drag-box-item2" style="width:700px;">
                <div class="button-style">
                  <ep-button type="success" @click="dataInfo">明细移动</ep-button>
                </div>
                <div class="item-title">出入库详情</div>
                <ep-table ref="table2" :height="400" :data="doing" :head-color="true" :loading="loading" >
                  <ep-table-item type="select"></ep-table-item>
                  <ep-table-item column="copGNo" title="料号"></ep-table-item>
                  <ep-table-item column="gName" title="品名"></ep-table-item>
                  <ep-table-item column="qty" title="数量">
                    <template slot-scope="props">
                      <!-- <ep-input-number :max="props.row.qty*1" :min="0" v-model="props.row.dclQtycut"></ep-input-number> -->

                      <div style="display:flex">
                        <div style="width:35px;">{{props.row.qty}}</div>
                        <div style="margin-left:8px;cursor:pointer">
                          <i @click="downNumber(props.row)" class="ion-minus-circled" style="font-size:20px;color:#2196f3"></i>
                        </div>
                      </div>
                      <!-- <ep-button type="primary" icon="minus-circled"></ep-button> -->

                    </template>
                  </ep-table-item>
                  <ep-table-item column="gUnit" title="单位" :formatter="dclUnitcdTranslate"></ep-table-item>
                </ep-table>
              </div>
              <!-- </div> -->

              <!-- <div> -->
              <div class="drag-box-item3">
                <div class="button-style">
                  <ep-button type="success" @click="generateS">生成</ep-button>
                  <ep-button type="danger" @click="eliminate">重置</ep-button>
                </div>
                <div class="item-title">进出区提发货凭证</div>
                <ep-table ref="table3" :height="400" :data="done" :head-color="true" :loading="loading">
                  <ep-table-item type="select"></ep-table-item>
                  <ep-table-item column="copGNo" title="料号"></ep-table-item>
                  <ep-table-item column="gName" title="品名"></ep-table-item>
                  <ep-table-item column="qty" title="数量"></ep-table-item>
                  <ep-table-item column="gUnit" title="单位" :formatter="dclUnitcdTranslate"></ep-table-item>
                </ep-table>
              </div>
              <!-- </div> -->
              <ep-model title="表体编辑" v-model="infoModel" width="500px" :wrap-close="false">
                <ep-form ref="infoForm" :form="infoForm" name-width="108px">
                  <ep-row :gutter="7">
                    <ep-col :col="24">
                      <ep-form-item attr="copGNo" label="料号">
                        <ep-input v-model="infoForm.copGNo" name="copGNo" disabled></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="24">
                      <ep-form-item attr="gName" label="品名">
                        <ep-input v-model="infoForm.gName" name="gName" disabled></ep-input>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="24">
                      <ep-form-item attr="qty" label="数量">
                        <!-- <ep-input v-model="infoForm.qty" name="qty"  disabled></ep-input> -->
                        <!-- <ep-input-number v-model="infoForm.qty" :max="maxLength*1" @change="changeValue" :min="0"></ep-input-number> -->
                        <el-input-number size="mini" @change="changeValue" v-model="infoForm.qty" :max="maxLength*1" :min="1"></el-input-number>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="24">
                      <ep-form-item attr="gUnit" label="单位">
                        <!-- <ep-input v-model="infoForm.gUnit" name="gUnit"  disabled></ep-input> -->
                        <ep-select v-model="infoForm.gUnit" name="gUnit" disabled>
                          <ep-select-item v-for="(item, index) in dclUnitcdList" :key="index" :index="item.unit" :label="item.unitName">
                          </ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>

                  </ep-row>
                  <div style="text-align:center">

                    <ep-button type="primary" size="small" @click="makeSuer">确定</ep-button>
                  </div>
                </ep-form>
              </ep-model>

            </div>
          </div>
        </div>
      </div>
    </div>
    <generate :fresh="modelFlag" :Listdata='Listdata' @nowFlagChange="modelFlag = false"></generate>
  </div>
</template>

<script>
import { cloneObj } from '../../../utils/data'
import mixin from './mixin'
import generate from './components/generate'
import Sortable from 'sortablejs'
import misList from 'src/common/mislist'
export default {
  name: 'demo',
  mixins: [mixin],
  extends: misList, // 务必继承
  data() {
    return {
      todo: [],
      doing: [],
      done: [],
      searchForm: {
        sstockBillType: '',
        valuedata: ''
      },
      Listdata: {
        businessTypecd: '',
        mtpckEndprdTypecd: '',
        trspModecd: '',
        impexpPortcd: '',
        grossWt: '',
        dclcusFlag: '1',
        dclcusTypecd: '',
        supvModecd: '',
        data: [{ stockBillType: '' }]
      },
      modelFlag: false,
      loading: false,
      infoModel: false,
      maxLength: 0,
      infoForm: {
        gUnit: '',
        qty: '',
        gName: '',
        copGNo: ''
      },
      dataList: []
    }
  },
  components: {
    generate: generate
  },
  computed: {
    dclUnitcdList() {
      return this.$store.getters.getUnitList
    }
  },

  mounted() {
    this.getData()
    // console.log(
    //   '----f-d-d-',
    //   document.querySelectorAll('.ep-table-body > table > tbody')
    // )
    let el = document.querySelectorAll('.ep-table-body > table > tbody')[0]
    let el1 = document.querySelectorAll('.ep-table-body > table > tbody')[1]
    let el2 = document.querySelectorAll('.ep-table-body > table > tbody')[2]
    let x1, x2, w
    const sortable = Sortable.create(el, {
      sort: false,
      onStart: function(evt) {
        x1 = evt.originalEvent.clientX
        // console.log(x1, '按下')\
        // let abc=Symbol()
        // let abcd=Symbol()
        // console.log(typeof abc,"Symbol()")
      },
      onEnd: evt => {
        // //监听拖动结束事件
        x2 = evt.originalEvent.clientX
        // console.log(x2, '抬起')
        w = el.offsetWidth
        // console.log(w, 'el.offsetWidth')
        if (!(x2 - x1 < w / 4 || x2 - x1 > (x2 - x1) / 4 + el1.offsetWidth)) {
          this.eliminate()
          this.eliminate1()
          this.doing = this.todo[evt.oldIndex].stockBillModel
        }
        // console.log(Symbol('foo')) // 输出 "Symbol(foo)" 至控制台
        // assert(Symbol('foo').toString() === 'Symbol(foo)')
        // console.log(el2, x2, '--------===')
        // console.log(x2 - x1>w*2,"--------------1")
        // console.log(x2 - x1>(x2 - x1) / 4 + el1.offsetWidth,"===============2")
        // x2 - x1 > w * 2 || x2 - x1 > x2 - x1 + el1.offsetWidth
        // if (x2>el2.getBoundingClientRect().left&&x2<el2.getBoundingClientRect().right) {
        //     // this.doing=[]
        //   this.done = [...this.done,...this.todo[evt.oldIndex].stockBillModel]
        //   this.todo.splice(evt.newIndex, 1)
        // }
      }
    })
    const sortable1 = Sortable.create(el1, {
      sort: false,
      onStart: function(evt) {
        x1 = evt.originalEvent.clientX
      },
      onEnd: evt => {
        //监听拖动结束事件
        x2 = evt.originalEvent.clientX
        w = el1.offsetWidth
        // console.log('-------22-2', x2 - x1, w / 2, el2.offsetWidth)
        if (x2 - x1 < w / 4) return
        this.done.push(this.doing[evt.oldIndex])
        this.doing.splice(evt.newIndex, 1)
      }
    })

    const sortable2 = Sortable.create(el2, {
      sort: false,
      onStart: function(evt) {
        x1 = evt.originalEvent.clientX
      },
      onEnd: evt => {
        x2 = evt.originalEvent.clientX
        w = el2.offsetWidth
        if (x1 - x2 < w / 4 || x1 - x2 > (x1 - x2) / 4 + el1.offsetWidth) return
        this.doing.push(this.done[evt.oldIndex])
        this.done.splice(evt.newIndex, 1)
      }
    })
    //  const sortable3 = Sortable.create(el, {
    //   sort: false,
    //   onStart: function(evt) {
    //     x1 = evt.originalEvent.clientX
    //       console.log(x1,'按下')
    //   },
    //   onEnd: evt => {
    //     console.log(x2 - x1 < w / 4 || x2 - x1 > (x2 - x1) / 4 + el2.offsetWidth, '00000')
    //     // //监听拖动结束事件
    //     x2 = evt.originalEvent.clientX
    //     w = el.offsetWidth

    //     if (x2 - x1 < w / 4 || x2 - x1 > (x2 - x1) / 4 + el2.offsetWidth) return
    //     // this.eliminate()
    //     // this.eliminate1()
    //     // this.doing = this.todo[evt.oldIndex].stockBillModel
    //   }
    // })
  },
  methods: {
    dragstart() {
      console.log('111')
    },
    reset(searchForm) {
      this.$refs[searchForm].reset()
    },
    //   生成
    generateS() {
      let selectData = this.$refs.table3.getData('select')
      console.log(selectData)
      if (selectData.length == 0) {
        this.$pop({
          type: 'danger',
          message: '请至少选择一条数据!'
        })
        return false
      }
      this.Listdata.data = selectData
      this.modelFlag = true
    },
    // 清除
    eliminate() {
      this.getData()
      this.done = []
      this.doing = []
    },
    // 清除
    eliminate1() {
      this.getData()
      this.done1 = []
      this.doing = []
    },
    changeValue(value, old) {},
    //  model表体移动
    makeSuer() {
      // this.doing.forEach(item=>{
      //     if(item.id==this.infoForm.id){

      //         this.$set(item,"qty",item.qty-this.infoForm.qty)
      //     }
      // })
      for (let i = 0; i < this.doing.length; i++) {
        if (this.doing[i].id == this.infoForm.id) {
          //  this.$set(this.doing[i],"qty",(this.doing[i].qty*1)-this.infoForm.qty)
          let data = this.doing[i]
          data.qty = this.doing[i].qty * 1 - this.infoForm.qty
          if (data.qty == 0) {
            this.doing.splice(i, 1)
          } else {
            this.doing.splice(i, 1, data)
          }
        }
      }
      if (this.doing.length == 0) {
        this.todo.forEach((item, index) => {
          if (this.infoForm.pid == item.id) {
            this.todo.splice(index, 1)
          }
        })
      }
      this.done.push(this.infoForm)

      this.infoModel = false
    },
    downNumber(row) {
      this.infoModel = true
      this.maxLength = cloneObj(row).qty
      setTimeout(() => {
        this.infoForm = cloneObj(row)
      }, 10)
    },
    selectChange(selector, index) {
      if (selector.length > 1 || selector.length == 0) {
        this.doing = []
        return
      }
      this.doing = cloneObj(selector[0].stockBillModel)
    },
    hearderDelete() {
      let selectData = this.$refs.table1.getData('select')
      if (selectData.length == 0) {
        this.$pop({
          type: 'danger',
          message: '请至少选择一条数据!'
        })
        return false
      }
      this.doing = []
      selectData.forEach(item => {
        item.stockBillModel.forEach((items, index) => {
          this.done.push(items)
        })
      })
      this.$refs.table1.deleteSelectRow()
    },
    dataInfo() {
      let selectData = this.$refs.table2.getData('select')
      if (selectData.length == 0) {
        this.$pop({
          type: 'danger',
          message: '请至少选择一条数据!'
        })
        return false
      }
      selectData.forEach((item, index) => {
        this.done.push(item)
      })
      let fatherData = this.todo.filter(item => {
        return item.stockBillNo == selectData[0].stockBillNo
      })
      if (selectData.length == this.$refs.table2.getShowData().length) {
        this.todo.forEach((item, index) => {
          if (fatherData[0].stockBillNo == item.stockBillNo) {
            this.todo.splice(index, 1)
          }
        })
      }
      this.$refs.table2.deleteSelectRow()
    },
    moveFunction({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      // return (
      //     (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      // );
    },
    add(event) {},
    startMovde() {},
    removeHandleFirst(event) {},
    endMove(event) {},
    startMovdeSecond() {},
    removeHandleSecond(event) {},
    endMoveSecond(event) {},
    startMovdeThird() {},
    removeHandleThird(event) {},
    endMoveThird(event) {},
    headerClick(data, val) {
      // this.doing = val.portReleaseDt
    },
    getData() {
      //   this.$post('portReleaseGetListForDetail', { page: 1, size: 100 }).then(
      //     res => {
      //       let respondList = res.map.data.content
      //       respondList.map(item => {
      //         item.selectCheck = false
      //       })
      //       this.todo = respondList
      //     }
      //   )
      let timer = JSON.parse(JSON.stringify(this.searchForm)).valueDate
      let arr = (timer || '').split(',')
      this.searchForm.startDate = arr[0]
      this.searchForm.endDate = arr[1] == undefined ? '' : arr[1]
      let data = this.searchForm
      if (data.valuedata == '') {
        delete data.valuedata
      }
      if (data.startDate == '') {
        delete data.startDate
      }
      if (data.endDate == '') {
        delete data.endDate
      }
      if (data.sstockBillType == '') {
        delete data.sstockBillType
      }
      this.$post('getStockBillNolistS', data).then(res => {
        let respondList = res.map.data
        this.todo = respondList
      })
    }
  }
}
</script>
<style lang="less">
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
<style scoped>
.button-style {
  position: absolute;
  top: -35px;
  left: 0px;
}
.in-word {
  width: 150px;
  margin: 0;
  padding: 0;
}
.flex-flow {
  /* display: flex; */
}
.in-datainfo {
  display: flex;
  /* justify-content: space-around; */
}
.drag-box {
  display: flex;
  user-select: none;
}
.drag-box-item1 {
  flex: 0.7;
  /* max-width: 330px; */
  min-width: 350px;
  background-color: #eff1f5;
  margin-right: 16px;
  border-radius: 6px;
  border: 1px #e1e4e8 solid;
  position: relative;
}
.drag-box-item2 {
  flex: 1.5;
  /* max-width: 330px; */
  min-width: 300px;
  background-color: #eff1f5;
  margin-right: 16px;
  border-radius: 6px;
  border: 1px #e1e4e8 solid;
  position: relative;
}
.drag-box-item3 {
  flex: 1.5;
  /* max-width: 330px; */
  min-width: 300px;
  background-color: #eff1f5;
  margin-right: 16px;
  border-radius: 6px;
  border: 1px #e1e4e8 solid;
  position: relative;
}
.item-title {
  padding: 8px 8px 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #24292e;
  font-weight: 600;
}
</style>
