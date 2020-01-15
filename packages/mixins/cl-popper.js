import Vue from 'vue'

const isServer = Vue.prototype.$isServer;
const Popper = isServer ? function () {
} : require('popper.js/dist/umd/popper.js');

export default {
    props: {
        placement: {
            type: String,
            default: 'bottom'
        },
        reference: Object,//触发元素
        popper: Object,
        offset: {
            type: Number,
            default: 0
        },
        value: {
            type: Boolean,
            default: false
        },
        transition: String,
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
                        },
                    }
                }
            }
        }
    },

    data() {
        return {
            visible: false,
            popperJS: null
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

    mounted() {
        this.visible = this.value;
    },

    methods: {
        createPopper() {
            if (isServer) return;

            if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.placement)) {
                return;
            }


            const options = this.options;
            const clPopper = this.popper || this.$refs.popper;
            const reference = this.reference || this.$refs.reference;

            if (!clPopper || !reference) return;
            if(this.renderHtml === false){
                options.eventsEnabled = false;
            }

            if (this.popperJS && this.popperJS.hasOwnProperty('destroy')) {
                this.popperJS.destroy();
            }


            options.placement = this.placement;
            !options.modifiers.offset && (options.modifiers.offset = {});
            options.modifiers.offset.offset = 0;
            options.onCreate = () => {
                this.$nextTick(this.updatePopper);
                this.$emit('created', this);
            };

            this.popperJS = new Popper(reference, clPopper, options);
        },
        updatePopper() {
            if (isServer) return;
            this.popperJS ? this.popperJS.update() : this.$nextTick(this.createPopper());
        }
    },
    updated() {
        this.$nextTick(this.updatePopper());
    },
    beforeDestroy() {
        if (isServer) return;
        if (this.popperJS && this.popperJS.hasOwnProperty('destroy')) {
            this.popperJS.destroy();
        }
    }
}
