<template>
    <div :class="[
            `${classPrefix}`,
            computedSize && `${classPrefix}--${computedSize}`,
            disabled && `is-disabled`
         ]"
         v-click-outside.capture="handleOutsideClick">
        <div ref="reference"
             :class="[`${classPrefix}__reference`]"
             :tabindex="referenceTabIndex"
             @keydown.esc.prevent="handleKeydown"
             @keydown.enter.prevent="handleKeydown"
             @keydown.down.prevent="handleKeydown"
             @keydown.up.prevent="handleKeydown"
             @keydown.tab.prevent="handleKeydown">
            <select-reference/>
        </div>
        <transition :name="transition">
            <Drop v-show="visible && !disabled"
                  ref="dropDown"
                  :reference="this.$refs.reference"
                  :placement="placement"
                  :render-html="renderHtml"
                  :dropdownMatchSelectWidth="dropdownMatchSelectWidth"
                  v-model="visible">
                <div ref="scrollOuter"
                     :class="[
                         `${classPrefix}__drop-inner`,
                         size && `${classPrefix}__drop-inner--${size}`,
                     ]"
                     :style="dropInnerStyle">
                    <scroll ref="scroll" size="small" :scrollOption="{scrollPanel:{scrollingX:false}}">
                        <div ref="scrollInner">
                            <div v-if="loading" :class="[`${classPrefix}__loading`]">
                                <Icon type="loading" class="animation-rotate"></Icon>
                                {{t('m.select.loading')}}
                            </div>

                            <div v-else-if="isEmpty"
                                 :class="[`${classPrefix}__empty`]">{{localEmptyText}}
                            </div>

                            <template v-if="renderType === 'option'">
                                <Option v-if="allowCreate && allowCreateOption" allowCreate
                                        :label="allowCreateOption.label" :value="allowCreateOption.value"></Option>
                                <render-option :option="currentOption"></render-option>
                            </template>
                            <template v-if="renderType === 'slot'">
                                <Option v-if="allowCreate && allowCreateOption" allowCreate
                                        :label="allowCreateOption.label" :value="allowCreateOption.value"></Option>
                                <slot></slot>
                                <template v-for="item in currentAllowCreateOption">
                                    <Option :key="item.value" :label="item.label" :value="item.value"></Option>
                                </template>
                            </template>
                        </div>
                    </scroll>
                </div>
            </Drop>
        </transition>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import {directive as clickOutside} from 'v-click-outside-x';
    import SelectReference from './select-reference.vue'
    import Scroll from 'packages/scroll'
    import Drop from 'packages/base/drop'
    import Locale from 'main/mixins/locale'
    import Mixins from './mixins'
    import RenderOption from './render-option'
    import Option from './option'
    import {findComponent} from "main/utils/tool";

    export default {
        name: "Select",
        directives: {clickOutside},
        mixins: [Locale, Mixins],
        provide() {
            return {
                selectRoot: this
            }
        },
        props: {
            value: [String, Number, Array],
            name: String,
            placeholder: String,
            disabled: Boolean,
            size: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value)
                }
            },
            option: Array,
            transition: {
                type: String,
                default: 'slideUp'
            },
            multiple: Boolean,
            clearable: Boolean,
            emptyText: String,
            filterable: Boolean,//开启搜索
            remote: Boolean,//开启远程搜索
            loading: Boolean,//正在远程搜索
            allowCreate: Boolean,//是否允许新建
            //多选限制最多显示的tag数量，其他折叠 0不折叠
            maxTagCount: {
                type: Number,
                default: 0
            },
            //超出最大数量限制时显示的内容，参数为当前选中的数量
            maxTagText: Function,
            //多选限制选择的数量 0不限制
            multipleLimit: {
                type: Number,
                default: 0
            },
            maxHeight: {
                type: [String, Number],
                default: '200px'
            },
            placement: {
                type: String,
                default: 'bottom-start'
            },
            valueLable: Boolean,
            dropdownMatchSelectWidth: {
                type: Boolean,
                default: true
            },
            renderHtml: {
                type: [HTMLElement, Boolean],
                default: false,
            }
        },
        data() {
            return {
                optionPrefix: Config.classPrefix + '-option',
                classPrefix: Config.classPrefix + '-select',
                componentName: 'Select',
                form: findComponent(this, 'Form'),
            }
        },
        computed: {
            computedSize(){
                if(this.size !== 'default') return this.size;
                if(this.form && this.form.size !== 'default') return this.form.size;
                return this.size;
            },
            isEmpty() {
                if (this.isFilter) {
                    if (this.allowCreate && this.allowCreateOption) return false;
                    return !this.filterableValue.length;
                }
                return !this.currentOption.length
            },
            localEmptyText() {
                return this.emptyText || this.t('m.select.emptyData');
            },
            dropInnerStyle() {
                return {height: this.scrollInnerHeight + 'px'}
            },
            referenceTabIndex() {
                return this.disabled || this.filterable ? '-1' : '0'
            },
            //开启多选限制的，此时除了已经选中的option 其他option全部disabled
            openMultipleLimitDisabled(){
                return this.multiple && this.multipleLimit > 0 && this.currentValue.length >= this.multipleLimit
            },
            //计算多选时 超出限制数量时的截取
            localCurrentSelectedItems(){
                let data = this.currentSelectedItems;
                let maxTagCount = this.maxTagCount;
                if(this.multiple && maxTagCount > 0 && data.length > maxTagCount){
                    return data.slice(0, maxTagCount)
                }
                return data;
            },
            //计算多选时 超出显示数量显示的文本
            localMaxTagText(){
                let data = this.currentSelectedItems;
                let maxTagCount = this.maxTagCount;
                let maxTagText = `+ ${data.length - maxTagCount}...`;
                if(this.maxTagText && typeof this.maxTagText === 'function') {
                    maxTagText = this.maxTagText(data.length - maxTagCount);
                }
                return maxTagText;
            },
            //计算多选时 是否超出限制数量
            showMaxTagText(){
                let data = this.currentSelectedItems;
                let maxTagCount = this.maxTagCount;
                return this.multiple && maxTagCount > 0 && data.length > maxTagCount
            }
        },
        components: {
            SelectReference,
            Drop,
            Scroll,
            RenderOption,
            Option
        },
    }
</script>