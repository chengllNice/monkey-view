<template>
    <div class="time-picker-view">
        <TimePicker :disabledHours="[0,1,12]"
                    :disabledMinutes="[0,1,2]"
                    hideDisabledOptions
                    placeholder="请选择时间"></TimePicker>
<!--        <TimePicker v-model="value1"-->
<!--                    :render-html="true"-->
<!--                    @change="handleChange"></TimePicker>-->
<!--        <TimePicker v-model="value2"-->
<!--                    type="timerange"-->
<!--                    placement="bottom-start"-->
<!--                    placeholder="请选择时间范围"-->
<!--                    @change="handleChange"></TimePicker>-->
    </div>
</template>

<script>
    export default {
        name: "TimePickerView",
        data(){
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
            handleChange(value){
                console.log(value,'change')
            }
        }
    }
</script>

<style lang="scss" scoped>
.time-picker-view{
    padding-bottom: 200px;
}
</style>
