<template>
    <div :class="[
            'cl-date-pane',
            size && `cl-date-pane--${size}`
         ]">
        <div class="cl-date-pane__header">
            <span class="cl-date-pane__header-pre">
                <i class="cl-icon-arrow-left" @click.stop="jumpDate('pre-year')"></i>
                <i class="cl-icon-left" @click.stop="jumpDate('pre-month')" v-if="dateChangeIconShow"></i>
            </span>
            <span class="cl-date-pane__header-date">
                <span class="cl-date-pane__header-date-label" @click.stop="selectYear">{{this.year}}年</span>
                <span class="cl-date-pane__header-date-label" @click.stop="selectMonth" v-if="headerMonthShow">{{this.month}}月</span>
            </span>
            <span class="cl-date-pane__header-next">
                <i class="cl-icon-right" @click.stop="jumpDate('next-month')" v-if="dateChangeIconShow"></i>
                <i class="cl-icon-arrow-right" @click.stop="jumpDate('next-year')"></i>
            </span>
        </div>
        <div class="cl-date-pane__body">
            <cl-date-pane-date v-model="selectedDate"
                               :size="size"
                               :type="dateType"
                               :year="year"
                               :month="month"
                               @closeDatePane="closeDatePane"
                               @updateDate="updateDate"
                               v-show="dateType === 'date'"></cl-date-pane-date>
            <cl-date-pane-year v-model="selectedYear"
                               :size="size"
                               :type="dateType"
                               :year="year"
                               :month="month"
                               v-show="dateType === 'year'"></cl-date-pane-year>
            <cl-date-pane-month v-model="selectedMonth"
                                :size="size"
                                :type="dateType"
                                :year="year"
                                :month="month"
                                v-show="dateType === 'month'"></cl-date-pane-month>
        </div>
    </div>
</template>

<script>
    import ClDatePaneDate from './date-pane-date'
    import ClDatePaneYear from './date-pane-year'
    import ClDatePaneMonth from './date-pane-month'
    import {zero, dateFormat} from "../../../../utils/date";

    export default {
        name: "ClDatePane",
        props: {
            value: [String, Array],
            size: String,
            type: String,
            format: String,
        },
        data(){
            return {
                dateType: this.type,
                selectedDate: [],
                selectedYear: [],
                selectedMonth: [],
                year: '',
                month: '',
                weekList: [
                    {
                        id: '0',
                        key: 'week0',
                        name: '日'
                    },
                    {
                        id: '1',
                        key: 'week1',
                        name: '一'
                    },
                    {
                        id: '2',
                        key: 'week2',
                        name: '二'
                    },
                    {
                        id: '3',
                        key: 'week3',
                        name: '三'
                    },
                    {
                        id: '4',
                        key: 'week4',
                        name: '四'
                    },
                    {
                        id: '5',
                        key: 'week5',
                        name: '五'
                    },
                    {
                        id: '6',
                        key: 'week6',
                        name: '六'
                    }
                ]
            }
        },
        computed: {
            dateChangeIconShow(){
                return ['date', 'daterange'].includes(this.dateType)
            },
            headerMonthShow(){
                return this.dateType !== 'year'
            }
        },
        components: {
            ClDatePaneDate,
            ClDatePaneYear,
            ClDatePaneMonth
        },
        mounted() {
            this.updateDate();
        },
        methods: {
            jumpDate(type){
                let month;
                switch (type) {
                    case 'pre-year':
                        this.year = zero(parseInt(this.year) - 1);
                        break;
                    case 'pre-month':
                        month = parseInt(this.month) - 1;
                        if(month < 1){
                            month = 12;
                            this.year = parseInt(this.year) - 1;
                        }
                        this.month = zero(month);
                        break;
                    case 'next-month':
                        month = parseInt(this.month) + 1;
                        if(month > 12){
                            month = 1;
                            this.year = parseInt(this.year) + 1;
                        }
                        this.month = zero(month);
                        break;
                    case 'next-year':
                        this.year = zero(parseInt(this.year) + 1);
                        break;
                }
            },
            selectYear(){
                this.dateType = 'year';
            },
            selectMonth(){
                this.dateType = 'month';
            },
            updateDate(date){
                let nowDate = new Date();
                if(date) nowDate = new Date(date);
                this.year = dateFormat(nowDate, 'YYYY');
                this.month = dateFormat(nowDate, 'MM');
            },
            closeDatePane(){
                this.$emit('closeDatePane');
            },
        },
        watch: {
            selectedDate(newVal){
                this.$emit('input', newVal);
            }
        }
    }
</script>
