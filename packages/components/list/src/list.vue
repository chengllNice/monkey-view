<template>
    <div :class="[
        'cl-list',
        border && 'cl-list--border',
        size && `cl-list--${size}`,
    ]">
        <div class="cl-list__header" v-if="header || $slots.header">
            <slot name="header">{{header}}</slot>
        </div>
        <div class="cl-list__content">
            <slot></slot>
        </div>
        <div class="cl-list__footer" v-if="footer || $slots.footer">
            <slot name="footer">{{footer}}</slot>
        </div>
        <cl-loading fix :visible="loading" />
    </div>
</template>

<script>

    export default {
        name: "ClList",
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
                default: '',//可选值meta
            },
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
                default: 'default',
                validator(value){
                    return ['mini', 'small', 'default', 'large'].includes(value)
                }
            }
        },
        data() {
            return {
                componentName: 'ClList'
            }
        },
        computed: {},
        components: {},
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>
