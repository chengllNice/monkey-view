<template>
    <div :class="[
            `${classPrefix}`,
            size && `${classPrefix}--${size}`
         ]">
        <div :class="[`${classPrefix}__row`]" v-for="(row, rowIndex) in monthList" :key="rowIndex">
            <span v-for="_month in row"
                  :key="_month.id"
                  :class="[
                        `${classPrefixItem}__col`,
                        !(isSelectYear && _month.id === selectedMonth) && `${classPrefixItem}__hover`,
                        _month.id === currentDate.month && currentDate.year === year && `${classPrefixItem}__now`,
                        isSelectYear && _month.id === selectedMonth && `${classPrefixItem}__selected`
                  ]"
                  @click.stop="handleSelectMonth(_month)">
                <em>{{_month.name}}</em>
            </span>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import { dateObj} from "main/utils/date";

    export default {
        name: "DatePaneMonth",
        props: {
            size: String,
            type: String,
            format: String,
            year: Number,
            month: Number,
            date: {
                type: Array,
                default(){
                    return []
                }
            },
            currentDate: Object,
            index: Number,
        },
        data(){
            return {
                classPrefix: Config.classPrefix + '-date-pane-month',
                classPrefixItem: Config.classPrefix + '-date-pane-item',
                monthList: [],
            }
        },
        computed: {
            selectedMonth(){
                let month = this.date[this.index] ? this.date[this.index].getMonth() + 1 : null;
                return this.type === 'month' ? month : this.month;
            },
            isSelectYear(){
                return this.date[this.index] ? this.date[this.index].getFullYear() === this.year : false;
            }
        },
        mounted() {
            this.setMonthList();
        },
        methods: {
            // 获取年份列表
            setMonthList(year){
                if(!year && !this.year) return;
                let monthList = dateObj.month;
                let newMonthList = [];
                let row = [];
                monthList.forEach((item, index)=>{
                    if(index % 3 === 0){
                        row = [];
                        newMonthList.push(row);
                    }
                    row.push(item);
                });
                this.monthList = newMonthList;
            },
            handleSelectMonth(month){
                this.$emit('update-month', month.id);
            },
        },
        watch: {
            month() {
                if (this.type === 'month') {
                    this.setMonthList();
                }
            },
            type(newVal) {
                newVal === 'month' && this.setMonthList();
            }
        }
    }
</script>
