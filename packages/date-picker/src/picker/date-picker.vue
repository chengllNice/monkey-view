<template>
    <div :class="[
            `${classPrefix}`,
            className,
         ]"
         v-click-outside.capture="handleClickOutside">
        <template v-if="!onlyShowPane">
            <div :class="[`${classPrefix}__reference`]" ref="reference">
                <slot>
                    <Input v-model="dateInputValue"
                           ref="dateInput"
                           :suffix="suffix"
                           :prefix="prefix"
                           :size="computedSize"
                           :disabled="disabled"
                           :clearable="clearable"
                           :placeholder="placeholder"
                           :readonly="readonlyInput"
                           @enter="handleEnter"
                           @click.native="handleFocus"
                           @clear="handleClear"></Input>
                </slot>
            </div>
            <transition :name="transition">
                <Drop v-show="visible && !disabled"
                      ref="dropDown"
                      :class="dropdownClassName"
                      :reference="this.$refs.reference"
                      :placement="placement"
                      :min-width="false"
                      :dropdownMatchSelectWidth="false"
                      :render-html="renderHtml"
                      v-model="visible">
                    <div :class="[`${classPrefix}__drop-down-inner`]">
                        <date-pane ref="datePane"
                                   picker-type='date'
                                   :multiple="multiple"
                                   v-model="dateValue"
                                   :shortcuts="shortcuts"
                                   :is-range="isRange"
                                   :type="type"
                                   @change="handleDateValueChange"/>
                    </div>
                </Drop>
            </transition>
        </template>
        <template v-else>
            <div :class="[`${classPrefix}__drop-down-inner`]">
                <date-pane ref="datePane"
                           picker-type='date'
                           :multiple="multiple"
                           v-model="dateValue"
                           :shortcuts="shortcuts"
                           :is-range="isRange"
                           :type="type"
                           @change="handleDateValueChange"/>
            </div>
        </template>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Input from 'packages/input'
    import {directive as clickOutside} from 'v-click-outside-x';
    import Drop from 'packages/base/drop'
    import DatePane from '../pane/date-pane.vue'
    import {dateFormat, formatToDate} from "main/utils/date";
    import { findComponent} from "main/utils/tool";


    export default {
        name: "DatePicker",
        directives: {clickOutside},
        provide() {
            return {
                picker: this
            }
        },
        props: {
            value: [String, Array, Date, Number],
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
            clearable: {
                type: Boolean,
                default: true
            },
            suffix: {
                type: String,
                default: 'date'
            },
            prefix: {
                type: String,
                default: ''
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
            valueFormat: {
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
            onlyShowPane: Boolean,//是否只显示pane日期框
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-date-picker',
                dateValue: [],
                dateInputValue: '',
                visible: false,
                form: findComponent(this, 'Form')
            }
        },
        computed: {
            isRange() {
                return this.type.includes('range');
            },
            readonlyInput() {
                return this.readonly || !this.editable;
            },
            computedSize(){
                if(this.size !== 'default') return this.size;
                if(this.form && this.form.size !== 'default') return this.form.size;
                return this.size;
            },
            defaultFormatType(){
                let result;
                switch (this.type) {
                    case 'date':
                        result = 'yyyy-MM-dd';
                        break;
                    case 'daterange':
                        result = 'yyyy-MM-dd';
                        break;
                    case 'datetime':
                        result = 'yyyy-MM-dd hh:mm:ss';
                        break;
                    case 'datetimerange':
                        result = 'yyyy-MM-dd hh:mm:ss';
                        break;
                    case 'year':
                        result = 'yyyy';
                        break;
                    case 'month':
                        result = 'yyyy-MM';
                        break;
                    case 'week':
                        result = 'yyyy-WW';
                        break;
                    default:
                        result = 'yyyy-MM-dd';
                        break;
                }
                return result;
            },
            formatType() {
                if (this.format && this.format !== 'timestamp') return this.format;
                return this.defaultFormatType;
            }
        },
        components: {
            Drop,
            DatePane,
            Input
        },
        mounted() {
            this.initDateValue();
            this.updateInputValue();
            this.visible = this.open;
        },
        methods: {
            initDateValue(val) {
                let value = val || this.value;

                let valid = true;
                if(value && Array.isArray(value)){

                    value = value.map(item => {
                        let v = formatToDate(item, this.formatType);
                        if(!v || (v && isNaN(v.getTime()))) valid = false;
                        return v;
                    });
                }else if(value){
                    let v = formatToDate(value, this.formatType);
                    if(!v || (v && isNaN(v.getTime()))) valid = false;
                    value = [v]
                }else {
                    value = [];
                }

                if(!valid) return;

                if (this.multiple && this.type === 'date') {
                    this.dateValue = value;
                } else {
                    if (this.isRange) {
                        this.dateValue = value.length >= 2 ? [value[0], value[1]] : [];
                    } else {
                        this.dateValue = value.length >= 1 ? [value[0]] : [];
                    }
                }
            },
            setValue(value) {
                if(!Array.isArray(value)){
                    value = new Date(value);
                }
                this.initDateValue(value);
                this.handleDateValueChange();
            },
            handleFocus() {
                this.dropDownVisible(true);
            },
            //转换输入的inputvalue为标准日期格式
            handleEnter(value){
                if(!value) return this.updateInputValue();

                let result = [];
                if(this.isRange && value.includes(this.separator)) value = value.split(this.separator)
                else if(this.multiple) value = value.split(',')
                else value = [value];

                let valid = true;
                value.forEach(item=>{
                    let v = formatToDate(item, this.formatType);
                    if(valid) valid = !!v;
                    result.push(v);
                })

                if(JSON.stringify(result) === JSON.stringify(this.dateValue)) return;
                if(result.length && valid) {
                    this.initDateValue(result);
                    this.handleDateValueChange();
                }else {
                    this.updateInputValue()
                }
            },
            handleClickOutside(event) {
                if (this.visible) {
                    if (this.renderHtml !== false) {
                        const {$el} = this.$refs.dropDown;
                        if ($el === event.target || $el.contains(event.target)) {
                            return;
                        }
                    }

                    this.dropDownVisible(false);
                    this.handleEnter(this.dateInputValue);
                    this.$emit('click-outside',event);
                }
            },
            dropDownVisible(visible) {
                if (this.readonly || this.open || this.disabled) return;
                this.visible = visible;
                visible && this.$refs.datePane.isTime && this.$refs.datePane.changeTimeAndDate();
            },
            handleClear() {
                this.dateValue = [];
                this.handleDateValueChange();
                this.$emit('clear');
            },
            updateInputValue() {
                let dateValue = this.dateValue.map(item => dateFormat(item, this.formatType))
                if (this.multiple && this.type === 'date') {
                    this.dateInputValue = dateValue.join(',');
                } else {
                    if (this.isRange) {
                        if(dateValue.length === 2){
                            this.dateInputValue = `${dateValue[0]} ${this.separator} ${dateValue[1]}`;
                        }
                        if(dateValue.length === 0) this.dateInputValue = '';
                    } else {
                        this.dateInputValue = dateValue[0] || '';
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
            },
            handleDateValueChange(value){
                this.updateInputValue();
                value = value ? value : this.dateValue;
                let result = value.map(item => new Date(item));
                if(this.valueFormat) result = result.map(item => dateFormat(item, this.valueFormat));

                if (this.isRange) {
                    if(result.length === 2 || !result.length){
                        this.$emit('input', result);
                        this.$emit('change', result);
                    }
                } else if (this.multiple && this.type === 'date') {
                    this.$emit('input', result);
                    this.$emit('change', result);
                }else {
                    this.$emit('input',  result[0] || '');
                    this.$emit('change', result[0] || '');
                }
            }
        },
        watch: {
            value(newVal, oldVal){
                if(JSON.stringify(newVal) === JSON.stringify(oldVal)) return;
                this.initDateValue();
                // this.handleDateValueChange();
                this.updateInputValue();
            },
            open(newVal){
                this.visible = newVal;
            }
        }
    }
</script>
