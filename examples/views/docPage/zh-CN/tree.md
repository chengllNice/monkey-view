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
                        children: [
                            {
                                key: 'haidian',
                                label: '海淀区',
                            },
                            {
                                key: 'chaoyang',
                                label: '朝阳区',
                            }
                        ]
                    },
                    {
                        key: 'henan',
                        label: '河南省',
                        children: [
                            {
                                key: 'zhengzhou',
                                label: '郑州市',
                                children: [
                                    {
                                        key: 'erqi',
                                        label: '二七区',
                                    },
                                    {
                                        key: 'huiji',
                                        label: '惠济区',
                                    },
                                    {
                                        key: 'zhengdong',
                                        label: '郑东新区',
                                    }
                                ]
                            },
                            {
                                key: 'xuchang',
                                label: '许昌市',
                                children: [
                                    {
                                        key: 'xiangchengxian',
                                        label: '襄城县',
                                    },
                                    {
                                        key: 'xuchangxian',
                                        label: '许昌县',
                                    }
                                ]
                            },
                            {
                                key: 'pingdingshan',
                                label: '平顶山市',
                            },
                        ]
                    },
                    {
                        key: 'shanghai',
                        label: '上海市',
                    }
                ]
            }
        }
    }
</script>
```
:::


:::demo 手风琴模式

设置`accordion`属性开启手风琴模式，最多只有一个最外层的节点会展开。

```html
<template>
    <cl-tree :data="data" accordion></cl-tree>
</template>
<script>
    export default {
        data(){
            return {
                data: [
                    {
                        key: 'beijing',
                        label: '北京',
                        children: [
                            {
                                key: 'haidian',
                                label: '海淀区',
                            },
                            {
                                key: 'chaoyang',
                                label: '朝阳区',
                            }
                        ]
                    },
                    {
                        key: 'henan',
                        label: '河南省',
                        children: [
                            {
                                key: 'zhengzhou',
                                label: '郑州市',
                                children: [
                                    {
                                        key: 'erqi',
                                        label: '二七区',
                                    },
                                    {
                                        key: 'huiji',
                                        label: '惠济区',
                                    },
                                    {
                                        key: 'zhengdong',
                                        label: '郑东新区',
                                    }
                                ]
                            },
                            {
                                key: 'xuchang',
                                label: '许昌市',
                                children: [
                                    {
                                        key: 'xiangchengxian',
                                        label: '襄城县',
                                    },
                                    {
                                        key: 'xuchangxian',
                                        label: '许昌县',
                                    }
                                ]
                            },
                            {
                                key: 'pingdingshan',
                                label: '平顶山市',
                            },
                        ]
                    },
                    {
                        key: 'shanghai',
                        label: '上海市',
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
                        children: [
                            {
                                key: 'haidian',
                                label: '海淀区',
                            },
                            {
                                key: 'chaoyang',
                                label: '朝阳区',
                            }
                        ]
                    },
                    {
                        key: 'henan',
                        label: '河南省',
                        children: [
                            {
                                key: 'zhengzhou',
                                label: '郑州市',
                                children: [
                                    {
                                        key: 'erqi',
                                        label: '二七区',
                                    },
                                    {
                                        key: 'huiji',
                                        label: '惠济区',
                                    },
                                    {
                                        key: 'zhengdong',
                                        label: '郑东新区',
                                    }
                                ]
                            },
                            {
                                key: 'xuchang',
                                label: '许昌市',
                                children: [
                                    {
                                        key: 'xiangchengxian',
                                        label: '襄城县',
                                    },
                                    {
                                        key: 'xuchangxian',
                                        label: '许昌县',
                                    }
                                ]
                            },
                            {
                                key: 'pingdingshan',
                                label: '平顶山市',
                            },
                        ]
                    },
                    {
                        key: 'shanghai',
                        label: '上海市',
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

设置`data`数据的`expand`属性可以控制当前项是否展开；设置`data`数据的`checked`属性可以控制当前项是否被选择，`checked`必须配合`show-checkbox`才有效。


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


:::demo 可搜索

调用`tree`组件的`filterNodes`方法可实现节点搜索。

```html
<template>
    <cl-input v-model="searchValue" placeholder="请输入搜索关键词" type="search" @search="handleSearch"></cl-input>
    <cl-tree :data="data" ref="tree"></cl-tree>
</template>
<script>
    export default {
        data(){
            return {
                searchValue: '',
                data: [
                    {
                        key: 'beijing',
                        label: '北京',
                        children: [
                            {
                                key: 'haidian',
                                label: '海淀区',
                            },
                            {
                                key: 'chaoyang',
                                label: '朝阳区',
                            }
                        ]
                    },
                    {
                        key: 'henan',
                        label: '河南省',
                        children: [
                            {
                                key: 'zhengzhou',
                                label: '郑州市',
                                children: [
                                    {
                                        key: 'erqi',
                                        label: '二七区',
                                    },
                                    {
                                        key: 'huiji',
                                        label: '惠济区',
                                    },
                                    {
                                        key: 'zhengdong',
                                        label: '郑东新区',
                                    }
                                ]
                            },
                            {
                                key: 'xuchang',
                                label: '许昌市',
                                children: [
                                    {
                                        key: 'xiangchengxian',
                                        label: '襄城县',
                                    },
                                    {
                                        key: 'xuchangxian',
                                        label: '许昌县',
                                    }
                                ]
                            },
                            {
                                key: 'pingdingshan',
                                label: '平顶山市',
                            },
                        ]
                    },
                    {
                        key: 'shanghai',
                        label: '上海市',
                    }
                ]
            }
        },
        methods: {
            handleSearch(value){
                this.$refs.tree.filterNodes(value);
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

作用域插槽的数据：
    root: Array类型，所有数据
    data: Object类型，当前数据

第二种方式：

设置`render-content`属性实现，类型为`Function`，实现方式参考`render`函数。

`render`函数的第二个参数包含两项：
    root: Array类型，所有数据
    data: Object类型，当前数据

```html
<template>
    <cl-row>
        <cl-col>
            <h4>slot插槽方式</h4>
            <cl-tree :data="data" :expand-click-on-node="false">
                <div class="doc-tree-load-data" slot-scope="data">
                    <span>
                        <Icon type="file"></Icon>
                        {{data.data.label}}
                    </span>
                    <cl-button-group>
                        <cl-button icon="plus" type="primary" size="mini" @click="handleAdd(data)"></cl-button>
                        <cl-button icon="minus" size="mini" @click="handleRemove(data)"></cl-button>
                    </cl-button-group>
                </div>
            </cl-tree>
        </cl-col>
        <cl-col>
            <h4>renderContent方式</h4>
            <cl-tree :data="data" :expand-click-on-node="false" :render-content="renderContent"></cl-tree>
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
                        children: [
                            {
                                key: 'haidian',
                                label: '海淀区',
                            },
                            {
                                key: 'chaoyang',
                                label: '朝阳区',
                            }
                        ]
                    },
                    {
                        key: 'henan',
                        label: '河南省',
                        children: [
                            {
                                key: 'zhengzhou',
                                label: '郑州市',
                                children: [
                                    {
                                        key: 'erqi',
                                        label: '二七区',
                                    },
                                    {
                                        key: 'huiji',
                                        label: '惠济区',
                                    },
                                    {
                                        key: 'zhengdong',
                                        label: '郑东新区',
                                    }
                                ]
                            },
                            {
                                key: 'xuchang',
                                label: '许昌市',
                                children: [
                                    {
                                        key: 'xiangchengxian',
                                        label: '襄城县',
                                    },
                                    {
                                        key: 'xuchangxian',
                                        label: '许昌县',
                                    }
                                ]
                            },
                            {
                                key: 'pingdingshan',
                                label: '平顶山市',
                            },
                        ]
                    },
                    {
                        key: 'shanghai',
                        label: '上海市',
                    }
                ]
            }
        },
        methods: {
            renderContent(h, {root, data}){
                let vue = this;
                return h('div', {
                            attrs: {
                                class: 'doc-tree-load-data'
                            }
                        },
                        [
                            h('span', [
                                h('i', {
                                    attrs: {
                                        class: 'file'
                                    }
                                }),
                                h('span', data.label),
                            ]),
                            h('ClButtonGroup', [
                                h('ClButton', {
                                    props: {
                                        type: 'primary',
                                        icon: 'plus',
                                        size: 'mini',
                                    },
                                    on: {
                                        click: () => {
                                            vue.handleAdd({root, data})
                                        }
                                    }
                                }),
                                h('ClButton', {
                                    props: {
                                        icon: 'minus',
                                        size: 'mini',
                                    },
                                    on: {
                                        click: () => {
                                            vue.handleRemove({root, data})
                                        }
                                    }
                                })
                            ])
                        ])
            },
            handleAdd({root, data}){
                let children = [
                    ...(data.children || []),
                    {
                        key: 'append-' + root.length,
                        label: 'append-' + root.length,
                    }
                ];
                this.$set(data, 'children', children);
            },
            handleRemove({root, data}){
                if(!data.parentKey) {
                    let index = root.findIndex(el => data.key === el.key);
                    root.splice(index, 1)
                }else{
                    let parentItem = root.find(el => data.parentKey === el.key);
                    let index = parentItem.childrenKeys.findIndex(key => key === data.key);
                    parentItem.children.splice(index, 1);
                }
            }
        }
    }
</script>
```
:::



:::demo 异步加载

设置`load-data`属性可以实现数据的异步加载，参数为当前项的`data`数据，返回Promise对象。

data数据中的`last`属性表示该节点是最后一级节点，最后一级节点不会进行异步加载。

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
                    },
                    {
                        key: 'henan',
                        label: '河南省',
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
                            last: true,
                        },
                        {
                            key: 'chaoyang',
                            label: '朝阳区',
                            last: true,
                        }
                    ]
                }else if(item.key === 'henan'){
                    result = [
                        {
                            key: 'zhengzhou',
                            label: '郑州市',
                            last: true,
                        },
                        {
                            key: 'xuchang',
                            label: '许昌市',
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
| data | Array | 数据，详细配置见下面数据配置说明 | - |
| expand-keys | Array | 树展开项的`key`值数组，手动控制树的展开项 | [] |
| checked-keys | Array | 树复选框选中状态项的`key`值数组，手动控制树的选中项 | [] |
| accordion | Boolean | 是否开启手风琴模式 | - |
| show-checkbox | Boolean | 是否显示`checkbox` | - |
| check-strictly | Boolean | 是否严格遵循`checked`状态的父子级不相关联，设置为`true`时父子级`checked`状态不相关联，默认父子级状态相互关联 | - |
| empty-text | String | 数据为空时显示的内容 | - |
| load-data | Function | 异步加载数据的方法，返回Promise，接收该项的子项`children`数组 | - |
| render-content | Function | 自定义节点渲染函数，使用方式参考示例 | - |
| expand-click-on-node | Boolean | 点击`node`节点是否可以控制展开收起状态 | true |
| indent | String, Number | 相邻数据节点之间水平缩进大小，单位px | 16 |
| default-expand-all | Boolean | 是否默认展开所有数据，只在数据第一次加载时有效，`disabled`的节点不会展开 | - |
| hide-icon | Boolean | 是否隐藏节点前的图标 | - |
| expand-icon-class | String | 自定义展开收起的图标 | - |
| loading-icon-class | String | 自定义异步加载数据时加载中的图标 | - |


### Tree event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| expand-change | 节点展开收起时触发 | 已经展开项的数组、当前节点的数据 |
| check-change | 点击复选框时触发 | 已经选择项的数组、当前项 |


### Tree methods

| 名称 | 说明 | 参数 |
| ---- | ---- | ---- |
| getExpandNodes | 获取所有已展开的节点数据 | - |
| getCheckedNodes | 获取所有复选框已勾选的节点数据 | - |
| getSelectedNodes | 获取所有已选中的节点数据 | - |
| filterNodes | 根据参数`value`模糊匹配`label`字段筛选 | value |


### Tree slot

| 名称 | 说明 |
| ---- | ---- |
| - | 自定义节点的展示内容，参数为{root, data} |



### Children props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| key | String | 数据项的唯一标识 | - |
| label | String | 数据项的展开内容 | - |
| checked | Boolean | 数据项是否被选中，`check-strictly=false`时会默认选中该项下的所有子项，父级选中状态依据所有子级状态展示全选或者半选 | - |
| expand | Boolean | 数据项是否被展开，会默认展开该项路径下的所有父级 | - |
| disabled | Boolean | 数据项是否禁用，会禁用该项的所有操作 | - |
| disabledCheckbox | Boolean | 数据项是否禁用复选框，只会禁用复选框的功能 | - |
| last | Boolean | 是否为叶子节点，在异步加载数据时如果该项时叶子节点，需要设置为`true` | - |