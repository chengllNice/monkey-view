<template>
    <div :class="[
            `${classPrefix}`,
            (column.ellipsis || column.tooltip) && `${classPrefix}--ellipsis`,
            column.align && `${classPrefix}--${column.align}`,
         ]">
        <template v-if="renderType === 'normal'">
            <template v-if="column.tooltip">
                <tooltip :class="[`${classPrefix}__tooltip`]" placement="top" :content="row[column.key]">
                    <span :class="[`${classPrefix}__tooltip-content`]">{{row[column.key]}}</span>
                </tooltip>
            </template>
            <span v-else>{{row[column.key]}}</span>
        </template>
        <template v-if="renderType === 'slot'">
            <table-slot :column="column" :row="row"></table-slot>
        </template>
        <template v-if="renderType === 'selection'">
            <checkbox :class="[`${classPrefix}__checkbox`]"
                      v-model="row.__isChecked"
                      :disabled="row.__isDisabled"
                      @change="checkboxChange"></checkbox>
        </template>
        <template v-if="renderType === 'index'">
            {{row.__index + 1}}
        </template>
        <template v-if="renderType === 'expand'">
            <span :class="[
                    `${classPrefix}__icon`,
                    row.__isExpand && `${classPrefix}__expand`
                ]"
                  @click="expandChange"><Icon type="right"></Icon></span>
        </template>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Tooltip from '../../tooltip/src/tooltip.vue'
    import Checkbox from '../../checkbox/src/checkbox'
    import tableSlot from './table-slot'
    import Icon from 'packages/icon'

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
                classPrefix: Config.classPrefix + '-table-cell',
                observer: null,
                renderType: 'normal',
            }
        },
        computed: {},
        components: {
            Tooltip,
            Checkbox,
            tableSlot,
            Icon
        },
        created() {
        },
        mounted() {
            this.setRenderType();
        },
        beforeDestroy() {

        },
        methods: {
            setRenderType() {
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
            checkboxChange() {
                this.tableRoot.checkboxChange(this.row);
            },
            expandChange() {
                this.tableRoot.expandChange(this.row);
            }
        },
        watch: {}
    }
</script>
