<template>
  <div>
    <ep-form ref="bodyForm" :form="bodyForm" name-width="168px" :rules="!isDtBody ? page_rules : {}">
      <ep-row :gutter="7">
        <ep-col :col="8">
          <ep-form-item attr="rltEntryNo" label="关联报关单编号">
            <ep-input v-model="bodyForm.rltEntryNo" name="rltEntryNo" :disabled="!displayBlock" :maxlength="64"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="stockBillNoPre" label="ERP/WMS预出入库单编号" title="ERP/WMS预出入库单编号">
            <ep-input v-model="bodyForm.stockBillNoPre" name="stockBillNoPre" :disabled="!displayBlock" :maxlength="64"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="主管海关" attr="masterCuscd">
            <loc-codemap-select :name="'masterCuscd'" :code="'customCode'" :cName="'customName'" :dataList="tradeInfo" :type="'custom'" :value.sync="bodyForm.masterCuscd" :disabled="!displayBlock">
            </loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="stockBillNo" label="ERP/WMS实际出库单编号" title="ERP/WMS预出入库单编号">
            <ep-input v-model="bodyForm.stockBillNo" name="stockBillNo" :disabled="!displayBlock" :maxlength="64"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="billType" label="出入库类型" title="出入库类型">
            <ep-select v-model="bodyForm.billType" name="billType" :disabled="!displayBlock">
              <ep-select-item index="1" label="一线进出"></ep-select-item>
              <ep-select-item index="2" label="先报后送"></ep-select-item>
              <ep-select-item index="3" label="分送集报"></ep-select-item>
              <ep-select-item index="4" label="区内流转"></ep-select-item>
              <ep-select-item index="5" label="区间流转"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="stockType" label="库存类型" title="库存类型">
            <ep-select v-model="bodyForm.stockType" name="stockType" :disabled="!displayBlock">
              <ep-select-item index="1" label="保税"></ep-select-item>
              <ep-select-item index="2" label="非保"></ep-select-item>

            </ep-select>
          </ep-form-item>
        </ep-col>
        <!-- <ep-col :col="8">
          <ep-form-item attr="inExpTime" label="ERP/WMS出入库日期" title="ERP/WMS出入库日期">
            <ep-date
              v-model="bodyForm.inExpTime"
              name="inExpTime"
              :disabled="!displayBlock"
            ></ep-date>
          </ep-form-item>
        </ep-col> -->
        <ep-col :col="8">
          <ep-form-item attr="stockBillType" label="进出类型">
            <ep-select v-model="bodyForm.stockBillType" name="stockBillType" :disabled="!displayBlock||ieTypecdStatus" @change="ieTypecdChange">

              <div v-if="stateValue == 4">
                <ep-select-item index="I" label="入库"></ep-select-item>
                <ep-select-item index="E" label="出库"></ep-select-item>
              </div>
              <div v-else>
                <ep-select-item index="I" label="进区"></ep-select-item>
                <ep-select-item index="E" label="出区"></ep-select-item>
              </div>
            </ep-select>
          </ep-form-item>
        </ep-col>

        <ep-col :col="8">
          <ep-form-item attr="classifyType" label="料件/成品标志">
            <ep-select v-model="bodyForm.classifyType" name="classifyType" :disabled="!displayBlock">
              <ep-select-item index="I" label="料件"></ep-select-item>
              <ep-select-item index="E" label="成品"></ep-select-item>
              <ep-select-item index="S" label="设备"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="grossWtTotal" label="总毛重">
            <ep-input v-model="bodyForm.grossWtTotal" name="grossWtTotal" :disabled="!displayBlock" :maxlength="20"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="tradeName" label="经营企业名称">
            <ep-input v-model="bodyForm.tradeName" name="tradeName" :maxlength="20" :disabled="true"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="经营企业单位编码" attr="tradeCode">
            <ep-input v-model="bodyForm.tradeCode" name="tradeCode" :disabled="true"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="经营企业社会信用代码" attr="tradeSccd">
            <ep-input v-model="bodyForm.tradeSccd" name="tradeSccd" :disabled="true"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="supvMode" label="监管方式">
            <loc-codemap-select :name="'supvMode'" :code="'tradeMode'" :cName="'abbrTrade'" :dataList="supvInfo" :value.sync="bodyForm.supvMode" :disabled="!displayBlock"></loc-codemap-select>
          </ep-form-item>
        </ep-col>

        <ep-col :col="8">
          <ep-form-item attr="trafMode" label="运输方式">
            <loc-codemap-select :disabled="!displayBlock" :name="'trafMode'" :code="'trafCode'" :cName="'trafSpec'" :dataList="transfList" :value.sync="bodyForm.trafMode"></loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="businessType" label="业务类别" title="业务类别">
            <ep-select v-model="bodyForm.businessType" name="businessType" :disabled="!displayBlock">
              <ep-select-item index="1" label="自用设备"></ep-select-item>
              <ep-select-item index="2" label="简单加工"></ep-select-item>
              <ep-select-item index="3" label="保税加工"></ep-select-item>
              <ep-select-item index="4" label="保税仓储"></ep-select-item>
              <ep-select-item index="5" label="转口贸易"></ep-select-item>
              <ep-select-item index="6" label="跨境电商"></ep-select-item>
              <ep-select-item index="7" label="汽车平行进口"></ep-select-item>
              <ep-select-item index="8" label="融资租赁"></ep-select-item>
              <ep-select-item index="9" label="期货保税交割"></ep-select-item>
              <ep-select-item index="10" label="保税维修"></ep-select-item>
              <ep-select-item index="11" label="进口汽车保税存储"></ep-select-item>
              <ep-select-item index="12" label="保税研发"></ep-select-item>
              <ep-select-item index="13" label="委托加工"></ep-select-item>
              <ep-select-item index="14" label="大宗商品现货保税交易"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="ieport" label="进出境关别">
            <loc-codemap-select :name="'ieport'" :code="'customCode'" :cName="'customName'" :dataList="ImpexpPortcdInfo" :type="'custom'" :value.sync="bodyForm.ieport" :disabled="!displayBlock">
            </loc-codemap-select>
            <!-- <ep-input v-model="bodyForm.ieport" name="ieport" :disabled="!displayBlock"></ep-input> -->
          </ep-form-item>
        </ep-col>
        <!-- <ep-col :col="8">
          <ep-form-item attr="dclcusFlag" label="是否报关">
            <ep-select
              v-model="bodyForm.dclcusFlag"
              name="dclcusFlag"
              :disabled="!displayBlock"
              @change="dclcusChange"
            >
              <ep-select-item index="1" label="否"></ep-select-item>
              <ep-select-item index="2" label="是"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col> -->
        <!-- <ep-col :col="8">
          <ep-form-item attr="dclcusTypecd" label="报关类型">
            <ep-select
              v-model="bodyForm.dclcusTypecd"
              name="dclcusTypecd"
              :disabled="!displayBlock || noEdit"
            >
              <ep-select-item index="1" label="关联报关"></ep-select-item>
              <ep-select-item index="2" label="对应报关"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col> -->
        <ep-col :col="8">
          <ep-form-item attr="transMode" label="成交方式">
            <ep-select :disabled="!displayBlock" :label="TransacList" v-model="bodyForm.transMode" name="transMode">
              <ep-select-item v-for="(item, index) in TransacList" :key="index" :index="item.transMode" :label="item.transSpec + ' ' + item.transMode"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="stshipTrsarvCode" label="启运国/运抵国(地区)">
            <!-- <ep-select
              :disabled="!displayBlock"
              :label="countrys"
              v-model="bodyForm.stshipTrsarvCode"
              name="stshipTrsarvCode"
            >
              <ep-select-item
                v-for="(item, index) in countrys"
                :key="index"
                :index="item.countryCode"
                :label="item.nameCn + ' ' + item.countryCode"
              ></ep-select-item>
            </ep-select>-->
            <loc-codemap-select :disabled="!displayBlock" :name="'stshipTrsarvCode'" :code="'countryCode'" :cName="'nameCn'" :dataList="countrys" :value.sync="bodyForm.stshipTrsarvCode">
            </loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="tradeCountryCode" label="贸易国(地区)">
            <!-- <ep-select
              :disabled="!displayBlock"
              :label="countrys"
              v-model="bodyForm.tradeCountryCode"
              name="tradeCountryCode"
            >
              <ep-select-item
                v-for="(item, index) in countrys"
                :key="index"
                :index="item.countryCode"
                :label="item.nameCn + ' ' + item.countryCode"
              ></ep-select-item>
            </ep-select>-->
            <loc-codemap-select :disabled="!displayBlock" :name="'tradeCountryCode'" :code="'countryCode'" :cName="'nameCn'" :dataList="countrys" :value.sync="bodyForm.tradeCountryCode">
            </loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="districtCode" label="境内目的地/货源地" title="境内目的地/货源地">
            <loc-codemap-select :disabled="!displayBlock" :name="'districtCode'" :code="'districtCode'" :cName="'districtName'" :dataList="districtList" :value.sync="bodyForm.districtCode">
            </loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="destinationCode" label="最终目的国(地区)">
            <!-- <ep-select
              :label="countrys"
              v-model="bodyForm.destinationCode"
              name="destinationCode"
              :disabled="!displayBlock"
            >
              <ep-select-item
                v-for="(item, index) in countrys"
                :key="index"
                :index="item.countryCode"
                :label="item.nameCn + +item.countryCode"
              ></ep-select-item>
            </ep-select>-->
            <loc-codemap-select :disabled="!displayBlock" :name="'destinationCode'" :code="'countryCode'" :cName="'nameCn'" :dataList="countrys" :value.sync="bodyForm.destinationCode">
            </loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8" v-if="!displayBlock">
          <ep-form-item label="创建时间" stockDate attr="stockDate">
            <ep-date v-model="bodyForm.stockDate" name="stockDate" :disabled="!displayBlock"></ep-date>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="提运单号" attr="billNo">
            <ep-input v-model="bodyForm.billNo" name="billNo" :disabled="!displayBlock"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="英文船名" attr="shipNameEn">
            <ep-input v-model="bodyForm.shipNameEn" name="shipNameEn" :disabled="!displayBlock"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="航次" attr="voyageNo">
            <ep-input v-model="bodyForm.voyageNo" name="voyageNo" :disabled="!displayBlock"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="仓库号" attr="whNo">
            <ep-input v-model="bodyForm.whNo" name="whNo" :disabled="!displayBlock"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="库位" attr="whLoc">
            <ep-input v-model="bodyForm.whLoc" name="whLoc" :disabled="!displayBlock"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="客户订单号" attr="orderNo">
            <ep-input v-model="bodyForm.orderNo" name="orderNo" :disabled="!displayBlock"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="ownerName" label="货主名称">
            <ep-input v-model="bodyForm.ownerName" name="ownerName" :maxlength="20" :disabled="!displayBlock"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="col1" label="备选1">
            <ep-input v-model="bodyForm.col1" name="col1" :maxlength="20" :disabled="!displayBlock"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="col2" label="备选2">
            <ep-input v-model="bodyForm.col2" name="col2" :maxlength="20" :disabled="!displayBlock"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="col3" label="备选3">
            <ep-input v-model="bodyForm.col3" name="col3" :maxlength="20" :disabled="!displayBlock"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="col4" label="备选4">
            <ep-input v-model="bodyForm.col4" name="col4" :maxlength="20" :disabled="!displayBlock"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="16">
          <ep-form-item attr="rmk" label="备注">
            <ep-input v-model="bodyForm.rmk" name="rmk" :disabled="!displayBlock" :maxlength="2000"></ep-input>
          </ep-form-item>
        </ep-col>
      </ep-row>
    </ep-form>
  </div>
</template>

<script>
import misList from 'src/common/mislist'
import { cloneObj } from 'utils'
import mixin from '../mixin'

export default {
  mixins: [mixin],
  extends: misList, // 务必继承
  data() {
    var grossWt_rules = (rule, value, callback) => {
      let reg = /^\d+$/
      if (value != null && value != '' && isNaN(value)) {
        callback(new Error('请输入正确数字'))
        return
      }
      callback()
    }
    return {
      headColor: false,
      tableData: [],
      tableDataCopy: this.listDate,
      loading: false,
      model: false,
      noEdit: true,
      stateValue: this.inExpTypeVal,
      rcvgdEtpsNo: this.$store.getters.getOrganizationCode, //收发货人代码
      tradeSccd: this.$store.getters.getOrgCreditCode, //收发货人社会信用代码
      ieTypecdState: ' ',
      ep_page: {
        page: 1,
        size: 10
      },
      totalcount: 0,
      buttonStatus: '',
      customSearch: {},
      page_rules: {
        stockBillNoPre: {
          required: true,
          message: '不能为空',
          trigger: 'change'
        },
        masterCuscd: { required: true, message: '不能为空', trigger: 'change' },
        stockBillType: {
          required: true,
          message: '不能为空',
          trigger: 'change'
        },
        tradeCode: { required: true, message: '不能为空', trigger: 'change' },
        tradeName: { required: true, message: '不能为空', trigger: 'change' },
        tradeSccd: { required: true, message: '不能为空', trigger: 'change' },
        stockType: { required: true, message: '不能为空', trigger: 'change' },
        grossWtTotal: {
          required: false,
          trigger: 'change',
          validator: grossWt_rules
        }
      }
    }
  },
  // extends: misList, // 务必继承
  mixins: [misList, mixin],
  components: {},
  props: {
    inExpTypeVal: {
      default: ''
    },
    inExpTypeStatus: {
      default: false
    },
    ieTypecdStatus: {
      default: false
    },
    bodyForm: {
      type: Object,
      required: true

      //   default() {
      //     return { stockBillType: '', stockType: '' }
      //   }
    },
    displayBlock: {
      default: true
    },
    isDtBody: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
  },
  created() {
    this.bodyForm.stockBillType = ''
    this.bodyForm.stockType = ''
    
    let tradeModeList = this.$store.getters.getTradeModeList
    let ImpexpPortcd = this.$store.getters.getCustomList
    let masterCuscd = this.$store.getters.getCustomId
    this.supvInfo = tradeModeList
    this.ImpexpPortcdInfo = ImpexpPortcd
  },
  updated() {
    let dclcusFlagNum = this.bodyForm.dclcusFlag
    if (dclcusFlagNum == 1) {
      this.noEdit = true
      // this.page_rules.dclcusTypecd.required = false;
      this.bodyForm.dclcusTypecd = ''
    } else {
      this.noEdit = false
      // this.page_rules.dclcusTypecd.required = true;
    }
  },
  watch: {
    // 'bodyForm.grossWt'(val, oldVal) {
    //   // let reg = /\d+(\.\d{0,2})?/;
    //   // if (reg.test(val)) {
    //   //   setTimeout(() => {
    //   //     this.bodyForm.grossWt = val.match(/\d+(\.\d{0,5})?/)[0] || "";
    //   //   });
    //   // } else {
    //   //   setTimeout(() => {
    //   //     this.bodyForm.grossWt = "";
    //   //   });
    //   // }
    //   if (
    //     val &&
    //     val !== null &&
    //     val.charAt(0) == '0' &&
    //     val.length > 1 &&
    //     val.charAt(1) !== '.'
    //   ) {
    //     this.$pop({
    //       type: 'danger',
    //       message: '请输入正确的毛重'
    //     })
    //   }
    //   let reg = /^\d{0,14}(\.\d{0,5})?$/
    //   if (!reg.test(val)) {
    //     setTimeout(() => {
    //       this.bodyForm.grossWt = oldVal
    //     })
    //   }
    // }
  },
  methods: {
    ieTypecdChange(value) {
      this.ieTypecdState = value
      //  this.$set(this.bodyForm,'ieTypecd','00000')
      // this.bodyForm.ieTypecd=value
      this.$emit('ieTypecdChange', value)
      // 区内流转时，出区=》关联编号必填
      if (this.stateValue == 4 && this.ieTypecdState == 'E') {
        // this.page_rules.rltWhRecNo.required = true;
      } else {
        // this.page_rules.rltWhRecNo.required = false;
      }
    }
  }
}
</script>
