<template>
    <i :class="iconClass" @click="handleClick" :style="iconStyle"></i>
</template>

<script>
    import Config from 'main/config/config'
    export default {
        name: "Icon",
        props: {
            type: String,
            customIcon: String,
            size: [String, Number],
            color: String
        },
        data(){
            return {
                classPrefix: `${Config.classPrefix}-icon`,
            }
        },
        computed: {
            iconClass(){
                let isPrefix = this.type && this.type.indexOf(this.classPrefix) === 0;
                return [
                    this.type && `${this.classPrefix}`,
                    this.customIcon && `${this.customIcon}`,
                    this.type && isPrefix && `${this.type}`,
                    this.type && !isPrefix && `${this.classPrefix}-${this.type}`,
                ]
            },
            iconStyle(){
                return {
                    fontSize: parseFloat(this.size) + 'px',
                    color: this.color
                }
            }
        },
        methods: {
            handleClick(event){
                this.$emit('click', event)
            }
        }
    }
</script>