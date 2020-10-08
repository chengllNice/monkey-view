<template>
    <label :class="[
        `${classPrefix}`,
        computedSize && `${classPrefix}--${computedSize}`,
        {
            'is-disabled': isDisabled,
            'is-checked': model === label,
        }
    ]">
        <span :class="[`${classPrefix}__input`]">
            <span :class="[`${classPrefix}__inner`]"></span>
            <input
                    :class="[`${classPrefix}__source`]"
                    type="radio"
                    :value="label"
                    v-model="model"
                    :name="name"
                    hidden
                    :disabled="isDisabled"
                    @change="handleChange">
        </span>

        <span :class="[`${classPrefix}__label`]">
            <slot>{{label}}</slot>
        </span>
    </label>
</template>

<script>
    import Config from 'main/config/config'
    import { findComponent } from 'main/utils/tool';

    export default {
        name: 'Radio',
        props: {
            name: String,
            value: {
                type: [String, Number, Boolean],
                default: false
            },
            label: {
                type: [String, Number, Boolean],
                default: true
            },
            disabled: Boolean,
            size: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value)
                }
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-radio',
                radioGroup: findComponent(this, 'RadioGroup'),
                form: findComponent(this, 'Form')
            }
        },
        computed: {
            model: {
                get() {
                    return this.radioGroup ? this.radioGroup.value : this.value;
                },
                set(value) {
                    this.radioGroup ? this.radioGroup.dispatch('input', value) : this.$emit('input', value);
                }
            },
            isDisabled() {
                return this.radioGroup ? this.radioGroup.disabled || this.disabled : this.disabled
            },
            computedSize() {
                if (this.size !== 'default') return this.size;
                if (this.radioGroup && this.radioGroup.size !== 'default') return this.radioGroup.size;
                if (this.form && this.form.size !== 'default') return this.form.size;
                return this.size;
            }
        },
        methods: {
            handleChange() {
                if (this.isDisabled) return;
                this.$nextTick(() => {
                    this.radioGroup ? this.radioGroup.dispatch('change', this.model) : this.$emit('change', this.model);
                });
            }
        }
    }
</script>
