<template>
    <span :class="[`${classPrefix}`]">
        {{currentTime}}
    </span>
</template>

<script>
    import Config from 'main/config/config'
    import { dateFormat } from 'main/utils/date';

    export default {
        name: 'Time',
        props: {
            time: {
                type: [String, Number, Date],
                required: true,
                default: ''
            },
            type: {
                type: String,
                default: 'relative',
                validator(value) {
                    return ['relative', 'date', 'datetime'].includes(value)
                }
            }, // relative类型：一分钟之内显示（..秒前），1小时之内显示（..分钟前）,今天之内显示（时间点(时分秒，根据format)），昨天显示（昨天 时间点(时分秒，根据format)），昨天之前显示（时间点(根据format)）
            format: {
                type: String,
                default: ''
            },
            // 自动更新时间，单位：秒
            interval: {
                type: Number
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-time',
                defaultFormat: 'yyyy-MM-dd hh:mm:ss',
                currentFormatDate: '', // 日期格式化
                currentFormatTime: '', // 时间格式化
                currentTime: '',
                timer: null
            }
        },
        mounted() {
            this.initFormat();
        },
        methods: {
            initFormat() {
                let format = this.format || this.defaultFormat;
                if (this.type === 'date') {
                    format = this.format || 'yyyy-MM-dd'
                }
                const splitIndex = format.indexOf(' ');
                this.currentFormatDate = format.substring(0, splitIndex).trim() || 'yyyy-MM-dd';
                this.currentFormatTime = format.substring(splitIndex + 1).trim() || 'hh:mm:ss';

                this.initCurrentTime();
                if (this.interval !== undefined && this.interval > 0) {
                    const interval = parseInt(this.interval) * 1000;
                    clearInterval(this.timer);
                    this.timer = setInterval(() => {
                        this.initCurrentTime();
                    }, interval)
                }
            },
            initCurrentTime() {
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
            autoTime(time) {
                if (!time) return;
                let result = '刚刚';
                const nowDate = new Date();
                const yesterDate = new Date();
                const tomorrowDate = new Date();
                yesterDate.setDate(nowDate.getDate() - 1);
                tomorrowDate.setDate(nowDate.getDate() + 1);
                const date = new Date(time);

                let disTimeStamp = nowDate - date;

                const oneHoursTimeStamp = 60 * 60 * 1000;// 一小时毫秒数
                const oneMinutesTimeStamp = 60 * 1000;// 一分钟毫秒数

                const nowDay = nowDate.getDate();// 今天的日期
                const yesterDay = yesterDate.getDate();// 昨天的日期
                const tomorrowDay = tomorrowDate.getDate();// 明天的日期
                const day = date.getDate();// 设置时间的日期

                if (disTimeStamp >= 0) {
                    // 一分钟之内
                    if (disTimeStamp <= oneMinutesTimeStamp) {
                        result = parseInt(disTimeStamp / 1000) + '秒前';
                    } else if (disTimeStamp <= oneHoursTimeStamp) {
                        // 一小时之内
                        result = parseInt(disTimeStamp / 1000 / 60) + '分钟前';
                    } else if (nowDay === day) {
                        // 今天之内
                        result = dateFormat(date, this.currentFormatTime);
                    } else if (yesterDay === day) {
                        // 昨天
                        result = '昨天' + dateFormat(date, this.currentFormatTime);
                    } else {
                        result = dateFormat(date, this.format || this.defaultFormat);
                    }
                } else {
                    // 设置的时间是当前时间点之后的时间

                    disTimeStamp = Math.abs(disTimeStamp);
                    // 一分钟之内
                    if (disTimeStamp <= oneMinutesTimeStamp) {
                        result = parseInt(disTimeStamp / 1000) + '秒后';
                    } else if (disTimeStamp <= oneHoursTimeStamp) {
                        // 一小时之内
                        result = parseInt(disTimeStamp / 1000 / 60) + '分钟后';
                    } else if (nowDay === day) {
                        // 今天
                        result = parseInt(disTimeStamp / 1000 / 60 / 60) + '小时后';
                    } else if (tomorrowDay === day) {
                        // 明天
                        result = '明天' + dateFormat(date, this.currentFormatTime);
                    } else {
                        result = dateFormat(date, this.format || this.defaultFormat);
                    }
                }
                return result;
            }
        },
        destroyed() {
            this.timer && clearInterval(this.timer);
        },
        watch: {
            value() {
                this.initFormat();
            }
        }
    }
</script>
