# TimePicker 时间选择器

选择时间，支持时、分、秒选择，支持时间的范围选择。

## 代码示例



:::demo 基础用法

设置`type`类型为`time` `timerange`分别为时间单选和时间范围选择。

设置`placement`属性可以控制下拉框的位置，和tooltip组件一致。

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <cl-time-picker placeholder="请选择时间" clearable></cl-time-picker>
        </cl-col>
        <cl-col>
            <cl-time-picker type="timerange" placement="bottom-end" placeholder="请选择时间范围" clearable></cl-time-picker>
        </cl-col>
    </cl-row>
</template>
```

:::


:::demo 时间格式化

设置`format`属性格式化时间。format会改变value的值。

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <cl-time-picker v-model="time1" format="hh时mm分ss秒" placeholder="请选择时间"></cl-time-picker>
        </cl-col>
        <cl-col>
            <cl-time-picker v-model="time2" format="hh,mm,ss" placeholder="请选择时间"></cl-time-picker>
        </cl-col>
        <cl-col>
            <cl-time-picker v-model="time3" type="timerange" format="hh时mm分ss秒" placeholder="请选择时间范围"></cl-time-picker>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
        data(){
            return {
                time1: '00:09:05',
                time2: '',
                time3: ['00:09:05', '00:09:04'],
            }
        }
    }
</script>

```

:::


:::demo 选择时分

设置`format`属性格式化时间。去掉秒。

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <cl-time-picker format="hh:mm" placeholder="请选择时间"></cl-time-picker>
        </cl-col>
        <cl-col>
            <cl-time-picker format="hh:mm" type="timerange" placeholder="请选择时间范围"></cl-time-picker>
        </cl-col>
    </cl-row>
</template>
```

:::


:::demo 不可选时间

设置`disabledHours`属性设置不可选的小时。

`disabledMinutes`设置不可选的分钟。

`disabledSecond`设置不可选的秒。

`hideDisabledOptions`设置隐藏disabled的项。

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <cl-time-picker :disabledHours="[0,1,2]" :disabledMinutes="[0,1,2]" placeholder="请选择时间"></cl-time-picker>
        </cl-col>
        <cl-col>
            <cl-time-picker :disabledHours="[0,1,2]" :disabledMinutes="[0,1,2]" hideDisabledOptions placeholder="请选择时间"></cl-time-picker>
        </cl-col>
        <cl-col>
            <cl-time-picker type="timerange" :disabledHours="[0,1,2]" :disabledMinutes="[0,1,2]" placeholder="请选择时间范围"></cl-time-picker>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
        data(){
            return {
                shortcuts: [
                    {
                      text: '今天',
                      onClick(picker){
                          let date = new Date();
                          picker.setValue(date);
                      }
                    },
                    {
                      text: '昨天',
                      onClick(picker){
                          let date = new Date();
                          date.setDate(date.getDate() - 1);
                          picker.setValue(date);
                      }
                    },
                    {
                      text: '一周之前的某一天',
                      onClick(picker){
                          let date = new Date();
                          date.setDate(date.getDate() - 7);
                          picker.setValue(date);
                      }
                    }
                ],
                shortcutsrange: [
                    {
                      text: '最近一周',
                      onClick(picker){
                          let date1 = new Date();
                          let date2 = new Date();
                          date1.setDate(date1.getDate() - 7);
                          picker.setValue([date1, date2]);
                      }
                    },
                    {
                      text: '一个月',
                      onClick(picker){
                          let date1 = new Date();
                          let date2 = new Date();
                          date1.setDate(date1.getDate() - 30);
                          picker.setValue([date1, date2]);
                      }
                    },
                    {
                      text: '三个月',
                      onClick(picker){
                          let date1 = new Date();
                          let date2 = new Date();
                          date1.setDate(date1.getDate() - 90);
                          picker.setValue([date1, date2]);
                      }
                    }
                ],
            }
        }
    }
</script>
```

:::


:::demo 确认操作

设置`confirm`属性可以展示确认和清除按钮，确认按钮不影响时间选择。

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <cl-time-picker confirm placeholder="请选择日期"></cl-time-picker>
        </cl-col>
        <cl-col>
            <cl-time-picker type="timerange" confirm placeholder="请选择日期范围"></cl-time-picker>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
        data(){
            return {
                
            }
        },
        methods: {
            
        }
    }
</script>
```

:::



:::demo 只读和不可输入

设置`readonly`属性开启只读。只读时不能打开日期下拉框。

设置`editable`属性控制是否可输入。

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <h4>只读</h4>
            <cl-time-picker placeholder="请选择时间" readonly></cl-time-picker>
        </cl-col>
        <cl-col>
            <h4>不可输入</h4>
            <cl-time-picker type="timerange" placeholder="请选择时间范围" :editable="false"></cl-time-picker>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
        data(){
            return {
                
            }
        },
    }
</script>
```

:::


:::demo 禁用

设置`disabled`属性禁用日期选择器。

```html
<template>
    <cl-time-picker placeholder="请选择时间" disabled></cl-time-picker>
</template>
<script>
    export default {
        data(){
            return {
                
            }
        },
    }
</script>
```

:::


:::demo 自定义触发器

设置`disabled`属性禁用日期选择器。

```html
<template>
    <cl-time-picker placeholder="请选择时间" :open="open">
        <cl-button type="text" @click="open = !open">触发时间框打开关闭</cl-button>
    </cl-time-picker>
</template>
<script>
    export default {
        data(){
            return {
                open: false
            }
        },
    }
</script>
```

:::


:::demo 尺寸

设置`size`属性控制尺寸大小，可选值 `mini` `small` `large`或者不设置。

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <h4>Mini</h4>
            <cl-time-picker placeholder="请选择时间" size="mini"></cl-time-picker>
        </cl-col>
        <cl-col>
            <h4>Small</h4>
            <cl-time-picker placeholder="请选择时间" size="small"></cl-time-picker>
        </cl-col>
        <cl-col>
            <h4>Default</h4>
            <cl-time-picker placeholder="请选择时间"></cl-time-picker>
        </cl-col>
        <cl-col>
            <h4>Large</h4>
            <cl-time-picker placeholder="请选择时间" size="large"></cl-time-picker>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
        data(){
            return {
                
            }
        },
    }
</script>
```

:::



## API

### TimePicker props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | String | 设置时间选择器的类型，可选值 `time` `timerange` | time |
| value | String, Array | 绑定的值，可以使用v-model进行双向绑定，`range`模式下为Array类型 | - |
| disabled | Boolean | 禁用 | - |
| disabledHours | Array | 禁用的小时 | [] |
| disabledMinutes | Array | 禁用的分钟 | [] |
| disabledSeconds | Array | 禁用的秒 | [] |
| hideDisabledOptions | Boolean | 是否隐藏禁用的时间 | - |
| confirm | Boolean | 是否显示确认、清除按钮 | - |
| readonly | Boolean | 只读属性，只读时不能打开时间下拉框 | - |
| placeholder | String | 占位文本 | - |
| size | String | 尺寸，可选值 `mini` `small` `large`或者不设置 | - |
| clearable | Boolean | 显示清除图标 | - |
| suffix | String | 输入框尾部图标 | time |
| transition | String | 自定义时间下拉框的动画效果 | slideUp |
| editable | Boolean | 是否可以输入 | true |
| placement | String | 和`tooltip`一样 | bottom-start |
| format | String | 格式化时间 | hh:mm:ss |
| open | Boolean | 自定义控制打开关闭时间下拉框，此时选择器不会主动关闭。 | - |
| separator | String | 两个时间之间的分隔符 | ～ |
| className | String | 选择器的类名 | - |
| dropdownClassName | String | 选择器下拉框的类名 | - |
| renderHtml | HTMLElement, Boolean | 定义时间下拉框渲染的位置，如果为`true`则渲染到body中，可以指定渲染的元素 | false |


### TimePicker event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| change | 数据改变时触发，返回已经格式化的时间 | time |
| clear | 开始clearable时有用。点击清空按钮时触发 | - |
| click-outside | 点击外部关闭下拉框时触发 | event |



### TimePicker slot

| 名称 | 说明 |
| ---- | ---- |
| - | 自定义触发器 |


### TimePicker methods

| 名称 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 主动使input获取焦点 | - |
| blur | 主动使input失去焦点 | - |
