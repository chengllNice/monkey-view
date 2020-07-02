<template>
    <div class="cl-cascader-panel">
        <cl-cascader-item :data="currentData"></cl-cascader-item>
    </div>
</template>

<script>
    import ClCascaderItem from './cascaderItem'
    import Mixin from './mixin'

    export default {
        name: "ClCascaderPanel",
        mixins: [Mixin],
        inject: ['cascader'],
        provide(){
            return {
                cascaderPanel: this
            }
        },
        props: {

        },
        computed: {},
        data() {
            return {
                currentValue: []
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
                handler(val){
                    if(!this.cascader){
                        this.deepCloneData();
                    }
                    this.currentData = val;
                },
                deep: true,
                immediate: true
            },

        }
    }
</script>
