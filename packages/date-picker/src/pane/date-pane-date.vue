<template>
    <div :class="[
            `${classPrefix}`,
            picker.showWeekNumber && `${classPrefix}--show-week-number`
         ]">
        <div :class="[`${classPrefix}__week`]">
            <span :class="[`${classPrefixItem}__col`, `${classPrefixItem}__week`]" v-for="week in weekList" :key="week.id">
                <em>{{week.name}}</em>
            </span>
        </div>
        <div :class="[`${classPrefix}__date`]">
            <div :class="[
                    `${classPrefix}__date-row`,
                    type === 'week' && `${classPrefix}__date-row-week`,
                    type === 'week' && isWeekSelect(row) && `${classPrefix}__date-row-week-selected`
                 ]"
                 v-for="(row, rowIndex) in dateList"
                 :key="rowIndex"
                 @click.capture="handleSelectWeek(row)">
                <template v-if="picker.showWeekNumber">
                    <span :class="[
                            `${classPrefixItem}__col`,
                            `${classPrefixItem}__week-number`,
                          ]">
                        <em>{{row[4].week}}</em>
                    </span>
                </template>
                <template>
                    <span v-for="dateItem in row"
                          :key="dateItem.format"
                          :class="dateItemColClass(dateItem)"
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
    import Config from 'main/config/config'
    import { dateOnMonth, dateObj, dateFormat } from 'main/utils/date';

    export default {
        name: 'DatePaneDate',
        inject: ['picker'],
        props: {
            type: String,
            year: Number,
            month: Number,
            date: {
                type: Array,
                default() {
                    return []
                }
            },
            currentDate: Object,
            isRange: Boolean,
            hoverDate: Date,
            index: Number
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-date-pane-date',
                classPrefixItem: Config.classPrefix + '-date-pane-item',
                dateList: [],
                weekList: dateObj.week,
                selectDate: []
            }
        },
        computed: {
            isWeekSelect() {
                return function (rowDate) {
                    rowDate = rowDate.map(item => item.format);
                    const select = dateFormat(this.selectDate[this.index]);
                    return rowDate.includes(select);
                }
            },
            dateItemColClass() {
                const selectDate = this.selectDate.map(item => dateFormat(item))
                return function (dateItem) {
                    return [
                        `${this.classPrefixItem}__col`,
                        this.type === 'date' && !dateItem.isDisabled && dateItem.isNowMonth && !selectDate.includes(dateItem.format) && `${this.classPrefixItem}__hover`,
                        dateItem.isNowDate && `${this.classPrefixItem}__now`,
                        !dateItem.isNowMonth && `${this.classPrefixItem}__no-now-month`,
                        this.type !== 'week' && selectDate.includes(dateItem.format) && dateItem.isNowMonth && `${this.classPrefixItem}__selected`,
                        !selectDate.includes(dateItem.format) && dateItem.isBetween && `${this.classPrefixItem}__between`,
                        dateItem.isDisabled && `${this.classPrefixItem}__disabled`
                    ]
                }
            }
        },
        mounted() {
            this.setDateList();
        },
        methods: {
            // 获取日期列表
            setDateList() {
                if (!this.year || !this.month) return;
                const dateList = dateOnMonth(this.year, this.month);

                const newDateList = [];
                let row = [];
                dateList.forEach((item, index) => {
                    item.isBetween = false;
                    item.isDisabled = false;
                    if (typeof this.picker.disabledDate === 'function') {
                        item.isDisabled = this.picker.disabledDate(item.key);
                    }

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
                this.clearHover(true);
            },
            handleSelectDate(date) {
                if (date.isDisabled || this.type === 'week') return;
                if (this.selectDate.length === 2) {
                    this.clearHover();
                }
                const _date = date.key;
                _date.setHours(0);
                _date.setMinutes(0);
                _date.setSeconds(0);

                this.$emit('updateDate', [_date]);
                this.picker && this.picker.dateClick(_date);
            },
            handleSelectWeek(row) {
                if (this.type === 'date') return;
                const date = row[4];
                // 如果该周中存在禁用的项则不可选
                const index = row.findIndex(item => item.isDisabled);
                if (index >= 0) return;
                this.$emit('updateWeek', [date.key]);
            },
            mouseEnter(dateItem) {
                if (this.type === 'week') return;
                if (this.isRange && this.selectDate.length === 1) {
                    if (dateItem.isNowMonth) {
                        dateItem.isBetween = true;
                    }
                    this.$emit('hover-date', dateItem.key);// range时清除另一个date-pane的hover效果
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
                if (!newVal) return;
                this.selectDate = newVal || [];
                if (newVal.length === 1 && this.isRange) {
                    this.clearHover();
                }
                this.setDateList();
            },
            hoverDate(newVal) {
                if (this.isRange && newVal) this.rangeHovering(newVal);
            }
        }
    }
</script>
