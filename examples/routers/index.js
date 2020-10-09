import Vue from 'vue'
import Router from 'vue-router'
import Views from '../views/views'

import devRouter from './dev-router'
import docRouter from './docs-router'

const routers = devRouter.concat(docRouter);

Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Views,
            redirect: '/zh-CN/guide'
        },
        ...routers
    ]
})
