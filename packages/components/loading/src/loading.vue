<template>
    <transition name="fade">
        <div class=""
             :class="[
                'cl-loading',
                size && `cl-loading--${size}`,
                (fix || fullscreen) && `cl-loading--fix`,
                fullscreen && `cl-loading--fullscreen`,
             ]"
             v-if="showLoading">
            <div class="cl-loading__content">
                <slot>
                    <i v-if="type === 'loading1'" class="cl-icon-loading1 cl-rotate cl-loading__icon-font"></i>
                    <div v-else class="cl-loading__icon"></div>
                </slot>
                <div class="cl-loading__text" v-if="text || $slots.text"><slot name="text">{{text}}</slot></div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "ClLoading",
        props: {
            visible: {
                type: Boolean,
                default: false,
            },
            type: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['default', 'loading1'].includes(value);
                }
            },
            text: String,
            size: {
                type: String,
                default: 'default',
                validator(value){
                    return ['mini', 'small', 'default', 'large'].includes(value)
                }
            },
            fix: {
                type: Boolean,
                default: false,
            },//固定 此时会相对于最近的定位父及元素定位 如果没有定位父及元素则相对于body定位
            fullscreen: {
                type: Boolean,
                default: false,
            },//覆盖整个屏幕
        },
        data(){
            return {
                showLoading: this.visible
            }
        },
        methods: {
            show(){
                this.showLoading = true;
            },
            close(){
                this.showLoading = false;
            }
        },
        watch: {
            visible(newVal){
                this.showLoading = newVal;
            }
        }
    }
</script>