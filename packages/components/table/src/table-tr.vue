<template>
    <tr :class="[
            'cl-table-row',
            row.__isHover && 'cl-table-row--hover',
            row.__isStripe && `cl-table-row--stripe-${row.__index % 2}`,
            className,
        ]">
        <slot></slot>
    </tr>
</template>

<script>
    export default {
        name: "ClTableTr",
        inject: ['tableRoot'],
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
        computed: {
            className(){
                if(this.type === 'body'){
                    return this.tableRoot.getRowClassName(this.row, this.row.__index);
                }
                return ''
            }
        },
        components: {},
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>
