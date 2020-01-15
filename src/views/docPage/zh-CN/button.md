# Button 按钮

基础组件，常用的操作按钮。

## 代码示例



:::demo 按钮类型

按钮有七种类型：`type`类型可设置为`primary` `primary` `danger` `warning` `info` `text`，不设置为默认样式

```html
<template>
    <div class="doc-button-content">
        <cl-button>Default</cl-button>
        <cl-button type="primary">Primary</cl-button>
        <cl-button type="success">Success</cl-button>
        <cl-button type="danger">Danger</cl-button>
        <cl-button type="warning">Warning</cl-button>
        <cl-button type="info">Info</cl-button>
        <cl-button type="text">Text</cl-button>
    </div>
</template>
```

:::


:::demo 按钮尺寸

按钮有四种尺寸：迷你、小型、中型(默认)、大型。
设置 `size`为 `mini` `small` `large`，不设置为默认中型按钮。

```html
<template>
    <div class="doc-button-content">
        <cl-button type="primary" size="mini">Primary Mini</cl-button>
        <cl-button type="primary" size="small">Primary Small</cl-button>
        <cl-button type="primary">Primary Default</cl-button>
        <cl-button type="primary" size="large">Primary Large</cl-button>
    </div>
</template>
```

:::


:::demo 图标按钮及按钮形状

带有icon图标的按钮，设置`icon`属性可以添加图标，或者可以直接在Button内部添加icon图标。
设置 `circle`属性可以将按钮设置为圆形。

```html
<template>
    <div class="doc-button-content">
        <cl-button size="mini" icon="cl-icon-search"></cl-button>
        <cl-button size="mini" icon="cl-icon-search">Default</cl-button>
        <cl-button size="mini" icon="cl-icon-search" circle></cl-button>
        <cl-button size="mini" icon="cl-icon-search" circle>Default</cl-button>
        <br>
        <cl-button size="small" icon="cl-icon-search"></cl-button>
        <cl-button size="small" icon="cl-icon-search">Default</cl-button>
        <cl-button size="small" icon="cl-icon-search" circle></cl-button>
        <cl-button size="small" icon="cl-icon-search" circle>Default</cl-button>
        <br>
        <cl-button icon="cl-icon-search"></cl-button>
        <cl-button icon="cl-icon-search">Default</cl-button>
        <cl-button icon="cl-icon-search" circle></cl-button>
        <cl-button icon="cl-icon-search" circle>Default</cl-button>
        <br>
        <cl-button type="primary" icon="cl-icon-search"></cl-button>
        <cl-button type="primary" icon="cl-icon-search">Primary</cl-button>
        <cl-button type="primary" icon="cl-icon-search" circle></cl-button>
        <cl-button type="primary" icon="cl-icon-search" circle>Primary</cl-button>
        <br>
        <cl-button size="large" type="primary" icon="cl-icon-search"></cl-button>
        <cl-button size="large" type="primary" icon="cl-icon-search">Primary</cl-button>
        <cl-button size="large" type="primary" icon="cl-icon-search" circle></cl-button>
        <cl-button size="large" type="primary" icon="cl-icon-search" circle>Primary</cl-button>
    </div>
</template>
```

:::


:::demo 按钮禁用

添加 `disabled`属性可将按钮设置为禁用状态

```html
<template>
    <div class="doc-button-content">
        <cl-button>Default</cl-button>
        <cl-button disabled>Default</cl-button>
        <cl-button disabled icon="cl-icon-search">Default</cl-button>
        <br>
        <cl-button type="primary">Primary</cl-button>
        <cl-button type="primary" disabled>Primary</cl-button>
        <cl-button type="primary" disabled icon="cl-icon-search">Primary</cl-button>
        <br>
        <cl-button type="text">Text</cl-button>
        <cl-button type="text" disabled>Text</cl-button>
        <cl-button type="text" disabled icon="cl-icon-search">Text</cl-button>
    </div>
</template>
```

:::


:::demo 按钮加载中

添加 `loading`属性可将按钮设置为加载中的状态

```html
<template>
    <div class="doc-button-content">
        <cl-button loading>Default</cl-button>
        <cl-button icon="cl-icon-search" loading></cl-button>
        <cl-button type="primary" loading>Primary</cl-button>
        <cl-button type="primary" :loading="loading1" @click="loading1 = true">Click me!</cl-button>
        <cl-button type="primary" :loading="loading2" @click="loading2 = true" icon="cl-icon-search">Click me!</cl-button>
    </div>
</template>
<script>
    export default {
      data(){
        return {
          loading1: false,
          loading2: false,
        }
      }
    }
</script>

```

:::


:::demo 块级按钮

添加 `block`属性可将按钮设置为块级按钮

```html
<template>
    <div class="doc-button-content">
        <cl-button block>Default</cl-button>
        <cl-button type="primary" icon="cl-icon-search" block></cl-button>
        <cl-button type="danger" block>Danger</cl-button>
    </div>
</template>
```

:::


:::demo 按钮组合

将多个 `Button`放入 `ButtonGroup`内，可实现按钮组合的效果。

```html
<template>
    <div class="doc-button-content">
        <cl-button-group>
            <cl-button>Left</cl-button>
            <cl-button type="primary">Right</cl-button>
        </cl-button-group>
        <br>
        <cl-button-group>
            <cl-button disabled>Left</cl-button>
            <cl-button disabled>Center</cl-button>
            <cl-button disabled>Right</cl-button>
        </cl-button-group>

        <h4>Icon</h4>
        <cl-button-group>
            <cl-button type="primary">
                <i class="cl-icon-left"></i> Left
            </cl-button>
            <cl-button type="primary">Right <i class="cl-icon-right"></i></cl-button>
        </cl-button-group>
        <cl-button-group>
            <cl-button type="primary" icon="cl-icon-arrow-left"></cl-button>
            <cl-button type="primary" icon="cl-icon-arrow-right"></cl-button>
        </cl-button-group>
        <cl-button-group>
            <cl-button icon="cl-icon-edit"></cl-button>
            <cl-button icon="cl-icon-square-plus"></cl-button>
            <cl-button icon="cl-icon-check"></cl-button>
            <cl-button icon="cl-icon-close"></cl-button>
        </cl-button-group>
        <h4>Circle</h4>
        <cl-button-group>
            <cl-button type="primary" circle>
                <i class="cl-icon-left"></i> Left
            </cl-button>
            <cl-button type="primary" circle>
                Right <i class="cl-icon-right"></i>
            </cl-button>
        </cl-button-group>
        <br>
        <cl-button-group>
            <cl-button type="primary" circle>Left</cl-button>
            <cl-button type="primary" circle>Center</cl-button>
            <cl-button type="primary" circle>Right</cl-button>
        </cl-button-group>
    </div>
</template>
```

:::


## API

### Button props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | String | 可选值 `primary`、`success`、`warning`、`danger`、`info`、`default` | default |
| icon | String | 按钮前置icon图标的名称 | - |
| size | String | 按钮尺寸，可选值 `mini`、`small`、`default`、`large`、 | default |
| disabled | Boolean | 按钮禁用状态 | false |
| loading | Boolean | 按钮加载中状态 | false |
| block | Boolean | 设置按钮为块级长按钮 | false |
| circle | Boolean | 设置按钮形状为圆形 | false |
