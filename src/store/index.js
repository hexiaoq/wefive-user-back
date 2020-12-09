import Vue from 'vue'
import Vuex from 'vuex'
import adminModule from "./module/admin";
import goverModule from "./module/gover";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  modules: {
    adminModule: adminModule,
    goverModule: goverModule,
  },

  // 开启严格模式
  // strict: process.env.NODE_ENV !== "production",
});

export default store
