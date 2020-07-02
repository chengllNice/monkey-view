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
                        <span>{{item.label}}</span>
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
    export default {
        name: "ClCascaderItem",
        inject: ['cascader', 'cascaderPanel'],
        props: {
            data: {
                type: Array,
                default() {
                    return []
                }
            },
        },
        computed: {},
        data() {
            let parentComponent = this.cascader ? this.cascader : this.cascaderPanel;
            return {
                visible: false,
                currentValue: '',
                parentComponent: parentComponent
            }
        },
        components: {
            ClScroll
        },
        mounted() {
        },
        methods: {
            handleClick(item) {
                if(this.parentComponent.disabled || item.disabled) return;
                this.handleTrigger(item);
            },
            handleMouseover(item){
                if(this.parentComponent.disabled || item.disabled) return;
                if(this.parentComponent.trigger === 'hover'){
                    if(this.parentComponent.changeOnSelect && item.__more){
                        this.handleTrigger(item);
                    }else{
                        this.parentComponent.setCurrentData('__visible', item, true);
                    }
                }
            },
            handleTrigger(item){
                this.parentComponent.setCurrentData('__visible', item, true);
                this.parentComponent.setCurrentData('__selected', item, true);
                this.parentComponent.filterSelectedValue(item);
            }
        },
        watch: {

        }
    }
</script>
