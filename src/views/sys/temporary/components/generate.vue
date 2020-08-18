[<template>
  <div>
    <ep-model v-model="modelFlag" width="1150px" :wrap-close="false">
      <div class="modelFlagbox">
        <div class="product">
          <div class="table">
            <p style="height:60px;text-align:center;line-height:60px;font-size:25px;">进出区提发货凭证</p>
            <div style>
              <p style="padding: 0 5px;padding-top: 10px;">
                <span style="padding:5px 0 ;width:48%;display: inline-block;">
                  经营企业名称 :
                  <a>{{this.$store.getters.getTradeName}}</a>
                </span>
                <span style="padding:5px 0 ;width:48%;display: inline-block;">
                  经营企业编码 :
                  <a>{{this.$store.getters.getTradeCode}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:100%;display: inline-block;">
                  经营企业社会信用代码 :
                  <a>{{this.$store.getters.getOrgCreditCode}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:32%;display: inline-block; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                  关联编号 :
                  <a>{{Listdata.rltWhRecNo}}</a>
                </span>
                <span style="padding:5px 0 ;width:65%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                  关联报关单编号 :
                  <a>{{Listdata.rltEntryNo}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  ERP/WMS出入库类型 :
                  <!-- <a v-for="item in stockBillType" :key='item.stockBillType'>{{(Listdata.data[0].stockBillType||'')==item.stockBillType?item.billType:''}}</a> -->
                  <a>{{inExpTypeFormatter(Listdata)}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  进出标志 :
                  <a>{{ieTypecdFormatter(Listdata)}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  业务类别:
                  <a>{{businessTypelistFormatter(Listdata)}}</a>
                </span>

                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  料件/成品标志 :
                  <a>{{Listdata.mtpckEndprdTypecd&&mtpckEndprdTypecdFormatter(Listdata)}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  毛重 :
                  <a>{{Listdata.grossWt}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  监管方式 :
                  <a>{{supvModecdFormatter(Listdata)}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  运输方式 :
                  <a>{{trspModecdFormatter(Listdata)}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  进出境关别 :
                  <a>{{impexpPortcdFormatter(Listdata)}}</a>
                </span>

                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  是否报关 :
                  <!-- <a v-for="item in stockBillType" :key='item.stockBillType'>{{(Listdata.data[0].stockBillType||'')==item.stockBillType?item.dclcusFlag:''}}</a> -->
                  <a>{{dclcusFlagFormatter(Listdata)}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  报关类型:
                  <!-- <a v-for="item in stockBillType" :key='item.stockBillType'>{{(Listdata.data[0].stockBillType||'')==item.stockBillType?item.dclcusTypecd:''}}</a> -->
                  <a>{{dclcusTypecdFormatter(Listdata)}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  成交方式 :
                  <a>{{transModeFormatter(Listdata)}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  启运国/运抵国(地区) :
                  <a v-for="item in countrys" :key="item.countryCode">{{Listdata.tradeCountry==item.countryCode?item.nameCn:''}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  贸易国(地区) :
                  <a v-for="item in countrys" :key="item.countryCode">{{Listdata.tradingRegion==item.countryCode?item.nameCn:''}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  境内目的地/货源地 :
                  <a>{{districtCodeFormatter(Listdata)}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  最终目的国(地区) :
                  <a v-for="item in countrys" :key="item.countryCode">{{Listdata.destinationNatcd==item.countryCode?item.nameCn:''}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  备注:
                  <a>{{Listdata.rmk}}</a>
                </span>
              </p>
            </div>
          </div>
          <table style="border:1px solid #666;width:100%;border-collapse: collapse;">
            <tr>
              <td>关联单证编号</td>
              <td>总担保编号</td>
              <td>修改标志</td>
            </tr>
            <tr v-for="item in Listdata.warehousePort" :key="item.id">
              <td>{{item.portNo}}</td>
              <td>{{item.rtlTypecd}}</td>
              <td>{{modfMarkcdFormatter(item)}}</td>
            </tr>
          </table>
          <table style="border:1px solid #666;width:100%;border-collapse: collapse;margin-top:10px">
            <tr>
              <!-- <td>凭证编号</td>
              <td>明细序号</td> -->
              <!-- <td>关联单证编号</td> -->
              <td>关联单证表体序号</td>
              <td>商品料号</td>
              <td>商品编码</td>
              <td>商品名称</td>
              <!-- <td>规格型号</td> -->
              <!-- <td>报关单商品序号</td> -->
              <td style="min-width:50px">币制</td>
              <td style="min-width:35px">单位</td>
              <td>数量</td>
              <td style="min-width:35px">单价</td>
              <td style="width:75px">总价</td>
              <!-- <td>原产国(地区)</td> -->
              <td style="width:75px">净重</td>
              <!-- <td>修改标志代码</td> -->
            </tr>
            <tr v-for="item in Listdata.warehouseReceiptDt" :key="item.id">
              <!-- <td>{{item.whRecPreentNo}}</td>
              <td>{{item.gdsSeqno}}</td> -->
              <!-- <td>{{item.portNo}}</td> -->
              <td>{{item.rltPortSeqno}}</td>
              <td>{{item.gdsMtno}}</td>
              <td>{{item.gdecd}}</td>
              <td>{{item.gdsNm}}</td>
              <!-- <td>{{item.gdsSpcfModelDesc}}</td> -->
              <!-- <td>{{item.entryGdsSeqno}}</td> -->
              <td>{{dclCurrcdFormatter(item)}}</td>
              <td>{{dclUnitcdTranslate(item)}}</td>
              <td>{{item.dclQty}}</td>
              <td>{{item.dclUprcAmt}}</td>
              <td><ep-input :min="0" type='number' v-model="item.dclTotalAmt"></ep-input></td>
              <!-- <td>{{natcdTranslate(item)}}</td> -->
              <td><ep-input type='number' v-model="item.netWt"></ep-input></td>
              <!-- <td>{{modfMarkcdFormatter(item)}}</td> -->
            </tr>
          </table>
        </div>

        <div class="addgenerate">
          <ep-form ref="Listdata" :rules="page_rules" :form="Listdata" name-width="5px">
            <ep-row :gutter="7">
              <ep-col :col="24" v-if="typeFlag">
                <ep-form-item attr="inExpType" label>
                  <ep-select placeholder="ERP/WMS出入库类型" v-model="Listdata.inExpType" name="inExpType">
                    <ep-select-item index="1" label="一线进出"></ep-select-item>
                    <ep-select-item index="2" label="先报后送"></ep-select-item>
                    <ep-select-item index="4" label="区内流转"></ep-select-item>
                    <ep-select-item index="5" label="区间流转"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="24" v-if="typeFlag">
                <ep-form-item attr="ieTypecd" label>
                  <ep-select placeholder="进出库标志" v-model="Listdata.ieTypecd" name="ieTypecd">
                    <div v-if="Listdata.inExpType == 4">
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
              <ep-col :col="24">
                <ep-form-item attr="rltWhRecNo" label>
                  <ep-input placeholder="关联编号" v-model="Listdata.rltWhRecNo" name="rltWhRecNo" :maxlength="64"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="24">
                <ep-form-item attr="rltEntryNo" label>
                  <ep-input placeholder="关联报关单编号" v-model="Listdata.rltEntryNo" name="rltEntryNo" :maxlength="18"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="businessTypecd" label>
                  <ep-select placeholder="业务类别" v-model="Listdata.businessTypecd" name="businessTypecd">
                    <ep-select-item v-for="item in businessTypelist" :key="item.index" :index="item.index" :label="item.title"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="mtpckEndprdTypecd" label>
                  <ep-select placeholder="料件/成品标志" v-model="Listdata.mtpckEndprdTypecd" name="mtpckEndprdTypecd">
                    <ep-select-item v-for="item in mtpckEndprdTypelist" :key="item.index" :index="item.index" :label="item.title"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="grossWt" label>
                  <ep-input placeholder="毛重" v-model="Listdata.grossWt" name="grossWt" :maxlength="20"></ep-input>
                </ep-form-item>
              </ep-col>

              <ep-col :col="12">
                <ep-form-item attr="trspModecd" label>
                  <!-- <loc-codemap-select
                    placeholder="运输方式"
                    :disabled="Listdata.preData.trafMode?true:false"
                    :name="'trspModecd'"
                    :code="'trafCode'"
                    :cName="'trafSpec'"
                    :dataList="transfList"
                    :value.sync="Listdata.trspModecd"
                  ></loc-codemap-select>-->
                  <ep-select placeholder="运输方式" v-model="Listdata.trspModecd" name="trspModecd">
                    <ep-select-item v-for="item in transfList" :key="item.trafCode" :index="item.trafCode" :label="item.trafSpec"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="impexpPortcd" label>
                  <loc-codemap-select placeholder="进出境关别" :name="'impexpPortcd'" :code="'customCode'" :cName="'customName'" :dataList="ImpexpPortcdInfo" :type="'custom'"
                    :value.sync="Listdata.impexpPortcd"></loc-codemap-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item attr="transMode" label>
                  <ep-select placeholder="成交方式" :label="TransacList" v-model="Listdata.transMode" name="transMode">
                    <ep-select-item v-for="(item, index) in TransacList" :key="index" :index="item.transMode" :label="item.transSpec + ' ' + item.transMode"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="24">
                <ep-form-item attr="supvModecd" label>
                  <loc-codemap-select placeholder="监管方式" :name="'supvModecd'" :code="'tradeMode'" :cName="'abbrTrade'" :dataList="supvInfo" :value.sync="Listdata.supvModecd"></loc-codemap-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="24">
                <ep-form-item attr="tradeCountry" label>
                  <loc-codemap-select placeholder="启运国/运抵国(地区)" :name="'tradeCountry'" :code="'countryCode'" :cName="'nameCn'" :dataList="countrys" :value.sync="Listdata.tradeCountry">
                  </loc-codemap-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="24">
                <ep-form-item attr="tradingRegion" label>
                  <loc-codemap-select placeholder="贸易国(地区)" :name="'tradingRegion'" :code="'countryCode'" :cName="'nameCn'" :dataList="countrys" :value.sync="Listdata.tradingRegion">
                  </loc-codemap-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="24">
                <ep-form-item attr="districtCode" label>
                  <loc-codemap-select placeholder="境内目的地/货源地" :name="'districtCode'" :code="'districtCode'" :cName="'districtName'" :dataList="districtList" :value.sync="Listdata.districtCode">
                  </loc-codemap-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="24">
                <ep-form-item attr="destinationNatcd" label>
                  <loc-codemap-select placeholder="最终目的国(地区)" :name="'destinationNatcd'" :code="'countryCode'" :cName="'nameCn'" :dataList="countrys" :value.sync="Listdata.destinationNatcd">
                  </loc-codemap-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="24">
                <ep-form-item label attr="rmk">
                  <ep-input placeholder="备注" v-model.trim="Listdata.rmk" name="rmk" :maxlength="400" type="textarea"></ep-input>
                </ep-form-item>
              </ep-col>
              <!-- <ep-form-item attr="dclcusFlag" label="">
                <ep-select placeholder="是否报关" v-model="Listdata.dclcusFlag" name="dclcusFlag" :disabled="Listdata.preData                  <ep-select-item v-for="item in dclcusFlaglist" :key='item.index' :index="item.index" :label="item.title"></ep-select-item>
                </ep-select>
              </ep-form-item>
              <ep-form-item attr="dclcusTypecd" label="">
                <ep-select placeholder="报关类型" v-model="Listdata.dclcusTypecd" name="dclcusTypecd">
                  <ep-select-item v-for="item in dclcusTypelist" :key='item.index' :index="item.index" :label="item.title"></ep-select-item>
                </ep-select>
              </ep-form-item>-->
              <!-- <ep-form-item attr="supvModecd" label="">
                <loc-codemap-select placeholder="监管方式" :name="'supvModecd'" :code="'tradeMode'" :cName="'abbrTrade'" :dataList="supvInfo" :value.sync="Listdata.supvModecd"></loc-codemap-select>
              </ep-form-item>-->
            </ep-row>
          </ep-form>
        </div>
      </div>
      <div style="text-align:center">
        <ep-button type="success" size="small" @click="success(Listdata)" icon="edit" :disabled='Temporary'>暂存</ep-button>
        <ep-button type="success" size="small" @click="declare()" icon="checkmark-round">确认</ep-button>

        <ep-button type="danger" size="small" icon="close" @click="close()">关闭</ep-button>
      </div>
    </ep-model>
  </div>
</template>



<script>
import misList from 'src/common/mislist'
import mixin from '../mixin'
import localStorage from 'utils/localStorage'
import { cloneObj } from 'utils'

export default {
  mixins: [mixin],
  extends: misList,
  props: {
    fresh: {
      type: Boolean
    },
    Listdata: {
      type: Object
    },
    headerData: {
      type: Array
    }
  },
  created() {
    let userInfo = localStorage.getLocalStorage('setUserInfo')
    if (userInfo.routerType == 7) {
      this.typeFlag = true
    } else {
      this.typeFlag = false
    }
  },
  components: {},
  data() {
    return {
      Temporary: false,
      typeFlag: false,
      timer: '',
      modelFlag: false,
      businessTypelist: [
        { index: '1', title: '自用设备' },
        { index: '2', title: '简单加工' },
        { index: '3', title: '保税加工' },
        { index: '4', title: '保税仓储' },
        { index: '5', title: '转口贸易' },
        { index: '6', title: '跨境电商' },
        { index: '7', title: '汽车平行进口' },
        { index: '8', title: '融资租赁' },
        { index: '9', title: '期货保税交割' },
        { index: '10', title: '保税维修' },
        { index: '11', title: '进口汽车保税存储' },
        { index: '12', title: '保税研发' },
        { index: '13', title: '委托加工' },
        { index: '14', title: '大宗商品现货保税交易' }
      ],
      mtpckEndprdTypelist: [
        { index: 'I', title: '料件' },
        { index: 'E', title: '成品' },
        { index: 'S', title: '设备' }
      ],
      dclcusFlaglist: [
        { index: '1', title: '否' },
        { index: '2', title: '是' }
      ],
      dclcusTypelist: [
        { index: '1', title: '关联报关' },
        { index: '2', title: '对应报关' }
      ],
      page_rules: {
        businessTypecd: {
          required: true,
          message: '不能为空',
          trigger: 'change, blur'
        },
        mtpckEndprdTypecd: {
          required: true,
          message: '不能为空',
          trigger: 'change, blur'
        },
        trspModecd: {
          required: true,
          message: '不能为空',
          trigger: 'change, blur'
        },
        impexpPortcd: {
          required: true,
          message: '不能为空',
          trigger: 'change, blur'
        },
        grossWt: {
          required: true,
          message: '不能为空',
          trigger: 'change, blur'
        },

        supvModecd: {
          required: true,
          message: '不能为空',
          trigger: 'change, blur'
        },
        transMode: {
          required: true,
          message: '不能为空',
          trigger: 'change, blur'
        },
        tradeCountry: {
          required: true,
          message: '不能为空',
          trigger: 'change, blur'
        },
        tradingRegion: {
          required: true,
          message: '不能为空',
          trigger: 'change, blur'
        },
        districtCode: {
          required: true,
          message: '不能为空',
          trigger: 'change, blur'
        },
        destinationNatcd: {
          required: true,
          message: '不能为空',
          trigger: 'change, blur'
        },
        inExpType: { required: true, message: '不能为空', trigger: 'change' },
        ieTypecd: { required: true, message: '不能为空', trigger: 'change' },
        rltWhRecNo: { required: false, message: '不能为空', trigger: 'change' }
      }
    }
  },
  watch: {
    modelFlag(value) {
      if (!value) {
        this.Temporary = false
        this.$emit('nowFlagChange', false)
        this.$refs['Listdata'].reset()
        this.Listdata.id = ''
      }
    },
    fresh(value) {
      if (value) {
        let data = [] //表体
        let tableData = [] //关联单证
        //   warehousePort
        this.Listdata.dtDetailArr.forEach(Element => {
          let tranData = {
            chgTmsCnt: 0,
            orgId: this.$store.getters.getId,
            portNo: Element.preentNo,
            rtlTypecd: Element.grtNo,
            leadId: tableData.length,
            modfMarkcd: '3'
          }
          tableData.push(cloneObj(tranData))
          let t
          Element.portReleaseDt.forEach((e,index) => {
            this.$set(e, 'modfMarkcd', '3')
            t = e.gdsSeqno
            e.gdsSeqno = e.rltPortSeqno
            e.rltPortSeqno = t
            e.leadId = index
            data.push(e)
          })
          // data = [...data, ...e.portReleaseDt]
        })
        this.Listdata.warehouseReceiptDt = data
        this.Listdata.warehousePort = tableData
        this.modelFlag = true
      } else {
        this.$emit('success', true)
        this.modelFlag = false
      }
    },
    'Listdata.inExpType'(val, oldVal) {
      if (val == '1') {
        this.Listdata.dclcusFlag = '2'
        this.Listdata.dclcusTypecd = '1'
      } else if (val == '2') {
        this.Listdata.dclcusFlag = '2'
        this.Listdata.dclcusTypecd = '2'
      } else if (val == '3') {
        this.Listdata.dclcusFlag = '2'
        this.Listdata.dclcusTypecd = '2'
      } else if (val == '4') {
        this.Listdata.dclcusFlag = '1'
      } else if (val == '5') {
        this.Listdata.dclcusFlag = '2'
        this.Listdata.dclcusTypecd = '2'
      }
      if (val == '4' && this.Listdata.ieTypecd == 'E') {
        this.page_rules.rltWhRecNo.required = true
      } else {
        this.page_rules.rltWhRecNo.required = false
      }
    },
    'Listdata.ieTypecd'(val, oldVal) {
      if (this.Listdata.inExpType == '4' && val == 'E') {
        this.page_rules.rltWhRecNo.required = true
      } else {
        this.page_rules.rltWhRecNo.required = false
      }
    },
    'Listdata.grossWt'(val, oldVal) {
      // let reg = /\d+(\.\d{0,2})?/;
      // if (reg.test(val)) {
      //   setTimeout(() => {
      //     this.Listdata.grossWt = val.match(/\d+(\.\d{0,5})?/)[0] || "";
      //   });
      // } else {
      //   setTimeout(() => {
      //     this.Listdata.grossWt = "";
      //   });
      // }

      if (
        val &&
        val !== null &&
        val.charAt(0) == '0' &&
        val.length > 1 &&
        val.charAt(1) !== '.'
      ) {
        this.$pop({
          type: 'danger',
          message: '请输入正确的毛重'
        })
      }
      let reg = /^\d{0,14}(\.\d{0,5})?$/
      if (!reg.test(val)) {
        setTimeout(() => {
          this.Listdata.grossWt = oldVal
        })
      }
    }
  },

  mounted() {},
  methods: {
    close() {
      //关闭当前模块
      this.modelFlag = false
      this.$emit('success', true)
      this.$refs['Listdata'].reset()
    },

    // 完成
    declare() {
      if (!this.Listdata.id) {
        this.$pop({
          type: 'danger',
          message: '请先暂存!'
        })
        return
      }
      this.$post('wareHouseSubmit', { bscIds: [parseInt(this.Listdata.id)] })
        .then(res => {
          this.$emit('success', true)
          this.close()
        })
        .catch(() => {})
    },
    success(Listdata) {
      if (this.Listdata.id) {
        this.$pop({
          type: 'danger',
          message: '已暂存!'
        })
        return
      }
      console.log(this.Listdata)
      this.$refs['Listdata'].validate(valid => {
        if (valid) {
          this.$post('getStockBillDragSaveBsc', this.Listdata)
            .then(res => {
              this.Temporary = true
              this.Listdata.id = JSON.stringify(res.map.data)

              // this.close();
            })
            .catch(() => {})
        }
      })
    }
  }
}
</script>


<style scoped>
.ep-form--item.is-required:before {
  content: '*';
  color: #e74c3c;
  position: absolute;
  margin-top: 7px;
  margin-left: -7px;
}
.modelFlagbox {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  height: 620px;
  /* padding-bottom: 50px; */
  /* max-height: 710px; */
  /* overflow: auto; */
  /* justify-content: space-between;
  flex-wrap:wrap; */
}
.addgenerate {
  width: 35%;
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
  background: #fff;
}
.product {
  padding: 8px;
  width: 65%;
  /* padding: 10px; */
  display: flex;
  /* max-height: 710px;  */
  /* flex-wrap: wrap; */
  background: rgb(183, 211, 228);
  display: flex;
  height: 100%;
  overflow: auto;
  flex-direction: column;
}
.table {
  width: 100%;
}
.table a {
  color: rgb(194, 0, 5);
}
span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
p {
  margin: 0;
  font-size: 14px;
}
td {
  border: 1px solid #666;
  font-size: 14px;
}
input{
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
}
</style>
