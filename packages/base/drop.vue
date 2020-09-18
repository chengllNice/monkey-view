<template>
    <div :class="[`${classPrefix}`]" :style="expandStyle">
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Vue from 'vue'

    const isServer = Vue.prototype.$isServer;
    const Popper = isServer ? function () {
    } : require('popper.js/dist/umd/popper.js');


    export default {
        name: "Drop",
        props: {
            //是否和选择器同宽
            dropdownMatchSelectWidth: Boolean,
            //最小宽为选择器的宽度
            minWidth: {
                type: [Boolean, Number],
                default: true
            },
            placement: {
                type: String,
                default: 'bottom-start'
            },
            reference: {},//触发元素
            popper: {},
            value: {
                type: Boolean,
                default: false
            },
            options: {
                type: Object,
                default: function () {
                    return {
                        modifiers: {
                            computeStyle: {
                                gpuAcceleration: false,
                            },
                            preventOverflow: {
                                boundariesElement: 'window'
                            }
                        }
                    }
                }
            },
            //false渲染到当前位置 true渲染到body中 html类型渲染到指定位置
            renderHtml: {
                type: [HTMLElement, Boolean],
                default: function () {
                    return false
                }
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-drop',
                visible: false,
                width: '',
                boundariesElement: null,
            }
        },
        watch: {
            value: function (newVal) {
                this.visible = newVal;
            },
            visible: function (newVal) {
                if (newVal) {
                    this.$nextTick(this.updatePopper());
                    this.$emit('on-show')
                } else {
                    this.$emit('on-hide')
                }
                this.$emit('input', newVal);
            }
        },
        computed: {
            expandStyle() {
                return {
                    width: this.dropdownMatchSelectWidth ? this.width : 'auto',
                    minWidth: this.minWidth === true ? this.width : (this.minWidth ? (parseInt(this.minWidth) + 'px') : ''),
                }
            },
        },
        mounted() {
            this.visible = this.value;
            this.$nextTick(() => {
                this.setWidth();
                this.renderToHtml();
            });
        },
        methods: {
            setWidth() {
                let width = this.$parent && this.$parent.$el && (this.$parent.$el.offsetWidth || 0);
                this.width = width + 'px';
            },
            createPopper() {
                if (isServer) return;
                // this.boundariesElement = document.getElementsByClassName('views-main-content')[0];

                if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.placement)) {
                    return;
                }


                const options = this.options;
                const clPopper = this.$el;
                const reference = this.reference || this.$parent.$refs.reference;

                if (!clPopper || !reference) return;

                if (this.popperJS && this.popperJS.hasOwnProperty('destroy')) {
                    this.popperJS.destroy();
                }

                // options.modifiers.preventOverflow.boundariesElement = this.boundariesElement || 'window';

                options.placement = this.placement;
                !options.modifiers.offset && (options.modifiers.offset = {});
                options.onCreate = () => {
                    this.$nextTick(() => this.updatePopper());
                };

                this.popperJS = new Popper(reference, clPopper, options);
            },
            updatePopper() {
                if (isServer) return;
                this.setWidth();
                this.popperJS ? this.popperJS.update() : this.$nextTick(this.createPopper());
            },
            renderToHtml(){
                if((typeof this.renderHtml === 'boolean' && this.renderHtml === false) || !this.renderHtml) return;
                if((typeof this.renderHtml === 'boolean' && this.renderHtml === true)){
                    document.body.appendChild(this.$el);
                }else{
                    this.renderHtml.appendChild(this.$el);
                }
            },
        },
        updated() {
            this.$nextTick(() => {
                this.updatePopper();
            });
        },
        destroyed() {
            if (isServer) return;
            if (this.popperJS && this.popperJS.hasOwnProperty('destroy')) {
                this.popperJS.destroy();
            }
            // this.renderHtml && typeof this.renderHtml !== 'boolean' && this.$el.parentNode && this.renderHtml.removeChild(this.$el);
            // this.renderHtml && typeof this.renderHtml === 'boolean' && this.$el.parentNode && document.body.removeChild(this.$el);
        }
    }
</script>
