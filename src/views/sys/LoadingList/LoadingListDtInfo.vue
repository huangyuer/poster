<template>
  <div class="muti-file">
    <component v-for="item in idList"
      v-show="active === item"
      :key="item"
      :is="LoadingListDtInfos"
      :data-id="item"></component>
  </div>
  
</template>

<script>
  import LoadingListDtInfos from './LoadingListDtInfos'
  import mutiPage from 'src/base/mixins/mutiPage'   // 务必继承

  export default {
    name: 'LoadingListDtInfo',
    mixins: [ mutiPage ],
    data () {
      return {
        LoadingListDtInfos: LoadingListDtInfos
      }
    }
  }
</script>