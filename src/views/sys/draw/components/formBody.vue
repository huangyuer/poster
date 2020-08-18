<template>
  <div>
    <div>
      <ep-model title="出入库预增减表体" v-model="model" width="1250px" :wrap-close="false">
        <ep-form ref="bodyForm" :form="bodyForm" :rules="page_rules" name-width="168px">
          <ep-row :gutter="7">
            <!-- <ep-col :col="8">
              <ep-form-item attr="stockBillNoPre" label="ERP/ERP/WMS预出入库单编号" title="ERP/WMS预出入库单编号">
                <ep-input
                  v-model="bodyForm.stockBillNoPre"
                  name="stockBillNoPre"
                  :maxlength="64"
                ></ep-input>
              </ep-form-item>
            </ep-col> -->
            <ep-col :col="8">
              <ep-form-item attr="entryGdsSeqno" label="报关单商品序号">
                <ep-input v-model="bodyForm.entryGdsSeqno" name="entryGdsSeqno" :maxlength="10"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="copGNo" label="商品料号">
                <ep-input v-model="bodyForm.copGNo" name="copGNo" :maxlength="32"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="hsCode" label="商品编码">
                <ep-input v-model="bodyForm.hsCode" name="hsCode" :maxlength="10"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="ciqCode" label="商检编码">
                <ep-input v-model="bodyForm.ciqCode" name="ciqCode" :maxlength="10"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="gname" label="商品名称">
                <ep-input v-model="bodyForm.gname" name="gname" :maxlength="256"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="gmodel" label="商品规格型号">
                <ep-input v-model="bodyForm.gmodel" name="gmodel" :maxlength="768"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="qty" label="数量">
                <ep-input v-model="bodyForm.qty" name="qty" :maxlength="20"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="gunit" label="数量单位">
                <loc-codemap-select :name="'gunit'" :code="'unit'" :cName="'unitName'" :dataList="dclUnitcds" :value.sync="bodyForm.gunit==null?'':bodyForm.gunit"></loc-codemap-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="unitPrice" label="单价">
                <ep-input v-model="bodyForm.unitPrice" name="unitPrice" :maxlength="26"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="tradeTotal" label="总价">
                <ep-input v-model="bodyForm.tradeTotal" name="tradeTotal" :maxlength="26"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="tradeCurr" label="币制">
                <ep-select ref="tradeCurrSelect" v-model="bodyForm.tradeCurr" name="tradeCurr" filterable>
                  <ep-select-item v-for="(item, index) in currList" :key="index" :index="item.currCode" :label="item.currName + ' ' + item.currCode"></ep-select-item>
                </ep-select>
                <!-- <ep-input v-model="bodyForm.tradeCurr" name="tradeCurr" :maxlength="26"></ep-input> -->
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="qty1" label="法定数量">
                <ep-input v-model="bodyForm.qty1" name="qty1" :maxlength="20"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="qty2" label="法定第二数量">
                <ep-input v-model="bodyForm.qty2" name="qty2" :maxlength="20"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="unit1" label="法定单位">
                <loc-codemap-select :name="'unit1'" :code="'unit'" :cName="'unitName'" :dataList="dclUnitcds" :value.sync="bodyForm.unit1"></loc-codemap-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="unit2" label="法定第二计量单位">
                <loc-codemap-select :name="'unit2'" :code="'unit'" :cName="'unitName'" :dataList="dclUnitcds" :value.sync="bodyForm.unit2"></loc-codemap-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="originCountryCode" label="原产国(地区)">
                <loc-codemap-select :name="'originCountryCode'" :code="'countryCode'" :cName="'nameCn'" :dataList="countrys" :value.sync="bodyForm.originCountryCode"></loc-codemap-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="netWt" label="净重">
                <ep-input v-model="bodyForm.netWt" name="netWt" :maxlength="20"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="8">
              <ep-form-item attr="grossWt" label="毛重">
                <ep-input v-model="bodyForm.grossWt" name="grossWt" :maxlength="20"></ep-input>
              </ep-form-item>
            </ep-col>
          </ep-row>
          <div style="text-align: center;" v-if="!isDtBody">
            <WmsButton @click="makeSure()">确定</WmsButton>
            <WmsButton @click="model = !model">关闭</WmsButton>
          </div>
        </ep-form>
      </ep-model>
      <div class="ep-card card-margin relative">
        <div class="card-body">
          <div class="block" v-if="!isDtBody">
            <!-- <ep-button type="primary" size="small" @click="doUpdate" icon="edit">修改</ep-button>
          <ep-button type="danger" size="small" @click="doDelete" icon="trash-a">删除</ep-button>
            <ep-button type="primary" size="small" @click="doDeclare" icon="checkmark-round">确认</ep-button>-->
            <!-- <ep-button type="primary" size="small" @click="doBodyAdd" icon="plus-round">添加</ep-button> -->
            <WmsButton @click="doBodyAdd" style="margin:1px">添加</WmsButton>
            <!-- <WmsButton   @click="doBodyUpdate" style="margin:1px">修改</WmsButton> -->
            <!-- <ep-button type="primary" size="small" @click="doBodyUpdate" icon="edit">修改</ep-button> -->
            <!-- <ep-button
              type="danger"
              size="small"
              @click="doBodyDelete"
              icon="trash-a"
              v-show="btnShow"
            >删除</ep-button>-->
            <!--<ep-button type="danger" size="small" @click="clearTable" icon="trash-a">清空</ep-button>-->
          </div>
          <div class="block">
            <ep-table ref="table" :height="400" :data="tableData" :head-color="headColor" @row-dblclick="queryOperStatus" border>
              <ep-table-item column="opt" title="操作" width="200" v-if="!isDtBody">
                <template slot-scope="props">
                  <wms-icon type="edit" @click="doBodyUpdate(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="cancel" @click="doBodyDelete(props.row,props.row.id)"></wms-icon>
                </template>
              </ep-table-item>
              <ep-table-item column="entryGdsSeqno" width="200" title="报关单商品序号"></ep-table-item>
              <!-- <ep-table-item column="stockBillNoPre" width="150" title="ERP/WMS预出入库单编号"></ep-table-item> -->
              <ep-table-item column="copGNo" width="150" title="商品料号">
                <template slot-scope="props">
                  <p class="text-style">{{ props.row.copGNo }}</p>
                </template>
              </ep-table-item>
              <ep-table-item column="hsCode" width="150" title="商品编码"></ep-table-item>
              <ep-table-item column="ciqCode" width="150" title="商检编码"></ep-table-item>
              <ep-table-item column="gname" width="150" title="商品名称">
                <template slot-scope="props">
                  <p class="text-style">{{ props.row.gname }}</p>
                </template>
              </ep-table-item>
              <ep-table-item column="gmodel" width="150" title="商品规格型号">
                <template slot-scope="props">
                  <p class="text-style">{{ props.row.gmodel }}</p>
                </template>
              </ep-table-item>
              <ep-table-item column="qty" width="150" title="数量"></ep-table-item>
              <ep-table-item column="gunit" width="150" title="数量单位" :formatter="dclUnitcdTranslate2"></ep-table-item>
              <ep-table-item column="unitPrice" width="150" title="单价"></ep-table-item>
              <ep-table-item column="tradeTotal" width="150" title="总价"></ep-table-item>
              <ep-table-item column="tradeCurr" width="150" title="币制" :formatter="dclCurrcdFormatter"></ep-table-item>
              <ep-table-item column="qty1" width="150" title="法定数量"></ep-table-item>
              <ep-table-item column="qty2" width="150" title="法定第二数量"></ep-table-item>
              <ep-table-item column="unit1" width="150" title="法定单位" :formatter="dclUnitcdTranslate"></ep-table-item>
              <ep-table-item column="unit2" width="200" title="法定第二计量单位" :formatter="dclUnitcdTranslate1"></ep-table-item>
              <ep-table-item column="originCountryCode" width="150" title="原产国(地区)" :formatter="natcdTranslate"></ep-table-item>
              <ep-table-item column="netWt" width="150" title="净重"></ep-table-item>
              <ep-table-item column="grossWt" width="150" title="毛重"></ep-table-item>
              <!-- <ep-table-item column="rmk" title="备注" width="350">
                <template slot-scope="props">
                  <p class="rmk-style">{{ props.row.rmk }}</p>
                </template>
              </ep-table-item>-->
            </ep-table>
          </div>
          <div class="block">
            <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '../mixin'
import misList from 'src/common/mislist'
import { cloneObj } from 'utils'
// import bus from "./bus";
export default {
  mixins: [mixin, misList],
  data() {
    var grossWt_rules = (rule, value, callback) => {
      let reg = /^\d+$/
      if (value != null && value != '' && isNaN(value)) {
        callback(new Error('请输入正确数字'))
        return
      }
      callback()
    }
    var qty_rules = (rule, value, callback) => {
      let reg = /^\d+$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确数字'))
        return
      }
      callback()
    }
    return {
      customSearch: {},
      bodyForm: {
        whRecPreentNo: this.headerForm.whRecPreentNo,
        gdsSeqno: '',
        portNo: '',
        // rltPortSeqno: "",
        copGNo: '',
        hsCode: '',
        gname: '',
        gmodel: '',
        entryGdsSeqno: '',
        tradeCurr: '',
        qty: '',
        qty1: '',
        qty2: '',
        dclUnitcd: '',
        unitPrice: '',
        tradeTotal: '',
        sumRmbVal: '',
        sumUsaVal: '',
        originCountryCode: '',
        gunit: '',
        netWt: '',
        unit1: '',
        unit2: ''
        // stockBillNoPre: ''
        // rmk: ""
      },
      page_rules: {
        qty: { required: true,  trigger: 'change', validator: qty_rules},
        gunit: { required: true, message: '不能为空', trigger: 'change' },
        copGNo: { required: true, message: '不能为空', trigger: 'change' },
        grossWt: {
          required: false,
          trigger: 'change',
          validator: grossWt_rules
        },
        netWt: {
          required: false,
          trigger: 'change',
          validator: grossWt_rules
        },
        tradeTotal: {
          required: false,
          trigger: 'change',
          validator: grossWt_rules
        },
        // stockBillNoPre: {
        //   required: true,
        //   message: '不能为空',
        //   trigger: 'change'
        // }
      },
      isDisabled: false,
      btnShow: true,
      headColor: true,
      tableData: [],
      tableDataCopy: this.listData,
      loading: false,
      model: false,
      ep_page: {
        page: 1,
        size: 10
      },
      totalcount: 0,
      buttonStatus: ''
    }
  },
  props: {
    headerForm: {
      type: Object,
      default: function() {
        return {}
      }
    },
    listData: {
      type: Array,
      default: function() {
        return []
      }
    },
    isDtBody: {
      type: Boolean,
      default: false
    },
    isTablePort: {
      type: Boolean,
      default: false
    },
    displayBlock: {
      default: false
    },
    changeState: {
      default: 3
    },
    changeDclcus: {
      default: 1
    },
    dtDetailList: {
      type: Array,
      default: function() {
        return []
      }
    },
    ieTypecdState: {
      type: String,
      default: ''
    }
  },
  components: {},
  created() {
    let unitList = this.$store.getters.getUnitList
    this.dclUnitcds = unitList
    let curr = this.$store.getters.getCurrList
    this.currList = curr
    if (this.isDtBody) this.page_rules = {}
  },
  beforeDestroy() {
    // bus.$off("deleteDtDetail");
  },
  mounted() {
    this.makePaging(10, 1, this.listData)
    if (this.changeState === 3) {
      this.btnShow = false
    } else {
      this.btnShow = true
    }
  },
  watch: {
    ieTypecdState(val, oldval) {
      if (val != oldval) {
        this.tableData = []
        this.tableDataCopy = []
      }
      this.makePaging(10, 1, this.listData)
    },
    model(e) {
      if (!e) {
        this.$refs.bodyForm && this.$refs.bodyForm.reset()
      }
    },
    listData: {
      handler(newData, oldData) {
        this.tableDataCopy = newData
        // this.makePaging(10, 1, this.tableDataCopy);
        this.makePaging(
          this.ep_page.size,
          this.ep_page.page,
          this.tableDataCopy
        )
      },
      deep: true
    },
    // 'bodyForm.qty'(val, oldVal) {
    //   // // let reg = /^[1-9]\d*$/;
    //   // let reg = /\d+(\.\d{0,2})?/;
    //   // if (reg.test(val)) {
    //   //   setTimeout(() => {
    //   //     // this.bodyForm.qty = val.match(/^[1-9]\d*$/)[0] || "";
    //   //     this.bodyForm.qty = val.match(/\d+(\.\d{0,5})?/)[0] || "";
    //   //   });
    //   // } else {
    //   //   setTimeout(() => {
    //   //     this.bodyForm.qty = "";
    //   //   });
    //   // }
    //   if (
    //     val &&
    //     val !== null &&
    //     val.charAt(0) == '0' &&
    //     val.length > 1 &&
    //     val.charAt(1) !== '.'
    //   ) {
    //     // this.$pop({
    //     //   type: 'danger',
    //     //   message: '请输入正确的数量'
    //     // })
    //   }
    //   let reg = /^\d{0,14}(\.\d{0,5})?$/
    //   if (!reg.test(val)) {
    //     setTimeout(() => {
    //       this.bodyForm.qty = oldVal
    //     })
    //   }
    // },
    'bodyForm.entryGdsSeqno'(val, oldVal) {
      let reg = /[+]?([0-9]+(.[0-9]{1,4})?)/
      if (reg.test(val)) {
        setTimeout(() => {
          this.bodyForm.entryGdsSeqno =
            val.match(/[+]?([0-9]+(.[0-9]{1,4})?)/)[0] || ''
        })
      } else {
        setTimeout(() => {
          this.bodyForm.entryGdsSeqno = ''
        })
      }
    },
    // 'bodyForm.tradeTotal'(val, oldVal) {
    //   // let reg = /\d+(\.\d{0,2})?/;
    //   // if (reg.test(val)) {
    //   //   setTimeout(() => {
    //   //     this.bodyForm.tradeTotal = val.match(/\d+(\.\d{0,5})?/)[0] || "";
    //   //   });
    //   // } else {
    //   //   setTimeout(() => {
    //   //     this.bodyForm.tradeTotal = "";
    //   //   });
    //   // }
    //   if (
    //     val &&
    //     val !== null &&
    //     val.charAt(0) == '0' &&
    //     val.length > 1 &&
    //     val.charAt(1) !== '.'
    //   ) {
    //     // this.$pop({
    //     //   type: 'danger',
    //     //   message: '请输入正确的数量'
    //     // })
    //   }
    //   let reg = /^\d{0,20}(\.\d{0,5})?$/
    //   if (!reg.test(val)) {
    //     setTimeout(() => {
    //       this.bodyForm.tradeTotal = oldVal
    //     })
    //   }
    // },
    // 'bodyForm.netWt'(val, oldVal) {
    //   if (
    //     val &&
    //     val !== null &&
    //     val.charAt(0) == '0' &&
    //     val.length > 1 &&
    //     val.charAt(1) !== '.'
    //   ) {
    //     // this.$pop({
    //     //   type: 'danger',
    //     //   message: '请输入正确的数量'
    //     // })
    //   }
    //   let reg = /^\d{0,14}(\.\d{0,5})?$/
    //   if (!reg.test(val)) {
    //     setTimeout(() => {
    //       this.bodyForm.netWt = oldVal
    //     })
    //   }
    // },
    'bodyForm.grossWt'(val, oldVal) {
      //     if (
      //     val &&
      //     val !== null &&
      //     val.charAt(0) == "0" &&
      //     val.length > 1 &&
      //     val.charAt(1) !== "."
      //   ) {
      //     this.$pop({
      //       type: "danger",
      //       message: "请输入正确的毛重"
      //     });
      //   }
      //   let reg = /^\d{0,14}(\.\d{0,5})?$/;
      //     console.log(val,oldVal,reg.test(val))
      //   if (!reg.test(val)) {
      //     setTimeout(() => {
      //       this.bodyForm.grossWt = oldVal;
      //     });
      //   }
    }
  },
  methods: {
    queryOperStatus(event, row, index) {
      if (!this.isDtBody) return
      this.bodyForm = row
      this.model = true
    },
    reset(el) {
      this.$refs[el].reset()
    },
    doBodyAdd() {
      this.buttonStatus = 2
      this.$refs.bodyForm && this.$refs.bodyForm.reset()
      this.model = true
      this.localType = '添加'
      // 先报后进时， 商品序号必填
      let seqnoState = this.changeState
      if (seqnoState === 2) {
        // this.page_rules.entryGdsSeqno.required = true;
      } else {
        // this.page_rules.entryGdsSeqno.required = false;
      }
      // 分送集报时， 必填项设置为非必填
      if (seqnoState === 3) {
        this.isDisabled = true
        // this.page_rules.copGNo.required = false; // 商品料号
        // this.page_rules.hsCode.required = false; // 商品编码
        // this.page_rules.gname.required = false; // 商品名称
      } else {
        this.isDisabled = false
        // this.page_rules.copGNo.required = true;
        // this.page_rules.hsCode.required = true;
        // this.page_rules.gname.required = true;
      }
    },
    doBodyUpdate(row, rowId) {
      this.buttonStatus = 1
      let selectData = [row]
      // let selectData = this.$refs.table.getData("select");
      let seqnoState = this.changeState
      if (seqnoState === 3) {
        // this.isDisabled = true;
        // this.page_rules.copGNo.required = false; // 商品料号
        // this.page_rules.hsCode.required = false; // 商品编码
        // this.page_rules.gname.required = false; // 商品名称
      } else {
        this.isDisabled = false
        // this.page_rules.copGNo.required = true;
        // this.page_rules.hsCode.required = true;
        // this.page_rules.gname.required = true;
      }
    //   if (selectData.length === 0) {
    //     this.$pop({
    //       type: 'danger',
    //       message: '请选择一条数据'
    //     })
    //   } else if (selectData.length > 1) {
    //     this.$pop({
    //       type: 'danger',
    //       message: '请选择一条数据'
    //     })
    //   } else {
        this.localType = '修改' //代表选中一条
        this.model = true
        setTimeout(() => {
          this.bodyForm = cloneObj(selectData[0])
        }, 100)
    //   }
    },
    // doBodyDelete() {
    //   //删除table数据
    //   let selectData = this.$refs.table.getData("select");
    //   if (selectData.length == 0) {
    //     this.$pop({
    //       type: "danger",
    //       message: "请选择数据"
    //     });
    //     return;
    //   }
    // 添加模板的确定按钮
    doBodyDelete(row, rowId) {
      //删除table数据
      // let selectData = this.$refs.table.getData("select");
      let selectData = [row]

      if (selectData.length == 0) {
        this.$pop({
          type: 'danger',
          message: '请选择数据'
        })
        return
      }
      this.$confirm({
        word: '是否要删除所选条目信息！',
        callback: errorInfo => {
          if (errorInfo) {
            let allDelectIndex = []
            // let selectData = this.$refs.table.getData("select");
            // let selectData = this.$refs.table.getData("select");
            let selectData = [row]
            selectData.forEach(e => {
              let updateDate = this.tableDataCopy.findIndex(value => {
                //   console.log(value.leadId , e.leadId)
                return value.id == e.id
              })
              allDelectIndex.push(updateDate)
            })
            allDelectIndex = allDelectIndex.sort((a, b) => b - a)
            allDelectIndex.forEach((num, i) => {
              this.tableDataCopy.splice(num, 1)
            })
            let filterData = this.filterData(
              this.customSearch,
              this.tableDataCopy
            )
            this.makePaging(this.ep_page.size, this.ep_page.page, filterData)
            // this.ep_page.page = 1;
            this.localType = ''
          } else {
            return
          }
        }
      })
    },
    makeSure() {
      this.$refs['bodyForm'].validate(valid => {
        // console.log(this.bodyForm);
        if (valid) {
          if (this.buttonStatus == 0) {
            return
          } else if (this.buttonStatus == 1) {
            let bodyForm = this.bodyForm
            this.indexChange = this.$refs.table.getDataIndex('select')[0]
            this.tableData.splice(this.indexChange, 1, cloneObj(bodyForm))
            let updateDate = this.tableDataCopy.findIndex(value => {
              return value.id == bodyForm.id
            })
            this.tableDataCopy.splice(updateDate, 1, cloneObj(bodyForm))
            this.$refs.bodyForm && this.$refs.bodyForm.reset()
            this.model = false
            this.buttonStatus = 0
          } else if (this.buttonStatus == 2) {
            this.bodyForm.id =
              this.tableDataCopy[this.tableDataCopy.length - 1] == undefined
                ? 0
                : this.tableDataCopy[this.tableDataCopy.length - 1].id + 1
            let bodyForm = this.bodyForm
            this.tableData.push(cloneObj(bodyForm))
            this.tableDataCopy.push(cloneObj(bodyForm))
            this.totalcount++
            this.ep_page.page = Math.ceil(this.totalcount / this.ep_page.size)
            this.buttonStatus = 2
            this.$refs.bodyForm && this.$refs.bodyForm.reset()
            this.model = false
          }
        }
      })
    },
    // 添加操作最终关闭按钮
    closeModel() {
      // this.model = false;
    },
    customSearchBtn() {},
    handleSizeChange(val) {
      this.ep_page.size = val
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.tableDataCopy)
      )
    },
    handleCurrentChange(val) {
      this.ep_page.page = val
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.tableDataCopy)
      )
    },
    makePaging(size, page, data) {
      let begin = (page - 1) * size
      let end = begin + size
      let newData = data.slice(begin, end)
      this.totalcount = data.length
      this.tableData = newData
    },
    filterData(condition, data) {
      let filter = (condition, data) => {
        return data.filter(item => {
          return Object.keys(condition).every(key => {
            if (condition[key] == '') return true
            let diff =
              key == 'gname'
                ? String(item[key])
                    .toLowerCase()
                    .indexOf(
                      String(condition[key])
                        .trim()
                        .toLowerCase()
                    ) !== -1
                : String(item[key]).toLowerCase() ==
                  String(condition[key])
                    .trim()
                    .toLowerCase()
            return diff
          })
        })
      }
      return filter(condition, data)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .text-style {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100px;
}
</style>

