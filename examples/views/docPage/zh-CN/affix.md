# Affix 固钉

使用固钉可以把元素定位到指定位置不随滚动而滚动。

<cl-alter type="warning"><b>注意：</b> 如果是多层可滚动元素嵌套定位固钉，可能出现不可预知的问题。</cl-alter>

## 代码示例


:::demo 基础用法

默认监听window对象的滚动，相对于window窗口进行fixed定位。由于现在window并没有滚动，所以此例子不起作用。

```html
<template>
    <cl-affix>
        <cl-button type="primary">距离窗口顶部0时固定</cl-button>
    </cl-affix>
</template>
```
:::


:::demo 设置监听滚动的元素

设置`target`属性可以定义滚动监听的元素，值为需要监听元素的`class`类名，此类名需唯一。默认监听window对象的滚动。

```html
<template>
    <cl-affix target="views-main-content">
        <cl-button type="primary">距离滚动元素顶部0px时固定</cl-button>
    </cl-affix>
</template>
```
:::



:::demo 设置距离顶部位置

设置`top`属性可以控制固钉相对于`target`元素的相对位置。

```html
<template>
    <cl-affix target="views-main-content" top="50px">
        <cl-button type="primary">距离滚动元素顶部50px时固定</cl-button>
    </cl-affix>
</template>
```
:::


:::demo 固定在底部

设置`bottom`属性控制固钉在`target`元素相对于底部的位置。

```html
<template>
    <cl-affix target="views-main-content" bottom="50px">
        <cl-button type="primary">距离滚动元素底部50px时固定</cl-button>
    </cl-affix>
</template>
```
:::


:::demo 不随滚动改变位置

设置`fix`属性控制固定在指定位置并且不随滚动改变。

```html
<template>
    <cl-affix target="views-main-content" fix bottom="10px">
        <cl-button type="primary">距离滚动元素底部50px时固定，不随滚动改变位置</cl-button>
    </cl-affix>
</template>
```
:::



## API

### Affix 固钉

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| target | String | 滚动监听的对象，HTML元素的类名。如果不设置则为window | - |
| top | String, Number | 固钉距离滚动监听对象顶部的距离，默认以top定位 | 0 |
| bottom | String, Number | 如果设置bottom则top不起作用，设置固定距离滚动监听对象底部的距离 | - |
| fix | Boolean | 是否固定在指定位置，不随滚动而滚动 | - |

### Affix event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| change | 图钉状态发生变化是触发 | true \ false |

### Affix slot

| 名称 | 说明 |
| ---- | ---- |
| - | 固钉内容 |
