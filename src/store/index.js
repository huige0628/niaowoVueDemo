import Vue from 'vue';
import Vuex from 'vuex';

//module
import layout from './module/layout'
import table from './module/table'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    layout,
    table
  }
})
