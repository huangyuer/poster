<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">

        <ep-tabs active="加工数据表头" @change="changeTitle">
          <ep-tab-item name="加工数据表头">
            <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" :rules="page_rules" name-width="168px">
              <ep-row :gutter="10">

                <!-- <ep-col :col="8">
                  <ep-form-item label="账户编号" attr="emsNo" required>
                    <ep-input v-model="bodyForm.emsNo" disabled name="emsNo"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="预录入编号" attr="etpsPreentNo" required>
                    <ep-input v-model="bodyForm.etpsPreentNo" disabled name="etpsPreentNo"></ep-input>
                  </ep-form-item>
                </ep-col>
                
                <ep-col :col="8">
                  <ep-form-item label="变更次数" attr="chgTmsCnt" >
                    <ep-input v-model="bodyForm.chgTmsCnt" disabled name="chgTmsCnt" :readonly="true"></ep-input>
                  </ep-form-item>
                </ep-col> -->

                <ep-col :col="8">
                  <ep-form-item label="关区" attr="masterCuscd" required>
                    <!-- <ep-select disabled filterable :label="tradeInfo" v-model="bodyForm.masterCuscd" name="masterCuscd">
                      <ep-select-item v-for="(item, index) in tradeInfo" :key="index" :index="item.customCode" :label="item.customName+' '+item.customCode"></ep-select-item>
                    </ep-select> -->
                    <loc-codemap-select
                                  :name="'masterCuscd'"
                                  :code="'customCode'"
                                  :cName="'customName'"
                                  :dataList="tradeInfo"
                                  :type="'custom'"
                                  disabled
                                  :value.sync="bodyForm.masterCuscd">
                      </loc-codemap-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="账户类型" attr="emsTypecd" >
                    <ep-select disabled v-model="bodyForm.emsTypecd" @change="selectEmstypecd" name="emsTypecd">
                      <ep-select-item index="1" label="E账户"></ep-select-item>
                      <ep-select-item index="2" label="H账户"></ep-select-item>
                      <ep-select-item index="3" label="耗料"></ep-select-item>
                      <ep-select-item index="4" label="工单"></ep-select-item>
                      <ep-select-item index="5" label="企业为单元"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <!-- <ep-col :col="8">
                  <ep-form-item label="申报类型" attr="dclTypecd" required>
                    <ep-select disabled v-model="bodyForm.dclTypecd" name="dclTypecd">
                      <ep-select-item index="1" label="备案申请"></ep-select-item>
                      <ep-select-item index="2" label="变更申请"></ep-select-item>
                      <ep-select-item index="3" label="注销申请"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col> -->
                <ep-col :col="8">
                  <ep-form-item label="经营企业信用代码" attr="bizopEtpsSccd">
                    <ep-input disabled v-model="bodyForm.bizopEtpsSccd" name="bizopEtpsSccd"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="经营企业编号" attr="bizopEtpsno" required>
                    <ep-input disabled v-model="bodyForm.bizopEtpsno" name="bizopEtpsno"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="经营企业名称" attr="bizopEtpsNm" required>
                    <ep-input disabled v-model="bodyForm.bizopEtpsNm" name="bizopEtpsNm"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="收发货企业信用代码" attr="rvsngdEtpsSccd">
                    <ep-input disabled v-model="bodyForm.rvsngdEtpsSccd" name="rvsngdEtpsSccd"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="收货企业编号" attr="rcvgdEtpsno" required>
                    <ep-input disabled v-model="bodyForm.rcvgdEtpsno" name="rcvgdEtpsno"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="收货企业名称" attr="rcvgdEtpsNm" required>
                    <ep-input disabled v-model="bodyForm.rcvgdEtpsNm" name="rcvgdEtpsNm"></ep-input>
                  </ep-form-item>
                </ep-col>
                <!-- <ep-col :col="8">
                  <ep-form-item label="申报企业信用代码" attr="dclEtpsSccd">
                    <ep-input disabled v-model="bodyForm.dclEtpsSccd" name="dclEtpsSccd"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="申报企业编号" attr="dclEtpsNo" required>
                    <ep-input disabled v-model="bodyForm.dclEtpsNo" name="dclEtpsNo"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="申报企业名称" attr="dclEtpsNm" required>
                    <ep-input disabled v-model="bodyForm.dclEtpsNm" name="dclEtpsNm"></ep-input>
                  </ep-form-item>
                </ep-col> -->
                <!-- <ep-col :col="8">
                  <ep-form-item label="申报企业类型" attr="dclEtpsTypecd">
                    <ep-select disabled v-model="bodyForm.dclEtpsTypecd" name="dclEtpsTypecd">
                      <ep-select-item index="1" label="企业"></ep-select-item>
                      <ep-select-item index="2" label="代理公司"></ep-select-item>
                      <ep-select-item index="3" label="报关行"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col> -->

                <ep-col :col="8">
                  <ep-form-item label="结束有效日期" attr="finishValidDate" required>
                    <ep-date disabled v-model="bodyForm.finishValidDate" name="finishValidDate"></ep-date>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="批准证编号" attr="apcretNo">

                    <ep-input disabled v-model="bodyForm.apcretNo" name="apcretNo"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="档案库编号" attr="netwkEtpsArcrpNo">

                    <ep-input disabled v-model="bodyForm.netwkEtpsArcrpNo" name="netwkEtpsArcrpNo"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="最大周转金额(万美元)" attr="maxTovrAmt">

                    <ep-input disabled v-model="bodyForm.maxTovrAmt" name="maxTovrAmt"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="申报时间" attr="dclTime">
                    <ep-date v-model="bodyForm.dclTime" disabled name="dclTime"></ep-date>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="单耗申报环节" attr="ucnsDclSegcd" required>
                    <ep-select v-model="bodyForm.ucnsDclSegcd" disabled name="ucnsDclSegcd">
                      <ep-select-item index="1" label="出口前"></ep-select-item>
                      <ep-select-item index="2" label="报核前"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="核销周期值(天)" attr="vclrPridVal" required>
                    <ep-input v-model="bodyForm.vclrPridVal" disabled name="vclrPridVal"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="最大进口金额(万美元)" attr="maxApprImpAmt">

                    <ep-input disabled v-model="bodyForm.maxApprImpAmt" name="maxApprImpAmt"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="核销类型" attr="vclrTypecd">
                    <ep-select disabled v-model="bodyForm.vclrTypecd" name="vclrTypecd">
                      <ep-select-item index="1" label="单耗"></ep-select-item>
                      <ep-select-item index="2" label="耗料"></ep-select-item>
                      <ep-select-item index="3" label="工单"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
               
                <!-- <ep-col :col="8">
                  <ep-form-item label="申报标记" attr="dclMarkcd">
                    <ep-select disabled v-model="bodyForm.dclMarkcd" name="dclMarkcd">
                      <ep-select-item index="1" label="电子口岸申报"></ep-select-item>
                      <ep-select-item index="2" label="地方平台申报"></ep-select-item>
                      <ep-select-item index="3" label="其它申报"></ep-select-item>
                    </ep-select>

                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="审批状态" attr="emapvStucd">
                    <ep-select disabled v-model="bodyForm.emapvStucd" name="emapvStucd">
                      <ep-select-item index="1" label="通过"></ep-select-item>
                      <ep-select-item index="2" label="转人工"></ep-select-item>
                      <ep-select-item index="3" label="退单"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="暂停进出口标记" attr="pauseImpexpMarkcd">
                    <ep-select disabled v-model="bodyForm.pauseImpexpMarkcd" name="pauseImpexpMarkcd">
                      <ep-select-item index="1" label="未暂停"></ep-select-item>
                      <ep-select-item index="2" label="恢复执行"></ep-select-item>
                      <ep-select-item index="3" label="暂停进出口"></ep-select-item>
                      <ep-select-item index="4" label="暂停进口"></ep-select-item>
                      <ep-select-item index="5" label="暂停出口"></ep-select-item>
                      <ep-select-item index="6" label="全部暂停"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="暂停变更标记" attr="pauseChgMarkcd">
                    <ep-select disabled v-model="bodyForm.pauseChgMarkcd" name="pauseChgMarkcd">
                      <ep-select-item index="0" label="未开始执行"></ep-select-item>
                      <ep-select-item index="1" label="正常执行"></ep-select-item>
                      <ep-select-item index="2" label="恢复执行"></ep-select-item>
                      <ep-select-item index="3" label="暂停变更"></ep-select-item>
                      <ep-select-item index="9" label="已注销"></ep-select-item>
                    </ep-select>

                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="备案批准时间" attr="putrecApprTime">
                    <ep-date v-model="bodyForm.putrecApprTime" name="putrecApprTime" disabled></ep-date>

                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="变更批准时间" attr="chgApprTime">
                    <ep-date v-model="bodyForm.chgApprTime" name="chgApprTime" disabled></ep-date>

                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="最近核销时间" attr="rcntVclrTime">
                    <ep-date disabled v-model="bodyForm.rcntVclrTime" name="rcntVclrTime"></ep-date>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="核销申请时间" attr="vclrApplyTime">
                    <ep-date disabled v-model="bodyForm.vclrApplyTime" name="vclrApplyTime"></ep-date>

                  </ep-form-item>
                </ep-col>

                <ep-col :col="8">
                  <ep-form-item label="核算标记" attr="adjaccMarkcd">

                    <ep-input v-model="bodyForm.adjaccMarkcd" disabled name="adjaccMarkcd"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="核算次数" attr="adjaccTmsCnt">

                    <ep-input v-model="bodyForm.adjaccTmsCnt" disabled name="adjaccTmsCnt"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="单耗版本号控制标志" attr="ucnsVernoCntrFlag">

                    <ep-input v-model="bodyForm.ucnsVernoCntrFlag" disabled name="ucnsVernoCntrFlag"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="涉案标记" attr="rcasemarkcd">
                    <ep-select disabled v-model="bodyForm.rcasemarkcd" name="headStatusCn">
                      <ep-select-item index="0" label="正常"></ep-select-item>
                      <ep-select-item index="1" label="已移交未立案"></ep-select-item>
                      <ep-select-item index="2" label="已立案未结案"></ep-select-item>
                      <ep-select-item index="3" label="案件已办结"></ep-select-item>
                      <ep-select-item index="4" label="不予立案"></ep-select-item>
                      <ep-select-item index="5" label="已经撤案"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="核销方式" attr="etpsPosesSadjaQuaFlag">
                    <ep-select disabled v-model="bodyForm.etpsPosesSadjaQuaFlag" name="etpsPosesSadjaQuaFlag">
                      <ep-select-item index="1" label="企业自核"></ep-select-item>
                      <ep-select-item index="2" label="海关核算"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="账户用途" attr="usageTypecd">
                    <ep-select v-model="bodyForm.usageTypecd" name="usageTypecd" disabled>
                      <ep-select-item index="1" label="一般纳税人"></ep-select-item>
                      <ep-select-item index="2" label="特殊行业"></ep-select-item>
                      <ep-select-item index="3" label="保税维修"></ep-select-item>
                       <ep-select-item index="4" label="委托加工"></ep-select-item>
                      <ep-select-item index="5" label="保税研发"></ep-select-item>
                    </ep-select>

                  </ep-form-item>
                </ep-col> -->
                 <ep-col :col="16">
                  <ep-form-item label="备注" attr="rmk">
                    <ep-input :readonly="true" v-model="bodyForm.rmk" name="rmk" type="textarea"></ep-input>
                  </ep-form-item>
                </ep-col>
                 <ep-col :col="24" v-show="this.$store.getters.getOrgType==4">
                   <div style="border:1px solid gray;width:100%;margin-bottom:20px;">

                    </div>
                     <ep-col :col="8">
                      <ep-form-item label="预录入统一编号" attr="seqNo" >
                        <ep-input v-model="bodyForm.seqNo" disabled name="seqNo"></ep-input>
                      </ep-form-item>
                      </ep-col>
                      <ep-col :col="8">
                        <ep-form-item label="实际进口总金额" attr="actlImpTotalAmt" required>
                          <ep-input v-model="bodyForm.actlImpTotalAmt" name="actlImpTotalAmt" disabled :maxlength="20"></ep-input>
                        </ep-form-item>
                      </ep-col>
                      <ep-col :col="8">
                        <ep-form-item label="实际出口总金额" attr="actlExpTotalAmt" required>
                          <ep-input v-model="bodyForm.actlExpTotalAmt" name="actlExpTotalAmt" disabled :maxlength="20"></ep-input>
                        </ep-form-item>
                      </ep-col>
                 </ep-col>
               

              </ep-row>

            </ep-form>
          </ep-tab-item>
          <ep-tab-item name="料件明细">
            <div>
              <ep-model title="料件明细" :wrap-close="false" v-model="emsPutrecDtFormLIsshow" width="1200px">
                <ep-form ref="emsPutrecDtFormL" :form="emsPutrecDtFormL" :rules="page_rules1" name-width="168px">
                  <ep-row :gutter="7">

                    <ep-col :col="8" style="display:none">
                      <ep-form-item attr="chgTmsCnt" label="变更次数" required>
                        <ep-input disabled v-model="emsPutrecDtFormL.chgTmsCnt" name="chgTmsCnt" :readonly="true"></ep-input>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8">
                      <ep-form-item attr="gdsSeqno" label="商品备案序号" required>
                        <ep-input disabled v-model="emsPutrecDtFormL.gdsSeqno" name="gdsSeqno"></ep-input>
                      </ep-form-item>
                    </ep-col>
                   
                    <ep-col :col="8">
                      <ep-form-item attr="gdsMtno" label="商品料号" required>
                        <ep-input disabled v-model="emsPutrecDtFormL.gdsMtno" name="gdsMtno"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="gdecd" label="商品编码" required>
                        <ep-input disabled v-model="emsPutrecDtFormL.gdecd" name="gdecd"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="gdsNm" label="商品名称" required>
                        <ep-input disabled v-model="emsPutrecDtFormL.gdsNm" name="gdsNm"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="endprdGdsSpcfModelDesc" label="规格型号">
                        <ep-input disabled v-model="emsPutrecDtFormL.endprdGdsSpcfModelDesc" name="endprdGdsSpcfModelDesc" :maxlength="256"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="dclUnitcd" label="申报计量单位" required>
                        <ep-select disabled filterable v-model="emsPutrecDtFormL.dclUnitcd" name="dclUnitcd">
                          <ep-select-item v-for="(item, index) in dclUnitcd" :key="index" :index="item.unit" :label="item.unitName+'   '+item.unit">
                          </ep-select-item>
                        </ep-select>

                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="lawfUnitcd" label="法定计量单位" required>
                        <ep-select disabled filterable v-model="emsPutrecDtFormL.lawfUnitcd" name="secdLawfUnitcd">
                          <ep-select-item v-for="(item, index) in dclUnitcd" :key="index" :index="item.unit" :label="item.unitName+'   '+item.unit"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="secdLawfUnitcd" label="第二法定计量单位">
                        <ep-select disabled filterable v-model="emsPutrecDtFormL.secdLawfUnitcd" name="secdLawfUnitcd">
                          <ep-select-item v-for="(item, index) in dclUnitcd" :key="index" :index="item.unit" :label="item.unitName+'   '+item.unit"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="dclUprcAmt" label="单价">
                        <ep-input disabled v-model="emsPutrecDtFormL.dclUprcAmt" name="dclUprcAmt"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="dclCurrcd" label="币制">
                        <ep-select disabled filterable :label="curr" v-model="emsPutrecDtFormL.dclCurrcd" name="dclCurrcd">
                          <ep-select-item v-for="(item, index) in curr" :key="index" :index="item.currCode" :label="item.currName+' '+item.currCode"></ep-select-item>
                        </ep-select>

                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="dclQty" label="申报数量">
                        <ep-input disabled v-model="emsPutrecDtFormL.dclQty" name="dclQty"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="adjmtrMarkcd" label="辅料标记">
                        <ep-select disabled v-model="emsPutrecDtFormL.adjmtrMarkcd" name="adjmtrMarkcd">
                          <ep-select-item index="1" label="主料件"></ep-select-item>
                          <ep-select-item index="2" label="辅料件"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="modfMarkcd" label="修改标记">
                        <ep-select disabled v-model="emsPutrecDtFormL.modfMarkcd" name="modfMarkcd">
                          <ep-select-item index="0" label="未修改"></ep-select-item>
                          <ep-select-item index="1" label="修改"></ep-select-item>
                          <ep-select-item index="2" label="删除"></ep-select-item>
                          <ep-select-item index="3" label="增加"></ep-select-item>
                        </ep-select>

                      </ep-form-item>
                    </ep-col>
                   
                    <!--缺少征减免方式代码 -->

                    <ep-col :col="8">
                      <ep-form-item attr="mtpckEndprdTypecd" label="料件成品类型" required>
                        <ep-select disabled v-model="emsPutrecDtFormL.mtpckEndprdTypecd" name="mtpckEndprdTypecd">
                          <ep-select-item index="I" label="I-料件" selected></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="lvyrlfModecd" label="征减免方式">

                        <ep-select disabled v-model="emsPutrecDtFormL.lvyrlfModecd" name="lvyrlfModecd" filterable>
                          <ep-select-item v-for="(item, index) in dcllvy" :key="index" :index="item.dutyMode" :label="item.dutySpec+' '+item.dutyMode">
                          </ep-select-item>
                        </ep-select>

                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="qtyCntrMarkcd" label="数量控制标记">
                        <ep-select disabled v-model="emsPutrecDtFormL.qtyCntrMarkcd" name="qtyCntrMarkcd">
                          <ep-select-item index="1" label="控制数量"></ep-select-item>
                          <ep-select-item index="2" label="不控制数量"></ep-select-item>
                        </ep-select>

                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8">
                      <ep-form-item attr="etpsExeMarkcd" label="企业执行标记">
                        <ep-select disabled v-model="emsPutrecDtFormL.etpsExeMarkcd" name="etpsExeMarkcd">
                          <ep-select-item index="1" label="运行"></ep-select-item>
                          <ep-select-item index="2" label="停用"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="cusmExeMarkcd" label="海关执行标记">
                        <ep-select disabled v-model="emsPutrecDtFormL.cusmExeMarkcd" name="cusmExeMarkcd">
                          <ep-select-item index="1" label="正常执行"></ep-select-item>
                          <ep-select-item index="2" label="恢复执行"></ep-select-item>
                          <ep-select-item index="3" label="暂停变更"></ep-select-item>
                          <ep-select-item index="4" label="暂停进出口"></ep-select-item>
                          <ep-select-item index="5" label="暂停进口"></ep-select-item>
                          <ep-select-item index="6" label="暂停出口"></ep-select-item>
                          <ep-select-item index="7" label="全部暂停"></ep-select-item>
                        </ep-select>

                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="apprMaxSurpQty" label="批准最大余数量">
                        <ep-input disabled v-model="emsPutrecDtFormL.apprMaxSurpQty" name="apprMaxSurpQty"></ep-input>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8">
                      <ep-form-item attr="vclrPridInitQty" label="核销周期初始数量">
                        <ep-input disabled v-model="emsPutrecDtFormL.vclrPridInitQty" name="vclrPridInitQty"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="ucnsTqsnFlag" label="单耗质疑标志">
                        <ep-select disabled v-model="emsPutrecDtFormL.ucnsTqsnFlag" name="ucnsTqsnFlag">
                          <ep-select-item index="0" label="不质疑"></ep-select-item>
                          <ep-select-item index="1" label="质疑"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="csttnFlag" label="磋商标志">
                        <ep-select disabled v-model="emsPutrecDtFormL.csttnFlag" name="csttnFlag">
                          <ep-select-item index="0" label="未磋商"></ep-select-item>
                          <ep-select-item index="1" label="磋商"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="invtNo" label="记账清单编号">
                        <ep-input disabled v-model="emsPutrecDtFormL.invtNo" name="invtNo"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="invtGNo" label="记账清单商品序号">
                        <ep-input disabled v-model="emsPutrecDtFormL.invtGNo" name="invtGNo"></ep-input>
                      </ep-form-item>
                    </ep-col>
                     <ep-col :col="16">
                      <ep-form-item attr="rmk" label="备注">
                        <ep-input :readonly="true" v-model="emsPutrecDtFormL.rmk" name="rmk" type="textarea"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="24" v-show="this.$store.getters.getOrgType==4">
                      <div style="border:1px solid gray;width:100%;margin-bottom:20px;">

                        </div>
                        <ep-col :col="8">
                          <ep-form-item label="预录入统一编号" attr="seqNo" >
                            <ep-input v-model="emsPutrecDtFormL.seqNo" disabled name="seqNo"></ep-input>
                          </ep-form-item>
                        </ep-col>
                    </ep-col>
                    
                    
                  </ep-row>

                </ep-form>

              </ep-model>

              <!-- 料件明细查询 -->
              <div class="search-card contents-card card-margin">
                  <div class="panel panel-default">
                        <div class="card-title zero-padding"><span class="weight">查询列表</span></div>
                        <ep-form ref="customSearch" :form="customSearch" name-width="150px">
                          <ep-row :gutter="7" >
                            <ep-col :col="6">
                              <ep-form-item label="商品备案序号" attr="gdsSeqno">
                                <ep-input v-model="customSearch.gdsSeqno" name="gdsSeqno" ></ep-input>
                              </ep-form-item>
                            </ep-col>
                            <ep-col :col="6">
                              <ep-form-item label="商品料号" attr="gdsMtno">
                                <ep-input v-model="customSearch.gdsMtno" name="gdsMtno" ></ep-input>
                              </ep-form-item>
                            </ep-col>
                            <ep-col :col="6">
                              <ep-form-item label="商品编码" attr="gdecd">
                                <ep-input v-model="customSearch.gdecd" name="gdecd" ></ep-input>
                              </ep-form-item>
                            </ep-col>
                            <ep-col :col="6">
                              <ep-form-item label="商品名称" attr="gdsNm">
                                <ep-input v-model="customSearch.gdsNm" name="gdsNm" ></ep-input>
                              </ep-form-item>
                            </ep-col>
                          </ep-row>
                          <ep-row :gutter="7">
                            <ep-col :col="24">
                              <ep-button type="warning" size="small"  icon="refresh" @click="reset('customSearch')" >重置</ep-button>
                              <ep-button type="primary" size="small" icon="search" @click="customSearchBtn">查询</ep-button>
                            </ep-col>
                          </ep-row>
                         
                        </ep-form>
                      </div>
                      </div>

              <!--表格-->
              <div class="ep-card card-margin relative">
                <div class="card-body">
                  <div class="block">

                  </div>
                  <div class="block">
                    <ep-table ref="tableL" :height="400"  :head-color="headColor" :data="tableDataL" @selection-change="handleSelectL" @row-dblclick="selectInfo">
                      <!-- <ep-table-item type="select"></ep-table-item> -->

                      <ep-table-item column="gdsSeqno" width="160" title="商品备案序号"></ep-table-item>
                      <ep-table-item v-if="this.$store.getters.getOrgType==4" column="seqNo" title="预录入统一编号" width="200"></ep-table-item>
                      <ep-table-item column="mtpckEndprdTypecd" title="料件成品类型" width="160" :formatter="typeFormatter"></ep-table-item>
                      <ep-table-item column="gdsMtno" title="商品料号"></ep-table-item>
                      <ep-table-item column="gdecd" title="商品编码" width="160"></ep-table-item>
                      <ep-table-item column="gdsNm" title="商品名称" width="180"></ep-table-item>
                      <ep-table-item column="endprdGdsSpcfModelDesc" title="规格型号" width="300"></ep-table-item>
                      <ep-table-item column="dclUprcAmt" title="单价" width="160"></ep-table-item>
                      <ep-table-item column="dclCurrcd"  width="180" title="币制" :formatter="dclCurrcdTranslate"></ep-table-item>
                      <ep-table-item column="dclQty" title="申报数量"></ep-table-item>
                      <ep-table-item column="dclUnitcd" title="申报计量单位" width="160" :formatter="dclUnitcdTranslate"></ep-table-item>
                      <ep-table-item column="lawfUnitcd" title="法定计量单位" width="160" :formatter="lawfUnitcdTranslate"></ep-table-item>
                      <ep-table-item column="secdLawfUnitcd" title="第二法定计量单位" width="160" :formatter="secdLawfUnitcdTranslate"></ep-table-item>
                      
                      <ep-table-item column="lvyrlfModecd" title="征减免方式" :formatter="lvyrlfModecdChange"></ep-table-item>
                      <ep-table-item column="qtyCntrMarkcd" title="数量控制标记" width="160" :formatter="qtyCntrMarkcdChange"></ep-table-item>
                      <ep-table-item column="adjmtrMarkcd" title="辅料标记" :formatter="adjmtrMarkcdChange"></ep-table-item>
                      <ep-table-item column="modfMarkcd" title="修改标记" :formatter="modfMarkcdChange"></ep-table-item>
                      <ep-table-item column="etpsExeMarkcd" title="企业执行标记" width="160" :formatter="etpsExeMarkcdChange"></ep-table-item>
                      <ep-table-item column="cusmExeMarkcd" title="海关执行标记" width="160" :formatter="cusmExeMarkcdChange"></ep-table-item>
                      <ep-table-item column="apprMaxSurpQty" title="批准最大余数量" width="160"></ep-table-item>
                      <ep-table-item column="vclrPridInitQty" title="核销周期初始数量" width="160"></ep-table-item>
                      <ep-table-item column="ucnsTqsnFlag" title="单耗质疑标志" width="160" :formatter="ucnsTqsnFlagChange"></ep-table-item>
                      <ep-table-item column="csttnFlag" title="磋商标志" :formatter="csttnFlagChange"></ep-table-item>

                      <ep-table-item column="invtNo" title="记账清单编号" width="160"></ep-table-item>
                      <ep-table-item column="invtGNo" title="记账清单商品序号" width="160"></ep-table-item>
                      <ep-table-item column="rmk" title="备注" width="350">
                        <template slot-scope="props">
                          <p class="rmk-style">{{props.row.rmk}}</p>
                        </template>
                      </ep-table-item>
                    </ep-table>
                  </div>
                  <div class="block">
                        <ep-pager right @size-change="handleSizeChange1" @change="handleCurrentChange1" :now-page="ep_page1.page" :page-size="ep_page1.size" :total-num="totalcount1"></ep-pager>
                  </div>
                </div>
              </div>
            </div>

          </ep-tab-item>
          <ep-tab-item name="成品明细">
            <div>
              <ep-model title="成品明细" :wrap-close="false" v-model="emsPutrecDtFormCIsshow" width="1200px">
                <ep-form ref="emsPutrecDtFormC" :form="emsPutrecDtFormC" :rules="page_rules2" name-width="168px">
                  <ep-row :gutter="7">

                    <ep-col :col="8" style="display:none">
                      <ep-form-item attr="chgTmsCnt" label="变更次数" required>
                        <ep-input disabled v-model="emsPutrecDtFormC.chgTmsCnt" name="chgTmsCnt" :readonly="true"></ep-input>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8">
                      <ep-form-item attr="gdsSeqno" label="商品备案序号" required>
                        <ep-input disabled v-model="emsPutrecDtFormC.gdsSeqno" name="gdsSeqno"></ep-input>
                      </ep-form-item>
                    </ep-col>
                     
                    <ep-col :col="8">
                      <ep-form-item attr="gdsMtno" label="商品料号" required>
                        <ep-input disabled v-model="emsPutrecDtFormC.gdsMtno" name="gdsMtno"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="gdecd" label="商品编码" required>
                        <ep-input disabled v-model="emsPutrecDtFormC.gdecd" name="gdecd"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="gdsNm" label="商品名称" required>
                        <ep-input disabled v-model="emsPutrecDtFormC.gdsNm" name="gdsNm"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="endprdGdsSpcfModelDesc" label="规格型号">
                        <ep-input disabled v-model="emsPutrecDtFormC.endprdGdsSpcfModelDesc" name="endprdGdsSpcfModelDesc" :maxlength="256"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="dclUnitcd" label="申报计量单位" required>
                        <ep-select disabled filterable v-model="emsPutrecDtFormC.dclUnitcd" name="dclUnitcd">
                          <ep-select-item v-for="(item, index) in dclUnitcd" :key="index" :index="item.unit" :label="item.unitName+'   '+item.unit">
                          </ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="lawfUnitcd" label="法定计量单位" required>

                        <ep-select disabled filterable v-model="emsPutrecDtFormC.lawfUnitcd" name="lawfUnitcd">
                          <ep-select-item v-for="(item, index) in dclUnitcd" :key="index" :index="item.unit" :label="item.unitName+'   '+item.unit"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="secdLawfUnitcd" label="第二法定计量单位">
                        <ep-select disabled filterable v-model="emsPutrecDtFormC.secdLawfUnitcd" name="secdLawfUnitcd">
                          <ep-select-item v-for="(item, index) in dclUnitcd" :key="index" :index="item.unit" :label="item.unitName+'   '+item.unit"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="dclUprcAmt" label="单价">
                        <ep-input disabled v-model="emsPutrecDtFormC.dclUprcAmt" name="dclUprcAmt"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="dclCurrcd" label="币制">
                        <ep-select disabled filterable :label="curr" v-model="emsPutrecDtFormC.dclCurrcd" name="dclCurrcd" >
                          <ep-select-item v-for="(item, index) in curr" :key="index" :index="item.currCode" :label="item.currName+' '+item.currCode"></ep-select-item>
                        </ep-select>

                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="dclQty" label="申报数量">
                        <ep-input disabled v-model="emsPutrecDtFormC.dclQty" name="dclQty"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <!-- <ep-col :col="8">
                      <ep-form-item attr="adjmtrMarkcd" label="辅料标记">
                        <ep-select disabled v-model="emsPutrecDtFormC.adjmtrMarkcd" name="adjmtrMarkcd">
                          <ep-select-item index="1" label="主料件"></ep-select-item>
                          <ep-select-item index="2" label="辅料件"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col> -->
                    <ep-col :col="8">
                      <ep-form-item attr="modfMarkcd" label="修改标记" required>
                        <ep-select disabled v-model="emsPutrecDtFormC.modfMarkcd" name="modfMarkcd">
                          <ep-select-item index="0" label="未修改"></ep-select-item>
                          <ep-select-item index="1" label="修改"></ep-select-item>
                          <ep-select-item index="2" label="删除"></ep-select-item>
                          <ep-select-item index="3" label="增加"></ep-select-item>
                        </ep-select>

                      </ep-form-item>
                    </ep-col>
                   
                    <ep-col :col="8">
                      <ep-form-item attr="mtpckEndprdTypecd" label="料件成品类型" required>
                        <ep-select disabled v-model="emsPutrecDtFormC.mtpckEndprdTypecd" name="mtpckEndprdTypecd">
                          <ep-select-item index="E" label="E-成品"></ep-select-item>
                        </ep-select>

                      </ep-form-item>
                    </ep-col>
                    <!--缺少征减免方式代码 LVYRLF_MODECD-->
                    <ep-col :col="8">
                      <ep-form-item attr="lvyrlfModecd" label="征减免方式">

                        <ep-select disabled v-model="emsPutrecDtFormC.lvyrlfModecd" name="lvyrlfModecd" filterable>
                          <ep-select-item v-for="(item, index) in dcllvy" :key="index" :index="item.dutyMode" :label="item.dutySpec+' '+item.dutyMode">
                          </ep-select-item>
                        </ep-select>

                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="qtyCntrMarkcd" label="数量控制标记">
                        <ep-select disabled v-model="emsPutrecDtFormC.qtyCntrMarkcd" name="qtyCntrMarkcd">
                          <ep-select-item index="1" label="控制数量"></ep-select-item>
                          <ep-select-item index="2" label="不控制数量"></ep-select-item>
                        </ep-select>

                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8">
                      <ep-form-item attr="etpsExeMarkcd" label="企业执行标记">
                        <ep-select disabled v-model="emsPutrecDtFormC.etpsExeMarkcd" name="etpsExeMarkcd">
                          <ep-select-item index="1" label="运行"></ep-select-item>
                          <ep-select-item index="2" label="停用"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="cusmExeMarkcd" label="海关执行标记">
                        <ep-select v-model="emsPutrecDtFormC.cusmExeMarkcd" name="cusmExeMarkcd">
                          <ep-select-item index="1" label="正常执行"></ep-select-item>
                          <ep-select-item index="2" label="恢复执行"></ep-select-item>
                          <ep-select-item index="3" label="暂停变更"></ep-select-item>
                          <ep-select-item index="4" label="暂停进出口"></ep-select-item>
                          <ep-select-item index="5" label="暂停进口"></ep-select-item>
                          <ep-select-item index="6" label="暂停出口"></ep-select-item>
                          <ep-select-item index="7" label="全部暂停"></ep-select-item>
                        </ep-select>

                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="apprMaxSurpQty" label="批准最大余数量">
                        <ep-input disabled v-model="emsPutrecDtFormC.apprMaxSurpQty" name="apprMaxSurpQty"></ep-input>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8">
                      <ep-form-item attr="vclrPridInitQty" label="核销周期初始数量">
                        <ep-input disabled v-model="emsPutrecDtFormC.vclrPridInitQty" name="vclrPridInitQty"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="ucnsTqsnFlag" label="单耗质疑标志">
                        <ep-select disabled v-model="emsPutrecDtFormC.ucnsTqsnFlag" name="ucnsTqsnFlag">
                          <ep-select-item index="0" label="不质疑"></ep-select-item>
                          <ep-select-item index="1" label="质疑"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="csttnFlag" label="磋商标志">
                        <ep-select disabled v-model="emsPutrecDtFormC.csttnFlag" name="csttnFlag">
                          <ep-select-item index="0" label="未磋商"></ep-select-item>
                          <ep-select-item index="1" label="磋商"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="invtNo" label="记账清单编号">
                        <ep-input disabled v-model="emsPutrecDtFormC.invtNo" name="invtNo"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="invtGNo" label="记账清单商品序号">
                        <ep-input disabled v-model="emsPutrecDtFormC.invtGNo" name="invtGNo"></ep-input>
                      </ep-form-item>
                    </ep-col>
                     <ep-col :col="16">
                      <ep-form-item attr="rmk" label="备注">
                        <ep-input :readonly="true" v-model="emsPutrecDtFormC.rmk" name="rmk" type="textarea"></ep-input>
                      </ep-form-item>
                    </ep-col>
                      <ep-col :col="24" v-show="this.$store.getters.getOrgType==4">
                      <div style="border:1px solid gray;width:100%;margin-bottom:20px;">

                        </div>
                        <ep-col :col="8">
                          <ep-form-item label="预录入统一编号" attr="seqNo" >
                            <ep-input v-model="emsPutrecDtFormC.seqNo" disabled name="seqNo"></ep-input>
                          </ep-form-item>
                        </ep-col>
                    </ep-col>
                    
                  </ep-row>

                </ep-form>

              </ep-model>

              <!-- 成品明细查询 -->
              <div class="search-card contents-card card-margin">
                  <div class="panel panel-default">
                        <div class="card-title zero-padding"><span class="weight">查询列表</span></div>
                        <ep-form ref="customSearch1" :form="customSearch1" name-width="150px">
                          <ep-row :gutter="7" >
                            <ep-col :col="6">
                              <ep-form-item label="商品备案序号" attr="gdsSeqno">
                                <ep-input v-model="customSearch1.gdsSeqno" name="gdsSeqno" ></ep-input>
                              </ep-form-item>
                            </ep-col>
                            <ep-col :col="6">
                              <ep-form-item label="商品料号" attr="gdsMtno">
                                <ep-input v-model="customSearch1.gdsMtno" name="gdsMtno" ></ep-input>
                              </ep-form-item>
                            </ep-col>
                            <ep-col :col="6">
                              <ep-form-item label="商品编码" attr="gdecd">
                                <ep-input v-model="customSearch1.gdecd" name="gdecd" ></ep-input>
                              </ep-form-item>
                            </ep-col>
                            <ep-col :col="6">
                              <ep-form-item label="商品名称" attr="gdsNm">
                                <ep-input v-model="customSearch1.gdsNm" name="gdsNm" ></ep-input>
                              </ep-form-item>
                            </ep-col>
                          </ep-row>
                          <ep-row :gutter="7">
                            <ep-col :col="24">
                              <ep-button type="warning" size="small"  icon="refresh" @click="reset('customSearch1')" >重置</ep-button>
                              <ep-button type="primary" size="small" icon="search" @click="customSearchBtn1">查询</ep-button>
                            </ep-col>
                          </ep-row>
                         
                        </ep-form>
                      </div>
                      </div>

              <!--表格-->
              <div class="ep-card card-margin relative">
                <div class="card-body">
                  <div class="block">

                  </div>
                  <div class="block">
                    <ep-table ref="tableC" :height="400" :data="tableDataC" :head-color="headColor" @selection-change="handleSelectC" @row-dblclick="selectInfoc">
                      <!-- <ep-table-item type="select"></ep-table-item> -->

                      <ep-table-item column="gdsSeqno" width="160" title="商品备案序号"></ep-table-item>
                       <ep-table-item v-if="this.$store.getters.getOrgType==4" column="seqNo" title="预录入统一编号" width="200"></ep-table-item>
                      <ep-table-item column="mtpckEndprdTypecd" title="料件成品类型" width="160" :formatter="typeFormatter"></ep-table-item>
                      
                      <ep-table-item column="gdsMtno" title="商品料号"></ep-table-item>
                      <ep-table-item column="gdecd" title="商品编码" width="160"></ep-table-item>
                      <ep-table-item column="gdsNm" title="商品名称" width="180"></ep-table-item>
                      <ep-table-item column="endprdGdsSpcfModelDesc" title="规格型号" width="300"></ep-table-item>
                      <ep-table-item column="dclUprcAmt" title="单价" width="160"></ep-table-item>
                      <ep-table-item column="dclCurrcd" title="币制" width="180" :formatter="dclCurrcdTranslate"></ep-table-item>
                      <ep-table-item column="dclQty" title="申报数量"></ep-table-item>
                      <ep-table-item column="dclUnitcd" title="申报计量单位" width="160" :formatter="dclUnitcdTranslate"></ep-table-item>
                      <ep-table-item column="lawfUnitcd" title="法定计量单位" width="160" :formatter="lawfUnitcdTranslate"></ep-table-item>
                      <ep-table-item column="secdLawfUnitcd" title="第二法定计量单位" width="160" :formatter="secdLawfUnitcdTranslate"></ep-table-item>
                      
                      <ep-table-item column="lvyrlfModecd" title="征减免方式" :formatter="lvyrlfModecdChange"></ep-table-item>
                      <ep-table-item column="qtyCntrMarkcd" title="数量控制标记" width="160" :formatter="qtyCntrMarkcdChange"></ep-table-item>
                      <!-- <ep-table-item column="adjmtrMarkcd" title="辅料标记" :formatter="adjmtrMarkcdChange"></ep-table-item> -->
                      <ep-table-item column="modfMarkcd" title="修改标记" :formatter="modfMarkcdChange"></ep-table-item>
                      <ep-table-item column="etpsExeMarkcd" title="企业执行标记" width="160" :formatter="etpsExeMarkcdChange"></ep-table-item>
                      <ep-table-item column="cusmExeMarkcd" title="海关执行标记" width="160" :formatter="cusmExeMarkcdChange"></ep-table-item>
                      <ep-table-item column="apprMaxSurpQty" title="批准最大余数量" width="160"></ep-table-item>
                      <ep-table-item column="vclrPridInitQty" title="核销周期初始数量" width="160"></ep-table-item>
                      <ep-table-item column="ucnsTqsnFlag" title="单耗质疑标志" width="160" :formatter="ucnsTqsnFlagChange"></ep-table-item>
                      <ep-table-item column="csttnFlag" title="磋商标志" :formatter="csttnFlagChange"></ep-table-item>

                      <ep-table-item column="invtNo" title="记账清单编号" width="160"></ep-table-item>
                      <ep-table-item column="invtGNo" title="记账清单商品序号" width="160"></ep-table-item>
                      <ep-table-item column="rmk" title="备注" width="350">
                        <template slot-scope="props">
                          <p class="rmk-style">{{props.row.rmk}}</p>
                        </template>
                      </ep-table-item>
                    </ep-table>
                  </div>
                  <div class="block">
                        <ep-pager right @size-change="handleSizeChange2" @change="handleCurrentChange2" :now-page="ep_page2.page" :page-size="ep_page2.size" :total-num="totalcount2"></ep-pager>
                  </div>
                </div>
              </div>
            </div>
          </ep-tab-item>

          <ep-tab-item name="单耗明细">
            <div>

              <ep-model title="单耗明细" :wrap-close="false" v-model="emsPutrecUcnsDtFormIsshow" width="1200px">
                <ep-form ref="emsPutrecUcnsDtForm" :form="emsPutrecUcnsDtForm" :rules="page_rules3" name-width="168px">
                  <ep-row :gutter="7">

                    <ep-col :col="8" style="display:none">
                      <ep-form-item attr="chgTmsCnt" label="变更次数">
                        <ep-input disabled v-model="emsPutrecUcnsDtForm.chgTmsCnt" name="chgTmsCnt"></ep-input>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8">
                      <ep-form-item attr="endprdSeqno" label="成品序号">
                        <ep-input disabled v-model="emsPutrecUcnsDtForm.endprdSeqno" name="endprdSeqno"></ep-input>
                      </ep-form-item>
                    </ep-col>
                     
                    <ep-col :col="8">
                      <ep-form-item attr="mtpckSeqno" label="料件序号">
                        <ep-input disabled v-model="emsPutrecUcnsDtForm.mtpckSeqno" name="mtpckSeqno"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="ucnsVerno" label="单耗版本号">
                        <ep-input disabled v-model="emsPutrecUcnsDtForm.ucnsVerno" name="ucnsVerno"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="ucnsQty" label="单耗数量">
                        <ep-input disabled v-model="emsPutrecUcnsDtForm.ucnsQty" name="ucnsQty"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="netUseupQty" label="净耗数量">
                        <ep-input disabled v-model="emsPutrecUcnsDtForm.netUseupQty" name="netUseupQty"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="tgblLossRate" label="有形损耗率(%)">
                        <ep-input disabled v-model="emsPutrecUcnsDtForm.tgblLossRate" name="tgblLossRate"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="intgbLossRate" label="无形损耗率(%)">
                        <ep-input disabled v-model="emsPutrecUcnsDtForm.intgbLossRate" name="intgbLossRate"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="ucnsDclStucd" label="单耗申报状态">
                        <ep-select disabled v-model="emsPutrecUcnsDtForm.ucnsDclStucd" name="ucnsDclStucd">
                          <!-- <ep-select-item index="1" label="未申报"></ep-select-item> -->
                          <ep-select-item index="2" label="已申报"></ep-select-item>
                          <ep-select-item index="3" label="已确定"></ep-select-item>
                        </ep-select>

                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="modfMarkcd" label="修改标记">
                        <ep-select disabled v-model="emsPutrecUcnsDtForm.modfMarkcd" name="modfMarkcd">
                          <ep-select-item index="0" label="未修改"></ep-select-item>
                          <ep-select-item index="1" label="修改"></ep-select-item>
                          <ep-select-item index="2" label="删除"></ep-select-item>
                          <ep-select-item index="3" label="增加"></ep-select-item>
                        </ep-select>

                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="bondMtpckPrpr" label="保税料件比例(%)">
                        <ep-input disabled v-model="emsPutrecUcnsDtForm.bondMtpckPrpr" name="bondMtpckPrpr"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="etpsExeMarkcd" label="企业执行标记">
                        <ep-select disabled v-model="emsPutrecUcnsDtForm.etpsExeMarkcd" name="etpsExeMarkcd">
                          <ep-select-item index="1" label="运行"></ep-select-item>
                          <ep-select-item index="2" label="停用"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8">
                      <ep-form-item label="结束有效日期" attr="finishValidDate">
                        <ep-date disabled v-model="emsPutrecUcnsDtForm.finishValidDate" name="finishValidDate"></ep-date>

                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="16">
                      <ep-form-item attr="rmk" label="备注">
                        <ep-input :readonly="true" v-model="emsPutrecUcnsDtForm.rmk" name="rmk" type="textarea"></ep-input>
                      </ep-form-item>
                    </ep-col>
                     <ep-col :col="24" v-show="this.$store.getters.getOrgType==4">
                      <div style="border:1px solid gray;width:100%;margin-bottom:20px;">

                        </div>
                        <ep-col :col="8">
                          <ep-form-item label="预录入统一编号" attr="seqNo" >
                            <ep-input v-model="emsPutrecUcnsDtForm.seqNo" disabled name="seqNo"></ep-input>
                          </ep-form-item>
                        </ep-col>
                        <ep-col :col="8">
                          <ep-form-item label="单耗有效期" attr="validDate" required>
                            <ep-date v-model="emsPutrecUcnsDtForm.validDate" disabled name="validDate" ></ep-date>
                          </ep-form-item>
                        </ep-col>
                    </ep-col>
                   

                  </ep-row>

                </ep-form>
              </ep-model>

              <!-- 单耗明细查询 -->
              <div class="search-card contents-card card-margin">
                  <div class="panel panel-default">
                        <div class="card-title zero-padding"><span class="weight">查询列表</span></div>
                        <ep-form ref="customSearch2" :form="customSearch2" name-width="150px">
                          <ep-row :gutter="7" >
                            <ep-col :col="6">
                              <ep-form-item label="成品序号" attr="endprdSeqno">
                                <ep-input v-model="customSearch2.endprdSeqno" name="endprdSeqno" ></ep-input>
                              </ep-form-item>
                            </ep-col>
                            <ep-col :col="6">
                              <ep-form-item label="料件序号" attr="mtpckSeqno">
                                <ep-input v-model="customSearch2.mtpckSeqno" name="mtpckSeqno" ></ep-input>
                              </ep-form-item>
                            </ep-col>
                            <!-- <ep-col :col="6">
                              <ep-form-item label="商品编码" attr="gdecd">
                                <ep-input v-model="customSearch2.gdecd" name="gdecd" ></ep-input>
                              </ep-form-item>
                            </ep-col>
                            <ep-col :col="6">
                              <ep-form-item label="商品名称" attr="gdsNm">
                                <ep-input v-model="customSearch2.gdsNm" name="gdsNm" ></ep-input>
                              </ep-form-item>
                            </ep-col> -->
                          </ep-row>
                          <ep-row :gutter="7">
                            <ep-col :col="24">
                              <ep-button type="warning" size="small"  icon="refresh" @click="reset('customSearch2')" >重置</ep-button>
                              <ep-button type="primary" size="small" icon="search" @click="customSearchBtn2">查询</ep-button>
                            </ep-col>
                          </ep-row>
                         
                        </ep-form>
                      </div>
                      </div>

              <!--表格-->
              <div class="ep-card card-margin relative">
                <div class="card-body">
                  <div class="block">

                  </div>
                  <div class="block">
                    <ep-table ref="table1" :height="400" :data="table1Data" @selection-change="handleSelect1" :loading="loading" :head-color="headColor" @row-dblclick="select1Info">
                      <!-- <ep-table-item type="select"></ep-table-item> -->

                      <ep-table-item column="endprdSeqno" title="成品序号"></ep-table-item>
                      <ep-table-item column="mtpckSeqno" title="料件序号"></ep-table-item>
                       <ep-table-item v-if="this.$store.getters.getOrgType==4" column="seqNo" title="预录入统一编号" width="200"></ep-table-item>
                      <ep-table-item column="ucnsVerno" title="单耗版本号"></ep-table-item>
                      <ep-table-item column="ucnsQty" title="单耗数量"></ep-table-item>
                      <ep-table-item column="netUseupQty" title="净耗数量"></ep-table-item>
                      <ep-table-item column="tgblLossRate" width="160" title="有形损耗率(%)"></ep-table-item>
                      <ep-table-item column="intgbLossRate" width="160" title="无形损耗率(%)"></ep-table-item>
                      <ep-table-item column="ucnsDclStucd" title="单耗申报状态" width="160" :formatter="ucnsDclStucdChange"></ep-table-item>
                      <ep-table-item column="modfMarkcd" title="修改标记" :formatter="modfMarkcdChange"></ep-table-item>

                      <ep-table-item column="bondMtpckPrpr" title="保税料件比例(%)" width="160"></ep-table-item>
                      <ep-table-item column="etpsExeMarkcd" title="企业执行标记" width="160" :formatter="etpsExeMarkcdChange"></ep-table-item>
                      <ep-table-item column="finishValidDate" title="结束有效日期" width="160"></ep-table-item>
                      <ep-table-item v-if="this.$store.getters.getOrgType==4" column="validDate" title="单耗有效期" width="160"></ep-table-item>
                      <ep-table-item column="rmk" title="备注" width="350">
                        <template slot-scope="props">
                          <p class="rmk-style">{{props.row.rmk}}</p>
                        </template>
                      </ep-table-item>
                    </ep-table>
                  </div>
                  <div class="block">
                        <ep-pager right @size-change="handleSizeChange3" @change="handleCurrentChange3" :now-page="ep_page3.page" :page-size="ep_page3.size" :total-num="totalcount3"></ep-pager>
                  </div>
                </div>
              </div>
            </div>
          </ep-tab-item>

          <ep-tab-item name="随附单证" v-if="false">
            <div>
              <ep-model title="随附单证" :wrap-close="false" v-model="emsPutrecAcmpFormDtFormIsshow" width="900px">
                <ep-form ref="emsPutrecAcmpFormDtForm" :form="emsPutrecAcmpFormDtForm" :rules="page_rules4" name-width="138px">
                  <ep-row :gutter="7">
                    <ep-col :col="12" style="display:none">
                      <ep-form-item attr="chgTmsCnt" label="变更次数">
                        <ep-input disabled v-model="emsPutrecAcmpFormDtForm.chgTmsCnt" name="chgTmsCnt"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="12">
                      <ep-form-item attr="acmpFormSeqno" label="随附单证序号">
                        <ep-input disabled v-model="emsPutrecAcmpFormDtForm.acmpFormSeqno" name="acmpFormSeqno"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="12">
                      <ep-form-item attr="formTypecd" label="文件类型">
                        <ep-select disabled v-model="emsPutrecAcmpFormDtForm.formTypecd" name="formTypecd">
                          <ep-select-item index="R" label="R-减免税证明"></ep-select-item>
                          <ep-select-item index="FILE" label="FILE-文件"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="12">
                      <ep-form-item attr="formNo" label="随附单证编号">
                        <ep-input disabled v-model="emsPutrecAcmpFormDtForm.formNo" name="formNo"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="12">
                      <ep-form-item attr="fixdNo" label="固定编号">
                        <ep-input disabled v-model="emsPutrecAcmpFormDtForm.fixdNo" name="fixdNo"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="12">
                      <ep-form-item attr="acmpFormFileNm" label="随附单证文件名称">
                        <ep-input disabled v-model="emsPutrecAcmpFormDtForm.acmpFormFileNm" name="acmpFormFileNm" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="12">
                      <ep-form-item attr="uploadTime" label="上传时间">
                        <ep-input disabled v-model="emsPutrecAcmpFormDtForm.uploadTime" name="uploadTime"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="12">
                      <ep-form-item attr="userName" label="上传人">
                        <ep-input disabled v-model="emsPutrecAcmpFormDtForm.userName" name="userName"></ep-input>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="24">
                      <ep-form-item attr="rmk" label="备注">
                        <ep-input :readonly="true" v-model="emsPutrecAcmpFormDtForm.rmk" name="rmk" type="textarea"></ep-input>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8">
                      <div class="block">

                      </div>
                    </ep-col>
                  </ep-row>

                </ep-form>
              </ep-model>

              <!--表格-->
              <div class="ep-card card-margin relative">
                <div class="card-body">
                  <div class="block">

                  </div>
                  <div class="block">
                    <ep-table ref="table2" :height="400" :data="table2Data" @selection-change="handleSelect2" :loading="loading" :head-color="headColor" @row-dblclick="select2Info">
                      <!-- <ep-table-item type="select"></ep-table-item> -->
                      <ep-table-item column="acmpFormSeqno" title="随附单证序号" width="150"></ep-table-item>

                      <ep-table-item column="formTypecd" title="文件类型" width="150" :formatter="acmpFormTypecdChange"></ep-table-item>
                      <ep-table-item column="formNo" title="随附单证编号" width="150"></ep-table-item>
                      <ep-table-item column="fixdNo" title="固定编号" width="150"></ep-table-item>
                      <ep-table-item column="userName" title="上传人" width="150"></ep-table-item>
                      <ep-table-item column="uploadTime" title="上传时间" width="150"></ep-table-item>
                      <ep-table-item column="acmpFormFileNm" title="文件名称" width="150"></ep-table-item>
                       <ep-table-item column="fixdNo" title="附件下载" width="150">
                            <template slot-scope="props">
                             <div  style="width: 50px;text-align: center;background-color: #2196f3;height: 20px;line-height: 20px;cursor: pointer;border-radius: 2px;color: #fff;" @click.stop="downLoad(props.row)">下载</div>
                            </template>
                      </ep-table-item>
                      <ep-table-item column="rmk" title="备注" width="350">
                        <template slot-scope="props">
                          <p class="rmk-style">{{props.row.rmk}}</p>
                        </template>
                      </ep-table-item>
                    </ep-table>
                  </div>
                </div>
              </div>
            </div>
          </ep-tab-item>

          <ep-tab-item name="操作记录" v-if="false">
            <div>
              <ep-model title="操作记录" :wrap-close="false" v-model="selectEmsPutrecStatus" width="1200px">
                <ep-form ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="7">

                    <ep-col :col="8">
                      <ep-form-item attr="createTime" label="创建时间" required>
                        <ep-input disabled v-model="emsPutrecStatusDtForm.createTime" name="createTime"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="optStatus" label="操作状态" required>
                        <ep-select disabled v-model="emsPutrecStatusDtForm.optStatus" name="optStatus">
                          	<ep-select-item :index="item.value" v-for="(item,k) in optionStatusList" :key="k" :label="item.label"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8" style="display:none">
                      <ep-form-item attr="optUserId" label="操作人员id" required>
                        <ep-input disabled v-model="emsPutrecStatusDtForm.optUserId" name="optUserId"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="optUserName" label="操作人">
                        <ep-input disabled v-model="emsPutrecStatusDtForm.optUserName" name="optUserName"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="optTime" label="操作时间">
                        <ep-input disabled v-model="emsPutrecStatusDtForm.optTime" name="optTime"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8" style="display:none">
                      <ep-form-item attr="fileName" label="文件名称" required>
                        <ep-input :readonly="true" v-model="emsPutrecStatusDtForm.fileName" name="fileName"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="24">
                      <ep-form-item attr="remark" label="备注">
                        <ep-input type="textarea" :rows="4" :readonly="true" v-model="emsPutrecStatusDtForm.remark" name="remark"></ep-input>
                      </ep-form-item>
                    </ep-col>

                  </ep-row>

                </ep-form>
              </ep-model>

              <!--表格-->
              <div class="ep-card card-margin relative">
                <div class="card-body">
                  <div class="block">

                  </div>
                  <div class="block">
                    <ep-table ref="table3" :height="400" :data="table3Data" :loading="loading" :head-color="headColor" @row-dblclick="select3Info">
                      <!-- <ep-table-item type="select"></ep-table-item> -->
                      <ep-table-item column="createTime" title="创建时间" width="200"></ep-table-item>
                      <ep-table-item column="optStatus" title="操作状态" width="160" :formatter="optStatusFormatter"></ep-table-item>
                      <ep-table-item column="optUserName" title="操作人" :formatter="optUser" width="160"></ep-table-item>
                      <ep-table-item column="optTime" title="操作时间" width="200"></ep-table-item>
                      <ep-table-item column="remark" title="备注" >
                        <template slot-scope="props">
                          <p class="rmk-style">{{props.row.remark}}</p>
                        </template>
                      </ep-table-item>

                    </ep-table>
                  </div>
                </div>
              </div>
            </div>
          </ep-tab-item>

        </ep-tabs>

      </div>
    </div>
  </div>

</template>


<script>
import misList from "src/common/mislist";
import { cloneObj } from "utils";
import { getToken} from 'src/utils/oauth'
import mixin from "./mixin"
export default {
  name: "accountBookDetilInfo", // 保持和文件名一致，否则keep-alive不会动态缓存

  extends: misList, // 务必继承
  mixins:[mixin],
  created() {
    let customList = this.$store.getters.getCustomList;
    this.tradeInfo = customList;
    let unitList = this.$store.getters.getUnitList;
    this.dclUnitcd = unitList;
    let currList = this.$store.getters.getCurrList;
    this.curr = currList;
    let levymodeList = this.$store.getters.getLevymodeList;
    this.dcllvy = levymodeList;
  },
  mounted() {
    let data = {};
    data["id"] = this.$route.query.id;
    this.$post("queryEmsPutrecInfo", data)
      .then(responseData => {
        let bodyFormParams = responseData.map.data;
        this.bodyForm = bodyFormParams;
        this.bodyForm.orgId = this.$store.getters.getId;
        this.bodyForm.orgCode = this.$store.getters.getOrgCode;
        if (responseData.map.data.emsPutrecDt != null) {
          // let emsPutrecDt = responseData.map.data.emsPutrecDt;
          // let tableDataL = [];
          // let tableDataC = [];
          // emsPutrecDt.forEach(function(item, index) {
          //   if (item.mtpckEndprdTypecd == "I") {
          //     tableDataL.push(item);
          //   } else if (item.mtpckEndprdTypecd == "E") {
          //     tableDataC.push(item);
          //   }
          // });
          // this.tableDataL = tableDataL;
          // this.tableDataC = tableDataC;
          let emsPutrecDt = responseData.map.data.emsPutrecDt;
          let tableDataCopy = cloneObj(emsPutrecDt)
          tableDataCopy.forEach((e,i)=>{
            e.leadId = i
          })
          this.tableDataCopy = tableDataCopy
          this.makePaging(10,1,this.tableDataCopy)
          }

        if (responseData.map.data.emsPutrecUcnsDt != null) {
          // let table1Data = responseData.map.data.emsPutrecUcnsDt;
         
          // this.table1Data = table1Data;
           this.tableDataCopy1 = cloneObj(responseData.map.data.emsPutrecUcnsDt)
          this.makePaging2(10,1,this.tableDataCopy1)
        }

        if (responseData.map.data.emsPutrecStatus != null) {
          this.table3Data = responseData.map.data.emsPutrecStatus;
        }
        this.getFiles(this.bodyForm.id, 2);

        this.headFormId = this.bodyForm.id;
      
      })
      .catch(e => {
        this.loading = false;
      });
  },
  data() {
    var test = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else {
        if (value.substring(0, 3) === "EDI") {
          callback("不能为EDI开头");
        }
        callback();
      }
    };
    return {
      upath: "",
      upathName: "", //文件名字
      flie_switch: true, // 显示上传附件窗口
      flag_tabs: false,
      drop: [],
      dclUnitcd: "",
       ep_page1: {
        size: 10,
        page: 1
      },
      tableDataCopy:[],
      totalcount1: 0,
      ep_page2: {
        size: 10,
        page: 1
      },
      totalcount2: 0,
      
      customSearch:{
        gdsSeqno:"",
        gdsMtno:"",
        gdecd:"",
        gdsNm:""
      },
      customSearch1:{
        gdsSeqno:"",
        gdsMtno:"",
        gdecd:"",
        gdsNm:""
      },
      ep_page3: {
        size: 10,
        page: 1
      },
      customSearch2:{
        endprdSeqno:"",
        mtpckSeqno:"",
        // gdecd:"",
        // gdsNm:""
      },
      tableDataCopy1:[],
      totalcount3: 0,
      unit: [],
      curr: [],
      dcllvy: [],
      loading: false,
      emsPutrecDtFormLIsshow: false,
      emsPutrecDtFormCIsshow: false,
      emsPutrecUcnsDtFormIsshow: false,
      emsPutrecAcmpFormDtFormIsshow: false,
      selectEmsPutrecStatus: false,
      headColor: true,
      headFormId: "",
      tableDataC: [],
      masterCuscdName: "",

      bodyForm: {
        id: "",
        tradeId: "",
        orgId: "",
        usageTypecd:"",
        orgCode: this.$store.getters.getOrgCode,
        emsNo: "",
        dclUnitcd: "",
        chgTmsCnt: "",
        etpsPreentNo: "",
        masterCuscd: "",
        bizopEtpsSccd: "",
        bizopEtpsno: "",
        bizopEtpsNm: "",
        rvsngdEtpsSccd: "",
        rcvgdEtpsno: "",
        rcvgdEtpsNm: "",
        dclEtpsSccd: "",
        dclEtpsNo: "",
        dclEtpsNm: "",
        dclEtpsTypecd: "",
        emsTypecd: "",
        dclTypecd: "",
        finishValidDate: "",
        apcredNo: "",
        netwkEtpsArcrpNo: "",
        maxTovrAmt: "",
        dclTime: "",
        ucnsDclSegcd: "",
        dclMarkcd: "",
        emapvStucd: "",
        pauseImpexpMarkcd: "",
        pauseChgMarkcd: "",
        putrecApprTime: "",
        chgApprTime: "",
        rcntVclrTime: "",
        vclrApplyTime: "",
        vclrPridVal: "",
        adjaccMarkcd: "",
        adjaccTmsCnt: "",
        ucnsVernoCntrFlag: "",
        rcasemarkcd: "",
        etpsPosesSadjaQuaFlag: "",
        rmk: "",
        maxApprImpAmt: "",
        vclrTypecd: "",
        col1: "",
        col2: "",
        col3: "",
        col4: "",
        emsPutrecDt: [],
        emsPutrecUcnsDt: [],
        emsPutrecAcmpFormDt: []
      },
      tradeInfo: [],
      tableData: [],
      table1Data: [],
      table2Data: [],
      table3Data: [],
      tableDataC: [],
      tableDataL: [],
      emsPutrecDtForm: {},
      emsPutrecUcnsDtForm: {
        chgTmsCnt: "0",
        orgId: this.$store.getters.getId,
        orgCode: this.$store.getters.getOrgCode
      },
      emsPutrecAcmpFormDtForm: {
        chgTmsCnt: "0",
        orgId: this.$store.getters.getId,
        orgCode: this.$store.getters.getOrgCode
      },
      buttonStatusC: 0,
      buttonStatusL: 0,
      button1Status: 0,
      button2Status: 0,

      selectLength: 0,
      select1Length: 0,
      select2Length: 0,
      selectItemsC: [],
      selectItemsL: [],
      selectItems: [],
      select1Items: [],
      select2Items: [],
      DelKey: 0,
      Del1Key: 0,
      Del2Key: 0,
      DelKeyC: 0,
      DelKeyL: 0,
      emsPutrecDtFormL: {
        pid: "",
        mtpckEndprdTypecd: "I",
        chgTmsCnt: "0",
        orgId: this.$store.getters.getId,
        orgCode: this.$store.getters.getOrgCode,
        emsNo: "",
        gdsSeqno: "",
        gdsMtno: "",
        gdecd: "",
        gdsNm: "",
        dclUnitcd: "",
        lawfUnitcd: "",
        secdLawfUnitcd: "",
        adjmtrMarkcd: "",
        dclCurrcd: "",
        csttnFlag: "0",
        ucnsTqsnFlag: "0",
        qtyCntrMarkcd: "",
        cusmExeMarkcd: "1",
        lvyrlfModecd: "",

        modfMarkcd: "",
        etpsExeMarkcd: "1",
        rmk: "",
        invtNo: "",
        invtGNo: ""
      },
      emsPutrecDtFormC: {
        mtpckEndprdTypecd: "E",
        chgTmsCnt: "0",
        orgId: this.$store.getters.getId,
        orgCode: this.$store.getters.getOrgCode,
        pid: "",
        emsNo: "",
        gdsSeqno: "",
        gdsMtno: "",
        gdecd: "",
        gdsNm: "",
        dclUnitcd: "",
        lawfUnitcd: "",
        secdLawfUnitcd: "",
        adjmtrMarkcd: "",
        dclCurrcd: "",
        csttnFlag: "0",
        ucnsTqsnFlag: "0",
        qtyCntrMarkcd: "",
        cusmExeMarkcd: "1",
        lvyrlfModecd: "",

        modfMarkcd: "",
        etpsExeMarkcd: "1",
        rmk: ""
      },
      emsPutrecUcnsDtForm: {
        chgTmsCnt: "0",
        orgId: this.$store.getters.getId,
        orgCode: this.$store.getters.getOrgCode,
        pid: "",
        emsNo: "",
        gdsSeqno: "",
        endprdSeqno: "",
        finishValidDate: "",
        mtpckSeqno: "",
        ucnsQty: "",
        modfMarkcd: "",
        netUseupQty: "",
        tgblLossRate: "",
        intgbLossRate: "",
        ucnsDclStucd: "",
        secdLawfUnitcd: "",
        bondMtpckPrpr: "",
        etpsExeMarkcd: "1",
        rmk: ""
      },
      emsPutrecStatusDtForm: {},
      emsPutrecAcmpFormDtForm: {
        chgTmsCnt: "0",
        orgId: this.$store.getters.getId,
        orgCode: this.$store.getters.getOrgCode,
        sasDclNo: "",
        id: "",
        acmpFormNo: "",
        fixdNo: "",
        formNo: "",
        acmpFormFileNm: "",
        rmk: "",
        pid: "",
        formTypecd: ""
      },

      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      ep_data: [], //表格数据
      page_rules: {
        
        orgId: { required: true, message: "不能为空", trigger: "change" },
        vclrTypecd: { required: true, message: "不能为空", trigger: "change" },
        // chgTmsCnt: { required: true, message: "不能为空", trigger: "change" },
        etpsPreentNo: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        masterCuscd: { required: true, message: "不能为空", trigger: "change" },
        bizopEtpsSccd: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        bizopEtpsno: { required: true, message: "不能为空", trigger: "change" },
        bizopEtpsNm: { required: true, message: "不能为空", trigger: "change" },
        rcvgdEtpsno: { required: true, message: "不能为空", trigger: "change" },
        rcvgdEtpsNm: { required: true, message: "不能为空", trigger: "change" },
        netwkEtpsArcrpNo: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        emsTypecd: { required: true, message: "不能为空", trigger: "change" },
        dclTypecd: { required: true, message: "不能为空", trigger: "change" },
        finishValidDate: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },

        headStatusCn: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        apcredNo: { required: true, message: "不能为空", trigger: "change" },
        ucnsDclSegcd: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },

        maxApprImpAmt: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        vclrPridVal: { required: true, message: "不能为空", trigger: "change" }
      },
      page_rules1: {
        pid: { required: true, message: "不能为空", trigger: "change" },
        orgId: { required: true, message: "不能为空", trigger: "change" },
        modfMarkcd: { required: true, message: "不能为空", trigger: "change" },
        chgTmsCnt: { required: true, message: "不能为空", trigger: "change" },
        gdsSeqno: { required: true, message: "不能为空", trigger: "change" },
        mtpckEndprdTypecd: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        gdsMtno: { required: true, message: "不能为空", trigger: "change" },
        gdecd: { required: true, message: "不能为空", trigger: "change" },
        gdsNm: { required: true, message: "不能为空", trigger: "change" },
        dclUnitcd: { required: true, message: "不能为空", trigger: "change" },
        lawfUnitcd: { required: true, message: "不能为空", trigger: "change" },
        endprdGdsSpcfModelDesc: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        etpsExeMarkcd: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        adjmtrMarkcd: { required: true, message: "不能为空", trigger: "change" }
      },
      page_rules2: {
        pid: { required: true, message: "不能为空", trigger: "change" },
        orgId: { required: true, message: "不能为空", trigger: "change" },
        modfMarkcd: { required: true, message: "不能为空", trigger: "change" },
        chgTmsCnt: { required: true, message: "不能为空", trigger: "change" },
        gdsSeqno: { required: true, message: "不能为空", trigger: "change" },
        mtpckEndprdTypecd: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        gdsMtno: { required: true, message: "不能为空", trigger: "change" },
        gdecd: { required: true, message: "不能为空", trigger: "change" },
        gdsNm: { required: true, message: "不能为空", trigger: "change" },
        dclUnitcd: { required: true, message: "不能为空", trigger: "change" },
        lawfUnitcd: { required: true, message: "不能为空", trigger: "change" },
        endprdGdsSpcfModelDesc: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        etpsExeMarkcd: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        // adjmtrMarkcd: { required: true, message: "不能为空", trigger: "change" }
      },
      page_rules3: {
        finishValidDate: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        pid: { required: true, message: "不能为空", trigger: "change" },
        orgId: { required: true, message: "不能为空", trigger: "change" },
        modfMarkcd: { required: true, message: "不能为空", trigger: "change" },

        chgTmsCnt: { required: true, message: "不能为空", trigger: "change" },
        endprdSeqno: { required: true, message: "不能为空", trigger: "change" },
        mtpckSeqno: { required: true, message: "不能为空", trigger: "change" },
        ucnsQty: { required: true, message: "不能为空", trigger: "change" },
        netUseupQty: { required: true, message: "不能为空", trigger: "change" },
        tgblLossRate: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        intgbLossRate: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        ucnsDclStucd: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },

        bondMtpckPrpr: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        etpsExeMarkcd: {
          required: true,
          message: "不能为空",
          trigger: "change"
        }
      },
      page_rules4: {
        orgId: { required: true, message: "不能为空", trigger: "change" },
        acmpFormSeqno: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        acmpFormTypecd: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        acmpFormNo: { required: true, message: "不能为空", trigger: "change" },
        fixdNo: { required: true, message: "不能为空", trigger: "change" }
      }
    };
  },
  methods: {
     changeTitle(e){
          if(e=="料件明细"){
            this.customSearchBtn()
          }
          if(e=="成品明细"){
            this.customSearchBtn1()
          }
      },
     customSearchBtn(){
      let filterData = this.filterData(this.customSearch,this.tableDataCopy)
      this.makePaging(10,1,filterData)
    },
     customSearchBtn1(){
      let filterData = this.filterData(this.customSearch1,this.tableDataCopy)
      this.makePaging1(10,1,filterData)
    },
     customSearchBtn2(){
      let filterData = this.filterData(this.customSearch2,this.tableDataCopy1)
      this.makePaging2(10,1,filterData)
    },
    filterData(condition,data){
       let filter = (condition, data) => {
        return data.filter( item => {
          return Object.keys( condition ).every( key => {
            if(condition[ key ] == '') return true
            let diff = key == 'gdsNm' 
             ? String( item[ key ] ).toLowerCase().indexOf( String( condition[ key ] ).trim().toLowerCase() ) !== -1
             : String( item[ key ] ).toLowerCase() == String( condition[ key ] ).trim().toLowerCase()
            return diff
          })
          
        })
      }
      return filter(condition,data)
    },
    handleSizeChange1(val){
      console.log("第一个")
      this.ep_page1.size = val
      this.makePaging(this.ep_page1.size,this.ep_page1.page, this.filterData(this.customSearch,this.tableDataCopy))
    },
    handleCurrentChange1(val){
      console.log("第一个")
      this.ep_page1.page = val
      this.makePaging(this.ep_page1.size,this.ep_page1.page,this.filterData(this.customSearch,this.tableDataCopy))
    },
    handleSizeChange2(val){
      console.log("第二个")
      this.ep_page2.size = val
      this.makePaging1(this.ep_page2.size,this.ep_page2.page, this.filterData(this.customSearch1,this.tableDataCopy))
    },
    handleCurrentChange2(val){
      console.log("第二个")
      this.ep_page2.page = val
      this.makePaging1(this.ep_page2.size,this.ep_page2.page,this.filterData(this.customSearch1,this.tableDataCopy))
    },
    handleSizeChange3(val){
      console.log("第3个")
      this.ep_page3.size = val
      this.makePaging2(this.ep_page3.size,this.ep_page3.page, this.filterData(this.customSearch2,this.tableDataCopy1))
    },
    handleCurrentChange3(val){
      console.log("第3个")
      this.ep_page3.page = val
      this.makePaging2(this.ep_page3.size,this.ep_page3.page,this.filterData(this.customSearch2,this.tableDataCopy1))
    },
    makePaging(size,page,data){
      let begin = (page-1)*size
      let end = begin + size
      let tableDataL = []
      let tableDataC = []
      data.forEach((item, index)=> {
        if (item.mtpckEndprdTypecd == "I") {
          tableDataL.push(item);
        } else if (item.mtpckEndprdTypecd == "E") {
          tableDataC.push(item);
        }
      });
      this.totalcount1 = tableDataL.length
      this.tableDataL = tableDataL.slice(begin,end)

    },
    makePaging1(size,page,data){
      let begin = (page-1)*size
      let end = begin + size
      let tableDataL = []
      let tableDataC = []
      data.forEach((item, index)=> {
        if (item.mtpckEndprdTypecd == "I") {
          tableDataL.push(item);
        } else if (item.mtpckEndprdTypecd == "E") {
          tableDataC.push(item);
        }
      });
      this.totalcount2 = tableDataC.length
      this.tableDataC = tableDataC.slice(begin,end)

    },
    makePaging2(size,page,data){
      let begin = (page-1)*size
      let end = begin + size
      let newData = data.slice(begin,end)
      this.totalcount3 = data.length
      this.table1Data = newData

    },
     downLoad(row){
      window.location.href=global.HOST+"/tool/file/downloadFile?pid="+(row.pid)+"&businessType="+(row.businessType)+"&bigdataId="+(row.bigdataId)+"&token="+getToken()
    },
    optUser(row,index){
      if(row.optStatus == "0"){
        return "海关回执"
      }else{
        return row.optUserName
      }

    },
    getFiles(pid, busType) {
      this.$post("getFile", {
        pid: pid,
        businessType: busType,
        size: 10,
        page: 1
      })
        .then(res => {
          if (res.status == 1) {
            this.table2Data = res.map.data.content;
          }
        })
        .catch(e => {});
    },
    selectInfo(event, row, index) {
      this.emsPutrecDtFormL = row;
      this.emsPutrecDtFormLIsshow = true;
    },
    selectInfoc(event, row, index) {
      this.emsPutrecDtFormC = row;
      this.emsPutrecDtFormCIsshow = true;
    },
    select1Info(event, row, index) {
      this.emsPutrecUcnsDtForm = row;
      this.emsPutrecUcnsDtFormIsshow = true;
    },
    select2Info(event, row, index) {
      this.emsPutrecAcmpFormDtForm = row;
      this.emsPutrecAcmpFormDtFormIsshow = true;
    },
    select3Info(event, row, index) {
      this.emsPutrecStatusDtForm = row;
      this.selectEmsPutrecStatus = true;
    },

    dclUnitcdTranslate(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.dclUnitcd == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
    lawfUnitcdTranslate(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.lawfUnitcd == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
    secdLawfUnitcdTranslate(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.secdLawfUnitcd == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
    dclCurrcdTranslate(row, index) {
      let CurrList = this.$store.getters.getCurrList;
      for (let i = 0; i < CurrList.length; i++) {
        if (row.dclCurrcd == CurrList[i].currCode) {
          return CurrList[i].currName;
        }
      }
    },

    selectEmstypecd() {
      if (this.bodyForm.emsTypecd == "1") {
        this.page_rules.netwkEtpsArcrpNo.required = true;
      } else {
        this.page_rules.netwkEtpsArcrpNo.required = false;
      }
    },
    optStatusFormatter(row, index) {
     for(let i =0;i<this.optionStatusList.length;i++){
        if(row.optStatus == this.optionStatusList[i].value){
          return this.optionStatusList[i].label
        }
      }
    },
    lvyrlfModecdChange(row, index) {
      if (row.lvyrlfModecd == "1") {
        return "征收";
      } else if (row.lvyrlfModecd == "2") {
        return "免收";
      }
    },
    qtyCntrMarkcdChange(row, index) {
      if (row.qtyCntrMarkcd == "1") {
        return "控制数量";
      } else if (row.qtyCntrMarkcd == "2") {
        return "不控制数量";
      }
    },
    adjmtrMarkcdChange(row, index) {
      if (row.adjmtrMarkcd == "1") {
        return "主料件";
      } else if (row.adjmtrMarkcd == "2") {
        return "辅料件";
      }
    },
    modfMarkcdChange(row, index) {
      if (row.modfMarkcd == "0") {
        return "未修改";
      } else if (row.modfMarkcd == "1") {
        return "修改";
      } else if (row.modfMarkcd == "2") {
        return "删除";
      } else if (row.modfMarkcd == "3") {
        return "增加";
      }
    },
    etpsExeMarkcdChange(row, index) {
      if (row.etpsExeMarkcd == "1") {
        return "运行";
      } else if (row.etpsExeMarkcd == "2") {
        return "停用";
      }
    },
    cusmExeMarkcdChange(row, index) {
      if (row.cusmExeMarkcd == "1") {
        return "正常执行";
      } else if (row.cusmExeMarkcd == "2") {
        return "恢复执行";
      } else if (row.cusmExeMarkcd == "3") {
        return "暂停变更";
      } else if (row.cusmExeMarkcd == "4") {
        return "暂停进出口";
      } else if (row.cusmExeMarkcd == "5") {
        return "暂停进口";
      } else if (row.cusmExeMarkcd == "6") {
        return "暂停出口";
      } else if (row.cusmExeMarkcd == "7") {
        return "全部暂停";
      }
    },
    ucnsTqsnFlagChange(row, index) {
      if (row.ucnsTqsnFlag == "0") {
        return "不质疑";
      } else if (row.ucnsTqsnFlag == "1") {
        return "质疑";
      }
    },
    csttnFlagChange(row, index) {
      if (row.csttnFlag == "0") {
        return "未磋商";
      } else if (row.csttnFlag == "1") {
        return "磋商";
      }
    },
    ucnsDclStucdChange(row, index) {
      if (row.ucnsDclStucd == "1") {
        return "未申报";
      } else if (row.ucnsDclStucd == "2") {
        return "已申报";
      } else if (row.ucnsDclStucd == "3") {
        return "已确定";
      }
    },
    acmpFormTypecdChange(row, index) {
      if (row.formTypecd == "R") {
        return "R-减免税证明";
      } else if (row.formTypecd == "FILE") {
        return "FILE-文件";
      }
    },
    closeModel() {
      this.emsPutrecDtFormLIsshow = false;
      this.emsPutrecDtFormCIsshow = false;
      this.emsPutrecUcnsDtFormIsshow = false;
      this.emsPutrecAcmpFormDtFormIsshow = false;
    },

    
   
    
   
    
    typeFormatter(row, index) {
      if (row.mtpckEndprdTypecd == "I") {
        return "I-料件";
      } else if (row.mtpckEndprdTypecd == "E") {
        return "E-成品";
      } else {
        return "未知";
      }
    },

   

   
    
    doReFresh() {
      let data = {};
      data["id"] = this.headFormId;
      this.$post("queryEmsPutrecInfo", data)
        .then(responseData => {
          this.loading = false;
          let bodyFormParams = responseData.map.data;

          this.bodyForm = bodyFormParams;

          this.tableData = bodyFormParams.emsPutrecDt;

          this.table1Data = bodyFormParams.emsPutrecUcnsDt;

          //  this.table2Data = bodyFormParams.emsPutrecAcmpFormDt
          this.headFormId = this.bodyForm.id;
        })
        .catch(e => {
          this.loading = false;
        });
    },

    handleSelect(val) {
      this.selectItems = val;
    },
    handleSelect1(val) {
      this.select1Items = val;
    },
    handleSelect2(val) {
      this.select2Items = val;
    },
    handleSelectC(val) {
      this.selectItemsC = val;
    },
    handleSelectL(val) {
      this.selectItemsL = val;
    },

    
  }
};
</script>