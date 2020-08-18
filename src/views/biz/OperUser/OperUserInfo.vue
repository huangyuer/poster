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
                <ep-form-item attr="userName" label="用户名">
                  <ep-input v-model="searchForm.userName" name="userName" :maxlength="20"></ep-input>
                </ep-form-item>
              </ep-col>
               <ep-col :col="6">
                <ep-form-item attr="tradecode" label="企业编码">
                  <ep-input v-model="searchForm.tradecode" name="tradecode" :maxlength="20"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="6">
                <ep-form-item attr="orgCode" label="组织编码">
                  <ep-input v-model="searchForm.orgCode" name="orgCode" :maxlength="20"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="6">
                <ep-form-item attr="customId" label="关区">
                  <!-- <ep-select filterable :label="tradeInfo" v-model="searchForm.customId" name="customId" v-on:change="masterCuscdChange">
                    <ep-select-item v-for="(item, index) in tradeInfo" :key="index" :index="item.customCode" :label="item.customName+' '+item.customCode"></ep-select-item>
                  </ep-select> -->
                   <loc-codemap-select
                    :name="'customId'"
                    :code="'customCode'"
                    :cName="'customName'"
                    :dataList="tradeInfo"
                    :type="'custom'"
                    
                    :value.sync="searchForm.customId">
                     </loc-codemap-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="6">
                <ep-form-item attr="createTime" label="创建时间">
                  <ep-date v-model="searchForm.createTime" placeholder="" name="createTime"></ep-date>
                </ep-form-item>
              </ep-col>
            </ep-row>

            <ep-row :gutter="7">
              <ep-col :col="24">
                <WmsButton   @click="reset('searchForm')">重置</WmsButton>
                <!-- <ep-button type="warning" size="small" icon="refresh" @click="reset('searchForm')">重置</ep-button> -->
                <WmsButton  @click="refresh(true)"  :loading="loading">查询</WmsButton>
                <!-- <ep-button type="primary" size="small" @click="refresh(true)" icon="search" :loading="loading">查询</ep-button> -->
              </ep-col>
            </ep-row>
          </ep-form>
        </div>
     
      <ep-model title="绑定手机号" :wrap-close="false" v-model="phoneIsShow" width="480px">
        <ep-form class="demo-form" ref="UserForm" :form="UserForm" :rules="resetPassRule" name-width="90px">
          <ep-row :gutter="18">
            <ep-col :col="24">
              <ep-form-item label="用户名" attr="userName" required>
                <ep-input v-model="UserForm.userName" name="userName" :maxlength="18"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="24">
              <ep-form-item label="手机号" attr="phone" required>
                <ep-input v-model="UserForm.phone" name="phone" :maxlength="11" style="width:65%"></ep-input>
                <div style="position:absolute;top:0px;right:0px;">
                  <ep-button v-show="isShowTrue" @click="sendClod">发送验证码</ep-button>
                  <ep-button v-show="isShowFalse">{{time+"秒后可重新发送"}}</ep-button>
                </div>
              </ep-form-item>
            </ep-col>
            <ep-col :col="24">
              <ep-form-item label="验证码" attr="phoneCode" required>
                <ep-input v-model="UserForm.phoneCode" name="phoneCode" :maxlength="18"></ep-input>
              </ep-form-item>
            </ep-col>
            <div style="padding-left:100px;">
              
              <WmsButton style="margin:0" @click="makeSure('UserForm')">确定</WmsButton>
              <WmsButton style="margin:0"  @click="closeModel">关闭</WmsButton>
              
            </div>

          </ep-row>
        </ep-form>
      </ep-model>
      <!--表格-->
       <div class="wms-dividing-line"></div>
    
        <div class="card-body">
          <div class="block">
              <!-- <WmsButton style="margin:0"  @click="doUpdate">修改</WmsButton> -->
            <!-- <ep-button type="primary" size="small" @click="doUpdate" icon="edit">修改</ep-button> -->


          </div>
          <div class="block">
            <ep-table ref="table" border :height="400" :data="ep_data" @selection-change="handleSelectionChange" :head-color="headColor" :loading="loading" @row-dblclick="detailInfo">
              <!-- <ep-table-item type="select"></ep-table-item> -->
                <ep-table-item column="opt" title="操作" width="200"  >
                <template slot-scope="props">
                    <wms-icon type="edit" @click="doUpdate(props.row,props.row.id)"></wms-icon>
                </template>
                </ep-table-item>
              <ep-table-item column="userName" title="用户名" width="200"></ep-table-item>
              <ep-table-item column="nickName" title="昵称" width="150"></ep-table-item>
              <ep-table-item column="customId" title="关区" :formatter="customTranslate" width="120"></ep-table-item>
              <ep-table-item column="tradeCode" title="企业编码" width="130"></ep-table-item>
              <ep-table-item column="orgCode" title="组织编码" width="130"></ep-table-item>
              <ep-table-item column="phone" title="用户手机号" width="160">
                <template slot-scope="props">
                  <p type="primary" class="phone-style" v-show="props.row.phone==''?true:false" size="mini" v-on:click="bindPhone(props.row.userName)">绑定手机号</p>
                  <p v-show="props.row.phone==''?false:true" size="mini">{{props.row.phone}}</p>
                </template>
              </ep-table-item>
              <ep-table-item column="email" title="邮箱" width="230"></ep-table-item>
              <ep-table-item column="createTime" title="创建时间" width="200"></ep-table-item>
              <ep-table-item column="type" title="用户类型" :formatter="typeFormatter"></ep-table-item>
              <ep-table-item column="status" title="状态" :formatter="statusFormatter"></ep-table-item>
              <ep-table-item column="remark" title="备注" width="350">
                <template slot-scope="props">
                  <p class="rmk-style">{{props.row.remark}}</p>
                </template>
              </ep-table-item>
            </ep-table>
          </div>
          <div class="block">
            <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
          </div>
        </div>
        <ep-model title="用户信息" v-model="userFormIsShow" width="1200px"  >
          <ep-form class="demo-form" ref="form" :form="form" name-width="168px">
            <ep-row :gutter="10">
              <ep-col :col="12">
                <ep-form-item label="昵称" attr="nickName" count>
                  <ep-input v-model="form.nickName" name="nickName" :maxlength="30" disabled></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item label="用户名" attr="userName" required>
                  <ep-input disabled v-model="form.userName" name="userName" :maxlength="18"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item label="关区" attr="customId">
                  <!-- <ep-select disabled :label="tradeInfo" v-model="form.customId" name="customId" remote>
                    <ep-select-item v-for="(item, index) in tradeInfo" :key="index" :index="item.customCode" :label="item.customName+' '+item.customCode"></ep-select-item>
                  </ep-select> -->
                   <loc-codemap-select
                    :name="'customId'"
                    :code="'customCode'"
                    :cName="'customName'"
                    :dataList="tradeInfo"
                    disabled
                    :type="'custom'"
                    :value.sync="form.customId">
                     </loc-codemap-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item label="企业编码" attr="tradeCode" required>
                  <ep-input disabled v-model="form.tradeCode" name="tradeCode" :maxlength="10"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item label="状态" attr="status" required>
                  <ep-select disabled v-model="form.status" name="status" :col="8">
                    <ep-select-item index="0" label="无效"></ep-select-item>
                    <ep-select-item index="1" label="有效"></ep-select-item>
                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item label="用户类型" attr="type" required>
                  <ep-select disabled v-model="form.type" name="type" :col="8">
                    <ep-select-item index="2" label="操作员"></ep-select-item>

                  </ep-select>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item label="邮箱" attr="email" required>
                  <ep-input disabled v-model="form.email" name="email" :maxlength="60"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item label="备注" attr="remark" count>
                  <ep-input :readonly="true" v-model="form.remark" name="remark" type="textarea" :maxlength="200"></ep-input>
                </ep-form-item>
              </ep-col>
            </ep-row>

          </ep-form>
        </ep-model>
      </div>
    </div>
  </div>
</template>

<script>
import misList from "src/common/mislist";

export default {
  name: "operUserInfo", // 保持和文件名一致，否则keep-alive不会动态缓存

  extends: misList, // 务必继承

  created() {
    let customList = this.$store.getters.getCustomList;
    this.tradeInfo = customList;
    // this.refresh(true); 
  },

  mounted() {},

  methods: {
    masterCuscdChange(event) {
      if (event % 1 === 0) {
        this.form.customId = event;
      }
    },
    bindPhone(e) {
      this.phoneIsShow = true;
      this.UserForm.userName = e;
    },
    closeModel() {
      this.phoneIsShow = false;
    },
    makeSure(UserForm) {
      this.$refs[UserForm].validate(valid => {
        if (valid) {
          this.$post("BindUser", this.UserForm)
            .then(res => {
              console.log(res);
            })
            .catch(res => {
              console.log(res);
            });
        }
      });
    },
    sendClod() {
      let reg = new RegExp(
        /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/
      );
      if (!reg.test(this.UserForm.phone)) {
        this.$pop({
          type: "danger",
          message: "请输入正确的手机号码"
        });
        return;
      }
      this.isShowFalse = true;
      this.isShowTrue = false;
      this.times = setInterval(this.timesChange, 1000);
      let data = { phone: this.UserForm.phone };
      this.$post("BackLogin", data)
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    timesChange() {
      this.time--;
      if (this.time == 0) {
        clearInterval(this.times);
        this.time = 60;
        this.isShowFalse = false;
        this.isShowTrue = true;
      }
    },
    detailInfo(event, row, index) {
      this.form = row;
      this.userFormIsShow = true;
    },
    searchCallback(json) {
      // 搜索成功回调，做特殊处理在此
      console.log(json);
    },
    doUpdate(row,nowid) {
      let vm = this;
      let data =row;
        let menusList = this.$store.getters.getMenuTabInstance.items;
        menusList.forEach(function(item, index) {
            if (item.name == "用户修改") {
            menusList.splice(index, 1);
            }
        });
        vm.$router.push({
            name: "用户修改",
            params: { form: data, flag: true }
        });
    },

    typeFormatter(row, index) {
      if (row.type == "1") {
        return "企业管理员";
      } else if (row.type == "2") {
        return "操作员";
      }
    },
    statusFormatter(row, index) {
      if (row.status == "0") {
        return "无效";
      } else if (row.status == "1") {
        return "有效";
      }
    },
    customTranslate(row,index){
      let getCustomList = this.$store.getters.getCustomList;
      for (let i = 0; i < getCustomList.length; i++) {
        if (row.customId == getCustomList[i].customCode) {
          return getCustomList[i].customName;
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      phoneIsShow: false,
      listApi: "queryUser", // 搜索，取api.json里面的key值
      saveApi: "userSave", // 保存，取api.json里面的key值
      deleteData: "userDelete",
      userFormIsShow: false,
      isShowTrue: true,
      isShowFalse: false,
      masterCuscdName: "",
      tradeInfo: [],
      time: 60,
      times: "",
      UserForm: {
        userName: "",
        phone: "",
        phoneCode: ""
      },
      settings: {
        pk: "id" // 主键
      },
      searchForm: {
        // 筛选条件
        userName: "",
        masterCuscd: "",
        createTime:"",
        customId:""
      },
      headColor: true,
      form: {
        nickName: "",
        userName: "",
        customId: "",
        tradecode: "",
        type: "",
        email: "",
        remark: "",
        head107: true,
        status: "1"
      },
      selectLength: 0,
      selectItems: [],
      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      ep_data: [], //表格数据
      resetPassRule: {
        phone: {
          required: true,
          min: 11,
          max: 11,
          message: "请输入正确的手机号",
          trigger: "blur"
        },
        phoneCode: {
          required: true,
          message: "不能为空",
          trigger: "blur, change"
        }
      }
    };
  }
};
</script>
<style>
    .phone-style{
      width: 120px;
      color:#3f88bf;
      cursor: pointer;
    }
</style>
