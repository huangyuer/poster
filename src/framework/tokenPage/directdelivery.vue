<template>
     <div class="big-box" v-if="isshow">
       
              
   

 </div>

 
</template>
<script>
import { login, } from 'utils/oauth'
import {Tokenlogin} from "utils/tokenLogin"
import misList from 'src/common/mislist'
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
  mounted() {
        store.dispatch('setDark',"1")
        cookie.setCookie('dark', '1')
        store.dispatch('setOrgId',"")
        if(window.location.hash !="#/directdelivery"){
          
            let token = this.getQueryString("token")
            let jumpUrl = this.getQueryString("jumpUrl")
            store.dispatch('setJumpUrl',jumpUrl)
            if(token){
                Tokenlogin(this,token,()=>{
                     this.$router.push({path:`${jumpUrl}`})
                //   if(store.state.user.jumpUrl=="PathBillOfladingInfo"){
                     
                //         this.$router.push({path:"/PathBillOfladingInfo"})
                      
                //     }
                //     if(store.state.user.jumpUrl=="PathBillDirExpBscInfo"){
                     
                //         this.$router.push({path:"/PathBillDirExpBscInfo"})
                      
                //     }
                //     if(store.state.user.jumpUrl=="WareHouseInfo"){
                      
                //         this.$router.push({path:"/WareHouseInfo"})
                     
                //     }
                //     if(store.state.user.jumpUrl=="CreditCardReceiptInfo"){
                     
                //         this.$router.push({path:"/CreditCardReceiptInfo"})
                      
                //     }
                //     if(store.state.user.jumpUrl=="ImportBondedInfo"){
                    
                //         this.$router.push({path:"/ImportBondedInfo"})
                     
                //     }
                },jumpUrl)
            }
           
        }else{
            this.isshow = true
        }
       
        
  },
  methods: {
      getQueryString(name) {
            const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            const urlObj = window.location;
            var r = urlObj.href.indexOf('#') > -1 ? urlObj.hash.split("?")[1].match(reg) : urlObj.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
      },
    
    
    }
  }


</script>
<style   scoped>
   
        

</style>
