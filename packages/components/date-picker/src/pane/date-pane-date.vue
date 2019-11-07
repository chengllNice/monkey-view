<template>
    <div :class="[
            'cl-date-pane-date',
            size && `cl-date-pane-date--${size}`
         ]">
        <div class="cl-date-pane-date__date-wrap">
            <span class="cl-date-pane-date__week" v-for="week in weekList" :key="week.key">{{week.name}}</span>
            <span v-for="date in dateList"
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
