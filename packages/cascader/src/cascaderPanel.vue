<template>
    <div :class="[
        'cl-cascader-panel',
        !parentComponent && 'cl-cascader-panel--border'
    ]">
        <cl-cascader-item v-if="parentComponent && parentComponent.showFilterablePanel" :data="parentComponent.currentFilterableData" show-path-label></cl-cascader-item>
        <cl-cascader-item v-else :data="parentComponent ? data : currentData"></cl-cascader-item>
    </div>
</template>

<script>
    import ClCascaderItem from './cascaderItem'
    import Mixin from './mixin'
    import {findComponent} from "main/utils/tool";

    export default {
        name: "ClCascaderPanel",
        mixins: [Mixin],
        props: {

        },
        computed: {

        },
        data() {
            let cascader = findComponent(this, 'ClCascader');
            return {
                componentName: 'ClCascaderPanel',
                currentValue: [],
                parentComponent: cascader || null
            }
        },
        components: {
            ClCascaderItem
        },
        mounted() {

        },
        methods: {

        },
        watch: {
            data: {
                handler(){
                    if(!this.parentComponent){
                        this.initCurrentData();
                    }
                },
                deep: true,
                immediate: true
            },

        }
    }
</script>
