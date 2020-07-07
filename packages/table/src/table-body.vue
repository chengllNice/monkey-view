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
                    <td v-for="column in columns"
                        :key="column.__id"
                        :class="[
                            fixed && column.fixed !== fixed && 'is-hidden',
                            column.className
                        ]"
                        @click.stop="rowClick(row, column)"
                        @dblclick.stop="rowDbCkick(row, column)">
                        <cl-table-cell :row="row" :column="column"></cl-table-cell>
                    </td>
                </table-tr>
                <tr v-if="row.__isExpand" :key="index + '-expand'">
                    <td :colspan="colgroupColumns.length"
                        :class="[
                            'cl-table-td__expand',
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
                    :colspan="colgroupColumns.length">{{t('cl.table.emptyData')}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import TableTr from './table-tr.vue'
    import TableCell from './table-cell.vue'
    import tableMixins from './table-mixins'
    import TableExpand from './table-expand'
    import {emitDataFormat} from "./util";
    import Locale from 'main/mixins/locale'

    export default {
        name: "TableBody",
        mixins: [tableMixins,Locale],
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
                emitDataFormat: emitDataFormat,
            }
        },
        computed: {
            tableBodyStyle(){
                let style = {};
                if(this.bodyStyle && this.bodyStyle.width) style.width = this.bodyStyle.width;
                return style;
            }
        },
        components: {
            TableTr,
            TableCell,
            TableExpand
        },
        created() {
        },
        mounted() {
        },
        methods: {
            trMouseEnter(__id){
                if(!this.tableRoot.hover) return;
                this.tableRoot.setCloneDataDefaultProps({
                    __isHover: true
                }, [__id])
            },
            trMouseLeave(__id){
                if(!this.tableRoot.hover) return;
                this.tableRoot.setCloneDataDefaultProps({
                    __isHover: false
                }, [__id])
            },
            rowClick(row, column){
                this.tableRoot.rowClick(row, column);
                this.tableRoot.cellClick(row, column);
            },
            rowDbCkick(row, column){
                this.tableRoot.rowDbCkick(row, column);
                this.tableRoot.cellDbCkick(row, column);
            }
        }
    }
</script>
