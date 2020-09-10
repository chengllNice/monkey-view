# Menu 导航菜单

为页面提供导航功能的菜单列表。导航是一个网站的灵魂，一般分为侧导航和顶部导航。

## 代码示例



:::demo 顶部导航

水平导航。
设置 `mode`属性值为 `horizontal`设置水平导航模式。

设置 `theme`属性定义主题，可选主题有 `light` `dark` `green`。

可以设置 `active-key`属性设置选中菜单项，此c-key值只针对 `menu-item`组件。

可以设置 `to`属性实现路由跳转功能，类似 `router-link`的实现。

通过事件 `select`可以获取到点击菜单的 `c-key`的值，通过此项可以自定义实现路由跳转。

可以通过 `icon` `name`属性实现导航，也可以通过 `slot`自定义实现。

```html
<template>
    <Menu mode="horizontal" :theme="menuTopTheme">
        <MenuItem c-key="menu-item-1" icon="home" name="首页"></MenuItem>
        <Submenu c-key="submenu-1" icon='button' name="云产品">
            <MenuItem c-key="menu-item-2" icon="cloud-upload" name="服务器"></MenuItem>
            <MenuItem c-key="menu-item-3" icon="email" name="短信服务"></MenuItem>
        </Submenu>
        <Submenu c-key="submenu-2" icon='echarts-pie' name="统计分析">
            <MenuGroup name="图表">
                <MenuItem c-key="menu-item-4" icon="echarts-bar" name="柱状图"></MenuItem>
                <MenuItem c-key="menu-item-5" icon="echarts-line" name="折线图"></MenuItem>
            </MenuGroup>
            <MenuGroup name="数据">
                <MenuItem c-key="menu-item-6" icon="hot-fill" name="最火"></MenuItem>
                <MenuItem c-key="menu-item-7" icon="table" name="表格"></MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem c-key="menu-item-8" icon="square-plus" name="建站"></MenuItem>
        <MenuItem c-key="menu-item-9" icon="question" name="解决方案"></MenuItem>
    </Menu>
    <h4>切换主题</h4>
    <RadioGroup v-model="menuTopTheme">
        <Radio label="light"></Radio>
        <Radio label="dark"></Radio>
        <Radio label="green"></Radio>
    </RadioGroup>
</template>
<script>
    export default {
      data(){
        return {
          menuTopTheme: 'light',
        }
      }
    }
</script>

```

:::



:::demo 侧导航

垂直导航。

可以设置 `open-keys`属性设置打开的 `submenu`菜单项，此c-key值只针对 `submenu`组件。

设置 `accordion`开启手风琴模式。

```html
<template>
    <Row :gutter="10">
        <Col>
            <h4>默认</h4>
            <Menu :theme="menuSiderTheme">
                <MenuItem c-key="menu-item-1" icon="home" name="首页"></MenuItem>
                <Submenu c-key="submenu-1" icon='button' name="云产品">
                    <MenuItem c-key="menu-item-2" icon="cloud-upload" name="服务器"></MenuItem>
                    <MenuItem c-key="menu-item-3" icon="email" name="短信服务"></MenuItem>
                </Submenu>
                <Submenu c-key="submenu-2" icon='echarts-pie' name="统计分析">
                    <MenuGroup name="图表">
                        <MenuItem c-key="menu-item-4" icon="echarts-bar" name="柱状图"></MenuItem>
                        <MenuItem c-key="menu-item-5" icon="echarts-line" name="折线图"></MenuItem>
                    </MenuGroup>
                    <MenuGroup name="数据">
                        <MenuItem c-key="menu-item-6" icon="hot-fill" name="最火"></MenuItem>
                        <MenuItem c-key="menu-item-7" icon="table" name="表格"></MenuItem>
                    </MenuGroup>
                </Submenu>
                <MenuItem c-key="menu-item-8" icon="square-plus" name="建站"></MenuItem>
                <MenuItem c-key="menu-item-9" icon="question" name="解决方案"></MenuItem>
            </Menu>
        </Col>
        <Col>
            <h4>设置选中项和打开项</h4>
            <Menu :theme="menuSiderTheme" active-key="menu-item-2" :open-keys="['submenu-1']">
                <MenuItem c-key="menu-item-1" icon="home" name="首页"></MenuItem>
                <Submenu c-key="submenu-1" icon='button' name="云产品">
                    <MenuItem c-key="menu-item-2" icon="cloud-upload" name="服务器"></MenuItem>
                    <MenuItem c-key="menu-item-3" icon="email" name="短信服务"></MenuItem>
                </Submenu>
                <Submenu c-key="submenu-2" icon='echarts-pie' name="统计分析">
                    <MenuGroup name="图表">
                        <MenuItem c-key="menu-item-4" icon="echarts-bar" name="柱状图"></MenuItem>
                        <MenuItem c-key="menu-item-5" icon="echarts-line" name="折线图"></MenuItem>
                    </MenuGroup>
                    <MenuGroup name="数据">
                        <MenuItem c-key="menu-item-6" icon="hot-fill" name="最火"></MenuItem>
                        <MenuItem c-key="menu-item-7" icon="table" name="表格"></MenuItem>
                    </MenuGroup>
                </Submenu>
                <MenuItem c-key="menu-item-8" icon="square-plus" name="建站"></MenuItem>
                <MenuItem c-key="menu-item-9" icon="question" name="解决方案"></MenuItem>
            </Menu>
        </Col>
        <Col>
            <h4>手风琴模式</h4>
            <Menu :theme="menuSiderTheme" accordion>
                <MenuItem c-key="menu-item-1" icon="home" name="首页"></MenuItem>
                <Submenu c-key="submenu-1" icon='button' name="云产品">
                    <MenuItem c-key="menu-item-2" icon="cloud-upload" name="服务器"></MenuItem>
                    <MenuItem c-key="menu-item-3" icon="email" name="短信服务"></MenuItem>
                </Submenu>
                <Submenu c-key="submenu-2" icon='echarts-pie' name="统计分析">
                    <MenuGroup name="图表">
                        <MenuItem c-key="menu-item-4" icon="echarts-bar" name="柱状图"></MenuItem>
                        <MenuItem c-key="menu-item-5" icon="echarts-line" name="折线图"></MenuItem>
                    </MenuGroup>
                    <MenuGroup name="数据">
                        <MenuItem c-key="menu-item-6" icon="hot-fill" name="最火"></MenuItem>
                        <MenuItem c-key="menu-item-7" icon="table" name="表格"></MenuItem>
                    </MenuGroup>
                </Submenu>
                <MenuItem c-key="menu-item-8" icon="square-plus" name="建站"></MenuItem>
                <MenuItem c-key="menu-item-9" icon="question" name="解决方案"></MenuItem>
            </Menu>
        </Col>
    </Row>

    <h4>切换主题</h4>
    <RadioGroup v-model="menuSiderTheme">
        <Radio label="light"></Radio>
        <Radio label="dark"></Radio>
        <Radio label="green"></Radio>
    </RadioGroup>
</template>
<script>
    export default {
      data(){
        return {
          menuSiderTheme: 'light',
        }
      }
    }
</script>

```

:::



:::demo 尺寸

设置 `size`属性可控制尺寸大小，同时支持水平导航和垂直导航。可选值 `small` `large`或者不设置。

```html
<template>
    <Menu mode="horizontal" :size="menuSize">
        <MenuItem c-key="menu-item-1" icon="home" name="首页"></MenuItem>
        <Submenu c-key="submenu-1" icon='button' name="云产品">
            <MenuItem c-key="menu-item-2" icon="cloud-upload" name="服务器"></MenuItem>
            <MenuItem c-key="menu-item-3" icon="email" name="短信服务"></MenuItem>
        </Submenu>
        <MenuItem c-key="menu-item-4" icon="square-plus" name="建站"></MenuItem>
        <MenuItem c-key="menu-item-5" icon="question" name="解决方案"></MenuItem>
    </Menu>
    <h4>切换尺寸</h4>
    <RadioGroup v-model="menuSize">
        <Radio label="mini"></Radio>
        <Radio label="small"></Radio>
        <Radio label="default"></Radio>
        <Radio label="large"></Radio>
    </RadioGroup>
</template>
<script>
    export default {
      data(){
        return {
          menuSize: 'default',
        }
      }
    }
</script>

```

:::



:::demo 内嵌菜单

内嵌菜单。子菜单可以内嵌在菜单区域内。

```html
<template>
    <h4>水平菜单</h4>
    <Menu mode="horizontal">
        <MenuItem c-key="menu-item-1" icon="home" name="首页"></MenuItem>
        <Submenu c-key="submenu-1" icon='button' name="云产品">
            <MenuItem c-key="menu-item-2" icon="cloud-upload" name="服务器"></MenuItem>
            <MenuItem c-key="menu-item-3" icon="email" name="短信服务"></MenuItem>
            <Submenu c-key="submenu-1-1" icon='list' name="数据库">
                <MenuItem c-key="menu-item-1-1-1" name="RDS"></MenuItem>
                <MenuItem c-key="menu-item-1-1-2" name="MongoDB"></MenuItem>
            </Submenu>
        </Submenu>
        <Submenu c-key="submenu-2" icon='echarts-pie' name="统计分析">
            <MenuGroup name="图表">
                <MenuItem c-key="menu-item-4" icon="echarts-bar" name="柱状图"></MenuItem>
                <MenuItem c-key="menu-item-5" icon="echarts-line" name="折线图"></MenuItem>
            </MenuGroup>
            <MenuGroup name="数据">
                <MenuItem c-key="menu-item-6" icon="hot-fill" name="最火"></MenuItem>
                <MenuItem c-key="menu-item-7" icon="table" name="表格"></MenuItem>
            </MenuGroup>
        </Submenu>
    </Menu>
    <h4>垂直菜单</h4>
    <Menu>
        <MenuItem c-key="menu-item-1" icon="home" name="首页"></MenuItem>
        <Submenu c-key="submenu-1" icon='button' name="云产品">
            <MenuItem c-key="menu-item-2" icon="cloud-upload" name="服务器"></MenuItem>
            <MenuItem c-key="menu-item-3" icon="email" name="短信服务"></MenuItem>
            <Submenu c-key="submenu-1-1" icon='list' name="数据库">
                <MenuItem c-key="menu-item-1-1-1" name="RDS"></MenuItem>
                <MenuItem c-key="menu-item-1-1-2" name="MongoDB"></MenuItem>
            </Submenu>
        </Submenu>
        <Submenu c-key="submenu-2" icon='echarts-pie' name="统计分析">
            <MenuGroup name="图表">
                <MenuItem c-key="menu-item-4" icon="echarts-bar" name="柱状图"></MenuItem>
                <MenuItem c-key="menu-item-5" icon="echarts-line" name="折线图"></MenuItem>
            </MenuGroup>
            <MenuGroup name="数据">
                <MenuItem c-key="menu-item-6" icon="hot-fill" name="最火"></MenuItem>
                <MenuItem c-key="menu-item-7" icon="table" name="表格"></MenuItem>
            </MenuGroup>
        </Submenu>
    </Menu>
</template>

```

:::




## API

### Menu props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| width | String, Number | mode=vertical时有效 | 240 |
| theme | String | 主题，可选值`light` `dark` `green` | light |
| noHoverBackground | Boolean | hover时是否不需要背景色 | false |
| accordion | Boolean | 是否开始手风琴模式，开启后每次最多展开一个`submenu`，mode=vertical时有效 | - |
| mode | String | 菜单类型，可选值`vertical`(垂直) `horizontal`(水平) | vertical |
| size | String | 尺寸，可选值`small` `default` `large` | default |
| activeKey | String | 当前激活菜单的c-key值，只对`menuItem`组件的c-key值有效 | - |
| openKeys | Array | 展开的`submenu`的c-key值集合 | [] |



### Menu event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| select | 选中菜单时触发,返回当前选中的菜单的key值 | key |
| open-change | submenu展开收起时触发，返回第一个参数为当前触发展开收起的submenu的key值，第二个参数为所有展开项的key数组 | key, openedKeys |



### MenuItem props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| cKey | String | 必填，菜单的位置标识 | - |
| name | String | 菜单的名字 | - |
| disabled | Boolean | 菜单是否禁用 | - |
| icon | String | 菜单名字左侧的图标 | - |
| to | Object, String | router-link的to属性 | - |



### SubMenu props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| cKey | String | 必填，菜单的位置标识 | - |
| name | String | 菜单的名字 | - |
| disabled | Boolean | 菜单是否禁用 | - |
| icon | String | 菜单名字左侧的图标 | - |
| hideDropIcon | Boolean | 是否隐藏右侧下拉图标 | - |
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
