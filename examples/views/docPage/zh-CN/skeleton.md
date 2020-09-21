# Skeleton 骨架屏


## 代码示例


:::demo 基础用法

`animation`属性控制是否开启动画

```html
<template>
    <h4>没有动画</h4>
    <Skeleton></Skeleton>
    <h4>开启动画</h4>
    <Skeleton animation></Skeleton>
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
    <Skeleton type="list" animation></Skeleton>
    <h4>avatar类型</h4>
    <Skeleton type="avatar" animation></Skeleton>
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

可以直接使用`SkeletonItem`组件自定义骨架屏的结构

```html
<template>
    <h4>自定义一</h4>
    <SkeletonItem animation style="width: 60%"></SkeletonItem>
    <SkeletonItem animation></SkeletonItem>

    <h4>自定义二</h4>
    <div class="doc-skeleton-custom">
        <div class="doc-skeleton-custom-header">
            <SkeletonItem animation type="circle" style="width: 50px; height: 50px"></SkeletonItem>
            <div class="doc-skeleton-custom-header-title">
                <SkeletonItem animation style="width: 30%"></SkeletonItem>
                <SkeletonItem animation style=""></SkeletonItem>
            </div>
        </div>
        <SkeletonItem animation></SkeletonItem>
        <SkeletonItem animation></SkeletonItem>
        <SkeletonItem animation style="width: 80%"></SkeletonItem>
    </div>
   
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
