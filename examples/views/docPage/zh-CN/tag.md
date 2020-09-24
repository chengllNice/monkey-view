# Tag 标签

进行标记和分类的标签。

## 代码示例


:::demo 基础用法

添加 `closable`属性可以关闭标签，点击关闭按钮时触发 `close`事件，需要自己实现关闭逻辑。

```html
<template>
    <Tag>标签</Tag>
    <Tag v-show="showBase" closable @close="closeClick">标签</Tag>
</template>
<script>
    export default {
      data(){
        return {
          showBase: true,
        }
      },
      methods: {
        closeClick(){
          this.showBase = false;
        }
      }
    }
</script>
```
:::


:::demo 尺寸

多种尺寸选择。

```html
<template>
    <Tag size="mini">标签</Tag>
    <Tag size="small">标签</Tag>
    <Tag>标签</Tag>
    <Tag size="large">标签</Tag>
</template>
```
:::


:::demo 镂空效果

添加 `ghost`属性可以实现镂空的效果。

```html
<template>
    <Tag ghost>标签</Tag>
    <Tag ghost v-show="showGhost" closable @close="closeClick('Ghost')">标签</Tag>
</template>
<script>
    export default {
      data(){
        return {
           showGhost: true,
        }
      },
      methods: {
        closeClick(){
          this.showGhost = false;
        }
      }
    }
</script>
```
:::


:::demo 各种颜色

内置10种背景色配置。也可以自定义颜色。

```html
<template>
    <h4>内置颜色</h4>
    <Tag>标签</Tag>
    <Tag color="primary">标签</Tag>
    <Tag color="danger">标签</Tag>
    <Tag color="warning">标签</Tag>
    <Tag color="success">标签</Tag>
    <Tag color="info">标签</Tag>
    <Tag color="default-o">标签</Tag>
    <Tag color="primary-o">标签</Tag>
    <Tag color="danger-o">标签</Tag>
    <Tag color="warning-o">标签</Tag>
    <Tag color="success-o">标签</Tag>
    <Tag color="info-o">标签</Tag>
    <h4>自定义颜色#000000</h4>
    <Tag color="#000000">标签</Tag>
    <Tag color="#000000" closable>标签</Tag>
    <Tag color="#000000" ghost>标签</Tag>
    <Tag color="#000000" closable ghost>标签</Tag>
    <h4>自定义颜色#87d068</h4>
    <Tag color="#87d068">标签</Tag>
    <Tag color="#87d068" closable>标签</Tag>
    <Tag color="#87d068" ghost>标签</Tag>
    <Tag color="#87d068" closable ghost>标签</Tag>
    <h4>自定义颜色#ffa2d3</h4>
    <Tag color="#ffa2d3">标签</Tag>
    <Tag color="#ffa2d3" closable>标签</Tag>
    <Tag color="#ffa2d3" ghost>标签</Tag>
    <Tag color="#ffa2d3" closable ghost>标签</Tag>
</template>
```
:::


:::demo 可选择

添加 `checkable`属性可以开启标签选择，控制 `checked`属性控制是否选中，默认选中。

```html
<template>
    <Tag color="primary" checkable>标签</Tag>
    <Tag color="danger" checkable>标签</Tag>
    <Tag color="warning" checkable>标签</Tag>
    <Tag color="success" checkable>标签</Tag>
    <Tag color="info" checkable>标签</Tag>
</template>
```
:::


:::demo 动态添加和删除

用数组生成一组标签，可以动态添加和删除。

```html
<template>
    <Tag v-for="item in tagList" :key="item.id" closable @close="tagClose(item)">{{item.name}}</Tag>
    <p>添加</p>
    <Input ref="tagInput" v-model="tagInputValue" v-show="showInput" size="mini" @enter="inputEnter" style="width: 78px;" @blur="blurInput"></Input>
    <Tag v-show="!showInput" @click="newTagClick"><Icon type="plus"></Icon> New Tag</Tag>
</template>
<script>
    export default {
      data(){
        return {
          showInput: false,
          tagInputValue: '',
          tagList: [
            {
              id: '0',
              name: '标签0'
            },
            {
              id: '1',
              name: '标签1'
            },
            {
              id: '2',
              name: '标签2'
            }
          ]
        }
      },
      methods: {
        newTagClick(){
          this.showInput = true;
          this.$refs.tagInput.focus();
        },
        inputEnter(value){
          this.tagInputValue = '';
          this.showInput = false;
          let tag = {
            id: this.tagList.length,
            name: value,
          };
          this.tagList.push(tag);
        },
        blurInput(){
          this.tagInputValue = '';
          this.showInput = false;
        },
        tagClose(item){
          let index = this.tagList.indexOf(item);
          index > -1 && this.tagList.splice(index, 1);
        }
      }
    }
</script>
```
:::



## API

### Tag props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| size | String | 尺寸，可选值 `small` `large`或者不设置 | - |
| closable | Boolean | 可关闭，需要自己实现关闭逻辑 | - |
| ghost | Boolean | 背景透明 | - |
| color | String | tag背景颜色 | default |
| disabled | Boolean | 禁用 | - |
| readonly | Boolean | 只读属性 | - |
| placeholder | String | 占位文本 | - |
| checkable | Boolean | 标签是否可以选择 | - |
| checked | Boolean | 标签选中的状态 | true |



### Tag event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| close | 点击关闭时触发 | - |
