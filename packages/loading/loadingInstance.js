import Vue from 'vue'
import Loading from './src/loading'

const extendLoadingInstance = Vue.extend(Loading);
let loadingInstance;

// 不可配置项的默认值
const defaultNoConfigOptions = {
    fix: false,
    fullscreen: true
};

// 可配置项的默认值
const defaultOptions = {
    text: '',
    type: 'default',
    size: 'default'
};

const initInstall = (opts) => {
    // eslint-disable-next-line new-cap
    loadingInstance = new extendLoadingInstance({
        el: document.createElement('div')
    });
    document.body.appendChild(loadingInstance.$el);
    Object.keys(opts).forEach(key => {
        loadingInstance.$props[key] = opts[key];
    });
    loadingInstance.show();
    return loadingInstance;
};

const openLoading = (options) => {
    if (typeof options === 'string') {
        options = {
            text: options
        };
    }
    options = Object.assign({}, defaultOptions, options, defaultNoConfigOptions);
    const defaultKeys = Object.keys({ ...defaultOptions, ...defaultNoConfigOptions });
    Object.keys(options).forEach(key => {
        if (!defaultKeys.includes(key)) delete options[key]
    });
    return initInstall(options);
};

const closeLoading = () => {
    loadingInstance.close();
};

export default {
    open(options) {
        return openLoading(options);
    },
    close() {
        return closeLoading();
    }
};
