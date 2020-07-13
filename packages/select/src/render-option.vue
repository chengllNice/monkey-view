<template>
    <div :class="[
        `${classPrefix}`
    ]">
        <template v-for="(item, index) in option">
            <option-group v-if="item.option && Array.isArray(item.option)"
                          :key="index"
                          :label="item.label">
                <template v-for="oItem in item.option">
                    <Option :key="oItem.value"
                            :value="oItem.value"
                            :label="oItem.label"
                            :disabled="oItem.disabled"></Option>
                </template>
            </option-group>
            <Option v-else
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                    :disabled="item.disabled"></Option>
        </template>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Option from './option'
    import OptionGroup from './option-group'

    export default {
        name: "RenderOption",
        props: {
          option: {
              type: Array,
              default(){
                  return []
              }
          }
        },
        data(){
            return {
                prefix: Config.classPrefix,
                classPrefix: Config.classPrefix + '-render-option',
            }
        },
        components: {
            Option,
            OptionGroup
        },
        mounted() {
        },
        methods: {

        }
    }
</script>