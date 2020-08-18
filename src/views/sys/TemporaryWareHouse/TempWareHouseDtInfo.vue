<template>
  <div class="muti-file">
    <component v-for="item in idList"
      v-show="active === item"
      :key="item"
      :is="TempWareHouseDtInfos"
      :data-id="item"></component>
  </div>

</template>

<script>
  import TempWareHouseDtInfos from './TempWareHouseDtInfos'
  import mutiPage from 'src/base/mixins/mutiPage'   // 务必继承

  export default {
    name: 'TempWareHouseDtInfo',
    mixins: [ mutiPage ],
    data () {
      return {
        TempWareHouseDtInfos: TempWareHouseDtInfos
      }
    }
  }
</script>
