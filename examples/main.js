import Vue from 'vue'
import App from './app.vue'
import router from './routers/index'
import 'packages/theme-default/index.scss'
import MonkeyUI from 'main/index'
import locale from 'main/locale/lang/zh-CN'
import './assets/common.scss'

import CodeWrap from './components/code-wrap.vue'
import IconList from './components/icon-list.vue'
Vue.component('code-wrap', CodeWrap);
Vue.component('icon-list', IconList);


// 导入代码高亮插件
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import shell from 'highlight.js/lib/languages/shell'
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('shell', shell);
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

Vue.use(MonkeyUI, {
  locale
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
