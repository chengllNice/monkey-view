import Vue from 'vue'
import Message from './src/message.vue'

const MessageInstance = Vue.extend(Message);
let MessageInstances = [];
let MessageHeight = 0;


// 不可配置项的默认值
let defaultNoConfigOptions = {
    type: 'info',//值有success error warning info loading
    currentPosition: 20,//当前message距离顶部的top值
    messageItemDis: 10,//每个message之间的间距
    onCloseComputed: function () {},//计算当前notice距离顶部的top值
};

// 提供全局配置的参数
let globalConfigOptions = {
    top: 20,//第一个message距离顶部的top值
    duration: 3000,//自动关闭的延时
};

// 可配置项的默认值
const defaultOptions = {
    content: '',
    duration: 3000,
    background: false,//是否有背景色
    closable: true,
    onClose: function () {
    },//关闭的回调
};

let instanceType = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
    loading: 'loading',
    config: 'config'
};

let topComputed = () => {
    let len = MessageInstances.length;
    let firstMessageDisTop = defaultNoConfigOptions.currentPosition;
    if (len > 1) {
        MessageHeight = MessageInstances[len - 2].$el.offsetHeight;
        return (len - 1) * (defaultNoConfigOptions.messageItemDis + MessageHeight) + firstMessageDisTop;
    }
    return firstMessageDisTop;
};

let closeAfter = () => {
    MessageInstances.splice(0, 1);
    MessageInstances.forEach((item) => {
        if (item.visible) {
            item.currentPosition = item.currentPosition - (MessageHeight + defaultNoConfigOptions.messageItemDis);
        }
    });
};


const initInstall = (opts) => {
    let CreateInstance = new MessageInstance({
        el: document.createElement('div'),
    });
    document.body.appendChild(CreateInstance.$el);
    MessageInstances.push(CreateInstance);
    Object.keys(opts).forEach(key => {
        if (key === 'currentPosition') {
            CreateInstance[key] = topComputed();
        } else if (key === 'onCloseComputed') {
            CreateInstance[key] = closeAfter;
        } else {
            CreateInstance[key] = opts[key];
        }
    });
    CreateInstance.show();
    return CreateInstance;
};


const message = (type, options, duration) => {
    if (typeof options === 'string') {
        options = {
            content: options
        };
        if (typeof duration === 'number' && duration.toString()) {
            options.duration = duration;
        }
    }
    // 如果没有单独配置duration，则默认按照全局配置生效
    if (!options.hasOwnProperty('duration')) {
        options.duration = globalConfigOptions.duration;
    }
    let opts = Object.assign({}, defaultOptions, options, defaultNoConfigOptions, {
        type,
    });

    return initInstall(opts);
};

const configGlobal = (options) => {
    globalConfigOptions = Object.assign({}, globalConfigOptions, options);
    defaultNoConfigOptions.currentPosition = globalConfigOptions.top;
};

let exportObj = {};

Object.keys(instanceType).forEach(key => {
    exportObj[key] = (options, duration) => {
        if (key === 'config') {
            return configGlobal(options);
        }
        return message(key, options, duration);
    }
});

export default exportObj;

