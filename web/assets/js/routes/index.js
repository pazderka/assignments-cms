import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from 'views/Home';
import Projects from 'views/Projects';
import Profile from 'views/Profile';
import Employees from 'views/Employees';
import Statistics from 'views/Statistics';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/project-base',
    name: 'Projects',
    component: Projects
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/employees",
    name: "Employees",
    component: Employees,
  },
  {
    path: "/statistic-base",
    name: "Statistics",
    component: Statistics,
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
