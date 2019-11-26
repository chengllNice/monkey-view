<template>
    <div :class="[
            'cl-date-picker',
            size && `cl-date-picker--${size}`
         ]"
         v-click-outside.capture="handleClickOutside">
        <div class="cl-date-picker__reference" ref="reference">
            <slot>
                <cl-input v-model="dateInputValue"
                          suffix="cl-icon-date"
                          :size="size"
                          :disabled="disabled"
                          :clearable="clearable"
                          :placeholder="placeholder"
                          @click.native="handleFocus"
                          @blur="updateInputValue"
                          @clear="clearHandle"></cl-input>
            </slot>
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
                                  :shortcuts="shortcuts"
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
                    return ['date', 'daterange', 'datetime', 'datetimerange', 'year', 'month', 'week'].includes(value)
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
            shortcuts: Array,
            disabledDate: Function,
            showWeekNumber: Boolean,
            renderHtml: {
                type: [HTMLElement, Boolean],
                default: function () {
                    return false
                }
            },
            alwaysShowPane: Boolean,//是否总是显示日期下拉框
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
                    case 'week':
                        result = 'YYYY-WW';
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
            this.visible = this.alwaysShowPane;
        },
        methods: {
            initDateValue(val){
                let value = val || this.value;
                if(this.isRange){
                    value = value && value.length ? value : [];
                    if(value[0] && value[1]){
                        this.dateValue = [dateFormat(value[0], this.formatType), dateFormat(value[1], this.formatType)];
                    }
                }else if(typeof value === 'string'){
                    if(this.type === 'week'){
                        this.dateValue = value ? [value] : [];
                    }else{
                        this.dateValue = value ? [dateFormat(value, this.formatType)] : [];
                    }
                }
            },
            setValue(value){
                !Array.isArray(value) && (value = value.toString());
                this.initDateValue(value);
            },
            handleFocus(){
                if(this.disabled || this.alwaysShowPane){
                    return
                }
                this.visible = !this.visible;
            },
            handleClickOutside(event){
                if(this.alwaysShowPane) return;
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
            dateValue: {
                handler(newVal){
                    this.updateInputValue();
                    if(this.isRange){
                        this.$emit('input', newVal);
                        this.$emit('change', newVal);
                    }else{
                        this.$emit('input', newVal[0]);
                        this.$emit('change', newVal[0]);
                    }
                },
                deep: true
            },
        }
    }
</script>
