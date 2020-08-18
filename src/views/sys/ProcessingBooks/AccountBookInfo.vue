<template>
  <div class="muti-file">
    <component v-for="item in idList"
      v-show="active === item"
      :key="item"
      :is="AccountBookInfos"
      :data-id="item"></component>
  </div>
  
</template>

<script>
  import AccountBookInfos from './AccountBookInfos'
  import mutiPage from 'src/base/mixins/mutiPage'   // 务必继承

  export default {
    name: 'accountBookDetilInfo',
    mixins: [ mutiPage ],
    data () {
      return {
        AccountBookInfos: AccountBookInfos
      }
    }
  }
</script>