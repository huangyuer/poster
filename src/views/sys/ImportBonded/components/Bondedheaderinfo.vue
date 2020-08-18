
<template>
  <div>
    <ep-model title="进出境货物汇总表体" v-model="model" width="1250px" :wrap-close="false">
      <ep-form ref="bodyForm" :form="bodyForm" name-width="168px">
        <ep-row :gutter="7">
          <ep-col :col="8">
            <ep-form-item label="ERP/WMS出入库单编号" attr="stockBillNo">
              <ep-input v-model="bodyForm.stockBillNo" name="stockBillNo" disabled></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="出入库单明细编号" attr="billDetailSeqno">
              <ep-input v-model="bodyForm.billDetailSeqno" name="billDetailSeqno" disabled></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="directionTypecd" label="货物流向">
              <loc-codemap-select :name="'name'" :code="'id'" :cName="'name'" :dataList="directionTypecdList" :value.sync="bodyForm.directionTypecd" disabled>
              </loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="进出境关别" attr="impexpPortcd">
              <loc-codemap-select :name="'impexpPortcd'" :code="'customCode'" :cName="'customName'" :dataList="impexpPortcd" :type="'custom'" :value.sync="bodyForm.impexpPortcd" disabled>
              </loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="监管方式" attr="supvModecd">
              <loc-codemap-select :name="'supvModecd'" :code="'tradeMode'" :cName="'abbrTrade'" :dataList="supvModecd" :type="'custom'" :value.sync="bodyForm.supvModecd" disabled>
              </loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="运输方式" attr="trspModecd">
              <loc-codemap-select :name="'trspModecd'" :code="'trafCode'" :cName="'trafSpec'" :dataList="trspModecd" :type="'custom'" :value.sync="bodyForm.trspModecd" disabled>
              </loc-codemap-select>
              <!-- <ep-select v-model="bodyForm.trspModecd" name="trspModecd" filterable disabled>
                <ep-select-item v-for="item in trspModecd" :key="item.trafCode" :index="item.trafCode" :label="item.trafSpec"></ep-select-item>
              </ep-select> -->
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="启抵国(地区)" attr="destinationNatcd">
              <loc-codemap-select :name="'destinationNatcd'" :code="'countryCode'" :cName="'nameCn'" :dataList="countrys" :value.sync="bodyForm.destinationNatcd" disabled>
              </loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="产终国(地区)" attr="natcd">
              <loc-codemap-select :name="'natcd'" :code="'countryCode'" :cName="'nameCn'" :dataList="countrys" :value.sync="bodyForm.natcd" disabled>
              </loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="商品编码" :name="'gdecd'" attr="gdecd">
              <ep-input v-model="bodyForm.gdecd" name="gdecd" :maxlength="10" disabled></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="第一法定数量" :name="'lawfQty'" attr="lawfQty">
              <ep-input v-model="bodyForm.lawfQty" name="lawfQty" :maxlength="3" disabled>1</ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="第一法定计量单位" :name="'unitOne'" attr="unitOne">
              <loc-codemap-select :name="'unitOne'" :code="'unit'" :cName="'unitName'" :dataList="unitList" :value.sync="bodyForm.unitOne" disabled>
              </loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="第二法定数量" :name="'secdLawfQty'" attr="secdLawfQty">
              <ep-input v-model="bodyForm.secdLawfQty" name="secdLawfQty" :maxlength="3" disabled></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="第二法定计量单位" :name="'unitTwo'" attr="unitTwo">
              <loc-codemap-select :name="'unitTwo'" :code="'unit'" :cName="'unitName'" :dataList="unitList" :value.sync="bodyForm.unitTwo" disabled>
              </loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="品牌类型" attr="gdsSpcfModelDesc">
              <loc-codemap-select :name="'brandName'" :code="'id'" :cName="'brandName'" :dataList="brandTypeList" :value.sync="bodyForm.gdsSpcfModelDesc" disabled>
              </loc-codemap-select>
              <!-- <ep-select :label="brandTypeList.brandName" v-model="bodyForm.gdsSpcfModelDesc" name="gdsSpcfModelDesc" disabled>
                <ep-select-item v-for="(item, index) in brandTypeList" :key="index" :index="item.id" :label="item.brandName"></ep-select-item>
              </ep-select> -->
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="统计人民币值" attr="sumRmbVal">
              <ep-input v-model="bodyForm.sumRmbVal" name="sumRmbVal" :maxlength="25" disabled></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="美元总价" attr="usd">
              <ep-input v-model="bodyForm.usd" name="usd" :maxlength="25" disabled></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="实际出入库日期" attr="actrualStockDate">
              <ep-input v-model="bodyForm.actrualStockDate" name="actrualStockDate" disabled></ep-input>
            </ep-form-item>
          </ep-col>
          <!-- <ep-col :col="16">
            <ep-form-item label="情况说明">
              <ep-input v-model="bodyForm.rmk" name="rmk" type="textarea" disabled></ep-input>
            </ep-form-item>
          </ep-col> -->
        </ep-row>
      </ep-form>
      <!-- </div> -->
    </ep-model>

    <!--表格-->
    <div class="ep-card card-margin relative">
      <div class="card-body">
        <div style="margin-bottom:10px"><span style="color:red;margin-right:10px">*</span><span style="margin-right:10px;width:40px;height:15px;padding:5 10px;background-color:#f39c12;display:inline-block"></span><span style="margin-right:30px">罕见</span><span style="margin-right:10px;width:40px;height:15px;padding:5 10px;background-color:red;display:inline-block"></span><span>错误数据</span></div>
        <div class="block">
          <ep-table ref="table" :height="400" :data="tableDataCopy" @row-dblclick="queryOperStatus" :head-color="headColor">
            <!-- <ep-table-item type="select"></ep-table-item> -->
            <ep-table-item column="stockBillNo" title="ERP/WMS出入库单编号" width="200">
              <template slot-scope="props">
                <p v-if="props.row.stockBillNo == null" style='color:red'>未填</p>
                <p v-else>{{props.row.stockBillNo }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="billDetailSeqno" title="出入库单明细编号" width="200">
              <template slot-scope="props">
                <p v-if="props.row.billDetailSeqno == null" style='color:red'>未填</p>
                <p v-else>{{props.row.billDetailSeqno }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="directionTypecd" title="货物流向" :formatter="setDirectionTypecd" width="110">
              <template slot-scope="props">
                <p v-if='props.row.directionTypecd =="I" || props.row.directionTypecd =="E"'>{{ setDirectionTypecd(props.row) }}</p>
                <p v-else-if="props.row.directionTypecd == null" style='color:red'>未填</p>
                <p v-else style="color:red">{{ setDirectionTypecd(props.row) }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="impexpPortcd" title="进出境关别" width="130">
              <template slot-scope="props">
                <p v-if='props.row.impexpPortcd=="2248"'>{{ setImpexpPortcd(props.row)  }}</p>
                <!-- <p v-else-if="props.row.impexpPortcd !=null" style='color:red'>错误数据</p> -->
                <p v-else-if="props.row.impexpPortcd == null" style='color:red'>未填</p>
                <p v-else style="color:red">{{ setImpexpPortcd(props.row) ? setImpexpPortcd(props.row) : '错误数据' }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="gdecd" title="商品编码" width="125">
              <template slot-scope="props">
                <p v-if="props.row.errorGdecd==1 &&props.row.gdecd != null" style='color:red'>错误数据</p>
                <p v-else-if='props.row.unusualGdecd == 1&&props.row.gdecd != null' style="color:#f39c12">{{ props.row.gdecd }}</p>
                <p v-else-if="props.row.gdecd == null" style='color:red'>未填</p>
                <p v-else>{{ props.row.gdecd }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="lawfQty" title="第一法定数量" width="180">
              <template slot-scope="props">
                <p v-if='props.row.unusualLawfQty ==1 && props.row.lawfQty != null' style="color:#f39c12">{{ props.row.lawfQty }}</p>
                <p v-else-if="props.row.lawfQty == null" style='color:red'>未填</p>
                <p v-else>{{ props.row.lawfQty }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="unitOne" width="160" title="第一法定计量单位" :formatter="dclUnitcdTranslate2">
              <template slot-scope="props">
                <p v-if="props.row.unitOne == null" style='color:red'>未填</p>
                <p v-else>{{dclUnitcdTranslate2(props.row) }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="secdLawfQty" title="第二法定数量" width="180">
              <template slot-scope="props">
                <p v-if='props.row.unusualSecdLawfQty ==1' style="color:#f39c12">{{ props.row.secdLawfQty }}</p>
                <p v-else>{{ props.row.secdLawfQty }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="unitTwo" width="160" title="第二法定计量单位" :formatter="dclUnitcdTranslate3"></ep-table-item>

            <ep-table-item column="sumRmbVal" title="统计人民币值" width="180">
              <template slot-scope="props">
                <p v-if='props.row.unusualUprc ==1&&props.row.sumRmbVal != null' style="color:#f39c12">{{ props.row.sumRmbVal }}</p>
                <p v-else-if="props.row.sumRmbVal == null" style='color:red'>未填</p>

                <p v-else>{{ props.row.sumRmbVal }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="usd" title="美元总价" width="180">
              <template slot-scope="props">
                <p v-if="props.row.usd == null" style='color:red'>未填</p>
                <p v-else>{{props.row.usd }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="gdsSpcfModelDesc" title="品牌类型" :formatter="setGdsSpcfModelDesc" width="170">
              <template slot-scope="props">
                <p v-if='props.row.gdsSpcfModelDesc ==0 ||props.row.gdsSpcfModelDesc ==1 ||props.row.gdsSpcfModelDesc ==2  ||props.row.gdsSpcfModelDesc == 4 '>{{ setGdsSpcfModelDesc(props.row) }}</p>
                <p v-else-if='props.row.gdsSpcfModelDesc ==3' style="color:red">{{setGdsSpcfModelDesc(props.row)}}</p>
                <p v-else-if='props.row.gdsSpcfModelDesc' style="color:red">错误数据</p>
                <p v-else-if="props.row.gdsSpcfModelDesc == null" style='color:red'>未填</p>
                <p v-else>{{setGdsSpcfModelDesc(props.row)}}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="supvModecd" title="监管方式" :formatter="setSupvModecd" width="130">
              <template slot-scope="props">
                <p v-if="props.row.errorSupvmodecd==1 && props.row.supvModecd != null" style='color:red'>错误数据</p>
                <p v-else-if='props.row.unusualSupvMode ==1&& props.row.supvModecd != null' style="color:#f39c12">{{ setSupvModecd(props.row) }}</p>
                <p v-else-if="props.row.supvModecd == null" style='color:red'>未填</p>
                <p v-else>{{setSupvModecd(props.row)}}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="trspModecd" title="运输方式" :formatter="setTrspModecd" width="120">
              <template slot-scope="props">
                <p v-if='props.row.errorTrspmodecd ==1 && props.row.trspModecd != null' style="color:red">错误数据</p>
                <p v-else-if='props.row.trspModecd !=2 && props.row.trspModecd != null' style='color:red'>{{setTrspModecd(props.row)}}</p>
                <p v-else-if="props.row.trspModecd == null" style='color:red'>未填</p>
                <p v-else>{{setTrspModecd(props.row)}}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="destinationNatcd" title="启抵国(地区)" width="140">
              <template slot-scope="props">
                <p v-if="props.row.errorDestinationNatcd==1 && props.row.destinationNatcd != null " style="color:red">错误数据</p>
                <p v-else-if="props.row.destinationNatcd=='142'" style='color:red'>{{setDestinationNatcd(props.row)}}</p>
                <p v-else-if='props.row.unusualDestinationNatcd ==1&&props.row.destinationNatcd != null' style="color:#f39c12">{{ setDestinationNatcd(props.row) }}</p>
                <p v-else-if="props.row.destinationNatcd == null" style='color:red'>未填</p>

                <p v-else>{{setDestinationNatcd(props.row)}}</p>

              </template>
            </ep-table-item>
            <ep-table-item column="natcd" title="产终国(地区)" :formatter="setTableNatcd" width="180">
              <template slot-scope="props">
                <p v-if="props.row.errorNatcd==1  && props.row.natcd != null" style="color:red">错误数据</p>
                <p v-else-if="props.row.natcd=='142'" style='color:red'>{{ setTableNatcd(props.row)}}</p>
                <p v-else-if='props.row.unusualNatcd ==1&& props.row.natcd != null' style="color:#f39c12">{{ setTableNatcd(props.row)}}</p>
                <p v-else-if="props.row.natcd == null" style='color:red'>未填</p>
                <p v-else>{{ setTableNatcd(props.row)}}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="actrualStockDate" title="实际出入库日期" width="180">
              <template slot-scope="props">
                <p v-if="props.row.actrualStockDate == null" style='color:red'>未填</p>
                <p v-else>{{props.row.actrualStockDate }}</p>
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
  extends: misList,
  props: {
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      model: false,
      headColor: true,
      tableDataCopy: this.tableData,
      bodyForm: {
        stockBillNo: "",
        billDetailSeqno: "",
        directionTypecd: "",
        impexpPortcdName: "",
        supvModecd: "",
        trspModecd: "",
        destinationNatcd: "",
        natcd: "",
        gdecd: "",
        lawfQty: "",
        secdLawfQty: "",
        gdsSpcfModelDesc: "",
        sumRmbVal: "",
        tradeTotalUsd: "",
        actrualStockDate: ""
      },
      totalcount: 0,
      ep_page: {
        page: 1,
        size: 10
      },
      customSearch: {}
    };
  },
  created() {
    this.makePaging(10, 1, this.tableDataCopy);
  },
  methods: {
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.tableData)
      );
    },
    handleCurrentChange(val) {
      this.ep_page.page = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.tableData)
      );
    },
    makePaging(size, page, data) {
      let begin = (page - 1) * size;
      let end = begin + size;
      let newData = data.slice(begin, end);
      this.totalcount = data.length;
      this.tableDataCopy = newData;
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
    },
    queryOperStatus(event, row, index) {
      this.model = false;
      setTimeout(() => {
        this.model = true;
      });
      this.bodyForm = {
        stockBillNo: "",
        billDetailSeqno: "",
        directionTypecd: "",
        impexpPortcdName: "",
        supvModecd: "",
        trspModecd: "",
        destinationNatcd: "",
        natcd: "",
        gdecd: "",
        lawfQty: "",
        secdLawfQty: "",
        gdsSpcfModelDesc: "",
        sumRmbVal: "",
        tradeTotalUsd: "",
        actrualStockDate: ""
      };
      this.bodyForm = cloneObj(row);
    }
  }
};
</script>

