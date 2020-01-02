# Slider 滑块

拖动划款在某一个指定的区间内进行选择，不支持范围选择。

## 代码示例

:::demo 基础用法

可以使用v-model进行双向绑定。

设置`disabled`属性实现禁用。

```html
<template>
    <cl-slider v-model="valueBase"></cl-slider>
    <cl-slider v-model="valueBase1" :disabled="disabledBase"></cl-slider>
    <cl-switch v-model="disabledBase" width="50">
        <span slot="open">禁用</span>
        <span slot="close">启用</span>
    </cl-switch>
</template>
<script>
    export default {
      data(){
        return {
          valueBase: 20,
          valueBase1: 50,
          disabledBase: true
        }
      }
    }
</script>
```

:::


:::demo 步长

设置`step`控制每次改变的间隔大小。

```html
<template>
    <cl-slider v-model="valueStep" :step="10"></cl-slider>
</template>
<script>
    export default {
      data(){
        return {
          valueStep: 5,
        }
      }
    }
</script>
```

:::


:::demo 限制范围

设置`min`控制最小值。
设置`max`控制最大值。

```html
<template>
    <cl-slider v-model="valueLimit" :min="20" :max="80"></cl-slider>
</template>
<script>
    export default {
      data(){
        return {
          valueLimit: 30,
        }
      }
    }
</script>
```

:::


:::demo 垂直

设置`vertical`垂直显示滑块。

```html
<template>
    <cl-slider class="doc-slider-vertical" v-model="valueVertical" vertical></cl-slider>
    <cl-slider class="doc-slider-vertical" v-model="valueVerticalStep" vertical :step="10"></cl-slider>
</template>
<script>
    export default {
      data(){
        return {
          valueVertical: 30,
          valueVerticalStep: 30,
        }
      }
    }
</script>
```

:::


:::demo 自定义提示

设置`tipFormat`格式化提示值。

```html
<template>
    <cl-slider v-model="valueFormat" :tipFormat="tipFormat"></cl-slider>
</template>
<script>
    export default {
      data(){
        return {
          valueFormat: 30,
        }
      },
      methods: {
        tipFormat(value){
          return value + '%'
        }
      }
    }
</script>
```

:::


:::demo 自定义颜色

设置`railColor`设置轨道颜色。
设置`barColor`设置滑块颜色。

```html
<template>
    <cl-slider v-model="valueColor" railColor="#ccc" barColor="red"></cl-slider>
</template>
<script>
    export default {
      data(){
        return {
          valueColor: 30,
        }
      }
    }
</script>
```

:::


:::demo 信息提示方式

设置`tooltipVisible=always`设置提示信息一直存在。
设置`tooltipVisible=never`设置提示信息一直不存在。
默认鼠标悬停或者拖动时显示提示信息。

```html
<template>
    <cl-slider v-model="valueTip1"></cl-slider>
    <cl-slider v-model="valueTip2" tooltipVisible="always"></cl-slider>
    <cl-slider v-model="valueTip3" tooltipVisible="never"></cl-slider>
</template>
<script>
    export default {
      data(){
        return {
          valueTip1: 30,
          valueTip2: 30,
          valueTip3: 30,
        }
      }
    }
</script>
```

:::



## API

### Slider props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | Number, Array | Array类型暂时不支持。滑块选定的值，可以只用v-model双向绑定 | - |
| min | Number | 最小值 | 0 |
| max | Number | 最大值 | 100 |
| step | Number | 步长。取值建议能被(max-min)整除 | 1 |
| range | Boolean | 双滑块模式。暂不支持 | 1 |
| disabled | Boolean | 禁用 | - |
| vertical | Boolean | 垂直slider | - |
| tooltipVisible | String | tooltip的显示时机。可选值`hover` `always` `never`。hover时鼠标悬停显示，always时总是显示，never时总不显示 | hover |
| tipFormat | String | 格式化tooltip的显示内容 | value |
| railColor | String | 自定义rail轨道的颜色 | value |
| barColor | String | 自定义滑块的颜色 | value |


### Slider event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| change | 松开滑块并且值改变时触发，在滑动过程中不会触发 | value |


