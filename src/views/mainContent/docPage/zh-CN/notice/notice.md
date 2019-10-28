# Notice 信息通知

概述：在右上角显示可关闭的全局通知提示，用于展示重要信息或者系统推送等。


## 代码示例


:::demo 基础用法

基础用法。默认4.5s后自动关闭，可自定义关闭时间。

```html
<template>
    <cl-button type="primary" @click="openNotice(true)">默认</cl-button>
    <cl-button @click="openNotice(false)">仅标题</cl-button>
</template>
<script>
    export default {
      data(){
        return {
          
        }
      },
      methods: {
        openNotice(isContent){
          this.$Notice.open({
            title: '通知的标题',
            content: isContent && '通知的内容',
            duration: 3000
          });
        }
      }
    }
</script>

```

:::


:::demo 通知类型

带有默认类型通知图标的通知提示，支持四种类型 `info` `success` `warning` `error` 。

```html
<template>
    <h4>带内容</h4>
    <cl-button @click="openNotice('info', true)">info</cl-button>
    <cl-button @click="openNotice('success', true)">success</cl-button>
    <cl-button @click="openNotice('warning', true)">warning</cl-button>
    <cl-button @click="openNotice('error', true)">error</cl-button>
    
    <h4>仅标题</h4>
    <cl-button @click="openNotice('info', false)">info</cl-button>
    <cl-button @click="openNotice('success', false)">success</cl-button>
    <cl-button @click="openNotice('warning', false)">warning</cl-button>
    <cl-button @click="openNotice('error', false)">error</cl-button>
</template>
<script>
    export default {
      data(){
        return {
          
        }
      },
      methods: {
        openNotice(type, isContent){
          this.$Notice[type]({
            title: '通知的标题',
            content: isContent && '通知的内容',
          });
        }
      }
    }
</script>

```

:::



:::demo 带有背景色的通知

设置`background`属性可以实现带有背景色的通知。

```html
<template>
    <cl-button type="info" @click="openNotice('info')">info</cl-button>
    <cl-button type="success" @click="openNotice('success')">success</cl-button>
    <cl-button type="warning" @click="openNotice('warning')">warning</cl-button>
    <cl-button type="danger" @click="openNotice('error')">error</cl-button>
</template>
<script>
    export default {
      data(){
        return {
          
        }
      },
      methods: {
        openNotice(type){
          this.$Notice[type]({
            title: '通知的标题',
            content: '通知的内容',
            background: true
          });
        }
      }
    }
</script>

```

:::


:::demo 自定义位置

全局配置`placement`属性可以定义`notice`出现的位置，可选值 `topLeft` `topRight` `bottomLeft` `bottomRight`, 默认值为`topRight`;

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <cl-select v-model="placement" @change="placementChange">
                <cl-option value="topLeft">topLeft</cl-option>
                <cl-option value="topRight">topRight</cl-option>
                <cl-option value="bottomLeft">bottomLeft</cl-option>
                <cl-option value="bottomRight">bottomRight</cl-option>
            </cl-select>
        </cl-col>
        <cl-col>
            <cl-button type="primary" @click="openNotice">placement</cl-button>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
        data(){
            return {
                placement: 'topRight'
            }
        },
        methods: {
            placementChange(value){
                this.$Notice.config({
                    placement: value
                })
            },
            openNotice(){
                this.$Notice.open({
                    title: '通知的标题',
                    content: '通知的内容',
                });
            }
        }
    }
</script>

```

:::




## API

### Notice instance

直接通过一下方法来使用组件：

- `this.$Notice.open(config)`

- `this.$Notice.info(config)`

- `this.$Notice.success(config)`

- `this.$Notice.warning(config)`

- `this.$Notice.error(config)`


参数`config`为或对象。具体配置如下：

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| title | String | 通知标题 | - |
| content | String | 通知内容，支持html字符串 | - |
| duration | Number | 自动关闭的延时，单位ms，值为0时不关闭 | 4500 |
| background | Boolean | 是否显示背景色 | false |
| onClose | Function | 关闭时的回调 | - |


另外提供全局配置的方法：

- `this.$Notice.config(config)`

参数`config`为对象。具体配置如下：

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| position | Number | 第一个notice提示信息距离顶部或者底部的距离，单位px | 85 |
| duration | Number | 自动关闭的延时，单位ms，值为0时不关闭 | 4500 |
| noticeItemDis | Number | 每个notice提示信息之间的距离 | 10 |
| placement | String | 出现的位置，可选值 `topLeft` `topRight` `bottomLeft` `BottomRight` | topRight |
