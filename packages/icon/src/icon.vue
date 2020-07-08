<template>
    <i :class="[`${classPrefix}-${type}`, `${customIcon}`]"></i>
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
        }
    }
</script>