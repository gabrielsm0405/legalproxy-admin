import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from "@/views/Dashboard"
import SignIn from "@/views/SignIn"
import ForgotPassword from '@/views/ForgotPassword'
import ClientList from "@/views/ClientList"
import UserDetails from "@/views/UserDetails"
import CompanyList from "@/views/CompanyList"
import CompanyDetails from "@/views/CompanyDetails"
import HearingList from "@/views/HearingList"
import HearingDetails from "@/views/HearingDetails"
import ProxyList from "@/views/ProxyList"
import ProxyDetails from "@/views/ProxyDetails"
import Questionaries from "@/views/Questionaries"
import Lost from '@/views/Lost'

import store from '../store';

const requireAuthenticated = (to, from, next) => {
  store.dispatch('auth/initialize').then(() => {
    if (!store.getters['auth/isAuthenticated']) {
      next('/signin');
    } else {
      next();
    }
  });
};

const requireUnauthenticated = (to, from, next) => {
  store.dispatch('auth/initialize')
    .then(() => {
      if (store.getters['auth/isAuthenticated']) {
        next('/');
      }
      else{
        next();
      }
    });
};

const redirectSignOut = (to, from, next) => {
  store.dispatch('auth/signout')
  .then(() => next('/signin'));
};

Vue.use(Router)

export default new Router({
    saveScrollPosition: true,
    routes: [
      {
        path: '/',
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: requireAuthenticated
      },
      {
        path: '/signin',
        name: 'SignIn',
        component: SignIn,
        beforeEnter: requireUnauthenticated
      },
      {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        component: ForgotPassword,
        beforeEnter: requireUnauthenticated,
      },
      {
        path: '/signout',
        beforeEnter: redirectSignOut,
      },
      {
        path: '/clientlist',
        name: 'ClientList',
        component: ClientList,
        beforeEnter: requireAuthenticated
      },
      {
        path: '/userdetails/:id',
        name: 'UserDetails',
        component: UserDetails,
        beforeEnter: requireAuthenticated
      },
      {
        path: '/companylist',
        name: 'CompanyList',
        component: CompanyList,
        beforeEnter: requireAuthenticated
      },
      {
        path: '/companydetails/:id',
        name: 'CompanyDetails',
        component: CompanyDetails,
        beforeEnter: requireAuthenticated
      },
      {
        path: '/hearinglist',
        name: 'HearingList',
        component: HearingList,
        beforeEnter: requireAuthenticated
      },
      {
        path: '/hearingdetails',
        name: 'HearingDetails',
        component: HearingDetails,
        beforeEnter: requireAuthenticated
      },
      {
        path: '/proxylist',
        name: 'ProxyList',
        component: ProxyList,
        beforeEnter: requireAuthenticated
      },
      {
        path: '/proxydetails',
        name: 'ProxyDetails',
        component: ProxyDetails,
        beforeEnter: requireAuthenticated
      },
      {
        path: '/questionaries',
        name: 'Questionaries',
        component: Questionaries,
        beforeEnter: requireAuthenticated
      },
      {
        path: '*',
        component: Lost
      },
    ]
  })