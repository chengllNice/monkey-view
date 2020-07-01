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
                    <cl-cascader-panel :data="data"></cl-cascader-panel>
                </div>
            </drop-down>
        </transition>
    </div>
</template>

<script>
    import {directive as clickOutside} from 'v-click-outside-x';
    import DropDown from '../../select/src/drop-down.vue'
    import ClCascaderPanel from './cascaderPanel'
    export default {
        name: "ClCascader",
        directives: {clickOutside},
        provide() {
          return {
              cascader: this
          }
        },
        props: {
            value: {
                type: Array,
                default(){
                    return []
                }
            },
            data: {
                type: Array,
                default(){
                    return []
                }
            },
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
                currentValue: [],
                currentLabel: [],
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
            initInputValue(){

            },
            getLabelByValue(data){
                let len = this.currentValue.length;
                if(!Array.isArray(data) || !len) return;

                let index = 0;
                let fn = (data) => {
                    index++;
                    data.forEach(item=>{
                        if(item.value === this.currentValue[index]){
                            this.currentLabel[index] = item.label;
                            if(data.children && Array.isArray(data.children) && data.children.length){
                                fn(data.children);
                            }
                        }
                    })
                };
                fn();
            },
            setInputValue(){
                this.inputValue = this.currentLabel.join(' / ');
            },
            handleFocus() {
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
            value(val){
                this.currentValue = val;
            },
            currentValue(val){
                this.initInputValue();
                this.$emit('input', val)
            },
            currentLabel(){
                this.setInputValue();
            },
        }
    }
</script>