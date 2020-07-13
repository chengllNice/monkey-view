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
                          ref="timeInput"
                          :suffix="suffix"
                          :size="size"
                          :disabled="disabled"
                          :clearable="clearable"
                          :placeholder="placeholder"
                          :readonly="readonlyInput"
                          @click.native="handleFocus"
                          @blur="updateInputValue"
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
                    <date-pane picker-type='time'
                               :size="size"
                               :format="localeFormat"
                               v-model="dateValue"
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
    import {dateFormat} from "main/utils/date";

    export default {
        name: "TimePicker",
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
                default: 'default',
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value);
                }
            },
            clearable: Boolean,
            suffix: {
                type: String,
                default: 'icon-time'
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
                default: 'hh:mm:ss',
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
        },
        data() {
            const localeFormat = 'YYYY/MM/DD ' + this.format;
            return {
                classPrefix: Config.classPrefix + '-time-picker',
                dateValue: [],
                dateInputValue: '',
                visible: false,
                localeFormat: localeFormat,
                nowDate: new Date()
            }
        },
        computed: {
            isRange() {
                return this.type.includes('range');
            },
            readonlyInput() {
                return this.readonly || !this.editable;
            },
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
                let _value;
                if(this.value && typeof this.value === 'string'){
                    _value = dateFormat(this.nowDate) + ' ' + this.value;
                }else if(Array.isArray(this.value)){
                    _value = [];
                    this.value[0] && _value.push(dateFormat(this.nowDate) + ' ' + this.value[0]);
                    this.value[1] && _value.push(dateFormat(this.nowDate) + ' ' + this.value[1]);
                }
                let value = val || _value;
                if (this.isRange) {
                    value = value && Array.isArray(value) && value.length ? value : [];
                    if (value[0] && value[1]) {
                        this.dateValue = [dateFormat(value[0], this.localeFormat), dateFormat(value[1], this.localeFormat)];
                    }
                } else if (!value || typeof value === 'string' || value instanceof Date) {
                    this.dateValue = value ? [dateFormat(value, this.localeFormat)] : [];
                }
            },
            setValue(value) {
                !Array.isArray(value) && (value = value.toString());
                this.initDateValue(value);
            },
            handleFocus() {
                this.dropDownVisible(!this.visible);
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
                if (this.isRange) {
                    let date1 = dateFormat(this.dateValue[0], this.format);
                    let date2 = dateFormat(this.dateValue[1], this.format);
                    if (date1 && !date2) {
                        this.dateInputValue = `${date1}`;
                    } else if (date1 && date1) {
                        this.dateInputValue = `${date1} ${this.separator} ${date2}`;
                    } else {
                        this.dateInputValue = '';
                    }
                } else {
                    this.dateInputValue = dateFormat(this.dateValue[0], this.format) || '';
                }
            },
            focus(){
                this.$refs.timeInput && this.$refs.timeInput.focus();
            },
            blur(){
                this.$refs.timeInput && this.$refs.timeInput.blur();
            }
        },
        watch: {
            dateValue: {
                handler(newVal) {
                    this.updateInputValue();
                    let emitValue = [];
                    newVal.forEach(item=>{
                        emitValue.push(dateFormat(item, this.format))
                    });
                    if (this.isRange) {
                        this.$emit('input', emitValue);
                        this.$emit('change', emitValue);
                    } else {
                        this.$emit('input', emitValue[0]);
                        this.$emit('change', emitValue[0]);
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
