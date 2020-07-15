# Image 图片


## 代码示例


:::demo 基础用法

`fit`属性和[object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)保持一致；

```html
<template>
    <cl-image class="doc-base-image" fit="none" :src="src"></cl-image>
    <cl-image class="doc-base-image" fit="fill" :src="src"></cl-image>
    <cl-image class="doc-base-image" fit="contain" :src="src"></cl-image>
    <cl-image class="doc-base-image" fit="cover" :src="src"></cl-image>
    <cl-image class="doc-base-image" fit="scale-down" :src="src"></cl-image>
</template>
<script>
    export default {
      data(){
        return {
          src: 'http://a3.att.hudong.com/57/28/01300000921826141405283668131.jpg'
        }
      }
    }
</script>
<style>
.doc-base-image{
  width: 100px;
  height: 100px;
}
</style>
```
:::


:::demo 加载中和加载失败

`slot`可以自定义加载中和加载失败的展示内容

```html
<template>
    <cl-row>
        <cl-col>
            <h4>加载中</h4>
            <cl-image class="doc-status-image" fit="none" :src="src1"></cl-image>
        </cl-col>
        <cl-col>
            <h4>加载失败</h4>
            <cl-image class="doc-status-image" fit="fill" :src="src2"></cl-image>
        </cl-col>
        <cl-col>
            <h4>自定义加载失败</h4>
            <cl-image class="doc-status-image" fit="fill" :src="src2">
                <Icon slot="error" type="picture" class="doc-status-image-icon"></Icon>
            </cl-image>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
      data(){
        return {
          src1: 'http://a3.att.hudong.com/57/28/01300000921826141405283668131.jpg',
          src2: ''
        }
      }
    }
</script>
<style>
.doc-status-image{
  width: 200px;
  height: 200px;
}
.doc-status-image .doc-status-image-icon{
  font-size: 30px;
}
</style>
```
:::


:::demo 图片预览

`preview-list`属性开启图片预览功能

```html
<template>
    <cl-image class="doc-base-image" fit="none" :src="src" :preview-list="list"></cl-image>
</template>
<script>
    export default {
      data(){
        return {
            src: 'http://a3.att.hudong.com/57/28/01300000921826141405283668131.jpg',
            list: [
                'http://a3.att.hudong.com/57/28/01300000921826141405283668131.jpg',
                'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593624021279&di=b496016fc934b543036bb4f376caa2da&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20161222%2F20161222195407_66e9861db58f43ca5d9a53437a400105_3.jpeg',
            ]
        }
      }
    }
</script>
<style>
.doc-base-image{
  width: 100px;
  height: 100px;
}
</style>
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

### Image event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| load | 加载成功 | e:Event |
| error | 加载成功失败 | e:Event |

