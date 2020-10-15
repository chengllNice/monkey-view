# Carousel 走马灯

基础组件，常用的操作按钮。

## 代码示例

:::demo 基础用法

基础用法

```html
<template>
    <Carousel>
        <CarouselItem class="doc-carousel-item">1</CarouselItem>
        <CarouselItem class="doc-carousel-item">2</CarouselItem>
        <CarouselItem class="doc-carousel-item">3</CarouselItem>
        <CarouselItem class="doc-carousel-item">4</CarouselItem>
    </Carousel>
</template>
```
:::

:::demo 自动切换

设置`autoplay`属性实现自动切换的功能。

设置`interval`属性控制自动切换的速度，单位ms，默认3000。

设置`loop`属性控制是否进行循环切换。

```html
<template>
    <Carousel autoplay :interval="2000" loop>
        <CarouselItem class="doc-carousel-item">1</CarouselItem>
        <CarouselItem class="doc-carousel-item">2</CarouselItem>
        <CarouselItem class="doc-carousel-item">3</CarouselItem>
        <CarouselItem class="doc-carousel-item">4</CarouselItem>
    </Carousel>
</template>
```
:::


:::demo 自定义指示器样式

设置`indicatorStyle`属性设置指示器的样式。

设置`indicatorActiveStyle`属性设置指示器选中状态的样式。

```html
<template>
    <Carousel :indicator-style="indicatorStyle" :indicator-active-style="indicatorActiveStyle">
        <CarouselItem class="doc-carousel-item" label="1">1</CarouselItem>
        <CarouselItem class="doc-carousel-item" label="2">2</CarouselItem>
        <CarouselItem class="doc-carousel-item" label="3">3</CarouselItem>
        <CarouselItem class="doc-carousel-item" label="4">4</CarouselItem>
    </Carousel>
</template>
<script>
    export default {
        data(){
            return {
                indicatorStyle: {
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    lineHeight: '20px',
                    textAlign: 'center',
                    padding: 0
                },
                indicatorActiveStyle: {
                    backgroundColor: '#ffffff',
                    color: '#333333'
                }
            }
        }
    }   
</script>
```
:::


:::demo 垂直方向

设置`direction`属性控制方向，默认水平，可选值 `horizontal` `vertical`。

垂直方向展示时不显示切换箭头。

```html
<template>
    <Carousel direction="vertical">
        <CarouselItem class="doc-carousel-item">1</CarouselItem>
        <CarouselItem class="doc-carousel-item">2</CarouselItem>
        <CarouselItem class="doc-carousel-item">3</CarouselItem>
        <CarouselItem class="doc-carousel-item">4</CarouselItem>
    </Carousel>
</template>
```
:::


:::demo 综合设置

动态配置选项。

```html
<templa
    <Form>
        <FormItem label="自动切换">
            <m-switch v-model="autoplay"></m-switch>
        </FormItem>
        <FormItem label="循环">
            <m-switch v-model="loop"></m-switch>
        </FormItem>
        <FormItem label="切换速度">
            <Slider v-model="interval" :step="1000" :min="2000" :max="8000"></Slider>
        </FormItem>
        <FormItem label="指示器位置">
            <RadioGroup v-model="indicator">
                <Radio label="inside">内置</Radio>
                <Radio label="outside">外置</Radio>
                <Radio label="none">不显示</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="切换箭头">
            <RadioGroup v-model="arrow">
                <Radio label="hover">悬停显示</Radio>
                <Radio label="always">一直显示</Radio>
                <Radio label="never">不显示</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="触发方式">
            <RadioGroup v-model="trigger">
                <Radio label="click">点击触发</Radio>
                <Radio label="hover">悬停触发</Radio>
            </RadioGroup>
        </FormItem>
    </Form> 

    <Carousel :autoplay="autoplay" 
                :loop="loop" 
                :interval="interval" 
                :indicator="indicator"
                :arrow="arrow"
                :trigger="trigger">
        <CarouselItem class="doc-carousel-item">1</CarouselItem>
        <CarouselItem class="doc-carousel-item">2</CarouselItem>
        <CarouselItem class="doc-carousel-item">3</CarouselItem>
        <CarouselItem class="doc-carousel-item">4</CarouselItem>
    </Carousel>
</template>
<script>
    export default {
        data(){
            return {
                autoplay: false,
                loop: false,
                interval: 3000,
                indicator: 'inside',
                arrow: 'hover',
                trigger: 'click',
            }
        }   
    }
</script>
```
:::


## API

### Carousel props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | Number | 选中的幻灯片的索引，从`0`开始，可以使用`v-model`双向绑定 | 0 |
| height | String, Number | 高度 | - |
| direction | String | 幻灯片的方向，可选值 `horizontal` `vertical` | horizontal |
| autoplay | Boolean | 是否自动播放 | - |
| interval | Number | 幻灯片播放间隔的时间，单位：ms | 3000 |
| loop | Boolean | 是否循环播放 | - |
| indicator | String | 指示器的位置，水平方向时有效，可选值 `inside`(内置) `outside`(外置) `none`(不显示) | inside |
| indicator-style | Object | 自定义指示器的样式 | - |
| indicator-active-style | Object | 自定义指示器选中状态的样式 | - |
| arrow | String | 切换箭头的显示时机，可选值 `hover`(悬停显示) `always`(一直显示) `never`(不显示) | hover |
| trigger | String | 触发方式，可选值 `click`(点击触发) `hover`(悬停触发) | click |
| easing | String | 自定义选灯片动画的`transition-timing-function`属性 | ease |


## Carousel event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| change | 幻灯片切换时触发，返回当前索引和上一个的索引 | newValue，oldValue |

### Carousel methods

| 名称 | 说明 | 参数 |
| ---- | ---- | ---- |
| goToIndex | 切换到指定的幻灯片，参数为幻灯片的索引 | index |
| prev | 切换到上一个幻灯片 | - |
| next | 切换到下一个幻灯片 | - |


### CarouselItem props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| label | String | 指示器显示的文本信息 | - |
