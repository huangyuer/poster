<template>
	<div>

		<div class="panel-main-content">
			<!--筛选栏组-->
			<div class="search-card contents-card card-margin">
				<div class="panel panel-default">
					<div class="card-title zero-padding"><span class="weight">查询列表</span></div>
					<ep-form ref="searchForm" :form="searchForm" name-width="136px">
						<ep-row :gutter="7">
              <!-- <ep-col :col="6">
								<ep-form-item label="账户编号" attr="emsNo">
									<ep-input v-model="searchForm.emsNo" name="emsNo" ></ep-input>
								</ep-form-item>
							</ep-col>
							<ep-col :col="6">
								<ep-form-item label="预录入编号" attr="etpsPreentNo">
									<ep-input v-model="searchForm.etpsPreentNo" name="etpsPreentNo" ></ep-input>
								</ep-form-item>
							</ep-col>

							
							
							<ep-col :col="6">
								<ep-form-item label="变更次数" attr="chgTmsCnt">
									<ep-input v-model="searchForm.chgTmsCnt" name="chgTmsCnt" ></ep-input>
								</ep-form-item>
							</ep-col> -->
              <ep-col :col="6">
								<ep-form-item label="关区" attr="masterCuscd">
									<!-- <ep-select filterable :label="tradeInfo" v-model="searchForm.masterCuscd" name="masterCuscd">
										<ep-select-item v-for="(item, index) in tradeInfo" :key="index" :index="item.customCode" :label="item.customName+' '+item.customCode"></ep-select-item>
									</ep-select> -->
                  <loc-codemap-select
                        :name="'masterCuscd'"
                        :code="'customCode'"
                        :cName="'customName'"
                        :dataList="tradeInfo"
                        :type="'custom'"
                        :value.sync="searchForm.masterCuscd">
                      </loc-codemap-select>
								</ep-form-item>
							</ep-col>
							<!-- <ep-col :col="6">
								<ep-form-item label="单证状态" attr="optStatus">
									<ep-select v-model="searchForm.optStatus" name="optStatus">
										<ep-select-item :index="item.value" v-for="(item,k) in optionStatusList" :key="k" :label="item.label"></ep-select-item>
									</ep-select>
								</ep-form-item>
							</ep-col> -->

						</ep-row>
						<ep-row :gutter="7">
							<ep-col :col="24">
								<ep-button type="warning" size="small" icon="refresh" @click="reset('searchForm')">重置</ep-button>
								<ep-button type="primary" size="small" @click="refresh(true)" icon="search" :loading="loading">查询</ep-button>
							</ep-col>
						</ep-row>
					</ep-form>
				</div>
			</div>
			<!--表格-->
			<div class="ep-card card-margin relative">
				<div class="card-body">
					<!-- <div class="block">
						<ep-button type="primary" size="small" @click="doUpdate" icon="edit">修改</ep-button>
						<ep-button type="danger" size="small" @click="doDelete" icon="trash-a">删除</ep-button>
						<ep-button type="primary" size="small" icon="checkmark-round" :loading="applyLoading" @click="doDeclare">申报</ep-button>
            <file-upload :uploadData="uploadData"/>
            <ep-button type="success" size="small"  icon="android-download" @click="exportFile" >Excel导出</ep-button>
         
						<span style="color:red;font-size:25px;position:absolute;padding-top:8px;padding-left:3px;">*</span>
						<span style="padding-top: 10px;padding-left: 13px;position: absolute;font-size: 4px;color: rgba(0,0,0,.87);">双击列表信息，可进入详情页面</span>
					</div> -->

					<div class="block">
						<ep-table ref="table" :height="400" :data="ep_data" :head-color="headColor" @selection-change="handleSelectionChange" :loading="loading" @row-dblclick="detailInfo">
							<ep-table-item type="select"></ep-table-item>
							<!-- <ep-table-item column="emsNo" title="账户编号" width="200"></ep-table-item>
              <ep-table-item column="etpsPreentNo" title="预录入编号" width="200"></ep-table-item>
              	<ep-table-item column="optStatus" title="单证状态" :formatter="typeFormatter"></ep-table-item>
							<ep-table-item column="chgTmsCnt" title="变更次数"></ep-table-item> -->
						  <!-- <ep-table-item column="customName" title="关区" width="150"></ep-table-item>
              <ep-table-item column="dclTypecd" title="申报类型" :formatter="dclTypecdChange"></ep-table-item> -->
              <ep-table-item column="bizopEtpsNm" title="经营企业名称" width="200"></ep-table-item>
              <ep-table-item column="bizopEtpsno" title="经营企业编号" width="160"></ep-table-item>
              <ep-table-item column="bizopEtpsSccd" title="经营企业社会信用代码" width="200"></ep-table-item>
              <!-- <ep-table-item column="seqNo" title="预录入统一编号" width="200"></ep-table-item> -->
							<ep-table-item column="rvsngdEtpsSccd" title="收发货企业社会信用代码" width="200"></ep-table-item>
							<ep-table-item column="rcvgdEtpsno" title="收货企业编号" width="160"></ep-table-item>
							<ep-table-item column="rcvgdEtpsNm" title="收货企业名称" width="200"></ep-table-item>
							<!-- <ep-table-item column="dclEtpsSccd" title="申报企业社会信用代码" width="200"></ep-table-item>
							<ep-table-item column="dclEtpsNo" title="申报企业编号" width="160"></ep-table-item>
							<ep-table-item column="dclEtpsNm" title="申报企业名称" width="200"></ep-table-item> -->
							<ep-table-item column="dclEtpsTypecd" title="申报企业类型" width="160" :formatter="dclEtpsTypecdChange"></ep-table-item>
							<ep-table-item column="emsTypecd" title="账户类型" :formatter="emsTypecdChange"></ep-table-item>
							<ep-table-item column="finishValidDate" title="结束有效日期" width="160"></ep-table-item>
							<ep-table-item column="apcretNo" title="批准证编号"></ep-table-item>
							<ep-table-item column="netwkEtpsArcrpNo" title="联网企业档案库编号" width="200"></ep-table-item>
							<ep-table-item column="maxTovrAmt" title="最大周转金额" width="160"></ep-table-item>
							<ep-table-item column="dclTime" title="申报时间" width="200"></ep-table-item>
							<ep-table-item column="ucnsDclSegcd" title="单耗申报环节" width="160" :formatter="ucnsDclSegcdChange"></ep-table-item>
							<ep-table-item column="dclMarkcd" title="申报标记" :formatter="dclMarkcdChange"></ep-table-item>
							<ep-table-item column="emapvStucd" title="审批状态" :formatter="emapvStucdChange"></ep-table-item>
							<ep-table-item column="pauseImpexpMarkcd" title="暂停进出口标记" width="160" :formatter="pauseImpexpMarkcdChange"></ep-table-item>
							<ep-table-item column="pauseChgMarkcd" title="暂停变更标记" width="160" :formatter="pauseChgMarkcdChange"></ep-table-item>
							<ep-table-item column="putrecApprTime" title="备案批准时间" width="160"></ep-table-item>
							<ep-table-item column="chgApprTime" title="变更批准时间" width="200"></ep-table-item>
							<ep-table-item column="rcntVclrTime" title="最近核销时间" width="200"></ep-table-item>
							<ep-table-item column="vclrApplyTime" title="核销申请时间" width="200"></ep-table-item>
							<ep-table-item column="vclrPridVal" title="核销周期值(天)"></ep-table-item>
							<ep-table-item column="adjaccMarkcd" title="核算标记"></ep-table-item>
							<ep-table-item column="adjaccTmsCnt" title="核算次数"></ep-table-item>
							<ep-table-item column="ucnsVernoCntrFlag" title="单耗版本号控制标志" width="200"></ep-table-item>
							<ep-table-item column="rcasemarkcd" title="涉案标记" :formatter="rcaseMarkcdChange"></ep-table-item>
							<ep-table-item column="etpsPosesSadjaQuaFlag" title="企业具备自核资格标志" width="200" :formatter="etpsPosesSadjaQuaFlagChange"></ep-table-item>
							<ep-table-item column="maxApprImpAmt" title="最大进口金额（美元)" width="200"></ep-table-item>
              <ep-table-item column="actlImpTotalAmt" v-if="this.$store.getters.getOrgType==4"  title="实际进口总金额" width="200"></ep-table-item>
              <ep-table-item column="actlExpTotalAmt" v-if="this.$store.getters.getOrgType==4" title="实际出口总金额" width="200"></ep-table-item>
							<ep-table-item column="vclrTypecd" title="核销类型" :formatter="vclrTypecdChange"></ep-table-item>
							<ep-table-item column="rmk" title="备注" width="350">
								<template slot-scope="props">
									<p class="rmk-style">{{props.row.rmk}}</p>
								</template>
							</ep-table-item>
						</ep-table>
					</div>
					<div class="block">
						<ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
					</div>
        <ep-model title="选择导出方式" v-model="exportStyle" width="500px">
              <ep-radio class="radio" v-model="optType" label="1">按票导出</ep-radio>
              <ep-radio class="radio" v-model="optType" label="2">按表导出</ep-radio>

						<div class="block"  style="text-align:right;margin-top:30px;">
              <ep-button  type="danger"  @click="cancelBtn">取消</ep-button>
              <ep-button  style="margin-left:20px;" type="primary" @click="applyBtn">确定</ep-button>
							
						</div>
				</ep-model>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import misList from "src/common/mislist";
import fileUpload from 'src/components/FileUpload'
import mixin from "./mixin"
export default {
  name: "processingBooksInfo", // 保持和文件名一致，否则keep-alive不会动态缓存
  extends: misList, // 务必继承
  mixins:[mixin],
  components: {
    fileUpload
  },
  created() {
    let customList = this.$store.getters.getCustomList;
    this.tradeInfo = customList;
  },

  mounted() {},
  computed:{

  },
  watch:{
    exportStyle(e){
      if(!e){
        this.optType = "1"
      }
    }
  },
  methods: {
    exportFile(){
      this.exportStyle =true
    },
    applyBtn(){
     
      let selectData = this.$refs.table.getData("select")
      if(selectData.length>0){
        // 判断是否存在不能导出的单子
        let optArray = []
        selectData.forEach((e,index)=>{
          if(e.optStatus==99){
              optArray.push(e.optStatus)
          }else{
          
          }
        })
        if(optArray.length>0){
          return this.$pop({
                  type: "danger",
                  message: "删除状态的单证不能导出!"
                });
        }
        let ids = []
        selectData.forEach((e,index)=>{
            ids.push(e.id)
        })
      let data = {busFlag:"ems",userName:this.$store.getters.getUserName,optType:this.optType,paramType:"1",param:ids,userId:this.$store.getters.getUserId,orgId:this.$store.getters.getOrgId}
      this.$post("exportFile",data).then(res=>{
        console.log(res)
         this.exportStyle = false
         
      })
      }else{
        this.refresh(true)
        
        setTimeout(()=>{
          if(this.totalcount>100){
            return this.$pop({
                    type: "danger",
                    message: "导出数据不能大于100条"
                  });
          }
          if(this.totalcount==0){
						 return this.$pop({
                    type: "danger",
                    message: "导出内容不能为空"
                  });
          }
          if(this.searchForm.optStatus==99){
                  return this.$pop({
                    type: "danger",
                    message: "删除状态的单证不能导出!"
                  });
            
          }else{
           let data = {busFlag:"ems",paramType:"2",userName:this.$store.getters.getUserName,optType:this.optType,param:this.searchForm,userId:this.$store.getters.getUserId,orgId:this.$store.getters.getOrgId}
          this.$post("exportFile",data).then(res=>{
            console.log(res)
            this.exportStyle = false
          
            })
          }
          
        },0)
        
        
      }
     
      
    },
    cancelBtn(){
      this.exportStyle = false
    },

    customChange(e) {
      console.log(e);
      this.searchForm.masterCuscd = e;
    },
    dclEtpsTypecdChange(row, index) {
      if (row.dclEtpsTypecd == "1") {
        return "企业";
      } else if (row.dclEtpsTypecd == "2") {
        return "代理公司";
      } else if (row.dclEtpsTypecd == "3") {
        return "报关行";
      }
    },
    emsTypecdChange(row, index) {
      if (row.emsTypecd == "1") {
        return "E账户";
      } else if (row.emsTypecd == "2") {
        return "H账户";
      } else if (row.emsTypecd == "3") {
        return "耗料";
      } else if (row.emsTypecd == "4") {
        return "工单";
      } else if (row.emsTypecd == "5") {
        return "企业为单元";
      }
    },
    dclTypecdChange(row, index) {
      if (row.dclTypecd == "1") {
        return "备案申请";
      } else if (row.dclTypecd == "2") {
        return "变更申请";
      } else if (row.dclTypecd == "3") {
        return "注销申请";
      }
    },
    ucnsDclSegcdChange(row, index) {
      if (row.ucnsDclSegcd == "1") {
        return "出口前";
      } else if (row.ucnsDclSegcd == "2") {
        return "报核前";
      }
    },
    dclMarkcdChange(row, index) {
      if (row.dclMarkcd == "1") {
        return "电子口岸申报";
      } else if (row.dclMarkcd == "2") {
        return "地方平台申报";
      } else if (row.dclMarkcd == "3") {
        return "其它申报";
      }
    },
    emapvStucdChange(row, index) {
      if (row.emapvStucd == "1") {
        return "通过";
      } else if (row.emapvStucd == "2") {
        return "转人工";
      } else if (row.emapvStucd == "3") {
        return "退单";
      }
    },
    pauseImpexpMarkcdChange(row, index) {
      if (row.pauseImpexpMarkcd == "1") {
        return "未暂停";
      } else if (row.pauseImpexpMarkcd == "2") {
        return "恢复执行";
      } else if (row.pauseImpexpMarkcd == "3") {
        return "暂停进出口";
      } else if (row.pauseImpexpMarkcd == "4") {
        return "暂停进口";
      } else if (row.pauseImpexpMarkcd == "5") {
        return "暂停出口";
      } else if (row.pauseImpexpMarkcd == "6") {
        return "全部暂停";
      }
    },
    pauseChgMarkcdChange(row, index) {
      if (row.pauseChgMarkcd == "0") {
        return "未开始执行";
      } else if (row.pauseChgMarkcd == "1") {
        return "正常执行";
      } else if (row.pauseChgMarkcd == "2") {
        return "恢复执行";
      } else if (row.pauseChgMarkcd == "3") {
        return "暂停变更";
      } else if (row.pauseChgMarkcd == "9") {
        return "已注销";
      }
    },
    rcaseMarkcdChange(row, index) {
      if (row.rcasemarkcd == "0") {
        return "正常";
      } else if (row.rcasemarkcd == "1") {
        return "已移交未立案";
      } else if (row.rcasemarkcd == "2") {
        return "已立案未结案";
      } else if (row.rcasemarkcd == "3") {
        return "案件已办结";
      } else if (row.rcasemarkcd == "4") {
        return "不予立案";
      } else if (row.rcasemarkcd == "5") {
        return "已经撤案";
      }
    },
    etpsPosesSadjaQuaFlagChange(row, index) {
      if (row.etpsPosesSadjaQuaFlag == "0") {
        return "不具备";
      } else if (row.etpsPosesSadjaQuaFlag == "1") {
        return "具备";
      }
    },
    vclrTypecdChange(row, index) {
      if (row.vclrTypecd == "1") {
        return "单耗";
      } else if (row.vclrTypecd == "2") {
        return "耗料";
      } else if (row.vclrTypecd == "3") {
        return "工单";
      }
    },

    handleRemoteCall(val, oldVal, callback) {
      console.log(val);
      setTimeout(() => {
        if (val === "") {
          this.$post("queryCustom", { page: 1, size: 1000 })
            .then(res => {
              this.tradeInfo = res.map.data.content;
            })
            .catch(e => {
              console.log(e);
            });
          callback.done();
        } else if (val.length == 4) {
          this.$post("queryCustom", {
            page: 1,
            size: 1000,
            customCode: parseInt(val)
          })
            .then(res => {
              this.tradeInfo = res.map.data.content;
            })
            .catch(e => {
              console.log(e);
            });
          callback.done();
        } else {
          callback.done();
        }
      }, 0);
    },
    dofresh() {
      let data = { page: 1, size: 1000 };
      this.$post("queryCustom", data)
        .then(res => {
          this.tradeInfo = res.map.data.content;
        })
        .catch(e => {
          console.log(e);
        });
    },
    searchCallback(json) {
      // 搜索成功回调，做特殊处理在此
      let res = json.map.data.content;
      let table_data = [];
      res.forEach(function(item, index) {
        res[index]["link"] = res[index].id;
      });
    },

    typeFormatter(row, index) {
      for(let i =0;i<this.optionStatusList.length;i++){
        if(row.optStatus == this.optionStatusList[i].value){
          return this.optionStatusList[i].label
        }
      }
    },
    getDetil2Info(val) {
      let data = {};
      data["id"] = val;
      this.$post("getStatusInfo", data)
        .then(responseData => {
          this.body2Form = responseData.map.data;
          model2 = !model2;
        })
        .catch(e => {
          this.loading = false;
        });
    },

    getDetil2Info(val) {
      let data = {};
      data["id"] = val;
      this.$post("getStatusInfo", data)
        .then(responseData => {
          this.body2Form = responseData.map.data;
          model2 = !model2;
        })
        .catch(e => {
          this.loading = false;
        });
    },
    doUpdate() {
      let vm = this;
      let selectData = this.selectItems;

      if (selectData.length === 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
      } else if (selectData.length > 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
      } else {
        //删除状态，不能修改

        if (selectData[0].optStatus == "99") {
          this.$pop({
            type: "danger",
            message: "删除状态单证，不能修改"
          });
          return;
        }
        if (selectData[0].optStatus == "18") {
          this.$pop({
            type: "danger",
            message: "已申报状态单证，不能修改"
          });
          return;
        }
        if (selectData[0].optStatus == "5") {
          this.$pop({
            type: "danger",
            message: "审核通过状态单证，不能修改"
          });
          return;
        }
        if (selectData[0].optStatus == "7") {
          this.$pop({
            type: "danger",
            message: "数据中心入库成功状态单证，不能修改"
          });
          return;
        }
        this.loading = true;
        let id = selectData[0].id;
        let data = {};
        data["id"] = id;
        this.$post("queryEmsPutrecInfo", data)
          .then(responseData => {
            this.loading = false;
            let formData = responseData.map.data;
            let menusList = this.$store.getters.getMenuTabInstance.items;
            menusList.forEach(function(item, index) {
              if (item.name == "加工账户修改") {
                menusList.splice(index, 1);
              }
            });
            this.$router.push({
              name: "加工账户修改",
              params: { bodyForm: formData }
            });
          })
          .catch(e => {
            this.loading = false;
          });
      }
    },
    doDelete() {
      let selectData = this.selectItems;
      if (selectData.length === 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
        return;
      }
      this.$confirm({
        word: "是否要删除所选条目信息！",
        callback: errorInfo => {
          if (errorInfo) {
            let emsPutrecIds = [];
            selectData.forEach(c => {
              if (c.id) {
                emsPutrecIds.push(c.id);
              }
            });
            let data = {};
            data["emsPutrecIds"] = emsPutrecIds;
            this.$post("deleteEmsputrec", data)
              .then(responseData => {
                this.refresh(true);
                this.$pop({
                  type: "success",
                  message: "删除成功"
                });
              })
              .catch(e => {
                this.loading = false;
              });
          } else {
          }
        }
      });
    },

    doDeclare() {
      let selectData = this.selectItems;
      if(selectData.length != 1){
      		this.$pop({
      					type: 'danger',
      					message: '请选择一条数据'
      				})
      			return
      		}
      if(selectData[0].optStatus !="1"){
        this.$pop({
          type: "danger",
          message: "存在不能申报的账户"
        });
        return;
      }
      let emsPutrecIds = [];
      selectData.forEach(c => {
        if (c.id) {
          emsPutrecIds.push(c.id);
        }
      });
      let data = {};
      data["declare"] = emsPutrecIds;
      data["userId"] = this.$store.getters.getUserId;
      this.$confirm({
          word: "是否要确认申报？",
          callback: errorInfo => {
            if (errorInfo) {
              this.applyLoading = true
                 this.$post("declareEmsputrec", data)
                    .then(responseData => {
                      this.applyLoading = false
                      this.refresh(true);
                    })
                    .catch(e => {
                      this.applyLoading = false
                      this.loading = false;
                    });
            }
            }
            }
            )
    


    },
    detailInfo(event, row, index) {
      this.$app.trigger("locate-tab", "accountBookDetilInfo", row.id);
    }
  },

  data() {
    return {
      counter: 0,
      tradeInfo: [],
      model1: false,
      loading: false,
      applyLoading:false,
      optType:"1",
      fileUploadLoading: false,
      listApi: "queryBookno", // 搜索，取api.json里面的key值
      deleteData: "enterpriseDelete",
      settings: {
        pk: "id" // 主键
      },
      searchForm: {
        // 筛选条件
        emsNo: "",
        masterCuscd:"",
        optStatus:"",
        etpsPreentNo:"",
        chgTmsCnt:""
      },
      exportStyle:false,
      headColor: true,
      headForm: {
        orgId: "",
        emsNo: "",
        chgTmsCnt: "",
        etpsPreentNo: "",
        masterCuscd: "",

        bizopEtpsSccd: "",
        bizopEtpsno: "",
        bizopEtpsNm: "",
        rvsngdEtpsSccd: "",
        rcvgdEtpsNo: "",
        rcvgdEtpsNm: "",
        dclEtpsSccd: "",
        email: "",
        dclEtpsNo: "",
        dclEtpsNm: "",
        dclEtpsTypecd: "",
        emsTypecd: "",
        dclTypecd: "",
        finishValidDate: "",
        ApcretNo: "",
        netwkEtpsArcrpNo: "",
        maxTovrAmt: "",
        dclTime: "",
        ucnsDclSegcd: "",

        dclMarkcd: "",
        emapvStucd: "",
        dclMarkcd: "",
        pauseChgMarkcd: "",
        putrecApprTime: "",
        chgApprTime: "",
        rcntVclrTime: "",
        vclrApplyTime: "",
        vclrPridVal: "",
        adjaccMarkcd: "",

        adjaccTmsCnt: "",
        ucnsVernoCntrFlag: "",
        rcaseMarkcd: "",
        etpsPosesSadjaQuaFlag: "",
        rmk: "",
        maxApprImpAmt: "",
        vclrTypecd: ""
      },

      bodyForm: {
        id: "",
        tradeId: "",
        orgId: "",
        emsNo: "",
        chgTmsCnt: "",
        etpsPreentNo: "",
        masterCuscd: "",
        bizopEtpsSccd: "",
        bizopEtpsno: "",
        bizopEtpsNm: "",
        rvsngdEtpsSccd: "",
        rcvgdEtpsno: "",
        rcvgdEtpsNm: "",
        dclEtpsSccd: "",
        dclEtpsNo: "",
        dclEtpsNm: "",
        dclEtpsTypecd: "",
        emsTypecd: "",
        dclTypecd: "",
        finishValidDate: "",
        apcredNo: "",
        netwkEtpsArcrpNo: "",
        maxTovrAmt: "",
        dclTime: "",
        ucnsDclSegcd: "",
        dclMarkcd: "",
        emapvStucd: "",
        pauseImpexpMarkcd: "",
        pauseChgMarkcd: "",
        putrecApprTime: "",
        chgApprTime: "",
        rcntVclrTime: "",
        vclrApplyTime: "",
        vclrPridVal: "",
        adjaccMarkcd: "1",
        adjaccTmsCnt: "",
        ucnsVernoCntrFlag: "",
        rcasemarkcd: "",
        etpsPosesSadjaQuaFlag: "",
        rmk: "",
        maxApprImpAmt: "",
        vclrTypecd: "",
        col1: "",
        col2: "",
        col3: "",
        col4: "",
        emsPutrecDt: [],
        emsPutrecUcnsDt: [],
        emsPutrecAcmpFormDt: []
      },

      body1Form: {
        pid: "",
        orgId: "",
        emsNo: "",
        chgTmsCnt: "",
        gdsSeqNo: "",

        gdsMtno: "",
        mtpckEndprdTypecd: "",
        gdecd: "",
        gdsNm: "",
        endprdGdsSpcfModelDesc: "",
        dclUnitcd: "",
        lawfUnitcd: "",
        secdLawfUnitcd: "",
        dclUprcAmt: "",
        dclCurrcd: "",
        dclQty: "",
        lvyrlfModecd: "",
        qtyCntrMarkcd: "",
        adjmtrMarkcd: "",
        modfMarkcd: "",
        etpsExeMarkcd: "",
        cusmExeMarkcd: "",
        apprMaxSurpQty: "",
        vclrPridInitQty: "",

        ucnsTqsnFlag: "",
        csttnFlag: "",
        dclMarkcd: "",
        csttnFlag: "",
        rmk: "",
        invtNo: "",
        invtGNo: ""
      },
      body2Form: {
        pid: "",
        orgId: "",
        emsNo: "",
        chgTmsCnt: "",

        endprdSeqno: "",
        mtpckSeqno: "",
        ucnsVerno: "",
        ucnsQty: "",
        netUseupQty: "",
        tgblLossRate: "",
        intgbLossRate: "",
        ucnsDclStucd: "",

        modfMarkcd: "",
        bondMtpckPrpr: "",
        etpsExeMarkcd: "",
        dclTime: "",
        rmk: ""
      },
      uploadData: {
        businessType: "ems",
      },

      selectLength: 0,
      selectItems: [],
      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1,
        userId: this.$store.getters.getUserId
      },
      ep_data: [] //表格数据
    };
  }
};
</script>
