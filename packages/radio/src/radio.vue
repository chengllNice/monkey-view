<template>
    <label class="cl-radio" :class="[
        radioSize && `cl-radio--${radioSize}`,
        {
            'is-disabled': isDisabled,
            'is-checked': model === label,
        }
    ]">
        <span class="cl-radio__input">
            <span class="cl-radio__inner"></span>
            <input
                    class="cl-radio__source"
                    type="radio"
                    :value="label"
                    v-model="model"
                    :name="name"
                    hidden
                    :disabled="isDisabled"
                    @change="handleChange">
        </span>

        <span class="cl-radio__label">
            <slot>{{label}}</slot>
        </span>
    </label>
</template>

<script>
    export default {
        name: "Radio",
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
            },
        },
        data() {
            return {}
        },
        computed: {
            parentGroup() {
                let parent = this.$parent;
                while (parent) {
                    if (parent.componentName !== 'RadioGroup') {
                        parent = parent.$parent;
                    } else {
                        return parent
                    }
                }
                return false
            },
            model: {
                get() {
                    return this.parentGroup ? this.parentGroup.value : this.value;
                },
                set(value) {
                    this.parentGroup ? this.parentGroup.dispatch('input', value) : this.$emit('input', value);
                }
            },
            isDisabled() {
                return this.parentGroup ? this.parentGroup.disabled || this.disabled : this.disabled
            },
            radioSize() {
                return this.parentGroup ? this.parentGroup.size : this.size;
            }
        },
        components: {},
        created() {
        },
        mounted() {

        },
        methods: {
            handleChange() {
                if (this.isDisabled) return;
                this.$nextTick(() => {
                    this.parentGroup ? this.parentGroup.dispatch('change', this.model) : this.$emit('change', this.model);
                });
            }
        },
    }
</script>
