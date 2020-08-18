<template>
  <div class="muti-file">
    <component v-for="item in idList"
      v-show="active === item"
      :key="item"
      :is="fileStatusDtInfo"
      :data-id="item"></component>
  </div>
  
</template>

<script>
  import fileStatusDtInfo from './FileStatusDtInfos'
  import mutiPage from 'src/base/mixins/mutiPage'   // 务必继承

  export default {
    name: 'fileStatusDtInfo',
    mixins: [ mutiPage ],
    data () {
      return {
        fileStatusDtInfo
      }
    }
  }
</script>