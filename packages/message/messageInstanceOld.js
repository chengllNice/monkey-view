
import Vue from 'vue'
import ClMessage from './src/message.vue'

const ClMessageInstance = Vue.extend(ClMessage);
let Instance;
let MessageInstance =  [];
let MessageHeight = 0;

let instanceType = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
  loading: 'loading'
};

let initInstall = () => {
  Instance = new ClMessageInstance({
    el: document.createElement('div')
  });

  document.body.appendChild(Instance.$el);

  return Instance;
};

initInstall();

let topComputed = (top) => {
  let len = MessageInstance.length;
  !MessageHeight && (MessageHeight = document.getElementsByClassName('cl-message')[len - 1].offsetHeight);
  return ((len - 1) * (top + MessageHeight)) + top;
};

let closeAfter = () => {
  MessageInstance.splice(0, 1);
  MessageInstance.forEach((item)=>{
    if(item.visible){
      item.currentTop = item.currentTop - (MessageHeight + item.top);
    }
  });
};

Object.keys(instanceType).forEach(key=>{
  Instance[key] = (options, duration) => {
    MessageInstance.push(initInstall());
    if(typeof options === 'string'){
      options = {
        message: options
      };
      if(duration && duration.toString()){
        options.duration = parseFloat(duration)
      }
    }
    options.type = instanceType[key];
    options.currentTop = topComputed(options.top || 20);
    options.onCloseComputed = closeAfter;
    Object.keys(options).forEach(key_props=>{
      Instance[key_props] = options[key_props];
    });
    Instance.show(true);
    return Instance;
  };
});

export default Instance

