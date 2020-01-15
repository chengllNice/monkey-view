import Vue from 'vue'
import ClNotice from './src/notice'

const ClNoticeInstance = Vue.extend(ClNotice);
let NoticeInstance = {
    topLeft: [],
    topRight: [],
    bottomLeft: [],
    bottomRight: [],
};

// 不可配置项的默认值
let defaultNoConfigOptions = {
    type: 'open',//值有success error warning info open 默认为open
    isOnlyTitle: false,//是否只有title
    currentPosition: 85,//当前notice距离顶部的top值 或者距离底部的bottom值
    onCloseComputed: function () {},//计算当前notice距离顶部的top值 或者距离底部的bottom值
};

// 提供全局配置的参数
let globalConfigOptions = {
    position: 85,//第一个notice距离顶部或者底部的距离
    noticeItemDis: 10,//每个notice之间的间距
    duration: 4500,//自动关闭的延时
    placement: 'topRight',//出现的位置 topLeft topRight bottomLeft BottomRight 默认topRight
};

// 可配置项的默认值
const defaultOptions = {
    title: '',
    content: '',
    duration: 4500,
    background: false,//是否显示背景色
    onClose: function () {},//关闭的回调
};
const instanceType = {
    open: "open",
    config: "config",
    success: "success",
    error: "error",
    warning: "warning",
    info: "info",
};

const topComputed = () => {
    let placement = globalConfigOptions.placement;
    let len = NoticeInstance[placement].length;
    let firstNoticeDisTop = defaultNoConfigOptions.currentPosition;
    if (len > 1) {
        let NoticeHeight = 0;
        NoticeInstance[placement].forEach(item => {
            NoticeHeight += item.$el.offsetHeight;
        });
        return (len - 1) * globalConfigOptions.noticeItemDis + NoticeHeight + firstNoticeDisTop;
    }
    return firstNoticeDisTop;
};

const closeAfter = (placement) => {
    let currentIndex = NoticeInstance[placement].findIndex(item=>{
       return item.duration !== 0
    });
    let NoticeHeight = currentIndex > -1 ? NoticeInstance[placement][currentIndex].$el.offsetHeight : 0;
    currentIndex > -1 && NoticeInstance[placement].splice(currentIndex, 1);

    currentIndex = currentIndex === -1 ? NoticeInstance[placement].length : currentIndex;

    NoticeInstance[placement].forEach((item, index) => {
        if (item.visible && index >= currentIndex) {
            item.currentPosition = item.currentPosition - (NoticeHeight + globalConfigOptions.noticeItemDis);
        }else if(!item.visible){
            NoticeInstance[placement].splice(index, 1);
        }
    });
};

const initInstall = (opts) => {
    let CreateInstance = new ClNoticeInstance({
        el: document.createElement('div'),
    });
    document.body.appendChild(CreateInstance.$el);
    NoticeInstance[opts.placement].push(CreateInstance);
    Object.keys(opts).forEach(key => {
        if (key === 'currentPosition') {
            CreateInstance[key] = topComputed();
        } else if (key === 'onCloseComputed') {
            CreateInstance[key] = (placement) => closeAfter(placement);
        } else {
            CreateInstance[key] = opts[key];
        }
    });
    CreateInstance.show();
    return CreateInstance;
};


const notice = (type, options) => {
    // 如果单独没有配置duration，则默认按照全局配置生效
    if(!options.hasOwnProperty('duration')){
        options.duration = globalConfigOptions.duration;
    }
    let opts = Object.assign({}, defaultOptions, options, defaultNoConfigOptions, {
        type,
        isOnlyTitle: !options.content,
        placement: globalConfigOptions.placement
    });
    return initInstall(opts);
};

const configGlobal = (options) => {
    globalConfigOptions = Object.assign({}, globalConfigOptions, options);
    defaultNoConfigOptions.currentPosition = globalConfigOptions.position;
};

let exportObj = {};

Object.keys(instanceType).forEach(key => {
    exportObj[key] = (options) => {
        if(key === 'config'){
            return configGlobal(options);
        }
        return notice(key, options);
    }
});

export default exportObj;
