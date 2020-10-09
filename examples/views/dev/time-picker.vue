<template>
    <div class="dev-time-picker">
        <TimePicker :disabledHours="[0,1,3,4,5,6,12]"
                    :disabledMinutes="[0,1,2]"
                    hideDisabledOptions
                    format="hh:mm A"
                    value-format="hh:mm A"
                    :render-html="true"
                    placeholder="请选择时间"
                    @change="handleChange"></TimePicker>
        <TimePicker v-model="value1"
                    :render-html="true"
                    @change="handleChange"></TimePicker>
        <TimePicker v-model="value2"
                    type="timerange"
                    placement="bottom-start"
                    placeholder="请选择时间范围"
                    @change="handleChange"></TimePicker>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value1: new Date().getTime(),
                value2: []
            }
        },
        mounted() {
            // setTimeout(()=>{
            //     this.value1 = '09:09:10'
            // }, 2000)
        },
        methods: {
            handleChange(value) {
                console.log(value, 'change')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dev-time-picker {
        padding-bottom: 200px;
    }
</style>
