<template>
    <span class="cl-time">
        {{currentTime}}
    </span>
</template>

<script>
    import {dateFormat} from "main/utils/date";

    export default {
        name: "ClTime",
        props: {
            time: {
                type: [String, Number, Date],
                required: true,
                default: ''
            },
            type: {
                type: String,
                default: 'relative',
                validator(value){
                    return ['relative', 'date', 'datetime'].includes(value)
                }
            },//relative类型：一分钟之内显示（..秒前），1小时之内显示（..分钟前）,今天之内显示（时间点(时分秒，根据format)），昨天显示（昨天 时间点(时分秒，根据format)），昨天之前显示（时间点(根据format)）
            format: {
                type: String,
                default: ''
            },
        },
        data(){
            return {
                defaultFormat: 'YYYY-MM-DD hh:mm:ss',
                currentFormatDate: '',//日期格式化
                currentFormatTime: '',//时间格式化
                currentTime: ''
            }
        },
        mounted() {
            this.initFormat();
        },
        methods: {
            initFormat(){
                let format = this.format || this.defaultFormat;
                if(this.type === 'date'){
                    format = this.format || 'YYYY-MM-DD'
                }
                let splitIndex = format.indexOf(' ');
                this.currentFormatDate = format.substring(0, splitIndex).trim() || 'YYYY-MM-DD';
                this.currentFormatTime = format.substring(splitIndex + 1).trim() || 'hh:mm:ss';
                this.initCurrentTime();
            },
            initCurrentTime(){
                let time = '';
                switch (this.type) {
                    case 'relative':
                        time = this.autoTime(this.time);
                        break;
                    case 'date':
                        time = dateFormat(this.time, this.currentFormatDate)
                        break;
                    case 'datetime':
                        time = dateFormat(this.time, this.format || this.defaultFormat)
                        break;
                }
                this.currentTime = time;
            },
            autoTime(time){
                if(!time) return;
                let result = '';
                let nowDate = new Date();
                let yesterDate = new Date();
                let tomorrowDate = new Date();
                yesterDate.setDate(nowDate.getDate() - 1);
                tomorrowDate.setDate(nowDate.getDate() + 1);
                let date = new Date(time);

                let disTimeStamp = nowDate - date;

                let oneHoursTimeStamp = 60 * 60 * 1000;//一小时毫秒数
                let oneMinutesTimeStamp = 60 * 1000;//一分钟毫秒数

                let nowDay = nowDate.getDate();//今天的日期
                let yesterDay = yesterDate.getDate();//昨天的日期
                let tomorrowDay = tomorrowDate.getDate();//明天的日期
                let day = date.getDate();//设置时间的日期

                if(disTimeStamp >= 0){
                    //一分钟之内
                    if(disTimeStamp <= oneMinutesTimeStamp){
                        result = parseInt(disTimeStamp / 1000) + '秒前';
                    }
                    //一小时之内
                    else if(disTimeStamp <= oneHoursTimeStamp){
                        result = parseInt(disTimeStamp / 1000 / 60) + '分钟前';
                    }
                    //今天之内
                    else if(nowDay === day){
                        result = dateFormat(date, this.currentFormatTime);
                    }
                    //昨天
                    else if(yesterDay === day){
                        result = '昨天' + dateFormat(date, this.currentFormatTime);
                    }
                    else{
                        result = dateFormat(date, this.format || this.defaultFormat);
                    }
                }else{
                    //设置的时间是当前时间点之后的时间

                    disTimeStamp = Math.abs(disTimeStamp);
                    //一分钟之内
                    if(disTimeStamp <= oneMinutesTimeStamp){
                        result = parseInt(disTimeStamp / 1000) + '秒后';
                    }
                    //一小时之内
                    else if(disTimeStamp <= oneHoursTimeStamp){
                        result = parseInt(disTimeStamp / 1000 / 60) + '分钟后';
                    }
                    //今天
                    else if(nowDay === day){
                        result = parseInt(disTimeStamp / 1000 / 60 / 60) + '小时后';
                    }
                    //明天
                    else if(tomorrowDay === day){
                        result = '明天' + dateFormat(date, this.currentFormatTime);
                    }
                    else{
                        result = dateFormat(date, this.format || this.defaultFormat);
                    }
                }
                return result;
            },

        },
        watch: {
            value(){
                this.initFormat();
            }
        }
    }
</script>