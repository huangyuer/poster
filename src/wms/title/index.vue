<template>
  <div class="wms-wms">
    <p class="wms-wrapper_title">
      {{title}}
    </p>
    <p class="wms-wrapper_in_content wms-tgtvol">
      <slot></slot>
    </p>
    <div class="wms-rigth-icon" v-show="isShowRightIcon">
      <ep-badge :value="totalElements" :max="99">
        <!-- <ep-icon  icon="email" theme="dack" @click="newsButton"  ></ep-icon> -->
        <span class="ion-email wms-icon-size" @click="newsButton" title="消息中心"></span>
      </ep-badge>
    </div>
  </div>

</template>

<script>
export default {
  name: 'wms-title',
  props: {
    title: {
      default: '',
      type: String
    }
  },
  data() {
    return {}
  },
  mounted() {
    console.log(window.location)
    this.findDifRoute()
  },
  methods: {
    newsButton() {
      this.$router.push({ name: '消息中心' })
    },
    findDifRoute(){
        let routeArray = ["/PathBillOfladingInfo","/PathBillDirExpBscInfo","/CreditCardReceiptInfo","/WareHouseInfo","/ImportBondedInfo","/BaseGoodInfo","/ImportBondedInfodraw","/GuaranteeSearch","/ToalGuaranteeSearch","/LoadingListInfo"]
        
       let list =  routeArray.filter((item,index)=>{
            return window.location.href.indexOf(item) != -1
        })
        return list
    }
  },
  computed: {
    isShowRightIcon() {
        if(this.findDifRoute().length>0){
            return true
        }else{
            return false
        }
    },
    totalElements() {
      return this.$store.state.user.count
    }
  }
}
</script>

<style lang="less" scoped>
.wms {
  &-wms {
    position: relative;
  }
  &-rigth-icon {
    position: absolute;
    right: 30px;
    top: 2px;
  }
  &-icon-size {
    font-size: 24px;
    cursor: pointer;
  }
  &-icon-size:hover {
    color: rgb(46, 167, 224);
  }
  &-wrapper_title {
    padding-left: 20px;
    font-size: 14px;
    margin: 0;
    margin-bottom: 15px;
    color: #666;
  }
  &-wrapper_in_content {
    padding-left: 30px;
    font-size: 14px;
    margin: 0;
    margin-bottom: 15px;
    color: #666;
  }
  &-tgtvol {
    padding-right: calc(100% - 1200px);
    position: relative;
  }
}
</style>