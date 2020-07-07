<template>
    <div class="cl-dropdown"
         v-click-outside.capture="handleClose"
         @mouseenter="handleMouseEnter"
         @mouseleave="handleMouseLeave">
        <div ref="reference" @click="handleClick" @contextmenu.prevent="handleRightClick">
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
        name: "Dropdown",
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
                    return ['hover', 'click', 'contextmenu', 'custom'].includes(value)
                }
            },
            visible: {
                type: Boolean,
                default: false
            },
            renderHtml: {
                type: [HTMLElement, Boolean],
                default: false,
            }
        },
        data(){
            return {
                componentName: 'Dropdown',
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
            handleRightClick(){
                if(this.trigger === 'contextmenu'){
                    this.changeDropDown(!this.currentVisible);
                }
            },
            handleClose(event){
                if(this.trigger === 'click' || this.trigger === 'contextmenu'){
                    if(this.currentVisible){
                        if(this.renderHtml !== false){
                            const {$el} = this.$refs.dropDown;
                            if ($el !== event.target && !$el.contains(event.target)) {
                                this.changeDropDown();
                                return;
                            }
                        }
                        this.changeDropDown();
                    }
                }
                this.$emit('click-outside', event);
            },
            changeDropDown(visible){
                this.currentVisible = visible || false;
                this.$emit('update:visible', this.currentVisible);
            },
            itemClick(name){
                this.changeDropDown();
                this.$emit('click-item', name);
            }
        },
        watch: {
            visible(newVal){
                this.currentVisible = newVal;
                this.$emit('visible-change', newVal);
            }
        }
    }
</script>
