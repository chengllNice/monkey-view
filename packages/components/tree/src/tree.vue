<template>
    <div class="cl-tree">
        <cl-tree-node v-show="!filterLoading" :data="currentData"></cl-tree-node>
        <div class="cl-tree__empty" v-if="isEmpty">{{localEmptyText}}</div>
    </div>
</template>

<script>
    import ClTreeNode from './tree-node'
    import Locale from '../../../mixins/locale'
    import Mixins from './mixins'

    export default {
        name: "ClTree",
        mixins: [Locale, Mixins],
        provide(){
          return {
              treeRoot: this
          }
        },
        props: {
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            //相邻数据节点之间水平缩进大小，单位px
            indent: {
                type: [String, Number],
                default: 16
            },
            //过滤node节点执行的方法 暂时不用
            filterNodeMethods: {
                type: Function,
                default(){
                    return function () {
                        return true
                    }
                }
            },
            //是否默认展开所有数据
            defaultExpandAll: Boolean,
            //隐藏节点前的图标(包括展开收起和加载中的图标)
            hideIcon: Boolean,
            //自定义展开收起图标
            expandIconClass: {
                type: String,
                default: 'cl-icon-right'
            },
            //自定义加载中的图标
            loadingIconClass: {
                type: String,
                default: 'cl-rotate cl-icon-loading'
            },
            //异步加载数据的方法，参数为当前选择项，返回Promise
            loadData: {
                type: Function
            },
            accordion: Boolean,//手风琴模式，开启后每次最多展开一个子菜单
            emptyText: String,
            showCheckbox: Boolean,
            checkStrictly: Boolean,//显示checkbox的情况下是否遵循父子不相关联
            expandKeys: {
                type: Array,
                default() {
                    return [];
                }
            },
            checkedKeys: {
                type: Array,
                default() {
                    return [];
                }
            },
            renderContent: {
                type: Function
            },
            expandClickOnNode: {
                type: Boolean,
                default: true
            },//是否在点击节点的时候收起或展开
        },
        data() {
            return {
                componentName: 'ClTree',
                renderType: 'normal',
                filterLoading: false,//搜索中
            }
        },
        computed: {
            localEmptyText() {
                return this.emptyText ? this.emptyText : this.t('cl.tree.emptyData');
            },
            isEmpty(){
                if(this.currentData && this.currentData.length){
                    let visibleData = this.currentData.filter(item=>{
                        return !!item.__visible
                    });
                    return !visibleData.length;
                }
                return !this.currentData || !this.currentData.length;
            }
        },
        components: {
            ClTreeNode
        },
        created() {
        },
        mounted() {
            this.$nextTick(() => {
                this.setRenderType();
            })
        },
        methods: {
            setRenderType() {
                this.renderType = 'normal';
                if (this.$scopedSlots.default) {
                    this.renderType = 'slot';
                }
                if (this.renderContent) {
                    this.renderType = 'render';
                }
            },

            getExpandNodes(){
                return this.getDataByPropValue('__expand', true).data;
            },
            getCheckedNodes(){
                return this.getDataByPropValue('__checked', true).data;
            },
            getSelectedNodes(){
                return this.getDataByPropValue('__selected', true).data;
            },
            
            filterNodes(value){
                this.filterLoading = true;

                if(!value.trim()){
                    this.reduceData.forEach(item=>{
                        item.__visible = true;
                        item.__expand = true;
                    });
                }else {
                    this.reduceData.forEach(item=>{
                        item.__visible = false;
                        item.__expand = false;
                    });
                    let data = this.getDataByfilterValue(value);
                    data.forEach(item=>{
                        this.setReduceDataProp(item, '__visible', true);
                        this.setReduceDataProp(item, '__expand', true);
                    });
                }

                this.$nextTick(()=>{
                    this.filterLoading = false;
                });
            },

            //提供给上层调用的
            getData(){
                return JSON.parse(JSON.stringify(this.reduceData));
            },

            expandChange(item){
                let expandData = this.getExpandNodes();
                this.$emit('expand-change', expandData, item);
            },
            checkChange(item){
                let checkedData = this.getCheckedNodes();
                this.$emit('check-change', checkedData, item);
            }
        },
    }
</script>
