<template>
  <div>
    <ep-model title="关联出入库单证" v-model="model" width="800px" :wrap-close="false">
      <ep-form ref="bodyIETForm" :form="bodyIETForm" :rules="page_rules" name-width="168px">
        <ep-row :gutter="7">
          <ep-col :col="20">
            <ep-form-item attr="portNo" label="凭证编号">
              <ep-input v-model="bodyIETForm.portNo" disabled name="portNo" :maxlength="20"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="20">
            <ep-form-item label="出入库编号" attr="inExpWhNo">
              <ep-input v-model.trim="bodyIETForm.inExpWhNo" name="inExpWhNo" :maxlength="64"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="20">
            <ep-form-item label="ERP/WMS出入库日期" attr="inExpTime">
              <ep-date v-model.trim="bodyIETForm.inExpTime" name="inExpTime" type="dateTime"></ep-date>
            </ep-form-item>
          </ep-col>
          <ep-col :col="20">
            <ep-form-item label="备注" attr="rmk">
              <ep-input v-model.trim="bodyIETForm.rmk" name="rmk" :maxlength="400" type="textarea"></ep-input>
            </ep-form-item>
          </ep-col>
        </ep-row>
        <div style="text-align:center">
          <WmsButton @click="makeSure(localType)">确定</WmsButton>
          <WmsButton @click="model = !model" icon="close" :loading="loading">关闭</WmsButton>

          <!-- <ep-button type="primary" size="small" @click="makeSure(localType)" icon="checkmark-round">确定</ep-button>
          <ep-button type="danger" size="small" @click="model = !model" icon="close" :loading="loading">关闭</ep-button> -->
        </div>
      </ep-form>
    </ep-model>
    <div class="ep-card card-margin relative">
      <div class="card-body">
        <div class="block">
          <WmsButton v-if='dragFlag' style="margin-left:0px;" @click="doBodyAdd">添加</WmsButton>
          <!-- <ep-button type="primary" size="small" @click="doBodyAdd" icon="plus-round">添加</ep-button> -->
          <!-- <ep-button type="primary" size="small" @click="doBodyUpdate" icon="edit">修改</ep-button> -->
          <!-- <ep-button type="danger" size="small" @click="doBodyDelete" icon="trash-a">删除</ep-button> -->
          <!-- <ep-button type="danger" size="small" @click="clearTable" icon="trash-a">清空</ep-button> -->
        </div>
        <div class="block">
          <ep-table ref="table" border :height="400" :data="updata?tableDataUpdata:tableData" :head-color="headColor">
            <!-- <ep-table-item type="select"></ep-table-item> -->
            <ep-table-item column="opt" title="操作" width="200" v-if='dragFlag'>
              <template slot-scope="props">

                <wms-icon type="cancel" @click="doBodyDelete(props.row,props.row.id)"></wms-icon>
              </template>
            </ep-table-item>
            <ep-table-item column="preentNo" width="300" title="凭证编号"></ep-table-item>
            <ep-table-item column="inExpWhNo" width="300" title="ERP/WMS出入库编号"></ep-table-item>
            <ep-table-item column="inExpTime" width="200" title="ERP/WMS出入库日期"></ep-table-item>
            <ep-table-item column="rmk" title="备注" width="400">
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
import misList from "src/common/mislist";
import mixin from "../mixin";
import { cloneObj } from "utils";
export default {
  extends: misList, // 务必继承
  mixins: [mixin],
  components: {},
  props: {
    dragFlag: {
      type: Boolean,
      default: true
    },
    list2Data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    list2DataUpdata: {
      type: Array,
      default: function() {
        return [];
      }
    },
    updata: {
      type: Boolean,
      default: function() {
        return false;
      }
    }
  },
  data() {
    return {
      model: false, // 表体弹窗
      loading: false,
      headColor: true,
      tableData: [],
      tableDataUpdata: [],
      totalcount: null,
      ep_page: {
        page: 1,
        size: 10
      },
      tableDataCopy: this.list2Data,
      tableDataCopyUpdata: this.list2DataUpdata,

      dclUnitcd: [],
      bodyIETForm: {
        id: "",
        pid: "",
        orgId: this.$store.getters.getId, //  必填
        preentNo: "", //凭证编号
        inExpWhNo: "", //出入库编号
        inExpTime: "", // 出入库日期
        rmk: ""
      },
      customSearch: {},
      firstLoad: false,
      localType: "",
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
  created() {},
  mounted() {
    if (this.updata) {
      this.makePaging(10, 1, this.tableDataCopyUpdata);
    } else {
      this.makePaging(10, 1, this.tableDataCopy);
    }
  },
  watch: {
    list2Data: {
      handler(newData, olddata) {
        this.tableDataCopy = newData;
        this.makePaging(
          this.ep_page.size,
          this.ep_page.page,
          this.tableDataCopy
        );
      },
      deep: true,
      immediate: true
    },
    list2DataUpdata: {
      handler(newData, olddata) {
        this.tableDataCopyUpdata = newData;
        this.makePaging(
          this.ep_page.size,
          this.ep_page.page,
          this.tableDataCopyUpdata
        );
      },
      deep: true,
      immediate: true
    },
    clearDetatype: {
      handler(newName, oldName) {
        if (this.$route.query.id && this.firstLoad) {
          console.log("清空数据--关联出入库单证--updata页面");
          this.tableDataUpdata = [];
          this.tableDataCopyUpdata = [];
        } else {
          console.log("清空数据--关联出入库单证-生成页面");
          this.tableData = [];
          this.tableDataCopy = [];
        }
        this.firstLoad = true;
      },
      immediate: true
    }
  },
  computed: {
    // 清空表体书
    clearDetatype() {
      if (this.update) {
        return this.$store.getters.getClearDataEdit;
      } else {
        return this.$store.getters.getClearData;
      }
    }
  },
  methods: {
    // 分页
    makePaging(size, page, data) {
      let begin = (page - 1) * size;
      let end = begin + size;
      let newData = data.slice(begin, end);
      this.totalcount = data.length;
      if (this.updata) {
        this.tableDataUpdata = newData;
      } else {
        this.tableData = newData;
      }
    },
    // 翻页
    handleCurrentChange(val) {
      this.ep_page.page = val;
      if (this.updata) {
        this.makePaging(
          this.ep_page.size,
          this.ep_page.page,
          this.filterData(this.customSearch, this.tableDataCopyUpdata)
        );
      } else {
        this.makePaging(
          this.ep_page.size,
          this.ep_page.page,
          this.filterData(this.customSearch, this.tableDataCopy)
        );
      }
    },
    // 每页条数
    handleSizeChange(val) {
      this.ep_page.size = val;
      if (this.updata) {
        this.makePaging(
          this.ep_page.size,
          this.ep_page.page,
          this.filterData(this.customSearch, this.tableDataCopyUpdata)
        );
      } else {
        this.makePaging(
          this.ep_page.size,
          this.ep_page.page,
          this.filterData(this.customSearch, this.tableDataCopy)
        );
      }
    },
    doBodyDelete(row) {
      //删除table数据
      let selectData = row;
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
            let allDelectIndex = [];
            let selectData = [row];
            if (this.updata) {
              selectData.forEach(e => {
                let updateDate = this.tableDataCopyUpdata.findIndex(value => {
                  return value.leadId == e.leadId;
                });
                allDelectIndex.push(updateDate);
              });
              allDelectIndex = allDelectIndex.sort((a, b) => b - a);
              allDelectIndex.forEach((num, i) => {
                this.tableDataCopyUpdata.splice(num, 1);
              });
              let filterData = this.filterData(
                this.customSearch,
                this.tableDataCopyUpdata
              );
              this.makePaging(this.ep_page.size, this.ep_page.page, filterData);
            } else {
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
              this.makePaging(this.ep_page.size, this.ep_page.page, filterData);
            }

            this.localType = "";
          } else {
            return;
          }
        }
      });
    },
    //修改
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
        this.localType = "修改"; //代表选中一条
        this.bodyIETForm = cloneObj(selectData[0]);
        this.model = true;
      }
    },
    doBodyAdd() {
      this.$refs.bodyIETForm && this.$refs.bodyIETForm.reset();
      this.model = true;
      this.localType = "添加";
    },

    // 搜索条件重置
    reset(e) {
      this.$refs[e].reset();
    },
    // 关联单证编号 是否与商品编码一致

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
    },
    // 表体添加数据
    makeSure(value) {
      this.$refs["bodyIETForm"].validate(valid => {
        if (valid) {
          if (this.updata) {
            if (value == "添加") {
              this.bodyIETForm.leadId =
                this.tableDataCopyUpdata[this.tableDataCopyUpdata.length - 1] ==
                undefined
                  ? 0
                  : this.tableDataCopyUpdata[
                      this.tableDataCopyUpdata.length - 1
                    ].leadId + 1;
              let bodyForm = this.bodyIETForm;
              this.tableDataUpdata.push(cloneObj(bodyForm));
              this.tableDataCopyUpdata.push(cloneObj(bodyForm));
              this.totalcount++;
              this.ep_page.page = Math.ceil(
                this.totalcount / this.ep_page.size
              );
              this.localType = "添加";
              this.$refs.bodyIETForm && this.$refs.bodyIETForm.reset();
              this.model = false;
            }
            if (value == "修改") {
              let bodyForm = this.bodyIETForm;
              this.indexChange = this.$refs.table.getDataIndex("select")[0];
              this.tableDataUpdata.splice(
                this.indexChange,
                1,
                cloneObj(bodyForm)
              );
              let updateDate =
                this.indexChange + (this.ep_page.page - 1) * this.ep_page.size;
              this.tableDataCopyUpdata.splice(
                updateDate,
                1,
                cloneObj(bodyForm)
              );
              this.$refs.bodyIETForm && this.$refs.bodyIETForm.reset();
              this.model = false;
              this.localType = "";
            }
          } else {
            if (value == "添加") {
              this.bodyIETForm.leadId =
                this.tableDataCopy[this.tableDataCopy.length - 1] == undefined
                  ? 0
                  : this.tableDataCopy[this.tableDataCopy.length - 1].leadId +
                    1;
              let bodyForm = this.bodyIETForm;
              this.tableData.push(cloneObj(bodyForm));
              this.tableDataCopy.push(cloneObj(bodyForm));
              this.totalcount++;
              this.ep_page.page = Math.ceil(
                this.totalcount / this.ep_page.size
              );
              this.localType = "添加";
              this.$refs.bodyIETForm && this.$refs.bodyIETForm.reset();
              this.model = false;
            }
            if (value == "修改") {
              let bodyForm = this.bodyIETForm;
              this.indexChange = this.$refs.table.getDataIndex("select")[0];
              this.tableData.splice(this.indexChange, 1, cloneObj(bodyForm));
              let updateDate =
                this.indexChange + (this.ep_page.page - 1) * this.ep_page.size;
              this.tableDataCopy.splice(updateDate, 1, cloneObj(bodyForm));
              this.$refs.bodyIETForm && this.$refs.bodyIETForm.reset();
              this.model = false;
              this.localType = "";
            }
          }
        }
      });
    }
  }
};
</script>
