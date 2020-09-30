<template>
    <div :class="[`${classPrefix}`]">
        <template v-if="$slots.default">
            <slot></slot>
        </template>
        <Checkbox v-else-if="options && options.length"
                  v-for="item in options"
                  :key="item.value"
                  :name="item.name"
                  :disabled="item.disabled"
                  :label="item.value">{{item.label}}
        </Checkbox>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Checkbox from './checkbox.vue'

    export default {
        name: 'CheckboxGroup',
        props: {
            value: Array,
            disabled: Boolean,
            type: String,
            size: {
                default: 'default',
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value)
                }
            },
            options: Array
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-checkbox-group',
                componentName: 'CheckboxGroup'
            }
        },
        components: {
            Checkbox
        },
        methods: {
            dispatch(type, label, value) {
                const index = this.value.indexOf(label);
                index > -1 && this.value.splice(index, 1);
                value && this.value.push(label);
                type === 'input' && this.$emit('input', this.value);
                type === 'change' && this.$emit('change', this.value);
            }
        }
    }
</script>
