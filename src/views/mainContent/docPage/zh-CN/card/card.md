# Card 卡片

基础容器，可承载文字、列表、图片等内容。

## 代码示例


:::demo 基础用法

基本简单的使用方法。可以设置 `title`属性定义标题，使用 `name='extra'`的 `slot`定义右侧显示的额外信息。也可以使用 `name='header'`的 `slot`实现自定义头部，此时 `extra`的 `slot`无效。

```html
<template>
    <cl-row :gutter="10">
        <cl-col>
            <cl-card title="Default Card">
                <template slot="extra">
                    extra
                </template>
                <div>Card Content</div>
                <div>Card Content</div>
                <div>Card Content</div>
            </cl-card>
        </cl-col>
        <cl-col>
            <cl-card>
                <template slot="header">
                    <div class="doc-card-header">
                        <span>Slot Header Card</span>
                        <span class="extra">extra</span>
                    </div>
                </template>
                <div>Card Content</div>
                <div>Card Content</div>
                <div>Card Content</div>
            </cl-card>
        </cl-col>
    </cl-row>
</template>
```

:::



:::demo 无边框

 设置 `no-border`属性可以实现无边框的卡片。建议此时在灰色背景下使用。

```html
<template>
    <div style="background-color: #eeeeee; padding: 20px;">
        <cl-card title="Default Card" no-border>
            <template slot="extra">
                extra
            </template>
            <div>Card Content</div>
            <div>Card Content</div>
            <div>Card Content</div>
        </cl-card>
    </div>
</template>
```

:::



:::demo 禁用悬停阴影

设置 `no-hover`属性可以实现禁用悬停阴影的效果。

```html
<template>
    <cl-row :gutter="10">
        <cl-col>
            <cl-card title="Default Card">
                <template slot="extra">
                    extra
                </template>
                <div>Card Content</div>
                <div>Card Content</div>
                <div>Card Content</div>
            </cl-card>
        </cl-col>
        <cl-col>
            <cl-card title="Default Card" no-hover>
                <template slot="extra">
                    extra
                </template>
                <div>Card Content</div>
                <div>Card Content</div>
                <div>Card Content</div>
            </cl-card>
        </cl-col>
    </cl-row>
</template>
```

:::



:::demo 简洁卡片

简洁卡片只包含内容区域。可以设置 `body-padding`属性控制内容区域的padding。

```html
<template>
    <cl-row :gutter="10">
        <cl-col>
            <cl-card>
                <div>Card Content</div>
                <div>Card Content</div>
                <div>Card Content</div>
            </cl-card>
        </cl-col>
        <cl-col body-padding="10px">
            <cl-card>
                <div>Card Content</div>
                <div>Card Content</div>
                <div>Card Content</div>
            </cl-card>
        </cl-col>
    </cl-row>
</template>
```

:::



:::demo 带有底部的卡片

简洁卡片只包含内容区域。可以设置 `body-padding`属性控制内容区域的padding。

```html
<template>
    <cl-card body-padding="0" style="max-width: 400px">
        <img class="doc-card-avatar" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3623139363,2281616215&fm=26&gp=0.jpg" alt="">
        <div class="doc-card-content">
            <h3>动漫</h3>
            Content of no border type. Content of no border type. Content of no border type. Content of no border type.Content of no border type. Content of no border type. Content of no border type. Content of no border type.Content of no border type. Content of no border type. Content of no border type. Content of no border type.
        </div>

        <div class="doc-card-footer" slot="footer">
            <i class="cl-icon-list"></i>
            <i class="cl-icon-setting"></i>
            <i class="cl-icon-thumbs"></i>
        </div>
    </cl-card>
</template>
```

:::



## API

### Card props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| title | String | 卡片标题 | - |
| no-border | Boolean | 是否显示边框 | - |
| no-hover | Boolean | 禁用鼠标悬停效果 | - |
| body-padding | String, Number | 设置内容区域的padding | - |


### Card slot

| 名称 | 说明 |
| ---- | ---- |
| header | 自定义卡片头部，此时 `name='extra'`的`slot`无效 |
| extra | 定义卡片头部右侧的额外内容，可以配合`title`属性一起使用 |
| footer | 定义卡片的页脚 |
