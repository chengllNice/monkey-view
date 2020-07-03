<template>
    <div class="cl-tree-node">
        <div class="cl-tree-node__item" v-for="item in data" :key="item.key" @click="handleClick(item)">
            <slide-transition>
                <div class="cl-tree-node__title">
                    <i class="cl-tree-node__expand-icon cl-icon-right"></i>
                    <span class="cl-tree-node__label">{{item.label}}</span>
                </div>
            </slide-transition>
            <template v-if="item.children && item.children.length">
                <cl-tree-node :data="item.children" :key="item.key"></cl-tree-node>
            </template>
        </div>

<!--        <template v-for="item in data" >-->
<!--            <template v-if="item.children && item.children.length">-->
<!--                <cl-tree-node :data="item.children" :key="item.key"></cl-tree-node>-->
<!--            </template>-->
<!--        </template>-->
    </div>
</template>

<script>
    import SlideTransition from '../../base/slide-transition.vue'
    import Emitter from '../../../mixins/emitter'
    import {findComponent, findComponents} from "../../../utils/tool";

    export default {
        name: "ClTreeNode",
        mixins: [Emitter],
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
            return {}
        },
        computed: {},
        components: {
            SlideTransition
        },
        created() {
        },
        mounted() {
        },
        methods: {
            handleClick(item){

            }
        }
    }
</script>
