# Image 图片


## 代码示例


:::demo 基础用法

默认类型时，一分钟之内显示为（..秒前），一小时之内显示（..分钟前），今天显示（时间点），昨天显示（昨天+时间点），昨天之前显示（时间点）

```html
<template>
    <cl-image fit="none" :src="src"></cl-image>
    <cl-image fit="fill" :src="src"></cl-image>
    <cl-image fit="contain" :src="src"></cl-image>
    <cl-image fit="cover" :src="src"></cl-image>
    <cl-image fit="scale-down" :src="src"></cl-image>
</template>
<script>
    export default {
      data(){
        return {
          src: 'http://img1.imgtn.bdimg.com/it/u=33544438,1899075207&fm=26&gp=0.jpg'
        }
      }
    }
</script>
```
:::




## API

### Image props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| fit | String | 和[object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)保持一致 | - |
| src | String | 图片地址 | - |
| alt | String | 原生alt | - |
| previewList | Array | 开启图片预览功能，预览图片地址的数组 | [] |
| zIndex | Number | 预览图片蒙版的层级 | 2000 |

