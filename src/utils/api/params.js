
import localStorage from 'utils/localStorage'
import store from 'src/store'
import {post} from 'utils/fetch'
export const queryParams = function() {
  // 关区参数
  post('queryCustom', {
    page: 1,
    size: 2000
  }).then((res) => {
    const customs = {
      customList: res.map.data.content
    }
    localStorage.setLocalStorage('setCustomList', customs, 1500)
    store.dispatch('setCustomList', customs)
  })
  // 国家参数
  post('queryCountry', {
    page: 1,
    size: 1200
  }).then((res) => {
    const country = {
      countryList: res.map.data.content
    }
    localStorage.setLocalStorage('setCountryList', country, 1500)
    store.dispatch('setCountryList', country)
  })
  // 币值表
  post('queryCurr', {
    page: 1,
    size: 1200
  }).then((res) => {
    const curr = {
      currList: res.map.data.content
    }
    localStorage.setLocalStorage('setCurrList', curr, 1500)
    store.dispatch('setCurrList', curr)
  })
  // 汇率表
  post('queryExchangeRate', {
    page: 1,
    size: 1200
  }).then((res) => {
    const exchangeRate = {
      exchangeRateList: res.map.data.content
    }
    localStorage.setLocalStorage('setExchangeRateList', exchangeRate, 1500)
    store.dispatch('setExchangeRateList', exchangeRate)
  })
  // 贸易方式表
  post('queryTradeMode', {
    page: 1,
    size: 1200
  }).then((res) => {
    const tradeMode = {
      tradeModeList: res.map.data.content
    }
    localStorage.setLocalStorage('setTradeModeList', tradeMode, 1500)
    store.dispatch('setTradeModeList', tradeMode)
  })
  // 运输方式
  post('queryTransf', {
    page: 1,
    size: 1200
  }).then((res) => {
    const transf = {
      transfList: res.map.data.content
    }
    localStorage.setLocalStorage('setTransfList', transf, 1500)
    store.dispatch('setTransfList', transf)
  })
  // 成交方式
  post('queryTransac', {
    page: 1,
    size: 1200
  }).then((res) => {
    const transac = {
      transacList: res.map.data.content
    }
    localStorage.setLocalStorage('setTransacList', transac, 1500)
    store.dispatch('setTransacList', transac)
  })
  // 境外目的
  post('queryDistrict', {
    page: 1,
    size: 1200
  }).then((res) => {
    const district = {
      districtList: res.map.data.content
    }
    localStorage.setLocalStorage('setDistrictList', district, 1500)
    store.dispatch('setDistrictList', district)
  })
  // 计量单位信息
  post('queryUnit', {
    page: 1,
    size: 1200
  }).then((res) => {
    const unit = {
      unitList: res.map.data.content
    }
    localStorage.setLocalStorage('setUnitList', unit, 1500)
    store.dispatch('setUnitList', unit)
  })
  // 用途代码信息
  post('queryUseTo', {
    page: 1,
    size: 1200
  }).then((res) => {
    const useTo = {
      useToList: res.map.data.content
    }
    localStorage.setLocalStorage('setUseToList', useTo, 1500)
    store.dispatch('setUseToList', useTo)
  })
  // 证件免方式代码表
  post('queryLevymode', {
    page: 1,
    size: 1200
  }).then((res) => {
    const levymode = {
      levymodeList: res.map.data.content
    }
    localStorage.setLocalStorage('setLevymodeList', levymode, 1500)
    store.dispatch('setLevymodeList', levymode)
  })
  // 包装种类信息
  post('queryWraptypeList', {
    page: 1,
    size: 1200
  }).then((res) => {
    const wraptype = {
      wraptypeList: res.map.data.content
    }
    localStorage.setLocalStorage('setWraptypeList', wraptype, 1500)
    store.dispatch('setWraptypeList', wraptype)
  })
  //港口代码
  post('getPortstdList', {
    page: 1,
    size: 4500
  }).then((res) => {
    const PortstdList = {
      PortstdList: res.map.data.content
    }
    localStorage.setLocalStorage('setPortstdList', PortstdList, 1500)
    store.dispatch('setPortstdList', PortstdList)
  })
  //减免性质
  post('getLevytypeList', {
    page: 1,
    size: 4500
  }).then((res) => {
    const LevytypeList = {
      LevytypeList: res.map.data.content
    }
    localStorage.setLocalStorage('setLevytypeList', LevytypeList, 1500)
    store.dispatch('setLevytypeList', LevytypeList)
  })
  //加工种类
  post('getProcessList', {
    page: 1,
    size: 4500
  }).then((res) => {
    const processTypeList = {
      processTypeList: res.map.data.content
    }
    localStorage.setLocalStorage('setProcessTypeList', processTypeList, 1500)
    store.dispatch('setProcessTypeList', processTypeList)
  })


}