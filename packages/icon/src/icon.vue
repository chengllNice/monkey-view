<template>
    <i :class="iconClass" @click="handleClick"></i>
</template>

<script>
    import Config from 'main/config/config'
    export default {
        name: "Icon",
        props: {
            type: String,
            customIcon: String
        },
        data(){
            return {
                prefix: Config.classPrefix,
                classPrefix: `${Config.classPrefix}-icon`,
            }
        },
        computed: {
            iconClass(){
                let isPrefix = this.type && this.type.indexOf(this.prefix) === 0;
                return [
                    `${this.classPrefix}`,
                    this.customIcon && `${this.customIcon}`,
                    isPrefix && `${this.type}`,
                    !isPrefix && `${this.classPrefix}-${this.type}`,
                ]
            }
        },
        methods: {
            handleClick(event){
                this.$emit('click', event)
            }
        }
    }
</script>