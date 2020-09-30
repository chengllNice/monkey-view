<template>
    <div v-if="selectRoot"
         :class="referenceClass"
         @click="handleClick"
         @mouseenter="isHover = true"
         @mouseleave="isHover = false">
        <m-input :class="[`${classPrefix}__input`]"
                 v-if="!selectRoot.multiple"
                 v-model="currentValue"
                 type="input"
                 :name="selectRoot.name"
                 :size="selectRoot.computedSize"
                 :disabled="selectRoot.disabled"
                 :placeholder="computedPlaceholder"
                 :readonly="!selectRoot.filterable"
                 @change="handleChange">
            <template slot="suffix">
                <Icon v-show="!clearableShow"
                      type="down"
                      :class="[`${classPrefix}__suffix-icon`,selectRoot.visible && `${classPrefix}__suffix-icon-rotate`]"></Icon>
                <Icon v-show="clearableShow" type="error-fill" :class="[`${classPrefix}__suffix-clear-icon`]"
                      @click.stop="handleClear"></Icon>
            </template>
        </m-input>

        <template v-if="selectRoot.multiple">
            <div class="">
                <tag :class="[`${classPrefix}__multiple-tag`]"
                     v-for="item in selectRoot.localCurrentSelectedItems"
                     :key="item.value"
                     :size="selectRoot.computedSize"
                     closable
                     @close="tagClose(item.value)">{{item.label}}
                </tag>
                <tag v-if="selectRoot.showMaxTagText"
                     :class="[`${classPrefix}__multiple-tag`]"
                     :size="selectRoot.computedSize">{{selectRoot.localMaxTagText}}
                </tag>
                <input v-model="currentValue"
                       type="text"
                       ref="multipleInput"
                       :readonly="!selectRoot.filterable"
                       :placeholder="computedPlaceholder"
                       spellcheck="false"
                       :class="[
                           `${classPrefix}__multiple-input`
                       ]"
                       :disabled="selectRoot.disabled"
                       :style="inputStyle"
                       @focus="isFocused = true"
                       @blur="isFocused = false"
                       @input="handleMultipleInput"/>
            </div>

            <span :class="[`${classPrefix}__suffix`]">
                <Icon v-show="!clearableShow"
                      type="down"
                      :class="[`${classPrefix}__suffix-icon`, selectRoot.visible && `${classPrefix}__suffix-icon-rotate`]"></Icon>
                <Icon v-show="clearableShow" type="error-fill" :class="[`${classPrefix}__suffix-clear-icon`]"
                      @click.stop="handleClear"></Icon>
            </span>
        </template>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Input from 'packages/input'
    import Icon from 'packages/icon'
    import Tag from 'packages/tag'
    import Locale from 'main/mixins/locale'

    export default {
        name: 'SelectReference',
        mixins: [Locale],
        data() {
            return {
                classPrefix: Config.classPrefix + '-select-reference',
                currentValue: '',
                selectRoot: this.$parent,
                isHover: false,
                isFocused: false
            }
        },
        computed: {
            referenceClass() {
                return [
                    `${this.classPrefix}`,
                    this.selectRoot.multiple && `${this.classPrefix}--multiple`,
                    this.selectRoot.disabled && `${this.classPrefix}--disabled`,
                    this.selectRoot.multiple && (this.selectRoot.visible || this.isFocused) && `${this.classPrefix}--focus`,
                    this.selectRoot.multiple && this.isHover && `${this.classPrefix}--hover`
                ]
            },
            computedPlaceholder() {
                if (this.selectRoot.currentSelectedItems.length) return '';
                return this.selectRoot.placeholder || this.t('m.select.placeholder')
            },
            clearableShow() {
                return !this.selectRoot.disabled && this.selectRoot.clearable && this.selectRoot.currentValue.length && this.isHover
            },
            inputStyle() {
                if (!this.selectRoot.currentSelectedItems.length) {
                    return { width: '100%' }
                }
                if (this.selectRoot.multiple && this.selectRoot.filterable) {
                    return { width: (this.currentValue.length * 12 + 32) + 'px' };
                }
                return { width: '0px' };
            }
        },
        components: {
            'm-input': Input,
            Icon,
            Tag
        },
        mounted() {
            this.$nextTick(() => this.setCurrentValue())
        },
        methods: {
            handleClick() {
                if (this.selectRoot.disabled) return;
                this.selectRoot.setDropDownVisible();
                this.setMultipleInputFocusAndBlur();
            },
            setMultipleInputFocusAndBlur() {
                if (!this.selectRoot.multiple || !this.selectRoot.filterable || this.selectRoot.disabled) return;
                this.$refs.multipleInput.focus();
            },
            handleChange(value) {
                if (!this.selectRoot.filterable || this.selectRoot.disabled) return;
                this.selectRoot.setDropDownVisible(true);
                if (!this.selectRoot.remote) this.selectRoot.handleFilterable(value);
                if (this.selectRoot.remote) this.selectRoot.emitRemoteChange(value);
                if (this.selectRoot.allowCreate) this.selectRoot.handleAllowCreate(value);
            },
            handleMultipleInput(e) {
                if (!this.selectRoot.multiple || !this.selectRoot.filterable || this.selectRoot.disabled) return;
                const value = e.target.value;
                this.currentValue = value;
                this.handleChange(value);
                this.selectRoot.updateDropdownPosition();
            },
            handleClear() {
                if (this.selectRoot.disabled) return;
                this.currentValue = '';
                this.selectRoot.handleClearable();
            },
            tagClose(value) {
                if (this.selectRoot.disabled) return;
                this.setMultipleInputFocusAndBlur();
                this.selectRoot.handleTagClose(value);
                this.selectRoot.updateDropdownPosition();
            },
            setCurrentValue() {
                if (this.selectRoot.allowCreate && this.selectRoot.isFilter) return;
                if (!this.selectRoot.multiple) {
                    this.currentValue = this.selectRoot.currentSelectedItems.length ? this.selectRoot.currentSelectedItems[0].label : '';
                } else {
                    this.currentValue = '';
                    // 多选筛选 选择之后需要重新计算高度
                    this.selectRoot.setScrollInnerHeight();
                }
            }
        },
        watch: {
            'selectRoot.currentValue': function (newVal, oldVal) {
                if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return;
                this.setCurrentValue();
            },
            'selectRoot.visible': function (val) {
                !val && this.setCurrentValue();
            }
        }
    }
</script>
