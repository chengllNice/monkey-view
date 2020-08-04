<template>
    <label :class="[
        `${classPrefix}`,
        size && `${classPrefix}--${size}`,
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
            }
        },
        computed: {
            parentGroup() {
                let parent = this.$parent;
                while (parent) {
                    if (parent.componentName !== 'CheckboxGroup') {
                        parent = parent.$parent;
                    } else {
                        return parent
                    }
                }
                return false
            },
            isDisabled() {
                return this.parentGroup ? (this.parentGroup.disabled ? this.parentGroup.disabled : this.disabled) : this.disabled
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
                    this.parentGroup ? this.parentGroup.dispatch('input', this.label, value) : this.$emit('input', value);
                    this.parentGroup ? this.parentGroup.dispatch('change', this.label, value) : this.$emit('change', value);
                });
            },
            updateIsChecked(value) {
                this.isChecked = value === this.trueValue ? true : false;
            },
            updateModel() {
                if (this.parentGroup && Array.isArray(this.parentGroup.value)) {
                    this.model = this.parentGroup.value.includes(this.label);
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
            'parentGroup.value': function () {
                this.updateModel();
            },
            model: function (newVal) {
                this.updateIsChecked(newVal);
            }
        }
    }
</script>
