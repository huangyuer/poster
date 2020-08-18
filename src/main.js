/**
 * 主框架从此开始
 * @author: Merjiezo
 * @since: 2017-05-20
 */
import "babel-polyfill"
import "ionicons-npm/css/ionicons.css"  // 图标CSS资源
import "ep-ui/theme/lib/epui.min.css"   // ep-ui样式
import $ from 'jquery'    //引入jquery
// import "ep-ui/theme/lib/epui-black.min.css"   // ep-ui 黑色样式 如果报错 npm update ep-ui
// import "./assets/css/epui-black.min.css"   // ep-ui 黑色样式 （还没发布 临时）
import './common/config'                // 全局配置
import 'src/base/string'                // String操作方法
import settings from 'src/settings'
import localStorage from 'utils/localStorage'
/***
 * 应用初始化
 * 初始化路由、状态基、权限系统等
 */
import { initApp } from './base/init'


function  getQueryString(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const urlObj = window.location;
    console.log()
    // if(urlObj.hash.split("?"))
    if(urlObj.hash.split("?").length>1){
        var r = urlObj.href.indexOf('#') > -1 ? urlObj.hash.split("?")[1].match(reg) : urlObj.search.substr(1).match(reg);
        
        if (r != null) return unescape(r[2]); return null;
    }else{
        return null
    }
   
}

export function loginHome(){
    let jumpUrl = getQueryString("jumpUrl")||localStorage.getLocalStorage('setUserInfo').jumpUrl
    console.log(jumpUrl)
    if(jumpUrl!=undefined){
        return {path:`${jumpUrl}`,name:"首页"}
    }
    else{
        return {path:`home`,name:"首页"}
    }
   
        // if(jumpUrl="PathBillOfladingInfo"){          
        //     return {path:"PathBillOfladingInfo",name:"进境径予放行货物自主声明查询"}
        // }
        // if(jumpUrl=="PathBillDirExpBscInfo"){
        //     return {path:"PathBillDirExpBscInfo",name:"出境径予放行货物自主声明查询"}
        // }
        // if(jumpUrl=="WareHouseInfo"){
        //     return {path:"WareHouseInfo",name:"进出区提发货凭证查询"}
        // }
        // if(jumpUrl=="CreditCardReceiptInfo"){
        //     return {path:"CreditCardReceiptInfo",name:"卡口验放凭证查询"}
        // }
        // if(jumpUrl=="ImportBondedInfo"){
        //     return {path:"ImportBondedInfo",name:"进出境货物汇总查询"}
        // }
   
}
settings.homeRoute = loginHome()


initApp()
