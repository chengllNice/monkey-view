
import Vue from 'vue'
import ModalConfirm from './src/modalConfirm.vue'

const ModalInstance = Vue.extend(ModalConfirm);
const exportObj = {};
let ModalInstances = [];

const confirmType = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
  confirm: 'confirm'
};

// 可配置项的默认值
const defaultOptions = {
  title: '',
  width: 350,
  closable: false,
  loading: false,
  okText: '',
  cancelText: '',
  type: ''
};

const initInstall = (opts) => {
  const Instance = new ModalInstance({
    el: document.createElement('div')
  });
  document.body.appendChild(Instance.$el);

  opts.icon = opts.key;
  Object.keys(opts).forEach(props => {
    Instance[props] = opts[props];
  });
  Instance.show(true);
  ModalInstances.push(Instance);
  return Instance;
};

Object.keys(confirmType).forEach(key => {
  exportObj[key] = (props = {}) => {
    const opts = Object.assign({}, defaultOptions, props, { key });
    initInstall(opts);
  };
});

exportObj.remove = () => {
  ModalInstances.forEach(item => {
    item.remove();
  });
  ModalInstances = [];
};

export default exportObj
