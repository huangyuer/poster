<template>
  <div>
    <ep-model title="进出境货物汇总表体" v-model="model" width="1250px" :wrap-close="false">
      <!-- <div class="ep-card card-margin relative" style="padding:10px 0;"> -->
      <ep-form ref="bodyForm" :form="bodyForm" :rules="page_rules" name-width="168px">
        <ep-row :gutter="7">
          <ep-col :col="8">
            <ep-form-item attr="directionTypecd" label="货物流向">
              <ep-select v-model="bodyForm.directionTypecd" name="directionTypecd">
                <ep-select-item index="I" label="I-入境"></ep-select-item>
                <ep-select-item index="E" label="E-出境"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="进出境关别" attr="impexpPortcd">
              <loc-codemap-select :name="'impexpPortcd'" :code="'customCode'" :cName="'customName'" :dataList="impexpPortcd" :type="'custom'" :value.sync="bodyForm.impexpPortcd">
              </loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="监管方式" attr="supvModecd">
              <loc-codemap-select :name="'supvModecd'" :code="'tradeMode'" :cName="'abbrTrade'" :dataList="supvModecd" :value.sync="bodyForm.supvModecd">
              </loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="运输方式" attr="trspModecd">
              <ep-select v-model="bodyForm.trspModecd" name="trspModecd" filterable>
                <ep-select-item v-for="item in trspModecd" :key="item.trafCode" :index="item.trafCode" :label="item.trafSpec"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="启抵国(地区)" attr="destinationNatcd">
              <loc-codemap-select :name="'destinationNatcd'" :code="'countryCode'" :cName="'nameCn'" :dataList="countrys" :value.sync="bodyForm.destinationNatcd">
              </loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="产终国(地区)" attr="natcd">
              <loc-codemap-select :name="'natcd'" :code="'countryCode'" :cName="'nameCn'" :dataList="countrys" :value.sync="bodyForm.natcd">
              </loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="商品编码" :name="'gdecd'" attr="gdecd">
              <ep-input v-model="bodyForm.gdecd" name="gdecd" :maxlength="10"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="第一法定数量" :name="'lawfQty'" attr="lawfQty">
              <ep-input v-model="bodyForm.lawfQty" name="lawfQty" :maxlength="20"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="第二法定数量" :name="'secdLawfQty'" attr="secdLawfQty">
              <ep-input v-model="bodyForm.secdLawfQty" name="secdLawfQty" :maxlength="20"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="品牌类型" attr="gdsSpcfModelDesc">
              <ep-select :label="brandTypeList" v-model="bodyForm.gdsSpcfModelDesc" name="gdsSpcfModelDesc" filterable>
                <ep-select-item v-for="(item, index) in brandTypeList" :key="index" :index="item.id" :label="item.brandName"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="统计人民币值" attr="sumRmbVal">
              <ep-input v-model="bodyForm.sumRmbVal" name="sumRmbVal" :maxlength="26"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="16">
            <ep-form-item label="情况说明">
              <ep-input v-model="bodyForm.rmk" name="rmk" type="textarea"></ep-input>
            </ep-form-item>
          </ep-col>
        </ep-row>
        <div style="text-align:center">
          <ep-button type="primary" size="small" @click="makeSure()" v-show="displayBlock" icon="checkmark-round">确定</ep-button>
          <ep-button type="danger" size="small" @click="closeModel()" icon="close">关闭</ep-button>
        </div>
      </ep-form>
      <!-- </div> -->
    </ep-model>

    <!--表格-->
    <div class="ep-card card-margin relative">
      <div class="card-body">
        <div class="block" v-show="displayBlock">
          <ep-button type="primary" size="small" @click="doBodyAdd" icon="plus-round">添加</ep-button>
          <ep-button type="primary" size="small" @click="doBodyUpdate" icon="edit">修改</ep-button>
          <ep-button type="danger" size="small" @click="doBodyDelete" icon="trash-a">删除</ep-button>
        </div>
        <div class="block">
          <ep-table ref="table" :height="400" :data="tableData" :head-color="headColor">
            <ep-table-item type="select"></ep-table-item>
            <ep-table-item column="directionTypecd" title="货物流向" :formatter="setDirectionTypecd" width="120">
              <template slot-scope="props">
                <p v-if='props.row.directionTypecd !=="I"|| props.row.directionTypecd !=="E"' style="color:#f39c12">{{ setDirectionTypecd(props.row.directionTypecd) }}</p>
                <p v-else>{{ setDirectionTypecd(props.row.directionTypecd) }}</p>

              </template>
            </ep-table-item>
            <ep-table-item column="impexpPortcd" title="进出境关别" :formatter="setImpexpPortcd" width="120">
              <template slot-scope="props">
                <p v-if='props.row.impexpPortcd !=="2248"' style="color:#f39c12">{{ setImpexpPortcd(props.row.impexpPortcd) }}</p>
                <p v-else>{{ setImpexpPortcd(props.row.impexpPortcd) }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="gdecd" title="商品编码" width="125">
              <template slot-scope="props">
                <p v-if='props.row.unusualGdecd ==1' style="color:red">{{ props.row.gdecd }}</p>
                <p v-else>{{ props.row.gdecd }}</p>

              </template>
            </ep-table-item>
            <ep-table-item column="lawfQty" width="180" title="第一法定数量">
              <template slot-scope="props">
                <p v-if='props.row.unusualLawfQty ==1' style="color:red">{{ props.row.lawfQty }}</p>
                <p v-else>{{ props.row.lawfQty }}</p>

              </template>
            </ep-table-item>
            <ep-table-item column="secdLawfQty" width="180" title="第二法定数量">
              <template slot-scope="props">
                <p v-if='props.row.unusualSecdLawfQty ==1' style="color:red">{{ props.row.secdLawfQty }}</p>
                <p v-else>{{ props.row.secdLawfQty }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="sumRmbVal" width="180" title="统计人民币值">
              <template slot-scope="props">
                <p v-if='props.row.unusualUprc ==1' style="color:red">{{ props.row.sumRmbVal }}</p>
                <p v-else>{{ props.row.sumRmbVal }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="gdsSpcfModelDesc" title="品牌类型" :formatter="setGdsSpcfModelDesc" width="170"></ep-table-item>
            <ep-table-item column="supvModecd" title="监管方式" :formatter="setSupvModecd" width="130">
              <template slot-scope="props">
                <p v-if='props.row.unusualSupvMode ==1' style="color:red">{{ setSupvModecd(props.row) }}</p>
                <p v-else>{{setSupvModecd(props.row)}}</p>

              </template>
            </ep-table-item>
            <ep-table-item column="trspModecd" title="运输方式" :formatter="setTrspModecd" width="100"></ep-table-item>
            <ep-table-item column="destinationNatcd" width="140" title="启抵国(地区)">
              <template slot-scope="props">
                <p v-if='props.row.unusualDestinationNatcd ==1' style="color:red">{{ setDestinationNatcd(props.row) }}</p>
                <p v-else>{{setDestinationNatcd(props.row)}}</p>

              </template>
            </ep-table-item>
            <ep-table-item column="natcd" width="140" title="产终国(地区)">
              <template slot-scope="props">
                <p v-if='props.row.unusualNatcd ==1' style="color:red">{{ setTableNatcd(props.row)}}</p>
                <p v-else>{{ setTableNatcd(props.row)}}</p>

              </template>
            </ep-table-item>
            <ep-table-item column="rmk" title="备注" width="350">
              <template slot-scope="props">
                <p class="rmk-style">{{ props.row.rmk }}</p>
              </template>
            </ep-table-item>
          </ep-table>
        </div>
        <div class="block">
          <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "../mixin";
import misList from "src/common/mislist";
import { cloneObj } from "utils";
export default {
  mixins: [mixin],
  extends: misList, // 务必继承
  props: {
    listDate: {
      type: Array,
      default: function() {
        return [];
      }
    },
    displayBlock: {
      default: true
    }
  },
  watch: {
    listDate: {
      handler(newData, olddata) {
        this.tableDataCopy = newData;
        this.makePaging(
          this.ep_page.size,
          this.ep_page.page,
          this.tableDataCopy
        );
      },
      deep: true
    },
    "bodyForm.gdecd"(val, oldVal) {
      let reg = /^[0-9]*$/g;
      if (!reg.test(val)) {
        setTimeout(() => {
          this.bodyForm.gdecd = "";
        });
      }
    },
    "bodyForm.lawfQty"(val, oldVal) {
      let reg = /\d+(\.\d{0,2})?/;
      if (reg.test(val)) {
        setTimeout(() => {
          this.bodyForm.lawfQty = val.match(/\d+(\.\d{0,5})?/)[0] || "";
        });
      } else {
        setTimeout(() => {
          this.bodyForm.lawfQty = "";
        });
      }
      if (val.indexOf(".") != -1) {
        let newVal = val.split(".");
        if (newVal[0].length > 14)
          setTimeout(() => {
            this.bodyForm.lawfQty = oldVal;
          });
        if (newVal[1].length > 5)
          setTimeout(() => {
            this.bodyForm.lawfQty = val.match(/\d+(\.\d{0,5})?/)[0];
          });
        return;
      } else {
        if (val.length > 14)
          setTimeout(() => {
            this.bodyForm.lawfQty = oldVal;
          });
        return;
      }
    },
    "bodyForm.secdLawfQty"(val, oldVal) {
      let reg = /\d+(\.\d{0,2})?/;
      if (val && reg.test(val)) {
        setTimeout(() => {
          this.bodyForm.secdLawfQty = val.match(/\d+(\.\d{0,5})?/)[0] || "";
        });
      } else {
        setTimeout(() => {
          this.bodyForm.secdLawfQty = "";
        });
      }
      if (val && val.indexOf(".") != -1) {
        let newVal = val.split(".");
        if (newVal[0].length > 14)
          setTimeout(() => {
            this.bodyForm.secdLawfQty = oldVal;
          });
        if (newVal[1].length > 5)
          setTimeout(() => {
            this.bodyForm.secdLawfQty = val.match(/\d+(\.\d{0,5})?/)[0];
          });
        return;
      } else {
        if (val && val.length > 14)
          setTimeout(() => {
            this.bodyForm.secdLawfQty = oldVal;
          });
        return;
      }
    },
    "bodyForm.sumRmbVal"(val, oldVal) {
      let reg = /\d+(\.\d{0,2})?/;
      if (reg.test(val)) {
        setTimeout(() => {
          this.bodyForm.sumRmbVal = val.match(/\d+(\.\d{0,5})?/)[0] || "";
        });
      } else {
        setTimeout(() => {
          this.bodyForm.sumRmbVal = "";
        });
      }
      if (val.indexOf(".") != -1) {
        let newVal = val.split(".");
        if (newVal[0].length > 20)
          setTimeout(() => {
            this.bodyForm.sumRmbVal = oldVal;
          });
        if (newVal[1].length > 5)
          setTimeout(() => {
            this.bodyForm.sumRmbVal = val.match(/\d+(\.\d{0,5})?/)[0];
          });
        return;
      } else {
        if (val.length > 20)
          setTimeout(() => {
            this.bodyForm.sumRmbVal = oldVal;
          });
        return;
      }
    }
  },
  data() {
    return {
      bodyForm: {
        id: "",
        pid: "",
        orgId: "",
        directionTypecd: "", //货物流向 DIRECTION_TYPECD
        impexpPortcd: "", //进出境关别
        supvModecd: "", //监管方式
        trspModecd: "", //运输方式
        destinationNatcd: "", //启抵国（地区）
        natcd: "", //产终国（地区）
        gdecd: "", //商品编号
        lawfQty: "", //第一法定数量
        secdLawfQty: "", //第二法定数量
        gdsSpcfModelDesc: "", //品牌类型
        sumRmbVal: "", //统计人民币值
        rmk: ""
      },
      impexpPortcdName: [],
      page_rules: {
        directionTypecd: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        impexpPortcd: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        supvModecd: { required: true, message: "不能为空", trigger: "change" },
        trspModecd: { required: true, message: "不能为空", trigger: "change" },
        destinationNatcd: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        natcd: { required: true, message: "不能为空", trigger: "change" },
        gdecd: {
          required: true,
          min: 10,
          max: 10,
          message: "长度在必须是10个数字",
          trigger: "change"
        },
        lawfQty: { required: true, message: "不能为空", trigger: "change" },
        gdsSpcfModelDesc: {
          required: true,
          message: "不能为空",
          trigger: "change"
        },
        sumRmbVal: { required: true, message: "不能为空", trigger: "change" }
      },
      headColor: true,
      tableData: [],
      tableDataCopy: this.listDate,
      model: false,
      ep_page: {
        page: 1,
        size: 10
      },
      totalcount: 0,
      buttonStatus: "",
      customSearch: {}
    };
  },
  mounted() {
    this.makePaging(10, 1, this.listDate);
  },
  methods: {
    // 添加列表
    doBodyAdd() {
      this.$refs.bodyForm && this.$refs.bodyForm.reset();
      this.buttonStatus = 2;
      this.model = true;
    },
    // 删除列表某一项
    doBodyDelete() {
      //删除table数据
      let selectData = this.$refs.table.getData("select");
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
            let selectData = this.$refs.table.getData("select");
            selectData.forEach((e, index) => {
              if (e.leadId > -1) {
                filterData = this.tableDataCopy.filter(value => {
                  return e.leadId !== value.leadId;
                });
              } else if (e.id) {
                filterData = this.tableDataCopy.filter(value => {
                  return e.id !== value.id;
                });
              } else {
                filterData = this.tableDataCopy.filter((value, indexCopy) => {
                  return index !== indexCopy;
                });
              }
              this.tableDataCopy = filterData;
            });
            let filterData = this.filterData(
              this.customSearch,
              this.tableDataCopy
            );
            this.makePaging(this.ep_page.size, this.ep_page.page, filterData);
            this.localType = "";
          } else {
            return;
          }
        }
      });
    },
    // 修改列表某一项
    doBodyUpdate() {
      let selectData = this.$refs.table.getData("select");
      if (selectData.length === 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
      } else if (selectData.length > 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
      } else {
        this.buttonStatus = 1; //代表选中一条
        setTimeout(() => {
          this.bodyForm = cloneObj(selectData[0]);
        }, 100);
        this.model = true;
      }
    },
    handleSelect() {},
    // 分页操作函数
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
    // 添加操作 最终确认按钮
    makeSure() {
      let bodyForm = this.bodyForm;
      if (!(bodyForm.lawfQty > 0)) {
        bodyForm.lawfQty = "";
      }
      if (bodyForm.secdLawfQty && !(bodyForm.secdLawfQty > 0)) {
        bodyForm.secdLawfQty = "";
      }
      if (!(bodyForm.sumRmbVal > 0)) {
        bodyForm.sumRmbVal = "";
      }
      this.$refs["bodyForm"].validate(valid => {
        if (valid) {
          if (this.buttonStatus == 0) {
            return;
          } else if (this.buttonStatus == 1) {
            let bodyForm = this.bodyForm;
            this.indexChange = this.$refs.table.getDataIndex("select")[0];
            this.tableData.splice(this.indexChange, 1, cloneObj(bodyForm));
            let updateDate =
              this.indexChange + (this.ep_page.page - 1) * this.ep_page.size;
            this.tableDataCopy.splice(updateDate, 1, cloneObj(bodyForm));
            this.$refs.bodyForm && this.$refs.bodyForm.reset();
            this.model = false;
            this.buttonStatus = 0;
          } else if (this.buttonStatus == 2) {
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
    // 添加操作 最终关闭按钮
    closeModel() {
      this.$refs.bodyForm.reset();
      this.model = false;
    },
    // 分页中的  数据函数
    makePaging(size, page, data) {
      let begin = (page - 1) * size;
      let end = begin + size;
      let newData = data.slice(begin, end);
      this.totalcount = data.length;
      this.tableData = newData;
    },
    // 数据过滤操作
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

