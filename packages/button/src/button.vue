<template>
    <button @click="clickHandler"
            :disabled="disabled"
            :class="[
                `${classPrefix}`,
                type && `${classPrefix}--type-${type}`,
                size && `${classPrefix}--size-${size}`,
                block && `${classPrefix}--block`,
                circle && `${classPrefix}--circle`,
                circle && !onlyIconCircle && `${classPrefix}--circle-text`,
                {
                    'is-disabled': disabled,
                    'is-loading': loading
                }
            ]">
        <Icon v-if="loading" type="loading" :class="`${prefix}-rotate`"></Icon>
        <Icon v-else-if="icon" :type="icon"></Icon>
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script>
    import Config from 'main/config/config'
    import Icon from 'packages/icon'

    export default {
        name: "Button",
        props: {
            disabled: Boolean,
            type: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['primary', 'default', 'warning', 'danger', 'success', 'info', 'text'].includes(value);
                }
            },
            size: {
                type: String,
                default: 'default',
                validator(value){
                    return ['mini', 'small', 'default', 'large'].includes(value)
                }
            },
            block: Boolean,
            loading: Boolean,
            circle: Boolean,
            icon: String,
        },
        data() {
            return {
                prefix: Config.classPrefix,
                classPrefix: Config.classPrefix + '-button',
                onlyIconCircle: true,//是否只是icon的circle
            }
        },
        computed: {},
        components: {
            Icon
        },
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
            clickHandler(event) {
                if (this.disabled || this.loading) return;
                this.$emit('click', event);
            }
        }
    }
</script>
