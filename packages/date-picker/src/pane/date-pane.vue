<template>
    <div class="cl-date-pane">
        <div class="cl-date-pane__shortcuts" v-if="shortcuts && shortcuts.length">
            <div class="cl-date-pane__shortcuts-item" v-for="(item, index) in shortcuts" :key="index" @click="shortcutsClick(item)">{{item.text}}</div>
        </div>
        <div class="cl-date-pane__main">
            <div class="cl-date-pane__content">
                <date-pane-single class="cl-date-pane__left"
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
                                     :pickerType="pickerType"
                                     @hover-date="handleHoverDate"
                                     @update-date="updateValue"
                                     @update-pane="updatePane"></date-pane-single>
                <date-pane-single class="cl-date-pane__right"
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
                                     :pickerType="pickerType"
                                     @hover-date="handleHoverDate"
                                     @update-date="updateValue"
                                     @update-pane="updatePane"></date-pane-single>
            </div>
            <div class="cl-date-pane__footer" v-if="showFooter">
                <cl-button class="cl-date-pane__footer-button cl-date-pane__footer-time"
                           v-if="pickerType === 'date'"
                           type="text"
                           :size="size"
                           :disabled="changeTimeDisabled"
                           @click="changeTimeAndDate">
                    {{isTime ? t('cl.datePicker.selectDate') : t('cl.datePicker.selectTime')}}
                </cl-button>
                <cl-button class="cl-date-pane__footer-button"
                           :size="size"
                           @click="handleClean">{{t('cl.datePicker.clean')}}</cl-button>
                <cl-button class="cl-date-pane__footer-button"
                           type="primary"
                           :size="size"
                           @click="closeDropDown(true)">{{t('cl.datePicker.ok')}}</cl-button>
            </div>
        </div>
    </div>
</template>

<script>
    import DatePaneSingle from './date-pane-single'
    import ClButton from 'packages/button'
    import {zero, dateFormat, getWeekNumberInfo} from "main/utils/date";
    import Locale from "main/mixins/locale";

    export default {
        name: "DatePane",
        inject: ['picker'],
        mixins: [Locale],
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
            pickerType: String,
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
                if(this.pickerType === 'time' && this.picker.confirm) return true;
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
            DatePaneSingle,
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
                startDate = dateFormat(startDate);
                endDate = dateFormat(endDate);
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
            updateValue(index, date, updateType){
                index = parseInt(index);
                if(this.pickerType === 'date'){
                    if(this.multiple && this.type === 'date'){
                        this.selectedDateValue.push(...date);
                    }else{
                        if(!this.isRange){
                            this.selectedDateValue = date;
                        }else{
                            if(this.selectedDateValue.length === 2){
                                if(updateType === 'time'){
                                    //日期选择时间时第二个日期时间不能小于第一个日期时间
                                    this.selectedDateValue.splice(index, 1, ...date);
                                    let date0 = dateFormat(this.selectedDateValue[0], 'hh:mm:ss');
                                    let date1 = dateFormat(this.selectedDateValue[1], 'hh:mm:ss');
                                    let nowDate = dateFormat(new Date(), 'YYYY/MM/DD');
                                    let newDate0 = new Date(nowDate + ' ' + date0);
                                    let newDate1 = new Date(nowDate + ' ' + date1);
                                    let time0 = newDate0.getTime();
                                    let time1 = newDate1.getTime();
                                    if(time0 > time1){
                                        let selectValue1 = dateFormat(this.selectedDateValue[1], 'YYYY/MM/DD');
                                        let compareDate = dateFormat(new Date(selectValue1 + ' ' + date0), this.format);
                                        this.selectedDateValue.splice(1, 1, compareDate);
                                    }
                                }else{
                                    this.selectedDateValue = [...date];
                                }
                            }else if(this.selectedDateValue.length === 1){
                                if(date[0] > this.selectedDateValue[0]){
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
                }else if(this.pickerType === 'time'){
                    if(!this.isRange){
                        this.selectedDateValue = date;
                    }else{
                        if(!this.selectedDateValue.length){
                            if(index === 0){
                                this.selectedDateValue.push(...date, ...date);
                            }else if(index === 1){
                                let date0 = new Date();
                                date0.setHours(0);
                                date0.setMinutes(0);
                                date0.setSeconds(0);
                                date0 = dateFormat(date0, this.format);
                                this.selectedDateValue.push(date0, ...date);
                            }
                        }else if(this.selectedDateValue.length === 1){
                            if(index === 0){
                                this.selectedDateValue.splice(index, 1, ...date);
                            }else if(index === 1){
                                this.selectedDateValue.push(...date);
                            }
                        }else if(this.selectedDateValue.length === 2){
                            this.selectedDateValue.splice(index, 1, ...date);
                            let date0 = new Date(this.selectedDateValue[0]);
                            let date1 = new Date(this.selectedDateValue[1]);
                            let time0 = date0.getTime();
                            let time1 = date1.getTime();
                            if(time0 > time1){
                                this.selectedDateValue.splice(1, 1, this.selectedDateValue[0]);
                            }
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
                item.onClick && item.onClick(this.picker);
                this.closeDropDown(true);
            },
            handleClean(){
                this.picker && this.picker.handleClear();
                this.closeDropDown(true);
            },
            closeDropDown(isClose){
                if(isClose){
                    this.picker.dropDownVisible(false);
                    return;
                }
                switch (this.type) {
                    case 'date':
                        !this.multiple && this.picker.dropDownVisible(false);
                        break;
                    case 'daterange':
                        this.selectedDateValue.length === 2 && this.picker.dropDownVisible(false);
                        break;
                    case 'datetime':
                        isClose && this.picker.dropDownVisible(false);
                        break;
                    case 'datetimerange':
                        isClose && this.picker.dropDownVisible(false);
                        break;
                    case 'year':
                        this.picker.dropDownVisible(false);
                        break;
                    case 'month':
                        this.picker.dropDownVisible(false);
                        break;
                    case 'week':
                        this.picker.dropDownVisible(false);
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
