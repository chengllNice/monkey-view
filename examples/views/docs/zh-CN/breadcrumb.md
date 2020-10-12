# Breadcrumb 面包屑导航

显示当前页面的层级路径，可以快速返回指定页面。

## 代码示例


:::demo 基础用法

最简单的使用方法。

```html
<template>
    <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>人员列表</BreadcrumbItem>
        <BreadcrumbItem>人员详情</BreadcrumbItem>
    </Breadcrumb>
</template>
```
:::

:::demo 带图标

自定义带图标的内容。

```html
<template>
    <Breadcrumb>
        <BreadcrumbItem to="/"><Icon type="home"></Icon> 首页</BreadcrumbItem>
        <BreadcrumbItem><Icon type="user"></Icon> 人员列表</BreadcrumbItem>
        <BreadcrumbItem>人员详情</BreadcrumbItem>
    </Breadcrumb>
</template>
```
:::


:::demo 分隔符

自定义分隔符，默认`/`。

```html
<template>
    <Breadcrumb separator=">">
        <BreadcrumbItem to="/"><Icon type="home"></Icon> 首页</BreadcrumbItem>
        <BreadcrumbItem><Icon type="user"></Icon> 人员列表</BreadcrumbItem>
        <BreadcrumbItem>人员详情</BreadcrumbItem>
    </Breadcrumb>
</template>
```
:::



## API

### Breadcrumb props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| separator | String | 自定义分隔符 | `/` |

### BreadcrumbItem props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| to | String, Object | `vue-router`的`to`属性 | `/` |
| replace | Boolean | `vue-router`的`replace`属性 | - |
| append | Boolean | `vue-router`的`append`属性 | - |
