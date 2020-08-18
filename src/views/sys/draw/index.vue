<template>
  <div class="panel-main-content main-in-style" >
    <!--筛选栏组-->
    <div class="search-card contents-card card-margin">
        <!--  -->
         <div class="panel panel-default">
        <div class="card-title zero-padding">查询条件</div>
        <div class="card-body">
          <ep-form :form="searchForm">
            <ep-row>
              <ep-col :col="6">
                <ep-form-item label="出入库">
                  <ep-select v-model='searchForm.status'>
                    <ep-select-item index="1" label="出库"></ep-select-item>
                    <ep-select-item index="2" label="入库"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
               <ep-col :col="10">
                <ep-form-item label="时间">
                 <ep-date-range v-model="searchForm.time" style="width: 350px;"></ep-date-range>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item>
                  <ep-button type="primary">搜索</ep-button>
                  <ep-button type="primary">重置</ep-button>
                </ep-form-item>
              </ep-col>
            </ep-row>
          </ep-form>
        </div>
        </div>
        <!--  -->
    </div>
    <div class="search-card contents-card card-margin" style="height:705px">
      <ep-row>
        <ep-col :col="11" style="border: 1px solid #e1e4e8; border-radius: 15px; height:605px">
          <table class="stock">
            <th style="width:40px"><input type="checkbox"> </th>
            <th style="width:150px">需要处理的单号</th>
            <th style="width:100px"></th>
            <th style="width:150px"></th>
            <th style="width:150px"></th>
            <th style="width:80px"></th>
          </table>
          <ep-collapse>
          <draggable v-model="value2" @add="add" :options="dragOptions"  :move="moveFunction">
      
                <transition-group tag="div" id="value2" class="item-ul" @click="aa">
                  <!-- <div ><input type="checkbox">  -->
                  <ep-collapse-item checkbox:true  v-for="item in value2" :title="'库存单号：'+item.id"  :key="item.id" index="1" >
                    <draggable v-model="two" @click="add(biaoti)" :options="dragOptions"  :move="moveFunction">
                    <div class="head">
                      <div><p class="tittle">这里是表头数据</p></div>
                        <div style="display:flex; margin:0 0 8px 0; flex-direction: column;">
                          <div style="display:flex;">
                            <div style="width:50% ">库存单号 ：{{item.id}}</div>
                            <div style="width:50%">企业信用代码：{{item.payeeName}}</div>
                          </div>
                          <div style="display:flex;">
                            <div style="width:50%">卡口编号：{{item.bizType}}</div>
                            <div style="width:50%">业务类型：{{item.status}}</div>
                          </div >
                      </div>
                    </div>
                  </draggable>

                  <draggable v-model="two" @click="add(biaoti)" :options="dragOptions"  :move="moveFunction">
                     <div class="footer" v-for="index in item.qqq" :key="index.id">
                      <div class="tittle" >表体{{index.id}}</div>
                      <!-- <div>企业信用代码：{{item.qqq}}</div> -->
                      <draggable v-model="one" @click="add(bianma)" :options="dragOptions"  :move="moveFunction">
                        <div>企业信用编号：{{index.aaa}}</div>
                     </draggable>
                      <draggable v-model="three" @click="add(daima)" :options="dragOptions"  :move="moveFunction">
                      <div>企业信用代码：{{index.bbb}}</div>
                     </draggable>
                    </div>
                    </draggable>
                    
                  </ep-collapse-item>

                  <!-- </div> -->
                </transition-group>
        </draggable>
        </ep-collapse>
              <!-- 出入库预增减模块 -->
    <div class="block">
      <ep-pager center :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount" style="margin: 0 15px"></ep-pager>
    </div>
   </ep-col>
         <ep-col :col="12" style="height:300px; margin:0 0 5px 5px;border-radius: 15px 15px 0 15px;border: 1px solid #e1e4e8;">
            <table class="stock">
            <th style="width:40px"></th>
            <th style="width:150px">进出区提发货单号</th>
            <th style="width:100px">企业信用代码</th>
            <th style="width:150px">卡口编号</th>
            <th style="width:150px">业务类型</th>
            <th style="width:80px"> <ep-button type="primary"  @click="exportvalue1">导出</ep-button></th>
          </table>
          <!-- 出入库预增减 -->
          <draggable v-model="value1" :options="dragOptions"   :move="moveFunction">
                <transition-group tag="div" id="value1" class="item-ul2">
                  <div v-for="item in value1" class="drag-list" :key="item.id">
                      <table class="stockdd">
                        <tr>
                        <td style="width:150px">{{item.id}}</td>
                        <td style="width:100px">{{item.payeeName}}</td>
                        <td style="width:150px">{{item.payerName}}</td>
                        <td style="width:150px">{{item.bizType}}</td>
                        <td style="width:80px">{{item.status}}</td>
                        </tr>
                        
                      </table>
                  </div>
                </transition-group>
              </draggable>
        </ep-col>
         <ep-col :col="12"  style="height:300px;border-radius: 15px 15px 0 15px; border: 1px solid #e1e4e8;  margin:0 5px">
            <table class="stock">
            <!-- <th style="width:40px">></th> -->
            <th style="width:100px">卡口账单号</th>
            <th style="width:150px">卡口编号</th>
            <th style="width:150px">业务类型</th>
            <th style="width:100px">位置</th>
            <th style="width:80px">
    <ep-dropdown type="click" position="right">
      <ep-button slot="item" type="text" size="small" icon="arrow-down-b" right-icon>操作</ep-button>
      <ep-dropdown-item item-key="IMHDYW">导出</ep-dropdown-item>
      <ep-dropdown-item item-key="JKFX">清除</ep-dropdown-item>
      <ep-dropdown-item item-key="IMPFER">查看</ep-dropdown-item>
      <ep-dropdown-item item-key="EXYDDC">进境</ep-dropdown-item>
      <ep-dropdown-item item-key="EXCDGG">出境</ep-dropdown-item>
    </ep-dropdown>
            </th>
          </table>
          <draggable v-model="value3" :options="dragOptions"   :move="moveFunction">
                <transition-group tag="div" id="value3" class="item-ul2">
                  <div v-for="item in value3" class="drag-list" :key="item.id">
                      <table class="stockdd">
                        <tr>
                        <td style="width:100px">{{item.id}}</td>
                        <td style="width:150px">{{item.payerName}}</td>
                        <td style="width:150px">{{item.bizType}}</td>
                        <td style="width:130px">{{item.address}}</td>
                        <td style="width:30px"></td>
                        <!-- <td style="width:80px">{{item.status}}</td> -->
                        </tr>
                      </table>
                  </div>
                </transition-group>
              </draggable>
        </ep-col>
    </ep-row>
    <ep-model title="操作选择" v-model="model" :size="size">
      <span>该数据可以进行一下操作</span>
      <div slot="footer">
        <ep-button type="text" @click="pinzheng">区内卡口核放凭证</ep-button>
        <ep-button type="text" @click="fahuo">区间进出去提发货</ep-button>
        <ep-button type="text" @click="jibao">区外分送集报</ep-button>
        <ep-button type="text" @click="housong">区外先报后送</ep-button>
      </div>
    </ep-model>
    <ep-model title="消息提示" v-model="model1" moveable>
      <ep-table :data="value1" :height="200" ref="functionTb" @selection-change="handleSelectChange">
        <ep-table-item type="expand">
          <template slot-scope="props">
            <ep-form name-width="100px" class="form-show" name-position="left">
              <ep-row>
                <ep-col :col="12">
                  <ep-form-item label="账单号">
                    {{props.row.id}}
                  </ep-form-item>
                </ep-col>
                <ep-col :col="12">
                  <ep-form-item label="操作方式">
                    {{props.row.payeeName}}
                  </ep-form-item>
                </ep-col>
                <ep-col :col="12">
                  <ep-form-item label="卡口编号">
                    {{props.row.payerName}}
                  </ep-form-item>
                </ep-col>
                <ep-col :col="12">
                  <ep-form-item label="业务类型">
                    {{props.row.bizType}}
                  </ep-form-item>
                </ep-col>
                
                 <ep-col :col="12" v-for="index in props.row.qqq" :key="index.id">
                  <ep-form-item label="表体">
                    表体{{index.id}}
                    <br>
                    {{index.aaa}}
                    {{index.bbb}}
                  </ep-form-item>
                </ep-col>
              </ep-row>
            </ep-form>
          </template>
        </ep-table-item>
        <ep-table-item type="num"></ep-table-item>
        <ep-table-item column="id" title="账单号"></ep-table-item>
        <ep-table-item column="payeeName" title="操作方式"></ep-table-item>
        <ep-table-item column="payerName" title="卡口编号"></ep-table-item>
        <ep-table-item column="bizType" title="业务类型"></ep-table-item>
        <ep-table-item column="status" title="状态"></ep-table-item>
      </ep-table>
      {{this.three}}
      <div slot="footer">
      <ep-button type="text" @click="model1 = !model1">取消</ep-button>
      <ep-button type="primary" @click="handleClick">确定</ep-button>
      </div>
    </ep-model>
    <ep-model title="消息提示" v-model="model2" moveable>
      <span>这里显示</span>
      <div slot="footer">
      <ep-button type="text" @click="model1 = !model1">取消</ep-button>
      <ep-button type="primary" @click="handleClick">确定</ep-button>
      </div>
    </ep-model>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import Sortable from 'sortablejs';
export default {
  data() {
      return{
    searchForm: {
        "time": "",
        "status": ""
      },
      model:false,
      model1:false,
      model2:false,
      size: 'mini',
      state: '',
      dragOptions: {
        scroll: true,
        group: 'sortlist',
        // ghostClass: 'ghost-style',
        // store: false
      },
      totalcount:"0",
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      length: 0,
      // value1ti: [],
      value2: [
          {"payerCode":"20160101999","payeeName":"外代","payerName":"20160101999","status":10,"payableCurr":"CNY","bizType":"JKFX","id":107331,"qqq":[{"id":1,"aaa":123,"bbb":456},{"id":2,"aaa":123,"bbb":456}]},
          ],
      value1: [],
      value3: []
    }
  },
  components: {
      draggable,
  },
  mounted() {
    // this.getData()
  },
  methods: {
      handleChange(val) {
        console.log(val)
      },
      getData() {
     console.log(这里请求数据)
    }
    },
    watch: {
    value1(newVal, oldVal) {
      console.log(newVal)
      console.log(oldVal)
      let A = []
      newVal.map(item => {
        console.log(item.id)
        A.push(item.id)
      })
      console.log(this.value2)
      console.log(this.value1)
      console.log(this.value3)
      this.value2
        .filter(item  => item.selectCheck === true)
        .map(item => {
          console.log(A, item.id, A.includes(item.id))
          if (!A.includes(item.id)) {
            this.value2 = this.value2.filter(({ id }) => id !== item.id)
          }
        })
    },
    value3(newVal, oldVal){
      let C = []
      var L = newVal.length-1
      if (newVal.length > oldVal.length ){
        var arr1 = []
        var arr2 = []
        var aaa = 0
        var arr3 = new Array
        for (var i = 0 ; i < oldVal.length ; i++){
          arr1.push(oldVal[i].id)
        }
        for (var i = 0 ; i < newVal.length ; i++){
          arr2.push(newVal[i].id)
        }
        var isNaN = Number.isNaN;
        var difference = function (arr1, arr2) {
            return arr1.reduce(function (previous, i) {
                var found = arr2.findIndex(function (j) {
                    return j === i || (isNaN(i) && isNaN(j));
                });
                return (found < 0 && previous.push(i), previous);
            }, []);
        };    
      this.state = difference(arr2, arr1)
      // 
      this.value3.forEach(element => {
        if (element.id == this.state ){

           aaa = element.status
        }
      });
      // 
      if(true) {
        this.model = true 
        console.log(this.state)
        console.log("二线分送集报")
      }
      }
      console.log(newVal)
      console.log(oldVal)
    },
     epData (val) {
      this.ep_data = val
      this.totalcount = this.$parent.totalcount
    }
  },
  
  methods:{
    aa(){
      console.log('aaa')
    },
    block(val) {
      console.log(this)
    },
    handleClick() {
      this.model1 = false
      this.model2 = false
    },
    exportvalue1(){
      this.model1 = true
    },
    exportvalue3(){
      this.model2 = true
    },
      stockClick(data) {
      // if(data.selectCheck) return
      data.selectCheck=true
      data.portReleaseDt.map(item => {
        item.premId = data.id
      })
      this.doing = [...this.doing, ...data.portReleaseDt]
    },
    pinzheng(){
      let vm = this
      this.model = false
       this.value3.forEach(element => {
        if (element.id == this.state ){
          element.address = '区内'
        }
      });
      vm.$pop('该数据已经提交到卡口核放凭证')
    },
      fahuo(){
      let vm = this
      this.model = false
      this.value3.forEach(element => {
        if (element.id == this.state ){
          element.address = '区间'
        }
      });
      vm.$pop('该数据已经提交到区间进出区提发货凭证'+ this.state)
    },
      jibao(){
      let vm = this
      this.model = false
       this.value3.forEach(element => {
        if (element.id == this.state ){
          element.address = '区外分送'
        }
      });
      vm.$pop('该数据已经提交到区外分送集报')
    },
      housong(){
      let vm = this
      this.model = false
       this.value3.forEach(element => {
        if (element.id == this.state ){
          element.address = '区外先报'
        }
      });
      vm.$pop('该数据已经提交到区外先报后送')
    },
     add(event) {
       console.log(event)
    },
     handleConfirm () {
        this.model = true
        let vm = this
        this.$confirm({
          word: '是否进行区间操作',
          callback (errorInfo) {
            if (errorInfo) {
              // this.$options.methods.handleConfirm2 ()
              vm.$pop('点击了是')
              this.model = true
            } else {
              vm.$pop('点击了否')
            }
          }
        })
      },
      handleConfirm2 () {
        let vm = this
        this.$confirm({
          word: '是先报后送还是分送集报',
          callback (errorInfo) {
            if (errorInfo) {
              vm.$pop('先包后送')
            } else {
              vm.$pop('分送集报')
            }
          }
        })
      },
      moveFunction({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      console.log(relatedElement, draggedElement)
      // return (
      //     (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      // );
    },
  }
}
</script>
<style scoped>
  #value2 {
    
  overflow-y: scroll;
  }

  .tittle {
    border: 1px solid #e1e4e8;
    border-radius: 5px;
    margin: 15px 0px;
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    width: 200px;
    
  }
  .head {
    border-bottom: 1px solid #e1e4e8;
    margin: 0 10px;
  }
  .footer {
    margin: 10px 10px;
  }
  .stock {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e1e4e8;
    text-align:center;
  }
  .stockdd{
   width: 100%;
    text-align:center;
  }
  .form-show .ep-form--content {
    line-height: 32px !important;
  }
  .form-show .ep-form--item {
    margin: 0;
  }
  .drag-list {
  border: 1px #e1e4e8 solid;
  padding: 10px;
  margin: 5px 0 10px;
  list-style: none;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  -webkit-transition: border 0.3s ease-in;
  transition: border 0.3s ease-in;
}
  .item-ul {
  padding: 0 8px 8px;
  height: 500px;
  overflow-y: scroll;
}
  .item-ul2 {
  padding: 0 8px 8px;
  height: 240px;
  overflow-y: scroll;
}
.item-ul::-webkit-scrollbar {
  width: 0;
}
</style>