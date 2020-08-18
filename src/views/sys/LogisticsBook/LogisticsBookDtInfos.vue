<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">

        <ep-tabs active="仓储数据表头">
          <ep-tab-item name="仓储数据表头">
            <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" :rules="page_rules" name-width="168px">
              <ep-row :gutter="10">

                <!-- <ep-col :col="8">
                  <ep-form-item label="账户编号" attr="bwsNo">
                    <ep-input v-model="bodyForm.bwsNo" name="bwsNo" disabled :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="预录入编号" attr="etpsPreentNo">
                    <ep-input v-model="bodyForm.etpsPreentNo" disabled name="etpsPreentNo" :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="变更次数" attr="chgTmsCnt">
                    <ep-input v-model="bodyForm.chgTmsCnt" name="chgTmsCnt" disabled :maxlength="20" :readonly="true"></ep-input>
                  </ep-form-item>
                </ep-col> -->
                <!-- <ep-col :col="8">
                  <ep-form-item label="申报类型" attr="dclTypecd" required>
                    <ep-select disabled v-model="bodyForm.dclTypecd" name="dclTypecd">
                      <ep-select-item index="1" label="备案申请"></ep-select-item>
                      <ep-select-item index="2" label="变更申请"></ep-select-item>
                      <ep-select-item index="3" label="海关修改"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="区域场所类别" attr="bwlTypecd" required>
                    <ep-select disabled v-model="bodyForm.bwlTypecd" name="bwlTypecd" @change="selectBwlTypecd">
                      <ep-select-item index="A" label="A:保税物流中心A"></ep-select-item>
                      <ep-select-item index="B" label="B:保税物流中心B"></ep-select-item>
                      <ep-select-item index="D" label="D:公共保税仓库"></ep-select-item>
                      <ep-select-item index="E" label="E:液体保税仓库"></ep-select-item>
                      <ep-select-item index="F" label="F:寄售维修保税仓库"></ep-select-item>
                      <ep-select-item index="G" label="G:暂为空"></ep-select-item>
                      <ep-select-item index="H" label="H:特殊商品保税仓库"></ep-select-item>
                      <ep-select-item index="I" label="I:备料保税仓库"></ep-select-item>
                      <ep-select-item index="P" label="P:出口配送监管仓"></ep-select-item>
                      <ep-select-item index="J" label="J:为国内结转监管仓"></ep-select-item>
                      <ep-select-item index="K" label="K:保税区"></ep-select-item>
                      <ep-select-item index="L" label="L:出口加工区"></ep-select-item>
                      <ep-select-item index="M" label="M:保税物流园区"></ep-select-item>
                      <ep-select-item index="N" label="N:保税港区"></ep-select-item>
                      <ep-select-item index="Z" label="Z:综合保税区"></ep-select-item>
                      <ep-select-item index="Q" label="Q:跨境工业园区"></ep-select-item>
                      <ep-select-item v-show="this.$store.getters.getOrgType=='5'" index="1" label="1:非保货物"></ep-select-item>
                    </ep-select>

                  </ep-form-item>
                </ep-col> -->
                <ep-col :col="8">
                  <ep-form-item label="关区" attr="masterCuscd">
                     <ep-input v-model="bodyForm.masterCuscd" name="masterCuscd" disabled ></ep-input>
                    <!-- <ep-select disabled filterable :label="tradeInfo" v-model="bodyForm.masterCuscd" name="masterCuscd">
                      <ep-select-item v-for="(item, index) in tradeInfo" :key="index" :index="item.customCode" :label="item.customName+' '+item.customCode"></ep-select-item>
                    </ep-select> -->
                  </ep-form-item>
                </ep-col>
                 <ep-col :col="8">
                  <ep-form-item label="仓库编号" attr="houseNo">

                    <ep-input disabled v-model="bodyForm.houseNo" name="houseNo" :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="仓库名称" attr="houseNm">

                    <ep-input disabled v-model="bodyForm.houseNm" name="houseNm" :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="经营企业编号" attr="bizopEtpsno">
                    <ep-input v-model="bodyForm.bizopEtpsno" name="bizopEtpsno" disabled :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="经营企业名称" attr="bizopEtpsNm">
                    <ep-input v-model="bodyForm.bizopEtpsNm" name="bizopEtpsNm" disabled></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="经营企业信用代码" attr="bizopEtpsSccd">

                    <ep-input v-model="bodyForm.bizopEtpsSccd" name="bizopEtpsSccd" disabled :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <!-- <ep-col :col="8">
                  <ep-form-item label="申报企业编号" attr="dclEtpsNo">

                    <ep-input v-model="bodyForm.dclEtpsNo" name="dclEtpsNo" disabled :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="申报企业名称" attr="dclEtpsNm">

                    <ep-input v-model="bodyForm.dclEtpsNm" name="dclEtpsNm" disabled></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="申报企业信用代码" attr="dclEtpsSccd">

                    <ep-input v-model="bodyForm.dclEtpsSccd" name="dclEtpsSccd" disabled :maxlength="20"></ep-input>
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
                  <ep-form-item label="联系人" attr="contactEr">

                    <ep-input disabled v-model="bodyForm.contactEr" name="contactEr" :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="联系电话" attr="contactTele">

                    <ep-input disabled v-model="bodyForm.contactTele" name="contactTele" :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>

                <ep-col :col="8">
                  <ep-form-item label="企业类型" attr="houseTypecd">

                    <ep-select disabled v-model="bodyForm.houseTypecd" name="houseTypecd">
                      <ep-select-item index="A" label="A:保税物流中心A"></ep-select-item>
                      <ep-select-item index="B" label="B:保税物流中心B"></ep-select-item>
                      <ep-select-item index="D" label="D:公共保税仓库"></ep-select-item>
                      <ep-select-item index="E" label="E:液体保税仓库"></ep-select-item>
                      <ep-select-item index="F" label="F:寄售维修保税仓库"></ep-select-item>
                      <ep-select-item index="G" label="G:暂为空"></ep-select-item>
                      <ep-select-item index="H" label="H:特殊商品保税仓库"></ep-select-item>
                      <ep-select-item index="I" label="I:备料保税仓库"></ep-select-item>
                      <ep-select-item index="P" label="P:出口配送监管仓"></ep-select-item>
                      <ep-select-item index="J" label="J:为国内结转监管仓"></ep-select-item>
                      <ep-select-item index="K" label="K:保税区"></ep-select-item>
                      <ep-select-item index="L" label="L:出口加工区"></ep-select-item>
                      <ep-select-item index="M" label="M:保税物流园区"></ep-select-item>
                      <ep-select-item index="N" label="N:保税港区"></ep-select-item>
                      <ep-select-item index="Z" label="Z:综合保税区"></ep-select-item>
                      <ep-select-item index="Q" label="Q:跨境工业园区"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>

                <ep-col :col="8">
                  <ep-form-item label="仓库面积(平方米)" attr="houseArea">

                    <ep-input disabled v-model="bodyForm.houseArea" name="houseArea" :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="仓库容积(立方米)" attr="houseVolume">

                    <ep-input disabled v-model="bodyForm.houseVolume" name="houseVolume" :maxlength="20"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="仓库地址" attr="houseAddress">

                    <ep-input disabled v-model="bodyForm.houseAddress" name="houseAddress" :maxlength="50"></ep-input>
                  </ep-form-item>
                </ep-col>
                <!-- <ep-col :col="8">
                  <ep-form-item label="申报时间" attr="dclTime">
                    <ep-date disabled v-model="bodyForm.dclTime" name="dclTime" type="dateTime"></ep-date>
                  </ep-form-item>
                </ep-col> -->

                <!-- <ep-col :col="8">
                  <ep-form-item label="录入日期" attr="inputDate">
                    <ep-date disabled v-model="bodyForm.inputDate" name="inputDate"></ep-date>
                  </ep-form-item>
                </ep-col>

                <ep-col :col="8">
                  <ep-form-item label="退税标志" attr="taxTypecd">
                    <ep-select disabled v-model="bodyForm.taxTypecd" name="taxTypecd">
                      <ep-select-item index="Y" label="Y-是"></ep-select-item>
                      <ep-select-item index="N" label="N-否"></ep-select-item>
                    </ep-select>

                  </ep-form-item>
                </ep-col> -->

                <!-- <ep-col :col="8">
                  <ep-form-item label="备案批准时间" attr="putrecApprTime">
                    <ep-date disabled v-model="bodyForm.putrecApprTime" name="putrecApprTime" type="dateTime"></ep-date>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="变更批准时间" attr="chgApprTime">
                    <ep-date disabled v-model="bodyForm.chgApprTime" name="chgApprTime" type="dateTime"></ep-date>
                  </ep-form-item>
                </ep-col> -->
                <!-- <ep-col :col="8">
                  <ep-form-item label="结束有效日期" attr="finishValidDate">
                    <ep-date disabled v-model="bodyForm.finishValidDate" name="finishValidDate"></ep-date>
                  </ep-form-item>
                </ep-col> -->
                <!-- <ep-col :col="8">
                  <ep-form-item label="暂停变更标记" attr="pauseChgMarkcd">
                    <ep-select disabled v-model="bodyForm.pauseChgMarkcd" name="pauseChgMarkcd">
                      <ep-select-item index="0" label="未开始执行"></ep-select-item>
                      <ep-select-item index="1" label="正常执行"></ep-select-item>
                      <ep-select-item index="2" label="暂停"></ep-select-item>
                      <ep-select-item index="3" label="注销"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col> -->
                <!-- <ep-col :col="8">
                  <ep-form-item label="审核状态" attr="emapvStucd">
                    <ep-select disabled v-model="bodyForm.emapvStucd" name="emapvStucd">
                      <ep-select-item index="0" label="已申报"></ep-select-item>
                      <ep-select-item index="1" label="通过"></ep-select-item>
                      <ep-select-item index="2" label="转岗"></ep-select-item>
                      <ep-select-item index="3" label="退单"></ep-select-item>
                      <ep-select-item index="4" label="强行通过"></ep-select-item>
                      <ep-select-item index="5" label="预录入"></ep-select-item>
                    </ep-select>

                  </ep-form-item>
                </ep-col> -->
                <!-- <ep-col :col="8">
                  <ep-form-item label="申报标志" attr="dclMarkcd">
                    <ep-select disabled v-model="bodyForm.dclMarkcd" name="dclMarkcd">
                      <ep-select-item index="1" label="电子口岸申报"></ep-select-item>
                      <ep-select-item index="2" label="EDI申报"></ep-select-item>
                      <ep-select-item index="3" label="内网预录入申报"></ep-select-item>
                      <ep-select-item index="4" label="其它申报"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col> -->
                <!-- <ep-col :col="8">
                  <ep-form-item label="记账模式" attr="appendTypecd">
                    <ep-select disabled v-model="bodyForm.appendTypecd" name="appendTypecd">
                      <ep-select-item index="1" label="可累计"></ep-select-item>
                      <ep-select-item index="2" label="不累计"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col> -->
                <!-- <ep-col :col="8">
                  <ep-form-item label="所属系统" attr="ownerSystem">

                    <ep-select disabled v-model="bodyForm.ownerSystem" name="ownerSystem">
                      <ep-select-item index="1" label="特殊区域"></ep-select-item>
                      <ep-select-item index="2" label="保税物流"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col> -->
                <ep-col :col="8" style="display:none">
                  <ep-form-item label="组织编号" attr="orgId">
                    <ep-input disabled v-model="bodyForm.orgId" name="orgId" :maxlength="30" :readonly="true"></ep-input>
                  </ep-form-item>
                </ep-col>
                <!-- <ep-col :col="8">
                  <ep-form-item label="账户用途" attr="usageTypecd">
                    <ep-select disabled v-model="bodyForm.usageTypecd" name="usageTypecd">
                      <ep-select-item index="1" label="跨境电商"></ep-select-item>

                    </ep-select>

                  </ep-form-item>
                </ep-col> -->
                <ep-col :col="16">
                  <ep-form-item label="备注" attr="rmk">

                    <ep-input :readonly="true" v-model="bodyForm.rmk" name="rmk" type="textarea"></ep-input>
                  </ep-form-item>
                </ep-col>

              </ep-row>

            </ep-form>
          </ep-tab-item>
          <ep-tab-item name="仓储数据表体">
            <div>
              <ep-model title="仓储数据表体" v-model="bwsDtFormIsshow" :wrap-close="false" width="1200px"  >
                <ep-form ref="bwsDtForm" :form="bwsDtForm" :rules="page_rules1" name-width="168px">
                  <ep-row :gutter="7">
                    <ep-col :col="8" style="display:none">
                      <ep-form-item attr="pid" label="明细ID">
                        <ep-input disabled v-model="bwsDtForm.pid" name="pid" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8" style="display:none">
                      <ep-form-item attr="orgId" label="组织编号">
                        <ep-input disabled v-model="bwsDtForm.orgId" name="orgId" :maxlength="20" :readonly="true"></ep-input>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8" style="display:none">
                      <ep-form-item attr="bwsNo" label="账户编号">
                        <ep-input disabled v-model="bwsDtForm.bwsNo" name="bwsNo" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8" style="display:none">
                      <ep-form-item attr="chgTmsCnt" label="变更次数">
                        <ep-input disabled v-model="bwsDtForm.chgTmsCnt" name="chgTmsCnt" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8">
                      <ep-form-item attr="gdsSeqno" label="商品备案序号">
                        <ep-input disabled v-model="bwsDtForm.gdsSeqno" name="gdsSeqNo" :maxlength="10"></ep-input>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8">
                      <ep-form-item attr="inDate" label="最近入仓(核增)日期">
                        <ep-date disabled v-model="bwsDtForm.inDate" name="inDate"></ep-date>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8">
                      <ep-form-item attr="gdsMtno" label="商品料号">
                        <ep-input disabled v-model="bwsDtForm.gdsMtno" name="gdsMtno" :maxlength="32"></ep-input>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8">
                      <ep-form-item attr="gdecd" label="商品编码">
                        <ep-input disabled v-model="bwsDtForm.gdecd" name="gdecd" :maxlength="10"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="gdsNm" label="商品名称">
                        <ep-input disabled v-model="bwsDtForm.gdsNm" name="gdsNm"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="gdsspcfModelDesc" label="规格型号">
                        <ep-input disabled v-model="bwsDtForm.gdsspcfModelDesc" name="gdsspcfModelDesc" :maxlength="256"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="natcd" label="国别">
                        <ep-select disabled :label="countrys" filterable v-model="bwsDtForm.natcd" v-on:change="natcdChange" name="natcd">
                          <ep-select-item v-for="(item, index) in countrys" :key="index" :index="item.countryCode" :label="item.nameCn+' '+item.countryCode"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="dclUnitcd" label="申报计量单位">
                        <ep-select disabled filterable v-model="bwsDtForm.dclUnitcd" v-on:change="dclUnitcdChange" name="dclUnitcd">
                          <ep-select-item v-for="(item, index) in dclUnitcd" :key="index" :index="item.unit" :label="item.unitName+' '+item.unit">
                          </ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="lawfUnitcd" label="法定计量单位">
                        <ep-select disabled filterable v-model="bwsDtForm.lawfUnitcd" v-on:change="dclUnitcdChange1" name="lawfUnitcd">
                          <ep-select-item v-for="(item, index) in dclUnitcd" :key="index" :index="item.unit" :label="item.unitName+' '+item.unit">
                          </ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="secdLawfUnitcd" label="第二法定计量单位">
                        <ep-select disabled filterable v-model="bwsDtForm.secdLawfUnitcd" v-on:change="dclUnitcdChange2" name="secdLawfUnitcd">
                          <ep-select-item v-for="(item, index) in dclUnitcd" :key="index" :index="item.unit" :label="item.unitName+' '+item.unit">
                          </ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="dclUprcAmt" label="单价">
                        <ep-input disabled v-model="bwsDtForm.dclUprcAmt" name="dclUprcAmt" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="dclCurrcd" label="币制">
                        <ep-select disabled filterable :label="curr" v-model="bwsDtForm.dclCurrcd" v-on:change="currChange" name="dclCurrcd">
                          <ep-select-item v-for="(item, index) in curr" :key="index" :index="item.currCode" :label="item.currName+' '+item.currCode"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="avgPrice" label="平均美元单价">
                        <ep-input disabled v-model="bwsDtForm.avgPrice" name="avgPrice" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="totalAmt" label="库存美元总价">
                        <ep-input disabled v-model="bwsDtForm.totalAmt" name="totalAmt" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="inQty" label="入仓数量">
                        <ep-input disabled v-model="bwsDtForm.inQty" name="inQty"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="inLawfQty" label="入仓法定数量">
                        <ep-input disabled v-model="bwsDtForm.inLawfQty" name="inLawfQty" ></ep-input>
                      </ep-form-item>
                    </ep-col>
                   <!--  <ep-col :col="8">
                      <ep-form-item attr="inSecdLawfQty" label="第二入仓法定数量">
                        <ep-input disabled v-model="bwsDtForm.inSecdLawfQty" name="inSecdLawfQty" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="actlIncQty" label="实增数量">
                        <ep-input disabled v-model="bwsDtForm.actlIncQty" name="actlIncQty" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="actlRedcQty" label="实减数量">
                        <ep-input disabled v-model="bwsDtForm.actlRedcQty" name="actlRedcQty" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="prevdIncQty" label="预增数量">
                        <ep-input disabled v-model="bwsDtForm.prevdIncQty" name="prevdIncQty" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="prevdRedcQty" label="预减数量">
                        <ep-input disabled v-model="bwsDtForm.prevdRedcQty" name="prevdRedcQty" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col> -->
                    <ep-col :col="8">
                      <ep-form-item attr="outDate" label="最近出仓(区)日期">
                        <ep-date disabled v-model="bwsDtForm.outDate" name="outDate"></ep-date>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="limitDate" label="存储(监管)期限">
                        <ep-date disabled v-model="bwsDtForm.limitDate" name="limitDate"></ep-date>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="inType" label="设备入区方式">
                        <ep-select disabled v-model="bwsDtForm.inType" name="inType">
                          <ep-select-item index="1" label="一线入区"></ep-select-item>
                          <ep-select-item index="2" label="二线入区"></ep-select-item>
                          <ep-select-item index="3" label="结转入区"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="invtNo" label="记账清单编号">
                        <ep-input disabled v-model="bwsDtForm.invtNo" name="invtNo" :maxlength="18"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="invtGNo" label="记账清单商品序号">
                        <ep-input disabled v-model="bwsDtForm.invtGNo" name="invtGNo" :maxlength="10"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="cusmExeMarkcd" label="海关执行标记">
                        <ep-select disabled v-model="bwsDtForm.cusmExeMarkcd" name="cusmExeMarkcd">
                          <ep-select-item index="1" label="正常执行"></ep-select-item>
                          <ep-select-item index="4" label="暂停进出口"></ep-select-item>
                          <ep-select-item index="5" label="暂停进口"></ep-select-item>
                          <ep-select-item index="6" label="暂停出口"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8">
                      <ep-form-item attr="modfMarkcd" label="修改标记">
                        <ep-select disabled v-model="bwsDtForm.modfMarkcd" name="modfMarkcd">
                          <ep-select-item index="0" label="未修改"></ep-select-item>
                          <ep-select-item index="1" label="修改"></ep-select-item>
                          <ep-select-item index="2" label="删除"></ep-select-item>
                          <ep-select-item index="3" label="增加"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="16">
                      <ep-form-item attr="rmk" label="备注">
                        <ep-input :readonly="true" v-model="bwsDtForm.rmk" name="rmk" type="textarea"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <div class="block">

                      </div>
                    </ep-col>

                  </ep-row>

                </ep-form>
              </ep-model>

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
                              <ep-button type="warning" size="small" icon="refresh" @click="reset('customSearch')" >重置</ep-button>
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
                    <ep-table ref="table" :height="400" :data="tableData" @selection-change="handleSelect" @row-dblclick="selectInfo" :head-color="headColor">
                      <!-- <ep-table-item type="select"></ep-table-item> -->

                      <ep-table-item column="gdsSeqno" title="商品备案序号" width="160"></ep-table-item>
                      <ep-table-item column="inDate" title="最近入仓(核增)日期" width="180"></ep-table-item>
                      <ep-table-item column="gdsMtno" title="商品料号"></ep-table-item>
                      <ep-table-item column="gdecd" title="商品编码" width="160"></ep-table-item>
                      <ep-table-item column="gdsNm" title="商品名称" width="180"></ep-table-item>
                      <ep-table-item column="gdsspcfModelDesc" width="300" title="规格型号"></ep-table-item>
                      <ep-table-item column="natcd" title="国别" :formatter="natcdTranslate"></ep-table-item>
                      <ep-table-item column="dclUnitcd" title="申报计量单位" width="160" :formatter="dclUnitcdTranslate"></ep-table-item>
                      <ep-table-item column="lawfUnitcd" title="法定计量单位" width="160" :formatter="lawfUnitcdTranslate"></ep-table-item>
                      <ep-table-item column="secdLawfUnitcd" title="第二法定计量单位" width="160" :formatter="secdLawfUnitcdTranslate"></ep-table-item>
                      <ep-table-item column="dclUprcAmt" title="单价" width="160"></ep-table-item>
                      <ep-table-item column="dclCurrcd" width="180" title="币制" :formatter="dclCurrcdTranslate"></ep-table-item>
                      <ep-table-item column="avgPrice" title="平均美元单价" width="160"></ep-table-item>
                      <ep-table-item column="totalAmt" title="库存美元总价" width="160"></ep-table-item>
                     <ep-table-item column="inQty" title="入仓数量"></ep-table-item>
                      <ep-table-item column="inLawfQty" title="入仓法定数量" width="160"></ep-table-item>
                      <!--  <ep-table-item column="inSecdLawfQty" title="第二入仓法定数量" width="160"></ep-table-item>
                      <ep-table-item column="actlIncQty" title="实增数量"></ep-table-item>
                      <ep-table-item column="actlRedcQty" title="实减数量"></ep-table-item>
                      <ep-table-item column="prevdIncQty" title="预增数量"></ep-table-item>
                      <ep-table-item column="prevdRedcQty" title="预减数量"></ep-table-item> -->
                      <ep-table-item column="outDate" title="最近出仓(区)日期" width="160"></ep-table-item>
                      <ep-table-item column="limitDate" title="存储(监管)期限" width="160"></ep-table-item>
                      <ep-table-item column="inType" title="设备入区方式" width="160" :formatter="inTypeChange"></ep-table-item>
                      <ep-table-item column="invtNo" title="记账清单编号" width="160"></ep-table-item>
                      <ep-table-item column="invtGNo" title="记账清单商品序号" width="160"></ep-table-item>
                      <ep-table-item column="cusmExeMarkcd" title="海关执行标记" width="160" :formatter="cusmExeMarkcdChange"></ep-table-item>

                      <ep-table-item column="modfMarkcd" title="修改标记" :formatter="modfMarkcdChange"></ep-table-item>
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
          <ep-tab-item name="随附单证" v-if="false">
            <div>

              <ep-model title="随附单证" v-model="bwsPutrecAcmpFormDtFormIsshow" :wrap-close="false" width="900px"  >
                <ep-form ref="bwsPutrecAcmpFormDtForm" :form="bwsPutrecAcmpFormDtForm" :rules="page_rules2" name-width="138px">
                  <ep-row :gutter="7">

                    <ep-col :col="12">
                      <ep-form-item attr="acmpFormSeqno" label="随附单证序号">
                        <ep-input disabled v-model="bwsPutrecAcmpFormDtForm.acmpFormSeqno" name="acmpFormSeqno" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="12">
                      <ep-form-item attr="formTypecd" label="随附单证类型">
                        <ep-select disabled v-model="bwsPutrecAcmpFormDtForm.formTypecd" name="formTypecd">
                          <ep-select-item index="R" label="R-减免税证明"></ep-select-item>
                          <ep-select-item index="FILE" label="FILE-文件"></ep-select-item>
                        </ep-select>

                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="12">
                      <ep-form-item attr="formNo" label="随附单证编号">
                        <ep-input disabled v-model="bwsPutrecAcmpFormDtForm.formNo" name="formNo" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="12">
                      <ep-form-item attr="fixdNo" label="固定编号">
                        <ep-input disabled v-model="bwsPutrecAcmpFormDtForm.fixdNo" name="fixdNo" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="12">
                      <ep-form-item attr="acmpFormFileNm" label="随附单证文件名称">
                        <ep-input disabled v-model="bwsPutrecAcmpFormDtForm.acmpFormFileNm" name="acmpFormFileNm" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="12">
                      <ep-form-item attr="uploadTime" label="上传时间">
                        <ep-input disabled v-model="bwsPutrecAcmpFormDtForm.uploadTime" name="uploadTime"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <!-- <ep-col :col="12">
                      <ep-form-item attr="userName" label="上传人">
                        <ep-input disabled v-model="bwsPutrecAcmpFormDtForm.userName" name="userName"></ep-input>
                      </ep-form-item>
                    </ep-col> -->

                    <ep-col :col="24">
                      <ep-form-item attr="rmk" label="备注">
                        <ep-input :readonly="true" v-model="bwsPutrecAcmpFormDtForm.rmk" name="rmk" type="textarea"></ep-input>

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
                    <ep-table ref="table1" :height="400" :data="table1Data" @selection-change="handleSelect1" :loading="loading" :head-color="headColor" @row-dblclick="select1Info">
                      <!-- <ep-table-item type="select"></ep-table-item> -->
                      <ep-table-item column="acmpFormSeqno" title="随附单证序号" width="150"></ep-table-item>
                      <ep-table-item column="formTypecd" title="文件类型" width="150" :formatter="acmpFormTypecdChange"></ep-table-item>
                      <ep-table-item column="formNo" title="随附单证编号" width="150"></ep-table-item>
                      <ep-table-item column="fixdNo" title="固定编号" width="150"></ep-table-item>
                      <!-- <ep-table-item column="userName" title="上传人" width="150"></ep-table-item> -->
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
          <!-- 操作记录 -->
          <ep-tab-item name="操作记录" v-if="false">
            <div>
              <ep-model title="操作记录" :wrap-close="false" v-model="selectBwsStatus" width="1200px"  >
                <ep-form ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="7">

                    <ep-col :col="8">
                      <ep-form-item attr="createTime" label="创建时间" required>
                        <ep-input disabled v-model="bwsStatusDtForm.createTime" name="createTime" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="optStatus" label="操作状态" required>
                        <ep-select disabled v-model="bwsStatusDtForm.optStatus" name="optStatus">
                          <ep-select-item index="1" label="暂存"></ep-select-item>
                          <ep-select-item index="18" label="已申报"></ep-select-item>
                          <ep-select-item index="3" label="海关入库"></ep-select-item>
                          <ep-select-item index="4" label="海关入库失败"></ep-select-item>
                          <ep-select-item index="5" label="审核通过"></ep-select-item>
                          <ep-select-item index="17" label="转人工"></ep-select-item>
                          <ep-select-item index="6" label="审核拒绝"></ep-select-item>
                          <ep-select-item index="99" label="删除"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="8" style="display:none">
                      <ep-form-item attr="optUserId" label="操作人员id" required>
                        <ep-input disabled v-model="bwsStatusDtForm.optUserId" name="optUserId" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="optUserName" label="操作人">
                        <ep-input disabled v-model="bwsStatusDtForm.optUserName" name="optUserName" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="optTime" label="操作时间">
                        <ep-input disabled v-model="bwsStatusDtForm.optTime" name="optTime" :maxlength="20"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8" style="display:none">
                      <ep-form-item attr="fileName" label="文件名称">
                        <ep-input :readonly="true" v-model="bwsStatusDtForm.fileName" name="fileName" :maxlength="64"></ep-input>
                      </ep-form-item>
                    </ep-col>

                    <ep-col :col="24">
                      <ep-form-item attr="remark" label="备注" >
                        <ep-input :readonly="true" type="textarea" :rows="4" v-model="bwsStatusDtForm.remark" name="remark"></ep-input>
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
                    <ep-table ref="table" :height="400" :data="table2Data" :loading="loading" :head-color="headColor" @row-dblclick="select2Info">
                      <!-- <ep-table-item type="select"></ep-table-item> -->
                      <ep-table-item column="createTime" title="创建时间" width="200"></ep-table-item>
                      <ep-table-item column="optStatus" width="160" title="操作状态" :formatter="optStatusFormatter"></ep-table-item>
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

          <!-- 操作记录 -->
        </ep-tabs>
      </div>
    </div>
  </div>

</template>


<script>
import misList from "src/common/mislist";
import { cloneObj,debounce } from "utils";
import { getToken} from 'utils'
export default {
  name: "logisticsBookDtInfo", // 保持和文件名一致，否则keep-alive不会动态缓存

  extends: misList, // 务必继承

  created() {
    let customList = this.$store.getters.getCustomList;
    this.tradeInfo = customList;
    let unitList = this.$store.getters.getUnitList;
    this.dclUnitcd = unitList;
    let currList = this.$store.getters.getCurrList;
    this.curr = currList;
    let countryList = this.$store.getters.getCountryList;
    this.countrys = countryList;
  },
  mounted() {
    let data = {};
    data["id"] = this.$route.query.id;
    data.page = this.ep_page1.page
    data.size = this.ep_page1.size
    this.$post("getLogisticsById", data)
      .then(responseData => {
        // this.ep_page1.page = responseData.map.data.dtPage*1
        // this.ep_page1.size = responseData.map.data.dtSize*1
        this.totalcount1 = responseData.map.data.dtTotal*1
        let bodyFormParams = responseData.map.data;
        bodyFormParams.orgCode = this.$store.getters.getOrgCode;
        this.bodyForm = bodyFormParams;
        this.tableData = responseData.map.data.bwsDt
        let tableDataParams = responseData.map.data.bwsDt;
        let table1DataParams = responseData.map.data.bwsPutrecAcmpFormDt;
        this.table2Data = responseData.map.data.bwsStatus;
        this.headFormId = this.bodyForm.id;
        this.bodyForm.masterCuscd = this.customNameFor(this.bodyForm.masterCuscd)
        this.getFiles(this.bodyForm.id, 4);
       
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
      times:"",
      drop: [],
      dclUnitcd: [],
      countrys: [],
      dclUnitcdName: "",
      dclCurrcdName: "",
      ep_page1: {
        size: 10,
        page: 1
      },
      customSearch:{
        putrecSeqno:"",
        gdsMtno:"",
        gdecd:"",
        gdsNm:""
      },
      tableDataCopy:[],
      totalcount1: 0,
      lawfUnitcdName: "",
      secdLawfUnitcdName: "",
      bwsDtFormIsshow: false,
      bwsPutrecAcmpFormDtFormIsshow: false,
      selectBwsStatus: false,
      natcdName: "",
      tradeInfo: [],
      curr: [],
      headFormId: "",
      loading: false,
      headColor: true,
      bodyForm: {
        id: "",
        tradeId: "",
        orgId: this.$store.getters.getId,
        orgCode: this.$store.getters.getOrgCode,
        bwsNo: "",
        chgTmsCnt: "",
        optStatus: "",
        etpsPreentNo: "",
        dclTypecd: "",
        bwlTypecd: "",
        masterCuscd: "",
        bizopEtpsno: this.$store.getters.getTradeCode, //经营企业编号
        bizopEtpsNm: this.$store.getters.getTradeName, //经营企业名称
        bizopEtpsSccd: this.$store.getters.getCreditCode, //经营企业社会信用代码
        houseNo: "",
        houseNm: "",
        dclEtpsNo: this.$store.getters.getTradeCode,
        dclEtpsNm: this.$store.getters.getTradeName,
        dclEtpsSccd: this.$store.getters.getCreditCode,
        dclEtpsTypecd: "",
        contactEr: "",
        contactTele: "",
        houseTypecd: "",
        houseArea: "",
        houseVolume: "",
        houseAddress: "",
        dclTime: "",
        inputDate: "",
        taxTypecd: "",
        usageTypecd: "",
        putrecApprTime: "",
        chgApprTime: "",
        finishValidDate: "",
        pauseChgMarkcd: "1",
        emapvStucd: "",
        dclMarkcd: "",
        customName: "",
        orgCode: "",
        appendTypecd: "",
        rmk: "",
        ownerSystem: "",
        bwsDt: [],
        bwsPutrecAcmpFormDt: []
      },

      tableData: [],
      table1Data: [],
      table2Data: [],

      bwsDtForm: {
        id: "",
        chgTmsCnt: "0",
        orgId: this.$store.getters.getId,
        orgCode: this.$store.getters.getOrgCode,
        bwsNo: "",
        gdsSeqno: "",
        inDate: "",
        gdsMtno: "",
        gdecd: "",
        gdsNm: "",
        modfMarkcd: "",
        gdsspcfModelDesc: "",
        natcd: "",
        dclUnitcd: "",
        lawfUnitcd: "",
        secdLawfUnitcd: "",
        dclUprcAmt: "",
        dclCurrcd: "",
        avgPrice: "",
        totalAmt: "",
        inQty: "",
        inLawfQty: "",
        inSecdLawfQty: "",
        actlIncQty: "",
        actlRedcQty: "",
        prevdIncQty: "",
        prevdRedcQty: "",
        outDate: "",
        limitDate: "",
        inType: "",
        invtNo: "",
        invtGNo: "",
        cusmExeMarkcd: "1",
        rmk: ""
      },
      bwsPutrecAcmpFormDtForm: {
        id: "",
        chgTmsCnt: "0",
        orgId: this.$store.getters.getId,
        orgCode: this.$store.getters.getOrgCode,
        bwsNo: "",
        acmpFormSeqno: "",
        acmpFormTypecd: "",
        acmpFormNo: "",
        fixdNo: "",
        acmpFormFileNm: "",
        rmk: ""
      },
      bwsStatusDtForm: {},

      buttonStatus: 0,
      button1Status: 0,

      selectLength: 0,
      select1Length: 0,

      selectItems: [],
      select1Items: [],
      DelKey: 0,
      Del1Key: 0,
      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      ep_data: [], //表格数据

      page_rules: {
        orgId: { required: true, message: "不能为空", trigger: "change" },

        chgTmsCnt: { required: true, message: "不能为空", trigger: "change" },
        optStatus: { required: true, message: "不能为空", trigger: "change" },
        etpsPreentNo: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        dclTypecd: { required: true, message: "不能为空", trigger: "change" },
        bwlTypecd: { required: true, message: "不能为空", trigger: "change" },
        masterCuscd: { required: true, message: "不能为空", trigger: "change" },
        bizopEtpsno: { required: true, message: "不能为空", trigger: "change" },
        bizopEtpsNm: { required: true, message: "不能为空", trigger: "change" },
        bizopEtpsSccd: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        houseNm: { required: true, message: "不能为空", trigger: "change" },

        contactEr: { required: true, message: "不能为空", trigger: "change" },
        contactTele: { required: true, message: "不能为空", trigger: "change" },
        houseTypecd: { required: true, message: "不能为空", trigger: "change" },

        houseAddress: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },

        inputDate: { required: true, message: "不能为空", trigger: "change" },
        finishValidDate: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        appendTypecd: { required: true, message: "不能为空", trigger: "change" }
      },
      page_rules1: {
        orgId: { required: true, message: "不能为空", trigger: "change" },

        chgTmsCnt: { required: true, message: "不能为空", trigger: "change" },
        gdsSeqno: { required: true, message: "不能为空", trigger: "change" },
        inDate: { required: true, message: "不能为空", trigger: "change" },
        gdsMtno: { required: true, message: "不能为空", trigger: "change" },
        gdecd: { required: true, message: "不能为空", trigger: "change" },
        gdsNm: { required: true, message: "不能为空", trigger: "change" },
        gdsspcfModelDesc: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        natcd: { required: true, message: "不能为空", trigger: "change" },
        dclUnitcd: { required: true, message: "不能为空", trigger: "change" },
        lawfUnitcd: { required: true, message: "不能为空", trigger: "change" }
      },
      page_rules2: {
        orgId: { required: true, message: "不能为空", trigger: "change" },

        chgTmsCnt: { required: true, message: "不能为空", trigger: "change" },
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
        fixdNo: { required: true, message: "不能为空", trigger: "change" },
        acmpFormFileNm: {
          required: true,
          message: "不能为空",
          trigger: "change"
        }
      }
    };
  },
  methods: {
    customNameFor(value,index){
       let customList = this.$store.getters.getCustomList;
      for (let i = 0; i < customList.length; i++) {
          if (value == customList[i].customCode) {
            return customList[i].customName +" "+customList[i].customCode;
          }
        }
    },
    downLoad(row){
      window.location.href=global.HOST+"/tool/file/downloadFile?pid="+(row.pid)+"&businessType="+(row.businessType)+"&bigdataId="+(row.bigdataId)+"&token="+getToken()
    },
    customSearchBtn(){
      this.makePaging()
      // let filterData = this.filterData(this.customSearch,this.tableDataCopy)
      // this.makePaging(10,1,filterData)
      // this.totalcount1 = filterData.length
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
      this.ep_page1.size = val
      this.makePaging(this.ep_page1.size,this.ep_page1.page)
      
    },
    handleCurrentChange1(val){
      this.ep_page1.page = val
      // console.log(throttle())
      clearTimeout(this.times)
     this.times = setTimeout(()=>{
        this.makePaging(this.ep_page1.size,this.ep_page1.page)
      },300)
    },
    makePaging(size,page){
      let data = {};
    data["id"] = this.$route.query.id;
    data.page = this.ep_page1.page
    data.size = this.ep_page1.size
    data.gdsSeqno = this.customSearch.gdsSeqno
    data.gdsMtno = this.customSearch.gdsMtno
    data.gdecd = this.customSearch.gdecd
    data.gdsNm = this.customSearch.gdsNm
    for(let item in data) {
      // console.log()
      // console.log(data[item])
      if(data[item]==""){
        delete data[item]
      }
    }
    this.$post("getLogisticsById", data)
      .then(responseData => {
        // this.ep_page1.page = responseData.map.data.dtPage*1
        // this.ep_page1.size = responseData.map.data.dtSize*1
        this.totalcount1 = responseData.map.data.dtTotal*1
        
        this.tableData = responseData.map.data.bwsDt
       
      })
      .catch(e => {
        this.loading = false;
      });
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
            this.table1Data = res.map.data.content;
          }
        })
        .catch(e => {});
    },
    optStatusFormatter(row, index) {
      if (row.optStatus == "1") {
        return "暂存";
      } else if (row.optStatus == "18") {
        return "已申报";
      } else if (row.optStatus == "3") {
        return "海关入库";
      } else if (row.optStatus == "4") {
        return "海关入库失败";
      } else if (row.optStatus == "5") {
        return "审核通过";
      } else if (row.optStatus == "17") {
        return "转人工";
      } else if (row.optStatus == "6") {
        return "审核拒绝";
      } else if (row.optStatus == "99") {
        return "删除";
      } else {
        return "未知";
      }
    },
    // 转换单位
    selectInfo(event, row, index) {
      this.bwsDtForm = row;
      this.bwsDtFormIsshow = true;
    },
    select1Info(event, row, index) {
      this.bwsPutrecAcmpFormDtForm = row;
      this.bwsPutrecAcmpFormDtFormIsshow = true;
    },
    select2Info(event, row, index) {
      this.bwsStatusDtForm = row;
      this.selectBwsStatus = true;
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
    natcdTranslate(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.natcd == countryList[i].countryCode) {
          return countryList[i].nameCn;
        }
      }
    },
    selectBwlTypecd() {
      this.bodyForm.houseTypecd = this.bodyForm.bwlTypecd;
    },
    closeModel() {
      this.bwsDtFormIsshow = false;
      this.bwsPutrecAcmpFormDtFormIsshow = false;
    },
    inTypeChange(row, index) {
      if (row.inType == "1") {
        return "一线入区";
      } else if (row.inType == "2") {
        return "二线入区";
      } else if (row.inType == "3") {
        return "结转入区";
      }
    },
    cusmExeMarkcdChange(row, index) {
      if (row.cusmExeMarkcd == "1") {
        return "正常执行";
      } else if (row.cusmExeMarkcd == "4") {
        return "暂停进出口";
      } else if (row.cusmExeMarkcd == "5") {
        return "暂停进口";
      } else if (row.cusmExeMarkcd == "6") {
        return "暂停出口";
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
    acmpFormTypecdChange(row, index) {
      if (row.formTypecd == "R") {
        return "R-减免税证明";
      } else if (row.formTypecd == "FILE") {
        return "FILE-文件";
      }
    },

    natcdChange(event) {
      if (event % 1 === 0) {
        this.bwsDtForm.natcd = event;
      }
    },
    currChange(event) {
      if (event % 1 === 0) {
        this.bwsDtForm.dclCurrcd = event;
      }
    },
    dclUnitcdChange(event) {
      if (event % 1 === 0) {
        this.bwsDtForm.dclUnitcd = event;
      }
    },
    dclUnitcdChange1(event) {
      if (event % 1 === 0) {
        this.bwsDtForm.lawfUnitcd = event;
      }
    },
    dclUnitcdChange2(event) {
      if (event % 1 === 0) {
        this.bwsDtForm.secdLawfUnitcd = event;
      }
    },
    
   
    
    
    
    
    
    

    
    
    
    
   
   
    
    
    handleSelect(val) {
      this.selectItems = val;
    },
    handleSelect1(val) {
      this.select1Items = val;
    }
  }
};
</script>