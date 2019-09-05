# Tooltip 文字提示

类似title的提示，鼠标悬停是的提示信息。

## 代码示例


:::demo 基础用法

注意：内容区域文本不自动换行。如需换行显示设置 `maxWidth`属性，超出时会自动换行。

```html
<template>
    <cl-tooltip content="这是提示文字">
        <cl-button type="text" size="mini">鼠标经过时会有文字提示</cl-button>
    </cl-tooltip>
    <br>
    <cl-tooltip content="史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。" maxWidth="150px">
        <cl-button type="text" size="mini">最大宽度超出150px时会自动换行</cl-button>
    </cl-tooltip>
</template>
```
:::


:::demo 位置

组件提供了12个方向显示tooltip，详见API。

```html
<template>
    <div class="doc-margin-l10" style="text-align: center;width: 300px">
        <cl-tooltip title="提示" placement="top-start" content="content">
            <cl-button>上左</cl-button>
        </cl-tooltip>
        <cl-tooltip title="提示" placement="top" content="content">
            <cl-button>上边</cl-button>
        </cl-tooltip>
        <cl-tooltip title="提示" placement="top-end" content="content">
            <cl-button>上右</cl-button>
        </cl-tooltip>
    </div>
    <div class="doc-margin-l10 doc-tooltip-placement">
        <cl-tooltip title="提示" placement="left-start" content="content">
            <cl-button>左上</cl-button>
        </cl-tooltip>
        <cl-tooltip title="提示" placement="right-start" content="content">
            <cl-button>右上</cl-button>
        </cl-tooltip>
    </div>
    <div class="doc-margin-l10 doc-tooltip-placement">
        <cl-tooltip title="提示" placement="left" content="content">
            <cl-button>左边</cl-button>
        </cl-tooltip>
        <cl-tooltip title="提示" placement="right" content="content">
            <cl-button>右边</cl-button>
        </cl-tooltip>
    </div>
    <div class="doc-margin-l10 doc-tooltip-placement">
        <cl-tooltip title="提示" placement="left-end" content="content">
            <cl-button>左下</cl-button>
        </cl-tooltip>
        <cl-tooltip title="提示" placement="right-end" content="content">
            <cl-button>右下</cl-button>
        </cl-tooltip>
    </div>
    <div class="doc-margin-l10" style="text-align: center;width: 300px">
        <cl-tooltip title="提示" placement="bottom-start" content="content">
            <cl-button>下左</cl-button>
        </cl-tooltip>
        <cl-tooltip title="提示" placement="bottom" content="content">
            <cl-button>下边</cl-button>
        </cl-tooltip>
        <cl-tooltip title="提示" placement="bottom-end" content="content">
            <cl-button>下右</cl-button>
        </cl-tooltip>
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

```html
<template>
    <cl-tooltip content="这是提示文字">
        <cl-button type="text" size="mini">鼠标经过时会有文字提示</cl-button>
    </cl-tooltip>
    <br>
    <cl-tooltip content="这是一个长文本提示，超出会换行" maxWidth="120px">
        <cl-button type="text" size="mini">最大宽度超出120px时会自动换行</cl-button>
    </cl-tooltip>
</template>
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
| renderHtml | HTMLElement, Boolean | 自定义元素插入的位置，默认渲染到body中 | document.body |


### Tooltip slot

| 名称 | 说明 |
| ---- | ---- |
| - | 触发控件 |
| content | 提示框内容 |
