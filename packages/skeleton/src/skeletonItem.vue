<template>
    <div :class="itemClass"></div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "SkeletonItem",
        props: {
            type: {
                type: String,
                default: 'line',
                validator(value) {
                    return ['line', 'circle'].includes(value)
                }
            },
            animation: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-skeleton-item',
            }
        },
        computed: {
            itemClass() {
                return [
                    `${this.classPrefix}`,
                    `${this.classPrefix}--${this.type}`,
                    this.animation && `${this.classPrefix}--animation`,
                ]
            },
        }
    }
</script>