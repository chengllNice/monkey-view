<template>
    <div class="AffixView">
        <div>contrent</div>
        <div>contrent</div>
        <div>contrent</div>
        <cl-affix target="views-main-content">
            <cl-button style="position: relative; left: 200px;" type="primary">affix</cl-button>
        </cl-affix>
        <!--<div>contrent111</div>-->
        <!--<div>contrent111</div>-->
        <!--<div>contrent111</div>-->
        <!--<div class="affix-view-pos">-->
            <!--<cl-affix target="views-main-content">-->
                <!--<cl-button type="primary">affix</cl-button>-->
            <!--</cl-affix>-->
        <!--</div>-->

        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<div>contrent222</div>-->
        <!--<cl-affix target="views-main-content" bottom="20">-->
            <!--<cl-button type="primary">affix-fixed-bottom</cl-button>-->
        <!--</cl-affix>-->
    </div>
</template>

<script>
    export default {
        name: "AffixView",
        data() {
            return {}
        },
        computed: {},
        components: {},
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
.AffixView{
    height: 2500px;
    .affix-view-pos{
        padding: 50px;
        margin: 20px;
        border: 1px solid red;
    }
}
</style>
