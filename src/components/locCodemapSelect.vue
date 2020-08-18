<template>
  <ep-select 
    ref="select"
    filterable 
    remote 
    v-bind="$attrs"
    v-on="$listeners"
    v-model="selectValue"
    :remote-call="handleRemoteCall"
    @close="getCurrentVal"
    @change="handleChange">
  </ep-select>
</template>

<script>

  export default {
    name: 'locCodeMapSelect',
    props: {
      value: String,
      type: String,
      dataList: Array,
      code: String,
      cName: String
    },

    data() {
      return {
        selectValue: this.value
      }
    },

    computed: {
      sourceMap() {
        return this.dataList.map(item => {
          return {
            value: item[this.code],
            label: `${item[this.cName]} ${item[this.code]}`
          };
        })
      }
    },

    watch: {
      value(val, oldVal) {
        // console.log(`val:${val} oldVal:${oldVal}`)
        this.selectValue = val;
        this.getCurrentVal();
      }
    },

    methods: {
      handleRemoteCall (val, oldVal, callback) {
          
        let type = this.type;

        if (type) {
          this.handleCustom(val==null?'':val, oldVal, callback);
        } else {
          this.handleOther(val==null?'':val, oldVal, callback);
        }
        
      },

      // 关区类型
      handleCustom(val, oldVal, callback) {
        let dataList = this.sourceMap;
        if (val === '') {
          // 默认显示上海海关
          let reg = /^(22)/;
          let valArr = dataList.filter(item => {
            return reg.test(item.value);
          })
          callback.done(valArr)
          return
        }

        let valArr = dataList.filter(item => {
          return item.label.indexOf(val) > -1
        })
        valArr = valArr.slice(0, 19);
        callback.done(valArr)
      },

      // 其他类型
      handleOther(val, oldVal, callback) {
        let dataList = this.sourceMap;
        if (val === '') {
          // 默认显示前20个
          let valArr = dataList.slice(0, 19);
          callback.done(valArr)
          return
        }

        let valArr = dataList.filter(item => {
          return item.label.indexOf(val) > -1
        })
        valArr = valArr.slice(0, 19);
        callback.done(valArr)
      },

      handleChange(value) {
        this.$emit('update:value', this.selectValue)
      },

      getCurrentVal () {
        let value = this.selectValue;
        this.$refs.select.setRemoteValue(value)
        this.$nextTick(() => {
          if (value) {
            this.$refs.select.setActiveToCurrentVal(value, true)
          }
        })
      }
     
    }
  }
</script>
