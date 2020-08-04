<template>
    <div :class="[
            `${classPrefix}`,
            iconPosition && `${classPrefix}--${iconPosition}`,
            type && `${classPrefix}--${type}`,
         ]">
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Emitter from 'main/mixins/emitter'

    export default {
        name: "Collapse",
        mixins: [Emitter],
        props: {
            value: [String, Array],
            accordion: Boolean,
            type: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['default', 'simple'].includes(value)
                }
            },
            iconPosition: {
                type: String,
                default: 'left',
                validator(value) {
                    return ['left', 'right'].includes(value)
                }
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-collapse',
                componentName: 'Collapse',
                currentOpenedKey: []
            }
        },
        mounted() {
            this.initOpenedKey();
            this.$on('on-update-opened-key', (key) => {
                this.updateOpenedKey(key);
            })
        },
        methods: {
            initOpenedKey() {
                this.currentOpenedKey = typeof this.value === "string" ? [this.value] : this.value;
            },
            updateOpenedKey(key) {
                if (this.accordion) {
                    if (Array.isArray(this.currentOpenedKey) && this.currentOpenedKey.includes(key)) {
                        this.currentOpenedKey = [];
                    } else {
                        this.currentOpenedKey = [key]
                    }
                } else {
                    if (Array.isArray(this.currentOpenedKey) && this.currentOpenedKey.includes(key)) {
                        let index = this.currentOpenedKey.indexOf(key);
                        this.currentOpenedKey.splice(index, 1)
                    } else {
                        this.currentOpenedKey.push(key)
                    }
                }
                if (!this.currentOpenedKey) this.currentOpenedKey = [];

                let inputKey = this.currentOpenedKey;
                if (this.accordion) {
                    inputKey = this.currentOpenedKey.length ? key : ''
                }
                this.$emit('input', inputKey);
                this.$emit('change', key, this.currentOpenedKey);
            }
        },
        watch: {
            value() {
                this.initOpenedKey();
            }
        }
    }
</script>
