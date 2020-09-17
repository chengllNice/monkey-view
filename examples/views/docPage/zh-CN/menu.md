# Menu 导航菜单

为页面提供导航功能的菜单列表。导航是一个网站的灵魂，一般分为侧导航和顶部导航。

## 代码示例



:::demo 顶部导航

水平导航：设置 `mode`属性值为 `horizontal`设置水平导航模式。

设置 `theme`属性定义主题，可选主题有 `light` `dark` `green`。

可以设置 `active-key`属性设置选中菜单项，此c-key值只针对 `menu-item`组件。

可以设置 `to`属性实现路由跳转功能，类似 `router-link`的实现。

通过事件 `select`可以获取到点击菜单的 `c-key`的值，通过此项可以自定义实现路由跳转。

可以通过 `icon` `name`属性实现导航，也可以通过 `slot`自定义实现。

```html
<template>
    <Menu mode="horizontal" :theme="menuTheme">
        <MenuItem c-key="home" icon="home" name="首页"></MenuItem>
        <Submenu c-key="cloud-product" icon='cloud-upload' name="云产品">
            <MenuItem c-key="file" icon="file" name="对象存储"></MenuItem>
            <MenuItem c-key="email" icon="email" name="短信服务"></MenuItem>
        </Submenu>
        <Submenu c-key="echarts" icon='echarts-pie' name="统计分析">
            <MenuGroup name="图表">
                <MenuItem c-key="echarts-bar" icon="echarts-bar" name="柱状图"></MenuItem>
                <MenuItem c-key="echarts-line" icon="echarts-line" name="折线图"></MenuItem>
            </MenuGroup>
            <MenuGroup name="数据">
                <MenuItem c-key="heart" icon="heart" name="最受欢迎"></MenuItem>
                <MenuItem c-key="table" icon="table" name="表格"></MenuItem>
            </MenuGroup>
        </Submenu>
        <Submenu c-key="user-manage" icon='user' name="用户管理">
            <MenuItem c-key="user-role-manage" name="用户角色管理"></MenuItem>
            <MenuItem c-key="user-vip-manage" name="专属用户管理"></MenuItem>
            <Submenu c-key="user-bill-manage" name="用户账单管理">
                <MenuItem c-key="one-month" name="近一个月消费"></MenuItem>
                <MenuItem c-key="three-month" name="近三个月消费"></MenuItem>
                <MenuItem c-key="one-year" name="近一年消费"></MenuItem>
            </Submenu>
        </Submenu>
        <MenuItem c-key="square-plus" icon="square-plus" name="建站"></MenuItem>
        <MenuItem c-key="question" icon="question" name="解决方案"></MenuItem>
    </Menu>
    <h4>切换主题</h4>
    <RadioGroup v-model="menuTheme">
        <Radio label="light"></Radio>
        <Radio label="dark"></Radio>
        <Radio label="green"></Radio>
    </RadioGroup>
</template>
<script>
    export default {
      data(){
        return {
          menuTheme: 'light',
        }
      }
    }
</script>

```

:::



:::demo 侧导航

可以设置 `open-keys`属性设置打开的 `submenu`菜单项，此c-key值只针对 `submenu`组件。

设置 `accordion`开启手风琴模式，每次最多展开一个`submenu`。

```html
<template>
    <Row :gutter="10">
        <Col>
            <h4>默认</h4>
            <Menu :theme="menuTheme">
                <MenuItem c-key="home" icon="home" name="首页"></MenuItem>
                <Submenu c-key="cloud-product" icon='cloud-upload' name="云产品">
                    <MenuItem c-key="file" icon="file" name="对象存储"></MenuItem>
                    <MenuItem c-key="email" icon="email" name="短信服务"></MenuItem>
                </Submenu>
                <Submenu c-key="echarts" icon='echarts-pie' name="统计分析">
                    <MenuGroup name="图表">
                        <MenuItem c-key="echarts-bar" icon="echarts-bar" name="柱状图"></MenuItem>
                        <MenuItem c-key="echarts-line" icon="echarts-line" name="折线图"></MenuItem>
                    </MenuGroup>
                    <MenuGroup name="数据">
                        <MenuItem c-key="heart" icon="heart" name="最受欢迎"></MenuItem>
                        <MenuItem c-key="table" icon="table" name="表格"></MenuItem>
                    </MenuGroup>
                </Submenu>
                <Submenu c-key="user-manage" icon='user' name="用户管理">
                    <MenuItem c-key="user-role-manage" name="用户角色管理"></MenuItem>
                    <MenuItem c-key="user-vip-manage" name="专属用户管理"></MenuItem>
                    <Submenu c-key="user-bill-manage" name="用户账单管理">
                        <MenuItem c-key="one-month" name="近一个月消费"></MenuItem>
                        <MenuItem c-key="three-month" name="近三个月消费"></MenuItem>
                        <MenuItem c-key="one-year" name="近一年消费"></MenuItem>
                    </Submenu>
                </Submenu>
                <MenuItem c-key="square-plus" icon="square-plus" name="建站"></MenuItem>
                <MenuItem c-key="question" icon="question" name="解决方案"></MenuItem>
            </Menu>
        </Col>
        <Col>
            <h4>手风琴模式</h4>
            <Menu accordion :theme="menuTheme">
                <MenuItem c-key="home" icon="home" name="首页"></MenuItem>
                <Submenu c-key="cloud-product" icon='cloud-upload' name="云产品">
                    <MenuItem c-key="file" icon="file" name="对象存储"></MenuItem>
                    <MenuItem c-key="email" icon="email" name="短信服务"></MenuItem>
                </Submenu>
                <Submenu c-key="echarts" icon='echarts-pie' name="统计分析">
                    <MenuGroup name="图表">
                        <MenuItem c-key="echarts-bar" icon="echarts-bar" name="柱状图"></MenuItem>
                        <MenuItem c-key="echarts-line" icon="echarts-line" name="折线图"></MenuItem>
                    </MenuGroup>
                    <MenuGroup name="数据">
                        <MenuItem c-key="heart" icon="heart" name="最受欢迎"></MenuItem>
                        <MenuItem c-key="table" icon="table" name="表格"></MenuItem>
                    </MenuGroup>
                </Submenu>
                <Submenu c-key="user-manage" icon='user' name="用户管理">
                    <MenuItem c-key="user-role-manage" name="用户角色管理"></MenuItem>
                    <MenuItem c-key="user-vip-manage" name="专属用户管理"></MenuItem>
                    <Submenu c-key="user-bill-manage" name="用户账单管理">
                        <MenuItem c-key="one-month" name="近一个月消费"></MenuItem>
                        <MenuItem c-key="three-month" name="近三个月消费"></MenuItem>
                        <MenuItem c-key="one-year" name="近一年消费"></MenuItem>
                    </Submenu>
                </Submenu>
                <MenuItem c-key="square-plus" icon="square-plus" name="建站"></MenuItem>
                <MenuItem c-key="question" icon="question" name="解决方案"></MenuItem>
            </Menu>
        </Col>
    </Row>

    <h4>切换主题</h4>
    <RadioGroup v-model="menuTheme">
        <Radio label="light"></Radio>
        <Radio label="dark"></Radio>
        <Radio label="green"></Radio>
    </RadioGroup>
</template>
<script>
    export default {
      data(){
        return {
          menuTheme: 'light',
        }
      }
    }
</script>

```

:::


:::demo 分组

使用 `menu-group`组件设置分组。

```html
<template>
    <Menu :theme="menuTheme">
        <MenuGroup name="图表">
            <MenuItem c-key="echarts-bar" icon="echarts-bar" name="柱状图"></MenuItem>
            <MenuItem c-key="echarts-line" icon="echarts-line" name="折线图"></MenuItem>
        </MenuGroup>
        <MenuGroup name="数据">
            <MenuItem c-key="heart" icon="heart" name="最受欢迎"></MenuItem>
            <MenuItem c-key="table" icon="table" name="表格"></MenuItem>
        </MenuGroup>
    </Menu>

    <h4>切换主题</h4>
    <RadioGroup v-model="menuTheme">
        <Radio label="light"></Radio>
        <Radio label="dark"></Radio>
        <Radio label="green"></Radio>
    </RadioGroup>
</template>
<script>
    export default {
      data(){
        return {
          menuTheme: 'light',
        }
      }
    }
</script>

```

:::


:::demo 展开收起

只在垂直菜单类型时有效。

设置 `collapse`属性可以实现展开收起的效果。

设置 `collapse-width`属性控制收起之后的宽度。

```html
<template>
    <m-switch v-model="collapse">
        <span slot="open">展开</span>
        <span slot="close">收起</span>
    </m-switch>

    <Menu :collapse="collapse">
        <MenuItem c-key="home" icon="home" name="首页"></MenuItem>
        <Submenu c-key="cloud-product" icon='cloud-upload' name="云产品">
            <MenuItem c-key="file" icon="file" name="对象存储"></MenuItem>
            <MenuItem c-key="email" icon="email" name="短信服务"></MenuItem>
        </Submenu>
        
        <MenuItem c-key="square-plus" icon="square-plus" name="建站"></MenuItem>
        <MenuItem c-key="question" icon="question" name="解决方案"></MenuItem>
    </Menu>
</template>
<script>
    export default {
      data(){
        return {
          collapse: true,
        }
      }
    }
</script>

```

:::




## API

### Menu props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| width | String, Number | `mode=vertical`时有效 | 240 |
| theme | String | 主题，可选值`light` `dark` `green` | light |
| accordion | Boolean | 是否开始手风琴模式，开启后每次最多展开一个`submenu`，`mode=vertical`时有效 | - |
| mode | String | 菜单类型，可选值`vertical`(垂直) `horizontal`(水平) | vertical |
| active-key | String | 当前激活菜单的`c-key`值，只对`menuItem`组件的c-key值有效 | - |
| open-keys | Array | 展开的`submenu`的`c-key`值集合，`mode=vertical`时有效 | [] |
| item-height | String, Number | `vertical`模式下配置`submenu`、`menu-item`、`menu-group`的高度；`horizontal`模式下配置一级菜单的高度 | 50 |



### Menu event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| select | 选中菜单时触发,返回当前选中的菜单的key值 | key |
| open-change | `submenu`展开收起时触发，返回第一个参数为当前触发展开收起的submenu的key值，第二个参数为所有展开项的key数组 | key, openedKeys |



### MenuItem props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| c-key | String | 必填，菜单的位置标识 | - |
| name | String | 菜单的名字 | - |
| disabled | Boolean | 菜单是否禁用 | - |
| icon | String | 菜单名字左侧的图标 | - |
| to | Object, String | router-link的to属性 | - |



### SubMenu props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| c-key | String | 必填，菜单的位置标识 | - |
| name | String | 菜单的名字 | - |
| disabled | Boolean | 菜单是否禁用 | - |
| icon | String | 菜单名字左侧的图标 | - |
| hide-drop-icon | Boolean | 是否隐藏右侧下拉图标 | - |
| forbidden | Boolean | 是否禁用展开收起，和`disabled`不一样的是不控制样式，在某些情况下会比较有用 | - |



### SubMenu slot

| 名称 | 说明 |
| ---- | ---- |
| title | 自定义title标题，此时`icon`和`name`属性无效 |


### menuGroup props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| name | String | 菜单的名字 | - |



### menuGroup slot

| 名称 | 说明 |
| ---- | ---- |
| title | 自定义title标题，此时`icon`和`name`属性无效 |
