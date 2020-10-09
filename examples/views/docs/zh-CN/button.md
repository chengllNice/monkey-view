# Button 按钮

基础组件，常用的操作按钮。

## 代码示例



:::demo 按钮类型

按钮有七种类型：`type`类型可设置为`primary` `primary` `danger` `warning` `info` `text`，不设置为默认样式

```html
<template>
    <div class="doc-button-content">
        <Button>Default</Button>
        <Button type="primary">Primary</Button>
        <Button type="success">Success</Button>
        <Button type="danger">Danger</Button>
        <Button type="warning">Warning</Button>
        <Button type="info">Info</Button>
        <Button type="text">Text</Button>
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
        <Button type="primary" size="mini">Primary Mini</Button>
        <Button type="primary" size="small">Primary Small</Button>
        <Button type="primary">Primary Default</Button>
        <Button type="primary" size="large">Primary Large</Button>
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
        <Button size="mini" icon="search"></Button>
        <Button size="mini" icon="search">Default</Button>
        <Button size="mini" icon="search" circle></Button>
        <Button size="mini" icon="search" circle>Default</Button>
        <br>
        <Button size="small" icon="search"></Button>
        <Button size="small" icon="search">Default</Button>
        <Button size="small" icon="search" circle></Button>
        <Button size="small" icon="search" circle>Default</Button>
        <br>
        <Button icon="search"></Button>
        <Button icon="search">Default</Button>
        <Button icon="search" circle></Button>
        <Button icon="search" circle>Default</Button>
        <br>
        <Button type="primary" icon="search"></Button>
        <Button type="primary" icon="search">Primary</Button>
        <Button type="primary" icon="search" circle></Button>
        <Button type="primary" icon="search" circle>Primary</Button>
        <br>
        <Button size="large" type="primary" icon="search"></Button>
        <Button size="large" type="primary" icon="search">Primary</Button>
        <Button size="large" type="primary" icon="search" circle></Button>
        <Button size="large" type="primary" icon="search" circle>Primary</Button>
    </div>
</template>
```

:::


:::demo 按钮禁用

添加 `disabled`属性可将按钮设置为禁用状态

```html
<template>
    <div class="doc-button-content">
        <Button>Default</Button>
        <Button disabled>Default</Button>
        <Button disabled icon="search">Default</Button>
        <br>
        <Button type="primary">Primary</Button>
        <Button type="primary" disabled>Primary</Button>
        <Button type="primary" disabled icon="search">Primary</Button>
        <br>
        <Button type="text">Text</Button>
        <Button type="text" disabled>Text</Button>
        <Button type="text" disabled icon="search">Text</Button>
    </div>
</template>
```

:::


:::demo 按钮加载中

添加 `loading`属性可将按钮设置为加载中的状态

```html
<template>
    <div class="doc-button-content">
        <Button loading>Default</Button>
        <Button icon="search" loading></Button>
        <Button type="primary" loading>Primary</Button>
        <Button type="primary" :loading="loading1" @click="loading1 = true">Click me!</Button>
        <Button type="primary" :loading="loading2" @click="loading2 = true" icon="search">Click me!</Button>
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
        <Button block>Default</Button>
        <Button type="primary" icon="search" block></Button>
        <Button type="danger" block>Danger</Button>
    </div>
</template>
```

:::


:::demo 按钮组合

将多个 `Button`放入 `ButtonGroup`内，可实现按钮组合的效果。

```html
<template>
    <div class="doc-button-content">
        <ButtonGroup>
            <Button>Left</Button>
            <Button type="primary">Right</Button>
        </ButtonGroup>
        <br>
        <ButtonGroup>
            <Button disabled>Left</Button>
            <Button disabled>Center</Button>
            <Button disabled>Right</Button>
        </ButtonGroup>

        <h4>Icon</h4>
        <ButtonGroup>
            <Button type="primary">
                <Icon type="left"></Icon> Left
            </Button>
            <Button type="primary">Right <Icon type="right"></Icon></Button>
        </ButtonGroup>
        <ButtonGroup>
            <Button type="primary" icon="arrow-left"></Button>
            <Button type="primary" icon="arrow-right"></Button>
        </ButtonGroup>
        <ButtonGroup>
            <Button icon="edit"></Button>
            <Button icon="plus"></Button>
            <Button icon="check"></Button>
            <Button icon="close"></Button>
        </ButtonGroup>
        <h4>Circle</h4>
        <ButtonGroup>
            <Button type="primary" circle>
                <Icon type="left"></Icon> Left
            </Button>
            <Button type="primary" circle>
                Right <Icon type="right"></Icon>
            </Button>
        </ButtonGroup>
        <br>
        <ButtonGroup>
            <Button type="primary" circle>Left</Button>
            <Button type="primary" circle>Center</Button>
            <Button type="primary" circle>Right</Button>
        </ButtonGroup>
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
| size | String | 按钮尺寸，可选值 `mini`、`small`、`default`、`large` | default |
| disabled | Boolean | 按钮禁用状态 | false |
| loading | Boolean | 按钮加载中状态 | false |
| block | Boolean | 设置按钮为块级长按钮 | false |
| circle | Boolean | 设置按钮形状为圆形 | false |
