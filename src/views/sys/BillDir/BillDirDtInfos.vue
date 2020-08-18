<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <!-- <div class="block">
          <ep-button v-if="!pageFlag" type="success" size="small" @click="doSave" icon="edit" :loading="loading">暂存</ep-button>
          <ep-button v-if="pageFlag" type="success" size="small" @click="doUpdate" icon="edit" :loading="loading">暂存</ep-button>
          <ep-button type="success" size="small" @click="Declare(isDeclare)"  icon="checkmark-round"  :loading="sloading">申报
          </ep-button>
          <ep-button type="success" size="small"  icon="plus-round"  @click="addOther">新增</ep-button>
          <ep-button type="success" size="small" icon="printer" @click="doPrint">打印</ep-button>
        </div>-->
        <ep-tabs active="径予放行货物自主声明表头">
          <ep-tab-item name="径予放行货物自主声明表头">
            <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
              <ep-row :gutter="10">
                <!-- <ep-col :col="8">
                   <ep-form-item label="">
                      <ep-checkbox v-model="involveConfirm1" :disabled="true">是否涉及禁限管制</ep-checkbox>
                      <ep-checkbox v-model="involveConfirm2" :disabled="true">是否涉及检疫检验</ep-checkbox>
                    </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="">
                    <ep-checkbox v-model="agreeConfirm1" :disabled="true">是否承诺货物符合径予放行条件</ep-checkbox>
                  </ep-form-item>
                </ep-col>-->
                <!--新增行-->

                <ep-col :col="8">
                  <ep-form-item label="径予放行自主声明编号" attr="billNo">
                    <ep-input v-model="bodyForm.billNo" name="billNo" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="自主声明预录入编号" attr="orderNo">
                    <ep-input v-model="bodyForm.orderNo" name="orderNo" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="主管海关" attr="masterCuscd">
                    <loc-codemap-select :name="'masterCuscd'" :code="'customCode'" :cName="'customName'" :dataList="tradeInfo" :type="'custom'" :value.sync="bodyForm.masterCuscd" :disabled="true"></loc-codemap-select>
                  </ep-form-item>
                </ep-col>

                <!--<ep-col :col="8">-->
                <!--<ep-form-item label="收发货人名称" attr="rcvgdEtpsNm">-->
                <!--<ep-input v-model="rcvgdEtpsNm" name="rcvgdEtpsNm"  :disabled="true"></ep-input>-->
                <!--</ep-form-item>-->
                <!--</ep-col>-->
                <!--<ep-col :col="8">-->
                <!--<ep-form-item label="收发货人代码" attr="rcvgdEtpsNo">-->
                <!--<ep-input v-model="rcvgdEtpsNo" name="rcvgdEtpsNo" :disabled="true"></ep-input>-->
                <!--</ep-form-item>-->
                <!--</ep-col>-->
                <!--<ep-col :col="8">-->
                <!--<ep-form-item label="收发货人社会信用代码" attr="rvsngdEtpsSccd">-->
                <!--<ep-input v-model="rvsngdEtpsSccd" name="rvsngdEtpsSccd"  :disabled="true"></ep-input>-->
                <!--</ep-form-item>-->
                <!--</ep-col>-->

                <!--<ep-col :col="8">-->
                <!--<ep-form-item label="申报单位名称" attr="dclEtpsNm">-->
                <!--<ep-input v-model="dclEtpsNm" name="dclEtpsNm"  :disabled="true"></ep-input>-->
                <!--</ep-form-item>-->
                <!--</ep-col>-->

                <!--<ep-col :col="8">-->
                <!--<ep-form-item label="申报单位代码" attr="dclEtpsNo">-->
                <!--<ep-input v-model="dclEtpsNo" name="dclEtpsNo"  :disabled="true"></ep-input>-->
                <!--</ep-form-item>-->
                <!--</ep-col>-->
                <!--<ep-col :col="8">-->
                <!--<ep-form-item label="申报单位社会信用代码" attr="dclEtpsSccd">-->
                <!--<ep-input v-model="dclEtpsSccd" name="dclEtpsSccd"  :disabled="true"></ep-input>-->
                <!--</ep-form-item>-->
                <!--</ep-col>-->
                <ep-col :col="8">
                  <ep-form-item label="经营单位名称" attr="bizopEtpsNm">
                    <ep-input v-model="bodyForm.bizopEtpsNm" name="bizopEtpsNm" :maxlength="20" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="经营企业编号" attr="bizopEtpsNo">
                    <ep-input v-model="bodyForm.bizopEtpsNo" name="bizopEtpsNo" :maxlength="20" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="经营单位社会信用代码" attr="bizopEtpsSccd">
                    <ep-input v-model="bodyForm.bizopEtpsSccd" name="bizopEtpsSccd" :maxlength="20" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>
                <!--新增的备用行-->
                <ep-col :col="8">
                  <ep-form-item label="申报单位名称" attr="bizopEtpsNmAttr">
                    <ep-input v-model="bodyForm.bizopEtpsNmAttr" name="bizopEtpsNmAttr" :maxlength="20" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="申报企业编号" attr="bizopEtpsNoAttr">
                    <ep-input v-model="bodyForm.bizopEtpsNoAttr" name="bizopEtpsNoAttr" :maxlength="20" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="申报单位社会信用代码" attr="bizopEtpsSccdAttr">
                    <ep-input v-model="bodyForm.bizopEtpsSccdAttr" name="bizopEtpsSccdAttr" :maxlength="20" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>
                <!--新增数据完结-->

                <ep-col :col="8">
                  <ep-form-item label="提运单号" attr="billLodNo">
                    <ep-input v-model="bodyForm.billLodNo" name="billLodNo" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="英文船名" attr="shipNameEn">
                    <ep-input v-model="bodyForm.shipNameEn" name="shipNameEn" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="航次" attr="voyageNo">
                    <ep-input v-model="bodyForm.voyageNo" name="voyageNo" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="毛重" attr="grossWt">
                    <ep-input v-model="bodyForm.grossWt" name="grossWt" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>
                <!-- <ep-col :col="8">
                  <ep-form-item label="件数" attr="dclQty">
                    <ep-input v-model="bodyForm.dclQty" name="dclQty" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>-->
                <ep-col :col="8">
                  <ep-form-item label="运输方式" attr="trspModecd">
                    <ep-select v-model="bodyForm.trspModecd" name="trspModecd" :disabled="true">
                      <ep-select-item index="1" label="海运"></ep-select-item>
                      <ep-select-item index="2" label="空运"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="申报时间" attr="dclTime">
                    <ep-date v-model="bodyForm.dclTime" name="dclTime" type="dateTime" :disabled="true"></ep-date>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="过卡时间" attr="passTime">
                    <ep-date v-model="bodyForm.passTime" name="passTime" type="dateTime" :disabled="true"></ep-date>
                  </ep-form-item>
                </ep-col>
                <!-- <ep-col :col="8">
                  <ep-form-item label="申报类型" attr="type">
                    <ep-select v-model="bodyForm.type" name="type" :disabled="true">
                      <ep-select-item index="0" label="自主申报"></ep-select-item>
                      <ep-select-item index="1" label="委托申报"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>-->
                <ep-col :col="8">
                  <ep-form-item label="状态" attr="optStatus">
                    <ep-select v-model="bodyForm.optStatus" name="optStatus" :disabled="true">
                      <ep-select-item index="1" label="暂存"></ep-select-item>
                      <ep-select-item index="501" label="变更暂存"></ep-select-item>
                      <ep-select-item index="601" label="作废暂存"></ep-select-item>

                      <ep-select-item index="5" label="审核通过"></ep-select-item>
                      <ep-select-item index="505" label="变更审核通过"></ep-select-item>
                      <ep-select-item index="605" label="作废审核通过"></ep-select-item>

                      <ep-select-item index="6" label="审核拒绝"></ep-select-item>
                      <ep-select-item index="506" label="变更审核拒绝"></ep-select-item>
                      <ep-select-item index="606" label="作废审核拒绝"></ep-select-item>

                      <ep-select-item index="17" label="待审核"></ep-select-item>
                      <ep-select-item index="517" label="待审核"></ep-select-item>
                      <ep-select-item index="617" label="待审核"></ep-select-item>

                      <ep-select-item index="3" label="海关入库成功"></ep-select-item>
                      <ep-select-item index="503" label="变更海关入库成功"></ep-select-item>
                      <ep-select-item index="603" label="作废海关入库成功"></ep-select-item>

                      <ep-select-item index="18" label="已确认"></ep-select-item>
                      <ep-select-item index="518" label="变更已确认"></ep-select-item>
                      <ep-select-item index="618" label="作废已确认"></ep-select-item>

                      <ep-select-item index="4" label="海关入库失败"></ep-select-item>
                      <ep-select-item index="504" label="变更海关入库失败"></ep-select-item>
                      <ep-select-item index="604" label="作废海关入库失败"></ep-select-item>

                      <ep-select-item index="7" label="审核退单"></ep-select-item>
                      <ep-select-item index="101" label="单证绑定"></ep-select-item>
                      <ep-select-item index="103" label="单证解绑"></ep-select-item>
                      <ep-select-item index="104" label="单证过卡"></ep-select-item>
                      <ep-select-item index="19" label="转人工"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="是否关联出入库" attr="isRltInexp">
                    <ep-select v-model="bodyForm.isRltInexp" name="isRltInexp" :disabled="true">
                      <ep-select-item index="1" label="已关联"></ep-select-item>
                      <ep-select-item index="0" label="未关联"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <!-- <ep-col :col="8">
                  <ep-form-item label="申报类型" attr="dclTypecd">
                    <ep-select v-model="bodyForm.dclTypecd" name="dclTypecd" disabled>
                      <ep-select-item index="1" label="备案"></ep-select-item>
                      <ep-select-item index="2" label="变更"></ep-select-item>
                      <ep-select-item index="3" label="作废"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col> -->
                <!-- <ep-col :col="8">
                  <ep-form-item label="监管方式" attr="supvModecd">
                     <loc-codemap-select
                    :name="'supvModecd'"
                    :code="'tradeMode'"
                    :cName="'abbrTrade'"
                    :dataList="supvInfo"
                    :value.sync="bodyForm.supvModecd"
                    :disabled="true">
                     </loc-codemap-select>
                  </ep-form-item>
                </ep-col>-->
                <!-- <ep-col :col="8">
                  <ep-form-item label="代理组织ID" attr="proxyOrgId">
                    <ep-input v-model="bodyForm.proxyOrgId" name="proxyOrgId" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>-->
                <!-- <ep-col :col="8">
                  <ep-form-item label="待审批标志代码" attr="emapvMarkcd">
                    <ep-select v-model="bodyForm.emapvMarkcd" name="emapvMarkcd" :disabled="true">
                      <ep-select-item index="1" label="是"></ep-select-item>
                      <ep-select-item index="2" label="否"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>-->
                <!-- <ep-col :col="8">
                  <ep-form-item label="是否涉证涉检" attr="involveConfirm">
                    <ep-select v-model="bodyForm.involveConfirm" name="involveConfirm" :disabled="true">
                      <ep-select-item index="1" label="涉证"></ep-select-item>
                      <ep-select-item index="2" label="涉检"></ep-select-item>
                      <ep-select-item index="3" label="涉证涉检"></ep-select-item>
                      <ep-select-item index="0" label="均不涉"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="是否承诺货物符合径予放行条件" attr="agreeConfirm" title="是否承诺货物符合径予放行条件">
                    <ep-select v-model="bodyForm.agreeConfirm" name="agreeConfirm" :disabled="true">
                      <ep-select-item index="1" label="是"></ep-select-item>
                      <ep-select-item index="2" label="否"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>-->
                <!-- <ep-col :col="8">
                  <ep-form-item label="核放单绑定标志" attr="passPortUsedTypecd">
                    <ep-select v-model="bodyForm.passPortUsedTypecd" name="passPortUsedTypecd" :disabled="true">
                      <ep-select-item index="1" label="未生成"></ep-select-item>
                      <ep-select-item index="3" label="已生成"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>-->
                <ep-col :col="8">
                  <ep-form-item attr="mtpckEndprdTypecd" label="料件 /成品标志">
                    <ep-select v-model="bodyForm.mtpckEndprdTypecd"  name="mtpckEndprdTypecd" disabled>
                       <ep-select-item index="I" label="料件"></ep-select-item>
                      <ep-select-item index="E" label="成品"></ep-select-item>
                      <ep-select-item index="S" label="设备"></ep-select-item>
                      <ep-select-item index="L" label="边角料"></ep-select-item>
                       <ep-select-item index="D" label="残次品"></ep-select-item>            
                    </ep-select>   
                  </ep-form-item>  
                </ep-col>
                <ep-col :col="16">
                  <ep-form-item label="备注" attr="rmk">
                    <ep-input v-model="bodyForm.rmk" name="rmk" :disabled="true" :maxlength="1000"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="24">
                  <div class="one-item-select">
                    <ep-form-item>
                      <div>
                        <ep-checkbox style="margin-left: 5px" disabled v-model="checkboxForm1">不属于国家禁止进出境货物;</ep-checkbox>
                      </div>
                      <div>
                        <ep-checkbox style="margin-left: 5px" disabled v-model="checkboxForm2">不属于依法需进出境检疫的货物以及进境检验的大宗资源性商品、可用作原料的固体废物;</ep-checkbox>
                      </div>
                      <div>
                        <ep-checkbox style="margin-left: 5px" disabled v-model="checkboxForm3">不属于法律、法规等明确规定的,涉及我国缔结或者参加的国际条约、协定的,和涉及安全准入管理,必须在进出境环节验核相关监管证件的货物。</ep-checkbox>
                      </div>
                    </ep-form-item>
                  </div>
                </ep-col>
              </ep-row>
            </ep-form>
          </ep-tab-item>
          <ep-tab-item name="径予放行货物自主声明明细">
            <ep-model title="进境径予放行货物自主声明明细" v-model="bodyDtModel" width="1250px" :wrap-close="false">
              <ep-form ref="bodyDtForm" :form="bodyDtForm" name-width="168px">
                <ep-row :gutter="7">
                  <ep-col :col="8">
                    <ep-form-item attr="billNo" label="径予放行自主声明编号">
                      <ep-input v-model="bodyDtForm.billNo" name="billNo" :maxlength="20" :disabled="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <!-- <ep-col :col="8">
                    <ep-form-item attr="gdecd" label="商品编码">
                      <ep-input
                        v-model="bodyDtForm.gdecd"
                        name="gdecd"
                        :maxlength="10"
                        :disabled="true"
                      ></ep-input>
                    </ep-form-item>
                  </ep-col>-->
                  <ep-col :col="8">
                    <ep-form-item attr="gdsNm" label="商品名称">
                      <ep-input v-model="bodyDtForm.gdsNm" name="gdsNm" :maxlength="256" :disabled="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <!-- <ep-col :col="8">
                    <ep-form-item attr="dclQty" label="申报数量">
                      <ep-input
                        v-model="bodyDtForm.dclQty"
                        name="dclQty"
                        :maxlength="20"
                        :disabled="true"
                      ></ep-input>
                    </ep-form-item>
                  </ep-col>-->
                  <!-- <ep-col :col="8">
                    <ep-form-item attr="dclUnitcd" label="申报单位">
                      <ep-select
                        v-model="bodyDtForm.dclUnitcd"
                        name="dclUnitcd"
                        filterable
                        :disabled="true"
                      >
                        <ep-select-item
                          v-for="(item, index) in unitList"
                          :key="index"
                          :index="item.unit"
                          :label="item.unitName+' '+item.unit"
                        ></ep-select-item>
                      </ep-select>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item attr="dclTotalAmt" label="总价">
                      <ep-input
                        v-model="bodyDtForm.dclTotalAmt"
                        name="dclTotalAmt"
                        :maxlength="26"
                        :disabled="true"
                      ></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item attr="dclCurrcd" label="原产国">
                      <loc-codemap-select
                        :name="'dclCurrcd'"
                        :code="'countryCode'"
                        :cName="'nameCn'"
                        :disabled="true"
                        :dataList="countrys"
                        :value.sync="bodyDtForm.dclCurrcd"
                      ></loc-codemap-select>
                    </ep-form-item>
                  </ep-col>

                  <ep-col :col="16">
                    <ep-form-item attr="rmk" label="备注">
                      <ep-input
                        v-model="bodyDtForm.rmk"
                        name="rmk"
                        type="textarea"
                        :disabled="true"
                      ></ep-input>
                    </ep-form-item>
                  </ep-col>-->
                </ep-row>
              </ep-form>
            </ep-model>
            <!-- <div class="search-card contents-card card-margin">
              <div class="panel panel-default">
                <div class="card-title zero-padding">
                  <span class="weight">查询列表</span>
                </div>
                <ep-form ref="customSearch" :form="customSearch" name-width="200px">
                  <ep-row :gutter="7">
                    <ep-col :col="6">
                      <ep-form-item label="径予放行自主声明编号" attr="billNo">
                        <ep-input v-model="customSearch.billNo" name="billNo"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="6">
                      <ep-form-item label="商品编码" attr="gdecd">
                        <ep-input v-model="customSearch.gdecd" name="gdecd"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="6">
                      <ep-form-item label="商品名称" attr="gdsNm">
                        <ep-input v-model="customSearch.gdsNm" name="gdsNm"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                  <ep-row :gutter="7">
                    <ep-col :col="24">
                      <ep-button
                        type="warning"
                        size="small"
                        icon="refresh"
                        @click="reset('customSearch')"
                      >重置</ep-button>
                      <ep-button
                        type="primary"
                        size="small"
                        icon="search"
                        @click="customSearchBtn"
                      >查询</ep-button>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
            </div>-->
            <div class="ep-card card-margin relative">
              <div class="card-body">
                <div class="block">
                  <ep-table ref="table" border :height="400" :data="tableData" :head-color="headColor" @row-dblclick="handleDetailClick">
                    <ep-table-item column="billNo" width="200" title="径予放行自主声明编号"></ep-table-item>
                    <!-- <ep-table-item column="gdecd" width="200" title="商品编码"></ep-table-item> -->
                    <ep-table-item column="gdsNm" title="商品名称"></ep-table-item>
                    <!-- <ep-table-item column="dclQty" width="150" title="申报数量"></ep-table-item>
                    <ep-table-item
                      column="dclUnitcd"
                      width="150"
                      title="申报单位"
                      :formatter="dclUnitcdTranslate"
                    ></ep-table-item>
                    <ep-table-item column="dclTotalAmt" width="150" title="总价"></ep-table-item>
                    <ep-table-item
                      column="dclCurrcd"
                      width="150"
                      title="原产国"
                      :formatter="natcdTranslate"
                    ></ep-table-item>
                    <ep-table-item column="rmk" title="备注" width="350" :tooltip-show="true">-->
                    <!-- <template slot-scope="props">
                          <p class="rmk-style">{{props.row.rmk}}</p>
                    </template>-->
                    <!-- </ep-table-item> -->
                  </ep-table>
                </div>
                <div class="block">
                  <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
                </div>
              </div>
            </div>
          </ep-tab-item>

          <ep-tab-item name="关联出入库单证">
            <ep-model title="关联出入库单证" v-model="inAndOutModel" width="1400px" :wrap-close="false">
              <ep-form ref="inAndOutForm" :form="inAndOutForm" :rules="InExp_rules" name-width="168px">
                <ep-row :gutter="20">
                  <ep-col :col="10">
                    <ep-form-item attr="billNo" label="径予放行自主声明编号">
                      <ep-input v-model="bodyForm.billNo" name="billNo" :maxlength="20" :disabled="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="10">
                    <ep-form-item label="ERP/WMS出入库编号" attr="inExpWhNo">
                      <ep-input v-model.trim="inAndOutForm.inExpWhNo" name="inExpWhNo" :maxlength="64"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="10">
                    <ep-form-item label="ERP/WMS出入库日期" attr="inExpTime">
                      <ep-date v-model="inAndOutForm.inExpTime" name="inExpTime" type="dateTime"></ep-date>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="10">
                    <ep-form-item attr="rmk" label="备注">
                      <ep-input v-model.trim="inAndOutForm.rmk" name="rmk" autosize type="textarea" :maxlength="400"></ep-input>
                    </ep-form-item>
                  </ep-col>
                </ep-row>
                <!-- <ep-row :gutter="7">
                  <ep-form-item label="ERP/WMS出入库编号" attr="inExpWhNo">
                    <ep-input v-model.trim="inAndOutForm.inExpWhNo" name="inExpWhNo" :maxlength="64"></ep-input>
                  </ep-form-item>
                </ep-row> -->
                <!-- <ep-row :gutter="7">
                  <ep-form-item label="ERP/WMS出入库日期" attr="inExpTime">
                    <ep-date v-model="inAndOutForm.inExpTime" name="inExpTime" type="dateTime"></ep-date>
                  </ep-form-item>
                </ep-row> -->
                <!-- <ep-row :gutter="7">
                  <ep-form-item attr="rmk" label="备注">
                    <ep-input v-model.trim="inAndOutForm.rmk" name="rmk" type="textarea" :maxlength="400"></ep-input>
                  </ep-form-item>
                </ep-row> -->
                <ep-row>
                  <div style="text-align:center">
                    <!-- <ep-button
                      type="primary"
                      size="small"
                      @click="makeSure(localType)"
                      icon="checkmark-round"
                    >确定</ep-button>-->

                    <!-- <WmsButton @click="makeSure(localType)">确定</WmsButton>   2020-07-06 修改 -->

                  </div>
                </ep-row>
                <InexpModel :bodyForm='inAndOutForm' ref="InexpModel">
                  <WmsButton @click="getDetail(localType) ">查看详情</WmsButton>
                  <WmsButton @click="makeSure(localType)">确定</WmsButton>

                </InexpModel>
              </ep-form>

            </ep-model>
            <ep-model title="关联出入库详情" v-model="modelDetail" width="1400px" :wrap-close="false">
              <InexpModel :bodyForm='inAndOutFormDetail' ref="InexpModels">

              </InexpModel>
            </ep-model>
            <div>
              <!--表格-->
              <!-- :disabled="isBillNo" -->
              <div class="ep-card card-margin relative">
                <div class="card-body">
                  <div class="block">
                    <slot name="out-form"></slot>
                    <div v-if="!isBillNo">
                      <!-- <ep-button
                        type="success"
                        size="small"
                        @click="addInAndOut"
                        icon="plus"
                      >新增</ep-button>-->
                      <WmsButton style="margin:0" @click="addInAndOut">新增</WmsButton>
                      <WmsButton @click="confirmInAndOut">确认</WmsButton>
                      <!-- <ep-button
                        type="primary"
                        size="small"
                        @click="doBodyUpdate"
                        icon="edit"
                      >修改</ep-button>
                      <ep-button
                        type="danger"
                        size="small"
                        @click="deleteinandout"
                        icon="trash-a"
                      >删除</ep-button>
                      <ep-button
                        type="primary"
                        size="small"
                        @click="confirmInAndOut"
                        icon="checkmark-round"
                      >确认</ep-button>-->
                    </div>
                    <!--<span style="color:red;font-size:25px;position:absolute;padding-top:8px;padding-left:3px;">*</span>
                    <span style="padding-top: 10px;padding-left: 13px;position: absolute;font-size: 4px;color: rgba(0,0,0,.87);">双击列表信息，可进入详情页面</span>-->
                  </div>
                  <div class="block">
                    <ep-table ref="table" border :height="400" :data="tableInExpData" :loading="loading" head-color @row-dblclick="select1Info" @selection-change="handleSelectionChange">
                      <!-- <ep-table-item type="select"  v-if="!isBillNo"></ep-table-item> -->
                      <ep-table-item column="opt" title="操作" width="200" v-if="!isBillNo">
                        <template slot-scope="props">
                          <!-- <wms-icon type="edit" @click="doBodyUpdate(props.row,props.row.id)"></wms-icon> -->
                          <wms-icon type="cancel" @click="deleteinandout(props.row,props.row.id)"></wms-icon>
                          <!-- <wms-icon type="confirm" @click="confirmInAndOut(props.row,props.row.id)"></wms-icon> -->
                        </template>
                      </ep-table-item>
                      <ep-table-item column="billNo" title="径予放行自主声明编号" width="300"></ep-table-item>
                      <ep-table-item column="inExpWhNo" title="ERP/WMS出入库编号" width="300"></ep-table-item>
                      <ep-table-item column="inExpTime" title="ERP/WMS出入库日期"></ep-table-item>
                    </ep-table>
                  </div>
                </div>
              </div>
            </div>
          </ep-tab-item>
          <!-- 操作记录 start -->
          <ep-tab-item name="操作记录">
            <div>
              <ep-model title="操作记录" :wrap-close="false" v-model="selectBwsStatus" width="1200px">
                <ep-form ref="bwsStatusDtForm" :form="bwsStatusDtForm" name-width="168px">
                  <ep-row :gutter="7">
                    <ep-col :col="8">
                      <ep-form-item attr="createTime" label="创建时间">
                        <ep-input disabled v-model="bwsStatusDtForm.createTime" name="createTime"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="optStatus" label="操作状态">
                        <ep-select disabled v-model="bwsStatusDtForm.optStatus" name="optStatus">
                          <ep-select-item index="1" label="暂存"></ep-select-item>
                          <ep-select-item index="18" label="已确认"></ep-select-item>
                          <ep-select-item index="3" label="海关入库成功"></ep-select-item>
                          <ep-select-item index="4" label="海关入库失败"></ep-select-item>
                          <ep-select-item index="5" label="审核通过"></ep-select-item>
                          <ep-select-item index="6" label="审核拒绝"></ep-select-item>
                          <ep-select-item index="7" label="审核退单"></ep-select-item>
                          <ep-select-item index="101" label="单证绑定"></ep-select-item>
                          <ep-select-item index="103" label="单证解绑"></ep-select-item>
                          <ep-select-item index="104" label="单证过卡"></ep-select-item>
                          <ep-select-item index="19" label="转人工"></ep-select-item>
                        </ep-select>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="optUserId" label="操作人">
                        <ep-input disabled v-model="bwsStatusDtForm.optUserId" name="optUserId"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="8">
                      <ep-form-item attr="optTime" label="操作时间">
                        <ep-input disabled v-model="bwsStatusDtForm.optTime" name="optTime"></ep-input>
                      </ep-form-item>
                    </ep-col>
                    <ep-col :col="24">
                      <ep-form-item attr="remark" label="备注">
                        <ep-input :rows="4" :readonly="true" type="textarea" v-model="bwsStatusDtForm.remark" name="remark"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </ep-model>

              <!--表格-->
              <div class="ep-card card-margin relative">
                <div class="card-body">
                  <div class="block"></div>
                  <div class="block">
                    <ep-table ref="table" border :height="400" :data="table2Data" :loading="loading" head-color @row-dblclick="select2Info">
                      <ep-table-item column="createTime" title="创建时间" width="200"></ep-table-item>
                      <ep-table-item column="optStatus" title="操作状态" :formatter="optStatusFormatter" width="160"></ep-table-item>
                      <ep-table-item column="optUserId" title="操作人" width="160" :formatter="optUserFormatter"></ep-table-item>
                      <ep-table-item column="optTime" title="操作时间" width="200"></ep-table-item>
                      <ep-table-item column="remark" title="备注">
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
          <!-- 操作记录 end -->
        </ep-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneObj } from "utils";
import InexpModel from "./InexpModel";
export default {
  name: "BillDirDtInfo",
  components: {
    InexpModel,
  },
  data() {
    return {
      modelDetail: false,
      inAndOutFormDetail: {},
      isBillNo: false,
      loading: false,
      pageFlag: false,
      isClip: false,
      headColor: true,
      bodyDtModel: false,
      checkboxForm1: false,
      checkboxForm2: false,
      checkboxForm3: false,
      inAndOutModel: false,
      localType: "",
      rcvgdEtpsNo: this.$store.getters.getOrganizationCode, //收发货人代码
      rvsngdEtpsSccd: this.$store.getters.getOrgCreditCode, //收发货人社会信用代码
      rcvgdEtpsNm: this.$store.getters.getOrganizationName, //收发货人名称
      dclEtpsNo: this.$store.getters.getTradeCode, //申报单位代码
      dclEtpsSccd: this.$store.getters.getCreditCode, //申报单位社会信用代码
      dclEtpsNm: this.$store.getters.getTradeName, //申报单位名称
      selectItems: [],
      bodyForm: {
        id: "",
        orgId: "",
        tradeId: "",
        masterCuscd: "",
        billNo: "", //径予放行自主声明编号	BILL_NO
        orderNo: "", //自主声明预录入编号	ORDER_NO
        billLodNo: "", //提运单号	BILL_LOD_NO
        shipNameEn: "", //英文船名	SHIP_NAME_EN
        voyageNo: "", //航次	VOYAGE_NO
        grossWt: "", //毛重	GROSS_WT
        dclQty: "", //数量	DCL_QTY
        trspModecd: "", //运输方式	TRSP_MODECD
        dclTime: "", //申报时间	DCL_TIME
        passTime: "", //过卡时间	PASS_TIME
        type: "", //申报类型	TYPE
        optStatus: "", //状态	OPT_STATUS
        hazardousConfirm: "2", //危禁品确认标志	HAZARDOUS_CONFIRM
        hazardous: "", //危禁品	HAZARDOUS
        supvModecd: "", //监管方式	SUPV_MODECD
        proxyOrgId: "", //代理组织ID	PROXY_ORG_ID
        rmk: "", //备注	remark
        emapvMarkcd: "", //待审批标志代码	EMAPV_MARKCD
        involveConfirm: "", //是否涉证涉检	INVOLVE_CONFIRM
        agreeConfirm: "",
        passPortUsedTypecd: "", //核放单绑定标志	PASSPORT_USED_TYPECD
        bizopEtpsNo: "", //经营企业编号
        bizopEtpsNm: "", //经营单位名称
        bizopEtpsSccd: "", //经营单位社会信用代码
        bizopEtpsNoAttr: "", //经营企业编号
        bizopEtpsNmAttr: "", //经营单位名称
        bizopEtpsSccdAttr: "", //经营单位社会信用代码
      },
      inAndOutForm: {
        id: "",
        pid: "",
        billNo: "",
        inExpWhNo: "",
        inExpTime: "",
        rmk: "",
      },
      bodyDtForm: {
        billNo: "",
        gdecd: "",
        gdsNm: "",
        dclQty: "",
        dclUnitcd: "",
        dclTotalAmt: "",
        dclCurrcd: "",
        rmk: "",
      },
      tableData: [], // 表体表格
      tableInExpData: [], //出入库
      tableDataCopy: [],
      table2Data: [], // 操作记录表格数据
      bwsStatusDtForm: {}, // 操作记录model数据
      selectBwsStatus: false,
      ep_page: {
        page: 1,
        size: 10,
      },
      customSearch: {
        billNo: "",
        gdsNm: "",
        gdecd: "",
      },
      totalcount: 0,
      InExp_rules: {
        inExpWhNo: { required: true, message: "不能为空", trigger: "change" },
        inExpTime: { required: true, message: "不能为空", trigger: "change" },
      },
    };
  },
  created() {
    //监管方式 用到贸易方式表
    let tradeModeList = this.$store.getters.getTradeModeList;
    this.supvInfo = tradeModeList;
  },
  mounted() {
    this.againDate(this.$route.query.id);
  },
  computed: {
    unitList() {
      return this.$store.getters.getUnitList;
    },
    countrys() {
      return this.$store.getters.getCountryList;
    },
    tradeInfo() {
      return this.$store.getters.getCustomList;
    },
  },
  methods: {
    // 获取关联出入库详情

    select1Info(event, row, index) {
      this.modelDetail = true;
      this.inAndOutFormDetail = cloneObj(row);

      console.log("ddd--", this.inAndOutFormDetail);
      setTimeout(() => {
        this.$refs.InexpModels.getlist();
      });
    },

    // 获取详情
    getDetail() {
      this.InExp_rules.inExpTime.required = false;
      this.$refs["inAndOutForm"].validate((valid) => {
        if (valid) {
          this.$refs.InexpModel.getlist();
        }
      });
    },
    //关联入库确认
    confirmInAndOut() {
      let bscIds = [];
      let selectData = this.tableInExpData;
      selectData.forEach((c) => {
        if (c.id) {
          bscIds.push(c.id);
        }
      });
      let data = {};
      data["ids"] = bscIds;
      data["orgCode"] = this.$store.getters.getCreditCode;
      data["pid"] = this.bodyForm.id;
      // console.log('pid================', this.bodyForm.id);

      this.$post("confirmInAndOut", data)
        .then((responseData) => {
          this.$pop({
            type: "success",
            message: "确认成功",
          });
          this.againDate(this.$route.query.id);
        })
        .catch((e) => {
          this.loading = false;
        });
    },
    //关联入库新增修改
    makeSure(value) {
      this.InExp_rules.inExpTime.required = true;

      this.$refs["inAndOutForm"].validate((valid) => {
        if (valid) {
          if (value == "添加") {
            this.inAndOutForm.billNo = this.bodyForm.billNo;
            this.inAndOutForm.pid = this.bodyForm.id;
            let inAndOutFormCopy = cloneObj(this.inAndOutForm);
            this.inAndOutForm.leadId =
              this.tableDataCopy[this.tableDataCopy.length - 1] == undefined
                ? 0
                : this.tableDataCopy[this.tableDataCopy.length - 1].leadId + 1;
            this.localType = "添加";
            this.$refs.inAndOutForm && this.$refs.inAndOutForm.reset();
            this.$post("billDirWhSave", inAndOutFormCopy)
              .then((res1) => {
                this.saveLoading = false;
                inAndOutFormCopy.id = res1.map.id;
                this.tableInExpData.push(inAndOutFormCopy);
              })
              .catch(() => {
                this.saveLoading = false;
              });
            // console.log("this.inAndOutForm", inAndOutFormCopy);
            // this.tableInExpData.push(inAndOutFormCopy);

            this.inAndOutModel = false;
          }
          if (value == "修改") {
            this.inAndOutForm.billNo = this.bodyForm.billNo;
            this.inAndOutForm.pid = this.bodyForm.id;
            let inAndOutFormCopy = cloneObj(this.inAndOutForm);
            let bodyForm = this.inAndOutForm;
            this.indexChange = this.$refs.table.getDataIndex("select")[0];
            this.tableInExpData.splice(
              this.indexChange,
              1,
              cloneObj(inAndOutFormCopy)
            );
            let updateDate = this.tableDataCopy.findIndex((value) => {
              return value.leadId == bodyForm.leadId;
            });
            this.tableDataCopy.splice(updateDate, 1, cloneObj(bodyForm));
            this.$refs.inAndOutForm && this.$refs.inAndOutForm.reset();
            this.$post("billDirWhSave", inAndOutFormCopy)
              .then((res1) => {
                this.saveLoading = false;
                this.isDeclare = true;
                this.inAndOutForm.id = res1.map.id;
              })
              .catch(() => {
                this.saveLoading = false;
              });
            this.inAndOutModel = false;
            this.localType = "";
          }
        } else {
          this.$pop({
            type: "danger",
            message: "表单验证失败!",
          });
          return;
        }
      });
    },
    addInAndOut() {
      this.inAndOutForm = {};
      this.localType = "添加";
      this.inAndOutModel = true;
      setTimeout(() => {
        this.$refs.InexpModel.reset();
      });
      // this.$refs.InexpModel.ep_data = [];
    },
    doBodyUpdate(row, rowId) {
      // let selectData = this.$refs.table.getData("select");
      let selectData = [row];
      if (selectData.length === 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
      } else if (selectData.length > 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
      } else {
        this.localType = "修改"; //代表选中一条
        this.inAndOutForm = cloneObj(selectData[0]);
        this.inAndOutModel = true;
      }
    },
    closeInAndOut() {
      this.inAndOutModel = false;
    },
    handleSelectionChange(val) {
      this.selectLength = val.length;
      this.selectItems = val;
    },
    select2Info(event, row, index) {
      this.bwsStatusDtForm = row;
      this.selectBwsStatus = true;
    },

    //删除关联出入库
    deleteinandout(row, rowId) {
      // let selectData = this.selectItems;
      let selectData = [row];
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
        return;
      }
      this.$confirm({
        word: "是否要删除所选条目信息！",
        callback: (errorInfo) => {
          if (errorInfo) {
            let bscIds = [];
            selectData.forEach((c) => {
              if (c.id) {
                bscIds.push(String(c.id));
              }
            });
            let data = {};
            data["ids"] = bscIds;
            this.$post("deleteInAndOut", data)
              .then((responseData) => {
                selectData.forEach((c) => {
                  this.tableInExpData.splice(
                    this.tableInExpData.findIndex((v) => {
                      return v.id === c.id;
                    }),
                    1
                  );
                });
                this.$pop({
                  type: "success",
                  message: "删除成功",
                });
              })
              .catch((e) => {
                this.loading = false;
              });
          } else {
          }
        },
      });
    },
    againDate(id) {
      this.$post("billDirDetail", { id: id }).then((res) => {
        this.bodyForm = res.map.data;
        if (this.bodyForm.agreeConfirm == 1) {
          console.log("000");
          this.checkboxForm1 = true;
          this.checkboxForm2 = true;
          this.checkboxForm3 = true;
        }
        if (this.bodyForm.agreeConfirm == 2) {
          console.log("0020");
          this.checkboxForm1 = false;
          this.checkboxForm2 = false;
          this.checkboxForm3 = false;
        }
        this.tableDataCopy = res.map.data.billDirDt;
        // -------
        let tableDataCopy = cloneObj(this.tableDataCopy);
        tableDataCopy.forEach((e, i) => {
          e.leadId = i;
        });
        this.tableDataCopy = tableDataCopy;
        this.ep_page.size = 10;
        this.ep_page.page = 1;
        this.makePaging(10, 1, tableDataCopy);
        this.table2Data = res.map.data.billDirStatus;
        this.tableInExpData = res.map.data.billDirWh;
        if (this.bodyForm.optStatus == 5 && this.bodyForm.inexpRltType != 1) {
          this.isBillNo = false;
        } else {
          this.isBillNo = true;
        }
      });
    },
    makePaging(size, page, data) {
      let begin = (page - 1) * size;
      let end = begin + size;
      let newData = data.slice(begin, end);
      this.totalcount = data.length;
      this.tableData = newData;
    },
    handleCurrentChange(val) {
      this.ep_page.page = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.tableDataCopy)
      );
    },
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.tableDataCopy)
      );
    },
    //数据筛选
    filterData(condition, data) {
      let filter = (condition, data) => {
        return data.filter((item) => {
          return Object.keys(condition).every((key) => {
            if (condition[key] == "") return true;
            let diff =
              String(item[key]).toLowerCase() ==
              String(condition[key]).trim().toLowerCase();
            return diff;
          });
        });
      };
      return filter(condition, data);
    },
    natcdTranslate(row, index) {
      let countryList = this.$store.getters.getCountryList;
      for (let i = 0; i < countryList.length; i++) {
        if (row.dclCurrcd == countryList[i].countryCode) {
          return countryList[i].nameCn;
        }
      }
    },
    dclUnitcdTranslate(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.dclUnitcd == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    },
    optStatusFormatter(row, index) {
      if (row.optStatus == "99") {
        return "已删除";
      } else if (row.optStatus == "1") {
        return "暂存";
      } else if (row.optStatus == "18") {
        return "已确认";
      } else if (row.optStatus == "3") {
        return "海关入库成功";
      } else if (row.optStatus == "4") {
        return "海关入库失败";
      } else if (row.optStatus == "5") {
        return "审核通过";
      } else if (row.optStatus == "6") {
        return "审核拒绝";
      } else if (row.optStatus == "17") {
        return "待审核";
      } else if (row.optStatus == "11") {
        return "查验结果正常";
      } else if (row.optStatus == "12") {
        return "查验结果异常";
      } else if (row.optStatus == "505") {
        return "变更成功";
      } else if (row.optStatus == "506") {
        return "变更拒绝";
      } else if (row.optStatus == "606") {
        return "作废审核拒绝";
      } else if (row.optStatus == "501") {
        return "变更暂存";
      } else if (row.optStatus == "503") {
        return "海关变更入库成功";
      } else if (row.optStatus == "504") {
        return "海关变更入库失败";
      } else if (row.optStatus == "518") {
        return "变更已确认";
      } else if (row.optStatus == "605") {
        return "作废审核通过";
      } else if (row.optStatus == "601") {
        return "作废暂存";
      } else if (row.optStatus == "603") {
        return "作废入库成功";
      } else if (row.optStatus == "604") {
        return "作废入库失败";
      } else if (row.optStatus == "517") {
        return "待审核";
      } else if (row.optStatus == "617") {
        return "待审核";
      } else if (row.optStatus == "618") {
        return "作废已确认";
      } else if (row.optStatus == "7") {
        return "审核退单";
      } else if (row.optStatus == "101") {
        return "单证绑定";
      } else if (row.optStatus == "103") {
        return "单证解绑";
      } else if (row.optStatus == "104") {
        return "单证过卡";
      } else if (row.optStatus == "19") {
        return "转人工";
      } else {
        return "未知";
      }
    },
    optUserFormatter(row, index) {
      if (row.optUserId == "0") {
        return "海关回执";
      } else {
        return row.optUserId;
      }
    },
    customSearchBtn() {
      let filterData = this.filterData(this.customSearch, this.tableDataCopy);
      this.makePaging(10, 1, filterData);
      this.totalcount = filterData.length;
    },
    reset(e) {
      this.$refs[e].reset();
    },
    handleDetailClick(event, row, index) {
      this.bodyDtForm = row;
      this.bodyDtModel = true;
    },
  },
};
</script>
