# Message 全局提示

信息反馈。在顶部居中显示并自动消失。有多种提示状态可选择。

## 代码示例


:::demo 基础用法

普通提示，默认3秒后消失。显示位置距离视口顶部20px。可选类型提示 `info` `success` `warning` `error` 。

```html
<template>
    <Button type="info" @click="openMessage('info')">info</Button>
    <Button type="success" @click="openMessage('success')">success</Button>
    <Button type="warning" @click="openMessage('warning')">warning</Button>
    <Button type="danger" @click="openMessage('error')">error</Button>
</template>
<script>
    export default {
      data(){
        return {
          
        }
      },
      methods: {
        openMessage(type){
          this.$Message[type](`this is a ${type} message`);
        }
      }
    }
</script>

```

:::


:::demo 加载中

loading状态。异步在某个合适的时机移除。

```html
<template>
    <Button @click="loading">loading</Button>
</template>
<script>
    export default {
      data(){
        return {
          
        }
      },
      methods: {
        loading(){
            let msg = this.$Message.loading({
              duration: 0,
              content: 'this is a loading message',
            });
            setTimeout(()=>{
              msg.close();
            },3000)
        }
      }
    }
</script>

```

:::


:::demo 带背景色的提示

设置`background`属性可以实现带有背景色的提示。

```html
<template>
    <Button type="info" @click="openMessage('info')">info</Button>
    <Button type="success" @click="openMessage('success')">success</Button>
    <Button type="warning" @click="openMessage('warning')">warning</Button>
    <Button type="danger" @click="openMessage('error')">error</Button>
</template>
<script>
    export default {
      data(){
        return {
          
        }
      },
      methods: {
        openMessage(type){
            this.$Message[type]({
                content: `this is a ${type} backgroundColor`,
                background: true,
            })
        }
      }
    }
</script>

```

:::


:::demo HTML片段

`content`属性支持配置HTML片段。

```html
<template>
    <Button @click="configMessage">自定义配置</Button>
</template>
<script>
    export default {
        methods: {
            configMessage(){
                this.$Message.info({
                    duration: 3000,
                    content: '<b>this is a config message</b>',
                    // 触发关闭时的回调
                    onClose(){
                        console.log('message close');
                    }
                });
            }
        }
    }
</script>

```

:::



## API

### Message instance

直接通过一下方法来使用组件：

- `this.$Message.info(config)`

- `this.$Message.success(config)`

- `this.$Message.warning(config)`

- `this.$Message.error(config)`

- `this.$Message.loading(config)`

参数`config`可以是字符串或对象。当为字符串时为提示内容，可以配置第二个参数，此参数为时间，如：`this.$Message.info('this a message', 3000)`。当为对象时具体配置如下：

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| content | String | 提示内容，支持html字符串 | - |
| duration | Number | 自动关闭的延时，单位秒，值为0时不关闭 | 3000 |
| background | Boolean | 是否显示背景色 | false |
| closable | Boolean | 是否显示关闭按钮 | false |
| onClose | Function | 关闭时的回调 | - |


另外提供全局配置的方法：

- `this.$Message.config(config)`

参数`config`为对象。具体配置如下：

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| top | Number | 提示组件距离顶部的距离，单位px | 20 |
| duration | Number | 自动关闭的延时，单位毫秒，值为0时不关闭 | 3000 |
