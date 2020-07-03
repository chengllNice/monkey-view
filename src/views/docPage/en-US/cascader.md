# Cascader 级联选择

表单组件。适用于多层级数据的选择。

## 代码示例


:::demo 基础用法

可以使用v-model实现双向数据绑定。`value`数据类型为数组,为选中值的value路径的数组。

```html
<template>
    <cl-row :gutter="10">
        <cl-col>
            <cl-cascader v-model="valueBase" :data="data"></cl-cascader>
        </cl-col>
        <cl-col>
            <cl-cascader v-model="valueBase"></cl-cascader>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
      data(){
        return {
          valueBase: [],
          valueBase1: [],
          data:  [
            {
                value: 'beijing',
                label: '北京',
                children: [
                   {
                       value: 'haidian',
                       label: '海淀区',
                   },
                   {
                       value: 'chaoyang',
                       label: '朝阳区',
                   },
                   {
                       value: 'changping',
                       label: '昌平区',
                   }
                ]
            },
            {
                value: 'henan',
                label: '河南',
                children: [
                    {
                       value: 'xuchang',
                       label: '许昌市',
                       children: [
                           {
                               value: 'xiangchengxian',
                               label: '襄城县',
                           },
                           {
                               value: 'xuchangxian',
                               label: '许昌县',
                           },
                           {
                               value: 'linyingxian',
                               label: '临颍县',
                           }
                       ]
                    },
                   {
                       value: 'pingdingshan',
                       label: '平顶山市',
                   },
                ]
            },
          ]
        }
      }
    }
</script>
```
:::


:::demo 尺寸

设置 `size`属性可以控制尺寸大小，可选值 `mini` `small` `large`或者不设置。

```html
<template>
    <cl-row :gutter="10">
        <cl-col>
            <cl-cascader v-model="valueSizeMini" :data="data" size="mini"></cl-cascader>
        </cl-col>
        <cl-col>
            <cl-cascader v-model="valueSizeSmall" :data="data" size="small"></cl-cascader>
        </cl-col>
        <cl-col>
            <cl-cascader v-model="valueSizeDefault" :data="data"></cl-cascader>
        </cl-col>
        <cl-col>
            <cl-cascader v-model="valueSizeLarge" :data="data" size="large"></cl-cascader>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
      data(){
        return {
          valueSizeMini: [],
          valueSizeSmall: [],
          valueSizeDefault: [],
          valueSizeLarge: [],
          data:  [
              {
                  value: 'beijing',
                  label: '北京',
                  children: [
                     {
                         value: 'haidian',
                         label: '海淀区',
                     },
                     {
                         value: 'chaoyang',
                         label: '朝阳区',
                     },
                     {
                         value: 'changping',
                         label: '昌平区',
                     }
                  ]
              },
              {
                  value: 'henan',
                  label: '河南',
                  children: [
                      {
                         value: 'xuchang',
                         label: '许昌市',
                         children: [
                             {
                                 value: 'xiangchengxian',
                                 label: '襄城县',
                             },
                             {
                                 value: 'xuchangxian',
                                 label: '许昌县',
                             },
                             {
                                 value: 'linyingxian',
                                 label: '临颍县',
                             }
                         ]
                      },
                     {
                         value: 'pingdingshan',
                         label: '平顶山市',
                     },
                  ]
              },
            ]
        }
      }
    }
</script>
```

:::


:::demo 禁用

设置 `disabled`属性可以实现禁用。单独给 `data`设置 `disabled`可以实现某项的禁用。

```html
<template>
    <cl-row :gutter="10">
        <cl-col>
            <cl-cascader v-model="valueDisabled" :data="data" disabled></cl-cascader>
        </cl-col>
        <cl-col>
            <cl-cascader v-model="valueDisabled1" :data="data"></cl-cascader>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
      data(){
        return {
          valueDisabled: [],
          valueDisabled1: [],
          data:  [
            {
                value: 'beijing',
                label: '北京',
                disabled: true,
                children: [
                   {
                       value: 'haidian',
                       label: '海淀区',
                   },
                   {
                       value: 'chaoyang',
                       label: '朝阳区',
                   },
                   {
                       value: 'changping',
                       label: '昌平区',
                   }
                ]
            },
            {
                value: 'henan',
                label: '河南',
                children: [
                    {
                       value: 'xuchang',
                       label: '许昌市',
                       children: [
                           {
                               value: 'xiangchengxian',
                               label: '襄城县',
                           },
                           {
                               value: 'xuchangxian',
                               label: '许昌县',
                           },
                           {
                               value: 'linyingxian',
                               label: '临颍县',
                                disabled: true,
                           }
                       ]
                    },
                   {
                       value: 'pingdingshan',
                       label: '平顶山市',
                   },
                ]
            },
          ]
        }
      }
    }
</script>
```
:::


:::demo 可清空

设置 `clearable`属性可以实现选中值之后点击清空按钮清空选中项。仅用于单选模式。

```html
<template>
    <cl-cascader v-model="valueClearable" :data="data" clearable></cl-cascader>
</template>
<script>
    export default {
      data(){
        return {
          valueClearable: [],
          data:  [
            {
                value: 'beijing',
                label: '北京',
                children: [
                   {
                       value: 'haidian',
                       label: '海淀区',
                   },
                   {
                       value: 'chaoyang',
                       label: '朝阳区',
                   },
                   {
                       value: 'changping',
                       label: '昌平区',
                   }
                ]
            },
            {
                value: 'henan',
                label: '河南',
                children: [
                    {
                       value: 'xuchang',
                       label: '许昌市',
                       children: [
                           {
                               value: 'xiangchengxian',
                               label: '襄城县',
                           },
                           {
                               value: 'xuchangxian',
                               label: '许昌县',
                           },
                           {
                               value: 'linyingxian',
                               label: '临颍县',
                           }
                       ]
                    },
                   {
                       value: 'pingdingshan',
                       label: '平顶山市',
                   },
                ]
            },
          ]
        }
      }
    }
</script>
```

:::



:::demo 可搜索

设置 `filterable`属性实现可搜索模式，在option数据中搜索。单选多选都支持搜索模式。

```html
<template>
    <cl-cascader v-model="valueSearch" filterable :data="data"></cl-cascader>
</template>
<script>
    export default {
      data(){
        return {
          valueSearch: [],
          data:  [
              {
                  value: 'beijing',
                  label: '北京',
                  children: [
                     {
                         value: 'haidian',
                         label: '海淀区',
                     },
                     {
                         value: 'chaoyang',
                         label: '朝阳区',
                     },
                     {
                         value: 'changping',
                         label: '昌平区',
                     }
                  ]
              },
              {
                  value: 'henan',
                  label: '河南',
                  children: [
                      {
                         value: 'xuchang',
                         label: '许昌市',
                         children: [
                             {
                                 value: 'xiangchengxian',
                                 label: '襄城县',
                             },
                             {
                                 value: 'xuchangxian',
                                 label: '许昌县',
                             },
                             {
                                 value: 'linyingxian',
                                 label: '临颍县',
                             }
                         ]
                      },
                     {
                         value: 'pingdingshan',
                         label: '平顶山市',
                     },
                  ]
              },
            ]
        }
      }
    }
</script>
```
:::




## API

### Cascader props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | Array | 绑定的值，可以使用v-model进行双向绑定。数组类型。值的顺序为父级-子级的关系。 | - |
| data | Array| 数据。属性`value` `label` `disabled` `last`(当前是否为叶子节点，在动态加载数据时判断是否可加载子项) | - |
| disabled | Boolean | 禁用 | - |
| placeholder | String | 占位文本 | - |
| size | String | 尺寸，可选值 `mini` `small` `large`或者不设置 | - |
| transition | String | 可自定义下拉框的动画效果 | slideUp |
| clearable | Boolean | 开启清除 | - |
| emptyText | String | 数据为空时的显示文本 | 暂无数据 |
| filterable | Boolean | 开始搜索 | - |
| format | Function | 定义如何显示选中的值，参数为labels(选中项的label数组),selectedData(选中项的data数组),返回值为String类型 | - |
| trigger | String | 定义如何触发子项的展开，可选值 `click` `hover` | click |
| changeOnSelect | Boolean | 定义改变即选择，可以选择任意节点的数据，不必须是叶子节点的数据 | - |
| loadData | Function | 动态加载数据，参数为当前选择项，返回当前选择项的子项数组，以Promise的形式返回，如果某一项是最后的叶子节点，需要指定`last`属性为`true` | - |
| renderHtml | HTMLElement, Boolean | 指定下拉框所在的元素, true时添加到body中 | false |


### Cascader event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| change | 选中option变化时触发，默认返回value，如需返回label，详见属性valueLabel | 选中项value值 |
| remote-change | 远程搜索搜索词变化时触发 | 搜索词 |
| clear | 点击清空按钮时触发 | - |


### Data props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | String, Number | 选项值 | - |
| label | String, Number | 选项显示的内容。默认在无slot内容时显示此项的内容。在通过slot自定义option显示内容时，此项为必填项。默认根据此项进行搜索 | - |
| disabled | Boolean | 禁用 | - |
| last | Boolean | 是否是叶子节点 | - |

