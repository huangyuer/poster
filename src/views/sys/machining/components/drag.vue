<template>
  <div>
    <!-- <div class="panel-main-content main-in-style"> -->
    <!--筛选栏组-->
    <!-- <div class="search-card contents-card card-margin">
        <div class="panel panel-default">
          <div class="card-title zero-padding">
            <span class="weight">出入库查询</span>
          </div>
          <ep-form ref="searchForm" :form="searchForm" name-width="168px">
            <ep-row :gutter="7">
              <ep-col :col="8">
                <ep-form-item label="进出标志" attr="ieTypecd">
                  <ep-select v-model="searchForm.ieTypecd" name="ieTypecd">
                    <ep-select-item index="I" label="I-进区"></ep-select-item>
                    <ep-select-item index="E" label="E-出区"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
            </ep-row>
            <ep-row :gutter="7">
              <ep-col :col="24">
                <ep-button type="warning" size="small" icon="refresh" @click="reset('searchForm')">重置</ep-button>
                <ep-button type="primary" size="small" @click="refresh(true)" icon="search" :loading="loading">查询</ep-button>
              </ep-col>
            </ep-row>
          </ep-form>
        </div>
      </div> -->

    <!-- <div class="ep-card card-margin relative"> -->
    <!-- <div class="card-body"> -->
    <div class="block">
      <div style="background:#fff;">
        <div style="display:flex;justify-content: flex-end;align-items:center;padding-right:20px">
          <ep-button @click="generateDrop" type="success">生成</ep-button>
          <ep-button type="danger" @click="eliminate">重置</ep-button>
        </div>
        <div class="drag-box" :class="format?'':'drag-box1'">

          <div class="drag-box-item2">
            <div class="item-title">出入库详情</div>
            <ep-table ref="table1" :height="format?400:200" :data="ep_data" :head-color="true" :loading="loading">
              <ep-table-item column="preentNo" title="凭证编号" width="200"></ep-table-item>
              <ep-table-item column="dclTypecd" title="申报类型" :formatter="optDclTypecdFormatter"></ep-table-item>
              <ep-table-item column="optStatus" title="状态" :formatter="statusFormatter"></ep-table-item>
              <ep-table-item column="inExpType" title="ERP/WMS出入库类型" :formatter="inExpTypeFormatter"></ep-table-item>
              <ep-table-item column="ieTypecd" title="进出标志" :formatter="ieTypecdFormatter"></ep-table-item>
            </ep-table>
          </div>
          <p class="block ep_pager" v-if="!format">
            <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_data.page" :page-size="ep_data.size" :total-num="totalcount"></ep-pager>
          </p>
          <div class="drag-box-item3">
            <div class="item-title">单证生成</div>
            <ep-table ref="table2" :height="format?400:200" :data="done" :head-color="true" :loading="loading">
              <ep-table-item column="preentNo" title="凭证编号" width="200"></ep-table-item>
              <ep-table-item column="dclTypecd" title="申报类型" :formatter="optDclTypecdFormatter"></ep-table-item>
              <ep-table-item column="optStatus" title="状态" :formatter="statusFormatter"></ep-table-item>
              <ep-table-item column="inExpType" title="ERP/WMS出入库类型" :formatter="inExpTypeFormatter"></ep-table-item>
              <ep-table-item column="ieTypecd" title="进出标志" :formatter="ieTypecdFormatter"></ep-table-item>
            </ep-table>
          </div>
        </div>
        <div class="block ep_pager" v-if="format">
          <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_data.page" :page-size="ep_data.size" :total-num="totalcount"></ep-pager>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <!-- </div> -->
    <generate ref="generates" :fresh="modelFlag" :Listdata="done[0]||Listdata" @nowFlagChange="modelFlag = false" @success="getData"></generate>
    <!-- </div> -->
  </div>
</template>
<script>
import misList from 'src/common/mislist'
import Sortable from 'sortablejs'
import mixin from '../mixin'
import generate from './generate'
export default {
  name: 'drag',
  extends: misList,
  mixins: [mixin],
  props: {
    format: {
      type: Boolean
    },
    search: {
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      listApi: 'portReleasegetList', // 搜索，取api.json里面的key值
      settings: {
        pk: 'id' // 主键
      },
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      ep_data: [], //表格数据
      totalcount: 0,
      searchForm: this.search,
      done: [],
      modelFlag: false,
      Listdata: {
        id: '',
        orgId: this.$store.getters.getId,
        whRecPreentNo: '', // 仓单对应的编号
        inExpWhNo: '', // ERP/WMS出入库编号
        inExpType: '3', // ERP/WMS出入库类型
        bizopEtpsno: this.$store.getters.getTradeCode, //经营企业编号
        bizopEtpsNm: this.$store.getters.getTradeName, //经营企业名称
        bizopEtpsSccd: this.$store.getters.getCreditCode, //经营企业社会信用代码
        businessTypecd: '', // 业务类别
        inExpTime: '', // ERP/WMS出入库日期
        mtpckEndprdTypecd: '', // 料件、成品标志
        supvModecd: '', // 监管方式
        trspModecd: '', // 运输方式
        impexpPortcd: '', // 进出境关别
        masterCuscd: this.$store.getters.getCustomId, // 主管海关
        rltEntryNo: '', // 关联报关单编号
        rltWhRecNo: '', // 关联仓单编号
        whRecNo: '', // 仓单编号
        dclTime: '', // 申报日期
        dclcusFlag: '2', // 是否报关
        dclcusTypecd: '2', // 报关类型
        preRecAccountTime: '', // 预记入企业账户时间
        recAccountTime: '', // 正式记入企业账户时间
        invtIochkptStucd: '', // 进出卡口状态
        vrfdedMarkcd: '', // 核扣标记
        rmk: '', // 备注
        entryStucd: '', // 报关状态
        optStatus: '', // 操作状态
        destinationNatcd: '', // 最终目的国
        tradeCountry: '', // 启运国/运抵国
        tradingRegion: '', // 贸易国（地区）
        districtCode: '', // 境内目的地
        grossWt: '', // 毛重
        transMode: '', // 成交方式
        ieTypecd: '', // 进出标志
        value: '', // ERP/WMS出入库状态变化
        dtDetailArr: [], //关联单证
        warehouseReceiptDt: []
      },
      complete: false
    }
  },
  components: { generate },
  computed: {},
  watch: {},
  mounted() {
    this.Drag()
    this.refresh(true)
  },
  methods: {
    getData(val) {
      this.complete = val
      this.$emit('TransmitData', val, this.Listdata)
    },
    eliminate() {
      this.done = []
      this.refresh(true)
      this.$refs.generates.clear()
    },
    generateDrop() {
      //   console.log(this.done)
      if (this.done.length < 1) {
        this.$pop({
          type: 'danger',
          message: '至少选择一票!'
        })
        return
      }
      this.modelFlag = true
    },
    calculation(el, box, x, y) {
      if (
        x > box.getBoundingClientRect().left &&
        x < box.getBoundingClientRect().right &&
        y > box.getBoundingClientRect().top &&
        y < box.getBoundingClientRect().bottom
      ) {
        return true
      }
    },
    Drag() {
      let el1 = document.querySelectorAll('.ep-table-body > table > tbody')[0]
      let el2 = document.querySelectorAll('.ep-table-body > table > tbody')[1]
      let box = document.querySelectorAll('.drag-box-item2')[0]
      let box1 = document.querySelectorAll('.drag-box-item3')[0]
      let x1, x2, y, w
      //   1-2
      const sortable1 = Sortable.create(el1, {
        sort: false,
        onStart: function(evt) {
          x1 = evt.originalEvent.clientX
        },
        onEnd: evt => {
          //监听拖动结束事件
          x2 = evt.originalEvent.clientX
          y = evt.originalEvent.clientY
          w = el1.offsetWidth
          if (!this.calculation(el2, box1, x2, y)) return
          if (this.done.length >= 1) {
            this.$pop({
              type: 'danger',
              message: '只能选择一票!'
            })
            return false
          }
          this.done.push(this.ep_data[evt.oldIndex])
          this.ep_data.splice(evt.newIndex, 1)
        }
      })
      // 2-1
      const sortable2 = Sortable.create(el2, {
        sort: false,
        onStart: function(evt) {
          x1 = evt.originalEvent.clientX
        },
        onEnd: evt => {
          x2 = evt.originalEvent.clientX
          y = evt.originalEvent.clientY
          w = el2.offsetWidth
          if (!this.calculation(el1, box, x2, y)) return
          this.ep_data.push(this.done[evt.oldIndex])
          this.done.splice(evt.newIndex, 1)
          this.$refs.generates.clear()
        }
      })
    }
  }
}
</script>
 
<style lang="less" scoped>
// .main-in-style {
.ep_pager {
  /* position: absolute; */
  /* bottom: 0px; */
  background: #fff;
  margin: 0;
  width: 100%;
}
.disable {
  /* pointer-events: none; */
  /* user-select: none; */
  cursor: not-allowed !important;
  color: #999 !important;
}
.button-style {
  position: absolute;
  top: -35px;
  left: 0px;
}
.in-word {
  width: 150px;
  margin: 0;
  padding: 0;
}
.in-datainfo {
  display: flex;
  /* justify-content: space-around; */
}

.drag-box1 {
  display: block !important;
}
.drag-box1 > div {
  min-height: 260px !important;
  margin-right: 0px !important;
}
.drag-box {
  margin-top: 10px;
  display: flex;
  user-select: none;
}
.drag-box > div {
  min-height: 460px;
  background-color: #eff1f5;
  margin-right: 16px;
  border-radius: 6px;
  border: 1px #e1e4e8 solid;
  margin-bottom: 10px;
}
.drag-box-item1 {
  flex: 0.7;
  /* max-width: 330px; */
  min-width: 350px;
  background-color: #eff1f5;
  margin-right: 16px;
  border-radius: 6px;
  border: 1px #e1e4e8 solid;
  position: relative;
}
.drag-box-item2 {
  flex: 1;
  /* max-width: 330px; */
  min-width: 350px;
  background-color: #eff1f5;
  margin-right: 16px;
  border-radius: 6px;
  border: 1px #e1e4e8 solid;
  position: relative;
}
.drag-box-item3 {
  flex: 1;
  /* max-width: 330px; */
  min-width: 350px;
  background-color: #eff1f5;
  margin-right: 16px;
  border-radius: 6px;
  border: 1px #e1e4e8 solid;
  position: relative;
  // height: 488px;
}
.item-title {
  padding: 8px 8px 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #24292e;
  font-weight: 600;
  display: flex !important;
  justify-content: space-between !important;
}

.ep-table-empty-block {
  position: relative;
  border-top: 1px solid #e0e0e0;
  min-height: 380px;
  text-align: center;
  width: 100%;
  height: 100%;
}
.ep-input-number {
  display: inline-block;
  width: 115px;
  position: relative;
}
.ep-input-number-increase {
  right: 15px;
}
.ep-input-number-decrease,
.ep-input-number-increase {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  line-height: 15px;
  top: 12px;
  background-color: #2196f3;
  text-align: center;
  color: #fff;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  -webkit-transition: opacity 0.2s linear;
  transition: opacity 0.2s linear;
}
.ep-button--text {
  color: #fff;
  padding: 6px 6px;
  font-size: 14px;
  border-radius: 2px;
  background-color: #27ae60;
  border-color: #27ae60;
  margin-bottom: 1px;
}
// }
</style>