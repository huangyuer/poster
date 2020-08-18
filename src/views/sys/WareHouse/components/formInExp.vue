<template>
  <div>
    <ep-model title="关联出入库单证" v-model="model" width="700px" :wrap-close="false">
      <ep-form ref="bodyIETForm" :form="bodyIETForm" :rules="page_rules" name-width="168px">
        <ep-row :gutter="7">
          <ep-form-item attr="whRecPreentNo" label="凭证编号">
            <ep-input
              v-model="bodyIETForm.whRecPreentNo"
              name="whRecPreentNo"
              :maxlength="20"
              :disabled="true"
            ></ep-input>
          </ep-form-item>
        </ep-row>
        <ep-row :gutter="7">
          <ep-form-item label="ERP/WMS出入库编号" attr="inExpWhNo">
            <ep-input
              v-model="bodyIETForm.inExpWhNo"
              name="inExpWhNo"
              :maxlength="64"
              :disabled="isDtInExp&&headerForm.optStatus!='5'&&headerForm.optStatus!='40'||dragEdit"
            ></ep-input>
          </ep-form-item>
        </ep-row>
        <ep-row :gutter="7">
          <ep-form-item label="ERP/WMS出入库日期" attr="inExpTime">
            <ep-date
              v-model="bodyIETForm.inExpTime"
              name="inExpTime"
              type="dateTime"
              :disabled="isDtInExp&&headerForm.optStatus!='5'&&headerForm.optStatus!='40'||dragEdit"
            ></ep-date>
          </ep-form-item>
        </ep-row>
        <ep-row :gutter="7">
          <ep-form-item attr="rmk" label="备注">
            <ep-input
              v-model="bodyIETForm.rmk"
              name="rmk"
              type="textarea"
              :disabled="isDtInExp&&headerForm.optStatus!='5'&&headerForm.optStatus!='40'||dragEdit"
            ></ep-input>
          </ep-form-item>
        </ep-row>
        <ep-row>
          <div style="text-align:center">
            <!-- <ep-button
              type="primary"
              size="small"
              @click="makeSure(localType)"
              icon="checkmark-round"
            >确定</ep-button>-->
            <WmsButton @click="makeSure(localType)">确定</WmsButton>
          </div>
        </ep-row>
      </ep-form>
    </ep-model>

    <!-- <ep-model title="关联出入库单证" v-model="model" width="1000px" :wrap-close="false">
      <ep-form ref="bodyIETForm" :form="bodyIETForm" name-width="168px" :rules="page_rules">
        <ep-row :gutter="7">
          <ep-col :col="10">
            <ep-form-item label="ERP/WMS出入库编号" attr="inExpWhNo">
              <ep-input
                v-model.trim="bodyIETForm.inExpWhNo"
                name="inExpWhNo"
                :maxlength="64"
                :disabled="isDtInExp&&headerForm.optStatus!='5'"
              ></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="10">
            <ep-form-item label="ERP/WMS出入库日期" attr="inExpTime">
              <ep-date
                v-model.trim="bodyIETForm.inExpTime"
                name="inExpTime"
                type="dateTime"
                :disabled="isDtInExp&&headerForm.optStatus!='5'"
              ></ep-date>
            </ep-form-item>
          </ep-col>
        </ep-row>
        <div style="text-align:center" v-if="isDtInExp&&headerForm.optStatus=='5'||!isDtInExp">
          <ep-button
            type="primary"
            size="small"
            @click="makeSure(localType)"
            icon="checkmark-round"
            :loading="applyLoading"
          >确定</ep-button>
          <ep-button
            type="danger"
            size="small"
            @click="model = !model"
            icon="close"
            :loading="loading"
          >关闭</ep-button>
        </div>
      </ep-form>
    </ep-model>-->
    <div class="ep-card card-margin relative">
      <div class="card-body">
        <div class="block" v-if="!isDtInExp&&!dragEdit">
          <!-- <ep-button type="primary" size="small" @click="doBodyAdd" icon="plus-round">添加</ep-button> -->
          <WmsButton style="margin:0" @click="doBodyAdd" v-if="!addType">添加</WmsButton>
          <!-- <ep-button
            type="danger"
            size="small"
            @click="doBodyDelete"
            icon="trash-a"
            :loading="delLoading"
          >删除</ep-button>-->
        </div>
        <div class="block" v-if="isDtInExp&&(headerForm.optStatus=='5'||headerForm.optStatus=='40')&&!dragEdit">
          <!-- <ep-button type="primary" size="small" @click="doBodyAdd" icon="plus-round">添加</ep-button> -->
          <WmsButton style="margin:0" @click="doBodyAdd" v-if="showInexp && inexpRlt">添加</WmsButton>
          <WmsButton :loading="submitLoading" @click="doBodySubmit" v-if="showInexp && inexpRlt " >确认</WmsButton>
          <!-- <ep-button
            type="danger"
            size="small"
            @click="doBodyDelete"
            icon="trash-a"
            :loading="delLoading"
          >删除</ep-button>
          <ep-button
            type="primary"
            size="small"
            @click="doBodySubmit"
            icon="checkmark-round"
            :loading="submitLoading"
          >确认</ep-button>-->
        </div>
        <div class="block">
          <ep-table
            border
            ref="table"
            :height="400"
            :data="tableData"
            :head-color="headColor"
            @row-dblclick="selectInfo"
          >
            <!-- <ep-table-item type="select" v-if="isDtInExp&&headerForm.optStatus=='5'||!isDtInExp"></ep-table-item> -->
            <ep-table-item column="opt" title="操作" width="200" v-if="!isDtInExp&&!dragEdit">
              <template slot-scope="props">
                <wms-icon type="cancel" @click="doBodyDelete(props.row,props.row.id)"></wms-icon>
              </template>
            </ep-table-item>
            <ep-table-item
              column="opt"
              title="操作"
              width="200"
              v-if="isDtInExp&&(headerForm.optStatus=='5'||headerForm.optStatus=='40')&&!dragEdit  && showInexp && inexpRlt"
            >
              <template slot-scope="props">
                <wms-icon type="cancel" @click="doBodyDelete(props.row,props.row.id)"></wms-icon>
                <!-- <wms-icon type="confirm" @click="doBodySubmit(props.row,props.row.id)"></wms-icon> -->
              </template>
            </ep-table-item>

            <ep-table-item column="whRecPreentNo" width="250" title="凭证编号"></ep-table-item>
            <ep-table-item column="inExpWhNo" width="250" title="ERP/WMS出入库编号"></ep-table-item>
            <ep-table-item column="inExpTime" title="ERP/WMS出入库日期" width="250"></ep-table-item>
            <ep-table-item column="rmk" title="备注">
              <template slot-scope="props">
                <p class="rmk-style">{{ props.row.rmk }}</p>
              </template>
            </ep-table-item>
          </ep-table>
        </div>
        <div class="block">
          <ep-pager
            right
            @size-change="handleSizeChange"
            @change="handleCurrentChange"
            :now-page="ep_page.page"
            :page-size="ep_page.size"
            :total-num="totalcount"
          ></ep-pager>
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
    dragEdit: {
      type: Boolean,
      default: false
    },
    listData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    headerForm: {
      type: Object,
      default: function() {
        return {};
      }
    },
    isDtInExp: {
      type: Boolean,
      default: false
    },
    addType: {
      default: false
    },
    showInexp:{
      type: Boolean,
    }
  },
  data() {
    return {
      submitLoading: false,
      applyLoading: false,
      delLoading: false,
      model: false, // 表体弹窗
      loading: false,
      headColor: true,
      tableData: [],
      totalcount: null,
      inexpRltType:"",
      inexpRlt:true,
      ep_page: {
        page: 1,
        size: 10
      },
      page_rules: {
        inExpWhNo: { required: true, message: "不能为空", trigger: "change" },
        inExpTime: {
          required: true,
          message: "不能为空",
          trigger: "change"
        }
      },
      tableDataCopy: this.listData,
      bodyIETForm: {
        id: "",
        pid: this.headerForm.id,
        orgId: this.headerForm.orgId, //  必填
        whRecPreentNo: this.headerForm.whRecPreentNo, //凭证编号
        inExpWhNo: "", //出入库编号
        inExpTime: "", // 出入库日期
        rmk: ""
      },
      customSearch: {},
      localType: ""
    };
  },
  created() {
    // console.log(this.showInexp)
  },
  mounted() {
    if (this.isDtInExp && this.headerForm.optStatus != "5")
      this.page_rules = {};
    this.makePaging(10, 1, this.tableDataCopy);
  },
  watch: {
    listData: {
      handler(newData, olddata) {
        this.tableDataCopy = newData;
        this.makePaging(
          this.ep_page.size,
          this.ep_page.page,
          this.tableDataCopy
        );
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    selectInfo(event, row, index) {
      if ((this.isDtInExp && this.headerForm.optStatus != "5")||this.dragEdit) {
        this.bodyIETForm = row;
        this.model = true;
      }
    },
    //确认
    doBodySubmit() {
      let data = {
        pid: this.headerForm.id,
        whRecPreentNo: this.headerForm.whRecPreentNo
      };
      this.$post("wareHouseSubmitInExp", data)
        .then(responseData => {
          // this.tableDataCopy = responseData.map.data.warehouseInExp;
          // this.makePaging(10, 1, this.tableDataCopy);
          this.inexpRltType=responseData.map.inexpRltType
          if(this.inexpRltType==1){
            this.inexpRlt=false;
          }
        })
        .catch(e => {});
    },
    //详情
    getBscDetails() {
      let data = {};
      data["id"] = parseInt(this.$route.query.id);
      this.$post("wareHouseBscDetails", data)
        .then(responseData => {
          this.tableDataCopy = responseData.map.data.warehouseInExp;
          this.makePaging(
            this.ep_page.size,
            this.ep_page.page,
            this.tableDataCopy
          );
        })
        .catch(e => {});
    },
    //删除接口
    inExpDelApi(row) {
      // let selectData = this.$refs.table.getData("select");
      let selectData = [row];
      this.delLoading = true;
      let ids = [];
      selectData.forEach(item => {
        ids.push(item.id);
      });
      // let ids = id.join();
      let data = {};
      data["ids"] = ids;

      // return
      this.$post("wareHouseDelInExp", data)
        .then(responseData => {
          this.getBscDetails();
          this.delLoading = false;
          // this.$pop({
          //   type: "success",
          //   message: "删除成功"
          // });
        })
        .catch(e => {
          this.delLoading = false;
        });
      this.localType = "";
    },
    //修改和新增接口
    inExpApi(value) {
      if (value == "添加") {
        let bodyForm = this.bodyIETForm;
        let params = {
          pid: bodyForm.pid,
          inExpWhNo: bodyForm.inExpWhNo,
          inExpTime: bodyForm.inExpTime,
          whRecPreentNo: bodyForm.whRecPreentNo,
          rmk: bodyForm.rmk
        };
        this.applyLoading = true;
        this.$post("wareHouseAddInExp", params)
          .then(res => {
            this.getBscDetails();
            this.$refs.bodyIETForm && this.$refs.bodyIETForm.reset();
            this.applyLoading = false;
            this.model = false;
          })
          .catch(e => {
            this.$refs.bodyIETForm && this.$refs.bodyIETForm.reset();
            this.applyLoading = false;
            this.model = false;
          });
        this.localType = "添加";
      }
      if (value == "修改") {
        let bodyForm = this.bodyIETForm;
        this.indexChange = this.$refs.table.getDataIndex("select")[0];
        let params = {
          id: bodyForm.id,
          inExpWhNo: bodyForm.inExpWhNo,
          inExpTime: bodyForm.inExpTime,
          rmk: bodyForm.rmk
        };
        this.applyLoading = true;
        this.$post("wareHouseUpdateInExp", params)
          .then(res => {
            this.getBscDetails();
            this.$refs.bodyIETForm && this.$refs.bodyIETForm.reset();
            this.applyLoading = false;
            this.model = false;
          })
          .catch(e => {
            this.$refs.bodyIETForm && this.$refs.bodyIETForm.reset();
            this.applyLoading = false;
            this.model = false;
          });
        this.localType = "";
      }
    },
    queryOperStatus(event, row, index) {
      this.bodyIETForm = row;
      this.model = true;
    },
    // 分页
    makePaging(size, page, data) {
      let begin = (page - 1) * size;
      let end = begin + size;
      let newData = data.slice(begin, end);
      this.totalcount = data.length;
      this.tableData = newData;
    },
    // 翻页
    handleCurrentChange(val) {
      this.ep_page.page = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.tableDataCopy)
      );
    },
    // 每页条数
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.tableDataCopy)
      );
    },
    doBodyDelete(row, rowId) {
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
            if (this.isDtInExp) {
              this.inExpDelApi(row);
              return;
            }
            let allDelectIndex = [];
            // let selectData = this.$refs.table.getData("select");
            let selectData = [row];
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
            // this.ep_page.page = 1;
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
      if (this.isDtInExp && this.headerForm.optStatus != "5"&&this.headerForm.optStatus!='40') {
        this.model = false;
        return;
      }
      this.$refs["bodyIETForm"].validate(valid => {
        if (valid) {
          if (this.isDtInExp) {
            this.inExpApi(value);
            return;
          }
          if (value == "添加") {
            this.bodyIETForm.leadId =
              this.tableDataCopy[this.tableDataCopy.length - 1] == undefined
                ? 0
                : this.tableDataCopy[this.tableDataCopy.length - 1].leadId + 1;
            let bodyForm = this.bodyIETForm;
            this.tableData.push(cloneObj(bodyForm));
            this.tableDataCopy.push(cloneObj(bodyForm));
            this.totalcount++;
            this.ep_page.page = Math.ceil(this.totalcount / this.ep_page.size);
            this.localType = "添加";
            this.$refs.bodyIETForm && this.$refs.bodyIETForm.reset();
            this.model = false;
          }
          if (value == "修改") {
            let bodyForm = this.bodyIETForm;
            this.indexChange = this.$refs.table.getDataIndex("select")[0];
            this.tableData.splice(this.indexChange, 1, cloneObj(bodyForm));
            let updateDate = this.tableDataCopy.findIndex(value => {
              return value.leadId == bodyForm.leadId;
            });
            this.tableDataCopy.splice(updateDate, 1, cloneObj(bodyForm));
            this.$refs.bodyIETForm && this.$refs.bodyIETForm.reset();
            this.model = false;
            this.localType = "";
          }
        }
      });
    }
  }
};
</script>
