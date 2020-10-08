<template>
    <tr :class="[
            `${classPrefix}`,
            row.__isHover && `${classPrefix}--hover`,
            row.__isStripe && `${classPrefix}--stripe-${row.__index % 2}`,
            className,
        ]">
        <slot></slot>
    </tr>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: 'TableTr',
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
            return {
                classPrefix: Config.classPrefix + '-table-row'
            }
        },
        computed: {
            className() {
                if (this.type === 'body') {
                    return this.tableRoot.getRowClassName(this.row, this.row.__index);
                }
                return ''
            }
        }
    }
</script>
