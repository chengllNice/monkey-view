<template>
    <router-link v-if="to"
                 :class="[
                    `${classPrefix}`,
                    menuComponent.noHoverBackground && `is-no-hover-background`,
                    active && 'is-active',
                    disabled && 'is-disabled',
                 ]"
                 :style="itemStyle"
                 @click.native="handleClick"
                 :to="disabled ? $route.fullPath : to">
        <slot>
            <Icon v-if="icon" :type="icon" :class="icon"></Icon>
            <span>{{name}}</span>
        </slot>
    </router-link>
    <div v-else
         :class="[
            `${classPrefix}`,
            menuComponent.noHoverBackground && `is-no-hover-background`,
            active && 'is-active',
            disabled && 'is-disabled',
         ]"
         :style="itemStyle"
         @click="handleClick">
        <slot>
            <Icon v-if="icon" :type="icon" :class="icon"></Icon>
            <span>{{name}}</span>
        </slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Emitter from 'main/mixins/emitter'
    import {findComponent, findComponents, findComponentDirect} from "main/utils/tool";
    import Icon from 'packages/icon'

    export default {
        name: "MenuItem",
        mixins: [Emitter],
        props: {
            cKey: {
                type: String,
                required: true
            },
            name: String,
            disabled: Boolean,
            icon: String,
            to: {
                type: [Object, String],
                default: ''
            },
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-menu-item',
                componentName: 'MenuItem',
                active: false,
                menuComponent: findComponent(this, 'Menu'),
                menuDirectComponent: findComponentDirect(this, 'Menu'),
                parentSubMenuComponentNum: findComponents(this, 'Submenu').length,//父级元素有多少个subMenu组件
            }
        },
        computed: {
            itemStyle() {
                let style = {};
                const padding = this.menuComponent.defaultPadding;
                let parentElIsGroup = this.$parent.componentName === 'MenuGroup';

                if (this.menuComponent.mode === 'horizontal') {
                    if(parentElIsGroup) style = {'padding-left': (padding * 2) + 'px'}
                    else style = {'padding-left': padding + 'px'}

                    if(this.menuDirectComponent){
                        style = {
                            ...style,
                            'height': parseInt(this.menuComponent.itemHeight) + 'px',
                            'line-height': parseInt(this.menuComponent.itemHeight) + 'px',
                        }
                    }
                }else {
                    let _p = this.parentSubMenuComponentNum * padding;
                    _p = _p + padding;
                    if(parentElIsGroup && !this.parentSubMenuComponentNum) style = {'padding-left': (_p + (padding / 2)) + 'px'}
                    else style = {'padding-left': _p + 'px'}

                    style = {
                        ...style,
                        'height': parseInt(this.menuComponent.itemHeight) + 'px',
                        'line-height': parseInt(this.menuComponent.itemHeight) + 'px',
                    }
                }
                return {
                    ...style,
                    'padding-right': padding + 'px'
                }
            }
        },
        components: {
            Icon
        },
        created() {
        },
        mounted() {

        },
        methods: {
            handleClick() {
                if (this.disabled) return;
                this.parentEmit('Menu', 'on-update-active-key', this.cKey);
                this.parentEmit('Submenu', 'on-close-dropdown');
            },
        },
        watch: {
            'menuComponent.currentActiveKey': function (newVal) {
                this.active = this.cKey === newVal
            }
        }
    }
</script>
