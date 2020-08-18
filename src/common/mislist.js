import { post, isEmpty, cloneObj } from "utils"

const utils = {
  merge (target, source) {
    for (let key in source) {
      target[key] = source[key]
    }
  },
  trim: function(str) {
    if (typeof str === 'string') {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    return str
  },
  isEmpty: function (obj) {
    if (!obj) { return true }
    if (typeof obj === 'string') {
      return obj === ''
    } else if (obj instanceof Array) {
      return obj.length === 0
    }
    return false
  },
  data2Number (form, arr) {
    if (Array.isArray(arr)) {
      arr.forEach((item) =>　{
        if (form.hasOwnProperty(item)) {
          let number = + form[item]
          form[item] = number || + form[item]
        }
      })
    }
  },


}

function obj2Json(data) {
  let res = []
  data.forEach((item) => {
    res.push(JSON.stringify(item))
  })
  return res
}

function keyCollect (data, pk) {
  let res = []

  data.forEach((item) => {
    res.push(item[pk])
  })
  return res
}

/**
 * 管理信息系统list功能封装
 * 所有列表内按钮方法的命名方式为handle+执行的动作
 * 所有按钮区的方法的命名方式为do+执行的动作
 * 如移除就是doRemove
 * 框架自己封装了一些方法如doAdd, doRemove, doChange
 * 这些关键字不能做定义，否则会发生修改错误
 * 框架统一了data的定义
 *  1、MIS模块的配置在open_setting上
 *  2、ep_data为表格内部数据
 *  3、ep_page为分页数据
 *  4、dom_data内部为dom变化所对应的数据
 *  5、重写created方法的时候需要加一句this.refresh，否则列表数据不会请求
 */
export default {

  computed: {
    showTotal () {
      return '此模块一共有共有' + this.ep_page.totalNum + '条数据'
    }
  },

  methods: {
    doAdd () {
      this.$refs.table.addRow()
    },
    gdecd(){
      this.$post("oneComplex",{gdecd:this.bodyForm.gdecd}).then(res=>{
        this.bodyForm.unit1=res.map.data[0].unit1
         this.bodyFrom.unit2 =
        res.map.data[0].unit2 == '000' ? '' : res.map.data[0].unit2;
      }).catch(e => {
          this.bodyFrom.unit1 = '';
          this.bodyFrom.unit2 = '';
        });
    },
    doDelete () {

	  let vm = this
	  vm.loading = true
	  var delData = {}
	  let ids = []
	  let data = this.selectItems
	  data.forEach(c=>{
		  ids.push(c.id)
	  })
		  delData['delete'] = ids
	  post(vm.deleteData,delData,true)
	  .then((responseData) => {
		 vm.refresh()
        }).catch (e => {
          console.error(e)
          vm.loading = false
        })

    },

    doReset () {
      this.$refs.table.reset()
    },
    doRefresh() {
      this.refresh(false)
    },
    reset(formName) {
      this.$refs[formName].reset()
      // utils.merge(this[formName], this.settings.resetDataObj)
    },
    sigclick () {
      this.ep_data.unshift({ ...this.rowObj })
      this.$refs.table.setCurrentRow(this.ep_data[0])
    },
    getFormData () {
      let formData = {}
      for (let variable in this.searchForm) {
        if (this.searchForm.hasOwnProperty(variable)) {
          let innerVal = this.searchForm[variable]
          if (!utils.isEmpty(innerVal)) {
            formData[variable] = utils.trim(innerVal)
          }
        }
      }
      utils.data2Number(formData, this.settings.isNumber)
      return formData
    },
    searchPost (initPage) {
      this.loading = true
      let formData = this.getFormData()
      if (initPage) {
        formData.size = this.ep_page.size
        formData.page = 1
        this.ep_page.page = 1
      } else {
        formData.size = this.ep_page.size
        formData.page = this.ep_page.page
      }
      let body = formData
      post(this.listApi, body)
      .then((responseData) => {

        let dataRows = this.settings.rowsName || 'rows'
        this.ep_data = responseData.map.data.content
        this.totalcount = responseData.map.data.totalElements
        this.loading = false
        if (this.searchCallback
          && typeof this.searchCallback === 'function') {
          this.searchCallback(responseData)
        }
      }).catch (e => {
        this.loading = false
      })
    },
    refresh(initPage) {
      if (this.$refs.searchForm) {
        this.$refs.searchForm.validate((valid) => {
          if (valid) {
            this.searchPost(initPage)
          }
        })
      } else {
        this.searchPost(initPage)
      }
    },

    handleSelectionChange(val) { this.selectLength = val.length
     this.selectItems = val
	},

    handleSizeChange(val) {
      this.ep_page.size = val
      this.refresh(false)
    },
    handleCurrentChange(val) {
      this.ep_page.page = val
      this.refresh(false)
    },

    //改变每页显示数量时
    handleChangePageSize (size) { this.open_page.showNum = size; this.refresh() },
  },
  // beforeDestroy () {
  //   let data = this.$store.getters.getPageData;
  //   data[this.ep_config.frontPath] = this.$data;
  //   this.$store.dispatch('changePageData', data);
  // },
  //取消焦点
  deactivated() {
    document.body.click()
  }
}
