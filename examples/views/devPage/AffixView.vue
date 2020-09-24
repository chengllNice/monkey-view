<template>
    <div class="AffixView">
        <div>contrent</div>
        <div>contrent</div>
        <div>contrent</div>
        <Affix target="views-main-content">
            <Button style="position: relative; left: 200px;" type="primary">affix</Button>
        </Affix>
        <!--<div>contrent111</div>-->
        <!--<div>contrent111</div>-->
        <!--<div>contrent111</div>-->
        <!--<div class="affix-view-pos">-->
            <!--<Affix target="views-main-content">-->
                <!--<Button type="primary">affix</Button>-->
            <!--</Affix>-->
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
        <!--<Affix target="views-main-content" bottom="20">-->
            <!--<Button type="primary">affix-fixed-bottom</Button>-->
        <!--</Affix>-->
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
