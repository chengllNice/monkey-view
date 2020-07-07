<template>
    <div :class="[
            'cl-date-pane-month',
            size && `cl-date-pane-month--${size}`
         ]">
        <div class="cl-date-pane-month__row" v-for="(row, rowIndex) in monthList" :key="rowIndex">
            <span v-for="_month in row"
                  :key="_month.key"
                  :class="[
                    'cl-date-pane-item__col',
                    !(isSelectYear && _month.id === selectedMonth) && 'cl-date-pane-item__hover',
                    _month.id === currentDate.month && currentDate.year === year && 'cl-date-pane-item__now',
                    isSelectYear && _month.id === selectedMonth && 'cl-date-pane-item__selected'
              ]"
                  @click.stop="handleSelectMonth(_month)">
            <em>{{_month.name}}</em>
        </span>
        </div>

    </div>
</template>

<script>
    import { dateObj, dateFormat} from "main/utils/date";

    export default {
        name: "ClDatePaneMonth",
        props: {
            size: String,
            type: String,
            format: String,
            year: String,
            month: String,
            date: {
                type: Array,
                default(){
                    return []
                }
            },
            currentDate: Object,
            index: String,
        },
        data(){
            return {
                monthList: [],
            }
        },
        computed: {
            selectedMonth(){
                return this.type === 'month' ? dateFormat(this.date[this.index], 'MM') : this.month;
            },
            isSelectYear(){
                return dateFormat(this.date[this.index], 'YYYY') === this.year;
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
