<template>
    <div class="cl-drop-down" :style="expandStyle">
        <slot></slot>
    </div>
</template>

<script>
    import Vue from 'vue'

    const isServer = Vue.prototype.$isServer;
    const Popper = isServer ? function () {
    } : require('popper.js/dist/umd/popper.js');
    export default {
        name: "DropDown",
        props: {
            dropdownMatchSelectWidth: Boolean,
            isMinWidth: {
                type: Boolean,
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
            renderHtml: {
                type: [HTMLElement, Boolean],
                default: function () {
                    return false
                }
            }
        },
        data() {
            return {
                visible: false,
                width: '',
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
            selectParentEl() {
                let parent = this.$parent;
                while (parent) {
                    if (parent.componentName !== 'Select') {
                        parent = parent.$parent;
                    } else {
                        return parent
                    }
                }
                return false
            },
            expandStyle() {
                return {
                    width: this.dropdownMatchSelectWidth ? this.width : 'auto',
                    minWidth: this.isMinWidth ? this.width : '',
                }
            },
        },
        components: {},
        created() {
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

                options.placement = this.placement;
                !options.modifiers.offset && (options.modifiers.offset = {});
                options.onCreate = () => {
                    this.$nextTick(this.updatePopper);
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
            this.renderHtml && typeof this.renderHtml !== 'boolean' && this.renderHtml.removeChild(this.$el);
            this.renderHtml && typeof this.renderHtml === 'boolean' && document.body.removeChild(this.$el);
        }
    }
</script>
