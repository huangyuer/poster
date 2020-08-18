/**
 * 应用初始化工具类
 * @author: Merjiezo
 * @since: 2018-03-27
 */
import Vue from 'vue'
import App from '../App'
import NProgress from 'nprogress' // 页面顶部进度条
// import './ep-ui/package'          // EP UI 组件库
import epui from 'ep-ui'          // EP UI 组件库
import { Tree, Transfer, Upload, Progress, MessageBox, Carousel, CarouselItem,Collapse,CollapseItem, Checkbox, Input, Button, Table, TableColumn, Icon, Form, FormItem,InputNumber} from 'element-ui';
import router from '../router'
import store from '../store'
import { delToken} from 'utils/oauth'
import { post, get,asyncAjax} from 'utils'
import localStorage from 'utils/localStorage'
import cookie from 'utils/cookie'
import ROUTER_JSON from '../router'
import settings from '../settings'
import axios from 'axios'
import Bus from './share/simpleBus'
import { delSprit } from './share/utils'
import locCodemapSelect from '../components/locCodemapSelect'
import {setOrgInfo,setEnterpriseInfo} from "utils/oauth"
import './authorized'  // Init VueRouter
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import WholeOptStatus from "../components/WholeOptStatus"
import CustomPager from "../template/customPager"
Vue.use(epui)
Vue.use(Tree)
Vue.use(Transfer)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Checkbox)
Vue.use(Input)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Icon)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(InputNumber)

Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.prototype.$alert = MessageBox.confirm; // 防止与ep-ui冲突
Vue.component('locCodemapSelect', locCodemapSelect)
Vue.component('WholeOptStatus', WholeOptStatus)
Vue.component('CustomPager', CustomPager)

// wms 样式 特有的按钮
import WmsButton from "../wms/button"
Vue.component('WmsButton', WmsButton)
// wms 样式 特有的图标操作
import WmsIcon from "../wms/icon"
Vue.component('WmsIcon', WmsIcon)
//wms 样式 特有的title操作
import WmsTitle from "../wms/title"
Vue.component('WmsTitle', WmsTitle)
const initToken = (function () {
  'use strict'

  const TOKEN_STRICT = settings.tokenStrict || false
  const TOKEN_NAME = settings.tokenName || 'eptoken'
  // make it private
  function getRt (url, index) {
    let fateRt     = url.slice(index),
        equalIndex = fateRt.indexOf('=')
    fateRt = fateRt.slice(equalIndex + 1)
    let $index = fateRt.indexOf('&')
    return $index === -1
      ? fateRt
      : fateRt.slice(0, $index)
  }
  function getLocalRt () {
    return TOKEN_STRICT
      ? cookie.getCookie(TOKEN_NAME)
      : localStorage.getLocalStorage(TOKEN_NAME)
  }

  return _ => {
    let token = ''
    let url = window.location.href, index = url.indexOf('refresh_token=')
    token = index !== -1
      ? getRt(url, index)
      : getLocalRt()
    store.dispatch('setToken', token)
  }
})()


/****
*页面刷新调
*从localStorage获取数据
*
***/
function initParams(){
  // 关区
  let orgorgcode = localStorage.getLocalStorage('setOrgorgCode')
	store.dispatch('setOrgorgCode', orgorgcode)
	let customs = localStorage.getLocalStorage('setCustomList')
	store.dispatch('setCustomList', customs)
  // 国家
  let country = localStorage.getLocalStorage("setCountryList")
  store.dispatch('setCountryList', country)
  // 商品编制代码
  let complex = localStorage.getLocalStorage("setComplexList")
  store.dispatch("setComplexList",complex)
  // 币值表
  let curr = localStorage.getLocalStorage("setCurrList")
  store.dispatch("setCurrList",curr)
  // 汇率表
  let exchangeRate = localStorage.getLocalStorage("setExchangeRateList")
  store.dispatch("setExchangeRateList",exchangeRate)
  // 贸易方式表
  let tradeMode = localStorage.getLocalStorage("setTradeModeList")
  store.dispatch("setTradeModeList",tradeMode)
  // 运输方式
  let transf = localStorage.getLocalStorage("setTransfList")
  store.dispatch("setTransfList",transf)
  // 成交方式
  let transac = localStorage.getLocalStorage("setTransacList")
  store.dispatch("setTransacList",transac)
  // 境外目的
  let district = localStorage.getLocalStorage("setDistrictList")
  store.dispatch("setDistrictList",district)
  // 计量单位信息
  let unit = localStorage.getLocalStorage("setUnitList")
  store.dispatch("setUnitList",unit)
  // 用途代码信息
  let useTo = localStorage.getLocalStorage("setUseToList")
  store.dispatch("setUseToList",useTo)
  // 证件免方式代码
  let levymode = localStorage.getLocalStorage("setLevymodeList")
  store.dispatch("setLevymodeList",levymode)
  // 包装种类代码
  let wraptype = localStorage.getLocalStorage("setWraptypeList")
  store.dispatch("setWraptypeList",wraptype)
  //港口代码
  let PortstdList = localStorage.getLocalStorage("setPortstdList")
  store.dispatch("setPortstdList",PortstdList)
  //减免性质
  let LevytypeList = localStorage.getLocalStorage("setLevytypeList")
  store.dispatch("setLevytypeList",LevytypeList)
  //加工种类
  let processTypeList = localStorage.getLocalStorage("setProcessTypeList")
  store.dispatch("setProcessTypeList",processTypeList)
 
}

function initUserInfo(){
   let userInfo = localStorage.getLocalStorage('setUserInfo')
   store.dispatch('setUserInfo', userInfo)
  //  store.dispatch('setAccountBook')
}
function initEnterpriseInfo(){
	let enterpriseInfo =  localStorage.getLocalStorage('setEnterpriseInfo')
  store.dispatch('setEnterpriseInfo',enterpriseInfo)
}
function initOrgInfo (){
	let orgInfo =  localStorage.getLocalStorage('setOrgInfo')
  store.dispatch('setOrgInfo',orgInfo)
  let orgId = localStorage.getLocalStorage('orgId')
  store.dispatch('setOrgId', orgId)
}
function isNowVersion(){
  return new Promise((success,err)=>{
      post("toolKickoutGetVersion",{}).then(res=>{
        success(res)
      })
      .catch(()=>{
        store.dispatch('setOrgId',"")
        delToken()
        err()
      })
  })
}
async function initOrgEnter(){
  let respond = await isNowVersion()
  let version = respond.map.data
  let lastVersion = localStorage.getLocalStorage('setVersion')
  if(lastVersion!=version){
    localStorage.setLocalStorage('setVersion',version,1500)
    asyncAjax('queryOrganization', {
      page: 1,
      size: 10,
      tradeCode: store.state.user.tradeCode,
      orgCode: store.state.user.orgCode==undefined?"":store.state.user.orgCode
    }, json => {
      setOrgInfo(json.map.data.content[0])
    }, error => {})
    asyncAjax('queryEnterprise', {
        page: 1,
        size: 10,
        tradeCode: store.state.user.tradeCode
      }, json => {
        setEnterpriseInfo(json.map.data.content[0])
      }, error => {})
  }
  

}

function mutiPageCollect (routeArr) {
  let mutiPageCache = {}
  if (Array.isArray(routeArr)
    && routeArr.length > 0) {
    routeArr.forEach(item => {
      if (item.meta && item.meta.muti) {
        let key = delSprit(item.path)
        mutiPageCache[key] = item.meta
      }
      let obj = mutiPageCollect(item.children)
      for (let objKey in obj) {
        mutiPageCache[objKey] = obj[objKey]
      }
    })
  }
  return mutiPageCache
}
// 跳转逻辑，虽开，但已弃用，不建议调用
function initVue () {
  Vue.prototype.$err = function (info) {
    Vue.prototype.$pop({ type: 'danger', message: info })
  }
  Vue.prototype.$warn = function (info) {
    Vue.prototype.$pop({ type: 'warning', message: info })
  }
  Vue.prototype.$post = post
  Vue.prototype.$get = get
  Vue.prototype.$http = axios
  Vue.prototype.$app = new Bus()
  //Vue.prototype.$frameRouter = frameRouter
  // MutiPage List Cache
  Vue.prototype.$mutiPageObj = mutiPageCollect(router.options.routes)
}
// 应用初始化方法，按需增减内容
export const initApp = () => {
	initToken ()
	initVue ()
	initUserInfo ()
	initEnterpriseInfo ()
	initOrgInfo ()
  initParams ()
  initOrgEnter()
  new Vue({
    router,
    store,
	axios,
    render: h => h(App)
  }).$mount('#app')
}
