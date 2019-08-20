import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'cl-ui/packages/theme-default/index.scss'
import ClUi from 'cl-ui/packages/index.js'

Vue.config.productionTip = false

Vue.use(ClUi);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
