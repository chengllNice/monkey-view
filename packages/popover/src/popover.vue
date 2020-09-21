<template>
    <div :class="[`${classPrefix}`]"
         @mouseenter="handleMouseenter"
         @mouseleave="handleMouseleave"
         v-click-outside="handleClose">
        <transition :name="transition">
            <div :class="[`${classPrefix}__popper`]"
                 ref="popper"
                 @mouseenter="handleMouseenter"
                 @mouseleave="handleMouseleave"
                 v-show="visible">
                <div :class="[`${classPrefix}__content`]" :style="expandStyle">
                    <div :class="[`${classPrefix}__arrow`]"></div>
                    <div :class="[`${classPrefix}__inner`, `${classPrefix}__confirm`]" v-if="confirm">
                        <div :class="[`${classPrefix}__title`]" v-if="showTitle">
                            <slot name="title"><Icon type="question-fill"></Icon>{{title}}</slot>
                        </div>
                        <div :class="[`${classPrefix}__body`]">
                            <Button size="mini" type="text" @click="cancelClick">{{localeCancelText}}</Button>
                            <Button size="mini" type="primary" @click="okClick">{{localeOkText}}</Button>
                        </div>
                    </div>
                    <div :class="[`${classPrefix}__inner`]" v-else>
                        <div :class="[`${classPrefix}__title`]" v-if="showTitle">
                            <slot name="title">{{title}}</slot>
                        </div>
                        <div :class="[
                            `${classPrefix}__body`,
                            wordWrap && `${classPrefix}__body-wrap`
                        ]">
                            <div v-if="!$slots.content">{{content}}</div>
                            <slot name="content"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div :class="[`${classPrefix}__target`]"
             @click="handleClick"
             ref="reference">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Popper from 'main/mixins/popper'
    import {directive as clickOutside} from 'v-click-outside-x';
    import {on, off} from "main/utils/dom";
    import Locale from 'main/mixins/locale'
    import Icon from 'packages/icon'
    import Button from 'packages/button'

    export default {
        name: "Popover",
        mixins: [Popper, Locale],
        directives: {clickOutside},
        props: {
            placement: {
                type: String,
                default: 'top'
            },
            trigger: {
                type: String,
                default: 'click',
                validator(value) {
                    return ['hover', 'click', 'focus'].includes(value)
                }
            },
            title: String,
            content: String,
            width: [String, Number],
            wordWrap: Boolean,
            disabled: Boolean,
            transition: {
                type: String,
                default: 'fade'
            },
            confirm: Boolean,
            cancelText: {
                type: String,
                default: ''
            },
            okText: {
                type: String,
                default: ''
            },
            renderHtml: {
                type: [HTMLElement, Boolean],
                default: function () {
                    return false
                }
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-popover',
                hoverTimer: null,//hover延时
                isInput: false,
                popperHover: false,
            }
        },
        computed: {
            showTitle() {
                return this.title || this.$slots.title;
            },
            expandStyle() {
                if (this.width === undefined) return {};
                let width = this.width.toString().includes('px') ? this.width : this.width + 'px';
                return Object.assign({}, {width: width})
            },
            localeCancelText() {
                if (!this.cancelText) {
                    return this.t('cl.popover.cancelText')
                } else {
                    return this.cancelText
                }
            },
            localeOkText() {
                if (!this.okText) {
                    return this.t('cl.popover.okText')
                } else {
                    return this.okText
                }
            },
        },
        components: {
            Icon,
            Button
        },
        created() {
        },
        mounted() {
            if (this.trigger === 'focus') {
                this.$nextTick(() => {
                    const $children = this.getReferenceInputChildren();
                    if ($children) {
                        this.isInput = true;
                        on($children, 'focus', this.handleFocus);
                        on($children, 'blur', this.handleBlur);
                    } else {
                        on(this.$refs.reference, 'mousedown', () => this.handleFocus(false));
                        on(document, 'mouseup', () => this.handleBlur(false));
                    }
                });
            }
            this.renderToHtml();
        },
        beforeDestroy() {
            if (this.hoverTimer) clearTimeout(this.hoverTimer);
            const $children = this.getReferenceInputChildren();
            if ($children) {
                off($children, 'focus', this.handleFocus);
                off($children, 'blur', this.handleBlur);
            } else {
                off(this.$refs.reference, 'mousedown', () => this.handleFocus(false));
                off(document, 'mouseup', () => this.handleBlur(false));
            }
            this.renderHtml && typeof this.renderHtml !== 'boolean' && this.renderHtml.removeChild(this.$refs.popper);
        },
        methods: {
            handleClick() {
                if (this.disabled) return;
                if (this.trigger !== 'click') {
                    return false;
                }
                this.visible = !this.visible;
            },

            handleMouseenter() {
                if (this.disabled) return;
                this.popperHover = true;
                if (this.trigger !== 'hover') {
                    return false;
                }
                if (this.hoverTimer) clearTimeout(this.hoverTimer);
                this.hoverTimer = setTimeout(() => {
                    this.visible = true;
                }, 100);
            },

            handleMouseleave() {
                if (this.disabled) return;
                this.popperHover = false;
                if (this.trigger !== 'hover') {
                    return false;
                }
                if (this.hoverTimer) {
                    clearTimeout(this.hoverTimer);
                    this.hoverTimer = setTimeout(() => {
                        this.visible = false;
                    }, 100);
                }
            },

            handleClose() {
                if (this.disabled) return;
                if (this.trigger !== 'click') {
                    return false;
                }
                if (this.popperHover) {
                    return false;
                }
                this.visible = false;
            },

            cancelClick() {
                this.visible = false;
                this.$emit('cancel')
            },

            okClick() {
                this.visible = false;
                this.$emit('ok')
            },

            getReferenceInputChildren() {
                const $input = this.$refs.reference.querySelectorAll('input');
                const $textarea = this.$refs.reference.querySelectorAll('textarea');
                let $children = null;

                if ($input.length) {
                    $children = $input[0];
                } else if ($textarea.length) {
                    $children = $textarea[0]
                }
                return $children;
            },

            handleFocus(isInput = true) {
                if (this.disabled) return;
                if (this.trigger !== 'focus' || (this.isInput && !isInput)) {
                    return false;
                }
                this.visible = true;
            },

            handleBlur(isInput = true) {
                if (this.trigger !== 'focus' || (this.isInput && !isInput)) {
                    return false;
                }
                this.visible = false;
            },

            renderToHtml() {
                if ((typeof this.renderHtml === 'boolean' && this.renderHtml === false) || !this.renderHtml) return;
                if ((typeof this.renderHtml === 'boolean' && this.renderHtml === true)) {
                    document.body.appendChild(this.$refs.popper);
                } else {
                    this.renderHtml.appendChild(this.$refs.popper);
                }
            },
        }
    }
</script>
