<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
      <div class="panel panel-default">
        <ep-tabs active="工单">
          <!-- 主表 -->
          <ep-tab-item name="工单">
            <ep-form class="demo-form" ref="woHead" :form="woHead" :rules="page_rules" name-width="168px">
              <ep-row :gutter="10">
                <ep-col :col="8">
                  <ep-form-item label="工单编号" attr="woNo">
                    <ep-input v-model="woHead.woNo" name="woNo" disabled></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="企业编码" attr="tradeCode">
                    <ep-input v-model="woHead.tradeCode" name="tradeCode" disabled></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="工单日期" attr="woDate">
                    <ep-input v-model="woHead.woDate" name="woDate" disabled></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="帐册编号" attr="emsNo">
                    <ep-input v-model="woHead.emsNo" name="emsNo" :disabled="true"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="库存运算状态" attr="calcStatus">
                    <ep-select disabled v-model="woHead.calcStatus" name="calcStatus">
                      <ep-select-item index="0" label="未计算"></ep-select-item>
                      <ep-select-item index="1" label="待计算"></ep-select-item>
                      <ep-select-item index="2" label="已计算"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="创建时间" attr="createTime">
                    <ep-input v-model="woHead.createTime" name="createTime" disabled></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="8">
                  <ep-form-item label="更新时间" attr="updateTime">
                    <ep-input v-model="woHead.updateTime" name="updateTime" disabled></ep-input>
                  </ep-form-item>
                </ep-col>
              </ep-row>
            </ep-form>
          </ep-tab-item>

          <!-- 产出表 -->
          <ep-tab-item name="产出表">
            <woOutputTab :woOutputTable="woOutputTable" />
          </ep-tab-item>

          <!-- 耗用表 -->
          <ep-tab-item name="耗用表">
            <woInputTab :woInputTable="woInputTable" />
          </ep-tab-item>

        </ep-tabs>

      </div>
    </div>
  </div>

</template>


<script>
import woOutputTab from './woOutputTab'
import woInputTab from './woInputTab'

export default {
  name: "workOrderDtInfos", // 保持和文件名一致，否则keep-alive不会动态缓存
  components: {
    woOutputTab,
    woInputTab
  },
  data() {
    return {
      loading: false,
      woHead: {
        woNo: "",
        tradeCode: "",
        woDate: "",
        emsNo: "",
        calcStatus: "",
        createTime: "",
        updateTime: ""
      },
      woOutputTable: [],
      woInputTable: [],
      page_rules: {

      }
    };
  },
  computed: {
    tradeCode() {
      return this.$store.getters.getTradeCode;
    }
  },
  created() {},
  mounted() {
    let id = this.$route.query.id;
    if (!id) return;

    let data = {};
    data.id = id;
    data.tradeCode = this.tradeCode;

    this.$post("getWoDetail", data)
      .then(res => {
        let data = res.map.data;
        this.woHead = data;
        this.woOutputTable = data.woOutput;
        this.woInputTable = data.woInput;
      })
      .catch(e => {
        console.warn(e)
      });
  },

  methods: {
    detailInfo(event, row, index) {
      this.isShowModel = true;
      this.woOutputModel = row;
    },
    detailInfo2(event, row, index) {
      this.isShowModel2 = true;
      this.woInputModel = row;
    }
  }
};
</script>