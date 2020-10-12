
import Config from '../config'
import Views from '../views/views';

const langTypes = Config.langTypes;

const routerGuide = [
    'install',
    'quick-start',
    'i18n',
    'theme',
];

const routerComponents = [
    'button',
    'icon',
    'layout',
    'menu',
    'badge',
    'input',
    'select',
    'checkbox',
    'radio',
    'switch',
    'slider',
    'upload',
    'popover',
    'tooltip',
    'tag',
    'modal',
    'message',
    'progress',
    'alter',
    'card',
    'drawer',
    'notice',
    'table',
    'collapse',
    'grid',
    'tabs',
    'page',
    'list',
    'loading',
    'back-top',
    'affix',
    'date-picker',
    'form',
    'dropdown',
    'time-picker',
    'color',
    'font',
    'time',
    'image',
    'skeleton',
    'cascader',
    'tree',
    'timeline',
    'steps',
    'breadcrumb',
    'divider',
];

const routers = [];

const renderRouter = () => {
    langTypes.forEach(langItem => {
        const guideChildrens = [];
        const componentChildrens = [];
        routerComponents.forEach(routerItem => {
            componentChildrens.push({
                path: `/${langItem}/component/${routerItem}`,
                component: () => import(`../views/docs/${langItem}/${routerItem}.md`)
            })
        })
        routerGuide.forEach(routerItem => {
            guideChildrens.push({
                path: `/${langItem}/guide/${routerItem}`,
                component: () => import(`../views/docs/${langItem}/${routerItem}.md`)
            })
        })

        routers.push({
            path: `/${langItem}/component`,
            component: Views,
            redirect: `/${langItem}/component/color`,
            children: componentChildrens
        })
        routers.push({
            path: `/${langItem}/guide`,
            component: Views,
            redirect: `/${langItem}/guide/install`,
            children: guideChildrens
        })
    })
};
renderRouter();

export default routers
