# Tooltip 文字提示

类似title的提示，鼠标悬停是的提示信息。

## 代码示例


:::demo 基础用法

注意：内容区域文本不自动换行。如需换行显示设置 `maxWidth`属性，超出时会自动换行。

```html
<template>
    <Tooltip content="这是提示文字">
        <Button type="text" size="mini">鼠标经过时会有文字提示</Button>
    </Tooltip>
    <br>
    <Tooltip content="史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。" maxWidth="150px">
        <Button type="text" size="mini">最大宽度超出150px时会自动换行</Button>
    </Tooltip>
</template>
```
:::


:::demo 位置

组件提供了12个方向显示tooltip，详见API。

```html
<template>
    <div class="doc-margin-l10" style="text-align: center;width: 300px">
        <Tooltip placement="top-start" content="content">
            <Button>上左</Button>
        </Tooltip>
        <Tooltip placement="top" content="content">
            <Button>上边</Button>
        </Tooltip>
        <Tooltip placement="top-end" content="content">
            <Button>上右</Button>
        </Tooltip>
    </div>
    <div class="doc-margin-l10 doc-tooltip-placement">
        <Tooltip placement="left-start" content="content">
            <Button>左上</Button>
        </Tooltip>
        <Tooltip placement="right-start" content="content">
            <Button>右上</Button>
        </Tooltip>
    </div>
    <div class="doc-margin-l10 doc-tooltip-placement">
        <Tooltip placement="left" content="content">
            <Button>左边</Button>
        </Tooltip>
        <Tooltip placement="right" content="content">
            <Button>右边</Button>
        </Tooltip>
    </div>
    <div class="doc-margin-l10 doc-tooltip-placement">
        <Tooltip placement="left-end" content="content">
            <Button>左下</Button>
        </Tooltip>
        <Tooltip placement="right-end" content="content">
            <Button>右下</Button>
        </Tooltip>
    </div>
    <div class="doc-margin-l10" style="text-align: center;width: 300px">
        <Tooltip placement="bottom-start" content="content">
            <Button>下左</Button>
        </Tooltip>
        <Tooltip placement="bottom" content="content">
            <Button>下边</Button>
        </Tooltip>
        <Tooltip placement="bottom-end" content="content">
            <Button>下右</Button>
        </Tooltip>
    </div>
</template>
<style>
    .doc-tooltip-placement{
        width: 300px;
    }
    .doc-tooltip-placement:after{
        content: '';
        display: block;
        clear: both;
    }
    .doc-tooltip-placement>*:first-child{
        float: left;
    }
    .doc-tooltip-placement>*:last-child{
        float: right;
    }
</style>
```
:::


:::demo 自定义颜色

设置 `background-color`和 `text-color`属性可以自定义背景颜色和文本颜色。建议不要设置浅色的背景色，如#ffffff。

自定义背景颜色时将自动隐藏提示箭头。

```html
<template>
    <Tooltip content="这是提示文字" background-color="#2d8cf0" text-color="rgba(255,255,255,0.75)">
        <Button type="text" size="mini">鼠标经过时会有文字提示</Button>
    </Tooltip>
    <Tooltip content="这是提示文字" text-color="rgba(255,255,255,0.75)">
        <Button type="text" size="mini">鼠标经过时会有文字提示</Button>
    </Tooltip>
</template>
```
:::

:::demo 指定渲染位置

可以通过 `renderHtml`来控制浮层元素渲染位置，在外层`overflow:hidden`的情况下可以指定渲染到`body`元素中使其不受影响。

```html
<template>
     <Tooltip content="content"  placement="left" :render-html="true">
        <Button>渲染浮层元素到BODY中</Button>
    </Tooltip>
</template>
<script>
    export default {
      data(){
        return {
          
        }
      }
    }
</script>

```

:::



## API

### Tooltip props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| placement | String | 提示框出现的位置，可选值`top` `top-start` `top-end` `bottom` `bottom-start` `bottom-end` `left` `left-start` `left-end` `right` `right-start` `right-end` | top |
| value | Boolean | 可以使用v-model双向绑定控制显示隐藏 | - |
| content | String | 显示的提示内容 | - |
| maxWidth | String, Number | 自定义最大宽度，超出换行 | - |
| backgroundColor | String | 自定义背景色 | - |
| textColor | String | 自定义文本颜色 | fade |
| disabled | Boolean | 禁用 | - |
| always | Boolean | 是否总显示 | - |
| renderHtml | HTMLElement, Boolean | 自定义元素插入的位置，设置为`true`则渲染到body中，可以指定渲染元素 | false |


### Tooltip slot

| 名称 | 说明 |
| ---- | ---- |
| - | 触发控件 |
| content | 提示框内容 |
