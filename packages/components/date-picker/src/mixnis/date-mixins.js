


import {dateFormat, dateOrMonth, zero, yearListInit, dateObj} from "../../../../utils/date";

export default {
    props: {
        value: [String, Array],
        size: String,
        type: String,
        format: String,
        year: String,
        month: String
    },
    data() {
        return {
            dateList: [],
            weekList: dateObj.week,
            monthList: dateObj.month,
            yearList: [],
        }
    },
    computed: {
        defaultFormat(){
            let result = this.format;
            if(!result){
                if(this.type === 'date' || this.type === 'daterange'){
                    result = 'YYYY/MM/DD'
                }else if(this.type === 'datetime' || this.type === 'datetimerange'){
                    result = 'YYYY/MM/DD hh:mm:ss'
                }else if(this.type === 'year'){
                    result = 'YYYY'
                }else if(this.type === 'month'){
                    result = 'YYYY/MM'
                }
            }
            return result;
        }
    },
    mounted() {

    },
    methods: {
        selectDate(date){
            this.setDateList(date.key);
            this.$emit('updateDate', date.key);
            this.$emit('closeDatePane');
            this.$emit('input', [date.key]);
        },
        closeDatePane(){
            this.$emit('closeDatePane');
        },

        // 获取指定年月下的所有日期
        setDateList(){
            let dateList = dateOrMonth(this.year, this.month);
            let tempArr = [];
            this.dateList = [];
            dateList.forEach((item, index)=>{
                tempArr.push(item);
                if((index + 1) % 7 === 0){
                    this.dateList.push(tempArr);
                    tempArr = [];
                }
            });
        },
        setYearList(){
            let yearList = yearListInit(this.year);
            let tempArr = [];
            this.yearList = [];
            yearList.forEach((item, index)=>{
                tempArr.push(item);
                if((index + 1) % 3 === 0){
                    this.yearList.push(tempArr);
                    tempArr = [];
                }else if(index === yearList.length-1){
                    this.yearList.push(tempArr);
                }
            })
        },
        // 格式化日期格式
        formatDateValue(value) {
            // dateFormat(value, this.defaultFormat);
        },
    },
}
