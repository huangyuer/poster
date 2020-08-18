<template>
  <div class="search-table">
    <div class="ep-card card-margin relative" style="top:10px;">
      <div class="card-body">
        <div class="block">
          <WmsButton @click="addData">添加</WmsButton>

          <!-- <ep-button type="primary" size="small" @click="addData" icon="edit">添加</ep-button> -->
          <div style="display: inline-block;margin-left:20px;">
            <span v-if='showStatus'>商品料号</span>
            <ep-input v-if='showStatus' v-model="searchForm.gdsMtno" style="width:150px;display:inline-block;font-size:14px"></ep-input>
            <WmsButton @click="search">查询</WmsButton>

            <!-- <ep-button type="primary" size="small" icon="ios-search" @click="search">查询</ep-button> -->
          </div>

        </div>
        <div class="block">
          <ep-table ref="table" border :height="400" :data="ep_data" :head-color="true" :loading="loading">
            <ep-table-item type="select"></ep-table-item>
            <ep-table-item column="gdsMtno" title="商品料号" width="200"></ep-table-item>
            <ep-table-item column="gdecd" title="商品编码" width="200"></ep-table-item>
            <ep-table-item column="gdsNm" title="商品名称" width="200"></ep-table-item>
            <ep-table-item column="gdsSeqno" title="明细序号" width="200">
            </ep-table-item>

            <ep-table-item column="dclUnitcd" :formatter="dclUnitcdTranslate" title="申报单位" width="200"></ep-table-item>
            <ep-table-item column="remainQty" title="剩余数量" width="200"></ep-table-item>
            <ep-table-item column="rmk" title="备注" width="200">
              <template slot-scope="props">
                <p class="rmk-style">{{props.row.rmk}}</p>
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
export default {
  name: "search",
  extends: misList,
  props: {
    needDate: {
      type: Object
    },
    fresh: {
      type: Boolean,
      default: false
    },
    updata: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      totalcount: 0,
      searchForm: {
        gdsMtno: "",
        ieTypecd: "",
        page: 1,
        size: 10,
        billNo: "",
        ieTypecd: "",
        gdsNm: ""
      },
      ep_data: [],
      ep_page: {
        page: 1,
        size: 10
      },
      settings: {
        pk: "id" // 主键
      },
      listApi: "getDirDetailPage",
      showStatus: true
    };
  },
  computed: {
    ieTypecdStatus() {
      // 进出标志
      if (this.updata) {
        return this.$store.getters.getIoTypecdStatusEdit;
      } else {
        return this.$store.getters.getIoTypecdStatus;
      }
    }
  },
  watch: {
    ieTypecdStatus: {
      handler(newDate, oldDate) {
        console.log("进出标志", newDate);
        if (newDate == "I") {
          this.showStatus = false;
        } else {
          this.showStatus = true;
        }
      },
      immediate: true
    }
  },

  mounted() {
    // if (this.needDate.passportTypecd != "5") {
    //   if (this.needDate.rltNo == undefined) {
    //     this.$pop({
    //       type: "danger",
    //       message: "请先录入关联单证！"
    //     });
    //     return;
    //   }
    //   this.refresh(true);
    // }
  },
  methods: {
    search() {
      let whareHouse = {};
      if (this.updata) {
        whareHouse = JSON.parse(sessionStorage.getItem("formlated1"));
      } else {
        whareHouse = JSON.parse(sessionStorage.getItem("formlated"));
      }
      console.log("关联单证", whareHouse);
      if (!whareHouse) {
        this.$pop({
          type: "danger",
          message: "请选择关联单证"
        });
        return;
      } else {
        this.searchForm.billNo = whareHouse.rltNo;
      }
      if (this.ieTypecdStatus) {
        this.searchForm.ieTypecd = this.ieTypecdStatus;
      } else {
        this.$pop({
          type: "danger",
          message: "请选择表头进出标志"
        });
        return;
      }

      this.refresh(false);
    },
    addData() {
      let selectData = this.$refs.table.getData("select");
      if (selectData.length != 1) {
        return this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
      }
      this.$emit("oneDate", selectData[0]);
    },
    dclUnitcdTranslate(row, index) {
      let UnitList = this.$store.getters.getUnitList;
      for (let i = 0; i < UnitList.length; i++) {
        if (row.dclUnitcd == UnitList[i].unit) {
          return UnitList[i].unitName;
        }
      }
    }
  }
};
</script>



<style>
</style>
