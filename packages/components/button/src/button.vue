<template>
    <button
            class="cl-button"
            @click="clickHandler"
            :disabled="disabled"
            :class="[
            type ? 'cl-button--' + type : '',
            size ? 'cl-button--' + size : '',
            block ? 'cl-button--block' : '',
            circle ? 'cl-button--circle' : '',
            circle && !onlyIconCircle ? 'cl-button--circle-text' : '',
            {
                'is-disabled': disabled,
                'is-loading': loading
            }
        ]">
        <i v-if="loading" class="cl-icon-loading1 cl-rotate"></i>
        <i v-else-if="icon" :class="[`${icon}`]"></i>
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script>
    export default {
        name: "ClButton",
        props: {
            disabled: Boolean,
            type: {
                type: String,
                default: 'default'
            },
            size: {
                type: String,
                default: ''
            },
            block: Boolean,
            loading: Boolean,
            circle: Boolean,
            icon: String
        },
        data() {
            return {
                onlyIconCircle: true,//是否只是icon的circle
            }
        },
        computed: {},
        components: {},
        created() {
        },
        mounted() {
            this.$nextTick(()=>{
                this.isOnlyIconCircle();
            })
        },
        methods: {
            isOnlyIconCircle(){
                let slotDefault = this.$slots.default;
                if(slotDefault){
                    slotDefault.forEach(item=>{
                        if(item.text){
                            this.onlyIconCircle = false
                        }
                    })
                }
            },
            clickHandler() {
                if (this.disabled || this.loading) return;
                this.$emit('click');
            }
        }
    }
</script>
