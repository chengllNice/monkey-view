import Vue from 'vue'
import Router from 'vue-router'
import Views from '../views/Views.vue'


import docRouter from './docRouter'

let routers = docRouter;

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'views',
      component: Views,
      redirect: `/zh-CN/doc/introduce`,
      children: routers
    },
  ]
})
