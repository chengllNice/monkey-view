
import Config from '../config'

const langTypes = Config.langTypes;

const routerTypes = [
    'home',
    'button',
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
    'time-picker'
];

let routers = [];

const renderRouter = () => {
    routerTypes.forEach(routerItem => {
        let routerArr = routerItem.split('-');
        let routerName = 'doc';
        routerArr.forEach(item => {
            let formatName = item.substr(0, 1).toUpperCase() + item.substr(1);
            routerName += formatName;
        });
        langTypes.forEach(langItem => {
            const componentName = routerName + langItem.replace('-','');
            routers.push({
                path: `${langItem}/doc/${routerItem}`,
                name: componentName,
                component: () => import(`../views/docPage/${langItem}/${routerItem}.md`)
            })
        })
    })
};
renderRouter();

export default routers
