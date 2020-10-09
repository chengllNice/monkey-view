# Dropdown 下拉菜单

展示一组下拉数据。

## 代码示例



:::demo 基础用法

配合`dropdownMenu`和`dropdownItem`组件使用。

```html
<template>
    <Dropdown>
        <Button type="text">下拉菜单 <Icon type="down"></Icon></Button>
        <DropdownMenu slot="menu">
            <DropdownItem>菜单一</DropdownItem>
            <DropdownItem>菜单二</DropdownItem>
            <DropdownItem disabled>菜单三</DropdownItem>
            <DropdownItem>菜单四</DropdownItem>
            <DropdownItem divided>菜单五</DropdownItem>
        </DropdownMenu>
    </Dropdown>
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
    <Dropdown>
        <Button type="text">Hover触发 <Icon type="down"></Icon></Button>
        <DropdownMenu slot="menu">
            <DropdownItem>菜单一</DropdownItem>
            <DropdownItem>菜单二</DropdownItem>
            <DropdownItem disabled>菜单三</DropdownItem>
            <DropdownItem>菜单四</DropdownItem>
            <DropdownItem divided>菜单五</DropdownItem>
        </DropdownMenu>
    </Dropdown>
    <Dropdown trigger="click" :hide-on-click="false" :renderHtml="true">
        <Button type="text">点击触发 <Icon type="down"></Icon></Button>
        <DropdownMenu slot="menu">
            <DropdownItem>菜单一</DropdownItem>
            <DropdownItem>菜单二</DropdownItem>
            <DropdownItem disabled>菜单三</DropdownItem>
            <DropdownItem>菜单四</DropdownItem>
            <DropdownItem divided>菜单五</DropdownItem>
        </DropdownMenu>
    </Dropdown>
    <Dropdown trigger="contextmenu">
        <Button type="text">右键触发 <Icon type="down"></Icon></Button>
        <DropdownMenu slot="menu">
            <DropdownItem>菜单一</DropdownItem>
            <DropdownItem>菜单二</DropdownItem>
            <DropdownItem disabled>菜单三</DropdownItem>
            <DropdownItem>菜单四</DropdownItem>
            <DropdownItem divided>菜单五</DropdownItem>
        </DropdownMenu>
    </Dropdown>
    <Dropdown :visible="visible" trigger="custom" :dropdownMatchSelectWidth="false">
        <Button type="text" @click="visible = true">自定义触发 <Icon type="down"></Icon></Button>
        <DropdownMenu slot="menu">
            <p style="padding: 5px;">可以自定义需要的内容;自定义实现打开和关闭。</p>
            <div style="padding: 5px;text-align: right">
                <Button type="primary" @click="visible = false">关闭</Button>
</div>
        </DropdownMenu>
    </Dropdown>
    
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
    <Dropdown>
        <Button type="text">嵌套菜单 <Icon type="down"></Icon></Button>
        <DropdownMenu slot="menu">
            <DropdownItem>菜单一</DropdownItem>
            <DropdownItem>菜单二</DropdownItem>
            <Dropdown placement="right-start">
                <DropdownItem>菜单三 <Icon type="right"></Icon></DropdownItem>
                <DropdownMenu slot="menu">
                    <DropdownItem>二级菜单一</DropdownItem>
                    <DropdownItem>二级菜单二</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <DropdownItem>菜单四</DropdownItem>
            <DropdownItem divided>菜单五</DropdownItem>
        </DropdownMenu>
    </Dropdown>
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
| placement | String | 下拉菜单的位置 | bottom |
| dropdownMatchSelectWidth | Boolean | 下拉框宽度是否和触发元素同宽 | false |
| hide-on-click | Boolean | 点击item后是否关闭菜单 | true |
| renderHtml | HTMLElement, Boolean | 下拉框渲染到的位置 | false |


### Dropdown event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| click-item | 点击菜单项触发,返回菜单项的name | name |
| click-outside | 点击外部触发 | event |
| visible-change | 可见状态变化时触发 | visible |


### DropItem props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| name | String | 菜单项的名称 | - |
| disabled | Boolean | 是否禁用 | - |
| divided | Boolean | 是否显示分割线 | - |
