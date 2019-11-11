


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
            currentDate: {
                year: new Date().getFullYear().toString(),
                month: zero((new Date().getMonth() + 1)),
                date: zero(new Date().getDate())
            }
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
        },
        isRange(){
            return this.type.includes('range');
        }
    },
    mounted() {

    },
    methods: {
        closeDatePane(){
            this.$emit('closeDatePane');
        },
        // 获取日期列表
        setDateList(){
            if(!this.year || !this.month) return;
            this.dateList = dateOrMonth(this.year, this.month);
        },
        // 获取年份列表
        setYearList(year){
            if(!year && !this.year) return;
            this.yearList = yearListInit(year || this.year);
        },
        // 格式化日期格式
        formatDateValue(value) {
            // dateFormat(value, this.defaultFormat);
        },
    },
}
