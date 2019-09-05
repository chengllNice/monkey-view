```html
<template>
  <div>
     <div class="api-layout-single">
         <cl-layout class="api-layout-el">
             <cl-sider v-model="collapsedCustom"
                       class="api-layout-sider api-layout-sider-dark"
                       :class="{'sider-close': collapsedCustom}"
                       hide-trigger>
                 <cl-menu width="auto" theme="dark">
                     <cl-tooltip class="menu-tooltip" placement="right" :disabled="!collapsedCustom" content="options1">
                         <cl-menu-item c-key="options1">
                             <i class="menu-icon cl-icon-home"></i>
                             <span class="menu-name">options1</span>
                         </cl-menu-item>
                     </cl-tooltip>
                     <cl-tooltip class="menu-tooltip" placement="right" :disabled="!collapsedCustom" content="options2">
                         <cl-menu-item c-key="options2">
                             <i class="menu-icon cl-icon-home"></i>
                             <span class="menu-name">options2</span>
                         </cl-menu-item>
                     </cl-tooltip>
                     <cl-tooltip class="menu-tooltip" placement="right" :disabled="!collapsedCustom" content="options3">
                         <cl-menu-item c-key="options3">
                             <i class="menu-icon cl-icon-home"></i>
                             <span class="menu-name">options3</span>
                         </cl-menu-item>
                     </cl-tooltip>
                 </cl-menu>
             </cl-sider>
             <cl-layout>
                 <cl-header class="api-layout-header api-layout-header-toggle">
                     <i class="cl-icon-list1" @click="triggerClick"></i>
                 </cl-header>
                 <cl-content class="api-layout-content">content</cl-content>
                 <cl-footer class="api-layout-footer">footer</cl-footer>
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
    .menu-tooltip{
        display: block;
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
    .api-layout-sider-dark{
        background-color: #344058;
        text-align: left;
        line-height: normal;
    }
    .api-layout-header-toggle{
        text-align: left;
    }
    .api-layout-header-toggle i{
        cursor: pointer;
    }
</style>

```
