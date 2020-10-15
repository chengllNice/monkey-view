<template>
    <div :class="[`${classPrefix}`]"
         :style="carouselStyle">
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
                componentName: 'CarouselItem',
                classPrefix: Config.classPrefix + '-carousel-item',
                index: 0,
                carouselParent: this.$parent
            }
        },
        computed: {
            carouselStyle(){
                if(this.carouselParent.direction === 'horizontal'){
                    return {
                        width: `${this.carouselParent.itemWidth}%`
                    }
                }
                return null;
            },
        },
        mounted() {
            this.$nextTick(this.carouselParent.setChildrenIndex());
        }
    }
</script>
