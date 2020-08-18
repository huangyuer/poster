<template>
  <div>
    <ep-form ref="bodyForm"
             :form="bodyForm"
             name-width="168px"
             :rules="!isDtBody ? page_rules : {}">
      <ep-row :gutter="7">
        <!-- 录入表头 -->
        <!-- <ep-col :col="8">
          <ep-form-item attr="whRecNo" label="仓单编号">
            <ep-input v-model="bodyForm.whRecNo" name="whRecNo" :disabled="!displayBlock"></ep-input>
          </ep-form-item>
        </ep-col>-->
        <ep-col :col="8">
          <ep-form-item attr="whRecPreentNo"
                        label="进出区提发货凭证编号">
            <ep-input v-model="bodyForm.whRecPreentNo"
                      name="whRecPreentNo"
                      :disabled="displayBlock || isDtBody || changeDis"
                      :maxlength="64"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="rltWhRecNo"
                        label="关联编号">
            <ep-input v-model="bodyForm.rltWhRecNo"
                      name="rltWhRecNo"
                      :disabled="!displayBlock || changeDis"
                      :maxlength="64"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="rltEntryNo"
                        label="关联报关单编号">
            <ep-input v-model="bodyForm.rltEntryNo"
                      name="rltEntryNo"
                      :disabled="!displayBlock || changeDis"
                      :maxlength="18"></ep-input>
          </ep-form-item>
        </ep-col>
        <!-- <ep-col :col="8">
          <ep-form-item attr="inExpWhNo" label="ERP/WMS出入库编号" title="ERP/WMS出入库编号">
            <ep-input
              v-model="bodyForm.inExpWhNo"
              name="inExpWhNo"
              :disabled="!displayBlock"
              :maxlength="64"
            ></ep-input>
          </ep-form-item>
        </ep-col>-->
        <ep-col :col="8">
          <ep-form-item attr="inExpType"
                        label="ERP/WMS出入库类型"
                        title="ERP/WMS出入库类型">
            <ep-select v-model="bodyForm.inExpType"
                       @change="inExpChange"
                       name="inExpType"
                       :disabled="!displayBlock||inExpTypeStatus || changeDis">
              <ep-select-item index="1"
                              label="一线进出"></ep-select-item>
              <ep-select-item index="2"
                              label="先报后送"></ep-select-item>
              <ep-select-item index="3"
                              label="分送集报"></ep-select-item>
              <ep-select-item index="4"
                              label="区内流转"></ep-select-item>
              <ep-select-item index="5"
                              label="区间流转"></ep-select-item>
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
        </ep-col>-->
        <ep-col :col="8">
          <ep-form-item attr="ieTypecd"
                        label="进出标志">
            <ep-select v-model="bodyForm.ieTypecd"
                       name="ieTypecd"
                       :disabled="!displayBlock||ieTypecdStatus || changeDis"
                       @change="ieTypecdChange">
              <!-- <ep-select-item index="I" label="入库"></ep-select-item>
              <ep-select-item index="E" label="出库"></ep-select-item>-->

              <div v-if="stateValue == 4">
                <ep-select-item index="I"
                                label="入库"></ep-select-item>
                <ep-select-item index="E"
                                label="出库"></ep-select-item>
              </div>
              <div v-else>
                <ep-select-item index="I"
                                label="进区"></ep-select-item>
                <ep-select-item index="E"
                                label="出区"></ep-select-item>
              </div>
            </ep-select>
          </ep-form-item>
        </ep-col>

        <!-- <ep-col :col="8" v-else>
          <ep-form-item attr="ieTypecd" label="进出标志">
            <ep-select
              v-model="bodyForm.ieTypecd"
              name="ieTypecd"
              :disabled="!displayBlock||ieTypecdStatus"
              @change="ieTypecdChange"
            >
              <ep-select-item index="I" label="进区"></ep-select-item>
              <ep-select-item index="E" label="出区"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>-->

        <ep-col :col="8">
          <ep-form-item attr="businessTypecd"
                        label="业务类别">
            <ep-select v-model="bodyForm.businessTypecd"
                       name="businessTypecd"
                       :disabled="!displayBlock || changeDis">
              <ep-select-item index="1"
                              label="自用设备"></ep-select-item>
              <ep-select-item index="2"
                              label="简单加工"></ep-select-item>
              <ep-select-item index="3"
                              label="保税加工"></ep-select-item>
              <ep-select-item index="4"
                              label="保税仓储"></ep-select-item>
              <ep-select-item index="5"
                              label="转口贸易"></ep-select-item>
              <ep-select-item index="6"
                              label="跨境电商"></ep-select-item>
              <ep-select-item index="7"
                              label="汽车平行进口"></ep-select-item>
              <ep-select-item index="8"
                              label="融资租赁"></ep-select-item>
              <ep-select-item index="9"
                              label="期货保税交割"></ep-select-item>
              <ep-select-item index="10"
                              label="保税维修"></ep-select-item>
              <ep-select-item index="11"
                              label="进口汽车保税存储"></ep-select-item>
              <ep-select-item index="12"
                              label="保税研发"></ep-select-item>
              <ep-select-item index="13"
                              label="委托加工"></ep-select-item>
              <ep-select-item index="14"
                              label="大宗商品现货保税交易"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="mtpckEndprdTypecd"
                        label="料件/成品标志">
            <ep-select v-model="bodyForm.mtpckEndprdTypecd"
                       name="mtpckEndprdTypecd"
                       :disabled="!displayBlock || changeDis">
              <ep-select-item index="I"
                              label="料件"></ep-select-item>
              <ep-select-item index="E"
                              label="成品"></ep-select-item>
              <ep-select-item index="S"
                              label="设备"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="grossWt"
                        label="毛重">
            <ep-input v-model="bodyForm.grossWt"
                      name="grossWt"
                      :disabled="!displayBlock || changeDis"
                      :maxlength="20"></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="supvModecd"
                        label="监管方式">
            <loc-codemap-select :name="'supvModecd'"
                                :code="'tradeMode'"
                                :cName="'abbrTrade'"
                                :dataList="supvInfo"
                                :value.sync="bodyForm.supvModecd"
                                :disabled="!displayBlock || changeDis"></loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="trspModecd"
                        label="运输方式">
            <!-- <ep-select v-model="bodyForm.trspModecd" name="trspModecd" :disabled="!displayBlock">
              <ep-select-item index="1" label="海运"></ep-select-item>
              <ep-select-item index="2" label="空运"></ep-select-item>
            </ep-select>-->
            <loc-codemap-select :disabled="!displayBlock || changeDis"
                                :name="'trspModecd'"
                                :code="'trafCode'"
                                :cName="'trafSpec'"
                                :dataList="transfList"
                                :value.sync="bodyForm.trspModecd"></loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="impexpPortcd"
                        label="进出境关别">
            <loc-codemap-select :name="'impexpPortcd'"
                                :code="'customCode'"
                                :cName="'customName'"
                                :dataList="ImpexpPortcdInfo"
                                :type="'custom'"
                                :value.sync="bodyForm.impexpPortcd"
                                :disabled="!displayBlock || changeDis"></loc-codemap-select>
            <!-- <ep-input v-model="bodyForm.impexpPortcd" name="impexpPortcd" :disabled="!displayBlock"></ep-input> -->
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="dclcusFlag"
                        label="是否报关">
            <ep-select v-model="bodyForm.dclcusFlag"
                       name="dclcusFlag"
                       :disabled="!displayBlock|| changeDis"
                       @change="dclcusChange">
              <ep-select-item index="1"
                              label="否"></ep-select-item>
              <ep-select-item index="2"
                              label="是"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="dclcusTypecd"
                        label="报关类型">
            <ep-select v-model="bodyForm.dclcusTypecd"
                       name="dclcusTypecd"
                       :disabled="!displayBlock|| changeDis||bodyForm.dclcusFlag=='1'">
              <ep-select-item index="1"
                              label="关联报关"></ep-select-item>
              <ep-select-item index="2"
                              label="对应报关"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="transMode"
                        label="成交方式">
            <ep-select :disabled="!displayBlock || changeDis"
                       :label="TransacList"
                       v-model="bodyForm.transMode"
                       name="transMode">
              <ep-select-item v-for="(item, index) in TransacList"
                              :key="index"
                              :index="item.transMode"
                              :label="item.transSpec + ' ' + item.transMode"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="tradeCountry"
                        label="启运国/运抵国(地区)">
            <!-- <ep-select
              :disabled="!displayBlock"
              :label="countrys"
              v-model="bodyForm.tradeCountry"
              name="tradeCountry"
            >
              <ep-select-item
                v-for="(item, index) in countrys"
                :key="index"
                :index="item.countryCode"
                :label="item.nameCn + ' ' + item.countryCode"
              ></ep-select-item>
            </ep-select>-->
            <loc-codemap-select :disabled="!displayBlock || changeDis"
                                :name="'tradeCountry'"
                                :code="'countryCode'"
                                :cName="'nameCn'"
                                :dataList="countrys"
                                :value.sync="bodyForm.tradeCountry"></loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="tradingRegion"
                        label="贸易国(地区)">
            <!-- <ep-select
              :disabled="!displayBlock"
              :label="countrys"
              v-model="bodyForm.tradingRegion"
              name="tradingRegion"
            >
              <ep-select-item
                v-for="(item, index) in countrys"
                :key="index"
                :index="item.countryCode"
                :label="item.nameCn + ' ' + item.countryCode"
              ></ep-select-item>
            </ep-select>-->
            <loc-codemap-select :disabled="!displayBlock || changeDis"
                                :name="'tradingRegion'"
                                :code="'countryCode'"
                                :cName="'nameCn'"
                                :dataList="countrys"
                                :value.sync="bodyForm.tradingRegion"></loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="districtCode"
                        label="境内目的地/货源地"
                        title="境内目的地/货源地">
            <loc-codemap-select :disabled="!displayBlock || changeDis"
                                :name="'districtCode'"
                                :code="'districtCode'"
                                :cName="'districtName'"
                                :dataList="districtList"
                                :value.sync="bodyForm.districtCode"></loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="destinationNatcd"
                        label="最终目的国(地区)">
            <!-- <ep-select
              :label="countrys"
              v-model="bodyForm.destinationNatcd"
              name="destinationNatcd"
              :disabled="!displayBlock"
            >
              <ep-select-item
                v-for="(item, index) in countrys"
                :key="index"
                :index="item.countryCode"
                :label="item.nameCn + +item.countryCode"
              ></ep-select-item>
            </ep-select>-->
            <loc-codemap-select :disabled="!displayBlock || changeDis"
                                :name="'destinationNatcd'"
                                :code="'countryCode'"
                                :cName="'nameCn'"
                                :dataList="countrys"
                                :value.sync="bodyForm.destinationNatcd"></loc-codemap-select>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="chgTmsCnt"
                        label="变更次数">
            <ep-input v-model="bodyForm.chgTmsCnt"
                      name="chgTmsCnt"
                      disabled></ep-input>
          </ep-form-item>
        </ep-col>
        <ep-col :col="8">
          <ep-form-item attr="dclTypecd"
                        label="申报类型">
            <ep-select v-model="bodyForm.dclTypecd"
                       name="dclTypecd"
                       disabled>
              <ep-select-item index="1"
                              label="备案"></ep-select-item>
              <ep-select-item index="2"
                              label="变更"></ep-select-item>
              <ep-select-item index="3"
                              label="作废"></ep-select-item>
            </ep-select>
          </ep-form-item>
        </ep-col>
        <!-- 查询明细 -->

        <div v-if="isDtBody">
          <ep-col :col="8">
            <ep-form-item attr="bizopEtpsSccd"
                          label="经营企业社会信用代码">
              <ep-input :disabled="!displayBlock || changeDis"
                        v-model="bodyForm.bizopEtpsSccd"
                        name="bizopEtpsSccd"
                        :maxlength="18"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="bizopEtpsno"
                          label="经营企业编号">
              <ep-input v-model="bodyForm.bizopEtpsno"
                        name="bizopEtpsno"
                        :disabled="!displayBlock || changeDis"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="bizopEtpsNm"
                          label="经营企业名称">
              <ep-input v-model="bodyForm.bizopEtpsNm"
                        name="bizopEtpsNm"
                        :disabled="!displayBlock || changeDis"></ep-input>
            </ep-form-item>
          </ep-col>
          <!-- <ep-col :col="8">
            <ep-form-item attr="entryStucd" label="报关状态">
              <ep-select
                v-model="bodyForm.entryStucd"
                name="entryStucd"
                :disabled="!displayBlock || changeDis"
              >
                <ep-select-item index="0" label="未放行"></ep-select-item>
                <ep-select-item index="1" label="已放行"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col> -->
          <ep-col :col="8">
            <ep-form-item attr="masterCuscd"
                          label="主管海关">
              <!-- <ep-input v-model="bodyForm.masterCuscd" name="masterCuscd" ></ep-input> -->
              <loc-codemap-select :disabled="!displayBlock || changeDis"
                                  :name="'masterCuscd'"
                                  :code="'customCode'"
                                  :cName="'customName'"
                                  :dataList="tradeInfo"
                                  :type="'custom'"
                                  :value.sync="bodyForm.masterCuscd"></loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="relDclcusFlag"
                          label="报关标志">
              <ep-select v-model="bodyForm.relDclcusFlag"
                         name="relDclcusFlag"
                         :disabled="!displayBlock || changeDis">
                <ep-select-item index="1"
                                label="未报"></ep-select-item>
                <ep-select-item index="2"
                                label="已报"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="dclTime"
                          label="确认日期">
              <ep-date v-model="bodyForm.dclTime"
                       name="dclTime"
                       :disabled="!displayBlock || changeDis"></ep-date>
            </ep-form-item>
          </ep-col>

          <ep-col :col="8">
            <ep-form-item attr="preRecAccountTime"
                          label="预记入企业账户时间">
              <ep-date v-model="bodyForm.preRecAccountTime"
                       name="preRecAccountTime"
                       :disabled="!displayBlock || changeDis"></ep-date>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="recAccountTime"
                          label="正式记入企业账户时间">
              <ep-date v-model="bodyForm.recAccountTime"
                       name="recAccountTime"
                       :disabled="!displayBlock || changeDis"></ep-date>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="invtIochkptStucd"
                          label="进出卡口状态">
              <ep-select v-model="bodyForm.invtIochkptStucd"
                         name="invtIochkptStucd"
                         :disabled="!displayBlock || changeDis">
                <ep-select-item index="1"
                                label="未过卡"></ep-select-item>
                <ep-select-item index="2"
                                label="部分过卡"></ep-select-item>
                <ep-select-item index="3"
                                label="完全过卡"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="VRFDED_MARKCD"
                          label="核扣标记">
              <ep-select v-model="bodyForm.vrfdedMarkcd"
                         name="vrfdedMarkcd"
                         :disabled="!displayBlock || changeDis">
                <ep-select-item index="0"
                                label="未核扣"></ep-select-item>
                <ep-select-item index="1"
                                label="预核扣"></ep-select-item>
                <ep-select-item index="2"
                                label="已核扣"></ep-select-item>
                <ep-select-item index="3"
                                label="已核销"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="绑定标志"
                          attr="passportUsedTypecd">
              <ep-select :disabled="!displayBlock || changeDis"
                         v-model="bodyForm.passportUsedTypecd"
                         name="passportUsedTypecd">
                <ep-select-item index="1"
                                label="未绑定"></ep-select-item>
                <ep-select-item index="2"
                                label="部分绑定"></ep-select-item>
                <ep-select-item index="3"
                                label="已绑定"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>

          <ep-col :col="8">
            <ep-form-item attr="optStatus"
                          label="状态">
              <ep-select v-model="bodyForm.optStatus"
                         name="optStatus"
                         :disabled="!displayBlock || changeDis">
                <ep-select-item index="1"
                                label="暂存"></ep-select-item>
                <ep-select-item index="18"
                                label="已确认"></ep-select-item>
                <ep-select-item index="3"
                                label="海关入库成功"></ep-select-item>
                <ep-select-item index="4"
                                label="海关入库失败"></ep-select-item>
                <ep-select-item index="17"
                                label="待审核"></ep-select-item>
                <ep-select-item index="5"
                                label="审核通过"></ep-select-item>
                <ep-select-item index="6"
                                label="审核拒绝"></ep-select-item>
                <ep-select-item index="99"
                                label="已删除"></ep-select-item>
                <ep-select-item index="40"
                                label="确认收货"></ep-select-item>
                <ep-select-item index="96"
                                label="确认收货"></ep-select-item>
                <ep-select-item index="96"
                                label="已作废"></ep-select-item>
                <ep-select-item index="95"
                                label="作废确认"></ep-select-item>
                <ep-select-item index="20"
                                label="变更确认"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="chgTmsCnt"
                          label="变更次数">
              <ep-input v-model="bodyForm.chgTmsCnt"
                        name="chgTmsCnt"
                        :disabled="!displayBlock || changeDis"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="dclTypecd"
                          label="申报类型">
              <ep-select v-model="bodyForm.dclTypecd"
                         name="dclTypecd"
                         :disabled="!displayBlock || changeDis">
                <ep-select-item index="1"
                                label="备案"></ep-select-item>
                <ep-select-item index="2"
                                label="变更"></ep-select-item>
                <ep-select-item index="3"
                                label="作废"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
        </div>
        <!-- <ep-col :col="8">
          <ep-form-item attr="grtNo" label="总担保编号">
            <ep-input v-model="bodyForm.grtNo" name="grtNo" :disabled="!displayBlock"></ep-input>
          </ep-form-item>
        </ep-col>-->
        <ep-col :col="16">
          <ep-form-item attr="rmk"
                        label="备注">
            <ep-input v-model="bodyForm.rmk"
                      name="rmk"
                      :disabled="!displayBlock"
                      :maxlength="2000"></ep-input>
          </ep-form-item>
        </ep-col>
      </ep-row>
    </ep-form>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import { cloneObj } from "utils";
import mixin from "../mixin";

export default {
  mixins: [mixin],
  extends: misList, // 务必继承
  data () {
    return {
      headColor: false,
      tableData: [],
      tableDataCopy: this.listDate,
      loading: false,
      model: false,
      noEdit: true,
      stateValue: this.inExpTypeVal,
      ieTypecdState: " ",
      ep_page: {
        page: 1,
        size: 10
      },
      totalcount: 0,
      buttonStatus: "",
      customSearch: {},
      page_rules: {
        bizopEtpsno: { required: true, message: "不能为空", trigger: "change" },
        bizopEtpsNm: { required: true, message: "不能为空", trigger: "change" },
        rltWhRecNo: { required: false, message: "不能为空", trigger: "change" },
        // dclcusTypecd: {
        //   required: false,
        //   message: "不能为空",
        //   trigger: "change"
        // },
        inExpType: { required: true, message: "不能为空", trigger: "change" },
        // inExpTime: { required: true, message: "不能为空", trigger: "change" },
        // inExpWhNo: { required: false, message: "不能为空", trigger: "change" },
        dclcusFlag: { required: false, message: "不能为空", trigger: "change" },
        mtpckEndprdTypecd: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        supvModecd: { required: true, message: "不能为空", trigger: "change" },
        trspModecd: { required: true, message: "不能为空", trigger: "change" },
        impexpPortcd: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        masterCuscd: { required: true, message: "不能为空", trigger: "change" },
        optStatus: { required: true, message: "不能为空", trigger: "change" },
        destinationNatcd: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        tradeCountry: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        tradingRegion: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        districtCode: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        grossWt: { required: true, message: "不能为空", trigger: "change" },
        transMode: { required: true, message: "不能为空", trigger: "change" },
        ieTypecd: { required: true, message: "不能为空", trigger: "change" },
        rltEntryNo: { required: false, message: "不能为空", trigger: "change" },
        dclcusTypecd: { required: true, message: "不能为空", trigger: "change" },
        businessTypecd: {
          required: true,
          message: "不能为空",
          trigger: "change"
        }
        // grtNo: { required: false, message: "不能为空", trigger: "change" }
      }
    };
  },
  // extends: misList, // 务必继承
  mixins: [misList, mixin],
  components: {},
  props: {
    inExpTypeVal: {
      default: ""
    },
    changeDis: {
      default: false
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
    },
    displayBlock: {
      default: true
    },
    isDtBody: {
      type: Boolean,
      default: false
    }
  },
  created () {
    // :disabled="changeDis"
    this.bodyForm.dclTypecd = "1";
    let tradeModeList = this.$store.getters.getTradeModeList;
    let ImpexpPortcd = this.$store.getters.getCustomList;
    let masterCuscd = this.$store.getters.getCustomId;
    this.supvInfo = tradeModeList;
    this.ImpexpPortcdInfo = ImpexpPortcd;
  },
  updated () {
    let dclcusFlagNum = this.bodyForm.dclcusFlag;
    if (dclcusFlagNum == 1) {
      this.noEdit = true;
      // this.page_rules.dclcusTypecd.required = false;
      this.bodyForm.dclcusTypecd = "";
    } else {
      this.noEdit = false;
      // this.page_rules.dclcusTypecd.required = true;
    }
  },
  watch: {
    //     "bodyForm.inExpType"(val, oldVal){
    //  console.log("-------val",val)
    //  if(oldVal)console.log("-------oldVal",oldVal)
    //     },
    "bodyForm.grossWt" (val, oldVal) {
      // let reg = /\d+(\.\d{0,2})?/;
      // if (reg.test(val)) {
      //   setTimeout(() => {
      //     this.bodyForm.grossWt = val.match(/\d+(\.\d{0,5})?/)[0] || "";
      //   });
      // } else {
      //   setTimeout(() => {
      //     this.bodyForm.grossWt = "";
      //   });
      // }

      if (
        val &&
        val !== null &&
        val.charAt(0) == "0" &&
        val.length > 1 &&
        val.charAt(1) !== "."
      ) {
        this.$pop({
          type: "danger",
          message: "请输入正确的毛重"
        });
      }
      let reg = /^\d{0,14}(\.\d{0,5})?$/;
      if (!reg.test(val)) {
        setTimeout(() => {
          this.bodyForm.grossWt = oldVal;
        });
      }
    },
    // "bodyForm.ieTypecd"(val, oldVal) {
    //   if (this.bodyForm.inExpType == "3" && val == "E") {
    //     this.page_rules.grtNo.required = true;
    //   } else {
    //     this.page_rules.grtNo.required = false;
    //   }
    // },
    "bodyForm.inExpType" (val, oldVal) {
      if (this.isDtBody) return;
      if (oldVal && oldVal == "3" && val == "4") {
        this.bodyForm.ieTypecd = "";
      }
      if (oldVal && oldVal == "4" && val != "4") {
        this.bodyForm.ieTypecd = "";
      }
      // if (val == "3" && this.bodyForm.ieTypecd == "E") {
      //   this.page_rules.grtNo.required = true;
      // } else {
      //   this.page_rules.grtNo.required = false;
      // }
      if (val == "1") {
        this.bodyForm.dclcusFlag = "2";
        this.bodyForm.dclcusTypecd = "2";
      } else if (val == "2") {
        this.bodyForm.dclcusFlag = "2";
        this.bodyForm.dclcusTypecd = "1";
      } else if (val == "3") {
        this.bodyForm.dclcusFlag = "2";
        this.bodyForm.dclcusTypecd = "1";
      } else if (val == "4") {
        this.bodyForm.dclcusFlag = "1";
      } else if (val == "5") {
        this.bodyForm.dclcusFlag = "2";
        this.bodyForm.dclcusTypecd = "1";
      }
    }
  },
  mounted () { },
  methods: {
    inExpChange (value) {
      this.stateValue = value;
      this.$emit("inExpStateChange", value);
      // 区内流转时，出区=》关联编号必填
      if (this.stateValue == 4 && this.ieTypecdState == "E") {
        this.page_rules.rltWhRecNo.required = true;
      } else {
        this.page_rules.rltWhRecNo.required = false;
      }
    },
    ieTypecdChange (value) {
      this.ieTypecdState = value;
      //  this.$set(this.bodyForm,'ieTypecd','00000')
      // this.bodyForm.ieTypecd=value
      this.$emit("ieTypecdChange", value);
      // 区内流转时，出区=》关联编号必填
      if (this.stateValue == 4 && this.ieTypecdState == "E") {
        this.page_rules.rltWhRecNo.required = true;
      } else {
        this.page_rules.rltWhRecNo.required = false;
      }
    },

    dclcusChange (value) {
      if (value == '1')
        this.page_rules.dclcusTypecd.required = false;
      else this.page_rules.dclcusTypecd.required = true;
      this.$emit("dclcusStateChange", value);
    },
    getValidate () {
      this.$refs["bodyForm"].validate(valid => {
        if (valid) {
          // this.$post("billDirDtSave", bodyFormCopy)
          //   .then(res1 => {
          //   })
          //   .catch(() => {
          //   });
          this.$emit("validateFlag", true);
        } else {
          this.$pop({
            type: "danger",
            message: "表单验证失败!"
          });
          this.$emit("validateFlag", false);
          return;
        }
      });
    }
  }
};
</script>
