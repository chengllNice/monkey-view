<template>
    <div :class="[
            'cl-date-pane-date',
            size && `cl-date-pane-date--${size}`,
            datePicker.showWeekNumber && 'cl-date-pane-date--show-week-number'
         ]">
        <div class="cl-date-pane-date__week">
            <span class="cl-date-pane-item__week" v-for="week in weekList" :key="week.key">{{week.name}}</span>
        </div>
        <div class="cl-date-pane-date__date">
            <div class="cl-date-pane-date__date-row" v-for="(row, rowIndex) in dateList" :key="rowIndex">
                <template v-if="datePicker.showWeekNumber">
                    <span :class="[
                            'cl-date-pane-item__week-number',
                          ]">{{weekNumbers[rowIndex]}}</span>
                </template>
                <span v-for="dateItem in row"
                      :key="dateItem.originDate"
                      :class="[
                        'cl-date-pane-item__col',
                        dateItem.isNowDate && 'cl-date-pane-item__now',
                        !dateItem.isNowMonth && 'cl-date-pane-item__no-now-month',
                        date.includes(dateItem.key) && dateItem.isNowMonth && 'cl-date-pane-item__selected',
                        dateItem.isHover && 'cl-date-pane-item__hover',
                        dateItem.isDisabled && 'cl-date-pane-item__disabled',
                      ]"
                      @mouseenter="mouseEnter(dateItem)"
                      @mouseleave="mouseLeave(dateItem)"
                      @click.stop="handleSelectDate(dateItem)">{{dateItem.date}}</span>
            </div>
        </div>
        <!--<span v-for="dateItem in dateList"-->
              <!--:key="dateItem.originDate"-->
              <!--:class="[-->
                <!--'cl-date-pane-item__col',-->
                <!--dateItem.isNowDate && 'cl-date-pane-item__now',-->
                <!--!dateItem.isNowMonth && 'cl-date-pane-item__no-now-month',-->
                <!--date.includes(dateItem.key) && dateItem.isNowMonth && 'cl-date-pane-item__selected',-->
                <!--dateItem.isHover && 'cl-date-pane-item__hover',-->
                <!--dateItem.isDisabled && 'cl-date-pane-item__disabled',-->
              <!--]"-->
              <!--@mouseenter="mouseEnter(dateItem)"-->
              <!--@mouseleave="mouseLeave(dateItem)"-->
              <!--@click.stop="handleSelectDate(dateItem)">{{dateItem.date}}</span>-->
    </div>
</template>

<script>
    import {dateOnMonth, dateObj, dateFormat, getWeekNumber} from "../../../../utils/date";

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
            setWeekNumbers(){
                let weekNumbers = [];
                this.dateList.forEach(row => {
                    //以周三为基准算当前是第几周
                    // let new Date(row[6].originDate);
                    // let startWeek = .getDay();
                    weekNumbers.push(getWeekNumber(row[3].originDate));
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
                    item.isHover = false;
                    item.isDisabled = false;
                    if(typeof this.datePicker.disabledDate === 'function'){
                        item.isDisabled = this.datePicker.disabledDate(item.key);
                    }
                    item.key = dateFormat(item.key, this.format);
                    if (this.isRange && this.date.length === 2 && item.key > this.date[0] && item.key < this.date[1]) {
                        item.isHover = true;
                    }
                    if(index % 7 === 0){
                        row = [];
                        newDateList.push(row);
                    }
                    row.push(item);
                });
                this.dateList = newDateList;
                this.datePicker.showWeekNumber && this.setWeekNumbers();
                this.clearHover(true);
            },
            handleSelectDate(date) {
                if(date.isDisabled) return;
                if (this.date.length === 2) {
                    this.clearHover();
                }
                this.$emit('updateDate', [date.key]);
            },
            mouseEnter(dateItem) {
                if (dateItem.isNowMonth) {
                    dateItem.isHover = true;
                }
                this.$emit('hover-date', dateItem.key);//range时清除另一个date-pane的hover效果
            },
            mouseLeave(dateItem) {
                if (dateItem.isNowMonth) {
                    if (this.date.length === 2 && dateItem.key > this.date[0] && dateItem.key < this.date[1]) {
                        dateItem.isHover = true;
                    } else {
                        dateItem.isHover = false;
                    }
                }
            },
            rangeHovering(date) {
                if (this.date.length === 1) {
                    this.dateList.forEach(row => {
                        row.forEach(item=>{
                            if (date > this.date[0]) {
                                if (item.key <= date && item.key > this.date[0] && item.isNowMonth) {
                                    item.isHover = true;
                                } else {
                                    item.isHover = false;
                                }
                            } else {
                                if (item.key >= date && item.key < this.date[0] && item.isNowMonth) {
                                    item.isHover = true;
                                } else {
                                    item.isHover = false;
                                }
                            }
                        })
                    })
                }
            },
            // 清除hover效果, 如果noMonth存在只清除不是当前月的hover效果
            clearHover(noMonth = false) {
                this.dateList.forEach(row => {
                    row.forEach(item=>{
                        if (noMonth) {
                            if (!item.isNowMonth) {
                                item.isHover = false;
                            }
                        } else {
                            item.isHover = false;
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
