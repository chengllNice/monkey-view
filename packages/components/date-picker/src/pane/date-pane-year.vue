<template>
    <div :class="[
            'cl-date-pane-year',
            size && `cl-date-pane-year--${size}`
         ]">
        <span v-for="_year in yearList"
              :key="_year.key"
              :class="[
                    'cl-date-pane-year__col',
                    _year.id === currentDate.year && 'cl-date-pane-year__now',
                    value.includes(_year.id) && 'cl-date-pane-year__selected'
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
        methods: {},
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
