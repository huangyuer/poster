<template>
  <div class="muti-file">
    <component v-for="item in idList"
      v-show="active === item"
      :key="item"
      :is="ToalGuaranteeDtInfos"
      :data-id="item"></component>
  </div>

</template>

<script>
  import ToalGuaranteeDtInfos from './ToalGuaranteeDtInfos'
  import mutiPage from 'src/base/mixins/mutiPage'   // 务必继承

  export default {
    name: 'ToalGuaranteeDtInfo',
    mixins: [ mutiPage ],
    data () {
      return {
        ToalGuaranteeDtInfos: ToalGuaranteeDtInfos
      }
    }
  }
</script>
