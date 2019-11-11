<template>
    <div class="cl-date-pane-range">
        <cl-date-pane-single class="cl-date-pane-range__left"
                             index="0"
                             :size="size"
                             :format="format"
                             v-model="dateRangeValue1"
                             :type="type"></cl-date-pane-single>
        <cl-date-pane-single class="cl-date-pane-range__right"
                             index="1"
                             :size="size"
                             :format="format"
                             v-model="dateRangeValue2"
                             :type="type"></cl-date-pane-single>
    </div>
</template>

<script>
    import ClDatePaneSingle from './date-pane-single'
    export default {
        name: "ClDatePaneRange",
        props: {
            value: Array,
            size: String,
            type: String,
            format: String,
        },
        data(){
            return {
                dateRangeValue1: [],
                dateRangeValue2: [],
                dataRangeValue: [],
            }
        },
        components: {
            ClDatePaneSingle
        },
        mounted() {
            this.updateDateRangeValue();
        },
        methods: {
            updateDateRangeValue(value){
                this.dataRangeValue = value || this.value;
                this.dateRangeValue1 = this.dataRangeValue.length >= 1 ? [this.dataRangeValue[0]] : [];
                this.dateRangeValue2 = this.dataRangeValue.length === 2 ? [this.dataRangeValue[1]] : [];
            },
        },
        watch: {
            value(newVal){
                this.updateDateRangeValue(newVal);
            },
            dateRangeValue1(newVal){
                if(newVal.length === 2){
                    this.dataRangeValue = newVal
                }else{
                    this.dataRangeValue[0] = newVal[0]
                }
            },
            dateRangeValue2(newVal){
                if(newVal.length === 2){
                    this.dataRangeValue = newVal
                }else{
                    this.dataRangeValue[1] = newVal[0]
                }
            },
            dataRangeValue(newVal){
                this.$emit('input', newVal)
            }
        }
    }
</script>