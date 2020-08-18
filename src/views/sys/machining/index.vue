<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <div class="block">
          <WmsButton @click="doSave" :loading="saveLoading">暂存</WmsButton>
          <WmsButton @click="addOther">新增</WmsButton>

          <ep-switch v-model="format" on-text="横向" off-text="纵向"></ep-switch>
          <!-- <ep-button type="success" size="small" @click="doPrint" icon="printer">打印</ep-button>:class= "(RelationStatus === 3) ? 'show' : 'hidden' " -->
        </div>
        <ep-tabs :active="tabtitle">
          <ep-tab-item name="进区">
            <drag :format='format' @TransmitData='getlistData' :search='searchForm'></drag>
          </ep-tab-item>
          <ep-tab-item name="出区">
            <drag :format='format' @TransmitData='getlistData1' :search='searchForm1'></drag>
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import misList from 'src/common/mislist'
import drag from './components/drag'
export default {
  name: 'machining',
  extends: misList, // 务必继承
  components: { drag },
  watch: {},
  created() {},

  mounted() {
    setTimeout(() => {
      this.tabtitle = '进区'
    }, 1)
  },
  data() {
    return {
      saveLoading: false,
      format: true,
      tabtitle: '出区',
      enter: {},
      entershow: false,
      Out: {},
      Outshow: false,
      searchForm: {
        // bindUsedTypecd: '1', // 分送集报标志
        getDtDetail: '1', //获取仓单表体数据
        ieTypecd: 'I', //进出标志
        // inExpType: '3', //出入库类型
        optStatus: '51' //操作状态
      },
      searchForm1: {
        // bindUsedTypecd: '1', // 分送集报标志
        getDtDetail: '1', //获取仓单表体数据
        ieTypecd: 'E', //进出标志
        // inExpType: '3', //出入库类型
        optStatus: '51' //操作状态
      }
    }
  },
  methods: {
    doSave() {
      if (!this.entershow) {
        this.$pop({
          type: 'danger',
          message: '进区还未填写!'
        })
        return
      }
      if (!this.Outshow) {
        this.$pop({
          type: 'danger',
          message: '出区还未填写!'
        })
        return
      }
    },
    addOther() {
      this.$app.trigger('add-new-tab', 'machining')
    },
    //进区
    getlistData(val, item) {
      this.enter = item
      this.entershow = val
    },
    //出区
    getlistData1(val, item) {
      this.Out = item
      this.Outshow = val
    }
  }
}
</script>


<style scoped>
</style>