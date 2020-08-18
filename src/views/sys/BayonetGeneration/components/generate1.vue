<template>
  <div>
    <ep-model v-model="modelFlag" width="1150px" :wrap-close="false">
      <div class="modelFlagbox">
        <div class="product">
          <div class="table">
            <p style="height:60px;text-align:center;line-height:60px;font-size:25px;">出境径予放行自主声明</p>
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
                <span style="padding:5px 0 ;width:32%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                  提运单号:
                  <!-- <a v-for="item in businessTypelist" :key='item.index'>{{Listdata.billLodNo==item.index?item.title:''}}</a> -->
                  <a>{{Listdata.billLodNo}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                  英文船名 :
                  <!-- <a v-for="item in mtpckEndprdTypelist" :key='item.index'>{{Listdata.mtpckEndprdTypecd==item.index?item.title:''}}</a> -->
                  <a>{{Listdata.shipNameEn}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                  航次 :
                  <!-- <a v-for="item in transfList" :key='item.trafCode'>{{Listdata.trspModecd==item.trafCode?item.trafSpec:''}}</a> -->
                  <a>{{Listdata.voyageNo}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  毛重 :
                  <!-- <a v-for="item in ImpexpPortcdInfo" :key='item.customCode'>{{Listdata.impexpPortcd==item.customCode?item.customName:''}}</a> -->
                  <a>{{Listdata.grossWt}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  运输方式 :
                  <a v-for="item in trspModecdlist" :key="item.index">{{Listdata.trspModecd==item.index?item.title:''}}</a>
                </span>
                <!-- <span style="padding:5px 0 ;width:32%;display: inline-block;">是否报关 : -->
                <!-- <a v-for="item in stockBillType" :key='item.stockBillType'>{{(Listdata.data[0].stockBillType||'')==item.stockBillType?item.dclcusFlag:''}}</a> -->
                <!-- <a>{{dclcusFlag}}</a>
                </span>-->
              </p>

              <div class="one-item-select disabled">
                <!-- <ep-form-item> -->
                <div>
                  <ep-checkbox disabled style="margin-left: 5px" v-model="checkboxForm1">不属于国家禁止进出境货物;</ep-checkbox>
                </div>
                <div>
                  <ep-checkbox style="margin-left: 5px" v-model="checkboxForm2" disabled>不属于依法需进出境检疫的货物以及进境检验的大宗资源性商品、可用作原料的固体废物;</ep-checkbox>
                </div>
                <div>
                  <ep-checkbox style="margin-left: 5px" v-model="checkboxForm3" disabled>
                    不属于法律、法规等明确规定的,涉及我国缔结或者参加的国际条约、协定的,和涉及安全准入管理,
                    <br />&nbsp;&emsp;&emsp;必须在进出境环节验核相关监管证件的货物。
                  </ep-checkbox>
                </div>
                <!-- </ep-form-item> -->
              </div>
            </div>
          </div>
          <table style="border:1px solid #666;width:100%;border-collapse: collapse;">
            <tr>
              <td>商品料号</td>
              <td>商品名称</td>
              <td>规格型号</td>
              <td>
                数量
                <!-- 及单位 -->
              </td>
              <td>
                单价
                <!-- /总价 -->
              </td>
              <td>原产国（地区）</td>
              <!-- <td>序号</td>
              <td>报关单商品序号</td>-->
            </tr>
            <tr v-for="item in Listdata.data" :key="item.id">
              <td>{{item.copGNo}}</td>
              <td>{{item.gName}}</td>
              <td>{{item.gModel}}</td>
              <td>
                {{item.qty}}
                <!-- /{{item.gUnit}} -->
              </td>
              <td>
                {{item.unitPrice}}
                <!-- /{{item.tradeTotal}} -->
              </td>
              <td>{{natcdTranslate(item.originCountryCode)}}</td>
              <!-- <td>{{item.gdsNm}}</td>
              <td>{{item.gdsMtno}}</td>-->
            </tr>
          </table>
          <div>
            <div>集装箱号:</div>
            <div style="display: flex;flex-flow: wrap;">
              <div v-for="item in tableContainer" :key="item.id" style="height: 22px;line-height: 22px;width: 100px;text-align: center;border:1px solid #666;border-collapse: collapse;">
                {{item.container}}</div>
            </div>
          </div>

          <!-- <table style="border:1px solid #666;width:width: 200px;border-collapse: collapse;">
            <tr>
              <td>集装箱号</td>
            </tr>
            <tr v-for="item in tableContainer" :key='item.id'>
              <td>{{item.container}}</td>
            </tr>
          </table>-->
        </div>

        <div class="addgenerate">
          <ep-form ref="Listdata" :rules="page_rules" :form="Listdata" name-width="5px">
            <ep-row :gutter="7">
              <ep-form-item attr="billLodNo" label>
                <!-- <ep-select placeholder='业务类别' v-model="Listdata.billLodNo" name="billLodNo">
                  <ep-select-item v-for="item in businessTypelist" :key='item.index' :index="item.index" :label="item.title"></ep-select-item>
                </ep-select>-->
                <ep-input placeholder="提运单号" v-model="Listdata.billLodNo" name="billLodNo" :maxlength="64"></ep-input>
              </ep-form-item>
              <ep-form-item attr="shipNameEn" label>
                <!-- <ep-select placeholder='料件/成品标志' v-model="Listdata.mtpckEndprdTypecd" name="mtpckEndprdTypecd">
                  <ep-select-item v-for="item in mtpckEndprdTypelist" :key='item.index' :index="item.index" :label="item.title"></ep-select-item>
                </ep-select>-->
                <ep-input placeholder="英文船名" v-model="Listdata.shipNameEn" name="shipNameEn" :maxlength="150"></ep-input>
              </ep-form-item>
              <ep-form-item attr="voyageNo" label>
                <!-- <loc-codemap-select placeholder="运输方式" :name="'trspModecd'" :code="'trafCode'" :cName="'trafSpec'" :dataList="transfList" :value.sync="Listdata.trspModecd"></loc-codemap-select> -->
                <ep-input placeholder="航次" v-model="Listdata.voyageNo" name="voyageNo" :maxlength="20"></ep-input>
              </ep-form-item>
              <ep-form-item attr="grossWt" label>
                <!-- <loc-codemap-select placeholder="进出境关别" :name="'impexpPortcd'" :code="'customCode'" :cName="'customName'" :dataList="ImpexpPortcdInfo" :type="'custom'"
                :value.sync="Listdata.impexpPortcd"></loc-codemap-select>-->
                <ep-input placeholder="毛重" v-model="Listdata.grossWt" name="grossWt" :maxlength="20"></ep-input>
              </ep-form-item>
              <ep-form-item attr="trspModecd" label>
                <!-- <ep-input placeholder="毛重" v-model="Listdata.grossWt" name="grossWt" :maxlength="20"></ep-input> -->
                <ep-select placeholder="运输方式" v-model="Listdata.trspModecd" name="trspModecd">
                  <ep-select-item v-for="item in trspModecdlist" :key="item.index" :index="item.index" :label="item.title"></ep-select-item>
                </ep-select>
              </ep-form-item>
              <ep-form-item>
                <div style="padding-bottom: 8px;">
                  <ep-checkbox style v-model="checkboxForm1">不属于国家禁止进出境货物;</ep-checkbox>
                </div>
                <div style="padding-bottom: 8px;">
                  <ep-checkbox style v-model="checkboxForm2">
                    不属于依法需进出境检疫的货物以及进境检验的大宗
                    <br />&nbsp;&emsp;&emsp;资源性商品、可用作原料的固体废物;
                  </ep-checkbox>
                </div>
                <div>
                  <ep-checkbox style v-model="checkboxForm3">
                    不属于法律、法规等明确规定的,涉及我国缔结或者参
                    <br />&nbsp;&emsp;&emsp;加的国际条约、协定的,和涉及安全准入管理,必须在进
                    <br />&nbsp;&emsp;&emsp;出境环节验核相关监管证件的货物。
                  </ep-checkbox>
                </div>
              </ep-form-item>
              <ep-form-item>
                <!-- <ep-input placeholder="毛重" v-model="Listdata.grossWt" name="grossWt" :maxlength="20"></ep-input> -->

                <ep-input placeholder="集装箱号" v-model="formContainer.container" name="container" :maxlength="15"></ep-input>
                <ep-button type="success" size="small" @click="addContainer()" icon="checkmark-round" style="margin-top:10px;float: right;">新增</ep-button>
              </ep-form-item>
              <!-- <ep-form-item attr="dclcusFlag" label="">
                <ep-select placeholder="是否报关" v-model="Listdata.dclcusFlag" name="dclcusFlag" :disabled="false">
                  <ep-select-item v-for="item in dclcusFlaglist" :key='item.index' :index="item.index" :label="item.title"></ep-select-item>
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
        <ep-button type="success" size="small" @click="success(Listdata)" icon="checkmark-round">确认</ep-button>
        <ep-button type="danger" size="small" icon="close" @click="close()">关闭</ep-button>
      </div>
    </ep-model>
  </div>
</template>



<script>
import misList from 'src/common/mislist'
import mixin from '../mixin'
import { cloneObj } from '../../../../utils/data'
export default {
  mixins: [mixin],
  extends: misList,
  props: {
    fresh: {
      type: Boolean
    },
    Listdata: {
      type: Object
    }
  },
  components: {},
  data() {
    return {
      formContainer: {
        container: ''
      },
      tableContainer: [],
      checkboxForm1: false,
      checkboxForm2: false,
      checkboxForm3: false,
      timer: '',
      modelFlag: false,
      trspModecdlist: [
        { index: '1', title: '海运' },
        { index: '2', title: '空运' }
      ],
      businessTypelist: [
        { index: '1', title: '中转' },
        { index: '2', title: '集拼' },
        { index: '3', title: '存储' },
        { index: '4', title: '加工' },
        { index: '5', title: '交易' },
        { index: '6', title: '展示' },
        { index: '7', title: '研发' },
        { index: '8', title: '再制造' },
        { index: '9', title: '检测维修' }
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
        billLodNo: {
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
        }
        // dclcusFlag: {
        //   required: true,
        //   message: '不能为空',
        //   trigger: 'change, blur'
        // },
        // dclcusTypecd: {
        //   required: true,
        //   message: '不能为空',
        //   trigger: 'change, blur'
        // }
      }
    }
  },
  computed: {},
  watch: {
    modelFlag(value) {
      if (!value) {
        this.$emit('nowFlagChange', false)
        this.$refs['Listdata'].reset()
        this.checkboxForm1 = false
        this.checkboxForm2 = false
        this.checkboxForm3 = false
        this.tableContainer = []
        this.formContainer.container = ''
      }
    },
    fresh(value) {
      if (value) {
        console.log(this.Listdata, 'Listdata')
        this.modelFlag = true
      } else {
        this.modelFlag = false
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

  mounted() {
    // this.time()
  },
  methods: {
    addContainer() {
      console.log('-3-2-=====', this.container)
      if (this.formContainer.container) {
        this.tableContainer.push(cloneObj(this.formContainer))
        this.formContainer.container = ''
      }
    },
    close() {
      //关闭当前模块
      this.modelFlag = false
      //   this.$refs['Listdata'].reset()
    },

    time() {
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      let H = date.getHours()
      let mm = date.getMinutes()
      let s = date.getSeconds()
      m = m < 10 ? '0' + m : m
      d = d < 10 ? '0' + d : d
      H = H < 10 ? '0' + H : H
      let timer = `${y + '-' + m + '-' + d + ' '}`
      this.Listdata.createTime = timer
    },
    success(Listdata) {
      if (this.checkboxForm1 && this.checkboxForm2 && this.checkboxForm3) {
        this.Listdata.agreeConfirm = 1
      } else {
        this.Listdata.agreeConfirm = 2
      }
      if (this.Listdata.agreeConfirm == 2) {
        this.$pop({
          type: 'danger',
          message: '未承诺货物符合径予放行条件的径予放行货物自主声明无法暂存!'
        })
        return
      }
      let bodyFormCopy = cloneObj(this.Listdata)
      //   bodyFormCopy["billDirExpDt"] = this.tableDataCopy;
      bodyFormCopy['billDirExpCon'] = this.tableContainer

      //   this.Listdata.orgId = this.$store.getters.getId
      //   this.Listdata.supvModecd = this.Listdata.data[0].supvMode
      //   this.Listdata.destinationNatcd = this.Listdata.data[0].destinationCode
      //   this.Listdata.tradeCountry = this.Listdata.data[0].stshipTrsarvCode
      //   this.Listdata.tradingRegion = this.Listdata.data[0].tradeCountryCode
      //   this.Listdata.districtCode = this.Listdata.data[0].districtCode
      //   this.Listdata.transMode = this.Listdata.data[0].transMode
      //   this.Listdata.inExpType = this.Listdata.data[0].stockBillType
      //   this.Listdata.dclcusFlag = this.dclcusFlag == '是' ? '2' : '1'
      //   this.Listdata.dclcusTypecd = this.dclcusTypecd == '关联报关' ? '1' : '2'
      //   this.Listdata.ieTypecd = 'E'
      this.$refs['Listdata'].validate(valid => {
        if (valid) {
          this.$post('billDirExpDtSave', bodyFormCopy)
            .then(res => {
              this.$refs['Listdata'].reset()
              this.close()
            })
            .catch(() => {
              this.saveLoading = false
            })
        }
      })
    }
  }
}
</script>


<style scoped>
.ep-checkbox--input.is-checked > .ep-checkbox--inner:after {
  border: 2px solid rgb(194, 0, 5) !important;
}
.modelFlagbox {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 50px;
  /* justify-content: space-between;
  flex-wrap:wrap; */
}
.addgenerate {
  width: 35%;
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
}
.product {
  padding: 8px;
  width: 65%;
  /* padding: 10px; */
  display: flex;
  flex-wrap: wrap;
  background: rgb(183, 211, 228);
}
.table {
  width: 100%;
}
.table a {
  color: rgb(194, 0, 5);
}

p {
  margin: 0;
  font-size: 14px;
}
td {
  border: 1px solid #666;
  font-size: 14px;
}
</style>
