<template>
  <div>
    <div class="panel-main-content">
      <div class="search-card contents-card card-margin">
        <ep-model title="表体勾选" v-model="model" width="700px">
          <tableLists></tableLists>
        </ep-model>
        <div>
          <h2>出区</h2>
        </div>
        <div class="in-content">
          <div class="title-select">
            <ep-col :col="24">
              <span>类型:</span>
              <ep-radio class="radio" v-model="radio" label="1"
                >先报后送</ep-radio
              >
              <ep-radio class="radio" v-model="radio" label="2"
                >分送集报</ep-radio
              >
            </ep-col>
          </div>

          <div class="left-table one-table">
            <h3 style="text-align: center;">出库单列表</h3>
            <div>
              <table class="table table-striped">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">序号</th>
                    <th scope="col">组织名称</th>
                    <th scope="col">企业名称</th>
                    <th scope="col">企业编码</th>
                    <th scope="col">操作</th>
                  </tr>
                </thead>
                <!-- <draggable v-model="list" tag="tbody">
          <tr v-for="item in list" :key="item.name">
            <td scope="row">{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.sport }}</td>
                </tr>-->

                <draggable
                  class="list-group movediv"
                  tag="tbody"
                  :list="list1"
                  :group="{ name: 'menu', put: false }"
                  :sort="false"
                  @change="log"
                >
                  <tr
                    class="list-group-item item-list"
                    v-for="(element, index) in list1"
                    :key="index"
                  >
                    <td scope="row">{{ element.id }}</td>
                    <td>{{ element.orgname }}</td>
                    <td>{{ element.tradeName }}</td>
                    <td>{{ element.tradeCode }}</td>
                    <td>
                      <ep-button @click="showModel" size="small" type="warning"
                        >查看表体</ep-button
                      >
                    </td>
                    <!-- <div>
                               <span>{{ element.id }}</span> <span>{{ element.orgname }}</span>
                                <draggable class="movediv" v-if="element.flag==true" :sort='false' group="dtinfo">
                                <div class="hidden-table" v-for="(item,hiddenIndex) in element.dataList" :key="hiddenIndex">

                                    <span>{{item.id}}</span> <span>{{item.gname}}</span>

                                </div>
                                </draggable>
                    </div>-->
                  </tr>
                </draggable>
                <!-- </draggable> -->
              </table>
            </div>
          </div>
          <div class="right-table one-table">
            <h3 style="text-align: center;" v-show="radio == 1">仓单</h3>
            <h3 style="text-align: center;" v-show="radio == 2">
              卡口验放凭证
            </h3>
            <div>
              <draggable
                class="list-group movediv"
                :list="list2"
                :group="{ name: 'menu', put: true }"
                :sort="false"
                @change="log"
              >
                <div
                  class="list-group-item item-list"
                  v-for="(element, index) in list2"
                  :key="index"
                >
                  <div>
                    <span @click="showTable(element)">{{ element.id }}</span>
                    <span @click="showTable(element)">{{
                      element.orgname
                    }}</span>
                    <span @click="showTable(element)">{{
                      element.tradeName
                    }}</span>
                    <span @click="showTable(element)">{{
                      element.tradeCode
                    }}</span>
                    <span @click="showTable(element)">></span>
                    <div v-if="element.flag == true">
                      <table>
                        <!-- <td>序号</td>
                                                <td>商品名称</td>
                                                <td>操作</td> -->
                        <thead>
                          <tr>
                            <th scope="col">序号</th>
                            <th scope="col">商品名称</th>
                            <th scope="col">操作</th>
                          </tr>
                        </thead>

                        <!-- <draggable
                                       :group="{put:false}"
                                        class="movediv"

                                        tag="tbody"
                                        > -->
                        <tr
                          class="hidden-table"
                          v-for="(item, hiddenIndex) in element.dataList"
                          :key="hiddenIndex"
                        >
                          <td>{{ item.id }}</td>
                          <td>{{ item.gname }}</td>
                          <td>
                            <ep-button type="success" size="small"
                              >修改</ep-button
                            >
                          </td>
                        </tr>
                        <!-- </draggable> -->
                      </table>
                    </div>
                  </div>
                </div>
              </draggable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import tableList from "./outpaper";
import draggable from "vuedraggable";
import tableLists from "./tableList";
export default {
  name: "makeCard", // 保持和文件名一致，否则keep-alive不会动态缓存

  extends: misList, // 务必继承
  components: {
    draggable,
    tableLists,
  },
  data() {
    return {
      list1: [],
      list2: [],
      radio: "1",
      model: false,
    };
  },
  created() {},

  mounted() {
    console.log(tableList.data);
    this.list1 = tableList.data;
  },
  computed: {},
  watch: {},
  methods: {
    showModel() {
      this.model = true;
    },
    log() {},
    endDrag() {
      console.log(22);
    },
    showTable(element) {
      if (element.flag == undefined || element.flag == false) {
        this.$set(element, "flag", true);
      } else {
        this.$set(element, "flag", false);
      }
      console.log(element.flag);
    },
    drop(e) {
      console.log(e);
    },
  },
};
</script>
<style lang="less" scoped>
.in-content {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.title-select {
  width: 300px;
  position: absolute;
  top: -30px;
}
.movediv {
  cursor: move;
  min-height: 400px;
}
.one-table {
  width: 46%;
  border: 1px solid #27ae60;
  overflow-x: scroll;
}
.item-list {
  margin-top: 5px;
}
.hidden-table {
}
</style>
