import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Main from '../framework/Home'
import Login from '../framework/Login'
import BackPassWord from '../views/sys/BackPassWord'
import Err404 from '../framework/Error'
import Err401 from '../framework/401'
import Err402 from '../framework/402'
import Directdelivery from '../framework/tokenPage/directdelivery'
const Qualificatinfo = resolve => require(['@/sys/Quali/Qualificatinfo'], resolve)
const Qualificat = resolve => require(['@/sys/Quali/Qualificat'], resolve)
const Organ = resolve => require(['@/sys/Quali/Organ'], resolve)
const logisticsBookInfo = resolve => require(['@/sys/LogisticsBook/LogisticsBookInfo'], resolve)
const logisticsBookDtInfo = resolve => require(['@/sys/LogisticsBook/LogisticsBookDtInfo'], resolve)
const processingBooksInfo = resolve => require(['@/sys/ProcessingBooks/ProcessingBooksInfo'], resolve)
const accountBookDetilInfo = resolve => require(['@/sys/ProcessingBooks/AccountBookInfo'], resolve)
const equipmentBookInfo = resolve => require(['@/sys/EquipmentBook/EquipmentBookInfo'], resolve)
const equipmentBookDtInfo = resolve => require(['@/sys/EquipmentBook/EquipmentBookDtInfo'], resolve)
const woListInfo = resolve => require(['@/sys/WorkOrder/WorkOrderInfo'], resolve)
const woListDtInfo = resolve => require(['@/sys/WorkOrder/WorkOrderDtInfo'], resolve)
const home = resolve => require(['@/sys/home'], resolve)
const queryComplex = resolve => require(['@/sys/Parameter/ComplexInfo'], resolve)
const queryExchangeRate = resolve => require(['@/sys/Parameter/ExchangeRateInfo'], resolve)
const queryTradeMode = resolve => require(['@/sys/Parameter/TradeModeInfo'], resolve)
const queryTransf = resolve => require(['@/sys/Parameter/TransfInfo'], resolve)
const queryTransac = resolve => require(['@/sys/Parameter/TransacInfo'], resolve)
const queryCustom = resolve => require(['@/sys/Parameter/CustomInfo'], resolve)
const queryCurr = resolve => require(['@/sys/Parameter/CurrInfo'], resolve)
const queryCountry = resolve => require(['@/sys/Parameter/CountryInfo'], resolve)
const queryUnit = resolve => require(['@/sys/Parameter/UnitInfo'], resolve)
const queryDistrict = resolve => require(['@/sys/Parameter/DistrictInfo'], resolve)
const queryUseTo = resolve => require(['@/sys/Parameter/UseToInfo'], resolve)
const queryLevymode = resolve => require(['@/sys/Parameter/Levymode'], resolve)
const queryDestinationPort = resolve => require(['@/sys/Parameter/destinationPort'], resolve)
const queryCutMode = resolve => require(['@/sys/Parameter/cutMode'], resolve)
const queryWraptypeList = resolve => require(['@/sys/Parameter/WrapTypeInfo'], resolve)
const queryProcessTypeList = resolve => require(['@/sys/Parameter/processTypeInfo'], resolve)
const PathBillOfLadingInfo = resolve => require(['@/sys/BillDir/PathBillOfladingInfo'], resolve)
const BillDirDtAdd = resolve => require(['@/sys/BillDir/BillDirDtAdd'], resolve)
const BillDirDtUpdate = resolve => require(['@/sys/BillDir/BillDirDtUpdate'], resolve)
const BillDirDtModify = resolve => require(['@/sys/BillDir/BillDirDtModify'], resolve)
const BillDirDtInvalid = resolve => require(['@/sys/BillDir/BillDirDtInvalid'], resolve)
const BillDirDtInfo = resolve => require(['@/sys/BillDir/BillDirDtInfo'], resolve)
const PathBillDirExpBscInfo = resolve => require(['@/sys/BillDirExp/PathBillDirExpBscInfo'], resolve)
const BillDirExpDtAdd = resolve => require(['@/sys/BillDirExp/BillDirExpDtAdd'], resolve)
const BillDirExpDtInfo = resolve => require(['@/sys/BillDirExp/BillDirExpDtInfo'], resolve)
const BillDirExpDtUpdate = resolve => require(['@/sys/BillDirExp/BillDirExpDtUpdate'], resolve)
const BillDirExpDtModify = resolve => require(['@/sys/BillDirExp/BillDirExpDtModify'], resolve)
const CreditCardReceiptAdd = resolve => require(['@/sys/CreditCardReceipt/CreditCardReceiptAdd'], resolve)
const CreditCardReceiptInfo = resolve => require(['@/sys/CreditCardReceipt/CreditCardReceiptInfo'], resolve)
const CreditCardReceiptDtInfo = resolve => require(['@/sys/CreditCardReceipt/CreditCardReceiptDtInfo'], resolve)
const CreditCardReceiptUpdate = resolve => require(['@/sys/CreditCardReceipt/CreditCardReceiptUpdate'], resolve)
const WareHouseInfo = resolve => require(['@/sys/WareHouse/WareHouseInfo'], resolve)
const WareHouseAdd = resolve => require(['@/sys/WareHouse/WareHouseAdd'], resolve)
const WareHouseDtInfo = resolve => require(['@/sys/WareHouse/WareHouseDtInfo'], resolve)
const WareHouseUpdate = resolve => require(['@/sys/WareHouse/WareHouseUpdate'], resolve)
const WareHouseChange = resolve => require(['@/sys/WareHouse/WareHouseChange'], resolve)
const OutwardInfo = resolve => require(['@/sys/Material/OutwardInfo'], resolve)
const OutwardAdd = resolve => require(['@/sys/Material/OutwardAdd'], resolve)
const OutwardDtInfo = resolve => require(['@/sys/Material/OutwardDtInfo'], resolve)
const OutwardUpdate = resolve => require(['@/sys/Material/OutwardUpdate'], resolve)
const OutwardChange = resolve => require(['@/sys/Material/OutwardChange'], resolve)
const ImportBondedAdd = resolve => require(['@/sys/ImportBonded/ImportBondedAdd'], resolve)
const ImportBondedInfo = resolve => require(['@/sys/ImportBonded/ImportBondedInfo'], resolve)
const ImportBondedDtInfo = resolve => require(['@/sys/ImportBonded/ImportBondedDtInfo'], resolve)
const ImportBondedupdate = resolve => require(['@/sys/ImportBonded/importBondedupdate'], resolve)
const Todolist = resolve => require(['@/sys/Todolist/Todolist'], resolve)
const ItemEntry = resolve => require(['@/sys/Todolist/ItemEntry'], resolve)
const Details = resolve => require(['@/sys/Todolist/Details'], resolve)
const BaseGoodAdd = resolve => require(['@/sys/BaseGood/BaseGoodAdd'], resolve)
const BaseGoodInfo = resolve => require(['@/sys/BaseGood/BaseGoodInfo'], resolve)
const BaseGoodUpdate = resolve => require(['@/sys/BaseGood/BaseGoodUpdate'], resolve)
const BaseGoodDtInfo = resolve => require(['@/sys/BaseGood/BaseGoodDtInfo'], resolve)
const importAdd = resolve => require(['@/sys/draw/importAdd'], resolve)
const importBondedInfodraw = resolve => require(['@/sys/draw/ImportBondedInfodraw'], resolve)
const ImportBondedDtInfodraw = resolve => require(['@/sys/draw/ImportBondedDtInfodraw'], resolve)
const drawupdate = resolve => require(['@/sys/draw/drawupdate'], resolve)
const drawsearch = resolve => require(['@/sys/draw/drawsearch'], resolve)
const drawsearchvalue = resolve => require(['@/sys/draw/drawsearchvalue'], resolve)
const indexdraw = resolve => require(['@/sys/draw/indexdraw'], resolve)
const drawvalue = resolve => require(['@/sys/draw/drawvalue'], resolve)
const excelImport = resolve => require(['@/sys/FileExport/ExcelImport'], resolve)
const BayonetGeneration = resolve => require(['@/sys/BayonetGeneration/port'], resolve)
const Confirmation = resolve => require(['@/sys/Confirmation/index'], resolve)
const ComfirmationDtInfo = resolve => require(['@/sys/Confirmation/ComfirmationDtInfo'], resolve)
const AccessArea = resolve => require(['@/sys/AccessArea/index'], resolve)
const BusinessDeclarFromAdd = resolve => require(['@/sys/BusinessDeclarFrom/BusinessDeclarFromAdd'], resolve)
const BusinessDeclarFromSearch = resolve => require(['@/sys/BusinessDeclarFrom/BusinessDeclarFromSearch'], resolve)
const BusinessDeclarFromUpdate = resolve => require(['@/sys/BusinessDeclarFrom/BusinessDeclarFromUpdate'], resolve)
const BusinessDeclarFromDtInfo = resolve => require(['@/sys/BusinessDeclarFrom/BusinessDeclarFromDtInfo'], resolve)
const GuaranteeAdd = resolve => require(['@/sys/Guarantee/GuaranteeAdd'], resolve)
const GuaranteeSearch = resolve => require(['@/sys/Guarantee/GuaranteeSearch'], resolve)
const GuaranteeUpdate = resolve => require(['@/sys/Guarantee/GuaranteeUpdate'], resolve)
const GuaranteeDtInfo = resolve => require(['@/sys/Guarantee/GuaranteeDtInfo'], resolve)
const ToalGuaranteeAdd = resolve => require(['@/sys/ToalGuarantee/ToalGuaranteeAdd'], resolve)
const ToalGuaranteeSearch = resolve => require(['@/sys/ToalGuarantee/ToalGuaranteeSearch'], resolve)
const ToalGuaranteeUpdate = resolve => require(['@/sys/ToalGuarantee/ToalGuaranteeUpdate'], resolve)
const ToalGuaranteeDtInfo = resolve => require(['@/sys/ToalGuarantee/ToalGuaranteeDtInfo'], resolve)
const allNews = resolve => require(['@/sys/personal/AllNews'], resolve)
const LoadingListInfo = resolve => require(['@/sys/LoadingList/LoadingListInfo'], resolve)
const LoadingListAdd = resolve => require(['@/sys/LoadingList/LoadingListAdd'], resolve)
const LoadingListDtInfo = resolve => require(['@/sys/LoadingList/LoadingListDtInfo'], resolve)
const LoadingListUpdate = resolve => require(['@/sys/LoadingList/LoadingListUpdate'], resolve)
const temporary = resolve => require(['@/sys/temporary/index'], resolve)
const machining = resolve => require(['@/sys/machining/index'], resolve)

const operUserInfo = resolve => require(['@/biz/OperUser/OperUserInfo'], resolve)
const operUserAdd = resolve => require(['@/biz/OperUser/OperUserAdd'], resolve)
const operUserUpdate = resolve => require(['@/biz/OperUser/OperUserUpdate'], resolve)
const enterpriseInfo = resolve => require(['@/biz/Enterprise/EnterpriseInfo'], resolve)
const enterpriseAdd = resolve => require(['@/biz/Enterprise/EnterpriseAdd'], resolve)
const enterpriseUpdate = resolve => require(['@/biz/Enterprise/EnterpriseUpdate'], resolve)
const EnterpriseChange = resolve => require(['@/biz/Enterprise/EnterpriseChange'], resolve)
const organizationInfo = resolve => require(['@/biz/Organization/OrganizationInfo'], resolve)
const organizationAdd = resolve => require(['@/biz/Organization/OrganizationAdd'], resolve)
const organizationUpdate = resolve => require(['@/biz/Organization/OrganizationUpdate'], resolve)
const OrganizationChange = resolve => require(['@/biz/Organization/OrganizationChange'], resolve)
const qualification = resolve => require(['@/biz/Organization/Qualification'], resolve)

const routes = [
  { path: '/login', component: Login, name: '登录' },
  {path:'/backPassWord',component:BackPassWord,name:'找回密码'},
  {path:'/directdelivery',component:Directdelivery,name:'径予提发货'},
  {
    path: '/',
    component: Main,
    redirect: '/home',
    name: 'ep',
    children: [
      { path: 'Qualificatinfo', component: Qualificatinfo, name: '企业资质查询', meta: {} },
      { path: 'Qualificat', component: Qualificat, name: '企业资质管理', meta: {} },
      { path: 'Organ', component: Organ, name: '组织资质管理', meta: {} },
      { path: 'logisticsBookInfo', component: logisticsBookInfo, name: '仓储数据查询', meta: {} },
      { path: 'logisticsBookDtInfo', component: logisticsBookDtInfo, name: '仓储数据详情', meta: {"muti":true,"mutiName":"id"} },
      { path: 'processingBooksInfo', component: processingBooksInfo, name: '加工数据查询', meta: {} },
      { path: 'accountBookDetilInfo', component: accountBookDetilInfo, name: '加工数据详情', meta: {"muti":true,"mutiName":"id"} },
      { path: 'equipmentBookInfo', component: equipmentBookInfo, name: '设备数据查询', meta: {} },
      { path: 'equipmentBookDtInfo', component: equipmentBookDtInfo, name: '设备数据详情', meta: {"muti":true,"mutiName":"id"} },
      { path: 'woListInfo', component: woListInfo, name: '工单查询', meta: {} },
      { path: 'woListDtInfo', component: woListDtInfo, name: '工单详情', meta: {"muti":true,"mutiName":"id"} },
      { path: 'home', component: home, name: '首页', meta: {} },
      { path: 'queryComplex', component: queryComplex, name: '商品编码信息', meta: {} },
      { path: 'queryExchangeRate', component: queryExchangeRate, name: '汇率表信息', meta: {} },
      { path: 'queryTradeMode', component: queryTradeMode, name: '贸易方式信息', meta: {} },
      { path: 'queryTransf', component: queryTransf, name: '运输方式信息', meta: {} },
      { path: 'queryTransac', component: queryTransac, name: '成交方式信息', meta: {} },
      { path: 'queryCustom', component: queryCustom, name: '关区信息', meta: {} },
      { path: 'queryCurr', component: queryCurr, name: '币制表', meta: {} },
      { path: 'queryCountry', component: queryCountry, name: '国家信息', meta: {} },
      { path: 'queryUnit', component: queryUnit, name: '计量单位信息', meta: {} },
      { path: 'queryDistrict', component: queryDistrict, name: '境内目的地信息', meta: {} },
      { path: 'queryUseTo', component: queryUseTo, name: '用途代码信息', meta: {} },
      { path: 'queryLevymode', component: queryLevymode, name: '征减免方式代码信息', meta: {} },
      { path: 'queryDestinationPort', component: queryDestinationPort, name: '港口代码信息', meta: {} },
      { path: 'queryCutMode', component: queryCutMode, name: '减免性质信息', meta: {} },
      { path: 'queryWraptypeList', component: queryWraptypeList, name: '包装种类表', meta: {} },
      { path: 'queryProcessTypeList', component: queryProcessTypeList, name: '加工种类信息', meta: {} },
      { path: 'PathBillOfLadingInfo', component: PathBillOfLadingInfo, name: '进境径予放行货物自主声明查询', meta: {} },
      { path: 'BillDirDtAdd', component: BillDirDtAdd, name: '进境径予放行货物自主声明生成', meta: {} },
      { path: 'BillDirDtUpdate', component: BillDirDtUpdate, name: '进境径予放行货物自主声明修改', meta: {} },
      { path: 'BillDirDtModify', component: BillDirDtModify, name: '进境径予放行货物自主声明变更', meta: {} },
      { path: 'BillDirDtInvalid', component: BillDirDtInvalid, name: '进境径予放行货物自主声明作废', meta: {} },
      { path: 'BillDirDtInfo', component: BillDirDtInfo, name: '进境径予放行货物自主声明明细', meta: {"muti":true,"mutiName":"id"} },
      { path: 'PathBillDirExpBscInfo', component: PathBillDirExpBscInfo, name: '出境径予放行货物自主声明查询', meta: {} },
      { path: 'BillDirExpDtAdd', component: BillDirExpDtAdd, name: '出境径予放行货物自主声明生成', meta: {} },
      { path: 'BillDirExpDtInfo', component: BillDirExpDtInfo, name: '出境径予放行货物自主声明明细', meta: {"muti":true,"mutiName":"id"} },
      { path: 'BillDirExpDtUpdate', component: BillDirExpDtUpdate, name: '出境径予放行货物自主声明修改', meta: {} },
      { path: 'BillDirExpDtModify', component: BillDirExpDtModify, name: '出境径予放行货物自主声明-变更', meta: {} },
      { path: 'CreditCardReceiptAdd', component: CreditCardReceiptAdd, name: '卡口验放凭证生成', meta: {} },
      { path: 'CreditCardReceiptInfo', component: CreditCardReceiptInfo, name: '卡口验放凭证查询', meta: {} },
      { path: 'CreditCardReceiptDtInfo', component: CreditCardReceiptDtInfo, name: '卡口验放凭证明细', meta: {"muti":true,"mutiName":"id"} },
      { path: 'CreditCardReceiptUpdate', component: CreditCardReceiptUpdate, name: '卡口验放凭证修改', meta: {} },
      { path: 'WareHouseInfo', component: WareHouseInfo, name: '进出区提发货凭证查询', meta: {} },
      { path: 'WareHouseAdd', component: WareHouseAdd, name: '进出区提发货凭证生成', meta: {} },
      { path: 'WareHouseDtInfo', component: WareHouseDtInfo, name: '进出区提发货凭证明细', meta: {"muti":true,"mutiName":"id"} },
      { path: 'WareHouseUpdate', component: WareHouseUpdate, name: '进出区提发货凭证修改', meta: {} },
      { path: 'WareHouseChange', component: WareHouseChange, name: '进出区提发货凭证变更', meta: {} },
      { path: 'OutwardInfo', component: OutwardInfo, name: '耗料清单查询', meta: {} },
      { path: 'OutwardAdd', component: OutwardAdd, name: '耗料清单生成', meta: {} },
      { path: 'OutwardDtInfo', component: OutwardDtInfo, name: '耗料清单明细', meta: {"muti":true,"mutiName":"id"} },
      { path: 'OutwardUpdate', component: OutwardUpdate, name: '耗料清单修改', meta: {} },
      { path: 'OutwardChange', component: OutwardChange, name: '耗料清单变更', meta: {} },
      { path: 'ImportBondedAdd', component: ImportBondedAdd, name: '进出境货物汇总生成', meta: {"muti":true,"mutiName":"id"} },
      { path: 'ImportBondedInfo', component: ImportBondedInfo, name: '进出境货物汇总查询', meta: {} },
      { path: 'ImportBondedDtInfo', component: ImportBondedDtInfo, name: '进出境货物明细', meta: {"muti":true,"mutiName":"id"} },
      { path: 'ImportBondedupdate', component: ImportBondedupdate, name: '进出境货物修改', meta: {"muti":true,"mutiName":"id"} },
      { path: 'Todolist', component: Todolist, name: '待办事项查询', meta: {} },
      { path: 'ItemEntry', component: ItemEntry, name: '待办事项生成', meta: {} },
      { path: 'Details', component: Details, name: '待办事项详情', meta: {"muti":true,"mutiName":"id"} },
      { path: 'BaseGoodAdd', component: BaseGoodAdd, name: '货物信息生成', meta: {"muti":true,"mutiName":"id"} },
      { path: 'BaseGoodInfo', component: BaseGoodInfo, name: '货物信息查询', meta: {} },
      { path: 'BaseGoodUpdate', component: BaseGoodUpdate, name: '货物信息修改', meta: {} },
      { path: 'BaseGoodDtInfo', component: BaseGoodDtInfo, name: '货物信息明细', meta: {"muti":true,"mutiName":"id"} },
      { path: 'importAdd', component: importAdd, name: '出入库预增减生成', meta: {"muti":true,"mutiName":"id"} },
      { path: 'importBondedInfodraw', component: importBondedInfodraw, name: '出入库预增减查询', meta: {} },
      { path: 'ImportBondedDtInfodraw', component: ImportBondedDtInfodraw, name: '出入库预增减明细', meta: {"muti":true,"mutiName":"id"} },
      { path: 'drawupdate', component: drawupdate, name: '出入库预增减修改', meta: {} },
      { path: 'drawsearch', component: drawsearch, name: '映射表查询', meta: {} },
      { path: 'drawsearchvalue', component: drawsearchvalue, name: '映射值查询', meta: {} },
      { path: 'indexdraw', component: indexdraw, name: '映射值查询', meta: {} },
      { path: 'drawvalue', component: drawvalue, name: '映射', meta: {} },
      { path: 'excelImport', component: excelImport, name: 'Excel导入', meta: {} },
      { path: 'BayonetGeneration', component: BayonetGeneration, name: '卡口验放凭证生成', meta: {} },
      { path: 'Confirmation', component: Confirmation, name: '进出库确认', meta: {} },
      { path: 'ComfirmationDtInfo', component: ComfirmationDtInfo, name: '进出库确认明细', meta: {"muti":true,"mutiName":"id"} },
      { path: 'AccessArea', component: AccessArea, name: '生成进出区提发货凭证', meta: {} },
      { path: 'BusinessDeclarFromAdd', component: BusinessDeclarFromAdd, name: ' 业务申报表生成', meta: {} },
      { path: 'BusinessDeclarFromSearch', component: BusinessDeclarFromSearch, name: ' 业务申报表查询', meta: {} },
      { path: 'BusinessDeclarFromUpdate', component: BusinessDeclarFromUpdate, name: ' 业务申报表修改', meta: {} },
      { path: 'BusinessDeclarFromDtInfo', component: BusinessDeclarFromDtInfo, name: ' 业务申报表明细', meta: {"muti":true,"mutiName":"id"} },
      { path: 'GuaranteeAdd', component: GuaranteeAdd, name: '生成保证金', meta: {} },
      { path: 'GuaranteeSearch', component: GuaranteeSearch, name: '保证金查询', meta: {} },
      { path: 'GuaranteeUpdate', component: GuaranteeUpdate, name: '保证金修改', meta: {} },
      { path: 'GuaranteeDtInfo', component: GuaranteeDtInfo, name: '保证金查询明细', meta: {"muti":true,"mutiName":"id"} },
      { path: 'ToalGuaranteeAdd', component: ToalGuaranteeAdd, name: '生成总担保', meta: {} },
      { path: 'ToalGuaranteeSearch', component: ToalGuaranteeSearch, name: '总担保查询', meta: {} },
      { path: 'ToalGuaranteeUpdate', component: ToalGuaranteeUpdate, name: '总担保修改', meta: {} },
      { path: 'ToalGuaranteeDtInfo', component: ToalGuaranteeDtInfo, name: '总担保查询明细', meta: {"muti":true,"mutiName":"id"} },
      { path: 'allNews', component: allNews, name: '消息中心', meta: {} },
      { path: 'LoadingListInfo', component: LoadingListInfo, name: '装车单查询', meta: {} },
      { path: 'LoadingListAdd', component: LoadingListAdd, name: '装车单生成', meta: {} },
      { path: 'LoadingListDtInfo', component: LoadingListDtInfo, name: '装车单详情', meta: {"muti":true,"mutiName":"id"} },
      { path: 'LoadingListUpdate', component: LoadingListUpdate, name: '装车单修改', meta: {} },
      { path: 'temporary', component: temporary, name: '临时进出区拖拽', meta: {} },
      { path: 'machining', component: machining, name: '外发加工拖拽', meta: {} },
      { path: 'operUserInfo', component: operUserInfo, name: '用户查询', meta: {} },
      { path: 'operUserAdd', component: operUserAdd, name: '用户添加', meta: {} },
      { path: 'operUserUpdate', component: operUserUpdate, name: '用户修改', meta: {} },
      { path: 'enterpriseInfo', component: enterpriseInfo, name: '企业信息查询', meta: {} },
      { path: 'enterpriseAdd', component: enterpriseAdd, name: '企业信息添加', meta: {} },
      { path: 'enterpriseUpdate', component: enterpriseUpdate, name: '企业信息修改', meta: {} },
      { path: 'EnterpriseChange', component: EnterpriseChange, name: '企业信息变更', meta: {} },
      { path: 'organizationInfo', component: organizationInfo, name: '组织信息查询', meta: {} },
      { path: 'organizationAdd', component: organizationAdd, name: '组织信息添加', meta: {} },
      { path: 'organizationUpdate', component: organizationUpdate, name: '组织信息修改', meta: {} },
      { path: 'OrganizationChange', component: OrganizationChange, name: '组织信息变更', meta: {} },
      { path: 'qualification', component: qualification, name: '资质管理', meta: {} }
    ]
  },
  { path: '/403', name: '403 No Permission!', component: Err401 },
  { path: '/402', name: '402 No Permission!', component: Err402 },
  { path: '/*', name: '404 not found!', component: Err404 }
]

export default new Router({
  routes: routes
})
