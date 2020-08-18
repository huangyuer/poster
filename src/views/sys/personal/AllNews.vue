<template>
  <!-- <div class="panel-main-content"> -->
  <div class="ep-card card-margin relative">
    <div class="card-body">
      <ep-row :gutter="10" style=" margin-bottom: 0px">
        <ep-col :col="24">
          <div class="contents-card dashboard-news">
            <div>
              <span style="color:#0F6099!important;">您有{{totalElements}}条未读的消息</span>
               <ep-button
                  type="info"
                  size="small"
                  @click="doRefresh"
                  icon="ios-refresh"
                  >刷新</ep-button
                >
            </div>
            <ep-table border :data="ep_data" style="cursor:pointer;" @row-click="detailsButton">
              <ep-table-item column="readFlag" title="标识" width="100">
                <template slot-scope="props">
                  <ep-icon
                    v-show="props.row.readFlag=='未读'"
                    style="color:#F39C12;"
                    icon="android-mail"
                    size="large"
                    theme="light"
                  ></ep-icon>
                  <ep-icon
                    v-show="props.row.readFlag=='已读'"
                    style="color:rgb(189,185,192);"
                    icon="android-drafts"
                    size="large"
                    theme="light"
                  ></ep-icon>
                </template>
              </ep-table-item>
              <ep-table-item column="title" title="等级" width="150">
                <template slot-scope="props">
                  <span v-show="props.row.noticeLevel=='紧急'" class="label-style text-red">紧急</span>
                  <span v-show="props.row.noticeLevel=='重要'" class="label-style text-green">重要</span>
                  <span v-show="props.row.noticeLevel=='一般'" class="label-style text-blue">一般</span>
                  <span v-show="props.row.isValid=='Y'" class="label-style text-yellow">协议</span>
                </template>
              </ep-table-item>
              <ep-table-item column="title" title="通知标题">
                <template slot-scope="props">
                  <p
                    class="title-style-over"
                    :style="props.row.readFlag=='未读'?'font-weight:1000;font-size:14px;':'font-size:14px;'"
                  >{{props.row.title}}</p>
                </template>
              </ep-table-item>
              <ep-table-item column="createDate" title="通知时间" width="220"></ep-table-item>
            </ep-table>
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
        </ep-col>
      </ep-row>
      <ep-model v-model="newsModel" :closeable="newsDetail.readFlag=='已读'" :wrap-close="false" width="800px">
        <div class="notice-title">
          <p style="display:inline-block;">{{newsDetail.title}}</p>
        </div>
        <div v-html="newsDetail.body"></div>
        <div style="text-align:right" v-if="newsDetail.isValid=='Y'" v-show="newsDetail.readFlag=='未读'">
          <span>
            是否同意此协议:
            <ep-switch v-model="isValidAgree" on-text="同意" off-text="不同意"></ep-switch>
          </span>
        </div>
        <div style="text-align:center;">
          <ep-button v-show="newsDetail.readFlag=='未读'" type="success" icon="checkmark-round" @click="knowButton">我已阅读</ep-button>
        </div>
        <div class="file-warper" v-if="downFile.length>0">
          <ep-row :gutter="10" style="margin-bottom: 0px">
            <ep-col :col="3">
              <span>附件名字:</span>
            </ep-col>
            <ep-col :col="21" style="padding-left:0;">
              <p class="file-list" v-for="(item,i) in downFile" :key="i">
                {{item.name}}&nbsp;&nbsp;
                <ep-button type="primary" size="small" icon="android-download" @click="fileDownLoad(item.id)">下载</ep-button>
              </p>
            </ep-col>
          </ep-row>
        </div>
      </ep-model>
    </div>
  </div>

  <!-- </div> -->
</template>

<script>
import misList from 'src/common/mislist';
import { getToken } from 'src/utils/oauth';
export default {
  name: 'allNews',
  extends: misList,
  data() {
    return {
      listApi: 'findAllMsg',
      totalcount: 0,
      settings: {
        pk: 'id' // 主键
      },
      ep_page: {
        // 分页
        size: 10,
        page: 1
      },
      ep_data: [], //表格数据
      searchForm: {
        // 筛选条件
        userId: this.$store.getters.getUserId
      },
      newsDetail: {},
      downFile: [],
      newsModel: false,
      isValidAgree: true
    };
  },
  components: {},
  computed: {
    totalElements() {
      return this.$store.state.user.count;
    }
  },
  created() {
    this.refresh(true);
    this.againFindAll();
  },
  mounted() {},
  methods: {
    refresh() {
      this.$post('findAllMsg', {
        userId: this.$store.getters.getUserId,
        size: this.ep_page.size,
        page: this.ep_page.page
      }).then(res => {
        let messageData = res.map.data.content;
        messageData.forEach(e => {
          if (e.readFlag == '已读') {
            e.flag = true;
          }
          if (e.readFlag == '未读') {
            e.flag = false;
          }
        });
        console.log(messageData);
        messageData.sort(function(a, b) {
          return Date.parse(b.createDate) - Date.parse(a.createDate); //时间正序
        });
        messageData.sort(this.sortBy('flag', true));
        this.ep_data = messageData;
        this.totalcount = res.map.data.totalElements;
      });
    },
    sortBy: function(attr, rev) {
      //第二个参数没有传递 默认升序排列
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = rev ? 1 : -1;
      }

      return function(a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      };
    },
    againFindAll() {
      this.$store.dispatch('setuserallcount');
    },
    fileDownLoad(id) {
      window.location.href =
        global.HOST +
        '/notice/noticeAttachment/download?userId=' +
        this.$store.getters.getUserId +
        '&id=' +
        id +
        '&token=' +
        getToken();
    },
    knowButton() {
      console.log(this.newsDetail);
      if (this.newsDetail.isValid == 'Y') {
        this.$post('saveUserMsg', {
          userId: this.$store.getters.getUserId,
          setId: this.newsDetail.id,
          remark: this.isValidAgree == true ? '同意' : '不同意'
        }).then(res => {
          this.newsModel = false;
          this.againFindAll();
          this.refresh(true);
        });
      }
      console.log(this.newsDetail.isValid);
      if (
        this.newsDetail.isValid == 'N' ||
        this.newsDetail.isValid == undefined
      ) {
        this.$post('saveUserMsg', {
          userId: this.$store.getters.getUserId,
          setId: this.newsDetail.id
        }).then(res => {
          this.newsModel = false;
          this.againFindAll();
          this.refresh(true);
        });
      }
    },
    detailsButton(event, row) {
      this.$post('detailsMsg', { id: row.setId }).then(res => {
        this.newsDetail = res.map.data.noticeSet;
        this.newsDetail.readFlag = row.readFlag;
        this.downFile = res.map.data.noticeAttachment;
        this.newsModel = true;
      });
    },
    closeMoudel() {
      this.newsModel = false;
    }
  }
};
</script>
<style scoped>
.title-style-over {
  width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dashboard-news .label-style {
  margin-left: 5px;
  padding: 0 4px;
  font-size: 12px;
  color: white;
  border-radius: 3px;
}
.dashboard-news .text-red {
  background-color: rgb(255, 102, 102);
  border: 1px solid rgb(255, 102, 102);
}
.dashboard-news .text-green {
  background-color: #27ae60;
  border: 1px solid #27ae60;
}
.dashboard-news .text-blue {
  background-color: #4fc3f7;
  border: 1px solid #4fc3f7;
}
.dashboard-news .text-yellow {
  background-color: #f39c12;
  border: 1px solid #f39c12;
}

.notice-title {
  text-align: center;
  font-size: 18px;
  color: rgba(33, 150, 243, 0.8);
  font-weight: 600;
  position: relative;
}
.file-warper {
  margin-top: 50px;
}
.file-warper .file-list {
  margin: 0 0 10px;
}
</style>
