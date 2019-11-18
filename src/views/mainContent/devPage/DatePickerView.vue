<template>
    <div class="DatePickerView">
        <cl-date-picker style="width: 200px"
                        placeholder="请选择日期"
                        v-model="date1"
                        @change="dateChange"
                        clearable
                        format="YYYY"
                        :render-html="true"></cl-date-picker>

        <cl-date-picker type="daterange"
                        style="width: 200px"
                        placeholder="请选择日期"
                        v-model="date2"
                        @change="dateChange"
                        :render-html="true"></cl-date-picker>
    </div>
</template>

<script>
    export default {
        name: "DatePickerView",
        data(){
          return{
              date1: '',
              date2: ['2019-11-11', '2020-1-1'],
          }
        },
        methods: {
            dateChange(date){
                console.log(date,'dateChange')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>