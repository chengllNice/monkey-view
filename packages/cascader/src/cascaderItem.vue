<template>
    <div :class="[`${classPrefix}`]">
        <div :class="[`${classPrefix}__label`]">
            <scroll size="small" :scrollOption="{scrollPanel:{scrollingX:false}}">
                <template v-for="item in data">
                    <div :class="[
                            `${classPrefix}__label-inner`,
                            (item.__selected || item.__visible) && `${classPrefix}__label-inner-selected`,
                            item.__disabled && `${classPrefix}__label-inner-disabled`,
                        ]"
                         @click="handleClick(item)"
                         @mouseover="handleMouseover(item)"
                         :key="item.value">
                        <span v-if="showPathLabel" v-html="computedLable(item)"></span>
                        <span v-else>{{parentComponent.formatLabel(item)}}</span>
                        <span :class="[`${classPrefix}__label-expand-icon`]" v-if="item.__loading">
                            <Icon type="loading" :class="[`${prefix}-rotate`]"></Icon>
                        </span>
                        <Icon type="right" :class="[`${classPrefix}__label-expand-icon`]" v-else-if="item.__more"></Icon>
                    </div>
                </template>
            </scroll>
        </div>

        <div :class="[`${classPrefix}__expand`]">
            <template v-for="item in data">
                <cascader-item v-if="item.children && item.children.length && item.__visible"
                                   :key="item.value"
                                   :data="item.children"></cascader-item>
            </template>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Scroll from 'packages/scroll'
    import Icon from 'packages/icon'
    import {findComponent} from "main/utils/tool";

    export default {
        name: "CascaderItem",
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
                    let replaceValue = `<span class="${this.classPrefix}__label-match">${searchValue}</span>`
                    return item.__pathLabel.replace(searchValue, replaceValue);
                }
            }
        },
        data() {
            let cascader = findComponent(this, 'Cascader');
            let cascaderPanel = findComponent(this, 'CascaderPanel');
            return {
                prefix: Config.classPrefix,
                classPrefix: Config.classPrefix + '-cascader-item',
                visible: false,
                currentValue: '',
                isCascader: !!cascader,
                parentComponent: cascader ? cascader : cascaderPanel
            }
        },
        components: {
            Scroll,
            Icon
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
