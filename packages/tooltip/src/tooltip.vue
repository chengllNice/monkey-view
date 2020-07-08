<template>
    <div :class="[`${classPrefix}`]"
         @mouseenter="handlerMouseenter"
         @mouseleave="handlerMouseleave">
        <transition :name="transition">
            <div :class="[`${classPrefix}__popper`]"
                 ref="popper"
                 @mouseenter="handlerPopperMouseenter"
                 @mouseleave="handlerPopperMouseleave"
                 v-show="!disabled && (visible || always)">
                <div :class="[`${classPrefix}__content`]">
                    <div :class="[`${classPrefix}__arrow`]" v-if="!this.backgroundColor"></div>
                    <div :class="[`${classPrefix}__inner`]" :style="expandStyle">
                        <slot name="content">{{content}}</slot>
                    </div>
                </div>
            </div>
        </transition>
        <div :class="[`${classPrefix}__target`]"
             ref="reference">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Popper from 'main/mixins/popper'

    export default {
        name: "Tooltip",
        mixins: [Popper],
        props: {
            placement: {
                type: String,
                default: 'bottom'
            },
            transition: {
                type: String,
                default: 'fade'
            },
            content: String,
            backgroundColor: String,
            textColor: String,
            value: Boolean,
            disabled: Boolean,
            maxWidth: [String, Number],
            always: Boolean,
            renderHtml: {
                type: [HTMLElement, Boolean],
                default: function () {
                    return false
                }
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-tooltip',
                hoverTimer: null,
                popperHover: false,
                targetHover: false,
            }
        },
        computed: {
            expandStyle() {
                let style = {
                    'background-color': this.backgroundColor,
                    'color': this.textColor
                };
                if (this.maxWidth !== undefined) {
                    let maxWidth = parseFloat(this.maxWidth) + 'px';
                    return {'max-width': maxWidth, ...style}
                }
                return style
            }
        },
        components: {},
        created() {

        },
        mounted() {
            this.renderToHtml();
            if (this.always) {
                this.updatePopper();
            }
        },
        beforeDestroy() {
            this.renderHtml && typeof this.renderHtml !== 'boolean' && this.renderHtml.removeChild(this.$refs.popper);
        },
        methods: {
            handlerMouseenter() {
                if (this.disabled) return;
                this.targetHover = true;
                if (this.hoverTimer) clearTimeout(this.hoverTimer);
                this.hoverTimer = setTimeout(() => {
                    this.visible = true;
                }, 100);
            },

            handlerMouseleave() {
                if (this.disabled) return;
                this.targetHover = false;
                if (this.hoverTimer) {
                    clearTimeout(this.hoverTimer);
                    this.hoverTimer = setTimeout(() => {
                        this.visible = this.popperHover;
                    }, 100);
                }
            },

            handlerPopperMouseenter() {
                if (this.disabled) return;
                this.popperHover = true;
                if (this.hoverTimer) clearTimeout(this.hoverTimer);
                this.hoverTimer = setTimeout(() => {
                    this.visible = true;
                }, 100);
            },

            handlerPopperMouseleave() {
                if (this.disabled) return;
                this.popperHover = false;
                if (this.hoverTimer) {
                    clearTimeout(this.hoverTimer);
                    this.hoverTimer = setTimeout(() => {
                        this.visible = this.targetHover;
                    }, 100);
                }
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
