<template>
    <div class="cl-cascader" v-click-outside.capture="handleClickOutside">
        <div class="cl-cascader__reference" ref="reference">
            <slot>
                <cl-input v-model="inputValue"
                          :disabled="disabled"
                          :size="size"
                          :readonly="readonly"
                          :placeholder="placeholder"
                          @click.native="handleFocus"></cl-input>
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
                    <cl-cascader-panel :data="currentData"></cl-cascader-panel>
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

    export default {
        name: "ClCascader",
        directives: {clickOutside},
        mixins: [Mixin],
        provide() {
          return {
              cascader: this
          }
        },
        props: {
            transition: {
                type: String,
                default: 'slideUp'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: String,
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
            renderHtml: {
                type: [HTMLElement, Boolean],
                default: function () {
                    return true
                }
            },
        },
        data() {
            return {
                inputValue: '',
                visible: false,
                readonly: true,
            }
        },
        components: {
            DropDown,
            ClCascaderPanel
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
            handleFocus() {
                if(this.disabled) return;
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
                this.$emit('click-outside',event);
                this.dropDownVisible(false);
            },
        },
        watch: {
            data: {
                handler(){
                    this.deepCloneData();
                },
                deep: true,
                immediate: true
            },
        }
    }
</script>