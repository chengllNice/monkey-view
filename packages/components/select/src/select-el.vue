<template>
    <div class="cl-select__el" @click="handlerClick" @mouseenter="isHover = true" @mouseleave="isHover = false">
        <ClInput class="cl-select__el-input"
                 v-if="!multiple"
                 v-model="cValue"
                 type="input"
                 :name="name"
                 :size="selectSize"
                 :disabled="selectDisabled"
                 :placeholder="selectElPlaceholder"
                 :readonly="selectReadonly"
                 @focus="handlerFocus"
                 @blur="handlerBlur"
                 @change="handlerChange">
            <span slot="suffix">
                <i v-if="!isClearable" class="cl-icon-down cl-select__el-icon"
                   :class="{'cl-select__el-icon-rotate': visible}"></i>
                <i v-else class="cl-icon-remove-fill cl-select__el-icon" @click.stop="handlerClear"></i>
            </span>
        </ClInput>

        <div ref="selectMultipleTag"
             v-if="multiple"
             tabindex="-1"
             class="cl-select__el-multiple-tag">
            <ClTag class="cl-select__el-multiple-tag-item"
                   v-for="item in values"
                   :key="item.value"
                   :size="tagSize"
                   closable
                   @close="tagClose(item)">{{item.label}}
            </ClTag>
            <input v-if='filterable'
                   v-model="cValue"
                   type="text"
                   ref="multipleInput"
                   spellcheck="false"
                   class="cl-select__el-multiple-tag-item cl-select__el-multiple-input"
                   :disabled="selectDisabled"
                   :style="inputStyle"
                   @focus="handlerFocus"
                   @blur="handlerBlur"
                   @input="handlerInput">
        </div>

        <div v-if="multiple"
             :class="[
                'cl-select__el-multiple',
                isFocused && 'cl-select__el-focus'
             ]"
             tabindex="0"
             :style="multipleStyle">
            <span v-if="selectElPlaceholder && !cValue"
                  class="cl-select__el-placeholder">{{selectElPlaceholder}}</span>
            <span class="cl-select__el-suffix">
                <span class="cl-select__el-suffix-inner">
                    <i v-if="!isClearable" class="cl-icon-down cl-select__el-icon"
                       :class="{'cl-select__el-icon-rotate': visible}"></i>
                    <i v-else class="cl-icon-remove-fill cl-select__el-icon" @click.stop="handlerClear"></i>
                </span>
            </span>
        </div>
    </div>
</template>

<script>
    import ClInput from '../../input/src/input.vue'
    import ClTag from '../../tag/src/tag.vue'

    export default {
        name: "select-el",
        props: {
            values: Array,
            name: String,
            size: String,
            disabled: Boolean,
            placeholder: String,
            visible: Boolean,
            isOptionGroup: Boolean,
            filterable: Boolean,
            clearable: Boolean,
            multiple: Boolean,
            dropDown: {}
        },
        data() {
            return {
                cValue: '',
                isHover: false,
                multipleStyle: {},
                inputValueLength: 0,
                isFocused: false,
            }
        },
        computed: {
            selectSize() {
                return this.size
            },
            tagSize() {
                return this.selectSize
            },
            selectDisabled() {
                return this.disabled
            },
            selectReadonly() {
                return this.filterable ? false : true
            },
            selectElPlaceholder() {
                let placeholder = this.placeholder || '请选择';
                if (this.multiple) {
                    placeholder = this.values && this.values.length ? '' : placeholder
                }
                return placeholder
            },
            isClearable() {
                return this.clearable && this.cValue && this.isHover
            },
            inputStyle() {
                if (!this.values.length) {
                    return {width: '100%'}
                }
                if (this.multiple && this.filterable) {
                    let inputValueLength = this.inputValueLength * 12 + 32;
                    return {width: inputValueLength + 'px'};
                }
                return {};
            },
        },
        components: {
            ClInput,
            ClTag
        },
        created() {
        },
        mounted() {
        },
        methods: {
            handlerClick(e) {
                if (this.selectDisabled) return;
                this.$emit('click', e)
            },
            handlerChange(value) {
                this.$emit('input-change', value)
            },
            handlerFocus() {
                this.isFocused = true;
                this.$emit('input-focus');
            },
            handlerBlur() {
                this.isFocused = false;
                this.$emit('input-blur')
            },
            handlerInput(e) {
                this.inputValueLength = this.$refs.multipleInput.value.length;
                this.$nextTick(this.getMultipleStyle());
                this.$emit('input-change', e.target.value);
            },
            selectedLabel() {
                if (this.multiple && this.values.length) return '';
                return this.selectSingleLabel()
            },
            selectSingleLabel() {
                let selectedOption = this.values[0];
                return selectedOption ? selectedOption.label : ''
            },
            handlerClear() {
                this.cValue = '';
                this.$emit('input-clear')
            },
            tagClose(data) {
                if (this.multiple && this.filterable && this.visible) {
                    this.$refs.multipleInput.focus()
                }
                this.$emit('tag-close', data)
            },
            getMultipleStyle() {
                let style = {};
                setTimeout(() => {
                    if (this.multiple && this.values.length) {
                        let height = this.$refs.selectMultipleTag.offsetHeight;
                        style = {
                            height: height + 'px'
                        }
                    }
                    this.multipleStyle = style;
                    if (this.dropDown && this.dropDown.hasOwnProperty('updatePopper')) {
                        this.dropDown.updatePopper();
                    }
                })
            },
        },
        watch: {
            values: {
                handler() {
                    this.cValue = this.selectedLabel();
                    this.$nextTick(this.getMultipleStyle());
                },
                deep: true
            },
            visible: function (newVal) {
                if (!newVal) {
                    this.cValue = this.selectedLabel();
                }
                if (this.multiple && this.filterable) {
                    newVal ? this.$refs.multipleInput.focus() : this.$refs.multipleInput.blur();
                }
            }
        }
    }
</script>
