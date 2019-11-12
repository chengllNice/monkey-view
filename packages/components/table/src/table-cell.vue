<template>
    <div :class="[
            'cl-table-cell',
            (column.ellipsis || column.tooltip) && 'cl-table-cell--ellipsis',
            column.align && `cl-table-cell--${column.align}`
         ]">
        <template v-if="renderType === 'normal'">
            <template v-if="column.tooltip">
                <cl-tooltip class="cl-table-cell__tooltip" placement="top" :content="row[column.key]">
                    <span class="cl-table-cell__tooltip-content">{{row[column.key]}}</span>
                </cl-tooltip>
            </template>
            <span v-else>{{row[column.key]}}</span>
        </template>
        <template v-if="renderType === 'slot'">
            <table-slot :column="column" :row="row"></table-slot>
        </template>
        <template v-if="renderType === 'selection'">
            <cl-checkbox class="cl-table-cell__checkbox"
                         v-model="row.defaultStatusProps.isChecked"
                         :disabled="row.defaultStatusProps.isDisabled"
                         @change="checkboxChange"></cl-checkbox>
        </template>
        <template v-if="renderType === 'index'">
            {{row.__index + 1}}
        </template>
    </div>
</template>

<script>
    import ClTooltip from '../../tooltip/src/tooltip.vue'
    import ClCheckbox from '../../checkbox/src/checkbox'
    import tableSlot from './table-slot'
    export default {
        name: "ClTableCell",
        inject: ['tableRoot'],
        props: {
            row: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            column: Object,
        },
        data() {
            return {
                observer: null,
                renderType: 'normal',
            }
        },
        computed: {},
        components: {
            ClTooltip,
            ClCheckbox,
            tableSlot
        },
        created() {
        },
        mounted() {
            this.setRenderType();
        },
        beforeDestroy() {

        },
        methods: {
            setRenderType(){
                let type = this.column.slot ? 'slot' : this.column.type;
                switch (type) {
                    case 'slot':
                        this.renderType = 'slot';
                        break;
                    case 'selection':
                        this.renderType = 'selection';
                        break;
                    case 'html':
                        this.renderType = 'html';
                        break;
                    case 'index':
                        this.renderType = 'index';
                        break;
                    default:
                        this.renderType = 'normal';
                        break;
                }
            },
            checkboxChange(){
                this.tableRoot.checkboxChange(this.row);
            }
        },
        watch: {

        }
    }
</script>
