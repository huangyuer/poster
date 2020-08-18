
const mixin = {
    data(){
        return{
            optionStatusList:[
                {value:"1",label:"暂存"},{value:"18",label:"已申报"},{value:"3",label:"海关入库"},
                {value:"4",label:"海关入库失败"},{value:"5",label:"审核通过"},{value:"17",label:"转人工"},
                {value:"6",label:"审核拒绝"},{value:"99",label:"删除"},{value:"7",label:"数据中心入库成功"},
                {value:"8",label:"数据中心入库失败"},{value:"19",label:"待申报"}
            ]
        }
    },
	methods: {
        // 启用 
		goUp(){
            let selectData = this.$refs.table.getData("select");
            console.log(selectData)
            if (selectData.length != 1) {
              this.$pop({
                type: "danger",
                message: "请选择一条数据"
              });
              return
            }
            this.$post("emsPreSetPriority",{id:selectData[0].id}).then(res=>{
                this.refresh()
            })
        },
        // 撤销
        backApply(){
            let selectData = this.$refs.table.getData("select");
            if (selectData.length != 1) {
                this.$pop({
                  type: "danger",
                  message: "请选择一条数据！"
                });
                return
              }
            if (selectData[0].optStatus != "19") {
                this.$pop({
                  type: "danger",
                  message: "当前单证状态不允许撤销申报！"
                });
                return
              }
            
            this.$post("emsPreNoDeclare",{id:selectData[0].id}).then(res=>{
                this.refresh()
            })
        }
      

         
  },
  mounted() {
    
  }
}

export default mixin