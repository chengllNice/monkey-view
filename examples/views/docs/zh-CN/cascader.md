# Cascader 级联选择

表单组件。适用于多层级数据的选择。

## 代码示例


:::demo 基础用法

可以使用v-model实现双向数据绑定。`value`数据类型为数组,为选中值的value路径的数组。

```html
<template>
    <Row :gutter="10">
        <Col>
            <Cascader v-model="valueBase" :data="data"></Cascader>
        </Col>
        <Col>
            <Cascader v-model="valueBase"></Cascader>
        </Col>
    </Row>
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
    <Row :gutter="10">
        <Col>
            <Cascader v-model="valueSizeMini" :data="data" size="mini"></Cascader>
        </Col>
        <Col>
            <Cascader v-model="valueSizeSmall" :data="data" size="small"></Cascader>
        </Col>
        <Col>
            <Cascader v-model="valueSizeDefault" :data="data"></Cascader>
        </Col>
        <Col>
            <Cascader v-model="valueSizeLarge" :data="data" size="large"></Cascader>
        </Col>
    </Row>
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
    <Row :gutter="10">
        <Col>
            value: {{valueDisabled}}
            <Cascader v-model="valueDisabled" :data="data" disabled></Cascader>
        </Col>
        <Col>
            value: {{valueDisabled1}}
            <Cascader v-model="valueDisabled1" :data="data"></Cascader>
        </Col>
    </Row>
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

设置 `clearable`属性可以实现选中值之后点击清空按钮清空选中项。

```html
<template>
    value: {{value}}
    <Cascader v-model="value" :data="data" clearable></Cascader>
</template>
<script>
    export default {
        data(){
            return {
                value: [],
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


:::demo 设置初始值

设置初始值，默认选择对应的节点。

```html
<template>
    value: {{value}}
    <Cascader v-model="value" :data="data"></Cascader>
</template>
<script>
    export default {
        data(){
            return {
                value: ['beijing', 'haidian'],
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


:::demo 不同的触发方式

设置 `trigger`属性控制子节点的展示方式。可选值 `click` `hover`,默认为`click`。

```html
<template>
    value: {{value}}
    <Cascader v-model="value" :data="data" trigger="hover"></Cascader>
</template>
<script>
    export default {
        data(){
            return {
                value: [],
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


:::demo 选择即改变

设置 `change-on-select`属性可以实现不必须选择叶子节点，所有节点都可选择。

```html
<template>
    value: {{value}}
    <Cascader v-model="value" :data="data" change-on-select></Cascader>
</template>
<script>
    export default {
        data(){
            return {
                value: [],
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


:::demo 动态数据加载

设置 `load-data`属性实现动态的数据加载。返回Promise，值为该项的children数组。

```html
<template>
    <Cascader v-model="valueSearch" :data="data" :load-data="handleLoadData"></Cascader>
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
                      },
                      {
                          value: 'henan',
                          label: '河南',
                      },
                ]
            }
        },
        methods: {
            handleLoadData(item){
                let result = [];
                if(item.value === 'beijing'){
                    result = [
                        {
                            value: 'haidian',
                            label: '海淀区',
                            last: true,
                        },
                        {
                            value: 'chaoyang',
                            label: '朝阳区',
                            last: true,
                        },
                        {
                            value: 'changping',
                            label: '昌平区',
                            last: true,
                        }
                    ]
                }else if(item.value === 'henan'){
                    result = [
                        {
                            value: 'xuchang',
                            label: '许昌市',
                            children: [
                                {
                                    value: 'xiangchengxian',
                                    label: '襄城县',
                                    last: true,
                                },
                                {
                                    value: 'xuchangxian',
                                    label: '许昌县',
                                    last: true,
                                },
                                {
                                    value: 'linyingxian',
                                    label: '临颍县',
                                    last: true,
                                }
                            ]
                        },
                        {
                            value: 'pingdingshan',
                            label: '平顶山市',
                            last: true,
                        },                    
                    ]               
                }
                return new Promise((resolve, reject) => {
                    setTimeout(()=>{
                        resolve(result)
                    }, 3000)
                });
            }
        }
    }
</script>
```
:::



:::demo 格式化数据项的展示

设置 `format-label`属性可自定义数据项的展示内容，类型`Function`, 返回值为字符串。

```html
<template>
    <Cascader v-model="value" :data="data" :format-label="handleFormatLabel"></Cascader>
</template>
<script>
    export default {
        data(){
            return {
                value: [],
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
        },
        methods: {
            handleFormatLabel(item){
                let count = 0;
                if(item.children && item.children.length){
                    count = item.children.length;
                }
                return `${item.label} (${count})`;
            },
        }
    }
</script>
```
:::



:::demo 自定义展示

设置 `format`属性可自定义展示内容，类型`Function`, 返回值为字符串。

```html
<template>
    <Cascader v-model="valueSearch" :data="data" :format="handleFormat"></Cascader>
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
        },
        methods: {
            handleFormat(labels, selectedData){
                return labels.join('-');
            },
        }
    }
</script>
```
:::



:::demo 数据加载中

设置 `loading`属性实现数据加载中的显示，子项的数据加载请使用`load-data`实现。

```html
<template>
    <Button @click="handleLoading" type="primary">开启数据加载</Button>
    <div style="height: 10px;"></div>
    <Cascader v-model="value" :data="data" :loading="loading"></Cascader>
</template>
<script>
    export default {
        data(){
            return {
                loading: false,
                value: [],
                data:  []
            }
        },
        mounted(){
            this.handleLoading();
        },
        methods: {
            handleLoading(){
                this.loading = true;
                this.data = [];
                setTimeout(()=>{
                    this.data = [
                        {
                            value: 'beijing',
                            label: '北京',
                        },
                        {
                            value: 'henan',
                            label: '河南',
                        },
                    ];
                    this.loading = false;
                }, 3000)  
            }
        }
    }
</script>
```
:::


:::demo 可搜索

设置 `filterable`属性实现可搜索模式。

```html
<template>
    value: {{value}}
    <Cascader v-model="value" filterable :data="data"></Cascader>
</template>
<script>
    export default {
        data(){
            return {
                value: [],
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


:::demo 单独使用Panel面板

`panel`面板可以自己单独使用。

```html
<template>
    value: {{value}}
    <br>
    <CascaderPanel v-model="value" :data="data"></CascaderPanel>
</template>
<script>
    export default {
        data(){
            return {
                value: [],
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


:::demo 自定义触发元素

通过`slot`可以自定义触发元素。

```html
<template>
    <p>value: {{value}}</p>
    <p>label: {{label}}</p>
    <Cascader v-model="value" :data="data" @change="handleChange">
        <Button type="text">选择</Button>
    </Cascader>
</template>
<script>
    export default {
        data(){
            return {
                value: [],
                label: '未选择',
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
        },
        methods: {
            handleChange(value, selectedData){
                this.label = selectedData.map( i => i.label ).join(' / ');
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
| loading | Boolean | 动态加载数据时只适用于第一层数据加载，动态加载子项数据请使用`loadData` | - |
| loadingText | String | 数据加载中的显示文本 | 加载中 |
| emptyText | String | 数据为空时的显示文本 | 暂无数据 |
| filterable | Boolean | 开始搜索 | - |
| format | Function | 定义如何显示选中的值，参数为labels(选中项的label数组),selectedData(选中项的data数组),返回值为String类型 | - |
| format-label | Function | 定义如何显示label,参数为当前项数据,返回类型为字符串 | - |
| trigger | String | 定义如何触发子项的展开，可选值 `click` `hover` | click |
| changeOnSelect | Boolean | 定义改变即选择，可以选择任意节点的数据，不必须是叶子节点的数据 | - |
| loadData | Function | 动态加载数据，参数为当前选择项，返回当前选择项的子项数组，以Promise的形式返回，如果某一项是最后的叶子节点，需要指定`last`属性为`true` | - |
| renderHtml | HTMLElement, Boolean | 指定下拉框所在的元素, true时添加到body中 | false |


### Cascader event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| change | 选择改变后触发，返回当前选中项的value数组、当前选中项的data数组 | values，selectedData |
| clear | 点击清空按钮时触发 | - |


### CascaderPanel props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | Array | 绑定的值，可以使用v-model进行双向绑定。数组类型。值的顺序为父级-子级的关系。 | - |
| data | Array| 数据，属性`value` `label` `disabled` `last`(当前是否为叶子节点，在动态加载数据时判断是否可加载子项) | - |
| format-label | Function | 定义如何显示label,参数为当前项数据,返回类型为字符串 | - |
| trigger | String | 定义如何触发子项的展开，可选值 `click` `hover` | click |
| changeOnSelect | Boolean | 定义改变即选择，可以选择任意节点的数据，不必须是叶子节点的数据 | - |
| loadData | Function | 动态加载数据，参数为当前选择项，返回当前选择项的子项数组，以Promise的形式返回，如果某一项是最后的叶子节点，需要指定`last`属性为`true` | - |


### CascaderPanel event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| change | 选择改变后触发，返回当前选中项的value数组、当前选中项的data数组 | values，selectedData |


### Data props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | String, Number | 选项值 | - |
| label | String, Number | 选项显示的内容。默认在无slot内容时显示此项的内容。在通过slot自定义option显示内容时，此项为必填项。默认根据此项进行搜索 | - |
| disabled | Boolean | 禁用 | - |
| last | Boolean | 是否是叶子节点 | - |

