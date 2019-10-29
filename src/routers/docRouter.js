import Config from '../config'

let env = Config.env;

const docHome = () => import(`../views/mainContent/docPage/${env}/home/home.md`);
const docButton = () => import(`../views/mainContent/docPage/${env}/button/button.md`);
const docLayout = () => import(`../views/mainContent/docPage/${env}/layout/layout.md`);
const docMenu = () => import(`../views/mainContent/docPage/${env}/menu/menu.md`);
const docBadge = () => import(`../views/mainContent/docPage/${env}/badge/badge.md`);
const docInput = () => import(`../views/mainContent/docPage/${env}/input/input.md`);
const docSelect = () => import(`../views/mainContent/docPage/${env}/select/select.md`);
const docCheckbox = () => import(`../views/mainContent/docPage/${env}/checkbox/checkbox.md`);
const docRadio = () => import(`../views/mainContent/docPage/${env}/radio/radio.md`);
const docSwitch = () => import(`../views/mainContent/docPage/${env}/switch/switch.md`);
const docSlider = () => import(`../views/mainContent/docPage/${env}/slider/slider.md`);
const docUpload = () => import(`../views/mainContent/docPage/${env}/upload/upload.md`);
const docPopover = () => import(`../views/mainContent/docPage/${env}/popover/popover.md`);
const docTooltip = () => import(`../views/mainContent/docPage/${env}/tooltip/tooltip.md`);
const docTag = () => import(`../views/mainContent/docPage/${env}/tag/tag.md`);
const docModal = () => import(`../views/mainContent/docPage/${env}/modal/modal.md`);
const docMessage = () => import(`../views/mainContent/docPage/${env}/message/message.md`);
const docProgress = () => import(`../views/mainContent/docPage/${env}/progress/progress.md`);
const docAlter = () => import(`../views/mainContent/docPage/${env}/alter/alter.md`);
const docCard = () => import(`../views/mainContent/docPage/${env}/card/card.md`);
const docDrawer = () => import(`../views/mainContent/docPage/${env}/drawer/drawer.md`);
const docNotice = () => import(`../views/mainContent/docPage/${env}/notice/notice.md`);
const docTable = () => import(`../views/mainContent/docPage/${env}/table/table.md`);
const docCollapse = () => import(`../views/mainContent/docPage/${env}/collapse/collapse.md`);
const docGrid = () => import(`../views/mainContent/docPage/${env}/grid/grid.md`);
const docTabs = () => import(`../views/mainContent/docPage/${env}/tabs/tabs.md`);

let routers = [
    {
        path: `${env}/doc/home`,
        name: 'docHome',
        component: docHome
    },
    {
        path: `${env}/doc/layout`,
        name: 'docLayout',
        component: docLayout
    },
    {
        path: `${env}/doc/menu`,
        name: 'docMenu',
        component: docMenu
    },
    {
        path: `${env}/doc/input`,
        name: 'docInput',
        component: docInput
    },
    {
        path: `${env}/doc/select`,
        name: 'docSelect',
        component: docSelect
    },
    {
        path: `${env}/doc/button`,
        name: 'docButton',
        component: docButton
    },
    {
        path: `${env}/doc/badge`,
        name: 'docBadge',
        component: docBadge
    },
    {
        path: `${env}/doc/checkbox`,
        name: 'docCheckbox',
        component: docCheckbox
    },
    {
        path: `${env}/doc/radio`,
        name: 'docRadio',
        component: docRadio
    },
    {
        path: `${env}/doc/switch`,
        name: 'docSwitch',
        component: docSwitch
    },
    {
        path: `${env}/doc/slider`,
        name: 'docSlider',
        component: docSlider
    },
    {
        path: `${env}/doc/upload`,
        name: 'docUpload',
        component: docUpload
    },
    {
        path: `${env}/doc/popover`,
        name: 'docPopover',
        component: docPopover
    },
    {
        path: `${env}/doc/tooltip`,
        name: 'docTooltip',
        component: docTooltip
    },
    {
        path: `${env}/doc/tag`,
        name: 'docTag',
        component: docTag
    },
    {
        path: `${env}/doc/modal`,
        name: 'docModal',
        component: docModal
    },
    {
        path: `${env}/doc/message`,
        name: 'docMessage',
        component: docMessage
    },
    {
        path: `${env}/doc/notice`,
        name: 'docNotice',
        component: docNotice
    },
    {
        path: `${env}/doc/progress`,
        name: 'docProgress',
        component: docProgress
    },
    {
        path: `${env}/doc/alter`,
        name: 'docAlter',
        component: docAlter
    },
    {
        path: `${env}/doc/card`,
        name: 'docCard',
        component: docCard
    },
    {
        path: `${env}/doc/drawer`,
        name: 'docDrawer',
        component: docDrawer
    },
    {
        path: `${env}/doc/table`,
        name: 'docTable',
        component: docTable
    },
    {
        path: `${env}/doc/collapse`,
        name: 'docCollapse',
        component: docCollapse
    },
    {
        path: `${env}/doc/grid`,
        name: 'docGrid',
        component: docGrid
    },
    {
        path: `${env}/doc/tabs`,
        name: 'docTabs',
        component: docTabs
    },
];

export default routers
