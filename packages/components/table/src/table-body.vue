<template>
    <table v-if="data && data.length" cellspacing="0" cellpadding="0" border="0" :style="tableBodyStyle">
        <colgroup>
            <col v-for="column in colgroupColumns" :key="column.__id" :width="setColWidth(column)">
        </colgroup>
        <tbody>
            <template v-for="(row, index) in data">
                <cl-table-tr :row="row"
                             :key="index"
                             @mouseenter.native="trMouseEnter(row.__index)"
                             @mouseleave.native="trMouseLeave(row.__index)">
                    <td v-for="column in columns"
                        :key="column.__id"
                        :class="[
                            fixed && column.fixed !== fixed && 'is-hidden'
                        ]">
                        <cl-table-cell :row="row" :column="column"></cl-table-cell>
                    </td>
                </cl-table-tr>
            </template>
        </tbody>
    </table>
    <table v-else cellspacing="0" cellpadding="0" border="0" :style="tableBodyStyle">
        <tbody>
            <tr>
                <td :class="[
                        fixed && 'is-hidden'
                    ]"
                    :colspan="colgroupColumns.length">暂无数据</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import ClTableTr from './table-tr.vue'
    import ClTableCell from './table-cell.vue'
    import tableMixins from './table-mixins'

    export default {
        name: "ClTableBody",
        mixins: [tableMixins],
        inject: ['tableRoot'],
        props: {
            data: {
                type: Array,
                default: function () {
                    return []
                }
            },
            columns: {
                type: Array,
                default: function () {
                    return []
                }
            },
            colgroupColumns: Array,
            columnsWidth: Object,
            bodyStyle: Object,
            fixed: String
        },
        data() {
            return {}
        },
        computed: {
            tableBodyStyle(){
                let style = {};
                if(this.bodyStyle && this.bodyStyle.width) style.width = this.bodyStyle.width;
                return style;
            }
        },
        components: {
            ClTableTr,
            ClTableCell
        },
        created() {
        },
        mounted() {
        },
        methods: {
            trMouseEnter(__id){
                this.tableRoot.setCloneDataDefaultProps({
                    __isHover: true
                }, [__id])
            },
            trMouseLeave(__id){
                this.tableRoot.setCloneDataDefaultProps({
                    __isHover: false
                }, [__id])
            }
        }
    }
</script>
