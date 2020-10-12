# Divider 分割线

区分内容的分割线。

## 代码示例

:::demo 基础用法

默认为水平类型的分割线。

设置`dashed`属性分割线为虚线。

```html
<template>
    <p>I lied when I said I didn’t like you. I lied when I said I didn’t care. I lie every time I try to tell myself I will never fall for you.</p>
    <Divider></Divider>
    <p>I lied when I said I didn’t like you. I lied when I said I didn’t care. I lie every time I try to tell myself I will never fall for you.</p>
    <Divider dashed></Divider>
    <p>I lied when I said I didn’t like you. I lied when I said I didn’t care. I lie every time I try to tell myself I will never fall for you.</p>
</template>
```
:::


:::demo 文案

设置`position`属性设置文案方向，可选值 `left` `center` `right`，默认`left`。

```html
<template>
    <p>I lied when I said I didn’t like you. I lied when I said I didn’t care. I lie every time I try to tell myself I will never fall for you.</p>
    <Divider position="left">Left Text</Divider>
    <p>I lied when I said I didn’t like you. I lied when I said I didn’t care. I lie every time I try to tell myself I will never fall for you.</p>
    <Divider position="center">Center Text</Divider>
    <p>I lied when I said I didn’t like you. I lied when I said I didn’t care. I lie every time I try to tell myself I will never fall for you.</p>
    <Divider position="right">Right Text</Divider>
    <p>I lied when I said I didn’t like you. I lied when I said I didn’t care. I lie every time I try to tell myself I will never fall for you.</p>
</template>
```
:::


:::demo 垂直分割线

默认为垂直类型的分割线。

```html
<template>
    Text
    <Divider type="vertical"></Divider>
    <a href="javascript:;">Link</a>
    <Divider type="vertical"></Divider>
    <a href="javascript:;">Link</a>
</template>
```
:::


## API

### Divider props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | String | 可选值 `vertical`、`horizontal` | horizontal |
| position | String | 设置文案方向，可选值 `left` `center` `right`，默认`left`。 | left |
| dashed | Boolean | 分割线样式为虚线 | - |