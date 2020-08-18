<template>
  <div class="panel-main-content">
    <!-- <div>
      <div class="ep-card card-margin relative" style="margin-bottom:30px">
        <div class="card-body">
          <div class="block">
            <div class="Matter">
              <div>待办事项与预警</div>
              <div style="cursor:pointer" @click="Matter()">查看列表详情 >></div>
            </div>
            <ep-table ref="table" :height="400" :data="ep_data" :head-color="headColor" :loading="loading"  @row-dblclick="detailInfo">

              <ep-table-item column="title" title="标题"></ep-table-item>
              <ep-table-item column="createDate" width='220' title="创建时间"></ep-table-item>
              <ep-table-item column="status" width='220' title="状态" :formatter="Matterstatus"></ep-table-item>
            </ep-table>
          </div>
          <div class="block">
            <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange" :now-page="ep_page.page" :page-size="ep_page.size" :total-num="totalcount"></ep-pager>
          </div>
        </div>
      </div>
    </div>
    <transition name="bounce">
      <div class="information" v-if="numDone>0&&numDone>0&&information==true">
        <ep-button class="button" icon="close" @click="close"></ep-button>
        <div style="cursor:pointer" @click="JumpnumDone">
          <ep-button icon="android-mail"></ep-button>您有{{numDone}}个代办事项未处理
        </div>
        <div>
          <ep-button icon="ios-folder"></ep-button>您有{{numWaring}}个预警信息未处理
        </div>
      </div>
    </transition>
    <ep-model title="详情" v-model="modelFlag" width="1350px" :wrap-close="false">
      <ep-form ref="searchData" :form="searchData" name-width="130px">
        <ep-row :gutter="7">
          <ep-col :col="8">
            <ep-form-item label="标题" attr="title">
              <ep-input v-model="searchData.title" disabled name="title"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="描述" attr="describe">
              <ep-input v-model="searchData.describe" disabled name="describe"></ep-input>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="创建时间" disabled attr="createDate">
              <ep-date v-model="searchData.createDate" disabled type="dateTime"></ep-date>
            </ep-form-item>
          </ep-col>
          <ep-col :col="8">
            <ep-form-item label="状态" attr="status">
              <ep-select v-model="searchData.status" disabled name="status">
                <ep-select-item index="0" label="未完成"></ep-select-item>
                <ep-select-item index="1" label="已完成"></ep-select-item>
              </ep-select>
            </ep-form-item>
          </ep-col>
        </ep-row>
        <div style="text-align:center">
          <ep-button type="danger" size="small" icon="close" @click="Matterclose()">关闭</ep-button>
        </div>
      </ep-form>
    </ep-model> -->
    <div  style="margin-bottom:200px">
      <ep-row :gutter="10">
        <ep-col :col="16" class="dashboard-md">
          <div class="contents-card dashboard-link">
            <div class="typeclasstwo">
            </div>
          </div>
        </ep-col>
        <ep-col :col="8" class="dashboard-md">
          <ep-row style="margin-bottom:0;">
            <div class="dashboard-md-left main-col" style="over-flow:hidden;margin-bottom:0;">
              <weather :theme="$store.getters.getTheme" style="height:140px;margin-bottom:0;"></weather>
            </div>
          </ep-row>
          <ep-row>
            <div class="dashboard-md-left main-col" style="background-color:white;border-radius:5px;">
              <iframe src="static/card.html" scrolling="auto" height="340px" width="100%" frameborder="0" align="center"></iframe>
            </div>
          </ep-row>

        </ep-col>

      </ep-row>

    </div>
   

  </div>

</template>

<script>
import misList from 'src/common/mislist'
import { getToken } from '../../utils/oauth'
import weather from '../../framework/widgets/weather'
import dashboard from '../../framework/widgets/dashboard'
import statusinfo from './differentCard.vue'
// 导入swiper组件
import swipered from 'src/components/Swiper.vue'
import echarts from 'echarts'
export default {
  name: 'home',
  extends: misList,
  data() {
    return {
      listApi: 'MattergetgetEarlyWarning', // 搜索，取api.json里面的key值
      settings: {
        pk: 'id' // 主键
      },
      option: {
        xAxis: {
          type: 'category',
          data: [
            '即将到期的业务申报表',
            '即将集报到期的出入库单',
            '核注清单超N天未核扣',
            '被布控的核放单'
          ],
          axisLabel: { interval: 0, rotate: 30, fontSize: 11 }
        },
        grid: {
          bottom: 80
        },
        yAxis: {
          minInterval: 1,
          min: 0,
          boundaryGap: [1, 1]
        },
        legend: {
          data: ['数量']
        },
        tooltip: {},
        series: [
          {
            name: '数量',
            data: [0, 0, 0, 0],
            type: 'bar'
          }
        ]
      },
      statusFlag: false,
      searchStatusId: '',
      oneDate: {},
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,

        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperCount: 0,
      unReadList: [],
      newsDetail: {},
      downFile: [],
      newsModel: false,
      totalElements: 0,
      totalPages: '',
      size: 5,
      page: 1,
      numberOfElements: '',
      isValidAgree: true,
      dashboard1: {},
      dashboard2: {},
      dashboard3: {},
      dashboard4: {},
      dashboard5: {},
      authLength: 0,
      showNum: false,

      loading: false,
      headColor: true,
      totalcount: 0,
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      ep_data: [], //表格数据
      information: true,
      numWaring: 0,
      numDone: 0,
      modelFlag: false,
      searchData:{}
    }
  },
  components: {
    swipered,
    weather,
    dashboard,
    statusinfo
  },
  watch: {},
  created() {
    // this.counts()
    // this.refresh(true)
    // this.againFindAll()
  },
  mounted() {
    // if(this.$store.getters.getType=="2"){
    //     this.findIsAuth()
    // }
    //  setTimeout(()=>{
    //    if(this.isAuth){
    //     this.showNum = true
    //   }
    //  },1000)
  },
  computed: {
 
    isAuth() {
      let array = this.$store.getters.getPower
      let flag = array.find(value => {
        return value.key == '/emsImport'
      })
      if (flag) {
        return true
      } else {
        false
      }
    },
    unreadCount() {
      return this.$store.state.user.count
    }
  },

  watch: {
    unreadCount(newVal, oldVal) {
      this.againFindAll()
    }
  },
  methods: {
    detailInfo(event, row, index) {
      this.searchData = row
      this.modelFlag = true
    },
    Matterclose() {
      this.modelFlag = false
    },
    Matterstatus(row, index) {
      if (row.status == '0') {
        return '未完成'
      }
      if (row.status == '1') {
        return '已完成'
      }
    },

    JumpnumDone() {
      this.$router.push({ name: '待办事项查询' })
    },
    close() {
      this.information = false
    },
    counts() {
      let params = { id: this.$store.getters.getCustomCode }
      this.$post('Mattergetcounts', params)
        .then(res => {
          this.numWaring = res.map.numWaring
          this.numDone = res.map.numDone
        })
        .catch(e => {})
    },
    drawEchart() {
      setTimeout(() => {
        let myChart = echarts.init(document.getElementById('dashboard-link'))
        myChart.setOption(this.option)
      }, 1000)
    },
    findIsAuth() {
      let data = {}
      data.page = 1
      data.size = 100
      data.param_tradeCode = this.$store.getters.getOrganizationCode
      data.param_menuid = 'warningNotice'
      this.$post('authorityPayListByPage', data).then(res => {
        this.authLength = res.map.data.content.length
        if (this.authLength > 0) {
          setTimeout(() => {
            this.findAllMsg()
            this.showNum = true
          }, 1000)
        }
      })
    },
    entryCard(data) {
      console.log(data)
      this.oneDate = data
      this.searchStatusId = data.businessType
      this.statusFlag = true
    },
    findAllMsg() {
      this.$post('lockGetPreMonWarSumList', {}).then(res => {
        // this.dashboard2.value = res.map.data.sasDeclareExpired.busNum
        this.dashboard1 = {
          icon: 'android-compass',
          describe: '账册核销到期',
          value:
            `${
              res.map.data.AccoutBookExpired == null
                ? 0
                : res.map.data.AccoutBookExpired.busNum
            }` + '天',
          data: res.map.data.AccoutBookExpired
        }
        this.dashboard2 = {
          icon: 'alert-circled',
          describe: '即将到期的业务申报表',
          value:
            res.map.data.sasDeclareExpired == null
              ? 0
              : res.map.data.sasDeclareExpired.busNum,
          data: res.map.data.sasDeclareExpired
        }
        this.dashboard3 = {
          icon: 'calendar',
          describe: '即将集报到期的出入库单',
          value:
            res.map.data.stockNoDeclare == null
              ? 0
              : res.map.data.stockNoDeclare.busNum,
          data: res.map.data.stockNoDeclare
        }
        let days =
          res.map.data.bondInvtNoCheck &&
          res.map.data.bondInvtNoCheck.preMonitorWarn[0].rmk
        let word = `核注清单超N天未核扣`
        if (days != null) {
          word = `核注清单超${days}天未核扣`
        } else {
          word = `核注清单超N天未核扣`
        }
        this.dashboard4 = {
          icon: 'ios-paperplane',
          describe: `${word}`,
          value:
            res.map.data.bondInvtNoCheck == null
              ? 0
              : res.map.data.bondInvtNoCheck.busNum,
          data: res.map.data.bondInvtNoCheck
        }
        this.dashboard5 = {
          icon: 'ios-list',
          describe: '被布控的核放单',
          value:
            res.map.data.sasPassPortControl == null
              ? 0
              : res.map.data.sasPassPortControl.busNum,
          data: res.map.data.sasPassPortControl
        }
        let lengthComputer = res.map.data
        let count = 0
        for (let k in lengthComputer) {
          if (lengthComputer[k] != null) {
            count++
          }
        }
        this.swiperCount = count
        // console.log(this.swiperCount)
        // let showNumber = []
        // showNumber[0] = (res.map.data.sasDeclareExpired==null?0:res.map.data.sasDeclareExpired.busNum)*1
        // showNumber[1] =(res.map.data.stockNoDeclare==null?0:res.map.data.stockNoDeclare.busNum)*1
        // showNumber[2] =(res.map.data.bondInvtNoCheck==null?0:res.map.data.bondInvtNoCheck.busNum)*1
        // showNumber[3] = (res.map.data.sasPassPortControl==null?0:res.map.data.sasPassPortControl.busNum)*1

        // this.option.series[0].data = showNumber
        // console.log(this.option.series[0].data)
        // this.drawEchart()
      })
    },
    manyMsg() {
      this.$router.push({ name: '消息中心' })
    },
    againFindAll() {
      this.$post('findUnreadMsg', {
        userId: this.$store.getters.getUserId,
        size: this.size,
        page: this.page
      }).then(res => {
        this.totalElements = res.map.data.totalElements
        this.unReadList = res.map.data.content
        this.$store.dispatch('setuserallcount')
      })
    },
    detailsButton(id) {
      this.$post('detailsMsg', { id: id }).then(res => {
        this.newsDetail = res.map.data.noticeSet
        this.downFile = res.map.data.noticeAttachment
        this.newsModel = true
      })
    },
    knowButton() {
      if (this.newsDetail.isValid == 'Y') {
        this.$post('saveUserMsg', {
          userId: this.$store.getters.getUserId,
          setId: this.newsDetail.id,
          remark: this.isValidAgree == true ? '同意' : '不同意'
        }).then(res => {
          this.newsModel = false
          this.againFindAll()
        })
      }
      if (
        this.newsDetail.isValid == 'N' ||
        this.newsDetail.isValid == undefined
      ) {
        this.$post('saveUserMsg', {
          userId: this.$store.getters.getUserId,
          setId: this.newsDetail.id
        }).then(res => {
          this.newsModel = false
          this.againFindAll()
        })
      }
    },
    fileDownLoad(id) {
      window.location.href =
        global.HOST +
        '/notice/noticeAttachment/download?userId=' +
        this.$store.getters.getUserId +
        '&id=' +
        id +
        '&token=' +
        getToken()
    },
    changePageSize(e) {
      this.$post('findUnreadMsg', {
        userId: this.$store.getters.getUserId,
        size: this.size,
        page: e
      }).then(res => {
        this.totalElements = res.map.data.totalElements
        this.unReadList = res.map.data.content
      })
    },
    Matter() {
      this.$router.push('/Todolist')
    }
  }
}
</script>
<style lang="less">
.panel-main-content {
  .swiper-button-prev,
  .swiper-button-next {
    width: 50px;
  }
}
</style>
<style scoped>
.typeclasstwo {
  width: 100%;
  height: 470px;
  background-image: url('../../assets/img/bannerHome.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.user-table-home td {
  padding-left: 20px;
  border-bottom: 1px dashed rgb(238, 238, 238);
  height: 50px;
  width: 50%;
  font-size: 14px;
}
.user-table-hom td {
  padding-left: 20px;
  /* border-bottom: 1px dashed rgb(238, 238, 238); */
  height: 50px;
  width: 50%;
  font-size: 14px;
}
.user-left-class {
  text-align: right;
  color: #546e7a;
}
.user-left-class {
  width: 16% !important;
}
.dashboard-nav {
  height: 455px;
}
.news-container .contents-card {
  padding: 0;
}
.news-container .news-list-box {
  padding: 14px;
}
.news-container .news-list-box .news-title {
  font-size: 16px;
  display: block;
  width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.top-style-msg {
  /* width: 100%; */
  display: flex;
  height: 50px;
  /* text-align: justify; */
  justify-content: space-between;
  align-items: center;
  padding: 0 14px;
  font-size: 18px;
  background: url(../../assets/img/newtable_bg1.gif) repeat-x;
}
.much-style:hover {
  color: #e74c3c;
}
.news-container .dashboard-news-item {
  display: block;
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px dashed #bababa;
}
.news-container .dashboard-news-item:last-child {
  border-bottom: 0;
}
.news-container .label-style {
  margin-left: 5px;
  padding: 0 4px;
  font-size: 12px;
  color: white;
  border-radius: 3px;
}
.news-container .text-red {
  background-color: rgb(255, 102, 102);
  border: 1px solid rgb(255, 102, 102);
}
.news-container .text-green {
  background-color: #27ae60;
  border: 1px solid #27ae60;
}
.news-container .text-blue {
  background-color: #4fc3f7;
  border: 1px solid #4fc3f7;
}
.news-container .text-yellow {
  background-color: #f39c12;
  border: 1px solid #f39c12;
}
.Matter {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  height: 40px;
  background: #fff;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.54);
}
.information {
  width: 250px;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid #666;
  background: #ffffff;
  position: absolute;
  bottom: 200px;
  right: 50px;
  z-index: 10;
}
.bounce-enter-active {
  animation: bounce-in 1s;
}
.bounce-leave-active {
  animation: bounce-in 1s reverse;
}
@keyframes bounce-in {
  0% {
    bottom: 50px;
    opacity: 0;
  }
  100% {
    bottom: 200px;
    opacity: 1;
  }
}
.button {
  position: absolute;
  top: 3px;
  right: 3px;
  background: transparent;
}
</style>
