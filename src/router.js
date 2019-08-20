import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ButtonView from './views/ButtonView.vue'
import BadgeView from './views/BadgeView.vue'
import InputView from './views/InputView.vue'
import SelectView from './views/SelectView.vue'
import CheckboxView from './views/CheckboxView.vue'
import RadioView from './views/RadioView.vue'
import SwitchView from './views/SwitchView.vue'
import SliderView from './views/SliderView.vue'
import UploadView from './views/UploadView.vue'
import PopoverView from './views/PopoverView.vue'
import TooltipView from './views/TooltipView.vue'
import TagView from './views/TagView.vue'
import ModalView from './views/ModalView.vue'
import MessageView from './views/MessageView.vue'
import ProgressView from './views/ProgressView.vue'
import AlterView from './views/AlterView.vue'
import CardView from './views/CardView.vue'
import DrawerView from './views/DrawerView.vue'
import NoticeView from './views/NoticeView.vue'
import TableView from './views/TableView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/inputView',
      name: 'inputView',
      component: InputView
    },
    {
      path: '/selectView',
      name: 'selectView',
      component: SelectView
    },
    {
      path: '/buttonView',
      name: 'buttonView',
      component: ButtonView
    },
    {
      path: '/badgeView',
      name: 'badgeView',
      component: BadgeView
    },
    {
      path: '/checkboxView',
      name: 'checkboxView',
      component: CheckboxView
    },
    {
      path: '/radioView',
      name: 'radioView',
      component: RadioView
    },
    {
      path: '/switchView',
      name: 'switchView',
      component: SwitchView
    },
    {
      path: '/sliderView',
      name: 'sliderView',
      component: SliderView
    },
    {
      path: '/uploadView',
      name: 'uploadView',
      component: UploadView
    },
    {
      path: '/popoverView',
      name: 'popoverView',
      component: PopoverView
    },
    {
      path: '/tooltipView',
      name: 'tooltipView',
      component: TooltipView
    },
    {
      path: '/tagView',
      name: 'tagView',
      component: TagView
    },
    {
      path: '/modalView',
      name: 'modalView',
      component: ModalView
    },
    {
      path: '/messageView',
      name: 'messageView',
      component: MessageView
    },
    {
      path: '/noticeView',
      name: 'noticeView',
      component: NoticeView
    },
    {
      path: '/progressView',
      name: 'progressView',
      component: ProgressView
    },
    {
      path: '/alterView',
      name: 'alterView',
      component: AlterView
    },
    {
      path: '/cardView',
      name: 'cardView',
      component: CardView
    },
    {
      path: '/drawerView',
      name: 'drawerView',
      component: DrawerView
    },
    {
      path: '/tableView',
      name: 'tableView',
      component: TableView
    },
  ]
})
