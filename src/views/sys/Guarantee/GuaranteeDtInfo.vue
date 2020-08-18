<template>
  <div class="muti-file">
    <component v-for="item in idList"
      v-show="active === item"
      :key="item"
      :is="GuaranteeDtInfos"
      :data-id="item"></component>
  </div>

</template>

<script>
  import GuaranteeDtInfos from './GuaranteeDtInfos'
  import mutiPage from 'src/base/mixins/mutiPage'   // 务必继承

  export default {
    name: 'GuaranteeDtInfo',
    mixins: [ mutiPage ],
    data () {
      return {
        GuaranteeDtInfos: GuaranteeDtInfos
      }
    }
  }
</script>
