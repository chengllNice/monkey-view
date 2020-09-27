<template>
    <div :class="[
        `${classPrefix}`,
        border && `${classPrefix}--border`,
        size && `${classPrefix}--${size}`,
        split && `${classPrefix}--split`,
    ]">
        <div :class="[`${classPrefix}__header`]" v-if="header || $slots.header">
            <slot name="header">{{header}}</slot>
        </div>
        <div :class="[`${classPrefix}__content`]">
            <slot></slot>
        </div>
        <div :class="[`${classPrefix}__footer`]" v-if="footer || $slots.footer">
            <slot name="footer">{{footer}}</slot>
        </div>
        <Loading fix :visible="loading"/>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Loading from 'packages/loading'

    export default {
        name: "List",
        props: {
            border: Boolean,
            hover: {
                type: Boolean,
                default: true
            },//是否需要hover效果
            split: {
                type: Boolean,
                default: true
            },//是否显示分割线
            header: String,
            footer: String,
            loading: Boolean,
            type: {
                type: String,
                default: '',
            },//可选值meta
            gutter: {
                type: [String, Number],
                default: 10
            },//list-row类型时item列之间的间隔，此时type属性不起作用
            labelWidth: {
                type: [String, Number],
                default: 100
            },//list-row类型时有效
            size: {
                type: String,
                default () {
                    return !this.$MONKEY || this.$MONKEY.size === '' ? 'default' : this.$MONKEY.size;
                },
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value)
                }
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-list',
                componentName: 'List',
                everyRowItemLen: [],//每一个list-row下item的数量的数组
                itemWidth: '0%',
            }
        },
        components: {
            Loading
        },
        mounted() {
            this.$on('on-update-item-width', (len) => {
                this.everyRowItemLen.push(len);
                let sortArr = this.everyRowItemLen.sort((a, b) => {
                    return a - b;
                }).reverse();
                if (sortArr && sortArr.length) {
                    this.itemWidth = 100 / sortArr[0] + '%'
                }
            })
        },
    }
</script>
