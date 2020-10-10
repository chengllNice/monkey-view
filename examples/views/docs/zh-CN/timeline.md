# Time 时间轴

垂直的展示时间流信息。

## 代码示例


:::demo 基础用法

时间轴基础用法示例。

```html
<template>
    <Timeline>
        <TimelineItem>
            <div class="doc-timeline-time">1月1日</div>
            元旦
        </TimelineItem>
        <TimelineItem>
            <div class="doc-timeline-time">5月1日</div>
            劳动节
        </TimelineItem>
        <TimelineItem>
            <div class="doc-timeline-time">6月1日</div>
            儿童节
        </TimelineItem>
        <TimelineItem>
            <div class="doc-timeline-time">10月1日</div>
            国庆节
        </TimelineItem>
    </Timeline>
</template>
<style>
    .doc-timeline-time{
        font-weight: 500;
        line-height: normal;
    }
</style>
```
:::


:::demo 圆圈颜色

用不同的颜色代表不同的状态，其中可以设置`blue` `green` `red` `gray` 或者其他自定义的色值；默认为`blue`。

```html
<template>
    <Timeline>
        <TimelineItem color="blue">
            构建开始
        </TimelineItem>
        <TimelineItem color="gray">
            构建中...
        </TimelineItem>
        <TimelineItem color="green">
            构建成功
        </TimelineItem>
        <TimelineItem color="red">
            构建失败
        </TimelineItem>
    </Timeline>
</template>
```
:::


:::demo 最后一个节点

设置`pending`属性标记最后一个节点为幽灵节点，表示还是完成、加载中等。

```html
<template>
    <Timeline pending>
        <TimelineItem>
            发布1.0版本
        </TimelineItem>
        <TimelineItem>
            发布2.0版本
        </TimelineItem>
        <TimelineItem>
            发布3.0版本
        </TimelineItem>
        <TimelineItem>
            <a href="javascript:;">查看更多</a>
        </TimelineItem>
    </Timeline>
</template>
```
:::


:::demo 自定义时间轴节点

设置`slot=node`自定义节点。

```html
<template>
    <Timeline>
        <TimelineItem>
            发布1.0版本
        </TimelineItem>
        <TimelineItem>
            发布2.0版本
        </TimelineItem>
        <TimelineItem color="red">
            <Icon slot="node" type="time" size="20"></Icon>
            发布3.0版本
        </TimelineItem>
        <TimelineItem>
            <a href="javascript:;">查看更多</a>
        </TimelineItem>
    </Timeline>
</template>
```
:::


:::demo 内容在左侧展示

设置`position`属性定义内容相对时间轴显示的位置，可选值 `left` `right`, 默认内容在时间轴右侧显示。

```html
<template>
     <Timeline position="left">
        <TimelineItem>
            <div class="doc-timeline-time">1月1日</div>
            元旦
        </TimelineItem>
        <TimelineItem>
            <div class="doc-timeline-time">5月1日</div>
            劳动节
        </TimelineItem>
        <TimelineItem color="red">
            <Icon type="time" size="20" slot="node"></Icon>
            <div class="doc-timeline-time">6月1日</div>
            儿童节
        </TimelineItem>
        <TimelineItem>
            <div class="doc-timeline-time">10月1日</div>
            国庆节
        </TimelineItem>
    </Timeline>
</template>
```
:::


:::demo 标签

设置`label`属性或者`slot=label`自定义标签，标签的位置和内容的位置相对；设置`position=left`时内容在时间轴左侧显示，标签在时间轴右侧显示。

```html
<template>
     <Timeline>
         <TimelineItem label="2020-01-01">
             发布1.0版本
         </TimelineItem>
         <TimelineItem>
            <span slot="label">2020-02-01</span>
             发布2.0版本
         </TimelineItem>
         <TimelineItem color="red">
             <span slot="label">2020-03-01</span>
             发布3.0版本
         </TimelineItem>
     </Timeline>
</template>
```
:::


:::demo 时间轴左右宽度

时间轴左右宽度设置只在标签`label`存在时生效。
 
设置`left-width`属性或者`right-width`属性自定义时间轴左侧和右侧的宽度。默认左右侧宽度为50%。

`left-width`和`right-width`不能同时设置。

```html
<template>
     <Timeline left-width="150">
         <TimelineItem label="2020-01-01">
             发布1.0版本
         </TimelineItem>
         <TimelineItem>
            <span slot="label">2020-02-01</span>
             发布2.0版本
         </TimelineItem>
         <TimelineItem color="red">
             <span slot="label">2020-03-01</span>
             发布3.0版本
         </TimelineItem>
     </Timeline>
</template>
```
:::




## API

### Timeline props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| pending | Boolean | 定义最后一个节点为幽灵节点 | - |
| node-type | String | 定义节点类型，可选值 `hollow`(空心节点)、`solid`(实心节点) | - |
| left-width | String, Number | 定义时间轴左侧的宽度，只在标签`label`存在时有效，不能和`right-width`同时使用 | - |
| right-width | String, Number | 定义时间轴右侧的宽度，只在标签`label`存在时有效，不能和`left-width`同时使用 | - |
| position | String | 定义内容相对时间轴的位置，可选值 `left` `right` | right |

### TimelineItem props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| color | String | 定义节点的样式，空心节点时默认为`blue`，实心节点时默认为`gray`，可选值 `blue` `red` `green` `gray` 或者自定义色值 | - |
| node-type | String | 定义节点类型，可选值 `hollow`(空心节点)、`solid`(实心节点) | hollow |
| label | String | 标签文本 | - |
| position | String | 定义内容相对时间轴的位置，可选值 `left` `right` | - |

