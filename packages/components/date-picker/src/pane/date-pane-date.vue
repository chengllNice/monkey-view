<template>
    <div :class="[
            'cl-date-pane-date',
            size && `cl-date-pane-date--${size}`
         ]">
        <div class="cl-date-pane-date__date-wrap">
            <span class="cl-date-pane-date__week" v-for="week in weekList" :key="week.key">{{week.name}}</span>
            <div class="cl-date-pane-date__row" v-for="(rowItem, rowIndex) in dateList" :key="rowIndex">
                <span v-for="date in rowItem"
                      :key="date.key"
                      :class="[
                        'cl-date-pane-date__date',
                        date.isNowDate && 'cl-date-pane-date__now-date',
                        !date.isNowMonth && 'cl-date-pane-date__no-now-month',
                        value.includes(date.key) && 'cl-date-pane-date__selected'
                      ]"
                      @click.stop="selectDate(date)">{{date.date}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import dateMixins from '../mixnis/date-mixins'
    export default {
        name: "ClDatePaneDate",
        mixins: [dateMixins],
        props: {

        },
        data(){
            return {

            }
        },
        mounted() {
        },
        methods: {

        },
        watch: {
            year(){
                this.setDateList();
            },
            month(){
                this.setDateList();
            }
        }
    }
</script>