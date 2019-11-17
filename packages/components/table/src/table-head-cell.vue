<template>
    <div class="cl-table-cell cl-table-head-cell"
         :class="[
            column.align && `cl-table-cell--${column.align}`
         ]">
        <template v-if="renderType === 'selection'">
            <cl-checkbox class="cl-table-cell__checkbox"
                         v-model="column.__isChecked"
                         :disabled="column.__isDisabled"
                         @change="checkboxChange"></cl-checkbox>
        </template>
        <template v-if="renderType === 'index'">
            #
        </template>
        <template v-if="renderType === 'normal'">
            <table-slot-head v-if="column.slotHead" :column="column"></table-slot-head>
            <template v-else>{{column.title}}</template>
            <!--排序-->
            <span v-if="column.sort && sortType.includes(column.sort)"
                  class="cl-table-cell__icon cl-table-head-cell__sort">
                <i class="cl-icon-caretup" :class="[column.__sort === 'ascend' && 'cl-table-cell__icon-active']" @click.self="sortHandle('ascend')"></i>
                <i class="cl-icon-caretdown" :class="[column.__sort === 'descend' && 'cl-table-cell__icon-active']" @click.self="sortHandle('descend')"></i>
            </span>

            <!--过滤-->
            <span v-if="column.filters && Array.isArray(column.filters)"
                  class="cl-table-cell__icon cl-table-head-cell__filter"
                  v-click-outside.capture="handleClickOutside">
                <i class="cl-icon-filter-solid"
                   :class="[
                        column.__isFilterChecked && 'cl-table-cell__icon-active'
                   ]"
                   ref="reference"
                   @click.stop="filterShow"></i>
                <DropDown v-show="visible"
                          ref="dropDown"
                          :reference="this.$refs.reference"
                          :dropdownMatchSelectWidth="false"
                          placement="bottom"
                          v-model="visible">
                    <div v-if="!column.filterMultiple" class="cl-table-head-cell__filter-list">
                        <div class="cl-table-head-cell__filter-item"
                                      :class="[!column.__filterCheckedValues.length && 'cl-table-head-cell__filter-item-active']"
                                      @click.self="filterHandle()">全部</div>
                        <div class="cl-table-head-cell__filter-item"
                                      :class="[column.__filterCheckedValues.includes(item.value) && 'cl-table-head-cell__filter-item-active']"
                                      v-for="item in column.filters"
                                      :key="item.value"
                                      @click.self="filterHandle(item)">{{item.label}}</div>
                    </div>

                    <div v-else-if="column.filterMultiple" class="cl-table-head-cell__filter-list">
                        <cl-checkbox-group v-model="filterMultipleValue">
                            <div class="cl-table-head-cell__filter-item"
                                 :class="[column.__filterCheckedValues.includes(item.value) && 'cl-table-head-cell__filter-item-active']"
                                 v-for="item in column.filters"
                                 :key="item.value">
                                    <cl-checkbox :label="item.value">{{item.label}}</cl-checkbox>
                            </div>
                        </cl-checkbox-group>
                        <div class="cl-table-head-cell__filter-footer">
                            <cl-button size="mini" type="primary" @click="filterMultiple">筛选</cl-button>
                            <cl-button size="mini" @click="resetFilterMultiple">重置</cl-button>
                        </div>
                    </div>
                </DropDown>
            </span>
        </template>
    </div>
</template>

<script>
    import ClCheckbox from '../../checkbox/src/checkbox'
    import ClCheckboxGroup from '../../checkbox/src/checkbox-group'
    import ClButton from '../../button/src/button'
    import DropDown from '../../select/src/drop-down.vue'
    import tableSlotHead from './table-slot-head'
    import {directive as clickOutside} from 'v-click-outside-x';
    export default {
        name: "ClTableHeadCell",
        directives: {clickOutside},
        props: {
            column: Object,
            sortType: Array
        },
        inject: ['tableRoot'],
        data() {
            return {
                renderType: 'normal',
                isDefaultSort: null,//初始化时默认的排序方式
                visible: false,
                filterMultipleValue: [],
            }
        },
        computed: {},
        components: {
            ClCheckbox,
            ClCheckboxGroup,
            ClButton,
            DropDown,
            tableSlotHead
        },
        created() {
        },
        mounted() {
            this.setRenderType();
        },
        methods: {
            setRenderType(){
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
            checkboxChange(value){
                this.tableRoot.allCheckboxChange(this.column, value);
            },
            sortHandle(type){
                this.tableRoot.sortHandle(this.column, type);
            },
            filterShow(){
                this.visible = !this.visible;
            },
            handleClickOutside(){
                this.visible = false;
            },
            filterHandle(filterItem){
                console.log(filterItem,'filterHandle')
                this.tableRoot.filterHandle('single', this.column, filterItem ? [filterItem.value] : []);
                this.visible = false;
            },
            filterMultiple(){
                this.tableRoot.filterHandle('multiple', this.column, this.filterMultipleValue);
                this.visible = false;
            },
            resetFilterMultiple(){
                this.filterMultipleValue = [];
                this.tableRoot.filterHandle('multiple', this.column, []);
                this.visible = false;
            }
        },
        watch: {
            column: {
                handler(newVal){
                    if(this.isDefaultSort === null && newVal.__sort){
                        this.isDefaultSort = newVal.__sort;
                    }
                },
                deep: true,
                immediate: true,
            },
            isDefaultSort: {
                handler(newVal){
                    this.$nextTick(()=>{
                        newVal && newVal !== true && newVal !== 'remote' && this.sortHandle(newVal);
                    });
                },
                immediate: true
            }
        }
    }
</script>
