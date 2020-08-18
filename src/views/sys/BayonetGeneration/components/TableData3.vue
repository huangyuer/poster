<template>
  <div v-show="fresh==3">
    <div class="ep-card card-margin relative">
      <div class="card-body">
        <div class="block">
          <div style="background:#fff;">
            <div style="display:flex;justify-content: flex-end;align-items:center;padding-right:20px">
              <ep-button @click="generateDrop" type="success">生成</ep-button>
              <ep-button type="danger" @click="eliminate">重置</ep-button>
              <ep-switch v-model="format" on-text="横向" off-text="纵向" @change="handleChange"></ep-switch>
            </div>
            <div class="drag-box" :class="format?'':'drag-box1'">

              <div class="drag-box-item1">
                <div>

                  <!-- <div class="button-style">
                    <ep-button type="success" @click="hearderDelete">整体移动</ep-button>
                  </div> -->
                  <div class="item-title">进出区提发货凭证
                    <div style="">
                      <span style="color:red;font-size:25px;position:absolute;">*</span>
                      <span style="padding-top: 10px;padding-left: 13px;font-size: 4px;color: rgba(0,0,0,.87);">双击列表信息，可进入详情页面</span>
                    </div>
                  </div>
                  <ep-table ref="table1" :height="format?400:200" :data="ep_data" :head-color="true" :loading="loading" @row-click="headerClick" @selection-change="selectChange"
                    @row-dblclick="detailInfo" :row-class="setRowClass">
                    <ep-table-item type="select"></ep-table-item>
                    <ep-table-item column="whRecPreentNo" title="关联单证编号">
                      <template slot-scope="props">
                        <a>{{ props.row.whRecPreentNo }}</a>
                      </template>
                    </ep-table-item>
                  </ep-table>
                </div>
              </div>
              <p class="block ep_pager" v-if="!format">
                <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_data.page" :page-size="ep_data.size" :total-num="totalcount"></ep-pager>
              </p>
              <div class="drag-box-item2">
                <!-- <div class="button-style">
                  <ep-button type="success" :disabled="judgeForm.bindTypecd=='3'?false:true" @click="dataInfo">明细移动</ep-button>
                </div> -->
                <div class="item-title">进出区提发货凭证详情</div>
                <ep-table ref="table2" :height="format?400:200" :data="doing" :head-color="true" :loading="loading">
                  <ep-table-item type="select"></ep-table-item>
                  <ep-table-item column="gdsMtno" title="料号"></ep-table-item>
                  <ep-table-item column="gdsNm" title="品名"></ep-table-item>
                  <ep-table-item column="dclQty" title="数量">
                    <template slot-scope="props">
                      <div style="display:flex">
                        <div style="width:35px;">{{Number(props.row.dclQty)}}</div>
                        <div style="margin-left:8px;cursor:pointer">
                          <i @click="(judgeForm.bindTypecd=='3'&&props.row.dclQty>0)?downNumber(props.row):''" style="font-size: 20px;" class="ion-minus-circled"
                            :class="(judgeForm.bindTypecd=='3'&&props.row.dclQty>0)?'iconCircled':'iconCircled_active'"></i>
                        </div>
                      </div>
                    </template>
                  </ep-table-item>
                  <ep-table-item column="dclUnitcd" title="单位" :formatter="dclUnitcdTranslate1"></ep-table-item>
                </ep-table>
              </div>
              <div class="drag-box-item3">
                <!-- <div class="button-style">
                  <ep-button @click="generateDrop" type="success">生成</ep-button>
                  <ep-button type="danger" @click="eliminate">重置</ep-button>
                </div> -->
                <div class="item-title">卡口验放凭证</div>
                <ep-table ref="table3" :height="format?400:200" :data="done" :head-color="true" :loading="loading">
                  <!-- <ep-table-item type="select"></ep-table-item> -->
                  <ep-table-item column="gdsMtno" title="料号"></ep-table-item>
                  <ep-table-item column="gdsNm" title="品名"></ep-table-item>
                  <ep-table-item column="dclQty" title="数量"></ep-table-item>
                  <ep-table-item column="dclUnitcd" title="单位" :formatter="dclUnitcdTranslate1"></ep-table-item>
                </ep-table>
              </div>

            </div>

            <ep-model title="表体编辑" v-model="infoModel" width="500px" :wrap-close="false">
              <ep-form ref="infoForm" :form="infoForm" name-width="108px">
                <ep-row :gutter="7">
                  <ep-col :col="24">
                    <ep-form-item attr="gdsMtno" label="料号">
                      <ep-input v-model="infoForm.gdsMtno" name="gdsMtno" disabled></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="24">
                    <ep-form-item attr="gdsNm" label="品名">
                      <ep-input v-model="infoForm.gdsNm" name="gdsNm" disabled></ep-input>
                    </ep-form-item>
                  </ep-col>

                  <ep-col :col="24">
                    <ep-form-item attr="dclQty" label="数量">
                      <el-input-number size="mini" :precision="0" @input="changenum" @change="changeValue" v-model="infoForm.dclQty" :max="maxLength*1" :min="1"></el-input-number>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="24">
                    <ep-form-item attr="gUnit" label="单位">
                      <ep-select v-model="infoForm.dclUnitcd" name="gUnit" disabled>
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
            <p class="block ep_pager" v-if="format">
              <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_data.page" :page-size="ep_data.size" :total-num="totalcount"></ep-pager>
            </p>
          </div>
        </div>
      </div>
    </div>
    <generate2 :fresh="modelFlag2" :Listdata="Listdata2" @success='getlistData' @nowFlagChange="modelFlag2 = false"></generate2>
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
    judgeForm: {
      type: Object
    },
    tableThree: {
      type: Object
    },
    formats: {
      type: Boolean
    }
  },
  components: {
    generate: generate,
    generate1: generate1,
    generate2: generate2
  },
  data() {
    return {
      ctrlTime: null,
      format: this.formats,
      loading: false,
      listApi: 'wareHousegetBscList', // 搜索，取api.json里面的key值
      //   deleteData: "enterpriseDelete",
      settings: {
        pk: 'id' // 主键
      },
      //   format: true, //设置布局
      totalcount: 0,
      listData: [],
      ep_data: [],
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      searchForm: this.tableThree,
      doing: [],
      done: [],
      list: {},
      Listdata2: {
        portReleaseDt: [{ stockBillType: '', bindTypecd: '' }],
        // id: '',
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
        dclQty: '',
        gdsNm: '',
        gdsMtno: ''
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
    fresh(value) {}
    // modelFlag2(value) {
    //   if (!value) {
    //       this.getlistData()
    //     this.done = []
    //     this.doing = []
    //     this.dataList = []
    //   }
    // }
  },
  mounted() {
    this.Drag()
  },
  methods: {
    //  单选框
    selectUSDCol(column) {
      this.$refs.table1.selectChangeEach(data => {
        return data.Highlight === true
      })
    },
    //   行高亮
    setRowClass(index) {
      if (this.ep_data[index].Highlight === true) {
        return 'light-success'
      }
    },
    //   双击查看详情
    detailInfo(event, row, index) {
      this.$app.trigger('locate-tab', 'WareHouseDtInfo', row.id)
    },
    // 重复合并
    func(arr) {
      var result = []
      var temp = {}
      for (var i = 0; i < arr.length; i++) {
        var myname = arr[i].id
        if (temp[myname]) {
          result.map((item, index) => {
            // console.log('item', item)
            if (item.id == myname) {
              result[index].dclQty = result[index].dclQty + arr[i].dclQty
            }
          })
          continue //不继续执行接下来的代码，跳转至循环开头
        }
        temp[myname] = true
        result.push(arr[i])
      }
      return result
    },
    // 数组去重
    unique(arr, id) {
      let hash = {}
      return arr.reduce(function(item, target) {
        let dclQty = (+item.dclQty || 0) + (+target.dclQty || 0)
        hash[target[id]] ? '' : (hash[target[id]] = true && item.push(target))
        return item
      }, [])
    },

    calculation(el, box, x, y) {
      if (
        x > box.getBoundingClientRect().left &&
        x < box.getBoundingClientRect().right &&
        y > box.getBoundingClientRect().top &&
        y < box.getBoundingClientRect().bottom
      ) {
        return true
      }
    },
    // 拖拽
    Drag() {
      let el = document.querySelectorAll('.ep-table-body > table > tbody')[0]
      let el1 = document.querySelectorAll('.ep-table-body > table > tbody')[1]
      let el2 = document.querySelectorAll('.ep-table-body > table > tbody')[2]
      let box = document.querySelectorAll('.drag-box-item2')[0]
      let box1 = document.querySelectorAll('.drag-box-item3')[0]
      let x1, x2, y, w
      const sortable = Sortable.create(el, {
        sort: false,
        onStart: function(evt) {
          x1 = evt.originalEvent.clientX
        },
        onEnd: evt => {
          // //监听拖动结束事件
          x2 = evt.originalEvent.clientX
          y = evt.originalEvent.clientY
          w = el.offsetWidth
          if (this.calculation(el1, box, x2, y)) {
            if (
              this.judgeForm.bindTypecd == '1' ||
              this.judgeForm.bindTypecd == '2'
            ) {
              this.$pop({
                type: 'danger',
                message: '绑定类型为一车多票或一车一票不可以修改申报数量!'
              })
              return
            }
            if (this.ep_data[evt.oldIndex].Highlight) {
              this.$pop({
                type: 'danger',
                message: '您已经拖过了!'
              })
              return
            }
            if (this.doing.length >= 1 || this.done.length >= 1) {
              this.$pop({
                type: 'danger',
                message: '请生成或重置!'
              })
              return
            }
            if (this.ep_data[evt.oldIndex].warehouseReceiptDt.length == 0) {
              this.$pop({
                type: 'danger',
                message: '该表体为空!'
              })
              return
            }
            this.dataList = []
            this.dataList.push({
              rltNo: this.ep_data[evt.oldIndex].whRecPreentNo,
              rltTbTypecd: this.judgeForm.rtlTypecd == '3' ? '1' : '2'
            })
            this.doing = this.ep_data[evt.oldIndex].warehouseReceiptDt
            this.$set(this.ep_data[evt.oldIndex], 'Highlight', true)
            setTimeout(() => {
              this.sign()
              this.selectUSDCol()
            }, 10)
          }
          //   一拖三\
          if (this.calculation(el2, box1, x2, y)) {
            if (
              (this.judgeForm.bindTypecd == '2' ||
                this.judgeForm.bindTypecd == '3') &&
              this.done.length >= 1
            ) {
              this.$pop({
                type: 'danger',
                message: '绑定类型一车一票或一票多车只能生成一条数据!'
              })
              return
            }
            if (this.ep_data[evt.oldIndex].Highlight) {
              this.$pop({
                type: 'danger',
                message: '您已经拖过了!'
              })
              return
            }

            if (
              (this.judgeForm.bindTypecd == '2' ||
                this.judgeForm.bindTypecd == '3') &&
              (this.doing.length >= 1 || this.done.length >= 1)
            ) {
              this.$pop({
                type: 'danger',
                message: '请生成或重置!'
              })
              return
            }

            if (this.ep_data[evt.oldIndex].warehouseReceiptDt.length == 0) {
              this.$pop({
                type: 'danger',
                message: '该表体为空!'
              })
              return
            }
            this.doing = []
            this.dataList.push({
              rltNo: this.ep_data[evt.oldIndex].whRecPreentNo,
              rltTbTypecd: this.judgeForm.rtlTypecd == '3' ? '1' : '2'
            })
            this.done = [
              ...this.done,
              ...this.ep_data[evt.oldIndex].warehouseReceiptDt
            ]
            this.$set(this.ep_data[evt.oldIndex], 'Highlight', true)
            setTimeout(() => {
              this.sign()
              this.selectUSDCol()
            }, 10)

            this.list = this.ep_data[evt.oldIndex]
          }
        }
      })
      //  2 拖 3
      const sortable1 = Sortable.create(el1, {
        sort: false,
        onStart: function(evt) {
          x1 = evt.originalEvent.clientX
        },
        onEnd: evt => {
          //监听拖动结束事件
          x2 = evt.originalEvent.clientX
          y = evt.originalEvent.clientY
          w = el1.offsetWidth
          if (this.calculation(el2, box1, x2, y)) {
            if (
              this.judgeForm.bindTypecd == '1' ||
              this.judgeForm.bindTypecd == '2'
            ) {
              this.$pop({
                type: 'danger',
                message: '绑定类型一车一票或一票多车不能单独拖动表体!'
              })
            } else {
              let list = this.doing[evt.oldIndex]
              this.done.push(this.doing[evt.oldIndex])
              this.doing.splice(evt.newIndex, 1)
              this.done = this.func(this.done)
            }
          }
        }
      })
      //  3 拖 2
      const sortable2 = Sortable.create(el2, {
        sort: false,
        onStart: function(evt) {
          x1 = evt.originalEvent.clientX
        },
        onEnd: evt => {
          x2 = evt.originalEvent.clientX
          y = evt.originalEvent.clientY
          w = el2.offsetWidth
          if (this.calculation(el1, box, x2, y)) {
            if (
              this.judgeForm.bindTypecd == '1' ||
              this.judgeForm.bindTypecd == '2'
            ) {
              this.$pop({
                type: 'danger',
                message: '绑定类型为一车多票或一车一票不可以修改申报数量!'
              })
            } else {
              this.doing.push(this.done[evt.oldIndex])
              this.done.splice(evt.newIndex, 1)
              this.doing = this.func(this.doing)
            }
          }
        }
      })
    },
    handleChange(val) {
      this.$emit('formatChange')
    },
    // 清除
    clear() {
      this.done = []
      this.doing = []
      this.dataList = []
    },
    // 标记
    sign(data) {
      let tableEl = document.querySelectorAll('.ep-checkbox--input')[0]
      let dataNum = this.ep_data.filter(item => item.Highlight === true)
      if (data) {
        tableEl.className = `ep-checkbox--input` //不选
      }
      if (dataNum.length >= 1) {
        tableEl.className = 'ep-checkbox--input is-indeterminate' //半选
      }
      if (dataNum.length == this.ep_data.length && this.ep_data.length != 0) {
        tableEl.className = 'ep-checkbox--input is-checked' //选中
      }
    },
    // 清除并调用接口
    eliminate(e) {
      this.ep_data = []
      setTimeout(() => {
        this.sign(true)
        this.ep_data = JSON.parse(JSON.stringify(this.listData))
      }, 100)
      //   this.getData()
      //   this.$emit('success', true)
      this.done = []
      this.doing = []
      this.dataList = []
    },
    eliminate1() {
      this.ep_data = []
      this.done = []
      this.doing = []
      this.dataList = []
    },
    //   生成
    generateDrop(val) {
      //   let selectData = this.$refs.table3.getData('select')
      if (this.done.length == 0) {
        this.$pop({
          type: 'danger',
          message: '请先选择关联内容!'
        })
        return
      }
      if (this.judgeForm.bindTypecd == '1' && this.dataList.length <= 1) {
        this.$pop({
          type: 'danger',
          message: '绑定类型为一车多票请选择一条以上数据!'
        })
        return
      }
      this.Listdata2.inExpType = this.list.inExpType || this.judgeForm.inExpType //出入库类型
      this.Listdata2.rmk = this.list.rmk || '' //备注
      //   this.Listdata2.rcvgdEtpsNo = this.$store.getters.getOrganizationCode //境内收发货企业编号
      //   this.Listdata2.rcvgdEtpsNm = this.$store.getters.getOrganizationName //境内收发货企业名称
      this.Listdata2.rcvgdEtpsNo = this.$store.getters.getTradeCode //境内收发货企业编号
      this.Listdata2.rcvgdEtpsNm = this.$store.getters.getTradeName //境内收发货企业名称
      this.Listdata2.rcvgdEtpsSccd = this.$store.getters.getOrgCreditCode //境内收发货企业名称
      this.Listdata2.vehicleNo = this.list.vehicleNo || '' //车牌
      this.Listdata2.impexpPortcd = '2249' //进出境关别
      this.Listdata2.mtpckEndprdTypecd = this.list.mtpckEndprdTypecd || 'I' //料件、成品标志
      this.Listdata2.ieTypecd =
        this.list.ieTypecd || this.judgeForm.sstockBillType //进出标注
      this.Listdata2.bindTypecd = this.judgeForm.bindTypecd
      this.Listdata2.portReleaseDt = this.done
      this.Listdata2.portReleaseRlt = this.dataList
      this.modelFlag2 = true
    },
    changenum(val) {},
    changeValue(value, old) {},
    //  model表体移动
    //     hangleChange:debounce(function(e){
    //    console.log(this.value)
    //   })
    makeSuer() {
      // console.log(debounce)
      clearTimeout(this.ctrlTime)
      this.ctrlTime = setTimeout(() => {
        for (let i = 0; i < this.doing.length; i++) {
          if (this.doing[i].id == this.infoForm.id) {
            let data = this.doing[i]
            data.dclQty = this.doing[i].dclQty * 1 - this.infoForm.dclQty
            if (data.dclQty == 0) {
              this.doing.splice(i, 1)
            } else {
              this.doing.splice(i, 1, data)
            }
          }
        }
        if (this.doing.length == 0) {
          this.ep_data.forEach((item, index) => {
            if (this.infoForm.pid == item.pid) {
              this.ep_data.splice(index, 1)
            }
          })
        }
        this.done.push(this.infoForm)
        this.infoModel = false
        this.done = this.func(this.done)
      }, 300)
    },
    // 详情修改数量按钮
    downNumber(row) {
      this.infoModel = true
      this.maxLength = cloneObj(row).dclQty
      setTimeout(() => {
        this.infoForm = cloneObj(row)
      }, 10)
    },
    selectChange(selector, index) {
      //   if (selector.length > 1 || selector.length == 0) {
      //     this.doing = []
      //     return
      //   }
      //   this.dataList.push({ rltNo: selector[0].whRecPreentNo, rltTbTypecd: '2' })
      //   this.doing = cloneObj(selector[0].warehouseReceiptDt)
    },
    // 整体移动
    hearderDelete() {
      let selectData = this.$refs.table1.getData('select')
      if (
        (this.judgeForm.bindTypecd == '3' ||
          this.judgeForm.bindTypecd == '2') &&
        selectData.length > 1
      ) {
        this.$pop({
          type: 'danger',
          message: '请选择一条数据!'
        })
        return
      }
      if (
        (this.judgeForm.bindTypecd == '3' ||
          this.judgeForm.bindTypecd == '2') &&
        (this.doing.length >= 1 || this.done.length >= 1)
      ) {
        this.$pop({
          type: 'danger',
          message: '一车一票或一票多车只可选择一条!'
        })
        return
      }
      if (selectData.length == 0) {
        this.$pop({
          type: 'danger',
          message: '请至少选择一条数据!'
        })
        return false
      }
      this.doing = []
      this.done = []
      this.dataList = []
      this.ep_data.forEach((element, index) => {
        selectData.forEach(item => {
          if (
            item.whRecPreentNo == element.whRecPreentNo &&
            item.Highlight != true
          ) {
            this.$set(this.ep_data[index], 'Highlight', true)
          }
        })
      })
      selectData.forEach(item => {
        item.warehouseReceiptDt.forEach((items, index) => {
          this.done.push(items)
        })
        this.dataList.push({
          rltNo: item.whRecPreentNo,
          rltTbTypecd: this.judgeForm.rtlTypecd == '3' ? '1' : '2'
        })
      })
      // this.$refs.table1.deleteSelectRow()
      setTimeout(() => {
        this.sign()
        this.selectUSDCol()
      }, 10)
    },
    // 明细移动
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
      let fatherData = this.ep_data.filter(item => {
        return item.stockBillNo == selectData[0].stockBillNo
      })
      if (selectData.length == this.$refs.table2.getShowData().length) {
        this.ep_data.forEach((item, index) => {
          if (fatherData[0].stockBillNo == item.stockBillNo) {
            this.ep_data.splice(index, 1)
          }
        })
      }
      this.$refs.table2.getShowData().forEach((item, index) => {
        selectData.forEach((items, indexs) => {
          if (items.id == item.id) {
            this.doing.splice(index, 1)
          }
        })
      })
    },
    headerClick(data, val) {},
    searchCallback(json) {
      let data = json.map.data.content
      this.listData = JSON.parse(JSON.stringify(data))
      let arr = data
      this.dataList.forEach(item => {
        //   arr.whRecPreentNo.includes(item.rltNo)
        arr.forEach((v, i) => {
          if (v.whRecPreentNo == item.rltNo) {
            this.$set(v, 'Highlight', true)
          }
        })
      })
      this.ep_data = arr

      //   this.sign()
      //   this.clear()
    },
    getlistData() {
      this.refresh(true)
    }
  }
}
</script>

<style>
.light-success {
  background: rgba(33, 150, 243, 0.24) !important;
}
</style>
<style scoped>
.ep-table-body-wrap {
  /* min-height: 400px; */
}
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
.drag-box1 {
  display: block !important;
}
.drag-box1 > div {
  min-height: 260px !important;
  margin-right: 0px !important;
}
.drag-box {
  margin-top: 10px;
  display: flex;
  user-select: none;
}
.drag-box > div {
  min-height: 460px;
  background-color: #eff1f5;
  margin-right: 16px;
  border-radius: 6px;
  border: 1px #e1e4e8 solid;
  margin-bottom: 10px;
}
.drag-box-item1 {
  flex: 0.7;
  /* max-width: 330px; */
  min-width: 370px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.drag-box-item2 {
  flex: 1.5;
  /* max-width: 330px; */
  min-width: 300px;
  position: relative;
}
.drag-box-item3 {
  flex: 1.5;
  /* max-width: 330px; */
  min-width: 300px;
  margin-right: 0px;
  position: relative;
}
.item-title {
  display: flex !important;
  justify-content: space-between !important;
  padding: 8px 8px 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #24292e;
  font-weight: 600;
}
.iconCircled {
  color: #2196f3;
}
.iconCircled_active {
  color: #ccc;
  cursor: not-allowed;
}
.ep_pager {
  /* position: absolute; */
  /* bottom: 0px; */
  background: #fff;
  margin: 0;
  width: 100%;
}
/* .ep-checkbox--input.is-indeterminate>.ep-checkbox--inner:before{

} */
</style>