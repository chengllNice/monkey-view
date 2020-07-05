# Tree 树形


## 代码示例


:::demo 基础用法

基础用法。

```html
<template>
    <cl-tree :data="data"></cl-tree>
</template>
<script>
    export default {
        data(){
            return {
                data: [
                    {
                        key: 'beijing',
                        label: '北京',
                        disabled: false,
                        disabledCheckbox: false,
                        children: [
                            {
                                key: 'haidian',
                                label: '海淀区',
                                disabled: false,
                                checked: false,
                                disabledCheckbox: false,
                                disabledExpand: false
                            },
                            {
                                key: 'chaoyang',
                                label: '朝阳区',
                                disabled: false,
                                disabledCheckbox: false,
                            }
                        ]
                    },
                    {
                        key: 'henan',
                        label: '河南省',
                        disabled: false,
                        disabledCheckbox: false,
                        children: [
                            {
                                key: 'zhengzhou',
                                label: '郑州市',
                                disabled: false,
                                disabledCheckbox: false,
                                children: [
                                    {
                                        key: 'erqi',
                                        label: '二七区',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    },
                                    {
                                        key: 'huiji',
                                        label: '惠济区',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    },
                                    {
                                        key: 'zhengdong',
                                        label: '郑东新区',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    }
                                ]
                            },
                            {
                                key: 'xuchang',
                                label: '许昌市',
                                disabled: false,
                                disabledCheckbox: false,
                                children: [
                                    {
                                        key: 'xiangchengxian',
                                        label: '襄城县',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    },
                                    {
                                        key: 'xuchangxian',
                                        label: '许昌县',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    }
                                ]
                            },
                            {
                                key: 'pingdingshan',
                                label: '平顶山市',
                                disabled: false,
                                disabledCheckbox: false,
                            },
                        ]
                    },
                    {
                        key: 'shanghai',
                        label: '上海市',
                        disabled: false,
                        disabledCheckbox: false,
                        children: []
                    }
                ]
            }
        }
    }
</script>
```
:::


:::demo 可选择

设置`show-checkbox`属性可以实现选择功能。

```html
<template>
    <cl-tree :data="data" show-checkbox></cl-tree>
</template>
<script>
    export default {
        data(){
            return {
                data: [
                    {
                        key: 'beijing',
                        label: '北京',
                        disabled: false,
                        disabledCheckbox: false,
                        children: [
                            {
                                key: 'haidian',
                                label: '海淀区',
                                disabled: false,
                                checked: false,
                                disabledCheckbox: false,
                                disabledExpand: false
                            },
                            {
                                key: 'chaoyang',
                                label: '朝阳区',
                                disabled: false,
                                disabledCheckbox: false,
                            }
                        ]
                    },
                    {
                        key: 'henan',
                        label: '河南省',
                        disabled: false,
                        disabledCheckbox: false,
                        children: [
                            {
                                key: 'zhengzhou',
                                label: '郑州市',
                                disabled: false,
                                disabledCheckbox: false,
                                children: [
                                    {
                                        key: 'erqi',
                                        label: '二七区',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    },
                                    {
                                        key: 'huiji',
                                        label: '惠济区',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    },
                                    {
                                        key: 'zhengdong',
                                        label: '郑东新区',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    }
                                ]
                            },
                            {
                                key: 'xuchang',
                                label: '许昌市',
                                disabled: false,
                                disabledCheckbox: false,
                                children: [
                                    {
                                        key: 'xiangchengxian',
                                        label: '襄城县',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    },
                                    {
                                        key: 'xuchangxian',
                                        label: '许昌县',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    }
                                ]
                            },
                            {
                                key: 'pingdingshan',
                                label: '平顶山市',
                                disabled: false,
                                disabledCheckbox: false,
                            },
                        ]
                    },
                    {
                        key: 'shanghai',
                        label: '上海市',
                        disabled: false,
                        disabledCheckbox: false,
                        children: []
                    }
                ]
            }
        }
    }
</script>
```
:::


:::demo 可控组件

节点的`checked` `expand`状态可以由两种方式进行控制。

第一种方式：

设置`expand-keys`属性可以控制展开项；设置`checked-keys`属性可以控制选择项，`checked-keys`必须配合`show-checkbox`才有效。

第二种方式：

设置`data`数据的`expand`属性可以控制展开项；设置`data`数据的`checked`属性可以控制选择项，`checked`必须配合`show-checkbox`才有效。


`expand-keys` 和 `expand` 设置任意节点的`key`值会默认展开该节点的父级节点。

`checked-keys` 和 `checked` 设置任意节点的`key`值会默认选中该节点的所有子级节点，父级节点会按照子级节点是否完全选中显示不同状态。

如果想`checked`状态不受父子节点关联，可以设置`check-strictly`属性。详细见API。

下面只展示第一种方式的设置。

```html
<template>
    <cl-tree :data="data" show-checkbox :expand-keys="expandKeys" :checked-keys="checkedKeys"></cl-tree>
</template>
<script>
    export default {
        data(){
            return {
                expandKeys: ['zhengzhou', 'beijing'],
                checkedKeys: ['beijing', 'zhengzhou'],
                data: [
                    {
                        key: 'beijing',
                        label: '北京',
                        disabled: false,
                        disabledCheckbox: false,
                        children: [
                            {
                                key: 'haidian',
                                label: '海淀区',
                                disabled: false,
                                checked: false,
                                disabledCheckbox: false,
                                disabledExpand: false
                            },
                            {
                                key: 'chaoyang',
                                label: '朝阳区',
                                disabled: false,
                                disabledCheckbox: false,
                            }
                        ]
                    },
                    {
                        key: 'henan',
                        label: '河南省',
                        disabled: false,
                        disabledCheckbox: false,
                        children: [
                            {
                                key: 'zhengzhou',
                                label: '郑州市',
                                disabled: false,
                                disabledCheckbox: false,
                                children: [
                                    {
                                        key: 'erqi',
                                        label: '二七区',
                                        disabled: true,
                                        disabledCheckbox: false,
                                    },
                                    {
                                        key: 'huiji',
                                        label: '惠济区',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    },
                                    {
                                        key: 'zhengdong',
                                        label: '郑东新区',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    }
                                ]
                            },
                            {
                                key: 'xuchang',
                                label: '许昌市',
                                disabled: true,
                                disabledCheckbox: false,
                                children: [
                                    {
                                        key: 'xiangchengxian',
                                        label: '襄城县',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    },
                                    {
                                        key: 'xuchangxian',
                                        label: '许昌县',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    }
                                ]
                            },
                            {
                                key: 'pingdingshan',
                                label: '平顶山市',
                                disabled: false,
                                disabledCheckbox: false,
                            },
                        ]
                    },
                    {
                        key: 'shanghai',
                        label: '上海市',
                        disabled: false,
                        disabledCheckbox: false,
                        children: []
                    }
                ]
            }
        }
    }
</script>
```
:::


:::demo 自定义节点内容

自定义节点的内容有两种方式。

第一种方式：

通过插槽实现。

第二种方式：

设置`render-content`属性实现，类型为`Function`，实现方式参考`render`函数。

`render`函数的第二个参数包含两项：
    node: Array类型，所有数据
    data: Object类型，当前数据

```html
<template>
    <cl-row>
        <cl-col>
            <h4>slot插槽方式</h4>
            <cl-tree :data="data">
                <div class="doc-tree-load-data" slot-scope="data">
                    <span>
                        <i class="cl-icon-file"></i>
                        {{data.data.label}}
                    </span>
                    <cl-button icon="cl-icon-plus" type="primary" size="mini"></cl-button>
                </div>
            </cl-tree>
        </cl-col>
        <cl-col>
            <h4>renderContent方式</h4>
            <cl-tree :data="data" :render-content="renderContent"></cl-tree>
        </cl-col>
    </cl-row>
    
</template>
<script>
    export default {
        data(){
            return {
                data: [
                    {
                        key: 'beijing',
                        label: '北京',
                        disabled: false,
                        disabledCheckbox: false,
                        children: [
                            {
                                key: 'haidian',
                                label: '海淀区',
                                disabled: false,
                                checked: false,
                                disabledCheckbox: false,
                                disabledExpand: false
                            },
                            {
                                key: 'chaoyang',
                                label: '朝阳区',
                                disabled: false,
                                disabledCheckbox: false,
                            }
                        ]
                    },
                    {
                        key: 'henan',
                        label: '河南省',
                        disabled: false,
                        disabledCheckbox: false,
                        children: [
                            {
                                key: 'zhengzhou',
                                label: '郑州市',
                                disabled: false,
                                disabledCheckbox: false,
                                children: [
                                    {
                                        key: 'erqi',
                                        label: '二七区',
                                        disabled: true,
                                        disabledCheckbox: false,
                                    },
                                    {
                                        key: 'huiji',
                                        label: '惠济区',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    },
                                    {
                                        key: 'zhengdong',
                                        label: '郑东新区',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    }
                                ]
                            },
                            {
                                key: 'xuchang',
                                label: '许昌市',
                                disabled: true,
                                disabledCheckbox: false,
                                children: [
                                    {
                                        key: 'xiangchengxian',
                                        label: '襄城县',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    },
                                    {
                                        key: 'xuchangxian',
                                        label: '许昌县',
                                        disabled: false,
                                        disabledCheckbox: false,
                                    }
                                ]
                            },
                            {
                                key: 'pingdingshan',
                                label: '平顶山市',
                                disabled: false,
                                disabledCheckbox: false,
                            },
                        ]
                    },
                    {
                        key: 'shanghai',
                        label: '上海市',
                        disabled: false,
                        disabledCheckbox: false,
                        children: []
                    }
                ]
            }
        },
        methods: {
            renderContent(h, {node, data}){
                return h('div', {
                            attrs: {
                                class: 'doc-tree-load-data'
                            }
                        },
                        [
                            h('span', [
                                h('i', {
                                    attrs: {
                                        class: 'cl-icon-file'
                                    }
                                }),
                                h('span', data.label),
                            ]),
                            h('ClButton', {
                                props: {
                                    type: 'primary',
                                    icon: 'cl-icon-plus',
                                    size: 'mini',
                                },
                            })
                        ])
            }
        }
    }
</script>
```
:::



:::demo 异步加载

设置`load-data`属性可以实现数据的异步加载，参数为当前项的`data`数据，返回Promise对象。

```html
<template>
    <cl-tree :data="data" :load-data="loadData"></cl-tree>
</template>
<script>
    export default {
        data(){
            return {
                data: [
                    {
                        key: 'beijing',
                        label: '北京',
                        disabled: false,
                        disabledCheckbox: false,
                    },
                    {
                        key: 'henan',
                        label: '河南省',
                        disabled: false,
                        disabledCheckbox: false,
                    },
                ]
            }
        },
        methods: {
            loadData(item){
                let result = [];
                if(item.key === 'beijing'){
                    result = [
                        {
                            key: 'haidian',
                            label: '海淀区',
                            disabled: false,
                            checked: false,
                            disabledCheckbox: false,
                            disabledExpand: false,
                            last: true,
                        },
                        {
                            key: 'chaoyang',
                            label: '朝阳区',
                            disabled: false,
                            disabledCheckbox: false,
                            last: true,
                        }
                    ]
                }else if(item.key === 'henan'){
                    result = [
                        {
                            key: 'zhengzhou',
                            label: '郑州市',
                            disabled: false,
                            disabledCheckbox: false,
                            last: true,
                        },
                        {
                            key: 'xuchang',
                            label: '许昌市',
                            disabled: false,
                            disabledCheckbox: false,
                            last: true,
                        }
                    ]
                }
                return new Promise((resolve, reject) => {
                    setTimeout(()=>{
                        resolve(result)
                    }, 3000)
                })
            }
        }
    }
</script>
```
:::




## API

### Tree props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| data | Array | 数据，内部树形见 | - |

