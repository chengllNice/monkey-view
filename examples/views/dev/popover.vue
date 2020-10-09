<template>
    <div class="dev-popover">
        <Popover v-model="visible" title="提示" trigger="click" content="内容区域。。。。。。。" placement="bottom">
            <div slot="content">
                <Button type="text" @click="close">trigger-click-close</Button>
            </div>
            <Button type="primary">trigger-click</Button>
        </Popover>

        <Popover title="提示" trigger="hover" content="内容区域。。。。。。。" placement="bottom">
            <Button type="primary">trigger-hover</Button>
        </Popover>

        <Popover title="提示" trigger="focus" content="内容区域。。。。。。。" placement="bottom">
            <Button type="primary">trigger-focus</Button>
        </Popover>

        <Popover trigger="focus" content="内容区域。。。。。。。" placement="bottom-start">
            <Input></Input>
        </Popover>

        <div class="dev-popover-home-inner">
            <div class="dev-popover-bottom">
                <Popover title="提示" content="内容区域。。。。。。。" placement="bottom">
                    <Button type="primary">bottom</Button>
                </Popover>
            </div>
            <div class="dev-popover-bottom-start">
                <Popover title="提示" content="内容区域。。。。。。。" placement="bottom-start">
                    <Button type="primary">bottom-start</Button>
                </Popover>
            </div>

            <div class="dev-popover-bottom-end">
                <Popover title="提示" content="内容区域。。。。。。。" placement="bottom-end">
                    <Button type="primary">bottom-end</Button>
                </Popover>
            </div>

            <div class="center"></div>

            <div class="dev-popover-top">
                <!--<Popover title="提示" wordWrap content="内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内。。。。。。。" placement="top">-->
                <!--<Button type="primary">top</Button>-->
                <!--</Popover>-->
                <Popover width="210px" wordWrap placement="top">
                    <div slot="title">title</div>
                    <div slot="content">
                        内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内。。。。。。。11
                    </div>
                    <Button type="primary">top</Button>
                </Popover>
            </div>
            <div class="dev-popover-top-start">
                <Popover title="提示" content="内容区域。。。。。。。" placement="top-start">
                    <Button type="primary">top-start</Button>
                </Popover>
            </div>
            <div class="dev-popover-top-end">
                <Popover title="提示" content="内容区域。。。。。。。" placement="top-end">
                    <Button type="primary">top-end</Button>
                </Popover>
            </div>

            <div class="dev-popover-left">
                <Popover title="提示" content="内容区域。。。。。。。" placement="left">
                    <Button type="primary">left</Button>
                </Popover>
            </div>
            <div class="dev-popover-left-start">
                <Popover title="提示" content="内容区域。。。。。。。" placement="left-start">
                    <Button type="primary">left-start</Button>
                </Popover>
            </div>
            <div class="dev-popover-left-end">
                <Popover title="提示" content="内容区域。。。。。。。" placement="left-end">
                    <Button type="primary">left-end</Button>
                </Popover>
            </div>

            <div class="dev-popover-right">
                <Popover title="提示" content="内容区域。。。。。。。" placement="right">
                    <Button type="primary">right</Button>
                </Popover>
            </div>
            <div class="dev-popover-right-start">
                <Popover title="提示" content="内容区域。。。。。。。" placement="right-start">
                    <Button type="primary">right-start</Button>
                </Popover>
            </div>
            <div class="dev-popover-right-end">
                <Popover title="提示" content="内容区域。。。。。。。" placement="right-end">
                    <Button type="primary">right-end</Button>
                </Popover>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                visible: false
            }
        },
        methods: {
            close() {
                this.visible = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dev-popover {

        .dev-popover-home-inner {
            position: relative;
            width: 200px;
            height: 200px;
            top: 200px;
            left: 0;
            right: 0;
            margin: auto;
            margin-bottom: 400px;
            text-align: center;
        }

        .dev-popover-center {
            position: absolute;
            top: 0;
            left: 0;
            width: 200px;
            height: 200px;
        }

        .dev-popover-bottom {
            position: absolute;
            bottom: -50px;
            left: 0;
            right: 0;
            margin: auto;
        }

        .dev-popover-bottom-start {
            position: absolute;
            bottom: -50px;
            left: -50px;
        }

        .dev-popover-bottom-end {
            position: absolute;
            bottom: -50px;
            right: -50px;
        }

        .dev-popover-top {
            position: absolute;
            top: -50px;
            left: 0;
            right: 0;
            margin: auto;
        }

        .dev-popover-top-start {
            position: absolute;
            top: -50px;
            left: -50px;
        }

        .dev-popover-top-end {
            position: absolute;
            top: -50px;
            right: -50px;
        }

        .dev-popover-left {
            position: absolute;
            left: -150px;
            top: 50%;
            transform: translateY(-50%);
            margin: auto;
        }

        .dev-popover-left-start {
            position: absolute;
            left: -150px;
            top: 0;
        }

        .dev-popover-left-end {
            position: absolute;
            left: -150px;
            bottom: 0;
        }

        .dev-popover-right {
            position: absolute;
            right: -150px;
            top: 50%;
            transform: translateY(-50%);
            margin: auto;
        }

        .dev-popover-right-start {
            position: absolute;
            right: -150px;
            top: 0;
        }

        .dev-popover-right-end {
            position: absolute;
            right: -150px;
            bottom: 0;
        }
    }
</style>
