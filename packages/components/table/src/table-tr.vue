<template>
    <tr :class="[
            'cl-table-row',
            row.__isHover && 'cl-table-row--hover',
            row.__isStripe && `cl-table-row--stripe`
        ]">
        <slot></slot>
    </tr>
</template>

<script>
    export default {
        name: "ClTableTr",
        props: {
            type: {
                type: String,
                default: 'body'
            },
            row: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        data() {
            return {}
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
