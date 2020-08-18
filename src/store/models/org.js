/**
 * UUMM的部分用户信息
 * 扩展属性请根据系统的不同做修改
 */
const org = {
  state: {
        id : '',
        tradeId : '',
        inNo : '',
        bookNo : '',
		    orgType:'',
        customId : '',
        bwsNo:"",
        organizationCode:"",
        organizationName:"",
        creditCode:""
        
  },

  mutations: {
    SETID (state, newId) {
      state.id = newId
    },
    SETTRADEID (state, newTradeId) {
      state.tradeId = newTradeId
    },
    SETINNO (state, newInNo) {
      state.inNo = newInNo
    },
    SETBOOKNO (state, newBookNo) {
      state.bookNo = newBookNo
    },
	SETORGTYPE (state, newOrgType) {
      state.orgType = newOrgType
    },
    SETORGCUSTOMID (state, newCustomId) {
    
      state.customId = newCustomId
    },
    SETBWSNO(state,newbwsno){
      state.bwsNo = newbwsno
    },
    SETORGANIZATIONCODE(state,neworganizationCode){
      state.organizationCode = neworganizationCode
    },
    SETORGANIZATIONNAME(state,neworganizationName){
      state.organizationName = neworganizationName
    },
    STECREDITCODE(state,newcreditCode){
      state.creditCode = newcreditCode
    }
   
  },

  actions: {
    setOrgInfo ({commit}, data) {
      let {
        id, tradeId,  
        inNo, bookNo,orgType, customId,bwsNo,organizationCode,organizationName,creditCode
      } = data
      commit('SETID', id)
      commit('SETTRADEID', tradeId)
      commit('SETINNO', inNo)
      commit('SETBOOKNO', bookNo)
	    commit('SETORGTYPE', orgType)
      commit('SETORGCUSTOMID', customId)
      commit('SETBWSNO',bwsNo)
      commit('SETORGANIZATIONCODE',organizationCode)
      commit('SETORGANIZATIONNAME',organizationName)
      commit('STECREDITCODE',creditCode)
     
    },
    setOrgId ({commit}, data) {
      commit('SETID', data)
    }
  }
}

export default org
