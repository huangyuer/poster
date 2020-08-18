const creditCardReceipt = {
  state: {
    rltTbTypecdStatus: "", //表头关联单证类型
    ioTypecdStatus: "", //表头 进出标志
    inExpTypeStatus: "", //ERP/WMS出入库类型
    bindTypecdStatus: "", //表头绑定类型
    clearData: "", // 出入库类型改变，清空 数据
    // 修改页面
    rltTbTypecdStatusEdit: "", //表头关联单证类型
    ioTypecdStatusEdit: "", //表头 进出标志
    inExpTypeStatusEdit: "", //ERP/WMS出入库类型
    bindTypecdStatusEdit: "", //表头绑定类型
    clearDataEdit: "",
  },

  mutations: {
    SET_RLTTBTYPECDSTATUS(state, newState) {
      state.rltTbTypecdStatus = newState;
    },
    SET_IOTYPECDSTATUS(state, newState) {
      state.ioTypecdStatus = newState;
    },
    SET_INEXPTYPE(state, newState) {
      state.inExpTypeStatus = newState;
    },
    SET_BINDTYPECD(state, newState) {
      state.bindTypecdStatus = newState;
    },
    // 修改页面
    SET_RLTTBTYPECDSTATUS_EDIT(state, newState) {
      state.rltTbTypecdStatusEdit = newState;
    },
    SET_IOTYPECDSTATUS_EDIT(state, newState) {
      state.ioTypecdStatusEdit = newState;
    },
    SET_INEXPTYPE_EDIT(state, newState) {
      state.inExpTypeStatusEdit = newState;
    },
    SET_BINDTYPECD_EDIT(state, newState) {
      state.bindTypecdStatusEdit = newState;
    },

    SET_CLEARDATA(state, newState) {
      state.clearData = newState;
    },
    SET_CLEARDATA_EDIT(state, newState) {
      state.clearDataEdit = newState;
    },
  },

  actions: {
    changeRltTbTypecdStatus({ commit }, newState) {
      commit("SET_RLTTBTYPECDSTATUS", newState);
    },
    changeIoTypecdStatus({ commit }, newState) {
      commit("SET_IOTYPECDSTATUS", newState);
    },
    changeinExpType({ commit }, newState) {
      commit("SET_INEXPTYPE", newState);
    },
    changeBindTypecd({ commit }, newState) {
      commit("SET_BINDTYPECD", newState);
    },
    // 修改页面
    changeRltTbTypecdStatusEdit({ commit }, newState) {
      commit("SET_RLTTBTYPECDSTATUS_EDIT", newState);
    },
    changeIoTypecdStatusEdit({ commit }, newState) {
      commit("SET_IOTYPECDSTATUS_EDIT", newState);
    },
    changeinExpTypeEdit({ commit }, newState) {
      commit("SET_INEXPTYPE_EDIT", newState);
    },
    changeBindTypecdEdit({ commit }, newState) {
      commit("SET_BINDTYPECD_EDIT", newState);
    },
    changeClearData({ commit }, newState) {
      commit("SET_CLEARDATA", newState);
    },
    changeClearDataEdit({ commit }, newState) {
      commit("SET_CLEARDATA_EDIT", newState);
    },
  },
};

export default creditCardReceipt;
