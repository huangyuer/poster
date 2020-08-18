<template>
  <div class="muti-file">
    <component v-for="item in idList"
               v-show="active === item"
               :key="item"
               :is="importBondedInfosdraw"
               :data-id="item"></component>
  </div>
</template>

<script>
import importBondedInfosdraw from './importBondedInfosdraw'
import mutiPage from 'src/base/mixins/mutiPage'   // 务必继承
export default {
  name: 'ImportBondedDtInfodraw',
  mixins: [mutiPage],
  data() {
    return {
      importBondedInfosdraw: importBondedInfosdraw
    }
  }
}
</script>