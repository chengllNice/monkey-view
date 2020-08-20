# DatePicker 日期选择器

选择日期，支持年、月、日期的类型，支持日期的范围选择。

## 代码示例



:::demo 基础用法

设置`type`类型为`date` `daterange`分别为日期单选和日期范围选择。

设置`placement`属性可以控制下拉框的位置，和tooltip组件一致。

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <cl-date-picker placeholder="请选择日期" clearable></cl-date-picker>
        </cl-col>
        <cl-col>
            <cl-date-picker type="daterange" placement="bottom-end" placeholder="请选择日期范围" clearable></cl-date-picker>
        </cl-col>
    </cl-row>
</template>
```

:::


:::demo 年月周选择

设置`type`类型为`year` `month` `week`分别为年、月和周选择器。

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <cl-date-picker type="year" placeholder="请选择年" clearable></cl-date-picker>
        </cl-col>
        <cl-col>
            <cl-date-picker type="month" placeholder="请选择月" clearable></cl-date-picker>
        </cl-col>
        <cl-col>
            <cl-date-picker type="week" placeholder="请选择周" clearable></cl-date-picker>
        </cl-col>
    </cl-row>
</template>
```

:::


:::demo 日期时间选择

设置`type`类型为`datetime` `datetimerange`分别为日期时间单选和日期时间范围选择。

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <cl-date-picker type="datetime" placeholder="请选择日期时间" clearable></cl-date-picker>
        </cl-col>
        <cl-col>
            <cl-date-picker type="datetimerange" placeholder="请选择日期时间范围" clearable></cl-date-picker>
        </cl-col>
    </cl-row>
</template>
```

:::


:::demo 快捷方式

设置`shortcuts`属性可以定义快捷方式。`onClick`事件中返回日期选择器实例，可以调用`setValue`方法设置日期。

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <cl-date-picker type="date" placeholder="请选择日期" :shortcuts="shortcuts" clearable></cl-date-picker>
        </cl-col>
        <cl-col>
            <cl-date-picker type="daterange" placeholder="请选择日期范围" :shortcuts="shortcutsrange" clearable></cl-date-picker>
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


:::demo 禁用指定日期

设置`disabled-date`属性可以指定禁用的日期，该属性值为`Function`,参数为日期，需返回Boolean值指定是否禁用该日期。

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <cl-date-picker type="date" placeholder="请选择日期" :disabled-date="disabledDate" clearable></cl-date-picker>
        </cl-col>
        <cl-col>
            <cl-date-picker type="daterange" placeholder="请选择日期范围" :disabled-date="disabledDate" clearable></cl-date-picker>
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
            disabledDate(date){
                return date && new Date(date).getTime() < Date.now();
            },
        }
    }
</script>
```

:::


:::demo 格式化日期

设置`format`属性可以格式化日期。

该值格式为`yyyy-MM-dd hh:mm:ss`。

默认值如下：

`type=date`和`type=daterange`: `yyyy-MM-dd`;

`type=year`: `yyyy`;

`type=month`: `yyyy-MM`;

`type=week`: `yyyy-WW`;

`type=datetime`和`type=datetimerange`: `yyyy-MM-dd hh:mm:ss`;

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <cl-date-picker type="date" placeholder="请选择日期" format="yyyy年MM月dd日" clearable></cl-date-picker>
        </cl-col>
        <cl-col>
            <cl-date-picker type="daterange" placeholder="请选择日期范围" format="yyyy/MM/dd" clearable></cl-date-picker>
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


:::demo 格式化绑定日期值

设置`value-format`属性可以格式化绑定日期值。使用方式类似于`format`。

注意：`value-format`格式化后的值必须是可以被`new Date()`的日期格式，不能类似于`2020年01月01日`的格式。

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <p>默认为Date对象</p>
            <p>value: {{date1}}</p>
            <cl-date-picker v-model="date1" placeholder="请选择日期" clearable></cl-date-picker>
        </cl-col>
        <cl-col>
            <p>使用value-format</p>
            <p>value: {{date2}}</p>
            <cl-date-picker v-model="date2" placeholder="请选择日期范围" value-format="yyyy年MM月dd日" clearable></cl-date-picker>
        </cl-col>
        <cl-col>
            <p>时间戳</p>
            <p>value: {{date3}}</p>
            <cl-date-picker v-model="date3" placeholder="请选择日期" value-format="timestamp" clearable></cl-date-picker>
        </cl-col>
    </cl-row>
</template>
<script>
    export default {
        data(){
            return {
                date1: '',
                date2: '',
                date3: '',
            }
        },
    }
</script>
```

:::


:::demo 多选

设置`multiple`属性开启多选，只在`type=date`时有效。

```html
<template>
    <cl-date-picker placeholder="请选择日期" multiple clearable></cl-date-picker>
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


:::demo 显示周数

设置`show-week-number`属性显示周数。

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <cl-date-picker type="date" placeholder="请选择时间" show-week-number clearable></cl-date-picker>
        </cl-col>
        <cl-col>
            <cl-date-picker type="daterange" placeholder="请选择日期范围" show-week-number clearable></cl-date-picker>
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


:::demo 只读和不可输入

设置`readonly`属性开启只读。只读时不能打开日期下拉框。

设置`editable`属性控制是否可输入。

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <h4>只读</h4>
            <cl-date-picker type="date" placeholder="请选择日期" readonly clearable></cl-date-picker>
        </cl-col>
        <cl-col>
            <h4>不可输入</h4>
            <cl-date-picker type="daterange" placeholder="请选择日期范围" :editable="false" clearable></cl-date-picker>
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
    <cl-date-picker type="date" placeholder="请选择日期" disabled clearable></cl-date-picker>
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

可以通过`slot`自定义触发器，此时需要手动通过`open`属性控制日期面板的打开和关闭。

```html
<template>
    <cl-date-picker type="date" placeholder="请选择日期" :open="open">
        <cl-button type="text" @click="open = !open">触发日期框打开关闭</cl-button>
    </cl-date-picker>
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
            <cl-date-picker type="date" placeholder="请选择日期" size="mini"></cl-date-picker>
        </cl-col>
        <cl-col>
            <h4>Small</h4>
            <cl-date-picker type="date" placeholder="请选择日期范围" size="small"></cl-date-picker>
        </cl-col>
        <cl-col>
            <h4>Default</h4>
            <cl-date-picker type="date" placeholder="请选择日期范围"></cl-date-picker>
        </cl-col>
        <cl-col>
            <h4>Large</h4>
            <cl-date-picker type="date" placeholder="请选择日期范围" size="large"></cl-date-picker>
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

### DatePicker props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | String | 设置日期选择器的类型，可选值 `date` `daterange` `datetime` `datetimerange` `year` `month` `week` | date |
| value | Date, String, Array, Number | 绑定的值，可以使用v-model进行双向绑定，`range`模式下为Array类型，`Number`类型为时间戳，数组类型是数组项值的类型为String、Date、Number | - |
| disabled | Boolean | 禁用 | - |
| readonly | Boolean | 只读属性，只读时不能打开日期下拉框 | - |
| placeholder | String | 占位文本 | - |
| size | String | 尺寸，可选值 `mini` `small` `large`或者不设置 | - |
| clearable | Boolean | 显示清除图标 | true |
| prefix | String | 输入框前置图标。 | - |
| suffix | String | 输入框尾部图标。 | date |
| transition | String | 自定义日期下拉框的动画效果 | fade |
| editable | Boolean | 是否可以输入 | true |
| placement | String | 和`tooltip`一样 | bottom-start |
| format | String | 输入框展示时间的格式化；详细见示例，具体格式见下面的日期格式说明 | - |
| value-format | String | `v-model`绑定值时间的格式化；详细见示例，具体格式见下面的日期格式说明 | - |
| shortcuts | Array | 自定义快捷方式，类型如`[{text: 'one', onClick(picker){}}]`，详细见示例 | - |
| disabledDate | Function | 禁用日期，详细见示例 | - |
| showWeekNumber | Boolean | 是否显示周数 | - |
| open | Boolean | 自定义控制打开关闭日期下拉框，此时选择器不会主动关闭，结合`slot`使用。 | - |
| multiple | Boolean | 是否多选日期，`type=date`时有效 | - |
| separator | String | range类型时，两个日期之间的分隔符 | ～ |
| className | String | 选择器的类名 | - |
| dropdownClassName | String | 选择器下拉框的类名 | - |
| renderHtml | HTMLElement, Boolean | 定义日期下拉框渲染的位置，如果为`true`则渲染到body中，可以指定渲染的元素 | false |


### DatePicker event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| change | 数据改变时触发,返回已经格式化的日期 | date |
| clear | 开始clearable时有用。点击清空按钮时触发 | - |
| click-outside | 点击外部关闭下拉框时触发 | event |
| date-click | 选中date时触发，自定义触发器时可以使用,返回已经格式化的日期 | date |



### DatePicker slot

| 名称 | 说明 |
| ---- | ---- |
| - | 自定义触发器 |


### DatePicker methods

| 名称 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 主动使input获取焦点 | - |
| blur | 主动使input失去焦点 | - |


### 日期格式说明

使用`format`指定日期格式；使用`value-format`指定绑定值得格式。

默认组件返回Date对象格式的日期。以下示例以日期`2020-01-01 03:09:01`说明。

<Alter type="warning">请注意大小写</Alter>

| 格式 | 说明 | 示例 |
| ---- | ---- | ---- |
| yyyy | 年份（四位） | 2020 |
| yy | 年份（两位） | 20 |
| MM | 月份（单位数时补0） | 01 |
| M | 月份 | 1 |
| dd | 日期（单位数时补0） | 01 |
| d | 日期 | 1 |
| HH | 小时，24小时制（单位数时补0）） | 03 |
| H | 小时，24小时制 | 3 |
| hh | 小时，12小时制（单位数时补0）） | 03 |
| h | 小时，12小时制 | 3 |
| mm | 分钟（单位数时补0）） | 09 |
| m | 分钟 | 9 |
| ss | 秒钟（单位数时补0）） | 01 |
| s | 秒钟 | 1 |
| A | 上午与下午（大写） | AM/PM |
| a | 上午与下午（小写） | am/pm |
| WW | 周（单位数时补0） | 01 |
| W | 周 | 1 |
| timestamp | JS时间戳，仅`value-format`可用 | 1577819341000 |