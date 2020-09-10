# List 列表

基础的列表展示。


## 代码示例


:::demo 基础用法

基础列表。设置`size`属性控制尺寸，设置`border`属性控制是否显示边框，`header`和`footer`分别定义列表头部和底部。

```html
<template>
    <h4>默认大小</h4>
    <List header="列表头部" footer="列表底部" border>
        <ListItem>这是一段文本1。</ListItem>
        <ListItem>这是一段文本2。</ListItem>
        <ListItem>这是一段文本3。</ListItem>
    </List>
    <h4>迷你型列表</h4>
    <List size="mini" header="列表头部" footer="列表底部" border>
        <ListItem>这是一段文本1。</ListItem>
        <ListItem>这是一段文本2。</ListItem>
        <ListItem>这是一段文本3。</ListItem>
    </List>
    <h4>小型列表</h4>
    <List size="small" header="列表头部" footer="列表底部" border>
        <ListItem>这是一段文本1。</ListItem>
        <ListItem>这是一段文本2。</ListItem>
        <ListItem>这是一段文本3。</ListItem>
    </List>
    <h4>大型列表</h4>
    <List size="large" header="列表头部" footer="列表底部" border>
        <ListItem>这是一段文本1。</ListItem>
        <ListItem>这是一段文本2。</ListItem>
        <ListItem>这是一段文本3。</ListItem>
    </List>
</template>

```

:::


:::demo 不同类型的基础列表

设置属性`type="meta"`实现不同类型的列表。

```html
<template>
    <List type="meta" border header="音乐列表">
        <ListItem avatar="http://p1.music.126.net/-6osWky_WObfAydYYiTvpA==/3236962232773608.jpg?param=130y130"
                      title="暗里着迷"
                      description="刘德华">
            可不可不要这么样徘徊在目光内
                        
            你会察觉到我根本寂寞难耐
            
            即使千多百个深夜曾在梦境内
            
            我有吻过你这毕竟并没存在
            
            人声车声开始消和逝
            
            无声挣扎有个情感奴隶
            
            是我多么的想她
            
            但我偏偏只得无尽叹谓
            
            其实每次见你我也着迷
            
            无奈你我各有角色范围
            <div slot="extra">
                <Button type="text" size="mini">编辑</Button>
                <Button type="text" size="mini">删除</Button>
            </div>
        </ListItem>
        <ListItem avatar="http://p1.music.126.net/YxKEZCPUWrvvZf6qeV2_xg==/78065325577755.jpg?param=130y130"
                      title="天龙八部之宿敌"
                      description="许嵩">
                    会在何处见到你
                    莫非前尘已注定
                    飞过时空的距离
                    却囿于刀剑光影
                    三月春花渐次醒
                    迢迢年华谁老去
                    是劫是缘随我心
                    除了你万敌不侵
                    当恩怨各一半
                    我怎么圈揽
                    看灯笼血红染
            <div slot="extra">
                <Button type="text" size="mini">编辑</Button>
                <Button type="text" size="mini">删除</Button>
            </div>
        </ListItem>
        <ListItem>
            <div slot="avatar"><img src="http://p2.music.126.net/emWwYFceRZ2plNWgnGUDfg==/109951163333175426.jpg?param=130y130" alt=""></div>
            <div slot="title">浪子回头</div>
            <div slot="description">茄子蛋</div>
            烟一支一支一支地点
            酒一杯一杯一杯地干
            请你要体谅我
            我酒量不好别给我挖坑
            时间一天一天一天的走
            汗一滴一滴一滴的流
            有一天我们都老
            带妻子一起
            浪子回头
            亲爱的 可爱的 英俊的 朋友
            垃圾的 没品的 没出息的 朋友
            <div slot="extra">
                <Button type="text" size="mini">编辑</Button>
                <Button type="text" size="mini">删除</Button>
            </div>
        </ListItem>
    </List>
</template>

```

:::


:::demo 是否显示分割线

是否显示分割线

```html
<template>
    <List type="meta" border :split="false" header="我的音乐列表">
        <ListItem title="感谢你曾来过" description="周思涵/Ayo97">
            <div slot="extra">
                <Button type="text"><Icon type="heart" size="20"></Icon></Button>
                <Button type="text"><Icon type="plus" size="20"></Icon></Button>
            </div>
        </ListItem>
        <ListItem title="孤单心事" description="颜人中">
            <div slot="extra">
                <Button type="text"><Icon type="heart" size="20"></Icon></Button>
                <Button type="text"><Icon type="plus" size="20"></Icon></Button>
            </div>
        </ListItem>
        <ListItem title="云烟成雨" description="房东的猫">
            <div slot="extra">
                <Button type="text"><Icon type="heart" size="20"></Icon></Button>
                <Button type="text"><Icon type="plus" size="20"></Icon></Button>
            </div>
        </ListItem>
    </List>
</template>

```

:::



:::demo 详情列表

详情列表。

```html
<template>
    <List size="large" header="详情列表">
        <ListRow v-for="(itemRow, indexRow) in dataList" :key="indexRow">
            <ListItem v-for="item in itemRow" :key="item.id" :label="item.label" :value="item.value"></ListItem>
        </ListRow>
    </List>
    <List :split="false" :hover="false" header="详情列表">
        <ListRow v-for="(itemRow, indexRow) in dataList" :key="indexRow">
            <ListItem v-for="item in itemRow" :key="item.id" :label="item.label" :value="item.value"></ListItem>
        </ListRow>
    </List>
</template>
<script>
    export default {
        data(){
            return {
                dataList: [],
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.loadData();
            })
        },
        methods: {
            loadData(){
                setTimeout(()=>{
                    for (let row = 0; row < 3; row++){
                        let rowList = [];
                        for(let col = 0; col < 3; col++){
                            rowList.push({
                                id: row + '' + col,
                                label: `label${row}-${col}:`,
                                value: `value${row}-${col}`
                            })
                        }   
                        this.dataList.push(rowList)        
                    } 
                }, 1000);
            },
        }
    }
</script>

```

:::



:::demo 异步加载数据

设置`loading`属性可以显示加载中的动画。

```html
<template>
    <List type="meta" border :split="false" :loading="loading" header="异步加载列表">
        <ListItem v-for="item in dataList" :key="item.id" :title="item.title" :description="item.description">
            <div slot="extra">
                <Button type="text" size="mini"><Icon type="delete" @click="deleteData(item)"></Icon></Button>
            </div>
        </ListItem>
    </List>
    <Button v-if="!noMore" block :disabled="loading" @click="loadData">加载更多</Button>
</template>
<script>
    export default {
        data(){
            return {
                dataList: [],
                loading: false,
                noMore: false,
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.loadData();
            })
        },
        methods: {
            loadData(){
                this.loading = true;
                setTimeout(()=>{
                    let len = this.dataList.length;
                    let startId = len ? (this.dataList[len - 1].id + 1) : 0;
                    for (let i = startId; i < startId + 3; i++){
                        this.dataList.push({
                            id: i,
                            title: 'title' + i,
                            description: 'description' + i
                        })
                    } 
                    this.loading = false;
                    this.dataList.length > 20 && (this.noMore = true);
                }, 1000);
            },
            deleteData(data){
                let index = this.dataList.findIndex(item=>{
                    return item.id === data.id
                });
                if(index > -1){
                    this.dataList.splice(index, 1);
                    this.$Message.info(`id为${data.id}删除成功`);
                }
            }
        }
    }
</script>

```

:::





## API

### List props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| border | Boolean | 是否显示边框 | - |
| hover | Boolean | 是否需要hover效果 | true |
| split | Boolean | 是否显示item的分割线 | true |
| header | String | 列表头部信息 | - |
| footer | String | 列表低部信息 | - |
| type | String | 列表类型，可选值 `meta`。详情列表时无效 | - |
| size | String | 列表尺寸，可选值 `mini` `small` `mini` `default` | default |
| loading | Boolean | 数据加载中 | - |
| gutter | String, Number | 详情类型的列表时列间距 | 10 |
| label-width | String, Number | 详情类型的列表时定义`label`的宽度 | 100 |



### ListItem props


| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | String | 列表类型，可选值 `meta` | - |
| title | String | 列表项标题，列表或者item的 `type` 值为`meta`时可用。详情列表时无效 | - |
| description | String | 列表项描述，列表或者item的 `type` 值为`meta`时可用。详情列表时无效 | - |
| avatar | String | 列表项图片，列表或者item的 `type` 值为`meta`时可用 | - |
| label | String | 详情列表时有效 | - |
| value | String | 详情列表时有效 | - |


### ListItem slot

| 名称 | 说明 |
| ---- | ---- |
| - | 列表项内容 |
| avatar | 自定义列表项图片信息，详情列表时无效 |
| title | 自定义列表项标题信息，详情列表时无效 |
| description | 自定义列表项描述信息，详情列表时无效 |
| label | 详情列表时有效 |
| value | 详情列表时有效 |
| extra | 自定义列表项额外扩展，详情列表时无效 |
