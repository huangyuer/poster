<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">
          <WmsButton @click="doSave" :loading="saveLoading">暂存</WmsButton>
          <WmsButton @click="declare(isDeclare)">确认</WmsButton>
          <WmsButton @click="addOther">新增</WmsButton>

          <!-- <ep-button type="success" size="small" @click="doSave" icon="edit" :loading="saveLoading">暂存</ep-button> -->
          <!-- <ep-button type="success" size="small" @click="declare(isDeclare)" icon="checkmark-round" :loading="applyLoading">确认</ep-button> -->
          <!-- <ep-button type="success" size="small" icon="plus-round" @click="addOther">新增</ep-button> -->
        </div>
        <ep-tabs ref="sortTabs" active="卡口验放凭证表头">
          <ep-tab-item name="卡口验放凭证表头">
            <formheader ref="formheaders" :inExpTypeDisabled="saveDisabled" :bodyForm="bodyForm" @mtpckEndprdTypecdChangeAdd="change" @rltPortRecNoChangeAdd="rltPortRecNo"></formheader>
          </ep-tab-item>
          <ep-tab-item name="卡口验放凭证表体" v-if="creditCardStatus">
            <formbody ref="formbody" :listData="tableData"></formbody>
          </ep-tab-item>
          <ep-tab-item name="卡口验放凭证关联单证表" v-if="hidden">
            <formlated ref="formlated" :list1Date="table1Data" @changeLeated="changeLeated" :mtpckEndprdTypecd='mtpckEndprdTypecd' :rltPortRecNoValue='rltPortRecNoValue'></formlated>
          </ep-tab-item>
          <ep-tab-item name="关联出入库单证" v-if="formlatedInExpTypeShow">
            <formlatedInExpType ref="formlatedInExpType" :list2Data="table2Data"></formlatedInExpType>
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
  name: "CreditCardReceiptAdd",
  extends: misList, // 务必继承
  components: {
    formheader,
    formbody,
    formlated,
    formlatedInExpType,
  },
  data() {
    return {
      rltPortRecNoValue: "", //业务申报编号
      mtpckEndprdTypecd: "", //料件成品标志
      bodyForm: {
        rltPortRecNo: "",
        id: "",
        orgId: this.$store.getters.getId,
        portNo: "", //凭证编号
        preentNo: "", // 预录入编号
        inExpWhNo: "", //ERP/WMS出入库编号
        inExpType: "", //ERP/WMS出入库类型    必填
        bizopEtpsSccd: this.$store.getters.getCreditCode,
        bizopEtpsNo: this.$store.getters.getTradeCode, // 经营企业编号    必填
        bizopEtpsNm: this.$store.getters.getTradeName, //经营单位名称    必填
        businessTypecd: "", //业务类别    必填
        inExpTime: "", //  ERP/WMS出入库日期
        mtpckEndprdTypecd: "", // 料件、成品标志   必填
        impexpPortcd: "2248", //进出境关别
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
        dclTypecd: "1",
      },
      saveDisabled: false, // 暂存成功后，出入库类型，禁止修改
      saveLoading: false, //暂存loading
      applyLoading: false, //申报loading
      isDeclare: false,
      headColor: true,
      model: false,
      tableData: [], // 表体表格
      table1Data: [], // 关联单证表数据
      containers: [],
      saveStatus: 0, //  0第一次暂存， 1 暂存过一次，调用修改接口,
      creditCardStatus: null, // 表体显示隐藏
      hidden: null,
      formlatedInExpTypeShow: true, //  关联出入库单证
      table2Data: [],
      guanLianArr: [], //关联单证数据
      bodyArr: [], // 表体数据
      danzhengArr: [], // 单证数据
    };
  },
  watch: {
    ieTypecdStatus: {
      handler(newIeType, oldIeType) {
        if (
          (newIeType == "I" && this.inExpTypeStatus == 7) ||
          (newIeType == "I" &&
            this.inExpTypeStatus == 8 &&
            this.bindTypecdState == 3) ||
          (newIeType == "I" && this.inExpTypeStatus == 9)
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
          (this.inExpTypeStatus == 8 && this.ieTypecdStatus == "E") ||
          (this.inExpTypeStatus == 7 && this.ieTypecdStatus == "E")
        ) {
          this.creditCardStatus = true; //原代码
          this.hidden = false; //原代码
          this.formlatedInExpTypeShow = true; // 原代码
        }
        if (
          (newData == 1 &&
            this.ieTypecdStatus == "I" &&
            this.inExpTypeStatus == 8) ||
          (newData == 2 &&
            this.ieTypecdStatus == "I" &&
            this.inExpTypeStatus == 8)
        ) {
          this.creditCardStatus = false;
          this.hidden = true;
          this.formlatedInExpTypeShow = true;
        }
        // else if(newData==null&&this.inExpTypeStatus==7&&this.ieTypecdStatus=="E"){
        //   this.creditCardStatus = true; //原代码
        //   this.hidden = false; //原代码
        //   this.formlatedInExpTypeShow = true; // 原代码
        // } else if(newData==null&&this.inExpTypeStatus==7&&this.ieTypecdStatus=="I"){
        //   this.creditCardStatus = true;
        //   this.hidden = true;
        //   this.formlatedInExpTypeShow = true;
        // }
      },
      immediate: true,
      deep: true,
    },

    inExpTypeStatus: {
      handler(newData, oldData) {
        console.log("leixng", newData, oldData);
        if (newData == 0) {
          setTimeout(() => {
            this.creditCardStatus = false;
            this.hidden = false;
            this.formlatedInExpTypeShow = false;
          });
        } else if (newData == 3) {
          console.log("leixng2");
          this.hidden = false;
          // this.creditCardStatus = false;
          // this.formlatedInExpTypeShow = false;
          // setTimeout(() => {
          this.creditCardStatus = true;
          this.formlatedInExpTypeShow = true;
          // });
        }
        // else if(newData==7 && this.ieTypecdStatus=="I" ) {
        //    this.creditCardStatus = true; //原代码
        //   this.hidden = true; //原代码
        //   this.formlatedInExpTypeShow = true;
        // }
        else if (this.bindTypecdState == 1 || this.bindTypecdState == 2) {
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
          // this.creditCardStatus = false; // 排序
          // this.hidden = false; // 排序
          // this.formlatedInExpTypeShow = false; // 排序
          // setTimeout(() => {
          this.creditCardStatus = true; //原代码
          this.hidden = true; //原代码
          this.formlatedInExpTypeShow = true; // 原代码
          // });
        } else if (
          (newData == 7 && this.ieTypecdStatus == "E") ||
          (newData == 8 && this.ieTypecdStatus == "E") ||
          (newData == 9 && this.ieTypecdStatus == "E")
        ) {
          this.hidden = false;
          this.formlatedInExpTypeShow = true;
          this.creditCardStatus = true;
        } else {
          this.creditCardStatus = true;
          this.hidden = true;
          this.formlatedInExpTypeShow = true;
        }
      },
      immediate: true,
      deep: true,
    },
    clearDetatype: {
      handler(newName, oldName) {
        console.log("清空数据");
        console.log("fashenggain");
        this.tableData = [];
        this.table2Data = [];
        this.table1Data = [];
        this.bodyArr = [];
        this.guanLianArr = [];
        this.danzhengArr = [];
      },
      immediate: true,
      deep: true,
    },
  },
  created() {},
  mounted() {
    this.$store.dispatch("changeinExpType", "");
    console.log("tis,aaaaaaaa", "");
    this.$store.dispatch("changeBindTypecd", "");
    this.$store.dispatch("changeIoTypecdStatus", "");
  },
  computed: {
    countrys() {
      return this.$store.getters.getCountryList;
    },
    inExpTypeStatus() {
      return this.$store.getters.getInExpTypeStatus;
    },
    bindTypecdState() {
      return this.$store.getters.getBindTypecd;
    },
    ieTypecdStatus() {
      // 进出标志
      return this.$store.getters.getIoTypecdStatus;
    },
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
      this.tableData = [];
    },
    // tabs 排序

    // 暂存
    doSave() {
      let api = "";
      if (this.saveStatus == 0) {
        api = "addProtRelease";
      } else {
        api = "updProtRelease";
      }
      // 表头form数据
      let bodyForm = this.$refs.formheaders.bodyForm;
      console.log("formheaders", this.$refs.formheaders.bodyForm);
      // this.$refs["bodyForm"]
      this.$refs.formheaders.$refs["bodyForm"].validate((valid) => {
        if (valid) {
          let emptyObject = [];
          let bodyFormCopy = cloneObj(bodyForm);
          //  表体数据
          bodyFormCopy["portReleaseDt"] = this.$refs.formbody
            ? this.$refs.formbody.tableDataCopy
            : this.bodyArr;
          // 关联单证表
          bodyFormCopy["portReleaseRlt"] = this.$refs.formlated
            ? this.$refs.formlated.table1Data
            : this.guanLianArr;
          // 关联出入库单证
          bodyFormCopy["portReleaseInexpRlt"] = this.$refs.formlatedInExpType
            ? this.$refs.formlatedInExpType.tableData
            : this.danzhengArr;
          if (
            this.inExpTypeStatus == 7 &&
            this.ieTypecdStatus == "I" &&
            bodyFormCopy["portReleaseRlt"].length != 0
          ) {
            bodyFormCopy.rltPortRecNo = bodyFormCopy["portReleaseRlt"][0].rltNo;
            // let whareHouse = JSON.parse(sessionStorage.getItem("formlated"));
            // if (whareHouse && whareHouse.grtNo) {
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
          console.log("bodyFormCopy", bodyFormCopy);
          this.$post(api, bodyFormCopy)
            .then((res1) => {
              this.saveLoading = false;
              this.isDeclare = true;
              this.saveDisabled = true;
              this.saveStatus += 1;
              bodyForm.id = res1.map.data;
              this.againDate(res1.map.data + "");
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

    againDate(id) {
      this.$post("protReleasegetDetail", { id: id }).then((res) => {
        if (res.map.data) {
          // 表头数据
          let data = res.map.data;
          this.bodyForm = data;
          // 表体数据回填
          setTimeout(() => {
            this.tableData = data.portReleaseDt;
          }, 100);
          this.bodyArr = cloneObj(data.portReleaseDt);
          // 关联单证表体数据回填;
          this.table1Data = data.portReleaseRlt;
          this.guanLianArr = cloneObj(this.table1Data);
          // 关联出入库单证
          this.table2Data = data.portReleaseInexpRlt;
          this.danzhengArr = cloneObj(this.table2Data);
          this.$store.dispatch("changeinExpType", "");
          console.log("tis,aaaaaaaa", this.$store.getters.getInExpTypeStatus);
          this.$store.dispatch("changeBindTypecd", "");
          this.$store.dispatch("changeIoTypecdStatus", "");
          this.$store.dispatch("changeinExpType", this.bodyForm.inExpType);
          console.log("tis,aaaaaaaa", this.$store.getters.getInExpTypeStatus);
          this.$store.dispatch("changeBindTypecd", this.bodyForm.bindTypecd);
          this.$store.dispatch("changeIoTypecdStatus", this.bodyForm.ieTypecd);
          if (res.map.data.bindTypecd == 3 || res.map.data.inExpType == 7) {
            let obj = res.map.data.portReleaseRlt[0];
            setTimeout(() => {
              sessionStorage.setItem("formlated", JSON.stringify(obj));
            }, 100);

            console.log("llllllll", obj);
          }
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
          let emptyObject = [];
          // 表体
          bodyFormCopy["portReleaseDt"] = this.$refs.formbody
            ? this.$refs.formbody.tableDataCopy
            : this.bodyArr;
          // 关联单证表
          bodyFormCopy["portReleaseRlt"] = this.$refs.formlated
            ? this.$refs.formlated.table1Data
            : this.guanLianArr;
          // 关联出入库单证
          bodyFormCopy["portReleaseInexpRlt"] = this.$refs.formlatedInExpType
            ? this.$refs.formlatedInExpType.tableData
            : this.danzhengArr;
          if (
            this.inExpTypeStatus == 7 &&
            this.ieTypecdStatus == "I" &&
            bodyFormCopy["portReleaseRlt"].length != 0
          ) {
            bodyFormCopy.rltPortRecNo = bodyFormCopy["portReleaseRlt"][0].rltNo;
            // let whareHouse = JSON.parse(sessionStorage.getItem("formlated"));
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

    // 新增按钮
    addOther() {
      this.$app.trigger("add-new-tab", "CreditCardReceiptAdd");
      // let menusList = this.$store.getters.getMenuTabInstance.items;
      // menusList.forEach(function(item, index) {
      //   if (item.link == "/CreditCardReceiptAdd") {
      //     menusList.splice(index, 1);
      //   }
      // });
      // this.$router.push({ path: "/home" });
      // setTimeout(() => {
      //   this.$router.push({
      //     path: "/CreditCardReceiptAdd"
      //   });
      // }, 10);
    },
  },
};
</script>
