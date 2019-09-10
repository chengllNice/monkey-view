import Vue from 'vue'
import Config from '../config'
import Router from 'vue-router'
import Views from '../views/Views.vue'


import devRouter from './devRouter'
import docRouter from './docRouter'

let routers = devRouter.concat(docRouter);

Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'views',
      component: Views,
      redirect: `${Config.env}/doc/home`,
      children: routers
    },
  ]
})
