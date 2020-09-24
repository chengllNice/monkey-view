import Vue from 'vue'
import Loading from './src/loading'

const LoadingInstance = Vue.extend(Loading);
let loadingInstance = [];

// 配置项的默认值
let defaultOptions = {
    fix: true,
    fullscreen: false,
    text: '',
    size: 'default'
};
let defaultSize = ['mini', 'small', 'default', 'large'];
let defaultType = ['default', 'loading1', 'loading2', 'loading3', 'loading4', 'loading5'];

const initInstall = (el, type, size, text, expression) => {
    let instance = new LoadingInstance({
        el: document.createElement('div'),
    });
    loadingInstance.push({
        expression: expression,
        instance,
    });
    el.appendChild(instance.$el);
    let config = JSON.parse(JSON.stringify(defaultOptions));
    if(type){
        config = Object.assign({}, config, {type});
    }
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
        let type = '';
        if(arg && arg[0] && defaultType.includes(arg[0])) type = arg[0];
        if(arg && arg[1] && defaultSize.includes(arg[1])) size = arg[1];
        if(arg && arg[2]) text = arg[2];
        let loading = initInstall(el, type, size, text, expression);
        value && loading.show();
        !value && loading.close();
    },
    inserted(el){
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