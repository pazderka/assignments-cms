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
      my_statistics: "My statistics",
      last_project: "Last project",
      last_project_subtitle: "Last assigned project",
      statistic_base: "Statistic Base"
    },
    project_base: {
      delegated_text: "This project wasnt originally yours, you were delegated to handle it.",
      clear_filters: "Clear Filters",
      export_csv: "Export CSV",
      your_projects: "Your projects",
      global_search: "Global search...",
      add_project: "Add project",
      add_new_project: "Add new project",
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
      first_name: "First name",
      last_name: "Last Name",
      permission: "Permission",
      name: "Name",
      priority: "Priority",
      progress: "Progress",
      deadline: "Deadline",
      impact: "Impact",
      search: "Search",
      assignee: "Assignee",
      description: "Description",
      status: "Status",
      close: "Close",
      submit: "Submit"
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
      my_statistics: "Moje statistiky",
      last_project: "Poslední projekt",
      last_project_subtitle: "Poslední přiřazený projekt",
      statistic_base: "Firemní statistiky"
    },
    project_base: {
      delegated_text: "Tento projekt nebyl původně Váš, byl na Vás delegován.",
      clear_filters: "Vyčistit filtry",
      export_csv: "Export CSV",
      your_projects: "Vaše projekty",
      global_search: "Globální vyhledávání...",
      add_project: "Přidat projekt",
      add_new_project: "Přidat nový projekt",
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
      first_name: "Jméno",
      last_name: "Příjmení",
      permission: "Oprávnění",
      name: "Jméno",
      priority: "Priorita",
      progress: "Postup",
      deadline: "Konečný termín",
      impact: "Ovlivněné oddělení",
      search: "Hledat",
      assignee: "Odpovědná osoba",
      description: "Popis",
      status: "Stav",
      close: "Zavřít",
      submit: "Odeslat"
    }
  }
};

const i18n = new VueI18n({
  locale: localStorage.getItem("lang") || "en",
  messages
});

Vue.prototype.$LANGUAGES = ["en", "cz"];
Vue.prototype.$PERMISSIONS = ["admin", "manager", "hr", "employee"];
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
