import Vue from 'vue'
import Router from 'vue-router'
import Views from '../views/Views.vue'


import devRouter from './devRouter'
import docRouter from './docRouter'

let routers = devRouter.concat(docRouter);

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'views',
      component: Views,
      redirect: `/zh-CN/doc/home`,
      children: routers
    },
  ]
})
