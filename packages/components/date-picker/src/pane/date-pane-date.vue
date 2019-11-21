<template>
    <div :class="[
            'cl-date-pane-date',
            size && `cl-date-pane-date--${size}`,
            datePicker.showWeekNumber && 'cl-date-pane-date--show-week-number'
         ]">
        <div class="cl-date-pane-date__week">
            <span class="cl-date-pane-item__col cl-date-pane-item__week" v-for="week in weekList" :key="week.key">
                <em>{{week.name}}</em>
            </span>
        </div>
        <div class="cl-date-pane-date__date">
            <div :class="[
                    'cl-date-pane-date__date-row',
                    type === 'week' && 'cl-date-pane-date__date-row-week'
                 ]"
                 v-for="(row, rowIndex) in dateList"
                 :key="rowIndex"
                 @click.capture="handleSelectWeek(rowIndex)">
                <template v-if="datePicker.showWeekNumber">
                    <span :class="[
                            'cl-date-pane-item__col',
                            'cl-date-pane-item__week-number',
                          ]">
                        <em>{{weekNumbers[rowIndex]}}</em>
                    </span>
                </template>
                <template>
                    <span v-for="dateItem in row"
                          :key="dateItem.originDate"
                          :class="[
                            'cl-date-pane-item__col',
                            type === 'date' && 'cl-date-pane-item__hover',
                            dateItem.isNowDate && 'cl-date-pane-item__now',
                            !dateItem.isNowMonth && 'cl-date-pane-item__no-now-month',
                            date.includes(dateItem.key) && dateItem.isNowMonth && 'cl-date-pane-item__selected',
                            !date.includes(dateItem.key) && dateItem.isBetween && 'cl-date-pane-item__between',
                            dateItem.isDisabled && 'cl-date-pane-item__disabled',
                          ]"
                          @mouseenter="mouseEnter(dateItem)"
                          @mouseleave="mouseLeave(dateItem)"
                          @click="handleSelectDate(dateItem)">
                        <em>{{dateItem.date}}</em>
                    </span>
                </template>
            </div>
        </div>
        <!--<span v-for="dateItem in dateList"-->
        <!--:key="dateItem.originDate"-->
        <!--:class="[-->
        <!--'cl-date-pane-item__col',-->
        <!--dateItem.isNowDate && 'cl-date-pane-item__now',-->
        <!--!dateItem.isNowMonth && 'cl-date-pane-item__no-now-month',-->
        <!--date.includes(dateItem.key) && dateItem.isNowMonth && 'cl-date-pane-item__selected',-->
        <!--dateItem.isBetween && 'cl-date-pane-item__hover',-->
        <!--dateItem.isDisabled && 'cl-date-pane-item__disabled',-->
        <!--]"-->
        <!--@mouseenter="mouseEnter(dateItem)"-->
        <!--@mouseleave="mouseLeave(dateItem)"-->
        <!--@click.stop="handleSelectDate(dateItem)">{{dateItem.date}}</span>-->
    </div>
</template>

<script>
    import {dateOnMonth, dateObj, dateFormat, getWeekNumber, zero} from "../../../../utils/date";

    export default {
        name: "ClDatePaneDate",
        inject: ['datePicker'],
        props: {
            size: String,
            type: String,
            format: String,
            year: String,
            month: String,
            date: {
                type: Array,
                default() {
                    return []
                }
            },
            currentDate: Object,
            isRange: Boolean,
            hoverDate: String,
            index: String,
        },
        data() {
            return {
                dateList: [],
                weekNumbers: [],
                weekList: dateObj.week,
            }
        },
        computed: {},
        mounted() {
            this.setDateList();
        },
        methods: {
            setWeekNumbers() {
                let weekNumbers = [];
                this.dateList.forEach(row => {
                    //以周三为基准算当前是第几周
                    // let new Date(row[6].originDate);
                    // let startWeek = .getDay();
                    weekNumbers.push(getWeekNumber(row[6].originDate));
                });
                this.weekNumbers = weekNumbers;
            },
            // 获取日期列表
            setDateList() {
                if (!this.year || !this.month) return;
                let dateList = dateOnMonth(this.year, this.month);
                let newDateList = [];
                let row = [];
                dateList.forEach((item, index) => {
                    item.isBetween = false;
                    item.isDisabled = false;
                    if (typeof this.datePicker.disabledDate === 'function') {
                        item.isDisabled = this.datePicker.disabledDate(item.key);
                    }
                    item.key = dateFormat(item.key, this.format);
                    if (this.isRange && this.date.length === 2 && item.key > this.date[0] && item.key < this.date[1]) {
                        item.isBetween = true;
                    }
                    if (index % 7 === 0) {
                        row = [];
                        newDateList.push(row);
                    }
                    row.push(item);
                });
                this.dateList = newDateList;
                (this.datePicker.showWeekNumber || this.type === 'week') && this.setWeekNumbers();
                this.clearHover(true);
            },
            handleSelectDate(date) {
                if (date.isDisabled || this.type === 'week') return;
                if (this.date.length === 2) {
                    this.clearHover();
                }
                this.$emit('updateDate', [date.key]);
            },
            handleSelectWeek(rowIndex){
                let emitValue = this.format.replace('YYYY', this.year).replace('WW', zero(this.weekNumbers[rowIndex]));
                this.$emit('updateWeek', emitValue);
            },
            mouseEnter(dateItem) {
                if(this.type === 'week') return;
                if (this.isRange && this.date.length === 1) {
                    if (dateItem.isNowMonth) {
                        dateItem.isBetween = true;
                    }
                    this.$emit('hover-date', dateItem.key);//range时清除另一个date-pane的hover效果
                }
            },
            mouseLeave(dateItem) {
                if (dateItem.isNowMonth) {
                    if (this.date.length === 2 && dateItem.key > this.date[0] && dateItem.key < this.date[1]) {
                        dateItem.isBetween = true;
                    } else {
                        dateItem.isBetween = false;
                    }
                }
            },
            rangeHovering(date) {
                if (this.date.length === 1) {
                    this.dateList.forEach(row => {
                        row.forEach(item => {
                            if (date > this.date[0]) {
                                if (item.key <= date && item.key > this.date[0] && item.isNowMonth) {
                                    item.isBetween = true;
                                } else {
                                    item.isBetween = false;
                                }
                            } else {
                                if (item.key >= date && item.key < this.date[0] && item.isNowMonth) {
                                    item.isBetween = true;
                                } else {
                                    item.isBetween = false;
                                }
                            }
                        })
                    })
                }
            },
            // 清除hover效果, 如果noMonth存在只清除不是当前月的hover效果
            clearHover(noMonth = false) {
                this.dateList.forEach(row => {
                    row.forEach(item => {
                        if (noMonth) {
                            if (!item.isNowMonth) {
                                item.isBetween = false;
                            }
                        } else {
                            item.isBetween = false;
                        }
                    })
                })
            }
        },
        watch: {
            year() {
                this.setDateList();
            },
            month() {
                this.setDateList();
            },
            date(newVal) {
                if (newVal.length === 1 && this.isRange) {
                    this.clearHover();
                }
            },
            hoverDate(newVal) {
                if (this.isRange && newVal) this.rangeHovering(newVal);
            }
        }
    }
</script>
