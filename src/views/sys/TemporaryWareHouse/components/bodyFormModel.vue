<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <wms-title title="">
        <div class="panel panel-default">
          <ep-form ref="searchForm" :form="searchForm" name-width="138px">
            <ep-row :gutter="7">
              <ep-col :col="8">
                <ep-form-item label="进出区提发货凭证编号" attr="whNo">
                  <ep-input v-model="searchForm.whNo" name="whNo" disabled></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="进出区提发货凭证编号" attr="pid" v-if="show">
                  <ep-input v-model="searchForm.pdi" name="pid" disabled></ep-input>
                </ep-form-item>
              </ep-col>
              <!-- <ep-col :col="8">
                <ep-form-item attr="inExpType" label="ERP/WMS出入库类型" title="ERP/WMS出入库类型">
                  <ep-select :disabled="!searchType" v-model="searchForm.inExpType" @change="inExpChange" name="inExpType">
                    <ep-select-item index="1" label="一线进出"></ep-select-item>
                    <ep-select-item index="2" label="先报后送"></ep-select-item>
                    <ep-select-item index="3" label="分送集报"></ep-select-item>
                    <ep-select-item index="4" label="区内流转"></ep-select-item>
                    <ep-select-item index="5" label="区间流转"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col> -->
              <!-- <ep-col :col="8">
                <ep-form-item attr="ieTypecd" label="进出标志" v-show="searchType">
                  <ep-select v-model="searchForm.ieTypecd" name="ieTypecd" @change="ieTypecdChange">
                    <div v-if="stateValue == 4">
                      <ep-select-item index="I" label="入库"></ep-select-item>
                      <ep-select-item index="E" label="出库"></ep-select-item>
                    </div>
                    <div v-else>
                      <ep-select-item index="I" label="进区"></ep-select-item>
                      <ep-select-item index="E" label="出区"></ep-select-item>
                    </div>
                  </ep-select>
                </ep-form-item>
              </ep-col> -->
              <!-- <ep-col :col="8" v-show="!searchType">
              <ep-form-item label="绑定类型">
                <ep-select v-model="portSwitch" @change="bindTypecdChange">
                  <ep-select-item index="1" label="一车多票"></ep-select-item>
                  <ep-select-item index="2" label="一车一票"></ep-select-item>
                  <ep-select-item index="3" label="一票多车"></ep-select-item>
                </ep-select>
              </ep-form-item>
              </ep-col>-->
              <!-- <ep-col :col="8" v-show="searchType">
                <ep-form-item label="状态" attr="optStatus">
                  <ep-select v-model="searchForm.optStatus" name="optStatus">
                    <ep-select-item :index="1" label="暂存"></ep-select-item>
                    <ep-select-item :index="18" label="已确认"></ep-select-item>
                    <ep-select-item :index="3" label="海关入库成功"></ep-select-item>
                    <ep-select-item :index="4" label="海关入库失败"></ep-select-item>
                    <ep-select-item :index="17" label="待审核"></ep-select-item>
                    <ep-select-item :index="5" label="审核通过"></ep-select-item>
                    <ep-select-item :index="6" label="审核拒绝"></ep-select-item>
                    <ep-select-item :index="99" label="已删除"></ep-select-item>
                    <ep-select-item :index="40" label="确认收货"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col> -->
            </ep-row>
            <ep-row :gutter="7">
              <ep-col :col="24">
                <!-- <WmsButton @click="reset('searchForm')">重置</WmsButton> -->
                <!-- <WmsButton @click="refresh(true)" :loading="loading">查询</WmsButton> -->
              </ep-col>
            </ep-row>
          </ep-form>
        </div>
      </wms-title>
      <div class="wms-dividing-line"></div>

      <!--表格-->

      <div class="card-body">
        <WmsButton @click="doBinding">变更表体</WmsButton>
        <div class="block">
          <slot name="out-form"></slot>

        </div>
        <div class="block">
          <ep-table border ref="table" :height="400" :data="ep_data" :head-color="headColor" @selection-change="handleSelectionChange">
            <ep-table-item type="select"></ep-table-item>
            <!-- <ep-table-item column="inExpWhNo" title="ERP/WMS出入库编号" width="200"></ep-table-item> -->
            <ep-table-item column="whRecPreentNo" width="220" title="凭证编号"></ep-table-item>
            <ep-table-item column="gdsSeqno" width="100" title="明细序号"></ep-table-item>
            <!-- <ep-table-item column="portNo" width="220" title="关联单证编号" v-if="changeState==3"></ep-table-item>
              <ep-table-item
                column="rltPortSeqno"
                width="200"
                title="关联单证表体序号"
                v-if="changeState==3"
              ></ep-table-item> -->
            <ep-table-item column="gdsMtno" width="150" title="商品料号">
              <template slot-scope="props">
                <p class="text-style">{{ props.row.gdsMtno }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="gdecd" width="150" title="商品编码"></ep-table-item>
            <ep-table-item column="gdsNm" width="150" title="商品名称">
              <template slot-scope="props">
                <p class="text-style">{{ props.row.gdsNm }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="gdsSpcfModelDesc" width="150" title="规格型号">
              <template slot-scope="props">
                <p class="text-style">{{ props.row.gdsSpcfModelDesc }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="entryGdsSeqno" width="200" title="报关单商品序号"></ep-table-item>
            <ep-table-item column="dclCurrcd" width="150" title="币制" :formatter="dclCurrcdFormatter"></ep-table-item>
            <ep-table-item column="dclQty" width="150" title="数量"></ep-table-item>
            <ep-table-item column="dclUnitcd" width="100" title="单位" :formatter="dclUnitcdTranslate"></ep-table-item>
            <ep-table-item column="dclUprcAmt" width="150" title="单价"></ep-table-item>
            <ep-table-item column="dclTotalAmt" width="150" title="总价"></ep-table-item>
            <!-- <ep-table-item
                column="sumRmbVal"
                width="150"
                title="统计人民币值"
              ></ep-table-item>
              <ep-table-item
                column="sumUsaVal"
                width="150"
                title="统计美元值"
              ></ep-table-item>-->
            <ep-table-item column="natcd" width="150" title="原产国(地区)" :formatter="natcdTranslate"></ep-table-item>
            <ep-table-item column="netWt" width="150" title="净重"></ep-table-item>
            <ep-table-item column="modfMarkcd" width="150" title="修改标志代码" :formatter="modfMarkcdFormatter"></ep-table-item>
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
import { getToken, getId } from "utils";
import { cloneObj } from "utils";
import mixin from "../mixin";
export default {
  name: "bodyFormModel",
  mixins: [misList, mixin],
  extends: misList, // 务必继承
  props: {
    bodyForm: {
      type: Object,
      required: true
    },
    isShowModel: {
      type: Boolean
    },
    searchType: {
      default: true
    },
    optStatus: {
      default: ""
    },
    tableData:{
      type:Array,
    },
    portState: {
      //绑定类型
      default: function() {
        return "";
      }
    },
    ieTypecd: {
      //进出标志
      default: function() {
        return "";
      }
    },
    inExpType: {
      //出入库类型
      default: function() {
        return "";
      }
    }
  },
  watch: {
    isShowModel(newVal) {
      if (!newVal) {
        this.$refs.table.selectChangeEach(_ => {
          return false;
        });
      }
    },
    portState: {
      // 绑定类型改变
      handler(newData, oldData) {
        this.portSwitch = newData;
        if (newData == 1 || newData == 2) {
          this.searchForm.portSwitch = "1";
        } else if (newData == 3) {
          this.searchForm.portSwitch = "2";
        } else {
          this.searchForm.portSwitch = "";
        }
        if (!this.searchType) {
          this.refresh();
        }
      },
      immediate: true,
      deep: true
    },
    ieTypecd: {
      // 进出标志改变
      handler(newData, oldData) {
        this.searchForm.ieTypecd = newData;
        if (!this.searchType) {
          this.refresh();
        }
      },
      immediate: true,
      deep: true
    },
    inExpType: {
      //出入库类型
      handler(newData, oldData) {
        this.searchForm.inExpType = newData;
        if (!this.searchType) {
          this.refresh();
        }
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      uploadData: {
        businessType: "wareHouse",
        sysCode: "lgsa"
      },
      fixTime: "",
      portSwitch: "",
      show:false,
      loading: false,
      listApi: "getWhDtsByWhNo", //wareHouseList pathBillOfladingInfoGetList
      settings: {
        pk: "id" // 主键
      },
      searchForm: {
        like_whRecPreentNo: "",
        inExpType: "",
        ieTypecd: "",
        optStatus: this.optStatus,
        before_dclTime: "",
        after_dclTime: "",
        portSwitch: ""
      },
      headColor: true,
      totalcount: 0,
      selectLength: 0,
      selectItems: [],
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      ep_data: [], //表格数据
      ieTypecdState: "",
      stateValue: ""
    };
  },
  mounted() {
    if (!this.searchType) {
      this.refresh();
    }
  },
  created() {
    console.log(this.bodyForm);
    this.searchForm.whNo = this.bodyForm.whRecPreentNo;
    this.searchForm.pid=this.$route.query.id
    // console.log(pid)
    this.refresh(true);
  },
  methods: {
    doBinding() {
      let selectData = this.$refs.table.getData("select");
      if (selectData.length !== 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
        return;
      }
       if (selectData.length == 0) {
          this.$pop({
            type: "danger",
            message: "请选择一条单子！"
          });
          return;
        } 
        let isnNull=false      
        selectData.forEach(item=>{
            this.tableData.forEach(e=>{
                if(item.id==e.id){
                    this.$pop({
                    type: "danger",
                    message: "请选择不同的数据"
                    });
                    isnNull = true
                    // return
                }else{
                    
                    
                }

            })
        })
      selectData[0].modfMarkcd = "1";  
      if(!isnNull){
        this.$emit("onSelectDt", cloneObj(selectData[0]));
      }
    },
    inExpChange(value) {
      this.stateValue = value;
    },
    ieTypecdChange(value) {
      this.ieTypecdState = value;
    },
    reset(el) {
      this.$refs[el].reset();
      this.fixTime = "";
    },
    changeTime() {
      let fixTime = this.fixTime.split(",");
      this.searchForm.before_dclTime = fixTime[1];
      this.searchForm.after_dclTime = fixTime[0];
    },
    handleSelectionChange(val) {
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
    }
  }
};
</script>
<style lang="less" scoped></style>
