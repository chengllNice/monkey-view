<template>
    <div :class="itemClass"></div>
</template>

<script>
    export default {
        name: "SkeletonItem",
        props: {
            type: {
                type: String,
                default: 'line',
                validator(value){
                    return ['line', 'circle'].includes(value)
                }
            },
            animation: {
                type: Boolean,
                default: false
            },
        },
        data(){
            return {

            }
        },
        computed: {
            itemClass(){
                return [
                    'cl-skeleton-item',
                    `cl-skeleton-item--${this.type}`,
                    this.animation && 'cl-skeleton-item--animation',
                ]
            },
        }
    }
</script>