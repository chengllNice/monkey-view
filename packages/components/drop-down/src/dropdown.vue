<template>
    <div class="cl-dropdown" v-click-outside.capture="handleClose">
        <div ref="reference" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @click="handleClick">
            <slot></slot>
        </div>
        <transition :name="transition">
            <DropDown ref="dropDown"
                      v-show="visible"
                      v-model="visible"
                      :reference="this.$refs.reference"
                      :placement="placement"
                      :render-html="renderHtml"
                      :dropdownMatchSelectWidth="dropdownMatchSelectWidth">
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
            renderHtml: {
                type: [HTMLElement, Boolean],
                default: true,
            }
        },
        data(){
            return {
                visible: false,
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
                    this.visible = true;
                }
            },
            handleMouseLeave(){
                if(this.trigger === 'hover'){
                    this.visible = false;
                }
            },
            handleClick(){
                if(this.trigger === 'click'){
                    this.visible = !this.visible;
                }
            },
            handleClose(event){
                if(this.trigger === 'click'){
                    if(this.visible){
                        if(this.renderHtml !== false){
                            const {$el} = this.$refs.dropDown;
                            if ($el !== event.target && !$el.contains(event.target)) {
                                this.visible = false;
                            }
                        }
                    }else{
                        this.visible = false;
                    }
                }
            }
        }
    }
</script>