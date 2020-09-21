# Modal 模态框

模态对话框，在浮层中显示，在保留当前页面的前提下，显示信息提示。

`Modal`提供了两种使用形式，普通组件形式和实例形式。

## 代码示例

### 普通组件使用方法


:::demo 基础用法

基础用法。通过控制 `value`属性显示、隐藏模态框。

使用 v-model实现双向绑定。

```html
<template>
    <Button type="primary" @click="modalBase = true">基础modal</Button>
    <Modal v-model="modalBase" title="Common Modal Title">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
</template>
<script>
    export default {
      data(){
        return {
          modalBase: false,
        }
      }
    }
</script>

```

:::


:::demo 自定义用法

自定义配置。更多自定义配置详见API。

```html
<template>
    <Button type="primary" @click="modalWidth = true">自定义宽度</Button>
    <Button type="primary" @click="modalTop = true">自定义距离顶部的距离</Button>
    <Button type="primary" @click="modalHeaderOrFooter = true">自定义页头和页脚</Button>
    <Modal v-model="modalWidth" title="Custom Modal Width" width="600px">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
    <Modal v-model="modalTop" title="Custom Modal Top" modalTop="30px">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
    <Modal v-model="modalHeaderOrFooter">
        <div slot="header" :style="{textAlign: 'center'}">
            Custom Modal HeaderOrFooter
        </div>
        <div slot="footer" :style="{textAlign: 'right'}">
            <Button>cancel</Button>
            <Button type="primary">ok</Button>
        </div>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
</template>
<script>
    export default {
      data(){
        return {
          modalWidth: false,
          modalTop: false,
          modalHeaderOrFooter: false,
        }
      }
    }
</script>

```

:::


:::demo 异步关闭

异步关闭。添加 `loading`属性后点击确定按钮后模态框不会自动消失，确定按钮会显示一个loading加载中的效果，需要自己手动关闭模态框。

```html
<template>
    <Button type="primary" @click="modalAsync = true">异步关闭</Button>
    <Modal v-model="modalAsync" :loading="loading" title="Async Modal Title" @ok="asyncClick">
        点击确定按钮，3秒后模态框关闭。
    </Modal>
</template>
<script>
    export default {
      data(){
        return {
          modalAsync: false,
          loading: true,
        }
      },
      methods: {
        asyncClick(){
          setTimeout(()=>{
            this.modalAsync = false;
          }, 3000)
        }
      }
    }
</script>

```

:::


:::demo 禁用关闭

可以禁用右上角关闭按钮和遮罩层关闭。

```html
<template>
    <Button type="primary" @click="modalCloseable = true">禁用右上角关闭按钮</Button>
    <Button type="primary" @click="modalCoverClosable = true">禁用遮罩层关闭</Button>
    <Modal v-model="modalCloseable" :closable="false" title="Closeable Modal Title">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
    <Modal v-model="modalCoverClosable" :coverClosable="false" title="CoverClosable Modal Title">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
</template>
<script>
    export default {
      data(){
        return {
          modalCloseable: false,
          modalCoverClosable: false,
        }
      }
    }
</script>

```

:::


:::demo 隐藏遮罩层

可以不显示遮罩层。

```html
<template>
    <Button type="primary" @click="modalCoverShow = true">不显示遮罩层</Button>
    <Modal v-model="modalCoverShow" :coverShow="false" title="CoverShow Modal Title">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
</template>
<script>
    export default {
      data(){
        return {
          modalCoverShow: false,
        }
      }
    }
</script>

```

:::


:::demo 全屏显示

设置 `fullscreen`属性显示全屏显示模态框。

```html
<template>
    <Button type="primary" @click="modalBase = true">全屏显示</Button>
    <Modal v-model="modalBase" title="Common Modal Title" fullscreen>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
</template>
<script>
    export default {
      data(){
        return {
          modalBase: false,
        }
      }
    }
</script>

```

:::


:::demo 内容超出滚动

当内容比较长时，设置 `bodyScroll`属性可以始终让模态框显示在可视区域内，内容会自动滚动。也可以自定义内容区域的height使内容超出时滚动。设置height时当不满足设置的高度(即大于屏幕高度)是此高度无效。

```html
<template>
    <Button type="primary" @click="modalScroll1 = true">默认滚动方式</Button>
    <Button type="primary" @click="modalScroll2 = true">超出滚动</Button>
    <Button type="primary" @click="modalScroll3 = true">设置height时超出滚动</Button>
    <Modal v-model="modalScroll1" title="Modal Title">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
    <Modal v-model="modalScroll2" :bodyScroll="true" title="BodyScroll Modal Title">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
    <Modal v-model="modalScroll3" height="200px" :bodyScroll="true" title="Set Height BodyScroll Modal Title">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
</template>
<script>
    export default {
      data(){
        return {
          modalScroll1: false,
          modalScroll2: false,
          modalScroll3: false,
        }
      }
    }
</script>

```

:::


### 实例化使用方法

除了上述的普通组件式的模态框的使用方式，还支持实例化的使用方法。


:::demo 基础用法

基本的实例化的模态框。只有一个确定按钮。有两种布局形式，通过 `type`控制。`content`属性可以是字符串也可以是数组，数组时为多行展示内容。另外可以配置按钮文字等信息，详细见API。

```html
<template>
    <Button type="info" @click="instance('info')">Info</Button>
    <Button type="success" @click="instance('success')">Success</Button>
    <Button type="warning" @click="instance('warning')">Warning</Button>
    <Button type="danger" @click="instance('error')">Error</Button>
    <p>切换布局方式</p>
    <m-switch width="60" v-model="instanceType" true-value="left" false-value="default">
        <span slot="open">left</span>
        <span slot="close">default</span>
    </m-switch>
</template>
<script>
    export default {
      data(){
        return {
          instanceType: 'default',//实例布局方式
        }
      },
      methods: {
        instance(type){
          this.$Modal[type]({
            title: `对话框的标题${type}`,
            content: `<p>一些对话框内容</p><b>一些对话框内容</b>`,
            type: this.instanceType,//布局方式
          })
        }
      }
    }
</script>

```

:::


:::demo 确定模态框

确定模态框。支持异步关闭。详细见API。

```html
<template>
     <Button type="primary" @click="confirm">确定模态框</Button>
     <Button type="primary" @click="confirmAsync">异步关闭</Button>
</template>
<script>
    export default {
      data(){
        return {
          instanceType: 'default',//实例布局方式
        }
      },
      methods: {
        confirm(){
          this.$Modal.confirm({
            title: '确定模态框',
            content: `<p>一些对话框内容</p><b>一些对话框内容</b>`,
          })
        },
        confirmAsync(){
          this.$Modal.confirm({
            title: '异步关闭的确定模态框',
            content: `<p>一些对话框内容</p><b>一些对话框内容</b>`,
            loading: true,
            onOk(){
              setTimeout(()=>{
                this.$Modal.remove();
              },2000);
            },
            onCancel(){
  
            }
          })
        }
      }
    }
</script>

```

:::



## API

### Modal props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| transition | Array | 自定义modal进入和离开的动画，第一个值为modal的动画，第二个为遮罩层的动画 | ['scale', 'fade'] |
| width | String, Number | 对话框宽度，可设置百分比 | 520 |
| height | String, Number | 对话框内容的高度，不可设置百分比 | - |
| value | Boolean | 对话框是否显示，可以使用v-model双向绑定 | - |
| fullscreen | Boolean | 是否全屏显示 | - |
| footerHide | Boolean | 隐藏footer | - |
| closable | Boolean | 是否显示右上角关闭按钮 | true |
| cancelText | String | 取消按钮的文字 | 取消 |
| okText | String | 确认按钮的文字 | 确定 |
| styles | Object | 设置modal的样式 | - |
| title | String | 标题 | - |
| loading | Boolean | 点击确定按钮时，确定按钮是否显示loading状态，开启则需要手动关闭对话框 | - |
| coverClosable | Boolean | 是否允许点击遮罩层关闭对话框 | true |
| coverShow | Boolean | 是否显示遮罩层 | true |
| bodyScroll | Boolean | 开启时在modal-body内容高度超出时滚动，modal的高度不会超出视口的高度。如果不开启此项，内容高度自动，超出时会出现浏览器的滚动条 | - |
| modalTop | String, Number | 对话框距离视口顶部的距离 | 100 |
| renderHtml | HTMLElement, Boolean | 指定对话框渲染到的HTML元素，`true`渲染到body中，`false`渲染到当前所在dom中 | true |


### Modal event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| cancel | 关闭对话框时触发 | - |
| ok | 点击确定按钮时触发 | - |



### Modal slot

| 名称 | 说明 |
| ---- | ---- |
| close | 自定义右上角关闭按钮 |
| header | 自定义页头内容 |
| footer | 自定义页脚内容 |



### Modal instance

通过调用一下实例化方法使用：

- `this.$Modal.info(config)`

- `this.$Modal.success(config)`

- `this.$Modal.warning(config)`

- `this.$Modal.error(config)`

- `this.$Modal.confirm(config)`

参数 `config` 为对象，具体参数如下：

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| width | String, Number | 宽度 | 350 |
| title | String | 标题 | - |
| content | String | 内容。可以为html字符串片段 | - |
| okText | String | 确定按钮的文本。confirm类型时有效 | 确定 |
| cancelText | String | 取消按钮的文本 | 取消 |
| loading | Boolean | 异步关闭时确定按钮的loading状态 | - |
| type | String | 布局类型，可选值`left` `default` | - |
