<template>
    <div class="cl-tree-node">
        <div class="cl-tree-node__item" v-for="item in data" :key="item.key">
            <template v-if="item.__visible">
                <div :class="[
                        'cl-tree-node__title',
                        item.__expand && 'is-expand',
                        item.__disabled && 'is-disabled',
                  ]"
                     :style="titleStyle(item)"
                     @click.stop="handleClick(item)">
                    <span v-if="!treeRoot.hideIcon"
                          class="cl-tree-node__expand-icon"
                          @click.stop="handleExpandClick(item)">
                        <i :class="treeRoot.loadingIconClass" v-if="item.__loading"></i>
                        <i :class="treeRoot.expandIconClass" v-else-if="item.__more"></i>
                    </span>
                    <cl-checkbox v-if="parentComponent.showCheckbox"
                                 v-model="item.__checked"
                                 :indeterminate="item.__indeterminate"
                                 :disabled="item.__disabled || item.__disabledCheckbox"
                                 class="cl-tree-node__checkbox"
                                 @click.native.stop
                                 @change="(value) => handleCheckboxChange(value, item)"></cl-checkbox>
                    <div class="cl-tree-node__label">
                        <Render v-bind="renderProps(item)"></Render>
                    </div>
                </div>
                <slide-transition>
                    <cl-tree-node v-if="item.__expand && item.__more" :data="item.children"
                                  :key="item.key"></cl-tree-node>
                </slide-transition>
            </template>
        </div>
    </div>
</template>

<script>
    import SlideTransition from '../../base/slide-transition.vue'
    import Emitter from '../../../mixins/emitter'
    import {findComponent, findComponents} from "../../../utils/tool";
    import Render from './render'

    export default {
        name: "ClTreeNode",
        mixins: [Emitter],
        inject: ['treeRoot'],
        props: {
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            asyncLoading: Boolean,//是否开启异步数据加载
        },
        data() {
            return {
                parentComponent: findComponent(this, 'ClTree'),
            }
        },
        computed: {
            titleStyle() {
                return function (item) {
                    return {
                        paddingLeft: item.__deepIndex * parseFloat(this.treeRoot.indent) + 'px',
                    }
                }
            },
            renderProps(){
                return function (item) {
                    let props = {
                        type: this.parentComponent.renderType,
                        data: this.parentComponent.getDataFromRenderDataByKey(item.key),
                        root: this.parentComponent.renderData,
                    };
                    if(props.type === 'render'){
                        props.renderContent = this.parentComponent.renderContent;
                    }
                    return props
                }
            }
        },
        components: {
            SlideTransition,
            Render
        },
        created() {
        },
        mounted() {

        },
        methods: {
            handleClick(item) {
                if(this.parentComponent.expandClickOnNode){
                    this.handleExpandClick(item);
                }
            },
            handleExpandClick(item){
                if (item.__disabled || item.__loading) return;
                if (this.parentComponent.loadData && !item.last && (!item.children || !item.children.length)) {
                    this.parentComponent.setReduceDataProp(item, '__loading', true);
                    let promise = this.parentComponent.loadData(item);
                    if (typeof promise === 'object' && promise.then) {
                        promise.then((result) => {
                            this.parentComponent.setReduceDataProp(item,'children', result);
                            this.parentComponent.setReduceDataProp(item,'__loading', false);
                        }).catch(e => {
                            this.parentComponent.setReduceDataProp(item,'__loading', false);
                        });
                    }
                }
                this.parentComponent.setReduceDataProp(item,'__expand', !item.__expand, 'node');
            },
            handleCheckboxChange(value, item) {
                if (item.__disabled || item.__disabledCheckbox || !this.parentComponent.showCheckbox) return;
                this.parentComponent.setReduceDataProp(item,'__checked', value, 'node');
            }
        },
    }
</script>
