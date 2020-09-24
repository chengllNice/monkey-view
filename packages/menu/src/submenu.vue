<template>
    <div :class="[
             `${classPrefix}`,
             opened && `${classPrefix}--opened`,
             menuComponent.theme && `${classPrefix}--${menuComponent.theme}`,
             menuComponent.mode && `${classPrefix}--${menuComponent.mode}`,
             !!menuDirectComponent && `${classPrefix}--direct`,
             disabled && 'is-disabled',
             active && 'is-active',
         ]"
         @mouseenter="handleMouseenter"
         @mouseleave="handleMouseleave">
        <div :class="[`${classPrefix}__title`]" ref="reference" :style="titleStyle" @click.stop="handleClick">
            <slot name="title">
                <Icon v-if="icon" :type="icon" :class="icon"></Icon>
                <span>{{name}}</span>
            </slot>
            <Icon v-if="!hideDropIcon" :type="openedIcon" :style="dropIconStyle" :class="[`${classPrefix}__title-slide-icon`]"></Icon>
        </div>

        <slide-transition>
            <div v-show="verticalTransitionShow"
                 :class="[`${classPrefix}__content`]">
                <slot></slot>
            </div>
        </slide-transition>

        <transition name="slideUp">
            <Drop v-show="dropTransitionShow"
                  ref="dropDown"
                  :reference="this.$refs.reference"
                  :placement="placement"
                  v-model="opened"
                  :render-html="dropRenderHtml"
                  @mouseenter.native="handleMouseenter"
                  @mouseleave.native="handleMouseleave">
                <div :class="[
                    `${classPrefix}__drop-inner`,
                    menuComponent.theme && `${classPrefix}__drop-inner-${menuComponent.theme}`,
                    ]">
                    <slot></slot>
                </div>
            </Drop>
        </transition>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import SlideTransition from '../../base/slide-transition.vue'
    import Icon from 'packages/icon'
    import {findComponent, findComponents, findComponentChildrens, findComponentDirect} from "main/utils/tool";
    import Emitter from 'main/mixins/emitter'
    import Drop from 'packages/base/drop'

    export default {
        name: "Submenu",
        mixins: [Emitter],
        props: {
            cKey: {
                type: String,
                required: true
            },
            name: String,
            icon: String,
            disabled: Boolean,
            hideDropIcon: Boolean,
            forbidden: Boolean,//禁止展开（但不是disabled，不控制样式）
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-submenu',
                componentName: 'Submenu',
                opened: false,
                active: false,
                menuComponent: findComponent(this, 'Menu'),
                menuDirectComponent: findComponentDirect(this, 'Menu'),
                parentSubmenuComponents: findComponents(this, 'Submenu'),
                childrenMenuItemComponents: findComponentChildrens(this, 'MenuItem'),
                parentSubMenuComponentNum: findComponents(this, 'Submenu').length,//父级元素有多少个subMenu组件
                timer: null,
            }
        },
        computed: {
            titleStyle() {
                let style = {};
                let padding = this.menuComponent.defaultPadding;
                if (this.menuComponent.mode === 'horizontal') {
                    if(!this.menuDirectComponent) padding = 10;
                    style = {
                        'padding-left': padding + 'px',
                    }
                    if(this.menuDirectComponent){
                        style = {
                            ...style,
                            'padding-left': padding + 'px',
                            'height': parseInt(this.menuComponent.itemHeight) + 'px',
                            'line-height': parseInt(this.menuComponent.itemHeight) + 'px',
                        }
                    }
                }else {
                    style = {
                        'height': parseInt(this.menuComponent.itemHeight) + 'px',
                        'line-height': parseInt(this.menuComponent.itemHeight) + 'px',
                        'padding-left': ((this.parentSubMenuComponentNum + 1) * padding) + 'px'
                    }
                    if(this.menuComponent.collapse){
                        style = {
                            ...style,
                            'padding-left': padding + 'px'
                        }
                    }
                }
                return {
                    ...style,
                    'padding-right': padding + 'px'
                }
            },
            parentSubmenuComponentkeys() {
                let keys = [];
                this.parentSubmenuComponents.forEach(item => {
                    keys.push(item.cKey)
                });
                return keys;
            },
            openedIcon() {
                if (this.parentSubMenuComponentNum && this.menuComponent.mode === 'horizontal') {
                    return 'left'
                }
                if (this.menuComponent.collapse && this.menuComponent.mode === 'vertical') {
                    return 'left'
                }
                return 'down'
            },
            placement() {
                if (this.parentSubMenuComponentNum || this.menuComponent.mode === 'vertical') {
                    return 'right-start'
                }
                return 'bottom-start'
            },
            dropIconStyle(){
                let padding = this.menuComponent.defaultPadding;
                if (this.menuComponent.mode === 'horizontal' && !this.menuDirectComponent) {
                    padding = 10;
                }
                return {
                    'right': padding + 'px'
                }
            },
            dropRenderHtml(){
                let isParentSubmenu = this.$parent.$parent.componentName === 'Submenu';
                if(this.menuComponent.mode === 'horizontal' && isParentSubmenu) return false;
                if(this.menuComponent.mode === 'vertical' && this.menuComponent.collapse && isParentSubmenu) return false;
                return true;
            },
            verticalTransitionShow(){
                return this.menuComponent.mode === 'vertical' && !this.menuComponent.collapse && this.opened && !this.disabled;
            },
            dropTransitionShow(){
                let mode = this.menuComponent.mode === 'horizontal' || (this.menuComponent.mode === 'vertical' && this.menuComponent.collapse);
                return mode && this.opened && !this.disabled;
            }
        },
        components: {
            SlideTransition,
            Drop,
            Icon
        },
        mounted() {
            this.$on('on-close-dropdown', () => {
                if (this.menuComponent.mode === 'horizontal' || (this.menuComponent.mode === 'vertical' && this.menuComponent.collapse)) {
                    this.opened = false;
                }
            })
        },
        methods: {
            handleMouseenter() {
                if (this.disabled || this.forbidden) return;
                if (this.menuComponent.mode === 'vertical' && !this.menuComponent.collapse) return;

                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.opened = true;
                }, 200);
                this.parentEmit('Menu', 'on-update-opened-key', this.cKey)
            },
            handleMouseleave() {
                if (this.disabled || this.forbidden) return;
                if (this.menuComponent.mode === 'vertical' && !this.menuComponent.collapse) return;

                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.opened = false;
                }, 100);
                this.parentEmit('Menu', 'on-update-opened-key', this.cKey)
            },
            handleClick() {
                if (this.disabled || this.forbidden) return;
                if (this.menuComponent.mode === 'horizontal') return;
                if (this.menuComponent.mode === 'vertical' && this.menuComponent.collapse) return;
                this.closeSubmenuChildren();
                this.opened = !this.opened;
                if (this.menuComponent.accordion) {
                    let openedKeys = [];
                    if (this.opened) {
                        openedKeys = [...this.parentSubmenuComponentkeys, this.cKey]
                    } else {
                        openedKeys = [...this.parentSubmenuComponentkeys]
                    }
                    this.parentEmit('Menu', 'on-update-opened-key', openedKeys)
                } else {
                    this.parentEmit('Menu', 'on-update-opened-key', this.cKey)
                }
            },
            closeSubmenuChildren() {
                //关闭该组件下的所有submenu子组件
                let childrens = findComponentChildrens(this, 'Submenu');
                childrens.forEach(item => {
                    if (item.opened) {
                        this.parentEmit('Menu', 'on-update-opened-key', item.cKey);
                        item.opened = false;
                    }
                })
            },
            menuItemChildrenActive() {
                if (this.disabled || this.forbidden) return;
                let activeChildren = findComponentChildrens(this, 'MenuItem').filter(item => {
                    return item.cKey === this.menuComponent.currentActiveKey
                });
                this.active = !!activeChildren.length;
            },
            forbiddenUpdateOpenKeys(){
                if(this.forbidden){
                    this.opened = false;
                    let openkeys = this.menuComponent && this.menuComponent.openedKeys;
                    if(openkeys.includes(this.cKey)){
                        this.parentEmit('Menu', 'on-update-opened-key', this.cKey)
                    }
                }
            }
        },
        watch: {
            'menuComponent.openedKeys': function (newVal) {
                if (this.disabled || this.forbidden) return;
                this.opened = newVal.includes(this.cKey);
            },
            'menuComponent.currentActiveKey': function () {
                if (this.menuComponent.mode === 'horizontal' || (this.menuComponent.mode === 'vertical' && this.menuComponent.collapse)) {
                    this.menuItemChildrenActive();
                }
            },
            forbidden(newVal) {
                if (newVal) {
                    this.closeSubmenuChildren();
                    this.forbiddenUpdateOpenKeys();
                }
            }
        }
    }
</script>
