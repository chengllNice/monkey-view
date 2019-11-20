<template>
    <div :class="[
            'cl-date-pane-month',
            size && `cl-date-pane-month--${size}`
         ]">
        <span v-for="_month in monthList"
              :key="_month.key"
              :class="[
                    'cl-date-pane-item__col',
                    _month.id === currentDate.month && currentDate.year === year && 'cl-date-pane-item__now',
                    isSelectYear && _month.id === selectedMonth && 'cl-date-pane-item__selected'
              ]"
              @click.stop="handleSelectMonth(_month)">{{_month.name}}</span>
    </div>
</template>

<script>
    import { dateObj, dateFormat} from "../../../../utils/date";

    export default {
        name: "ClDatePaneMonth",
        props: {
            size: String,
            type: String,
            format: String,
            year: String,
            month: String,
            date: {
                type: Array,
                default(){
                    return []
                }
            },
            currentDate: Object,
            index: String,
        },
        data(){
            return {
                monthList: dateObj.month,
            }
        },
        computed: {
            selectedMonth(){
                return this.type === 'month' ? dateFormat(this.date[this.index], 'MM') : this.month;
            },
            isSelectYear(){
                return dateFormat(this.date[this.index], 'YYYY') === this.year;
            }
        },
        mounted() {
        },
        methods: {
            handleSelectMonth(month){
                this.$emit('update-month', month.id);
            },
        },
        watch: {

        }
    }
</script>
