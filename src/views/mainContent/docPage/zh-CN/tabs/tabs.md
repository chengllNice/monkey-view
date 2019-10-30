# Tabs 标签页

概述：导航选项卡组件，区分不同平级块内容。


## 代码示例


:::demo 基础用法

基础用法。`tab-pane`组件`c-key`是必选属性，唯一标识；`label`属性可以定义tab标签的名称，同时也支持`slot`实现label；`disabled`属性可以禁用标签页。`tabs`组件可以通过`v-model`实现双向绑定指定选中的tab页，值为`tab-pane`属性`c-key`的值。

```html
<template>
    <cl-tabs v-model="activeTab">
        <cl-tab-pane label="标签一" c-key="1" disabled>
            标签一内容
        </cl-tab-pane>
        <cl-tab-pane label="标签二" c-key="2">
            标签二内容
        </cl-tab-pane>
        <cl-tab-pane c-key="3">
            <div slot="label">标签三</div>
            标签三内容
        </cl-tab-pane>
        <cl-tab-pane label="标签四" c-key="4" disabled>
            标签四内容
        </cl-tab-pane>
        <cl-tab-pane label="标签五" c-key="5">
            标签五内容
        </cl-tab-pane>
    </cl-tabs>
</template>
<script>
    export default {
      data(){
        return {
          activeTab: '2'
        }
      }
    }
</script>

```

:::


:::demo 尺寸

可以设置四种尺寸 `mini` `small` `large` 不设置为默认尺寸。

```html
<template>
    <h4>mini</h4>
    <cl-tabs size="mini">
        <cl-tab-pane label="标签一" c-key="1">
            标签一内容
        </cl-tab-pane>
        <cl-tab-pane label="标签二" c-key="2">
            标签二内容
        </cl-tab-pane>
        <cl-tab-pane c-key="3">
            <div slot="label">标签三</div>
            标签三内容
        </cl-tab-pane>
    </cl-tabs>
    
    <h4>small</h4>
    <cl-tabs size="small">
        <cl-tab-pane label="标签一" c-key="1">
            标签一内容
        </cl-tab-pane>
        <cl-tab-pane label="标签二" c-key="2">
            标签二内容
        </cl-tab-pane>
        <cl-tab-pane c-key="3">
            <div slot="label">标签三</div>
            标签三内容
        </cl-tab-pane>
    </cl-tabs>
    
    <h4>default</h4>
    <cl-tabs>
        <cl-tab-pane label="标签一" c-key="1">
            标签一内容
        </cl-tab-pane>
        <cl-tab-pane label="标签二" c-key="2">
            标签二内容
        </cl-tab-pane>
        <cl-tab-pane c-key="3">
            <div slot="label">标签三</div>
            标签三内容
        </cl-tab-pane>
    </cl-tabs>
    
    <h4>large</h4>
    <cl-tabs size="large">
        <cl-tab-pane label="标签一" c-key="1">
            标签一内容
        </cl-tab-pane>
        <cl-tab-pane label="标签二" c-key="2">
            标签二内容
        </cl-tab-pane>
        <cl-tab-pane c-key="3">
            <div slot="label">标签三</div>
            标签三内容
        </cl-tab-pane>
    </cl-tabs>
</template>

```

:::


:::demo 卡片类型

设置`type="card"`可以实现卡片类型的tabs。

```html
<template>
    <cl-tabs type="card">
        <cl-tab-pane label="标签一" c-key="1">
            标签一内容
        </cl-tab-pane>
        <cl-tab-pane label="标签二" c-key="2">
            标签二内容
        </cl-tab-pane>
        <cl-tab-pane c-key="3">
            <div slot="label">标签三</div>
            标签三内容
        </cl-tab-pane>
    </cl-tabs>
</template>

```

:::


:::demo 额外扩展

`extra`slot支持额外扩展。

```html
<template>
    <cl-tabs align="left">
        <cl-button size="small" slot="extra">ADD</cl-button>
        <cl-tab-pane label="标签一" c-key="1">
            标签一内容
        </cl-tab-pane>
        <cl-tab-pane label="标签二" c-key="2">
            标签二内容
        </cl-tab-pane>
        <cl-tab-pane c-key="3">
            <div slot="label">标签三</div>
            标签三内容
        </cl-tab-pane>
    </cl-tabs>
</template>

```

:::


:::demo 位置

设置`align`属性可以tabs在不同的位置出现，支持三种类型 `left` `center` `right`，默认为`left`。其中`left` `right`支持设置额外扩展，`center`不支持额外扩展。

```html
<template>
    <h4>left</h4>
    <cl-tabs align="left">
        <cl-tab-pane label="标签一" c-key="1">
            标签一内容
        </cl-tab-pane>
        <cl-tab-pane label="标签二" c-key="2">
            标签二内容
        </cl-tab-pane>
        <cl-tab-pane c-key="3">
            <div slot="label">标签三</div>
            标签三内容
        </cl-tab-pane>
    </cl-tabs>
    
    <h4>center</h4>
    <cl-tabs align="center">
        <cl-tab-pane label="标签一" c-key="1">
            标签一内容
        </cl-tab-pane>
        <cl-tab-pane label="标签二" c-key="2">
            标签二内容
        </cl-tab-pane>
        <cl-tab-pane c-key="3">
            <div slot="label">标签三</div>
            标签三内容
        </cl-tab-pane>
    </cl-tabs>
    
    <h4>right</h4>
    <cl-tabs align="right">
        <cl-tab-pane label="标签一" c-key="1">
            标签一内容
        </cl-tab-pane>
        <cl-tab-pane label="标签二" c-key="2">
            标签二内容
        </cl-tab-pane>
        <cl-tab-pane c-key="3">
            <div slot="label">标签三</div>
            标签三内容
        </cl-tab-pane>
    </cl-tabs>
</template>

```

:::


:::demo 边框

`border`属性设置边框。

```html
<template>
    <cl-tabs border type="card">
        <cl-tab-pane label="标签一" c-key="1">
            标签一内容
        </cl-tab-pane>
        <cl-tab-pane label="标签二" c-key="2">
            标签二内容
        </cl-tab-pane>
        <cl-tab-pane c-key="3">
            <div slot="label">标签三</div>
            标签三内容
        </cl-tab-pane>
    </cl-tabs>
</template>

```

:::


:::demo 可关闭

设置`closable`属性实现可关闭的标签。

```html
<template>
    <cl-tabs closable type="card" @tab-remove="tabRemove">
        <cl-tab-pane label="标签一" c-key="1">
            标签一内容
        </cl-tab-pane>
        <cl-tab-pane label="标签二" c-key="2">
            标签二内容
        </cl-tab-pane>
        <cl-tab-pane c-key="3">
            <div slot="label">标签三</div>
            标签三内容
        </cl-tab-pane>
    </cl-tabs>
</template>
<script>
    export default {
        data(){
            return {
                
            }
        },
        methods: {
            tabRemove(key){
                this.$Message.info(`关闭key值为${key}标签`)
            }
        }
    }
</script>

```

:::


:::demo 禁用动画效果

`animation`属性控制是否使用动画效果，默认true。

```html
<template>
    <cl-tabs :animation="false" type="card">
        <cl-tab-pane label="标签一" c-key="1">
            标签一内容
        </cl-tab-pane>
        <cl-tab-pane label="标签二" c-key="2">
            标签二内容
        </cl-tab-pane>
        <cl-tab-pane c-key="3">
            <div slot="label">标签三</div>
            标签三内容
        </cl-tab-pane>
    </cl-tabs>
</template>

```

:::


:::demo 自定义样式

`nav-style`属性设置支持自定义样式，详细配置见API。

```html
<template>
    <cl-tabs :nav-style="navStyle">
        <cl-tab-pane label="标签一" c-key="1">
            标签一内容
        </cl-tab-pane>
        <cl-tab-pane label="标签二" c-key="2">
            标签二内容
        </cl-tab-pane>
        <cl-tab-pane c-key="3">
            <div slot="label">标签三</div>
            标签三内容
        </cl-tab-pane>
    </cl-tabs>
    
    <cl-tabs type="card" :nav-style="navStyle">
        <cl-tab-pane label="标签一" c-key="1">
            标签一内容
        </cl-tab-pane>
        <cl-tab-pane label="标签二" c-key="2">
            标签二内容
        </cl-tab-pane>
        <cl-tab-pane c-key="3">
            <div slot="label">标签三</div>
            标签三内容
        </cl-tab-pane>
    </cl-tabs>
</template>
<script>
    export default {
        data(){
            return {
                navStyle: {
                    defaultBackground: '#f8f8f9',
                    activeBackground: '#ffffff',
                    defaultColor: '#333333',
                    activeColor: '#ff0000',
                    defaultBorderColor: '#eeeeee',
                    activeBorderColor: '#ff0000',
                }
            }
        }
    }
</script>

```

:::



## API

### Tabs props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | String | 标签页的类型，可选值 `card` `line` | line |
| value | String | 绑定的`tab-pane`属性`c-key`的值，可以使用v-model进行双向绑定 | - |
| size | String | 尺寸，可选值 `mini` `small` `large`或者不设置 | - |
| closable | Boolean | 是否可关闭 | - |
| align | String | 标签页的位置，可选值 `left` `center` `right`，其中`left` `right`时可设置额外扩展，`center`时不可设置额外扩展 | left |
| border | Boolean | 是否显示边框 | - |
| navStyle | Object | 例如 `{defaultBackground: '', activeBackground: '',defaultColor: '',activeColor: '',defaultBorderColor: '',activeBorderColor: ''}`。`defaultBackground`为默认背景色；`activeBackground`为选中时的背景色；`defaultColor`为默认文字颜色；`activeColor`为选中时的文字颜色；`defaultBorderColor`为默认边框颜色；`activeBorderColor`为选中时的边框颜色。可以单独设置某一项而不必全部设置 | - |
| animation | Boolean | 是否开启动画效果 | true |


### Tabs event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| tab-click | 点击标签页时触发 | c-key |
| tab-remove | 关闭标签页时触发 | c-key |



### Tabs slot

| 名称 | 说明 |
| ---- | ---- |
| extra | 额外扩展内容，`align="center"`时无效 |


### TabPane props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| label | String | 标签页的名称 | - |
| cKey | String | 标签页的唯一标识，必选属性 | - |
| disabled | Boolean | 是否禁用标签页 | - |
| order | Number | 标签页的顺序，在`tab-pane`组件使用`v-if`属性时并不会按照预期的顺序进行排列，这时可以设置此属性实现预期标签的顺序，此值大于0并且不重复 | - |


### TabPane slot

| 名称 | 说明 |
| ---- | ---- |
| label | 自定义`label`的内容 |
