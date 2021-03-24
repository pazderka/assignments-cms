import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from 'views/Dashboard';
import ProjectBase from 'views/ProjectBase';
import Profile from 'views/Profile';
import Employees from 'views/Employees';
import axios from "axios";

Vue.use(VueRouter);

import { store } from "../store";

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/project-base',
    name: 'Project Base',
    component: ProjectBase
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
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
