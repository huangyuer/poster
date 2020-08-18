<template>
	<div>

		<div class="panel-main-content">
			<!--筛选栏组-->
			<div class="search-card contents-card card-margin">
				<div class="panel panel-default">
					<div class="card-title zero-padding"><span class="weight">查询列表</span></div>
					<ep-form ref="searchForm" :form="searchForm" name-width="120px">
						<ep-row :gutter="7">
							<!-- <ep-col :col="6">
								<ep-form-item label="账户编号" attr="bwsNo">
									<ep-input v-model="searchForm.bwsNo" name="bwsNo" :maxlength="30"></ep-input>
								</ep-form-item>
							</ep-col>
              	<ep-col :col="6">
								<ep-form-item label="预录入编号" attr="etpsPreentNo">
									<ep-input v-model="searchForm.etpsPreentNo" name="etpsPreentNo" :maxlength="30"></ep-input>
								</ep-form-item>
							</ep-col>
							<ep-col :col="6">
								<ep-form-item label="变更次数" attr="chgTmsCnt">
									<ep-input v-model="searchForm.chgTmsCnt" name="chgTmsCnt" :maxlength="30"></ep-input>
								</ep-form-item>
							</ep-col> -->
							<!-- <ep-col :col="6">
								<ep-form-item label="区域场所类别" attr="bwlTypecd">
									<ep-select v-model="searchForm.bwlTypecd" name="bwlTypecd" type="string">
										<ep-select-item index="A" label="保税物流中心A"></ep-select-item>
										<ep-select-item index="B" label="保税物流中心B"></ep-select-item>
										<ep-select-item index="D" label="公共保税仓库"></ep-select-item>
										<ep-select-item index="E" label="液体保税仓库"></ep-select-item>
										<ep-select-item index="F" label="寄售维修保税仓库"></ep-select-item>
										<ep-select-item index="G" label="暂为空"></ep-select-item>
										<ep-select-item index="H" label="特殊商品保税仓库"></ep-select-item>
										<ep-select-item index="I" label="备料保税仓库"></ep-select-item>
										<ep-select-item index="P" label="出口配送监管仓"></ep-select-item>
										<ep-select-item index="J" label="为国内结转监管仓"></ep-select-item>
										<ep-select-item index="K" label="保税区"></ep-select-item>
										<ep-select-item index="L" label="出口加工区"></ep-select-item>
										<ep-select-item index="M" label="保税物流园区"></ep-select-item>
										<ep-select-item index="N" label="保税港区"></ep-select-item>
										<ep-select-item index="Z" label="综合保税区"></ep-select-item>
										<ep-select-item index="Q" label="跨境工业园区"></ep-select-item>
                    <ep-select-item v-show="this.$store.getters.getOrgType=='5'" index="1" label="1:非保货物"></ep-select-item>
									</ep-select>
								</ep-form-item>
							</ep-col> -->
							<ep-col :col="6">
								<ep-form-item label="仓库编号" attr="houseNo">
									<ep-input v-model="searchForm.houseNo" name="houseNo" :maxlength="30"></ep-input>
								</ep-form-item>
							</ep-col>
							<ep-col :col="6">
								<ep-form-item label="仓库名称" attr="houseNm">
									<ep-input v-model="searchForm.houseNm" name="houseNm" :maxlength="30"></ep-input>
								</ep-form-item>
							</ep-col>
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
										<ep-select-item :index="1" label="暂存"></ep-select-item>
										<ep-select-item :index="18" label="已申报"></ep-select-item>
										<ep-select-item :index="3" label="海关入库"></ep-select-item>
										<ep-select-item :index="4" label="海关入库失败"></ep-select-item>
										<ep-select-item :index="5" label="审核通过"></ep-select-item>
										<ep-select-item :index="17" label="转人工"></ep-select-item>
										<ep-select-item :index="6" label="审核拒绝"></ep-select-item>
										<ep-select-item :index="99" label="删除"></ep-select-item>
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
            <ep-button type="primary" size="small" icon="arrow-swap"  @click="doChangeBook">变更</ep-button>
            
						<ep-button type="success"  size="small" @click="importExcel" icon="android-upload" :loading="fileUploadLoading">变更Excel导入</ep-button>
            <ep-button type="success" size="small"  icon="android-download" @click="exportFile" >Excel导出</ep-button>
						<input ref="fileUpload" type="file" id="file_id" name="test" @change="fileUploadFunc" style="display: none" />
						<span style="color:red;font-size:25px;position:absolute;padding-top:8px;padding-left:3px;">*</span>
						<span style="padding-top: 10px;padding-left: 13px;position: absolute;font-size: 4px;color: rgba(0,0,0,.87);">双击列表信息，可进入详情页面</span>
					</div> -->

					<div class="block">
						<ep-table ref="table" :height="400" :data="ep_data" :head-color="headColor" @selection-change="handleSelectionChange" :loading="loading" @row-dblclick="detailInfo">
							<ep-table-item type="select"></ep-table-item>

							<!-- <ep-table-item column="bwsNo" title="账户编号" width="200"></ep-table-item> -->
              <!-- <ep-table-item column="etpsPreentNo" title="预录入编号" width="200"></ep-table-item>
              <ep-table-item column="optStatus" title="单证状态" :formatter="typeFormatter"></ep-table-item>
							<ep-table-item column="chgTmsCnt" title="变更次数"></ep-table-item>
              <ep-table-item column="customName" title="关区" width="150"></ep-table-item>
							<ep-table-item column="dclTypecd" title="申报类型" :formatter="dclTypecdChange"></ep-table-item> -->
              <ep-table-item column="bizopEtpsno" title="经营企业编号" width="160"></ep-table-item>
							<ep-table-item column="bizopEtpsNm" title="经营企业名称" width="200"></ep-table-item>
							<ep-table-item column="bizopEtpsSccd" title="经营企业社会信用代码" width="200"></ep-table-item>
							<ep-table-item column="bwlTypecd" title="区域场所类别" width="160" :formatter="bwlTypecdChange"></ep-table-item>
							<ep-table-item column="houseNo" title="仓库编号" width="180"></ep-table-item>
							<ep-table-item column="houseNm" title="仓库名称" width="200"></ep-table-item>
							<ep-table-item column="dclEtpsNo" title="申报企业编号" width="160"></ep-table-item>
							<ep-table-item column="dclEtpsNm" title="申报企业名称" width="200"></ep-table-item>
							<ep-table-item column="dclEtpsSccd" title="申报企业社会信用代码" width="200"></ep-table-item>
							<ep-table-item column="dclEtpsTypecd" title="申报企业类型代码" width="160" :formatter="dclEtpsTypecdChange"></ep-table-item>
							<ep-table-item column="contactEr" title="联系人"></ep-table-item>
							<ep-table-item column="contactTele" title="联系电话" width="180"></ep-table-item>
							<ep-table-item column="houseTypecd" title="企业类型" width="180" :formatter="houseTypecdChange"></ep-table-item>
							<ep-table-item column="houseArea" title="仓库面积(平方米)" width="180"></ep-table-item>
							<ep-table-item column="houseVolume" title="仓库容积(立方米)" width="180"></ep-table-item>
							<ep-table-item column="houseAddress" title="仓库地址" width="200"></ep-table-item>
							<ep-table-item column="dclTime" title="申报时间" width="180"></ep-table-item>
							<ep-table-item column="inputDate" title="录入日期"></ep-table-item>
							<ep-table-item column="taxTypecd" title="退税标志" :formatter="taxTypecdChange"></ep-table-item>
							<ep-table-item column="putrecApprTime" title="备案批准时间" width="180"></ep-table-item>
							<ep-table-item column="chgApprTime" title="变更批准时间" width="180"></ep-table-item>
							<ep-table-item column="finishValidDate" title="结束有效日期" width="160"></ep-table-item>
							<ep-table-item column="pauseChgMarkcd" title="暂停变更标记" width="160" :formatter="pauseChgMarkcdChange"></ep-table-item>
							<ep-table-item column="emapvStucd" title="审核状态" :formatter="emapvStucdChange"></ep-table-item>
							<ep-table-item column="dclMarkcd" title="申报标志" width="160" :formatter="dclMarkcdChange"></ep-table-item>
							<ep-table-item column="appendTypecd" title="记账模式" :formatter="appendTypecdChange"></ep-table-item>
							<ep-table-item column="ownerSystem" title="所属系统" :formatter="ownerSystemChange"></ep-table-item>
							<ep-table-item column="usageTypecd" title="账户用途" :formatter="usageTypecdChange"></ep-table-item>
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

export default {
  name: "logisticsBookInfo", // 保持和文件名一致，否则keep-alive不会动态缓存

  extends: misList, // 务必继承

  created() {
    let customList = this.$store.getters.getCustomList;
    this.tradeInfo = customList;
    this.refresh(true);
    // this.dofresh();
  },

  mounted() {},
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
      let data = {busFlag:"bws",userName:this.$store.getters.getUserName,optType:this.optType,paramType:"1",param:ids,userId:this.$store.getters.getUserId,orgId:this.$store.getters.getOrgId}
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
             let data = {busFlag:"bws",paramType:"2",userName:this.$store.getters.getUserName,optType:this.optType,param:this.searchForm,userId:this.$store.getters.getUserId,orgId:this.$store.getters.getOrgId}
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
    importExcel(){
      let selectData = this.$refs.table.getData("select")
      if(selectData.length!=1){
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
        return;
      }
      this.$refs.fileUpload.click()
    },
    // 导入表
    fileUploadFunc(evt) {
      let selectData = this.$refs.table.getData("select")
      if(selectData.length!=1){
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
        return;
      }
      this.fileUploadLoading = true;
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      this.$post(
        "importBws",
        { file: evt.target.files[0], etpsPreentNo: selectData[0].etpsPreentNo},
        config
      )
        .then(res => {
          document.getElementById("file_id").value = "";
          this.refresh(true);
          this.fileUploadLoading = false;
        })
        .catch(e => {
          document.getElementById("file_id").value = "";
          this.fileUploadLoading = false;
          console.log(e);
        });
    },
    dclTypecdChange(row, index) {
      if (row.dclTypecd == "1") {
        return "备案申请";
      } else if (row.dclTypecd == "2") {
        return "变更申请";
      } else if (row.dclTypecd == "3") {
        return "海关修改";
      }
    },
    usageTypecdChange(row, index) {
      if (row.usageTypecd == "1") {
        return "跨境电商";
      }
    },
    bwlTypecdChange(row, index) {
      if (row.bwlTypecd == "A") {
        return "保税物流中心A";
      } else if (row.bwlTypecd == "B") {
        return "保税物流中心B";
      } else if (row.bwlTypecd == "D") {
        return "公共保税仓库";
      } else if (row.bwlTypecd == "E") {
        return "液体保税仓库";
      } else if (row.bwlTypecd == "F") {
        return "寄售维修保税仓库";
      } else if (row.bwlTypecd == "G") {
        return "暂为空";
      } else if (row.bwlTypecd == "H") {
        return "特殊商品保税仓库";
      } else if (row.bwlTypecd == "I") {
        return "备料保税仓库";
      } else if (row.bwlTypecd == "P") {
        return "出口配送监管仓";
      } else if (row.bwlTypecd == "J") {
        return "为国内结转监管仓";
      } else if (row.bwlTypecd == "K") {
        return "保税区";
      } else if (row.bwlTypecd == "L") {
        return "出口加工区";
      } else if (row.bwlTypecd == "M") {
        return "保税物流园区";
      } else if (row.bwlTypecd == "N") {
        return "保税港区";
      } else if (row.bwlTypecd == "Z") {
        return "综合保税区";
      } else if (row.bwlTypecd == "Q") {
        return "跨境工业园区";
      } else if (row.bwlTypecd == "S") {
        return "特殊区域设备账户";
      }else if (row.bwlTypecd == "1") {
        return "非保货物";
      }
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
    taxTypecdChange(row, index) {
      if (row.taxTypecd == "Y") {
        return "Y-是";
      } else if (row.taxTypecd == "N") {
        return "N-否";
      }
    },
    pauseChgMarkcdChange(row, index) {
      if (row.pauseChgMarkcd == "0") {
        return "未开始执行";
      } else if (row.pauseChgMarkcd == "1") {
        return "正常执行";
      } else if (row.pauseChgMarkcd == "2") {
        return "暂停";
      } else if (row.pauseChgMarkcd == "3") {
        return "注销";
      }
    },
    emapvStucdChange(row, index) {
      if (row.emapvStucd == "0") {
        return "已申报";
      } else if (row.emapvStucd == "1") {
        return "通过";
      } else if (row.emapvStucd == "2") {
        return "转岗";
      } else if (row.emapvStucd == "3") {
        return "退单";
      } else if (row.emapvStucd == "4") {
        return "强行通过";
      } else if (row.emapvStucd == "5") {
        return "预录入";
      }
    },
    dclMarkcdChange(row, index) {
      if (row.dclMarkcd == "1") {
        return "电子口岸申报";
      } else if (row.dclMarkcd == "2") {
        return "EDI申报";
      } else if (row.dclMarkcd == "3") {
        return "内网预录入申报";
      } else if (row.dclMarkcd == "4") {
        return "其它申报";
      }
    },
    appendTypecdChange(row, index) {
      if (row.appendTypecd == "1") {
        return "可累计";
      } else if (row.appendTypecd == "2") {
        return "不累计";
      }
    },
    houseTypecdChange(row, index) {
      if (row.houseTypecd == "A") {
        return "保税物流中心A";
      } else if (row.houseTypecd == "B") {
        return "保税物流中心B";
      } else if (row.houseTypecd == "D") {
        return "公共保税仓库";
      } else if (row.houseTypecd == "E") {
        return "液体保税仓库";
      } else if (row.houseTypecd == "F") {
        return "寄售维修保税仓库";
      } else if (row.houseTypecd == "G") {
        return "暂为空";
      } else if (row.houseTypecd == "H") {
        return "特殊商品保税仓库";
      } else if (row.houseTypecd == "I") {
        return "备料保税仓库";
      } else if (row.houseTypecd == "P") {
        return "出口配送监管仓";
      } else if (row.houseTypecd == "J") {
        return "为国内结转监管仓";
      } else if (row.houseTypecd == "K") {
        return "保税区";
      } else if (row.houseTypecd == "L") {
        return "出口加工区";
      } else if (row.houseTypecd == "M") {
        return "保税物流园区";
      } else if (row.houseTypecd == "N") {
        return "保税港区";
      } else if (row.houseTypecd == "Z") {
        return "综合保税区";
      } else if (row.houseTypecd == "Q") {
        return "跨境工业园区";
      } else if (row.houseTypecd == "S") {
        return "特殊区域设备账户";
      }
    },
    ownerSystemChange(row, index) {
      if (row.ownerSystem == "1") {
        return "特殊区域";
      } else if (row.ownerSystem == "2") {
        return "保税物流";
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
      // let data = {page:1,size:1000}
      // this.$post('queryCustom',data)
      // .then((res) =>{
      // 		this.tradeInfo = res.map.data.content
      // }).catch(e =>{
      // console.log(e)
      // })
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
      if (row.optStatus == "1") {
        return "暂存";
      } else if (row.optStatus == "18") {
        return "已申报";
      } else if (row.optStatus == "3") {
        return "海关入库";
      } else if (row.optStatus == "4") {
        return "海关入库失败";
      } else if (row.optStatus == "5") {
        return "审核通过";
      } else if (row.optStatus == "17") {
        return "转人工";
      } else if (row.optStatus == "6") {
        return "审核拒绝";
      } else if (row.optStatus == "99") {
        return "删除";
      } else {
        return "未知";
      }
    },

    getDetilInfo(val) {
      let data = {};
      data["id"] = val;
      this.$post("queryEmsPutrecInfo", data)
        .then(responseData => {
          let formData = responseData.map.data;
          this.$router.push({
            name: "bookNoDetilInfo",
            params: { bodyForm: formData }
          });
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
    doDelete() {
      let selectData = this.selectItems;
      if (selectData.length == 0) {
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
            let bwsBscIds = [];
            selectData.forEach(c => {
              if (c.id) {
                bwsBscIds.push(c.id);
              }
            });
            let data = {};
            data["bwsBscIds"] = bwsBscIds;
            this.$post("deleteLogistics", data)
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
      if (selectData.length != 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
        return;
      }
      if(selectData[0].optStatus !="1"){
        this.$pop({
          type: "danger",
          message: "存在不能申报的账户"
        });
        return;
      }
      
      let bscIds = [];
      selectData.forEach(c => {
        bscIds.push(c.id);
      });
      let data = {};
      data["declare"] = bscIds;
      data["userId"] = this.$store.getters.getUserId;
       this.$confirm({
          word: "是否要确认申报？",
          callback: errorInfo => {
            if (errorInfo) {
              this.applyLoading = true
                this.$post("declareLogistics", data)
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
    doChangeBook(){
        let selectData = this.$refs.table.getData("select")
        if (selectData.length === 0) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        });
        return
      }
      if (selectData.length > 1) {
        this.$pop({
          type: "danger",
          message: "请选择一条数据"
        })
         return
      }
      if(selectData[0].optStatus != "5"){
        this.$pop({
          type: "danger",
          message: "当前状态不可以进行变更操作"
        })
         return
      }
        let menusList = this.$store.getters.getMenuTabInstance.items;
        menusList.forEach((item, index)=> {
          if (item.name == "物流账户变更") {
            menusList.splice(index, 1);
          }
        });
        this.$router.push({
          name: "物流账户变更",
          params: { etpsPreentNo: selectData[0].etpsPreentNo}
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
        if (selectData[0].optStatus == "99") {
          this.$pop({
            type: "danger",
            message: "删除状态单证，不能修改"
          });
          return;
        } else if (selectData[0].optStatus == "18") {
          this.$pop({
            type: "danger",
            message: "已申报状态单证，不能修改"
          });
          return;
        } else if (selectData[0].optStatus == "5") {
          this.$pop({
            type: "danger",
            message: "审核通过状态单证，不能修改"
          });
          return;
        }
        this.loading = true;
        let id = selectData[0].id;
        let data = {};
        data["id"] = id;
        this.$post("getLogisticsById", data)
          .then(responseData => {
            this.loading = false;
            let formData = responseData.map.data;
            let menusList = this.$store.getters.getMenuTabInstance.items;
            menusList.forEach(function(item, index) {
              if (item.name == "物流账户修改") {
                menusList.splice(index, 1);
              }
            });
            this.$router.push({
              name: "物流账户修改",
              params: { bodyForm: formData }
            });
          })
          .catch(e => {
            this.loading = false;
          });
      }
    },
    detailInfo(event, row, index) {
      this.$app.trigger("locate-tab", "logisticsBookDtInfo", row.id);
    }
  },
  data() {
    return {
      counter: 0,
      tradeInfo: [],
      fileUploadLoading: false,
      exportStyle:false,
      optType:"1",
      loading: false,
      applyLoading:false,
      listApi: "queryLogisticsBookInfo", // 搜索，取api.json里面的key值
      deleteData: "enterpriseDelete",
      settings: {
        pk: "id" // 主键
      },
      searchForm: {
        // 筛选条件
        optStatus:"",
        emsNo: "",
        bwlTypecd:"",
        masterCuscd:"",
        chgTmsCnt:"",
        houseNo:"",
        etpsPreentNo:"",
        houseNm:""
      },
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
