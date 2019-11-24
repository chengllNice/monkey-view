<template>
    <div class="cl-input" :class="[
        {
            'cl-input-number': type === 'number',
            'cl-input-search': type === 'search',
            'cl-input-password': type === 'password',
            'cl-textarea': type === 'textarea',
        },
        inputSize && type !== 'textarea' && `cl-input--${inputSize}`,
        inputSize && type === 'textarea' && `cl-textarea--${inputSize}`,
        isDisabled && 'is-disabled'
    ]" @mouseenter="hovering = true" @mouseleave="hovering = false">
        <span class="cl-input__prepend"
              v-if="$slots.prepend && type !== 'textarea'">
            <slot name="prepend"></slot>
        </span>
        <span class="cl-input__prefix"
              v-else-if="showPrefix">
            <span class="cl-input__prefix-inner" v-if="$slots.prefix"><slot name="prefix"></slot></span>
             <span class="cl-input__prefix-inner cl-input__prefix-step"
                   v-else-if="type === 'number'"
                   @click="handlerNumberMinus">
                <i class="cl-icon-minus"></i>
            </span>
            <i v-else :class="`cl-input__prefix-inner ${prefix}`"></i>
        </span>

        <input v-if="['input', 'number', 'search', 'password'].includes(type)"
               :type="type === 'password' && !showPasswordVisible ? 'password' : 'text'"
               :class="[
                    `cl-input__source`,
                    (suffixButton || $slots.append) && `cl-input__source-append`,
                    $slots.prepend && `cl-input__source-prepend`,
                    showSuffix && `cl-input__source-suffix`,
                    showPrefix && `cl-input__source-prefix`,
               ]"
               ref="input"
               :style="inputStyle"
               :name="name"
               :disabled="isDisabled"
               :readonly="readonly"
               :placeholder="placeholder"
               @keydown.enter="handlerEnter"
               @blur="handlerBlur"
               @focus="handlerFocus"
               @input="handlerInput"
               @change="handlerChange">
        <textarea v-else-if="type === 'textarea'"
                  class="cl-textarea__source"
                  ref="textarea"
                  :name="name"
                  :style="expandStyle"
                  :disabled="isDisabled"
                  :readonly="readonly"
                  :placeholder="placeholder"
                  @blur="handlerBlur"
                  @focus="handlerFocus"
                  @input="handlerInput"
                  @change="handlerChange"
                  :cols="cols"
                  :rows="rows"></textarea>

        <span v-if="showSuffix" :class="[
            type !== 'textarea' && `cl-input__suffix`,
            type === 'textarea' && `cl-textarea__suffix`,
        ]">
            <span class="cl-input__suffix-inner"
                  v-if="$slots.suffix">
                <slot name="suffix"></slot>
            </span>
            <span class="cl-input__suffix-inner cl-input__suffix-step"
                  :class="[step && stepType && 'cl-input__suffix-step-right']"
                  v-else-if="type === 'number' && !stepType" @click="handlerNumberPlus">
                <i class="cl-icon-plus" v-if="step && !stepType"></i>
            </span>
            <span class="cl-input__suffix-inner cl-input__suffix-step cl-input__suffix-step-right"
                  v-else-if="type === 'number' && stepType">
                <span class="cl-input__suffix-step-right-up" @click="handlerNumberPlus">
                    <i class="cl-icon-up" v-if="step && stepType"></i></span>
                <span class="cl-input__suffix-step-right-down" @click="handlerNumberMinus">
                    <i class="cl-icon-down" v-if="step && stepType"></i></span>
            </span>
            <i v-else-if="suffix"
               :class="`cl-input__suffix-inner ${suffix}`"></i>
            <i v-else-if="type === 'password' && showPasswordIcon && !readonly"
               :class="[
                    `cl-input__suffix-inner`,
                    showPasswordVisible && showPasswordIcon === true ? 'cl-icon-eye-close' : 'cl-icon-eye-open',
                    showPasswordVisible && typeof showPasswordIcon === 'object' ? `${showPasswordIcon.close}` : `${showPasswordIcon.open}`,
               ]"
               @click="passwordVisibleChange"></i>
            <i v-else-if="type === 'search'"
               class="cl-input__suffix-inner cl-input__search cl-icon-search"
               @click="handlerSearch"></i>
             <i v-else-if="showClearable"
                class="cl-input__suffix-inner cl-input__clearable cl-icon-circle-close-solid"
                @click="handlerClear"></i>
            <span v-else-if="['input', 'textarea'].includes(type) && showLimitLabel && maxLength.toString()"
                  :class="`cl-${type}__limit`">
                {{modelValue !== undefined ? modelValue.length : 0}}/{{maxLength || 0}}
            </span>
        </span>

        <span class="cl-input__append"
              :class="[
                  !$slots.append ? 'cl-input__append-button-wrap' : 'cl-input__append-color'
              ]"
              v-else-if="appendShow">
            <slot name="append">
                <ClButton class="cl-input__append-button"
                          v-if="type === 'search' && suffixButton"
                          type="primary"
                          :size="inputSize"
                          :disabled="isDisabled"
                          @click="handlerSearch">
                    <i class="cl-icon-search" v-if="suffixButton === true"></i>
                    <template v-else>{{suffixButton}}</template>
                </ClButton>
            </slot>
        </span>
    </div>
</template>

<script>
    import calcTextareaHeight from './calcTextareaHeight';
    import ClButton from '../../button/src/button'

    export default {
        name: "ClInput",
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
                modelValue: undefined,
                expandStyle: {},//额外的样式
                hovering: false,
                showPasswordVisible: false,
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
                return this.clearable && this.modelValue && !this.isDisabled && this.hovering && this.type !== 'textarea' && !this.readonly
            },
            showSuffix() {
                return (['input', 'textarea'].includes(this.type) && this.maxLength && this.showLimitLabel) ||
                    (this.type === 'search' && !this.suffixButton) ||
                    (this.type === 'number' && this.step) ||
                    (this.type === 'password' && this.showPasswordIcon) ||
                    this.showClearable ||
                    ((this.suffix || this.$slots.suffix || this.clearable) && ['input', 'password', 'search', 'number'].includes(this.type));
            },
            showPrefix() {
                return ((this.prefix || this.$slots.prefix) && this.type !== 'textarea') ||
                    (this.type === 'number' && this.step && !this.stepType)
            },
            appendShow() {
                return this.type !== 'textarea' && (this.$slots.append || this.suffixButton)
            }
        },
        components: {
            ClButton
        },
        created() {
        },
        mounted() {
            this.$nextTick(() => {
                this.checkedModelValue(this.value);
                this.setInputValue();
                this.resizeTextarea();
            })
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
                if (e && e.target && e.target.value === this.modelValue) return;
                this.checkedModelValue((e && e.target ? e.target.value : this.modelValue));
                this.$emit('input', this.modelValue);
                this.$emit('change', this.modelValue);
                this.$nextTick(() => {
                    this.setInputValue();
                })
            },
            handlerChange(e) {
                if (e.target.value === this.modelValue) return;
                this.$emit('change', this.modelValue);
            },
            handlerBlur() {
                if (this.type === 'number') {
                    this.modelValue = !isNaN(parseFloat(this.modelValue)) ? parseFloat(this.modelValue).toString() : '';
                    this.setInputValue();
                }
                this.$emit('blur', this.modelValue)
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
            focus() {
                setTimeout(() => {
                    this.$refs.textarea && this.$refs.textarea.focus();
                    this.$refs.input && this.$refs.input.focus();
                });
            }
        }
    }
</script>
