## API

### Sider props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | Boolean | 控制展开收起，可以使用v-model双向绑定，true(收起),false(展开) | - |
| width | String, Number | 展开时的宽度 | 200 |
| height | String, Number | 设置滚动时的高度 | - |
| collapsedWidth | String, Number | 收起时的宽度 | 60 |
| hideTrigger | Boolean | 是否隐藏trigger | - |


### Sider event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| collapse | 展开收起时触发 | value |


### Sider slot

| 名称 | 说明 |
| ---- | ---- |
| header | 定义header |
| trigger | 自定义trigger |
