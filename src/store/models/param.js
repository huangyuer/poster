/**
 * system params init store
 * @author wanglintao
 */
import { post } from 'utils'
import store from '../../store'
const param = {
  state: {
	  customList:'',
    countryList:'',
    complexList:'',
    currList:'',
    exchangeRateList:"",
    tradeModeList:"",
    transfList:"",
    transacList:"",
    districtList:"",
    unitList:"",
    useToList:"",
    levymodeList:"",
    wraptypeList:"",
    portstdList:"",
    levytypeList:"",
    processTypeList: "",
    agentList:[],
    supplier:[],
    accountBook:[]
  },

  mutations: {
    SETCUSTOMS (state, newCustomList) {
      state.customList = newCustomList
    },
    SETCOUNTRY(state, newCountryList){
      state.countryList = newCountryList
    },
     SETCOMPLEX(state, newComplexList){
      state.complexList = newComplexList
    },
    SETCURRLIST(state,newCurrList){
      state.currList = newCurrList
    },
    SETEXCHANGERATELIST(state,newExchangeRateList){
      state.exchangeRateList = newExchangeRateList
    },
    SETTRADEMODELIST(state,newTradeModeList){
       state.tradeModeList = newTradeModeList
    },
    SETTRANSFLIST(state,newTransfList){
      state.transfList = newTransfList
    },
    SETTRANSACLIST(state,newTransacList){
      state.transacList = newTransacList
    },
    SETDISTRICTLIST(state,newDistrictList){
      state.districtList = newDistrictList
    },
    SETUNITLIST(state,newUnitList){
       state.unitList = newUnitList
    },
    SETUSETOLIST(state,newUseToList){
      state.useToList = newUseToList
    },
    SETLEVYMODELIST(state,newLevymodeList){
       state.levymodeList = newLevymodeList
    },
    SETWRAPTYPELIST(state,newWraptypeList){
      state.wraptypeList = newWraptypeList
    },
    SETPORTSTDLIST(state,newPortstdList){
      state.portstdList = newPortstdList
    },
    SETLEVYTYPELIST(state,newLevytypeList){
      state.levytypeList = newLevytypeList
    },
    SET_PROCESSTYPE_LIST(state,newProcessTypeList){
      state.processTypeList = newProcessTypeList
    },
    SETLAGENTLIST(state,newagentList){
      state.agentList = newagentList
    },
    SETSUPPLIER(state,newSupplier){
      state.supplier = newSupplier
    },
    SETACCOUNTBOOK(state,newAccountBook){
      state.accountBook = newAccountBook
    },
  },

  actions: {
    // 关区
    setCustomList ({commit}, data) {
      let {
       customList
      } = data
      commit('SETCUSTOMS', customList)
    },
    // 国家参数
    setCountryList ({commit}, data) {
      let {
       countryList
      } = data
      commit('SETCOUNTRY', countryList)
    },
     // 商品编织代码
    setComplexList({commit}, data) {
      let {
       complexList
      } = data
      commit('SETCOMPLEX', complexList)
    },
    // 币值表
    setCurrList({commit}, data) {
      let {
       currList
      } = data
      commit('SETCURRLIST', currList)
    },
  //  汇率表
    setExchangeRateList({commit}, data) {
      let {
       exchangeRateList
      } = data
      commit('SETEXCHANGERATELIST', exchangeRateList)
    },
    // 贸易方式表
    setTradeModeList({commit}, data) {
      let {
       tradeModeList
      } = data
      commit('SETTRADEMODELIST', tradeModeList)
    },
    // 运输方式
    setTransfList({commit}, data) {
      let {
       transfList
      } = data
      commit('SETTRANSFLIST', transfList)
    },
    // 成交方式
    setTransacList({commit}, data) {
      let {
       transacList
      } = data
      commit('SETTRANSACLIST', transacList)
    },
    // 境外目的
    setDistrictList({commit}, data) {
      let {
       districtList
      } = data
      commit('SETDISTRICTLIST', districtList)
    },
    // 计量单位信息
    setUnitList({commit}, data) {
      let {
       unitList
      } = data
      commit('SETUNITLIST', unitList)
    },
    // 用途代码信息
    setUseToList({commit}, data) {
      let {
       useToList
      } = data
      commit('SETUSETOLIST', useToList)
    },
    // 证件免方式代码表
    setLevymodeList({commit}, data) {
      let {
       levymodeList
      } = data
      commit('SETLEVYMODELIST', levymodeList)
    },
    setWraptypeList({commit},data){
      let {
       wraptypeList
      } = data
      commit('SETWRAPTYPELIST', wraptypeList)
    },
    setPortstdList({commit},data){
      let {
        PortstdList
      } = data
      commit('SETPORTSTDLIST', PortstdList)
    },
    setLevytypeList({commit},data){
      let {
        LevytypeList
      } = data
      commit('SETLEVYTYPELIST', LevytypeList)
    },
    setProcessTypeList({commit},data){
      let {
        processTypeList
      } = data
      commit('SET_PROCESSTYPE_LIST', processTypeList)
    },
    // 代理
    setAgentList({commit},){
      let params = {consignerOrgId: +store.getters.getId,relationStatus:"1", page:1, size:1000 }
      return new Promise((resolve, reject) => {
        post("getOrgrelationByOrgId",params)
        .then(res=>{
          let data = res.map.data.content
          data.forEach((e)=>{
            e.proxyOrgCode = e.orgCode
            e.proxyTradeName = e.tradeName
          })
          commit("SETLAGENTLIST",res.map.data.content)
          resolve(res.map.data.content)
        })
        .catch(e => {
          reject(e)
        });
      })
    },
    // 供应商
    setSupplier({commit},){
      let params = {consignerOrgId: +store.getters.getId, page:1, size:1000 }
      post("orgSupplierGetSupplierList",params)
        .then(res=>{
          // 由于后端删除organizationName 将 前端将organizationName字段替换为 后端的 tradeName
          let data = res.map.data.content
          data.forEach((e)=>{
            e.organizationName = e.tradeName
          })
          commit("SETSUPPLIER",data)
        })
        .catch(e => {

        });
    },
    // 账册号
    setAccountBook({commit},){
      let params = {orgId: +store.getters.getId, page:1, size:1000 }
      post("getOrgIdByAccountBook",params)
        .then(res=>{
          commit("SETACCOUNTBOOK",res.map.data.content)
        })
        .catch(e => {

        });
    }
  }
}

export default param
