<template>
    <div class="back-top-view">
        <BackTop target="views-main-content"></BackTop>
        <BackTop target="views-main-content" bottom="100" right="100">
            回到顶部
        </BackTop>
    </div>
</template>

<script>
    export default {
        name: "BackTopView",
        data(){
            return {

            }
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
.back-top-view{
    height: 2500px;
}
</style>
