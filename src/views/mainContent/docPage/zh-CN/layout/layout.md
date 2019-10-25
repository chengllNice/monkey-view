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

<cl-alter type="info" showIcon>注意：采用 flex 布局实现，注意 <a href="https://caniuse.com/#search=flex" target="_blank">浏览器兼容性</a> 的问题。</cl-alter>


## 代码示例


:::demo 基本结构

经典的页面布局
```html
<template>
 <div>
    <div class="doc-layout-single">
        <cl-layout class="doc-layout-el">
            <cl-header class="doc-layout-header">header</cl-header>
            <cl-content class="doc-layout-content">content</cl-content>
            <cl-footer class="doc-layout-footer">footer</cl-footer>
        </cl-layout>
    </div>
    <div class="doc-layout-single">
        <cl-layout class="doc-layout-el">
            <cl-header class="doc-layout-header">header</cl-header>
            <cl-layout>
                <cl-sider class="doc-layout-sider" hide-trigger>sider</cl-sider>
                <cl-content class="doc-layout-content">content</cl-content>
            </cl-layout>
            <cl-footer class="doc-layout-footer">footer</cl-footer>
        </cl-layout>
    </div>
    <div class="doc-layout-single">
        <cl-layout class="doc-layout-el">
            <cl-sider class="doc-layout-sider" hide-trigger>sider</cl-sider>
            <cl-layout>
                <cl-header class="doc-layout-header">header</cl-header>
                <cl-content class="doc-layout-content">content</cl-content>
                <cl-footer class="doc-layout-footer">footer</cl-footer>
            </cl-layout>
        </cl-layout>
    </div>
    <div class="doc-layout-single">
        <cl-layout class="doc-layout-el">
            <cl-header class="doc-layout-header">header</cl-header>
            <cl-layout>
                <cl-sider class="doc-layout-sider" hide-trigger>sider</cl-sider>
                <cl-layout>
                    <cl-content class="doc-layout-content">content</cl-content>
                    <cl-footer class="doc-layout-footer">footer</cl-footer>
                </cl-layout>
            </cl-layout>
        </cl-layout>
    </div>
</div>
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
</style>

```

:::


:::demo 自定义sider的header

通常这里可以设置LOGO
```html
<template>
    <cl-layout class="doc-layout-el">
        <cl-sider class="doc-layout-sider" hide-trigger>
            <div slot="header" class="doc-layout-sider-header">
                LOGO
            </div>
            sider
        </cl-sider>
        <cl-layout>
            <cl-header class="doc-layout-header">header</cl-header>
            <cl-content class="doc-layout-content">content</cl-content>
            <cl-footer class="doc-layout-footer">footer</cl-footer>
        </cl-layout>
    </cl-layout>
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
         <cl-layout class="doc-layout-el">
             <cl-header class="doc-layout-header">header</cl-header>
             <cl-layout>
                 <cl-sider v-model="collapsed"
                           class="doc-layout-sider doc-layout-sider-dark"
                          :class="{'doc-layout-sider-close': collapsed}"
                          :collapsed-width="collapsedWidth"
                          :hide-trigger="hideTrigger">
                     <cl-menu width="auto" theme="dark">
                         <cl-tooltip class="doc-layout-menu-tooltip" placement="right" :disabled="!collapsed" content="options1">
                             <cl-menu-item c-key="options1">
                                 <i class="doc-layout-menu-icon cl-icon-home"></i>
                                 <span class="doc-layout-menu-name">options1</span>
                             </cl-menu-item>
                         </cl-tooltip>
                         <cl-tooltip class="doc-layout-menu-tooltip" placement="right" :disabled="!collapsed" content="options2">
                             <cl-menu-item c-key="options2">
                                 <i class="doc-layout-menu-icon cl-icon-home"></i>
                                 <span class="doc-layout-menu-name">options2</span>
                             </cl-menu-item>
                         </cl-tooltip>
                         <cl-tooltip class="doc-layout-menu-tooltip" placement="right" :disabled="!collapsed" content="options3">
                             <cl-menu-item c-key="options3">
                                 <i class="doc-layout-menu-icon cl-icon-home"></i>
                                 <span class="doc-layout-menu-name">options3</span>
                             </cl-menu-item>
                         </cl-tooltip>
                     </cl-menu>
                 </cl-sider>
                 <cl-content class="doc-layout-content">content</cl-content>
             </cl-layout>
             <cl-footer class="doc-layout-footer">footer</cl-footer>
         </cl-layout>
     </div>
     <cl-switch width="90" v-model="hideTrigger">
         <span slot="open">显示trigger</span>
         <span slot="close">隐藏trigger</span>
     </cl-switch>
     <div>
         定义收起的宽度： <cl-input type="number" v-model="collapsedWidth"></cl-input>
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



:::demo 自定义trigger

通过设置 `hide-trigger`属性隐藏默认的触发器。可自定义实现trigger触发器。
```html
<template>
  <div>
     <div class="doc-layout-single">
         <cl-layout class="doc-layout-el">
             <cl-sider v-model="collapsedCustom"
                       class="doc-layout-sider doc-layout-sider-dark"
                       :class="{'doc-layout-sider-close': collapsedCustom}"
                       hide-trigger>
                 <cl-menu width="auto" theme="dark">
                     <cl-tooltip class="doc-layout-menu-tooltip" placement="right" :disabled="!collapsedCustom" content="options1">
                         <cl-menu-item c-key="options1">
                             <i class="doc-layout-menu-icon cl-icon-home"></i>
                             <span class="doc-layout-menu-name">options1</span>
                         </cl-menu-item>
                     </cl-tooltip>
                     <cl-tooltip class="doc-layout-menu-tooltip" placement="right" :disabled="!collapsedCustom" content="options2">
                         <cl-menu-item c-key="options2">
                             <i class="doc-layout-menu-icon cl-icon-home"></i>
                             <span class="doc-layout-menu-name">options2</span>
                         </cl-menu-item>
                     </cl-tooltip>
                     <cl-tooltip class="doc-layout-menu-tooltip" placement="right" :disabled="!collapsedCustom" content="options3">
                         <cl-menu-item c-key="options3">
                             <i class="doc-layout-menu-icon cl-icon-home"></i>
                             <span class="doc-layout-menu-name">options3</span>
                         </cl-menu-item>
                     </cl-tooltip>
                 </cl-menu>
             </cl-sider>
             <cl-layout>
                 <cl-header class="doc-layout-header doc-layout-header-toggle">
                     <i class="cl-icon-list1" @click="triggerClick"></i>
                 </cl-header>
                 <cl-content class="doc-layout-content">content</cl-content>
                 <cl-footer class="doc-layout-footer">footer</cl-footer>
             </cl-layout>
         </cl-layout>
     </div>
 </div>
</template>
<script>
    export default {
      data(){
        return {
          collapsedCustom: false,
        }
      },
      methods: {
        triggerClick(){
          this.collapsedCustom = !this.collapsedCustom;
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
    .doc-layout-menu-tooltip{
        display: block;
    }
    .doc-layout-sider-close{
        text-align: center;
    }
    .doc-layout-menu-icon{
        transition: all 0.2s ease-in-out;
        font-size: 18px;
    }
    .doc-layout-menu-name{
        width: 0;
        transition: all 0.1s;
        margin: auto;
    }
    .doc-layout-sider-dark{
        background-color: #344058;
        text-align: left;
        line-height: normal;
    }
    .doc-layout-header-toggle{
        text-align: left;
    }
    .doc-layout-header-toggle i{
        cursor: pointer;
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
| collapsedWidth | String, Number | 收起时的宽度 | 60 |
| hideTrigger | Boolean | 是否隐藏trigger | - |


### Sider event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| collapse | 展开收起时触发 | value |


### Sider slot

| 名称 | 说明 |
| ---- | ---- |
| header | 定义header |
| trigger | 自定义trigger |


