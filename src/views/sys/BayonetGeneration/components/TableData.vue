<template>
  <div v-show="fresh==0">
    <div class="ep-card card-margin relative">
      <div class="card-body">
        <div class="block">
          <div style="background:#fff;padding:50px 0;">
            <div class="drag-box">

              <div class="drag-box-item1">
                <div class="button-style">
                  <ep-button type="success" @click="hearderDelete">整体移动</ep-button>
                </div>
                <div class="item-title">出入库单号</div>
                <ep-table ref="table1" :height="400" :data="todo" :head-color="true" :loading="loading" @row-click="headerClick" @selection-change="selectChange">
                  <ep-table-item type="select"></ep-table-item>
                  <ep-table-item column="stockBillNo" title="出库单编号" width='180'>
                    <template slot-scope="props">
                      <a>{{ props.row.stockBillNo }}</a>
                      <a>{{ props.row.orderNo }}</a>
                      <a>{{ props.row.whRecPreentNo }}</a>
                    </template>
                  </ep-table-item>
                  <ep-table-item column="stockBillType" title="出入库类型" width='150' :formatter='UsedTypeTranslate'>
                    <template slot-scope="props">
                      <a>{{ props.row.stockBillType| billType}}</a>
                      <a>{{ props.row.inExpType |billType}}</a>
                    </template>
                  </ep-table-item>
                </ep-table>
              </div>
              <div class="drag-box-item2" style="width:700px;">
                <div class="button-style">
                  <ep-button type="success" @click="dataInfo">明细移动</ep-button>
                </div>
                <div class="item-title">出入库详情</div>
                <ep-table ref="table2" :height="400" :data="doing" :head-color="true" :loading="loading">
                  <ep-table-item type="select"></ep-table-item>
                  <ep-table-item column="copGNo" title="料号"></ep-table-item>
                  <ep-table-item column="gName" title="品名"></ep-table-item>
                  <ep-table-item column="qty" title="数量">
                    <template slot-scope="props">
                      <div style="display:flex">
                        <div style="width:35px;">{{props.row.qty}}</div>
                        <div style="margin-left:8px;cursor:pointer">
                          <i @click="downNumber(props.row)" class="ion-minus-circled" style="font-size:20px;color:#2196f3"></i>
                        </div>
                      </div>
                    </template>
                  </ep-table-item>
                  <ep-table-item column="gUnit" title="单位" :formatter="dclUnitcdTranslate"></ep-table-item>
                </ep-table>
              </div>
              <div class="drag-box-item3">
                <div class="button-style">
                  <ep-button slot="item" icon="arrow-down-b" @click="generateDrop" type="success">生成</ep-button>
                  <!-- <ep-dropdown @item-click="generateDrop" type="click" position="right">
                    <ep-button slot="item" icon="arrow-down-b" right-icon type="success">生成</ep-button>
                    <ep-dropdown-item item-key="1">进出区提发货凭证</ep-dropdown-item>
                    <ep-dropdown-item item-key="2">径予放行自主声明</ep-dropdown-item>
                    <ep-dropdown-item item-key="3">卡口验放凭证</ep-dropdown-item>
                  </ep-dropdown> -->
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
                        <el-input-number size="mini" @change="changeValue" v-model="infoForm.qty" :max="maxLength*1" :min="1"></el-input-number>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="24">
                      <ep-form-item attr="gUnit" label="单位">
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
    <generate1 :fresh="modelFlag1" :Listdata="Listdata1" @nowFlagChange="modelFlag1 = false"></generate1>
    <generate2 :fresh="modelFlag2" :Listdata="Listdata2" @nowFlagChange="modelFlag2 = false"></generate2>
  </div>
</template>



<script>
import generate from '../components/generate'
import generate1 from '../components/generate1'
import generate2 from '../components/generate2'
import { cloneObj } from '../../../../utils/data'
import misList from 'src/common/mislist'
import mixin from '../mixin'
import Sortable from 'sortablejs'

export default {
  mixins: [mixin],
  extends: misList,
  props: {
    fresh: {
      type: Number
    },
    listData: {
      type: Array
    }
  },
  components: {
    generate: generate,
    generate1: generate1,
    generate2: generate2
  },
  data() {
    return {
      todo: this.listData,
      doing: [],
      done: [],
      searchForm: {
        sstockBillType: '',
        valueDate: '',
        rtlTypecd: ''
      },
      data: {
        optStatus: '5',
        dclTime: '',
        size: 10,
        page: 1
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

      modelFlag: false,
      Listdata1: {
        id: '',
        orgId: '',
        tradeId: '',
        billExpNo: '', //径予放行自主声明编号	BILL_ECP_NO
        orderNo: '', //自主声明预录入编号	ORDER_NO
        billLodNo: '', //提运单号	BILL_LOD_NO
        shipNameEn: '', //英文船名	SHIP_NAME_EN
        voyageNo: '', //航次	VOYAGE_NO
        grossWt: '', //毛重	GROSS_WT
        dclQty: '', //数量	DCL_QTY
        trspModecd: '', //运输方式	TRSP_MODECD
        dclTime: '', //申报时间	DCL_TIME
        passTime: '', //过卡时间	PASS_TIME
        type: '0', //申报类型	TYPE
        optStatus: '', //状态	OPT_STATUS
        hazardousConfirm: '2', //危禁品确认标志	HAZARDOUS_CONFIRM
        hazardous: '', //危禁品	HAZARDOUS
        supvModecd: '', //监管方式	SUPV_MODECD
        proxyOrgId: '', //代理组织ID	PROXY_ORG_ID
        rmk: '', //备注	RMK
        emapvMarkcd: '', //待审批标志代码	EMAPV_MARKCD
        agreeConfirm: '1',
        involveConfirm: '0', //是否涉证涉检	INVOLVE_CONFIRM
        passPortUsedTypecd: '', //核放单绑定标志	PASSPORT_USED_TYPECD
        bizopEtpsNo: this.$store.getters.getTradeCode, //经营企业编号
        bizopEtpsNm: this.$store.getters.getTradeName, //经营单位名称
        bizopEtpsSccd: this.$store.getters.getCreditCode, //经营单位社会信用代码
        bizopEtpsNoAttr: this.$store.getters.getTradeCode, //经营企业编号
        bizopEtpsNmAttr: this.$store.getters.getTradeName, //经营单位名称
        bizopEtpsSccdAttr: this.$store.getters.getCreditCode //经营单位社会信用代码
      },
      modelFlag1: false,
      Listdata2: {
        data: [{ stockBillType: '' }],
        id: '',
        orgId: this.$store.getters.getId,
        portNo: '', //凭证编号
        preentNo: '', // 预录入编号
        inExpWhNo: '', //ERP/WMS出入库编号
        inExpType: '', //ERP/WMS出入库类型    必填
        bizopEtpsSccd: this.$store.getters.getCreditCode,
        bizopEtpsNo: this.$store.getters.getTradeCode, // 经营企业编号    必填
        bizopEtpsNm: this.$store.getters.getTradeName, //经营单位名称    必填
        businessTypecd: '', //业务类别    必填
        inExpTime: '', //  ERP/WMS出入库日期
        mtpckEndprdTypecd: '', // 料件、成品标志   必填
        impexpPortcd: '', //进出境关别
        masterCuscd: this.$store.getters.getCustomId, //主管海关     必填
        // dclTime: "", //申报日期
        preRecAccountTime: '', // 预记入企业账户时间
        recAccountTime: '', //正式记入企业账户时间
        // invtIochkptStucd: "", // 进出卡口状态
        // recAccountFlag: "", //  是否记入企业账户标记
        rmk: '', // 备注
        // optStatus: "", // 操作状态
        rcvgdEtpsNm: '', // 境内收发货企业
        rcvgdEtpsNo: '', //境内收发货企业编号
        rcvgdEtpsSccd: '', //境内收发货企业社会信用代码
        vehicleNo: '', // 承运车车牌号
        // vehicleIcNo: "", // IC卡号
        containerNo: '', //集装箱号
        vehicleWt: '', //车自重   必填
        vehicleFrameNo: '', //车架号
        vehicleFrameWt: '', //车架重 必填
        containerType: '', //集装箱箱形
        containerWt: '', //集装箱重
        totalWt: '', //总重量 必填
        // passCollectWt: "", //卡口地磅采集重量
        // wtError: "", // 重量比对误差
        totalGrossWt: '', // 货物总毛重  必填
        totalNetWt: '', //货物总净重
        // passTime: "", //过卡时间1
        // secdPassTime: "", //过卡时间2
        // bindUsedTypecd: "", //分送集报标志
        bindTypecd: '', // 绑定类型
        ieTypecd: '' //进出标志   必填
      },
      modelFlag2: false,
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
  computed: {
    dclUnitcdList() {
      return this.$store.getters.getUnitList
    }
  },
  watch: {
    listData(value) {
      this.todo = this.listData
      //   console.log(value,"value")
    }
    // fresh(value) {
    //   this.todo = this.listData
    // }
  },
  mounted() {
    this.Drag()
  },
  methods: {
    Drag() {
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
          w = el.offsetWidth
          if (!(x2 - x1 < w / 4 || x2 - x1 > (x2 - x1) / 4 + el1.offsetWidth)) {
            this.eliminate()
            this.eliminate1()
            this.doing = this.todo[evt.oldIndex].stockBillModel
          }
          // console.log(el2, x2, '--------===')
          // console.log(x2 - x1>w*2,"--------------1")
          // console.log(x2 - x1>(x2 - x1) / 4 + el1.offsetWidth,"===============2")
          // x2 - x1 > w * 2 || x2 - x1 > x2 - x1 + el1.offsetWidth
          if (
            x2 > el2.getBoundingClientRect().left &&
            x2 < el2.getBoundingClientRect().right
          ) {
            this.doing = []
            this.done = [
              ...this.done,
              ...this.todo[evt.oldIndex].stockBillModel
            ]
            this.todo.splice(evt.newIndex, 1)
          }
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
          if (x1 - x2 < w / 4 || x1 - x2 > (x1 - x2) / 4 + el1.offsetWidth)
            return
          this.doing.push(this.done[evt.oldIndex])
          this.done.splice(evt.newIndex, 1)
        }
      })
    },
    // 清除
    eliminate() {
      //   this.getData()
      this.done = []
      this.doing = []
    },
    // 清除
    eliminate1() {
      //   this.getData()
      this.done1 = []
      this.doing = []
    },
    //   生成
    generateDrop(val) {
      let selectData = this.$refs.table3.getData('select')
      // let selectData = this.$refs.table3.getData('select')
      if (this.done.length == 0) {
        this.$pop({
          type: 'danger',
          message: '请至少选择一条数据!'
        })
        return false
      }
      if (val == 1) {
        this.Listdata.data = selectData
        this.modelFlag = true
        console.log('-----', this.Listdata, this.modelFlag)
      } else if (val == 2) {
        this.Listdata1.data = selectData
        this.modelFlag1 = true
      } else if (val == 3) {
        this.Listdata2.data = selectData
        this.modelFlag2 = true
      }
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
    headerClick(data, val) {
      // this.doing = val.portReleaseDt
    },
    getData() {
      // http://192.168.125.155/lgsa-ser/billDirBsc/getBillDirBscList
      //   pathBillDirExpBscInfoGetList
      if (
        this.searchForm.sstockBillType == 'I' &&
        this.searchForm.rtlTypecd == '1'
      ) {
        if (
          this.searchForm.valueDate == '' ||
          this.searchForm.valueDate == undefined
        ) {
          delete this.data.dclTime
        } else {
          this.data.dclTime = this.searchForm.valueDate
        }
        this.data.sstockBillType = this.searchForm.sstockBillType
        this.data.rtlTypecd = this.searchForm.rtlTypecd
        this.$post('pathBillOfladingInfoGetList', this.data).then(res => {
          let respondList = res.map.data.content
          this.todo = respondList
        })
      } else if (
        this.searchForm.sstockBillType == 'E' &&
        this.searchForm.rtlTypecd == '2'
      ) {
        if (
          this.searchForm.valueDate == '' ||
          this.searchForm.valueDate == undefined
        ) {
          delete this.data.dclTime
        } else {
          this.data.dclTime = this.searchForm.valueDate
        }
        this.data.sstockBillType = this.searchForm.sstockBillType
        this.data.rtlTypecd = this.searchForm.rtlTypecd
        this.$post('pathBillDirExpBscInfoGetList', this.data).then(res => {
          let respondList = res.map.data.content
          this.todo = respondList
        })
      } else if (this.searchForm.rtlTypecd == '3') {
        if (
          this.searchForm.valueDate == '' ||
          this.searchForm.valueDate == undefined
        ) {
          delete this.data.dclTime
        } else {
          delete this.data.dclTime
          let arr = (this.searchForm.valueDate || '').split(',')
          this.data.after_dclTime = arr[0]
          this.data.before_dclTime = arr[1]
        }
        delete this.data.sstockBillType
        delete this.data.rtlTypecd
        this.data.ieTypecd = this.searchForm.sstockBillType
        // this.data.rtlTypecd = this.searchForm.rtlTypecd
        this.data.optStatus = +this.data.optStatus
        this.$post('wareHouseList', this.data).then(res => {
          let respondList = res.map.data.content
          this.todo = respondList
        })
      } else {
        let timer = JSON.parse(JSON.stringify(this.searchForm)).valueDate
        let arr = (timer || '').split(',')
        this.searchForm.startDate = arr[0]
        this.searchForm.endDate = arr[1] == undefined ? '' : arr[1]
        let data = this.searchForm
        if (data.valueDate == '') {
          delete data.valueDate
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
      this.done = []
    }
  }
}
</script>

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
