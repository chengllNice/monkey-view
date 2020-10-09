# Badge 徽标

主要用于右上角标注未读等状态的数字标记，提醒用户点击。

## 代码示例


:::demo 基础用法

最简单的使用方法。设置 `count` 属性显示数字。

```html
<template>
    <Row>
        <Col span="6">
            <Badge :count="10">
                <a href="#" class="doc-badge-base"></a>
            </Badge>
        </Col>
        <Col span="6">
            <Badge :count="10">
                <Button>评论</Button>
            </Badge>
        </Col>
    </Row>
</template>
```

:::


:::demo 小红点

设置 `dot` 属性可显示小红点，此时设置 `count` 无效。

```html
<template>
    <Row>
        <Col span="6">
            <Badge :count="10" dot>
                <a href="#" class="doc-badge-base"></a>
            </Badge>
        </Col>
        <Col span="6">
            <Badge :count="10" dot>
                <Button>评论</Button>
            </Badge>
        </Col>
        <Col span="6">
            <Badge :count="10" dot>
                <Icon type="notification" class="doc-badge-icon"></Icon>
            </Badge>
        </Col>
    </Row>
</template>
```

:::



:::demo 封顶数字

设置 `overflow-count` 属性可设置一个封顶数值， 超出此数值时会显示 `${overflow-count}+`。默认值为99。

```html
<template>
    <Row>
        <Col span="6">
            <Badge :count="99">
                <a href="#" class="doc-badge-base"></a>
            </Badge>
        </Col>
        <Col span="6">
            <Badge :count="120">
                <a href="#" class="doc-badge-base"></a>
            </Badge>
        </Col>
        <Col span="6">
            <Badge :count="20" :overflow-count="10">
                <Button>评论</Button>
            </Badge>
        </Col>
        <Col span="6">
            <Badge :count="1000" :overflow-count="999">
                <Button>评论</Button>
            </Badge>
        </Col>
    </Row>
</template>
```

:::



:::demo 独立使用

没有 `slot` 时可以独立使用。

```html
<template>
    <Row>
        <Col span="6">
            <Badge :count="10"></Badge>
        </Col>
        <Col span="6">
            <Badge :count="20"></Badge>
        </Col>
        <Col span="6">
            <Badge :count="30" color="primary"></Badge>
        </Col>
    </Row>
</template>
```

:::



:::demo 自定义内容

设置 `text` 属性可自定义显示内容，此时 `count` 属性无效。

```html
<template>
    <Row>
        <Col span="6">
            <Badge :count="10" text="new">
                <a href="#" class="doc-badge-base"></a>
            </Badge>
        </Col>
        <Col span="6">
            <Badge :count="20" text="hot">
                <a href="#" class="doc-badge-base"></a>
            </Badge>
        </Col>
    </Row>
</template>
```

:::



:::demo 状态点

设置 `status` 属性设置状态小圆点，`text`属性为描述信息。

```html
<template>
    <Badge status="success" text="success"></Badge>
    <br>
    <Badge status="warning" text="warning"></Badge>
    <br>
    <Badge status="error" text="error"></Badge>
    <br>
    <Badge status="default" text="default"></Badge>
    <br>
    <Badge status="processing" text="processing"></Badge>
</template>
```

:::



:::demo 多彩颜色

设置 `color` 属性可设置不同的颜色。内置颜色有 `primary` `error` `success` `warning` `info`。可自定义设置颜色值，自定义设置颜色。

```html
<template>
    <h4>Presets</h4>
    <Row>
        <Col>
            <Badge :count="10" color="primary">
                <a href="#" class="doc-badge-base"></a>
            </Badge>
        </Col>
        <Col>
            <Badge :count="10" color="error">
                <a href="#" class="doc-badge-base"></a>
            </Badge>
        </Col>
        <Col>
            <Badge :count="10" color="success">
                <a href="#" class="doc-badge-base"></a>
            </Badge>
        </Col>
        <Col>
            <Badge :count="10" color="warning">
                <a href="#" class="doc-badge-base"></a>
            </Badge>
        </Col>
        <Col>
            <Badge :count="10" color="info">
                <a href="#" class="doc-badge-base"></a>
            </Badge>
        </Col>
    </Row>

    <h4>Custom</h4>
    <Row>
        <Col>
            <Badge :count="10" color="#c8c8c8">
                <a href="#" class="doc-badge-base"></a>
            </Badge>
        </Col>
        <Col>
            <Badge :count="10" color="#ffa2d3">
                <a href="#" class="doc-badge-base"></a>
            </Badge>
        </Col>
        <Col>
            <Badge :count="10" color="#87d068">
                <a href="#" class="doc-badge-base"></a>
            </Badge>
        </Col>
        <Col>
            <Badge :count="10" color="#f50">
                <a href="#" class="doc-badge-base"></a>
            </Badge>
        </Col>
        <Col>
            <Badge :count="10" color="#722ed1">
                <a href="#" class="doc-badge-base"></a>
            </Badge>
        </Col>
    </Row>
</template>
```

:::



## API

### Badge props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| count | Number | 显示的数字，大于`overflowCount`时，显示`${overflowCount}+`，为0时默认隐藏，可以设置`show-zero`属性控制为0时显示 | - |
| overflow-count | Number | 封顶数值 | 99 |
| dot | Boolean | 设置为小红点 | false |
| show-zero | Boolean | `count`为0时是否显示 | false |
| text | String | 自定义显示内容 | - |
| status | String | 状态点，可选值`success` `error` `warning` `processing` `default` | - |
| color | String | 自定义badge的颜色，内置可选值`success` `error` `warning` `processing` `primary`，也可以自定定义颜色值  | - |
| offset | String | badge的位置偏移，格式为[x,y] | - |
| title | String | 设置鼠标经过badge的提示，默认text或者count | - |
