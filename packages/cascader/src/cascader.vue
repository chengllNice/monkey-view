<template>
    <div class="cl-cascader" v-click-outside.capture="handleClickOutside">
        <div class="cl-cascader__reference" ref="reference">
            <slot>
                <cl-input v-model="inputValue"
                          :disabled="disabled"
                          :size="size"
                          :readonly="readonly"
                          :placeholder="computedPlaceholder"
                          @mouseenter.native="isHover = true"
                          @mouseleave.native="isHover = false"
                          @focus="handleInputFocus"
                          @blur="handleInputBlur"
                          @change="handleInputChange"
                          @click.native="handleInputClick">
                    <template slot="suffix">
                        <i v-if="showClear" class="cl-icon-error-fill cl-cascader__suffix-icon" @click.stop="handleInputClear"></i>
                        <i v-else class="cl-icon-down cl-cascader__suffix-icon" :class="{'cl-cascader__suffix-icon-open': visible}"></i>
                    </template>
                </cl-input>
            </slot>
        </div>

        <transition :name="transition">
            <drop-down v-show="visible && !disabled"
                      ref="dropDown"
                      :reference="this.$refs.reference"
                      :isMinWidth="false"
                      :dropdownMatchSelectWidth="false"
                      :render-html="renderHtml"
                      v-model="visible">
                <div class="cl-cascader__drop-down-inner">
                    <div v-if="loading" class="cl-cascader__loading">
                        {{computedLoadingText}}
                        <i v-if="!loadingText" class="cl-rotate cl-icon-loading"></i>
                    </div>
                    <div v-else-if="showEmpty" class="cl-cascader__empty">{{computedEmptyText}}</div>
                    <cl-cascader-panel v-else :data="currentData"></cl-cascader-panel>
                </div>
            </drop-down>
        </transition>
    </div>
</template>

<script>
    import {directive as clickOutside} from 'v-click-outside-x';
    import DropDown from '../../select/src/drop-down.vue'
    import ClCascaderPanel from './cascaderPanel'
    import Mixin from './mixin'

    import Locale from "main/mixins/locale";

    export default {
        name: "ClCascader",
        directives: {clickOutside},
        mixins: [Mixin, Locale],
        props: {
            transition: {
                type: String,
                default: 'slideUp'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: true
            },
            placeholder: String,
            emptyText: String,
            loadingText: String,
            loading: Boolean,
            size: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value);
                }
            },
            format: {
                type: Function,
            },
            filterable: {
                type: Boolean,
                default: false
            },
            renderHtml: {
                type: [HTMLElement, Boolean],
                default: function () {
                    return false
                }
            },
        },
        data() {
            return {
                componentName: 'ClCascader',
                inputValue: '',
                visible: false,
                openFilterable: false,//开启搜索
                currentFilterableData: [],//搜索到的数据
                isHover: false
            }
        },
        computed: {
            computedPlaceholder(){
                return this.placeholder ? this.placeholder : this.t('cl.cascader.placeholder');
            },
            computedEmptyText(){
                return this.emptyText ? this.emptyText : this.t('cl.cascader.emptyData');
            },
            computedLoadingText(){
                return this.loadingText ? this.loadingText : this.t('cl.cascader.loading');
            },
            readonly(){
                if(this.disabled) return true;
                if(this.filterable) return false;
                return true;
            },
            showFilterablePanel(){
                return this.filterable && this.openFilterable
            },
            showEmpty(){
                if(this.showFilterablePanel){
                    return !this.currentFilterableData.length;
                }
                return !this.currentData.length;
            },
            showClear(){
                return this.clearable && this.inputValue && this.isHover
            }
        },
        components: {
            DropDown,
            ClCascaderPanel,
        },
        mounted() {

        },
        methods: {
            setInputValue(){
                if(this.format){
                    let result = this.format(this.currentLabel, this.currentSelectedData);
                    if(typeof result === 'string'){
                        this.inputValue = result;
                    }
                }else{
                    this.inputValue = this.currentLabel.join(' / ');
                }
            },
            handleInputFocus(){
                if(this.disabled || !this.filterable) return;
                this.dropDownVisible(true);
            },
            handleInputBlur(){
                // this.handleValueChange(this.currentData, this.currentValue);
            },
            handleInputClear(){
                this.inputValue = '';
                this.currentValue = [];
                this.currentLabel = [];
                this.currentSelectedData = [];
                this.resetCurrentData();
                this.$emit('change', [], []);
                this.$emit('clear');
            },
            handleInputChange(value){
                this.openFilterable = !!value;
                this.currentFilterableData = [];
                if(this.filterable){
                    //用户搜索改变
                    this.currentFilterableData = this.searchFilter(value);
                }
            },
            handleInputClick() {
                if(this.disabled || this.filterable) return;
                this.dropDownVisible(!this.visible);
            },
            dropDownVisible(visible) {
                if (this.disabled) return;
                this.visible = visible;
            },
            handleClickOutside(event) {
                if (this.visible) {
                    if (this.renderHtml !== false) {
                        const {$el} = this.$refs.dropDown;
                        if ($el === event.target || $el.contains(event.target)) {
                            return;
                        }
                    }
                }
                //如果是可搜索 在失去焦点时重置label数据
                if(this.filterable){
                    this.handleValueChange(this.currentData, this.currentValue);
                }
                this.$emit('click-outside',event);
                this.dropDownVisible(false);
            },
        },
        watch: {
            data: {
                handler(){
                    this.initCurrentData();
                },
                deep: true,
                immediate: true
            },
        }
    }
</script>