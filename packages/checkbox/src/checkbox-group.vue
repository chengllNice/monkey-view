<template>
    <div class="cl-checkbox-group">
        <template v-if="$slots.default"><slot></slot></template>
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
    import Checkbox from './checkbox.vue'

    export default {
        name: "CheckboxGroup",
        props: {
            value: Array,
            disabled: Boolean,
            type: String,
            size: {
                default: 'default',
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value)
                },
            },
            options: Array
        },
        data() {
            return {
                componentName: 'CheckboxGroup',
            }
        },
        computed: {},
        components: {
            Checkbox
        },
        created() {
        },
        mounted() {
        },
        methods: {
            dispatch(type, label, value) {
                let index = this.value.indexOf(label);
                index > -1 && this.value.splice(index, 1);
                value && this.value.push(label);
                type === 'input' && this.$emit('input', this.value);
                type === 'change' && this.$emit('change', this.value);
            }
        },
        // watch: {
        //   value: function (newVal) {
        //
        //   }
        // }
    }
</script>
