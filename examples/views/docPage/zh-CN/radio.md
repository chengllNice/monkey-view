# Radio 单选框

单选框。主要用于一组可选项的单项选择。

## 代码示例


:::demo 单独使用

可以使用v-model实现双向数据绑定。

```html
<template>
    <cl-radio v-model="single">Radio</cl-radio>
    <p>{{single}}</p>
</template>
<script>
    export default {
      data(){
        return {
          single: false
        }
      }
    }
</script>

```

:::


:::demo 组合使用

使用 `radioGroup`组件把多个 `radio`组件组合起来使用，只需要在 Group 组件上绑定 `v-model`即可，此时需要绑定 `Array`类型的 `v-model`。此时`radio`的 `label`属性是该项的对应的值，若此标签中没有内容，该 `label`属性的值即作为内容。如果 Group的 `v-model`有对应 `radio`的 `label`的值，表明为选中状态，否则不选中。`radioGroup`组件可以使用 `options`属性绑定数据实现单选框组合，值类型如：`[{label: '', value: '', disabled: true}]`的形式，label为展示内容，value为选中时的值，disabled可选，禁用控制。

```html
<template>
    <cl-row>
        <cl-col>
            <cl-radio-group v-model="group">
                <cl-radio label="apple">Apple</cl-radio>
                <cl-radio label="orange">Orange</cl-radio>
                <cl-radio label="banana">Banana</cl-radio>
                <cl-radio label="melon">Melon</cl-radio>
            </cl-radio-group>
            <p>{{group}}</p>
        </cl-col>
        <cl-col>
            <cl-radio-group v-model="group1" :options="groupOptions"></cl-radio-group>
            <p>{{group1}}</p>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
      data(){
        return {
          group: 'apple',
          group1: 'apple',
          groupOptions: [
            {
              label: '苹果',
              value: 'apple'
            },
            {
              label: '橘子',
              value: 'orange'
            },
            {
              label: '香蕉',
              value: 'banana'
            },
            {
              label: '西瓜',
              value: 'melon'
            }
          ],
        }
      }
    }
</script>

```

:::


:::demo disable状态

设置 `disbaled`属性可以实现禁用。可以给 `radio`组件添加 `disabled`属性实现禁用。组合使用时可以给 Group 组件添加 `disabled`属性实现该组合下的所有子项禁用；也可以单独给某个子项设置 `disabled`属性实现某一项的禁用。

```html
<template>
    <h4>单独使用禁用</h4>
    <cl-radio disabled  v-model="disabledSingle">DisabledRadio</cl-radio>
    <p>{{disabledSingle}}</p>

    <h4>组合使用禁用</h4>
    <cl-radio-group disabled v-model="disabledGroup" :options="disabledGroupOptions"></cl-radio-group>
    <p>{{disabledGroup}}</p>

    <h4>组合使用禁用指定项</h4>
    <cl-radio-group v-model="disabledGroup1" :options="disabledGroupOptions"></cl-radio-group>
    <p>{{disabledGroup1}}</p>

    <h4>组合使用禁用指定项</h4>
    <cl-radio-group v-model="disabledGroup2">
        <cl-radio label="apple">Apple</cl-radio>
        <cl-radio label="orange">Orange</cl-radio>
        <cl-radio label="banana" disabled>Banana</cl-radio>
        <cl-radio label="melon">Melon</cl-radio>
    </cl-radio-group>
    <p>{{disabledGroup2}}</p>
</template>
<script>
    export default {
      data(){
        return {
            disabledSingle: true,
            disabledGroup: 'banana',
            disabledGroup1: 'apple',
            disabledGroupOptions: [
              {
                label: '苹果',
                value: 'apple'
              },
              {
                label: '橘子',
                value: 'orange',
                disabled: true,
              },
              {
                label: '香蕉',
                value: 'banana'
              },
              {
                label: '西瓜',
                value: 'melon'
              }
            ],
            disabledGroup2: 'apple',  
        }
      }
    }
</script>

```

:::


:::demo 尺寸

可以通过设置 `size`属性控制尺寸大小，可选值有 `small` `large` 或者不设置。

```html
<template>
    <cl-radio v-model="singleMini" size="mini">Mini</cl-radio>
    <cl-radio v-model="singleSmall" size="small">Small</cl-radio>
    <cl-radio v-model="singleDefault">Default</cl-radio>
    <cl-radio v-model="singleLarge" size="large">Large</cl-radio>
</template>
<script>
    export default {
      data(){
        return {
          singleMini: false,
          singleSmall: false,
          singleDefault: false,
          singleLarge: false,
        }
      }
    }
</script>

```

:::



## API

### Radio props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | Number, String, Boolean | 只有单独使用是可以使用v-model绑定值。单独使用时没有设置label，选中时返回true；单独使用设置label时，选中返回label指定的值。组合使用时不支持设置该值 | false |
| label | Number, String, Boolean | 单独使用时选中时返回该值。组合使用时，如果使用组合的options属性，该项值为文字描述；使用slot时，选中时返回该值 | true |
| disabled | Boolean | 禁用 | - |
| name | String | 原生name属性 | - |
| size | String | 尺寸，可选值 `mini` `small` `large` | - |


### RadioGroup props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | String, Number, Boolean | 指定当前选中的radio，使用v-model双向绑定。使用 `options` 属性时选中的是选项`value`的值。使用`slot`的`radio`时选中的是指定`label`的值。 | - |
| disabled | Boolean | 组合中的所有`radio`全部禁用 | - |
| size | String | 组合中所有`radio`的尺寸 | - |
| options | Array | 类似`[{value: '0', label: 'radio', disabled: true}]`这样的数组，其中`value`指定当前项是否选中，`label`为当前项的文字描述，`disabled`可选，控制禁用状态 | - |


### RadioGroup event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| change | 绑定的值改变时触发，返回当前选中值 | - |


