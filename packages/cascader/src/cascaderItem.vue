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
                            <Icon type="loading" class="animation-rotate"></Icon>
                        </span>
                        <Icon type="right" :class="[`${classPrefix}__label-expand-icon`]" v-else-if="item.__more"></Icon>
                    </div>
                </template>
            </scroll>
        </div>
        <template v-for="item in data">
            <cascader-item v-if="item.children && item.children.length && item.__visible"
                           :key="item.value"
                           :data="item.children"></cascader-item>
        </template>
<!--        <div :class="[`${classPrefix}__expand`]">-->
<!--            <template v-for="item in data">-->
<!--                <cascader-item v-if="item.children && item.children.length && item.__visible"-->
<!--                               :key="item.value"-->
<!--                               :data="item.children"></cascader-item>-->
<!--            </template>-->
<!--        </div>-->
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Scroll from 'packages/scroll'
    import Icon from 'packages/icon'
    import { findComponent } from 'main/utils/tool';

    export default {
        name: 'CascaderItem',
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
            computedLable() {
                return function (item) {
                    if (!this.isCascader) return;
                    const searchValue = this.parentComponent.inputValue;
                    const replaceValue = `<span class="${this.classPrefix}__label-match">${searchValue}</span>`
                    return item.__pathLabel.replace(searchValue, replaceValue);
                }
            }
        },
        data() {
            const cascader = findComponent(this, 'Cascader');
            const cascaderPanel = findComponent(this, 'CascaderPanel');
            return {
                classPrefix: Config.classPrefix + '-cascader-item',
                visible: false,
                currentValue: '',
                isCascader: !!cascader,
                parentComponent: cascader || cascaderPanel
            }
        },
        components: {
            Scroll,
            Icon
        },
        methods: {
            handleClick(item) {
                if (this.parentComponent.disabled || item.disabled || item.loading) return;
                if (this.parentComponent.loadData && !item.last && (!item.children || !item.children.length)) {
                    this.parentComponent.setCurrentData('__loading', item, true);
                    const promise = this.parentComponent.loadData(item);
                    if (typeof promise === 'object' && promise.then) {
                        promise.then((result) => {
                            this.parentComponent.setCurrentData('children', item, result);
                            this.parentComponent.setCurrentData('__loading', item, false);
                        }).catch(e => {
                            console.log(e)
                            this.parentComponent.setCurrentData('__loading', item, false);
                        });
                    }
                }
                this.handleTrigger(item);
            },
            handleMouseover(item) {
                if (this.parentComponent.disabled || item.disabled) return;
                if (this.parentComponent.trigger === 'hover') {
                    this.parentComponent.setCurrentData('__visible', item, true);
                    this.parentComponent.setCurrentData('__selected', item, true);
                    // if(this.parentComponent.changeOnSelect && item.__more){
                    //     this.parentComponent.setCurrentData('__visible', item, true);
                    //     this.parentComponent.setCurrentData('__selected', item, true);
                    // }else{
                    //     this.parentComponent.setCurrentData('__visible', item, true);
                    //     this.parentComponent.setCurrentData('__selected', item, true);
                    // }
                }
            },
            handleTrigger(item) {
                // if(item.__visible) return;
                this.parentComponent.setCurrentData('__visible', item, true);
                this.parentComponent.setCurrentData('__selected', item, true);
                if (!item.__more || this.parentComponent.changeOnSelect) {
                    this.parentComponent.filterSelectedValue(item);
                }
            }
        }
    }
</script>
