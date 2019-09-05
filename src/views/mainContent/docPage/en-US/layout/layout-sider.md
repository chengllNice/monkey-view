```html
<template>
 <div>
     <div class="api-layout-single">
         <cl-layout class="api-layout-el">
             <cl-header class="api-layout-header">header</cl-header>
             <cl-layout>
                 <cl-sider v-model="collapsed"
                           class="api-layout-sider api-layout-sider-dark"
                          :class="{'sider-close': collapsed}"
                          :collapsed-width="collapsedWidth"
                          :hide-trigger="hideTrigger">
                     <cl-menu width="auto" theme="dark">
                         <cl-tooltip class="menu-tooltip" placement="right" :disabled="!collapsed" content="options1">
                             <cl-menu-item c-key="options1">
                                 <i class="menu-icon cl-icon-home"></i>
                                 <span class="menu-name">options1</span>
                             </cl-menu-item>
                         </cl-tooltip>
                         <cl-tooltip class="menu-tooltip" placement="right" :disabled="!collapsed" content="options2">
                             <cl-menu-item c-key="options2">
                                 <i class="menu-icon cl-icon-home"></i>
                                 <span class="menu-name">options2</span>
                             </cl-menu-item>
                         </cl-tooltip>
                         <cl-tooltip class="menu-tooltip" placement="right" :disabled="!collapsed" content="options3">
                             <cl-menu-item c-key="options3">
                                 <i class="menu-icon cl-icon-home"></i>
                                 <span class="menu-name">options3</span>
                             </cl-menu-item>
                         </cl-tooltip>
                     </cl-menu>
                 </cl-sider>
                 <cl-content class="api-layout-content">content</cl-content>
             </cl-layout>
             <cl-footer class="api-layout-footer">footer</cl-footer>
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
    .api-layout-single{
        margin-bottom: 40px;
    }
    .api-layout-el{
        text-align: center;
        color: #ffffff;
        font-size: 16px;
    }
    .api-layout-header, .api-layout-footer{
        background-color: #86d8af;
    }
    .api-layout-content{
        min-height: 120px;
        line-height: 120px;
        background-color: #19be6b;
    }
    .api-layout-sider{
        line-height: 120px;
        background-color: #62c191;
    }
    .api-layout-sider-dark{
        background-color: #344058;
        text-align: left;
        line-height: normal;
    }
    .menu-tooltip{
        display: block;
        text-align: left;
        line-height: normal;
    }
    .sider-close{
        text-align: center;
    }
    .menu-icon{
        transition: all 0.2s ease-in-out;
        font-size: 18px;
    }
    .menu-name{
        width: 0;
        transition: all 0.1s;
        margin: auto;
    }
</style>

```
