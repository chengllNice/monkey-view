<template>
    <div :class="[
        'cl-list-item',
        parentListComponent.size && `cl-list-item--${parentListComponent.size}`,
        parentListComponent.split && `cl-list-item--split`,
        parentListComponent.hover && `cl-list-item--hover`,
        currentType === 'meta' && `cl-list-item--meta`,
        parentListRowComponent && `cl-list-item--row`,
    ]"
         :style="itemStyle" @click="clickHandle">
        <div class="cl-list-item__row" v-if="parentListRowComponent">
            <div class="cl-list-item__label" :style="labelStyle"><slot name="label">{{label}}</slot></div>
            <div class="cl-list-item__value"><slot name="value">{{value}}</slot></div>
        </div>
        <template v-if="currentType === 'meta'">
            <div class="cl-list-item__avatar" v-if="avatar || $slots.avatar">
                <slot name="avatar"><img :src="avatar" alt=""></slot>
            </div>
            <div class="cl-list-item__content">
                <div class="cl-list-item__title" v-if="title || $slots.title"><slot name="title">{{title}}</slot></div>
                <div class="cl-list-item__description" v-if="description || $slots.description"><slot name="description">{{description}}</slot></div>
                <slot></slot>
            </div>
            <div class="cl-list-item__extra" v-if="$slots.extra">
                <slot name="extra"></slot>
            </div>
        </template>
        <slot v-else></slot>
    </div>
</template>

<script>
    import {findComponent, findComponentDirect} from "../../../utils/tool";
    import Emitter from '../../../mixins/emitter'
    export default {
        name: "ClListItem",
        mixins: [Emitter],
        props: {
            type: {
                type: String,
                default: '',//可选值meta default
            },
            title: String,
            label: [String, Number],//list-row类型时可用
            value: [String, Number],//list-row类型时可用
            description: String,
            avatar: String,
        },
        data() {
            return {
                componentName: 'ClListItem',
                parentListComponent: findComponent(this, 'ClList'),
                parentListRowComponent: findComponentDirect(this, 'ClListRow'),
            }
        },
        computed: {
            currentType(){
                if(this.parentListRowComponent) return '';
                return this.type ? this.type : this.parentListComponent.type;
            },
            itemStyle(){
                let style = {};
                if(this.parentListRowComponent){
                    style = {
                        width: this.parentListComponent.itemWidth
                    };
                    if (this.parentListComponent.gutter) {
                        style = {
                            ...style,
                            paddingLeft: this.parentListComponent.gutter / 2 + 'px',
                            paddingRight: this.parentListComponent.gutter / 2 + 'px',
                        }
                    }
                }
                return style
            },
            labelStyle(){

                return {
                    width: parseFloat(this.parentListComponent.labelWidth) + 'px'
                }
            },
        },
        components: {

        },
        created() {
        },
        mounted() {
            this.$nextTick(()=>{
                if(this.parentListRowComponent){
                    this.parentEmit('ClListRow', 'on-update-item-len');
                }
            })
        },
        methods: {
            clickHandle(){
                this.$emit('click')
            }
        }
    }
</script>
