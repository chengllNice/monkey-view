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
            selectMonth(month){
                this.$emit('update-month', month.id);
                this.$emit('input', month.id);
            },
        },
        watch: {

        }
    }
</script>
