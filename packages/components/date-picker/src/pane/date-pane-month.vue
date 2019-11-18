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
                    _month.id === month && 'cl-date-pane-item__selected'
              ]"
              @click.stop="selectMonth(_month)">{{_month.name}}</span>
    </div>
</template>

<script>
    import { dateObj} from "../../../../utils/date";

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
            currentDate: Object
        },
        data(){
            return {
                monthList: dateObj.month,
            }
        },
        mounted() {
        },
        methods: {
            selectMonth(month){
                this.$emit('update-month', month.id);
            },
        },
        watch: {

        }
    }
</script>
