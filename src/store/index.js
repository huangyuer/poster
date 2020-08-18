import Vue from "vue";
import Vuex from "vuex";
import app from "./models/app";
import user from "./models/user";
import org from "./models/org";
import param from "./models/param";
import enterprise from "./models/enterprise";
import getters from "./getters";
import creditCardReceipt from "./models/creditCardReceipt";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    org,
    param,
    enterprise,
    creditCardReceipt
  },
  getters
});

export default store;
