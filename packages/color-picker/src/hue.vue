<template>
    <div :class="[`${classPrefix}`]"></div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "Hue",
        data() {
            return {
                classPrefix: Config.classPrefix + '-hue',
            }
        },
    }
</script>
