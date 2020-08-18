<template>
  <div class="muti-file">
    <component v-for="item in idList"
      v-show="active === item"
      :key="item"
      :is="WareHouseDtInfos"
      :data-id="item"></component>
  </div>

</template>

<script>
  import WareHouseDtInfos from './WareHouseDtInfos'
  import mutiPage from 'src/base/mixins/mutiPage'   // 务必继承

  export default {
    name: 'WareHouseDtInfo',
    mixins: [ mutiPage ],
    data () {
      return {
        WareHouseDtInfos: WareHouseDtInfos
      }
    }
  }
</script>
