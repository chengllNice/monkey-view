<template>
    <div :class="[
             `${classPrefix}`,
             size && `${classPrefix}--${size}`,
             type && `${classPrefix}--${type}`,
             align && `${classPrefix}--${align}`,
             border && `${classPrefix}--border`,
         ]">
        <div :class="[
            `${classPrefix}__header`
        ]">
            <div :class="[`${classPrefix}__nav-wrap`]">
                <scroll size="small" :scrollOption="scrollOption">
                    <div :class="[`${classPrefix}__nav`]">
                        <div :class="[
                                `${classPrefix}__nav-item-wrap`,
                                activeTabIndex === item.index && `is-active`,
                                item.disabled && `is-disabled`,
                             ]"
                             v-for="item in labelList"
                             :key="item.cKey"
                             @mouseenter="navItemMouseEnter(item)"
                             @mouseleave="navItemMouseLeave(item)"
                             @click="tabClick(item)">
                            <div :class="[`${classPrefix}__nav-item`]"
                                 :style="navItemStyle(item)">
                                <div :class="[`${classPrefix}__nav-item-name`]" v-html="item.label"></div>
                                <Icon v-if="closable"
                                      type="close"
                                      :class="[`${classPrefix}__close`]"
                                      @click.stop="close(item)"></Icon>
                            </div>
                        </div>
                    </div>
                </scroll>
            </div>
            <div :class="[`${classPrefix}__extra`]" v-if="align !== 'center'">
                <slot name="extra"></slot>
            </div>
        </div>
        <div :class="[`${classPrefix}__wrap`]">
            <div ref="tabContent"
                 :class="[
                     `${classPrefix}__content`,
                     animation && `${classPrefix}__content-animation`
                 ]"
                 :style="contentStyle">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import {findComponentDirectChildrens} from "main/utils/tool";
    import Emitter from 'main/mixins/emitter'
    import Scroll from 'packages/scroll'
    import Icon from 'packages/icon'

    export default {
        name: "Tabs",
        mixins: [Emitter],
        props: {
            value: String,
            size: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value);
                }
            },
            type: {
                type: String,
                default: 'line',
                validator(value) {
                    return ['line', 'card'].includes(value);
                }
            },
            closable: Boolean,
            align: {
                type: String,
                default: 'left',
                validator(value) {
                    return ['left', 'center', 'right'].includes(value)
                }
            },
            border: Boolean,//是否需要边框
            navStyle: {
                type: Object,
                default() {
                    return {
                        defaultBackground: '',
                        activeBackground: '',
                        defaultColor: '',
                        activeColor: '',
                        defaultBorderColor: '',
                        activeBorderColor: '',
                    }
                }
            },//自定义nav样式
            animation: {
                type: Boolean,
                default: true
            },//是否需要动画效果
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-tabs',
                componentName: 'Tabs',
                labelList: [],
                activeTabIndex: '',
                scrollOption: {
                    scrollPanel: {
                        scrollingY: false,
                    },
                    bar: {
                        onlyShowBarOnScroll: false,
                    }
                }
            }
        },
        computed: {
            contentStyle() {
                let x = (this.activeTabIndex * 100);
                return {
                    transform: `translateX(${-x}%)`
                }
            },
            navItemStyle() {
                return function (item) {
                    let {defaultBackground, activeBackground, defaultColor, activeColor, defaultBorderColor, activeBorderColor} = this.navStyle;
                    let style = {
                        backgroundColor: defaultBackground ? defaultBackground : '',
                        color: defaultColor ? defaultColor : '',
                    };
                    if (this.activeTabIndex === item.index) {
                        style = {...style, backgroundColor: activeBackground, color: activeColor}
                    }
                    if (item.hover && !item.disabled) {
                        style = {
                            ...style,
                            color: activeColor
                        }
                    }
                    if (this.type === 'card') {
                        if (defaultBorderColor) {
                            style = {
                                ...style,
                                borderTopWidth: '2px',
                                borderTopStyle: 'solid',
                                borderTopColor: defaultBorderColor,
                                borderLeftColor: defaultBorderColor,
                                borderRightColor: defaultBorderColor,
                            };
                        }
                        if (this.activeTabIndex === item.index) {
                            style = {
                                ...style,
                                borderTopColor: activeBorderColor,
                                borderLeftColor: activeBorderColor,
                                borderRightColor: activeBorderColor,
                            }
                        }
                    } else if (this.type === 'line' && activeBorderColor && this.activeTabIndex === item.index) {
                        style = {
                            ...style,
                            borderBottomColor: activeBorderColor,
                        }
                    }
                    return style;
                }
            }
        },
        components: {
            Scroll,
            Icon
        },
        mounted() {
            this.$on('on-update-label-list', () => {
                this.updateLabelList();
            });
        },
        methods: {
            getTabs() {
                const labelList = findComponentDirectChildrens(this, 'TabPane');
                labelList.sort((a, b) => {
                    if (a.order && b.order) {
                        return a.order - b.order
                    }
                });
                return labelList;
            },
            updateLabelList() {
                this.labelList = [];
                this.getTabs().forEach((item, index) => {
                    this.labelList.push({
                        index: index,
                        cKey: item.cKey,
                        label: item.labelValue,
                        disabled: item.disabled,
                        hover: false,
                        el: item
                    });
                });
                this.updateActiveTabIndex(this.value);
            },
            updateActiveTabIndex(value) {
                let activePane = this.labelList.filter(item => {
                    return item.cKey === value
                });
                this.activeTabIndex = '';
                if (activePane && activePane.length) {
                    this.activeTabIndex = activePane[0].index;
                } else if (this.labelList.length) {
                    this.activeTabIndex = this.labelList[0].index;
                }
            },
            tabClick(tabData) {
                if (tabData.disabled) return;
                this.activeTabIndex = tabData.index;
                this.$emit('tab-click', tabData.cKey);
            },
            close(tabData) {
                this.$refs.tabContent.removeChild(tabData.el.$el);
                tabData.el && tabData.el.$destroy();

                this.updateLabelList();

                this.$emit('tab-remove', tabData.cKey);
            },
            navItemMouseEnter(tabData) {
                tabData.hover = true;
            },
            navItemMouseLeave(tabData) {
                tabData.hover = false;
            }
        },
        watch: {
            value(newVal) {
                this.updateActiveTabIndex(newVal);
            },
            activeTabIndex(newVal) {
                let activePane = this.labelList.filter(item => {
                    return item.index === newVal
                });
                if (activePane && activePane.length) {
                    this.$emit('input', activePane[0].cKey)
                }
            }
        }
    }
</script>
