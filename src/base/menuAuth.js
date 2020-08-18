import Vue from 'vue'
import { warn } from './base'
import { post } from 'utils'
import settings from '../settings'
import routerMenu from '../menus'
import store from "../store"
import localStorage from 'utils/localStorage'

const Strategy = {

  static (fn) {
    let userInfo = localStorage.getLocalStorage('setUserInfo')
    console.info(routerMenu.static);
    fn(routerMenu.static || [], userInfo)
  },

 // role (fn) {
   /* post('getUserInfo').then (json => {
      let { data } = json
      let roles = data.userInfo.roles
      if (!roles) { warn('roles not in return api!', '/base/menuAuth.js') }
      let jsonRole = ''
      jsonRole = Array.isArray(roles) ? jsonRole = roles.join('|') : roles
      let router = routerMenu[jsonRole] || []
      fn(router, data.userInfo)
    }).catch (e => {
      Vue.prototype.$pop({ type: 'danger', message: '用户信息获取失败，请稍后刷新再试！' })
    })*/
  //},

  api (fn) {
    console.log(store)
    let userInfo = localStorage.getLocalStorage('setUserInfo')
    console.log(userInfo)
      post('getMenu',{"userId":userInfo.userId}).then (json => {
        let bestArray = []
        let array = json.map.data
        array.forEach((e,index)=>{
          e.children.forEach((value,indexe)=>{
              if(value.router=="/emsImport"){
                bestArray.push({key:value.router})
              }
          })
        })
        store.dispatch("setBestPower",bestArray)
        fn(json.map.data, userInfo)
      }).catch (e => {
        console.error(e)
        Vue.prototype.$pop({ type: 'danger', message: "请登录" })
      })


   /* post('getUserInfo').then (json => {
      let { data } = json
      fn(data.sysMenu, data.userInfo)
    }).catch (e => {
      console.error(e)
      Vue.prototype.$pop({ type: 'danger', message: '用户信息获取失败，请稍后刷新再试！' })
    })*/
  }

}

const MENU_STRATEGY = settings.menuStrategy || 'api'
if (process.env.NODE_ENV !== 'production') {
  if ('static|role|api'.indexOf(MENU_STRATEGY) === -1) {
    warn(MENU_STRATEGY + ' menuStrategy not in the list, place check!', '/base/menuAuth.js')
  }
}

export const getMenuAndUserInfo = Strategy[MENU_STRATEGY]
