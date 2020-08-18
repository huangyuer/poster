<template>
  <div class="excel-export">
    <ep-model title="选择导出方式" v-model="exportStyle" width="500px">
      <ep-radio class="radio" v-model="optType" label="1">按票导出</ep-radio>
      <ep-radio class="radio" v-model="optType" label="2">按表导出</ep-radio>

      <div class="block" style="text-align:right;margin-top:30px;">
        <ep-button type="danger" @click="exportStyle=false">取消</ep-button>
        <ep-button style="margin-left:20px;" type="primary" @click="applyBtn">确定</ep-button>

      </div>
    </ep-model>

    <WmsButton type="success" size="small" icon="android-download" @click="exportFile">Excel导出</WmsButton>
  </div>
</template>

<script>
export default {
props:{
    //传入本次导入的 数据
    excelData:{
        type:Object,
        default:{

        }
    },
    // 传入父组件的 总数
    totalcount:{
        type:Number,
        default:0
    },
    // 传入 父组件的 查询条件
    searchForm:{
        type:Object,
        default:{

        }
    },
},
  data() {
    return {
        optType:"",
        exportStyle:false,
        optType:'1'

    }
  },
  methods: {
    exportFile() {
      this.exportStyle = true
      this.$emit("click",true)
    },
    applyBtn() {
      let selectData = this.excelData.param
      if (selectData.length > 0) {
        // 判断是否存在不能导出的单子
        // let optArray = []
        // selectData.forEach((e, index) => {
        //   if (e.optStatus == 99) {
        //     optArray.push(e.optStatus)
        //   } else {

        //   }
        // })
        // if (optArray.length > 0) {
        //   return this.$pop({
        //     type: 'danger',
        //     message: '删除状态的单证不能导出!'
        //   })
        // }

        let ids = []
        selectData.forEach((e, index) => {
          ids.push(e.id)
        })
        let data = {}
        data.busFlag = this.excelData.busFlag
        data.param = ids
        data.paramType = "1"
        data.optType = this.optType
        data.userName = this.$store.getters.getUserName
        data.userId=this.$store.getters.getUserId
        data.orgId = this.$store.getters.getOrgId
        this.$post('exportFile', data).then(res => {
          this.exportStyle = false
        })
      } else {
        // this.refresh(true)
        this.$emit("refresh",true)
        setTimeout(() => {
          if (this.totalcount > 100) {
            return this.$pop({
              type: 'danger',
              message: '导出数据不能大于100条'
            })
          }
          if (this.totalcount == 0) {
            return this.$pop({
              type: 'danger',
              message: '导出内容不能为空'
            })
          }
          // if (this.searchForm.optStatus == 99) {
            // return this.$pop({
            //   type: 'danger',
            //   message: '删除状态的单证不能导出!'
            // })
          // } else {
            let data = {}
            data.busFlag = this.excelData.busFlag
            data.param=this.searchForm
            data.paramType = "2"
            data.optType = this.optType
            data.userName = this.$store.getters.getUserName
            data.userId=this.$store.getters.getUserId
            data.orgId = this.$store.getters.getOrgId
            this.$post('exportFile', data).then(res => {
              this.exportStyle = false
            })
          // }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.excel-export{
    display: inline-block;
}
</style>