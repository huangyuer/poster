<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">
          <WmsButton @click="doSave" :loading="saveLoading">暂存</WmsButton>
          <WmsButton @click="declare(isDeclare)" :loading="applyLoading">确认</WmsButton>
          <!-- <ep-button type="success" size="small" @click="doSave" icon="edit" :loading="saveLoading">暂存</ep-button>
          <ep-button type="success" size="small" @click="declare(isDeclare)" icon="checkmark-round" :loading="applyLoading">确认</ep-button> -->
          <!-- <ep-button type="success" size="small" icon="plus-round" @click="addOther">新增</ep-button> -->
        </div>
        <ep-tabs active="卡口验放凭证表头">
          <ep-tab-item name="卡口验放凭证表头">
            <formheader ref="formheaders" :inExpTypeDisabled="saveDisabled" :bodyForm="bodyForm" @mtpckEndprdTypecdChangeU="change" @rltPortRecNoChangeU='rltPortRecNo'></formheader>
          </ep-tab-item>
          <ep-tab-item name="卡口验放凭证表体" v-if="creditCardStatus">
            <formbody ref="formbody" :listDataUpdata="tableDataUpdata" :updata="true" :dragEdit="bodyDrag" :dragFlag="dragBody" :stockBillNo="stockBillNo"> </formbody>
          </ep-tab-item>
          <ep-tab-item name="卡口验放凭证关联单证表" v-if="hidden">
            <formlated ref="formlated" :list1DateUpdata="containersUpdata" :updata="true" @changeLeatedEdit="changeLeated" :mtpckEndprdTypecd='mtpckEndprdTypecd' :rltPortRecNoValue='rltPortRecNoValue'></formlated>
          </ep-tab-item>
          <ep-tab-item name="关联出入库单证" v-if="formlatedInExpTypeShow">
            <formlatedInExpType ref="formlatedInExpType" :list2DataUpdata="table2DataUpdata" :updata="true" :dragFlag="dragType"></formlatedInExpType>
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import { cloneObj, getToken } from "utils";
import formheader from "./component/formheadr";
import formbody from "./component/formbody";
import formlated from "./component/formlated";
import formlatedInExpType from "./component/formlatedInExpType";
export default {
  name: "CreditCardReceiptUpdate",
  extends: misList, // 务必继承
  components: {
    formheader,
    formbody,
    formlated,
    formlatedInExpType,
  },
  data() {
    return {
      rltPortRecNoValue: "", // 业务申报编号
      mtpckEndprdTypecd: "", //料件成品标志
      stockBillNo: "", //拖拽生成的凭证编号
      bodyDrag: "", // 分送集报，查询页面是否存在
      dragBody: "", // 分送集报，表体是否可编辑
      dragType: "", // 分送集报，拖拽生成  关联单证是否可编辑
      bodyForm: {
        rltPortRecNo: "",
        id: "",
        orgId: this.$store.getters.getId,
        portNo: "", //凭证编号
        preentNo: "", // 预录入编号
        inExpWhNo: "", //ERP/WMS出入库编号
        inExpType: "", //ERP/WMS出入库类型    必填
        bizopEtpsNo: this.$store.getters.getTradeCode, // 经营企业编号    必填
        bizopEtpsNm: this.$store.getters.getTradeName, //经营单位名称    必填
        businessTypecd: "", //业务类别    必填
        inExpTime: "", //  ERP/WMS出入库日期
        mtpckEndprdTypecd: "", // 料件、成品标志   必填
        impexpPortcd: "", //进出境关别
        masterCuscd: this.$store.getters.getCustomId, //主管海关     必填
        // dclTime: "", //申报日期
        preRecAccountTime: "", // 预记入企业账户时间
        recAccountTime: "", //正式记入企业账户时间
        // invtIochkptStucd: "", // 进出卡口状态
        // recAccountFlag: "", //  是否记入企业账户标记
        rmk: "", // 备注
        // optStatus: "", // 操作状态
        rcvgdEtpsNm: "", // 境内收发货企业
        rcvgdEtpsNo: "", //境内收发货企业编号
        rcvgdEtpsSccd: "", //境内收发货企业社会信用代码
        vehicleNo: "", // 承运车车牌号
        // vehicleIcNo: "", // IC卡号
        containerNo: "", //集装箱号
        vehicleWt: "", //车自重   必填
        vehicleFrameNo: "", //车架号
        vehicleFrameWt: "", //车架重 必填
        containerType: "", //集装箱箱形
        containerWt: "", //集装箱重
        totalWt: "", //总重量 必填
        // passCollectWt: "", //卡口地磅采集重量
        // wtError: "", // 重量比对误差
        totalGrossWt: "", // 货物总毛重  必填
        totalNetWt: "", //货物总净重
        // passTime: "", //过卡时间1
        // secdPassTime: "", //过卡时间2
        // bindUsedTypecd: "", //分送集报标志
        bindTypecd: "", // 绑定类型
        ieTypecd: "", //进出标志   必填
        grtNo: "", // 总担保编号
      },
      saveLoading: false, //暂存loading
      applyLoading: false, //申报loading
      saveDisabled: true, // 暂存成功后，出入库类型，禁止修改
      isDeclare: false,
      headColor: true,
      model: false,
      tableDataUpdata: [], // 表体表格
      containersUpdata: [], // 关联单证表格数据
      table2DataUpdata: [],
      creditCardStatus: true, // 表体显示隐藏
      hidden: true,
      formlatedInExpTypeShow: true,
      pageLoad: true,
      firstLoad: false,
    };
  },
  computed: {
    countrys() {
      return this.$store.getters.getCountryList;
    },
    inExpTypeStatus() {
      return this.$store.getters.getInExpTypeStatusEdit;
    },
    bindTypecdState() {
      return this.$store.getters.getBindTypecdEdit;
    },
    clearDetatype() {
      return this.$store.getters.getClearDataEdit;
    },
    ieTypecdStatus() {
      // 进出标志
      return this.$store.getters.getIoTypecdStatusEdit;
    },
  },
  watch: {
    ieTypecdStatus: {
      handler(newIeType, oldIeType) {
        if (
          (newIeType == "I" && this.inExpTypeStatus == 7) ||
          (newIeType == "I" &&
            this.inExpTypeStatus == 8 &&
            this.bindTypecdState == 3) |
            (newIeType == "I" &&
              this.inExpTypeStatus == 9 &&
              this.bindTypecdState == 3)
        ) {
          this.creditCardStatus = true; //原代码
          this.hidden = true; //原代码
          this.formlatedInExpTypeShow = true;
        } else if (
          (newIeType == "E" && this.inExpTypeStatus == 7) ||
          (newIeType == "E" && this.inExpTypeStatus == 8) ||
          (newIeType == "E" && this.inExpTypeStatus == 9)
        ) {
          this.creditCardStatus = true; //原代码
          // this.formlatedInExpTypeShow = false;
          this.hidden = false;
          this.formlatedInExpTypeShow = true;
        }
      },
    },
    bindTypecdState: {
      handler(newData, oldData) {
        console.log(newData, "qqqqq");
        if (this.inExpTypeStatus == 0) {
          this.creditCardStatus = false;
          return;
        }
        if (newData == 1 || newData == 2) {
          this.creditCardStatus = false;
          this.hidden = true;
          this.formlatedInExpTypeShow = true;
        } else if (newData == 3) {
          // this.creditCardStatus = false; // 排序
          // this.hidden = false; // 排序
          // this.formlatedInExpTypeShow = false; // 排序
          // setTimeout(() => {
          this.creditCardStatus = true; //原代码
          this.hidden = true; //原代码
          this.formlatedInExpTypeShow = true; // 原代码
          // });
        } else if (
          (newData == null &&
            this.inExpTypeStatus == 7 &&
            this.ieTypecdStatus == "E") ||
          (this.inExpTypeStatus == 8 && this.ieTypecdStatus == "E") ||
          (this.inExpTypeStatus == 9 && this.ieTypecdStatus == "E")
        ) {
          this.creditCardStatus = true; //原代码
          this.hidden = false; //原代码
          this.formlatedInExpTypeShow = true; // 原代码
        } else if (
          (newData == null &&
            this.inExpTypeStatus == 7 &&
            this.ieTypecdStatus == "I") ||
          (this.inExpTypeStatus == 8 && this.ieTypecdStatus == "I") ||
          (this.inExpTypeStatus == 9 && this.ieTypecdStatus == "I")
        ) {
          this.creditCardStatus = true;
          this.hidden = true;
          this.formlatedInExpTypeShow = true;
        } else {
          this.creditCardStatus = false;
          this.hidden = false;
          this.formlatedInExpTypeShow = false;
        }
        if (
          (newData == 1 &&
            this.ieTypecdStatus == "I" &&
            this.inExpTypeStatus == 8) ||
          (newData == 2 &&
            this.ieTypecdStatus == "I" &&
            this.inExpTypeStatus == 8) ||
          (newData == 1 &&
            this.ieTypecdStatus == "I" &&
            this.inExpTypeStatus == 9) ||
          (newData == 2 &&
            this.ieTypecdStatus == "I" &&
            this.inExpTypeStatus == 9)
        ) {
          this.creditCardStatus = false;
          this.hidden = true;
          this.formlatedInExpTypeShow = true;
        }
      },
      immediate: true,
      deep: true,
    },

    inExpTypeStatus: {
      handler(newData, oldData) {
        console.log("leixng", newData, oldData);
        if (newData == 0) {
          console.log("leixng1");
          this.creditCardStatus = false;
          this.hidden = false;
          this.formlatedInExpTypeShow = false;
        } else if (newData == 3) {
          console.log("leixng2");
          this.hidden = false;
          this.creditCardStatus = true;
          this.formlatedInExpTypeShow = true;
        } else if (this.bindTypecdState == 1 || this.bindTypecdState == 2) {
          console.log("leixng3");
          this.creditCardStatus = false;
        } else if (
          newData == 1 ||
          newData == 2 ||
          newData == 4 ||
          newData == 5 ||
          newData == 6 ||
          (newData == 7 && this.ieTypecdStatus == "I") ||
          (newData == 8 && this.ieTypecdStatus == "I") ||
          (newData == 9 && this.ieTypecdStatus == "I")
        ) {
          console.log("leixng4");
          this.hidden = true;
          this.creditCardStatus = true;
          this.formlatedInExpTypeShow = true;
        } else if (
          (newData == 7 && this.ieTypecdStatus == "E") ||
          (newData == 8 && this.ieTypecdStatus == "E") ||
          (newData == 9 && this.ieTypecdStatus == "E")
        ) {
          this.formlatedInExpTypeShow = true;

          this.creditCardStatus = true;
          this.hidden = false;
        } else {
          console.log("aaaaaaaaaa");
          this.hidden = true;
          this.creditCardStatus = true;
          this.formlatedInExpTypeShow = true;
        }
      },
      immediate: true,
      deep: true,
    },
    clearDetatype: {
      handler(newName, oldName) {
        console.log("清空数据");
        if (this.firstLoad) {
          console.log("fashenggain");
          this.tableDataUpdata = [];
          this.table2DataUpdata = [];
          this.containersUpdata = [];
        }
        this.firstLoad = true;
      },
      immediate: true,
      deep: true,
    },
  },
  created() {},
  mounted() {
    let id = this.$route.query.id;
    this.againDate(id);
    console.log(id);
  },
  methods: {
    rltPortRecNo(value) {
      console.log("addd---", value);

      this.rltPortRecNoValue = value;
    },
    change(value) {
      console.log("addd---", value);
      this.mtpckEndprdTypecd = value;
    },
    changeLeated() {
      this.tableDataUpdata = [];
    },
    againDate(id) {
      this.$post("protReleasegetDetail", { id: id }).then((res) => {
        // 表头数据
        this.bodyForm = res.map.data;
        this.rltPortRecNoValue = this.bodyForm.rltPortRecNo;
        // this.mtpckEndprdTypecd = this.bodyForm.mtpckEndprdTypecd;
        // 表体数据回填
        if (this.bodyForm.dragType == 1) {
          this.dragType = false;
        } else {
          this.dragType = "";
        }

        let formbodyTable = res.map.data.portReleaseDt;
        this.tableDataUpdata = formbodyTable;
        console.log("this.tableDataUpdata", this.tableDataUpdata);
        // 关联单证表体数据回填;
        let formlatedTable = res.map.data.portReleaseRlt;
        this.containersUpdata = formlatedTable;
        // 关联出入库单证
        this.table2DataUpdata = res.map.data.portReleaseInexpRlt;
        if (this.bodyForm.dragType == 1) {
          if (this.table2DataUpdata.length == 1) {
            this.bodyDrag = true;
            this.dragBody = true;
            this.stockBillNo = this.bodyForm.inExpWhNo;
          } else {
            this.dragBody = false;
            this.bodyDrag = false;
          }
        } else {
          this.bodyDrag = false;
        }
        if (res.map.data.bindTypecd == 3 || this.bodyForm.inExpType == 7) {
          let obj = res.map.data.portReleaseRlt[0];
          console.log("设置关联单证");
          sessionStorage.setItem("formlated1", JSON.stringify(obj));
        } else {
          sessionStorage.removeItem("formlated1");
        }
        this.$store.dispatch("changeinExpTypeEdit", "");
        this.$store.dispatch("changeBindTypecdEdit", "");
        this.$store.dispatch("changeIoTypecdStatusEdit", "");
        if (this.pageLoad) {
          setTimeout(() => {
            this.$store.dispatch(
              "changeinExpTypeEdit",
              this.bodyForm.inExpType
            );
            this.$store.dispatch(
              "changeBindTypecdEdit",
              this.bodyForm.bindTypecd
            );
            this.$store.dispatch(
              "changeIoTypecdStatusEdit",
              this.bodyForm.ieTypecd
            );
          }, 10);
        } else {
          this.$store.dispatch("changeinExpTypeEdit", this.bodyForm.inExpType);
          this.$store.dispatch(
            "changeBindTypecdEdit",
            this.bodyForm.bindTypecd
          );
          this.$store.dispatch(
            "changeIoTypecdStatusEdit",
            this.bodyForm.ieTypecd
          );
        }
      });
    },
    //暂存
    doSave() {
      // 表头form数据
      let bodyForm = this.$refs.formheaders.bodyForm;
      console.log("formheaders", this.$refs.formheaders.bodyForm);
      // this.$refs["bodyForm"]
      this.$refs.formheaders.$refs["bodyForm"].validate((valid) => {
        if (valid) {
          let bodyFormCopy = cloneObj(bodyForm);

          bodyFormCopy["portReleaseDt"] = this.$refs.formbody
            ? this.$refs.formbody.tableDataCopyUpdata
            : this.tableDataUpdata;
          // 关联单证表
          bodyFormCopy["portReleaseRlt"] = this.$refs.formlated
            ? this.$refs.formlated.table1DataUpdata
            : this.containersUpdata;
          // 关联出入库单证
          bodyFormCopy["portReleaseInexpRlt"] = this.$refs.formlatedInExpType
            ? this.$refs.formlatedInExpType.tableDataUpdata
            : this.table2DataUpdata;
          if (
            this.inExpTypeStatus == 7 &&
            this.ieTypecdStatus == "I" &&
            bodyFormCopy["portReleaseRlt"].length != 0
          ) {
            bodyFormCopy.rltPortRecNo = bodyFormCopy["portReleaseRlt"][0].rltNo;
            // let whareHouse = JSON.parse(sessionStorage.getItem("formlated1"));
            // if (whareHouse.grtNo) {
            //   bodyFormCopy.grtNo = whareHouse.grtNo;
            // }
          } else if (
            this.inExpTypeStatus == 7 &&
            this.ieTypecdStatus == "I" &&
            bodyFormCopy["portReleaseRlt"].length == 0
          ) {
            bodyFormCopy.rltPortRecNo = "";
          }
          this.saveLoading = true;
          this.$post("addProtRelease", bodyFormCopy)
            .then((res1) => {
              this.saveLoading = false;
              this.isDeclare = true;
              bodyForm.id = res1.map.data;
              this.saveDisabled = true;
              this.pageLoad = false;

              this.againDate(bodyForm.id);
              // this.$pop({
              //   type: "success",
              //   message: "暂存成功"
              // });
            })
            .catch(() => {
              this.saveLoading = false;
            });
        } else {
          this.$pop({
            type: "danger",
            message: "表单验证失败!",
          });
          return;
        }
      });
    },
    // 申报
    declare(isDeclare) {
      if (!isDeclare) {
        this.$pop({
          type: "danger",
          message: "请先暂存",
        });
        return;
      }
      let bodyForm = this.$refs.formheaders.bodyForm;

      this.$refs.formheaders.$refs["bodyForm"].validate((valid) => {
        if (!valid) {
          this.$pop({
            type: "danger",
            message: "表单验证失败",
          });
          return;
        } else {
          let bodyFormCopy = cloneObj(bodyForm);
          // 表体
          bodyFormCopy["portReleaseDt"] = this.$refs.formbody
            ? this.$refs.formbody.tableDataCopyUpdata
            : this.tableDataUpdata;
          // 关联单证表
          bodyFormCopy["portReleaseRlt"] = this.$refs.formlated
            ? this.$refs.formlated.table1DataUpdata
            : this.containersUpdata;
          // 关联出入库单证
          bodyFormCopy["portReleaseInexpRlt"] = this.$refs.formlatedInExpType
            ? this.$refs.formlatedInExpType.tableDataUpdata
            : this.table2DataUpdata;
          if (
            this.inExpTypeStatus == 7 &&
            this.ieTypecdStatus == "I" &&
            bodyFormCopy["portReleaseRlt"].length != 0
          ) {
            bodyFormCopy.rltPortRecNo = bodyFormCopy["portReleaseRlt"][0].rltNo;
            // let whareHouse = JSON.parse(sessionStorage.getItem("formlated1"));
            // if (whareHouse.grtNo) {
            //   bodyFormCopy.grtNo = whareHouse.grtNo;
            // }
          } else if (
            this.inExpTypeStatus == 7 &&
            this.ieTypecdStatus == "I" &&
            bodyFormCopy["portReleaseRlt"].length == 0
          ) {
            bodyFormCopy.rltPortRecNo = "";
          }
          let vm = this;
          this.$confirm({
            word: "是否要确认？",
            async callback(info) {
              if (info) {
                try {
                  let data = bodyFormCopy;
                  vm.applyLoading = true;
                  console.log("保存数据", data);
                  let result = await vm.$post("addProtRelease", data);
                  let id = String(data.id);
                  let response = await vm.$post("portReleasedeclare", {
                    bscIds: [id],
                  });
                  vm.applyLoading = false;
                  vm.pageLoad = false;
                  vm.againDate(id);
                } catch (err) {
                  vm.applyLoading = false;
                  console.log(err);
                }
              }
            },
          });
        }
      });
    },
  },
};
</script>
