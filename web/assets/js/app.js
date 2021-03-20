// Polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';

import router from './routes';
import { store } from './store';


new Vue({
  router,
  vuetify,
  store,
  render: createElement => createElement(App)
}).$mount("#app");
