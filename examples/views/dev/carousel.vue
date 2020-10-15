<template>
    <div class="dev-carousel">
        <Carousel arrow="hover" loop trigger="hover">
            <CarouselItem class="dev-carousel-pane">1</CarouselItem>
            <CarouselItem class="dev-carousel-pane">2</CarouselItem>
            <CarouselItem class="dev-carousel-pane">3</CarouselItem>
            <CarouselItem class="dev-carousel-pane">4</CarouselItem>
            <CarouselItem class="dev-carousel-pane">5</CarouselItem>
        </Carousel>

        <br>
        <hr>
        <br>

            <Carousel v-model="active2" direction="vertical" indicator="outside">
                <CarouselItem class="dev-carousel-pane">1</CarouselItem>
                <CarouselItem class="dev-carousel-pane">2</CarouselItem>
                <CarouselItem class="dev-carousel-pane">3</CarouselItem>
                <CarouselItem class="dev-carousel-pane">4</CarouselItem>
                <CarouselItem class="dev-carousel-pane">5</CarouselItem>
            </Carousel>

<!--        <Carousel height="400" direction="vertical">-->
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
                active2: 2
            }
        }
    }
</script>

<style lang="scss" scoped>
.dev-carousel{
    padding: 50px;
    .dev-carousel-pane{
        height: 300px;
        color: #ffffff;
        background-color: #6caff5;
        text-align: center;
        font-size: 30px;
        line-height: 300px;
    }
}
</style>
