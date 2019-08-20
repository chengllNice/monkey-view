<template>
    <div class="TooltipView">
        <ClTooltip content="top" placement="top">
            <ClButton>top</ClButton>
        </ClTooltip>
        <ClTooltip content="top-starttop-starttop-starttop-start" placement="top-start">
            <ClButton>top-start</ClButton>
        </ClTooltip>
        <ClTooltip content="top-endtop-endtop-endtop-endtop-end" placement="top-end">
            <ClButton>top-end</ClButton>
        </ClTooltip>
        <br>

        <ClTooltip content="bottombottombottombottombottom" placement="bottom">
            <ClButton>bottom</ClButton>
        </ClTooltip>
        <ClTooltip content="bottom-startbottom-startbottom-startbottom-start" placement="bottom-start">
            <ClButton>bottom-start</ClButton>
        </ClTooltip>
        <ClTooltip content="bottom-endbottom-endbottom-endbottom-endbottom-end" placement="bottom-end">
            <ClButton>bottom-end</ClButton>
        </ClTooltip>
        <br>

        <ClTooltip content="leftleftleftleftleftleftleftleftleftleftleftleft" placement="left">
            <ClButton>left</ClButton>
        </ClTooltip>
        <ClTooltip content="left-startleft-startleft-startleft-startleft-start" placement="left-start">
            <ClButton>left-start</ClButton>
        </ClTooltip>
        <ClTooltip content="left-endleft-endleft-endleft-endleft-endleft-endleft-end" placement="left-end">
            <ClButton>left-end</ClButton>
        </ClTooltip>
        <br>

        <ClTooltip content="rightrightrightrightrightrightrightrightrightrightright" placement="right">
            <ClButton>right</ClButton>
        </ClTooltip>
        <ClTooltip content="right-startright-startright-startright-start" placement="right-start">
            <ClButton>right-start</ClButton>
        </ClTooltip>
        <ClTooltip content="right-endright-endright-endright-endright-end" placement="right-end">
            <ClButton>right-end</ClButton>
        </ClTooltip>
        <br>

        <h4>自定义背景色及文字颜色</h4>
        <ClTooltip content="custom-colorcustom-colorcustom-colorcustom-color"
                   background-color="red"
                   text-color="#ffffff"
                   placement="bottom">
            <ClButton>custom-color</ClButton>
        </ClTooltip>
        <ClTooltip content="2d8cf0-color2d8cf0-color2d8cf0-color2d8cf0-color"
                   background-color="#2d8cf0"
                   text-color="#ffffff"
                   placement="bottom">
            <ClButton>2d8cf0-color</ClButton>
        </ClTooltip>

        <h4>slot</h4>
        <ClTooltip placement="bottom">
            <div slot="content">slots-contentslots-contentslots-content</div>
            <ClButton>slots-content</ClButton>
        </ClTooltip>

        <h4>设置最大宽度，超出换行</h4>
        <ClTooltip placement="bottom" maxWidth="200px">
            <div slot="content">slots-contentslots-contentslots-contentslots-contentslots-content</div>
            <ClButton>slots-content</ClButton>
        </ClTooltip>


        <div class="viewDes">
            <h3>API</h3>
            <h4>tooltip props</h4>

            <div class="propItem">
                <p><b>属性：placement</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>提示框出现的位置，可选值top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end</p>
                <p><b>默认值：</b>bottom</p>
            </div>
            <div class="propItem">
                <p><b>属性：content</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>显示的正文内容</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：backgroundColor</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>自定义背景色</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：textColor</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>自定义文本颜色</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：value</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>显示隐藏的控制</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：disabled</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>禁用</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：maxWidth</b></p>
                <p><b>类型：String, Number</b></p>
                <p><b>说明：</b>自定义最大宽度，超出换行</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：always</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>是否总显示</p>
                <p><b>默认值：</b>-</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>tooltip slot</h4>

            <div class="propItem">
                <p><b>名称：-</b></p>
                <p><b>说明：</b>触发控件</p>
            </div>
            <div class="propItem">
                <p><b>名称：content</b></p>
                <p><b>说明：</b>提示框内容</p>
            </div>
        </div>
    </div>
</template>

<script>
    import ClTooltip from 'cl-ui/packages/components/tooltip/src/tooltip.vue'
    import ClButton from 'cl-ui/packages/components/button/src/button.vue'
  export default {
    name: "TooltipView",
    data() {
      return {}
    },
    computed: {},
    components: {
      ClTooltip,
      ClButton
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
