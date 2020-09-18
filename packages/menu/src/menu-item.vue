<template>
    <router-link v-if="to"
                 :class="[
                    `${classPrefix}`,
                    !!menuDirectComponent && `${classPrefix}--direct`,
                    menuComponent.theme && `${classPrefix}--${menuComponent.theme}`,
                    menuComponent.mode && `${classPrefix}--${menuComponent.mode}`,
                    active && 'is-active',
                    disabled && 'is-disabled',
                 ]"
                 :style="itemStyle"
                 @click.native="handleClick"
                 :to="disabled ? $route.fullPath : to">
        <Tooltip v-if="!!menuDirectComponent && menuComponent.mode === 'vertical'"
                 :class="[`${classPrefix}__tooltip`]"
                 placement="right"
                 :content="tooltipContent"
                 :disabled="tooltipDisabled"
                 :offset="tooltipOffset"
                 :style="itemStyle"
                 render-html>
            <slot>
                <Icon v-if="icon" :type="icon" :class="icon"></Icon>
                <span>{{name}}</span>
            </slot>
        </Tooltip>
        <template v-else>
            <slot>
                <Icon v-if="icon" :type="icon" :class="icon"></Icon>
                <span>{{name}}</span>
            </slot>
        </template>
    </router-link>
    <div v-else
         :class="[
            `${classPrefix}`,
            !!menuDirectComponent && `${classPrefix}--direct`,
            menuComponent.theme && `${classPrefix}--${menuComponent.theme}`,
            menuComponent.mode && `${classPrefix}--${menuComponent.mode}`,
            active && 'is-active',
            disabled && 'is-disabled',
         ]"
         :style="itemStyle"
         @click="handleClick">
        <Tooltip v-if="!!menuDirectComponent && menuComponent.mode === 'vertical'"
                 :class="[`${classPrefix}__tooltip`]"
                 placement="right"
                 :content="tooltipContent"
                 :disabled="tooltipDisabled"
                 :offset="tooltipOffset"
                 :style="itemStyle"
                 render-html>
            <slot>
                <Icon v-if="icon" :type="icon" :class="icon"></Icon>
                <span>{{name}}</span>
            </slot>
        </Tooltip>
        <template v-else>
            <slot>
                <Icon v-if="icon" :type="icon" :class="icon"></Icon>
                <span>{{name}}</span>
            </slot>
        </template>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Emitter from 'main/mixins/emitter'
    import {findComponent, findComponents, findComponentDirect} from "main/utils/tool";
    import Icon from 'packages/icon'
    import Tooltip from 'packages/tooltip'

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
                tooltipContent: this.name,
            }
        },
        computed: {
            itemStyle() {
                let style = {};
                let padding = this.menuComponent.defaultPadding;
                let parentElIsGroup = this.$parent.componentName === 'MenuGroup';

                if (this.menuComponent.mode === 'horizontal') {
                    if(!this.menuDirectComponent) padding = 10;
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

                    if(this.menuComponent.collapse){
                        style = {
                            'padding-left': padding + 'px'
                        }
                    }

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
            },
            tooltipOffset(){
                let padding = this.menuComponent.defaultPadding;
                return padding + 10
            },
            tooltipDisabled(){
                return this.disabled || !this.menuComponent.collapse
            },
        },
        components: {
            Icon,
            Tooltip
        },
        methods: {
            handleClick() {
                if (this.disabled) return;
                this.parentEmit('Menu', 'on-update-active-key', this.cKey);
                this.parentEmit('Submenu', 'on-close-dropdown');
            },
            getTooltipContent(){
                let menuItem = this.$el;
                let text = menuItem.textContent;
                if(this.name) text = this.name;
                this.tooltipContent = text;
            },

        },
        mounted() {
            this.$nextTick(()=>{
                this.getTooltipContent();
            })
        },
        watch: {
            'menuComponent.currentActiveKey': function (newVal) {
                if(this.disabled) return;
                this.active = this.cKey === newVal;
            }
        }
    }
</script>
