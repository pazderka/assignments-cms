import Vue from 'vue';
import Vuex from 'vuex';
import layoutModule from './modules/layoutModule';
import chartModule from './modules/chartModule';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    layout: layoutModule,
    chart: chartModule,
  }
});