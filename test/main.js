import Vue from 'vue'
import App from './App.vue'
import router from './routers/index'
import store from './store'
import 'packages/theme-default/index.scss'
import ClUi from 'main/index.js'
import './assets/common.scss'

import CodeWrap from './components/code-wrap.vue'
Vue.component('code-wrap', CodeWrap);


// 导入代码高亮插件
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript);
import 'highlight.js/styles/github.css';
import './assets/highlight.scss'
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code:not(.hljs)');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
});

// 复制插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);


Vue.config.productionTip = false

Vue.use(ClUi);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
