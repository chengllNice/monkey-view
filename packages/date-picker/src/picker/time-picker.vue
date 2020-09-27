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
                           ref="timeInput"
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
                        <date-pane picker-type='time'
                                   v-model="dateValue"
                                   :is-range="isRange"
                                   :type="type"
                                   @change="handleDateValueChange"/>
                    </div>
                </Drop>
            </transition>
        </template>
        <template v-else>
            <div :class="[`${classPrefix}__drop-down-inner`]">
                <date-pane picker-type='time'
                           v-model="dateValue"
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
        name: "TimePicker",
        directives: {clickOutside},
        provide() {
            return {
                picker: this
            }
        },
        props: {
            value: [String, Date, Array, Number],
            type: {
                type: String,
                default: 'time',
                validator(value) {
                    return ['time', 'timerange'].includes(value)
                }
            },
            disabled: Boolean,
            disabledHours: {
                type: Array,
                default(){
                    return []
                }
            },//不可选的时
            disabledMinutes: {
                type: Array,
                default(){
                    return []
                }
            },//不可选的分
            disabledSeconds: {
                type: Array,
                default(){
                    return []
                }
            },//不可选的秒
            hideDisabledOptions: Boolean,//是否隐藏disabled的时分秒
            confirm: Boolean,
            readonly: Boolean,
            placeholder: String,
            size: {
                type: String,
                default () {
                    return !this.$MONKEY || this.$MONKEY.size === '' ? 'default' : this.$MONKEY.size;
                },
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
                default: 'time'
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
                default: 'HH:mm:ss',
            },
            valueFormat: {
                type: String,
                default: 'HH:mm:ss',
            },
            renderHtml: {
                type: [HTMLElement, Boolean],
                default: function () {
                    return false
                }
            },
            open: Boolean,//手动控制时间框的打开关闭
            separator: {
                type: String,
                default: '~'
            },//两个时间之间的分隔符
            className: String,//选择器的类名
            dropdownClassName: String,//时间下拉框的类名
            onlyShowPane: Boolean,//是否只显示pane日期框
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-time-picker',
                dateValue: [],
                dateInputValue: '',
                visible: false,
                nowDate: new Date(),
                form: findComponent(this, 'Form')
            }
        },
        computed: {
            isRange() {
                return this.type.includes('range');
            },
            computedSize(){
                if(this.size !== 'default') return this.size;
                if(this.form && this.form.size !== 'default') return this.form.size;
                return this.size;
            },
            readonlyInput() {
                return this.readonly || !this.editable;
            },
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
                if(value && Array.isArray(value)){
                    value = value.map(item => this.formatTimeToDate(item));
                }else if(value){
                    value = [this.formatTimeToDate(value)]
                }else {
                    value = [];
                }

                if (this.isRange) {
                    this.dateValue = value.length >= 2 ? [value[0], value[1]] : [];
                } else {
                    this.dateValue = value.length >= 1 ? [value[0]] : [];
                }
            },
            formatTimeToDate(time){
                let result = new Date();
                if(time instanceof Date) result = time
                else if(typeof time === 'string') {
                    let t = new Date(time);
                    if(!isNaN(t.getTime())) {
                        result = t
                    } else {
                        t = formatToDate(time, this.valueFormat);
                        if(t) result = t;
                    }
                }
                return result;
            },
            setValue(value) {
                if(!Array.isArray(value)){
                    value = new Date(value);
                }
                this.initDateValue(value);
                this.handleDateValueChange();
            },
            handleFocus() {
                this.dropDownVisible(!this.visible);
            },
            //转换输入的inputvalue为标准日期格式
            handleEnter(value){
                if(!value) return this.updateInputValue();

                let result = [];
                if(this.isRange && value.includes(this.separator)) value = value.split(this.separator)
                else value = [value];

                let valid = true;
                value.forEach(item=>{
                    let v = formatToDate(item, this.format);
                    if(valid) valid = !!v;
                    result.push(v);
                })

                if(result.length && valid && JSON.stringify(result) !== JSON.stringify(this.dateValue)) {
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
                    this.$emit('click-outside',event);
                    this.handleEnter(this.dateInputValue);
                    this.dropDownVisible(false);
                }
            },
            dropDownVisible(visible) {
                if (this.readonly || this.open || this.disabled) return;
                this.visible = visible;
            },
            handleClear() {
                this.dateValue = [];
                this.handleDateValueChange();
                this.$emit('clear');
            },
            updateInputValue() {
                let dateValue = this.dateValue.map(item => dateFormat(item, this.format))
                if (this.isRange) {
                    if(dateValue.length === 2){
                        this.dateInputValue = `${dateValue[0]} ${this.separator} ${dateValue[1]}`;
                    }
                    if(dateValue.length === 0) this.dateInputValue = '';
                } else {
                    this.dateInputValue = dateValue[0] || '';
                }
            },
            focus(){
                this.$refs.timeInput && this.$refs.timeInput.focus();
            },
            blur(){
                this.$refs.timeInput && this.$refs.timeInput.blur();
            },
            handleDateValueChange(value){
                this.updateInputValue();
                value = value ? value : this.dateValue;
                let result = value.map(item => new Date(item));
                if(this.valueFormat) result = result.map(item => dateFormat(item, this.valueFormat));

                if (this.isRange) {
                    this.$emit('input', result);
                    this.$emit('change', result);
                } else {
                    this.$emit('input',  result[0] || '');
                    this.$emit('change', result[0] || '');
                }
            }
        },
        watch: {
            value(newVal, oldVal){
                if(JSON.stringify(newVal) === JSON.stringify(oldVal)) return;
                this.initDateValue();
                this.updateInputValue();
            },
            open(newVal){
                this.visible = newVal;
            },
        }
    }
</script>
