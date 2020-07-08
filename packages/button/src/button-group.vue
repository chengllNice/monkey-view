<template>
    <div :class="[`${classPrefix}`]">
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "ButtonGroup",
        data() {
            return {
                classPrefix: Config.classPrefix + '-button-group',
            }
        },
    }
</script>
