<template>
    <div :class="dividerClass">
        <span v-if="type === 'horizontal'" :class="[`${classPrefix}__inner`]"><slot></slot></span>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "Divider",
        props: {
            type: {
                type: String,
                default: 'horizontal',
                validator(value){
                    return ['vertical', 'horizontal'].includes(value)
                }
            },
            position: {
                type: String,
                default: 'left',
                validator(value) {
                    return ['left', 'center', 'right'].includes(value);
                }
            },
            dashed: Boolean
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-divider',
            }
        },
        computed: {
            dividerClass(){
                const classPrefix = this.classPrefix;
                return [
                    `${classPrefix}`,
                    `${classPrefix}--${this.type}`,
                    `${classPrefix}--${this.position}`,
                    this.dashed && `${classPrefix}--dashed`,
                ]
            }
        }
    }
</script>
