<template>
    <div :class="[
        `${classPrefix}`,
        menuComponent.theme && `${classPrefix}--${menuComponent.theme}`,
        menuComponent.mode && `${classPrefix}--${menuComponent.mode}`,
        ]">
        <div :class="[`${classPrefix}__title`]" :style="groupStyle">
            <slot name="title">{{name}}</slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import {findComponent, findComponents} from 'main/utils/tool'

    export default {
        name: "MenuGroup",
        props: {
            name: String,
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-menu-group',
                componentName: 'MenuGroup',
                menuComponent: findComponent(this, 'Menu'),
                parentSubMenuComponentNum: findComponents(this, 'Submenu').length,//父级元素有多少个subMenu组件
            }
        },
        computed: {
            groupStyle() {
                let style = {};
                let padding = this.menuComponent.defaultPadding;
                if (this.menuComponent.mode === 'horizontal') {
                    padding = 10;
                    style = {
                        'padding-left': padding + 'px'
                    }
                }else {
                    let _p = (this.parentSubMenuComponentNum * padding + padding / 2);
                    if(_p < padding) _p = padding;
                    let itemHeight = parseInt(this.menuComponent.itemHeight);

                    if(this.menuComponent.collapse) _p = padding - padding / 2;
                    style = {
                        'height': itemHeight + 'px',
                        'line-height': itemHeight + 'px',
                        'padding-left': _p + 'px'
                    }
                }

                return {
                    ...style,
                    'padding-right': padding + 'px'
                }
            }
        },
    }
</script>
