<template>
    <div :class="[`${classPrefix}`]" :style="tabPaneStyle">
        <div v-show="false">
            <slot name="label"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import {findComponent} from "main/utils/tool";
    import Emitter from 'main/mixins/emitter'

    export default {
        name: "TabPane",
        mixins: [Emitter],
        props: {
            label: {
                type: String,
                default: ''
            },
            cKey: {
                type: String,
                required: true
            },
            disabled: Boolean,
            order: Number,//在pane使用v-if时并不会按照预期的顺序进行排序，此时可以使用order属性设置顺序（此值需要大于0并且不可重复）
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-tab-pane',
                componentName: 'TabPane',
                parentTabsComponent: findComponent(this, 'Tabs')
            }
        },
        computed: {
            labelValue() {
                let label = this.label;
                if (this.$slots.label && this.$slots.label[0].elm.outerHTML) {
                    label = this.$slots.label[0].elm.outerHTML;
                }
                return label;
            },
            tabPaneIndex() {
                let currentPane = this.parentTabsComponent.labelList.filter(item => {
                    return item.cKey === this.cKey
                });
                let index = -1;
                if (currentPane && currentPane.length) {
                    index = currentPane[0].index;
                }
                return index
            },
            tabPaneStyle() {
                return {
                    visibility: this.tabPaneIndex === this.parentTabsComponent.activeTabIndex ? 'visible' : 'hidden',
                    order: this.tabPaneIndex
                }
            }
        },
        components: {},
        created() {
        },
        mounted() {
            this.triggerUpdate();
        },
        methods: {
            triggerUpdate() {
                this.$nextTick(() => {
                    this.parentEmit('Tabs', 'on-update-label-list');
                })
            }
        },
        beforeDestroy() {
            this.triggerUpdate();
        }
    }
</script>
