<template>
    <div :class="[
            `${classPrefix}`,
            size && `${classPrefix}--${size}`,
            disabled && `is-disabled`
         ]"
         v-click-outside.capture="hanldeOutsideClick">
        <div ref="reference"
             @keydown.esc.prevent="handleKeydown"
             @keydown.enter.prevent="handleKeydown"
             @keydown.down.prevent="handleKeydown"
             @keydown.up.prevent="handleKeydown">
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
                    <scroll size="small" :scrollOption="{scrollPanel:{scrollingX:false}}">
                        <div ref="scrollInner">
                            <div v-if="loading" :class="[`${classPrefix}__loading`]">
                                <Icon type="icon-loading" :class="[`${prefix}-rotate`]"></Icon>
                                {{t('cl.select.loading')}}
                            </div>

                            <div v-else-if="isEmpty"
                                 :class="[`${classPrefix}__empty`]">{{localEmptyText}}</div>

                            <render-option v-if="renderType === 'option'" :option="currentOption"></render-option>
                            <template v-if="renderType === 'slot'">
                                <slot></slot>
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
                validator(value){
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
                default: true,
            }
        },
        data() {
            return {
                prefix: Config.classPrefix,
                classPrefix: Config.classPrefix + '-select',
                componentName: 'Select',
            }
        },
        computed: {
            isEmpty() {
                if (this.isFilter) return !this.filterableValue.length;
                return !this.currentOption.length
            },
            localEmptyText() {
                return this.emptyText || this.t('cl.select.emptyData');
            },
            dropInnerStyle() {
                return {height: this.scrollInnerHeight + 'px'}
            }
        },
        components: {
            SelectReference,
            Drop,
            Scroll,
            RenderOption
        },
        mounted() {
        },
        methods: {}
    }
</script>