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
                <span class="cl-date-pane-single__header-date-label" @click.stop="handleSelectYear">{{year}}年</span>
                <span class="cl-date-pane-single__header-date-label" @click.stop="handleSelectMonth" v-if="headerMonthShow">{{month}}月</span>
            </span>
            <span class="cl-date-pane-single__header-next">
                <i class="cl-icon-right" @click.stop="jumpDate('next-month')" v-if="dateChangeIconShow"></i>
                <i class="cl-icon-arrow-right" @click.stop="jumpDate('next-year')"></i>
            </span>
        </div>
        <div class="cl-date-pane-single__body">
            <cl-date-pane-date :size="size"
                               :type="currentType"
                               :year="year"
                               :month="month"
                               :date="date"
                               :index="index"
                               :hover-date="hoverDate"
                               :currentDate="currentDate"
                               :is-range="isRange"
                               :format="format"
                               @updateWeek="updateSelectWeek"
                               @updateDate="updateSelectDate"
                               @hover-date="handleHoverDate"
                               v-show="currentType === 'date' || currentType === 'week'"></cl-date-pane-date>
            <cl-date-pane-year :size="size"
                               :type="currentType"
                               :year="year"
                               :month="month"
                               :date="date"
                               :index="index"
                               :currentDate="currentDate"
                               :is-range="isRange"
                               :format="format"
                               @update-year="updateSelectYear"
                               v-show="currentType === 'year'"></cl-date-pane-year>
            <cl-date-pane-month :size="size"
                                :type="currentType"
                                :year="year"
                                :month="month"
                                :date="date"
                                :index="index"
                                :currentDate="currentDate"
                                :is-range="isRange"
                                :format="format"
                                @update-month="updateSelectMonth"
                                v-show="currentType === 'month'"></cl-date-pane-month>
        </div>
    </div>
</template>

<script>
    import ClDatePaneDate from './date-pane-date'
    import ClDatePaneYear from './date-pane-year'
    import ClDatePaneMonth from './date-pane-month'
    import {dateFormat, zero} from "../../../../utils/date";

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
            date: Array,
            hoverDate: String,
            isRange: Boolean
        },
        data(){
            const currentType = ['date', 'daterange'].includes(this.type) ? 'date' : this.type;
            return {
                currentType: currentType,
                currentDate: {
                    year: new Date().getFullYear().toString(),
                    month: zero((new Date().getMonth() + 1)),
                    date: zero(new Date().getDate())
                }
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
            handleSelectYear(){
                this.currentType = 'year';
            },
            handleSelectMonth(){
                this.currentType = 'month';
            },
            handleHoverDate(date){
                this.$emit('hover-date', this.index, date);
            },
            updateSelectDate(date){
                date = [dateFormat(date[0], this.format)];
                this.$emit('update-date', this.index, date);
            },
            updateSelectWeek(weekNum){
                this.$emit('update-date', this.index, [weekNum]);
            },
            updateSelectYear(year){
                if (this.type === 'year'){
                    this.updateSelectDate([year]);
                }else{
                    this.handleSelectMonth();
                }
                this.updateSingleDate('update-year', year, null);
            },
            updateSelectMonth(month){
                if (this.type === 'date' || this.type === 'daterange'){
                    this.currentType = 'date';
                }else if(this.type === 'week'){
                    this.currentType = 'week';
                }else{
                    let date = dateFormat(new Date(this.year, parseInt(month) - 1), this.format);
                    this.updateSelectDate([date]);
                }
                this.updateSingleDate('update-month', null, month);
            },
            updateSingleDate(type, year, month, flag = true){
                year = year || this.year;
                month = month || this.month;
                this.$emit('update-pane', {
                    type,
                    year: year,
                    month: month,
                    jumpStep: this.yearJumpStep,
                    index: this.index,
                    isUpdateOtherDate: flag,//range状态下是否要更新另一个日期框
                });
            },
        },
        watch: {

        }
    }
</script>
