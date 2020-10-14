<template>
    <div :class="[
            `${classPrefix}`,
        ]"
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
                return {
                    width: `${this.carouselParent.itemWidth}%`
                }
            },
            // carouselStyle(){
            //     const activeIndex = this.carouselParent.activeIndex;
            //     const arrowClickType = this.carouselParent.arrowClickType;
            //     const len = this.carouselParent.childrenList.length;
            //     let oldIndex = 0;
            //     let left = this.index * 100;
            //     let translateX = -(activeIndex * 100);
            //     if(arrowClickType === 'prev') oldIndex = activeIndex + 1;
            //     if(arrowClickType === 'next') oldIndex = activeIndex - 1;
            //     if(oldIndex > len - 1){
            //         oldIndex = 0;
            //     }
            //     if(oldIndex < 0){
            //         oldIndex = len - 1;
            //     }
            //     console.log(oldIndex,'oldIndex')
            //     if(this.carouselParent.arrowClickType === 'prev'){
            //         if(activeIndex === len - 1 && activeIndex === this.index){
            //             left = -100
            //         }
            //     }
            //     return {
            //         left: `${left}%`,
            //         transform: `translateX(${translateX}%)`
            //     }
            // },
        },
        mounted() {
            this.$nextTick(this.carouselParent.setChildrenIndex());
        },
        methods: {

        }
    }
</script>
