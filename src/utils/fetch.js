/**
 * Ajax操作类，运用fetch技术
 * 所有内容采用JSON传输（暂时）
 * @author: Merjiezo
 * @since: 2017-05-11
 * @version 1.3.8
 */
import Vue from 'vue'
import api from '../api/index'
import { request as _request, asyncReq, baseJsonp } from '../base/request'
import { RTN_KEYS_STR, API_KEYS_STR } from '../base/share/request'
import { warn, noop } from '../base/base'
import { dataErr } from './data'
import { delToken, getToken,getId } from './oauth'
import { calaulatorSign } from './func'
import { validateURL } from './validate'
import router from '../router'
import Storage  from './localStorage'
// SPBoot 排序导致需要改变节点做到验签一致
const SPRINGBOOT_SIGN = {
  form (data) { return data ? { data: JSON.stringify(data) } : { data: "{}" } },
  file (data) { return data },
  json (data) { return data ? { data: JSON.stringify(data) } : { data: "{}" } },
  html (data) { return data },
  xml (data) { return data }
}
const OAUTH_TIMEOUT_MSG = '授权失效，请重新登陆！'
const MERGE_OBJ = {
  // Request Default Setting
  method: 'POST',
  cors: true,
  dataType: 'json',
  rtnType: 'json',
  timeout: api.timeout,

  /***
   * EP Framework Api Rtn
   * Handle Global Setting
   * Include Oauth, Success Pop and Error Pop
   */
  oauth: true,
  showSuccess: false,
  showError: true,
  sign: api.sign
}

function merge (settings, method) {
  let res = typeof settings === 'string'
    ? res = { url: settings }
    : res = { ...settings }

  method? res.method = method: null
  for (let item in MERGE_OBJ) {
    if (MERGE_OBJ.hasOwnProperty(item)
      && !res.hasOwnProperty(item)) {
        res[item] = MERGE_OBJ[item]
    }
  }
  return res
}
function defaultApiHandle (response, params) {

  if (params.rtnType !== 'json') {
    return response
  }
  if (dataErr(response)) {
    if (response.note != null && response.note != '') {
      Vue.prototype.$pop({
        type: 'success',
        message: response.note,
        hasClose: true
      })
    }
    return response
  } else {
    // 重新登录
    if (response.errorCode === '904') {
      console.log(response)
      delToken()
      Storage.delLocalStorage("setUserInfo")
      router.push('/login')
      Vue.prototype.$pop({
        type: 'danger',
        message: response.note||'授权失效，请重新登陆！',
        hasClose: true
      })
    } else if (params.showError) {
      Vue.prototype.$pop({
        type: 'danger',
        message: response.note || '错误',
        hasClose: true
      })
    }
    throw response
  }
}

// 跨域，拼接global内的域名
function urlMerge (settings) {
  let url = settings.url
  if (!validateURL(url)) {
    settings.url = (settings.lgsa?global.LGSAURL:global.HOST) + url
  }
}

// Only In Dev / Test
function validateSettings (key, ajaxParam, reqParam, methodType) {
  if (!ajaxParam) {
    warn('[' + key + '] in [' + methodType + '] object is undefined in Api.json', '/utils/fetch.js')
    return false
  } else if (!reqParam.hasOwnProperty('url')) {
    warn('Api.json settings of url is Empty', '/utils/fetch.js')
    return false
  } else if (API_KEYS_STR.indexOf(reqParam.dataType) === -1) {
    warn(
      key + ' dataType settings error, your dataType is ' +
      reqParam.dataType + ',it should be ' +
      API_KEYS_STR,
      'utils/fetch.js'
    )
    return false
  } else if (RTN_KEYS_STR.indexOf(reqParam.rtnType) === -1) {
    warn(
      key + ' rtnType settings error, your rtnType is ' +
      reqParam.dataType + ',it should be ' +
      RTN_KEYS_STR,
      'utils/fetch.js'
    )
    return false
  }
  return true
}

/**
 * New EP Framework base request function
 * @param {*} key api.json对应节点的键
 * @param {*} data 请求的数据
 * @param {*} type 请求类型[GET/POST]
 */
function requestPrepare (key, data, type) {
  let ajaxParam = api[type.toLowerCase()][key],
      reqParam = merge(ajaxParam, type)

  if (process.env.NODE_ENV !== 'production') {
    if (!validateSettings(key, ajaxParam, reqParam, type)) {
      return 'Error Setting!'
    }
  }

  const token = getToken()
  let orgId = getId()
  if(orgId==undefined){
    orgId = ""
  }
  if (token !== '' || !reqParam.oauth) {
    let realData = data
    let headers = {}
    // 用于token是否失效
    let curTime = new Date();
    let filterApi = ['toolKickoutGetDetail', 'toolKickoutGetVersion'];
    if (filterApi.indexOf(key) == -1) {
      localStorage.setItem('curTime', curTime);
    }
    // Oauth Carry
    if (reqParam.oauth) { headers.token = token,headers.orgId = orgId ,headers.checkType = "N"}
    // Api Sign Carry
    if (reqParam.sign) {
      realData = SPRINGBOOT_SIGN[reqParam.dataType].call(this, data)
      headers.epSign = calaulatorSign(realData)
    }
    reqParam.headers = headers
    reqParam.data = data
    urlMerge(reqParam)

    return reqParam
  } else {
    // No Token, Need To Login
    router.push('/Login')
    Vue.prototype.$pop({
      type: 'danger',
      message: OAUTH_TIMEOUT_MSG,
      hasClose: true
    })
    return OAUTH_TIMEOUT_MSG
  }
}

export function post (key, data) {
  let reqParam = requestPrepare(key, data, 'POST', true)
  if (typeof reqParam === 'string') {
    return Promise.reject(reqParam)
  }
  return _request(reqParam).then(json => {
    return defaultApiHandle(json, reqParam)
  })
}

export function get (key, data) {
  let reqParam = requestPrepare(key, data, 'GET', true)
  if (typeof reqParam === 'string') {
    return Promise.reject(reqParam)
  }
  return _request(reqParam).then(json => {
    return defaultApiHandle(json, reqParam)
  })
}

export function request (settings) {
  if (process.env.NODE_ENV !== 'production') {

    if (!settings.method && !settings.url) {
      warn('method and url request!', 'utils/fetch.js')
      return Promise.reject('Error Setting!')
    }
  }
  return _request(settings)
}

export function asyncAjax (key, data, callback, errorCallback) {
  errorCallback = errorCallback? errorCallback: noop
  let result
  let reqParam = requestPrepare(key, data, 'async')
  if (typeof reqParam === 'string') {
    errorCallback(reqParam)
    return result
  }
  try {
    reqParam.method = api['async'].method || 'POST'
    let response = asyncReq(reqParam)

    try {
      result = defaultApiHandle(response, reqParam)
      if (typeof callback === 'function') { callback(result) }
    } catch (e) {
      errorCallback(e)
    }
    return result
  } catch (e) {
    Vue.prototype.$pop(e.message)
    errorCallback(e.message)
    return result
  }
}

export function jsonp (number, fn, params, err) {
  let url = api.jsonp[number]
  if (process.env.NODE_ENV !== 'production') {
    if (url && typeof url !== 'string') {
      warn('Jsonp Url Missing, missing number is [' + number + ']', '/utils/fetch.js')
    }
  }
  baseJsonp(url, fn, params, err)
}
