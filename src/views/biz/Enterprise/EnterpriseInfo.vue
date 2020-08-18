<template>
  <div>
    <div class="panel-main-content">
      <!--筛选栏组-->
      <div class="search-card contents-card card-margin">
        <div class="panel panel-default">
          <div class="card-title zero-padding"><span class="weight">菜单列表</span></div>
          <ep-form ref="searchForm" :form="searchForm" name-width="130px">
            <ep-row :gutter="7">

              <ep-col :col="6">
                <ep-form-item label="企业中文名称" attr="tradeName">
                  <ep-input v-model="searchForm.tradeName" name="tradeName" :maxlength="20"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="6">
                <ep-form-item label="企业组织机构编码" attr="orgNo">
                  <ep-input v-model="searchForm.orgNo" name="orgNo" :maxlength="9"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="6">
                <ep-form-item label="社会信用代码" attr="creditCode">

                  <ep-input v-model="searchForm.creditCode" name="creditCode" :maxlength="20"></ep-input>
                </ep-form-item>
              </ep-col>

              <ep-col :col="6">
                <ep-form-item label="状态" attr="status">
                  <ep-select v-model="searchForm.status" name="status">
                    <ep-select-item index="1" label="暂存"></ep-select-item>
                    <ep-select-item index="18" label="已申报"></ep-select-item>
                    <ep-select-item index="3" label="海关入库"></ep-select-item>
                    <ep-select-item index="4" label="海关入库失败"></ep-select-item>
                    <ep-select-item index="5" label="审核通过"></ep-select-item>
                    <ep-select-item index="17" label="转人工"></ep-select-item>
                    <ep-select-item index="6" label="审核拒绝"></ep-select-item>
                    <ep-select-item index="99" label="删除"></ep-select-item>
                  </ep-select>

                </ep-form-item>
              </ep-col>

            </ep-row>

            <ep-row :gutter="7">
              <ep-col :col="24">
                <!-- <ep-button type="warning" size="small" icon="refresh" @click="reset('searchForm')">重置</ep-button>
                <ep-button type="primary" size="small" @click="refresh(true)" icon="search" :loading="loading">查询</ep-button> -->
                <WmsButton @click="reset('searchForm')">重置</WmsButton>
                <WmsButton  @click="refresh(true)" icon="search" :loading="loading">查询</WmsButton>
              </ep-col>
            </ep-row>
          </ep-form>
        </div>
         <div class="wms-dividing-line"></div>
      <!--表格-->
     
        <div class="card-body">
          <div class="block" >
                <!-- <ep-button type="primary" size="small" @click="doUpdate" v-if="flag" icon="edit">修改</ep-button> -->
                <!-- <ep-button type="primary" @click="doDeclare" icon="checkmark-round" size="small" v-if="flag" >申报</ep-button> -->
                <!-- <ep-button type="primary" size="small" icon="arrow-swap"  v-if="flag" @click="doChangeEnt">变更</ep-button> -->
                <!-- <ep-button type="primary" size="small" @click="tradeinfoMsg">企业详情</ep-button> -->
                <!-- <ep-button  type="primary" size="small" @click="statusFlagBtn">操作记录</ep-button> -->
                <span style="color:red;font-size:25px;position:absolute;padding-top:8px;padding-left:3px;">*</span>
						<span style="padding-top: 10px;padding-left: 13px;position: absolute;font-size: 4px;color: rgba(0,0,0,.87);">只有审核通过的企业，才能进行业务操作！</span>
          </div>
          <div class="block">
            <ep-table ref="table" border :height="400" :data="ep_data" :head-color="headColor" @selection-change="handleSelectionChange" :loading="loading">
              <ep-table-item column="opt" title="操作" width="200"  v-if="flag">
              <template slot-scope="props">
                <wms-icon type="edit" @click="doUpdate(props.row,props.row.id)"></wms-icon>
                <wms-icon type="confirm" title="申报" @click="doDeclare(props.row,props.row.id)"></wms-icon>
                 <wms-icon type="detail" @click="tradeinfoMsg(props.row,props.row.id)"></wms-icon>
              </template>
            </ep-table-item>
              <ep-table-item column="tradeCode" title="海关编码"></ep-table-item>
              <ep-table-item column="tradeName" title="企业中文名称" width="200"></ep-table-item>
               <ep-table-item column="dclTypecd" title="申报类型"  width="200" :formatter="dclTypecdFormatter"></ep-table-item>
              <ep-table-item column="customName" title="关区"></ep-table-item>
              <ep-table-item column="orgNo" title="企业组织机构编码"></ep-table-item>
              <ep-table-item column="creditCode" title="社会信用代码"></ep-table-item>
              <ep-table-item column="status" title="状态" :formatter="statusFormatter"></ep-table-item>
              <!-- <ep-table-item column="link" title="企业信息详情">
                <template slot-scope="props">
                  <ep-button type="primary" size="mini" v-on:click="getDetilInfo(props.row.link)">企业详情</ep-button>
                </template>
              </ep-table-item> -->

            </ep-table>
          </div>
          <div class="block">
            <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>

            <ep-model title="企业信息详情" v-model="model3" width="1200px" :wrap-close="wrap_flag">
              <ep-form name-width="130px">
                <ep-row :gutter="7">
                  <ep-col :col="8">
                    <ep-form-item label="海关编码" attr="tradeCode" required>
                      <ep-input v-model="resultForm.tradeCode" name="tradeCode" :maxlength="30" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="中文名称" attr="tradeName" required>
                      <ep-input v-model="resultForm.tradeName" name="tradeName" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                  <ep-form-item label="申报类型" attr="dclTypecd" >
                   <ep-select v-model="resultForm.dclTypecd" disabled name="dclTypecd">
                      <ep-select-item index="1" label="备案"></ep-select-item>
                      <ep-select-item index="2" label="变更"></ep-select-item>
                    </ep-select>
                  </ep-form-item>
                </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="组织机构编码" attr="orgNo" required>
                      <ep-input v-model="resultForm.orgNo" name="orgNo" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="社会信用代码" attr="creditCode" required>
                      <ep-input v-model="resultForm.creditCode" name="creditCode" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                   <ep-col :col="8">
                  <ep-form-item label="EDI代码" attr="ediCode" >
                    <ep-input v-model="resultForm.ediCode" name="ediCode" :readonly="true" :maxlength="50"></ep-input>
                  </ep-form-item>
                </ep-col>
                </ep-row>
                <ep-row :gutter="7">
                  <ep-col :col="8">
                    <ep-form-item label="注册关区编码" attr="customCode" required>
                      <ep-input v-model="resultForm.customCode" name="customCode" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>

                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="注册关区名称" attr="customName" required>
                      <ep-input v-model="resultForm.customName" name="customName" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>

                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="英文名称" attr="tradeNameEn">
                      <ep-input v-model="resultForm.tradeE.tradeNameEn" name="tradeNameEn" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="企业地址" attr="address" required>
                      <ep-input v-model="resultForm.tradeE.address" name="address" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="邮编" attr="zip">
                      <ep-input v-model="resultForm.tradeE.zip" name="zip" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="法人代表" attr="corporation" required>
                      <ep-input v-model="resultForm.tradeE.corporation" name="corporation" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="负责人" attr="manager" required>
                      <ep-input v-model="resultForm.tradeE.manager" name="manager" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="负责人电话" attr="tel" required>
                      <ep-input v-model="resultForm.tradeE.tel" name="tel" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="负责人传真" attr="fax">
                      <ep-input v-model="resultForm.tradeE.fax" name="fax" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="负责人Email" attr="email">
                      <ep-input v-model="resultForm.tradeE.email" name="email" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="企业性质" attr="tradeType" required>
                      <ep-input v-model="resultForm.tradeE.tradeType" name="tradeType" :maxlength="20" :readonly="true"></ep-input>

                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="投资国别" attr="country" >
                      <!-- <ep-select disabled :label="countrys" v-model="resultForm.tradeE.country" name="country" >
                        <ep-select-item v-for="(item, index) in countrys" :key="index"
                        :index="item.countryCode" :label="item.nameCn"></ep-select-item>
                      </ep-select> -->
                      <loc-codemap-select
                    :name="'country'"
                    :code="'countryCode'"
                    :cName="'nameCn'"
                    disabled
                    :dataList="countrys"
                    :value.sync="resultForm.tradeE.country">
                     </loc-codemap-select>
                      <!-- <ep-input placeholder="国别代码" v-model="resultForm.tradeE.country" name="country" :readonly="true"></ep-input> -->

                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="注册资金" attr="registeredCapital" required>
                      <ep-input v-model="resultForm.tradeE.registeredCapital" name="registeredCapital" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="工商注册开始日期" title="工商注册开始日期" attr="busiRegBeginDate" required>
                      <ep-input v-model="resultForm.tradeE.busiRegBeginDate" name="busiRegBeginDate" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="工商注册结束日期"  title="工商注册结束日期" attr="busiRegEndDate" required>
                      <ep-input v-model="resultForm.tradeE.busiRegEndDate" name="busiRegEndDate" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="租赁合同开始日期" attr="leaseContractBeginDate">
                      <ep-input v-model="resultForm.tradeE.leaseContractBeginDate" name="leaseContractBeginDate" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="租赁合同结束日期" attr="leaseContractEndDate">
                      <ep-input v-model="resultForm.tradeE.leaseContractEndDate" name="leaseContractEndDate" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="租赁方" attr="lessor">
                      <ep-input v-model="resultForm.tradeE.lessor" name="lessor" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="海关注册开始日期" title="海关注册开始日期" attr="cusRegBeginDate" required>
                      <ep-input v-model="resultForm.tradeE.cusRegBeginDate" name="cusRegBeginDate" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="海关注册结束日期" title="海关注册结束日期" attr="cusRegEndDate" required>
                      <ep-input v-model="resultForm.tradeE.cusRegEndDate" name="cusRegEndDate" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="经营范围" attr="business" required>
                      <ep-input v-model="resultForm.tradeE.business" name="business" :maxlength="1000" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="16">
                    <ep-form-item label="备注" attr="remark">
                      <ep-input v-model="resultForm.tradeE.remark" name="remark" type="textarea" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                </ep-row>
                <ep-row>

                </ep-row>

              </ep-form>
            </ep-model>
            <statusinfo :fresh="statusFlag" :searchStatusId="searchStatusId" @nowFlagChange="statusFlag=false"></statusinfo>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import misList from "src/common/mislist";
import statusinfo from "./components/statusInfo.vue"

export default {
  name: "enterpriseInfo", // 保持和文件名一致，否则keep-alive不会动态缓存
  extends: misList, // 务必继承
  components:{
      statusinfo
    },
  created() {
    // this.refresh(true); 
     let customList = this.$store.getters.getCustomList;
    this.tradeInfo = customList;
    //国家
    let countryList = this.$store.getters.getCountryList;
    this.countrys = countryList;
  },

  mounted() {
    //关区
   

    if (this.$store.getters.getType != "2") {
      this.flag = true;
    }
   
  },

  methods: {
     statusFlagBtn(){
        let selectData = this.$refs.table.getData("select")
          if(selectData.length!=1){
          this.$pop({
              type: "danger",
              message: "请选择一条数据！"
            });
            return
        }
        this.searchStatusId = selectData[0].id
        this.statusFlag = true
      },
    dclTypecdFormatter(row,index){
        if(row.dclTypecd=="1"){
          return "备案"
        }
         if(row.dclTypecd=="2"){
          return "变更"
        }
      },
    doChangeEnt(){
         let selectData = this.$refs.table.getData("select")
          if(selectData.length!=1){
          this.$pop({
              type: "danger",
              message: "请选择一条数据！"
            });
            return
        }
        if(selectData[0].status!=5){
          this.$pop({
              type: "danger",
              message: "当前状态不允许变更！"
            });
            return
        }
        this.$confirm({
          word: "是否要进行企业信息变更？",
          callback: errorInfo => {
            if (errorInfo) {
								let menusList = this.$store.getters.getMenuTabInstance.items;
								menusList.forEach((item, index)=>{
									if (item.name == "企业信息变更") {
										menusList.splice(index, 1);
									}
								});
								this.$router.push({
									name: "企业信息变更",
									params: { id: selectData[0].id}
								});
						}}})
    },
    tradeinfoMsg(row,nowid){
    //   let selectData = this.$refs.table.getData("select")
    //   if(selectData.length!=1){
    //    this.$pop({
    //       type: "danger",
    //       message: "请选择一条数据"
    //     });
    //     return
    //  }
     this.getDetilInfo(row.link)
    //   console.log(selectData)
    },
    searchCallback(json) {
      // 搜索成功回调，做特殊处理在此
      let res = json.map.data.content;
      let table_data = [];
      res.forEach(function(item, index) {
        res[index]["link"] = res[index].id;
      });
    },
    statusFormatter(row, index) {
      if (row.status == "1") {
        return "暂存";
      } else if (row.status == "18") {
        return "已申报";
      } else if (row.status == "3") {
        return "海关入库";
      } else if (row.status == "4") {
        return "海关入库失败";
      } else if (row.status == "5") {
        return "审核通过";
      } else if (row.status == "17") {
        return "转人工";
      } else if (row.status == "6") {
        return "审核拒绝";
      } else if (row.status == "99") {
        return "删除";
      } else {
        return "未知";
      }
    },

    getDetilInfo(val) {
      let data = {};
      data["id"] = val;
      this.$post("getTradeById", data)
        .then(responseData => {
          if (responseData.map.data.tradeE == null) {
            responseData.map.data.tradeE = {};
          }
          let result = responseData.map.data;
          this.resultForm = result;
          this.model3 = !this.model3;
          if (this.resultForm.tradeE.tradeType == "1") {
            this.resultForm.tradeE.tradeType = "国有企业";
          } else if (this.resultForm.tradeE.tradeType == "2") {
            this.resultForm.tradeE.tradeType = "三资企业";
          } else if (this.resultForm.tradeE.tradeType == "3") {
            this.resultForm.tradeE.tradeType = "集体企业";
          } else if (this.resultForm.tradeE.tradeType == "4") {
            this.resultForm.tradeE.tradeType = "私营企业";
          }
        })
        .catch(e => {
          this.loading = false;
        });
    },

    getStatusInfo(val) {
      let data = {};
      data["id"] = val;
      this.$post("getStatusInfo", data)
        .then(responseData => {})
        .catch(e => {
          this.loading = false;
        });
    },
    doUpdate(row,nowid) {
      let vm = this;
      let data = row;
    //   if (data.length === 0) {
    //     this.$pop({
    //       type: "danger",
    //       message: "请选择一条数据"
    //     });
    //     return
    //   }
      
    //   if (data.length > 1) {
    //     this.$pop({
    //       type: "danger",
    //       message: "请选择一条数据"
    //     });
    //       return
    //   }
       if (data.status=="17"||data.status=="18"||data.status=="3"||data.status=="5"||data.status=="99") {
        this.$pop({
          type: "danger",
          message: "当前状态不允许修改！"
        });
          return
      }
        this.loading = true;
        let id = {};
        id["id"] = data.id;
        this.$post("getTradeById", id)
          .then(responseData => {
            this.loading = false;
            let formData = responseData.map.data;
            let menusList = this.$store.getters.getMenuTabInstance.items;
            menusList.forEach(function(item, index) {
              if (item.name == "企业信息修改") {
                menusList.splice(index, 1);
              }
            });
            this.$router.push({
              name: "企业信息修改",
              params: { form: formData ,flag: true}
            });
          })
          .catch(e => {
            this.loading = false;
          });


           
      
    },
    doDeclare(row,nowid) {
      let vm = this;
      let data = row
    //   if (data.length === 0) {
    //     this.$pop({
    //       type: "danger",
    //       message: "请选择一条数据"
    //     });
    //     return;
    //   } 
    //   if (data.length > 1) {
    //     this.$pop({
    //       type: "danger",
    //       message: "请选择一条数据"
    //     });
    //     return;
    //   } 
      if (data.status!=1) {
        this.$pop({
          type: "danger",
          message: "当前状态不允许申报！"
        });
        return;
      }
      let id = {};
      id["id"] = data.id;
      
      this.$confirm({
        word: '是否要确认申报？',
        callback (info) {
          if (info) {
            vm.loading = true;
            vm.$post("declareTrade", id)
              .then(responseData => {
                vm.loading = false;
                vm.refresh(true);
              })
              .catch(e => {
                vm.refresh(true);
                vm.loading = false;
              });
          } 
        }
      })
        
      
    }
  },
  data() {
    return {
      wrap_flag: false,
   
      counter: 0,
      flag: false,
      tradeInfo: [],
      countrys: [],
      model3: false,
      loading: false,
      searchStatusId:"",
      statusFlag:false,
      listApi: "orgGetTradeByPage", // 搜索，取api.json里面的key值
      deleteData: "enterpriseDelete",
      settings: {
        pk: "id" // 主键
      },
      searchForm: {
        status:"",
        // 筛选条件
        tradeCode: this.$store.getters.getTradeCode
      },
      headColor: true,
      form: {
        tradeCode: "",
        tradeName: "",
        customId: "",
        orgNo: "",
        creditCode: "",
        tradeE: {
          tradeNameEn: "",
          address: "",
          zip: "",
          corporation: "",
          manager: "",
          tel: "",
          fax: "",
          email: "",
          tradeType: "",
          registeredCapital: "",
          busiRegBeginDate: "",
          busiRegEndDate: "",
          leaseContractBeginDate: "",
          leaseContractEndDate: "",
          lessor: "",
          cusRegBeginDate: "",
          cusRegEndDate: "",
          business: "",
          remark: ""
        }
      },
      resultForm: {
        tradeCode: "",
        tradeName: "",
        customId: "",
        orgNo: "",
        creditCode: "",
        tradeE: {
          tradeNameEn: "",
          address: "",
          zip: "",
          corporation: "",
          manager: "",
          tel: "",
          fax: "",
          email: "",
          tradeType: "",
          registeredCapital: "",
          busiRegBeginDate: "",
          busiRegEndDate: "",
          leaseContractBeginDate: "",
          leaseContractEndDate: "",
          lessor: "",
          cusRegBeginDate: "",
          cusRegEndDate: "",
          business: "",
          remark: ""
        }
      },
      selectLength: 0,
      selectItems: [],
      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      ep_data: [] //表格数据
    };
  }
};
</script>
