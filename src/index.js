import ClLayout from '../packages/layout'
import ClMenu from '../packages/menu'
import ClButton from '../packages/button'
import ClButtonGroup from '../packages/button-group'
import ClCheckbox from '../packages/checkbox'
import ClCheckboxGroup from '../packages/checkbox-group'
import ClRadio from '../packages/radio'
import ClRadioGroup from '../packages/radio-group'
import ClInput from '../packages/input'
import ClSelect from '../packages/select'
import ClOption from '../packages/option'
import ClOptionGroup from '../packages/option-group'
import ClUpload from '../packages/upload'
import ClSwitch from '../packages/switch'
import ClSlider from '../packages/slider'
import ClModal from '../packages/modal'
import ClMessage from '../packages/message'
import ClNotice from '../packages/notice'
import ClPopover from '../packages/popover'
import ClTooltip from '../packages/tooltip'
import ClProgress from '../packages/progress'
import ClTag from '../packages/tag'
import ClBadge from '../packages/badge'
import ClScroll from '../packages/scroll'
import ClAlter from '../packages/alert'
import ClCard from '../packages/card'
import ClDrawer from '../packages/drawer'
import ClTable from '../packages/table'
import ClCollapse from '../packages/collapse'
import {ClRow, ClCol} from '../packages/grid'
import {ClTabs, ClTabPane} from '../packages/tabs'
import ClTree from '../packages/tree'
import ClPage from '../packages/page'
import ClList from '../packages/list'
import ClLoading from '../packages/loading'
import ClBackTop from '../packages/back-top'
import ClAffix from '../packages/affix'
import ClDatePicker from '../packages/date-picker'
import ClTimePicker from '../packages/time-picker'
import ClForm from '../packages/form'
import ClFormItem from '../packages/form-item'
import ClDropdown from '../packages/drop-down'
import ClTime from '../packages/time'
import ClImage from '../packages/image'
import ClSkeleton from '../packages/skeleton'
import ClCascader from '../packages/cascader'

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
    ClTime,
    ClImage,
    ClSkeleton,
    ClSkeletonItem: ClSkeleton.Item,
    ClCascader,
    ClCascaderPanel: ClCascader.panel,
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
