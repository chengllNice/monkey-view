<template>
    <div class="dev-affix">
        <div>content</div>
        <div>content</div>
        <div>content</div>
        <Affix target="views-main-content">
            <Button style="position: relative; left: 200px;" type="primary">affix</Button>
        </Affix>
        <div>content111</div>
        <div>content111</div>
        <div>content111</div>
        <div class="dev-affix-view-pos">
            <Affix target="views-main-content">
                <Button type="primary">affix</Button>
            </Affix>
        </div>

        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <div>content222</div>
        <Affix target="views-main-content" bottom="20">
            <Button type="primary">affix-fixed-bottom</Button>
        </Affix>
    </div>
</template>

<style lang="scss" scoped>
    .dev-affix {
        height: 2500px;

        .dev-affix-view-pos {
            padding: 50px;
            margin: 20px;
            border: 1px solid red;
        }
    }
</style>
