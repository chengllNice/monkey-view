import Vue from 'vue'

import ClLayout from './components/layout'
import ClMenu from './components/menu'
import ClButton from './components/button'
import ClButtonGroup from './components/button-group'
import ClCheckbox from './components/checkbox'
import ClCheckboxGroup from './components/checkbox-group'
import ClRadio from './components/radio'
import ClRadioGroup from './components/radio-group'
import ClInput from './components/input'
import ClSelect from './components/select'
import ClOption from './components/option'
import ClOptionGroup from './components/option-group'
import ClUpload from './components/upload'
import ClSwitch from './components/switch'
import ClSlider from './components/slider'
import ClModal from './components/modal'
import ClMessage from './components/message'
import ClNotice from './components/notice'
import ClPopover from './components/popover'
import ClTooltip from './components/tooltip'
import ClProgress from './components/progress'
import ClTag from './components/tag'
import ClBadge from './components/badge'
import ClScroll from './components/scroll'
import ClAlter from './components/alert'
import ClCard from './components/card'
import ClDrawer from './components/drawer'
import ClTable from './components/table'
import ClCollapse from './components/collapse'
import { ClRow, ClCol} from './components/grid'
import {ClTabs, ClTabPane } from './components/tabs'
const components = {
  ClLayout,
  ClSider: ClLayout.Sider,
  ClHeader: ClLayout.Header,
  ClFooter: ClLayout.Footer,
  ClContent: ClLayout.Content,
  ClMenu,
  ClMenuItem: ClMenu.MenuItem,
  ClMenuGroup: ClMenu.MenuGroup,
  ClSubmenu: ClMenu.Submenu,
  ClButton,
  ClButtonGroup,
  ClCheckbox,
  ClCheckboxGroup,
  ClRadio,
  ClRadioGroup,
  ClInput,
  ClSelect,
  ClOption,
  ClOptionGroup,
  ClUpload,
  ClSwitch,
  ClSlider,
  ClModal,
  ClPopover,
  ClTooltip,
  ClProgress,
  ClTag,
  ClBadge,
  ClScroll,
  ClAlter,
  ClCard,
  ClDrawer,
  ClTable,
  ClCollapse,
  ClCollapseItem: ClCollapse.Item,
  ClRow,
  ClCol,
  ClTabs,
  ClTabPane,
  // ClMessage,
  // ClNotice
};

const install = (Vue) => {
  Object.keys(components).forEach(key=>{
    Vue.component(key, components[key])
  });

  Vue.prototype.$Modal = ClModal.$Modal;
  Vue.prototype.$Message = ClMessage;
  Vue.prototype.$Notice = ClNotice;
};

if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue)
}else{
  install(Vue)
}

export default components;
