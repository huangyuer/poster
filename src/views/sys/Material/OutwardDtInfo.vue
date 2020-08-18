<template>
  <div class="muti-file">
    <component v-for="item in idList" v-show="active === item" :key="item" :is="OutwardDtInfos" :data-id="item"></component>
  </div>

</template>

<script>
import OutwardDtInfos from "./OutwardDtInfos";
import mutiPage from "src/base/mixins/mutiPage"; // 务必继承

export default {
  name: "OutwardDtInfo",
  mixins: [mutiPage],
  data() {
    return {
      OutwardDtInfos: OutwardDtInfos
    };
  }
};
</script>
