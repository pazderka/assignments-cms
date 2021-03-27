import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import router from "./routes";
import { store } from "./store";

import VueI18n from "vue-i18n";
import Notifications from "vue-notification";
import { translations } from "./translations";

Vue.use(VueI18n);
Vue.use(Notifications);

const i18n = new VueI18n({
  locale: localStorage.getItem("lang") || "en",
  messages: translations
});

Vue.prototype.$LANGUAGES = ["en", "cz"];
Vue.prototype.$PERMISSIONS = ["manager", "hr", "employee"];
Vue.prototype.$OFFICES = ["Prague", "London", "Bucharest", "Los Angeles"];
Vue.prototype.$MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
Vue.prototype.$STATUSES = ["New", "In Progress", "Completed"];
Vue.prototype.$PRIORITIES = ["High", "Medium", "Low"];
Vue.prototype.$DEPARTMENTS = ["IT", "HR", "MKT"];

new Vue({
  router,
  vuetify,
  store,
  i18n,
  render: createElement => createElement(App)
}).$mount("#app");
