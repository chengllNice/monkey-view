<template>
    <div :class="[`${classPrefix}`]">
        <div :class="[`${classPrefix}__item`]" v-for="item in data" :key="item.key">
            <template v-if="item.__visible">
                <div :class="[
                        `${classPrefix}__title`,
                        item.__expand && 'is-expand',
                        item.__disabled && 'is-disabled',
                  ]"
                     :style="titleStyle(item)"
                     @click.stop="handleClick(item)">
                    <span v-if="!treeRoot.hideIcon"
                          :class="[`${classPrefix}__expand-icon`]"
                          @click.stop="handleExpandClick(item)">
                        <Icon :type="treeRoot.loadingIconClass"
                              :class="[treeRoot.loadingIconClass, `animation-rotate`]"
                              v-if="item.__loading"></Icon>
                        <Icon :type="treeRoot.expandIconClass"
                              :class="treeRoot.expandIconClass"
                              v-else-if="item.__more"></Icon>
                    </span>
                    <checkbox v-if="parentComponent.showCheckbox"
                              v-model="item.__checked"
                              :indeterminate="item.__indeterminate"
                              :disabled="item.__disabled || item.__disabledCheckbox"
                              :class="[`${classPrefix}__checkbox`]"
                              @click.native.stop
                              @change="(value) => handleCheckboxChange(value, item)"></checkbox>
                    <div :class="[`${classPrefix}__label`]">
                        <Render v-bind="renderProps(item)"></Render>
                    </div>
                </div>
                <slide-transition>
                    <tree-node v-if="item.__expand && item.__more" :data="item.children"
                               :key="item.key"></tree-node>
                </slide-transition>
            </template>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import SlideTransition from '../../base/slide-transition.vue'
    import Emitter from 'main/mixins/emitter'
    import { findComponent } from 'main/utils/tool'
    import Render from './render'
    import Icon from 'packages/icon'
    import Checkbox from 'packages/checkbox'

    export default {
        name: 'TreeNode',
        mixins: [Emitter],
        inject: ['treeRoot'],
        props: {
            data: {
                type: Array,
                default () {
                    return []
                }
            },
            asyncLoading: Boolean// 是否开启异步数据加载
        },
        data () {
            return {
                classPrefix: Config.classPrefix + '-tree-node',
                parentComponent: findComponent(this, 'Tree')
            }
        },
        computed: {
            titleStyle () {
                return function (item) {
                    return {
                        paddingLeft: item.__deepIndex * parseFloat(this.treeRoot.indent) + 'px'
                    }
                }
            },
            renderProps () {
                return function (item) {
                    const props = {
                        type: this.parentComponent.renderType,
                        data: this.parentComponent.getDataFromRenderDataByKey(item.key),
                        root: this.parentComponent.renderData
                    }
                    if (props.type === 'render') {
                        props.renderContent = this.parentComponent.renderContent
                    }
                    return props
                }
            }
        },
        components: {
            SlideTransition,
            Render,
            Icon,
            Checkbox
        },
        methods: {
            handleClick (item) {
                if (this.parentComponent.expandClickOnNode) {
                    this.handleExpandClick(item)
                }
            },
            handleExpandClick (item) {
                if (item.__disabled || item.__loading) return
                if (this.parentComponent.loadData && !item.last && (!item.children || !item.children.length)) {
                    this.parentComponent.setReduceDataProp(item, '__loading', true)
                    const promise = this.parentComponent.loadData(item)
                    if (typeof promise === 'object' && promise.then) {
                        promise.then((result) => {
                            this.parentComponent.setReduceDataProp(item, 'children', result)
                            this.parentComponent.setReduceDataProp(item, '__loading', false)
                        }).catch(e => {
                            console.log(e)
                            this.parentComponent.setReduceDataProp(item, '__loading', false)
                        })
                    }
                }
                this.parentComponent.setReduceDataProp(item, '__expand', !item.__expand, 'node')
            },
            handleCheckboxChange (value, item) {
                if (item.__disabled || item.__disabledCheckbox || !this.parentComponent.showCheckbox) return
                this.parentComponent.setReduceDataProp(item, '__checked', value, 'node')
            }
        }
    }
</script>
