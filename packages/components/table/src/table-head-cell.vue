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
            <span v-if="column.sortOrder" class="cl-table-head-cell__sort">
                <i class="cl-icon-caretup" :class="[column.__sortOrder === 'ascend' && 'cl-table-head-cell__sort-active']" @click.stop="sortHandle('ascend')"></i>
                <i class="cl-icon-caretdown" :class="[column.__sortOrder === 'descend' && 'cl-table-head-cell__sort-active']" @click.stop="sortHandle('descend')"></i>
            </span>
        </template>
    </div>
</template>

<script>
    import ClCheckbox from '../../checkbox/src/checkbox'
    export default {
        name: "ClTableHeadCell",
        props: {
            column: Object,
        },
        inject: ['tableRoot'],
        data() {
            return {
                renderType: 'normal'
            }
        },
        computed: {},
        components: {
            ClCheckbox
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
            }
        }
    }
</script>
