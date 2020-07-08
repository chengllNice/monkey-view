<template>
    <table cellspacing="0" cellpadding="0" border="0" :class="[`${classPrefix}`]" :style="tableHeadStyle">
        <colgroup>
            <col v-for="column in colgroupColumns" :key="column.__id" :width="setColWidth(column)">
            <col v-if="$parent.showVerticalScrollBar" :width="$parent.scrollBarWidth">
        </colgroup>
        <thead>
            <template v-for="(row, index) in columns">
                <table-tr type="head" :row="row[0]" :key="index">
                    <th v-for="column in row"
                        :key="column.__id"
                        :class="[
                            fixed && column.fixed !== fixed && 'is-hidden',
                            sortType.includes(column.__sort) && column.__sort && `${classPrefix}__sort`,
                            column.className
                        ]"
                        :rowspan="column.__rowSpan"
                        :colspan="column.__colSpan"
                        @click.stop="sortHandle(column)">
                        <table-head-cell :column="column" :sortType="sortType"></table-head-cell>
                    </th>
                    <th class="cl-table-head__scroll-th" v-if="$parent.showVerticalScrollBar" :rowspan="columns.length"></th>
                </table-tr>
            </template>
        </thead>
    </table>
</template>

<script>
    import Config from 'main/config/config'
    import TableTr from './table-tr.vue'
    import TableHeadCell from './table-head-cell'
    import tableMixins from './table-mixins'

    export default {
        name: "TableHead",
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
                classPrefix: Config.classPrefix + '-table-head',
                sortType: ['ascend', 'descend', true, false, 'remote']
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
            TableTr,
            TableHeadCell
        },
        created() {
        },
        mounted() {
        },
        methods: {
            sortHandle(column){
                this.tableRoot.headClick(column);
                if(!column.__sort || !this.sortType.includes(column.sort)) return;
                let type = true;
                if(column.__sort === 'ascend'){
                    type = 'descend';
                }else if(column.__sort === 'descend'){
                    type = true;
                }else if(column.__sort === true){
                    type = 'ascend';
                }else{
                    type = 'remote'
                }
                this.tableRoot.sortHandle(column, type);
            }
        }
    }
</script>
