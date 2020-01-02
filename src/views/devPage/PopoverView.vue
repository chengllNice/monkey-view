<template>
    <div class="popoverView">
        <ClPopover v-model="visible" title="提示" trigger="click" content="内容区域。。。。。。。" placement="bottom">
            <div slot="content">
                <ClButton type="text" @click="close">trigger-click-close</ClButton>
            </div>
            <ClButton type="primary">trigger-click</ClButton>
        </ClPopover>

        <ClPopover title="提示" trigger="hover" content="内容区域。。。。。。。" placement="bottom">
            <ClButton type="primary">trigger-hover</ClButton>
        </ClPopover>

        <ClPopover title="提示" trigger="focus" content="内容区域。。。。。。。" placement="bottom">
            <ClButton type="primary">trigger-focus</ClButton>
        </ClPopover>

        <ClPopover trigger="focus" content="内容区域。。。。。。。" placement="bottom-start">
            <ClInput></ClInput>
        </ClPopover>

        <div class="home-inner">
            <div class="bottom">
                <ClPopover title="提示" content="内容区域。。。。。。。" placement="bottom">
                    <ClButton type="primary">bottom</ClButton>
                </ClPopover>
            </div>
            <div class="bottom-start">
                <ClPopover title="提示" content="内容区域。。。。。。。" placement="bottom-start">
                    <ClButton type="primary">bottom-start</ClButton>
                </ClPopover>
            </div>

            <div class="bottom-end">
                <ClPopover title="提示" content="内容区域。。。。。。。" placement="bottom-end">
                    <ClButton type="primary">bottom-end</ClButton>
                </ClPopover>
            </div>

            <div class="center"></div>

            <div class="top">
                <!--<ClPopover title="提示" wordWrap content="内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内。。。。。。。" placement="top">-->
                <!--<ClButton type="primary">top</ClButton>-->
                <!--</ClPopover>-->
                <ClPopover width="210px" wordWrap placement="top">
                    <div slot="title">title</div>
                    <div slot="content">
                        内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内。。。。。。。11
                    </div>
                    <ClButton type="primary">top</ClButton>
                </ClPopover>
            </div>
            <div class="top-start">
                <ClPopover title="提示" content="内容区域。。。。。。。" placement="top-start">
                    <ClButton type="primary">top-start</ClButton>
                </ClPopover>
            </div>
            <div class="top-end">
                <ClPopover title="提示" content="内容区域。。。。。。。" placement="top-end">
                    <ClButton type="primary">top-end</ClButton>
                </ClPopover>
            </div>


            <div class="left">
                <ClPopover title="提示" content="内容区域。。。。。。。" placement="left">
                    <ClButton type="primary">left</ClButton>
                </ClPopover>
            </div>
            <div class="left-start">
                <ClPopover title="提示" content="内容区域。。。。。。。" placement="left-start">
                    <ClButton type="primary">left-start</ClButton>
                </ClPopover>
            </div>
            <div class="left-end">
                <ClPopover title="提示" content="内容区域。。。。。。。" placement="left-end">
                    <ClButton type="primary">left-end</ClButton>
                </ClPopover>
            </div>


            <div class="right">
                <ClPopover title="提示" content="内容区域。。。。。。。" placement="right">
                    <ClButton type="primary">right</ClButton>
                </ClPopover>
            </div>
            <div class="right-start">
                <ClPopover title="提示" content="内容区域。。。。。。。" placement="right-start">
                    <ClButton type="primary">right-start</ClButton>
                </ClPopover>
            </div>
            <div class="right-end">
                <ClPopover title="提示" content="内容区域。。。。。。。" placement="right-end">
                    <ClButton type="primary">right-end</ClButton>
                </ClPopover>
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
  import ClPopover from 'cl-ui/packages/components/popover/src/popover.vue'
  import ClButton from 'cl-ui/packages/components/button/src/button.vue'
  import ClInput from 'cl-ui/packages/components/input/src/input.vue'

  export default {
    name: "PopoverView",
    data() {
      return {
        visible: false
      }
    },
    computed: {},
    components: {
      ClPopover,
      ClButton,
      ClInput
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
