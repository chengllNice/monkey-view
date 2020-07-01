<template>
    <div class="cl-cascader-panel">
        <div v-for="item in currentData" :key="item.value">
            <div class="cl-cascader-panel__label" @click="handleClick(item)">
                <span>{{item.label}}{{item.__visible}}</span>
                <i class="cl-icon-right" v-if="item.__more"></i>
                <!--            <i class="cl-icon-loading"></i>-->
            </div>
            <template v-if="item.children && item.children.length && item.__visible">
                <cl-cascader-panel :data="item.children" :panel-index="item.__deepIndex"></cl-cascader-panel>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ClCascaderPanel",
        inject: ['cascader'],
        props: {
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            panelIndex: {
                type: Number,
                default: 1
            }
        },
        computed: {

        },
        data() {
            return {
                visible: false,
                currentData: [],
            }
        },
        mounted() {
        },
        methods: {
            initCurrentData(){
                if(this.panelIndex > 1) return;
                this.currentData = JSON.parse(JSON.stringify(this.data));
                let index = 0;//层级
                let fn = (data) => {
                    index++;
                    data.forEach(item=>{
                        item.__deepIndex = index;
                        item.__visible = false;//该值控制children的显示
                        item.__disabled = item.disabled || false;
                        item.__more = item.children && item.children.length;
                        item.__loading = false;

                        if(item.children && item.children.length){
                            fn(item.children);
                        }
                    })
                }
                fn(this.currentData);
            },
            setCurrentData(prop, value, propValue){
                let has = false;//是否有满足的
                let fn = (data) => {
                    data.forEach(item=>{
                        if(prop === '__visible'){
                            item[prop] = false;
                        }
                        if(item.value === value && !has){
                            has = true;
                            item[prop] = propValue;
                        }
                        if(item.children && item.children.length){
                            fn(item.children);
                        }
                    })
                }
                fn(this.currentData);
            },
            handleClick(item){
                this.setCurrentData('__visible', item.value, true);
            },
        },
        watch: {
            data: {
                handler(){
                    this.initCurrentData();
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>

<style scoped>

</style>