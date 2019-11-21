<template>
    <div :class="[
            'cl-date-pane-year',
            size && `cl-date-pane-year--${size}`
         ]">
        <div class="cl-date-pane-year__row" v-for="(row, rowIndex) in yearList" :key="rowIndex">
            <span v-for="_year in row"
                  :key="_year.id"
                  :class="[
                    'cl-date-pane-item__col',
                    'cl-date-pane-item__hover',
                    _year.id === currentDate.year && 'cl-date-pane-item__now',
                    selectYear === _year.id && 'cl-date-pane-item__selected'
                  ]"
                  @click.stop="handleSelectYear(_year)">
            <em>{{_year.name}}</em>
        </span>
        </div>

    </div>
</template>

<script>
    import {dateFormat, yearListInit} from "../../../../utils/date";

    export default {
        name: "ClDatePaneYear",
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
        data() {
            return {
                yearList: [],
            }
        },
        computed: {
            selectYear(){
                return dateFormat(this.date[this.index], 'YYYY');
            }
        },
        mounted() {
            this.setYearList();
        },
        methods: {
            // 获取年份列表
            setYearList(year){
                if(!year && !this.year) return;
                let yearList = yearListInit(year || this.year);
                let newYearList = [];
                let row = [];
                yearList.forEach((item, index)=>{
                    if(index % 3 === 0){
                        row = [];
                        newYearList.push(row);
                    }
                    row.push(item);
                });
                this.yearList = newYearList;
            },
            handleSelectYear(year){
                this.$emit('update-year', year.id);
            },
        },
        watch: {
            year() {
                if (this.type === 'year') {
                    this.setYearList();
                }
            },
            type(newVal) {
                newVal === 'year' && this.setYearList();
            }
        }
    }
</script>
