<template>
    <div class="time-picker-view">
        <cl-time-picker :render-html="true"></cl-time-picker>
        <cl-time-picker type="timerange" placement="bottom-start" placeholder="请选择时间范围"></cl-time-picker>
    </div>
</template>

<script>
    export default {
        name: "TimePickerView"
    }
</script>

<style lang="scss" scoped>
.time-picker-view{
    padding-bottom: 200px;
}
</style>
