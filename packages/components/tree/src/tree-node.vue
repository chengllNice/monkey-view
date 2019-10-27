<template>
    <SlideTransition>
        <div class="cl-tree-node">
            <div class="cl-tree-node__title">
                <span><i class="cl-icon-down"></i></span>
                {{data.name}}
            </div>
            <ClTreeNode v-if="data.open && data.children && data.children.length"
                        v-for="item in  data.children"
                        :key="item.key"
                        :data="item"></ClTreeNode>
        </div>
    </SlideTransition>
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
                type: Object,
                default() {
                    return {}
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
        methods: {}
    }
</script>

<style scoped>

</style>
