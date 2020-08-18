<template>
  <div class="muti-file">
    <component v-for="item in idList" v-show="active === item" :key="item" :is="BusinessDeclarFromDtInfos" :data-id="item"></component>
  </div>

</template>

<script>
import BusinessDeclarFromDtInfos from "./BusinessDeclarFromDtInfos";
import mutiPage from "src/base/mixins/mutiPage"; // 务必继承

export default {
  name: "BusinessDeclarFromDtInfo",
  mixins: [mutiPage],
  data() {
    return {
      BusinessDeclarFromDtInfos: BusinessDeclarFromDtInfos,
    };
  },
};
</script>
