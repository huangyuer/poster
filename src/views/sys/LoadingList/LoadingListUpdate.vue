<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">
          <!-- <ep-button
            type="success"
            size="small"
            icon="edit"
            @click="doSave"
            :loading="saveLoading"
          >暂存</ep-button>
          <ep-button
            type="success"
            size="small"
            icon="checkmark-round"
            @click="Declare"
            :loading="applyLoading"
          >确认</ep-button>-->
          <WmsButton :loading="saveLoading" @click="doSave">暂存</WmsButton>
          <WmsButton :loading="applyLoading" @click="Declare">确认</WmsButton>
        </div>
        <ep-tabs active="装车单信息">
          <ep-tab-item name="装车单信息">
            <formInfo
              ref="formInfo"
              :bodyForm="bodyForm"
              :tableData="materialListData"
              :infoFlag="true"
            >
              <template slot="out-form">
                <!-- <ep-button type="primary" size="small" @click="doBodyAdd1" icon="plus-round">添加</ep-button> -->
                <!-- <ep-button type="danger" size="small" @click="doBodyDelect1(item)" icon="trash-a">删除</ep-button> -->
                <WmsButton @click="doBodyAdd1">添加</WmsButton>
              </template>
              <template slot="out-form1" slot-scope="item">
                <!-- <ep-button type="danger" size="small" @click="doBodyDelect1(item)" icon="trash-a">删除</ep-button> -->
                <wms-icon type="cancel" @click="doBodyDelect1(item)"></wms-icon>
              </template>
            </formInfo>
          </ep-tab-item>

          <ep-model height="800px" v-model="bonModelList" width="1250px" :wrap-close="false">
            <LoadingListAdd @listData="listDataFun" ref="LoadingListAdd" :searchType="false">
              <template slot="out-form">
                <ep-button type="primary" size="small" @click="dobindbill" icon="edit">绑定卡口验放凭证</ep-button>
              </template>
            </LoadingListAdd>
          </ep-model>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import misList from "src/common/mislist";
import { cloneObj } from "utils";
import LoadingListAdd from "./LoadingListAdd";
import formInfo from "./components/formInfo";
export default {
  name: "LoadingListUpdate", // 保持和文件名一致，否则keep-alive不会动态缓存
  extends: misList, // 务必继承
  components: {
    LoadingListAdd,
    formInfo,
  },
  computed: {},
  created() {},

  mounted() {
    console.log();
    let id = this.$route.query.id;
    this.id = id;
    this.findFormInfo();
  },
  data() {
    return {
      vehicleNo: "",
      flag: false,
      loading: false,
      bonModelList: false,
      listApi: "getSasPpBscAll",
      localType: "",
      saveLoading: false,
      applyLoading: false,
      isDeclare: false,
      doSavebtn: false,
      isno: false,
      materialListData: [],
      ep_data: [],
      id: "",
      settings: {
        pk: "id", // 主键
      },
      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1,
      },
      searchFormFather: {},
      searchForm: {
        // 筛选条件
        optStatus: "5",
        passportNo: "",
        passportTypecd: "",
      },
      bodyForm: {
        id: this.$route.query.id,
        packageListNo: "",
        orgId: this.$store.getters.getId,
        // packageListNo: '',
        vehicleNo: "",
        customCode: "2249",
        iePack: "",
        optStatus: "1",
        dclTypecd: "1",
        tradeName: this.$store.getters.getTradeName,
        weight: "",
      },
      //列表
      materialList: {
        id: "",
        sasPassportPreentNo: "",
        //  bondInvtNo:"",
        //  modfMarkcd:"3",
        //  rmk:""
      },
      materialListModel: false,
    };
  },
  watch: {
    materialListModel(e) {
      if (!e) {
        this.$refs.materialList.reset();
      }
    },
    "bodyForm.weight": {
      handler(newName, oldName) {
        if (
          newName !== null &&
          newName.charAt(0) == "0" &&
          newName.length > 1 &&
          newName.charAt(1) !== "."
        ) {
          this.$pop({
            type: "danger",
            message: "请输入正确的总重量",
          });
        }
        let reg = /^\d{0,13}(\.\d{0,5})?$/;
        if (!reg.test(newName)) {
          setTimeout(() => {
            this.bodyForm.weight = oldName;
          });
        }
      },
    },
  },
  methods: {
    listDataFun() {
      this.doBodyAdd1();
    },
    dobindbill() {
      let selectData = this.$refs.LoadingListAdd.$refs.table1.getShowData();
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条单子！",
        });
        return;
      }
      let data = [];
      selectData.forEach((el) => {
        // let passport = el.inExpType;
        // if (passport == '3') {
        //   passport = 'G';
        // } else if (passport == '6') {
        //   passport = 'D';
        // } else if (passport == '0' || passport == '5') {
        //   passport = '';
        // } else if (passport == '1' || passport == '2' || passport == '5') {
        //   passport = 'C';
        // }
        data.push({
          sasPassportPreentNo: el.preentNo,
          sasOptStatus: "5",
          passportTypecd: el.inExpType,
          customCode: "2249",
          ioTypecd: el.ieTypecd,
          rmk: el.id,
        });
      });

      this.materialListData = data;
      this.vehicleNo = selectData[0].vehicleNo;
      this.bonModelList = false;
    },

    iepackchange() {
      if (this.flag == false) {
        this.flag = true;
        return;
      }
      this.materialListData = [];
    },
    findFormInfo() {
      this.$post("pickRidePackageListInfo", { id: this.id }).then((res) => {
        console.log(res);
        let data = res.map.data;
        this.bodyForm.packageListNo = data.packageListNo;
        this.bodyForm.vehicleNo = data.vehicleNo;
        this.bodyForm.iePack = data.iePack;
        this.bodyForm.weight = data.weight;
        this.bodyForm.optStatus = data.optStatus;
        this.bodyForm.dclTypecd = data.dclTypecd;
        this.bodyForm.isConfirm = data.isConfirm;
        this.materialListData = res.map.data.packageSaspassport;
        console.log(this.bodyForm);
      });
    },
    doSave() {
      return new Promise((success, reject) => {
        this.$refs.formInfo.$refs["bodyForm"].validate((valid) => {
          if (valid) {
            // delete this.bodyForm.id
            // this.materialListData.forEach(e=>{
            //   delete e.id
            // })
            this.bodyForm.packageSaspassport = this.materialListData;
            if (this.materialListData.length > 0) {
              this.bodyForm.vehicleNo =
                this.vehicleNo || this.bodyForm.vehicleNo;
              this.bodyForm.iePack = this.materialListData[0].ioTypecd;
            }
            this.saveLoading = true;
            if (!this.bodyForm.weight) this.bodyForm.weight = "0";
            this.$post("pickRideUpdatePackageList", this.bodyForm)
              .then((res) => {
                success(res);
                console.log(res);
                // this.doSavebtn = true
                this.saveLoading = false;
                this.findFormInfo();
              })
              .catch((e) => {
                this.saveLoading = false;
                reject(e);
              });
          }
        });
      });
    },
    Declare() {
      //  if(this.doSavebtn){
      this.$confirm({
        word: "是否确认已装车？",
        callback: (errorInfo) => {
          if (errorInfo) {
            this.doSave().then((res) => {
              this.applyLoading = true;
              this.$post("pickRidePackageListDeclare", {
                bscIds: [Number(this.id)],
              })
                .then((res) => {
                  this.applyLoading = false;
                  this.findFormInfo();
                })
                .catch(() => {
                  this.applyLoading = false;
                });
            });
          }
        },
      });
      //  }else{
      //    this.$pop({
      //       type: "danger",
      //       message: "请先暂存！"
      //     });
      //     return;
      //  }
    },

    doBodyAdd1() {
      this.bonModelList = true;
      setTimeout(() => {
        console.log("------222", this.$refs.LoadingListAdd);
        let data = [];
        this.materialListData &&
          this.materialListData.forEach((el) => {
            let list = {
              orgId: this.bodyForm.orgId,
              preentNo: el.sasPassportPreentNo,
              inExpType: el.passportTypecd,
              vehicleNo: this.bodyForm.vehicleNo,
              ieTypecd: el.ioTypecd,
              id: el.rmk,
            };
            data.push(list);
          });

        this.$refs.LoadingListAdd.done = data;
      }, 100);
    },
    doBodyUpdate1() {
      let selectData = this.$refs.table.getData("select");
      if (selectData.length != 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
        return;
      }
      this.localType = "修改";
      this.materialListModel = true;
      this.materialList = selectData[0];
    },
    doBodyDelect1(refs) {
      console.log("------3-33", refs);
      // let selectData = refs.data.getData("select");
      let selectData = refs;

      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据",
        });
        return;
      }
      this.$confirm({
        word: "是否要删除所选条目信息！",
        callback: (errorInfo) => {
          if (errorInfo) {
            // refs.data.deleteSelectRow();
            // let selectData = refs.data.getData("none");
            // this.materialListData = selectData;
            let valArr = this.materialListData.filter((item) => {
              return item.sasPassportPreentNo != refs.data.sasPassportPreentNo;
            });
            this.materialListData = valArr;
          }
        },
      });
    },
    makeSure1(value) {
      this.$refs["materialList"].validate((valid) => {
        if (valid) {
          if (value == "添加") {
            let materialList = this.materialList;
            this.materialListData.push(cloneObj(materialList));
            this.materialListModel = false;
          }
          if (value == "修改") {
            let materialList = this.materialList;
            this.indexChange = this.$refs.table.getDataIndex("select")[0];
            this.materialListData.splice(
              this.indexChange,
              1,
              cloneObj(materialList)
            );
            this.materialListModel = false;
          }
        }
      });
    },
    closeModel() {
      this.materialListModel = false;
    },
  },
};
</script>
<style scoped>
.ep-collapse-item-content {
  padding: 0px;
  border: none;
}
</style>

