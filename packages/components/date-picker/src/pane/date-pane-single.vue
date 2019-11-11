<template>
    <div :class="[
            'cl-date-pane-single',
            size && `cl-date-pane-single--${size}`
         ]">
        <div class="cl-date-pane-single__header">
            <span class="cl-date-pane-single__header-pre">
                <i class="cl-icon-arrow-left" @click.stop="jumpDate('pre-year')"></i>
                <i class="cl-icon-left" @click.stop="jumpDate('pre-month')" v-if="dateChangeIconShow"></i>
            </span>
            <span class="cl-date-pane-single__header-date">
                <span class="cl-date-pane-single__header-date-label" @click.stop="selectYear">{{year}}年</span>
                <span class="cl-date-pane-single__header-date-label" @click.stop="selectMonth" v-if="headerMonthShow">{{month}}月</span>
            </span>
            <span class="cl-date-pane-single__header-next">
                <i class="cl-icon-right" @click.stop="jumpDate('next-month')" v-if="dateChangeIconShow"></i>
                <i class="cl-icon-arrow-right" @click.stop="jumpDate('next-year')"></i>
            </span>
        </div>
        <div class="cl-date-pane-single__body">
            <cl-date-pane-date v-model="selectedDateValue"
                               :size="size"
                               :type="currentType"
                               :year="year"
                               :month="month"
                               @updateDate="updateDate"
                               v-show="currentType === 'date'"></cl-date-pane-date>
            <cl-date-pane-year v-model="selectedYearValue"
                               :size="size"
                               :type="currentType"
                               :year="year"
                               :month="month"
                               @update-year="updateYear"
                               v-show="currentType === 'year'"></cl-date-pane-year>
            <cl-date-pane-month v-model="selectedMonthValue"
                                :size="size"
                                :type="currentType"
                                :year="year"
                                :month="month"
                                @update-month="updateMonth"
                                v-show="currentType === 'month'"></cl-date-pane-month>
        </div>
    </div>
</template>

<script>
    import ClDatePaneDate from './date-pane-date'
    import ClDatePaneYear from './date-pane-year'
    import ClDatePaneMonth from './date-pane-month'
    import {zero, dateFormat} from "../../../../utils/date";

    export default {
        name: "ClDatePaneSingle",
        props: {
            value: Array,
            size: String,
            type: String,
            format: String,
            index: String,
            year: String,
            month: String,
            isRange: Boolean,
        },
        data(){
            const currentType = ['date', 'daterange'].includes(this.type) ? 'date' : this.type;
            return {
                currentType: currentType,
                selectedDateValue: [],
                selectedYearValue: '',
                selectedMonthValue: '',
            }
        },
        computed: {
            dateChangeIconShow(){
                return ['date', 'daterange'].includes(this.currentType)
            },
            headerMonthShow(){
                return !['year', 'month'].includes(this.currentType)
            },
            yearJumpStep(){
                return ['year'].includes(this.currentType) ? 10 : 1;
            },
        },
        components: {
            ClDatePaneDate,
            ClDatePaneYear,
            ClDatePaneMonth
        },
        mounted() {

        },
        methods: {
            jumpDate(type){
                this.updateSingleDate(type, null, null);
            },
            selectYear(){
                this.currentType = 'year';
            },
            selectMonth(){
                this.currentType = 'month';
            },
            updateDate(date){
                this.$emit('update-value', this.index, date);
            },
            updateYear(year){
                this.selectMonth();
                this.updateSingleDate('update-year', year, null);
            },
            updateMonth(month){
                this.currentType = 'date';
                this.updateSingleDate('update-month', null, month);
            },
            updateSingleDate(type, year, month, flag = true){
                year = year || this.year;
                month = month || this.month;
                this.$emit('update-date', {
                    type,
                    year: year,
                    month: month,
                    jumpStep: this.yearJumpStep,
                    index: this.index,
                    isUpdateRightDate: flag,//range状态下是否要更新另一个日期框
                });
            },
        },
        watch: {
            year(newVal, oldVal){
                if(newVal !== oldVal) {
                    // this.updateDate(new Date(newVal, parseInt(this.currentMonth) - 1));
                }
            },
            month(newVal, oldVal){
                if(newVal !== oldVal) {
                    // this.updateDate(new Date(this.currentYear, parseInt(newVal) - 1));
                }
            }
        }
    }
</script>
