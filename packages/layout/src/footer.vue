<template>
    <footer :class="[`${classPrefix}`]" :style="expandStyle">
        <slot></slot>
    </footer>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "Footer",
        props: {
            height: {
                type: [String, Number],
                default: 60
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-footer',
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
