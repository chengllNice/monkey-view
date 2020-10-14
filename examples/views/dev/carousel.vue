<template>
    <div class="dev-carousel">
        <Carousel height="400" autoplay loop>
            <CarouselItem class="dev-carousel-pane">1</CarouselItem>
            <CarouselItem class="dev-carousel-pane">2</CarouselItem>
            <CarouselItem class="dev-carousel-pane">3</CarouselItem>
            <CarouselItem class="dev-carousel-pane">4</CarouselItem>
        </Carousel>

<!--        <Carousel height="400">-->
<!--            <CarouselItem class="dev-carousel-pane" label="1">1</CarouselItem>-->
<!--            <CarouselItem class="dev-carousel-pane" label="2">2</CarouselItem>-->
<!--            <CarouselItem class="dev-carousel-pane" label="3">3</CarouselItem>-->
<!--            <CarouselItem class="dev-carousel-pane" label="4">4</CarouselItem>-->
<!--        </Carousel>-->
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
.dev-carousel{
    padding: 50px;
    .dev-carousel-pane{
        height: 400px;
        color: #ffffff;
        background-color: #6caff5;
        text-align: center;
        font-size: 30px;
        line-height: 400px;
    }
}
</style>
