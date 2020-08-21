<template>
    <label :class="[
        `${classPrefix}`,
        computedSize && `${classPrefix}--${computedSize}`,
        {
            'is-checked': isChecked,
            'is-indeterminate': !isChecked && indeterminate,
            'is-disabled': isDisabled,
        }
    ]">
        <span :class="[`${classPrefix}__input`]">
            <span :class="[`${classPrefix}__inner`]"></span>
            <input
                    hidden
                    :class="[`${classPrefix}__source`]"
                    type="checkbox"
                    :true-value="trueValue"
                    :false-value="falseValue"
                    :value="label"
                    v-model="model"
                    :name="name"
                    :disabled="isDisabled"
                    @change="handleChange">
        </span>

        <span v-if="showLabel" :class="[`${classPrefix}__label`]">
            <slot>{{label}}</slot>
        </span>
    </label>
</template>

<script>
    import Config from 'main/config/config'
    import {findComponent} from "main/utils/tool";

    export default {
        name: "Checkbox",
        props: {
            value: {
                type: [Number, String, Boolean],
                default: false
            },
            label: [Number, String, Boolean],
            indeterminate: Boolean,
            disabled: Boolean,
            name: String,
            trueValue: {
                type: [Number, String, Boolean],
                default: true
            },
            falseValue: {
                type: [Number, String, Boolean],
                default: false
            },
            size: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value)
                }
            },
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-checkbox',
                model: false,
                isChecked: false,
                showLabel: true,
                checkboxGroup: findComponent(this, 'CheckboxGroup'),
                form: findComponent(this, 'Form'),
            }
        },
        computed: {
            computedSize(){
                if(this.size !== 'default') return this.size;
                if(this.checkboxGroup && this.checkboxGroup.size !== 'default') return this.checkboxGroup.size;
                if(this.form && this.form.size !== 'default') return this.form.size;
                return this.size;
            },
            isDisabled() {
                return this.checkboxGroup ? (this.checkboxGroup.disabled ? this.checkboxGroup.disabled : this.disabled) : this.disabled
            },
        },
        mounted() {
            this.$nextTick(this.updateModel());
            this.showLabel = this.$slots.default !== undefined;
        },
        methods: {
            handleChange() {
                if (this.isDisabled) return;
                this.$nextTick(() => {
                    let value;
                    if (this.model === this.trueValue) {
                        value = this.trueValue;
                    } else if (this.model === this.falseValue) {
                        value = this.falseValue;
                    } else {
                        throw 'Value should be trueValue or falseValue';
                    }
                    this.updateIsChecked(value);
                    this.checkboxGroup ? this.checkboxGroup.dispatch('input', this.label, value) : this.$emit('input', value);
                    this.checkboxGroup ? this.checkboxGroup.dispatch('change', this.label, value) : this.$emit('change', value);
                });
            },
            updateIsChecked(value) {
                this.isChecked = value === this.trueValue ? true : false;
            },
            updateModel() {
                if (this.checkboxGroup && Array.isArray(this.checkboxGroup.value)) {
                    this.model = this.checkboxGroup.value.includes(this.label);
                    this.updateIsChecked(this.model);
                } else {
                    this.model = this.value;
                }
            },
        },
        watch: {
            value: function (newVal) {
                this.model = newVal;
                if (newVal === this.trueValue) {
                    this.model = this.trueValue;
                } else if (newVal === this.falseValue) {
                    this.model = this.falseValue;
                } else {
                    throw 'Value should be trueValue or falseValue';
                }
            },
            'checkboxGroup.value': function () {
                this.updateModel();
            },
            model: function (newVal) {
                this.updateIsChecked(newVal);
            }
        }
    }
</script>
