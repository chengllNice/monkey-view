<template>
    <div v-if="selectRoot"
         :class="referenceClass"
         @click="handleClick"
         @mouseenter="isHover = true"
         @mouseleave="isHover = false">
        <n-input :class="[`${classPrefix}__input`]"
                  v-if="!selectRoot.multiple"
                  v-model="currentValue"
                  type="input"
                  :name="selectRoot.name"
                  :size="selectRoot.size"
                  :disabled="selectRoot.disabled"
                  :placeholder="computedPlaceholder"
                  :readonly="!selectRoot.filterable"
                  @change="handleChange">
            <span slot="suffix">
                <Icon v-show="!clearableShow"
                      type="icon-down"
                      :class="[`${classPrefix}__suffix-icon`,selectRoot.visible && `${classPrefix}__suffix-icon-rotate`]"></Icon>
                <Icon v-show="clearableShow" type="icon-error-fill" :class="[`${classPrefix}__suffix-clear-icon`]" @click.stop="handleClear"></Icon>
            </span>
        </n-input>

        <template v-if="selectRoot.multiple">
            <div class="">
                <tag :class="[`${classPrefix}__multiple-tag`]"
                     v-for="item in selectRoot.currentSelectedItems"
                     :key="item.value"
                     :size="selectRoot.size"
                     closable
                     @close="tagClose(item.value)">{{item.label}}</tag>
                <input v-model="currentValue"
                       type="text"
                       ref="multipleInput"
                       :readonly="!selectRoot.filterable"
                       :placeholder="selectRoot.currentValue.length ? '' : computedPlaceholder"
                       spellcheck="false"
                       :class="[
                           `${classPrefix}__multiple-input`
                       ]"
                       :disabled="selectRoot.disabled"
                       :style="inputStyle"
                       @focus="isFocused = true"
                       @blur="isFocused = false"
                       @input="handleMultipleInput" />
            </div>

            <span :class="[`${classPrefix}__suffix`]">
                <Icon v-show="!clearableShow"
                      type="icon-down"
                      :class="[`${classPrefix}__suffix-icon`, selectRoot.visible && `${classPrefix}__suffix-icon-rotate`]"></Icon>
                <Icon v-show="clearableShow" type="icon-error-fill" :class="[`${classPrefix}__suffix-clear-icon`]" @click.stop="handleClear"></Icon>
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
        name: "SelectReference",
        mixins: [Locale],
        props: {
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-select-reference',
                currentValue: '',
                selectRoot: this.$parent,

                isHover: false,
                isFocused: false,
                multipleStyle: {},
            }
        },
        computed: {
            referenceClass(){
              return [
                  `${this.classPrefix}`,
                  this.selectRoot.multiple && `${this.classPrefix}--multiple`,
                  this.selectRoot.disabled && `${this.classPrefix}--disabled`,
                  this.selectRoot.multiple && (this.selectRoot.visible || this.isFocused) && `${this.classPrefix}--focus`,
                  this.selectRoot.multiple && this.isHover && `${this.classPrefix}--hover`,
              ]
            },
            computedPlaceholder() {
                return this.selectRoot.placeholder || this.t('cl.select.placeholder')
            },
            clearableShow() {
                return this.selectRoot.clearable && this.selectRoot.currentValue.length && this.isHover
            },
            inputStyle() {
                if (!this.selectRoot.currentValue.length) {
                    return {width: '100%'}
                }
                if (this.selectRoot.multiple && this.selectRoot.filterable) {
                    return {width: (this.currentValue.length * 12 + 32) + 'px'};
                }
                return {};
            },
        },
        components: {
            'n-input': Input,
            Icon,
            Tag
        },
        created() {
        },
        mounted() {
        },
        methods: {
            handleClick() {
                if (this.selectRoot.disabled) return;
                this.selectRoot.setDropDownVisible();
                this.setMultipleInputFocusAndBlur();
            },
            setMultipleInputFocusAndBlur(){
                if(!this.selectRoot.multiple || !this.selectRoot.filterable || this.selectRoot.disabled) return;
                this.$refs.multipleInput.focus()
                // if(this.selectRoot.visible){
                //     this.$refs.multipleInput.focus()
                // } else {
                //     this.$refs.multipleInput.blur()
                // }
            },
            handleChange(value) {
                if(!this.selectRoot.filterable || this.selectRoot.disabled) return;
                this.selectRoot.setDropDownVisible(true);
                if(this.selectRoot.filterable && !this.selectRoot.remote) this.selectRoot.handleFilterable(value);
                if (this.selectRoot.filterable && this.selectRoot.remote) this.selectRoot.emitRemoteChange(value);
            },
            handleMultipleInput(e) {
                this.currentValue = this.$refs.multipleInput.value;
                this.handleChange(e.target.value);
                this.selectRoot.updateDropdownPosition();
            },
            handleClear() {
                this.currentValue = '';
                this.selectRoot.handleClearable();
            },
            tagClose(value) {
                this.setMultipleInputFocusAndBlur();
                this.selectRoot.handleTagClose(value);
                this.selectRoot.updateDropdownPosition();
            },
            setCurrentValue(){
                if(!this.selectRoot.multiple){
                    this.currentValue = this.selectRoot.currentSelectedItems.length ? this.selectRoot.currentSelectedItems[0].label : '';
                }else {
                    this.currentValue = '';
                    //多选筛选 选择之后需要重新计算高度
                    this.selectRoot.setScrollInnerHeight();
                }
            }
        },
        watch: {
            'selectRoot.currentValue': function(newV, oldV){
                if(JSON.stringify(newV) === JSON.stringify(oldV)) return;
                this.setCurrentValue();
            },
            'selectRoot.visible': function(val){
                !val && this.setCurrentValue();
            },
        }
    }
</script>
