import devHome from '../views/mainContent/devPage/Home.vue'
import devLayout from '../views/mainContent/devPage/LayoutView.vue'
import devMenu from '../views/mainContent/devPage/MenuView.vue'
import devButton from '../views/mainContent/devPage/ButtonView.vue'
import devBadge from '../views/mainContent/devPage/BadgeView.vue'
import devInput from '../views/mainContent/devPage/InputView.vue'
import devSelect from '../views/mainContent/devPage/SelectView.vue'
import devCheckbox from '../views/mainContent/devPage/CheckboxView.vue'
import devRadio from '../views/mainContent/devPage/RadioView.vue'
import devSwitch from '../views/mainContent/devPage/SwitchView.vue'
import devSlider from '../views/mainContent/devPage/SliderView.vue'
import devUpload from '../views/mainContent/devPage/UploadView.vue'
import devPopover from '../views/mainContent/devPage/PopoverView.vue'
import devTooltip from '../views/mainContent/devPage/TooltipView.vue'
import devTag from '../views/mainContent/devPage/TagView.vue'
import devModal from '../views/mainContent/devPage/ModalView.vue'
import devMessage from '../views/mainContent/devPage/MessageView.vue'
import devProgress from '../views/mainContent/devPage/ProgressView.vue'
import devAlter from '../views/mainContent/devPage/AlterView.vue'
import devCard from '../views/mainContent/devPage/CardView.vue'
import devDrawer from '../views/mainContent/devPage/DrawerView.vue'
import devNotice from '../views/mainContent/devPage/NoticeView.vue'
import devTable from '../views/mainContent/devPage/TableView.vue'
import devCollapse from '../views/mainContent/devPage/CollapseView.vue'
import devGrid from '../views/mainContent/devPage/GridView.vue'
import devTabs from '../views/mainContent/devPage/TabsView.vue'
import devTree from '../views/mainContent/devPage/TreeView.vue'
import devPage from '../views/mainContent/devPage/PageView.vue'
import devList from '../views/mainContent/devPage/ListView.vue'
import devLoading from '../views/mainContent/devPage/LoadingView.vue'
import devBackTop from '../views/mainContent/devPage/BackTopView.vue'
import devAffix from '../views/mainContent/devPage/AffixView.vue'
import devDatePicker from '../views/mainContent/devPage/DatePickerView.vue'
import devTimePicker from '../views/mainContent/devPage/TimePickerView.vue'
import devForm from '../views/mainContent/devPage/FormView.vue'

let routers = [
    {
        path: '/dev/home',
        name: 'devHome',
        component: devHome
    },
    {
        path: '/dev/layout',
        name: 'devLayout',
        component: devLayout
    },
    {
        path: '/dev/menu',
        name: 'devMenu',
        component: devMenu
    },
    {
        path: '/dev/input',
        name: 'devInput',
        component: devInput
    },
    {
        path: '/dev/select',
        name: 'devSelect',
        component: devSelect
    },
    {
        path: '/dev/button',
        name: 'devButton',
        component: devButton
    },
    {
        path: '/dev/badge',
        name: 'devBadge',
        component: devBadge
    },
    {
        path: '/dev/checkbox',
        name: 'devCheckbox',
        component: devCheckbox
    },
    {
        path: '/dev/radio',
        name: 'devRadio',
        component: devRadio
    },
    {
        path: '/dev/switch',
        name: 'devSwitch',
        component: devSwitch
    },
    {
        path: '/dev/slider',
        name: 'devSlider',
        component: devSlider
    },
    {
        path: '/dev/upload',
        name: 'devUpload',
        component: devUpload
    },
    {
        path: '/dev/popover',
        name: 'devPopover',
        component: devPopover
    },
    {
        path: '/dev/tooltip',
        name: 'devTooltip',
        component: devTooltip
    },
    {
        path: '/dev/tag',
        name: 'devTag',
        component: devTag
    },
    {
        path: '/dev/modal',
        name: 'devModal',
        component: devModal
    },
    {
        path: '/dev/message',
        name: 'devMessage',
        component: devMessage
    },
    {
        path: '/dev/notice',
        name: 'devNotice',
        component: devNotice
    },
    {
        path: '/dev/progress',
        name: 'devProgress',
        component: devProgress
    },
    {
        path: '/dev/alter',
        name: 'devAlter',
        component: devAlter
    },
    {
        path: '/dev/card',
        name: 'devCard',
        component: devCard
    },
    {
        path: '/dev/drawer',
        name: 'devDrawer',
        component: devDrawer
    },
    {
        path: '/dev/table',
        name: 'devTable',
        component: devTable
    },
    {
        path: '/dev/collapse',
        name: 'devCollapse',
        component: devCollapse
    },
    {
        path: '/dev/grid',
        name: 'devGrid',
        component: devGrid
    },
    {
        path: '/dev/tabs',
        name: 'devTabs',
        component: devTabs
    },
    {
        path: '/dev/tree',
        name: 'devTree',
        component: devTree
    },
    {
        path: '/dev/page',
        name: 'devPage',
        component: devPage
    },
    {
        path: '/dev/list',
        name: 'devList',
        component: devList
    },
    {
        path: '/dev/loading',
        name: 'devLoading',
        component: devLoading
    },
    {
        path: '/dev/back-top',
        name: 'devBackTop',
        component: devBackTop
    },
    {
        path: '/dev/affix',
        name: 'devAffix',
        component: devAffix
    },
    {
        path: '/dev/date-picker',
        name: 'devDatePicker',
        component: devDatePicker
    },
    {
        path: '/dev/time-picker',
        name: 'devTimePicker',
        component: devTimePicker
    },
    {
        path: '/dev/form',
        name: 'devForm',
        component: devForm
    },
];

export default routers;
