<template>
  
      <div class="out-button" @click="handClick"  :class="[{'isloading':loading}]">
           <svg class="ep-button-loading" v-if="loading" width="15px" height="15px" viewBox="0 0 66 66">
                <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30" style="stroke:#FFF"></circle>
            </svg>
          <slot></slot>
      </div>
   
    
 
</template>

<script>
export default {
    props:{
        loading:{
            type:Boolean,
            default:false
        }
    },
    name:"wms-button",
    data(){
        return{

        }
    },
    computed:{

    },
    watch:{
       
    },
    methods:{
        handClick(){
            this.$emit('click')
        }
    }
}
</script>

<style lang="less" scoped>
.out-button-out{
    display: inline-block;
    position: relative;
}
.out-button{
    display: inline-block;
    background: #2EA7E0;
    width: 150px;
    margin: 0 20px;
    line-height: 1.42857143;
    white-space: nowrap;
    border: 0;
    text-align: center;
    line-height: 1.42857143;
    font-size: 14px;
    color: #fff;
    padding: 5px 0;
    border-radius: 3px;
    cursor: pointer;
}

.out-button:hover{
    background-color: rgb(40, 96, 144);
}
.isloading{
    pointer-events: none;
}

</style>