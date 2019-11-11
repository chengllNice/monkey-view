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
    import dateMixins from '../mixnis/date-mixins'

    export default {
        name: "ClDatePaneYear",
        mixins: [dateMixins],
        data() {
            return {}
        },
        mounted() {
            this.setYearList();
        },
        methods: {
            selectYear(year){
                this.$emit('update-year', year.id);
                this.$emit('input', year.id);
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
