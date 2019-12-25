<template>
    <div class="cl-form">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "ClForm",
        props: {
            requiredLabel: Boolean,//required的item是否需要*
            labelWidth: {
                type: [Number, String],
                default: 80
            }
        },
        provide() {
            return {
                form: this
            }
        },
        data() {
            return {}
        },

        mounted() {
        },
        methods: {}
    }
</script>