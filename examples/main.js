import Vue from 'vue'
import App from './app.vue'
import router from './routers/index'
import MonkeyView from 'main/index'
// import './assets/theme.scss'
import 'main/styles/index.scss'
import './assets/common.scss'
// 复制插件
import VueClipboard from 'vue-clipboard2'
// 导入代码高亮插件
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github.css';
import './assets/highlight.scss'

import CodeWrap from './components/code-wrap.vue'
import IconList from './components/icon-list.vue'

Vue.component('code-wrap', CodeWrap);
Vue.component('icon-list', IconList);

hljs.registerLanguage('javascript', javascript);
Vue.directive('highlight', function (el) {
    const blocks = el.querySelectorAll('pre code:not(.hljs)');
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
});

Vue.use(VueClipboard);
Vue.use(MonkeyView);
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
