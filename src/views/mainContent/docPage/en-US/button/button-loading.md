
```html
<template>
    <ClButton loading>Default</ClButton>
    <ClButton icon="cl-icon-search" loading></ClButton>
    <ClButton type="primary" loading>Success</ClButton>
    <ClButton type="primary" :loading="loading1" @click="loading1 = true">Click me!</ClButton>
    <ClButton type="primary" :loading="loading2" @click="loading2 = true" icon="cl-icon-search">Click me!</ClButton>
</template>

<script>
    export default {
      data(){
        return{
          loading1: false,
          loading2: false,
        }
      }
    }
</script>
```
