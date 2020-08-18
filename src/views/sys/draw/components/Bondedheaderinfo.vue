
<template>
  <div>
    <!--表格-->
    <ep-model title="出入库预增减表体" v-model="modelshow" width="1250px" :wrap-close="false">
      <ep-form ref="bodyForm" :form="bodyForm" :rules="page_rules" name-width="168px">
        <ep-row :gutter="7">
          <!-- <ep-col :col="8">
              <ep-form-item attr="stockBillNoPre" label="ERP/ERP/WMS预出入库单编号" title="ERP/WMS预出入库单编号">
                <ep-input
                  v-model="bodyForm.stockBillNoPre"
                  name="stockBillNoPre"
                  :maxlength="64"
                ></ep-input>
              </ep-form-item>
            </ep-col> -->
          <ep-col :col="8">
            <ep-form-item attr="entryGdsSeqno" label="报关单商品序号">
              <ep-input v-model="bodyForm.entryGdsSeqno" name="entryGdsSeqno" :maxlength="10" :disabled="true"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="copGNo" label="商品料号">
              <ep-input v-model="bodyForm.copGNo" name="copGNo" :maxlength="32" :disabled="true"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="hsCode" label="商品编码">
              <ep-input v-model="bodyForm.hsCode" name="hsCode" :maxlength="10" :disabled="true"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="ciqCode" label="商检编码">
              <ep-input v-model="bodyForm.ciqCode" name="ciqCode" :maxlength="10" :disabled="true"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="gname" label="商品名称">
              <ep-input v-model="bodyForm.gname" name="gname" :maxlength="256" :disabled="true"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="gmodel" label="商品规格型号">
              <ep-input v-model="bodyForm.gmodel" name="gmodel" :maxlength="768" :disabled="true"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="qty" label="数量">
              <ep-input v-model="bodyForm.qty" name="qty" :maxlength="20" :disabled="true"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="gunit" label="数量单位">
              <loc-codemap-select :name="'gunit'" :code="'unit'" :cName="'unitName'" :dataList="dclUnitcds" :value.sync="bodyForm.gunit" :disabled="true"></loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="unitPrice" label="单价">
              <ep-input v-model="bodyForm.unitPrice" name="unitPrice" :maxlength="26" :disabled="true"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="tradeTotal" label="总价">
              <ep-input v-model="bodyForm.tradeTotal" name="tradeTotal" :maxlength="26" :disabled="true"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="tradeCurr" label="币制">
              <ep-select ref="tradeCurrSelect" v-model="bodyForm.tradeCurr" name="tradeCurr" filterable :disabled="true">
                <ep-select-item v-for="(item, index) in currList" :key="index" :index="item.currCode" :label="item.currName + ' ' + item.currCode"></ep-select-item>
              </ep-select>
              <!-- <ep-input v-model="bodyForm.tradeCurr" name="tradeCurr" :maxlength="26"></ep-input> -->
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="qty1" label="法定数量">
              <ep-input v-model="bodyForm.qty1" name="qty1" :maxlength="20" :disabled="true"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="qty2" label="法定第二数量">
              <ep-input v-model="bodyForm.qty2" name="qty2" :maxlength="20" :disabled="true"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="unit1" label="法定单位">
              <loc-codemap-select :name="'unit1'" :code="'unit'" :cName="'unitName'" :dataList="dclUnitcds" :value.sync="bodyForm.unit1" :disabled="true"></loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="unit2" label="法定第二计量单位">
              <loc-codemap-select :name="'unit2'" :code="'unit'" :cName="'unitName'" :dataList="dclUnitcds" :value.sync="bodyForm.unit2" :disabled="true"></loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="originCountryCode" label="原产国(地区)">
              <loc-codemap-select :name="'originCountryCode'" :code="'countryCode'" :cName="'nameCn'" :dataList="countrys" :value.sync="bodyForm.originCountryCode" :disabled="true"></loc-codemap-select>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="netWt" label="净重">
              <ep-input v-model="bodyForm.netWt" name="netWt" :maxlength="20" :disabled="true"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item attr="grossWt" label="毛重">
              <ep-input v-model="bodyForm.grossWt" name="grossWt" :maxlength="20" :disabled="true"></ep-input>
            </ep-form-item>
          </ep-col>
        </ep-row>
      </ep-form>
    </ep-model>
    <div class="ep-card card-margin relative">
      <div class="card-body">
        <div class="block">
          <ep-table ref="table" :height="400" :data="tableDataCopy" :head-color="headColor" @row-dblclick="detailInfo">
            <!-- <ep-table-item type="select"></ep-table-item> -->
            <!-- <ep-table-item column="directionTypecd" title="货物流向" :formatter="setDirectionTypecd" width="110"></ep-table-item> -->
            <!-- <ep-table-item column="impexpPortcdName" title="进出境关别" width="115" :formatter="impexpPortcdFormatter"></ep-table-item> -->
            <!-- <ep-table-item column="stockBillNoPre" width="150" title="ERP/WMS预出入库单编号"></ep-table-item> -->
            <ep-table-item column="copGNo" width="150" title="商品料号">
              <template slot-scope="props">
                <p class="text-style">{{ props.row.copGNo }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="hsCode" width="150" title="商品编码"></ep-table-item>
            <ep-table-item column="gName" width="150" title="商品名称">
              <template slot-scope="props">
                <p class="text-style">{{ props.row.gname }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="gModel" width="150" title="规格型号">
              <template slot-scope="props">
                <p class="text-style">{{ props.row.gmodel }}</p>
              </template>
            </ep-table-item>
            <ep-table-item column="entryGdsSeqno" width="200" title="报关单商品序号"></ep-table-item>
            <ep-table-item column="tradeCurr" width="150" title="币制" :formatter="dclCurrcdFormatter"></ep-table-item>
            <ep-table-item column="qty" width="150" title="数量"></ep-table-item>
            <ep-table-item column="qty1" width="150" title="法定数量"></ep-table-item>
            <ep-table-item column="qty2" width="150" title="法定数量"></ep-table-item>
            <ep-table-item column="unit1" width="150" title="法定单位" :formatter="dclUnitcdTranslate"></ep-table-item>
            <ep-table-item column="unit2" width="200" title="法定第二计量单位" :formatter="dclUnitcdTranslate1"></ep-table-item>
            <ep-table-item column="gunit" width="150" title="数量单位" :formatter="dclUnitcdTranslate2"></ep-table-item>
            <ep-table-item column="unitPrice" width="150" title="单价"></ep-table-item>
            <ep-table-item column="tradeTotal" width="150" title="总价"></ep-table-item>
            <ep-table-item column="originCountryCode" width="150" title="原产国(地区)" :formatter="natcdTranslate"></ep-table-item>
            <ep-table-item column="netWt" width="150" title="净重"></ep-table-item>
            <ep-table-item column="grossWt" width="150" title="毛重"></ep-table-item>
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
import mixin from '../mixin'
import misList from 'src/common/mislist'

export default {
  mixins: [mixin],
  extends: misList,
  props: {
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      headColor: true,
      tableDataCopy: this.tableData,
      bodyForm: {},
      totalcount: 0,
      modelshow: false,
      dclUnitcds: this.$store.getters.getUnitList,
      currList: this.$store.getters.getCurrList,
      ep_page: {
        page: 1,
        size: 10
      },
      customSearch: {},
      page_rules: {
        dclQty: { required: true, message: '不能为空', trigger: 'change' },
        gdsMtno: { required: true, message: '不能为空', trigger: 'change' }
      }
    }
  },
  created() {
    // console.log(this.tableDataCopy, this.tableData)
    this.makePaging(10, 1, this.tableDataCopy)
  },
  mounted() {
    //  console.log(this.tableDataCopy, this.tableData)
  },
  methods: {
    detailInfo(event, row, index) {
      this.bodyForm = row
      this.modelshow = true
    },
    handleSizeChange(val) {
      this.ep_page.size = val
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.tableData)
      )
    },
    handleCurrentChange(val) {
      this.ep_page.page = val
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
        this.filterData(this.customSearch, this.tableData)
      )
    },
    makePaging(size, page, data) {
      let begin = (page - 1) * size
      let end = begin + size
      let newData = data.slice(begin, end)
      this.totalcount = data.length
      this.tableDataCopy = newData
    },
    filterData(condition, data) {
      let filter = (condition, data) => {
        return data.filter(item => {
          return Object.keys(condition).every(key => {
            if (condition[key] == '') return true
            let diff =
              key == 'gdsNm'
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
                    .toLowerCase()
            return diff
          })
        })
      }
      return filter(condition, data)
    }
  }
}
</script>