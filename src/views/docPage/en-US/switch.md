# Switch 开关

在两种状态之间切换。

## 代码示例


:::demo 基础用法

可以使用v-model进行双向绑定。

```html
<template>
    <cl-switch v-model="valueBase"></cl-switch>
</template>
<script>
    export default {
      data(){
        return {
          valueBase: false
        }
      }
    }
</script>

```

:::


:::demo 尺寸

设置`size`属性控制大小，可选值 `small` `large`或者不设置。

```html
<template>
    <cl-switch v-model="valueMini" size="mini"></cl-switch>
    <cl-switch v-model="valueSmall" size="small"></cl-switch>
    <cl-switch v-model="valueDefault"></cl-switch>
    <cl-switch v-model="valueLarge" size="large"></cl-switch>
</template>
<script>
    export default {
      data(){
        return {
          valueMini: false,
          valueSmall: false,
          valueDefault: true,
          valueLarge: false,
        }
      }
    }
</script>

```

:::


:::demo 禁用

设置`disabled`属性禁用。

```html
<template>
    <cl-switch v-model="valueDisabled" disabled></cl-switch>
</template>
<script>
    export default {
      data(){
        return {
          valueDisabled: false,
        }
      }
    }
</script>

```

:::


:::demo 文字和图标

自定义内容。两个字时使用`large`尺寸的更合适。更多字时设置`width`属性显示效果更好。

```html
<template>
    <cl-switch>
        <span slot="open"><i class="cl-icon-check"></i></span>
        <span slot="close"><i class="cl-icon-close"></i></span>
    </cl-switch>
    <cl-switch>
        <span slot="open">开</span>
        <span slot="close">关</span>
    </cl-switch>
    <cl-switch size="large">
        <span slot="open">打开</span>
        <span slot="close">关闭</span>
    </cl-switch>
    <cl-switch width="80px">
        <span slot="open">已经开启</span>
        <span slot="close">已经关闭</span>
    </cl-switch>
</template>

```

:::


:::demo 自定义背景色

设置`checkedColor`定义选中时的背景色。

```html
<template>
    <cl-switch checkedColor="red"></cl-switch>
</template>

```

:::


:::demo 加载中

设置`loading`属性定义加载中的状态。

```html
<template>
    <cl-switch loading></cl-switch>
</template>

```

:::


:::demo 定义选中值和取消选中的值

设置`trueValue`和`falseValue`属性分别定义选中时返回的值和取消选中时返回的值。

```html
<template>
    <cl-switch v-model="value" trueValue="1" falseValue="0" @change="handlerChange"></cl-switch>
</template>
<script>
    export default {
      data(){
        return {
          value: '0'
        }
      },
      methods: {
        handlerChange(value){
          let tip = value === '0' ? '取消选中' : '选中';
          this.$Message.info(tip + value)
        }
      }
    }
</script>

```

:::



## API

### Switch props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | String, Number, Boolean | 指定当前是否选中，可以使用v-model双向绑定 | false |
| trueValue | String, Number, Boolean | 指定选中时的值 | true |
| falseValue | String, Number, Boolean | 指定没有选中时的值 | false |
| name | String | 原生name属性 | - |
| size | String | 尺寸，可选值 `mini` `small` `default` `large`或者不设置 | - |
| checkedColor | String | 可以自定义选中时的颜色 | - |
| uncheckedColor | String | 可以自定义没有选中时的颜色 | - |
| disabled | Boolean | 禁用选项 | - |
| width | String, Number | 定义宽度。建议当文字比较多时设置此项 | - |
| loading | Boolean | 加载中的开关 | value |


### Switch event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| change | 开关状态变化时触发，返回当前状态 | value |


### Switch slot

| 名称 | 说明 |
| ---- | ---- |
| open | 自定义打开时的文字内容 |
| close | 自定义关闭时的文字内容 |
