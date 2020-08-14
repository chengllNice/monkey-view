<template>
    <div class="DatePickerView">

        <h4>date</h4>
        <DatePicker style="width: 200px"
                        placeholder="请选择日期"
                        v-model="date"
                        @change="dateChange"
                        value-format="timestamp"
                        clearable
                        :render-html="true"></DatePicker>

<!--        <h4>daterange</h4>-->
<!--        <DatePicker type="daterange"-->
<!--                        style="width: 300px"-->
<!--                        placeholder="请选择日期"-->
<!--                        v-model="daterange"-->
<!--                        @change="dateChange"-->
<!--                        clearable-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>year</h4>-->
<!--        <DatePicker type="year"-->
<!--                        style="width: 200px"-->
<!--                        placeholder="请选择年"-->
<!--                        v-model="dateYear"-->
<!--                        @change="dateChange"-->
<!--                        clearable-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>month</h4>-->
<!--        <DatePicker type="month"-->
<!--                        style="width: 200px"-->
<!--                        placeholder="请选择月"-->
<!--                        v-model="dateMonth"-->
<!--                        @change="dateChange"-->
<!--                        clearable-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>week</h4>-->
<!--        <DatePicker style="width: 200px"-->
<!--                        type="week"-->
<!--                        placeholder="请选择周"-->
<!--                        v-model="dateWeek"-->
<!--                        @change="dateChange"-->
<!--                        clearable-->
<!--                        show-week-number-->
<!--                        format="yyyy年WW周"-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>datetime</h4>-->
<!--        <DatePicker style="width: 200px"-->
<!--                        placeholder="请选择日期和时间"-->
<!--                        type="datetime"-->
<!--                        v-model="dateTime"-->
<!--                        @change="dateChange"-->
<!--                        clearable-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>datetimerange</h4>-->
<!--        <DatePicker style="width: 400px"-->
<!--                        placeholder="请选择日期和时间"-->
<!--                        type="datetimerange"-->
<!--                        v-model="dateTimeRange"-->
<!--                        @change="dateChange"-->
<!--                        clearable-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>显示快捷方式</h4>-->
<!--        <DatePicker type="daterange"-->
<!--                        style="width: 300px"-->
<!--                        placeholder="请选择日期"-->
<!--                        v-model="dateShortcuts"-->
<!--                        :shortcuts="shortcutsrange"-->
<!--                        @change="dateChange"-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>禁用指定日期</h4>-->
<!--        <DatePicker style="width: 300px"-->
<!--                        placeholder="请选择日期"-->
<!--                        v-model="dateDisabledDate"-->
<!--                        :disabled-date="disabledDate"-->
<!--                        @change="dateChange"-->
<!--                        :render-html="true"></DatePicker>-->


<!--        <h4>禁用指定日期</h4>-->
<!--        <DatePicker style="width: 300px"-->
<!--                        type="daterange"-->
<!--                        placeholder="请选择日期"-->
<!--                        v-model="dateDisabledRange"-->
<!--                        :disabled-date="disabledDateRange"-->
<!--                        @change="dateChange"-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>格式化日期</h4>-->
<!--        <DatePicker style="width: 200px"-->
<!--                        placeholder="请选择日期"-->
<!--                        v-model="dateFormat"-->
<!--                        format="yyyy年MM月dd日"-->
<!--                        @change="dateChange"-->
<!--                        clearable-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>多选multiple</h4>-->
<!--        <DatePicker style="width: 200px"-->
<!--                        placeholder="请选择日期"-->
<!--                        v-model="dateMultiple"-->
<!--                        @change="dateChange"-->
<!--                        clearable-->
<!--                        multiple-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>显示周数</h4>-->
<!--        <DatePicker style="width: 200px"-->
<!--                        placeholder="请选择日期"-->
<!--                        v-model="dateWeekNumber"-->
<!--                        @change="dateChange"-->
<!--                        show-week-number-->
<!--                        clearable-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>只读</h4>-->
<!--        <DatePicker style="width: 200px"-->
<!--                        placeholder="请选择日期"-->
<!--                        v-model="dateReadonly"-->
<!--                        readonly-->
<!--                        @change="dateChange"-->
<!--                        clearable-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>禁用</h4>-->
<!--        <DatePicker style="width: 200px"-->
<!--                        placeholder="请选择日期"-->
<!--                        v-model="dateDisabled"-->
<!--                        disabled-->
<!--                        @change="dateChange"-->
<!--                        clearable-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>不可输入</h4>-->
<!--        <DatePicker style="width: 200px"-->
<!--                        placeholder="请选择日期"-->
<!--                        v-model="dateNoEditable"-->
<!--                        :editable="false"-->
<!--                        @change="dateChange"-->
<!--                        clearable-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>自定义触发器</h4>-->
<!--        <DatePicker style="width: 200px"-->
<!--                        placeholder="请选择日期"-->
<!--                        v-model="dateSlot"-->
<!--                        :open="open"-->
<!--                        @change="dateChange"-->
<!--                        clearable-->
<!--                        :render-html="true">-->
<!--            <Button type="text" @click="open = !open">触发日期框打开关闭</Button>-->
<!--        </DatePicker>-->

<!--        <h4>mini</h4>-->
<!--        <DatePicker style="width: 200px"-->
<!--                        placeholder="请选择日期"-->
<!--                        size="mini"-->
<!--                        v-model="dateMini"-->
<!--                        @change="dateChange"-->
<!--                        clearable-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>small</h4>-->
<!--        <DatePicker style="width: 200px"-->
<!--                        placeholder="请选择日期"-->
<!--                        size="small"-->
<!--                        v-model="dateSmall"-->
<!--                        @change="dateChange"-->
<!--                        clearable-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>default</h4>-->
<!--        <DatePicker style="width: 200px"-->
<!--                        placeholder="请选择日期"-->
<!--                        v-model="dateDefault"-->
<!--                        @change="dateChange"-->
<!--                        clearable-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>large</h4>-->
<!--        <DatePicker style="width: 200px"-->
<!--                        placeholder="请选择日期"-->
<!--                        size="large"-->
<!--                        v-model="dateLarge"-->
<!--                        @change="dateChange"-->
<!--                        clearable-->
<!--                        :render-html="true"></DatePicker>-->

<!--        <h4>手动获取失去焦点</h4>-->
<!--        <div><Button @click="handleFocus">获取焦点</Button><Button @click="handleBlur">失去焦点</Button></div>-->
<!--        <DatePicker style="width: 200px"-->
<!--                        ref="focusDate"-->
<!--                        placeholder="请选择日期"-->
<!--                        v-model="dateFocus"-->
<!--                        @change="dateChange"-->
<!--                        clearable-->
<!--                        :render-html="true"></DatePicker>-->
    </div>
</template>

<script>
    export default {
        name: "DatePickerView",
        data(){
          return{
              dateMultiple: [],
              dateWeek: '',
              date: '',
              daterange: ['2020-11-11', '2021-1-1'],
              dateYear: '',
              dateMonth: '',
              dateTime: '',
              dateTimeRange: [],
              dateWeekNumber: '',
              dateShortcuts: '',
              dateFormat: '',
              dateReadonly: '',
              dateDisabled: '',
              dateDisabledDate: '',
              dateDisabledRange: [],
              dateNoEditable: '',
              dateSlot: '',
              dateMini: '',
              dateSmall: '',
              dateDefault: '',
              dateLarge: '',
              dateFocus: '',
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
              ],
              open: false
          }
        },
        mounted() {
            setTimeout(()=>{
                this.date = '2020-01-01'
            }, 3000)
        },
        methods: {
            dateChange(date){
                console.log(date,'dateChange')
            },
            disabledDate(date){
                return date && new Date(date).getTime() < Date.now();
            },
            disabledDateRange(date){
                return date && new Date(date).getTime() < Date.now();
            },
            handleFocus(){
                this.$refs.focusDate.focus();
            },
            handleBlur(){
                this.$refs.focusDate.blur();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
