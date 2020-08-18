<template>
  <div class="custom-pager">
    <span class="ep-pager-select">
      <ep-select size="small" :label="showPagerList" v-model="currentPageSize"></ep-select>
    </span>
    <span>
      <ep-button size="small" type="primary" :loading="loading" @click="handleClick(-1)"
                 :disabled="disabledUp">上一页</ep-button>
      &nbsp;&nbsp;<font style="font-size:12px">当前为第{{ nowPage }}页</font>&nbsp;&nbsp;
      <ep-button size="small" type="primary" :loading="loading" @click="handleClick(1)"
                 :disabled="disabledDown">下一页</ep-button>
    </span>
  </div>
</template>

<script>
  export default {

    name: 'custom-pager',

    props: {
      loading: Boolean,
      pageSize: Number,
      nowPage: Number,
      ep_data: {
        default: []
      },
      minPager: {
        default: 0
      }
    },

    data() {
      return {
        currentPageSize: this.pageSize,
        pagerList: [10, 20, 50, 100]
      }
    },

    watch: {
      currentPageSize(val) {
        this.$emit('size-change', val)
      }
    },

    computed: {
      disabledUp() {
        return this.nowPage <= 1
      },
      disabledDown() {
        return this.ep_data.length < this.pageSize
          || (this.ep_data.length === 0 && this.nowPage <= 1)
      },
      showPagerList() {
        let res = []
        this.pagerList.forEach(item => {
          if (item >= this.minPager) {
            res.push(item)
          }
        })
        return res
      }
    },

    methods: {

      handleClick(number) {
        let changeNumber = this.nowPage + number
        this.$emit('change', changeNumber)
      }
    }
  }
</script>

<style>
  .custom-pager {
    text-align: right;
  }

  .custom-pager > span {
    margin-left: 12px;
  }
</style>
