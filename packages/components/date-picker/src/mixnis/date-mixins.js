


import {dateFormat, dateOrMonth} from "../../../../utils/date";

export default {
    props: {
        type: String,
        format: String,
    },
    data() {
        return {
            year: '',
            month: '',
            date: '',
            allDate: [],
            weekList: [
                {
                    id: '0',
                    name: '周日'
                },
                {
                    id: '1',
                    name: '周一'
                },
                {
                    id: '2',
                    name: '周二'
                },
                {
                    id: '3',
                    name: '周三'
                },
                {
                    id: '4',
                    name: '周四'
                },
                {
                    id: '5',
                    name: '周五'
                },
                {
                    id: '6',
                    name: '周六'
                }
            ]
        }
    },
    computed: {
        defaultFormat(){
            let result = this.format;
            if(!result){
                if(this.type === 'date' || this.type === 'daterange'){
                    result = 'YYYY/MM/DD'
                }else if(this.type === 'datetime' || this.type === 'datetime-range'){
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
        this.initData();
    },
    methods: {
        // 初始化数据
        initData(){
            let nowDate = new Date();
            this.year = dateFormat(nowDate, 'YYYY');
            this.month = dateFormat(nowDate, 'MM');
            this.date = dateFormat(nowDate, 'DD');
            // 获取指定年月下的所有日期
            this.allDate = dateOrMonth(this.year, this.month);
        },
        // 格式化日期格式
        formatDateValue(value) {
            // dateFormat(value, this.defaultFormat);
        },
    }
}