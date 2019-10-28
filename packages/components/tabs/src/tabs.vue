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
            navBackground && 'cl-tabs__header',
        ]">
            <div class="cl-tabs__container">
                <cl-scroll size="small" :scrollOption="scrollOption">
                    <div class="cl-tabs__nav">
                        <div class="cl-tabs__nav-item"
                             :class="[
                                activeTabIndex === item.index && 'cl-tabs__nav-item-active',
                                item.disabled && 'cl-tabs__nav-item-disabled',
                             ]"
                             v-for="item in labelList"
                             :key="item.cKey"
                             :style="navItemStyle"
                             @click="tabClick(item)">
                            <div class="cl-tabs__nav-item-name" v-html="item.label"></div>
                            <i v-if="closable" class="cl-tabs__close cl-icon-close"></i>
                        </div>
                    </div>
                </cl-scroll>
            </div>
            <div class="cl-tabs__extra" v-if="align !== 'center'">
                <slot name="extra"></slot>
            </div>
        </div>
        <div class="cl-tabs__wrap">
            <div class="cl-tabs__content" :class="[animation && 'cl-tabs__content-animation']" :style="contentStyle">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import {findComponentDirectChildrens} from "../../../utils/tool";

    export default {
        name: "ClTabs",
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
            border: Boolean,//pane是否需要边框
            navBackground: {
                type: String,
                default: ''
            },//nav背景色
            navActiveColor: {
                type: String,
                default: ''
            },//nav鼠标hover和active的颜色
            navStyle: {
                type: Object,
                default(){
                    return {
                        background: '',
                        activeColor: '',
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
                return {
                    backgroundColor: this.navBackground ? this.navBackground : '',
                }
            }
        },
        components: {},
        created() {
        },
        mounted() {
            this.updateLabelList();
        },
        methods: {
            getTabs() {
                const labelList = findComponentDirectChildrens(this, 'ClTabPane');
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
                    })
                });
                this.activeTabIndex = this.labelList[0].index;
            },
            tabClick(tabData){
                if(tabData.disabled) return;
                this.activeTabIndex = tabData.index;
            }
        }
    }
</script>
