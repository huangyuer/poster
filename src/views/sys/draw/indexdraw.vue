<template>
  <div>
    <div class="panel-main-content">
      <!--筛选栏组-->
      <div class="search-card contents-card card-margin">
        <div class="panel panel-default">
          <div class="card-title zero-padding">
            <span class="weight">查询列表</span>
          </div>
        </div>
        <div class="panel panel-default">
          <ep-form :form="searchForm">
            <ep-row>
              <ep-col :col="6">
                <ep-form-item label="出入库">
                  <ep-select v-model="searchForm.status">
                    <ep-select-item index="1" label="出库"></ep-select-item>
                    <ep-select-item index="2" label="入库"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="10">
                <ep-form-item label="时间">
                  <ep-date-range v-model="searchForm.time" style="width: 350px;"></ep-date-range>
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
      <!-- <search-tips /> -->
      <div class="ep-card card-margin relative">
        <div class="card-body">
          <div class="block">
            <ep-button type="primary" size="small" @click="doDeclare" icon="checkmark-round">确认</ep-button>
            <!-- <ep-button type="primary" size="small" @click="doRecords" style="width:67px">操作记录</ep-button> -->
            <template>
              <div style="position:relative;display:inline-block">
              <!-- <div class="checkStatus" v-show="statusFlag">
                  <ep-button type="success" @click="upClick" size="small" icon="android-upload">Excel导入</ep-button>
              </div> -->
              
              <el-upload
              class="import-upload"
              multiple
              name="file"
              ref="upload"
              :action="uploadUrl"
              :headers="headers"
              :data="uploadParams"
              :before-upload="handleBeforeUpload"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
              :show-file-list="false"
              >
              <ep-button type="success"  size="small" icon="android-upload">导入</ep-button>
            </el-upload>
          </div>
            </template>
            <!-- <upload :uploadData="uploadData" :uploadType="1" /> -->
          </div>
          <div class="draw">
            <div class="row">
              <h2>企业字段</h2>
              <div class="txt">
                <draggable class="list-group"  group="people"  :list="list1">
                  <div class="list-group-item" v-for="item  in list1" :key="item.tradePropName" >
                     {{item.tradePropName}}---{{item.value}}
                  </div>
                  </draggable>
                  <!-- <div>
                        <input type="text" v-model="list.id">
                  </div>-->
              </div>

              <!-- <div class="txt">
                <draggable class="list-group" group="people" @change="log" :list="list2">
                  <div class="list-group-item" v-for="item  in list2" :key="item.name">
                     
                  </div>
                </draggable>
              </div> -->
            </div>





            <!-- 表头 -->
            <div class="row1">
                <div class="title">
                    <h3>出入库表头</h3>
                </div>
              
              <div class="txt1">
                <p>ERP/WMS出入库编号</p>
                <draggable class="list-group" :list="inExpWhNo" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in inExpWhNo"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                    <ep-input v-model="item.values" name="values"></ep-input>
                  </div> 
                  <div>       
                  </div> 
                </draggable>
                
                   
              </div>

              <div class="txt1">
                <p>ERP/WMS出入库日期</p>
                <draggable class="list-group" :list="inExpTime" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in inExpTime"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                  </div>  
                </draggable>
                <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="8">
                    <ep-col :col="8">
                      <ep-form-item label="ERP/WMS出入库日期" attr="inExpTime">
                        <ep-input v-model="bodyForm.inExpTime" name="inExpTime"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>

              <div class="txt1">
                <p>监管方式</p>
               <draggable class="list-group" :list="supvModecd" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in supvModecd"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                  </div>  
                </draggable>
                <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="8">
                    <ep-col :col="8">
                      <ep-form-item label="汇总统计编号" attr="supvModecd">
                        <ep-input v-model="bodyForm.supvModecd" name="supvModecd"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
              <div class="txt1">
                <p>运输方式</p>
                <draggable class="list-group" :list="trspModecd" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in trspModecd"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                  </div>  
                </draggable>
                <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="8">
                    <ep-col :col="8">
                      <ep-form-item label="汇总统计编号" attr="trspModecd">
                        <ep-input v-model="bodyForm.trspModecd" name="trspModecd"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
              
              <div class="txt1">
                <p>进出境关别</p>
                <draggable class="list-group" :list="impexpPortcd" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in impexpPortcd"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                  </div>  
                </draggable>
                <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="8">
                    <ep-col :col="8">
                      <ep-form-item label="汇总统计编号" attr="impexpPortcd">
                        <ep-input v-model="bodyForm.impexpPortcd" name="impexpPortcd"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
              <div class="txt1">
                <p>关联报关单编号</p>
                <draggable class="list-group" :list="listcode" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in listcode"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                  </div>  
                </draggable>
                <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="8">
                    <ep-col :col="8">
                      <ep-form-item label="汇总统计编号" attr="inExpWhNo">
                        <ep-input v-model="bodyForm.inExpWhNo" name="inExpWhNo"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
              <div class="txt1">
                <p>最终目的国</p>
                <draggable class="list-group" :list="listcode" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in listcode"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                  </div>  
                </draggable>
                <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="8">
                    <ep-col :col="8">
                      <ep-form-item label="汇总统计编号" attr="inExpWhNo">
                        <ep-input v-model="bodyForm.inExpWhNo" name="inExpWhNo"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
              <div class="txt1">
                <p>启运国/运抵国</p>
                <draggable class="list-group" :list="tradeCountry" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in tradeCountry"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                  </div>  
                </draggable>
                <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="8">
                    <ep-col :col="8">
                      <ep-form-item label="汇总统计编号" attr="tradeCountry">
                        <ep-input v-model="bodyForm.tradeCountry" name="tradeCountry"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
              <div class="txt1">
                <p>贸易国（地区）</p>
                <draggable class="list-group" :list="tradingRegion" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in tradingRegion"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                  </div>  
                </draggable>
                <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="8">
                    <ep-col :col="8">
                      <ep-form-item label="汇总统计编号" attr="tradingRegion">
                        <ep-input v-model="bodyForm.tradingRegion" name="tradingRegion"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
              <div class="txt1">
                <p>境内目的地、境内货源地</p>
                <draggable class="list-group" :list="districtCode" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in districtCode"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                  </div>  
                </draggable>
                <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="8">
                    <ep-col :col="8">
                      <ep-form-item label="汇总统计编号" attr="districtCode">
                        <ep-input v-model="bodyForm.districtCode" name="districtCode"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
              <div class="txt1">
                <p>毛重</p>
                <draggable class="list-group" :list="grossWt" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in grossWt"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                  </div>  
                </draggable>
                <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="8">
                    <ep-col :col="8">
                      <ep-form-item label="汇总统计编号" attr="grossWt">
                        <ep-input v-model="bodyForm.grossWt" name="grossWt"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
              <div class="txt1">
                <p>成交方式</p>
                <draggable class="list-group" :list="transMode" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in transMode"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                  </div>  
                </draggable>
                <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="8">
                    <ep-col :col="8">
                      <ep-form-item label="成交方式" attr="transMode">
                        <ep-input v-model="bodyForm.transMode" name="transMode"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
              <div class="txt1">
                <p>境内收发货企业名称</p>
                <draggable class="list-group" :list="rcvgdEtpsNm" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in rcvgdEtpsNm"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                  </div>  
                </draggable>
                <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="8">
                    <ep-col :col="8">
                      <ep-form-item label="境内收发货企业名称" attr="rcvgdEtpsNm">
                        <ep-input v-model="bodyForm.rcvgdEtpsNm" name="rcvgdEtpsNm"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
              <div class="txt1">
                <p>境内收发货企业编码</p>
                <draggable class="list-group" :list="rcvgdEtpsNo" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in rcvgdEtpsNo"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                  </div>  
                </draggable>
                <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="8">
                    <ep-col :col="8">
                      <ep-form-item label="境内收发货企业编码" attr="rcvgdEtpsNo">
                        <ep-input v-model="bodyForm.rcvgdEtpsNo" name="rcvgdEtpsNo"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
              <div class="txt1">
                <p>境内收发货企业社会信用代码</p>
                <draggable class="list-group" :list="rcvgdEtpsSccd" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in rcvgdEtpsSccd"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                  </div>  
                </draggable>
                <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="8">
                    <ep-col :col="8">
                      <ep-form-item label="汇总统计编号" attr="inExpWhNo">
                        <ep-input v-model="bodyForm.inExpWhNo" name="inExpWhNo"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
              <div class="txt1">
                <p>操作状态</p>
                <draggable class="list-group" :list="optStatus" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in optStatus"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                  </div>  
                </draggable>
                <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="8">
                    <ep-col :col="8">
                      <ep-form-item label="汇总统计编号" attr="inExpWhNo">
                        <ep-input v-model="bodyForm.inExpWhNo" name="inExpWhNo"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
              <div class="txt1">
                <p>料件成品类型</p>
                <draggable class="list-group" :list="listcode" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in listcode"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                  </div>  
                </draggable>
                <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="8">
                    <ep-col :col="8">
                      <ep-form-item label="汇总统计编号" attr="inExpWhNo">
                        <ep-input v-model="bodyForm.inExpWhNo" name="inExpWhNo"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
              <div class="txt1">
                <p>进出标志</p>
                <draggable class="list-group" :list="impexpPortcd" group="people" @change="log"  >
                  <div
                    class="list-group-item"
                    v-for="(item, index) in impexpPortcd"
                    :key="item.tradePropName"
                  >
                    {{ item.tradePropName }} {{ index }}
                  </div>  
                </draggable>
                <ep-form class="demo-form" ref="bodyForm" :form="bodyForm" name-width="168px">
                  <ep-row :gutter="8">
                    <ep-col :col="8">
                      <ep-form-item label="汇总统计编号" attr="inExpWhNo">
                        <ep-input v-model="bodyForm.inExpWhNo" name="inExpWhNo"></ep-input>
                      </ep-form-item>
                    </ep-col>
                  </ep-row>
                </ep-form>
              </div>
             
              <!-- <rawDisplayer class="col-3" :value="list1" title="List 1" />

              <rawDisplayer class="col-3" :value="list2" title="List 2" />-->
            </div>
            <!-- 映射后3 -->
            <!-- <div class="row1">
              <div class="title">
                    <h3>出入库表体</h3>
                </div>

              
              <div class="txt">
                <p>映射后字段</p>
                <draggable class="list-group" :list="list13" group="people" @change="log">
                  <div
                    class="list-group-item"
                    v-for="(item, index) in list13"
                    :key="item.name"
                  >{{ item.name }} {{ index }}</div>
                </draggable>
              </div>
              <div class="txt">
                <p>映射后字段</p>
                <draggable class="list-group" :list="list13" group="people" @change="log">
                  <div
                    class="list-group-item"
                    v-for="(item, index) in list13"
                    :key="item.name"
                  >{{ item.name }} {{ index }}</div>
                </draggable>
              </div>
            </div> -->
          </div>
        </div>
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
    <ep-model title="修改映射后字段" v-model="infoModel" width="500px" :wrap-close="false">
      <ep-form ref="infoForm" :form="infoForm" name-width="108px">
        <ep-row :gutter="7">
          <ep-col :col="24">
            <ep-form-item attr="id" label="商品名称">
              <ep-input v-model="infoForm.id" name="id"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="24">
            <ep-form-item attr="name" label="单价">
              <ep-input v-model="infoForm.name" name="name"></ep-input>
            </ep-form-item>
          </ep-col>
        </ep-row>
        <div style="text-align:center">
          <ep-button type="primary" size="small" @click="makeSuer">确定</ep-button>
        </div>
      </ep-form>
    </ep-model>
    <ep-model title="操作记录" v-model="isShowRecordsModel" width="1200px" :wrap-close="false">
      <opt-records-tab :recordsTable="recordsTable"></opt-records-tab>
    </ep-model>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import draggable from "vuedraggable";
import { getToken, getId } from 'utils'
// import upload from './components/upload'
export default {
  name: "indexdraw", // 保持和文件名一致，否则keep-alive不会动态缓存
  extends: misList, // 务必继承
  components: { draggable },
  // props: {
  //   // uploadData: {
  //   //   type: Object,
  //   //   required: true
  //   // },
  //   uploadType:{
  //     default:0
  //   },
  //   // 传入此参数，用户可自定义增加导入前所进行的操作
  //   statusFlag:{
  //       default:false
  //   }
  // },
  data() {
    return {
    //   statusFlag:{
    //     default:false
    // },
      infoForm: {
        id: "",
        name: ""
      },
      uploadData: {
        
      },
      infoModel: false,
      isShowRecordsModel: false,
      recordsTable: [],
      
      list1: [  
        ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ],
      list3: [
        
      ],
      values:'',
      list13:[],
      listcode:[],
      inExpWhNo: [],
      inExpTime: [],
      supvModecd: [],
      optStatus: [],
      impexpPortcd: [],
      rcvgdEtpsNm: [],
      ieTypecd: [],
      mtpckEndprdTypecd: [],
      rcvgdEtpsNm: [],
      rcvgdEtpsNo: [],
      rcvgdEtpsSccd: [],
      tradeCountry:[],
      listt:[],
      tradingRegion:[],
      transMode:[],
      trspModecd:[],
      districtCode:[],
      grossWt:[],
      loading: false,
      customcode: this.$store.getters.getCustomCode,
      listApi: "listQtyLimit", // 搜索，取api.json里面的key值
      settings: {
        pk: "id" // 主键
      },
      selectLength: 0,
      selectItems: [],
      totalcount: 0,
      searchForm: {},
      isDragging: false,
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
       bodyForm: {
        id: '',
        orgId: '',
        sumPreentNo: '', //汇总统计编号
        sumBeginTime: '', //汇总统计开始时间
        sumDueTime: '', //汇总统计截止时间
        sumDclTime: '', //申报日期
        masterCuscd: this.$store.getters.getOrgCustomId, //主管关区代码
        rcvgdEtpsNm: '' ,//操作状态
        supvModecd:'',
        impexpPortcd:'',
        ieTypecd:'',
      },
      ep_data: [], //表格数据
      listdata:[],  
      uploadParam: {
        sysCode: "nepz",
        orgId: this.$store.getters.getId,
        userId:this.$store.getters.getUserId,
        userName: this.$store.getters.getUserName,
        customId: this.$store.getters.getCustomId,
        tradeCode: this.$store.getters.getTradeCode,
        tradeName: this.$store.getters.getTradeName, 
        creditCode: this.$store.getters.getCreditCode,
        orgCode: this.$store.getters.getOrgCode,
        orgType: this.$store.getters.getOrgType,
        organizationCode: this.$store.getters.getOrganizationCode,
        organizationName: this.$store.getters.getOrganizationName,
        orgCreditCode: this.$store.getters.getOrgCreditCode,
        orgCustomId: this.$store.getters.getOrgCustomId, 
        fileName: "",
      }
    };
  },
  watch:{
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    },
  },
  created() {
    // this.refresh(true)
  },
  computed: {
    // 设置请求头
    headers() {
      return {
        token: getToken(),
        orgId: getId()
      }
    },
    // 设置上传地址
    uploadUrl() {
      return global.HOST + '/preIncrease/upload'
    },
    // 请求的额外参数
    uploadParams() {
      if(this.uploadType==0){
        return Object.assign(this.uploadParam, this.uploadData);
      }else{
        this.uploadParam.sysCode = this.uploadData.sysCode
        return Object.assign(this.uploadParam, this.uploadData);
      }
      
      
    }
  },
  mounted() {
    if (!this.searchType) {
      // this.refresh();
    }
  },
  methods: {
    getStructure() {
      this.$post("getStructure")
        .then(res => {
          console.log(res);
        })
        .catch(() => {});
    },
    handleoBject(Object){
      for(let key in Object){
        this.list1.push({
          [key]:Object[key]
        })
        console.log()
      }
    },
    reset(e) {
      this.$refs[e].reset();
      this.gatetime = "";
    },
    changeTime() {
      let gatetime = this.gatetime.split(",");
      this.searchForm.gateStartTime = gatetime[0];
      this.searchForm.gateEndTime = gatetime[1];
    },
    handleSelectionChange(val) {
      this.selectLength = val.length;
      this.selectItems = val;
    },
    searchCallback(json) {
      // 搜索成功回调，做特殊处理在此
      let res = json.map.data.content;
      let table_data = [];
      res.forEach(function(item, index) {
        res[index]["link"] = res[index].icId;
      });
    },

    add: function() {
      this.list.push({ name: "Juan" });
    },
    replace: function() {
      this.list = [{ name: "Edgard" }];
    },
    clone: function(el) {
      return {
        name: el.name + " cloned"
      };
    },
    log: function(evt) {
      window.console.log(evt);
      console.log(this.inExpWhNo)
      // let listdata = [];

      // this.listdata.push(this.inExpWhNo,this.inExpTime)
       
    },
    dblclick(item) {
      console.log(item);
      this.infoForm = item;
      this.infoModel = true;
    },
    // onMove({ relatedContext, draggedContext }) {
    //   const relatedElement = relatedContext.element;
    //   const draggedElement = draggedContext.element;
    //   return (
    //     (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    //   );
    // },
    stock(){
      this.handleoBject(Object)
      console.log('aa')
    },
    doRecords() {
      // let { id } = selectData[0];
      // let page = this.ep_page.page
      // let size = this.ep_page.size
      // this.$post("tradeQualifyfindOperationLog", {pid})
      //   .then(res => {
      //     console.log(res)
      //     this.isShowRecordsModel = true;
      //     this.recordsTable = res.map.data.content
      //     this.declareLoading = false;
      //   })
      //   .catch(e => {
      //     this.declareLoading = false;
      //   });
    },
    doDeclare() {
       this.inExpWhNo.forEach(item=>{
        console.log(item)
        this.listdata.push(item)
        console.log(this.listdata)
      })
      this.inExpTime.forEach(item=>{
        console.log(item)
        this.listdata.push(item)
        console.log(this.listdata)
      })
      console.log(this.listdata)
      console.log(this.bodyForm)
      // this.getStructure();
      // this.$router.push("/ImportBondedInfodraw");
    },
    makeSuer() {
      this.infoModel = false;
     
    },
    goback() {
      this.$router.go(-1);
    },
    upClick(){
        // 触发click事件
        this.$emit("upButtonClick",true)
       // this.$refs.upload.$refs['upload-inner'].handleClick()
    },
    // 上传前校验
    handleBeforeUpload(file) {
      this.uploadParams.fileName = file.name;

      let fileName = file.name.split('.');
      let isxls = fileName[fileName.length-1] === 'xls';
      let isxlsx =  fileName[fileName.length-1]=== 'xlsx';
        let txt =  fileName[fileName.length-1]=== 'txt';
      let isLt2M = file.size / 1024 / 1024 < 2;

      if (!isxls && !isxlsx) {
        this.$pop({
          type: 'danger',
          message: '上传模板只能是xls、xlsx、txt格式!'
        });
        return false;
      }

      if (!isLt2M) {
        this.$pop({
          type: 'danger',
          message: '上传模板大小不能超过2M!'
        });
        return false;
      }

    },

    // 上传成功回调
    handleUploadSuccess(response, file, fileList) {
      if (response.status == '1') {
        this.$pop({
          type: 'success',
          message: response.note
        });
        this.list1=response.map.data
        // this.$router.push({name: "Excel导入"});
      }
      
    },

    // 上传失败回调
    handleUploadError(err, file, fileList) {
      console.log(err)
    },

  }
};
</script>

<style scoped>
.draw {
  display: flex;
  justify-content: space-around;
  height: 100%;
}
button {
  width: 50px;
  height: 30px;
}

.row1 {
  width: 500px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.list-group {
  display: flex;
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  padding-left: 0;
  margin-left: 12px;
  margin-bottom: 0;
  width: 200px;
  height: 50px;
  border: 1px solid #ccc;

}
.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}

header {
  height: 57px;
  background: #2196f3;
  display: flex;
  justify-content: space-between;
}
.logo {
  width: 220px;
}
.logo img {
  width: 100%;
  height: 100%;
}
.user {
  line-height: 57px;
  display: flex;
  justify-content: space-around;
}
.user span {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  padding-right: 20px;
}
.userlogo {
  height: 40px;
  width: 40px;
  /* border: 20px solid #108DB6 !important; */
  margin-top: 8px;
  margin-right: 18px;
}
.userlogo img {
  width: 100%;
  height: 100%;
}
.txt {
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.12), 0 3px 15px rgba(0, 0, 0, 0.24);
  background: #fff;
  margin-top: 20px;
  /* display: flex; */
  justify-content: space-between;
  border-radius: 10px;
    /* max-height: 150px; */
  overflow-y: scroll;
  height: 1000px;
  
}
.txt1 {
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.12), 0 3px 15px rgba(0, 0, 0, 0.24);
  background: #fff;
  margin-top: 20px;
  /* display: flex; */
  justify-content: space-between;
  border-radius: 10px;
    /* max-height: 150px; */
  overflow-y: scroll;
  /* height: 1000px; */
  
}
h3 {
  margin-left: 5px;
  color: #ffffff;
}
p {
  margin-left: 5px;
}
.text{
    background: #ccc;
    text-align: center;
    border: 1px solid #ffffff;
    padding: 5px;
    margin-bottom: 5px;
}
.title{
    background:rgba(56, 156, 252, 0.8);
    width: 250px;
    height: 60px;
    text-align: center;
}
.ep-input{
  margin-top: 10px;
  width: 200px;
}
</style>
