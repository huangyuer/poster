<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">
          <WmsButton @click="doDeclare">确认</WmsButton>
          <!-- <WmsButton  @click="resetDynamic('bodyForm')">重置</WmsButton> -->
          <template>
            <div style="position:relative;display:inline-block">

              <el-upload class="import-upload" multiple name="file" ref="upload" :action="uploadUrl" :headers="headers" :data="uploadParams" :before-upload="handleBeforeUpload"
                :on-success="handleUploadSuccess" :on-error="handleUploadError" :show-file-list="false">
                <WmsButton>导入</WmsButton>
              </el-upload>
            </div>
          </template>
        </div>
        <ep-form ref="bodyForm" :form="bodyForm" name-width="150px">
          <ep-tabs :active="types" @change="changeApi">
            <ep-tab-item name="映射表头">

              <ep-row :gutter="20">
                <ep-col :col="8" v-for="(item,index) in bodyForm.list" :key="index">
                  <ep-form-item :label="item.name" :attr="'list.'+index+'.myValue'" :rule="item.page_rule">
                    <ep-select v-model="item.myValue" @change="itemChange(item)" :name="item.values">
                      <ep-select-item :index="items.tradePropName" :label="items.tradePropName+':'+items.value" v-for="(items,index) in list1" :key="index" :disabled="items.disabled"></ep-select-item>
                    </ep-select>

                  </ep-form-item>
                  <template>
                    <div v-show="item.showtype==1" class="showtype">
                      <span @click="changeshow(item)" v-show="item.myValue">
                        <ep-icon icon="plus-round" disabled shadow theme="dark" size="small" v-show="!item.show"></ep-icon>
                        <ep-icon icon="minus" disabled shadow theme="dark" size="small" v-show="item.show"></ep-icon>
                      </span>
                      <div v-show="item.show" class="showinput" v-for="(itemsin,index) in item.valueMapping" :key="index">
                        <ep-form-item :label="itemsin.name" :attr="itemsin.preIncreaseValue">
                          <ep-input v-model="itemsin.tradeValue" :name="itemsin.preIncreaseValue" :maxlength="2"></ep-input>
                        </ep-form-item>
                      </div>
                    </div>
                  </template>
                </ep-col>

              </ep-row>
            </ep-tab-item>

            <ep-tab-item name="映射表体">
              <ep-row :gutter="20">
                <ep-col :col="8" v-for="(item,index) in bodyForm.listArray" :key="index">
                  <ep-form-item :label="item.name" :attr="'listArray.'+index+'.myValue'" :rule="item.page_rule">
                    <ep-select v-model="item.myValue" @change="itemChange(item)" :name="item.preIncreaseName">
                      <ep-select-item :index="items.tradePropName" :label="items.tradePropName+':'+items.value" v-for="(items,index) in list1" :key="index" :disabled="items.disabled"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>

              </ep-row>

            </ep-tab-item>
          </ep-tabs>
        </ep-form>
      </div>
    </div>
  </div>
</template>

<script>
import misList from 'src/common/mislist'
import { cloneObj, getToken, getId } from 'utils'
import mixin from './mixin'
export default {
  name: 'drawvalue',
  extends: misList, // 务必继承
  mixins: [mixin, misList],
  data() {
    var test = (rule, value, callback) => {
      let nowValue = this.bodyForm.listArray.find(
        item => item.preIncreaseName == 'qty'
      ).value
      let test = /^\d{1,}$/
      if (test.test(nowValue)) {
        callback()
      } else {
        callback(new Error('请查看选择的类型是否正确'))
      }
    }
    var testdclTotalAmt = (rule, value, callback) => {
      // let nowValue = this.listArray.find(item=>item.myValue).value
      let nowValue1 = this.bodyForm.listArray.find(
        item => item.preIncreaseName == 'tradeTotal'
      ).value
      let testdclTotalAmt = /^\d{0,13}(\.\d{0,5})?$/
      if (testdclTotalAmt.test(nowValue1)) {
        callback()
      } else {
        callback(new Error('请选择正确的总价'))
      }
    }
    var testnetWt = (rule, value, callback) => {
      // let nowValue = this.listArray.find(item=>item.myValue).value
      let nowValue2 = this.bodyForm.listArray.find(
        item => item.preIncreaseName == 'netWt'
      ).value
      let testnetWt = /^\d{0,13}(\.\d{0,5})?$/
      if (testnetWt.test(nowValue2)) {
        callback()
      } else {
        callback(new Error('请选择正确的净重'))
      }
    }
    var testdclUprcAmt = (rule, value, callback) => {
      // let nowValue = this.listArray.find(item=>item.myValue).value
      let nowValue3 = this.bodyForm.listArray.find(
        item => item.preIncreaseName == 'unitPrice'
      ).value
      let testdclUprcAmt = /^\d{0,13}(\.\d{0,5})?$/
      if (testdclUprcAmt.test(nowValue3)) {
        callback()
      } else {
        callback(new Error('请选择正确的单价'))
      }
    }
    var testgrossWt = (rule, value, callback) => {
      let nowValue = this.bodyForm.list.find(
        item => item.preIncreaseName == 'grossWtTotal'
      ).value
      let testgrossWt = /^\d{0,13}(\.\d{0,5})?$/
      if (testgrossWt.test(nowValue)) {
        callback()
      } else {
        callback(new Error('请选择正确的毛重'))
      }
    }
    return {
      loading: false,
      saveLoading: false, //暂存loading
      pageFlag: false,
      headColor: true,
      showSearch: false,
      localType: '',
      show: true,
      none: false,
      valuemap: '',
      btnFlag: false,
      uploadData: {},
      valueA: '',
      valueB: '',
      types: '映射表头',

      page_rules: {
        stockBillType: {
          required: true,
          message: '不能为空',
          trigger: 'change'
        },
        stockBillNoPre: {
          required: true,
          message: '不能为空',
          trigger: 'change'
        },
        stockType: {
          required: true,
          message: '不能为空',
          trigger: 'change'
        },
        tradeName: {
          required: true,
          message: '不能为空',
          trigger: 'change'
        },
        tradeCode: {
          required: true,
          message: '不能为空',
          trigger: 'change'
        },
        tradeSccd: {
          required: true,
          message: '不能为空',
          trigger: 'change'
        },
        masterCuscd: {
          required: true,
          message: '不能为空',
          trigger: 'change'
        },
        copGNo: {
          required: true,
          message: '不能为空',
          trigger: 'change'
        },
        qty: {
          required: true,
          message: '不能为空',
          trigger: 'change'
        },
        GUnit: {
          required: true,
          message: '不能为空',
          trigger: 'change'
        }
      },
      bodyForm: {
        list: [
          {
            name: '关联报关单编号',
            values: 'rltEntryNo',
            value: '',
            myValue: '',
            preIncreaseName: 'rltEntryNo',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '进出类型',
            values: 'stockBillType',
            value: '',
            myValue: '',
            preIncreaseName: 'stockBillType',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: '',
            page_rule: {
              required: true,
              message: '不能为空',
              trigger: 'change'
            }
          },
          {
            name: 'ERP/WMS预出入库单编号',
            values: 'stockBillNoPre',
            value: '',
            myValue: '',
            preIncreaseName: 'stockBillNoPre',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: '',
            page_rule: {
              required: true,
              message: '不能为空',
              trigger: 'change'
            }
          },
          {
            name: 'ERP/WMS实际出库单编号',
            values: 'stockBillNo',
            value: '',
            myValue: '',
            preIncreaseName: 'stockBillNo',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '库存类型',
            values: 'stockType',
            value: '',
            myValue: '',
            preIncreaseName: 'stockType',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: '',
            page_rule: {
              required: true,
              message: '不能为空',
              trigger: 'change'
            }
          },
          {
            name: '出入库类型',
            values: 'billType',
            value: '',
            myValue: '',
            preIncreaseName: 'billType',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '经营企业名称',
            values: 'tradeName',
            value: '',
            myValue: '',
            preIncreaseName: 'tradeName',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: '',
            page_rule: {
              required: true,
              message: '不能为空',
              trigger: 'change'
            }
          },
          {
            name: '经营企业单位编码',
            values: 'tradeCode',
            value: '',
            myValue: '',
            preIncreaseName: 'tradeCode',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: '',
            page_rule: {
              required: true,
              message: '不能为空',
              trigger: 'change'
            }
          },
          {
            name: '经营企业社会信用代码',
            values: 'tradeSccd',
            myValue: '',
            value: '',
            preIncreaseName: 'tradeSccd',
            type: '',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: '',
            page_rule: {
              required: true,
              message: '不能为空',
              trigger: 'change'
            }
          },
          {
            name: '主管海关',
            values: 'masterCuscd',
            value: '',
            myValue: '',
            preIncreaseName: 'masterCuscd',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: '',
            page_rule: {
              required: true,
              message: '不能为空',
              trigger: 'change'
            }
          },
          {
            name: '提运单号',
            values: 'billNo',
            value: '',
            myValue: '',
            preIncreaseName: 'billNo',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '英文船名',
            values: 'shipNameEn',
            value: '',
            myValue: '',
            preIncreaseName: 'shipNameEn',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '航次',
            values: 'voyageNo',
            value: '',
            myValue: '',
            preIncreaseName: 'voyageNo',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '总毛重',
            values: 'grossWtTotal',
            value: '',
            myValue: '',
            preIncreaseName: 'grossWtTotal',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '运输方式',
            values: 'trafMode',
            value: '',
            myValue: '',
            preIncreaseName: 'trafMode',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '业务类别',
            values: 'businessType',
            value: '',
            myValue: '',
            preIncreaseName: 'businessType',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '料件成品标志',
            values: 'classifyType',
            value: '',
            myValue: '',
            type: '1',
            show: false,
            preIncreaseName: 'classifyType',
            tradePropName: '',
            valueMapping: [
              {
                orgId: this.$store.getters.getId,
                preIncreaseName: 'classifyType',
                preIncreaseValue: 'I',
                tradeValue: '',
                name: '料件I'
              },
              {
                orgId: this.$store.getters.getId,
                preIncreaseName: 'classifyType',
                preIncreaseValue: 'E',
                tradeValue: '',
                name: '成品E'
              },
              {
                orgId: this.$store.getters.getId,
                preIncreaseName: 'classifyType',
                preIncreaseValue: 'S',
                tradeValue: '',
                name: '设备S'
              }
            ],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: '',
            showtype: '1'
          },
          {
            name: '监管方式',
            values: 'supvMode',
            value: '',
            myValue: '',
            type: '',
            preIncreaseName: 'supvMode',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '进出境关别',
            values: 'iEPort',
            value: '',
            myValue: '',
            preIncreaseName: 'iEPort',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '成交方式',
            values: 'transMode',
            value: '',
            myValue: '',
            preIncreaseName: 'transMode',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '启运国/运抵国',
            values: 'stshipTrsarvCode',
            value: '',
            myValue: '',
            preIncreaseName: 'stshipTrsarvCode',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '贸易国代码（地区）',
            values: 'tradeCountryCode',
            value: '',
            myValue: '',
            preIncreaseName: 'tradeCountryCode',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '境内目的地、境内货源地',
            values: 'districtCode',
            value: '',
            myValue: '',
            preIncreaseName: 'districtCode',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '最终目的国代码（地区）',
            values: 'destinationCode',
            value: '',
            myValue: '',
            preIncreaseName: 'destinationCode',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },

          {
            name: '仓库号',
            values: 'whNo',
            value: '',
            myValue: '',
            preIncreaseName: 'whNo',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '库位',
            values: 'whLoc',
            value: '',
            myValue: '',
            preIncreaseName: 'whLoc',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '客户订单号',
            values: 'orderNo',
            value: '',
            myValue: '',
            preIncreaseName: 'orderNo',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '货主名称',
            values: 'ownerName',
            value: '',
            myValue: '',
            preIncreaseName: 'ownerName',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '备选1',
            values: 'col1',
            value: '',
            myValue: '',
            preIncreaseName: 'col1',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '备选2',
            values: 'col2',
            value: '',
            myValue: '',
            preIncreaseName: 'col2',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '备选3',
            values: 'col3',
            value: '',
            myValue: '',
            preIncreaseName: 'col3',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '备选4',
            values: 'col4',
            value: '',
            myValue: '',
            preIncreaseName: 'col4',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          },
          {
            name: '备注',
            values: 'rmk',
            value: '',
            myValue: '',
            preIncreaseName: 'rmk',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '1',
            dataLevel: ''
          }
          // {name:'进出类型',values:'ieTypecd',value:'',type:"1",show:false,preIncreaseName:"ieTypecd",tradePropName:'',valueMapping:[
          //     { orgId: this.$store.getters.getId,preIncreaseName:'',preIncreaseValue:'I',tradeValue:'',name:'进口I'},
          //     { orgId: this.$store.getters.getId,preIncreaseName:'',preIncreaseValue:'E',tradeValue:'',name:'出口E'}],
          //     valuemap:'', orgId: this.$store.getters.getId,id:'',type:"1",dataLevel:'',showtype:'1'},
          //   {
          //     name: '创建时间',
          //     values: 'stockDate',
          //     value: '',
          //     myValue: '',
          //     preIncreaseName: 'stockDate',
          //     tradePropName: '',
          //     valueMapping: [],
          //     orgId: this.$store.getters.getId,
          //     id: '',
          //     type: '1',
          //     dataLevel: ''
          //   },
          //   {
          //     name: '业务类别',
          //     values: 'businessType',
          //     value: '',
          //     myValue: '',
          //     preIncreaseName: 'businessType',
          //     tradePropName: '',
          //     valueMapping: [],
          //     orgId: this.$store.getters.getId,
          //     id: '',
          //     type: '1',
          //     dataLevel: ''
          //   }
        ],

        listArray: [
          {
            name: '报关单商品序号',
            values: 'entryGdsSeqno',
            value: '',
            myValue: '',
            preIncreaseName: 'entryGdsSeqno',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: ''
          },
          {
            name: '商品料号',
            values: 'copGNo',
            value: '',
            myValue: '',
            preIncreaseName: 'copGNo',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: '',
            page_rule: {
              required: true,
              message: '不能为空',
              trigger: 'change'
            }
          },
          {
            name: '商品编码',
            values: 'hsCode',
            value: '',
            type: '',
            myValue: '',
            preIncreaseName: 'hsCode',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: ''
          },
          {
            name: '商检编码',
            values: 'ciqCode',
            value: '',
            type: '',
            myValue: '',
            preIncreaseName: 'ciqCode',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: ''
          },
          //   {
          //     name: 'ERP/WMS预出入库单编号',
          //     values: 'stockBillNoPre',
          //     value: '',
          //     myValue: '',
          //     preIncreaseName: 'stockBillNoPre',
          //     tradePropName: '',
          //     valueMapping: [],
          //     orgId: this.$store.getters.getId,
          //     id: '',
          //     type: '1',
          //     dataLevel: '',
          //     page_rule: {
          //       required: true,
          //       message: '不能为空',
          //       trigger: 'change'
          //     }
          //   },
          {
            name: '商品名称',
            values: 'GName',
            value: '',
            myValue: '',
            preIncreaseName: 'GName',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: ''
          },
          {
            name: '商品规格型号',
            values: 'GModel',
            value: '',
            myValue: '',
            preIncreaseName: 'GModel',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: ''
          },
          {
            name: '数量',
            values: 'qty',
            value: '',
            myValue: '',
            preIncreaseName: 'qty',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: '',
            page_rule: {
              required: true,
              message: '不能为空',
              trigger: 'change'
            }
          },
          {
            name: '数量单位',
            values: 'GUnit',
            value: '',
            myValue: '',
            preIncreaseName: 'GUnit',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: '',
            page_rule: {
              required: true,
              message: '不能为空',
              trigger: 'change'
            }
          },
          {
            name: '单价',
            values: 'unitPrice',
            value: '',
            myValue: '',
            preIncreaseName: 'unitPrice',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: ''
          },
          {
            name: '总价',
            values: 'tradeTotal',
            value: '',
            myValue: '',
            preIncreaseName: 'tradeTotal',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: ''
          },
          {
            name: '币制',
            values: 'tradeCurr',
            value: '',
            myValue: '',
            preIncreaseName: 'tradeCurr',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: ''
          },

          {
            name: '法定数量',
            values: 'qty1',
            value: '',
            myValue: '',
            preIncreaseName: 'qty1',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: ''
          },
          {
            name: '法定单位',
            values: 'unit1',
            value: '',
            myValue: '',
            preIncreaseName: 'unit1',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: ''
          },
          {
            name: '法定第二数量',
            values: 'qty2',
            value: '',
            myValue: '',
            preIncreaseName: 'qty2',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: ''
          },
          {
            name: '法定第二计量单位',
            values: 'unit2',
            value: '',
            myValue: '',
            preIncreaseName: 'unit2',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: ''
          },
          {
            name: '原产国（地区）',
            values: 'originCountryCode',
            value: '',
            myValue: '',
            preIncreaseName: 'originCountryCode',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: ''
          },

          {
            name: '净重',
            values: 'netWt',
            value: '',
            myValue: '',
            preIncreaseName: 'netWt',
            type: '',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: ''
          },
          {
            name: '毛重',
            values: 'grossWt',
            value: '',
            myValue: '',
            preIncreaseName: 'grossWt',
            tradePropName: '',
            valueMapping: [],
            orgId: this.$store.getters.getId,
            id: '',
            type: '2',
            dataLevel: ''
          }
        ]
      },
      model: false,
      tableData: [], // 表体表格
      containers: [],
      tableDataCopy: [],
      ep_page: {
        page: 1,
        size: 10
      },
      totalcount: 0,
      nowData: '',
      preIncreaseName: '',

      finalList: [],
      uploadParam: {
        sysCode: 'nepz',
        orgId: this.$store.getters.getId,
        userId: this.$store.getters.getUserId,
        userName: this.$store.getters.getUserName,
        customId: this.$store.getters.getCustomId,
        tradeCode: this.$store.getters.getTradeCode,
        tradeName: this.$store.getters.getTradeName,
        creditCode: this.$store.getters.getCreditCode,
        orgCode: this.$store.getters.getOrgCode,
        orgType: this.$store.getters.getOrgType,
        organizationCode: this.$store.getters.getOrganizationCode,
        organizationName: this.$store.getters.getOrganizationName,
        orgCreditCode: this.$store.getters.getOrgCreditCode,
        orgCustomId: this.$store.getters.getOrgCustomId,
        fileName: ''
      },
      list1: [],
      list2: [],
      listData: [],
      data: [],
      judge: false
    }
  },
  created() {
    this.listData = cloneObj(this.bodyForm)
  },
  mounted() {},
  computed: {
    headers() {
      return {
        token: getToken(),
        orgId: getId()
      }
    },
    // 设置上传地址
    uploadUrl() {
      return global.HOST + '/preIncrease/upload'
    },
    // 请求的额外参数
    uploadParams() {
      if (this.uploadType == 0) {
        return Object.assign(this.uploadParam, this.uploadData)
      } else {
        this.uploadParam.sysCode = this.uploadData.sysCode
        return Object.assign(this.uploadParam, this.uploadData)
      }
    }
  },
  methods: {
    // resetDynamic() {
    //   this.$refs.bodyForm.reset()
    //   console.log(this.$refs.bodyForm)
    //   },
    changeApi(val) {
      //   console.log(val)
      this.types = val
      if (val == '映射表体') {
        this.judge = true
      }
      //   judge
    },
    changeshow(item) {
      item.show = !item.show
    },
    itemChange(value) {
      this.list1.forEach((item, index) => {
        if (item.tradePropName == value.myValue) {
          // value.preIncreaseName = item.tradePropName
          value.tradePropName = item.tradePropName
          // console.log( value.value , item.value)
          value.value = item.value
          value.orgId = item.orgId
          value.id = item.id
          value.dataLevel = item.dataLevel
        }
        this.$set(item, 'disabled', false)
      })

      //   this.list1.forEach(item => {
      //     this.$set(item, 'disabled', false)
      //   })
      for (let i = 0; i < this.bodyForm.list.length; i++) {
        for (let j = 0; j < this.list1.length; j++) {
          // console.log(this.list[i].tradePropName)
          if (
            this.bodyForm.list[i].tradePropName == this.list1[j].tradePropName
          ) {
            this.$set(this.list1[j], 'disabled', true)
            break
          }
        }
      }
      for (let i = 0; i < this.bodyForm.listArray.length; i++) {
        for (let j = 0; j < this.list1.length; j++) {
          // console.log(this.list[i].tradePropName)
          if (
            this.bodyForm.listArray[i].tradePropName ==
            this.list1[j].tradePropName
          ) {
            this.$set(this.list1[j], 'disabled', true)
            break
          }
        }
      }
      if (value.myValue == '') {
        this.list1.forEach((item, index) => {
          if (value.tradePropName == item.tradePropName) {
            this.$set(item, 'disabled', false)
          }
        })
      }
      this.bodyForm.list.forEach(item => {
        let name = item.preIncreaseName
        let value = item.value
        // console.log(item)
        // item.valueMapping.forEach(itm => {
        // //   if (item.valueMapping.preIncreaseValue) {
        // //   }
        // console.log(itm,11111)
        //   itm.preIncreaseName = name
        //   itm.tradeValue = this.tradeValue
        // })
      })
    },
    change() {
      this.$forceUpdate()
      this.preIncreaseName = this.tradePropName
    },
    focus(item) {},
    doDeclare() {
      // this.list.forEach(item=>{
      //   if(item.values=='mtpckEndproTypecd'){
      //     this.valueA= item.value
      //   }
      //   if(item.values=='ieTypecd'){
      //     this.valueB =item.value
      //   }
      // })
      if (this.judge == false) {
        this.types = '映射表体'
      }
      setTimeout(() => {
        this.$refs['bodyForm'].validate(valid => {
          if (!valid) {
            this.$pop({
              type: 'danger',
              message: '表单验证失败!'
            })
            return
          } else {
            this.finalList = [...this.bodyForm.list, ...this.bodyForm.listArray]
            this.$post('saveMappingRelation', this.finalList).then(res => {
              this.list1 = cloneObj(this.data)
              this.bodyForm = cloneObj(this.listData)
              this.$refs.bodyForm.reset()
            })
          }
        })
      }, 100)
    },
    handleBeforeUpload(file) {
      this.uploadParams.fileName = file.name

      let fileName = file.name.split('.')
      let isxls = fileName[fileName.length - 1] === 'xls'
      let isxlsx = fileName[fileName.length - 1] === 'xlsx'
      let istxt = fileName[fileName.length - 1] === 'txt'
      let isxml = fileName[fileName.length - 1] === 'xml'
      let isXML = fileName[fileName.length - 1] === 'XML'
      let isLt2M = file.size / 1024 / 1024 < 2

      if (!isxls && !isxlsx && !istxt && !isxml && !isXML) {
        this.$pop({
          type: 'danger',
          message: '上传模板只能是xls、xlsx、txt、xml,格式!'
        })
        return false
      }

      if (!isLt2M) {
        this.$pop({
          type: 'danger',
          message: '上传模板大小不能超过2M!'
        })
        return false
      }
    },

    // 上传成功回调
    handleUploadSuccess(response, file, fileList) {
      if (response.status == '1') {
        this.$pop({
          type: 'success',
          message: response.note
        })
        this.$refs.bodyForm.reset()
        this.data = cloneObj(response.map.data)
        this.data.map(item => {
          item.disabled = false
        })
        this.bodyForm = cloneObj(this.listData)
        this.list1 = cloneObj(this.data)

        // console.log(this.list1)
        // this.list2 =cloneObj(this.list1)
        // this.$router.push({name: "Excel导入"});
      }
    },

    // 上传失败回调
    handleUploadError(err, file, fileList) {
      console.log(err)
    }
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true
        return
      }
      this.$nextTick(() => {
        this.delayedDragging = false
      })
    }
  }
}
</script>
<style  scoped>
.ep-form--item .ep-form--content {
  display: flex !important;
}
.showtype {
  margin-top: 5px;
  position: relative;
}
.showinput {
  margin-top: 5px;
}
.showtype span {
  position: absolute;
  top: -50px;
  right: -36px;
}
.ep-icon-dark {
  color: #27ae60;
}
</style>