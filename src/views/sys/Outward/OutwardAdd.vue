<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">

          <WmsButton :loading="saveLoading" @click="doSave">暂存</WmsButton>
          <WmsButton :loading="applyLoading" @click="declare(isDeclare)">确认</WmsButton>
          <WmsButton @click="addOther">新增</WmsButton>

        </div>
        <ep-tabs active="耗料清单表头">
          <ep-tab-item name="耗料清单表头">
            <formHeader :bodyForm="headerForm" ref="formHeader"></formHeader>
          </ep-tab-item>
          <ep-tab-item name="耗料清单耗用表体">
            <formBodyOut ref="formBody" :listData="tableData" :dtDetailArr="dtDetailArr" ></formBodyOut>
          </ep-tab-item>
          <ep-tab-item name="耗料清单产出表体">
            <formBodyIn ref="formBody1" :listData="tableData1" :dtDetailArr="dtDetailArr" ></formBodyIn>
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import misList from "src/common/mislist";
import formHeader from "./components/formHeader";
import formBodyIn from "./components/formBodyIn";
import formBodyOut from "./components/formBodyOut";
import { cloneObj, getToken } from "utils";
import bus from "./components/bus";
export default {
  name: "OutwardAdd",
  extends: misList, // 务必继承
  components: {
    formHeader,
    formBodyIn,
    formBodyOut,
  },
  watch: {

  },
  created() {
    bus.$on("passBodyDt", data => {
      data.forEach(item => {
        this.tableData.push(item);
      });
      let t;
      this.tableData.forEach((el, index) => {
        el.whRecPreentNo = this.headerForm.whRecPreentNo;
        t = el.gdsSeqno;
        el.gdsSeqno = el.rltPortSeqno;
        el.rltPortSeqno = t;
        el.leadId = index;
      });
    });
    bus.$on("deleteDtDetail", data => {
      // this.tableData.forEach((table, i) => {
      //   data.forEach(item => {
      //     if (item.portNo === table.portNo) {
      //       this.tableData.splice(table,1);
      //     }
      //   });
      // });
      let table = [];
      for (var i = 0; i < this.tableData.length; i++) {
        let flag = true;
        for (var j = 0; j < data.length; j++) {
          if (this.tableData[i].portNo == data[j].portNo) {
            flag = false;
            break;
          }
        }
        if (flag) table.push(this.tableData[i]);
      }
      this.tableData = table;
    });
  },
  beforeDestroy() {
    //组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    bus.$off("passBodyDt");
    bus.$off("deleteDtDetail");
  },
  mounted() {},
  data() {
    return {
      inExpTypeStatus: false,
      ieTypecdStatus: false,
      changeSatus: true,
      changeBody: true,
      tableDataCopy: [],
      table2List: [],
      // warehousePort: [],
      headerForm: {
        id: "",
        orgId: this.$store.getters.getId,
        consumptionNo: "", // 清单料号编号
        bizopEtpsno: this.$store.getters.getTradeCode, //经营企业编号
        bizopEtpsNm: this.$store.getters.getTradeName, //经营企业名称
        // bizopEtpsSccd: this.$store.getters.getCreditCode, //经营企业社会信用代码
        businessTypecd: "", // 业务类别
        dclData: "", // 申报日期
        optStatus: "", // 操作状态
      },
      RelationStatus: 3,
      ieTypecdChangeState: "",
      dclcusState: 1,
      customSearch: {},
      formRef: null,
      saveLoading: false, //暂存loading
      applyLoading: false, //申报loading
      isDeclare: false,
      tableData: [], // 表体表格
      tableData1: [], // 表体表格
      dtDetailArr: [],
      inExpData: []
    };
  },
  methods: {
    doRefresh(id) {
      this.$post("wareHouseBscDetails", { id: parseInt(id) }).then(res => {
        this.headerForm = res.map.data;
        this.tableData = res.map.data.warehouseReceiptDt;
        this.tableData1 = res.map.data.warehouseReceiptDt1;
        let tableData = cloneObj(this.tableData);
        tableData.forEach((e, i) => {
          e.leadId = i;
        });
        this.tableData = tableData;

        tableData1.forEach((e, i) => {
          e.leadId = i;
        });
        this.tableData1 = tableData1;

        this.inExpData = res.map.data.warehouseInExp;
        let inExpData = cloneObj(this.inExpData);
        inExpData.forEach((e, i) => {
          e.leadId = i;
        });
        this.inExpData = inExpData;
      });
    },
    // 暂存操作
    doSave() {
      this.headerForm = this.$refs.formHeader.bodyForm;
      this.$refs.formHeader.$refs["bodyForm"].validate(valid => {
        if (valid) {
          this.headerForm.warehouseReceiptDt =
            (this.$refs.formBody && this.$refs.formBody.tableDataCopy) ||
            this.tableData;
          this.headerForm.warehouseReceiptDt =
          (this.$refs.formBody && this.$refs.formBody.tableDataCopy) ||
          this.tableData;
          this.saveLoading = true;
          this.$post("wareHouseSave", this.headerForm)
            .then(res => {
              (this.saveLoading = false), (this.isDeclare = true);
              this.inExpTypeStatus = true;
              this.doRefresh(res.map.data);
              if (this.RelationStatus == 3) {
                this.ieTypecdStatus = true;
              } else {
                this.ieTypecdStatus = false;
              }
            })
            .catch(() => {
              this.saveLoading = false;
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
    declare(isDeclare) {
      if (!isDeclare) {
        this.$pop({
          type: "danger",
          message: "请先暂存"
        });
        return;
      }
      this.headerForm = this.$refs.formHeader.bodyForm;
      this.headerForm.warehouseReceiptDt =
        (this.$refs.formBody && this.$refs.formBody.tableDataCopy) ||
        this.tableData;
      this.$refs["formHeader"].$refs.bodyForm.validate(valid => {
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
                  let data = vm.headerForm;
                  vm.applyLoading = true;
                  let result = await vm.$post("wareHouseSave", data);
                  let arr = parseInt(data.id);
                  let response = await vm.$post("wareHouseSubmit", {
                    // id: [id]
                    bscIds: [arr]
                  });
                  vm.applyLoading = false;
                } catch (err) {
                  vm.applyLoading = false;
                }
              }
            }
          });
        }
      });
    },
    // 增加操作
    addOther() {
      this.$app.trigger("add-new-tab", "OutwardAdd");
    }
  }
};
</script>


<style scoped>
.hidden {
  display: none;
}
.show {
  display: inline-block;
}
</style>
