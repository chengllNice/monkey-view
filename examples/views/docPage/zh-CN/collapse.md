# Collapse 折叠面板

折叠内容区域。

## 代码示例


:::demo 基础用法

可以使用v-model实现双向数据绑定。可以默认展开多个面板，设置绑定值为数组。数组项为 `cl-collapse-item`的属性 `c-key`的值。

```html
<template>
    <cl-row :gutter="10">
        <cl-col>
            <cl-collapse v-model="openedBase">
                <cl-collapse-item c-key="1" name="我说不爱你，那是假话">
                    I lied when I said I didn’t like you. I lied when I said I didn’t care. I lie every time I try to tell myself I will never fall for you.
                </cl-collapse-item>
                <cl-collapse-item c-key="2" name="喜欢一个人， 一定要让对方知道">
                    If you love someone,you must let him know.Maybe you‘d get no answer,but at least you have tied and won‘t regret.
                </cl-collapse-item>
                <cl-collapse-item c-key="3" name="人生就是一场旅行">
                    Life is a journey, not the destination, but the scenery along the should be and the mood at the view.
                </cl-collapse-item>
            </cl-collapse>
        </cl-col>
        <cl-col>
            <cl-collapse v-model="openedMoreBase">
                <cl-collapse-item c-key="1" name="我说不爱你，那是假话">
                    I lied when I said I didn’t like you. I lied when I said I didn’t care. I lie every time I try to tell myself I will never fall for you.
                </cl-collapse-item>
                <cl-collapse-item c-key="2" name="喜欢一个人， 一定要让对方知道">
                    If you love someone,you must let him know.Maybe you‘d get no answer,but at least you have tied and won‘t regret.
                </cl-collapse-item>
                <cl-collapse-item c-key="3" name="人生就是一场旅行">
                    Life is a journey, not the destination, but the scenery along the should be and the mood at the view.
                </cl-collapse-item>
            </cl-collapse>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
      data(){
        return {
          openedBase: '1',
          openedMoreBase: ['1', '2']
        }
      }
    }
</script>

```

:::


:::demo 手风琴模式

设置 `accordion`属性开启手风琴模式，每次只能打开一个面板。

```html
<template>
    <cl-collapse v-model="openedAccordion" accordion>
        <cl-collapse-item c-key="1" name="我说不爱你，那是假话">
            I lied when I said I didn’t like you. I lied when I said I didn’t care. I lie every time I try to tell myself I will never fall for you.
        </cl-collapse-item>
        <cl-collapse-item c-key="2" name="喜欢一个人， 一定要让对方知道">
            If you love someone,you must let him know.Maybe you‘d get no answer,but at least you have tied and won‘t regret.
        </cl-collapse-item>
        <cl-collapse-item c-key="3" name="人生就是一场旅行">
            Life is a journey, not the destination, but the scenery along the should be and the mood at the view.
        </cl-collapse-item>
    </cl-collapse>
</template>
<script>
    export default {
      data(){
        return {
          openedAccordion: '1'
        }
      }
    }
</script>

```

:::



:::demo 面板嵌套

折叠面板可以进行嵌套。

```html
<template>
    <cl-collapse v-model="openedNest">
        <cl-collapse-item c-key="1" name="我说不爱你，那是假话">
            I lied when I said I didn’t like you. I lied when I said I didn’t care. I lie every time I try to tell myself I will never fall for you.
            <cl-collapse v-model="openedNestChild">
                <cl-collapse-item c-key="1-1" name="你若独行，我必相随">
                    If you're alone, I'll be your shadow.If you want to cry, I'll be your shoulder.
                </cl-collapse-item>
                <cl-collapse-item c-key="1-2" name="回不去的是时光">
                    Time not to go, can't walk close to that love, not to arrive is the heart.
                </cl-collapse-item>
            </cl-collapse>
        </cl-collapse-item>
        <cl-collapse-item c-key="2" name="喜欢一个人， 一定要让对方知道">
            If you love someone,you must let him know.Maybe you‘d get no answer,but at least you have tied and won‘t regret.
        </cl-collapse-item>
        <cl-collapse-item c-key="3" name="人生就是一场旅行">
            Life is a journey, not the destination, but the scenery along the should be and the mood at the view.
        </cl-collapse-item>
    </cl-collapse>
</template>
<script>
    export default {
      data(){
        return {
          openedNest: '1',
          openedNestChild: '1-1'
        }
      }
    }
</script>

```

:::


:::demo 简洁面板

设置 `type='simple'`可以显示简洁面板。

```html
<template>
    <cl-collapse v-model="openedSimple" type="simple">
        <cl-collapse-item c-key="1" name="我说不爱你，那是假话">
            I lied when I said I didn’t like you. I lied when I said I didn’t care. I lie every time I try to tell myself I will never fall for you.
        </cl-collapse-item>
        <cl-collapse-item c-key="2" name="喜欢一个人， 一定要让对方知道">
            If you love someone,you must let him know.Maybe you‘d get no answer,but at least you have tied and won‘t regret.
        </cl-collapse-item>
        <cl-collapse-item c-key="3" name="人生就是一场旅行">
            Life is a journey, not the destination, but the scenery along the should be and the mood at the view.
        </cl-collapse-item>
    </cl-collapse>
</template>
<script>
    export default {
      data(){
        return {
          openedSimple: '1',
        }
      }
    }
</script>

```

:::


:::demo 禁用

设置 `disabled`属性可以实现禁用。

```html
<template>
    <cl-collapse v-model="openedDisabled" type="simple">
        <cl-collapse-item c-key="1" name="我说不爱你，那是假话">
            I lied when I said I didn’t like you. I lied when I said I didn’t care. I lie every time I try to tell myself I will never fall for you.
        </cl-collapse-item>
        <cl-collapse-item disabled c-key="2"  name="喜欢一个人， 一定要让对方知道">
            If you love someone,you must let him know.Maybe you‘d get no answer,but at least you have tied and won‘t regret.
        </cl-collapse-item>
        <cl-collapse-item c-key="3" name="人生就是一场旅行">
            Life is a journey, not the destination, but the scenery along the should be and the mood at the view.
        </cl-collapse-item>
    </cl-collapse>
</template>
<script>
    export default {
      data(){
        return {
          openedDisabled: '1',
        }
      }
    }
</script>

```

:::


:::demo 箭头位置和隐藏箭头

设置 `cl-collapse`组件的`iconPosition='right'`属性可以显示右侧箭头，默认为左侧箭头。
设置 `cl-collapse-item`组件的 `hide-arrow`属性可隐藏箭头。

```html
<template>
    <cl-row :gutter="10">
        <cl-col>
            <h4>箭头位置</h4>
            <cl-collapse v-model="openedIconPostion" iconPosition="right">
                <cl-collapse-item c-key="1" name="我说不爱你，那是假话">
                    I lied when I said I didn’t like you. I lied when I said I didn’t care. I lie every time I try to tell myself I will never fall for you.
                </cl-collapse-item>
                <cl-collapse-item c-key="2" name="喜欢一个人， 一定要让对方知道">
                    If you love someone,you must let him know.Maybe you‘d get no answer,but at least you have tied and won‘t regret.
                </cl-collapse-item>
                <cl-collapse-item c-key="3" name="人生就是一场旅行">
                    Life is a journey, not the destination, but the scenery along the should be and the mood at the view.
                </cl-collapse-item>
            </cl-collapse>
        </cl-col>
        <cl-col>
            <h4>隐藏箭头</h4>
            <cl-collapse v-model="openedIconHide">
                <cl-collapse-item c-key="1" name="我说不爱你，那是假话" hide-arrow>
                    I lied when I said I didn’t like you. I lied when I said I didn’t care. I lie every time I try to tell myself I will never fall for you.
                </cl-collapse-item>
                <cl-collapse-item c-key="2" name="喜欢一个人， 一定要让对方知道">
                    If you love someone,you must let him know.Maybe you‘d get no answer,but at least you have tied and won‘t regret.
                </cl-collapse-item>
                <cl-collapse-item c-key="3" name="人生就是一场旅行">
                    Life is a journey, not the destination, but the scenery along the should be and the mood at the view.
                </cl-collapse-item>
            </cl-collapse>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
      data(){
        return {
          openedIconPostion: '1',
          openedIconHide: '1',
        }
      }
    }
</script>

```

:::


:::demo 额外节点

设置 `cl-collapse-item`组件`name='extra'`的 `slot`自定义添加额外节点。

```html
<template>
    <cl-collapse v-model="openedExtra">
        <cl-collapse-item c-key="1" name="我说不爱你，那是假话">
            <cl-button type="text" icon="setting" slot="extra"></cl-button>
            I lied when I said I didn’t like you. I lied when I said I didn’t care. I lie every time I try to tell myself I will never fall for you.
        </cl-collapse-item>
        <cl-collapse-item c-key="2" name="喜欢一个人， 一定要让对方知道">
            <cl-button type="text" icon="setting" slot="extra"></cl-button>
            If you love someone,you must let him know.Maybe you‘d get no answer,but at least you have tied and won‘t regret.
        </cl-collapse-item>
        <cl-collapse-item c-key="3" name="人生就是一场旅行">
            <cl-button type="text" icon="setting" slot="extra"></cl-button>
            Life is a journey, not the destination, but the scenery along the should be and the mood at the view.
        </cl-collapse-item>
    </cl-collapse>
</template>
<script>
    export default {
      data(){
        return {
          openedExtra: '1'
        }
      }
    }
</script>

```

:::


## API

### Collapse props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | String, Array | 当前打开面板的 `c-key`数组集合，accordion手风琴模式时值为String类型，否则值为Array类型，可以v-model双向绑定 | - |
| accordion | Boolean | 开启手风琴模式 | - |
| type | String | 值为`simple`时为极简模式，默认`default` | default |
| icon-position | String | 设置下拉icon图标显示的位置，可选值`left` `right`或者不设置 | left |


### Collapse event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| change | 当前打开项变化时触发，第一个返回值为当前变化项的 `c-key`，第二个返回值为当前所有打开项的数组 |  key, openedKeys |


### CollapseItem props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| c-key | String | 必填，当前面板的唯一标识 | - |
| name | String | 面板的标题 | - |
| disabled | Boolean | 禁用 | - |
| hide-arrow | Boolean | 隐藏下拉icon图标 | - |
