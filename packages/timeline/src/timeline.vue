<template>
    <div :class="[
        `${classPrefix}`,
        pending && `${classPrefix}--pending`,
        ]">
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "Timeline",
        props: {
            pending: Boolean,
            nodeType: String,
            // 时间轴左侧宽度
            leftWidth: {
                type: [String, Number],
            },
            // 时间轴右侧宽度
            rightWidth: {
                type: [String, Number],
            },
            position: {
                type: String,
                default: 'right',
                validator(value){
                    return ['left', 'right'].includes(value)
                }
            }
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-timeline',
            }
        },
    }
</script>
