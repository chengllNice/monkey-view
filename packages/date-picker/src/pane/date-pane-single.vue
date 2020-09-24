<template>
    <div :class="[
            `${classPrefix}`,
         ]">
        <div :class="[`${classPrefix}__header`]" v-if="showDateHeader">
            <span :class="[`${classPrefix}__header-pre`]">
                <Icon type="arrow-left" @click.stop="jumpDate('pre-year')"></Icon>
                <Icon type="left" @click.stop="jumpDate('pre-month')" v-if="dateChangeIconShow"></Icon>
            </span>
            <span :class="[`${classPrefix}__header-date`]">
                <span :class="[`${classPrefix}__header-date-label`]"
                      @click.stop="updateCurrentType('year')">{{year}}{{t('m.datePicker.year')}} </span>
                <span :class="[`${classPrefix}__header-date-label`]"
                      @click.stop="updateCurrentType('month')"
                      v-if="headerMonthShow">{{month}}{{t('m.datePicker.month')}}</span>
            </span>
            <span :class="[`${classPrefix}__header-next`]">
                <Icon type="right" @click.stop="jumpDate('next-month')" v-if="dateChangeIconShow"></Icon>
                <Icon type="arrow-right" @click.stop="jumpDate('next-year')"></Icon>
            </span>
        </div>
        <div :class="[`${classPrefix}__header`]" v-if="showTimeHeader">
            <span :class="[`${classPrefix}__header-date`]">
                {{index === 0 ? t('m.datePicker.startTime') : t('m.datePicker.endTime')}}
            </span>
        </div>
        <div :class="[`${classPrefix}__body`]">
            <template v-if="pickerType === 'date'">
                <date-pane-date :type="currentType"
                                :year="year"
                                :month="month"
                                :date="date"
                                :index="index"
                                :hover-date="hoverDate"
                                :currentDate="currentDate"
                                :is-range="isRange"
                                @updateWeek="updateSelectWeek"
                                @updateDate="updateSelectDate"
                                @hover-date="handleHoverDate"
                                v-show="currentType === 'date' || currentType === 'week'"></date-pane-date>
                <date-pane-year :type="currentType"
                                :year="year"
                                :month="month"
                                :date="date"
                                :index="index"
                                :currentDate="currentDate"
                                :is-range="isRange"
                                @update-year="updateSelectYear"
                                v-show="currentType === 'year'"></date-pane-year>
                <date-pane-month :type="currentType"
                                 :year="year"
                                 :month="month"
                                 :date="date"
                                 :index="index"
                                 :currentDate="currentDate"
                                 :is-range="isRange"
                                 @update-month="updateSelectMonth"
                                 v-show="currentType === 'month'"></date-pane-month>
            </template>
            <date-pane-time :type="currentType"
                            :year="year"
                            :month="month"
                            :date="date"
                            :index="index"
                            :hover-date="hoverDate"
                            :currentDate="currentDate"
                            :is-range="isRange"
                            @update-time="updateSelectTime"
                            v-show="currentType === 'time' || currentType === 'timerange'"></date-pane-time>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Icon from 'packages/icon'
    import DatePaneTime from './date-pane-time'
    import DatePaneDate from './date-pane-date'
    import DatePaneYear from './date-pane-year'
    import DatePaneMonth from './date-pane-month'
    import Locale from "main/mixins/locale";


    export default {
        name: "DatePaneSingle",
        mixins: [Locale],
        inject: ['picker'],
        props: {
            type: String,
            index: Number,
            year: Number,
            month: Number,
            date: Array,
            hoverDate: Date,
            isRange: Boolean,
            pickerType: String,
        },
        data() {
            const currentType = ['date', 'daterange', 'datetime', 'datetimerange'].includes(this.type) ? 'date' : this.type;
            let nowDate = new Date();
            return {
                classPrefix: Config.classPrefix + '-date-pane-single',
                currentType: currentType,
                currentDate: {
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate()
                },
            }
        },
        computed: {
            dateChangeIconShow() {
                return ['date', 'daterange', 'week'].includes(this.currentType)
            },
            headerMonthShow() {
                return !['year', 'month'].includes(this.currentType)
            },
            yearJumpStep() {
                return ['year'].includes(this.currentType) ? 10 : 1;
            },
            showDateHeader() {
                return !['time', 'timerange'].includes(this.currentType)
            },
            showTimeHeader() {
                return this.isRange && ['time', 'timerange'].includes(this.currentType)
            },
        },
        components: {
            Icon,
            DatePaneTime,
            DatePaneDate,
            DatePaneYear,
            DatePaneMonth
        },
        methods: {
            jumpDate(type) {
                this.updateSingleDate(type, null, null);
            },
            updateCurrentType(type) {
                this.currentType = type;
            },
            handleHoverDate(date) {
                this.$emit('hover-date', this.index, date);
            },
            updateSelectDate(date) {
                date = [date[0]];
                this.$emit('update-date', this.index, date);
            },
            updateSelectTime(date) {
                this.$emit('update-date', this.index, date, 'time');
            },
            updateSelectWeek(date) {
                this.$emit('update-date', this.index, date);
            },
            updateSelectYear(year) {
                if (this.type === 'year') {
                    this.updateSelectDate([new Date(year.toString())]);
                } else {
                    this.updateCurrentType('month');
                }
                this.updateSingleDate('update-year', year, null);
            },
            updateSelectMonth(month) {
                if (['date', 'daterange', 'datetime', 'datetimerange'].includes(this.type)) {
                    this.currentType = 'date';
                } else if (this.type === 'week') {
                    this.currentType = 'week';
                } else {
                    let date = new Date(this.year, month - 1);
                    this.updateSelectDate([date]);
                }
                this.updateSingleDate('update-month', null, month);
            },
            updateSingleDate(type, year, month) {
                year = year || this.year;
                month = month || this.month;
                this.$emit('update-pane', {
                    type,
                    year: year,
                    month: month,
                    jumpStep: this.yearJumpStep,
                    index: this.index,
                });
            },
        },
    }
</script>
