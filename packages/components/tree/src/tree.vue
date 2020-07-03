<template>
    <div class="cl-tree">
        <cl-tree-node :data="treeData"></cl-tree-node>
        <div class="cl-tree__empty" v-if="!treeData.length">{{localEmptyText}}</div>
    </div>
</template>

<script>
    import ClTreeNode from './tree-node'
    import Locale from '../../../mixins/locale'

    export default {
        name: "ClTree",
        mixins: [Locale],
        props: {
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            asyncLoading: Boolean,//是否开启异步数据加载
            asyncLoadingData: {
                type: Function
            },//异步加载数据的方法，有两个参数 第一个参数为当前项数据 第二个参数为callback返回要加载的数据
            accordion: Boolean,//手风琴模式，开启后每次最多展开一个子菜单
            emptyText: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                treeData: [],
                activeKey: '',
                openedKeys: [],
                checkedKeys: [],
            }
        },
        computed: {
            localEmptyText() {
                if(!this.emptyText) return this.t('cl.tree.emptyData');
                return this.emptyText
            }
        },
        components: {
            ClTreeNode
        },
        created() {
        },
        mounted() {
            this.$on('on-update-opened-key', (key) => {
                if (this.accordion) {
                    this.openedKeys = key || [];
                } else {
                    if (this.openedKeys.includes(key)) {
                        let index = this.openedKeys.indexOf(key);
                        this.openedKeys.splice(index, 1)
                    } else {
                        this.openedKeys.push(key);
                    }
                }
                this.$emit('open-change', key, this.openedKeys);
            });
        },
        methods: {
            //深度克隆并给指定data添加初始值
            deepCloneData(data, parentItem){
                if(!data || !data.length) return [];
                let deepData = JSON.parse(JSON.stringify(data));
                let index = 0;
                let fn = (data, parentItem) => {
                    data.forEach((item, i) => {
                        let pathIndex = (parentItem && parentItem.__pathIndex) ? parentItem.__pathIndex + '.' + i : i.toString();
                        let pathLabel = (parentItem && parentItem.__pathLabel) ? parentItem.__pathLabel + ' / ' + item.label : item.label;

                        item.__deepIndex = item.__deepIndex || index.toString();
                        item.__pathIndex = item.__pathIndex || pathIndex;
                        item.__visible = item.__visible || false;//该值控制children的显示
                        item.__disabled = item.disabled || false;
                        item.__more = item.children && item.children.length;
                        item.__loading = false;
                        item.__selected = item.__selected || false;
                        item.__pathLabel = pathLabel || '';


                        if(this.loadData){
                            item.__more = !item.last;
                        }

                        if (item.children && item.children.length) {
                            index++;
                            fn(item.children, item);
                            index--;
                        }
                    });
                };
                fn(deepData, parentItem);
                return deepData;
            },
        },
        watch: {
            data: {
                handler(val){
                    this.treeData = this.deepCloneData(val);
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>
