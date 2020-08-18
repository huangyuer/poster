<template>
  <div>
    <div class="panel-main-content">
      <!--筛选栏组-->
      <div class="search-card contents-card card-margin">
        <div class="panel panel-default">
          <div class="card-title zero-padding"><span class="weight">菜单列表</span></div>
          <ep-form ref="searchForm" :form="searchForm" name-width="90px">
            <ep-row :gutter="7">
              <ep-col :col="6">
                <ep-form-item label="企业编码" attr="tradeCode"   >
                  <ep-input v-model="searchForm.tradeCode" name="tradeCode" :maxlength="30" :readonly="tradeCodeflag"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="6">
                <ep-form-item label="组织编号" attr="orgCode" >
                  <ep-input v-model="searchForm.orgCode" name="orgCode" :maxlength="20"></ep-input>
                </ep-form-item>
              </ep-col>
              <!-- <ep-col :col="6">
                <ep-form-item label="关区" attr="customId">
                  <loc-codemap-select
                    :name="'customId'"
                    :code="'customCode'"
                    :cName="'customName'"
                    :dataList="tradeInfo"
                    :type="'custom'"
                    :value.sync="searchForm.customId">
                     </loc-codemap-select>
                </ep-form-item>
              </ep-col> -->
              <ep-col :col="6">
                <ep-form-item label="状态" attr="status" >
                  <ep-select v-model="searchForm.status" name="status">
                    <ep-select-item index="1" label="暂存"></ep-select-item>
                    <ep-select-item index="18" label="已申报"></ep-select-item>
                    <ep-select-item index="3" label="海关入库"></ep-select-item>
                    <ep-select-item index="4" label="海关入库失败"></ep-select-item>
                    <ep-select-item index="5" label="审核通过"></ep-select-item>
                    <ep-select-item index="17" label="转人工"></ep-select-item>
                    <ep-select-item index="6" label="审核拒绝"></ep-select-item>
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
            <!-- <ep-button type="primary" v-if="flag" size="small" @click="doUpdate" icon="edit">修改</ep-button>
            <ep-button  type="primary" v-if="flag" size="small" icon="checkmark-round" @click="doDeclare">申报</ep-button> -->
            <!-- <ep-button type="primary" size="small" icon="arrow-swap"  v-if="flag" @click="doChangeOrg">变更</ep-button> -->
         
            <!-- <ep-button type="primary" size="small"  @click="booksInfo">账册详情</ep-button> -->
            <!-- <ep-button  type="primary" size="small" @click="orgInfo">组织详情</ep-button>
            <ep-button  type="primary" size="small" @click="statusFlagBtn">操作记录</ep-button> -->
            <span style="color:red;font-size:25px;position:absolute;padding-top:8px;padding-left:3px;">*</span>
						<span style="padding-top: 10px;padding-left: 13px;position: absolute;font-size: 4px;color: rgba(0,0,0,.87);">只有审核通过的组织，才能进行业务操作！</span>
           </div>
          <div class="block">
            <ep-table border ref="table" :height="400" :data="ep_data" :head-color ="headColor"
                      @selection-change="handleSelectionChange" :loading="loading">
              <!-- <ep-table-item type="select"></ep-table-item> -->
               <ep-table-item column="opt" title="操作" width="200" v-if="flag">
                <template slot-scope="props">
                    <wms-icon type="edit" @click="doUpdate(props.row,props.row.id)"></wms-icon>
                  
                    <wms-icon type="confirm"  title="申报"  @click="doDeclare(props.row,props.row.id)"></wms-icon>
                   
                </template>
                </ep-table-item>
              <ep-table-item column="type" title="组织类型" width="200" :formatter="typeFormatter"></ep-table-item>
              <ep-table-item column="orgCode" title="组织编号"></ep-table-item>
              <ep-table-item column="dclTypecd" title="申报类型"  width="200" :formatter="dclTypecdFormatter"></ep-table-item>
              <!-- <ep-table-item column="bookNo" title="账册号"></ep-table-item>
              <ep-table-item column="bwsNo" title="设备账册号"></ep-table-item> -->
              <ep-table-item column="customName" title="关区"></ep-table-item>
              <ep-table-item column="status" title="状态" :formatter="statusFormatter"></ep-table-item>
              <!-- <ep-table-item column="link" title="账册信息">
                <template slot-scope="props">
                  <ep-button type="primary" size="mini" @click="getOrgInfo(props.row)">账册详情</ep-button>
                </template>
              </ep-table-item>
              <ep-table-item column="link" title="组织信息详情">
                <template slot-scope="props">
                  <ep-button type="primary" size="mini" v-on:click="getDetilInfo(props.row.link)">组织详情</ep-button>
                </template>
              </ep-table-item> -->

            </ep-table>
          </div>
          <div class="block">
            <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange"
                      :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>

            <ep-model title="组织信息详情" v-model="model3" :wrap-close="wrap_flag">
              <ep-form  name-width="115px">
                <ep-row :gutter="7">
                   <ep-col :col="8">
                    <ep-form-item label="组织类型" attr="type">
                      <ep-input v-model="resultForm.type" name="type" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="组织编号" attr="orgCode">
                      <ep-input v-model="resultForm.orgCode" name="orgCode" :maxlength="20" :readonly="true"></ep-input>
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
                    <ep-form-item label="状态" attr="status">
                      <ep-input v-model="resultForm.status" name="status" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="注册关区编码" attr="customCode">
                      <ep-input v-model="resultForm.customCode" name="customCode" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="注册关区名称" attr="customName">
                      <ep-input v-model="resultForm.customName" name="customName" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <!-- <ep-col :col="8">
                    <ep-form-item label="账册号" attr="bookNo">
                      <ep-input v-model="resultForm.bookNo" name="bookNo" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col> -->
                  <!-- <ep-col :col="8">
                    <ep-form-item label="设备账册号" attr="bwsNo">
                      <ep-input v-model="resultForm.bwsNo" name="bwsNo" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col> -->
                  <!-- <ep-col :col="8">
                    <ep-form-item label="企业信用代码" attr="creditCode" >
                      <ep-input v-model="resultForm.creditCode" name="creditCode" :maxlength="10" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col> -->
                  <!-- <ep-col :col="8">
                    <ep-form-item label="仓库编号" attr="organizationCode" >
                      <ep-input v-model="resultForm.organizationCode" name="organizationCode" :maxlength="10" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col> -->
                  <!-- <ep-col :col="8">
                    <ep-form-item label="仓库名称" attr="organizationName" >
                      <ep-input v-model="resultForm.organizationName" name="organizationName" :maxlength="150" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col> -->
                  <ep-col :col="8">
                  <ep-form-item label="IC卡号" attr="icCard" >
                    <ep-input v-model="resultForm.icCard" name="icCard" :maxlength="50" :readonly="true" ></ep-input>
                  </ep-form-item>
                </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="地址" attr="address">
                      <ep-input v-model="resultForm.organizationE.address" name="address" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col><ep-col :col="8">
                  <ep-form-item label="邮编" attr="zip">
                    <ep-input v-model="resultForm.organizationE.zip" name="zip" :maxlength="20" :readonly="true"></ep-input>
                  </ep-form-item>
                </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="联系人" attr="person">
                      <ep-input v-model="resultForm.organizationE.person" name="person" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="电话" attr="tel">
                      <ep-input v-model="resultForm.organizationE.tel" name="tel" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="电子邮箱" attr="email">
                      <ep-input v-model="resultForm.organizationE.email" name="email" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="8">
                    <ep-form-item label="仓库面积" attr="area">
                      <ep-input v-model="resultForm.organizationE.area" name="area" :maxlength="20" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                  <ep-col :col="24">
                    <ep-form-item label="备注" attr="remark">
                      <ep-input v-model="resultForm.organizationE.remark" name="remark"  type="textarea" :readonly="true"></ep-input>
                    </ep-form-item>
                  </ep-col>
                </ep-row>
                <ep-row>
                </ep-row>
              </ep-form>
            </ep-model>
            <!-- 账册 -->
            <ep-model title="账册信息" v-model="model5" :wrap-close="false" width="1000px"> 
               <div class="card-body">
                  <div class="panel panel-default">
                        <div class="card-title zero-padding"><span class="weight">查询条件</span></div>
                        <ep-form ref="searchInForm" :form="searchInForm" name-width="158px">
                          <ep-row :gutter="7">
                            <ep-col :col="8">
                              <ep-form-item label="账册编号" attr="accountNo" >
                                <ep-input v-model="searchInForm.accountNo" name="accountNo"></ep-input>
                              </ep-form-item>
                            </ep-col>
                            <ep-col :col="8">
                              <ep-form-item label="账册类型" attr="accountType" >
                                <ep-select v-model="searchInForm.accountType" name="accountType">
                                    <ep-select-item index="1" label="加工账册"></ep-select-item>
                                    <ep-select-item index="2" label="物流账册"></ep-select-item>
                                    <ep-select-item index="3" label="设备账册"></ep-select-item>
                                </ep-select>
                              </ep-form-item>
                            </ep-col>
                            <ep-col :col="8">
                              <ep-button type="primary" size="small" @click="searchInFormButton($event)" icon="search">查询</ep-button>
                            </ep-col>
                          </ep-row>
                        </ep-form>
                      </div>
                     
                      <div class="block">
                        <ep-table ref="table5" :height="400" :data="table5Data" :head-color ="true"  :loading="loading">
                          <!-- <ep-table-item type="select"></ep-table-item> -->
                          <ep-table-item column="accountNo" title="账册编号" ></ep-table-item>
                          <ep-table-item column="accountType" title="账册类型" :formatter="accountTypeChange" ></ep-table-item>
                          
                         
                        </ep-table>
                      </div>
                      <div class="block">
                        <ep-pager right @size-change="handleSizeChange2" @change="handleCurrentChange2"  :now-page="ep_page2.page" :page-size="ep_page2.size" :total-num="totalcount2"></ep-pager>
                      </div>
                </div>
            </ep-model>
            <statusinfo :fresh="statusFlag" :searchStatusId="searchStatusId" @nowFlagChange="statusFlag=false"></statusinfo>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import misList from 'src/common/mislist'
  import statusinfo from "./components/statusInfo.vue"
  export default {
    name: 'organizationInfo',  // 保持和文件名一致，否则keep-alive不会动态缓存
    extends: misList,  // 务必继承
    components:{
      statusinfo
    },
    created () {
      // this.refresh(true)  
      let customList = this.$store.getters.getCustomList;
      this.tradeInfo = customList;
    },
    watch:{
      model5(e){
        if(!e){
        this.$refs.searchInForm.reset()
      }
      }
    },
    mounted () {
      //关区
      
      

      if(this.$store.getters.getType != '2'){
        this.flag=true;
      }
      if(this.$store.getters.getType == '1'||this.$store.getters.getType=="2"){
        this.tradeCodeflag = true;
      }else{
        this.tradeCodeflag = false;
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
      doChangeOrg(){
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
          word: "是否要进行组织信息变更？",
          callback: errorInfo => {
            if (errorInfo) {
								let menusList = this.$store.getters.getMenuTabInstance.items;
								menusList.forEach((item, index)=>{
									if (item.name == "组织信息变更") {
										menusList.splice(index, 1);
									}
								});
								this.$router.push({
									name: "组织信息变更",
									params: { id: selectData[0].id}
								});
						}}})
      },
      booksInfo(){
         let selectData = this.$refs.table.getData("select")
          if(selectData.length!=1){
          this.$pop({
              type: "danger",
              message: "请选择一条数据"
            });
            return
        }
        this.getOrgInfo(selectData[0])
      },
      orgInfo(){
         let selectData = this.$refs.table.getData("select")
          if(selectData.length!=1){
          this.$pop({
              type: "danger",
              message: "请选择一条数据"
            });
            return
        }
        this.getDetilInfo(selectData[0].link)
      },
      searchInFormButton(e){
          // console.log(this.searchCallback())
          let data = {accountNo:this.searchInForm.accountNo,accountType:this.searchInForm.accountType,orgId:this.orgInfoId,size:this.ep_page2.size,page:this.ep_page2.page}
              if(data.accountNo==""){
                delete data.accountNo
              }
              if(data.accountType==""){
                delete data.accountType
              }
              console.log(data)
             this.$post("getOrgIdByAccountBook",data)
          .then(res=>{
            this.table5Data = res.map.data.content;
            this.totalcount2 = res.map.data.totalElements
          })
          .catch(e => {
              this.loading = false;
            });
        },
        getOrgInfo(row){
          this.orgInfoId = row.id
          this.model5 = true
          this.findAllSQ(this.orgInfoId)
        },
        handleSizeChange2(val) {
          console.log("改变大小")
          this.ep_page2.size = val;
          this.findAllSQ(this.orgInfoId)
        },
        handleCurrentChange2(page) {
          this.ep_page2.page = page;
          this.findAllSQ(this.orgInfoId)
        },
        findAllSQ(id){
          let data = {orgId:id,size:this.ep_page2.size,page:this.ep_page2.page}
          for(let i in this.searchInForm){
            if(this.searchInForm[i]!=""){
              data[i] = this.searchInForm[i]
            }
          }
          this.$post("getOrgIdByAccountBook",data)
          .then(res=>{
            this.table5Data = res.map.data.content;
            this.totalcount2 = res.map.data.totalElements
          })
          .catch(e => {
              this.loading = false;
            });
        },
      accountTypeChange(row,index){
        if(row.accountType == "1"){
          return "加工账册"
        }
        if(row.accountType == "2"){
          return "物流账册"
        }
        if(row.accountType == "3"){
          return "设备账册"
        }
      },
      typeFormatter (row, index) {
        if(row.type=='1'){
          return "区内加工";
        }else if(row.type=='2'){
          return "区内仓储";
        }else if(row.type=='3'){
          return "区外仓储";
        }else if(row.type=='4'){
          return "区外加工";
        }else if(row.type=='9'){
          return "代理";
        }else if(row.type=='5'){
          return "非保进出";
        }else if(row.type=='10'){
          return "车队代理";
        }else if(row.type=='11'){
          return "超级代理";
        }else if(row.type=='12'){
          return "供应商";
        }
      },
      statusFormatter (row, index) {

        if (row.status == '1') {
          return '暂存'
        } else if (row.status == '18') {
          return '已申报'
        } else if(row.status == '3'){
          return '海关入库'
        }else if(row.status == '4'){
          return '海关入库失败'
        }else if(row.status == '5'){
          return '审核通过'
        }else if(row.status == '17'){
          return '转人工'
        }else if(row.status == '6'){
          return '审核拒绝'
        }else {
          return '未知'
        }
      },
      
      searchCallback (json) {
        // 搜索成功回调，做特殊处理在此
        let res = json.map.data.content
        let table_data = []
        res.forEach(function(item,index){
          res[index]['link'] = res[index].id

        })

      },
      getDetilInfo (val) {
        this.loading = true
        let data = {}
        data['id'] = val
        this.$post('getOrganizationById', data).then((responseData) => {
          this.loading = false
          if(responseData.map.data.organizationE == null){
            responseData.map.data.organizationE = {}
          }
          this.resultForm = responseData.map.data
          this.model3 = !this.model3
          if(this.resultForm.status=="1"){
            this.resultForm.status="暂存"
          }else if(this.resultForm.status=="2"){
            this.resultForm.status="提交生效"
          }else if(this.resultForm.status=="3"){
            this.resultForm.status="海关入库"
          }else if(this.resultForm.status=="4"){
            this.resultForm.status="海关入库失败"
          }else if(this.resultForm.status=="5"){
            this.resultForm.status="审核通过"
          }else if(this.resultForm.status=="6"){
            this.resultForm.status="审核拒绝"
          }else if(this.resultForm.status=="99"){
            this.resultForm.status="删除"
          }else if(this.resultForm.status=="97"){
            this.resultForm.status="撤回"
          }else if(this.resultForm.status=="98"){
            this.resultForm.status="解绑"
          }else if(this.resultForm.status=="96"){
            this.resultForm.status="作废"
          }else if(this.resultForm.status=="18"){
            this.resultForm.status="已申报"
          }else if(this.resultForm.status=="19"){
            this.resultForm.status="初审通过"
          }else if(this.resultForm.status=="23"){
            this.resultForm.status="已确认"
          }else if(this.resultForm.status=="24"){
            this.resultForm.status="结案"
          }else if(this.resultForm.status=="17"){
            this.resultForm.status="转人工"
          }
          if(this.resultForm.type=="1"){
            this.resultForm.type="区内加工"
          }else if(this.resultForm.type=="2"){
            this.resultForm.type="区内仓储"
          }else if(this.resultForm.type=="3"){
            this.resultForm.type="区外仓储"
          }else if(this.resultForm.type=="4"){
            this.resultForm.type="区外加工"
          }else if(this.resultForm.type=='9'){
          this.resultForm.type="代理"
        }else if(this.resultForm.type=='10'){
          this.resultForm.type="车队代理"
        }else if(this.resultForm.type=='11'){
          this.resultForm.type="超级代理"
        }else if(this.resultForm.type=='12'){
          this.resultForm.type="供应商"
        }



        }).catch (e => {
          this.loading = false
        })
      },
      dclTypecdFormatter(row,index){
        if(row.dclTypecd=="1"){
          return "备案"
        }
         if(row.dclTypecd=="2"){
          return "变更"
        }
      },
      doUpdate (row,nowid) {
        let vm = this
        let data = row
        if(data.type== "10"){
          this.$pop({
            type: 'danger',
            message: '当前组织类型不允许修改！'
          })
            return
        }
        if(data.status=="5"||data.status=="17"||data.status=="18"||data.status=="3"){
          this.$pop({
            type: 'danger',
            message: '当前状态不允许修改！'
          })
          return
        }

          this.loading = true
          let param = {}
          param['id'] = data.id
          this.$post('getOrganizationById', param)
            .then((responseData) => {
              this.loading = false
               let respData = responseData.map.data
            let menusList = this.$store.getters.getMenuTabInstance.items;
            menusList.forEach(function(item, index) {
              if (item.name == "组织信息修改") {
                menusList.splice(index, 1);
              }
            });
            vm.$router.push({name:'组织信息修改',params : {form : respData, flag:true}})
              
            }).catch (e => {
            this.loading = false
          })
        

      },
      doDeclare (row,nowid){
        let vm = this
        let data = row
        if (data.status!=1) {
        this.$pop({
          type: "danger",
          message: "当前状态不允许申报！"
        });
        return;
      }
        let id = {}
        id['id'] = data.id
        this.$confirm({
          word: '是否要确认申报？',
          callback (info) {
            if (info) {
              vm.loading =true
              vm.$post('declareOrg',id).then((responseData) => {
                vm.refresh(false);
              }).catch(e=>{
                vm.loading =false
              })
            } 
          }
      })
          


      }
    },
    data () {
      return {
  
        wrap_flag:false,
        counter : 0,
        flag:false,
        tradeCodeflag:true,
        tradeInfo :[],
        table5Data:[],
        searchStatusId:"",
        statusFlag:false,
        model3: false,
        model5:false,
        loading: false,
        orgInfoId:"",
        listApi: 'orgGetOrgByPage', // 搜索，取api.json里面的key值
        deleteData : 'deleteOrg',
        settings: {
          pk: 'id'    // 主键
        },
        searchForm: {    // 筛选条件
          tradeCode : this.$store.getters.getTradeCode,
          status:"",
          customId:"",
          orgCode:""
        },
        searchInForm:{
          accountNo:"",
          accountType:""
        },
        headColor : true,
        form: {
          id:'',
          tradeId: '',
          type: '',
          orgCode: '',
          status: '',
          bookNo: '',
          customId: '',
          organizationE :{
            creditCode:'',
            address: '',
            orgId: '',
            zip:'',
            organizationCode:'',
            organizationName:'',
            person: '',
            tel: '',
            email: '',
            area: '',
            remark: ''
          }
        },
        resultForm: {
          tradeId: '',
          type: '',
          orgCode: '',
          status: '',
          bookNo: '',
          creditCode:'',
          organizationCode:'',
          organizationName:'',
          icCard:"",
          organizationE :{
            customId: '',
            orgId: '',
            address: '',
            zip:'',
            person: '',
            tel: '',
            email: '',
            area: '',
            registeredCapital: '',
            busiRegBeginDate: '',
            busiRegEndDate: '',
            leaseContractBeginDate: '',
            leaseContractEndDate: '',
            lessor: '',
            cusRegBeginDate: '',
            cusRegEndDate: '',
            business: '',
            remark: ''
          }
        },
        selectLength: 0,
        selectItems :[],
        totalcount: 0,
        ep_page: {    // 分页
          size: 10,
          page: 1
        },
        totalcount2: 0,
        ep_page2: {
          size: 10,
          page: 1
        },
        ep_data: []    //表格数据
      }
    }
  }
</script>
