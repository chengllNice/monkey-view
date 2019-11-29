<template>
    <div :class="[
            'cl-time-picker',
            size && `cl-time-picker--${size}`,
            className,
         ]"
         v-click-outside.capture="handleClickOutside">
        <div class="cl-time-picker__reference" ref="reference">
            <slot>
                <cl-input v-model="dateInputValue"
                          ref="timeInput"
                          :suffix="suffix"
                          :size="size"
                          :disabled="disabled"
                          :clearable="clearable"
                          :placeholder="placeholder"
                          :readonly="readonlyInput"
                          @click.native="handleFocus"
                          @blur="updateInputValue"
                          @clear="clearHandle"></cl-input>
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
                <div class="cl-time-picker__drop-down-inner">
                    <cl-date-pane picker-type='time'
                                  :size="size"
                                  :format="format"
                                  v-model="dateValue"
                                  :is-range="isRange"
                                  :type="type"/>
                </div>
            </DropDown>
        </transition>
    </div>
</template>

<script>
    import {directive as clickOutside} from 'v-click-outside-x';
    import DropDown from '../../../select/src/drop-down.vue'
    import ClDatePane from '../pane/date-pane.vue'
    import {dateFormat} from "../../../../utils/date";

    export default {
        name: "ClTimePicker",
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
                default: 'cl-icon-time'
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
        },
        components: {
            DropDown,
            ClDatePane
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
                        value = value && value.length ? value : [];
                        if (value[0] && value[1]) {
                            this.dateValue = [dateFormat(value[0], this.format), dateFormat(value[1], this.format)];
                        }
                    } else if (typeof value === 'string') {
                        if (this.type === 'week') {
                            this.dateValue = value ? [value] : [];
                        } else {
                            this.dateValue = value ? [dateFormat(value, this.format)] : [];
                        }
                    }
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
                this.$emit('clickoutside',event);
                this.dropDownVisible(false);
            },
            dropDownVisible(visible) {
                if (this.readonly || this.open || this.disabled) return;
                this.visible = visible;
            },
            clearHandle() {
                this.dateValue = [];
                this.$emit('clear');
            },
            updateInputValue() {
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
                    if (this.isRange) {
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