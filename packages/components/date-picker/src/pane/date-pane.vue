<template>
    <div class="cl-date-pane">
        <div class="cl-date-pane__shortcuts" v-if="shortcuts && shortcuts.length">
            <div class="cl-date-pane__shortcuts-item" v-for="(item, index) in shortcuts" :key="index" @click="shortcutsClick(item)">{{item.text}}</div>
        </div>
        <div class="cl-date-pane__main">
            <div class="cl-date-pane__content">
                <cl-date-pane-single class="cl-date-pane__left"
                                     ref="leftPane"
                                     :index="datePane0.id"
                                     :year="datePane0.year"
                                     :month="datePane0.month"
                                     :date="selectedDateValue"
                                     :hover-date="hoverDate"
                                     :is-range="isRange"
                                     :size="size"
                                     :format="format"
                                     :type="type"
                                     @hover-date="handleHoverDate"
                                     @update-date="updateValue"
                                     @update-pane="updatePane"></cl-date-pane-single>
                <cl-date-pane-single class="cl-date-pane__right"
                                     ref="rightPane"
                                     v-if="isRange"
                                     :index="datePane1.id"
                                     :year="datePane1.year"
                                     :month="datePane1.month"
                                     :date="selectedDateValue"
                                     :hover-date="hoverDate"
                                     :is-range="isRange"
                                     :size="size"
                                     :format="format"
                                     :type="type"
                                     @hover-date="handleHoverDate"
                                     @update-date="updateValue"
                                     @update-pane="updatePane"></cl-date-pane-single>
            </div>
            <div class="cl-date-pane__footer" v-if="showFooter">
                <cl-button type="text" :size="size" :disabled="changeTimeDisabled" @click="changeTimeAndDate">{{isTime ? "选择日期" : "选择时间"}}</cl-button>
                <cl-button type="primary" :size="size" @click="closeDropDown(true)">确定</cl-button>
            </div>
        </div>
    </div>
</template>

<script>
    import ClDatePaneSingle from './date-pane-single'
    import ClButton from '../../../button/src/button'
    import {zero, dateFormat, getWeekNumberInfo} from "../../../../utils/date";

    export default {
        name: "ClDatePane",
        inject: ['datePicker'],
        props: {
            value: {
                type: Array,
                default(){
                    return []
                }
            },
            size: String,
            type: String,
            format: String,
            isRange: Boolean,
            shortcuts: Array,
            multiple: Boolean,
        },
        data(){
            return {
                datePane0: {
                    id: '0',
                    year: '',
                    month: '',
                    value: []
                },
                datePane1: {
                    id: '1',
                    year: '',
                    month: '',
                    value: []
                },
                nowDate: new Date(),
                selectedDateValue: [],
                hoverDate: '',//当前hover的日期
                isTime: false,
            }
        },
        computed: {
            showFooter(){
                return ['datetime', 'datetimerange'].includes(this.type);
            },
            changeTimeDisabled(){
                if(this.isRange){
                    return this.selectedDateValue.length !== 2;
                }
                return false;
            }
        },
        components: {
            ClDatePaneSingle,
            ClButton
        },
        mounted() {
            this.$nextTick(()=>{
                this.dealValue();
            })
        },
        methods: {
            dealValue(){
                this.selectedDateValue = this.value;
                if(!this.selectedDateValue || !this.selectedDateValue.length){
                    this.initYearAndMonth(this.nowDate, null);
                }else if(this.type === 'week'){
                    let weekNumberInfo = getWeekNumberInfo(this.value[0], this.format);
                    this.datePane0.year = weekNumberInfo.year;
                    this.datePane0.month = weekNumberInfo.month;
                    this.datePane0.value = this.selectedDateValue;
                }else{
                    if(this.isRange){
                        let startDate = new Date(this.selectedDateValue[0]);
                        let endDate = new Date(this.selectedDateValue[1]);
                        if(startDate.getMonth() === endDate.getMonth()){
                            this.datePane0.value = this.selectedDateValue;
                        }else{
                            this.datePane0.value = this.selectedDateValue[0];
                            this.datePane1.value = this.selectedDateValue[1];
                        }
                        this.initYearAndMonth(this.selectedDateValue[0], this.selectedDateValue[1]);
                    }else{
                        this.datePane0.value = this.selectedDateValue;
                        this.initYearAndMonth(this.selectedDateValue[0], null);
                    }
                }
            },
            initYearAndMonth(startDate, endDate){
                let nowDate1 = new Date(startDate);
                let nowDate2;
                if(endDate){
                    nowDate2 = new Date(endDate);
                    if(nowDate2.getMonth() === nowDate1.getMonth()){
                        nowDate2.setMonth(nowDate1.getMonth() + 1);
                    }
                }else{
                    nowDate2 = new Date(new Date(startDate).setMonth(nowDate1.getMonth() + 1));
                }
                this.datePane0.year = dateFormat(nowDate1, 'YYYY');
                this.datePane0.month = dateFormat(nowDate1, 'MM');
                this.datePane1.year = dateFormat(nowDate2, 'YYYY');
                this.datePane1.month = dateFormat(nowDate2, 'MM');
            },
            handleHoverDate(index, hoverDate){
                if(this.isRange){
                    this.hoverDate = hoverDate;
                }
            },
            // 更新年/月/日
            updatePane(obj){
                let {type, year, month, jumpStep, index, isUpdateOtherDate} = obj;//type为更新年/月/日类型
                this.updateDateCommon(obj);

                if(this.isRange && isUpdateOtherDate){
                    // 更新另一个date-picker的数据
                    let updateFlag = type.includes('year') ? 'year' : 'month';
                    let isUpdateRange = false;//是否需要更新的状态标志
                    if(updateFlag === 'month'){
                        let datePane0Time = new Date(this.datePane0.year, this.datePane0.month);
                        let datePane1Time = new Date(this.datePane1.year, this.datePane1.month);
                        if(datePane1Time <= datePane0Time){
                            isUpdateRange = true;
                        }
                    }else if(updateFlag === 'year'){
                        //更新年时需要比较年和月
                        if(this.datePane1[updateFlag] <= this.datePane0[updateFlag] || this.datePane1.month <= this.datePane0.month){
                            isUpdateRange = true;
                        }
                    }

                    let otherYear = parseInt(year);
                    let otherMonth = parseInt(month);
                    switch (type) {
                        case 'pre-month':
                            otherMonth = otherMonth - 1;
                            if(otherMonth < 1){
                                otherMonth = 12;
                            }
                            break;
                        case 'next-month':
                            otherMonth = otherMonth + 1;
                            if(otherMonth > 12){
                                otherMonth = 1;
                            }
                            break;
                    }

                    let otherObj = {
                        type: type,
                        year: otherYear,
                        month: otherMonth,
                        jumpStep: jumpStep,
                        index: index === '1' ? '0' : '1',
                    };
                    isUpdateRange && this.updateDateCommon(otherObj);
                    if(this.datePane1.month <= this.datePane0.month){
                        // 判断第一个月是否大于第二个月
                        let otherObj = {
                            type: index === '1' ? 'pre-month' : 'next-month',
                            year: otherYear,
                            month: otherMonth,
                            jumpStep: jumpStep,
                            index: index === '1' ? '0' : '1',
                        };
                        isUpdateRange && this.updateDateCommon(otherObj);
                    }
                }
            },
            updateDateCommon(obj){
                let {type, year, month, jumpStep, index} = obj;
                switch (type) {
                    case 'pre-year':
                        this[`datePane${index}`].year = zero(parseInt(year) - jumpStep);
                        break;
                    case 'pre-month':
                        month = parseInt(month) - 1;
                        if(month < 1){
                            month = 12;
                            this[`datePane${index}`].year = zero(parseInt(year) - 1);
                        }
                        this[`datePane${index}`].month = zero(month);
                        break;
                    case 'next-month':
                        month = parseInt(month) + 1;
                        if(month > 12){
                            month = 1;
                            this[`datePane${index}`].year = zero(parseInt(year) + 1);
                        }
                        this[`datePane${index}`].month = zero(month);
                        break;
                    case 'next-year':
                        this[`datePane${index}`].year = zero(parseInt(year) + jumpStep);
                        break;
                    case 'update-year':
                        this[`datePane${index}`].year = zero(parseInt(year));
                        break;
                    case 'update-month':
                        this[`datePane${index}`].month = zero(parseInt(month));
                        break;
                }
            },
            updateValue(index, date){
                if(this.multiple && this.type === 'date'){
                    this.selectedDateValue.push(...date);
                }else{
                    if(!this.isRange){
                        this.selectedDateValue = date;
                    }else{
                        if(this.selectedDateValue.length === 2){
                            this.selectedDateValue = [...date];
                        }else if(this.selectedDateValue.length === 1){
                            if(date > this.selectedDateValue[0]){
                                this.selectedDateValue.push(...date);
                            }else{
                                this.selectedDateValue.unshift(...date);
                            }

                            this.initYearAndMonth(this.selectedDateValue[0], this.selectedDateValue[1]);
                        }else{
                            this.selectedDateValue.push(...date);
                        }
                    }
                }
                this.$emit('input', this.selectedDateValue);
                this.closeDropDown();
            },
            changeTimeAndDate(){
                this.$refs.leftPane && this.$refs.leftPane.updateCurrentType(this.isTime ? 'date' : 'time');
                this.$refs.rightPane && this.$refs.rightPane.updateCurrentType(this.isTime ? 'date' : 'time');
                this.isTime = !this.isTime;
            },
            shortcutsClick(item){
                item.onClick && item.onClick(this.datePicker);
                this.closeDropDown();
            },
            closeDropDown(isClose){
                switch (this.type) {
                    case 'date':
                        !this.multiple && this.datePicker.dropDownVisible(false);
                        break;
                    case 'daterange':
                        this.selectedDateValue.length === 2 && this.datePicker.dropDownVisible(false);
                        break;
                    case 'datetime':
                        isClose && this.datePicker.dropDownVisible(false);
                        break;
                    case 'datetimerange':
                        isClose && this.datePicker.dropDownVisible(false);
                        break;
                    case 'year':
                        this.datePicker.dropDownVisible(false);
                        break;
                    case 'month':
                        this.datePicker.dropDownVisible(false);
                        break;
                    case 'week':
                        this.datePicker.dropDownVisible(false);
                        break;
                }
            }
        },
        watch: {
            value(newVal, oldVal){
                if(JSON.stringify(newVal) !== JSON.stringify(oldVal)) this.dealValue();
            }
        }
    }
</script>
