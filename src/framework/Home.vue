<template>
  <div>
    <!-- 头部 -->
    <header class="shadow-top panel-menu wms-jin2-none"  :class="'panel-' + theme"
      :style="{ paddingLeft: menuLeft }">
      <frame-menu @change-skin="toggleSkin"></frame-menu>
      <div class="panel-tab">
        <ep-tab ref="frameTab"
          :theme="theme" :tabs="menuTab.items" v-model="menuTab.active"
          @change="handleTabChange" @close="handleClose"></ep-tab>
        <div class="tab-func">
          <ep-dropdown @item-click="tabFuncClick" :label="tabLabel" position="right">
            <span class="panel-tab-drop-func" slot="item">
              标签选项
              <i class="ion-arrow-down-b"></i>
            </span>
          </ep-dropdown>
        </div>
      </div>
    </header>
    <!-- 菜单框架 -->
    <left-menu class="wms-jin2-none" @change="handleMenuChange" :changeWidth="$store.getters.getChangeWidth"></left-menu>
    <!-- 业务框架 -->
    <div class="panel-main"
      :style="{ marginLeft: menuLeft }">
      <transition name="fade-opacity" mode="out-in">
        <keep-alive :include="realKeepAliveInclude">
          <router-view></router-view>
        </keep-alive>
      </transition>
      <!-- 版权信息 -->
      <footer class="panel-copyright wms-jin2-none">
        <p>
          Copyright (C) 2001-{{new Date().getFullYear()}} easipass.com. 上海亿通国际股份有限公司&nbsp;版权所有
        </p>
        <div v-if="show" class="footertimes">
          <countdown @start_callback="countDownS_cb(1)"
           @end_callback="countDownE_cb(1)" 
           @propsTimes = propsTimes
           :startTime="startTime"
            :endTime="endTime" 
           :currentTime="currentTime"
             :tipTextEnd="'距离系统关闭还有'"
             :dayTxt="'天'" 
             :hourTxt="'小时'" 
             :minutesTxt="'分钟'" 
             :secondsTxt="'秒'"></countdown>
        </div>
      </footer>
      <!-- <return-top :theme="theme" :dom="scrollDom"></return-top> -->
    </div>
    <change-skin v-model="showRight"></change-skin>
  </div>
</template>

<script>
import frameMenu from "./components/frame-menu"
import epTab from "./components/ep-tab"
import countdown from "./components/countdown"
import leftMenu from "./components/left-menu"
import changeSkin from "./components/change-skin"
import returnTop from "./components/return-top"
import { cloneObj, resetAuth, getPermission } from "utils"
import { delToken } from 'src/utils/oauth'
import tabMixin from 'src/base/mixins/tabMixin'

export default {
  name: 'appMain',

  components: {
    frameMenu, epTab, leftMenu, changeSkin, returnTop,countdown
  },

  mixins: [ tabMixin ],
  created(){
    getPermission ('/', _ => {}) 
  },
  data () {
    return {
      scrollDom: document.querySelector('#app'),
      showRight: false,
      show:false,
      times:null,
      stime:1400000000000,
      etime:2000000000000,
      localTime:1400000000000,
      tabLabel: [
        { key: '1', value: '关闭所有' },
        { key: '2', value: '关闭其他' }
      ]
    }
  },
  

  computed: {
    currentTime(){
        return this.localTime
    },
    startTime(){
        return this.stime
    },
    endTime(){
        return this.etime
    },
    menuLeft () { return this.$store.getters.getChangeWidth === 1 ? '60px' : null },
    theme () { return this.$store.getters.getTheme }
  },

  methods: {
     interval(stime,etime){
          // var stime = Date.parse(new Date(faultDate));
          // var etime = Date.parse(new Date(completeTime));
          var usedTime = etime - stime;  //两个时间戳相差的毫秒数
          // console.log(usedTime)
          // var days=Math.floor(usedTime/(24*3600*1000));
          // var leave1=usedTime%(24*3600*1000);  
          // var hours=Math.floor(leave1/(3600*1000));
          // var leave2=leave1%(3600*1000); 
          // var minutes=Math.floor(leave2/(60*1000));
          // var time = days + "天"+hours+"时"+minutes+"分";
      return usedTime;
    },

     countDownS_cb(x) {

    },
    countDownE_cb(x) {
      delToken()
      this.$router.push("/login");
    }, 
    toggleSkin () { this.showRight = !this.showRight },
    propsTimes(value,time){
        if(value){
          this.$alert(`系统将在${time}分钟后停机更新，请提前做好准备！`, '警告', {
              confirmButtonText: '确定',
              closeOnClickModal: false,
              showCancelButton: false,
              showClose: false,
              type: 'warning'
            })
            .then(() => {
              
            })
            .catch(() => {
              
            })
      }
      
    }
  },

  beforeDestroy () {
    let time = setTimeout(() => {
      clearTimeout(time)
      resetAuth()
    }, 0)
     clearInterval(this.times)
  },
  mounted(){
    this.$post("toolKickoutGetDetail",{}).then(res=>{
          if(res.map.data.content.length>0){
            let startCompu =(res.map.data.content[0].kickoutSystemTimeLong)*1
            let endCompu = (res.map.data.content[0].kickoutTimeLong)*1
            if(this.interval(startCompu,endCompu)<3600000){
              this.show = true
              this.localTime = (res.map.data.content[0].kickoutSystemTimeLong)*1
              this.etime = (res.map.data.content[0].kickoutTimeLong)*1
              this.stime =(res.map.data.content[0].kickoutSystemTimeLong)*1
            }else{
              this.show = false
            }
            
          }else{
            this.show = false
          }
      })
    this.times =  setInterval(()=>{
      this.$post("toolKickoutGetDetail",{}).then(res=>{
          if(res.map.data.content.length>0){
           let startCompu = (res.map.data.content[0].kickoutSystemTimeLong)*1
            let endCompu = (res.map.data.content[0].kickoutTimeLong)*1
            if(this.interval(startCompu,endCompu)<3600000){
              this.show = true
              this.localTime = (res.map.data.content[0].kickoutSystemTimeLong)*1
              this.etime = (res.map.data.content[0].kickoutTimeLong)*1
              this.stime = (res.map.data.content[0].kickoutSystemTimeLong)*1
            }else{
              this.show = false
            }

          }else{
            this.show = false
          }
      })
    },300000)
  },
  changeItems(value){
    console.log(value)
    this.menuTab.items = value
  },
  

}
</script>

<style>
  .menu-shadow-left {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 
      0 3px 7px -2px rgba(0, 0, 0, 0.4), 
      0 1px 5px 0 rgba(0, 0, 0, 0.12)
  }
  .shadow-right {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 1px 5px 0 rgba(0, 0, 0, 0.12)
  }
  .shadow-top {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 
      0 1px 5px 0 rgba(0, 0, 0, 0.12)
  }
  .shadow-bottom {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)
  }
  .panel-tab {
    position: relative;
  }
  .tab-func {
    cursor: pointer;
    position: absolute;
    top: 0px;
    right: 0px;
    height: 40px;
    line-height: 40px;
    width: 80px;
    background: #FFF;
    font-size: 12px;
    text-align: center;
    border-bottom: 1px solid #AAA;
  }
  .panel-tab-drop-func {
    font-size: 12px;
  }
  .footertimes{
    position: fixed;
    right: 20px;
    bottom: 10px;
    /* border: 1px solid ; */
    color: white;
    background-color: #546E7A;
    border-radius: 10px;
    padding: 0 5px;
  }
</style>