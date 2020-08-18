<template>
  <div class="muti-file">
    <component v-for="item in idList"
      v-show="active === item"
      :key="item"
      :is="WorkOrderDtInfos"
      :data-id="item"></component>
  </div>
  
</template>

<script>
  import WorkOrderDtInfos from './WorkOrderDtInfos'
  import mutiPage from 'src/base/mixins/mutiPage'   // 务必继承

  export default {
    name: 'woListDtInfo',
    mixins: [ mutiPage ],
    data () {
      return {
        WorkOrderDtInfos
      }
    }
  }
</script>