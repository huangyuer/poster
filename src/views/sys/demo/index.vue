<template>
  <div class="box">
    <!-- <ep-card layout="headers, media, action, contents"> -->
    <div class="shadow">

      <div class="headers">
        <div class="icon-card-title"><img src="http://192.168.118.129/lgxpq/svg/company/businessSearch.svg" alt="" class="icon-card-title-icon">
          业务动态
        </div>
      </div>
      <div class="contents">
        <div class="business-search">
          <ep-tabs :active="'状态查询'" ref="searchTab" position="middle">
            <ep-tab-item :name="'状态查询'">
              <div class="search-header">
                <div class="search-header-input">
                  <ep-input :placeholder="'单号'" v-model="orderNo" @keyup.native.enter="handleSearch" />
                </div>
                <div class="search-header-btn">
                  <ep-button icon="search" type="primary" @click="handleSearch">查询</ep-button>
                </div>
              </div>
              <div class="tag_box">
                <ep-row>
                  <ep-col :col="2">
                    <ep-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                    </ep-input>
                    <ep-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag </ep-button>
                  </ep-col>
                  <ep-col :col="22">
                    <span :key="tag" v-for="tag in dynamicTags" @click="tabInput(tag)" class="tagcon">
                      <ep-tag :closable="true" type='primary' :close-transition="false" @close="handleClose(tag)">
                        {{tag}}
                      </ep-tag>
                    </span>
                  </ep-col>
                </ep-row>
              </div>
              <div class="tag_box">
                <div class="float padding-14 big-data-link-step" style="margin-right:30px" :key="item.key" v-for="(item, index) in status">
                  <div class="svg-dom" :class="{active: index !== status.length-1}">
                    <i :class="`ion-${item.icon}`"></i>
                  </div>
                  <div class="big-data-p one-line" style="margin: 10px;font-size: 14px">{{item.name}}</div>
                  <div class="big-data-p-sm" style="font-size:12px; white-space : nowrap">{{item.createTime || ''}}</div>
                  <div class="big-data-link-icon" v-if="index !== status.length-1">
                    <i class="ion-chevron-right"></i>
                    <i class="ion-chevron-right"></i>
                  </div>
                </div>
              </div>
            </ep-tab-item>
          </ep-tabs>
        </div>
      </div>
    </div>
    <!-- </ep-card> -->
  </div>
</template>
 
<script>
let status = [
  {
    key: '1',
    name: '暂存',
    icon: 'clipboard'
  },
  {
    key: '18',
    name: '已申报',
    icon: 'share'
  },
  {
    key: '3',
    name: '海关入库',
    icon: 'archive'
  },
  {
    key: '40',
    name: '预核扣', // 通过（已核口）
    icon: 'android-bookmark'
  },
  {
    key: '4x',
    name: '通过', // 通过（已核口）
    icon: 'checkmark'
  }
]
import misList from 'src/common/mislist'
export default {
  name: 'demo',
  extends: misList,
  data() {
    return {
      orderNo: '',
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      status: [
        { statusName: '海关审核', icon: 'share', createTime: null },
        {
          statusName: '入库成功',
          icon: 'archive',
          createTime: '2020-07-27 14:09:48'
        },
        {
          statusName: '已确认',
          icon: 'android-bookmark',
          createTime: '2020-07-27 14:09:39'
        },
        {
          statusName: '暂存',
          icon: 'clipboard',
          createTime: '2020-07-27 14:09:28'
        }
      ]
    }
  },
  components: {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    getStepTime(key) {
      let data = this.status.find(v => v.optStatus === key)
      if (key === '4x') {
        data = this.status.find(
          v => v.optStatus === '42' || v.optStatus === '41'
        )
      }

      if (!data) {
        return false
      }
      return data.optTime
    },
    handleSearch() {
      alert(`${this.orderNo}`)
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    tabInput(val) {
      this.orderNo = val
    },
    showInput() {
      this.inputVisible = true
      console.log(this.inputVisible, 'inputVisible')
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>
 
<style scoped lang="less">
.box {
  /* width: 70%; */
  height: 500px;
  background: #fff;
  overflow: hidden;
}
.shadow {
  width: 90%;
  margin: 10px;
  flex-direction: column;
  border-radius: 2px;
  background: #fff;
  color: initial;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
}
.icon-card-title {
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
}
.icon-card-title-icon {
  width: 35px;
  vertical-align: middle;
}
.business-search {
  /deep/ .ep-tabs-title {
    width: 80px;
    margin: 0 auto;
    margin-top: -10px;
  }
  .status-link {
    margin-bottom: 0px !important;
  }
  .lang-en {
    &-title {
      width: 297px !important;
    }
  }
}

.search-header {
  display: flex;
  justify-content: center;
  align-items: center;
  .search-header-select {
    width: 18%;
  }
  .search-header-input {
    width: 35%;
    margin-left: 10px;
  }
  .search-header-btn {
    margin-left: 10px;
  }
}
.tagcon {
  display: inline-block;
  margin: 5px 5px;
  cursor: pointer;
}
.input-new-tag,
.button-new-tag {
  // background: #000;
  margin: 5px 0;
}
.headers {
  padding: 24px 16px 12px;
}
.contents {
  padding: 12px 16px 24px;
}
.tag_box {
  margin: 0 auto;
  margin-top: 20px;
}
.svg-dom {
  width: 56px;
  height: 56px;
  margin: 0 auto;
  line-height: 56px;
  background: #bfbfbf;
  border-radius: 50%;
  font-size: 26px;
  color: #fff;

  &.active {
    background: #138dff;
  }
}
.big-data-link-step {
  height: 80px !important;
}
// 全局

</style>