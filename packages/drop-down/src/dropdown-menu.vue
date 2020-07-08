<template>
    <div :class="[`${classPrefix}`]">
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "DropdownMenu",

        data(){
            return {
                classPrefix: Config.classPrefix + '-dropdown-meun',
            }
        },

        mounted(){

        },
        methods: {

        }
    }
</script>