<template>
  <div class="main-col panel-error">
    <div class="panel-401-word">
      <h1 class="panel-error-h1" :class="'panel-' + theme + '-text'">Oops! - 403</h1>
      <p class="panel-error-copyright">版权所有：
        <a href="http://www.easipass.com/cn/index.html" :class="'panel-' + theme + '-text'" target="_blank">上海电子口岸 上海亿通国际股份有限公司</a>
      </p>
      <p :class="'panel-' + theme + '-text'">您没有相关权限</p>
      <!-- <p class="panel-error-more">未开通相应权限，如需开通，请联系亿通航运支付业务人员开设！联系电话：
        <font color="#2196F3">400-821-2199</font> # 4 {{ $store.getters.getNoPermissionPage }}业务
      </p> -->
      <p class="panel-error-more">我也不想这样，但连这个页面都让你看到的话我就失业了</p>
      <router-link class="panel-error-back" style="display:inline-block" :class="'panel-' + theme" to="/">首页</router-link>
     
      <span class="panel-error-back" style="display:inline-block" :class="'panel-' + theme" @click="handleLogout">退出</span>
    </div>
    <div class="panel-401-pic">
      <img :src="imgs[theme]" alt="error" width="40%">
    </div>
  </div>
</template>

<script>
import dark from 'assets/frame/robot-dark.png'
import blue from 'assets/frame/robot-blue.png'
import darkBlue from  'assets/frame/robot-dark-blue.png'
import green from  'assets/frame/robot-green.png'
import pupple from  'assets/frame/robot-pupple.png'
import orange from  'assets/frame/robot-orange.png'
import localStorage from 'utils/localStorage'
import store from '../store'
export default {
  name: 'no-permission',

  computed: {
    theme () {
      return this.$store.getters.getTheme
    }
  },
  methods:{
    handleLogout() {
      this.$post("sysLogout")
        .then(res => {
          localStorage.delLocalStorage("eptoken");
          this.$store.state.user.token = "";
          // this.$store.state.app.menuTabs.splice(1, this.$store.state.app.menuTabs.length - 1)
          this.$router.push("/login");
        })
        .catch(() => {
          localStorage.delLocalStorage("eptoken");
          this.$store.state.user.token = "";
          this.$router.push({ name: "登录" });
        });
    }
  },

  data () {
    return {
      imgs: {
        dark: dark,
        blue: blue,
        'dark-blue': darkBlue,
        green: green,
        pupple: pupple,
        orange: orange
      }
    }
  }
}
</script>

<style>
  .panel-401-pic, .panel-401-word {
    box-sizing: border-box;
    float: left;
  }
  .panel-401-word {
    padding-left: 15%;
    width: 50%;
    min-width: 380px;
  }
  .panel-401-pic {
    width: 50%;
    min-width: 380px;
  }
  .panel-401-pic > img {
    display: block;
    margin: auto
  }
</style>