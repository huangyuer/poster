<template>
  <div class="muti-file">
    <component v-for="item in idList"
      v-show="active === item"
      :key="item"
      :is="LogisticsBookDtInfos"
      :data-id="item"></component>
  </div>
  
</template>

<script>
  import LogisticsBookDtInfos from './LogisticsBookDtInfos'
  import mutiPage from 'src/base/mixins/mutiPage'   // 务必继承

  export default {
    name: 'logisticsBookDtInfo',
    mixins: [ mutiPage ],
    data () {
      return {
        LogisticsBookDtInfos: LogisticsBookDtInfos
      }
    }
  }
</script>