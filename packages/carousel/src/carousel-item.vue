<template>
    <div :class="[`${classPrefix}`]" :style="carouselStyle">
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "CarouselItem",
        props: {
            label: String,
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-carousel-item',
                index: 0,
                carouselParent: this.$parent
            }
        },
        computed: {
            carouselStyle(){
                return {
                    width: this.carouselParent.width + 'px',
                }
            },

        },
        mounted() {
            this.$nextTick(this.carouselParent.setChildrenIndex());
        },
        methods: {

        }
    }
</script>
