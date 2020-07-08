<template>
    <div :class="[`${classPrefix}`]">
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "Footer",
        data() {
            return {
                classPrefix: Config.classPrefix + '-footer',
            }
        },
        computed: {},
        components: {},
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>
