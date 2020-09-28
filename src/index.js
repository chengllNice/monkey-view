import Layout from '../packages/layout'
import Menu from '../packages/menu'
import Button from '../packages/button'
import ButtonGroup from '../packages/button-group'
import Checkbox from '../packages/checkbox'
import CheckboxGroup from '../packages/checkbox-group'
import Radio from '../packages/radio'
import RadioGroup from '../packages/radio-group'
import Input from '../packages/input'
import Select from '../packages/select'
import Option from '../packages/option'
import OptionGroup from '../packages/option-group'
import Upload from '../packages/upload'
import Switch from '../packages/switch'
import Slider from '../packages/slider'
import Modal from '../packages/modal'
import Message from '../packages/message'
import Notice from '../packages/notice'
import Popover from '../packages/popover'
import Tooltip from '../packages/tooltip'
import Progress from '../packages/progress'
import Tag from '../packages/tag'
import Badge from '../packages/badge'
import Scroll from '../packages/scroll'
import Alter from '../packages/alert'
import Card from '../packages/card'
import Drawer from '../packages/drawer'
import Table from '../packages/table'
import Collapse from '../packages/collapse'
import {Row, Col} from '../packages/grid'
import {Tabs, TabPane} from '../packages/tabs'
import Tree from '../packages/tree'
import Page from '../packages/page'
import List from '../packages/list'
import Loading from '../packages/loading'
import BackTop from '../packages/back-top'
import Affix from '../packages/affix'
import DatePicker from '../packages/date-picker'
import TimePicker from '../packages/time-picker'
import Form from '../packages/form'
import FormItem from '../packages/form-item'
import Dropdown from '../packages/drop-down'
import Time from '../packages/time'
import Image from '../packages/image'
import Skeleton from '../packages/skeleton'
import Cascader from '../packages/cascader'
import Icon from '../packages/icon'

import locale from './locale/index';

const components = {
    Layout,
    Sider: Layout.Sider,
    Header: Layout.Header,
    Footer: Layout.Footer,
    Content: Layout.Content,
    Menu,
    MenuItem: Menu.MenuItem,
    MenuGroup: Menu.MenuGroup,
    Submenu: Menu.Submenu,
    Button,
    ButtonGroup,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Input,
    Select,
    Option,
    OptionGroup,
    Upload,
    Slider,
    Modal,
    Popover,
    Tooltip,
    Progress,
    Tag,
    Badge,
    Scroll,
    Alter,
    Card,
    Drawer,
    Table,
    Collapse,
    CollapseItem: Collapse.Item,
    Row,
    Col,
    Tabs,
    TabPane,
    Tree,
    Page,
    List,
    ListItem: List.item,
    ListRow: List.row,
    Loading: Loading,
    BackTop,
    Affix,
    DatePicker,
    TimePicker,
    Form,
    FormItem,
    Dropdown,
    DropdownMenu: Dropdown.Menu,
    DropdownItem: Dropdown.Item,
    Time,
    Skeleton,
    SkeletonItem: Skeleton.Item,
    Cascader,
    CascaderPanel: Cascader.panel,
    Icon,
};

const monkeyUI = {
    ...components,
    mButton: Button,
    mCol: Col,
    mContent: Layout.Content,
    mForm: Form,
    mFooter: Layout.Footer,
    mHeader: Layout.Header,
    mInput: Input,
    mMenu: Menu,
    mOption: Option,
    mProgress: Progress,
    mSelect: Select,
    mSwitch: Switch,
    mTable: Table,
    mTime: Time,
    mImage: Image,
};

const install = (Vue, opts = {}) => {
    if (install.installed) return;

    locale.use(opts.locale);
    locale.i18n(opts.i18n);

    Object.keys(monkeyUI).forEach(key => {
        Vue.component(key, monkeyUI[key]);
    });

    directive(Vue);

    Vue.prototype.$MONKEY = {
        size: opts.size || '',
    }

    Vue.prototype.$Modal = Modal.$Modal;
    Vue.prototype.$Message = Message;
    Vue.prototype.$Notice = Notice;
    Vue.prototype.$Loading = Loading.instance;
};

const directive = (Vue) => {
    Vue.directive('loading', Loading.directive);
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
    directive(window.Vue);
}

let API = {
    version: process.env.VERSION,
    locale: locale.use,
    i18n: locale.i18n,
    install,
    Switch,
    Image,
    ...components,
};
export default API;
