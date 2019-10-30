<template>
    <div :class="[
        'cl-list',
        border && 'cl-list--border',
        size && `cl-list--${size}`,
    ]">
        <div class="cl-list__header">
            <slot name="header">{{header}}</slot>
        </div>
        <div class="cl-list__content">
            <slot></slot>
        </div>
        <div class="cl-list__footer">
            <slot name="footer">{{footer}}</slot>
        </div>
    </div>
</template>

<script>
    import {findComponentDirectChildrens} from "../../../utils/tool";
    import Emitter from '../../../mixins/emitter'

    export default {
        name: "ClList",
        mixins: [Emitter],
        props: {
            border: Boolean,
            header: String,
            footer: String,
            loading: Boolean,
            type: {
                type: String,
                default: 'default',
                validator(value){
                    return ['meta', 'default'].includes(value)
                }
            },
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

<style scoped>

</style>
