<template>
    <div class="cl-radio-group">
        <template v-if="$slots.default"><slot></slot></template>
        <radio v-else-if="options && options.length"
                 v-for="item in options"
                 :key="item.value"
                 :name="item.name"
                 :disabled="item.disabled"
                 :label="item.value">{{item.label}}
        </radio>
    </div>
</template>

<script>
    import Radio from './radio.vue'

    export default {
        name: "RadioGroup",
        props: {
            value: [String, Number, Boolean],
            disabled: Boolean,
            size: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value)
                }
            },
            options: Array
        },
        data() {
            return {
                componentName: 'RadioGroup',
            }
        },
        computed: {},
        components: {
            Radio
        },
        created() {
        },
        mounted() {
        },
        methods: {
            dispatch(type, value) {
                type === 'input' && this.$emit('input', value);
                type === 'change' && this.$emit('change', value);
            }
        }
    }
</script>

<style scoped>

</style>
