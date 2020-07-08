<template>
    <span tabindex="0"
          :class="[
              `${classPrefix}`,
              size && `${classPrefix}--${size}`,
              {
                 'is-checked': currentValue === trueValue,
                 'is-disabled': isDisabled,
                 'is-loading': loading
              }
          ]"
          :style="expandStyle"
          @click.stop="handlerClick">
        <input type="hidden" :name="name" v-model="currentValue">
        <span :class="[`${classPrefix}__inner`]">
            <slot name="open" class="" v-if="currentValue === trueValue"></slot>
            <slot name="close" class="" v-if="currentValue === falseValue"></slot>
        </span>
    </span>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "Switch",
        props: {
            value: {
                type: [String, Number, Boolean],
                default: false
            },
            trueValue: {
                type: [String, Number, Boolean],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean],
                default: false
            },
            name: String,
            size: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value)
                }
            },
            disabled: Boolean,
            checkedColor: String,
            uncheckedColor: String,
            width: [String, Number],
            loading: Boolean
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-switch',
                currentValue: false
            }
        },
        computed: {
            isDisabled() {
                return this.disabled;
            },
            expandStyle() {
                let width = parseFloat(this.width) + 'px';
                if (this.currentValue === this.trueValue) {
                    return {'background-color': this.checkedColor, 'width': width}
                }
                return {'background-color': this.uncheckedColor, 'width': width}
            }
        },
        components: {},
        created() {
        },
        mounted() {
            this.$nextTick(() => {
                this.currentValue = this.value;
            })
        },
        methods: {
            handlerClick() {
                if (this.isDisabled || this.loading) return;

                const checked = this.currentValue === this.trueValue ? this.falseValue : this.trueValue;

                this.currentValue = checked;
                this.$emit('input', checked);
                this.$emit('change', checked);
            }
        },
        watch: {
            value: function (newVal) {
                this.currentValue = newVal;
            }
        }
    }
</script>
