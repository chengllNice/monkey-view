


import {dateFormat, dateOrMonth, zero} from "../../../../utils/date";

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
                    key: 'week0',
                    name: '日'
                },
                {
                    id: '1',
                    key: 'week1',
                    name: '一'
                },
                {
                    id: '2',
                    key: 'week2',
                    name: '二'
                },
                {
                    id: '3',
                    key: 'week3',
                    name: '三'
                },
                {
                    id: '4',
                    key: 'week4',
                    name: '四'
                },
                {
                    id: '5',
                    key: 'week5',
                    name: '五'
                },
                {
                    id: '6',
                    key: 'week6',
                    name: '六'
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
            this.setAllDate();
        },
        jumpDate(type){
            let month;
            switch (type) {
                case 'pre-year':
                    this.year = parseInt(this.year) - 1;
                    break;
                case 'pre-month':
                    month = parseInt(this.month) - 1;
                    if(month < 1){
                        month = 12;
                        this.year = parseInt(this.year) - 1;
                    }
                    this.month = zero(month);
                    break;
                case 'next-month':
                    month = parseInt(this.month) + 1;
                    if(month > 12){
                        month = 1;
                        this.year = parseInt(this.year) + 1;
                    }
                    this.month = zero(month);
                    break;
                case 'next-year':
                    this.year = parseInt(this.year) + 1;
                    break;
            }
            this.setAllDate();
        },
        // 获取指定年月下的所有日期
        setAllDate(){
            let allDate = dateOrMonth(this.year, this.month);
            let tempArr = [];
            this.allDate = [];
            allDate.forEach((item, index)=>{
                tempArr.push(item);
                if((index + 1) % 7 === 0){
                    this.allDate.push(tempArr);
                    tempArr = [];
                }
            });
        },
        // 格式化日期格式
        formatDateValue(value) {
            // dateFormat(value, this.defaultFormat);
        },
    }
}
