const getters = {
  getChangeWidth: (state) => state.app.changeWidth,
  getTheme: (state) => state.app.theme,
  getDark: (state) => state.app.dark,
  getPower: (state) => state.app.power,
  getMenuTabs: (state) => state.app.menuTabs,
  getNowPath: (state) => state.app.nowPath,
  getRouterJson: (state) => state.app.routerJson,
  getShowMenu: (state) => state.app.showMenu,
  getNoPermissionPage: (state) => state.app.noPermissionPage,
  getMenuTabInstance: (state) => state.app.menuTabInstance,
  getUserId: (state) => state.user.userId,
  getOrgId: (state) => state.user.orgId,
  getOrgName: (state) => state.user.orgName,
  getOrgCode: (state) => state.user.orgCode,
  getLoginId: (state) => state.user.loginId,
  getUserName: (state) => state.user.userName,
  getNickName: (state) => state.user.nickName,
  getTradeCode: (state) => state.user.tradeCode,
  getCustomId: (state) => state.user.customId,
  getLoginSource: (state) => state.user.loginSource,
  getType: (state) => state.user.type,
  getToken: (state) => state.user.token,
  getOrgorgCode: (state) => state.user.OrgorgCode,
  getTradeId: (state) => state.org.tradeId,
  // 获取组织相关的信息
  getBwsNo: (state) => state.org.bwsNo,
  getId: (state) => state.org.id,
  getBookNo: (state) => state.org.bookNo,
  getOrgType: (state) => state.org.orgType,

  getOrganizationCode: (state) => state.user.tradeCode,
  getOrganizationName: (state) => state.enterprise.tradeName,
  getOrgCreditCode: (state) => state.enterprise.creditCode,

  getOrgCustomId: (state) => state.org.customId,
  getTradeName: (state) => state.enterprise.tradeName,
  getCreditCode: (state) => state.enterprise.creditCode,
  getIdSecond: (state) => state.enterprise.id,
  getCustomList: (state) => state.param.customList,
  getCountryList: (state) => state.param.countryList,
  getComplexList: (state) => state.param.complexList,
  getCurrList: (state) => state.param.currList,
  getExchangeRateList: (state) => state.param.exchangeRateList,
  getTradeModeList: (state) => state.param.tradeModeList,
  getTransfList: (state) => state.param.transfList,
  getTransacList: (state) => state.param.transacList,
  getDistrictList: (state) => state.param.districtList,
  getUnitList: (state) => state.param.unitList,
  getUseToList: (state) => state.param.useToList,
  getLevymodeList: (state) => state.param.levymodeList,
  getWraptypeList: (state) => state.param.wraptypeList,
  getPortstdList: (state) => state.param.portstdList,
  getLevytypeList: (state) => state.param.levytypeList,
  getProcessTypeList: (state) => state.param.processTypeList,
  getAgentList: (state) => state.param.agentList,
  getSupplier: (state) => state.param.supplier,
  getAccountBook: (state) => state.param.accountBook,
  getRltTbTypecdStatus: (state) => state.creditCardReceipt.rltTbTypecdStatus, //表头关联单证类型
  getIoTypecdStatus: (state) => state.creditCardReceipt.ioTypecdStatus, // 表头 进出标志
  getBindTypecd: (state) => state.creditCardReceipt.bindTypecdStatus, // //表头绑定类型
  getInExpTypeStatus: (state) => state.creditCardReceipt.inExpTypeStatus, //ERP/WMS出入库类型

  getClearData: (state) => state.creditCardReceipt.clearData,
  // 修改页面
  getRltTbTypecdStatusEdit: (state) =>
    state.creditCardReceipt.rltTbTypecdStatusEdit, //表头关联单证类型
  getIoTypecdStatusEdit: (state) => state.creditCardReceipt.ioTypecdStatusEdit, // 表头 进出标志
  getBindTypecdEdit: (state) => state.creditCardReceipt.bindTypecdStatusEdit, // //表头绑定类型
  getInExpTypeStatusEdit: (state) =>
    state.creditCardReceipt.inExpTypeStatusEdit, //ERP/WMS出入库类型
  getClearDataEdit: (state) => state.creditCardReceipt.clearDataEdit,
};

export default getters;
