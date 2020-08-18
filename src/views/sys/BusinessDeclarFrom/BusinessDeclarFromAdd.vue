<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">
          <!-- <ep-button type="success" size="small" @click="doSave" icon="edit" :loading="saveLoading">暂存</ep-button>
          <ep-button type="success" size="small" @click="doDeclare" icon="checkmark-round" :loading="declareLoading">申报</ep-button>
          <ep-button type="success" size="small" icon="plus-round" @click="doAdd">新增</ep-button> -->
          <WmsButton @click="doSave" :loading="saveLoading">暂存</WmsButton>
          <WmsButton @click="doDeclare(isDeclare)">确认</WmsButton>
          <WmsButton @click="doAdd">新增</WmsButton>

        </div>
        <ep-tabs active="业务申报表头">
          <ep-tab-item name="业务申报表头">
            <fromBadyinfo ref="formheaders" :bodyForm="bodyForm" :showtype="false" />
          </ep-tab-item>

        </ep-tabs>

      </div>
    </div>
  </div>

</template>


<script>
import misList from "src/common/mislist";
import fromBadyinfo from "./components/fromBadyinfo";

import { cloneObj } from "utils";
import mixin from "./mixin";
export default {
  name: "BusinessDeclarFromAdd",
  mixins: [mixin, misList],
  components: { fromBadyinfo },
  data() {
    return {
      saveLoading: false,
      declareLoading: false,
      gatetime: "",
      isDeclare: false,
      UsedTypecd: [],
      bodyForm: {
        id: "",
        orgId: this.$store.getters.getId,
        // orgCode: this.$store.getters.getOrgCode,
        businessDeclareNo: "",
        contractNo: "",
        type: "1",
        optStatus: "",
        bizopEtpsNo: this.$store.getters.getTradeCode, //经营企业编号
        bizopEtpsNm: this.$store.getters.getTradeName, //经营单位名称
        passportUsedTypecd: "",
        dclTypecd: "1",
        outsourceEtpsNm: "",
        createTime: "",
        endTime: "",
      },
    };
  },
  created() {},
  watch: {},
  methods: {
    againDate(id) {
      this.$post("sasDeclareSelectDetail", { id: parseInt(id) }).then((res) => {
        this.bodyForm = cloneObj(res.map.businessDeclareBsc);
      });
    },
    // // 暂存
    doSave() {
      this.$refs.formheaders.$refs["bodyForm"].validate((valid) => {
        if (!valid) {
          this.$pop({
            type: "danger",
            message: "表单验证失败！",
          });
          return;
        }
        let data = this.bodyForm;
        let strDate = this.bodyForm.createTime;
        let endDate = this.bodyForm.endTime;
        if (!this.checkDate(strDate, endDate)) {
          this.$pop({
            type: "danger",
            message: "结束日期应该大于开始日期",
          });
          return;
        }
        this.saveLoading = true;
        this.$post("sasDeclareFrom", data)
          .then((res) => {
            this.bodyForm.id = res.map.id;
            this.saveLoading = false;
            this.isDeclare = true;
            this.againDate(this.bodyForm.id);
          })
          .then((res) => {
            this.bodyForm = res.map.data;
          })
          .catch((e) => {
            this.saveLoading = false;
          });
      });
    },
    // 申报
    doDeclare(isDeclare) {
      if (!isDeclare) {
        this.$pop({
          type: "danger",
          message: "请先暂存",
        });
        return;
      }

      this.$refs.formheaders.$refs["bodyForm"].validate((valid) => {
        if (!valid) {
          this.$pop({
            type: "danger",
            message: "表单验证失败！",
          });
          return;
        }
        let vm = this;
        let bodyForm = vm.bodyForm;
        let data = vm.bodyForm;
        let strDate = vm.bodyForm.createTime;
        let endDate = vm.bodyForm.endTime;
        if (!this.checkDate(strDate, endDate)) {
          this.$pop({
            type: "danger",
            message: "结束日期应该大于开始日期",
          });
          return;
        }
        this.$confirm({
          word: "是否要确认？",
          async callback(info) {
            if (info) {
              try {
                vm.declareLoading = true;
                let result = await vm.$post("sasDeclareFrom", bodyForm);
                let id = result.map.id;
                // let ids = Number(bodyForm.id);
                let response = await vm.$post("sasDeclareDeclare", { id: id });
                vm.declareLoading = false;
                vm.againDate(id);
              } catch (err) {
                console.log(err);
                vm.declareLoading = false;
              }
            }
          },
        });
      });
    },
    checkDate(strDate1, strDate2) {
      var t1 = new Date(Date.parse(strDate1.replace(/-/g, "/"))).getTime();
      var t2 = new Date(Date.parse(strDate2.replace(/-/g, "/"))).getTime();
      if (t1 - t2 > 0) {
        return false;
      } else {
        return true;
      }
    },
    // 新增
    doAdd() {
      this.$app.trigger("add-new-tab", "BusinessDeclarFromAdd");
    },
    // checkDate(strDate1, strDate2) {
    //   var t1 = new Date(Date.parse(strDate1.replace(/-/g, "/"))).getTime();
    //   var t2 = new Date(Date.parse(strDate2.replace(/-/g, "/"))).getTime();
    //   if (t1 - t2 > 0) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },
  },
};
</script>
