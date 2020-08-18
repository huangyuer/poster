import { Select } from "element-ui";

const mixin = {
    mounted() {
    
    },
    computed:{
        dclUnitcd(){
            return this.$store.getters.getUnitList;
        },
        curr(){
            return this.$store.getters.getCurrList
        },
        dcllvy(){
            return this.$store.getters.getLevymodeList
        },
        countrys(){
          return this.$store.getters.getCountryList
        }
    },
	methods: {
        // 启用 
        typeFormatter(row, index) {
            if (row.mtpckEndprdTypecd == "I") {
              return "I-料件";
            } else if (row.mtpckEndprdTypecd == "E") {
              return "E-成品";
            } else {
              return "未知";
            }
          },
         
          inTypeChange(row, index) {
            if (row.inType == "1") {
              return "一线入区";
            } else if (row.inType == "2") {
              return "二线入区";
            } else if (row.inType == "3") {
              return "结转入区";
            }
          },
          natcdTranslate(row, index) {
            let countryList = this.$store.getters.getCountryList;
            for (let i = 0; i < countryList.length; i++) {
              if (row.natcd == countryList[i].countryCode) {
                return countryList[i].nameCn;
              }
            }
          },
          destinationTranslate(row,index){
            let countryList = this.$store.getters.getCountryList;
          for (let i = 0; i < countryList.length; i++) {
            if (row.destinationNatcd == countryList[i].countryCode) {
              return countryList[i].nameCn;
            }
          }
        },
        lvyrlfModecdTranslate(row, index) {
          let levymodeList = this.$store.getters.getLevymodeList;
          for (let i = 0; i < levymodeList.length; i++) {
            if (row.lvyrlfModecd == levymodeList[i].dutyMode) {
              return levymodeList[i].dutySpec;
            }
          }
        },
          dclCurrcdTranslate(row, index) {
            let CurrList = this.$store.getters.getCurrList;
            for (let i = 0; i < CurrList.length; i++) {
              if (row.dclCurrcd == CurrList[i].currCode) {
                return CurrList[i].currName;
              }
            }
          },
          dclUnitcdTranslate(row, index) {
            let UnitList = this.$store.getters.getUnitList;
            for (let i = 0; i < UnitList.length; i++) {
              if (row.dclUnitcd == UnitList[i].unit) {
                return UnitList[i].unitName;
              }
            }
          },
          lawfUnitcdTranslate(row, index) {
            let UnitList = this.$store.getters.getUnitList;
            for (let i = 0; i < UnitList.length; i++) {
              if (row.lawfUnitcd == UnitList[i].unit) {
                return UnitList[i].unitName;
              }
            }
          },
          secdLawfUnitcdTranslate(row, index) {
            let UnitList = this.$store.getters.getUnitList;
            for (let i = 0; i < UnitList.length; i++) {
              if (row.secdLawfUnitcd == UnitList[i].unit) {
                return UnitList[i].unitName;
              }
            }
          },
          countryFormatter(row, index) {
            let countryList = this.$store.getters.getCountryList;
            for (let i = 0; i < countryList.length; i++) {
              if (row[index.column] == countryList[i].countryCode) {
                return countryList[i].nameCn;
              }
            }
          },
          lvyrlfModecdFormatter(row, index) {
            let levymodeList = this.$store.getters.getLevymodeList;
            for (let i = 0; i < levymodeList.length; i++) {
              if (row.lvyrlfModecd == levymodeList[i].dutyMode) {
                return levymodeList[i].dutySpec;
              }
            }
          },
          gdsMarkcdFormatter(row, index) {
            if (row.gdsMarkcd == "0") {
              return "非重点商品";
            } else if (row.gdsMarkcd == "1") {
              return "重点商品";
            }
          },
          mtpckEndprdTypecdFormatter(row, index) {
            if (row.mtpckEndprdTypecd == "I") {
              return "料件/半成品";
            } else if (row.mtpckEndprdTypecd == "E") {
              return "成品/残次品";
            } else {
              return "边角料/副产品";
            }
          },
          endprdGdsTypecdFormatter(row, incex) {
            if (row.endprdGdsTypecd == "1") {
              return "成品";
            } else if (row.endprdGdsTypecd == "2") {
              return "残次品";
            } else if (row.endprdGdsTypecd == "3") {
              return "边角料";
            } else if (row.endprdGdsTypecd == "4") {
              return "副产品";
            }
          },
          lvyrlfModecdChange(row, index) {
            if (row.lvyrlfModecd == "1") {
              return "征收";
            } else if (row.lvyrlfModecd == "2") {
              return "免收";
            }
          },
          qtyCntrMarkcdChange(row, index) {
            if (row.qtyCntrMarkcd == "1") {
              return "控制数量";
            } else if (row.qtyCntrMarkcd == "2") {
              return "不控制数量";
            }
          },
          adjmtrMarkcdChange(row, index) {
            if (row.adjmtrMarkcd == "1") {
              return "主料件";
            } else if (row.adjmtrMarkcd == "2") {
              return "辅料件";
            }
          },
          modfMarkcdChange(row, index) {
            if (row.modfMarkcd == "0") {
              return "未修改";
            } else if (row.modfMarkcd == "1") {
              return "修改";
            } else if (row.modfMarkcd == "2") {
              return "删除";
            } else if (row.modfMarkcd == "3") {
              return "增加";
            }
          },
          etpsExeMarkcdChange(row, index) {
            if (row.etpsExeMarkcd == "1") {
              return "运行";
            } else if (row.etpsExeMarkcd == "2") {
              return "停用";
            }
          },
          cusmExeMarkcdChange(row, index) {
            if (row.cusmExeMarkcd == "1") {
              return "正常执行";
            } else if (row.cusmExeMarkcd == "2") {
              return "恢复执行";
            } else if (row.cusmExeMarkcd == "3") {
              return "暂停变更";
            } else if (row.cusmExeMarkcd == "4") {
              return "暂停进出口";
            } else if (row.cusmExeMarkcd == "5") {
              return "暂停进口";
            } else if (row.cusmExeMarkcd == "6") {
              return "暂停出口";
            } else if (row.cusmExeMarkcd == "7") {
              return "全部暂停";
            }
          },
          ucnsTqsnFlagChange(row, index) {
            if (row.ucnsTqsnFlag == "0") {
              return "不质疑";
            } else if (row.ucnsTqsnFlag == "1") {
              return "质疑";
            }
          },
          csttnFlagChange(row, index) {
            if (row.csttnFlag == "0") {
              return "未磋商";
            } else if (row.csttnFlag == "1") {
              return "磋商";
            }
          },

         
  },
  
}

export default mixin