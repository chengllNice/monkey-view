<template>
    <div :class="[
            'cl-date-pane',
            size && `cl-date-pane--${size}`
         ]">
        <div class="cl-date-pane__header">
            <span class="cl-date-pane__header-pre">
                <i class="cl-icon-arrow-left"></i>
                <i class="cl-icon-left"></i>
            </span>
            <span class="cl-date-pane__header-date">
                <span class="cl-date-pane__header-date-label">2019年</span>
                <span class="cl-date-pane__header-date-label">11月</span>
            </span>
            <span class="cl-date-pane__header-next">
                <i class="cl-icon-right"></i>
                <i class="cl-icon-arrow-right"></i>
            </span>
        </div>
        <div class="cl-date-pane__body">
            <div class="cl-date-pane__week-wrap">
                <span v-for="week in weekList" :key="week.id">{{week.name}}</span>
            </div>
            <div class="cl-date-pane__date-wrap">
                <span v-for="(date, index) in allDate"
                      :key="index"
                      :class="[
                        'cl-date-pane__date',
                        date.isNowDate && 'cl-date-pane__now-date',
                        date.isNowMonth && 'cl-date-pane__now-month',
                      ]">{{date.date}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import dateMixins from '../mixnis/date-mixins'
    export default {
        name: "ClDatePane",
        mixins: [dateMixins],
        props: {
          size: String
        },
        data(){
            return {

            }
        },
        mounted() {

        },
        methods: {

        }
    }
</script>