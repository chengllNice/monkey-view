# Loading 加载中

当正在获取数据时可以使用loading提高用户体验。


## 代码示例


:::demo 基础用法

设置`size`属性可以实现不同尺寸的loading，`visible`属性控制loading是否显示。

使用`slot`可以定义加载中文字和加载图标，如果自定义实现加载图片需要自己实现加载的动画和样式。

```html
<template>
    <h4>基础</h4>
    <cl-row>
        <cl-col><cl-loading size="mini" :visible="loading" /></cl-col>
        <cl-col><cl-loading size="small" :visible="loading" /></cl-col>
        <cl-col><cl-loading :visible="loading" /></cl-col>
        <cl-col><cl-loading size="large" :visible="loading" /></cl-col>
    </cl-row>
    <h4>使用slot</h4>
    <cl-loading size="mini" :visible="loading">
        <i class="cl-icon-loading1"></i>
        <span slot="text">loading...</span>
    </cl-loading>
</template>
<script>
    export default {
        data(){
            return {
                loading: true
            }
        }      
    }
</script>

```

:::



:::demo 不同类型

设置`type`属性实现不同类型的loading。

```html
<template>
    <cl-row>
        <cl-col><cl-loading type="loading1" size="mini" :visible="loading" /></cl-col>
        <cl-col><cl-loading type="loading1" size="small" :visible="loading" /></cl-col>
        <cl-col><cl-loading type="loading1" :visible="loading" /></cl-col>
        <cl-col><cl-loading type="loading1" size="large" :visible="loading" /></cl-col>
    </cl-row>
</template>
<script>
    export default {
        data(){
            return {
                loading: true
            }
        }      
    }
</script>

```

:::


:::demo 固定

设置`fix`实现定位loading，此时将按照最近定位父元素实现定位覆盖。

```html
<template>
    <div class="doc-loading-fix-wrap">
        <div>content</div>
        <div>content</div>
        <div>content</div>
        <div>content</div>
        <cl-loading fix :visible="loading" />
    </div>
    <cl-switch v-model="loading" width="50">
        <span slot="open">开启</span>
        <span slot="close">关闭</span>
    </cl-switch>
</template>
<script>
    export default {
        data(){
            return {
                loading: true
            }
        },
        methods: {
        
        }             
    }
</script>

```

:::



:::demo 全屏加载

设置`fullscreen`属性可以实现全屏加载。

```html
<template>
    <cl-loading fullscreen :visible="loading" />
    <cl-button @click="openLoading">开启全屏加载，3s后关闭</cl-button>
</template>
<script>
    export default {
        data(){
            return {
                loading: false
            }
        },
        methods: {
            openLoading(){
                this.loading = true;
                setTimeout(()=>{
                    this.loading = false;
                }, 3000)
            }           
        }             
    }
</script>

```

:::


:::demo 实例方法

可以使用实例方法实现loading加载效果，此时loading是全屏加载。只可以配置`size` `text`属性，详细配置见API。

```html
<template>
    <cl-button @click="openLoading">调用实例方法开启全屏加载，3s后关闭</cl-button>
    <cl-button @click="openLoading('large', '加载中')">调用实例方法开启全屏加载，3s后关闭，添加配置项</cl-button>
</template>
<script>
    export default {
        data(){
            return {
                
            }
        },
        methods: {
            openLoading(size, text){
                let config = {};
                if(size && text){
                    config = {
                        size: size || '',
                        text: text || ''
                    };
                }   
                this.$Loading.open(config);
                setTimeout(()=>{
                    this.$Loading.close();
                }, 3000)
            }           
        }             
    }
</script>

```

:::



:::demo 指令实现

可以使用`v-loading`指令实现加载效果。可以添加指令配置参数，其中第一个参数为loading的size尺寸，第二个参数为loading的text文字。

```html
<template>
    <h4>基础使用</h4>
    <div class="doc-loading-fix-wrap" v-loading="loading">
        <div>content</div>
        <div>content</div>
        <div>content</div>
        <div>content</div>
    </div>
    <cl-switch v-model="loading" width="50">
        <span slot="open">开启</span>
        <span slot="close">关闭</span>
    </cl-switch>

    <h4>添加配置参数使用</h4>
    <div class="doc-loading-fix-wrap" v-loading:large:加载中="loading1">
        <div>content</div>
        <div>content</div>
        <div>content</div>
        <div>content</div>
    </div>
    <cl-switch v-model="loading1" width="50">
        <span slot="open">开启</span>
        <span slot="close">关闭</span>
    </cl-switch>
</template>
<script>
    export default {
        data(){
            return {
                loading: false,
                loading1: false,
            }
        },
        methods: {
                   
        }             
    }
</script>

```

:::





## API

### Loading props

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
