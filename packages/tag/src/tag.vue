<template>
    <div :class="[
             `${classPrefix}`,
             size && `${classPrefix}--${size}`,
             noCustomColor && `${classPrefix}--color-${color}`,
             ghost && `${classPrefix}--ghost`,
             isChecked && 'is-checked'
        ]"
         :style="customStyle"
         @click.stop="handlerClick">
        <span :class="[`${classPrefix}__text`]"><slot></slot></span>
        <Icon v-if="closable"
              :type="iconType"
              :class="[
                  `${classPrefix}__icon`
              ]"
              :style="iconStyle"
              @click.native.stop="handlerClose"></Icon>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Icon from 'packages/icon'

    export default {
        name: "Tag",
        props: {
            size: {
                type: String,
                default () {
                    return !this.$MONKEY || this.$MONKEY.size === '' ? 'default' : this.$MONKEY.size;
                },
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value)
                }
            },
            closable: Boolean,
            ghost: Boolean,
            checkable: Boolean,
            checked: {
                type: Boolean,
                default: true
            },
            color: {
                type: String,
                default: 'default'
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-tag',
                isHover: false,
                isChecked: this.checked,
            }
        },
        computed: {
            iconType() {
                return this.isHover ? 'error-fill' : 'close'
            },
            noCustomColor() {
                return ['primary', 'success', 'danger', 'warning', 'info', 'default', 'primary-o', 'success-o', 'danger-o', 'warning-o', 'info-o', 'default-o'].includes(this.color)
            },
            customStyle() {
                if (this.noCustomColor) return {};
                if (this.ghost) {
                    return {
                        'background-color': 'transparent',
                        'color': this.color,
                        'border-color': this.color,
                    };
                }
                return {
                    'background-color': this.color,
                    'color': '#ffffff',
                    'border-color': this.color,
                };
            },
            iconStyle() {
                if (this.noCustomColor) return {};
                if (this.ghost) {
                    return {
                        'color': this.color
                    };
                }
                return {
                    'color': '#ffffff'
                };
            }
        },
        components: {
            Icon
        },
        methods: {
            handlerClose() {
                this.$emit('close')
            },
            handlerClick() {
                if (this.checkable) {
                    this.isChecked = !this.isChecked;
                }
                this.$emit('click');
            }
        },
        watch: {
            checked: function (newVal) {
                this.isChecked = newVal;
            }
        }
    }
</script>
