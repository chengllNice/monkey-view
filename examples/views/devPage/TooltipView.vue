<template>
    <div class="TooltipView">
        <Tooltip content="top" placement="top">
            <Button>top</Button>
        </Tooltip>
        <Tooltip content="top-starttop-starttop-starttop-start" placement="top-start">
            <Button>top-start</Button>
        </Tooltip>
        <Tooltip content="top-endtop-endtop-endtop-endtop-end" placement="top-end">
            <Button>top-end</Button>
        </Tooltip>
        <br>

        <Tooltip content="bottombottombottombottombottom" placement="bottom">
            <Button>bottom</Button>
        </Tooltip>
        <Tooltip content="bottom-startbottom-startbottom-startbottom-start" placement="bottom-start">
            <Button>bottom-start</Button>
        </Tooltip>
        <Tooltip content="bottom-endbottom-endbottom-endbottom-endbottom-end" placement="bottom-end">
            <Button>bottom-end</Button>
        </Tooltip>
        <br>

        <Tooltip content="leftleftleftleftleftleftleftleftleftleftleftleft" placement="left">
            <Button>left</Button>
        </Tooltip>
        <Tooltip content="left-startleft-startleft-startleft-startleft-start" placement="left-start">
            <Button>left-start</Button>
        </Tooltip>
        <Tooltip content="left-endleft-endleft-endleft-endleft-endleft-endleft-end" placement="left-end">
            <Button>left-end</Button>
        </Tooltip>
        <br>

        <Tooltip content="rightrightrightrightrightrightrightrightrightrightright" placement="right">
            <Button>right</Button>
        </Tooltip>
        <Tooltip content="right-startright-startright-startright-start" placement="right-start">
            <Button>right-start</Button>
        </Tooltip>
        <Tooltip content="right-endright-endright-endright-endright-end" placement="right-end">
            <Button>right-end</Button>
        </Tooltip>
        <br>

        <h4>自定义背景色及文字颜色</h4>
        <Tooltip content="custom-colorcustom-colorcustom-colorcustom-color"
                   background-color="red"
                   text-color="#ffffff"
                   placement="bottom">
            <Button>custom-color</Button>
        </Tooltip>
        <Tooltip content="2d8cf0-color2d8cf0-color2d8cf0-color2d8cf0-color"
                   background-color="#2d8cf0"
                   text-color="#ffffff"
                   placement="bottom">
            <Button>2d8cf0-color</Button>
        </Tooltip>

        <h4>slot</h4>
        <Tooltip placement="bottom">
            <div slot="content">slots-contentslots-contentslots-content</div>
            <Button>slots-content</Button>
        </Tooltip>

        <h4>设置最大宽度，超出换行</h4>
        <Tooltip placement="bottom" maxWidth="200px">
            <div slot="content">slots-contentslots-contentslots-contentslots-contentslots-content</div>
            <Button>slots-content</Button>
        </Tooltip>


        <div class="views-dev">
            <h3>API</h3>
            <h4>tooltip props</h4>

            <div class="views-dev-prop-item">
                <p><b>属性：placement</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>提示框出现的位置，可选值top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end</p>
                <p><b>默认值：</b>bottom</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：content</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>显示的正文内容</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：backgroundColor</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>自定义背景色</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：textColor</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>自定义文本颜色</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：value</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>显示隐藏的控制</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：disabled</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>禁用</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：maxWidth</b></p>
                <p><b>类型：String, Number</b></p>
                <p><b>说明：</b>自定义最大宽度，超出换行</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>属性：always</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>是否总显示</p>
                <p><b>默认值：</b>-</p>
            </div>
        </div>

        <div class="views-dev">
            <h3>API</h3>
            <h4>tooltip slot</h4>

            <div class="views-dev-prop-item">
                <p><b>名称：-</b></p>
                <p><b>说明：</b>触发控件</p>
            </div>
            <div class="views-dev-prop-item">
                <p><b>名称：content</b></p>
                <p><b>说明：</b>提示框内容</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "TooltipView",
    data() {
      return {}
    },
    computed: {},
    components: {
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped>

</style>
