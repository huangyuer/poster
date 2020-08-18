<template>
    <div style="position:relative;">
               
               <ep-input placeholder="关区" v-model="masterCuscdName" name="masterCuscd" @change="changeInput" :maxlength="30" @focus="selectIsShow" @blur="selectLeave" ></ep-input>
               <div v-show="isShow" style="height:240px;width:157.66px;position:absolute;overflow:scroll;overflow-x:hidden;background-color:white;z-index:100 ;border:1px solid rgba(33,33,33,.22)">
                    <ul style="width:100%;height:100%;z-index:100;margin-top:5px;">
                      <li style="height:34px;width:100%"  @click="everyClick(item.customName+' '+item.customCode,item.customCode)"   class="every-style" v-for="(item, index) in tradeInfo" :key="index"  >{{item.customName+' '+item.customCode}}</li>
                    </ul>
               </div>
            </div>
</template>
<script>
    export default {
        data(){
            return {
                masterCuscdName:"",
                isShow:false,
                tradeInfo:this.$store.getters.getCustomList
            }
        },
        props:[],
        methods:{
            changeInput(){
                let newArray = []
                let name =  this.masterCuscdName
                var cus = this.$store.getters.getCustomList
                    for(var i = 0;i<cus.length;i++){
                    if(cus[i].customName.indexOf(name)!=-1){
                        newArray.push(cus[i])
                    }else if(cus[i].customCode.indexOf(name)!=-1){
                        newArray.push(cus[i])
                    }

                    }

                this.tradeInfo = newArray
                },
            selectIsShow(){
                this.isShow = true
                let customList = this.$store.getters.getCustomList
                this.tradeInfo = customList
                
                },
            selectLeave(){
                setTimeout(()=>{
                    this.isShow = false;
                },500)
                
                },
            everyClick(e,d){
                this.isShow= false;
                this.masterCuscdName = e
                this.bodyForm.masterCuscd=d
                
                },
        }

    }
</script>

<style scoped>
    
.every-style{
  line-height:34px;
}
.every-style:hover{
  
  background-color:rgba(33,33,33,.07);
}
</style>