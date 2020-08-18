<template>
  <div id="app" :class="[`theme-${themeName}`,{'pain-max-s':anotherStyle==2}]">
    <transition name="fade-opacity" mode="out-in">
      <router-view></router-view>
    </transition>
    <!-- iframe 嵌入策略 -->
    <layout-iframe ></layout-iframe>
  </div>
</template>


<script>
  import throttle from 'throttle-debounce/throttle'
  import layoutIframe from './framework/layout-iframe'
  import { on, off } from 'utils'
  import Storage from 'utils/localStorage'
	export default {

    name: 'app',
    
    components: { layoutIframe },
    data() {
      return {
        timer: null,
        version:null
      }
    },

    created () {
      document.title = global.TITLE + this.$route.name
    },
    methods:{
      isNowVersion(){
        return new Promise((success,err)=>{
            this.$post("toolKickoutGetVersion",{}).then(res=>{
              success(res)
            })
            .catch(()=>{
             
              err()
            })
        })
      },
      async NowVersion(){
          let respond = await this.isNowVersion()
          console.log(respond)
          let version = respond.map.data
          let lastVersion = Storage.getLocalStorage('setVersion')
          if(lastVersion!=version){
            this.$alert('系统版本有更新，点击确认加载最新版本！', {
              confirmButtonText: '确定',
              closeOnClickModal: false,
              showCancelButton: false,
              showClose: false,
              type: 'warning'
            })
            .then(() => {
              location.reload();
            })
            .catch(() => {
              location.reload();
            });
          }
      }
    },
    mounted () {
      this.changeSize = throttle(300, (evt) => {
        const width = this.$store.getters.getChangeWidth
        if (evt.currentTarget.innerWidth <= 1200 && width === 0) {
          this.$store.dispatch('setChangeWidth', 1)
        }
        if (evt.currentTarget.innerWidth > 1200 && width === 1) {
          this.$store.dispatch('setChangeWidth', 0)
        }
      })
      on (window, 'resize', this.changeSize)
      this.version = setInterval(()=>{
          this.NowVersion()
      },180*1000)
      
      // this.timer = setInterval(() => {
      //   let nowTime = new Date();
      //   let curTime = localStorage.getItem('curTime');
      //   if (!curTime || this.$route.path == '/login') return;
      //   let diffTime = new Date(nowTime - new Date(curTime)).getMinutes();
        
      //   if (diffTime == 25) {
      //     this.$alert('由于长时间未操作，系统将在5分钟后退出，是否重新授权!', '提示', {
      //       confirmButtonText: '确定',
      //       closeOnClickModal: false,
      //       showCancelButton: false,
      //       showClose: false,
      //       type: 'warning'
      //     })
      //     .then(() => {
      //       this.$post('queryOrganization', {orgCode:this.$store.getters.getOrgCode,page:1,size:1,tradeCode:this.$store.getters.getTradeCode})
      //         .then(() => {
      //           this.$pop({
      //             type: 'success',
      //             message: '授权成功!'
      //           });
      //         })
      //     })
      //     .catch(() => {
      //       this.$pop({
      //         type: 'info',
      //         message: '授权失败!'
      //       });  
      //     });
          
      //   }
      //   if (diffTime >= 30) {
      //     location.reload();
      //   }
      // }, 60*1000)


    },
    computed: {
    anotherStyle(){
        return this.$store.getters.getLoginSource
    },
      themeName () {
        return this.$store.getters.getTheme
      }
    },
		watch: {
      '$route' (to, from) {
        //监听路由改变
        document.title = global.TITLE + to.name
      }
    },

    destroyed () {
      off (window, 'resize', this.changeSize)
      // clearInterval(this.timer)
    }
	}
</script>

<style lang="less">
  @import "./assets/css/main.css";
  @import "./assets/css/panel.less";
  // @import "./assets/css/theme-black-class.less";
//   样式改造  英德
  @import "./assets/css/wms.less";
  .pull-left {
  float: left
  }
  .pull-right {
    float:right
  }

 .pain-max-s{
      background: #fff !important;
    .contents-card{
        box-shadow: none;
    }
    .panel-main {
        margin: 0;
        background-color: #fff;
    }
    .panel-main-content {
        max-width:none;
    }
    .wms-jin2-none{
        display: none;
    }
 }
 

</style>