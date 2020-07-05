<template>
    <div class="cl-tree">
        <cl-tree-node v-show="!filterLoading" :data="currentData"></cl-tree-node>
        <div class="cl-tree__empty" v-if="isEmpty">{{localEmptyText}}</div>
    </div>
</template>

<script>
    import ClTreeNode from './tree-node'
    import Locale from '../../../mixins/locale'
    import Mixin from './mixin'

    export default {
        name: "ClTree",
        mixins: [Locale, Mixin],
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
                reduceData: [],//展开data为一维数组
                parentEmitChangeReduceData: false,//reduceData是否是上层组件触发修改的
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
                let data = this.filterDataByPropValueRemove('__expand', true);
                return this.commonReduceData(data);
            },
            getCheckedNodes(){
                let data = this.filterDataByPropValueRemove('__checked', true);
                return this.commonReduceData(data);
            },
            getSelectedNodes(){
                let data = this.filterDataByPropValueRemove('__selected', true);
                return this.commonReduceData(data);
            },
            
            filterNodes(value){
                this.filterLoading = true;
                if(!value) {
                    this.setVisibleValue(true);
                    // this.currentData = this.setVisibleValue(true);
                }else{
                    let deepData = this.filterDataByPropValue('__pathLabel', value, 'includes');
                    this.setVisibleValue(false);
                    deepData.forEach(item=>{
                        this.setData('__visible', item, true);
                        this.setData('__expand', item, true);
                    });
                }
                this.$nextTick(()=>{
                    this.filterLoading = false;
                });

                let data = this.filterDataByPropValueRemove('__visible', true);
                return this.commonReduceData(data);
            },

            //指定数据展开成一维数组
            commonReduceData(data){
                let deepData = JSON.parse(JSON.stringify(data));
                let fn = (data) => {
                    if(!data || !data.length) return [];
                    return data.reduce((r,item)=>{
                        // this.deleteProp(item);
                        return r.concat(item).concat(fn(item.children))
                    },[])
                };
                return fn(deepData);
            },

            //currentData展开成一维数组
            setReduceData(data){
                if(JSON.stringify(data) === JSON.stringify(this.currentData)) return;
                this.reduceData = this.commonReduceData(data || this.currentData);
            },

            getReduceData(){
                return JSON.parse(JSON.stringify(this.reduceData));
            },

            getFromReduceDataByKey(key){
                for (let i = 0; i < this.reduceData.length; i++){
                    if(this.reduceData[i].key === key){
                        return this.reduceData[i]
                    }
                }
            },

            //聚合reduceData
            aggregationReduceData(){
                let reduceData = JSON.parse(JSON.stringify(this.reduceData));
                let result = [];
                reduceData.forEach(item=>{
                    if(!item.parentKey) result.push(item);
                })
                return result;
            }
        },
        watch: {
            data: {
                handler(){
                    this.initData();
                },
                deep: true,
                immediate: true
            },
            reduceData: {
                handler(){
                   let result = this.aggregationReduceData();
                    this.initData(result);
                },
                deep: true
            }
        }
    }
</script>
