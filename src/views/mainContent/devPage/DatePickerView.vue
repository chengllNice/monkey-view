<template>
    <div class="DatePickerView">
        <cl-date-picker style="width: 200px"
                        type="week"
                        placeholder="请选择周"
                        v-model="dateWeek"
                        @change="dateChange"
                        show-week-number
                        clearable
                        :render-html="true"></cl-date-picker>

        <cl-date-picker style="width: 200px"
                        placeholder="请选择日期"
                        v-model="date1"
                        @change="dateChange"
                        clearable
                        show-week-number
                        format="YYYY/MM/DD"
                        :disabled-date="disabledDate"
                        :render-html="true"></cl-date-picker>

        <cl-date-picker type="daterange"
                        style="width: 300px"
                        placeholder="请选择日期"
                        v-model="date2"
                        format="YYYY/MM/DD"
                        @change="dateChange"
                        :render-html="true"></cl-date-picker>

        <cl-date-picker type="year"
                        style="width: 200px"
                        placeholder="请选择年"
                        v-model="dateYear"
                        @change="dateChange"
                        clearable
                        :render-html="true"></cl-date-picker>

        <cl-date-picker type="month"
                        style="width: 200px"
                        placeholder="请选择月"
                        v-model="dateMonth"
                        @change="dateChange"
                        clearable
                        :render-html="true"></cl-date-picker>
    </div>
</template>

<script>
    export default {
        name: "DatePickerView",
        data(){
          return{
              dateWeek: '',
              date1: '',
              date2: ['2020-11-11', '2021-1-1'],
              dateYear: '',
              dateMonth: ''
          }
        },
        methods: {
            dateChange(date){
                console.log(date,'dateChange')
            },
            disabledDate(date){
                return date && new Date(date).getTime() < Date.now();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
