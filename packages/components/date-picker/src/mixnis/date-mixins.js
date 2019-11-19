


import {dateFormat, dateOnMonth, zero, yearListInit, dateObj} from "../../../../utils/date";

export default {
    props: {
        date: [String, Array],
        size: String,
        type: String,
        format: String,
        year: String,
        month: String
    },
    data() {
        return {

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
    },
    mounted() {

    },
    methods: {
        closeDatePane(){
            this.$emit('closeDatePane');
        },


        // 格式化日期格式
        formatDateValue(value) {
            // dateFormat(value, this.defaultFormat);
        },
    },
}
