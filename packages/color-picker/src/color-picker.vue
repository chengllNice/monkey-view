<template>
    <div :class="colorPickerClass">
        <div ref="reference">
            reference
        </div>

        <transition name="slideUp">
            <Drop v-show="visible"
                  ref="dropDown"
                  :reference="$refs.reference"
                  :min-width="false"
                  :dropdownMatchSelectWidth="false"
                  :render-html="false"
                  v-model="visible">
                <div :class="[`${classPrefix}__drop-down-inner`]">
                    <SaturationPanel></SaturationPanel>
                    <Hue></Hue>
                </div>
            </Drop>
        </transition>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Drop from 'packages/base/drop'
    import Hue from './hue'
    import SaturationPanel from './saturation-panel'

    export default {
        name: "ColorPicker",
        props: {
            value: String,
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-color-picker',
                visible: true,
            }
        },
        computed: {
            colorPickerClass(){
                const classPrefix = this.classPrefix;
                return [
                    `${classPrefix}`
                ]
            }
        },
        components: {
            Drop,
            Hue,
            SaturationPanel
        }
    }
</script>
