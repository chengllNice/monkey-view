<template>
    <div :class="[`${classPrefix}`]"
         v-click-outside.capture="handleClickOutside"
         @mouseenter="handleMouseEnter"
         @mouseleave="handleMouseLeave">
        <div ref="reference" @click="handleClick" @contextmenu.prevent="handleRightClick">
            <slot></slot>
        </div>
        <transition :name="transition">
            <Drop ref="dropDown"
                  v-show="currentVisible"
                  v-model="currentVisible"
                  :reference="this.$refs.reference"
                  :placement="placement"
                  :render-html="renderHtml"
                  :dropdownMatchSelectWidth="dropdownMatchSelectWidth"
                  @mouseenter.native="handleMouseEnter"
                  @mouseleave.native="handleMouseLeave">
                <slot name="menu"></slot>
            </Drop>
        </transition>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Drop from 'packages/base/drop'
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
                validator(value) {
                    return ['hover', 'click', 'contextmenu', 'custom'].includes(value)
                }
            },
            visible: {
                type: Boolean,
                default: false
            },
            hideOnClick: {
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
                classPrefix: Config.classPrefix + '-dropdown',
                componentName: 'Dropdown',
                currentVisible: this.visible,
                timer: null,
            }
        },
        components: {
            Drop
        },
        mounted() {

        },
        methods: {
            handleMouseEnter() {
                if (this.trigger === 'hover') {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.changeDropDown(true);
                    }, 200);
                }
            },
            handleMouseLeave() {
                if (this.trigger === 'hover') {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.changeDropDown();
                    }, 100);
                }
            },
            handleClick() {
                if (this.trigger === 'click') {
                    this.changeDropDown(!this.currentVisible);
                }
            },
            handleRightClick() {
                if (this.trigger === 'contextmenu') {
                    this.changeDropDown(!this.currentVisible);
                }
            },
            handleClickOutside(event) {
                if (this.currentVisible) {
                    if (this.trigger === 'click' || this.trigger === 'contextmenu') {
                        const {$el} = this.$refs.dropDown;
                        if ($el !== event.target && !$el.contains(event.target)) {
                            this.changeDropDown();
                            return;
                        }
                        if(this.hideOnClick) this.changeDropDown();
                    }
                    this.$emit('click-outside', event);
                }
            },
            changeDropDown(visible) {
                this.currentVisible = visible || false;
                this.$emit('update:visible', this.currentVisible);
            },
            itemClick(name) {
                if(this.hideOnClick) this.changeDropDown();
                this.$emit('click', name);
            }
        },
        watch: {
            visible(newVal) {
                this.currentVisible = newVal;
                this.$emit('visible-change', newVal);
            }
        }
    }
</script>
