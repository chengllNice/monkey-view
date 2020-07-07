<template>
    <div class="cl-cascader-item">
        <div class="cl-cascader-item__label">
            <cl-scroll size="small" :scrollOption="{scrollPanel:{scrollingX:false}}">
                <template v-for="item in data">
                    <div :class="[
                            'cl-cascader-item__label-inner',
                            (item.__selected || item.__visible) && 'cl-cascader-item__selected',
                            item.__disabled && 'cl-cascader-item__disabled',
                        ]"
                         @click="handleClick(item)"
                         @mouseover="handleMouseover(item)"
                         :key="item.value">
                        <span v-if="showPathLabel" v-html="computedLable(item)"></span>
                        <span v-else>{{parentComponent.formatLabel(item)}}</span>
                        <span class="cl-cascader-item__label-expand-icon" v-if="item.__loading">
                            <i class="cl-rotate cl-icon-loading"></i>
                        </span>
                        <i class="cl-cascader-item__label-expand-icon cl-icon-right" v-else-if="item.__more"></i>
                    </div>
                </template>
            </cl-scroll>
        </div>

        <div class="cl-cascader-item__expand">
            <template v-for="item in data">
                <cl-cascader-item v-if="item.children && item.children.length && item.__visible"
                                   :key="item.value"
                                   :data="item.children"></cl-cascader-item>
            </template>
        </div>
    </div>
</template>

<script>
    import ClScroll from '../../scroll/src/scroll.vue'
    import {findComponent} from "main/utils/tool";

    export default {
        name: "ClCascaderItem",
        props: {
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            showPathLabel: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            computedLable(){
                return function (item) {
                    if(!this.isCascader) return ;
                    let searchValue = this.parentComponent.inputValue;
                    let replaceValue = `<span class="cl-cascader-item__label-match">${searchValue}</span>`
                    return item.__pathLabel.replace(searchValue, replaceValue);
                }
            }
        },
        data() {
            let cascader = findComponent(this, 'ClCascader');
            let cascaderPanel = findComponent(this, 'ClCascaderPanel');
            return {
                visible: false,
                currentValue: '',
                isCascader: !!cascader,
                parentComponent: cascader ? cascader : cascaderPanel
            }
        },
        components: {
            ClScroll
        },
        mounted() {
        },
        methods: {
            handleClick(item) {
                if(this.parentComponent.disabled || item.disabled || item.loading) return;
                if(this.parentComponent.loadData && !item.last && (!item.children || !item.children.length)){
                    this.parentComponent.setCurrentData('__loading', item, true);
                    let promise = this.parentComponent.loadData(item);
                    if(typeof promise === 'object' && promise.then){
                        promise.then((result)=>{
                            this.parentComponent.setCurrentData('children', item, result);
                            this.parentComponent.setCurrentData('__loading', item, false);
                        }).catch(e=>{
                            this.parentComponent.setCurrentData('__loading', item, false);
                        });
                    }
                }
                this.handleTrigger(item);
            },
            handleMouseover(item){
                if(this.parentComponent.disabled || item.disabled) return;
                if(this.parentComponent.trigger === 'hover'){
                    if(this.parentComponent.changeOnSelect && item.__more){
                        this.parentComponent.setCurrentData('__visible', item, true);
                        this.parentComponent.setCurrentData('__selected', item, true);
                    }else{
                        this.parentComponent.setCurrentData('__visible', item, true);
                    }
                }
            },
            handleTrigger(item){
                this.parentComponent.setCurrentData('__visible', item, true);
                this.parentComponent.setCurrentData('__selected', item, true);
                if(!item.__more || this.changeOnSelect){
                    this.parentComponent.filterSelectedValue(item);
                }
            }
        },
        watch: {

        }
    }
</script>
