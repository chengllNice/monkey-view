<template>
    <div :class="[
             `${classPrefix}`,
             opened && `${classPrefix}--opened`,
             disabled && 'is-disabled',
             active && 'is-active',
             menuComponent.noHoverBackground && `is-no-hover-background`,
         ]"
         @mouseenter="hanldeMouseenter"
         @mouseleave="hanldeMouseleave">
        <div :class="[`${classPrefix}__title`]" ref="reference" :style="titleStyle" @click.stop="handleClick">
            <slot name="title">
                <Icon v-if="icon" :type="icon" :class="icon"></Icon>
                <span>{{name}}</span>
            </slot>
            <Icon v-if="!hideDropIcon" :type="openedIcon" :style="dropIconStyle" :class="[`${classPrefix}__title-slide-icon`]"></Icon>
        </div>
        <SlideTransition v-if="menuComponent.mode==='vertical'">
            <div v-show="opened"
                 :class="[`${classPrefix}__content`]">
                <slot></slot>
            </div>
        </SlideTransition>

        <transition v-else name="slideUp">
            <Drop v-show="opened && !disabled"
                      ref="dropDown"
                      :reference="this.$refs.reference"
                      :placement="placement"
                      v-model="opened">
                <div :class="[`${classPrefix}__drop-inner`]">
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
                const padding = this.menuComponent.defaultPadding;
                if (this.menuComponent.mode === 'horizontal') {
                    style = {
                        'padding-left': padding + 'px'
                    }
                    if(this.menuDirectComponent){
                        style = {
                            ...style,
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
            childrenMenuItemComponentsKeys() {
                let keys = [];
                this.childrenMenuItemComponents.forEach(item => {
                    keys.push(item.cKey)
                });
                return keys;
            },
            openedIcon() {
                if (this.parentSubMenuComponentNum && this.menuComponent.mode === 'horizontal') {
                    return 'left'
                }
                return 'down'
            },
            placement() {
                if (this.parentSubMenuComponentNum) {
                    return 'right-start'
                }
                return 'bottom-start'
            },
            dropIconStyle(){
                const padding = this.menuComponent.defaultPadding;
                return {
                    'right': (padding + 14) + 'px'
                }
            }
        },
        components: {
            SlideTransition,
            Drop,
            Icon
        },
        created() {
        },
        mounted() {
            this.$on('on-close-dropdown', () => {
                if (this.menuComponent.mode !== 'vertical') {
                    this.opened = false;
                }
            })
        },
        methods: {
            hanldeMouseenter() {
                if (this.disabled || this.forbidden) return;
                if (this.menuComponent.mode === 'vertical') return;

                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.opened = true;
                }, 200);
                this.parentEmit('Menu', 'on-update-opened-key', this.cKey)
            },
            hanldeMouseleave() {
                if (this.disabled || this.forbidden) return;
                if (this.menuComponent.mode === 'vertical') return;

                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.opened = false;
                }, 100);
                this.parentEmit('Menu', 'on-update-opened-key', this.cKey)
            },
            handleClick() {
                if (this.disabled || this.forbidden) return;
                if (this.menuComponent.mode === 'horizontal') return;
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
            menuItemChildrenActive(key) {
                if (this.disabled || this.forbidden) return;
                let activeChildren = findComponentChildrens(this, 'MenuItem').filter(item => {
                    return item.cKey === key
                });
                this.active = activeChildren.length ? true : false;
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
            'menuComponent.currentActiveKey': function (newVal) {
                if (this.menuComponent.mode === 'horizontal') {
                    this.menuItemChildrenActive(newVal);
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
