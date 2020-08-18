<template>
  <div class="panel-main-content">
    <div class="contents-card card-margin">
      <div class="panel panel-default">
        <ep-tabs active="货物信息表">
          <ep-tab-item name="货物信息表">
            <div class="card-body">
              <Form :bodyForm="bodyForm" :isDetail="true" v-if="type == 0" />
              <div  v-if="type == 1">
                <div class="block">
                  <ep-table border ref="table" :height="400" :data="base_data" :head-color="headColor">
                    <ep-table-item column="gdsMtno" title="商品料号" width="170">
                      <template slot-scope="props">
                        <ep-tooltip
                          class="item"
                          effect="dark"
                          :content="props.row.gdsMtno"
                          placement="top"
                        >
                          <p
                            style="max-width:122px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;box-sizing:border-box;"
                          >{{props.row.gdsMtno}}</p>
                        </ep-tooltip>
                      </template>
                    </ep-table-item>
                    <ep-table-item column="gdecd" title="商品编码" width="125"></ep-table-item>
                    <ep-table-item column="ciqCode" title="商检编码" width="100"></ep-table-item>
                    <ep-table-item column="gdsNm" title="商品名称" width="230">
                      <template slot-scope="props">
                        <ep-tooltip
                          class="item"
                          effect="dark"
                          :content="props.row.gdsNm"
                          placement="top"
                        >
                          <p
                            style="max-width:182px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;box-sizing:border-box;"
                          >{{props.row.gdsNm}}</p>
                        </ep-tooltip>
                      </template>
                    </ep-table-item>
                    <ep-table-item column="gdsSpcfModelDesc" title="规格型号" width="350">
                      <template slot-scope="props">
                        <ep-tooltip
                          class="item"
                          effect="dark"
                          :content="props.row.gdsSpcfModelDesc"
                          placement="top"
                        >
                          <p class="rmk-style">{{props.row.gdsSpcfModelDesc}}</p>
                        </ep-tooltip>
                      </template>
                    </ep-table-item>
                    <ep-table-item
                      column="natcd"
                      title="国别"
                      width="180"
                      :formatter="destinationTranslate"
                    ></ep-table-item>
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
                    <ep-table-item column="dclEr" title="申报人" width="140"></ep-table-item>
                    <ep-table-item column="dclTime" title="申报时间" width="180"></ep-table-item>
                    <ep-table-item column="accessUser" title="审核人" width="140">
                      <template slot-scope="props">
                        <p>{{props.row.accessUser == "0" ? '海关自动审核': props.row.accessUser}}</p>
                      </template>
                    </ep-table-item>
                    <ep-table-item column="accessTime" title="审核时间" width="180"></ep-table-item>
                    <ep-table-item
                      column="optStatus"
                      title="状态"
                      width="130"
                      :formatter="optStatusFormatter"
                    ></ep-table-item>
                    <ep-table-item
                      column="dclTypecd"
                      :formatter="optDclTypecdFormatter"
                      title="申报类型"
                      width="100"
                    ></ep-table-item>

                    <ep-table-item column="rmk" title="备注" width="350">
                      <template slot-scope="props">
                        <p class="rmk-style">{{props.row.rmk}}</p>
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
          </ep-tab-item>
        </ep-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import misList from "src/base/mixins/mislist";
import mixin from "./mixin";
import { cloneObj, getToken } from "utils";
import Form from "./components/form";
import OptStatus from "src/components/WholeOptStatus";

export default {
  mixins: [misList, mixin],
  name: "baseGoodInfos",
  components: {
    Form,
    OptStatus
  },
  data() {
    return {
      type: "",
      base_data: [],
      bodyForm: {},
      settings: {},
      ep_data: [
        {
          id: 1,
          name: "测试数据",
          age: 18
        }
      ],

      ep_page: {
        size: 10,
        page: 1
      },
      totalcount: 0,
      loading: false,
      model: false,
      headColor: true,
      note: ""
    };
  },
  mounted() {
    // console.log(this.$route.query);
    let type = this.$route.query.type // 0 - id   1 - gdsMtno
    let val = this.$route.query.id    // 根据id - id   根据料号 - gdsMtno
    let _id = this.$route.query._id   // 料号ID
    this.type = type
    this.againData(type, val, _id)
  },
  methods: {
    againData(type, val, _id) {
      console.log(type, type == 0);
      
      if (type == 0) {
        console.log('enter');
        
        this.$post("baseGoodDetail", { id: val, type: "0" }).then(res => {
          this.bodyForm = res.map.data;
        });
      } else if (type == 1) {
        this.$post("baseGoodCurrentAndHisDetail", { gdsMtno: val, id: _id, type: "0" })
        .then(
          res => {
            this.base_data = res.map.data.currentBaseGood;
            console.log(this.base_data);
            this.makePaging(10, 1, this.base_data); // 分页
          })
        .catch(err => {
          console.log(err)
          this.note = err.note
        })
      }
    },
    handleSizeChange(val) {
      this.ep_page.size = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
      );
    },
    handleCurrentChange(val) {
      this.ep_page.page = val;
      this.makePaging(
        this.ep_page.size,
        this.ep_page.page,
      );
    },
    makePaging(size, page, data) {
      let begin = (page - 1) * size;
      let end = begin + size;
      let newData = data.slice(begin, end);
      this.totalcount = data.length;
      this.tableData = newData;
    }
  }
};
</script>