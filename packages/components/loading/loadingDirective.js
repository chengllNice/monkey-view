import Vue from 'vue'
import ClLoading from './src/loading'

const ClLoadingInstance = Vue.extend(ClLoading);
let loadingInstance = [];

// 配置项的默认值
let defaultOptions = {
    fix: true,
    fullscreen: false,
    text: '',
    size: 'default'
};
let defaultSize = ['mini', 'small', 'default', 'large'];

const initInstall = (el, size, text, expression) => {
    let instance = new ClLoadingInstance({
        el: document.createElement('div'),
    });
    loadingInstance.push({
        expression: expression,
        instance,
    });
    el.appendChild(instance.$el);
    let config = JSON.parse(JSON.stringify(defaultOptions));
    if(size){
        config = Object.assign({}, config, {size});
    }
    if(text){
        config = Object.assign({}, config, {text});
    }
    Object.keys(config).forEach(key => {
        instance.$props[key] = config[key];
    });
    return instance;
};


export default {
    bind (el, binding) {

        let value = binding.value;
        let expression = binding.expression;
        let arg = binding.arg ? binding.arg.split(':') : '';
        let size = 'default';
        let text = '';
        if(arg && arg[0] && defaultSize.includes(arg[0])) size = arg[0];
        if(arg && arg[1]) text = arg[1];
        let loading = initInstall(el, size, text, expression);
        value && loading.show();
        !value && loading.close();
    },
    inserted(el, binding){
        let position = window.getComputedStyle && window.getComputedStyle(el,null)['position'];
        position = el.currentStyle && el.currentStyle['position'];
        if(!['relative', 'absolute'].includes(position)) el.style.position = 'relative';
    },
    update (el, binding) {
        let value = binding.value;
        let expression = binding.expression;
        loadingInstance.forEach(item=>{
            if(item.expression === expression){
                value && item.instance.show();
                !value && item.instance.close();
            }
        })
    },
    unbind (el, binding) {
        let expression = binding.expression;
        loadingInstance.forEach((item, index)=>{
            if(item.expression === expression){
                loadingInstance.splice(index,1)
            }
        })
    }
};