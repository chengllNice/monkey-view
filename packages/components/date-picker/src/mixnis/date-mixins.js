


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
                month: (new Date().getMonth() + 1).toString(),
                date: new Date().getDate().toString()
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
        }
    },
    mounted() {

    },
    methods: {
        closeDatePane(){
            this.$emit('closeDatePane');
        },
        // 获取指定年月下的所有日期
        setDateList(){
            this.dateList = dateOrMonth(this.year, this.month);
        },
        selectDate(date){
            this.setDateList(date.key);
            this.$emit('updateDate', date.key);
            this.$emit('closeDatePane');
            this.$emit('input', [date.key]);
        },
        setYearList(year){
            this.yearList = yearListInit(year || this.year);
        },
        selectYear(year){
            // this.year = year.id;
            this.$emit('update-year', year.id);
        },
        selectMonth(month){
            // this.month = month.id;
            this.$emit('update-month', month.id);
        },
        // 格式化日期格式
        formatDateValue(value) {
            // dateFormat(value, this.defaultFormat);
        },
    },
}
