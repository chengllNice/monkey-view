<template>
    <div :class="[
        `${classPrefix}`,
        `${classPrefix}--${type}`
    ]">
        <template v-if="type === 'list'">
            <skeleton-item :animation="animation" type="line"
                           :class="[`${classPrefix}__title`]"
                           style="width: 60%"></skeleton-item>
            <skeleton-item :animation="animation" type="line"></skeleton-item>
            <skeleton-item :animation="animation" type="line"></skeleton-item>
            <skeleton-item :animation="animation" type="line" style="width: 80%"></skeleton-item>
        </template>

        <template v-if="type === 'avatar'">
            <skeleton-item :animation="animation" type="circle"></skeleton-item>
            <div :class="[`${classPrefix}__avatar-line`]">
                <skeleton-item :animation="animation" type="line"
                               :class="[`${classPrefix}__title`]"
                               style="width: 60%"></skeleton-item>
                <skeleton-item :animation="animation" type="line"></skeleton-item>
                <skeleton-item :animation="animation" type="line"></skeleton-item>
                <skeleton-item :animation="animation" type="line"></skeleton-item>
                <skeleton-item :animation="animation" type="line" style="width: 80%"></skeleton-item>
            </div>
        </template>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import SkeletonItem from './skeleton-item'

    export default {
        name: 'Skeleton',
        props: {
            type: {
                type: String,
                default: 'list',
                validator(value) {
                    return ['list', 'avatar'].includes(value)
                }
            },
            animation: {
                type: Boolean,
                default: false
            }
        },
        components: {
            SkeletonItem
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-skeleton',
                railColor: '#cccccc',
                strokeWidth: 20
            }
        },
        computed: {
            railStyle() {
                return {
                    background: this.railColor,
                    height: parseFloat(this.strokeWidth) + 'px'
                }
            }
        }
    }
</script>
