import { findComponent } from '../utils/tool';

function trigger(componentName, eventName, params) {
  if (!this.$children) return;
  this.$children.forEach(item => {
    const name = item.componentName;
    if (name === componentName) {
      // TODO 如果是空数据emit的是undefined
      item.$emit.apply(item, [eventName].concat([params]));
    } else {
      trigger.apply(item, [componentName, eventName].concat([params]))
    }
  })
}

export default {
  methods: {
    parentEmit(componentName, eventName, params) {
      const parent = findComponent(this, componentName);
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat([params]))
      }
    },
    childrenEmit(componentName, eventName, params) {
      trigger.call(this, componentName, eventName, params)
    }
  }
}
