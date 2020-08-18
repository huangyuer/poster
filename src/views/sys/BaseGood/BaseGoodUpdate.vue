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
            @click="declare(isDeclare)"
            icon="checkmark-round"
            :loading="applyLoading"
          >确认</ep-button> -->
          <WmsButton :loading="saveLoading" @click="doSave">暂存</WmsButton>
          <WmsButton :loading="applyLoading" @click="declare(isDeclare)">确认</WmsButton>
        </div>
        <ep-tabs active="货物信息表">
          <ep-tab-item name="货物信息表">
            <Form :bodyForm="bodyForm" ref="Form" :cantCorrect="true"></Form>
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import misList from "src/common/mislist";
import Form from "./components/form";
import { cloneObj, getToken } from "utils";

export default {
  name: "BaseGoodUpdate",
  extends: misList, // 务必继承
  components: {
    Form
  },
  created() {
    let id = this.$route.query.id;
    this.$post("baseGoodDetail",  { id: id, type: "0" }).then(res => {
      console.log(res);
      this.bodyForm = res.map.data;
    });
  },
  mounted() {},
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
      customSearch: {},
      formRef: null,
      saveLoading: false, //暂存loading
      applyLoading: false, //申报loading
      isDeclare: false,
      tableData: [], // 表体表格
      id: ""
    };
  },

  methods: {
    // 暂存操作
    doSave() {
      this.bodyForm = this.$refs.Form.bodyForm;
      this.$refs.Form.$refs["bodyForm"].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          console.log("bodyForm", this.bodyForm);
          let vm = this
          this.$post("baseGoodUpdate", this.bodyForm)
            .then(res => {
              console.log("res", res);
              vm.id = res.map.id
              vm.saveLoading = false
              vm.isDeclare = true
            })
            .catch(err => {
              console.log(err);
              vm.saveLoading = false;
            });
        } else {
          this.$pop({
            type: "danger",
            message: "表单验证失败!"
          });
          return;
        }
      });
    },
    // 确认操作
    declare() {
      console.log(this.isDeclare);
      if (!this.isDeclare) {
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
          console.log(this.$route.query.id)
          this.$confirm({
            word: "是否要确认？",
            callback(info) {
              if (info) {
                try {
                  let goodIds = [];
                  goodIds.push(vm.$route.query.id);
                  vm.$post("baseGoodDeclare", {goodIds: goodIds})
                  .then(res => vm.applyLoading = false)
                } catch (err) {
                  vm.applyLoading = false;
                  console.log(err);
                }
              }
            }
          });
        }
      });
    }
  },
  computed: {
    cBodyForm() {
      return JSON.stringify(this.bodyForm)
    }
  },
  watch: {
    // 监听bodyForm表单数据是否发生变化，用于 申报之前判断isDeclare是否为true
    cBodyForm(newVal, oldVal) {
      if(this.isDeclare) {
        if(newVal !== oldVal) {
          this.isDeclare = false
        }
      }
    }
  }



};
</script>
