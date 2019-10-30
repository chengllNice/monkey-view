# Page 分页

当数据量比较大时，使用分页分解数据，实现快速响应。


## 代码示例


:::demo 基础用法

基础用法。页数过多会自动折叠。默认最多显示5页。超出5页时折叠。

```html
<template>
    <h4>不同数据总量</h4>
    <cl-page :total="50"/>
    <cl-page :total="100"/>

    <h4>设置当前页page</h4>
    <cl-page :total="100" :page="page" @change="pageChange"/>
</template>
<script>
    export default {
        data(){
            return {
                page: 5
            }
        },
        methods: {
            pageChange(page, pageSize){
                this.$Message.info(`当前页为${page}，当前每页条数为${pageSize}`)
            }
        }       
    }
</script>

```

:::


:::demo 设置排序

设置`order`属性可以实现 总数据量`total`、分页`page`、每页条数`pageSize`、跳转`jump`之间的排序关系并展示对应的功能。

设置`totalText`和`pageSize`属性可以分别控制总数据量和每页条数选择项的显示方式。

```html
<template>
    <h4>只展示总数据量和分页</h4>
    <cl-page :total="100" order="total, page"/>
    <h4>只展示每页条数和分页</h4>
    <cl-page :total="100" order="page, pageSize"/>
    <h4>全部展示四项</h4>
    <cl-page :total="100" order="total, page, pageSize, jump"/>
    <h4>全部展示四项--不同的排序</h4>
    <cl-page :total="100" order="page, pageSize, jump, total"/>
    <h4>totalText和pageSize</h4>
    <cl-page :total="100" order="total, page, pageSize, jump" totalText="总共 total 条数据" pageSizeText="每页 pageSize 条" />
</template>

```

:::



:::demo 带有边框和背景颜色的分页

设置`border`属性可以实现带有边框的分页样式。默认不展示边框。

```html
<template>
    <h4>显示边框</h4>
    <cl-page :total="100" border />
    <h4>显示背景</h4>
    <cl-page :total="100" background />
</template>

```

:::


:::demo 迷你类型的分页

设置属性`size="mini"`可以实现迷你类型的分页。

```html
<template>
    <cl-page size="mini" :total="100" />
    <cl-page size="mini" :total="100" background />
</template>

```

:::



:::demo 替换上一页下一页图标

设置属性`size="mini"`可以实现迷你类型的分页。

```html
<template>
    <cl-page :total="100" preText="上一页" nextText="下一页" />
</template>

```

:::





## API

### Page props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| page | Number | 当前页 | 1 |
| total | Number | 数据总量 | 0 |
| pageSize | Number | 每页条数 | 10 |
| pageSizeOption | Array | 配置可选择的每页条数，建议不要超过4项 | [10, 20, 30, 40] |
| maxPage | Number | 最多显示分页数量，超出时折叠 | 5 |
| size | String | 分页尺寸，可选值 `mini` | default |
| background | Boolean | 是否显示背景色 | - |
| border | Boolean | 是否显示边框 | - |
| hidenOnlySinglePage | Boolean | 当只有一页或者数据量为0时是否显示分页，设置为true则不显示 | - |
| preText | String | 上一页文字，替换上一页的图标 | - |
| nextText | String | 下一页文字，替换下一页的图标 | - |
| order | String | 分页排序及显示对应功能，各值使用逗号隔开。例如：`total, page, pageSize, jump` | - |
| totalText | String | 设置总数据量的显示方式，其中`total`为占位符，替换总数据量 | 共 total 条 |
| pageSizeText | String | 设置每页条数选择项的显示方式，其中`pageSize`为占位符，替换总数据量 | pageSize 条/页 |


### Page event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| change | 当前页和每页条数变化时出发 | page, pageSize |
