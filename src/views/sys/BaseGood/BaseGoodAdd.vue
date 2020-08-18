<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">
          <!-- <ep-button
            type="success"
            size="small"
            @click="doSave"
            icon="edit"
            :loading="saveLoading"
          >暂存</ep-button>
          <ep-button
            type="success"
            size="small"
            @click="declare"
            icon="checkmark-round"
            :loading="applyLoading"
          >确认</ep-button>
          <ep-button type="success" size="small" icon="plus-round" @click="addOther">新增</ep-button>-->

          <WmsButton :loading="saveLoading" @click="doSave">暂存</WmsButton>
          <WmsButton :loading="applyLoading" @click="declare">确认</WmsButton>
          <WmsButton :loading="applyLoading" @click="addOther">新增</WmsButton>
        </div>
        <ep-tabs active="货物信息表">
          <ep-tab-item name="货物信息表">
            <Form ref="Form" :bodyForm="bodyForm" :isGdsMtnoSave="isGdsMtnoSave"></Form>
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneObj, getToken } from "utils";
import Form from "./components/form";

export default {
  name: "BaseGoodAdd",
  components: {
    Form
  },
  data() {
    return {
      bodyForm: {
        /* 页面展示项*/
        gdsMtno: "", // 商品料号
        gdecd: "", // 商品编码
        ciqCode: "", // 商检编码
        gdsNm: "", // 商品名称
        gdsSpcfModelDesc: "", // 规格型号
        natcd: "", // 国别
        dclCurrcd: "", // 币别
        dclUnitcd: "", // 计量单位
        rmk: "", // 备注
        masterCuscd: this.$store.getters.getOrgCustomId,
        tradeCode: this.$store.getters.getTradeCode,
        tradeId: this.$store.getters.getTradeId
      },
      loading: false,
      saveLoading: false, //暂存loading
      applyLoading: false, //申报loading
      tableDataCopy: [],
      isGdsMtnoSave: false,
      id: ""
    };
  },
  created() {},
  mounted() {},
  computed: {
    cBodyForm() {
      return JSON.stringify(this.bodyForm);
    }
  },
  methods: {
    // 填充数据到页面表单
    doRefresh(id) {
      this.$post("baseGoodDetail", { id: id, type: "0" }).then(res => {
        this.bodyForm = res.map.data;
      });
    },
    // 暂存操作
    doSave() {
      this.$refs.Form.getValidate();
      let isValid = this.$refs.Form.isDeclare;
      if (!isValid) {
        this.$pop({
          type: "danger",
          message: "表单验证失败!"
        });
        return;
      }
      let data = this.$refs.Form.bodyForm;
      this.saveLoading = true;
      // console.log(data);
      let vm = this;
      this.$post("baseGoodSave", data)
        .then(res => {
          // console.log(res);
          vm.id = res.map.id;
          vm.saveLoading = false;
          vm.isGdsMtnoSave = true;
          vm.doRefresh(vm.id);
          // console.log(vm.isGdsMtnoSave);
        })
        .catch(err => {
          console.log(err);
          vm.saveLoading = false;
        });
    },
    // 确认操作
    declare() {
      console.log(this.isGdsMtnoSave);
      if (!this.isGdsMtnoSave) {
        this.$pop({
          type: "danger",
          message: "请先暂存"
        });
        return;
      }

      this.bodyForm = this.$refs.Form.bodyForm;
      this.$refs["Form"].$refs.bodyForm.validate(valid => {
        if (!valid) {
          this.$pop({
            type: "danger",
            message: "表单验证失败"
          });
          return;
        } else {
          let vm = this;
          this.$confirm({
            word: "是否要确认？",
            async callback(info) {
              if (info) {
                try {
                  // 修改
                  let res = await vm.$post("baseGoodUpdate", vm.bodyForm);
                  vm.id = res.map.id;
                  if (res.status != "1") return;

                  setTimeout(
                    await function() {
                      // 申报
                      let goodIds = [];
                      goodIds.push(vm.id);
                      vm.$post("baseGoodDeclare", { goodIds: goodIds }).then(
                        res => (vm.applyLoading = false)
                      );
                    },
                    500
                  );
                } catch (err) {
                  vm.applyLoading = false;
                  console.log(err);
                }
              }
            }
          });
        }
      });
    },

    // 新增操作
    addOther() {
      this.$app.trigger("add-new-tab", "BaseGoodAdd");

      // let menusList = this.$store.getters.getMenuTabInstance.items;
      // menusList.forEach(function(item, index) {
      //   if (item.link == "/BaseGoodAdd") {
      //     menusList.splice(index, 1);
      //   }
      // });
      // this.$router.push({ name: "首页" });
      // setTimeout(() => {
      //   this.$router.push({
      //     path: "/BaseGoodAdd"
      //   });
      // }, 10);
    }
  },
  watch: {
    // 监听bodyForm表单数据是否发生变化，用于 申报之前判断isDeclare是否为true
    // cBodyForm(newVal, oldVal) {
    //   if(this.isDeclare) {
    //     if(newVal !== oldVal) {
    //       this.isDeclare = false
    //     }
    //   }
    // }
  }
};
</script>
