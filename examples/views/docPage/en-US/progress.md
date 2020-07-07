# Progress 进度条

展示当前操作的进度。比如文件上传。

## 代码示例


:::demo 基础用法

可以设置 `status`属性控制进度条的状态，可选值 `active` `success` `error` `warning`。

可以设置 `show-info`属性设置是否显示info信息。

可以使用 `slot模式`定义info信息。

```html
<template>
    <cl-progress :percent="25"></cl-progress>
    <cl-progress :percent="30" status="active"></cl-progress>
    <cl-progress :percent="30" status="success"></cl-progress>
    <cl-progress :percent="30" status="error"></cl-progress>
    <cl-progress :percent="30" status="warning"></cl-progress>
    <cl-progress :percent="30">
        <span>30</span>
    </cl-progress>
    <cl-progress :percent="30" status="warning" :show-info="false"></cl-progress>
</template>

```

:::


:::demo 定义宽度和百分比内置显示

可以设置 `stroke-width`属性控制进度条的宽度。

可以设置 `infoInside`属性设置info信息内置显示。

```html
<template>
    <cl-progress stroke-width="25px" :percent="25"></cl-progress>
    <cl-progress stroke-width="25px" infoInside :percent="25"></cl-progress>
</template>

```

:::


:::demo 格式化info信息

可以设置 `valueFormat`属性格式化info信息。该属性需要传入一个 `function`类型的值。

```html
<template>
    <cl-progress :percent="25" :valueFormat="valueFormat"></cl-progress>
</template>
<script>
    export default {
      data(){
        return {
          
        }
      },
      methods: {
        valueFormat(value){
          return value + '百分比'
        }
      }
    }
</script>

```

:::


:::demo 自定义颜色

自定义颜色支持渐变色。

可以设置 `bar-color`属性定义进度颜色。

可以设置 `rail-color`属性定义轨道颜色。

```html
<template>
    <cl-progress bar-color="#909399" rail-color="#e8e8e8" :percent="25"></cl-progress>
    <cl-progress bar-color="linear-gradient(to left, #ffffff, pink)" rail-color="#e8e8e8" :percent="25"></cl-progress>
</template>

```

:::


:::demo 圆形进度条

可以设置 `type='circle'`属性实现圆形进度条。

可以设置 `width`属性控制圆形进度条的大小。

可以使用 `strokeWidth`属性控制圆形进度条的线的宽度。

```html
<template>
    <cl-progress :percent="percent" type="circle"></cl-progress>
    <cl-button-group>
        <cl-button icon="cl-icon-plus" @click="percentChange('plus')"></cl-button>
        <cl-button icon="cl-icon-minus" @click="percentChange('minus')"></cl-button>
    </cl-button-group>
    <br>
    <cl-progress :percent="25" type="circle"></cl-progress>
    <cl-progress :percent="25" type="circle" width="100"></cl-progress>
    <cl-progress :percent="25" type="circle" width="100" strokeWidth="5"></cl-progress>
    <br>
    <cl-progress :percent="25" type="circle" status="success"></cl-progress>
    <cl-progress :percent="25" type="circle" status="error"></cl-progress>
    <cl-progress :percent="25" type="circle" status="warning"></cl-progress>
</template>
<script>
    export default {
      data(){
        return {
          percent: 0
        }
      },
      methods: {
        percentChange(type){
          this.percent = type === 'plus' ? this.percent + 10 : this.percent - 10;
          if(this.percent > 100){
            this.percent = 100
          }else if(this.percent < 0){
            this.percent = 0
          }
        }
      }
    }
</script>
```

:::


:::demo 仪表盘进度条

可以设置 `type='dashboard'`属性实现仪表盘式进度条。

```html
<template>
    <cl-progress :percent="80" type="dashboard"></cl-progress>
    <cl-progress :percent="25" type="dashboard" width="100"></cl-progress>
    <cl-progress :percent="25" type="dashboard" width="100" strokeWidth="5"></cl-progress>
</template>

```

:::



## API

### Progress props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | String | 设置进度条的类型，可选值 `line` `circle` `dashboard`，分别为线性进度条、圆形进度条、仪表盘式进度条 | line |
| percent | Number | 进度条进度值，必填项，范围0-100，百分比类型 | - |
| strokeWidth | String, Number | 进度条线的宽度 | 10 |
| status | String | 进度条状态 | - |
| valueFormat | Function | 格式化进度值，默认格式化类型为percent + '%' | - |
| showInfo | Boolean | 是否显示进度信息 | true |
| infoInside | Boolean | 进度信息内置，只在`inline`模式下有效 | - |
| railColor | String | 进度条轨道颜色，支持渐变色 | - |
| barColor | String | 进度条颜色，支持渐变色 | - |
| width | String, Number | 设置进度条的宽度，圆形和仪表盘式进度条时有效 | 126 |


### Progress slot

| 名称 | 说明 |
| ---- | ---- |
| - | 自定义进度信息的显示内容 |

