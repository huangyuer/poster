<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block"></div>
        <ep-tabs active="装车单信息">
          <ep-tab-item name="装车单信息">
            <formInfo
              ref="formInfo"
              :bodyForm="bodyForm"
              :tableData="materialListData"
              :infoFlag="false"
            ></formInfo>
          </ep-tab-item>
          <ep-tab-item name="操作记录">
            <!--表格-->
            <optStatus ref="table" :tableData="tableData"></optStatus>
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import misList from "src/common/mislist";
import { cloneObj } from "utils";
import optStatus from "./components/optStatus";
import formInfo from "./components/formInfo";

export default {
  name: "LoadingListDtInfo", // 保持和文件名一致，否则keep-alive不会动态缓存
  extends: misList, // 务必继承
  components: { optStatus, formInfo },
  computed: {
    tradeInfo() {
      return this.$store.getters.getCustomList;
    },
    unitList() {
      return this.$store.getters.getUnitList;
    }
  },
  created() {},
  mounted() {
    console.log();
    let id = this.$route.query.id;
    this.id = id;
    this.findFormInfo();
  },
  data() {
    return {
      loading: false,
      localType: "",
      saveLoading: false,
      applyLoading: false,
      isDeclare: false,
      doSavebtn: false,
      tableData: [],
      materialListData: [],
      carVehicle: [],
      id: "",
      bodyForm: {
        orgId: this.$store.getters.getId,
        // userId:this.$store.getters.getUserId,
        vehicleNo: "",
        customCode: "",
        iePack: "",
        optStatus: "1",
        packageListNo: "",
        packageSaspassport: []
      },
      //列表
      materialList: {
        sasPassportPreentNo: ""
        //  bondInvtNo:"",
        //  modfMarkcd:"3",
        //  rmk:""
      },
    };
  },
  watch: {
    materialListModel(e) {
      if (!e) {
        this.$refs.materialList.reset();
      }
    }
  },
  methods: {
    findFormInfo() {
      this.$post("pickRidePackageListInfo", { id: this.id }).then(res => {
        console.log(res);
        this.bodyForm = res.map.data;
        this.materialListData = res.map.data.packageSaspassport;
        this.tableData = res.map.data.packageListStatus;
      });
    },

  }
};
</script>
<style scoped>
.ep-collapse-item-content {
  padding: 0px;
  border: none;
}
</style>

