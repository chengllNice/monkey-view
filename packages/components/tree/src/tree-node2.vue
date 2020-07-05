<template>
    <div class="cl-tree-node">
        <div class="cl-tree-node__item" v-for="item in data" :key="item.key">
            <div :class="[
                        'cl-tree-node__title',
                        item.__expand && 'is-expand',
                        item.__disabled && 'is-disabled',
                  ]"
                 :style="titleStyle(item)"
                 @click.stop="handleClick(item)">
                    <span class="cl-tree-node__expand-icon" @click="handleExpandClick(item)">
                        <i class="cl-rotate cl-icon-loading" v-if="item.__loading"></i>
                        <i class="cl-icon-right" v-else-if="item.__more"></i>
                    </span>
                    <cl-checkbox v-if="parentComponent.showCheckbox"
                                 v-model="item.__checked"
                                 :indeterminate="item.__indeterminate"
                                 :disabled="item.__disabled || item.__disabledCheckbox"
                                 class="cl-tree-node__checkbox"
                                 @change="(value) => handleCheckboxChange(value, item)"></cl-checkbox>
                    <div class="cl-tree-node__label">
                        <Render v-bind="renderProps(item)"></Render>
                    </div>
            </div>
            <slide-transition>
                <cl-tree-node v-if="item.__expand && item.__more" :data="item.children"
                              :key="item.key"></cl-tree-node>
            </slide-transition>
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
                        paddingLeft: item.__deepIndex * 20 + 'px',
                    }
                }
            },
            renderProps(){
                return function (item) {
                    let props = {
                        type: this.parentComponent.renderType,
                        data: this.parentComponent.getFromReduceDataByKey(item.key),
                        root: this.parentComponent.reduceData,
                        node: this.parentComponent.currentData,
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
                    console.log('====dddd')
                    this.handleExpandClick(item);
                }
            },
            handleExpandClick(item){
                if (item.__disabled || item.__loading) return;
                if (this.parentComponent.loadData && !item.last && (!item.children || !item.children.length)) {
                    this.parentComponent.setData('__loading', item, true);
                    let promise = this.parentComponent.loadData(item);
                    if (typeof promise === 'object' && promise.then) {
                        promise.then((result) => {
                            this.parentComponent.setData('children', item, result);
                            this.parentComponent.setData('__loading', item, false);
                        }).catch(e => {
                            this.parentComponent.setData('__loading', item, false);
                        });
                    }
                }
                this.parentComponent.setData('__expand', item, !item.__expand);
            },
            handleCheckboxChange(value, item) {
                if (item.__disabled || item.__disabledCheckbox || !this.parentComponent.showCheckbox) return;
                this.parentComponent.setData('__checked', item, value);
            }
        },
    }
</script>
