<template>
    <div :class="[
            `${classPrefix}`,
            size && `${classPrefix}--${size}`,
            className,
         ]"
         v-click-outside.capture="handleClickOutside">
        <div :class="[`${classPrefix}__reference`]" ref="reference">
            <slot>
                <sn-input v-model="dateInputValue"
                          ref="dateInput"
                          :suffix="suffix"
                          :size="size"
                          :disabled="disabled"
                          :clearable="clearable"
                          :placeholder="placeholder"
                          :readonly="readonlyInput"
                          @enter="handleEnter"
                          @click.native="handleFocus"
                          @blur="handleBlur"
                          @clear="handleClear"></sn-input>
            </slot>
        </div>
        <transition :name="transition">
            <DropDown v-show="visible && !disabled"
                      ref="dropDown"
                      :class="dropdownClassName"
                      :reference="this.$refs.reference"
                      :placement="placement"
                      :isMinWidth="false"
                      :dropdownMatchSelectWidth="false"
                      :render-html="renderHtml"
                      v-model="visible">
                <div :class="[`${classPrefix}__drop-down-inner`]">
                    <date-pane picker-type='date'
                               :size="size"
                               :multiple="multiple"
                               :format="formatType"
                               v-model="dateValue"
                               :shortcuts="shortcuts"
                               :is-range="isRange"
                               :type="type"/>
                </div>
            </DropDown>
        </transition>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Input from 'packages/input'
    import {directive as clickOutside} from 'v-click-outside-x';
    import DropDown from '../../../select/src/drop-down.vue'
    import DatePane from '../pane/date-pane.vue'
    import {dateFormat} from "main/utils/date";

    export default {
        name: "DatePicker",
        directives: {clickOutside},
        provide() {
            return {
                picker: this
            }
        },
        props: {
            value: [String, Array],
            type: {
                type: String,
                default: 'date',
                validator(value) {
                    return ['date', 'daterange', 'datetime', 'datetimerange', 'year', 'month', 'week'].includes(value)
                }
            },
            disabled: Boolean,
            readonly: Boolean,
            placeholder: String,
            size: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value);
                }
            },
            clearable: Boolean,
            suffix: {
                type: String,
                default: 'icon-date'
            },
            transition: {
                type: String,
                default: 'slideUp'
            },
            editable: {
                type: Boolean,
                default: true
            },//文本框是否可以输入
            placement: {
                type: String,
                default: 'bottom-start'
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
            open: Boolean,//手动控制日期框的打开关闭
            multiple: Boolean,//多选日期
            separator: {
                type: String,
                default: '~'
            },//两个日期之间的分隔符
            className: String,//选择器的类名
            dropdownClassName: String,//日期下拉框的类名
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-date-picker',
                dateValue: [],
                dateInputValue: '',
                visible: false,
            }
        },
        computed: {
            isRange() {
                return this.type.includes('range');
            },
            readonlyInput() {
                return this.readonly || !this.editable;
            },
            formatType() {
                if (this.format) return this.format;
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
            DatePane,
            'sn-input': Input
        },
        mounted() {
            this.initDateValue();
            this.updateInputValue();
            this.visible = this.open;
        },
        methods: {
            initDateValue(val) {
                let value = val || this.value;
                if (this.multiple && this.type === 'date') {
                    this.dateValue = value || [];
                } else {
                    if (this.isRange) {
                        value = value && Array.isArray(value) && value.length ? value : [];
                        if (value[0] && value[1]) {
                            this.dateValue = [dateFormat(value[0], this.formatType), dateFormat(value[1], this.formatType)];
                        }
                    } else if (typeof value === 'string' || value instanceof Date) {
                        if (this.type === 'week') {
                            this.dateValue = value ? [value] : [];
                        } else {
                            this.dateValue = value ? [dateFormat(value, this.formatType)] : [];
                        }
                    }
                }
            },
            setValue(value) {
                if(!Array.isArray(value)){
                    value = new Date(value);
                }
                this.initDateValue(value);
            },
            handleFocus() {
                this.dropDownVisible(true);
            },
            handleBlur(value){
                this.handleEnter(value);
            },
            handleEnter(value){
                if(!value) return;
                value = dateFormat(value, this.formatType);
                if(this.isRange) value = [value];
                this.initDateValue(value);
            },
            handleClickOutside(event) {
                if (this.visible) {
                    if (this.renderHtml !== false) {
                        const {$el} = this.$refs.dropDown;
                        if ($el === event.target || $el.contains(event.target)) {
                            return;
                        }
                    }
                }
                this.$emit('click-outside',event);
                this.dropDownVisible(false);
            },
            dropDownVisible(visible) {
                if (this.readonly || this.open || this.disabled) return;
                this.visible = visible;
            },
            handleClear() {
                this.dateValue = [];
                this.$emit('clear');
            },
            updateInputValue() {
                if (this.multiple && this.type === 'date') {
                    this.dateInputValue = this.dateValue.join(',');
                } else {
                    if (this.isRange) {
                        let date1 = this.dateValue[0];
                        let date2 = this.dateValue[1];
                        if (date1 && !date2) {
                            this.dateInputValue = `${date1}`;
                        } else if (date1 && date1) {
                            this.dateInputValue = `${date1} ${this.separator} ${date2}`;
                        } else {
                            this.dateInputValue = '';
                        }
                    } else {
                        this.dateInputValue = this.dateValue[0] || '';
                    }
                }
            },
            focus(){
                this.$refs.dateInput && this.$refs.dateInput.focus();
            },
            blur(){
                this.$refs.dateInput && this.$refs.dateInput.blur();
            },
            dateClick(selectValue){
                this.$emit('date-click', selectValue);
            }
        },
        watch: {
            dateValue: {
                handler(newVal) {
                    this.updateInputValue();
                    if (this.isRange || (this.multiple && this.type === 'date')) {
                        this.$emit('input', newVal);
                        this.$emit('change', newVal);
                    } else {
                        this.$emit('input', newVal[0]);
                        this.$emit('change', newVal[0]);
                    }
                },
                deep: true
            },
            open(newVal){
                this.visible = newVal;
            }
        }
    }
</script>
