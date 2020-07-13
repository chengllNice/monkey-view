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
                classPrefix: Config.classPrefix,
            }
        },
        computed: {
            iconClass(){
                let isPrefix = this.type.indexOf(this.classPrefix) === 0;
                return [
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