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
            <Drop v-show="visible && !disabled"
                      ref="dropDown"
                      :class="dropdownClassName"
                      :reference="this.$refs.reference"
                      :placement="placement"
                      :isMinWidth="false"
                      :dropdownMatchSelectWidth="false"
                      :render-html="renderHtml"
                      v-model="visible">
                <div :class="[`${classPrefix}__drop-down-inner`]">
                    <date-pane ref="datePane"
                               picker-type='date'
                               :size="size"
                               :multiple="multiple"
                               :format="formatType"
                               v-model="dateValue"
                               :shortcuts="shortcuts"
                               :is-range="isRange"
                               :type="type"/>
                </div>
            </Drop>
        </transition>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Input from 'packages/input'
    import {directive as clickOutside} from 'v-click-outside-x';
    import Drop from 'packages/base/drop'
    import DatePane from '../pane/date-pane.vue'
    import {dateFormat, formatToDate} from "main/utils/date";

    export default {
        name: "DatePicker",
        directives: {clickOutside},
        provide() {
            return {
                picker: this
            }
        },
        props: {
            value: [String, Array, Date],
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
                default: 'date'
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

                if(value && Array.isArray(value)){
                    value = value.map(item => new Date(item));
                }else if(value){
                    value = [new Date(value)]
                }else {
                    value = [];
                }
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
            },
            handleFocus() {
                this.dropDownVisible(true);
            },
            handleBlur(value){
                this.handleEnter(value);
            },
            //转换输入的inputvalue为标准日期格式 todo
            handleEnter(value){
                if(!value) return;
                console.log('=ddddd',value)
                value = formatToDate(value, this.formatType)
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
                visible && this.$refs.datePane.isTime && this.$refs.datePane.changeTimeAndDate();
            },
            handleClear() {
                this.dateValue = [];
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
            }
        },
        watch: {
            dateValue: {
                handler(newVal) {
                    this.updateInputValue();
                    let result = newVal.map(item => new Date(typeof item === 'number' ? item.toString() : item));
                    if(this.valueFormat) result = result.map(item => dateFormat(item, this.valueFormat));

                    if (this.isRange || (this.multiple && this.type === 'date')) {
                        this.$emit('input', result);
                        this.$emit('change', result);
                    } else {
                        let res = typeof result[0] === "number" ? result[0].toString() : result[0];
                        this.$emit('input',  res);
                        this.$emit('change', res);
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
