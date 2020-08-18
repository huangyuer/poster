[<template>
  <div>
    <ep-model v-model="modelFlag" width="1150px" :wrap-close="false">
      <div class="modelFlagbox">
        <div class="product">
          <div class="table">
            <p style="height:60px;text-align:center;line-height:60px;font-size:25px;">进出区提发货凭证</p>
            <div style="">
              <p style="padding: 0 5px;padding-top: 10px;">
                <span style="padding:5px 0 ;width:48%;display: inline-block;">经营企业名称 :<a>{{this.$store.getters.getTradeName}}</a></span>
                <span style="padding:5px 0 ;width:48%;display: inline-block;">经营企业编码 : <a>{{this.$store.getters.getTradeCode}}</a></span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:100%;display: inline-block;">经营企业社会信用代码 : <a>{{this.$store.getters.getOrgCreditCode}}</a></span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:32%;display: inline-block;"> 业务类别:
                  <a v-for="item in businessTypelist" :key='item.index'>{{Listdata.businessTypecd==item.index?item.title:''}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">料件/成品标志 :

                  <a v-for="item in mtpckEndprdTypelist" :key='item.index'>{{Listdata.mtpckEndprdTypecd==item.index?item.title:''}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">运输方式 :
                  <a v-for="item in transfList" :key='item.trafCode'>{{Listdata.trspModecd==item.trafCode?item.trafSpec:''}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:32%;display: inline-block;">进出境关别 :
                  <a v-for="item in ImpexpPortcdInfo" :key='item.customCode'>{{Listdata.impexpPortcd==item.customCode?item.customName:''}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">毛重 : <a>{{Listdata.grossWt}}</a></span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">是否报关 :
                  <!-- <a v-for="item in stockBillType" :key='item.stockBillType'>{{(Listdata.data[0].stockBillType||'')==item.stockBillType?item.dclcusFlag:''}}</a> -->
                  <a>{{Listdata.data[0].stockBillType|transform}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:32%;display: inline-block;"> 报关类型:
                  <!-- <a v-for="item in stockBillType" :key='item.stockBillType'>{{(Listdata.data[0].stockBillType||'')==item.stockBillType?item.dclcusTypecd:''}}</a> -->
                  <a>{{Listdata.data[0].stockBillType|dclcusTypecd}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">ERP/WMS出入库类型 :
                  <!-- <a v-for="item in stockBillType" :key='item.stockBillType'>{{(Listdata.data[0].stockBillType||'')==item.stockBillType?item.billType:''}}</a> -->
                  <a>{{Listdata.data[0].stockBillType|billType}}</a>
                </span>
                <span style="padding:5px 0 ;width:32%;display: inline-block;">进出标志 : <a>{{Listdata.setMet}}</a></span>
              </p>
            </div>
          </div>
          <table style="border:1px solid #666;width:100%;border-collapse: collapse;">
            <tr>
              <td>商品料号</td>
              <td>商品名称</td>
              <td>规格型号</td>
              <td>数量
                <!-- 及单位 -->
              </td>
              <td>单价
                <!-- /总价 -->
              </td>
              <td>原产国（地区）</td>
              <!-- <td>序号</td>
              <td>报关单商品序号</td> -->
            </tr>
            <tr v-for="item in Listdata.data" :key='item.id'>
              <td>{{item.copGNo}}</td>
              <td>{{item.gName}}</td>
              <td>{{item.gModel}}</td>
              <td>{{item.qty}}
                <!-- /{{item.gUnit}} -->
              </td>
              <td>{{item.unitPrice}}
                <!-- /{{item.tradeTotal}} -->
              </td>
              <td>{{natcdTranslate(item.originCountryCode)}}</td>
              <!-- <td>{{item.gdsNm}}</td>
              <td>{{item.gdsMtno}}</td> -->
            </tr>
          </table>
        </div>

        <div class="addgenerate">
          <ep-form ref="Listdata" :rules="page_rules" :form="Listdata" name-width="5px">
            <ep-row :gutter="7">
              <ep-form-item attr="businessTypecd" label="">
                <ep-select placeholder='业务类别' v-model="Listdata.businessTypecd" name="businessTypecd">
                  <ep-select-item v-for="item in businessTypelist" :key='item.index' :index="item.index" :label="item.title"></ep-select-item>
                </ep-select>
              </ep-form-item>
              <ep-form-item attr="mtpckEndprdTypecd" label="">
                <ep-select placeholder='料件/成品标志' v-model="Listdata.mtpckEndprdTypecd" name="mtpckEndprdTypecd">
                  <ep-select-item v-for="item in mtpckEndprdTypelist" :key='item.index' :index="item.index" :label="item.title"></ep-select-item>
                </ep-select>
              </ep-form-item>
              <ep-form-item attr="trspModecd" label="">
                <loc-codemap-select placeholder="运输方式" :name="'trspModecd'" :code="'trafCode'" :cName="'trafSpec'" :dataList="transfList" :value.sync="Listdata.trspModecd"></loc-codemap-select>
              </ep-form-item>
              <ep-form-item attr="impexpPortcd" label="">
                <loc-codemap-select placeholder="进出境关别" :name="'impexpPortcd'" :code="'customCode'" :cName="'customName'" :dataList="ImpexpPortcdInfo" :type="'custom'"
                  :value.sync="Listdata.impexpPortcd"></loc-codemap-select>
              </ep-form-item>
              <ep-form-item attr="grossWt" label="">
                <ep-input placeholder="毛重" v-model="Listdata.grossWt" name="grossWt" :maxlength="20"></ep-input>
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
              </ep-form-item> -->
              <!-- <ep-form-item attr="supvModecd" label="">
                <loc-codemap-select placeholder="监管方式" :name="'supvModecd'" :code="'tradeMode'" :cName="'abbrTrade'" :dataList="supvInfo" :value.sync="Listdata.supvModecd"></loc-codemap-select>
              </ep-form-item> -->
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
    close() {
      //关闭当前模块
      this.modelFlag = false
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
        console.log(Listdata)
      this.Listdata.orgId = this.$store.getters.getId
      this.Listdata.supvModecd = this.Listdata.data[0].supvMode
      this.Listdata.destinationNatcd = this.Listdata.data[0].destinationCode
      this.Listdata.tradeCountry = this.Listdata.data[0].stshipTrsarvCode
      this.Listdata.tradingRegion = this.Listdata.data[0].tradeCountryCode
      this.Listdata.districtCode = this.Listdata.data[0].districtCode
      this.Listdata.transMode = this.Listdata.data[0].transMode
      this.Listdata.inExpType = this.Listdata.data[0].stockBillType
      this.Listdata.dclcusFlag = this.Listdata.data[0].stockBillType == '4' ? '1' : '2'
      this.Listdata.dclcusTypecd =  this.Listdata.data[0].stockBillType=="1"?"1":this.Listdata.data[0].stockBillType=="4"?"":"2"
      this.Listdata.ieTypecd = 'E'
      this.$refs['Listdata'].validate(valid => {
        if (valid) {
          this.$post('wareHouseSave', this.Listdata)
            .then(res => {
              this.$refs['Listdata'].reset()
              this.close()
            })
            .catch(() => {
            })
        }
      })
    }
  }
}
</script>


<style scoped>
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
