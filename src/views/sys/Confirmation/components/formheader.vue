<template>
  <div>
    <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="194px">
      <ep-row :gutter="10">
        <ep-col :col="8">
          <ep-form-item label="进出类型" attr="stockBillType">
            <ep-select v-model="bodyForm.stockBillType" name="stockBillType" disabled>
              <ep-select-item index="1" label="进库"></ep-select-item>
              <ep-select-item index="2" label="出库"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="ERP/WMS预出入库单编号" attr="stockBillNoPre">
            <ep-input disabled v-model="bodyForm.stockBillNoPre" name="stockBillNoPre"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="ERP/WMS实际出库单编号" attr="stockBillNo">
            <ep-input disabled v-model="bodyForm.stockBillNo" name="stockBillNo"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="库存类型" attr="stockType">
            <ep-select disabled v-model="bodyForm.stockType" name="stockType">
              <ep-select-item index="1" label="保税"></ep-select-item>
              <ep-select-item index="2" label="非保"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="出入库类型" attr="billType">
            <ep-select v-model="bodyForm.billType" name="billType" disabled>
              <ep-select-item index="1" label="一线"></ep-select-item>
              <ep-select-item index="2" label="二线"></ep-select-item>
              <ep-select-item index="3" label="区内"></ep-select-item>
              <ep-select-item index="4" label="区间"></ep-select-item>
              <ep-select-item index="5" label="径予"></ep-select-item>
              <ep-select-item index="6" label="分送集报"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>

        <ep-col :col="8">
          <ep-form-item label="经营企业单位编码" attr="tradeCode">
            <ep-input disabled v-model="bodyForm.tradeCode" name="tradeCode"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="经营企业名称" attr="tradeName">
            <ep-input disabled v-model="bodyForm.tradeName" name="tradeName"></ep-input>
          </ep-form-item>
        </ep-col>

        <ep-col :col="8">
          <ep-form-item label="经营企业社会信用代码" attr="tradeSccd">
            <ep-input disabled v-model="bodyForm.tradeSccd" name="tradeSccd"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="主管海关" attr="masterCuscd">
            <loc-codemap-select
              :name="'masterCuscd'"
              :code="'customCode'"
              :cName="'customName'"
              :dataList="ImpexpPortcdInfo"
              :type="'custom'"
              :value.sync="bodyForm.masterCuscd"
              :disabled="true"
            ></loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="提运单号" attr="billNo">
            <ep-input v-model="bodyForm.billNo" name="billNo" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="英文船名" attr="shipNameEn">
            <ep-input v-model="bodyForm.shipNameEn" name="shipNameEn" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="航次" attr="voyageNo">
            <ep-input v-model="bodyForm.voyageNo" name="voyageNo" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="毛重" attr="grossWt">
            <ep-input v-model="bodyForm.grossWt" name="grossWt" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="运输方式" attr="trafMode">
            <ep-date v-model="bodyForm.trafMode" name="trafMode" disabled></ep-date>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="业务类别" attr="businessType">
            <ep-select v-model="bodyForm.businessType" name="businessType" disabled>
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
          <ep-form-item label="料件成品标志" attr="classifyType">
            <ep-select v-model="bodyForm.classifyType" name="classifyType" disabled>
              <ep-select-item index="I" label="料件"></ep-select-item>
              <ep-select-item index="E" label="成品"></ep-select-item>
              <ep-select-item index="S" label="设备"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="监管方式" attr="supvMode">
            <loc-codemap-select
              :name="'supvMode'"
              :code="'tradeMode'"
              :cName="'abbrTrade'"
              :dataList="supvInfo"
              :value.sync="bodyForm.supvMode"
              :disabled="true"
            ></loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="进出境关别" attr="ieport">
            <loc-codemap-select
              :name="'ieport'"
              :code="'customCode'"
              :cName="'customName'"
              :dataList="ImpexpPortcdInfo"
              :type="'custom'"
              :value.sync="bodyForm.ieport"
              :disabled="true"
            ></loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="成交方式" attr="transMode">
            <ep-select
              :disabled="true"
              :label="TransacList"
              v-model="bodyForm.transMode"
              name="transMode"
            >
              <ep-select-item
                v-for="(item, index) in TransacList"
                :key="index"
                :index="item.transMode"
                :label="item.transSpec + ' ' + item.transMode"
              ></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="启运国/运抵国代码（地区）" attr="STSHIP_TRSARV_CODE">
            <loc-codemap-select
              :disabled="true"
              :name="'stshipTrsarvCode'"
              :code="'countryCode'"
              :cName="'nameCn'"
              :dataList="countrys"
              :value.sync="bodyForm.stshipTrsarvCode"
            ></loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="贸易国代码（地区）" attr="tradeCountryCode">
            <loc-codemap-select
              :disabled="true"
              :name="'tradeCountryCode'"
              :code="'countryCode'"
              :cName="'nameCn'"
              :dataList="countrys"
              :value.sync="bodyForm.tradeCountryCode"
            ></loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="境内目的地/货源地代码" attr="districtCode">
            <loc-codemap-select
              :disabled="true"
              :name="'districtCode'"
              :code="'districtCode'"
              :cName="'districtName'"
              :dataList="districtList"
              :value.sync="bodyForm.districtCode"
            ></loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="最终目的国代码（地区）" attr="destinationCode">
            <loc-codemap-select
              :disabled="true"
              :name="'destinationCode'"
              :code="'countryCode'"
              :cName="'nameCn'"
              :dataList="countrys"
              :value.sync="bodyForm.destinationCode"
            ></loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="创建时间" attr="stockDate">
            <ep-date v-model="bodyForm.stockDate" name="stockDate" :disabled="true"></ep-date>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="关联报关单编号" attr="rltEntryNo">
            <ep-input disabled v-model="bodyForm.rltEntryNo" name="rltEntryNo"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="仓库号" attr="whNo">
            <ep-input v-model="bodyForm.whNo" name="whNo" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="库位" attr="whLoc">
            <ep-input v-model="bodyForm.whLoc" name="whLoc" disabled></ep-input>
          </ep-form-item>
        </ep-col>

        <ep-col :col="8">
          <ep-form-item label="客户订单号" attr="orderNo">
            <ep-input v-model="bodyForm.orderNo" name="orderNo" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="货主名称" attr="ownerName">
            <ep-input v-model="bodyForm.ownerName" name="ownerName" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="16">
          <ep-form-item label="备注" attr="rmk">
            <ep-input :readonly="true" v-model="bodyForm.rmk" name="rmk" type="textarea" disabled></ep-input>
          </ep-form-item>
        </ep-col>
      </ep-row>
    </ep-form>
  </div>
</template>
<script>
import misList from "src/common/mislist";

import mixin from "../mixin";
export default {
  extends: misList, // 务必继承
  mixins: [mixin],
  components: {},
  props: {
    bodyForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      headColor: true,
      // ImpexpPortcdInfo:[],
    };
  },
  watch: {},
  created() {
    // let customList = this.$store.getters.getCustomList;
    // this.tradeInfo = customList;

    // let ImpexpPortcd = this.$store.getters.getCustomList;
    // let masterCuscd = this.$store.getters.getCustomId;
    // this.ImpexpPortcdInfo = ImpexpPortcd;
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
