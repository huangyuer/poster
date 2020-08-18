<template>
  <div class="muti-file">
    <component v-for="item in idList" v-show="active === item" :key="item" :is="BillDirDtInfos" :data-id="item"></component>
  </div>

</template>

<script>
import BillDirDtInfos from "./BillDirDtInfos";
import mutiPage from "src/base/mixins/mutiPage"; // 务必继承

export default {
  name: "BillDirDtInfo",
  mixins: [mutiPage],
  data() {
    return {
      BillDirDtInfos: BillDirDtInfos
    };
  }
};
</script>
