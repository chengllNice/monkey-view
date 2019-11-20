<template>
    <div :class="[
            'cl-date-picker',
            size && `cl-date-picker--${size}`
         ]"
         v-click-outside.capture="handleClickOutside">
        <div class="cl-date-picker__reference" ref="reference">
            <cl-input v-model="dateInputValue"
                      suffix="cl-icon-date"
                      :size="size"
                      :disabled="disabled"
                      :clearable="clearable"
                      :placeholder="placeholder"
                      @click.native="handleFocus"
                      @blur="updateInputValue"
                      @clear="clearHandle"></cl-input>
        </div>
        <transition :name="transition">
            <DropDown v-show="visible && !disabled"
                      ref="dropDown"
                      :reference="this.$refs.reference"
                      :placement="placement"
                      :isMinWidth="false"
                      :dropdownMatchSelectWidth="false"
                      :render-html="renderHtml"
                      v-model="visible">
                <div class="cl-date-picker__drop-down-inner">
                    <cl-date-pane :size="size"
                                  :format="formatType"
                                  v-model="dateValue"
                                  :is-range="isRange"
                                  :type="type" />
                </div>
            </DropDown>
        </transition>
    </div>
</template>

<script>
    import {directive as clickOutside} from 'v-click-outside-x';
    import DropDown from '../../select/src/drop-down.vue'
    // import ClDatePaneSingle from './pane/date-pane-single.vue'
    // import ClDatePaneRange from './pane/date-pane-range.vue'
    import ClDatePane from './pane/date-pane.vue'
    import {dateFormat} from "../../../utils/date";

    export default {
        name: "ClDatePicker",
        directives: {clickOutside},
        provide() {
            return {
                datePicker: this
            }
        },
        props: {
            value: [String, Array],
            type: {
                type: String,
                default: 'date',
                validator(value){
                    return ['date', 'daterange', 'datetime', 'datetimerange', 'year', 'month'].includes(value)
                }
            },
            placeholder: String,
            transition: {
                type: String,
                default: 'fade'
            },
            disabled: Boolean,
            clearable: Boolean,
            placement: {
                type: String,
                default: 'bottom-start'
            },
            size: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value);
                }
            },
            format: {
                type: String,
                default: '',
            },
            disabledDate: Function,
            renderHtml: {
                type: [HTMLElement, Boolean],
                default: function () {
                    return false
                }
            }
        },
        data(){
            return {
                dateValue: [],
                dateInputValue: '',
                visible: false,
            }
        },
        computed: {
            isRange(){
                return this.type.includes('range');
            },
            formatType(){
                if(this.format) return this.format;
                let result;
                switch (this.type) {
                    case 'date':
                        result = 'YYYY-MM-DD';
                        break;
                    case 'daterange':
                        result = 'YYYY-MM-DD';
                        break;
                    case 'datetime':
                        result = 'YYYY-MM-DD hh:mm:ss';
                        break;
                    case 'datetimerange':
                        result = 'YYYY-MM-DD hh:mm:ss';
                        break;
                    case 'year':
                        result = 'YYYY';
                        break;
                    case 'month':
                        result = 'YYYY-MM';
                        break;
                    default:
                        result = 'YYYY-MM-DD';
                        break;
                }
                return result;
            }
        },
        components: {
            DropDown,
            ClDatePane
        },
        mounted() {
            this.initDateValue();
            this.updateInputValue();
        },
        methods: {
            initDateValue(){
                if(this.isRange){
                    let value = this.value && this.value.length ? this.value : [];
                    if(value[0] && value[1]){
                        this.dateValue = [dateFormat(value[0], this.formatType), dateFormat(value[0], this.formatType)];
                    }
                }else{
                    this.dateValue = this.value ? [dateFormat(this.value, this.formatType)] : [];
                }
            },
            handleFocus(){
                if(this.disabled){
                    return
                }
                this.visible = !this.visible;
            },
            handleClickOutside(event){
                if(this.visible){
                    if(this.renderHtml !== false){
                        const {$el} = this.$refs.dropDown;
                        if ($el === event.target || $el.contains(event.target)) {
                            return;
                        }
                    }
                }
                this.closeDropDownPane(false);
            },
            closeDropDownPane(visible){
                this.visible = visible;
            },
            openDropDownPane(){

            },
            clearHandle(){
                this.dateValue = [];
            },
            updateInputValue(){
                if(this.isRange){
                    let date1 = this.dateValue[0];
                    let date2 = this.dateValue[1];
                    if(date1 && !date2){
                        this.dateInputValue = `${date1}`;
                    }else if(date1 && date1){
                        this.dateInputValue = `${date1} - ${date2}`;
                    }else{
                        this.dateInputValue = '';
                    }
                }else{
                    this.dateInputValue = this.dateValue[0] || '';
                }
            },
        },
        watch: {
            dateValue(newVal){
                this.updateInputValue();
                if(this.isRange){
                    this.$emit('input', newVal);
                    this.$emit('change', newVal);
                }else{
                    this.$emit('input', newVal[0]);
                    this.$emit('change', newVal[0]);
                }
            }
        }
    }
</script>
