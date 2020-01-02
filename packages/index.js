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
import {ClRow, ClCol} from './components/grid'
import {ClTabs, ClTabPane} from './components/tabs'
import ClTree from './components/tree'
import ClPage from './components/page'
import ClList from './components/list'
import ClLoading from './components/loading'
import ClBackTop from './components/back-top'
import ClAffix from './components/affix'
import ClDatePicker from './components/date-picker'
import ClTimePicker from './components/time-picker'
import ClForm from './components/form'
import ClFormItem from './components/form-item'
import ClDropdown from './components/drop-down'

import locale from './locale/index';

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
    ClTree,
    ClPage,
    ClList,
    ClListItem: ClList.item,
    ClListRow: ClList.row,
    ClLoading: ClLoading,
    ClBackTop,
    ClAffix,
    ClDatePicker,
    ClTimePicker,
    ClForm,
    ClFormItem,
    ClDropdown,
    ClDropdownMenu: ClDropdown.Menu,
    ClDropdownItem: ClDropdown.Item,
};

const install = (Vue, opts = {}) => {
    if (install.installed) return;

    locale.use(opts.locale);
    locale.i18n(opts.i18n);

    Object.keys(components).forEach(key => {
        Vue.component(key, components[key])
    });

    directive(Vue);

    Vue.prototype.$Modal = ClModal.$Modal;
    Vue.prototype.$Message = ClMessage;
    Vue.prototype.$Notice = ClNotice;
    Vue.prototype.$Loading = ClLoading.instance;
};

const directive = (Vue) => {
    Vue.directive('loading', ClLoading.directive);
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
    directive(window.Vue);
}

const API = {
    version: '0.0.1',
    locale: locale.use,
    i18n: locale.i18n,
    install,
    ...components
};

export default API;
