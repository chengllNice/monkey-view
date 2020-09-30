<template>
    <header :class="[`${classPrefix}`]" :style="expandStyle">
        <slot></slot>
    </header>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: 'Header',
        props: {
            height: {
                type: [String, Number],
                default: 60
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-header'
            }
        },
        computed: {
            expandStyle() {
                return {
                    height: parseFloat(this.height) + 'px',
                    'line-height': parseFloat(this.height) + 'px'
                }
            }
        }
    }
</script>
