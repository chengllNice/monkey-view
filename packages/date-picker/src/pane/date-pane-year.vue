<template>
    <div :class="[
            `${classPrefix}`,
            size && `${classPrefix}--${size}`
         ]">
        <div :class="[`${classPrefix}__row`]" v-for="(row, rowIndex) in yearList" :key="rowIndex">
            <span v-for="_year in row"
                  :key="_year.id"
                  :class="[
                      `${classPrefixItem}_col`,
                      selectYear !== _year.id && `${classPrefixItem}__hover`,
                      _year.id === currentDate.year && `${classPrefixItem}__now`,
                      selectYear === _year.id && `${classPrefixItem}__selected`
                  ]"
                  @click.stop="handleSelectYear(_year)">
            <em>{{_year.name}}</em>
        </span>
        </div>

    </div>
</template>

<script>
    import Config from 'main/config/config'
    import {dateFormat, yearListInit} from "main/utils/date";

    export default {
        name: "DatePaneYear",
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
                classPrefix: Config.classPrefix + '-date-pane-year',
                classPrefixItem: Config.classPrefix + '-date-pane-item',
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
