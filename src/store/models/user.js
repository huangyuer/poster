/**
 * UUMM的部分用户信息
 * 扩展属性请根据系统的不同做修改
 */
import { post } from 'utils'
const user = {
  state: {
    userId: '',
    orgId: '',
    orgName: '',
    orgCode: '',
    loginId: '',
    userName: '',
    nickName: '',
    tradeCode: '',
    customId: '',
    type: '',
    token: '',
    OrgorgCode: "",
    count:"",
    loginSource:"",
    jumpUrl:""
  },

  mutations: {
    SETUSERALLCOUNT(state,newCount){
      state.count = newCount
    },
    SETUSERID(state, newUserId) {
      state.userId = newUserId
    },
    SETUSERORGID(state, newOrgId) {
      state.orgId = newOrgId
    },
    SETORGNAME(state, newOrgName) {
      state.orgName = newOrgName
    },
    SETORGCODE(state, newOrgCode) {
      state.orgCode = newOrgCode
    },
    SETLOGINID(state, newLoginId) {
      state.loginId = newLoginId
    },
    SETUSERNAME(state, newUsername) {
      state.userName = newUsername
    },
    SETNICKNAME(state, newNickname) {
      state.nickName = newNickname
    },
    SETTRADECODE(state, newTradeCode) {
      state.tradeCode = newTradeCode
    },
    SETCUSTOMID(state, newCustomId) {
      state.customId = newCustomId
    },
    SETTYPE(state, newType) {
      state.type = newType
    },
    SETTOKEN(state, newToken) {
      state.token = newToken
    },
    SETORGORGCODE(state, newOrgCode) {
      state.OrgorgCode = newOrgCode
    },
    SETLOGINSOURCE(state,newLoginSource){
      state.loginSource = newLoginSource
    },
    SETJUMPURL(state,url){
        state.jumpUrl = url
      }
  },

  actions: {
    setUserInfo({
      commit
    }, data) {
      let {
        userId,
        orgId,
        orgName,
        orgCode,
        userLoginId,
        userName,
        nickName,
        tradeCode,
        customId,
        type,loginSource
      } = data
      commit('SETUSERID', userId)
      commit('SETUSERORGID', orgId)
      commit('SETORGNAME', orgName)
      commit('SETORGCODE', orgCode)
      commit('SETLOGINID', userLoginId)
      commit('SETUSERNAME', userName)
      commit('SETNICKNAME', nickName)
      commit('SETTRADECODE', tradeCode)
      commit('SETCUSTOMID', customId)
      commit('SETTYPE', type)
      commit('SETLOGINSOURCE', loginSource)
    },
    setToken({
      commit
    }, data) {
      commit('SETTOKEN', data)
    },
    setOrgorgCode({
      commit
    }, data) {
      commit('SETORGORGCODE', data)
    },
    setuserallcount({
      commit,
      state
    }){
      post("findUnreadMsg",{userId:state.userId}).then(res=>{
        commit("SETUSERALLCOUNT",res.map.data.totalElements)
      })
      
    },
    setJumpUrl ({commit}, url) {
        commit('SETJUMPURL', url)
      },



  }
}

export default user
