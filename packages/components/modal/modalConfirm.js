
import Vue from 'vue'
import ClModalConfirm from './src/modalConfirm.vue'

const ClModalInstance = Vue.extend(ClModalConfirm);
let Instance;

let confirmType = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
  confirm: 'confirm'
};

let initInstall = () => {
  Instance = new ClModalInstance({
    el: document.createElement('div')
  });

  document.body.appendChild(Instance.$el);
};

initInstall();

Object.keys(confirmType).forEach(key=>{
  Instance[key] = (props = {}) => {
    props.icon = props.icon ? props.icon : confirmType[key];
    props.width = props.width ? props.width : 350;
    props.closable = false;
    Object.keys(props).forEach(key_props=>{
      Instance[key_props] = props[key_props];
    });
    Instance.show(true);
  };
});

export default Instance

