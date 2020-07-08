<template>
    <div :class="[
             `${classPrefix}`,
             this.isMultiple && `${classPrefix}__multiple`,
            {
                'is-selected': this.isSelected,
                'is-disabled': this.disabled,
            }
         ]"
         v-show="isShow"
         @click.stop="handlerClick"
         @mousedown.prevent>
        <span :class="[`${classPrefix}__text`]" v-if="$slots.default">
            <slot></slot>
        </span>
        <span :class="[`${classPrefix}__text`]" v-else>{{optionsLabel}}</span>
        <Icon v-if="isMultiple && isSelected" type="icon-check" :class="[`${classPrefix}__icon`]"></Icon>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Icon from 'packages/icon'

    export default {
        name: "Option",
        inject: ['select'],
        props: {
            value: {
                type: [String, Number],
                required: true
            },
            label: [String, Number],
            disabled: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-option',
                componentName: 'Option',
                firstTrigger: true,
            }
        },
        computed: {
            optionGroupParentEl() {
                let parent = this.$parent;
                while (parent) {
                    if (parent.componentName !== 'OptionGroup') {
                        parent = parent.$parent;
                    } else {
                        return parent
                    }
                }
                return false
            },
            optionsLabel() {
                let label = '';
                if (this.$slots.default && this.$slots.default.length === 1 && !this.$slots.default[0].tag) {
                    label = this.$slots.default[0].text || ''
                }
                label = this.label || label || this.value;
                return label.replace(/\n/g, '').trim();
            },
            isSelected() {
                if (!this.select || this.select.cValue === null) return false;
                if (this.select.multiple && Array.isArray(this.select.cValue)) {
                    return this.select.cValue.includes(this.value)
                } else {
                    return this.select.cValue === this.value
                }
            },
            isMultiple() {
                return this.select && this.select.multiple
            },
            isShow() {
                if (this.select.filterable && this.select.isSearching) {
                    if (!this.select.selectElLabel) {
                        return true
                    }
                    return this.optionsLabel.includes(this.select.selectElLabel)
                }
                return true;
            }
        },
        components: {
            Icon
        },
        created() {
        },
        mounted() {
            if (this.isSelected && this.firstTrigger) {
                this.handlerClick('mounted');
            }
            this.optionGroupParentEl && this.optionGroupParentEl.setIsShow();
            this.select && this.select.getIsEmpty();
        },
        updated() {
            this.optionGroupParentEl && this.optionGroupParentEl.setIsShow();
            this.select && this.select.getIsEmpty();
        },
        watch: {
            isSelected: function (newVal) {
                if (newVal) this.handlerClick('mounted');
            }
        },
        methods: {
            handlerClick(type) {
                if (this.disabled) return false;
                this.firstTrigger = false;
                this.select && this.select.handlerSelected({
                    value: this.value,
                    label: this.optionsLabel,
                    disabled: this.disabled,
                    type: type === 'mounted' ? type : undefined
                });
                // this.$emit('on-selected', {
                //   value: this.value,
                //   label: this.optionsLabel,
                //   disabled: this.disabled,
                // });
            }
        }
    }
</script>
