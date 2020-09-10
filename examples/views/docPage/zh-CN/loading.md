# Loading 加载中

当正在获取数据时可以使用loading提高用户体验。


## 代码示例


:::demo 基础用法

设置`size`属性可以实现不同尺寸的loading，`visible`属性控制loading是否显示。

使用`slot`可以定义加载中文字和加载图标，如果自定义实现加载图片需要自己实现加载的动画和样式。

```html
<template>
    <h4>基础</h4>
    <Row>
        <Col><Loading size="mini" :visible="loading" /></Col>
        <Col><Loading size="small" :visible="loading" /></Col>
        <Col><Loading :visible="loading" /></Col>
        <Col><Loading size="large" :visible="loading" /></Col>
    </Row>
    <h4>使用slot</h4>
    <Loading size="mini" :visible="loading">
        <Icon type="loading"></Icon>
        <span slot="text">loading...</span>
    </Loading>
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

设置`type`属性实现不同类型的loading，内部提供六种loading效果，可以根据需要使用。

```html
<template>
    <Row>
        <Col><Loading size="mini" :visible="loading" /></Col>
        <Col><Loading type="loading1" size="mini" :visible="loading" /></Col>
        <Col><Loading type="loading2" size="small" :visible="loading" /></Col>
        <Col><Loading type="loading3" :visible="loading" /></Col>
        <Col><Loading type="loading4" size="large" :visible="loading" /></Col>
        <Col><Loading type="loading5" size="large" :visible="loading" /></Col>
    </Row>
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
        <Loading fix :visible="loading" />
    </div>
    <m-switch v-model="loading" width="50">
        <span slot="open">开启</span>
        <span slot="close">关闭</span>
    </m-switch>
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
    <Loading fullscreen :visible="loading" />
    <Button @click="openLoading">开启全屏加载，3s后关闭</Button>
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


:::demo 服务方式

可以使用实例方法实现loading加载效果，此时loading是全屏加载。只可以配置`type` `size` `text`属性。

配置参数`option`为对象或者字符串。其中为字符串时只可配置加载文字描述。为对象时如下：

`{text: '', size: '', type: ''}`

```html
<template>
    <Button @click="openLoading">调用实例方法开启全屏加载，3s后关闭</Button>
    <Button @click="openLoading('large', '加载中')">调用实例方法开启全屏加载，3s后关闭，添加配置项</Button>
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
                        text: text || '',
                        type: 'default',
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

可以使用`v-loading`指令实现加载效果。

指令方式相对于添加指令的元素进行定位。

可以添加指令配置参数，其中第一个参数为loading的type，第二个参数为loading的size尺寸，第三个参数为loading的text文字。

```html
<template>
    <h4>基础使用</h4>
    <div class="doc-loading-fix-wrap" v-loading="loading">
        <div>content</div>
        <div>content</div>
        <div>content</div>
        <div>content</div>
    </div>
    <m-switch v-model="loading" width="50">
        <span slot="open">开启</span>
        <span slot="close">关闭</span>
    </m-switch>

    <h4>添加配置参数使用</h4>
    <div class="doc-loading-fix-wrap" v-loading:loading2:large:加载中="loading1">
        <div>content</div>
        <div>content</div>
        <div>content</div>
        <div>content</div>
    </div>
    <m-switch v-model="loading1" width="50">
        <span slot="open">开启</span>
        <span slot="close">关闭</span>
    </m-switch>
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
| visible | Boolean | 是否显示loading | false |
| type | String | loading类型，可选值 `default` `loading1` `loading2` `loading3` `loading4` `loading5`   | default |
| text | String | 文字描述 | - |
| size | String | 尺寸，可选值 `mini` `small` `default` `large` | default |
| fix | Boolean | 相对于已定位的父及元素定位，指令模式下相对于添加指令的元素定位 | false |
| fullscreen | Boolean | 全屏显示，指令模式下不能设置，服务模式下默认为全屏显示 | false |
| color | String | 自定义loading颜色，服务和指令模式下不能设置 | - |


### Loading slot

| 名称 | 说明 |
| ---- | ---- |
| - | loading图标 |
| text | loading文字描述 |
