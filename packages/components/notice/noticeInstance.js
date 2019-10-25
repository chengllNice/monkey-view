import Vue from 'vue'
import ClNotice from './src/notice'

const ClNoticeInstance = Vue.extend(ClNotice);
let NoticeInstance =  [];
let NoticeHeight = 0;

const defaultOptions = {
    type: 'open',
    isOnlyTitle: false,
    title: '',
    content: '',
    duration: 4500,
    currentTop: 85,
    onClose: function () {},
    onCloseComputed: function () {}
};
const instanceType = {
  open: "open",
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
};

const topComputed = (top) => {
    let len = NoticeInstance.length;
    let noticeEl = document.getElementsByClassName('cl-notice');
    if(noticeEl && noticeEl.length){
        !NoticeHeight && (NoticeHeight = noticeEl[len ? (len - 1) : 0].offsetHeight);
        return ((len - 1) * (top + NoticeHeight)) + top;
    }
    return top;
};

const closeAfter = () => {
    NoticeInstance.splice(0, 1);
    NoticeInstance.forEach((item)=>{
        if(item.visible){
            item.currentTop = item.currentTop - (NoticeHeight + item.top);
        }
    });
};

const initInstall = (opts) => {
    let CreateInstance = new ClNoticeInstance({
        el: document.createElement('div'),
    });
    Object.keys(opts).forEach(key=>{
        CreateInstance[key] = opts[key];
        if(key === 'currentTop'){
            CreateInstance[key] = topComputed(opts.currentTop);
        }
        if(key === 'onClose'){
            CreateInstance[key] = closeAfter;
        }
    });
    document.body.appendChild(CreateInstance.$el);
    NoticeInstance.push(CreateInstance);
    CreateInstance.show();
    return CreateInstance;
};



const notice = (type, options) => {
    let opts = Object.assign({}, defaultOptions, options);
    return initInstall(opts);
};

let exportObj = {};

Object.keys(instanceType).forEach(key=>{
    exportObj[key] = (options) => {
        options = Object.assign({}, options, {type: key, isOnlyTitle: !options.content});
        return notice(key, options);
    }
});

export default exportObj;