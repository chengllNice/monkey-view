<template>
    <div :class="[
             `${classPrefix}`,
             `${classPrefixCell}`,
             column.align && `${classPrefixCell}--${column.align}`,
             (column.ellipsis || column.tooltip) && `${classPrefixCell}--ellipsis`,
         ]">
        <template v-if="renderType === 'selection'">
            <checkbox :class="[`${classPrefixCell}__checkbox`]"
                      v-model="column.__isChecked"
                      :disabled="column.__isDisabled"
                      @change="checkboxChange"></checkbox>
        </template>
        <template v-if="renderType === 'index'">
            #
        </template>
        <template v-if="renderType === 'normal'">
            <table-slot-head v-if="column.slotHead" :column="column" :slot-name="column.slotHead"></table-slot-head>
            <template v-else>{{column.title}}</template>
            <!--排序-->
            <span v-if="column.sort && sortType.includes(column.sort)"
                  :class="[`${classPrefixCell}__icon`, `${classPrefix}__sort`]">
                <Icon type="care-up"
                      :class="[
                          column.__sort === 'ascend' && `${classPrefixCell}__icon-active`
                      ]"
                      @click.self="sortHandle('ascend')"></Icon>
                <Icon type="care-down"
                      :class="[column.__sort === 'descend' && `${classPrefixCell}__icon-active`]"
                      @click.self="sortHandle('descend')"></Icon>
            </span>

            <!--过滤-->
            <span v-if="column.filterSlot || (column.filters && Array.isArray(column.filters))"
                  :class="[`${classPrefixCell}__icon`, `${classPrefix}__filter`]"
                  v-click-outside.capture="handleClickOutside">
                <Icon type="filter"
                      :class="[
                           column.__isFilterChecked && `${classPrefixCell}__icon-active`
                      ]"
                      ref="reference"
                      @click.stop="filterShow"></Icon>
                <Drop v-show="visible"
                          ref="dropDown"
                          :reference="this.$refs.reference"
                          :dropdownMatchSelectWidth="false"
                          :placement="column.placement || 'bottom'"
                          :render-html="renderHtml"
                          :isMinWidth="false"
                          v-model="visible">

                    <template v-if="column.filterSlot">
                        <table-slot-head :column="column" :slot-name="column.filterSlot"></table-slot-head>
                    </template>

                    <div v-else-if="!column.filterMultiple" :class="[`${classPrefix}__filter-list`]">
                        <div :class="[
                                 `${classPrefix}__filter-item`,
                                 !column.__filterCheckedValues.length && `${classPrefix}__filter-item-active`
                             ]"
                             @click.self="filterHandle()">{{t('cl.table.all')}}</div>
                        <div :class="[
                                 `${classPrefix}__filter-item`,
                                 column.__filterCheckedValues.includes(item.value) && `${classPrefix}__filter-item-active`
                             ]"
                             v-for="item in column.filters"
                             :key="item.value"
                             @click.self="filterHandle(item)">{{item.label}}</div>
                    </div>

                    <div v-else-if="column.filterMultiple" :class="[`${classPrefix}__filter-list`]">
                        <checkbox-group v-model="filterMultipleValue">
                            <div :class="[
                                     `${classPrefix}__filter-item`,
                                     column.__filterCheckedValues.includes(item.value) && `${classPrefix}__filter-item-active`
                                 ]"
                                 v-for="item in column.filters"
                                 :key="item.value">
                                    <checkbox :label="item.value">{{item.label}}</checkbox>
                            </div>
                        </checkbox-group>
                        <div :class="[`${classPrefix}__filter-footer`]">
                            <Button size="mini" type="primary"
                                    @click="filterMultiple">{{t('cl.table.filter')}}</Button>
                            <Button size="mini" @click="resetFilterMultiple">{{t('cl.table.reset')}}</Button>
                        </div>
                    </div>
                </Drop>
            </span>
        </template>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Checkbox from 'packages/checkbox'
    import CheckboxGroup from 'packages/checkbox-group'
    import Button from 'packages/button'
    import Drop from 'packages/base/drop'
    import tableSlotHead from './table-slot-head'
    import {directive as clickOutside} from 'v-click-outside-x';
    import Locale from 'main/mixins/locale'
    import Icon from 'packages/icon'

    export default {
        name: "TableHeadCell",
        directives: {clickOutside},
        mixins: [Locale],
        props: {
            column: Object,
            sortType: Array
        },
        inject: ['tableRoot'],
        data() {
            return {
                classPrefix: Config.classPrefix + '-table-head-cell',
                classPrefixCell: Config.classPrefix + '-table-cell',
                renderType: 'normal',
                isDefaultSort: null,//初始化时默认的排序方式
                visible: false,
                filterMultipleValue: [],
                renderHtml: true
            }
        },
        computed: {},
        components: {
            Checkbox,
            CheckboxGroup,
            Button,
            Icon,
            Drop,
            tableSlotHead
        },
        created() {
        },
        mounted() {
            this.setRenderType();
        },
        methods: {
            setRenderType() {
                let type = this.column.type;
                switch (type) {
                    case 'selection':
                        this.renderType = 'selection';
                        break;
                    case 'index':
                        this.renderType = 'index';
                        break;
                    default:
                        this.renderType = 'normal';
                        break;
                }
            },
            checkboxChange(value) {
                this.tableRoot.selectAll(value);
            },
            sortHandle(type) {
                this.tableRoot.sortHandle(this.column, type);
            },
            filterShow() {
                this.visible = !this.visible;
            },
            handleClickOutside(event) {
                if (this.visible && (this.column.filterMultiple || this.column.filterSlot)) {
                    if (this.renderHtml !== false) {
                        const {$el} = this.$refs.dropDown;
                        if ($el === event.target || $el.contains(event.target)) {
                            return;
                        }
                    }
                }
                this.closeDropDownPane(false);
            },
            closeDropDownPane(visible) {
                this.visible = visible;
            },
            filterHandle(filterItem) {
                this.tableRoot.filterHandle('single', this.column, filterItem ? [filterItem.value] : []);
                this.visible = false;
            },
            filterMultiple() {
                this.tableRoot.filterHandle('multiple', this.column, this.filterMultipleValue);
                this.visible = false;
            },
            resetFilterMultiple() {
                this.filterMultipleValue = [];
                this.tableRoot.filterHandle('multiple', this.column, []);
                this.visible = false;
            }
        },
        watch: {
            column: {
                handler(newVal) {
                    if (this.isDefaultSort === null && newVal.__sort) {
                        this.isDefaultSort = newVal.__sort;
                    }
                },
                deep: true,
                immediate: true,
            },
            isDefaultSort: {
                handler(newVal) {
                    this.$nextTick(() => {
                        newVal && newVal !== true && newVal !== 'remote' && this.sortHandle(newVal);
                    });
                },
                immediate: true
            },
            visible(newVal) {
                this.tableRoot.filterClick(this.column, newVal);
            }
        }
    }
</script>
