<template>
  <div class="muti-file">
    <component
      v-for="item in idList"
      v-show="active === item"
      :key="item"
      :is="ComfirmationDtInfos"
      :data-id="item"
    ></component>
  </div>
</template>

<script>
import ComfirmationDtInfos from "./ComfirmationDtInfos";
import mutiPage from "src/base/mixins/mutiPage"; // 务必继承

export default {
  name: "ComfirmationDtInfo",
  mixins: [mutiPage],
  data() {
    return {
      ComfirmationDtInfos: ComfirmationDtInfos
    };
  }
};
</script>