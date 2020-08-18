<template>
  <div class="muti-file">
    <component v-for="item in idList"
      v-show="active === item"
      :key="item"
      :is="BillDirExpDtInfos"
      :data-id="item"></component>
  </div>

</template>

<script>
  import BillDirExpDtInfos from './BillDirExpDtInfos'
  import mutiPage from 'src/base/mixins/mutiPage'   // 务必继承

  export default {
    name: 'BillDirExpDtInfo',
    mixins: [ mutiPage ],
    data () {
      return {
        BillDirExpDtInfos: BillDirExpDtInfos
      }
    }
  }
</script>
