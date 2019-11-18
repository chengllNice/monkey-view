<template>
    <div :class="[
            'cl-date-pane-year',
            size && `cl-date-pane-year--${size}`
         ]">
        <span v-for="_year in yearList"
              :key="_year.key"
              :class="[
                    'cl-date-pane-item__col',
                    _year.id === currentDate.year && 'cl-date-pane-item__now',
                    year === _year.id && 'cl-date-pane-item__selected'
              ]"
              @click.stop="selectYear(_year)">{{_year.name}}</span>
    </div>
</template>

<script>
    import { yearListInit} from "../../../../utils/date";

    export default {
        name: "ClDatePaneYear",
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
        data() {
            return {
                yearList: [],
            }
        },
        mounted() {
            this.setYearList();
        },
        methods: {
            // 获取年份列表
            setYearList(year){
                if(!year && !this.year) return;
                this.yearList = yearListInit(year || this.year);
            },
            selectYear(year){
                this.$emit('update-year', year.id);
            },
        },
        watch: {
            year() {
                if (this.type === 'year') {
                    this.setYearList();
                }
            },
            type(newVal) {
                newVal === 'year' && this.setYearList();
            }
        }
    }
</script>
