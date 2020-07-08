<template>
    <div :class="[`${classPrefix}`]">
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "Content",
        data() {
            return {
                classPrefix: Config.classPrefix + '-content',
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
