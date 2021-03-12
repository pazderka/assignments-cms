import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from 'views/Dashboard';
import ProjectBase from 'views/ProjectBase';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/project-base',
    name: 'Project Base',
    component: ProjectBase
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
