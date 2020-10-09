# Notice 信息通知

概述：在右上角显示可关闭的全局通知提示，用于展示重要信息或者系统推送等。


## 代码示例


:::demo 基础用法

基础用法。默认4.5s后自动关闭，可自定义关闭时间。

```html
<template>
    <Button type="primary" @click="openNotice(true)">默认</Button>
    <Button @click="openNotice(false)">仅标题</Button>
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
    <Button @click="openNotice('info', true)">info</Button>
    <Button @click="openNotice('success', true)">success</Button>
    <Button @click="openNotice('warning', true)">warning</Button>
    <Button @click="openNotice('error', true)">error</Button>
    
    <h4>仅标题</h4>
    <Button @click="openNotice('info', false)">info</Button>
    <Button @click="openNotice('success', false)">success</Button>
    <Button @click="openNotice('warning', false)">warning</Button>
    <Button @click="openNotice('error', false)">error</Button>
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
    <Button type="info" @click="openNotice('info')">info</Button>
    <Button type="success" @click="openNotice('success')">success</Button>
    <Button type="warning" @click="openNotice('warning')">warning</Button>
    <Button type="danger" @click="openNotice('error')">error</Button>
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
    <Row :gutter="16">
        <Col>
            <Select v-model="placement" @change="placementChange">
                <Option value="topLeft">topLeft</Option>
                <Option value="topRight">topRight</Option>
                <Option value="bottomLeft">bottomLeft</Option>
                <Option value="bottomRight">bottomRight</Option>
            </Select>
        </Col>
        <Col>
            <Button type="primary" @click="openNotice">placement</Button>
        </Col>
    </Row>
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
| placement | String | 出现的位置，可选值 `topLeft` `topRight` `bottomLeft` `BottomRight` | topRight |
