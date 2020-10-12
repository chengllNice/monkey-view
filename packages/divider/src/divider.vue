<template>
    <div :class="[`${classPrefix}`]">
        <span :class="[`${classPrefix}__inner`]"><slot></slot></span>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "Divider",
        data() {
            return {
                classPrefix: Config.classPrefix + '-divider',
            }
        },
    }
</script>
