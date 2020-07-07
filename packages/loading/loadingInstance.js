import Vue from 'vue'
import Loading from './src/loading'

const LoadingInstance = Vue.extend(Loading);
let loadingInstance;

// 不可配置项的默认值
let defaultNoConfigOptions = {
    fix: false,
    fullscreen: true,
};

// 可配置项的默认值
let defaultOptions = {
    text: '',
    type: 'default',
    size: 'default',
};

const initInstall = (opts) => {
    loadingInstance = new LoadingInstance({
        el: document.createElement('div'),
    });
    document.body.appendChild(loadingInstance.$el);
    Object.keys(opts).forEach(key => {
        loadingInstance.$props[key] = opts[key];
    });
    loadingInstance.show();
    return loadingInstance;
};

const openLoading = (options) => {
    if(typeof options === 'string'){
        options = {
            text: options
        };
    }
    options = Object.assign({}, defaultOptions, options, defaultNoConfigOptions);
    let defaultKeys = Object.keys({...defaultOptions, ...defaultNoConfigOptions});
    Object.keys(options).forEach(key=>{
        if(!defaultKeys.includes(key)) delete options[key]
    });
    return initInstall(options);
};

const closeLoading = () => {
    loadingInstance.close();
};

export default {
    open(options){
        return openLoading(options);
    },
    close(){
        return closeLoading();
    }
};
