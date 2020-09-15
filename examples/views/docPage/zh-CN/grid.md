# Grid 栅格

24栅格系统。

## 概述

栅格系统采用24栅格的布局，将一行区域进行24等分，这样可以轻松解决绝大部分布局问题，使页面排版更美观、舒适。

栅格系统定义两个概念，即行`row`和列`col`，具体使用如下：

- 使用`row`在水平方向创建一行

- 使用`col`在垂直方向创建一列

- 通过`col`的`span`属性指定列的范围，如果不主动设置，内部会计算平分行空间

- 一行可以分多列，即可以使用多个`col`，总和不能超过24

- 在每个`col`中填入自己的内容

## 代码示例



:::demo 基础使用

基础使用方法。`col`必须放在 `row`里边。可以通过 `span`属性控制列的范围。不主动设置 `span`属性时内部会自动计算空间设置列范围。`span`为0时相当于 `display: none;`。

```html
<template>
    <div class="doc-grid-row-wrap">
        <Row class="doc-grid-row">
            <Col class='doc-grid-row-col'><div class="doc-grid-col">24: 100%</div></Col>
        </Row>
    </div>
    <div class="doc-grid-row-wrap">
        <Row class="doc-grid-row">
            <Col class='doc-grid-row-col'><div class="doc-grid-col">12: 50%</div></Col>
            <Col class='doc-grid-row-col'><div class="doc-grid-col">12: 50%</div></Col>
        </Row>
    </div>
    <div class="doc-grid-row-wrap">
        <Row class="doc-grid-row">
            <Col class='doc-grid-row-col'><div class="doc-grid-col">8: 33.33%</div></Col>
            <Col class='doc-grid-row-col'><div class="doc-grid-col">8: 33.33%</div></Col>
            <Col class='doc-grid-row-col'><div class="doc-grid-col">8: 33.33%</div></Col>
        </Row>
    </div>
    <div class="doc-grid-row-wrap">
        <Row class="doc-grid-row">
            <Col class='doc-grid-row-col'><div class="doc-grid-col">6: 25%</div></Col>
            <Col class='doc-grid-row-col'><div class="doc-grid-col">6: 25%</div></Col>
            <Col class='doc-grid-row-col'><div class="doc-grid-col">6: 25%</div></Col>
            <Col class='doc-grid-row-col'><div class="doc-grid-col">6: 25%</div></Col>
        </Row>
    </div>
    <div class="doc-grid-row-wrap">
        <Row class="doc-grid-row">
            <Col class='doc-grid-row-col' span="16"><div class="doc-grid-col">16: 66.66%</div></Col>
            <Col class='doc-grid-row-col' span="8"><div class="doc-grid-col">8: 33.33%</div></Col>
        </Row>
    </div>
</template>

```

:::


:::demo 列间隔

通过给 `row`组件设置`gutter`属性设置列间隔，单位 `px`。

```html
<template>
    <Row class="doc-grid-row" :gutter="16">
        <Col class='doc-grid-row-col'><div class="doc-grid-col">col-6</div></Col>
        <Col class='doc-grid-row-col'><div class="doc-grid-col">col-6</div></Col>
        <Col class='doc-grid-row-col'><div class="doc-grid-col">col-6</div></Col>
        <Col class='doc-grid-row-col'><div class="doc-grid-col">col-6</div></Col>
    </Row>
</template>
<style>
    .doc-grid-row{
        margin: 10px 0;
    }
    .doc-grid-row-col:nth-of-type(even) .doc-grid-col{
        background-color: rgba(2,183,165, 0.3);
    }
    .doc-grid-col{
        padding: 30px 0;
        background-color: rgba(2,183,165, 0.8);
        color: #ffffff;
        text-align: center;
        font-size: 16px;
    }
</style>

```

:::


:::demo 左右偏移

通过给 `col`组件设置`offset`属性进行左右偏移，`offset`的值为偏移的栅格数。

```html
<template>
    <Row class="doc-grid-row">
        <Col class='doc-grid-row-col' span="8"><div class="doc-grid-col">col-8</div></Col>
        <Col class='doc-grid-row-col' span="8" offset="8"><div class="doc-grid-col">col-8 | offset-8</div></Col>
    </Row>

    <Row class="doc-grid-row">
        <Col class='doc-grid-row-col' span="6" offset="8"><div class="doc-grid-col">col-6</div></Col>
        <Col class='doc-grid-row-col' span="6" offset="4"><div class="doc-grid-col">col-6</div></Col>
    </Row>

    <Row class="doc-grid-row">
        <Col class='doc-grid-row-col' span="12" offset="8"><div class="doc-grid-col">col-6</div></Col>
    </Row>
</template>
<style>
    .doc-grid-row{
        margin: 10px 0;
    }
    .doc-grid-row-col:nth-of-type(even) .doc-grid-col{
        background-color: rgba(2,183,165, 0.3);
    }
    .doc-grid-col{
        padding: 30px 0;
        background-color: rgba(2,183,165, 0.8);
        color: #ffffff;
        text-align: center;
        font-size: 16px;
    }
</style>

```

:::


:::demo 栅格排序

通过给 `col`组件设置`pull`属性和 `push`属性设置栅格排序。

```html
<template>
    <Row class="doc-grid-row">
        <Col class='doc-grid-row-col' span="18" push="6"><div class="doc-grid-col">col-18 | push-6</div></Col>
        <Col class='doc-grid-row-col' span="6" pull="18"><div class="doc-grid-col">col-6 | push-18</div></Col>
    </Row>
</template>
<style>
    .doc-grid-row{
        margin: 10px 0;
    }
    .doc-grid-row-col:nth-of-type(even) .doc-grid-col{
        background-color: rgba(2,183,165, 0.3);
    }
    .doc-grid-col{
        padding: 30px 0;
        background-color: rgba(2,183,165, 0.8);
        color: #ffffff;
        text-align: center;
        font-size: 16px;
    }
</style>

```

:::


:::demo 栅格顺序

通过给 `col`组件设置`order`属性改变栅格顺序。

```html
<template>
    <Row class="doc-grid-row">
        <Col class='doc-grid-row-col' span="6" order="4"><div class="doc-grid-col">col-6 | order-4</div></Col>
        <Col class='doc-grid-row-col' span="6" order="3"><div class="doc-grid-col">col-6 | order-3</div></Col>
        <Col class='doc-grid-row-col' span="6" order="2"><div class="doc-grid-col">col-6 | order-2</div></Col>
        <Col class='doc-grid-row-col' span="6" order="1"><div class="doc-grid-col">col-6 | order-1</div></Col>
    </Row>
</template>
<style>
    .doc-grid-row{
        margin: 10px 0;
    }
    .doc-grid-row-col:nth-of-type(even) .doc-grid-col{
        background-color: rgba(2,183,165, 0.3);
    }
    .doc-grid-col{
        padding: 30px 0;
        background-color: rgba(2,183,165, 0.8);
        color: #ffffff;
        text-align: center;
        font-size: 16px;
    }
</style>

```

:::


:::demo Flex布局

通过给 `row`组件设置`type='flex'`开启Flex布局，设置 `justify`属性控制水平方向的布局，设置 `align`属性控制垂直方向的布局。

```html
<template>
    <div class="doc-grid-row-wrap-align">
        <Row class="doc-grid-row" type="flex" :align="alignModel" :justify="justifyModel">
            <Col class='doc-grid-row-col' span="4"><div class="doc-grid-col">col-4</div></Col>
            <Col class='doc-grid-row-col' span="4"><div class="doc-grid-col">col-4</div></Col>
            <Col class='doc-grid-row-col' span="4"><div class="doc-grid-col">col-4</div></Col>
            <Col class='doc-grid-row-col' span="4"><div class="doc-grid-col">col-4</div></Col>
        </Row>
    </div>

    设置align：<Select v-model="alignModel" :option="alignOption" class="doc-grid-flex-select"></Select>
    设置justify：<Select v-model="justifyModel" :option="justifyOption" class="doc-grid-flex-select"></Select>
</template>
<script>
    export default {
      data(){
        return {
          alignModel: 'top',
          alignOption: [
            {
              value: 'top',
              label: 'top'
            },
            {
              value: 'middle',
              label: 'middle'
            },
            {
              value: 'bottom',
              label: 'bottom'
            }
          ],
          justifyModel: 'start',
          justifyOption: [
            {
              value: 'start',
              label: 'start'
            },
            {
              value: 'end',
              label: 'end'
            },
            {
              value: 'center',
              label: 'center'
            },
            {
              value: 'space-around',
              label: 'space-around'
            },
            {
              value: 'space-between',
              label: 'space-between'
            }
          ]
        }
      }
    }
</script>
<style>
    .doc-grid-row{
        margin: 10px 0;
    }
    .doc-grid-row-col:nth-of-type(even) .doc-grid-col{
        background-color: rgba(2,183,165, 0.3);
        height: 80px;
    }
    .doc-grid-col{
        padding: 30px 0;
        height: 50px;
        background-color: rgba(2,183,165, 0.8);
        color: #ffffff;
        text-align: center;
        font-size: 16px;
    }
    .doc-grid-row-wrap-align{
        background-color: #eeeeee;
    }
     .doc-grid-row-col:nth-of-type(1) .doc-grid-col{
        background-color: rgba(2,183,165, 0.3);
        height: 80px;
    }
    .doc-grid-row-col:nth-of-type(3) .doc-grid-col{
        height: 100px;
    }
</style>

```

:::


:::demo 响应式布局

预设六个响应尺寸，`xs` `sm` `md` `lg` `xl` `xxl`，详细信息见API。

```html
<template>
    <Row class="doc-grid-row">
        <Col class='doc-grid-row-col' :xs="2" :sm="8" :md="4" :lg="6"><div class="doc-grid-col">col</div></Col>
        <Col class='doc-grid-row-col' :xs="12" :sm="4" :md="8" :lg="6"><div class="doc-grid-col">col</div></Col>
        <Col class='doc-grid-row-col' :xs="8" :sm="4" :md="8" :lg="6"><div class="doc-grid-col">col</div></Col>
        <Col class='doc-grid-row-col' :xs="2" :sm="8" :md="4" :lg="6"><div class="doc-grid-col">col</div></Col>
    </Row>
</template>
<style>
    .doc-grid-row{
        margin: 10px 0;
    }
    .doc-grid-row-col:nth-of-type(even) .doc-grid-col{
        background-color: rgba(2,183,165, 0.3);
    }
    .doc-grid-col{
        padding: 30px 0;
        background-color: rgba(2,183,165, 0.8);
        color: #ffffff;
        text-align: center;
        font-size: 16px;
    }
</style>

```

:::


:::demo 其他属性的响应式布局

`span` `pull` `push` `offset` `order`属性都可以通过对象的方式设置给响应属性来使用。

```html
<template>
    <Row class="doc-grid-row">
        <Col class='doc-grid-row-col'
                :xs="{span: 2, offset: 1}"
                :sm="{span: 6, offset: 1}"
                :md="{span: 3, offset: 2}"
                :lg="{span: 4, offset: 2}"><div class="doc-grid-col">col</div></Col>
        <Col class='doc-grid-row-col'
                :xs="{span: 10, offset: 1}"
                :sm="{span: 4, offset: 1}"
                :md="{span: 5, offset: 2}"
                :lg="{span: 4, offset: 2}"><div class="doc-grid-col">col</div></Col>
        <Col class='doc-grid-row-col'
                :xs="{span: 6, offset: 1}"
                :sm="{span: 4, offset: 1}"
                :md="{span: 5, offset: 2}"
                :lg="{span: 4, offset: 2}"><div class="doc-grid-col">col</div></Col>
        <Col class='doc-grid-row-col'
                :xs="{span: 2, offset: 1}"
                :sm="{span: 6, offset: 1}"
                :md="{span: 3, offset: 2}"
                :lg="{span: 4, offset: 2}"><div class="doc-grid-col">col</div></Col>
    </Row>
</template>
<style>
    .doc-grid-row{
        margin: 10px 0;
    }
    .doc-grid-row-col:nth-of-type(even) .doc-grid-col{
        background-color: rgba(2,183,165, 0.3);
    }
    .doc-grid-col{
        padding: 30px 0;
        background-color: rgba(2,183,165, 0.8);
        color: #ffffff;
        text-align: center;
        font-size: 16px;
    }
</style>

```

:::



## API

### Row props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | String | 布局方式，可选值`flex` | - |
| align | String | `flex` 布局下的垂直对齐方式，可选值为 `top`、`middle`、`bottom` | - |
| justify | String | `flex` 布局下的水平对齐方式，可选值为 `start`、`end`、`center`、`space-around`、`space-between` | - |
| gutter | Number | 栅格间隔 | 0 |



### Col props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| span | Number, String | 占位格数，`0~24`的整数，0时相当于`display:none` | - |
| order | Number, String | 排序顺序，`flex`模式下有效 | - |
| offset | Number, String | 栅格左侧的间隔格数，间隔内不可以有栅格 | - |
| push | Number, String | 栅格向右移动格数 | - |
| pull | Number, String | 栅格向左移动格数 | - |
| xs | Number, Object |  `<576px`响应式栅格，可为栅格数或一个包含其他属性的对象,如：`{span: 2, offset: 1}` | - |
| sm | Number, Object |  `>=576px`响应式栅格，可为栅格数或一个包含其他属性的对象,如：`{span: 2, offset: 1}` | - |
| md | Number, Object |  `>=768px`响应式栅格，可为栅格数或一个包含其他属性的对象,如：`{span: 2, offset: 1}` | - |
| lg | Number, Object |  `>=992px`响应式栅格，可为栅格数或一个包含其他属性的对象,如：`{span: 2, offset: 1}` | - |
| xl | Number, Object |  `>=1200px`响应式栅格，可为栅格数或一个包含其他属性的对象,如：`{span: 2, offset: 1}` | - |
| xxl | Number, Object |  `>=1920px`响应式栅格，可为栅格数或一个包含其他属性的对象,如：`{span: 2, offset: 1}` | - |
