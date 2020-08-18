/**
 * 权限控制
 * 采用低耦合Vuex分发策略
 * 而非高耦合整和Vuex的策略
 * @author: Merjiezo
 * @since: 2017-05-26
 */
import Vue from 'vue'

import localStorage from 'utils/localStorage'
import {
  post,
  asyncAjax
} from './fetch'
import {getMenuAndUserInfo} from '../base/menuAuth'
import {queryParams} from "utils/api/params.js"
import settings from '../settings'
import cookie from './cookie'
import store from '../store'
import router from '../router'

const OUT_DATE = 15
const TOKEN_STRICT = settings.tokenStrict || false
const TOKEN_NAME = settings.tokenName || 'eptoken'

/*cookie过期时间——5天*/
const cookieOutDate = 5
/**白名单存储在此 */
let menus = null

/** 白名单列表，适合权限系统和菜单配置对应的系统 */
function menuToArr(menus) {
  let res = [];

  menus.forEach((item) => {
    if (item.router) {
      res.push(item.router)
    }
    if (item.children !== undefined &&
      item.children.length > 0) {
      let children = item.children
      children.forEach((item) => {
        if (item.router) {
          res.push(item.router)
        }
      })
    }
  })
  return res
}

// 清空路由，用户信息、无权限页面缓存
function dispatchStore(router, userInfo) {
  store.dispatch('setRouterJson', router)
  store.dispatch('setUserInfo', userInfo)
  store.dispatch('setNoPermissionPage', '')
  store.commit("SETLAGENTLIST", [])
}


/** 获取菜单和用户信息 **/
function getUserInfo(fn) {
  getMenuAndUserInfo((router, userInfo) => {
    let routers;
    routers = router.filter(item => {
      return item.children.length > 0;
    })
    let realMenu = menuToArr(routers)
    menus = realMenu
    dispatchStore(routers, userInfo)
    fn()
  })
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

export async function Tokenlogin(vm, token,fn,nowType) {
  let Allloading  =   vm.$loading({
    lock: true,
    text: '正在登录,请稍后……',
    target: document.querySelector('.theme-dark')
  });
  post('userLoginByToken', {token:token})
    .then(async json => {
      let respond = await isNowVersion()
      let version = respond.map.data
      let lastVersion = localStorage.getLocalStorage('setVersion')
      if(lastVersion!=version){
        Allloading.close()
        localStorage.setLocalStorage('setVersion', version, 1500)
        Vue.prototype.$alert('系统版本有更新，点击确认加载最新版本！', {
          confirmButtonText: '确定',
          closeOnClickModal: false,
          showCancelButton: false,
          showClose: false,
          type: 'warning'
        })
        .then(() => {
          store.dispatch('setOrgId',"")
          delToken()
          location.reload();
        })
        .catch(() => {
          store.dispatch('setOrgId',"")
          delToken()
          location.reload();
        });
      }else{
      
      if(json.map.user.customId!=2249){
          Vue.prototype.$pop({
            type: 'danger',
            message: '当前账号无查看权限，请检查关区信息！'
          })
          Allloading.close()
          router.push('402')
          return
      }else{
          setToken(json.map.token)
          // 设置用户
          setUserInfo(json.map.user,json.map.orgId,nowType)
          setOrgorgCode(json.map.OrgorgCode)
          //查询组织信息
          if(json.map.user.type=="2"){
            let orgType = ""
            let orgTypeList = ""
            asyncAjax('queryOrganization', {
              page: 1,
              size: 10,
              tradeCode: json.map.user.tradeCode,
              orgCode: json.map.user.orgCode==undefined?"":json.map.user.orgCode
            }, json => {
            console.log(json.map.data.content[0])
              setOrgInfo(json.map.data.content[0])
              orgTypeList = json.map.data.content
              orgType =  json.map.data.content[0].type
            }, error => {})
              if(orgType==10||orgType==12){
                Vue.prototype.$pop({
                  type: 'danger',
                  message: '当前账号组织类型异常，无法登陆！'
                })
                store.dispatch('setOrgId',"")
                delToken()
                Allloading.close()
                return;
              }
              if(orgTypeList.length==0){
                Vue.prototype.$pop({
                  type: 'danger',
                  message: '当前组织未审核通过，无法登陆！'
                })
                store.dispatch('setOrgId',"")
                delToken()
                Allloading.close()
                return;
              }
              //查询企业信息
              let Enterprisedata = ""
              asyncAjax('queryEnterprise', {
                page: 1,
                size: 10,
                tradeCode: json.map.user.tradeCode
              }, json => {
                Enterprisedata = json.map.data.content
                setEnterpriseInfo(json.map.data.content[0])
                // console.log(json.map.data)
              }, error => {})
              if(Enterprisedata.length>0){
                //查询查询列表
                queryParams()
                Allloading.close()
                router.push('/home')
              
                
                fn()
              }else{
                Vue.prototype.$pop({
                  type: 'danger',
                  message: '当前企业未审核通过，无法登陆！'
                })
                  store.dispatch('setOrgId',"")
                  Allloading.close()
                  delToken()
                  return;
              }
          }else if(json.map.user.type=="1"){
            Allloading.close()
            queryParams()
            router.push('/home')
           
            fn()
          }
      }
     
      
    }

      
    }).catch(e => {
      Allloading.close()
   
      router.push('402')
    //   fn()
    })
}

export function setOrgInfo(data) {
  const orgInfo = {
    id: data.id,
    tradeId: data.tradeId,
    inNo: data.inNo,
    bookNo: data.bookNo,
    orgType: data.type,
    customId: data.customId,
    bwsNo: data.bwsNo,
    organizationCode: data.organizationCode,
    organizationName: data.organizationName,
    creditCode: data.creditCode
  }
  localStorage.setLocalStorage('setOrgInfo', orgInfo, 15)
  store.dispatch('setOrgInfo', orgInfo)
  localStorage.setLocalStorage('orgId', data.id, 15)
  store.dispatch('setOrgId', data.id)

   localStorage.setLocalStorage('setOrgInfoOri', orgInfo, 15)
  localStorage.setLocalStorage('orgIdOri', data.id, 15)
  
}

export function setEnterpriseInfo(data) {
  const enterpriseInfo = {
    tradeName: data.tradeName,
    creditCode: data.creditCode,
    id: data.id,
    tradeCode:data.tradeCode
  }
  localStorage.setLocalStorage('setEnterpriseInfo', enterpriseInfo, 15)
  store.dispatch('setEnterpriseInfo', enterpriseInfo)

  localStorage.setLocalStorage('setEnterpriseInfoOri', enterpriseInfo, 15)
}

/**登录成功之后将企业名称和用户名称放到Store**/
 function setUserInfo(data,orgId,nowType) {
  console.log(orgId)
  const userInfo = {
    userId: data.id,
    orgId: orgId,
    orgName: '',
    orgCode: data.orgCode,
    loginId: '',
    userName: data.userName,
    nickName: data.nickName,
    tradeCode: data.tradeCode,
    creditCode: data.creditCode,
    customId: data.customId,
    type: data.type,
    token: '',
    loginSource: 2,
    jumpUrl:nowType
  }
  localStorage.setLocalStorage('setUserInfo', userInfo, 15)
  store.dispatch('setUserInfo', userInfo)
  
  localStorage.setLocalStorage('setUserInfoOri', userInfo, 15)



}

function setOrgorgCode(data) {
  const orgorgcode = {
    OrgorgCode: data
  }
  localStorage.setLocalStorage('setOrgorgCode', orgorgcode, 15)
  store.dispatch('setOrgorgCode', orgorgcode)
}

/***重置密码**/
export function resetPass(key, data) {
  http(key, data)
}

/** 登出 **/
export function logout() {
  router.push('login')
}

export function resetAuth() {
  menus = null
  dispatchStore([], {
    orgName: '',
    orgCode: '',
    userLoginId: '',
    username: '',
    userTele: '',
    draccNo: '',
    roles: ''
  })
}

/***
 * 获取用户权限(Lazy Load)
 * @route    路由路径
 * @callback 回调函数
 */
export function getPermission(route, callback) {
  function handleCallback() {
    menus.indexOf(route) === -1 ?
      callback.call(this, false) :
      callback.call(this, true)
  }
  // if (route.startWith('/')) {
  //   route = route.substring(1)
  // }
  null === menus ?
    getUserInfo(json => {
      handleCallback()
    }) :
    handleCallback()
}

/**
 * 获取用户Token
 */
export function getToken() {
  return store.getters.getToken
}


/**
 *获取用户orgId
 *
 */
export function getId() {

  return store.getters.getId
}

export function setToken (token) {
  TOKEN_STRICT
    ? cookie.setProcessCookie(TOKEN_NAME, token)
    : localStorage.setLocalStorage(TOKEN_NAME, token, OUT_DATE)
  store.dispatch('setToken', token)
}

/**
 * 获取用户Token
 */
export function delToken () {
  TOKEN_STRICT
  ? cookie.delCookie(TOKEN_NAME)
  : localStorage.delLocalStorage(TOKEN_NAME)
  resetAuth()
  store.dispatch('setToken', '')
}

