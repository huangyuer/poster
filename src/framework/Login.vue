<template>
    <div class="login-wrap wms-jin2-none" >
        <div class="ms-login">
            <div class="ms-title">企业服务管理系统</div>
            <div class="input_sec">
                                <input v-model="userName" @keyup.enter="handleLogin" autocomplete="off" class="input-style" placeholder="用户名">   
                            </div>
                            <div class="input_sec">
                                <input v-model="password" @keyup.enter="handleLogin" autocomplete="off" type="password" class="input-style" placeholder="密码">
                            </div>
                           
                            <div class="btn_set">
                                <button @click="handleLogin">
                                    登录
                                </button>
                            </div>
            
        </div>
    </div>
</template>

<script>
import { login } from 'utils/oauth'
import {Tokenlogin} from "utils/tokenLogin"
import misList from 'src/common/mislist'
import router from '../router'
import store from 'src/store'
import cookie from 'utils/cookie'
export default {


extends: misList,
  data () {
    return {
        userName: '',
        password: '',
        isshow:false,
        data:{

        }
    }
  },
  computed:{

  },
  mounted() {
        store.dispatch('setOrgId',"")
        store.dispatch('setDark',"1")
        cookie.setCookie('dark', '1')
        store.dispatch("setUserInfo",{loginSource:1})
  },
  methods: {
      getQueryString(name) {
            const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            const urlObj = window.location;
            var r = urlObj.href.indexOf('#') > -1 ? urlObj.hash.split("?")[1].match(reg) : urlObj.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
      },
    // goTopsw(){
       
    //   this.$router.push({name:'找回密码'})
     
    // },
    handleLogin (userName,password){
        var data
        if(window.location.hash !="#/login"){
              data = {"userName":userName,"password":password}
        }else{
              data = {"userName":this.userName,"password":this.password}
                if(this.userName==""){
                    this.$pop({
                        type: "danger",
                        message: "用户名不能为空！"
                        });
                        return;
                }
                if(this.password==""){
                    this.$pop({
                        type: "danger",
                        message: "密码不能为空！"
                        });

                        return;
                    
                
                }
        }
       
        this.data = data
          login(this, () => {
            
          })
        
      }
    }
  }


</script>
<style scoped>
 .btn_set {
        margin: 28px 0;
        width: 100%;
        height: 38px;
       
    }

    .btn_set button {
        width: 96%;
        height: 38px;
        background-color: #30414b;
        color: white;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0);
        cursor: pointer;
    }
.login-wrap {
    position: relative;
    background-position: center;
    width: 100%;
    height: 100%;
    background-size:cover;
    
    background-image: url(../assets/img/login-bg.jpg);

}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: black;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
 .input_sec {
        width: 100%;
        margin-bottom: 30px;
        position: relative;
    }
        .text_set {
        color: #6e6f70;
        font-size: 18px;
        text-align: center;
        }
        .form_set {
        width: 370px;
        height: 350px;
        margin: 0 auto;
        padding: 15px 0 0;
          }
        .out-box{
            width: 436px;
            height: 320px;
            margin: 0 auto;
            background-color: #fff;
            background-size: 100% 100%;
        }
        .top-input{
            width: 287px;
            height:27px;
            margin-top: 98px;
            margin-left: 75px;
            background-image: url("../assets/img/login_icon_a.png");
        }
        .bottom-input{
            width: 287px;
            height:27px;
            margin-top: 32px;
            margin-left: 75px;
            background-image:url("../assets/img/login_icon_b.png");
            
        }
        .input-style{

            width: 317px;
            height: 38px;
            padding: 0 15px;
            background-color: #e2ebef;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            font-size: 16px;
        }
        .title{
            width: 100%;
            color:#546E7A;
        }
        .logo-img{
            display:inline-block;
            width: 318px;
            height: 58px;
            margin-left: 100px;
            background-image: url("../assets/img/logo.png");
        }
        .btn-login{
            width: 110px;
            height: 30px;
            background-image: url("../assets/img/login_icon_c.png");
            background-size: 100% 100%;
            margin-left: 158px;
            margin-top: 27px;
            position: relative;
            cursor:pointer;
            
        }
        .btn-login .forget-pass {
            font-size:12px; 
            color:#2e82ff;
            position: absolute;
            top:6px;
            right:-60px; 
            margin-top:3px;cursor:pointer;
        }
        input:-webkit-autofill {    
        -webkit-box-shadow: 0 0 0px 1000px white inset !important; 
        }
        .header-word-left{
            display:inline-block;
            width:230px;
            position: absolute;
            top: 0px;
            margin-left: 10px;
            font-size:35px;
        }
        .header-word-right{
            position: absolute;
            left: 250px;
            top: 25px;
            width: 400px;
            font-size: 25px;
        }
</style>