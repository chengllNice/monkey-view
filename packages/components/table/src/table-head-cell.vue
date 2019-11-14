<template>
    <div class="cl-table-cell cl-table-head-cell"
         :class="[
            column.align && `cl-table-cell--${column.align}`
         ]">
        <template v-if="renderType === 'selection'">
            <cl-checkbox class="cl-table-cell__checkbox"
                         v-model="column.defaultStatusProps.isChecked"
                         :disabled="column.defaultStatusProps.isDisabled"
                         @change="checkboxChange"></cl-checkbox>
        </template>
        <template v-if="renderType === 'index'">
            #
        </template>
        <template v-if="renderType === 'normal'">
            {{column.title}}
            <!--排序-->
            <span v-if="column.sortOrder && sortOrderType.includes(column.sortOrder)"
                  class="cl-table-head-cell__sort">
                <i class="cl-icon-caretup" :class="[column.__sortOrder === 'ascend' && 'cl-table-head-cell__sort-active']" @click.stop="sortHandle('ascend')"></i>
                <i class="cl-icon-caretdown" :class="[column.__sortOrder === 'descend' && 'cl-table-head-cell__sort-active']" @click.stop="sortHandle('descend')"></i>
            </span>

            <!--过滤-->
            <span v-if="column.filters" class="cl-table-head-cell__filter">
                <i class="cl-icon-filter-solid" ref="reference" @click.stop="filterShow"></i>
                <DropDown v-show="visible"
                          ref="dropDown"
                          :reference="this.$refs.reference"
                          :dropdownMatchSelectWidth="false"
                          placement="bottom"
                          v-model="visible">
                    <cl-list size="mini" :split="false">
                        <cl-list-item v-for="item in column.filters" :key="item.value">{{item.label}}</cl-list-item>
                    </cl-list>
                </DropDown>
            </span>
        </template>
    </div>
</template>

<script>
    import ClCheckbox from '../../checkbox/src/checkbox'
    import DropDown from '../../select/src/drop-down.vue'
    import ClList from '../../list/src/list.vue'
    import ClListItem from '../../list/src/list-item.vue'
    export default {
        name: "ClTableHeadCell",
        props: {
            column: Object,
            sortOrderType: Array
        },
        inject: ['tableRoot'],
        data() {
            return {
                renderType: 'normal',
                isDefaultSort: null,//初始化时默认的排序方式
                visible: false,
            }
        },
        computed: {},
        components: {
            ClCheckbox,
            DropDown,
            ClList,
            ClListItem
        },
        created() {
        },
        mounted() {
            this.setRenderType();
        },
        methods: {
            setRenderType(){
                let type = this.column.headSlot ? 'slot' : this.column.type;
                switch (type) {
                    case 'slot':
                        this.renderType = 'slot';
                        break;
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
            }
        },
        watch: {
            column: {
                handler(newVal){
                    if(this.isDefaultSort === null && newVal.__sortOrder){
                        this.isDefaultSort = newVal.__sortOrder;
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
