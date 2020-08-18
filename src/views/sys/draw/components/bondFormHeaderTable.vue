<template>
  <div>
    <div style="marginBottom: 7px;">
    </div>

    <div class="block">
      <ep-table ref="table" border :height="400" :data="ep_data" :head-color="headColor" @selection-change="handleSelectionChange" @row-dblclick="detailInfo">
        <!-- <ep-table-item type="select"></ep-table-item>  -->
        <ep-table-item column="opt" title="操作" width="200">
          <template slot-scope="props">
            <wms-icon type="edit" @click="doUpdate(props.row,props.row.id)"></wms-icon>
            <wms-icon type="cancel" @click="doDelete(props.row,props.row.id)"></wms-icon>
            <!-- <wms-icon type="confirm" @click="doDeclare(props.row,props.row.id)"></wms-icon> -->
            <!-- <wms-icon type="void"></wms-icon> -->
            <!-- <wms-icon type="print"></wms-icon> -->
            <wms-icon type="detail" @click="detailInfo($event,props.row)"></wms-icon>
            <!-- <wms-icon type="change" @click="doModify(props.row,props.row.id)"></wms-icon> -->
            <!-- <wms-icon type="goods"></wms-icon> -->
          </template>
        </ep-table-item>
        <ep-table-item column="optStatus" title="状态" width="100" :formatter="optStatusFormatter"></ep-table-item>
        <ep-table-item column="stockBillType" title="进出类型" width="100" :formatter='ioTypecdFormatter'></ep-table-item>
        <ep-table-item column="stockBillNoPre" title="ERP/WMS预出入库单编号" width="190"></ep-table-item>
        <ep-table-item column="stockBillNo" title="ERP/WMS实际出库单编号" width="190"></ep-table-item>
        <ep-table-item column="stockType" title="库存类型" width="190" :formatter="stockType"></ep-table-item>
        <ep-table-item column="billType" title="出入库类型" width="190" :formatter="billType"></ep-table-item>
        <ep-table-item column="tradeName" title="经营企业名称" width="200"></ep-table-item>
        <ep-table-item column="tradeCode" title="经营企业单位编码" width="190"></ep-table-item>
        <ep-table-item column="tradeSccd" title="经营企业社会信用代码" width="250"></ep-table-item>
        <ep-table-item column="masterCuscd" title="主管海关" width="115" :formatter="masterCuscdFormatter"></ep-table-item>
        <ep-table-item column="billNo" title="提运单号" width="100"></ep-table-item>
        <ep-table-item column="shipNameEn" title="英文船名" width="100"></ep-table-item>
        <ep-table-item column="voyageNo" title="航次" width="100"></ep-table-item>
        <ep-table-item column="grossWtTotal" title="总毛重" width="100"></ep-table-item>
        <ep-table-item column="trafMode" title="运输方式" width="190" :formatter="trspModecdFormatter" ></ep-table-item>
        <ep-table-item column="businessType" title="业务类别" width="190" :formatter="businessType" ></ep-table-item>
        <ep-table-item column="classifyType" title="料件成品类型" width="190" :formatter="classifyTypeFormatter"></ep-table-item>
        <ep-table-item column="supvMode" title="监管方式" width="150" :formatter="supvModecdFormatter"></ep-table-item>
        <ep-table-item column="ieport" title="进出境关别" width="150" :formatter="impexpPortcdFormatter"></ep-table-item>
        <ep-table-item column="transMode" title="成交方式" width="190" :formatter="transModeFormatter"></ep-table-item>
        <ep-table-item column="stshipTrsarvCode" title="启运国/运抵国" width="190" :formatter="setDestinationNatcd"></ep-table-item>        
        <ep-table-item column="tradeCountryCode" title="贸易国（地区）" width="190" :formatter="tradingRegion"></ep-table-item>
        <ep-table-item column="districtCode" title="境内目的地、境内货源地" width="250" :formatter='districtCodeFormatter'></ep-table-item>
        <ep-table-item column="destinationCode" title="最终目的国" width="190" :formatter="destinationTranslate"></ep-table-item>
        <ep-table-item column="stockDate" title="创建时间" width="190"></ep-table-item>
        <ep-table-item column="rltEntryNo" title="关联报关单编号" width="190"></ep-table-item>
        <ep-table-item column="whNo" title="仓库号" width="100"></ep-table-item>
        <ep-table-item column="whLoc" title="库位" width="100"></ep-table-item>
        <ep-table-item column="orderNo" title="客户订单号" width="100"></ep-table-item>
        <ep-table-item column="ownerName" title="货主名称" width="100"></ep-table-item>
        <ep-table-item column="col1" title="备选1" width="100"></ep-table-item>
        <ep-table-item column="col2" title="备选2" width="100"></ep-table-item>
        <ep-table-item column="col3" title="备选3" width="100"></ep-table-item>
        <ep-table-item column="col4" title="备选4" width="100"></ep-table-item>
        <ep-table-item column="rmk" title="备注" width="100"></ep-table-item>
       
           
        
        

       
      </ep-table>
    </div>
    <div class="block">
      <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
    </div>
  </div>
</template>
<script>
import misList from 'src/common/mislist'
import mixin from '../mixin'
import { getToken, getId } from 'utils'
export default {
  name: 'bondFormHeaderTable',
  extends: misList, // 务必继承
  mixins: [mixin],
  props: {
    epData: {
      type: Array,
      default: function () {
        return []
      }
    },
    searchForm: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  watch: {
    epData (val) {
      this.ep_data = val
      this.totalcount = this.$parent.totalcount
    }
  },
  data () {
    return {
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      listApi: 'drawfindlist', // 搜索，取api.json里面的key值
      ep_data: [], //表格数据
      totalcount: 0,
      headColor: true,
      uploadData: {
        businessType: 'preIncrease',
        checkType:"N",
        sysCode: "lgsa"
      },
      settings: {
        pk: 'id' // 主键
      }
    }
  },
  methods: {
    // 跳转明细页面
    detailInfo (event, row, index) {
      this.$app.trigger('locate-tab', 'ImportBondedDtInfodraw', row.id)
    },
    //删除
    doDelete (row, rowId) {
      // let selectData = this.$refs.table.getData("select");
      // if (selectData.length <= 0) {
      //   this.$pop({
      //     type: 'danger',
      //     message: '请选择数据'
      //   })
      //   return
      // }
      if (
        row.optStatus == '1' ||
        row.optStatus == '4' ||
        row.optStatus == '6' ||
        row.optStatus == '501' ||
        row.optStatus == '506' ||
        row.optStatus == '504' ||
        row.optStatus == '601' ||
        row.optStatus == '604' ||
        row.optStatus == '606'
      ) {
        this.$confirm({
          word: '是否要删除所选条目！',
          callback: errorInfo => {
            if (errorInfo) {
              // let ids = []
              // selectData.forEach(c => {
              //   if (c.id) {
              //     ids.push(c.id)
              //   }
              // })
              let data = {}
              data['id'] = rowId
              this.$post('drawdelete', data)
                .then(responseData => {
                  this.refresh(true)
                  this.$pop({
                    type: 'success',
                    message: '删除成功'
                  })
                })
                .catch(e => {
                  this.loading = false
                })
            }
          }
        })
      } else {
        this.$pop({
          type: 'danger',
          message:
            '无法删除，请选择状态为暂存的数据'
        })
        return
      }
    },
    //修改
    doUpdate (row, rowId) {
      // let selectData = this.$refs.table.getData("select");
      // if (selectData.length !== 1) {
      //   this.$pop({
      //     type: 'danger',
      //     message: '请选择一条数据'
      //   })
      //   return
      // }
      if (
        row.optStatus == '1' ||
        row.optStatus == '4' ||
        row.optStatus == '6'
      ) {
        let id = row.id
        let data = {}
        data['id'] = id
        let menusList = this.$store.getters.getMenuTabInstance.items;
        
        menusList.forEach(function (item, index) {
          if (item.link == "/drawupdate") {
            menusList.splice(index, 1);
          }
        });
        this.$app.trigger('locate-tab', 'drawupdate', id)
      } else {
        this.$pop({
          type: 'danger',
          message: '只有暂存可以修改'
        })
        return
      }
    },
  }
}
</script>
