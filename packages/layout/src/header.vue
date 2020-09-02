<template>
    <div :class="[`${classPrefix}`]" :style="expandStyle">
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "Header",
        props: {
            height: [String, Number]
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-header',
            }
        },
        computed: {
            expandStyle() {
                return {
                    'height': parseFloat(this.height) + 'px',
                    'line-height': parseFloat(this.height) + 'px',
                }
            }
        }
    }
</script>
