<template>
    <div :class="[
        'cl-skeleton',
        `cl-skeleton--${type}`
    ]">
        <template v-if="type === 'list'">
            <cl-skeleton-item :animation="animation" type="line" class="cl-skeleton__title" style="width: 60%"></cl-skeleton-item>
            <cl-skeleton-item :animation="animation" type="line"></cl-skeleton-item>
            <cl-skeleton-item :animation="animation" type="line"></cl-skeleton-item>
            <cl-skeleton-item :animation="animation" type="line" style="width: 80%"></cl-skeleton-item>
        </template>

        <template v-if="type === 'avatar'">
            <cl-skeleton-item :animation="animation" type="circle"></cl-skeleton-item>
            <div class="cl-skeleton__avatar-line">
                <cl-skeleton-item :animation="animation" type="line" class="cl-skeleton__title" style="width: 60%"></cl-skeleton-item>
                <cl-skeleton-item :animation="animation" type="line"></cl-skeleton-item>
                <cl-skeleton-item :animation="animation" type="line"></cl-skeleton-item>
                <cl-skeleton-item :animation="animation" type="line"></cl-skeleton-item>
                <cl-skeleton-item :animation="animation" type="line" style="width: 80%"></cl-skeleton-item>
            </div>
        </template>
    </div>
</template>

<script>
    import ClSkeletonItem from './skeletonItem'
    export default {
        name: "ClSkeleton",
        props: {
            type: {
                type: String,
                default: 'list',
                validator(value){
                    return ['list', 'avatar'].includes(value)
                }
            },
            animation: {
                type: Boolean,
                default: false
            }
        },
        components: {
            ClSkeletonItem
        },
        data(){
            return {
                railColor: '#cccccc',
                strokeWidth: 20,
            }
        },
        computed: {
            railStyle(){
                return {
                    'background': this.railColor,
                    'height': parseFloat(this.strokeWidth) + 'px',
                }
            },
        },
        mounted() {
        },
        methods: {

        }
    }
</script>