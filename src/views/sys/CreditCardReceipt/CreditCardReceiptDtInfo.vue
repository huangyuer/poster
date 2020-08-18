<template>
  <div class="muti-file">
    <component
      v-for="item in idList"
      v-show="active === item"
      :key="item"
      :is="CreditCardReceiptDtInfos"
      :data-id="item"
    ></component>
  </div>
</template>

<script>
import CreditCardReceiptDtInfos from "./CreditCardReceiptDtInfos";
import mutiPage from "src/base/mixins/mutiPage"; // 务必继承

export default {
  name: "CreditCardReceiptDtInfo",
  mixins: [mutiPage],
  data() {
    return {
      CreditCardReceiptDtInfos: CreditCardReceiptDtInfos
    };
  }
};
</script>
