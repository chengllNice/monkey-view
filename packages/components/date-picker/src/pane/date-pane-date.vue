<template>
    <div :class="[
            'cl-date-pane-date',
            size && `cl-date-pane-date--${size}`
         ]">
        <span class="cl-date-pane-item__week" v-for="week in weekList" :key="week.key">{{week.name}}</span>
        <span v-for="date in dateList"
              :key="date.key"
              :class="[
                        'cl-date-pane-item__col',
                        date.isNowDate && 'cl-date-pane-item__now',
                        !date.isNowMonth && 'cl-date-pane-item__no-now-month',
                        value.includes(date.key) && 'cl-date-pane-item__selected'
                      ]"
              @click.stop="selectDate(date)">{{date.date}}</span>
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
            this.setDateList();
        },
        methods: {
            selectDate(date){
                this.$emit('updateDate', [date.key]);
                this.$emit('input', [date.key]);
            },
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
