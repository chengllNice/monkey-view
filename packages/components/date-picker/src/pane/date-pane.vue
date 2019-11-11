<template>
    <div class="cl-date-pane">
        <cl-date-pane-single class="cl-date-pane__left"
                             :index="datePane0.id"
                             :year="datePane0.year"
                             :month="datePane0.month"
                             :is-range="isRange"
                             :size="size"
                             :format="format"
                             :type="type"
                             @update-value="updateValue"
                             @update-date="updateDate"></cl-date-pane-single>
        <cl-date-pane-single class="cl-date-pane__right"
                             v-if="isRange"
                             :index="datePane1.id"
                             :year="datePane1.year"
                             :month="datePane1.month"
                             :is-range="isRange"
                             :size="size"
                             :format="format"
                             :type="type"
                             @update-value="updateValue"
                             @update-date="updateDate"></cl-date-pane-single>
    </div>
</template>

<script>
    import ClDatePaneSingle from './date-pane-single'
    import {zero, dateFormat} from "../../../../utils/date";

    export default {
        name: "ClDatePane",
        props: {
            value: Array,
            size: String,
            type: String,
            format: String,
            isRange: Boolean,
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
                nowDate: new Date()
            }
        },
        computed: {

        },
        components: {
            ClDatePaneSingle
        },
        mounted() {
            this.$nextTick(()=>{
                this.dealValue();
            })
        },
        methods: {
            dealValue(){
                if(!this.value || !this.value.length){
                    this.initYearAndMonth(this.nowDate, null);
                }else {
                    if(this.isRange){
                        let startDate = new Date(this.value[0]);
                        let endDate = new Date(this.value[1]);
                        if(startDate.getMonth() === endDate.getMonth()){
                            this.datePane0.value = this.value;
                        }else{
                            this.datePane0.value = this.value[0];
                            this.datePane1.value = this.value[1];
                        }
                        this.initYearAndMonth(this.value[0], this.value[1]);
                    }else{
                        this.datePane0.value = this.value;
                        this.initYearAndMonth(this.value[0], null);
                    }
                }
            },
            initYearAndMonth(startDate, endDate){
                let nowDate1 = new Date(startDate);
                let nowDate2;
                if(endDate){
                    nowDate2 = new Date(endDate);
                }else{
                    nowDate2 = new Date(new Date(startDate).setMonth(nowDate1.getMonth() + 1));
                }
                this.datePane0.year = dateFormat(nowDate1, 'YYYY');
                this.datePane0.month = dateFormat(nowDate1, 'MM');
                this.datePane1.year = dateFormat(nowDate2, 'YYYY');
                this.datePane1.month = dateFormat(nowDate2, 'MM');
            },
            updateDate(obj){
                let {type, year, month, jumpStep, index, isUpdateRightDate} = obj;
                this.updateDateCommon(obj);

                if(this.isRange && isUpdateRightDate){
                    let updateFlag = type.includes('year') ? 'year' : 'month';
                    let isUpdateRange = false;
                    if(updateFlag === 'month'){
                        let datePane0Time = new Date(this.datePane0.year, this.datePane0.month);
                        let datePane1Time = new Date(this.datePane1.year, this.datePane1.month);
                        if(datePane1Time <= datePane0Time){
                            isUpdateRange = true;
                        }
                    }
                    if(this.datePane1[updateFlag] <= this.datePane0[updateFlag] && updateFlag === 'year') isUpdateRange = true;

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
                }
            },
            updateValue(index, date){
                // let year = new Date(date).getFullYear();
                // let month = new Date(date).getMonth() + 1;
                if(this[`datePane${index}`].value.length === 2){
                    this[`datePane${index}`].value = date;
                }
                this[`datePane${index}`].value.push(date);
            }
        },
        watch: {
            value(newVal, oldVal){
                if(JSON.stringify(newVal) !== JSON.stringify(oldVal)) this.dealValue();
            }
        }
    }
</script>