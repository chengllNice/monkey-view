# BackTop 回到顶部

当页面内容比较长时需要快捷返回顶部时使用。

## 代码示例


:::demo 基础用法

基本简单的使用方法。默认位置距离窗口底边和右边30px，滚动距离顶部400px时显示。

```html
<template>
    <BackTop />
    
    <div>此页面window对象没有滚动，所以不能回到顶部</div>
</template>
```
:::


:::demo 设置监听滚动的元素

设置`target`属性可以定义滚动监听的元素，值为需要监听元素的`class`类名，此类名需唯一。默认监听window对象实现滚动。

```html
<template>
    <BackTop target="views-main-content" />
        
    <div>监听class为views-main-content的元素的滚动。向下滚动页面，灰色的按钮为默认效果</div>
</template>
```
:::



:::demo 自定义效果

自定义效果

```html
<template>
    <BackTop target="views-main-content" bottom="100">
        <div class="doc-back-top-button">UP</div>
    </BackTop>
            
    <div>监听class为views-main-content的元素的滚动。向下滚动页面，UP为自定义按钮</div>
</template>
```
:::



## API

### BackTop props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| target | String | 滚动监听的对象，HTML元素。如果不设置则为window | - |
| height | String, Number | 出现回到顶部按钮的最小高度 | 400 |
| bottom | String, Number | 回到顶部按钮距离窗口底边的距离 | 30 |
| right | String, Number | 回到顶部按钮距离窗口右边的距离 | 30 |
| duration | Number | 滚动动画的时间，单位：ms | 1000 |


### BackTop slot

| 名称 | 说明 |
| ---- | ---- |
| - | 自定义回到顶部的按钮 |
