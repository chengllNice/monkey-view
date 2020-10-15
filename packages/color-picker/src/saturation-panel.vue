<template>
    <div :class="[`${classPrefix}`]"></div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "SaturationPanel",
        data() {
            return {
                classPrefix: Config.classPrefix + '-saturation-panel',
            }
        },
    }
</script>
