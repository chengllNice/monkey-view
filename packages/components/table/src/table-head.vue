<template>
    <table cellspacing="0" cellpadding="0" border="0" class="cl-table-head" :style="tableHeadStyle">
        <colgroup>
            <col v-for="column in colgroupColumns" :key="column.__id" :width="setColWidth(column)">
            <col v-if="$parent.showVerticalScrollBar" :width="$parent.scrollBarWidth">
        </colgroup>
        <thead>
            <template v-for="(row, index) in columns">
                <cl-table-tr type="head" :row="row[0]" :key="index">
                    <th v-for="column in row"
                        :key="column.__id"
                        :class="[
                            fixed && column.fixed !== fixed && 'is-hidden',
                            sortOrderType.includes(column.__sortOrder) && column.__sortOrder && 'cl-table-head__sort',
                            column.className && `${column.className}`
                        ]"
                        :rowspan="column.rowSpan"
                        :colspan="column.colSpan"
                        @click.self="sortHandle(column)">
                        <cl-table-head-cell :column="column" :sortOrderType="sortOrderType"></cl-table-head-cell>
                    </th>
                    <th v-if="$parent.showVerticalScrollBar" :rowspan="columns.length"></th>
                </cl-table-tr>
            </template>
        </thead>
    </table>
</template>

<script>
    import ClTableTr from './table-tr.vue'
    import ClTableCell from './table-cell.vue'
    import ClTableHeadCell from './table-head-cell'
    import ClTooltip from '../../tooltip/src/tooltip.vue'
    import tableMixins from './table-mixins'

    export default {
        name: "ClTableHead",
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
            headStyle: Object,
            fixed: String
        },
        data() {
            return {
                sortOrderType: ['ascend', 'descend', true, false, 'remote']
            }
        },
        computed: {
            tableHeadStyle(){
                let style = {};
                if(this.headStyle && this.headStyle.width) style.width = this.headStyle.width
                return style;
            }
        },
        components: {
            ClTooltip,
            ClTableTr,
            ClTableCell,
            ClTableHeadCell
        },
        created() {
        },
        mounted() {
        },
        methods: {
            sortHandle(column){
                if(!column.__sortOrder || !this.sortOrderType.includes(column.sortOrder)) return;
                let type = true;
                if(column.__sortOrder === 'ascend'){
                    type = 'descend';
                }else if(column.__sortOrder === 'descend'){
                    type = true;
                }else if(column.__sortOrder === true){
                    type = 'ascend';
                }else{
                    type = 'remote'
                }
                this.tableRoot.sortHandle(column, type);
            }
        }
    }
</script>
