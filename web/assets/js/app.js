// Polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';

import router from './routes';
import { store } from './store';

import VueI18n from 'vue-i18n';
import Notifications from 'vue-notification';

Vue.use(VueI18n);
Vue.use(Notifications);

const messages = {
  en: {
    dashboard: {
      credentials: "Credentials",
      credentials_subtitle: "Your company status",
      office: "Office",
      position: "Position",
      team_leader: "Team leader",
      tasks_for_today: "Tasks for today",
      your_projects: "Your projects",
      your_projects_subtitle: "Trailing 12 months",
      dashboard: "Dashboard",
      project_base: "Project Base",
      employees: "Employees",
      my_statistics: "My statistics"
    },
    translations: {
      cz: "Česky",
      en: "Anglicky"
    },
    login: {
      sign_in: "Sign In",
      sign_in_subtitle: "Use your company email to log into CMS.",
      login: "Login",
    },
    employee: {
      create_new_employee: "Create new employee",
      initial_password: "Initial password",
    },
    common: {
      field_required: "This field is required.",
      reset: "Reset",
      email: "Email",
      password: "Password",
      create: "Create",
      first_name: "First name",
      last_name: "Last Name",
      permission: "Permission",
    }
  },
  cz: {
    dashboard: {
      credentials: "Osobní údaje",
      credentials_subtitle: "Váš status ve firmě",
      office: "Kancelář",
      position: "Pozice",
      team_leader: "Nadřízený",
      tasks_for_today: "Úkoly pro dnešek",
      your_projects: "Vaše projekty",
      your_projects_subtitle: "Posledních 12 měsíců",
      dashboard: "Domů",
      project_base: "Řízení projektů",
      employees: "Zaměstnanci",
      my_statistics: "Moje statistiky"
    },
    translations: {
      cz: "Czech",
      en: "English"
    },
    login: {
      sign_in: "Přihlášení",
      sign_in_subtitle: "Použijte svůj firemní email pro přihlášení do CMS",
      login: "Přihlásit",
    },
    employee: {
      create_new_employee: "Vytvořit nového uživatele",
      initial_password: "Původní heslo",
    },
    common: {
      field_required: "Toto pole je povinné.",
      reset: "Resetovat",
      email: "Email",
      password: "Heslo",
      create: "Vytvořit",
      first_name: "Jméno",
      last_name: "Příjmení",
      permission: "Oprávnění",
    }
  }
};

const i18n = new VueI18n({
  locale: "cz",
  messages
});

Vue.prototype.$LANGUAGES = ["en", "cz"];
Vue.prototype.$PERMISSIONS = ["admin", "manager", "hr", "employee"];

new Vue({
  router,
  vuetify,
  store,
  i18n,
  render: createElement => createElement(App)
}).$mount("#app");
