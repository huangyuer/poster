<template>
  <div class="panel-menu-padding">
    <ep-icon icon="navicon-round" theme="light" @click="changeWidth">
    </ep-icon>
    <ep-model append-to-body title="可代理用户" v-model="model2" :wrap-close="false" width="1250px">
               <div class="card-body">
                 <div class="panel panel-default">
                       <ep-form ref="searchForm" :form="searchInForm" name-width="138px">
                          <ep-row :gutter="7">
                            <ep-col :col="8">
                              <ep-form-item label="委托企业名称" attr="tradeName" >
                                <ep-input v-model="searchInForm.tradeName" name="tradeName" ></ep-input>
                              </ep-form-item>
                            </ep-col>
                            <ep-col :col="6">
                              <ep-form-item label="委托企业组织编码" attr="orgCode" >
                                <ep-input v-model="searchInForm.orgCode" name="orgCode" ></ep-input>
                              </ep-form-item>
                            </ep-col>
                             <ep-col :col="6">
                              <ep-form-item label="账册编号" attr="accountNo" >
                                <ep-input v-model="searchInForm.accountNo" name="accountNo" ></ep-input>
                              </ep-form-item>
                            </ep-col>
                            <ep-col :col="4">
                              <ep-button type="primary" style="vertical-align: text-bottom;" size="small" @click="searchInFormButton" icon="search">查询</ep-button>
                            </ep-col>
                          </ep-row>
                        </ep-form>
                      </div>
                      <div class="block" >
                        <ep-button type="primary" style="text-align:left" size="small" @click="changeOrgUser" >切换</ep-button>
                        <ep-button type="primary" style="text-align:right" size="small" @click="backOriUser" >切换至原用户</ep-button>
                      </div>
                       <div class="block">
                        <ep-table ref="table4" :height="400" :data="table4Data"  :head-color ="true" :loading="loading">
                          <ep-table-item type="select"></ep-table-item>
                          <ep-table-item column="organization" title="组织类型" width="200" >
                            <template slot-scope="props">
                              <span>{{props.row.type|typeFormatterchange}}</span>
                              </template>
                          </ep-table-item>
                          <ep-table-item column="accountNo" title="账册编号" width="180">
                             <template slot-scope="props">
                              <span>{{props.row.accountNo}}</span>
                              </template>
                          </ep-table-item>
                          <ep-table-item column="organization" title="委托企业名称" width="220" >
                             <template slot-scope="props">
                              <span>{{props.row.tradeName}}</span>
                              </template>
                          </ep-table-item>
                          <ep-table-item column="organization" title="委托企业组织编码" width="180">
                             <template slot-scope="props">
                              <span>{{props.row.orgCode}}</span>
                              </template>
                          </ep-table-item>
                          <ep-table-item column="organization" title="关区名称" >
                              <template slot-scope="props">
                              <span>{{props.row.customId | format(customList)}}</span>
                              </template>
                              
                          </ep-table-item>
                          
                        </ep-table>
                      </div>
                      <div class="block out-style-page">
                        <ep-pager class="panel-menu-padding" right @size-change="handleSizeChange1" @change="handleCurrentChange1" :now-page="ep_page1.page" :page-size="ep_page1.size" :total-num="totalcount1" ></ep-pager>
                      </div>
                </div>
            </ep-model>
            <ep-model title="帮助中心" v-model="helpModel" :wrap-close="false" width="850px" >
              <div class="title-help-top">
                <span @click="activeIndex=1" :class="activeIndex==1?'active-help-title':''">操作文档 </span>
                <span @click="activeIndex=2" :class="activeIndex==2?'active-help-title':''">接口文档 </span>
                <span @click="activeIndex=3" :class="activeIndex==3?'active-help-title':''">其他 </span>
              </div>
              <div v-show="activeIndex==1">
                    <div class="one-help-home">
                          <div class="doc-help-container" v-for="(i,k) in opt1" :key="k">
                            <div class="doc-help-list">
                             <span class="doc-help-list-text" @click="entryTitle(i)">{{i.fileName}}</span> 
                            </div>
                            <small class="doc-help-tips"><i class="ion-ios-clock"></i> {{i.uploadTime}} &nbsp;&nbsp; &nbsp;  版本号：{{i.fileVersion}} </small>
                          </div>
                         
                        </div>
              </div>
               <div v-show="activeIndex==2">
                    <div class="one-help-home">
                          <div class="doc-help-container" v-for="(i,k) in opt2" :key="k">
                             <div  class="doc-help-list">
                               <span class="doc-help-list-text" @click="entryTitle(i)">{{i.fileName}}</span> 
                             </div>
                            <small class="doc-help-tips"><i class="ion-ios-clock"></i> {{i.uploadTime}} &nbsp;&nbsp; &nbsp;  版本号：{{i.fileVersion}} </small>
                          </div>
                         
                        </div>
              </div>
               <div v-show="activeIndex==3">
                    <div class="one-help-home">
                          <div class="doc-help-container" v-for="(i,k) in opt3" :key="k">
                             <div  class="doc-help-list">
                               <span class="doc-help-list-text" @click="entryTitle(i)">{{i.fileName}}</span> 
                              </div>
                            <small class="doc-help-tips"><i class="ion-ios-clock"></i> {{i.uploadTime}} &nbsp;&nbsp; &nbsp;  版本号：{{i.fileVersion}} </small>
                          </div>
                         
                        </div>
              </div>
            </ep-model>

    <div class="ep-icon-group panel-menu-right">
      <div class="img-out-style img-style">

        洋山特殊综合保税区企业服务管理系统
        </div>
      <!-- <span class="panel-menu-right-user" v-if="showOrgCode!=''?true:false">{{"代理组织编号:"+showOrgCode}}</span> -->
      <span class="panel-menu-right-user">{{$store.getters.getOrgCode==undefined?"":"组织编号:"+$store.getters.getOrgCode}} 您好，{{ $store.getters.getNickName==undefined?"企业管理员":$store.getters.getNickName }}</span>

      <ep-icon icon="android-settings" theme="light" @click="resetPassword" tooltip-content="修改密码"></ep-icon>
      <ep-icon icon="help-circled" theme="light"  @click="helpCenter" tooltip-content="帮助中心"></ep-icon>
      

      <ep-icon icon="android-upload" theme="light" v-show="this.$store.getters.getType=='2'"  @click="goExport" tooltip-content="Excel导入"></ep-icon>
      <ep-badge :value="totalElements" :max="99">
        <ep-icon  icon="email" theme="light" @click="newsButton"  tooltip-content="消息"></ep-icon>
      </ep-badge>

      <!-- <ep-icon  icon="ios-person" theme="light" v-show="this.$store.getters.getType=='2'" @click="changeAuthor" tooltip-content="代理用户切换"></ep-icon> -->
       <ep-icon icon="power" theme="light"  @click="handleLogout" tooltip-content="登出"></ep-icon>
      <ep-icon icon="tshirt" theme="light" @click="$emit('change-skin')" tooltip-content="换肤"></ep-icon>
     
    </div>
     
    <ep-model :wrap-close="wap_flag" title="修改密码" v-model="resetPassModel" width="480px">
      <ep-form ref="resetPass" :form="resetForm" name-width="90px" :rules="resetPassRule">
        <ep-form-item attr="oldPassword" label="旧密码">
          <ep-input v-model="resetForm.oldPassword" type="password"></ep-input>
        </ep-form-item>
        <ep-form-item attr="newPassword" label="新密码">
          <ep-input v-model="resetForm.newPassword" type="password"></ep-input>
        </ep-form-item>
        <ep-form-item attr="confirmPass" label="确认密码">
          <ep-input v-model="resetForm.confirmPass" type="password"></ep-input>
        </ep-form-item>
      </ep-form>
      <div slot="footer">
        <ep-button type="text" @click="resetPassCancel">取消</ep-button>
        <ep-button type="primary" @click="resetPassConfirm">确定</ep-button>
      </div>
    </ep-model>
   
  </div>
</template>

<script>
import { logout } from "utils";
import misList from "src/common/mislist";
import {asyncAjax} from 'utils'
import { delToken } from 'src/utils/oauth'
import localStorage from 'utils/localStorage'
import store from '../../store'
import asyncReq from "../../base/request"
import { getToken} from 'src/utils/oauth'
const maxInput = 420;
const originInput = 280;

export default {
  name: "frame-menu",
extends: misList,
  data() {
    return {
      showOrgCode:"",
      loading:false,
      helpModel:false,
      totalcount: 0,
      searchInForm:{
        tradeName:"",
        orgCode:"",
        accountNo:""
      },
      ep_page: {
      // 分页
      size: 10,
      page: 1
      },
      table4Data:[],
        totalcount1:0,
        ep_page1:{
          size: 10,
          page: 1
        },
        opt1:[],
        opt2:[],
        opt3:[],
      ep_data: [], //表格数据
      model2:false,
      activeIndex:1,
      wap_flag: false,
      resetPassModel: false,
      widthInput: originInput,
      img1: require("../../assets/logo/bs.png"),
      img2: require("../../assets/logo/ts.png"),
      img3:require("../../assets/logo/jg.png"),
      resetForm: {
        userName: this.$store.getters.getUserName,
        oldPass: "",
        newPassword: "",
        confirmPass: ""
      },
      resetPassRule: {
        oldPass: {
          required: true,
          min: 3,
          max: 50,
          message: "长度在3到50个字符",
          trigger: "blur"
        },
        newPassword: {
          required: true,
          min: 3,
          max: 50,
          message: "长度在3到50个字符",
          trigger: "blur"
        },
        confirmPass: {
          required: true,
          validator: this.validatorPass,
          trigger: "blur, change"
        }
      }
    };
  },
  watch:{
    model2(e){
      if(!e){
        this.searchInForm.tradeName = ""
        this.searchInForm.orgCode = ""
      }
    }
  },
  computed: {
        flags(){
          return this.$store.state.user.loginSource
        },
        customList() {
          return this.$store.getters.getCustomList;
        },
        
        totalElements(){
            return this.$store.state.user.count
        }
  
      },
  filters: {
      typeFormatterchange: value => {
        if (value == "1") {
          return "区内加工";
        } else if (value == "2") {
          return "区内仓储";
        } else if (value == "3") {
          return "区外仓储";
        } else if (value == "4") {
          return "区外加工";
        } else if (value == "9") {
          return "代理";
        }else if (value == "5") {
          return "非保进出";
        }
      },
      format: (value, customList) => {
        for (let i = 0; i < customList.length; i++) {
          if (value == customList[i].customCode) {
            return customList[i].customName;
          }
        }
      }
    },
  mounted() {
    let customList = this.$store.getters.getCustomList;
    this.tradeInfo = customList;
    this.againFindAll()
  },
  methods: {
    entryTitle(row){
       window.location.href=global.HOST+"/tool/help/download?id="+(row.id)+"&token="+getToken()
    },
    goExport() {
      this.$router.push({name:"Excel导入"})
    },
    searchInFormButton(){
       let data = {}
        data['orgId'] = localStorage.getLocalStorage('orgIdOri')
        data['size'] = this.ep_page1.size
        data['page'] = this.ep_page1.page
        data.tradeName = this.searchInForm.tradeName
        data.orgCode = this.searchInForm.orgCode
        data.accountNo = this.searchInForm.accountNo
          this.$post('getOrgGetOrgCsgIn', data).then((res) => {
            this.table4Data = res.map.data.content
            this.totalcount1 = res.map.data.totalElements
          }).catch (e => {
            this.loading = false
          })
    },
    againFindAll(){
      this.$store.dispatch('setuserallcount')
      },
    helpCenter(){
        this.helpModel = true
        this.$post("toolHelpGetList",{page:1,size:100}).then(res=>{
          console.log(res)
          let opt1 = []
          let opt2 = []
          let opt3 = []
          let arrayList = res.map.data.content
          arrayList.forEach((e,index)=>{
              if(e.fileType==0){
                opt1.push(e)
              }
              if(e.fileType==1){
                opt2.push(e)
              }
              if(e.fileType==2){
                opt3.push(e)
              }
          })
          this.opt1 = opt1
          this.opt2 = opt2
          this.opt3 = opt3
        })
        // this.$router.push({name:"帮助中心"})
    },
    newsButton(){
      this.$router.push({name:"消息中心"})
    },
     changerelationStatus(row, index) {
      if (row.relationStatus == "0") {
        return "委托人申请";
      } else if (row.relationStatus == "1") {
        return "代理人接受";
      } else if (row.relationStatus == "2") {
        return "代理人不接受";
      } else if (row.relationStatus == "3") {
        return "委托人解除代理";
      }
    },
    backOriUser(){
        let info = localStorage.getLocalStorage("setOrgInfoOri")
        let infoSecond = localStorage.getLocalStorage('orgIdOri')
        let infoUser =localStorage.getLocalStorage("setUserInfoOri")
        let infoUserTwo =localStorage.getLocalStorage("setUserInfoOri")
        let enterInfo = localStorage.getLocalStorage('setEnterpriseInfoOri')
        store.dispatch('setOrgInfo', info)
        store.dispatch('setOrgId', infoSecond)
        store.dispatch('setEnterpriseInfo', enterInfo)
        store.dispatch("setUserInfo",infoUser)
        localStorage.setLocalStorage('setOrgInfo', info, 15)
        localStorage.setLocalStorage('orgId', infoSecond, 15)
        localStorage.setLocalStorage('setUserInfo', infoUser, 15)
        localStorage.setLocalStorage('setEnterpriseInfo', enterInfo, 15)
        this.model2 = false
        this.showOrgCode = ""
        store.commit("SETLAGENTLIST", []) // 清空组织代理
         let menusList = this.$store.getters.getMenuTabInstance.items;
        menusList.splice(1, menusList.length-1);
            this.$router.push({
            name: "首页"
          });
        // 重置企业
    },
    changeOrgUser(){
      let selectData = this.$refs.table4.getData("select")
      if(selectData.length!=1){
            this.$pop({
              type: "danger",
              message: "请选择一条数据"
            });
            return;
        }
      asyncAjax("queryOrganization",
        {page: 1,
        size: 10,
        tradeCode: this.$refs.table4.getData("select")[0].tradeCode,
        orgCode: this.$refs.table4.getData("select")[0].orgCode},res=>{
          let data = res.map.data.content[0]
          this.showOrgCode = data.orgCode
            let orgInfo = {id: data.id,
                tradeId: data.tradeId,
                inNo: data.inNo,
                bookNo: data.bookNo,
                orgType: data.type,
                customId: data.customId,
                bwsNo: data.bwsNo,
                organizationCode: data.organizationCode,
                organizationName: data.organizationName,
                creditCode: data.creditCode,
                }
          localStorage.setLocalStorage('setOrgInfo', orgInfo, 15)
          store.dispatch('setOrgInfo', orgInfo)
          localStorage.setLocalStorage('orgId', data.id, 15)
          store.dispatch('setOrgId', data.id)
          // 设置id 和 关区号
          let info =localStorage.getLocalStorage("setUserInfo")
          info.customId = data.customId
          info.orgCode = data.orgCode
          info.tradeCode = this.$refs.table4.getData("select")[0].tradeCode
          store.commit("SETTRADECODE",info.tradeCode)
          store.commit("SETORGCODE",info.orgCode)
          store.commit("SETCUSTOMID",info.customId)
          store.commit("SETLAGENTLIST", []) // 清空组织代理
          localStorage.setLocalStorage('setUserInfo', info, 15)
          })
        asyncAjax('queryEnterprise', {
        page: 1,
        size: 10,
        tradeCode: this.$refs.table4.getData("select")[0].tradeCode
      }, res => {
        let data = res.map.data.content[0]
         const enterpriseInfo = {
            tradeName: data.tradeName,
            creditCode: data.creditCode,
            id: data.id
          }
          localStorage.setLocalStorage('setEnterpriseInfo', enterpriseInfo, 15)
          store.dispatch('setEnterpriseInfo', enterpriseInfo)


      })
        this.model2 = false
        let menusList = this.$store.getters.getMenuTabInstance.items;
        menusList.splice(1, menusList.length-1);
            this.$router.push({
            name: "首页"
          });
       
        
    
        
    },
    changeAuthor(){
      this.model2 = true
      let id = localStorage.getLocalStorage('orgIdOri')
      this.findAllInfo(id,this.ep_page1.size,this.ep_page1.page)
    },
    //点击已接受进去后做的分页
      handleSizeChange1(val){
        this.ep_page1.size = val
        let id = localStorage.getLocalStorage('orgIdOri')
        this.findAllInfo(id,this.ep_page1.size,this.ep_page1.page)

      },
      handleCurrentChange1(page){
        this.ep_page1.page = page
        let id = localStorage.getLocalStorage('orgIdOri')
        this.findAllInfo(id,this.ep_page1.size,this.ep_page1.page)
      },
      findAllInfo(id,size,page){
        let data = {}
        data['orgId'] = id
        data['size'] = size
        data['page'] = page
        data.orgCode = this.searchInForm.orgCode
        data.tradeName = this.searchInForm.tradeName
        data.accountNo = this.searchInForm.accountNo
          this.$post('getOrgGetOrgCsgIn', data).then((res) => {
            this.table4Data = res.map.data.content
            this.totalcount1 = res.map.data.totalElements
          }).catch (e => {
            this.loading = false
          })
      },
    validatorPass(rule, value, callback) {
      if (value.length === 0) {
        callback("不能为空");
      } else if (value.length >= 3 && value.length <= 50) {
        if (value !== this.resetForm.newPassword) {
          callback("密码与确认密码不匹配，请重新输入");
        } else {
          callback();
        }
      } else {
        callback("密码必须为3到50个字符");
      }
    },
    resetPassword() {
      this.resetModel();
      this.resetPassModel = true;
    },
    resetModel() {
      this.resetForm = {
        oldPassword: "",
        newPassword: "",
        confirmPass: ""
      };
      this.$nextTick(() => {
        this.$refs.resetPass&&this.$refs["resetPass"].reset();
      });
    },
    resetPassCancel() {
      this.resetPassModel = false;
    },
    resetPassConfirm() {
      this.$refs["resetPass"].validate(valid => {
        if (valid) {
          this.$post("changePassWord", this.resetForm)
            .then(function(response) {
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    },
    changeWidth() {
      const temp = this.$store.getters.getChangeWidth;
      if (temp === 0) {
        this.$store.dispatch("setChangeWidth", 1);
      } else {
        this.$store.dispatch("setChangeWidth", 0);
      }
    },
    onFocus() {
      this.widthInput = maxInput;
    },
    close() {
      this.widthInput = originInput;
    },
    search() {
      this.close();
      //TODO Search
    },
    handleLogout() {
      this.$confirm({
        word: "是否要注销当前用户？",
        callback: errorInfo => {
            if(errorInfo){
                  this.$post("sysLogout")
                  .then(res => {
                    delToken()
                    localStorage.delLocalStorage("setUserInfo")
                    // localStorage.delLocalStorage("eptoken");
                    // store.dispatch('setToken', '')
                    store.dispatch('setOrgId', '') 
                    // localStorage.clearLocalStorage()
                    this.$router.push("/login");
                  })
                  .catch(() => {
                    localStorage.delLocalStorage("eptoken");
                    // this.$store.state.user.token = "";
                    store.commit("SETTOKEN","")
                    store.commit("SETORGID","")
                    this.$router.push({ name: "登录" });
                  });
            }
        }})
      
    }
  }
};
</script>

<style lang="less">
@media screen and (max-width: 1300px) {
    .img-style {
        display:none;
    }
}
// .notshowheader{
//   opacity: 0;
//   pointer-events: none;
// }
.img-style {
  position: absolute;
  left: 35%;
  color: #ddd;
  width: 735px;
  font-size: 23px;
  font-family: 楷体;
  font-weight: 600;
}
.img-out-style {
  // position: relative;
}
.menu-item-input {
  display: inline-block;
  padding-left: 20px;
  padding-top: 2px;
  position: relative;
  line-height: 32px;
}
.menu-item-input > input {
  will-change: width;
  box-sizing: border-box;
  outline: none;
  border: none;
  padding: 5px 30px 5px 15px;
  height: 32px;
  border-radius: 2px;
  background-color: rgba(255, 3255, 255, 0.33);
  -webkit-transition: width 0.5s;
  transition: width 0.5s;
  color: #fff;
}
.menu-item-input > input::-moz-placeholder {
  color: #fff;
}
.menu-item-input > input::-webkit-input-placeholder {
  color: #fff;
}
.menu-item-input > input:focus {
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.33);
}
.search-btn {
  cursor: pointer;
  outline: none;
  position: absolute;
  top: 50%;
  right: 2px;
  width: 30px;
  height: 28px;
  border: none;
  padding: 0;
  border-radius: 2px;
  color: #fff;
  background-color: transparent;
  text-align: center;
  line-height: 26px;
  transform: translateY(-13px);
}
.search-btn > i {
  display: inline-block;
  width: 100%;
}
.panel-menu-right > span {
  margin-right: 4px;
  font-size: 14px;
  color: rgba(250, 250, 250, 0.92);
}
.out-style-page{
  .panel-menu-padding {
    height: 55px;
    padding: 6px 10px;
    line-height: normal;
   
  }
}
.one-help-home{
  height: 400px;
  overflow-y: auto;
  .doc-help-container {
    border-bottom: 1px solid #eee;
    &:last-child {
      border-bottom: 0;
    }
  }
  .doc-help-list {
    height:28px;
    color:#3f88bf;
    font-size: 14px;
    .doc-help-list-text {
      cursor: pointer;
    }
  }
  .doc-help-tips {
    color: #333;
  }
}
.title-help-top{
  border-bottom:2px solid rgb(241,242,243);
  height: 42px;
  span{
    display: inline-block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    // border: 1px solid red;
    cursor: pointer;
  }
  .active-help-title{
    color: #2196f3;
    border-bottom: 2px solid#2196f3;
  }
}

</style>
