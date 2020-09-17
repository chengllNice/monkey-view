# Layout 布局

布局组件，整体页面布局。

## 组件概述

- `Layout`组件：布局容器，可以嵌套`Header` `Sider` `Content` `Footer` `Layout`组件，可以放在任何父容器中。

- `Header`组件：顶部容器，可以嵌套在`Layout`组件中，不能嵌套进其他布局组件中。

- `Sider`组件：侧边栏容器，默认附带基本功能，可以嵌套在`Layout`组件中，不能嵌套进其他布局组件中。

- `Content`组件：内容容器，可以嵌套在`Layout`组件中，不能嵌套进其他布局组件中。

- `Footer`组件：底部容器，可以嵌套在`Layout`组件中，不能嵌套进其他布局组件中。

### 交互

- `Sider`组件实现了基本的侧导航功能，支持手风琴和全展开的样式，请根据业务相应的扩展。

<m-alter type="info" showIcon>注意：采用 flex 布局实现，注意 <a href="https://caniuse.com/#search=flex" target="_blank">浏览器兼容性</a> 的问题。</m-alter>


## 代码示例


:::demo 基本结构

经典的页面布局
```html
<template>
 <div>
    <div class="doc-layout-single">
        <Layout class="doc-layout-el">
            <Header class="doc-layout-header">header</Header>
            <Content class="doc-layout-content">content</Content>
            <Footer class="doc-layout-footer">footer</Footer>
        </Layout>
    </div>
    <div class="doc-layout-single">
        <Layout class="doc-layout-el">
            <Header class="doc-layout-header">header</Header>
            <Layout>
                <Sider class="doc-layout-sider" hide-trigger>sider</Sider>
                <Content class="doc-layout-content">content</Content>
            </Layout>
            <Footer class="doc-layout-footer">footer</Footer>
        </Layout>
    </div>
    <div class="doc-layout-single">
        <Layout class="doc-layout-el">
            <Sider class="doc-layout-sider" hide-trigger>sider</Sider>
            <Layout>
                <Header class="doc-layout-header">header</Header>
                <Content class="doc-layout-content">content</Content>
                <Footer class="doc-layout-footer">footer</Footer>
            </Layout>
        </Layout>
    </div>
    <div class="doc-layout-single">
        <Layout class="doc-layout-el">
            <Header class="doc-layout-header">header</Header>
            <Layout>
                <Sider class="doc-layout-sider" hide-trigger>sider</Sider>
                <Layout>
                    <Content class="doc-layout-content">content</Content>
                    <Footer class="doc-layout-footer">footer</Footer>
                </Layout>
            </Layout>
        </Layout>
    </div>
</div>
</template>

```

:::


:::demo 自定义sider的header

通常这里可以设置LOGO
```html
<template>
    <Layout class="doc-layout-el">
        <Sider class="doc-layout-sider" hide-trigger>
            <div slot="header" class="doc-layout-sider-header">
                LOGO
            </div>
            sider
        </Sider>
        <Layout>
            <Header class="doc-layout-header">header</Header>
            <Content class="doc-layout-content">content</Content>
            <Footer class="doc-layout-footer">footer</Footer>
        </Layout>
    </Layout>
</template>
<style>
    .doc-layout-single{
        margin-bottom: 40px;
    }
    .doc-layout-el{
        text-align: center;
        color: #ffffff;
        font-size: 16px;
    }
    .doc-layout-header, .doc-layout-footer{
        background-color: #86d8af;
    }
    .doc-layout-content{
        min-height: 120px;
        line-height: 120px;
        background-color: #19be6b;
    }
    .doc-layout-sider{
        line-height: 120px;
        background-color: #62c191;
    }
     .doc-layout-sider-header{
        background-color: #02b7a5;
     }
</style>

```

:::



:::demo 侧边栏布局

默认 `Sider`组件显示trigger切换侧边栏的触发器，可以使用 `hide-trigger`属性隐藏触发器。
可设置 `Sider`组件 `height`属性使内部内容超出时滚动。
可设置 `Sider`组件 `collapsedWidth`属性收缩起来的宽度。当收起的宽度为0时，会自动出现特殊的trigger。
可通过 v-model双向绑定控制 `Sider`组件的展开收起状态
```html
<template>
 <div>
     <div class="doc-layout-single">
         <Layout class="doc-layout-el">
             <Header class="doc-layout-header">header</Header>
             <Layout>
                 <Sider v-model="collapsed"
                           class="doc-layout-sider doc-layout-sider-dark"
                          :class="{'doc-layout-sider-close': collapsed}"
                          :collapsed-width="collapsedWidth"
                          :hide-trigger="hideTrigger">
                     <Menu width="auto" theme="dark">
                         <Tooltip class="doc-layout-menu-tooltip" placement="right" :disabled="!collapsed" content="options1" renderHtml>
                             <MenuItem c-key="options1">
                                 <Icon type="home" class="doc-layout-menu-icon"></Icon>
                                 <span class="doc-layout-menu-name">options1</span>
                             </MenuItem>
                         </Tooltip>
                         <Tooltip class="doc-layout-menu-tooltip" placement="right" :disabled="!collapsed" content="options2" renderHtml>
                             <MenuItem c-key="options2">
                                 <Icon type="home" class="doc-layout-menu-icon"></Icon>
                                 <span class="doc-layout-menu-name">options2</span>
                             </MenuItem>
                         </Tooltip>
                         <Tooltip class="doc-layout-menu-tooltip" placement="right" :disabled="!collapsed" content="options3" renderHtml>
                             <MenuItem c-key="options3">
                                 <Icon type="home" class="doc-layout-menu-icon"></Icon>
                                 <span class="doc-layout-menu-name">options3</span>
                             </MenuItem>
                         </Tooltip>
                     </Menu>
                 </Sider>
                 <Content class="doc-layout-content">content</Content>
             </Layout>
             <Footer class="doc-layout-footer">footer</Footer>
         </Layout>
     </div>
     <m-switch width="90" v-model="hideTrigger">
         <span slot="open">显示trigger</span>
         <span slot="close">隐藏trigger</span>
     </m-switch>
     <div>
         定义收起的宽度： <m-input type="number" v-model="collapsedWidth"></m-input>
     </div>
 </div>
</template>
<script>
    export default {
      data(){
        return {
          collapsed: true,
          collapsedWidth: 60,
          hideTrigger: false,
        }
      }
    }
</script>
<style>
    .doc-layout-single{
        margin-bottom: 40px;
    }
    .doc-layout-el{
        text-align: center;
        color: #ffffff;
        font-size: 16px;
    }
    .doc-layout-header, .doc-layout-footer{
        background-color: #86d8af;
    }
    .doc-layout-content{
        min-height: 120px;
        line-height: 120px;
        background-color: #19be6b;
    }
    .doc-layout-sider{
        line-height: 120px;
        background-color: #62c191;
    }
    .doc-layout-sider-dark{
        background-color: #344058;
        text-align: left;
        line-height: normal;
    }
    .doc-layout-menu-tooltip{
        display: block;
        text-align: left;
        line-height: normal;
    }
    .doc-layout-sider-close{
        text-align: center;
    }
    .doc-layout-menu-name{
      width: auto;
      transition: all 0.2s ease-in-out;
      margin: auto;
      display: inline-block;
    }
    .doc-layout-menu-icon{
      transition: all 0.2s ease-in-out;
    }
    .doc-layout-sider-close .doc-layout-menu-icon{
        font-size: 18px;
    }
    .doc-layout-sider-close .doc-layout-menu-name{
        width: 0;
        display: none !important;
    }
</style>

```

:::



:::demo 设置高度

默认情况下`sider`的高度是由内容撑开的
```html
<template>
 <div>
     <div>
         <Layout>
             <Header class="doc-layout-header">header</Header>
             <Layout>
                 <Sider height="300px" v-model="collapse">
                     <Menu :collapse="collapse" :open-keys="openKeys" theme="dark">
                         <Submenu c-key="submenu1">
                             <template slot="title">
                                 <Icon type="home"></Icon>
                                 <span>submenu1</span>
                             </template>
                             <MenuItem c-key="menuItem1">
                                 <Icon type="home"></Icon>
                                 <span>menuItem1</span>
                             </MenuItem>
                             <MenuItem c-key="menuItem2">
                                 <Icon type="home"></Icon>
                                 <span>menuItem2</span>
                             </MenuItem>
                             <MenuItem c-key="menuItem3">
                                 <Icon type="home"></Icon>
                                 <span>menuItem3</span>
                             </MenuItem>
                             <MenuItem c-key="menuItem4">
                                 <Icon type="home"></Icon>
                                 <span>menuItem4</span>
                             </MenuItem>
                             <MenuItem c-key="menuItem5">
                                 <Icon type="home"></Icon>
                                 <span>menuItem5</span>
                             </MenuItem>
                         </Submenu>
                         <Submenu c-key="submenu2">
                             <template slot="title">
                                 <Icon type="home"></Icon>
                                 <span>submenu2</span>
                             </template>
                             <MenuItem c-key="menuItem2-1">
                                 <Icon type="home"></Icon>
                                 <span>menuItem2-1</span>
                             </MenuItem>
                             <MenuItem c-key="menuItem2-2">
                                 <Icon type="home"></Icon>
                                 <span>menuItem2-2</span>
                             </MenuItem>
                             <MenuItem c-key="menuItem2-3">
                                 <Icon type="home"></Icon>
                                 <span>menuItem2-3</span>
                             </MenuItem>
                             <MenuItem c-key="menuItem2-4">
                                 <Icon type="home"></Icon>
                                 <span>menuItem2-4</span>
                             </MenuItem>
                             <MenuItem c-key="menuItem2-5">
                                 <Icon type="home"></Icon>
                                 <span>menuItem2-5</span>
                             </MenuItem>
                         </Submenu>
                         <Submenu c-key="submenu3">
                             <template slot="title">
                                 <Icon type="home"></Icon>
                                 <span>submenu3</span>
                             </template>
                             <MenuItem c-key="menuItem3-1">
                                 <Icon type="home"></Icon>
                                 <span>menuItem3-1</span>
                             </MenuItem>
                             <MenuItem c-key="menuItem3-2">
                                 <Icon type="home"></Icon>
                                 <span>menuItem3-2</span>
                             </MenuItem>
                             <MenuItem c-key="menuItem3-3">
                                 <Icon type="home"></Icon>
                                 <span>menuItem3-3</span>
                             </MenuItem>
                             <MenuItem c-key="menuItem3-4">
                                 <Icon type="home"></Icon>
                                 <span>menuItem3-4</span>
                             </MenuItem>
                             <MenuItem c-key="menuItem3-5">
                                 <Icon type="home"></Icon>
                                 <span>menuItem3-5</span>
                             </MenuItem>
                         </Submenu>
                     </Menu>
                 </Sider>
                 <Content class="doc-layout-content">content</Content>
             </Layout>
             <Footer class="doc-layout-footer">footer</Footer>
         </Layout>
     </div>
 </div>
</template>
<script>
    export default {
      data(){
        return {
          collapse: false,
          openKeys: [],
        }
      }
    }
</script>
<style>
    .doc-layout-header, .doc-layout-footer{
        color: #ffffff;
        text-align: center;
        background-color: #86d8af;
    }
    .doc-layout-content{
        min-height: 120px;
        line-height: 120px;
        background-color: #19be6b;
    }
</style>

```

:::



:::demo 自定义触发器

通过设置 `hide-trigger`属性隐藏默认的触发器。可自定义实现trigger触发器。
```html
<template>
    <Layout>
         <Sider v-model="collapse" hide-trigger>
             <Menu :collapse="collapse" theme="dark">
                 <MenuItem c-key="options1">
                      <Icon type="home"></Icon>
                      <span>options1</span>
                 </MenuItem>
                 <MenuItem c-key="options2">
                      <Icon type="home"></Icon>
                      <span>options2</span>
                 </MenuItem>
                 <MenuItem c-key="options3">
                      <Icon type="home"></Icon>
                      <span>options3</span>
                 </MenuItem>
             </Menu>
         </Sider>
         <Layout>
             <Header class="doc-layout-header">
                 <Icon type="list" size="20" @click="triggerClick"></Icon>
             </Header>
             <Content class="doc-layout-content">content</Content>
             <Footer class="doc-layout-footer">footer</Footer>
         </Layout>
     </Layout>
</template>
<script>
    export default {
      data(){
        return {
          collapse: false,
        }
      },
      methods: {
        triggerClick(){
          this.collapse = !this.collapse;
        }
      }
    }
</script>
<style>
    .doc-layout-header, .doc-layout-footer{
        color: #ffffff;
        text-align: center;
        background-color: #86d8af;
    }
    .doc-layout-content{
        min-height: 120px;
        line-height: 120px;
        color: #ffffff;
        text-align: center;
        font-size: 16px;
        background-color: #19be6b;
    }
</style>

```

:::



## API

### Sider props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | Boolean | 控制展开收起，可以使用v-model双向绑定，true(收起),false(展开) | - |
| width | String, Number | 展开时的宽度 | 200 |
| height | String, Number | 设置滚动时的高度 | - |
| collapsed-width | String, Number | 收起时的宽度 | 60 |
| hide-trigger | Boolean | 是否隐藏trigger | - |
| show-zero-trigger | Boolean | `collapsed-width`宽度为0时，是否显示特殊的trigger | true |


### Sider event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| collapse | 展开收起时触发 | value |


### Sider slot

| 名称 | 说明 |
| ---- | ---- |
| header | 定义header |
| trigger | 自定义trigger |


