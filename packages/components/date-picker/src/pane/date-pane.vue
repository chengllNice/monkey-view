<template>
    <div :class="[
            'cl-date-pane',
            size && `cl-date-pane--${size}`
         ]">
        <div class="cl-date-pane__header">
            <span class="cl-date-pane__header-pre">
                <i class="cl-icon-arrow-left" @click.stop="jumpDate('pre-year')"></i>
                <i class="cl-icon-left" @click.stop="jumpDate('pre-month')"></i>
            </span>
            <span class="cl-date-pane__header-date">
                <span class="cl-date-pane__header-date-label" @click.stop="selectYear">{{this.year}}年</span>
                <span class="cl-date-pane__header-date-label" @click.stop="selectMonth">{{this.month}}月</span>
            </span>
            <span class="cl-date-pane__header-next">
                <i class="cl-icon-right" @click.stop="jumpDate('next-month')"></i>
                <i class="cl-icon-arrow-right" @click.stop="jumpDate('next-year')"></i>
            </span>
        </div>
        <div class="cl-date-pane__body">
            <div class="cl-date-pane__date-wrap">
                <span class="cl-date-pane__week" v-for="week in weekList" :key="week.key">{{week.name}}</span>
                <div class="cl-date-pane__row" v-for="(rowItem, rowIndex) in allDate" :key="rowIndex">
                    <span v-for="date in rowItem"
                          :key="date.key"
                          :class="[
                            'cl-date-pane__date',
                            date.isNowDate && 'cl-date-pane__now-date',
                            !date.isNowMonth && 'cl-date-pane__no-now-month',
                            selectedDate === date.key && 'cl-date-pane__selected'
                          ]"
                          @click.stop="selectDate(date)">
                        {{date.date}}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import dateMixins from '../mixnis/date-mixins'
    export default {
        name: "ClDatePane",
        mixins: [dateMixins],
        props: {
            value: String,
            size: String
        },
        data(){
            return {
                selectedDate: ''
            }
        },
        mounted() {

        },
        methods: {
            selectDate(date){
                this.selectedDate = date.key;
                this.$emit('closeDatePane');
                this.$emit('input', this.selectedDate)
            },
            selectYear(){

            },
            selectMonth(){

            }
        }
    }
</script>
