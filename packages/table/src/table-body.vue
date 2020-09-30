<template>
    <table v-if="data && data.length" cellspacing="0" cellpadding="0" border="0" :style="tableBodyStyle">
        <colgroup>
            <col v-for="column in colgroupColumns" :key="column.__id" :width="setColWidth(column)">
        </colgroup>
        <tbody>
        <template v-for="(row, index) in data">
            <table-tr type='body'
                      :row="row"
                      :key="index"
                      @mouseenter.native="trMouseEnter(row.__index)"
                      @mouseleave.native="trMouseLeave(row.__index)">
                <td v-for="(column, columnIndex) in columns"
                    :key="column.__id"
                    :class="[
                        fixed && column.fixed !== fixed && 'is-hidden',
                        column.className
                    ]"
                    v-bind="getSpan(row, column, index, columnIndex)"
                    v-if="spanShow(row, column, index, columnIndex)"
                    @click.stop="rowClick(row, column)"
                    @dblclick.stop="rowDbCkick(row, column)">
                    <table-cell :row="row" :column="column"></table-cell>
                </td>
            </table-tr>
            <tr v-if="row.__isExpand" :key="index + '-expand'">
                <td :colspan="colgroupColumns.length"
                    :class="[
                            `${classPrefixTd}__expand`,
                            fixed && 'is-hidden'
                        ]">
                    <table-expand :row="emitDataFormat(row)" :columns="emitDataFormat(columns)"></table-expand>
                </td>
            </tr>
        </template>
        </tbody>
    </table>
    <table v-else cellspacing="0" cellpadding="0" border="0" :style="tableBodyStyle">
        <tbody>
        <tr>
            <td :class="[
                        fixed && 'is-hidden'
                    ]"
                :colspan="colgroupColumns.length">{{t('m.table.emptyData')}}
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import Config from 'main/config/config'
    import TableTr from './table-tr.vue'
    import TableCell from './table-cell.vue'
    import tableMixins from './table-mixins'
    import TableExpand from './table-expand'
    import { emitDataFormat } from './util';
    import Locale from 'main/mixins/locale'

    export default {
        name: 'TableBody',
        mixins: [tableMixins, Locale],
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
            return {
                classPrefix: Config.classPrefix + '-table-body',
                classPrefixTd: Config.classPrefix + '-table-td',
                emitDataFormat: emitDataFormat
            }
        },
        computed: {
            tableBodyStyle() {
                const style = {};
                if (this.bodyStyle && this.bodyStyle.width) style.width = this.bodyStyle.width;
                return style;
            }
        },
        components: {
            TableTr,
            TableCell,
            TableExpand
        },
        methods: {
            trMouseEnter(__id) {
                if (!this.tableRoot.hover) return;
                this.tableRoot.setCloneDataDefaultProps({
                    __isHover: true
                }, [__id])
            },
            trMouseLeave(__id) {
                if (!this.tableRoot.hover) return;
                this.tableRoot.setCloneDataDefaultProps({
                    __isHover: false
                }, [__id])
            },
            rowClick(row, column) {
                this.tableRoot.rowClick(row, column);
                this.tableRoot.cellClick(row, column);
            },
            rowDbCkick(row, column) {
                this.tableRoot.rowDbCkick(row, column);
                this.tableRoot.cellDbCkick(row, column);
            },
            getSpan(row, column, rowIndex, columnIndex) {
                const spanMethod = this.tableRoot.spanMethod;
                if (spanMethod && typeof spanMethod === 'function') {
                    const result = spanMethod({
                        row,
                        column,
                        rowIndex,
                        columnIndex
                    });
                    let rowspan = 1;
                    let colspan = 1;
                    if (Array.isArray(result) && result.length === 2) {
                        rowspan = result[0];
                        colspan = result[1];
                    } else if (typeof result === 'object') {
                        rowspan = result.rowspan;
                        colspan = result.colspan;
                    }
                    if (typeof rowspan !== 'number' || typeof colspan !== 'number') {
                        rowspan = 1;
                        colspan = 1;
                    }
                    return {
                        rowspan,
                        colspan
                    }
                } else {
                    return {}
                }
            },
            spanShow(row, column, rowIndex, columnIndex) {
                const result = this.getSpan(row, column, rowIndex, columnIndex);
                return !(('rowspan' in result && result.rowspan === 0) || ('colspan' in result && result.colspan === 0));
            }
        }
    }
</script>
