<template>
  <div>
    <!-- 绑定提货单 -->
    <ep-model v-model="BillDirModel" width="1350px" :wrap-close="false">
      <PathBillOfladingInfo ref="PathBillOfladingInfo" :bindTypecd='portSwitchStatus' :mtpckEndprdTypecd='mtpckEndprdTypecds' :optStatus="'5'" :searchType="false">
        <template slot="out-form">
          <WmsButton @click="dobind(0)">绑定凭证</WmsButton>

          <!-- <ep-button type="primary" size="small" @click="dobind(0)" icon="edit">绑定过卡凭证</ep-button> -->
        </template>
      </PathBillOfladingInfo>
    </ep-model>
    <!-- 绑定卡口出区 -->
    <ep-model title="关联卡口凭证" v-model="CreditCardModel" width="1250px" :wrap-close="false">
      <CreditCardReceiptInfo ref="CreditCardReceiptInfo" :searchType="false" :ieState="'E'" :mtpckEndprdTypecd='mtpckEndprdTypecds' :searchinExp="searchinExp" :optStatus="'51'" :rules="page_rules">

        <template slot="out-form">
          <!-- <ep-button type="primary" size="small" @click="dobindbill" icon="edit">绑定卡口验放凭证</ep-button> -->
          <WmsButton @click="dobind(3)">绑定凭证</WmsButton>
        </template>
      </CreditCardReceiptInfo>
    </ep-model>
    <!-- 绑定发货单 -->
    <ep-model v-model="BillDIrExpModel" width="1350px" :wrap-close="false">
      <PathBillDirExpBscInfo ref="PathBillDirExpBscInfo" :bindTypecd='portSwitchStatus' :mtpckEndprdTypecd='mtpckEndprdTypecds' :optStatus="'5'" :searchType="false">
        <template slot="out-form">
          <WmsButton @click="dobind(1)">绑定凭证</WmsButton>

          <!-- <ep-button type="primary" size="small" @click="dobind(1)" icon="edit">绑定过卡凭证</ep-button> -->
        </template>
      </PathBillDirExpBscInfo>
    </ep-model>
    <!-- 绑定仓单 -->
    <ep-model v-model="WareHouseModel" width="1350px" :wrap-close="false">
      <WareHouseInfo ref="WareHouseInfo" :mtpckEndprdTypecd='mtpckEndprdTypecds' :ieTypecd="ieTypecdStatus + ''" :inExpType="inExpTypes + ''" :portState="portSwitchStatus + ''" :optStatus="'5'" :searchType="false">
        <template slot="out-form">
          <WmsButton @click="dobind(2)">绑定凭证</WmsButton>
          <!-- <ep-button type="primary" size="small" @click="dobind(2)" icon="edit">绑定过卡凭证</ep-button> -->
        </template>
      </WareHouseInfo>
    </ep-model>
    <!-- 绑定耗料清单 -->
    <ep-model title="关联耗料清单" v-model="OutwardInfoModel" width="1350px" :wrap-close="false">
      <OutwardInfo ref="OutwardInfo" :searchType="false" :optStatus="'5'" :bindTypecd='portSwitchStatus' :businessTypecd="'1'" :isChange="'0'" :rltPortRecNoValue='rltPortRecNoValue'>

        <template slot="out-form">
          <!-- <ep-button type="primary" size="small" @click="dobindbill" icon="edit">绑定卡口验放凭证</ep-button> -->
          <WmsButton @click="dobind(4)">绑定凭证</WmsButton>
        </template>
      </OutwardInfo>
    </ep-model>
    <!--表格-->
    <div class="ep-card card-margin relative">
      <div class="card-body">
        <div class="block">
          <WmsButton style="margin-left:0px;" @click="doBody1Add">添加</WmsButton>
          <!-- <ep-button type="primary" size="small" @click="doBody1Add" icon="plus-round">添加</ep-button> -->
          <!-- <ep-button type="danger" size="small" @click="doBody1Delete" icon="trash-a">删除</ep-button> -->
        </div>
        <div class="block">
          <ep-table ref="table1" border :height="400" :data="updata?table1DataUpdata:table1Data" @selection-change="handleSelect1" :loading="loading" :head-color="headColor">
            <ep-table-item column="opt" title="操作" width="200">
              <template slot-scope="props">
                <wms-icon type="cancel" @click="doBody1Delete(props.row,props.row.id)"></wms-icon>
              </template>
            </ep-table-item>
            <!-- <ep-table-item type="select"></ep-table-item> -->

            <!-- <ep-table-item
              column="portNo"
              title="凭证编号"
              width="300"
            ></ep-table-item> -->
            <ep-table-item column="rltTbTypecd" title="关联单证类型" width="300" :formatter="rltTbTypecdFormatter"></ep-table-item>
            <ep-table-item column="rltNo" title="关联单证编号" width="300"></ep-table-item>
            <ep-table-item v-if="this.inExpTypes ==6 && this.ieTypecdStatus=='I'" column="grossWt" title="毛重(已关联)" width="300"></ep-table-item>
            <!--改动 增加毛重一列-->
          </ep-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import PathBillOfladingInfo from "../../BillDir/PathBillOfladingInfo";
import PathBillDirExpBscInfo from "../../BillDirExp/PathBillDirExpBscInfo";
import WareHouseInfo from "../../WareHouse/WareHouseInfo";
import CreditCardReceiptInfo from "../CreditCardReceiptInfo";
import OutwardInfo from "../../Material/OutwardInfo";

import { cloneObj } from "utils";

export default {
  extends: misList, // 务必继承
  components: {
    PathBillOfladingInfo,
    PathBillDirExpBscInfo,
    WareHouseInfo,
    CreditCardReceiptInfo,
    OutwardInfo,
  },
  props: {
    list1Date: {
      type: Array,
      default: function () {
        return [];
      },
    },
    list1DateUpdata: {
      type: Array,
      default: function () {
        return [];
      },
    },
    updata: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
    mtpckEndprdTypecd: {
      default: "",
    },
    rltPortRecNoValue: {
      default: "",
    },
  },
  data() {
    return {
      firstLoad: false,
      mtpckEndprdTypecds: "",
      searchinExp: "", // 调用卡口查询页面，临时进出区，飞机试飞
      loading: false,
      BillDirModel: false, //提货单
      BillDIrExpModel: false, // 发货单
      OutwardInfoModel: false, // 耗料单
      table1Data: [],
      tableDataCopy: this.list1Date,
      table1DataUpdata: [],
      tableDataCopyUpdata: this.list1DateUpdata,
      select1Items: [],
      headColor: true,
      WareHouseModel: false,
      CreditCardModel: false,
      page_rules: {
        preentNo: { required: true, message: "不能为空", trigger: "change" },
      },
      // portSwitchStatus: ''
    };
  },
  created() {},
  mounted() {
    if (this.updata) {
      this.makePaging(30, 1, this.tableDataCopyUpdata);
    } else {
      this.makePaging(30, 1, this.tableDataCopy);
    }
  },
  computed: {
    //绑定类型
    portSwitchStatus() {
      if (this.updata) {
        return this.$store.getters.getBindTypecdEdit;
      } else {
        return this.$store.getters.getBindTypecd;
      }
    },
    inExpTypes() {
      // 出入库类型
      if (this.updata) {
        return this.$store.getters.getInExpTypeStatusEdit;
      } else {
        return this.$store.getters.getInExpTypeStatus;
      }
    },
    ieTypecdStatus() {
      // 进出标志
      if (this.updata) {
        return this.$store.getters.getIoTypecdStatusEdit;
      } else {
        return this.$store.getters.getIoTypecdStatus;
      }
    },
    // 清空表体书
    clearDetatype() {
      if (this.updata) {
        return this.$store.getters.getClearDataEdit;
      } else {
        return this.$store.getters.getClearData;
      }
    },
  },
  watch: {
    mtpckEndprdTypecd: {
      handler(val, oldVal) {
        this.mtpckEndprdTypecds = val;
        console.log("ddd料件成品改变", val, this.mtpckEndprdTypecds);
      },
      immediate: true,
    },
    // list1Date: {
    //   handler(newData, olddata) {
    //     console.log('数据发生编号')
    //     this.tableDataCopy = newData
    //     this.makePaging(10, 1, this.tableDataCopy)
    //   },
    //   immediate: true,
    //   deep: true
    // },
    clearDetatype: {
      handler(newName, oldName) {
        if (this.$route.query.id && this.firstLoad) {
          this.table1DataUpdata = [];
          this.tableDataCopyUpdata = [];
          console.log(
            "清空数据--关联单证表--updata页面",
            this.table1DataUpdata
          );
        } else {
          this.table1Data = [];
          this.tableDataCopy = [];
          console.log("清空数据--关联单证表--生成页面", this.table1Data);
        }
        this.firstLoad = true;
      },
      immediate: true,
    },
  },
  methods: {
    rltTbTypecdFormatter(row, index) {
      if (row.rltTbTypecd == "1") {
        return "进出区提发货";
      }
      if (row.rltTbTypecd == "2") {
        return "径予提发货";
      }
      if (row.rltTbTypecd == "4") {
        return "临时进出区";
      }
      if (row.rltTbTypecd == "5") {
        return "外发加工";
      }
    },
    handleSelect1(val, index) {
      this.select1Items = val;
    },
    doBody1Delete(row) {
      //删除table数据
      let selectData = row;
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择数据",
        });
        return;
      }
      this.$confirm({
        word: "是否要删除所选条目信息！",
        callback: (errorInfo) => {
          if (errorInfo) {
            let selectData = [row];
            let filterData = [];
            if (this.updata) {
              selectData.forEach((e) => {
                console.log("table", selectData);
                filterData = this.table1DataUpdata.filter((value) => {
                  return value.id !== e.id;
                });
                this.table1DataUpdata = filterData;
              });
            } else {
              selectData.forEach((e) => {
                console.log("table", selectData);
                filterData = this.table1Data.filter((value) => {
                  return value.id !== e.id;
                });
                this.table1Data = filterData;
              });
            }
            if (this.updata) {
              sessionStorage.removeItem("formlated1");
              this.$emit("changeLeatedEdit");
            } else {
              sessionStorage.removeItem("formlated");
              this.$emit("changeLeated");
            }
          } else {
            return;
          }
        },
      });
    },

    //  关联单证 添加
    doBody1Add() {
      let ioTypecd = this.ieTypecdStatus;
      let bindTypecd = this.portSwitchStatus;
      let inExpTypeStatus = this.inExpTypes;
      console.log("出入库类型", inExpTypeStatus, this.bindTypecd);
      if (inExpTypeStatus != 8 && !this.mtpckEndprdTypecds) {
        this.$pop({
          type: "danger",
          message: "请选择表头料件、成品标志",
        });
        return;
      }
      if (!inExpTypeStatus && inExpTypeStatus != 7 && inExpTypeStatus != 9) {
        this.$pop({
          type: "danger",
          message: "请选择表头出入库类型",
        });
        return;
      }
      if (!ioTypecd) {
        this.$pop({
          type: "danger",
          message: "请选择表头进出标志",
        });
        return;
      }

      if (!bindTypecd && inExpTypeStatus != 7 && inExpTypeStatus != 9) {
        this.$pop({
          type: "danger",
          message: "请选择表头绑定类型",
        });
        return;
      }

      //添加之前判断绑定类型一车多票可添加多条记录
      if (bindTypecd == "2" && inExpTypeStatus != 7 && inExpTypeStatus != 9) {
        console.log("tabe", this.table1Data.length);
        if (this.updata) {
          if (this.table1DataUpdata.length >= 1) {
            this.$pop({
              type: "danger",
              message: "绑定类型为一车一票，关联单证只能添加一条",
            });
            return;
          }
        } else {
          if (this.table1Data.length >= 1) {
            this.$pop({
              type: "danger",
              message: "绑定类型为一车一票，关联单证只能添加一条",
            });
            return;
          }
        }
      }
      if (bindTypecd == "3" && inExpTypeStatus != 7 && inExpTypeStatus != 9) {
        if (this.updata) {
          if (this.table1DataUpdata.length >= 1) {
            this.$pop({
              type: "danger",
              message: "绑定类型为一票多车，关联单证只能添加一条",
            });
            return;
          } else {
          }
        } else {
          if (this.table1Data.length >= 1) {
            this.$pop({
              type: "danger",
              message: "绑定类型为一票多车，关联单证只能添加一条",
            });
            return;
          } else {
          }
        }
      }
      if (inExpTypeStatus == 7 || inExpTypeStatus == 9) {
        if (this.updata) {
          if (this.table1DataUpdata.length >= 1) {
            this.$pop({
              type: "danger",
              message: "关联单证只能添加一条",
            });
            return;
          } else {
          }
        } else {
          if (this.table1Data.length >= 1) {
            this.$pop({
              type: "danger",
              message: "关联单证只能添加一条",
            });
            return;
          } else {
          }
        }
      }

      if (
        inExpTypeStatus == 1 ||
        inExpTypeStatus == 2 ||
        inExpTypeStatus == 4 ||
        inExpTypeStatus == 5
      ) {
        // 仓单 仓单框显示
        if (this.updata) {
          sessionStorage.removeItem("formlated1");
        } else {
          sessionStorage.removeItem("formlated");
        }

        this.WareHouseModel = true;
      } else if (inExpTypeStatus == 6 && ioTypecd == "I") {
        // 提货单显示
        this.BillDirModel = true;
        if (this.updata) {
          sessionStorage.removeItem("formlated1");
        } else {
          sessionStorage.removeItem("formlated");
        }
      } else if (inExpTypeStatus == 6 && ioTypecd == "E") {
        // 发货单显示
        if (this.updata) {
          sessionStorage.removeItem("formlated1");
        } else {
          sessionStorage.removeItem("formlated");
        }

        this.BillDIrExpModel = true;
      } else if (inExpTypeStatus == 7 && ioTypecd == "I") {
        this.searchinExp = "7";
        this.CreditCardModel = true;
      } else if (inExpTypeStatus == 9 && ioTypecd == "I") {
        this.searchinExp = "9";
        this.CreditCardModel = true;
      } else if (inExpTypeStatus == 8 && ioTypecd == "I") {
        this.OutwardInfoModel = true;
      }
    },
    // 绑定提货单，发货单，仓单
    dobind(params) {
      // let bindTypecd = this.$store.getters.getBindTypecd;
      let bindTypecd = this.portSwitchStatus;
      let rltTbTypecd = this.$store.getters.getInExpTypeStatus;
      let inExpTypeStatus = this.inExpTypes;
      let selectData;
      if (params == 0) {
        // 提货单
        selectData = this.$refs.PathBillOfladingInfo.$refs.table.getData(
          "select"
        );
      } else if (params == 1) {
        //发货单
        selectData = this.$refs.PathBillDirExpBscInfo.$refs.table.getData(
          "select"
        );
      } else if (params == 2) {
        //仓单
        selectData = this.$refs.WareHouseInfo.$refs.table.getData("select");
      } else if (params == 3) {
        selectData = this.$refs.CreditCardReceiptInfo.$refs.table.getData(
          "select"
        );
      } else if (params == 4) {
        selectData = this.$refs.OutwardInfo.$refs.table.getData("select");
      }

      console.log("seleeeee", selectData);
      if (bindTypecd == "2" && inExpTypeStatus != 7 && inExpTypeStatus != 9) {
        if (selectData.length > 1) {
          this.$pop({
            type: "danger",
            message: "绑定类型为一车一票，关联单证只能添加一条",
          });

          return;
        } else if (selectData.length == 0) {
          this.$pop({
            type: "danger",
            message: "请选择一条单子！",
          });
          return;
        }
      } else if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条单子！",
        });
        return;
      }
      if (bindTypecd == "3" && inExpTypeStatus != 7 && inExpTypeStatus != 9) {
        if (selectData.length > 1) {
          this.$pop({
            type: "danger",
            message: "绑定类型为一票多车，关联单证只能添加一条",
          });

          return;
        } else if (selectData.length == 0) {
          this.$pop({
            type: "danger",
            message: "请选择一条单子！",
          });
          return;
        }
      } else if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条单子！",
        });
        return;
      }
      if (inExpTypeStatus == 7 || inExpTypeStatus == 9) {
        if (selectData.length > 1) {
          this.$pop({
            type: "danger",
            message: "关联单证只能添加一条",
          });

          return;
        } else if (selectData.length == 0) {
          this.$pop({
            type: "danger",
            message: "请选择一条单子！",
          });
          return;
        }
      } else if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条单子！",
        });
        return;
      }
      let isNaN = true;
      if (this.updata) {
        if (bindTypecd == 1 && this.table1DataUpdata.length) {
          this.table1DataUpdata.forEach((item) => {
            selectData.forEach((e) => {
              if (item.id == e.id) {
                this.$pop({
                  type: "danger",
                  message: "请选择不同的关联单证",
                });
                isNaN = false;
              } else {
                setTimeout(() => {
                  isNaN = true;
                });
              }
            });
          });
        }
      } else {
        if (bindTypecd == 1 && this.table1Data.length) {
          this.table1Data.forEach((item) => {
            selectData.forEach((e) => {
              if (item.id == e.id) {
                this.$pop({
                  type: "danger",
                  message: "请选择不同的关联单证",
                });
                isNaN = false;
              } else {
                setTimeout(() => {
                  isNaN = true;
                });
              }
            });
          });
        }
      }
      //判断数据是否重复
      if (isNaN) {
        selectData.forEach((e) => {
          let tranData = {
            id: e.id,
            pid: "",
            portNo: "",
            orgId: this.$store.getters.getId,
            rltNo: "", //params == 2 ? e.whRecPreentNo : e.orderNo,

            // rltTbTypecd: params == 2 ? 1 : 2
          };
          if (params == 2) {
            tranData.rltNo = e.whRecPreentNo;
            tranData.rltTbTypecd = 1;
          } else if (params == 0) {
            tranData.rltTbTypecd = 2;
            tranData.rltNo = e.billNo;
            tranData.grossWt = e.passportUsedWt ? e.passportUsedWt : 0; //改动
          } else if (params == 1) {
            tranData.rltTbTypecd = 2;
            tranData.rltNo = e.billExpNo;
          } else if (params == 3) {
            tranData.rltTbTypecd = 4;
            console.log(tranData.rltTbTypecd);
            tranData.grtNo = e.grtNo;
            tranData.rltNo = e.preentNo;
          } else if (params == 4) {
            // 绑定耗料清单
            tranData.rltTbTypecd = 5;
            console.log(tranData.rltTbTypecd);
            tranData.rltNo = e.consumptionNo;
          }
          if (this.updata) {
            this.table1DataUpdata.push(cloneObj(tranData));
          } else {
            this.table1Data.push(cloneObj(tranData));
          }
        });
        console.log("selectData", selectData);
      }
      if (params == 0) {
        // 提货单
        this.$refs.PathBillOfladingInfo.$refs.table.reset();
        if (isNaN) {
          this.BillDirModel = false;
        }
        let obj = {};
        if (this.updata) {
          obj = this.table1DataUpdata[0];
        } else {
          obj = this.table1Data[0];
        }
        if (this.updata) {
          sessionStorage.setItem("formlated1", JSON.stringify(obj));
        } else {
          sessionStorage.setItem("formlated", JSON.stringify(obj));
        }
      } else if (params == 1) {
        //发货单
        let obj = {};
        if (this.updata) {
          obj = this.table1DataUpdata[0];
        } else {
          obj = this.table1Data[0];
        }

        this.$refs.PathBillDirExpBscInfo.$refs.table.reset();
        if (isNaN) {
          this.BillDIrExpModel = false;
        }
        if (this.updata) {
          sessionStorage.setItem("formlated1", JSON.stringify(obj));
        } else {
          sessionStorage.setItem("formlated", JSON.stringify(obj));
        }
      } else if (params == 2) {
        //仓单
        this.$refs.WareHouseInfo.$refs.table.reset();
        if (isNaN) {
          this.WareHouseModel = false;
        }
        let obj = {};
        if (this.updata) {
          obj = this.table1DataUpdata[0];
        } else {
          obj = this.table1Data[0];
        }
        console.log("obj", obj);
        if (this.updata) {
          sessionStorage.setItem("formlated1", JSON.stringify(obj));
        } else {
          sessionStorage.setItem("formlated", JSON.stringify(obj));
        }
      } else if (params == 3) {
        //临时进出区
        this.$refs.CreditCardReceiptInfo.$refs.table.reset();
        if (isNaN) {
          this.CreditCardModel = false;
        }
        let obj = {};
        if (this.updata) {
          obj = this.table1DataUpdata[0];
        } else {
          obj = this.table1Data[0];
        }

        if (this.updata) {
          sessionStorage.setItem("formlated1", JSON.stringify(obj));
        } else {
          sessionStorage.setItem("formlated", JSON.stringify(obj));
          console.log("dddddddd");
        }
      } else if (params == 4) {
        // 耗料清单
        this.$refs.OutwardInfo.$refs.table.reset();
        if (isNaN) {
          this.OutwardInfoModel = false;
        }
        let obj = {};
        if (this.updata) {
          obj = this.table1DataUpdata[0];
        } else {
          obj = this.table1Data[0];
        }
        if (this.updata) {
          sessionStorage.setItem("formlated1", JSON.stringify(obj));
        } else {
          sessionStorage.setItem("formlated", JSON.stringify(obj));
          console.log("dddddddd");
        }
      }
    },
    makePaging(size, page, data) {
      let begin = (page - 1) * size;
      let end = begin + size;
      let newData = data.slice(begin, end);
      this.totalcount = data.length;
      if (this.updata) {
        this.table1DataUpdata = newData;
      } else {
        this.table1Data = newData;
      }
    },
    addSplit() {
      if (this.table1Data.length == 1) {
        this.bodyForm.rltNo = this.table1Data[0].rltNo;
      }
      if (this.table1Data.length > 1) {
        let arrayList = [];
        this.table1Data.forEach((e) => {
          arrayList.push(e.rltNo);
        });
        this.bodyForm.rltNo = arrayList.join("\\");
      }
    },
  },
};
</script>
