<template>
    <div>
    <div class="out-box">
         <transition name="fade" mode="out-in" v-for="(i,f) in picture" :key="f">
        <img  :src="i" v-show="f==showNumber" >
        </transition>
        <div class="out-icon">
            <div v-for="i in 5" class="icon" :class="{active:(i-1)==showNumber}" :key="i" @mouseover="mouseOver(i)"  @click="btnIcon(i)">
            </div>
        </div>
    </div>
    </div>
 
</template>
<script>
export default {
  data () {
    return {
    timer:"",
    showNumber:0,
    picture:[require("../assets/frame/bn1.jpg"),require("../assets/frame/bn2.jpg"),require("../assets/frame/bn3.jpg"),require("../assets/frame/bn4.jpg"),require("../assets/frame/bn5.jpg")]
    }
  },
  mounted() {
       this.times()
        
  },
  methods:{
      times(){
          this.timer = setInterval(this.changeImg,3500)
      },
      changeImg(){
            this.showNumber=this.showNumber+1
            if(this.showNumber==5){
              
                    this.showNumber=0
            }
      },
      btnIcon(i){
          clearTimeout(this.timer)
          this.showNumber = i-1
          this.times()
      },
      mouseOver(i){
          clearTimeout(this.timer)
          this.showNumber = i-1
          this.times()
      }

  }
}
</script>
<style scoped>
    .out-box{
        /* padding:20px 20px; */
        box-sizing:border-box;
        width: 100%;

         /* width:750px; */
        height:400px; 
        position:relative;
        /* margin:0 auto; */
    }
    .out-box img {
        border-radius:5px;
        width:100%;
        height:100%;
        /* height:400px; */
        position:absolute;
        
    }
.fade-enter-active,.fade-leave-active{
    transition: all 3.5s;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
  .icon{
      
      border-radius:50%;
      width:20px;
      background-color:#fff;
      cursor:pointer;
  }
  .out-icon{
      width:150px;
      height:20px;
      display:flex;
      justify-content: space-around;
      position:absolute;
      bottom:20px;
      left:50%;
  }
  .active{
      background-color:#3064bb;
  }

  
  

</style>
