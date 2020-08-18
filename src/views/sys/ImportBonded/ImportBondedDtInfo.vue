<template>
  <div class="muti-file">
    <component v-for="item in idList" v-show="active === item" :key="item" :is="importBondedInfos" :data-id="item"></component>
  </div>
</template>

<script>
import importBondedInfos from "./importBondedInfos";
import mutiPage from "src/base/mixins/mutiPage"; // 务必继承
export default {
  name: "ImportBondedDtInfodddddd",
  mixins: [mutiPage],
  data() {
    return {
      importBondedInfos: importBondedInfos
    };
  }
};
</script>
