<template>
    <div :class="[`${classPrefix}`]" :style="panelStyle">
        <div :class="[`${classPrefix}__white`]"></div>
        <div :class="[`${classPrefix}__black`]"></div>
        <div :class="[`${classPrefix}__cursor`]">
            <div :class="[`${classPrefix}__circle`]"></div>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "SaturationPanel",
        props: {
            background: String,
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-saturation-panel',
            }
        },
        computed: {
            panelStyle(){
                return {
                    background: this.background || 'rgb(0, 255, 127)'
                }
            }
        }
    }
</script>
