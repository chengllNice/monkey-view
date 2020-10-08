/*eslint-disable */
import Vue from 'vue';
const isServer = Vue.prototype.$isServer;

export default function (lang) {
    if (!isServer) {
        if (typeof window.MONKEY !== 'undefined') {
            if (!('langs' in MONKEY)) {
                MONKEY.langs = {};
            }
            MONKEY.langs[lang.m.locale] = lang;
        }
    }
}
/*eslint-enable */
