# Skeleton 骨架屏


## 代码示例


:::demo 基础用法

`animation`属性控制是否开启动画

```html
<template>
    <h4>没有动画</h4>
    <cl-skeleton></cl-skeleton>
    <h4>开启动画</h4>
    <cl-skeleton animation></cl-skeleton>
</template>
<script>
    export default {
      data(){
        return {
          
        }
      }
    }
</script>
```
:::



:::demo 不同类型

type类型可取值`list` `avatar`

```html
<template>
    <h4>list类型</h4>
    <cl-skeleton type="list" animation></cl-skeleton>
    <h4>avatar类型</h4>
    <cl-skeleton type="avatar" animation></cl-skeleton>
</template>
<script>
    export default {
      data(){
        return {
          
        }
      }
    }
</script>
```
:::


:::demo 自定义展示


```html
<template>
    <cl-skeleton-item animation style="width: 60%"></cl-skeleton-item>
    <cl-skeleton-item animation></cl-skeleton-item>
</template>
<script>
    export default {
      data(){
        
        return {
          
        }
      }
    }
</script>
```
:::



## API

### Skeleton props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | String | 可选值 `list` `avatar` | list |
| animation | Boolean | 是否开启动画 | false |

### SkeletonItem props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | String | 可选值 `line` `circle` | line |
| animation | Boolean | 是否开启动画 | false |
