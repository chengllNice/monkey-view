<template>
    <div :class="[`${classPrefix}`]">
        <div :class="[`${classPrefix}__shortcuts`]" v-if="shortcuts && shortcuts.length">
            <div :class="[`${classPrefix}__shortcuts-item`]"
                 v-for="(item, index) in shortcuts"
                 :key="index"
                 @click="shortcutsClick(item)">{{item.text}}</div>
        </div>
        <div :class="[`${classPrefix}__main`]">
            <div :class="[`${classPrefix}__content`]">
                <date-pane-single ref="leftPane"
                                  :class="[`${classPrefix}__left`]"
                                  :index="datePane0.index"
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
                <date-pane-single ref="rightPane"
                                  v-if="isRange"
                                  :class="[`${classPrefix}__right`]"
                                  :index="datePane1.index"
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
            <div :class="[`${classPrefix}__footer`]" v-if="showFooter">
                <Button :class="[`${classPrefix}__footer-button`, `${classPrefix}__footer-time`]"
                        v-if="pickerType === 'date'"
                        type="text"
                        :size="size"
                        :disabled="changeTimeDisabled"
                        @click="changeTimeAndDate">
                    {{isTime ? t('cl.datePicker.selectDate') : t('cl.datePicker.selectTime')}}
                </Button>
                <Button :class="[`${classPrefix}__footer-button`]"
                        :size="size"
                        @click="handleClean">{{t('cl.datePicker.clean')}}</Button>
                <Button :class="[`${classPrefix}__footer-button`]"
                        type="primary"
                        :size="size"
                        @click="closeDropDown(true)">{{t('cl.datePicker.ok')}}</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import DatePaneSingle from './date-pane-single'
    import Button from 'packages/button'
    import {dateFormat} from "main/utils/date";
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
            let nowDate = new Date();
            return {
                classPrefix: Config.classPrefix + '-date-pane',
                datePane0: {
                    index: 0,
                    year: null,
                    month: null,
                    value: []
                },
                datePane1: {
                    index: 1,
                    year: null,
                    month: null,
                    value: []
                },
                nowDate: nowDate,
                selectedDateValue: [],
                hoverDate: null,//当前hover的日期
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
            Button
        },
        mounted() {
            this.$nextTick(()=>{
                this.dealValue();
            })
        },
        methods: {
            dealValue(){
                this.selectedDateValue = Array.isArray(this.value) ? this.value : [];
                if(!this.selectedDateValue.length){
                    this.initYearAndMonth(this.nowDate, null);
                }else{
                    if(this.isRange){
                        let startDate = this.selectedDateValue[0];
                        let endDate = this.selectedDateValue[1];
                        if(endDate && startDate.getMonth() === endDate.getMonth()){
                            this.datePane0.value = this.selectedDateValue;
                            this.datePane1.value = [];
                        }else{
                            this.datePane0.value = [this.selectedDateValue[0]];
                            this.datePane1.value = [this.selectedDateValue[1]];
                        }
                        this.initYearAndMonth(startDate, endDate);
                    }else{
                        this.datePane0.value = this.selectedDateValue;
                        this.initYearAndMonth(this.selectedDateValue[0], null);
                    }
                }
            },
            initYearAndMonth(startDate, endDate){
                let paneYear0 = startDate.getFullYear();
                let paneMonth0 = startDate.getMonth() + 1;
                let paneYear1 = null;
                let paneMonth2 = null;
                let rightPaneDate = new Date(startDate);
                if(endDate) rightPaneDate = new Date(endDate);
                if(rightPaneDate.getMonth() === startDate.getMonth()) rightPaneDate.setMonth(startDate.getMonth() + 1)
                paneYear1 = rightPaneDate.getFullYear();
                paneMonth2 = rightPaneDate.getMonth() + 1;

                this.datePane0.year = paneYear0;
                this.datePane0.month = paneMonth0;
                this.datePane1.year = paneYear1;
                this.datePane1.month = paneMonth2;
            },
            handleHoverDate(index, hoverDate){
                if(this.isRange){
                    this.hoverDate = hoverDate;
                }
            },
            // 更新pane的日期 一个pane时更新当前pane的日期 两个pane时更新两个pane的日期
            updatePane(obj){
                let index = obj.index;
                //更新当前pane的日期
                this.updateDateCommon(obj);

                //如果是range类型 更新另一个pane的日期
                if(this.isRange){
                    //先判断第一个pane的当前年月是否小于第二个pane当前的年月 如果第一个pane的日期大于等于第二个pane的日期则更新另一个pane的日期
                    let paneDate0 = new Date(`${this.datePane0.year}-${this.datePane0.month}`);
                    let paneDate1 = new Date(`${this.datePane1.year}-${this.datePane1.month}`);
                    if(paneDate0 >= paneDate1){
                        //如果是第一个pane更新了 需要去更新第二个pane的，否则相反
                        if(index === 0){
                            paneDate0.setMonth(paneDate0.getMonth() + 1);

                            this.datePane1.year = paneDate0.getFullYear();
                            this.datePane1.month = paneDate0.getMonth() + 1;
                        }else if(index === 1){
                            paneDate1.setMonth(paneDate1.getMonth() - 1);

                            this.datePane0.year = paneDate1.getFullYear();
                            this.datePane0.month = paneDate1.getMonth() + 1;
                        }
                    }
                }
            },
            updateDateCommon(obj){
                let {type, year, month, jumpStep, index} = obj;
                switch (type) {
                    case 'pre-year':
                        this[`datePane${index}`].year = year - jumpStep;
                        break;
                    case 'pre-month':
                        month = month - 1;
                        if(month < 1){
                            month = 12;
                            this[`datePane${index}`].year = year - 1;
                        }
                        this[`datePane${index}`].month = month;
                        break;
                    case 'next-month':
                        month = month + 1;
                        if(month > 12){
                            month = 1;
                            this[`datePane${index}`].year = year + 1;
                        }
                        this[`datePane${index}`].month = month;
                        break;
                    case 'next-year':
                        this[`datePane${index}`].year = year + jumpStep;
                        break;
                    case 'update-year':
                        this[`datePane${index}`].year = year;
                        break;
                    case 'update-month':
                        this[`datePane${index}`].month = month;
                        break;
                }
            },

            updateValue(index, date, updateType){
                if(this.pickerType === 'date'){
                    if(this.multiple && this.type === 'date'){
                        let currentDate = dateFormat(date[0]);
                        let selectedDateValue = this.selectedDateValue.map(item => dateFormat(item));
                        let index = selectedDateValue.findIndex(item => item === currentDate);
                        if(index > 0) this.selectedDateValue.splice(index, 1);
                        else this.selectedDateValue.push(...date);
                    }else{
                        if(!this.isRange){
                            this.selectedDateValue = date;
                        }else{
                            if(this.selectedDateValue.length === 2){
                                if(updateType === 'time'){
                                    //日期选择时间时第二个日期时间不能小于第一个日期时间
                                    this.selectedDateValue.splice(index, 1, ...date);
                                    let leftDate = this.selectedDateValue[0];
                                    let rightDate = this.selectedDateValue[1];
                                    if(leftDate.getTime() > rightDate.getTime()){
                                        this.selectedDateValue.splice(1, 1, this.selectedDateValue[0]);
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
                this.isTime && this.changeTimeAndDate();
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
