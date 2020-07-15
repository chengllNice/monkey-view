<template>
    <div :class="[
            type !== 'textarea' && `${classPrefix}`,
            type === 'number' && `${classPrefix}--number`,
            type === 'textarea' && `${classPrefixTextArea}`,
            inputSize && type !== 'textarea' && `${classPrefix}--${inputSize}`,
            inputSize && type === 'textarea' && `${classPrefixTextArea}--${inputSize}`,
            isDisabled && 'is-disabled'
        ]"
         @mouseenter="hovering = true"
         @mouseleave="hovering = false">
        <template v-if="type !== 'textarea'">
            <div v-if="$slots.prepend" :class="[`${classPrefix}__prepend`]">
                <slot name="prepend"></slot>
            </div>
            <div v-if="showPrefix" :class="[`${classPrefix}__prefix`]">
                <div :class="[`${classPrefix}__prefix-slot`]" v-if="$slots.prefix"><slot name="prefix"></slot></div>
                <Icon v-else-if="type === 'number'"
                      type="minus"
                      :class="[`${classPrefix}__prefix-icon`, `${classPrefix}__prefix-step`, numberStepDisabled.min && `${classPrefix}__step-disabled`]"
                      @click="handlerNumberMinus"></Icon>
                <Icon v-else :type="prefix" :class="`${classPrefix}__prefix-icon ${prefix}`"></Icon>
            </div>
            <input :type="type === 'password' && !showPasswordVisible ? 'password' : 'text'"
                   :class="[
                        `${classPrefix}__source`,
                        ((type === 'search' && suffixButton) || $slots.append) && `${classPrefix}__source-append`,
                        $slots.prepend && `${classPrefix}__source-prepend`,
                        (showSuffix || clearable) && `${classPrefix}__source-suffix`,
                        showPrefix && `${classPrefix}__source-prefix`,
                   ]"
                   ref="input"
                   :style="inputStyle"
                   :name="name"
                   :disabled="isDisabled"
                   :readonly="readonly"
                   :placeholder="placeholder"
                   @compositionstart="handleCompositionStart"
                   @compositionend="handleCompositionEnd"
                   @keydown.enter="handlerEnter"
                   @blur="handlerBlur"
                   @focus="handlerFocus"
                   @input="handlerInput"
                   @change="handlerChange"/>
            <div v-if="showSuffix" :class="[`${classPrefix}__suffix`]">
                <i v-if="suffixIconClass.length" :class="suffixIconClass" @click.stop="handleSuffixClick"></i>
                <div :class="[`${classPrefix}__suffix-slot`]" v-else-if="$slots.suffix">
                    <slot name="suffix"></slot>
                </div>
                <template v-else-if="type === 'number' && stepType && step">
                    <Icon type="up"
                          :class="[`${classPrefix}__suffix-step-up`, `${classPrefix}__suffix-step`, numberStepDisabled.max && `${classPrefix}__step-disabled`]"
                          @click="handlerNumberPlus"></Icon>
                    <Icon type="down"
                          :class="[`${classPrefix}__suffix-step-down`, `${classPrefix}__suffix-step`, numberStepDisabled.min && `${classPrefix}__step-disabled`]"
                          @click="handlerNumberMinus"></Icon>
                </template>
            </div>
            <div v-else-if="showLimitLabel && maxLength.toString()" :class="[`${classPrefix}__suffix-limit`]">
                {{modelValue !== undefined ? modelValue.length : 0}}/{{maxLength || 0}}
            </div>
            <div v-else-if="$slots.append || (type === 'search' && suffixButton)"
                 :class="[`${classPrefix}__append`, (type === 'search' && suffixButton) && `${classPrefix}__append-button-wrap`]">
                <slot name="append">
                    <Button :class="[`${classPrefix}__append-button`]"
                            type="primary"
                            :size="inputSize"
                            :disabled="isDisabled"
                            @click="handlerSearch">
                        <Icon type="search" v-if="suffixButton === true"></Icon>
                        <template v-else>{{suffixButton}}</template>
                    </Button>
                </slot>
            </div>
        </template>
        <template v-if="type === 'textarea'">
            <textarea :class="[`${classPrefixTextArea}__source`]"
                      ref="textarea"
                      :name="name"
                      :style="expandStyle"
                      :disabled="isDisabled"
                      :readonly="readonly"
                      :placeholder="placeholder"
                      @compositionstart="handleCompositionStart"
                      @compositionend="handleCompositionEnd"
                      @blur="handlerBlur"
                      @focus="handlerFocus"
                      @input="handlerInput"
                      @change="handlerChange"
                      :cols="cols"
                      :rows="rows"></textarea>
            <div v-if="showLimitLabel && maxLength.toString()" :class="[`${classPrefixTextArea}__suffix-limit`]">
                {{modelValue !== undefined ? modelValue.length : 0}}/{{maxLength || 0}}
            </div>
        </template>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Icon from 'packages/icon'
    import Button from 'packages/button'
    import calcTextareaHeight from './calcTextareaHeight';
    import {findComponent} from "main/utils/tool";

    export default {
        name: "Input",
        props: {
            type: {
                type: String,
                default: 'input',
                validator(value) {
                    return ['input', 'number', 'search', 'password', 'textarea'].includes(value)
                }
            },
            name: String,
            value: [String, Number],
            disabled: Boolean,
            readonly: Boolean,
            placeholder: String,
            size: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value)
                }
            },
            min: Number,
            max: Number,
            precision: Number,
            minLength: Number,//暂时没用
            maxLength: Number,
            autosize: [Boolean, Object],
            rows: Number,
            cols: Number,
            resize: Boolean,//暂时没用
            showLimitLabel: Boolean,//显示限制字数，input和textarea时有效
            showPasswordIcon: {
                type: [Boolean, Object],
                default: true
            },//显示password的icon, 对象时{close: 关闭时的icon, open: 打开时的icon}
            suffix: String,//后定位的图标，textarea时无效
            prefix: String,//前定位的图标，textarea时无效
            suffixButton: [Boolean, String],//true是显示搜索button  string时为button内容  false不显示，textarea时无效
            clearable: Boolean,//清除，textarea时无效
            step: {
                type: [Boolean, Number],
                default: 1
            },//Number类型时有效，false不显示，true显示，number计数器步长
            stepType: String,//right
            isSlice: Boolean,//是否根据限制截取value//暂时没用
            inputStyle: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-input',
                classPrefixTextArea: Config.classPrefix + '-textarea',
                modelValue: undefined,
                expandStyle: {},//额外的样式
                hovering: false,
                showPasswordVisible: false,
                composition: false,//中文输入
                formItem: findComponent(this, 'FormItem')
            }
        },
        computed: {
            inputSize() {
                return this.size
            },
            isDisabled() {
                return this.disabled
            },
            showClearable() {
                return this.clearable && !!this.modelValue && !this.isDisabled && this.hovering && this.type !== 'textarea' && !this.readonly
            },
            showSuffix() {
                return (this.type === 'search' && !this.suffixButton) ||
                    (this.type === 'number' && this.step) ||
                    (this.type === 'password' && this.showPasswordIcon) ||
                    this.showClearable ||
                    ((this.suffix || this.$slots.suffix) && ['input', 'password', 'search', 'number'].includes(this.type));
            },
            //number类型 step禁用
            numberStepDisabled(){
                let result = {min: false, max: false};
                if(this.type === 'number'){
                    if(typeof this.min === 'number' && this.min >= parseFloat(this.modelValue)) result.min = true;
                    if(typeof this.max === 'number' && this.max <= parseFloat(this.modelValue)) result.max = true;
                }
                return result;
            },
            suffixIconClass() {
                let prefix = Config.classPrefix;
                let result = [];
                if (this.showClearable) result.push(`${prefix}-icon-error-fill`)
                else if (this.suffix) result.push(`${prefix}-icon-${this.suffix}`)
                else if (this.type === 'number' && !this.stepType && this.step) {
                    result.push(`${prefix}-icon-plus`, `${this.classPrefix}__suffix-step`);
                    if(this.numberStepDisabled.max) result.push(`${this.classPrefix}__step-disabled`)
                }
                else if (this.type === 'search') result.push(`${prefix}-icon-search`)
                else if (this.type === 'password' && this.showPasswordIcon) {
                    if (this.showPasswordIcon === true) this.showPasswordVisible ? result.push(`${prefix}-icon-eye-close`) : result.push(`${prefix}-icon-eye-open`)
                    else if (typeof this.showPasswordIcon === 'object') this.showPasswordVisible ? result.push(this.showPasswordIcon.close) : result.push(this.showPasswordIcon.open)
                }
                if (result.length) result.unshift(`${this.classPrefix}__suffix-icon`, `${prefix}-icon`);
                return result;
            },
            showPrefix() {
                if (this.type === 'textarea') return false;
                return (this.prefix || this.$slots.prefix) || (this.type === 'number' && this.step && !this.stepType)
            },
        },
        components: {
            Button,
            Icon
        },
        created() {
        },
        mounted() {
            this.$nextTick(() => {
                this.checkedModelValue(this.value);
                this.setInputValue();
                this.resizeTextarea();
            });
        },
        watch: {
            value: function (newVal) {
                this.checkedModelValue(newVal);
                this.setInputValue(newVal);
            }
        },
        methods: {
            getInputEl() {
                return this.$refs.input || this.$refs.textarea;
            },
            checkedModelValue(newValue) {
                let val = newValue !== undefined ? (newValue + '') : '';
                let result = val;
                if (this.type === 'number') {
                    let mark = null;
                    if (result.substring(0, 1) === '-') {
                        mark = '-';
                    }
                    result = val.replace(/\.{2,}/g, '.').replace(/(^[^\d])|[^\d|^.]/g, '');
                    mark && (result = mark + result);
                    let index = result.indexOf('.');
                    if (index > -1) {
                        let arr = result.split('.');
                        if (arr.length > 2) {
                            let lastIndex = result.lastIndexOf('.');
                            result = result.substring(0, lastIndex);
                        }
                        let a = result.substring(index + 1);
                        a = a.replace(/\./g, '');
                        if (a.length > this.precision) {
                            result = result.substring(0, index + 1 + this.precision);
                        }
                    }
                    // else if (result) {
                    //     result = result === mark ? result : parseFloat(result);
                    // }

                    if (result > this.max) {
                        result = this.max.toString();
                    }
                    if (result < this.min) {
                        result = this.min.toString();
                    }

                } else if (['input', 'textarea'].includes(this.type)) {
                    result = result.length > this.maxLength ? result.substring(0, this.maxLength) : result;
                }
                this.modelValue = result !== undefined ? result : undefined;
            },
            setInputValue() {
                this.getInputEl() && this.modelValue !== undefined ? this.getInputEl().value = this.modelValue : this.getInputEl().value = '';
                this.$nextTick(this.resizeTextarea());
            },
            handlerInput(e) {
                if (this.composition) return;
                if (e && e.target && e.target.value === this.modelValue) return;
                this.checkedModelValue((e && e.target ? e.target.value : this.modelValue));
                this.$emit('input', this.modelValue);
                this.$emit('change', this.modelValue);
                this.formItem && this.formItem.triggerValidate('change');
                this.$nextTick(() => {
                    this.setInputValue();
                })
            },
            handlerChange(e) {
                if (e.target.value === this.modelValue) return;
                this.$emit('change', this.modelValue);
            },
            handleCompositionStart() {
                this.composition = true;
            },
            handleCompositionEnd(e) {
                if (this.composition) {
                    this.composition = false;
                    this.handlerInput(e);
                }
            },
            handlerBlur() {
                if (this.type === 'number') {
                    this.modelValue = !isNaN(parseFloat(this.modelValue)) ? parseFloat(this.modelValue).toString() : '';
                    this.setInputValue();
                }
                this.$emit('blur', this.modelValue);
                this.formItem && this.formItem.triggerValidate('blur');
            },
            handlerFocus() {
                this.$emit('focus', this.modelValue)
            },
            handlerEnter() {
                this.$emit('enter', this.modelValue);
                this.handlerSearch();
            },
            handlerSearch() {
                this.$emit('search', this.modelValue)
            },
            handlerClear() {
                if (this.isDisabled) return;
                this.modelValue = '';
                this.handlerInput();
                this.$emit('clear');
            },
            handlerNumberMinus() {
                if (this.isDisabled) return;
                if (this.modelValue <= this.min) return;
                this.modelValue = (parseFloat(this.modelValue || 0) - parseFloat(this.step)).toString();
                this.handlerInput();
            },
            handlerNumberPlus() {
                if (this.isDisabled) return;
                if (this.modelValue >= this.max) return;
                this.modelValue = (parseFloat(this.modelValue || 0) + parseFloat(this.step)).toString();
                this.handlerInput();
            },
            passwordVisibleChange() {
                if (this.disabled) return;
                this.showPasswordVisible = !this.showPasswordVisible;
            },
            resizeTextarea() {
                if (this.type !== 'textarea' || !this.autosize) return;
                let {minRows, maxRows} = this.autosize;
                this.expandStyle = calcTextareaHeight(this.getInputEl(), minRows, maxRows);
            },
            handleSuffixClick() {
                if (this.showClearable) this.handlerClear();
                else if (this.type === 'number' && !this.stepType && this.step) this.handlerNumberPlus()
                else if (this.type === 'search') this.handlerSearch()
                else if (this.type === 'password' && this.showPasswordIcon) this.passwordVisibleChange()
            },
            focus() {
                setTimeout(() => {
                    this.$refs.textarea && this.$refs.textarea.focus();
                    this.$refs.input && this.$refs.input.focus();
                });
            },
            blur() {
                setTimeout(() => {
                    this.$refs.textarea && this.$refs.textarea.blur();
                    this.$refs.input && this.$refs.input.blur();
                });
            }
        }
    }
</script>
