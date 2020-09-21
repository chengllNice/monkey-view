# Popover 气泡提示

以卡片形式提示信息，与tooltip有很多类似的地方。

## 代码示例


:::demo 基础用法

支持三种触发方式：鼠标悬停、点击、获取焦点。默认点击。

注意：内容区域文本不自动换行。如需换行显示设置 `wordWrap`和`width`属性。

```html
<template>
    <Popover title="提示" trigger="hover" content="content">
        <Button>hover激活</Button>
    </Popover>
    <Popover title="提示" trigger="click" content="content">
        <Button>click激活</Button>
    </Popover>
    <Popover title="提示" trigger="focus" content="content">
        <Button>foucs激活</Button>
    </Popover>
    <Popover title="提示" trigger="focus" content="content">
        <m-input placeholder="input focus" />
    </Popover>
    <Popover title="提示" width="150px" wordWrap content="contentcontentcontentcontentcontentcontent">
        <Button>换行显示</Button>
    </Popover>
</template>

```

:::


:::demo 位置

组件提供了12个方向显示popover，详见API。

```html
<template>
    <div class="doc-margin-l10" style="text-align: center;width: 300px">
        <Popover title="提示" placement="top-start" content="content" render-html>
            <Button>上左</Button>
        </Popover>
        <Popover title="提示" placement="top" content="content" render-html>
            <Button>上边</Button>
        </Popover>
        <Popover title="提示" placement="top-end" content="content" render-html>
            <Button>上右</Button>
        </Popover>
    </div>
    <div class="doc-margin-l10 doc-popover-placement">
        <Popover title="提示" placement="left-start" content="content" render-html>
            <Button>左上</Button>
        </Popover>
        <Popover title="提示" placement="right-start" content="content" render-html>
            <Button>右上</Button>
        </Popover>
    </div>
    <div class="doc-margin-l10 doc-popover-placement">
        <Popover title="提示" placement="left" content="content" render-html>
            <Button>左边</Button>
        </Popover>
        <Popover title="提示" placement="right" content="content" render-html>
            <Button>右边</Button>
        </Popover>
    </div>
    <div class="doc-margin-l10 doc-popover-placement">
        <Popover title="提示" placement="left-end" content="content" render-html>
            <Button>左下</Button>
        </Popover>
        <Popover title="提示" placement="right-end" content="content" render-html>
            <Button>右下</Button>
        </Popover>
    </div>
    <div class="doc-margin-l10" style="text-align: center;width: 300px">
        <Popover title="提示" placement="bottom-start" content="content" render-html>
            <Button>下左</Button>
        </Popover>
        <Popover title="提示" placement="bottom" content="content" render-html>
            <Button>下边</Button>
        </Popover>
        <Popover title="提示" placement="bottom-end" content="content" render-html>
            <Button>下右</Button>
        </Popover>
    </div>
</template>
<style>
    .doc-popover-placement{
        width: 300px;
    }
    .doc-popover-placement:after{
        content: '';
        display: block;
        clear: both;
    }
    .doc-popover-placement>*:first-child{
        float: left;
    }
    .doc-popover-placement>*:last-child{
        float: right;
    }
</style>

```

:::


:::demo 浮层内关闭

默认只有点击浮层外部才可以关闭popover。可以通过 `v-model`来控制显示隐藏。

```html
<template>
     <Popover v-model="visibleClose" title="提示" content="content">
        <div slot="content">
            <Button type="text" @click="visibleClose = false">close</Button>
        </div>
        <Button>点击close关闭</Button>
    </Popover>
</template>
<script>
    export default {
      data(){
        return {
          visibleClose: false,
        }
      }
    }
</script>

```

:::


:::demo 确认框

设置 `confirm`属性开启确认框模式。此模式下不支持slot形式的自定义内容。

```html
<template>
    <Popover confirm title="您确定要删除这条内容么？" render-html @ok="confirmOk" @cancel="confirmCancel">
        <Button>删除</Button>
    </Popover>
</template>
<script>
    export default {
      data(){
        return {
          
        }
      },
      methods: {
        confirmCancel(){
          this.$Message.info('confirm Cancel')
        },
        confirmOk(){
          this.$Message.info('confirm Ok')
        }
      }
    }
</script>

```

:::


:::demo 指定渲染位置

可以通过 `renderHtml`来控制浮层元素渲染位置，在外层`overflow:hidden`的情况下可以指定渲染到`body`元素中使其不受影响。

```html
<template>
     <Popover title="提示" content="content" :render-html="true">
        <Button>渲染浮层元素到BODY中</Button>
    </Popover>
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

### Popover props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| placement | String | 提示框出现的位置，可选值`top` `top-start` `top-end` `bottom` `bottom-start` `bottom-end` `left` `left-start` `left-end` `right` `right-start` `right-end` | top |
| trigger | String | 触发方式，可选值`hover` `click` `focus` | click |
| title | String | 标题 | - |
| content | String | 显示的正文内容，确认框模式下无效 | - |
| width | String, Number | 宽度 | - |
| wordWrap | Boolean | 开启自动换行，需要配合`width`属性使用，确认框模式下无效 | - |
| disabled | Boolean | 禁用 | - |
| transition | String | 自定义动画效果 | fade |
| confirm | Boolean | 确认框模式 | - |
| ok-text | String | 确认框模式下，确定按钮的文字内容 | - |
| cancel-text | String | 确认框模式下，取消按钮的文字内容 | - |
| renderHtml | HTMLElement, Boolean | 自定义元素插入的位置，设置为`true`则渲染到body中，可以指定渲染元素 | false |




### Popover event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| cancel | 确认框模式下，取消按钮点击触发 | - |
| ok | 确认框模式下，确定按钮点击触发 | - |



### Popover slot

| 名称 | 说明 |
| ---- | ---- |
| - | 触发控件 |
| title | 标题 |
| content | 提示框内容，确认框模式下无效 |
