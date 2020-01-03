<template>
    <div class="cl-dropdown"
         v-click-outside.capture="handleClose"
         @mouseenter="handleMouseEnter"
         @mouseleave="handleMouseLeave">
        <div ref="reference" @click="handleClick">
            <slot></slot>
        </div>
        <transition :name="transition">
            <DropDown ref="dropDown"
                      v-show="currentVisible"
                      v-model="currentVisible"
                      :reference="this.$refs.reference"
                      :placement="placement"
                      :render-html="renderHtml"
                      :dropdownMatchSelectWidth="dropdownMatchSelectWidth"
                      @mouseenter.native="handleMouseEnter"
                      @mouseleave.native="handleMouseLeave">
                <slot name="menu"></slot>
            </DropDown>
        </transition>
    </div>
</template>

<script>
    import DropDown from '../../select/src/drop-down.vue'
    import {directive as clickOutside} from 'v-click-outside-x';
    export default {
        name: "ClDropdown",
        directives: {clickOutside},
        props: {
            transition: {
                type: String,
                default: 'slideUp'
            },
            placement: {
                type: String,
                default: 'bottom-start'
            },
            dropdownMatchSelectWidth: {
                type: Boolean,
                default: true
            },
            trigger: {
                type: String,
                default: 'hover',
                validator(value){
                    return ['hover', 'click'].includes(value)
                }
            },
            visible: {
                type: Boolean,
                default: false
            },
            renderHtml: {
                type: [HTMLElement, Boolean],
                default: true,
            }
        },
        data(){
            return {
                componentName: 'ClDropdown',
                currentVisible: this.visible,
                timer: null,
            }
        },
        components: {
            DropDown
        },
        mounted(){

        },
        methods: {
            handleMouseEnter(){
                if(this.trigger === 'hover'){
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.changeDropDown(true);
                    }, 200);
                }
            },
            handleMouseLeave(){
                if(this.trigger === 'hover'){
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.changeDropDown();
                    }, 100);
                }
            },
            handleClick(){
                if(this.trigger === 'click'){
                    this.changeDropDown(!this.currentVisible);
                }
            },
            handleClose(event){
                if(this.trigger === 'click'){
                    if(this.currentVisible){
                        if(this.renderHtml !== false){
                            const {$el} = this.$refs.dropDown;
                            if ($el !== event.target && !$el.contains(event.target)) {
                                this.changeDropDown();
                            }
                        }
                    }else{
                        this.changeDropDown();
                    }
                }
            },
            changeDropDown(visible){
                this.currentVisible = visible || false;
                this.$emit('update:visible', this.currentVisible);
            }
        },
    }
</script>