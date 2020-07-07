<template>
    <div :class="[
            'cl-date-pane-single',
            size && `cl-date-pane-single--${size}`
         ]">
        <div class="cl-date-pane-single__header" v-if="showDateHeader">
            <span class="cl-date-pane-single__header-pre">
                <i class="cl-icon-arrow-left" @click.stop="jumpDate('pre-year')"></i>
                <i class="cl-icon-left" @click.stop="jumpDate('pre-month')" v-if="dateChangeIconShow"></i>
            </span>
            <span class="cl-date-pane-single__header-date">
                <span class="cl-date-pane-single__header-date-label" @click.stop="updateCurrentType('year')">{{year}}{{t('cl.datePicker.year')}} </span>
                <span class="cl-date-pane-single__header-date-label" @click.stop="updateCurrentType('month')" v-if="headerMonthShow">{{month}}{{t('cl.datePicker.month')}}</span>
            </span>
            <span class="cl-date-pane-single__header-next">
                <i class="cl-icon-right" @click.stop="jumpDate('next-month')" v-if="dateChangeIconShow"></i>
                <i class="cl-icon-arrow-right" @click.stop="jumpDate('next-year')"></i>
            </span>
        </div>
        <div class="cl-date-pane-single__header" v-if="showTimeHeader">
            <span class="cl-date-pane-single__header-date">
                {{index === '0' ? t('cl.datePicker.startTime') : t('cl.datePicker.endTime')}}
            </span>
        </div>
        <div class="cl-date-pane-single__body">
            <template v-if="pickerType === 'date'">
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
            </template>
            <cl-date-pane-time :size="size"
                               :type="currentType"
                               :year="year"
                               :month="month"
                               :date="date"
                               :index="index"
                               :hover-date="hoverDate"
                               :currentDate="currentDate"
                               :is-range="isRange"
                               :format="format"
                               @update-time="updateSelectTime"
                               v-if="currentType === 'time' || currentType === 'timerange'"></cl-date-pane-time>
        </div>
    </div>
</template>

<script>
    import ClDatePaneTime from './date-pane-time'
    import ClDatePaneDate from './date-pane-date'
    import ClDatePaneYear from './date-pane-year'
    import ClDatePaneMonth from './date-pane-month'
    import {dateFormat, zero} from "main/utils/date";
    import Locale from "main/mixins/locale";

    export default {
        name: "ClDatePaneSingle",
        mixins: [Locale],
        inject: ['picker'],
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
            isRange: Boolean,
            pickerType: String,
        },
        data(){
            const currentType = ['date', 'daterange', 'datetime', 'datetimerange'].includes(this.type) ? 'date' : this.type;
            return {
                currentType: currentType,
                currentDate: {
                    year: new Date().getFullYear().toString(),
                    month: zero((new Date().getMonth() + 1)),
                    date: zero(new Date().getDate())
                },
            }
        },
        computed: {
            dateChangeIconShow(){
                return ['date', 'daterange', 'week'].includes(this.currentType)
            },
            headerMonthShow(){
                return !['year', 'month'].includes(this.currentType)
            },
            yearJumpStep(){
                return ['year'].includes(this.currentType) ? 10 : 1;
            },
            showDateHeader(){
                return !['time', 'timerange'].includes(this.currentType)
            },
            showTimeHeader(){
                return this.isRange && ['time', 'timerange'].includes(this.currentType)
            },
            selectDate(){
                return dateFormat(this.date[this.index], 'DD');
            },
        },
        components: {
            ClDatePaneTime,
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
            updateCurrentType(type){
                this.currentType = type;
            },
            handleHoverDate(date){
                this.$emit('hover-date', this.index, date);
            },
            updateSelectDate(date){
                date = [dateFormat(date[0], this.format)];
                this.$emit('update-date', this.index, date);
            },
            updateSelectTime(date){
                this.$emit('update-date', this.index, date, 'time');
            },
            updateSelectWeek(weekNum){
                this.$emit('update-date', this.index, [weekNum]);
            },
            updateSelectYear(year){
                if (this.type === 'year'){
                    this.updateSelectDate([year]);
                }else{
                    this.updateCurrentType('month');
                }
                this.updateSingleDate('update-year', year, null);
            },
            updateSelectMonth(month){
                if (['date', 'daterange', 'datetime', 'datetimerange'].includes(this.type)){
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
