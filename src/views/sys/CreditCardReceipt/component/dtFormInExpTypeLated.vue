<template>
  <div>
    <div>
      <ep-model title="关联单证" v-model="model1" width="800px" :wrap-close="false">
        <ep-form ref="portReleaseInexpRltForm" :form="portReleaseInexpRltForm" name-width="163px" :rules="page_rules">
          <ep-row :gutter="7">
            <ep-col :col="20">
              <ep-form-item attr="preentNo" label="凭证编号">
                <ep-input v-model="portReleaseInexpRltForm.preentNo" name="preentNo" :maxlength="64" disabled></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="20">
              <ep-form-item attr="inExpWhNo" label="ERP/WMS出入库编号">
                <ep-input v-model="portReleaseInexpRltForm.inExpWhNo" name="inExpWhNo" :maxlength="64" :disabled="disabledFlag"></ep-input>
              </ep-form-item>
            </ep-col>

            <ep-col :col="20">
              <ep-form-item attr="inExpTime" label="ERP/WMS出入库日期">
                <ep-date v-model="portReleaseInexpRltForm.inExpTime" name="inExpTime" type="dateTime" :disabled="disabledFlag"></ep-date>
              </ep-form-item>
            </ep-col>
            <ep-col :col="20">
              <ep-form-item label="备注" attr="rmk">
                <ep-input v-model.trim="portReleaseInexpRltForm.rmk" name="rmk" :maxlength="400" type="textarea" :disabled="disabledFlag"></ep-input>
              </ep-form-item>
            </ep-col>
          </ep-row>
          <div style="text-align: center;" v-if="!disabledFlag">
            <WmsButton @click="addOtherClare">确认</WmsButton>

            <!-- <ep-button type="primary" size="small" @click="addOtherClare" icon="checkmark-round">确认</ep-button> -->
          </div>
        </ep-form>
      </ep-model>
      <!--表格-->
      <div class="ep-card card-margin relative">
        <div class="card-body">
          <div class="block" v-if="(optStatus == '5' &&inexpRltTypes != 1) || (optStatus == '51'&&inexpRltTypes != 1)">
            <WmsButton style="margin:0" @click="addOther">新增</WmsButton>
            <WmsButton @click="doDeclare">确认</WmsButton>

            <!-- <ep-button type="success" size="small" @click="addOther" icon="plus-round">新增</ep-button> -->
            <!-- <ep-button type="primary" size="small" @click="doUpdate" icon="edit">修改</ep-button> -->
            <!-- <ep-button type="primary" @click="doDeclare" size="small" :loading="applyLoading" icon="checkmark-round">确认</ep-button> -->
            <!-- <ep-button type="danger" size="small" icon="trash-a" @click="doDelete">删除</ep-button> -->
          </div>
          <div class="block">
            <ep-table ref="table" border :height="400" :data="dtFormInExpTypeLatedListData" @selection-change="handleSelect1" :loading="loading" :head-color="headColor" @row-dblclick="select2Info">
              <!-- <ep-table-item type="select" v-if="declareRadio"></ep-table-item> -->
              <ep-table-item column="opt" title="操作" width="200" v-if="(optStatus == '5' &&inexpRltTypes != 1) || (optStatus == '51'&&inexpRltTypes != 1)">
                <template slot-scope="props">
                  <!-- <wms-icon v-if="optStatus == '5' || optStatus == '51'" type="edit" @click="doUpdate(props.row,props.row.id)"></wms-icon> -->
                  <wms-icon v-if="optStatus == '5' || optStatus == '51'" type="cancel" @click="doDelete(props.row,props.row.id)"></wms-icon>
                  <!-- <wms-icon v-if="optStatus == '5' || optStatus == '51'" type="confirm" @click="doDeclare(props.row,props.row.id)"></wms-icon> -->
                </template>
              </ep-table-item>
              <ep-table-item column="preentNo" width="240" title="凭证编号"></ep-table-item>
              <ep-table-item column="inExpWhNo" title="ERP/WMS出入库编号" width="300"></ep-table-item>
              <ep-table-item column="inExpTime" title="ERP/WMS出入库日期" width="200"></ep-table-item>
              <ep-table-item column="rmk" title="备注">
                <template slot-scope="props">
                  <p class="rmk-style">{{ props.row.rmk }}</p>
                </template>
              </ep-table-item>
            </ep-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import misList from "src/common/mislist";
import { cloneObj, getToken } from "utils";
import mixin from "../mixin";
export default {
  extends: misList, // 务必继承
  mixins: [mixin],
  components: {},
  props: {
    dtFormInExpTypeLatedList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    optStatus: {
      default: ""
    },
    inexpRltType: {
      default: ""
    }
    // inexpRltPid: {
    //   type: String,
    //   default: function () {
    //     return "";
    //   },
    // },
    // inexpRltPreentNo: {
    //   type: String,
    //   default: function () {
    //     return "";
    //   },
    // },
  },
  data() {
    return {
      inexpRltTypes: this.inexpRltType,
      rltFlag: true,
      dtFormInExpTypeLatedListData: this.dtFormInExpTypeLatedList,
      applyLoading: false,
      sureLoading: false,
      declareRadio: true,
      loading: false,
      model2: false,
      inexpRltPreentNo: "",
      inexpRltPid: "",
      headColor: true,
      selectItems: [],
      info: "",
      portReleaseInexpRltForm: {
        id: "",
        pid: this.inexpRltPid,
        orgId: this.$store.getters.getId,
        preentNo: this.inexpRltPreentNo,
        inExpWhNo: "",
        inExpTime: "",
        rmk: ""
      },
      model1: false,
      loading: false,
      disabledFlag: true,
      page_rules: {
        inExpWhNo: { required: true, message: "不能为空", trigger: "change" },
        inExpTime: {
          required: true,
          message: "不能为空",
          trigger: "change"
        }
      }
    };
  },
  watch: {},
  created() {
    this.getFormData1();
  },
  computed: {},
  mounted() {},
  methods: {
    handleSelect1(val) {
      this.selectLength = val.length;
      this.selectItems = val;
    },

    select2Info(event, row, index) {
      this.portReleaseInexpRltForm = row;
      this.model1 = true;
      this.disabledFlag = true;
    },
    close1Model() {
      this.model1 = false;
    },
    //调接口
    addOtherClare(info) {
      this.$refs["portReleaseInexpRltForm"].validate(valid => {
        if (!valid) {
          this.$pop({
            type: "danger",
            message: "表单验证失败"
          });
          return;
        } else {
          //新增
          if (this.info == 1) {
            // data["id"] = this.$route.query.id;
            //console.log(this.portReleaseInexpRltForm);
            let bodyForm = this.portReleaseInexpRltForm;
            let data = cloneObj(bodyForm);

            this.$post("portReleasesaveInexpRlt", data).then(res => {
              this.model1 = false;
              this.dtFormInExpTypeLatedListData.push(cloneObj(bodyForm));
              this.getFormData();
            });
          }
          //修改
          if (this.info == 2) {
            let portReleaseInexpRltForm = this.dtFormInExpTypeLatedListData[0];

            let portReleaseInexpRltFormCopy = cloneObj(portReleaseInexpRltForm);

            let bodyForm = this.portReleaseInexpRltForm;
            let data = cloneObj(bodyForm);
            this.$post("portReleaseupdInexpRlt", data).then(res => {
              this.model1 = false;
              this.dtFormInExpTypeLatedListData.push(cloneObj(bodyForm));
              this.getFormData();
              // this.$pop({
              //   type: "success",
              //   message: "修改成功",
              // });
            });
          }
        }
      });
    },
    //新增
    addOther() {
      this.model1 = true;
      this.disabledFlag = false;
      this.info = 1;
      this.portReleaseInexpRltForm.id = "";
      this.portReleaseInexpRltForm.inExpWhNo = "";
      this.portReleaseInexpRltForm.inExpTime = "";
      this.portReleaseInexpRltForm.rmk = "";
      // console.log(
      //   this.portReleaseInexpRltForm.pid,
      //   this.portReleaseInexpRltForm.preentNo,
      //   "999999"
      // );
    },

    //修改
    doUpdate(row) {
      let selectData = row;
      // if (selectData.length === 0 || selectData.length > 1) {
      //   this.$pop({
      //     type: "danger",
      //     message: "请选择一条数据"
      //   });
      // } else {
      //console.log(selectData[0].id);
      this.model1 = true;
      this.disabledFlag = false;
      let inexpId = row.id;
      let dtFormInExpTypeLated1 = this.dtFormInExpTypeLatedListData.find(
        item => item.id == inexpId
      );
      console.log(dtFormInExpTypeLated1);
      this.portReleaseInexpRltForm = dtFormInExpTypeLated1;
      this.info = 2;
      // }
    },
    //确认
    doDeclare(row) {
      let vm = this;
      console.log(this.rltFlag);
      if (this.rltFlag) {
        let data = {};
        data["bscId"] = this.$route.query.id;
        this.$confirm({
          word: "是否要确认？",
          callback(info) {
            if (info) {
              //vm.declareLoading = true;

              vm.$post("portReleasedeclareInexpRlt", data)
                .then(responseData => {
                  //vm.refresh(true);
                  vm.getFormData();
                })
                .catch(e => {});
            }
          }
        });
      } else {
        this.$pop({
          type: "danger",
          message: "暂无数据进行确认"
        });
      }
      //let selectData = this.$refs.table.getData("select");
      // let selectData = this.selectItems;
      // console.log(selectData);
      // if (selectData.length == 0) {
      //   this.$pop({
      //     type: "danger",
      //     message: "请选择数据",
      //   });
      //   return;
      // } else {
      //   // let id = [];
      //   // selectData.forEach((item) => {
      //   //   id.push(item.pid);
      //   // });
      //   // let ids = id.join();

      //}
    },
    cancel() {
      this.model2 = false;
      this.loading = false;
      this.radio = "Y";
    },
    //删除
    doDelete(row) {
      let selectData = [row];
      // if (selectData.length == 0) {
      //   this.$pop({
      //     type: "danger",
      //     message: "请选择数据"
      //   });
      //   return;
      // }

      this.$confirm({
        word: "是否要删除所选条目信息！",
        callback: errorInfo => {
          if (errorInfo) {
            let id = [];
            selectData.forEach(item => {
              id.push(item.id);
            });
            let ids = id.join();
            // let SasPpBscIds = [];
            // selectData.forEach((c) => {
            //   if (c.id) {
            //     SasPpBscIds.push(c.id);
            //   }
            // });
            let data = {};
            data["ids"] = ids;
            this.$post("portReleasedelInexpRlt", data)
              .then(responseData => {
                this.refresh(true);
                this.$pop({
                  type: "success",
                  message: "删除成功"
                });
              })
              .catch(e => {
                this.loading = false;
              });
          } else {
            return;
          }
        }
      });
    },
    //详情
    getFormData() {
      let data = {};
      data["id"] = this.$route.query.id;
      this.$post("protReleasegetDetail", data)
        .then(responseData => {
          this.dtFormInExpTypeLatedListData =
            responseData.map.data.portReleaseInexpRlt;
          let portReleaseInexpRltFlag =
            responseData.map.data.portReleaseInexpRlt;
          this.inexpRltTypes = responseData.map.data.inexpRltType;
          this.$emit("childrenClick", responseData.map.data.portReleaseStatus);
          if (portReleaseInexpRltFlag.length == 0) {
            this.rltFlag = false;
          } else {
            this.rltFlag = true;
          }
          //this.$router.go(0);
        })
        .catch(e => {});
    },
    getFormData1() {
      let data = {};
      data["id"] = this.$route.query.id;
      this.$post("protReleasegetDetail", data)
        .then(responseData => {
          let inexpRltPreentNo1 = responseData.map.data.preentNo;
          this.portReleaseInexpRltForm.preentNo = inexpRltPreentNo1;
          let inexpRltPid1 = responseData.map.data.id;
          this.portReleaseInexpRltForm.pid = inexpRltPid1;
          let portReleaseInexpRltFlag =
            responseData.map.data.portReleaseInexpRlt;
          if (portReleaseInexpRltFlag.length == 0) {
            this.rltFlag = false;
          } else {
            this.rltFlag = true;
          }
          //this.dtFormInExpTypeLated = responseData.map.data.portReleaseInexpRlt;
          //this.$router.go(0);
        })
        .catch(e => {});
    }
  }
};
</script>
