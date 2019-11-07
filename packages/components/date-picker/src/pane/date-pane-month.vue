<template>
    <div :class="[
            'cl-date-pane-month',
            size && `cl-date-pane-month--${size}`
         ]">
        <span v-for="_month in monthList"
              :key="_month.key"
              :class="[
                    'cl-date-pane-month__col',
                    _month.id === currentDate.month && currentDate.year === year && 'cl-date-pane-month__now',
                    value.includes(_month.id) && 'cl-date-pane-month__selected'
              ]"
              @click.stop="selectMonth(_month)">{{_month.name}}</span>
    </div>
</template>

<script>
    import dateMixins from '../mixnis/date-mixins'
    export default {
        name: "ClDatePaneMonth",
        mixins: [dateMixins],
        data(){
            return {

            }
        },
        mounted() {
        },
        methods: {

        },
        watch: {

        }
    }
</script>
