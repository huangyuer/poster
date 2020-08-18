 <template>
  <div>
    <!-- 商品料号，商品编码，商检编码，商品名称，操作状态 -->
    <div class="panel-main-content">
      <!--筛选栏组-->
      <div class="search-card contents-card card-margin">
        <wms-title title="">
          <div class="panel panel-default">
            <!-- <div class="card-title zero-padding">
            <span class="weight">货物信息表查询</span>
            </div>-->
            <ep-form ref="searchForm" :form="searchForm" name-width="138px">
              <ep-row :gutter="7">
                <ep-col :col="8">
                  <ep-form-item label="商品料号" attr="gdsMtno">
                    <ep-input v-model="searchForm.gdsMtno" name="gdsMtno" :maxlength="32"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="商品编码" attr="gdecd">
                    <ep-input v-model="searchForm.gdecd" name="gdecd" :maxlength="10"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="商检编码" attr="ciqCode">
                    <ep-input v-model="searchForm.ciqCode" name="ciqCode" :maxlength="10"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="商品名称" attr="gdsNm">
                    <ep-input v-model="searchForm.gdsNm" name="gdsNm" :maxlength="768"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="状态" attr="optStatus">
                    <ep-select v-model="searchForm.optStatus" name="optStatus">
                      <ep-select-item :index="1" label="暂存"></ep-select-item>
                      <ep-select-item :index="18" label="已确认"></ep-select-item>
                      <ep-select-item :index="3" label="海关入库成功"></ep-select-item>
                      <ep-select-item :index="4" label="海关入库失败"></ep-select-item>
                      <ep-select-item :index="5" label="审核通过"></ep-select-item>
                      <ep-select-item :index="6" label="审核拒绝"></ep-select-item>
                      <ep-select-item :index="20" label="变更申报"></ep-select-item>
                      <ep-select-item :index="17" label="转人工"></ep-select-item>
                      <ep-select-item :index="96" label="已作废"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="申报类型" attr="dclTypecd">
                    <ep-select v-model="searchForm.dclTypecd" name="dclTypecd">
                      <ep-select-item :index="1" label="备案"></ep-select-item>
                      <ep-select-item :index="2" label="变更"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
              </ep-row>
              <ep-row :gutter="7">
                <ep-col :col="24">
                  <!-- <ep-button
                  type="warning"
                  size="small"
                  icon="refresh"
                  @click="reset('searchForm')"
                >重置</ep-button>
                <ep-button
                  type="primary"
                  size="small"
                  @click="refresh(true)"
                  icon="search"
                  :loading="loading"
                  >查询</ep-button>-->
                  <WmsButton @click="addOther">新增</WmsButton>
                  <WmsButton @click="reset('searchForm')">重置</WmsButton>
                  <WmsButton :loading="loading" @click="refresh(true)">查询</WmsButton>
                  <file-upload
                    ref="Upload"
                    :uploadData="uploadData"
                    :uploadType="1"
                    :statusFlag="true"
                    @upButtonClick="upButtonClick"
                  />
                </ep-col>
              </ep-row>
            </ep-form>
          </div>
        </wms-title>

        <div class="wms-dividing-line"></div>

        <!--表格-->
        <div class="card-body">
          <div class="block">
            <div>
              <!-- <ep-button type="primary" size="small" @click="doCorrect" icon="edit">修改</ep-button>
              <ep-button type="primary" size="small" @click="doUpdate" icon="arrow-swap">变更</ep-button>
              <ep-button type="danger" size="small" @click="doDelete" icon="trash-a">删除</ep-button>
              <ep-button
                type="primary"
                size="small"
                @click="doDeclare"
                icon="checkmark-round"
                :loading="declareLoading"
              >确认</ep-button>
              <file-upload ref="Upload" :uploadData="uploadData" :uploadType="1"
              :statusFlag="true" @upButtonClick="upButtonClick" />-->
              <!-- <span
                style="color:red;font-size:25px;position:absolute;padding-top:8px;padding-left:3px;"
              >*</span>
              <span
                style="padding-top: 10px;padding-left: 13px;position: absolute;font-size: 4px;color: rgba(0,0,0,.87);"
              >双击列表信息，可进入详情页面</span>-->
            </div>
          </div>
          <div class="block">
            <ep-table
              border
              ref="table"
              :height="400"
              :data="ep_data"
              :head-color="headColor"
              @selection-change="handleSelectChange"
            >
              <!-- <ep-table-item type="select"></ep-table-item> -->
              <ep-table-item column="opt" title="操作" width="200">
                <template slot-scope="props">
                  <wms-icon type="edit" @click="doCorrect(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="cancel" @click="doDelete(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="confirm" @click="doDeclare(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="change" @click="doUpdate(props.row,props.row.id)"></wms-icon>
                  <wms-icon type="detail" @click="detailInfo($event,props.row)"></wms-icon>
                </template>
              </ep-table-item>

              <ep-table-item column="gdsMtno" title="商品料号" width="170">
                <template slot-scope="props">
                  <!-- <ep-tooltip class="item" effect="dark" :content="props.row.gdsMtno" placement="top"> -->
                  <p
                    class="declareNoHover"
                    style="cursor:pointer;color:#3f88bf;max-width:122px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;box-sizing:border-box;"
                    @dblclick.stop
                    @click.stop="searchByGdsMtno(props.row)"
                  >{{props.row.gdsMtno}}</p>
                  <!-- </ep-tooltip> -->
                </template>
              </ep-table-item>
              <ep-table-item
                column="optStatus"
                title="状态"
                width="130"
                :formatter="this.optStatusFormatter"
              ></ep-table-item>
              <ep-table-item
                column="dclTypecd"
                title="申报类型"
                width="100"
                :formatter="optDclTypecdFormatter"
              ></ep-table-item>
              <ep-table-item column="gdecd" title="商品编码" width="125"></ep-table-item>
              <ep-table-item column="ciqCode" title="商检编码" width="135"></ep-table-item>
              <ep-table-item column="gdsNm" title="商品名称" width="230">
                <template slot-scope="props">
                  <!-- <ep-tooltip class="item" effect="dark" :content="props.row.gdsNm" placement="top"> -->
                  <p
                    style="max-width:182px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;box-sizing:border-box;"
                  >{{props.row.gdsNm}}</p>
                  <!-- </ep-tooltip> -->
                </template>
              </ep-table-item>

              <ep-table-item column="gdsSpcfModelDesc" title="规格型号" width="350">
                <template slot-scope="props">
                  <!-- <ep-tooltip class="item" effect="dark" :content="props.row.gdsSpcfModelDesc" placement="top"> -->
                  <p class="rmk-style">{{props.row.gdsSpcfModelDesc}}</p>
                  <!-- </ep-tooltip> -->
                </template>
              </ep-table-item>
              <ep-table-item
                column="natcd"
                title="国别"
                width="180"
                :formatter="destinationTranslate"
              >
                <!-- <template slot-scope="props">
                  <p style="max-width:72px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;box-sizing:border-box;">{{props.row.natcd}}</p>
                </template>-->
              </ep-table-item>
              <ep-table-item
                column="dclCurrcd"
                title="币制"
                width="140"
                :formatter="dclCurrcdFormatter"
              ></ep-table-item>
              <ep-table-item
                column="dclUnitcd"
                title="计量单位"
                width="100"
                :formatter="lawfUnitcdTranslate"
              ></ep-table-item>
              <ep-table-item column="dclTime" title="申报时间" width="180"></ep-table-item>
              <ep-table-item column="dclEr" title="申报人" width="105"></ep-table-item>
              <ep-table-item column="rmk" title="备注" width="350">
                <template slot-scope="props">
                  <!-- <ep-tooltip class="item" effect="dark" :content="props.row.rmk" placement="top"> -->
                  <p class="rmk-style">{{props.row.rmk}}</p>
                  <!-- </ep-tooltip> -->
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

      <!-- element-ui table  表格变更弹框 -->
      <ep-model title="货物信息表变更" v-model="isShowUpdate">
        <div class="ep-card card-margin relative" style="height: 80%;!important;">
          <div class="panel panel-default" style="padding: 10px;">
            <!-- <ep-button
              type="success"
              size="small"
              @click="doModifySave"
              icon="edit"
              :loading="modifySaveLoading"
            >暂存</ep-button>
            <ep-button
              type="success"
              size="small"
              @click="doModify"
              icon="checkmark-round"
              :loading="modifyLoading"
            >确认</ep-button>-->

            <WmsButton :loading="modifySaveLoading" @click="doModifySave">暂存</WmsButton>
            <WmsButton :loading="modifyLoading" @click="doModify">确认</WmsButton>
          </div>
          <div class="block">
            <div class="ep-table-body-wrap" style="height: 80%;!important">
              <el-form
                class="demo-form"
                :model="modifyForm"
                ref="ModifyForm"
                :rules="modifyForm.page_rules"
              >
                <el-table
                  :data="selectData"
                  max-height="600"
                  @header-click="headerClick"
                  :header-cell-style="getRowClass"
                >
                  <el-table-column prop="gdsMtno" label="商品料号" width="183">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.gdsMtno" disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="gdecd"
                    label="商品编码"
                    width="135"
                    :render-header="renderHeader"
                  >
                    <template slot-scope="scope">
                      <!-- <el-form-item :prop="scope.$index" :rules="page_rules.gdecd"> -->
                      <el-input v-model="scope.row.gdecd" type="text" :maxlength="10"></el-input>
                      <!-- </el-form-item> -->
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="ciqCode"
                    label="商检编码"
                    width="100"
                    :render-header="renderHeader"
                  >
                    <template slot-scope="scope">
                      <!-- <el-form-item prop="ciqCode" :rules="page_rules.ciqCode" :prop="'modifyForm.' + scope.$index + '.ciqCode'" > -->
                      <el-input v-model="scope.row.ciqCode" type="text" :maxlength="10"></el-input>
                      <!-- </el-form-item> -->
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="gdsNm"
                    label="商品名称"
                    width="260"
                    :render-header="renderHeader"
                  >
                    <template slot-scope="scope">
                      <!-- <el-form-item :prop="scope.$index" :rules="page_rules.gdsNm"> -->
                      <el-input v-model="scope.row.gdsNm" type="text" :maxlength="768"></el-input>
                      <!-- </el-form-item> -->
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="gdsSpcfModelDesc"
                    label="规格型号"
                    width="400"
                    :render-header="renderHeader"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.gdsSpcfModelDesc" type="text"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="natcd"
                    label="国别"
                    width="120"
                    :render-header="renderHeader"
                  >
                    <template slot-scope="scope">
                      <!-- <el-input v-model="scope.row.natcd" type="text"></el-input> -->
                      <ep-select
                        :label="countrys"
                        v-model="scope.row.natcd"
                        name="natcd"
                        filterable
                      >
                        <ep-select-item
                          v-for="(item) in countrys"
                          :key="item.id"
                          :index="item.countryCode"
                          :label="item.nameCn + ' ' + item.countryCode"
                        ></ep-select-item>
                      </ep-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="dclCurrcd"
                    label="币制"
                    width="120"
                    :render-header="renderHeader"
                  >
                    <template slot-scope="scope">
                      <!-- <el-input v-model="scope.row.dclCurrcd" type="text"></el-input> -->
                      <ep-select
                        :label="currLists"
                        v-model="scope.row.dclCurrcd"
                        name="dclCurrcd"
                        filterable
                      >
                        <ep-select-item
                          v-for="(item) in currLists"
                          :key="item.id"
                          :index="item.currCode"
                          :label="item.currName + ' ' + item.currCode"
                        ></ep-select-item>
                      </ep-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="dclUnitcd"
                    label="计量单位"
                    width="120"
                    :render-header="renderHeader"
                  >
                    <template slot-scope="scope">
                      <!-- <el-input v-model="scope.row.dclUnitcd" type="text"></el-input> -->
                      <ep-select
                        :label="unitLists"
                        v-model="scope.row.dclUnitcd"
                        name="dclUnitcd"
                        filterable
                      >
                        <ep-select-item
                          v-for="(item) in unitLists"
                          :key="item.id"
                          :index="item.unit"
                          :label="item.unitName + ' ' + item.unit"
                        ></ep-select-item>
                      </ep-select>
                    </template>
                  </el-table-column>

                  <el-table-column prop="rmk" label="备注" width="400" :render-header="renderHeader">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.rmk" type="text"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
            </div>
          </div>
        </div>
      </ep-model>
      <!-- element-ui modal dialogue 批量变更输入模态框 -->
      <ep-model
        :title="optTitleFormatter(selectedProperty)"
        v-model="isShowUpdateInput"
        middle
        width="500px"
        @close="closeInputModal"
      >
        <ep-row style="display: flex;justify-content: center;align-items: center;">
          <ep-col :col="20">
            <div
              class="demo-layout layout-light"
              v-if="optTitleFormatter(selectedProperty) == '币制'"
            >
              <ep-select :label="currLists" v-model="selectedVal" name="dclCurrcd" filterable>
                <ep-select-item
                  v-for="(item) in currLists"
                  :key="item.id"
                  :index="item.currCode"
                  :label="item.currName + ' ' + item.currCode"
                ></ep-select-item>
              </ep-select>
            </div>
            <div
              class="demo-layout layout-light"
              v-else-if="optTitleFormatter(selectedProperty) == '国别'"
            >
              <ep-select :label="countrys" v-model="selectedVal" name="natcd" filterable>
                <ep-select-item
                  v-for="(item) in countrys"
                  :key="item.id"
                  :index="item.countryCode"
                  :label="item.nameCn + ' ' + item.countryCode"
                ></ep-select-item>
              </ep-select>
            </div>
            <div
              class="demo-layout layout-light"
              v-else-if="optTitleFormatter(selectedProperty) == '计量单位'"
            >
              <ep-select :label="unitLists" v-model="selectedVal" name="dclUnitcd" filterable>
                <ep-select-item
                  v-for="(item) in unitLists"
                  :key="item.id"
                  :index="item.unit"
                  :label="item.unitName + ' ' + item.unit"
                ></ep-select-item>
              </ep-select>
            </div>
            <div class="demo-layout layout-light" v-else>
              <ep-input v-model="selectedVal"></ep-input>
            </div>
          </ep-col>
          <ep-col :col="4">
            <div class="demo-layout layout-lighter">
              <!-- <ep-button
                type="warning"
                size="small"
                icon="checkmark-round"
                @click="doUpdateInput"
                style="margin-left: 5px"
              >确认</ep-button>-->
              <WmsButton @click="doUpdateInput">确认</WmsButton>
            </div>
          </ep-col>
        </ep-row>
      </ep-model>
    </div>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import { getToken } from "utils";
import mixin from "./mixin";
import FileUpload from "src/components/FileUpload";
// import FileUpload from "src/components/FileUploadButton";

export default {
  name: "BaseGoodInfo",
  extends: misList, // 务必继承
  mixins: [misList, mixin],
  components: {
    FileUpload
  },
  created() {
    this.refresh(true);
  },
  data() {
    return {
      page_rules: {
        gdecd: {
          required: true,
          message: "不能为空",
          trigger: "change",
          min: 10,
          max: 10,
          message: "请输入10位长度数字"
        }, // 商品编码
        ciqCode: { required: true, message: "不能为空", trigger: "change" }, // 商检编码
        gdsNm: { required: true, message: "不能为空", trigger: "change" }, // 商品名称
        dclCurrcd: { required: true, message: "不能为空", trigger: "change" } // 商品名称
      },
      uploadUrl: "/baseserver/import", // excel上传地址
      isShowUpdate: false, // 是否展示修改表格
      isShowUpdateInput: false, // 是否展示修改输入模态框
      selectData: [], // 选中的表格数据
      selectedProperty: "", // 选中的表头属性统一修改后的input属性
      selectedVal: "", // 选中的表头属性统一修改后的input值
      loading: false,
      declareLoading: false, // 确认按钮 loading
      modifySaveLoading: false, // 变更-暂存按钮 loading
      modifyLoading: false, // 变更-确认按钮 loading
      listApi: "baseGoodList", // 搜索，取api.json里面的key值
      uploadData: {
        businessType: "base",
        sysCode: "lgsa",
        type: ""
      },
      settings: {
        pk: "id" // 主键
      },
      // 搜索条件
      searchForm: {
        gdsMtno: "", // 商品料号
        gdecd: "", // 商品编码
        ciqCode: "", // 商检编码
        gdsNm: "", // 商品名称
        optStatus: "", // 操作状态
        dclTypecd: "" // 申报类型
      },
      headColor: true,
      selectLength: 0, // 选中个数
      selectItems: [], // 选中项目

      // canDeclare: false, // 选中项 是否都为optStatus=‘1’（暂存状态）
      // 分页部分
      totalcount: 0,
      ep_page: {
        size: 10,
        page: 1
      },
      ep_data: [], //表格数据

      // edit start
      modifyForm: {
        ep_data: [],
        page_rules: {
          gdecd: {
            required: true,
            message: "不能为空",
            trigger: "change",
            min: 10,
            max: 10,
            message: "请输入10位长度数字"
          }, // 商品编码
          ciqCode: { required: true, message: "不能为空", trigger: "change" }, // 商检编码
          gdsNm: { required: true, message: "不能为空", trigger: "change" }, // 商品名称
          dclCurrcd: { required: true, message: "不能为空", trigger: "change" } // 商品名称
        }
      },
      // edit end
      masterCuscd: this.$store.getters.getOrgCustomId,
      tradeCode: this.$store.getters.getTradeCode,
      tradeId: this.$store.getters.getTradeId
    };
  },
  computed: {
    cCorrectStatus(status) {
      return status => {
        let obj = {};
        obj.optStatus = status;
        return `无法修改${this.optStatusFormatter(obj)}状态下的货物信息数据`;
      };
    }
  },
  watch: {
    isShowUpdate(newVal, oldVal) {
      if (!newVal) {
        this.refresh(true);
      }
    }
  },
  mounted() {},
  beforeRouteEnter(to, from, next) {
    console.log(from);
    next(vm => {
      if (from.path == "/excelImport" || from.path == "/BaseGoodUpdate") {
        vm.refresh(true);
      }
    });
  },
  methods: {
    // 选择导入/导入并申报 提示框
    addOther() {
      // this.$app.trigger("add-new-tab", "BaseGoodAdd");
      this.$router.push({
        path: "/BaseGoodAdd"
      });
    },
    upButtonClick(val) {
      let vm = this;
      this.$alert("请选择导入类型！", "提示", {
        confirmButtonText: "导入并申报",
        cancelButtonText: "导入",
        closeOnClickModal: true,
        showCancelButton: true,
        type: "warning",
        closeOnPressEscape: false,
        distinguishCancelAndClose: true
      })
        .then(() => {
          vm.$set(vm.uploadData, "type", "1");
          vm.$refs.Upload.$refs.upload.$refs["upload-inner"].handleClick();
        })
        .catch(action => {
          if (action == "cancel") {
            vm.$set(vm.uploadData, "type", "0");
            vm.$refs.Upload.$refs.upload.$refs["upload-inner"].handleClick();
          }
        });
    },
    // 根据商品料号查询
    searchByGdsMtno(row) {
      console.log(row);
      let gdsMtno = row.gdsMtno; // 料号
      this.$app.trigger("locate-tab", "BaseGoodDtInfo", {
        id: gdsMtno,
        _id: row.id,
        type: 1
      });
    },
    // 表格标题formatter
    optTitleFormatter(prop) {
      if (prop == "gdecd") {
        return "商品编码";
      } else if (prop == "ciqCode") {
        return "商检编码";
      } else if (prop == "ciqCode") {
        return "商品名称";
      } else if (prop == "gdsNm") {
        return "商检编码";
      } else if (prop == "gdsSpcfModelDesc") {
        return "规格型号";
      } else if (prop == "natcd") {
        return "国别";
      } else if (prop == "dclCurrcd") {
        return "币制";
      } else if (prop == "dclUnitcd") {
        return "计量单位";
      } else if (prop == "rmk") {
        return "备注";
      } else {
        return "未知";
      }
    },
    // 自定义更改表格 标题
    renderHeader(h, { column }) {
      // h即为cerateElement的简写，具体可看vue官方文档
      return h("div", [
        h("span", column.label),
        h("i", {
          class: "el-icon-edit",
          style: "color:#909399;margin-left:5px;"
        })
      ]);
    },
    // 自定义 更改表格 的 表头颜色
    getRowClass({ rowIndex }) {
      if (rowIndex == 0) {
        return "background:RGB(238,239,246)";
      } else {
        return "";
      }
    },
    // 点击变更信息表头
    headerClick(column, e) {
      let selectedProperty = column.property;

      this.isShowUpdateInput = true;
      this.selectedProperty = selectedProperty;
    },
    // 批量变更表格数据 确认
    doUpdateInput() {
      if (this.selectedVal) {
        this.$confirm({
          word: "是否确认更改?",
          callback: errorInfo => {
            if (errorInfo) {
              this.selectData.forEach(item => {
                this.$set(item, this.selectedProperty, this.selectedVal);
              });
              this.selectedVal = "";
              this.isShowUpdateInput = false;
            }
          }
        });
      } else {
        this.$pop({
          type: "danger",
          message: "不能置空值"
        });
      }
    },
    // 关闭更改输入框
    closeInputModal() {
      this.selectedVal = "";
    },
    // 【重置】
    reset(el) {
      this.$refs[el].reset();
    },
    handleSelectChange(val) {
      this.selectLength = val.length;
      this.selectItems = val;
    },
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.refresh(false);
    },
    handleCurrentChange(val) {
      this.ep_page.page = val;
      this.refresh(false);
    },
    // 【变更-暂存】
    doModifySave() {
      this.modifySaveLoading = true;
      let data = this.selectData;
      // data.push({ masterCuscd: this.masterCuscd, tradeCode: this.tradeCode, tradeId: this.tradeId })
      // data = Object.assign(data, { masterCuscd: this.masterCuscd, tradeCode: this.tradeCode, tradeId: this.tradeId })
      console.log(data);
      // return

      this.$post("baseGoodModifySave", data)
        .then(res => {
          console.log(res);
          this.modifySaveLoading = false;
          this.$pop({
            type: "success",
            message: "变更暂存成功"
          });
          // edit start
          this.refresh(true);
          this.isShowUpdate = false;
          // edit end
        })
        .catch(e => {
          console.log(e);
          this.modifySaveLoading = false;
        });
    },
    // 【变更-申报】
    doModify() {
      this.modifyLoading = true;
      let data = this.selectData;
      // data.push({ masterCuscd: this.masterCuscd, tradeCode: this.tradeCode, tradeId: this.tradeId })
      // data = Object.assign(data, { masterCuscd: this.masterCuscd, tradeCode: this.tradeCode, tradeId: this.tradeId })
      console.log(data);
      // return
      this.$post("baseGoodModify", data)
        .then(res => {
          console.log(res);
          this.modifyLoading = false;
          this.isShowUpdate = false;
          this.refresh(true);
          this.$pop({
            type: "success",
            message: "变更确认成功"
          });
          // edit start
          this.refresh(true);
          this.isShowUpdate = false;
          // edit end
        })
        .catch(e => {
          console.log(e);
          this.modifyLoading = false;
        });
    },
    // 【修改】
    doCorrect(row, id) {
      // let selectData = this.selectItems;

      // if (selectData.length == 0) {
      //   this.$pop({
      //     type: "danger",
      //     message: "请选择一条数据"
      //   });
      //   return;
      // }
      let selectStatus = row.optStatus;

      // if (selectData.length !== 1) {
      //   this.$pop({
      //     type: "danger",
      //     message: "请选择一条数据"
      //   });
      //   return;
      // }
      if (selectStatus == "1" || selectStatus == "4" || selectStatus == "6") {
        // let id = selectData[0].id;
        let menusList = this.$store.getters.getMenuTabInstance.items;
        menusList.forEach(function(item, index) {
          if (item.link == "/BaseGoodUpdate") {
            menusList.splice(index, 1);
          }
        });
        this.$app.trigger("locate-tab", "BaseGoodUpdate", id);
      } else {
        let vm = this;
        this.$pop({
          type: "danger",
          // message: vm.cCorrectStatus(selectStatus)
          message: "只有暂存，入库失败和审核拒绝的单证可以修改！"
        });
        return;
      }
    },
    // 【删除】
    doDelete(row, id) {
      // if (this.selectLength == 0) {
      //   this.$pop({
      //     type: "danger",
      //     message: "请选择数据"
      //   });
      //   return;
      // }

      // const isCanDelelte = val =>
      //   val.optStatus == "1" || val.optStatus == "4" || val.optStatus == "6"; // 是否为可删除 的条件判断方法
      // let canDelete = this.selectItems.every(isCanDelelte); // every 全部为真才为真
      // console.log(canDelete);

      let canDelete =
        row.optStatus == "1" || row.optStatus == "4" || row.optStatus == "6";
      if (canDelete) {
        let bscIds = [];
        // this.selectItems.forEach(item => {
        //   if (item.id) {
        bscIds.push(id);
        //   }
        // });
        // 可删除(均满足可删除条件)
        this.$confirm({
          word: "是否删除所选条目信息！",
          callback: errorInfo => {
            if (errorInfo) {
              let data = {};
              data["goodIds"] = bscIds;
              console.log(data);
              this.$post("baseGoodDelete", data)
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
            }
          }
        });
      } else {
        // 不可删除（至少有一个不满足删除条件）
        this.$pop({
          type: "danger",
          message:
            "该货物信息无法删除，请选择状态为暂存、入库失败或审核拒绝状态下的货物信息！"
        });
        return;
      }
    },
    // 【变更】
    doUpdate(row, id) {
      // let selectData = this.$refs.table.getData("select");
      // if (selectData.length <= 0) {
      //   this.$pop({
      //     type: "danger",
      //     message: "请选择需要变更的数据！"
      //   });
      //   return;
      // }

      // const isCanUpdate = val => val.optStatus == "5"; // 是否为可变更 的条件判断方法
      // let canUpdate = selectData.every(isCanUpdate); // every 全部为真才为真
      // console.log(canUpdate);

      const canUpdate = row.optStatus == "5";
      let selectData = [row];
      console.log("99999e99e9e", canUpdate, row);
      if (canUpdate) {
        this.isShowUpdate = true; // 弹出模态框
        this.selectData = selectData; // 被选择的一条/多条数据
        // this.selectData = row
      } else {
        this.$pop({
          type: "danger",
          message: "无法变更非审核通过状态下的货物信息数据！"
        });
        return;
      }
    },
    // 【确认】
    doDeclare(row, id) {
      let vm = this;
      // let selectData = this.selectItems;
      // console.log(selectData);

      // if (selectData.length == 0) {
      //   this.$pop({
      //     type: "danger",
      //     message: "请选择数据！"
      //   });
      //   return;
      // }

      // const isCanDeclare = val => val.optStatus == "1" ; // 是否为可申报 的条件判断方法
      // let canDeclare = this.selectItems.every(isCanDeclare); // every 全部为真才为真
      // console.log(isCanDeclare);
      let canDeclare = row.optStatus == "1";
      if (canDeclare) {
        let goodIds = [];
        // selectData.forEach(c => {
        //   if (c.id) {
        goodIds.push(id);
        //   }
        // });
        let data = {};
        data["goodIds"] = goodIds;

        this.$confirm({
          word: "是否要确认？",
          callback(info) {
            if (info) {
              vm.declareLoading = true;
              vm.$post("baseGoodDeclare", data)
                .then(res => {
                  vm.declareLoading = false;
                  vm.refresh(true);
                })
                .catch(e => {
                  vm.declareLoading = false;
                });
            }
          }
        });
      } else {
        this.$pop({
          type: "danger",
          message: "无法确认非暂存状态下的货物信息数据！"
        });
        this.canDeclare = true;
        return;
      }
    },
    // 明细
    detailInfo(event, row, index) {
      this.$app.trigger("locate-tab", "BaseGoodDtInfo", {
        id: row.id,
        type: 0
      });
    }
  }
};
</script>

<style scoped>
.ep-model-wrapper .ep-model-normal {
  height: 60% !important;
  overflow-y: scroll !important;
}
.declareNoHover:hover {
  text-decoration: underline;
}
</style>