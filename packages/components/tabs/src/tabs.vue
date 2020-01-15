<template>
    <div class="cl-tabs"
         :class="[
            size && `cl-tabs--${size}`,
            type && `cl-tabs--${type}`,
            align && `cl-tabs--${align}`,
            border && `cl-tabs--border`,
         ]">
        <div :class="[
            'cl-tabs__header',
        ]">
            <div class="cl-tabs__nav-wrap">
                <cl-scroll size="small" :scrollOption="scrollOption">
                    <div class="cl-tabs__nav">
                        <div :class="[
                                'cl-tabs__nav-item-wrap',
                                activeTabIndex === item.index && 'cl-tabs__nav-item-active',
                                item.disabled && 'cl-tabs__nav-item-disabled',
                             ]"
                             v-for="item in labelList"
                             :key="item.cKey"
                             @mouseenter="navItemMouseEnter(item)"
                             @mouseleave="navItemMouseLeave(item)"
                             @click="tabClick(item)">
                            <div class="cl-tabs__nav-item"
                                 :style="navItemStyle(item)">
                                <div class="cl-tabs__nav-item-name" v-html="item.label"></div>
                                <i v-if="closable" class="cl-tabs__close cl-icon-close" @click.stop="close(item)"></i>
                            </div>
                        </div>
                    </div>
                </cl-scroll>
            </div>
            <div class="cl-tabs__extra" v-if="align !== 'center'">
                <slot name="extra"></slot>
            </div>
        </div>
        <div class="cl-tabs__wrap">
            <div ref="tabContent" class="cl-tabs__content" :class="[animation && 'cl-tabs__content-animation']" :style="contentStyle">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import {findComponentDirectChildrens} from "../../../utils/tool";
    import Emitter from '../../../mixins/emitter'

    export default {
        name: "ClTabs",
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
                validator(value){
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
                default(){
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
                componentName: 'ClTabs',
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
            contentStyle(){
                let x = (this.activeTabIndex * 100);
                return {
                    transform: `translateX(${-x}%)`
                }
            },
            navItemStyle(){
                return function(item){
                    let {defaultBackground, activeBackground, defaultColor, activeColor, defaultBorderColor, activeBorderColor} = this.navStyle;
                    let style = {
                        backgroundColor: defaultBackground ? defaultBackground : '',
                        color: defaultColor ? defaultColor : '',
                    };
                    if(this.activeTabIndex === item.index){
                        style = {...style, backgroundColor: activeBackground, color: activeColor}
                    }
                    if(item.hover && !item.disabled){
                        style = {
                            ...style,
                            color: activeColor
                        }
                    }
                    if(this.type === 'card'){
                        if(defaultBorderColor){
                            style = {
                                ...style,
                                borderTopWidth: '2px',
                                borderTopStyle: 'solid',
                                borderTopColor: defaultBorderColor,
                                borderLeftColor: defaultBorderColor,
                                borderRightColor: defaultBorderColor,
                            };
                        }
                        if(this.activeTabIndex === item.index){
                            style = {
                                ...style,
                                borderTopColor: activeBorderColor,
                                borderLeftColor: activeBorderColor,
                                borderRightColor: activeBorderColor,
                            }
                        }
                    }else if(this.type === 'line' && activeBorderColor && this.activeTabIndex === item.index){
                        style = {
                            ...style,
                            borderBottomColor: activeBorderColor,
                        }
                    }
                    return style;
                }
            }
        },
        components: {},
        created() {
        },
        mounted() {
            this.$on('on-update-label-list', () => {
                this.updateLabelList();
            });
        },
        methods: {
            getTabs() {
                const labelList = findComponentDirectChildrens(this, 'ClTabPane');
                labelList.sort((a, b) => {
                    if(a.order && b.order){
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
            updateActiveTabIndex(value){
                let activePane = this.labelList.filter(item=>{
                    return item.cKey === value
                });
                this.activeTabIndex = '';
                if(activePane && activePane.length){
                    this.activeTabIndex = activePane[0].index;
                }else if(this.labelList.length){
                    this.activeTabIndex = this.labelList[0].index;
                }
            },
            tabClick(tabData){
                if(tabData.disabled) return;
                this.activeTabIndex = tabData.index;
                this.$emit('tab-click', tabData.cKey);
            },
            close(tabData){
                this.$refs.tabContent.removeChild(tabData.el.$el);
                tabData.el && tabData.el.$destroy();

                this.updateLabelList();

                this.$emit('tab-remove', tabData.cKey);
            },
            navItemMouseEnter(tabData){
                tabData.hover = true;
            },
            navItemMouseLeave(tabData){
                tabData.hover = false;
            }
        },
        watch: {
            value(newVal){
                this.updateActiveTabIndex(newVal);
            },
            activeTabIndex(newVal){
                let activePane = this.labelList.filter(item=>{
                    return item.index === newVal
                });
                if(activePane && activePane.length){
                    this.$emit('input', activePane[0].cKey)
                }
            }
        }
    }
</script>
