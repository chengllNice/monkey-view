<template>
    <div class="back-top-view">
        <cl-back-top target="views-main-content"></cl-back-top>
        <cl-back-top target="views-main-content" bottom="100" right="100">
            回到顶部
        </cl-back-top>
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
