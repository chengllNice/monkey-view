<template>
    <div class="cl-tab-pane" :style="tabPaneStyle">
        <div v-show="false">
            <slot name="label"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import {findComponent} from "../../../utils/tool";
    import Emitter from '../../../mixins/emitter'
    export default {
        name: "ClTabPane",
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
            disabled: Boolean
        },
        data() {
            return {
                componentName: 'ClTabPane',
                parentTabsComponent: findComponent(this, 'ClTabs')
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
            tabPaneIndex(){
                let currentPane = this.parentTabsComponent.labelList.filter(item=>{
                    return item.cKey === this.cKey
                });
                let index = -1;
                if(currentPane && currentPane.length){
                    index = currentPane[0].index;
                }
                return index
            },
            tabPaneStyle(){
                return {
                    visibility: this.tabPaneIndex === this.parentTabsComponent.activeTabIndex ? 'visible' : 'hidden'
                }
            }
        },
        components: {},
        created() {
        },
        mounted() {
            this.$nextTick(()=>{
                this.parentEmit('ClTabs', 'on-update-label-list');
            })
        },
        methods: {}
    }
</script>
