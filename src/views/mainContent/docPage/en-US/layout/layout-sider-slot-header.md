```html
<template>
    <cl-layout class="api-layout-el">
        <cl-sider class="api-layout-sider" hide-trigger>
            <div slot="header" class="api-layout-sider-header">
                LOGO
            </div>
            sider
        </cl-sider>
        <cl-layout>
            <cl-header class="api-layout-header">header</cl-header>
            <cl-content class="api-layout-content">content</cl-content>
            <cl-footer class="api-layout-footer">footer</cl-footer>
        </cl-layout>
    </cl-layout>
</template>
<script>
    export default {
      data(){
        return {}
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
     .api-layout-sider-header{
        background-color: #02b7a5;
     }
</style>

```
