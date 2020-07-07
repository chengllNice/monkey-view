<template>
    <div :class="[
            'cl-table-cell',
            (column.ellipsis || column.tooltip) && 'cl-table-cell--ellipsis',
            column.align && `cl-table-cell--${column.align}`,
         ]">
        <template v-if="renderType === 'normal'">
            <template v-if="column.tooltip">
                <tooltip class="cl-table-cell__tooltip" placement="top" :content="row[column.key]">
                    <span class="cl-table-cell__tooltip-content">{{row[column.key]}}</span>
                </tooltip>
            </template>
            <span v-else>{{row[column.key]}}</span>
        </template>
        <template v-if="renderType === 'slot'">
            <table-slot :column="column" :row="row"></table-slot>
        </template>
        <template v-if="renderType === 'selection'">
            <checkbox class="cl-table-cell__checkbox"
                         v-model="row.__isChecked"
                         :disabled="row.__isDisabled"
                         @change="checkboxChange"></checkbox>
        </template>
        <template v-if="renderType === 'index'">
            {{row.__index + 1}}
        </template>
        <template v-if="renderType === 'expand'">
            <span class="cl-table-cell__icon" :class="[row.__isExpand && 'cl-table-cell__expand']" @click="expandChange"><i class="cl-icon-right"></i></span>
        </template>
    </div>
</template>

<script>
    import Tooltip from '../../tooltip/src/tooltip.vue'
    import Checkbox from '../../checkbox/src/checkbox'
    import tableSlot from './table-slot'
    export default {
        name: "TableCell",
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
            Tooltip,
            Checkbox,
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
                    case 'expand':
                        this.renderType = 'expand';
                        break;
                    default:
                        this.renderType = 'normal';
                        break;
                }
            },
            checkboxChange(){
                this.tableRoot.checkboxChange(this.row);
            },
            expandChange(){
                this.tableRoot.expandChange(this.row);
            }
        },
        watch: {

        }
    }
</script>
