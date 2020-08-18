/**
 * 混杂方法
 */
import { insertDOM, deleteDOM } from 'ep-ui/src/utils/dom'
import { getToken } from './oauth'
import { obj2UrlForm } from './data'
import md5 from 'blueimp-md5'

export function loadWhiteCss () {
  let el = document.createElement('style')
  el.innerHTML = `
    body {
      background: #FFF !important
    }
  `
  let head = document.getElementsByTagName('head')[0]
  head.appendChild(el)
}

// 是否为微信
export function is_weixn() {
  let ua = navigator.userAgent.toLowerCase()
  if(ua.indexOf('micromessenger') > 0) {
      return true
  } else {
      return false  
  }
}

export function getScript (src, obj, callback) {
  if (!global[obj]) {
    const $script = document.createElement('script')
    document.body.appendChild($script)
    $script.src = src
    $script.onload = function () {
      callback()
    }
  } else {
    callback()
  }
}

export function isArray (v) {
  return v instanceof Array
}

/**
 * 接口加密方法
 */
export function calaulatorSign (data) {
  //let today = global.fecha.format(new Date(), 'YYYY-MM-DD')
  return md5(global.MD5_PREFIX + data.data)
}

const domParams = '<input type="hidden" name="{{name}}" value=\'{{value}}\'>'
/**
 * 发送原生form请求
 */
export function sendOriginFormSubmit (api, data, windowOpen) {
  // sendRequest
  let token    = getToken(),
      jsonData = JSON.stringify(data)
  let reqData = {
    data: jsonData,
    eptoken: token,
    epSign: calaulatorSign({ data: jsonData })
  }
  if (windowOpen) {
    let url = `${global.HOST}${api}?${obj2UrlForm(reqData, true)}`
    return url
  }
  if (document.getElementById('send_request')) {
    deleteDOM('#send_request')
  }
  let domStr = '<form id="send_request" action="" target="_blank" method="post">'
  for (let item in reqData) {
    let domIpt = ''
    if (reqData.hasOwnProperty(item)) {
      domIpt = domParams.replaceAll('{{name}}', item)
      domIpt = domIpt.replaceAll('{{value}}', reqData[item])
      domStr += domIpt
    }
  }
  domStr += '</form>'
  insertDOM('#app', domStr)
  let dom = document.getElementById('send_request')
  dom.action = global.HOST + api
  dom.submit()
}
