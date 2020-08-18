<template>
  <div>
    <ep-model title="关联卡口凭证" v-model="model" width="1250px" :wrap-close="false">
      <CreditCardReceiptInfo
        ref="CreditCardReceiptInfo"
        :getDetail="'1'"
        :optStatus="'51'"
        :getWareHouseDtDetail="getDtDetail"
        :searchinExp="searchinExp"
        :searchType="!addFlag"
        :ieState="ieTypecdState"
        :iswhRecPreentNo="iewhRecPreentNo"
        :bindUsedTypecdStatus="'1'"
        :addFlag="addFlag"
      >
        <template slot="out-form">
          <!-- <ep-button type="primary" size="small" @click="dobindbill" icon="edit">绑定卡口验放凭证</ep-button> -->
          <WmsButton @click="dobindbill(1)" v-if="addFlag">绑定卡口验放凭证</WmsButton>
          <WmsButton @click="dobindbill(2)" v-if="!addFlag">变更卡口验放凭证</WmsButton>
        </template>
      </CreditCardReceiptInfo>
    </ep-model>
    <ep-model title="关联卡口凭证" v-model="dtmodel" width="1250px" :wrap-close="false">
      <!-- <WmsButton >变更卡口验放凭证</WmsButton> -->
      <div class="panel panel-default">
        <ep-form ref="searchForm" :form="searchForm" name-width="138px">
          <ep-row :gutter="7">
            <ep-col :col="8">
              <ep-form-item label="凭证编号" attr="portNo">
                <ep-input
                  v-model="searchForm.portNo"
                  name="portNo"
                  :maxlength="30"
                  :disabled="true"
                ></ep-input>
              </ep-form-item>
            </ep-col>
          </ep-row>
          <ep-row :gutter="7">
            <ep-col :col="24">
              <WmsButton>查询</WmsButton>
            </ep-col>
          </ep-row>
        </ep-form>
      </div>
      <ep-table border ref="table" :height="400" :data="changeTableData" :head-color="headColor">
        <ep-table-item column="opt" title="操作" width="200">
          <template slot-scope="props">
            <wms-icon type="edit" @click="doBodyUpdateData(props.row,props.row.id)"></wms-icon>
            <!-- <wms-icon type="cancel" v-if="btnShow" @click="doBodyDelete(props.row,props.row.id)"></wms-icon> -->
          </template>
        </ep-table-item>

        <ep-table-item column="portNo" width="250" title="关联单证编号"></ep-table-item>

        <ep-table-item column="rtlTypecd" title="总担保编号"></ep-table-item>
      </ep-table>
      <div style="text-align: center;">
        <WmsButton @click="dtmodel = false">关闭</WmsButton>
      </div>
    </ep-model>
    <ep-model title="进出区提发货凭证表体" v-model="updateModelData" width="1250px" wrap-close append-to-body>
      <ep-form ref="tableBody" :form="tableBody" name-width="168px">
        <ep-row :gutter="7">
          <ep-col :col="8">
            <ep-form-item label="关联单证编号" attr="portNo">
              <ep-input v-model="tableBody.portNo" name="portNo" :maxlength="30" :disabled="true"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="总担保编号" attr="rtlTypecd">
              <ep-input
                v-model="tableBody.rtlTypecd"
                name="rtlTypecd"
                :maxlength="30"
                :disabled="true"
              ></ep-input>
            </ep-form-item>
          </ep-col>

          <ep-col :col="8">
            <ep-form-item label="修改标志" attr="modfMarkcd">
              <ep-select v-model="tableBody.modfMarkcd" name="modfMarkcd">
                <ep-select-item index="1" label="修改"></ep-select-item>
                <ep-select-item index="2" label="删除"></ep-select-item>
                <ep-select-item index="3" label="增加" disabled></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
        </ep-row>
        <div style="text-align: center;">
          <WmsButton @click="makeSureUpdate()">确定</WmsButton>
          <WmsButton :loading="loading" @click="updateModelData = false">关闭</WmsButton>
        </div>
      </ep-form>
    </ep-model>
    <!--表格-->
    <div class="ep-card card-margin relative">
      <div class="card-body">
        <div class="block" v-show="displayBlock">
          <!-- <ep-button type="primary" size="small" @click="doBodyAdd" icon="plus-round">添加</ep-button> -->
          <!-- <ep-button type="danger" size="small" @click="doBodyDelete" icon="trash-a">删除</ep-button> -->
          <WmsButton style="margin:0" @click="doBodyAdd(addFlag)">添加</WmsButton>
          <WmsButton style="margin:0" @click="doBodychang(addFlag)" v-if="changeRe">变更</WmsButton>
        </div>
        <div class="block">
          <ep-table
            border
            ref="table"
            :height="400"
            :data="tableData"
            :head-color="headColor"
            @row-dblclick="lookInfo"
          >
            <!-- <ep-table-item type="select"></ep-table-item> -->
            <ep-table-item column="opt" title="操作" width="200" v-show="displayBlock">
              <template slot-scope="props">
                <wms-icon type="cancel" @click="doBodyDelete(props.row,props.row.id)"></wms-icon>
              </template>
            </ep-table-item>
            <ep-table-item column="portNo" width="250" title="关联单证编号"></ep-table-item>
            <!-- <ep-table-item column="rtlTypecd" title="单证类型" :formatter="rtlTypecd"></ep-table-item> -->
            <ep-table-item column="rtlTypecd" title="总担保编号"></ep-table-item>
            <ep-table-item column="modfMarkcd" title="修改标志" :formatter="modfMarkcdFormatter"></ep-table-item>
          </ep-table>
        </div>
        <!-- <div class="block">
        <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import mixin from "../mixin";
import { cloneObj } from "utils";
import CreditCardReceiptInfo from "../../CreditCardReceipt/CreditCardReceiptInfo";
import bus from "./bus";
export default {
  mixins: [mixin, misList],
  components: {
    CreditCardReceiptInfo
  },
  props: {
    listDate: {
      type: Array,
      default: function() {
        return [];
      }
    },
    typeUpdate: {
      default: false
    },
    notWatchList: {
      default: false
    },
    headerForm: {
      type: Object,
      default: {}
    },
    displayBlock: {
      default: true
    },
    ieTypecdState: {
      type: String,
      default: ""
    },
    iwhRecPreentNo: {
      type: String,
      default: ""
    },
    changeRe: {
      default: false
    }
  },
  created() {
    // this.iewhRecPreentNo=this.headerForm.whRecPreentNo
  },
  computed: {
    searchinExp() {
      return this.headerForm.inExpType;
    },
    dclUnitcds() {
      return this.$store.getters.getUnitList;
    },
    currList() {
      return this.$store.getters.getCurrList;
    }
  },
  mounted() {
    this.makePaging(10, 1, this.listDate);
  },
  data() {
    return {
      bodyForm: {
        container: ""
      },
      searchForm: {
        portNo: this.headerForm.whRecPreentNo
      },
      tableBody: {},
      isDisabled: true,
      updateModelData: false,
      iewhRecPreentNo: this.headerForm.whRecPreentNo,
      page_rules: {
        container: { required: true, message: "不能为空", trigger: "change" }
      },
      headColor: true,
      tableData: [],
      tableDataCopy: this.listDate,
      loading: false,
      dtmodel: false,
      model: false,
      ep_page: {
        page: 1,
        size: 10
      },
      changeTableData: [],
      totalcount: 0,
      buttonStatus: "",
      customSearch: {},
      getDtDetail: "1",
      addFlag: true
    };
  },
  watch: {
    listDate: {
      handler(newData, oldData) {
        if (this.notWatchList) {
          return;
        } else {
          this.tableDataCopy = newData;
          this.makePaging(
            this.ep_page.size,
            this.ep_page.page,
            this.tableDataCopy
          );
        }
      },
      deep: true
    }
  },
  methods: {
    lookInfo(event, row, index) {
      if (this.displayBlock) {
        return;
      }
      this.bodyForm = row;
      this.model = true;
    },
    doBodyAdd(addFlag) {
      console.log(this.tableData);
      this.addFlag = true;
      this.buttonStatus = 1;
      this.model = true;
      if (!this.ieTypecdState) {
        this.$pop({
          type: "danger",
          message: "请先在表头选择进出标志"
        });
        this.model = false;
      } else {
        this.model = true;
      }
    },
    doBodychang(addFlag) {
      this.addFlag = false;

      // this.buttonStatus = 1;
      // this.model = true;
      if (!this.ieTypecdState) {
        this.$pop({
          type: "danger",
          message: "请先在表头选择进出标志"
        });
        this.model = false;
      } else {
        console.log("112");
        this.findsomeData();
        // this.model = true;
        this.dtmodel = true;
      }
    },
    doBodyUpdateData(row, id) {
      let list = this.tableDataCopy.findIndex((item, index) => {
        return item.portNo == row.portNo;
      });
      if (list == -1) {
        this.updateModelData = true;
        setTimeout(() => {
          this.tableBody = cloneObj(row);
          this.tableBody.modfMarkcd = "1";
        }, 100);
      } else {
        return this.$pop({
          type: "danger",
          message: "此单证已经添加完成，请先删除后再修改！"
        });
      }
    },
    makeSureUpdate() {
      //  let list = this.tableData.map((item,index)=>{
      //     return item.portNo==this.tableBody.portNo
      //   })
      let list = this.tableDataCopy.findIndex((item, index) => {
        return item.portNo == this.tableBody.portNo;
      });
      console.log(list);
      if (list == -1) {
        this.tableBody.leadId = this.tableDataCopy.length;
        this.tableDataCopy.push(cloneObj(this.tableBody));
      } else {
        this.tableDataCopy.forEach((item, index) => {
          if (item.portNo == this.tableBody.portNo) {
            this.tableDataCopy.splice(index, 1, this.tableBody);
          }
        });
      }
      this.tableDataCopy.forEach((el, index) => {
        el.leadId = index;
      });
      this.makePaging(100, 1, this.tableDataCopy);
      // return
      // if(this.tableData.length>0){

      // }else{
      //    this.tableData.push(cloneObj(this.tableBody))
      // }

      let newList = this.beforData.filter(item => {
        return item.portNo == this.tableBody.portNo;
      });
      newList.forEach(item => {
        if (this.tableBody.modfMarkcd == "2") {
          this.$set(item, "modfMarkcd", "2");
          item.modfMarkcd = this.tableBody.modfMarkcd;
        }
        if (this.tableBody.modfMarkcd == "1") {
          this.$set(item, "modfMarkcd", "1");
          item.modfMarkcd = this.tableBody.modfMarkcd;
        }
        // item.modfMarkcd = this.tableBody.modfMarkcd
      });
      // let updateDate = this.tableDataCopy.findIndex(value => {
      //       return value.id == this.tableBody.id;
      //     });
      // console.log(updateDate)
      // this.tableDataCopy.splice(updateDate, 1, cloneObj(this.tableBody));
      bus.$emit("addsomeupdate", newList);
      this.updateModelData = false;
      this.dtmodel = false;
      console.log(newList);
      console.log(this.tableDataCopy);
    },
    findsomeData() {
      this.$post("wareHouseBscDetails", {
        id: parseInt(parseInt(this.$route.query.id))
      }).then(res => {
        console.log(res);
        this.changeTableData = res.map.data.warehousePort;
        this.beforData = res.map.data.warehouseReceiptDt;
      });
    },
    doBodyDelete(row, rowId) {
      console.log(row);
      //删除table数据
      // let selectData = this.$refs.table.getData("select");

      let selectData = [row];
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择数据"
        });
        return;
      }
      this.$confirm({
        word: "是否要删除所选条目信息！",
        callback: errorInfo => {
          if (errorInfo) {
            let allDelectIndex = [];
            let deleteDtData = [];
            // let selectData = this.$refs.table.getData("select");

            let selectData = [row];
            console.log("------222", selectData, this.tableDataCopy);
            selectData.forEach(e => {
              let updateDate = this.tableDataCopy.findIndex(value => {
                return value.leadId == e.leadId;
              });
              allDelectIndex.push(updateDate);
            });
            allDelectIndex = allDelectIndex.sort((a, b) => b - a);
            allDelectIndex.forEach((num, i) => {
              this.tableDataCopy.splice(num, 1);
            });
            let filterData = this.filterData(
              this.customSearch,
              this.tableDataCopy
            );

            if (this.typeUpdate && !this.changeRe)
              bus.$emit("deleteDtDetailUp", selectData);
            else if (this.typeUpdate && this.changeRe)
              bus.$emit("deleteChangeRe", selectData);
            else bus.$emit("deleteDtDetail", selectData);
            this.makePaging(this.ep_page.size, this.ep_page.page, filterData);
            // this.ep_page.page = 1;
            this.buttonStatus = 2;
          } else {
            return;
          }
        }
      });
    },
    dobindbill(val) {
      console.log("-------eeee", 1);
      let selectData = this.$refs.CreditCardReceiptInfo.$refs.table.getData(
        "select"
      );
      if (selectData.length == 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条单子！"
        });
        return;
      }
      console.log(selectData);
      //判断数据是否重复
      let isNaN = true;
      let flag = false; //控制model是否关闭
      if (this.tableData.length) {
        selectData.forEach(e => {
          this.tableData.forEach(item => {
            if (item.portNo == e.preentNo) {
              this.$pop({
                type: "danger",
                message: "请选择不同的关联单证"
              });
              isNaN = false;
              flag = true;
            } else {
              setTimeout(() => {
                flag = false;
                isNaN = false;
              });
            }
          });
        });
        if (flag) {
          this.model = true;
        } else {
          this.model = false;
        }
      }
      if (isNaN) {
        let dtDetailArr = [];
        selectData.forEach((e, i) => {
          let tranData = {
            chgTmsCnt: 0,
            orgId: this.$store.getters.getId,
            portNo: e.preentNo,
            rtlTypecd: e.grtNo,
            leadId: this.tableData.length,
            modfMarkcd: "3"
          };
          this.tableDataCopy.forEach((el, index) => {
            el.leadId = index;
          });
          //   console.log(this.tableData)
          this.tableData.push(cloneObj(tranData));
          console.log("------333", this.tableData);
          this.tableDataCopy.push(cloneObj(tranData));
          //获取表体数据
          e.portReleaseDt.forEach((ele, index) => {
            this.$set(ele, "modfMarkcd", "3");
            dtDetailArr.push(ele);
          });
        });
        console.log(this.tableData);
        if (this.typeUpdate && !this.changeRe)
          bus.$emit("passBodyDtUp", dtDetailArr);
        else if (this.typeUpdate && this.changeRe)
          bus.$emit("passBodyChangeRe", dtDetailArr);
        else bus.$emit("passBodyDt", dtDetailArr);
        this.model = false;
      }
    },
    handleSelect() {},
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.tableDataCopy)
      );
    },
    handleCurrentChange(val) {
      this.ep_page.page = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.tableDataCopy)
      );
    },
    makeSure() {
      this.$refs["bodyForm"].validate(valid => {
        if (valid) {
          if (this.buttonStatus == 0) {
            console.log("----5555");

            return;
          } else if (this.buttonStatus == 1) {
            console.log("----4444");

            let bodyForm = this.bodyForm;
            this.indexChange = this.$refs.table.getDataIndex("select")[0];
            this.tableData.splice(this.indexChange, 1, cloneObj(bodyForm));
            let updateDate = this.tableDataCopy.findIndex(value => {
              return value.leadId == bodyForm.leadId;
            });
            this.tableDataCopy.splice(updateDate, 1, cloneObj(bodyForm));
            this.$refs.bodyForm && this.$refs.bodyForm.reset();
            this.model = false;
            this.buttonStatus = 0;
          } else if (this.buttonStatus == 2) {
            console.log("----45555");

            this.bodyForm.leadId =
              this.tableDataCopy[this.tableDataCopy.length - 1] == undefined
                ? 0
                : this.tableDataCopy[this.tableDataCopy.length - 1].leadId + 1;

            let bodyForm = this.bodyForm;
            this.tableData.push(cloneObj(bodyForm));
            this.tableDataCopy.push(cloneObj(bodyForm));
            this.totalcount++;
            this.ep_page.page = Math.ceil(this.totalcount / this.ep_page.size);
            this.buttonStatus = 2;
            this.$refs.bodyForm && this.$refs.bodyForm.reset();
            this.model = false;
          }
        }
      });
    },
    closeModel() {
      this.model = false;
    },
    makePaging(size, page, data) {
      let begin = (page - 1) * size;
      let end = begin + size;
      let newData = data.slice(begin, end);
      this.totalcount = data.length;
      this.tableData = newData;
    },
    filterData(condition, data) {
      let filter = (condition, data) => {
        return data.filter(item => {
          return Object.keys(condition).every(key => {
            if (condition[key] == "") return true;
            let diff =
              key == "gdsNm"
                ? String(item[key])
                    .toLowerCase()
                    .indexOf(
                      String(condition[key])
                        .trim()
                        .toLowerCase()
                    ) !== -1
                : String(item[key]).toLowerCase() ==
                  String(condition[key])
                    .trim()
                    .toLowerCase();
            return diff;
          });
        });
      };
      return filter(condition, data);
    }
  }
};
</script>
