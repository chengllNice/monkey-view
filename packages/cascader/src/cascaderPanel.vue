<template>
    <div :class="[
        'cl-cascader-panel',
        !parentComponent && 'cl-cascader-panel--border'
    ]">
        <cascader-item v-if="parentComponent && parentComponent.showFilterablePanel" :data="parentComponent.currentFilterableData" show-path-label></cascader-item>
        <cascader-item v-else :data="parentComponent ? data : currentData"></cascader-item>
    </div>
</template>

<script>
    import CascaderItem from './cascaderItem'
    import Mixin from './mixin'
    import {findComponent} from "main/utils/tool";

    export default {
        name: "CascaderPanel",
        mixins: [Mixin],
        props: {

        },
        computed: {

        },
        data() {
            let cascader = findComponent(this, 'ClCascader');
            return {
                componentName: 'CascaderPanel',
                currentValue: [],
                parentComponent: cascader || null
            }
        },
        components: {
            CascaderItem
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
