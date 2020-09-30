<template>
    <div :class="[
            `${classPrefix}`,
            parentListComponent.split && `${classPrefix}--split`,
            parentListComponent.hover && `${classPrefix}--hover`,
            currentType === 'meta' && `${classPrefix}--meta`,
            parentListRowComponent && `${classPrefix}--row`,
            isFirstItemNoBorder && `${classPrefix}--first-no-border`,
            isLastItemNoBorder && `${classPrefix}--last-no-border`
        ]"
         :style="itemStyle" @click="handleClick">
        <div :class="[`${classPrefix}__row`]" v-if="parentListRowComponent">
            <div :class="[`${classPrefix}__label`]" :style="labelStyle">
                <slot name="label">{{label}}</slot>
            </div>
            <div :class="[`${classPrefix}__value`]">
                <slot name="value">{{value}}</slot>
            </div>
        </div>
        <template v-else-if="currentType === 'meta'">
            <div :class="[`${classPrefix}__avatar`]" v-if="avatar || $slots.avatar">
                <slot name="avatar"><img :src="avatar" alt=""></slot>
            </div>
            <div :class="[`${classPrefix}__content`]">
                <div :class="[`${classPrefix}__title`]" v-if="title || $slots.title">
                    <slot name="title">{{title}}</slot>
                </div>
                <div :class="[`${classPrefix}__description`]" v-if="description || $slots.description">
                    <slot name="description">{{description}}</slot>
                </div>
                <slot></slot>
            </div>
            <div :class="[`${classPrefix}__extra`]" v-if="$slots.extra">
                <slot name="extra"></slot>
            </div>
        </template>
        <slot v-else></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import { findComponent, findComponentDirect } from 'main/utils/tool';
    import Emitter from 'main/mixins/emitter'

    export default {
        name: 'ListItem',
        mixins: [Emitter],
        props: {
            type: {
                type: String,
                default: ''// 可选值meta default
            },
            title: String,
            label: [String, Number], // list-row类型时可用
            value: [String, Number], // list-row类型时可用
            description: String,
            avatar: String
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-list-item',
                componentName: 'ListItem',
                parentListComponent: findComponent(this, 'List'),
                parentListRowComponent: findComponentDirect(this, 'ListRow')
            }
        },
        computed: {
            currentType() {
                if (this.parentListRowComponent) return '';
                return this.type ? this.type : this.parentListComponent.type;
            },
            itemStyle() {
                let style = {};
                if (this.parentListRowComponent) {
                    style = {
                        width: this.parentListComponent.itemWidth
                    };
                    if (this.parentListComponent.gutter) {
                        style = {
                            ...style,
                            paddingLeft: this.parentListComponent.gutter / 2 + 'px',
                            paddingRight: this.parentListComponent.gutter / 2 + 'px'
                        }
                    }
                }
                return style
            },
            labelStyle() {
                return {
                    width: parseFloat(this.parentListComponent.labelWidth) + 'px'
                }
            },
            isFirstItemNoBorder() {
                return this.parentListComponent && this.parentListComponent.border && !(this.parentListComponent.header || this.parentListComponent.$slots.header)
            },
            isLastItemNoBorder() {
                return this.parentListComponent && this.parentListComponent.border && !(this.parentListComponent.footer || this.parentListComponent.$slots.footer)
            }
        },
        mounted() {
            this.$nextTick(() => {
                if (this.parentListRowComponent) {
                    this.parentEmit('ListRow', 'on-update-item-len');
                }
            })
        },
        methods: {
            handleClick(event) {
                this.$emit('click', event)
            }
        }
    }
</script>
