<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">
          <ep-button type="success" size="small" @click="doSaveTimeOut()" icon="edit" :loading="saveLoading">暂存</ep-button>
          <ep-button type="success" size="small" @click="declare()" icon="checkmark-round" :loading="applyLoading">确认
          </ep-button>
        </div>
        <ep-tabs active="进出境货物汇总表头">
          <ep-tab-item name="进出境货物汇总表头">
            <BondFormHeader ref="BondFormHeader"></BondFormHeader>
          </ep-tab-item>
          <ep-tab-item name="进出境货物汇总表体">
            <BondFormBody ref="BondFormBody" :listDate='tableDataCopy'></BondFormBody>
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneObj, getToken } from "utils";
import BondFormHeader from "./components/bondFormHeader";
import BondFormBody from "./components/bondFormBody";

export default {
  name: "importBondedupdate",
  components: {
    BondFormHeader,
    BondFormBody
  },
  data() {
    return {
      loading: false,
      saveFlag: true, // 判断是 暂存还是修改
      bondFormBodyFlag: true,
      saveLoading: false, //暂存loading
      applyLoading: false, //申报loading
      tableDataCopy: []
    };
  },
  created() {
    let id = this.$route.query.id;
    this.importBondedDetail(id);
  },
  methods: {
    doSaveTimeOut() {
      setTimeout(() => {
        this.doSave();
      }, 100);
    },
    // 暂存操作
    doSave() {
      this.$refs.BondFormHeader.getValidate();
      let isDeclare = this.$refs.BondFormHeader.isDeclare;
      let data = cloneObj(this.$refs.BondFormHeader.bodyForm);
      console.log(data);
      if (!isDeclare) {
        this.$pop({
          type: "danger",
          message: "暂存失败!"
        });
        return;
      }
      if (data.sumBeginTime) {
        let sumBegin = data.sumBeginTime.split("-") || [];
        let sumDue = data.sumDueTime.split("-") || [];
        if (sumBegin[1] > 12 || sumDue[1] > 12) {
          this.$refs.BondFormHeader.reset();
          this.$pop({
            type: "warning",
            message: "月份不能大于12月",
            hasClose: true
          });
          return;
        } else if (sumBegin[1] < 1 || sumDue[1] < 1) {
          this.$refs.BondFormHeader.reset();
          this.$pop({
            type: "warning",
            message: "月份不能小于1月",
            hasClose: true
          });
          return;
        }
        // 判断截止日期 是否为1月
        let sumFlag =
          sumDue[1] == 1
            ? +sumDue[1] + 11 != sumBegin[1]
            : +sumDue[1] - 1 != sumBegin[1];

        if (sumBegin && sumBegin[2] != 25) {
          this.$refs.BondFormHeader.dateFrom.bodyFormSumBeginTime = "";
          this.$pop({
            type: "warning",
            message: "开始日期必须是25号",
            hasClose: true
          });
          return;
        } else if (
          (sumBegin[0] != sumDue[0] && sumBegin[0] != sumDue[0] - 1) ||
          (sumBegin[0] == sumDue[0] - 1 && sumDue[1] != 1)
        ) {
          this.$refs.BondFormHeader.dateFrom.bodyFormSumBeginTime = "";
          this.$pop({
            type: "warning",
            message: "开始日期必须是截止日期的上个月25号",
            hasClose: true
          });
          return;
        } else if (sumDue.length > 1 && sumFlag) {
          this.$refs.BondFormHeader.dateFrom.bodyFormSumBeginTime = "";
          this.$pop({
            type: "warning",
            message: "开始日期必须是截止日期的上个月25号",
            hasClose: true
          });
          return;
        }
      }
      if (data.sumDueTime) {
        let sumDue = data.sumDueTime.split("-") || [];
        let sumBegin = data.sumBeginTime.split("-") || [];
        // 开始截止日期 是否为12月
        let sumFlag =
          sumBegin[1] == 12
            ? +sumBegin[1] - 11 != sumDue[1]
            : +sumBegin[1] + 1 != sumDue[1];
        if (sumDue.length > 1 && sumDue[2] != 24) {
          this.$refs.BondFormHeader.dateFrom.bodyFormSumBeginTime = "";
          this.$pop({
            type: "warning",
            message: "截止日期必须是24号",
            hasClose: true
          });
          return;
        } else if (sumBegin.length > 1 && sumFlag) {
          this.$refs.BondFormHeader.dateFrom.bodyFormSumBeginTime = "";
          this.$pop({
            type: "warning",
            message: "截止日期必须是开始日期的次月24号",
            hasClose: true
          });
          return;
        }
      }
      data.sumBeginTime = data.sumBeginTime + " 00:00:00";
      data.sumDueTime = data.sumDueTime + " 23:59:59";
      data.sumStatisticsDt = [];
      data.sumStatisticsDt = this.$refs.BondFormBody
        ? this.$refs.BondFormBody.tableDataCopy
        : this.$refs.BondFormHeader.bodyForm.sumStatisticsDt;
      this.saveLoading = true;
      setTimeout(() => {
        this.importBondedUpdate(data);
      }, 100);
    },
    // 第二次点击暂存调修改接口
    importBondedUpdate(data) {
      this.$post("importBondedUpdate", data)
        .then(res => {
          this.saveLoading = false;
          this.importBondedDetail(res.map.id);
        })
        .catch(() => {
          this.saveLoading = false;
        });
    },
    // 第一次点击暂存调添加接口，成功之后根据id调取详情
    importBondedDetail(id) {
      let that = this;
      this.$post("importBondedDetail", { id })
        .then(res => {
          res.map.data.sumBeginTime = res.map.data.sumBeginTime.split(" ")[0];
          res.map.data.sumDueTime = res.map.data.sumDueTime.split(" ")[0];
          this.$refs.BondFormHeader.dateFrom.bodyFormSumBeginTime =
            res.map.data.sumBeginTime + "," + res.map.data.sumDueTime;
          this.$refs.BondFormHeader.bodyForm = res.map.data;
          this.tableDataCopy = res.map.data.sumStatisticsDt;
          this.ddd = res.map.data.sumStatisticsDt;
          this.$refs.BondFormHeader.bodyForm.id = id;
        })
        .catch(() => {});
    },
    // 确认操作
    declare() {
      let that = this;
      let isDeclare = this.$refs.BondFormHeader.isDeclare;
      let data = cloneObj(this.$refs.BondFormHeader.bodyForm);
      let sumBeginTime = this.$refs.BondFormHeader.bodyForm.sumBeginTime;
      let sumDueTime = this.$refs.BondFormHeader.bodyForm.sumDueTime;
      data.sumStatisticsDt = this.$refs.BondFormBody
        ? this.$refs.BondFormBody.tableDataCopy
        : this.$refs.BondFormHeader.bodyForm.sumStatisticsDt;

      if (data.optStatus != 1) {
        this.$pop({
          type: "danger",
          message: "当前状态无法确认"
        });
        return;
      }
      if (sumBeginTime) {
        let sumBegin = sumBeginTime.split("-") || [];
        let sumDue = sumDueTime.split("-") || [];
        if (sumBegin[1] > 12 || sumDue[1] > 12) {
          this.$refs.BondFormHeader.reset();
          this.$pop({
            type: "warning",
            message: "月份不能大于12月",
            hasClose: true
          });
          return;
        } else if (sumBegin[1] < 1 || sumDue[1] < 1) {
          this.$refs.BondFormHeader.reset();
          this.$pop({
            type: "warning",
            message: "月份不能小于1月",
            hasClose: true
          });
          return;
        }
        // 判断截止日期 是否为1月
        let sumFlag =
          sumDue[1] == 1
            ? +sumDue[1] + 11 != sumBegin[1]
            : +sumDue[1] - 1 != sumBegin[1];
        if (sumBegin && sumBegin[2] != 25) {
          this.$refs.BondFormHeader.dateFrom.bodyFormSumBeginTime = "";
          this.$pop({
            type: "warning",
            message: "开始日期必须是25号",
            hasClose: true
          });
          return;
        } else if (sumDue.length > 1 && sumFlag) {
          this.$refs.BondFormHeader.dateFrom.bodyFormSumBeginTime = "";
          this.$pop({
            type: "warning",
            message: "开始日期必须是截止日期的上个月25号",
            hasClose: true
          });
          return;
        }
      }
      if (sumDueTime) {
        let sumDue = sumDueTime.split("-") || [];
        let sumBegin = sumBeginTime.split("-") || [];
        // 开始截止日期 是否为12月
        let sumFlag =
          sumBegin[1] == 12
            ? +sumBegin[1] - 11 != sumDue[1]
            : +sumBegin[1] + 1 != sumDue[1];
        if (sumDue.length > 1 && sumDue[2] != 24) {
          this.$refs.BondFormHeader.dateFrom.bodyFormSumBeginTime = "";
          this.$pop({
            type: "warning",
            message: "截止日期必须是24号",
            hasClose: true
          });
          return;
        } else if (sumBegin.length > 1 && sumFlag) {
          this.$refs.BondFormHeader.dateFrom.bodyFormSumBeginTime = "";
          this.$pop({
            type: "warning",
            message: "截止日期必须是开始日期的次月24号",
            hasClose: true
          });
          return;
        }
      }
      data.sumBeginTime = data.sumBeginTime + " 00:00:00";
      data.sumDueTime = data.sumDueTime + " 23:59:59";
      this.$refs["BondFormHeader"].$refs.dateFrom.validate(valid => {
        if (!valid) {
          this.$pop({
            type: "danger",
            message: "暂存失败"
          });
          return;
        } else {
          // 确认
          // this.applyLoading = true;

          return new Promise((resolve, reject) => {
            this.$post("importBondedUpdate", data).then(res => {
              // this.saveLoading = false;
              let id = res.map.id;
              resolve(id);
            });
          })
            .then(id => {
              this.$post("importBondedDetail", { id }).then(ress => {
                console.log("ress", ress);
                let data = ress.map.data;
                // 确认前先保存数据，判断是否需要填写情况说明
                this.situation(data);
              });
            })
            .catch(() => {
              // this.applyLoading = false;
              this.saveLoading = false;
            });
          return;
        }
      });
    },

    //判断是否需要填写情况说明
    situation(data) {
      let that = this;
      if (!data.unusualMark || data.unusualMark == "0") {
        this.$confirm({
          word: "是否要确认？",
          async callback(info) {
            if (info) {
              try {
                that.applyLoading = true;
                let res = await that.importBondedUpdate(data);

                let id = String(data.id);
                setTimeout(async () => {
                  let response = await that.$post("importBondedDeclare", {
                    bscIds: [id]
                  });
                  console.log("response", response);
                }, 100);
                that.applyLoading = false;
              } catch (err) {
                that.applyLoading = false;
              }
            }
          }
        });
      } else {
        if (data.rmk) {
          that.$confirm({
            word: "是否要确认？",
            async callback(info) {
              if (info) {
                try {
                  that.applyLoading = true;
                  let res = await that.importBondedUpdate(data);
                  let id = String(data.id);
                  setTimeout(async () => {
                    let response = await that.$post("importBondedDeclare", {
                      bscIds: [id]
                    });
                  }, 100);
                  that.applyLoading = false;
                } catch (err) {
                  that.applyLoading = false;
                }
              }
            }
          });
        } else {
          this.$confirm({
            word: "是否要填写情况说明？",
            async callback(info) {
              if (info) {
              } else {
                that.$confirm({
                  word: "是否要确认？",
                  async callback(info) {
                    if (info) {
                      try {
                        that.applyLoading = true;
                        let res = await that.importBondedUpdate(data);
                        let id = String(data.id);
                        setTimeout(async () => {
                          let response = await that.$post(
                            "importBondedDeclare",
                            {
                              bscIds: [id]
                            }
                          );
                        }, 100);
                        that.applyLoading = false;
                      } catch (err) {
                        that.applyLoading = false;
                      }
                    }
                  }
                });
              }
            }
          });
        }
      }
    }
  }
};
</script>
