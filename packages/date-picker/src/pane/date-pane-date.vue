<template>
    <div :class="[
            'cl-date-pane-date',
            size && `cl-date-pane-date--${size}`,
            picker.showWeekNumber && 'cl-date-pane-date--show-week-number'
         ]">
        <div class="cl-date-pane-date__week">
            <span class="cl-date-pane-item__col cl-date-pane-item__week" v-for="week in weekList" :key="week.key">
                <em>{{week.name}}</em>
            </span>
        </div>
        <div class="cl-date-pane-date__date">
            <div :class="[
                    'cl-date-pane-date__date-row',
                    type === 'week' && 'cl-date-pane-date__date-row-week',
                    type === 'week' && isWeekSelect(row[6]) && 'cl-date-pane-date__date-row-week-selected'
                 ]"
                 v-for="(row, rowIndex) in dateList"
                 :key="rowIndex"
                 @click.capture="handleSelectWeek(rowIndex)">
                <template v-if="picker.showWeekNumber">
                    <span :class="[
                            'cl-date-pane-item__col',
                            'cl-date-pane-item__week-number',
                          ]">
                        <em>{{weekNumbers[rowIndex].week}}</em>
                    </span>
                </template>
                <template>
                    <span v-for="dateItem in row"
                          :key="dateItem.originDate"
                          :class="[
                            'cl-date-pane-item__col',
                            type === 'date' && !dateItem.isDisabled && dateItem.isNowMonth && !selectDate.includes(dateItem.key) && 'cl-date-pane-item__hover',
                            dateItem.isNowDate && 'cl-date-pane-item__now',
                            !dateItem.isNowMonth && 'cl-date-pane-item__no-now-month',
                            selectDate.includes(dateItem.key) && dateItem.isNowMonth && 'cl-date-pane-item__selected',
                            !selectDate.includes(dateItem.key) && dateItem.isBetween && 'cl-date-pane-item__between',
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
    </div>
</template>

<script>
    import {dateOnMonth, dateObj, dateFormat, getWeekNumber, zero, getWeekNumberInfo} from "main/utils/date";

    export default {
        name: "ClDatePaneDate",
        inject: ['picker'],
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
                selectWeekNumber: {
                    year: '',
                    weekNumber: ''
                },
                selectDate: [],
            }
        },
        computed: {
            isWeekSelect(){
                return function (date) {
                    if(getWeekNumber(date.originDate) === this.selectWeekNumber.weekNumber && date.year === this.selectWeekNumber.year){
                        return true;
                    }
                    return false;
                }
            }
        },
        mounted() {
            this.setDateList();
        },
        methods: {
            setWeekNumbers() {
                let weekNumbers = [];
                this.dateList.forEach(row => {
                    //以周六为基准算当前是第几周
                    weekNumbers.push({
                        week: getWeekNumber(row[6].originDate),
                        year: row[6].year,
                        month: row[6].month
                    });
                });
                this.weekNumbers = weekNumbers;
            },
            // 获取日期列表
            setDateList() {
                if (!this.year || !this.month) return;
                let dateList = dateOnMonth(this.year, this.month);
                let newDateList = [];
                let row = [];
                let format = this.format;
                format = format.replace('hh', '').replace('mm', '').replace('ss', '').replace(/:/g, '').trim();
                dateList.forEach((item, index) => {
                    item.isBetween = false;
                    item.isDisabled = false;
                    if (typeof this.picker.disabledDate === 'function') {
                        item.isDisabled = this.picker.disabledDate(item.key);
                    }
                    item.key = dateFormat(item.key, format);
                    if (this.isRange && this.selectDate.length === 2 && item.key > this.selectDate[0] && item.key < this.selectDate[1]) {
                        item.isBetween = true;
                    }
                    if (index % 7 === 0) {
                        row = [];
                        newDateList.push(row);
                    }
                    row.push(item);
                });
                this.dateList = newDateList;
                (this.picker.showWeekNumber || this.type === 'week') && this.setWeekNumbers();
                this.clearHover(true);
            },
            handleSelectDate(date) {
                if (date.isDisabled || this.type === 'week') return;
                if (this.selectDate.length === 2) {
                    this.clearHover();
                }
                let _date = new Date(date.key);
                _date.setHours(0);
                _date.setMinutes(0);
                _date.setSeconds(0);

                this.$emit('updateDate', [_date]);
                this.picker && this.picker.dateClick(dateFormat(_date, this.format));
            },
            handleSelectWeek(rowIndex){
                if(this.type === 'date') return;
                let emitValue = this.format.replace('YYYY', this.weekNumbers[rowIndex].year).replace('WW', zero(this.weekNumbers[rowIndex].week));
                this.$emit('updateWeek', emitValue);
            },
            mouseEnter(dateItem) {
                if(this.type === 'week') return;
                if (this.isRange && this.selectDate.length === 1) {
                    if (dateItem.isNowMonth) {
                        dateItem.isBetween = true;
                    }
                    this.$emit('hover-date', dateItem.key);//range时清除另一个date-pane的hover效果
                }
            },
            mouseLeave(dateItem) {
                if (dateItem.isNowMonth) {
                    if (this.selectDate.length === 2 && dateItem.key > this.selectDate[0] && dateItem.key < this.selectDate[1]) {
                        dateItem.isBetween = true;
                    } else {
                        dateItem.isBetween = false;
                    }
                }
            },
            rangeHovering(date) {
                if (this.selectDate.length === 1) {
                    this.dateList.forEach(row => {
                        row.forEach(item => {
                            if (date > this.selectDate[0]) {
                                if (item.key <= date && item.key > this.selectDate[0] && item.isNowMonth) {
                                    item.isBetween = true;
                                } else {
                                    item.isBetween = false;
                                }
                            } else {
                                if (item.key >= date && item.key < this.selectDate[0] && item.isNowMonth) {
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
                if(!newVal) return;
                let format = this.format;
                format = format.replace('hh', '').replace('mm', '').replace('ss', '').replace(/:/g, '').trim();
                this.selectDate = [];
                if(this.type !== 'week'){
                    newVal.forEach(item=>{
                        this.selectDate.push(dateFormat(item, format));
                    });
                }

                if (newVal.length === 1 && this.isRange) {
                    this.clearHover();
                }
                this.selectWeekNumber.year = '';
                this.selectWeekNumber.weekNumber = '';
                if(this.type === 'week' && newVal && newVal.length){
                    this.selectDate = newVal;
                    this.selectWeekNumber.year = getWeekNumberInfo(newVal[0], this.format).year;
                    this.selectWeekNumber.weekNumber = getWeekNumberInfo(newVal[0], this.format).weekNumber;
                }
                this.setDateList();
            },
            hoverDate(newVal) {
                if (this.isRange && newVal) this.rangeHovering(newVal);
            }
        }
    }
</script>
