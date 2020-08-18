<template>
  <div class="muti-file">
    <component v-for="item in idList"
      v-show="active === item"
      :key="item"
      :is="EquipmentBookDtInfos"
      :data-id="item"></component>
  </div>
  
</template>

<script>
  import EquipmentBookDtInfos from './EquipmentBookDtInfos'
  import mutiPage from 'src/base/mixins/mutiPage'   // 务必继承

  export default {
    name: 'equipmentBookDtInfo',
    mixins: [ mutiPage ],
    data () {
      return {
        EquipmentBookDtInfos: EquipmentBookDtInfos
      }
    }
  }
</script>