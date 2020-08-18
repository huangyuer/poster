<template>
  <div class="muti-file">
    <component v-for="item in idList"
      v-show="active === item"
      :key="item"
      :is="DetailsInfo"
      :data-id="item"></component>
  </div>
  
</template>

<script>
  import DetailsInfo from './DetailsInfo'
  import mutiPage from 'src/base/mixins/mutiPage'   // 务必继承

  export default {
    name: 'Details',
    mixins: [ mutiPage ],
    data () {
      return {
        DetailsInfo: DetailsInfo
      }
    }
  }
</script>