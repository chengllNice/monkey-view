<template>
    <transition :appear="appear"
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterEnter"

                v-on:before-leave="beforeLeave"
                v-on:leave="leave"
                v-on:after-leave="afterLeave">
        <slot></slot>
    </transition>
</template>

<script>
    export default {
        name: 'SlideTransition',
        props: {
            appear: Boolean,
            transitionClass: {
                type: String,
                default: 'slide-transition'
            }
        },
        methods: {
            // --------
            // 进入中
            // --------
            beforeEnter(el) {
                el.classList.add(this.transitionClass);

                if (!el.originStyle) el.originStyle = {};
                el.originStyle.paddingTop = el.style.paddingTop;
                el.originStyle.paddingBottom = el.style.paddingBottom;

                el.style.height = '0px';
                el.style.paddingTop = '0px';
                el.style.paddingBottom = '0px';
            },
            enter(el) {
                el.originStyle.overflow = el.style.overflow;
                if (el.scrollHeight !== 0) {
                    el.style.height = el.scrollHeight + 'px';
                    el.style.paddingTop = el.originStyle.paddingTop;
                    el.style.paddingBottom = el.originStyle.paddingBottom;
                } else {
                    el.style.height = '';
                    el.style.paddingTop = el.originStyle.paddingTop;
                    el.style.paddingBottom = el.originStyle.paddingBottom;
                }
                el.style.overflow = 'hidden';
            },
            afterEnter(el) {
                el.classList.remove(this.transitionClass);
                el.style.height = '';
                el.style.overflow = el.originStyle.overflow;
            },
            // --------
            // 离开时
            // --------
            beforeLeave(el) {
                if (!el.originStyle) el.originStyle = {};
                el.originStyle.paddingTop = el.style.paddingTop;
                el.originStyle.paddingBottom = el.style.paddingBottom;
                el.originStyle.overflow = el.style.overflow;

                el.style.height = el.scrollHeight + 'px';
                el.style.overflow = 'hidden';
            },
            leave(el) {
                if (el.scrollHeight !== 0) {
                    el.classList.add(this.transitionClass);
                    el.style.height = '0px';
                    el.style.paddingTop = '0px';
                    el.style.paddingBottom = '0px';
                }
            },
            afterLeave(el) {
                el.classList.remove(this.transitionClass);
                el.style.height = '';
                el.style.paddingTop = el.originStyle.paddingTop;
                el.style.paddingBottom = el.originStyle.paddingBottom;
                el.style.overflow = el.originStyle.overflow;
            }
        }
    }
</script>
