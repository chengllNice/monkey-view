<template>
    <div class="cl-tree">
        <ClTreeNode v-for="item in treeData"
                    :key="item.key"
                    :data="item"
                    :async-loading="asyncLoading"></ClTreeNode>
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
                treeData: this.data,
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

        }
    }
</script>
