<template>
    <div :class="[
            'cl-date-picker',
            size && `cl-date-picker--${size}`
         ]"
         v-click-outside.capture="handleClose">
        <div class="cl-date-picker__reference" ref="reference">
            <cl-input v-model="dateValue"
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
                      v-model="visible">
                <div class="cl-date-picker__drop-down-inner">
                    <cl-date-pane :size="size" :format="format"></cl-date-pane>
                </div>
            </DropDown>
        </transition>
    </div>
</template>

<script>
    import {directive as clickOutside} from 'v-click-outside-x';
    import DropDown from '../../select/src/drop-down.vue'
    import ClDatePane from './pane/date-pane.vue'

    export default {
        name: "ClDatePicker",
        directives: {clickOutside},
        props: {
            type: {
                type: String,
                default: 'date',
                validator(value){
                    return ['date', 'daterange'].includes(value)
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
            }
        },
        data(){
            return {
                dateValue: '',
                visible: true
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
            handleClose(){
                this.visible = false;
            },
            openDropDown(){

            }
        }
    }
</script>