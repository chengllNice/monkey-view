# Dropdown 下拉菜单

展示一组下拉数据。

## 代码示例



:::demo 基础用法

配合`dropdownMenu`和`dropdownItem`组件使用。

```html
<template>
    <cl-dropdown>
        <cl-button type="text">下拉菜单 <Icon type="down"></Icon></cl-button>
        <cl-dropdown-menu slot="menu">
            <cl-dropdown-item>菜单一</cl-dropdown-item>
            <cl-dropdown-item>菜单二</cl-dropdown-item>
            <cl-dropdown-item disabled>菜单三</cl-dropdown-item>
            <cl-dropdown-item>菜单四</cl-dropdown-item>
            <cl-dropdown-item divided>菜单五</cl-dropdown-item>
        </cl-dropdown-menu>
    </cl-dropdown>
</template>
<script>
    export default {
        data(){
            return {
                
            }
        },
    }
</script>

```

:::



:::demo 触发方式

`trigger`属性设置触发方式，可选值有 `hover` `click` `contextmenu` `custom`。默认为`hover`。

自定义触发方式时需要自主实现打开关闭。

```html
<template>
    <cl-dropdown>
        <cl-button type="text">Hover触发 <Icon type="down"></Icon></cl-button>
        <cl-dropdown-menu slot="menu">
            <cl-dropdown-item>菜单一</cl-dropdown-item>
            <cl-dropdown-item>菜单二</cl-dropdown-item>
            <cl-dropdown-item disabled>菜单三</cl-dropdown-item>
            <cl-dropdown-item>菜单四</cl-dropdown-item>
            <cl-dropdown-item divided>菜单五</cl-dropdown-item>
        </cl-dropdown-menu>
    </cl-dropdown>
    <cl-dropdown trigger="click" :hide-on-click="false" :renderHtml="true">
        <cl-button type="text">点击触发 <Icon type="down"></Icon></cl-button>
        <cl-dropdown-menu slot="menu">
            <cl-dropdown-item>菜单一</cl-dropdown-item>
            <cl-dropdown-item>菜单二</cl-dropdown-item>
            <cl-dropdown-item disabled>菜单三</cl-dropdown-item>
            <cl-dropdown-item>菜单四</cl-dropdown-item>
            <cl-dropdown-item divided>菜单五</cl-dropdown-item>
        </cl-dropdown-menu>
    </cl-dropdown>
    <cl-dropdown trigger="contextmenu">
        <cl-button type="text">右键触发 <Icon type="down"></Icon></cl-button>
        <cl-dropdown-menu slot="menu">
            <cl-dropdown-item>菜单一</cl-dropdown-item>
            <cl-dropdown-item>菜单二</cl-dropdown-item>
            <cl-dropdown-item disabled>菜单三</cl-dropdown-item>
            <cl-dropdown-item>菜单四</cl-dropdown-item>
            <cl-dropdown-item divided>菜单五</cl-dropdown-item>
        </cl-dropdown-menu>
    </cl-dropdown>
    <cl-dropdown :visible="visible" trigger="custom" :dropdownMatchSelectWidth="false">
        <cl-button type="text" @click="visible = true">自定义触发 <Icon type="down"></Icon></cl-button>
        <cl-dropdown-menu slot="menu">
            <p style="padding: 5px;">可以自定义需要的内容;自定义实现打开和关闭。</p>
            <div style="padding: 5px;text-align: right">
                <cl-button type="primary" @click="visible = false">关闭</cl-button>
</div>
        </cl-dropdown-menu>
    </cl-dropdown>
    
</template>
<script>
    export default {
        data(){
            return {
                visible: false,
            }
        },
    }
</script>

```

:::


:::demo 嵌套使用

嵌套使用，多级菜单。

```html
<template>
    <cl-dropdown>
        <cl-button type="text">嵌套菜单 <Icon type="down"></Icon></cl-button>
        <cl-dropdown-menu slot="menu">
            <cl-dropdown-item>菜单一</cl-dropdown-item>
            <cl-dropdown-item>菜单二</cl-dropdown-item>
            <cl-dropdown placement="right-start">
                <cl-dropdown-item>菜单三 <Icon type="right"></Icon></cl-dropdown-item>
                <cl-dropdown-menu slot="menu">
                    <cl-dropdown-item>二级菜单一</cl-dropdown-item>
                    <cl-dropdown-item>二级菜单二</cl-dropdown-item>
                </cl-dropdown-menu>
            </cl-dropdown>
            <cl-dropdown-item>菜单四</cl-dropdown-item>
            <cl-dropdown-item divided>菜单五</cl-dropdown-item>
        </cl-dropdown-menu>
    </cl-dropdown>
</template>
<script>
    export default {
        data(){
            return {
                
            }
        },
    }
</script>

```

:::


## API

### Dropdown props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| trigger | String | 触发菜单打开的方式,可选值`hover` `click` `contextmenu` `custom` | hover |
| visible | Boolean | 是否打开 | false |
| transition | String | 打开关闭的动画 | slideUp |
| placement | String | 下拉菜单的位置 | bottom-start |
| dropdownMatchSelectWidth | Boolean | 下拉框宽度是否和触发元素同宽 | true |
| hide-on-click | Boolean | 点击item后是否关闭菜单 | true |
| renderHtml | HTMLElement, Boolean | 下拉框渲染到的位置 | true |


### Dropdown event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| click | 点击菜单项触发,返回菜单项的name | name |
| click-outside | 点击外部触发 | event |
| visible-change | 可见状态变化时触发 | visible |


### DropItem props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| name | String | 菜单项的名称 | - |
| disabled | Boolean | 是否禁用 | - |
| divided | Boolean | 是否显示分割线 | - |
