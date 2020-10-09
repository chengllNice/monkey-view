<template>
    <div class="dev-tooltip">
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
    </div>
</template>
