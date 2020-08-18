<template>
  <div class="muti-file">
    <component v-for="item in idList"
      v-show="active === item"
      :key="item"
      :is="BaseGoodInfos"
      :data-id="item"></component>
  </div>

</template>

<script>
  import BaseGoodInfos from './BaseGoodInfos'
  import mutiPage from 'src/base/mixins/mutiPage'   // 务必继承

  export default {
    name: 'BaseGoodDtInfo',
    mixins: [ mutiPage ],
    data () {
      return {
        BaseGoodInfos: BaseGoodInfos
      }
    }
  }
</script>
