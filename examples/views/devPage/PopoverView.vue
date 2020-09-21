<template>
    <div class="popoverView">
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

        <div class="home-inner">
            <div class="bottom">
                <Popover title="提示" content="内容区域。。。。。。。" placement="bottom">
                    <Button type="primary">bottom</Button>
                </Popover>
            </div>
            <div class="bottom-start">
                <Popover title="提示" content="内容区域。。。。。。。" placement="bottom-start">
                    <Button type="primary">bottom-start</Button>
                </Popover>
            </div>

            <div class="bottom-end">
                <Popover title="提示" content="内容区域。。。。。。。" placement="bottom-end">
                    <Button type="primary">bottom-end</Button>
                </Popover>
            </div>

            <div class="center"></div>

            <div class="top">
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
            <div class="top-start">
                <Popover title="提示" content="内容区域。。。。。。。" placement="top-start">
                    <Button type="primary">top-start</Button>
                </Popover>
            </div>
            <div class="top-end">
                <Popover title="提示" content="内容区域。。。。。。。" placement="top-end">
                    <Button type="primary">top-end</Button>
                </Popover>
            </div>


            <div class="left">
                <Popover title="提示" content="内容区域。。。。。。。" placement="left">
                    <Button type="primary">left</Button>
                </Popover>
            </div>
            <div class="left-start">
                <Popover title="提示" content="内容区域。。。。。。。" placement="left-start">
                    <Button type="primary">left-start</Button>
                </Popover>
            </div>
            <div class="left-end">
                <Popover title="提示" content="内容区域。。。。。。。" placement="left-end">
                    <Button type="primary">left-end</Button>
                </Popover>
            </div>


            <div class="right">
                <Popover title="提示" content="内容区域。。。。。。。" placement="right">
                    <Button type="primary">right</Button>
                </Popover>
            </div>
            <div class="right-start">
                <Popover title="提示" content="内容区域。。。。。。。" placement="right-start">
                    <Button type="primary">right-start</Button>
                </Popover>
            </div>
            <div class="right-end">
                <Popover title="提示" content="内容区域。。。。。。。" placement="right-end">
                    <Button type="primary">right-end</Button>
                </Popover>
            </div>
        </div>


        <div class="viewDes">
            <h3>API</h3>
            <h4>popover props</h4>

            <div class="propItem">
                <p><b>属性：placement</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>提示框出现的位置，可选值top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end</p>
                <p><b>默认值：</b>bottom</p>
            </div>
            <div class="propItem">
                <p><b>属性：trigger</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>触发方式，可选值hover/click/focus</p>
                <p><b>默认值：</b>click</p>
            </div>
            <div class="propItem">
                <p><b>属性：title</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>标题</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：content</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>显示的正文内容</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：width</b></p>
                <p><b>类型：String, Number</b></p>
                <p><b>说明：</b>宽度</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：wordWrap</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>开启自动换行</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：disabled</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>禁用</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：transition</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>自定义动画效果</p>
                <p><b>默认值：</b>fade</p>
            </div>
            <div class="propItem">
                <p><b>属性：renderHtml</b></p>
                <p><b>类型：HTMLElement, Boolean</b></p>
                <p><b>说明：</b>自定义元素插入的位置，默认渲染到body中</p>
                <p><b>默认值：</b>document.body</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>popover slot</h4>

            <div class="propItem">
                <p><b>名称：-</b></p>
                <p><b>说明：</b>触发控件</p>
            </div>
            <div class="propItem">
                <p><b>名称：title</b></p>
                <p><b>说明：</b>标题</p>
            </div>
            <div class="propItem">
                <p><b>名称：content</b></p>
                <p><b>说明：</b>提示框内容</p>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: "PopoverView",
    data() {
      return {
        visible: false
      }
    },
    computed: {},
    components: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
      close() {
        this.visible = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
    .popoverView {

        .home-inner {
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

        .center {
            position: absolute;
            top: 0;
            left: 0;
            width: 200px;
            height: 200px;
        }
        .bottom {
            position: absolute;
            bottom: -50px;
            left: 0;
            right: 0;
            margin: auto;
        }
        .bottom-start {
            position: absolute;
            bottom: -50px;
            left: -50px;
        }
        .bottom-end {
            position: absolute;
            bottom: -50px;
            right: -50px;
        }
        .top {
            position: absolute;
            top: -50px;
            left: 0;
            right: 0;
            margin: auto;
        }
        .top-start {
            position: absolute;
            top: -50px;
            left: -50px;
        }
        .top-end {
            position: absolute;
            top: -50px;
            right: -50px;
        }
        .left {
            position: absolute;
            left: -150px;
            top: 50%;
            transform: translateY(-50%);
            margin: auto;
        }
        .left-start {
            position: absolute;
            left: -150px;
            top: 0;
        }
        .left-end {
            position: absolute;
            left: -150px;
            bottom: 0;
        }
        .right {
            position: absolute;
            right: -150px;
            top: 50%;
            transform: translateY(-50%);
            margin: auto;
        }
        .right-start {
            position: absolute;
            right: -150px;
            top: 0;
        }
        .right-end {
            position: absolute;
            right: -150px;
            bottom: 0;
        }
    }
</style>
