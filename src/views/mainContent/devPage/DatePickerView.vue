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

        <!--:disabled-date="disabledDate"-->

        <cl-date-picker style="width: 200px"
                        placeholder="请选择日期"
                        v-model="date1"
                        @change="dateChange"
                        clearable
                        show-week-number
                        format="YYYY/MM/DD"
                        :shortcuts="shortcuts"
                        :render-html="true"></cl-date-picker>

        <cl-date-picker type="daterange"
                        style="width: 300px"
                        placeholder="请选择日期"
                        v-model="date2"
                        format="YYYY/MM/DD"
                        :shortcuts="shortcutsrange"
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

        <cl-date-picker style="width: 200px"
                        placeholder="请选择日期和时间"
                        type="datetime"
                        v-model="dateTime"
                        @change="dateChange"
                        clearable
                        :render-html="true"></cl-date-picker>


        <cl-date-picker style="width: 400px"
                        placeholder="请选择日期和时间"
                        type="datetimerange"
                        v-model="dateTimeRange"
                        @change="dateChange"
                        clearable
                        :render-html="true"></cl-date-picker>


<!--        <cl-date-picker style="width: 200px"-->
<!--                        placeholder="请选择日期"-->
<!--                        v-model="dateWeek"-->
<!--                        @change="dateChange"-->
<!--                        always-show-pane-->
<!--                        show-week-number-->
<!--                        clearable-->
<!--                        :render-html="true"></cl-date-picker>-->
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
              dateMonth: '',
              dateTime: '',
              dateTimeRange: [],
              shortcuts: [
                  {
                      text: '今天',
                      onClick(picker){
                          let date = new Date();
                          picker.setValue(date);
                      }
                  },
                  {
                      text: '昨天',
                      onClick(picker){
                          let date = new Date();
                          date.setDate(date.getDate() - 1);
                          picker.setValue(date);
                      }
                  },
                  {
                      text: '一周之前的某一天',
                      onClick(picker){
                          let date = new Date();
                          date.setDate(date.getDate() - 7);
                          picker.setValue(date);
                      }
                  }
              ],
              shortcutsrange: [
                  {
                      text: '最近一周',
                      onClick(picker){
                          let date1 = new Date();
                          let date2 = new Date();
                          date1.setDate(date1.getDate() - 7);
                          picker.setValue([date1, date2]);
                      }
                  },
                  {
                      text: '一个月',
                      onClick(picker){
                          let date1 = new Date();
                          let date2 = new Date();
                          date1.setDate(date1.getDate() - 30);
                          picker.setValue([date1, date2]);
                      }
                  },
                  {
                      text: '三个月',
                      onClick(picker){
                          let date1 = new Date();
                          let date2 = new Date();
                          date1.setDate(date1.getDate() - 90);
                          picker.setValue([date1, date2]);
                      }
                  }
              ]
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
