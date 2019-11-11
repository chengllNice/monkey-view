<template>
    <div :class="[
            'cl-date-picker',
            size && `cl-date-picker--${size}`
         ]"
         v-click-outside.capture="handleClickOutside">
        <div class="cl-date-picker__reference" ref="reference">
            <cl-input v-model="dateInputValue"
                      readonly
                      :placeholder="placeholder"
                      @click.native="handleFocus"></cl-input>
        </div>
        <transition :name="transition">
            <DropDown v-show="visible && !disabled"
                      ref="dropDown"
                      :reference="this.$refs.reference"
                      :placement="placement"
                      :dropdownMatchSelectWidth="false"
                      :render-html="renderHtml"
                      v-model="visible">
                <div class="cl-date-picker__drop-down-inner">
                    <cl-date-pane index="0"
                                  :size="size"
                                  :format="format"
                                  v-model="dateValue"
                                  :is-range="isRange"
                                  :type="type" />
                </div>
            </DropDown>
        </transition>
    </div>
</template>

<script>
    import {directive as clickOutside} from 'v-click-outside-x';
    import DropDown from '../../select/src/drop-down.vue'
    // import ClDatePaneSingle from './pane/date-pane-single.vue'
    // import ClDatePaneRange from './pane/date-pane-range.vue'
    import ClDatePane from './pane/date-pane.vue'
    import {dateFormat} from "../../../utils/date";

    export default {
        name: "ClDatePicker",
        directives: {clickOutside},
        props: {
            value: [String, Array],
            type: {
                type: String,
                default: 'daterange',
                validator(value){
                    return ['date', 'daterange', 'datetime', 'datetimerange', 'year', 'month'].includes(value)
                }
            },
            placeholder: String,
            transition: {
                type: String,
                default: 'fade'
            },
            disabled: Boolean,
            placement: {
                type: String,
                default: 'bottom-start'
            },
            size: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['mini', 'small', 'default', 'large'].includes(value);
                }
            },
            format: {
                type: String,
                default: '',
            },
            renderHtml: {
                type: [HTMLElement, Boolean],
                default: function () {
                    return true
                }
            }
        },
        data(){
            return {
                dateValue: [],
                dateInputValue: '',
                visible: true,
            }
        },
        computed: {
            isRange(){
                return this.type.includes('range');
            }
        },
        components: {
            DropDown,
            ClDatePane
        },
        mounted() {
        },
        methods: {
            handleFocus(){
                if(this.disabled){
                    return
                }
                this.visible = !this.visible;
            },
            handleClickOutside(event){
                if(this.visible){
                    if(this.renderHtml !== false){
                        const {$el} = this.$refs.dropDown;
                        if ($el === event.target || $el.contains(event.target)) {
                            return;
                        }
                    }
                }
                this.closeDropDownPane(false);
            },
            closeDropDownPane(visible){
                this.visible = visible;
            },
            openDropDownPane(){

            },
            updateInputValue(){
                if(this.isRange){
                    let date1 = dateFormat(this.dateValue[0], this.format);
                    let date2 = dateFormat(this.dateValue[1], this.format);
                    this.dateInputValue = `${date1} - ${date2}`;
                }else{
                    this.dateInputValue = dateFormat(this.dateValue[0], this.format);
                }
            },
        },
        watch: {
            dateValue(newVal){
                this.updateInputValue();
                if(this.isRange){
                    this.$emit('input', newVal);
                }else{
                    this.$emit('input', newVal[0]);
                }
            }
        }
    }
</script>
