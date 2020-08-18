<template>
  <div>
    <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="194px">
      <ep-row :gutter="10">
        <!-- <ep-col :col="8">
                  <ep-form-item label="凭证编号" attr="portNo">
                    <ep-input
                      v-model="bodyForm.portNo"
                      name="portNo"
                      :maxlength="64"
                      disabled
                    ></ep-input>
                  </ep-form-item>
                </ep-col> -->
        <ep-col :col="8">
          <ep-form-item label="凭证编号" attr="preentNo">
            <ep-input v-model="bodyForm.preentNo" name="preentNo" :maxlength="64" :disabled="true"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="ERP/WMS出入库类型" attr="inExpType">
            <ep-select v-model="bodyForm.inExpType" name="inExpType" disabled>
              <ep-select-item index="0" label="空车进出区"></ep-select-item>
              <ep-select-item index="1" label="一线非径予"></ep-select-item>
              <ep-select-item index="2" label="先报后送"></ep-select-item>
              <ep-select-item index="3" label="分送集报"></ep-select-item>
              <ep-select-item index="4" label="区内流转"></ep-select-item>
              <ep-select-item index="5" label="区间流转"></ep-select-item>
              <ep-select-item index="6" label="径予提发货"></ep-select-item>
              <ep-select-item index="7" label="临时进出区"></ep-select-item>
              <ep-select-item index="8" label="外发加工"></ep-select-item>

            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="绑定类型" attr="bindTypecd">
            <ep-select disabled v-model="bodyForm.bindTypecd" name="bindTypecd">
              <ep-select-item index="1" label="一车多票"></ep-select-item>
              <ep-select-item index="2" label="一车一票"></ep-select-item>
              <ep-select-item index="3" label="一票多车"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="进出标志" attr="ieTypecd">
            <ep-select disabled v-model="bodyForm.ieTypecd" name="ieTypecd">
              <ep-select-item index="I" label="I-进区"></ep-select-item>
              <ep-select-item index="E" label="E-出区"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="料件/成品标志" attr="mtpckEndprdTypecd" v-if='!classify'>
            <ep-select v-model="bodyForm.mtpckEndprdTypecd" name="mtpckEndprdTypecd" disabled>
              <ep-select-item index="I" label="料件"></ep-select-item>
              <ep-select-item index="E" label="成品"></ep-select-item>
              <ep-select-item index="S" label="设备"></ep-select-item>
              <ep-select-item index="L" label="边角料"></ep-select-item>
              <ep-select-item index="D" label="残次品"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>

        <ep-col :col="8">
          <ep-form-item label="进出境关别" attr="impexpPortcd">
            <loc-codemap-select :name="'impexpPortcd'" :code="'customCode'" :cName="'customName'" :dataList="ImpexpPortcdInfo" :type="'custom'" :value.sync="bodyForm.impexpPortcd" disabled>
            </loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="经营企业编号" attr="bizopEtpsNo">
            <ep-input disabled v-model="bodyForm.bizopEtpsNo" name="bizopEtpsNo">
            </ep-input>
          </ep-form-item>
        </ep-col>

        <ep-col :col="8">
          <ep-form-item label="经营企业名称" attr="bizopEtpsNm">
            <ep-input disabled v-model="bodyForm.bizopEtpsNm" name="bizopEtpsNm" :maxlength="512"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="经营单位社会信用代码" attr="bizopEtpsSccd" ref="bizopEtpsSccd">
            <ep-input disabled v-model="bodyForm.bizopEtpsSccd" name="bizopEtpsSccd" :maxlength="512"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="境内收发货企业编码" attr="rcvgdEtpsNo">
            <ep-input v-model="bodyForm.rcvgdEtpsNo" name="rcvgdEtpsNo" :maxlength="10" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="境内收发货企业名称" attr="rcvgdEtpsNm">
            <ep-input v-model="bodyForm.rcvgdEtpsNm" name="rcvgdEtpsNm" :maxlength="20" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="境内收发货企业社会信用代码" attr="rcvgdEtpsSccd">
            <ep-input v-model="bodyForm.rcvgdEtpsSccd" name="rcvgdEtpsSccd" :maxlength="18" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="主管海关" attr="masterCuscd">
            <loc-codemap-select :name="'masterCuscd'" :code="'customCode'" :cName="'customName'" :dataList="tradeInfo" :type="'custom'" :value.sync="bodyForm.masterCuscd" :disabled="true">
            </loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="申报日期" attr="dclTime">
            <ep-date v-model="bodyForm.dclTime" name="dclTime" type="dateTime" disabled></ep-date>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="承运车车牌号" attr="vehicleNo">
            <ep-input disabled v-model="bodyForm.vehicleNo" name="vehicleNo" :maxlength="25"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="IC卡号(电子车牌)" attr="vehicleIcNo">
            <ep-input disabled v-model="bodyForm.vehicleIcNo" name="vehicleIcNo" :maxlength="20"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="集装箱号" attr="containerNo">
            <ep-input disabled v-model="bodyForm.containerNo" name="containerNo" :maxlength="20"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="车自重" attr="vehicleWt">
            <ep-input disabled v-model="bodyForm.vehicleWt" name="vehicleWt" :maxlength="20"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="车架号" attr="vehicleFrameNo">
            <ep-input disabled v-model="bodyForm.vehicleFrameNo" name="vehicleFrameNo" :maxlength="20"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="车架重" attr="vehicleFrameWt">
            <ep-input disabled v-model="bodyForm.vehicleFrameWt" name="vehicleFrameWt" :maxlength="20"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="集装箱箱型" attr="containerType">
            <ep-input disabled v-model="bodyForm.containerType" name="containerType" :maxlength="20"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="集装箱重" attr="containerWt">
            <ep-input v-model="bodyForm.containerWt" name="containerWt" :maxlength="20" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="总重量" attr="totalWt">
            <ep-input v-model="bodyForm.totalWt" name="totalWt" :maxlength="20" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="卡口地磅采集重量" attr="passCollectWt" ref="passCollectWt">
            <ep-input disabled v-model="bodyForm.passCollectWt" name="passCollectWt" :maxlength="20"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="重量比对误差" attr="wtError" ref="wtError">
            <ep-input disabled v-model="bodyForm.wtError" name="wtError" :maxlength="20"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="货物总毛重" attr="totalGrossWt">
            <ep-input v-model="bodyForm.totalGrossWt" name="totalGrossWt" :maxlength="20" disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="货物总净重" attr="totalNetWt">
            <ep-input v-model="bodyForm.totalNetWt" name="totalNetWt" :maxlength="20" disabled></ep-input>
            <!-- <ep-date
                      v-model="bodyForm.totalNetWt"
                      name="totalNetWt"
                      type="dateTime"
                      disabled
                    ></ep-date> -->
          </ep-form-item>
        </ep-col>

        <ep-col :col="8">
          <ep-form-item label="进出卡口状态" attr="portIochkptStucd">
            <ep-select v-model="bodyForm.portIochkptStucd" name="portIochkptStucd" :maxlength="20" disabled>
              <ep-select-item index="1" label="未过卡"></ep-select-item>
              <ep-select-item index="2" label="已过卡"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="过卡时间1" attr="passTime">
            <ep-date v-model="bodyForm.passTime" name="passTime" type="dateTime" disabled></ep-date>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="过卡时间2" attr="secdPassTime">
            <ep-date v-model="bodyForm.secdPassTime" name="secdPassTime" type="dateTime" disabled></ep-date>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="预记入企业账户时间" attr="preRecAccountTime">
            <ep-date v-model="bodyForm.preRecAccountTime" name="preRecAccountTime" type="dateTime" disabled></ep-date>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="正式记入企业账户时间" attr="recAccountTime">
            <ep-date v-model="bodyForm.recAccountTime" name="recAccountTime" type="dateTime" disabled></ep-date>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="是否记入企业账户标记" attr="recAccountFlag">
            <ep-select v-model="bodyForm.recAccountFlag" name="recAccountFlag" disabled>
              <ep-select-item index="0" label="不计入"></ep-select-item>
              <ep-select-item index="2" label="计入"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="分送集报标志" attr="bindUsedTypecd">
            <ep-select v-model="bodyForm.bindUsedTypecd" name="bindUsedTypecd" disabled>
              <ep-select-item index="1" label="未集报"></ep-select-item>
              <ep-select-item index="2" label="已绑定未集报"></ep-select-item>
              <ep-select-item index="3" label="已集报"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <!-- <ep-col :col="8">
          <ep-form-item label="ERP/WMS出入库编号" attr="inExpWhNo">
            <ep-input v-model="bodyForm.inExpWhNo" name="inExpWhNo" disabled>
            </ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="ERP/WMS出入库日期" attr="inExpTime">
            <ep-date
              v-model="bodyForm.inExpTime"
              name="inExpTime"
              disabled
              type="dateTime"
            >
            </ep-date>
          </ep-form-item>
        </ep-col> -->
        <ep-col :col="8">
          <ep-form-item label="状态" attr="optStatus">
            <ep-select v-model="bodyForm.optStatus" name="optStatus" disabled>
              <ep-select-item index="99" label="删除"></ep-select-item>
              <ep-select-item index="1" label="暂存"></ep-select-item>
              <ep-select-item index="18" label="已确认"></ep-select-item>
              <ep-select-item index="3" label="海关入库成功"></ep-select-item>
              <ep-select-item index="4" label="海关入库失败"></ep-select-item>
              <ep-select-item index="5" label="审核通过"></ep-select-item>
              <ep-select-item index="6" label="审核拒绝"></ep-select-item>
              <ep-select-item index="17" label="待审核"></ep-select-item>
              <ep-select-item index="50" label="未过卡"></ep-select-item>
              <ep-select-item index="51" label="已过卡"></ep-select-item>
              <ep-select-item index="52" label="拒绝过卡"></ep-select-item>
              <ep-select-item index="53" label="卡口放行"></ep-select-item>
              <ep-select-item index="95" label="作废确认"></ep-select-item>
              <ep-select-item index="96" label="已作废"></ep-select-item>
              <ep-select-item index="100" label="海关删除"></ep-select-item>
            </ep-select>
            <!-- <ep-select
                      disabled
                      v-model="bodyForm.optStatus"
                      name="optStatus"
                      filterable
                    >
                      <ep-select-item

                        v-for="(item, index) in optStatusList"
                        :key="index"
                        :index="item.optStatus"
                        :label="item.proxyTradeName + ' ' + item.optStatus"
                      ></ep-select-item>
                    </ep-select>-->
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item label="总担保编号" attr="grtNo">
            <ep-input disabled v-model.trim="bodyForm.grtNo" name="grtNo" :maxlength="64"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item :label="'关联单证号'" attr="rltPortRecNo">
            <ep-input v-model.trim="bodyForm.rltPortRecNo" name="rltPortRecNo" disabled :maxlength="64"></ep-input>
          </ep-form-item>
        </ep-col>

        <ep-col :col="8">
          <ep-form-item label="申报类型" attr="dclTypecd">
            <ep-select v-model="bodyForm.dclTypecd" name="dclTypecd" disabled>
              <ep-select-item index="1" label="备案"></ep-select-item>
              <ep-select-item index="2" label="变更"></ep-select-item>
              <ep-select-item index="3" label="作废"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="16">
          <ep-form-item label="备注" attr="rmk">
            <ep-input disabled v-model="bodyForm.rmk" name="rmk" type="textarea"></ep-input>
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
      required: true,
    },
    classify: {
      default: false,
    },
  },
  data() {
    return {
      headColor: true,
    };
  },
  watch: {},
  created() {
    let customList = this.$store.getters.getCustomList;
    this.tradeInfo = customList;

    let ImpexpPortcd = this.$store.getters.getCustomList;
    let masterCuscd = this.$store.getters.getCustomId;
    this.ImpexpPortcdInfo = ImpexpPortcd;
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>
