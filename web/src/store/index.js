import Vue from "vue";
import Vuex from "vuex";
import { IconsPlugin, BootstrapVue } from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Vuex);
Vue.use(IconsPlugin);
Vue.use(BootstrapVue);


export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
});
