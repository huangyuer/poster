/**
 * UUMM的部分用户信息
 * 扩展属性请根据系统的不同做修改
 */
const enterprise = {
  state: {
    tradeName: '',
  creditCode:'',
    id:""

  },

  mutations: {
	SETTRADENAME (state, newTradeName) {
      state.tradeName = newTradeName
    },
	SETCREDITCODE (state, newCreditCode){
	  state.creditCode = newCreditCode
  },
  SETIDSECOND(state,newid){
    state.id = newid
  }
  },

  actions: {
    setEnterpriseInfo ({commit}, data) {
      let {
        tradeName,creditCode,id
      } = data
	  commit('SETTRADENAME', tradeName)
    commit('SETCREDITCODE', creditCode)
    commit('SETIDSECOND',id)
    
    }
  }
}

export default enterprise
