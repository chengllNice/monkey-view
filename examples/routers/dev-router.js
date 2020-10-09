/* eslint-disable */
const routerComponents = [
    'introduce',
    'install',
    'quick-start',
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
    'time',
    'image',
    'skeleton',
    'cascader',
    'tree',
    'timeline',
];

const routers = [];

const renderRouter = () => {
    routerComponents.forEach(routerItem => {
        routers.push({
            path: `/dev/${routerItem}`,
            component: () => import(`../views/dev/${routerItem}.vue`)
        });
    });
};
renderRouter();

export default routers;
