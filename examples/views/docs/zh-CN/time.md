# Time 相对时间


## 代码示例


:::demo 基础用法

默认类型时，一分钟之内显示为（..秒前），一小时之内显示（..分钟前），今天显示（时间点），昨天显示（昨天+时间点），昨天之前显示（时间点）

```html
<template>
    <h4>指定时间在当前时间点之前</h4>
    一分钟之内：<Time :time="baseTime1"></Time>
    <br>
    一小时之内：<Time :time="baseTime2"></Time>
    <br>
    今天：<Time :time="baseTime3"></Time>
    <br>
    昨天：<Time :time="baseTime4"></Time>
    <br>
    昨天之前：<Time :time="baseTime5"></Time>

    <h4>指定时间在当前时间点之后</h4>
    一分钟之内：<Time :time="baseTime6"></Time>
    <br>
    一小时之内：<Time :time="baseTime7"></Time>
    <br>
    今天：<Time :time="baseTime8"></Time>
    <br>
    明天：<Time :time="baseTime9"></Time>
    <br>
    明天之后：<Time :time="baseTime10"></Time>
</template>
<script>
    export default {
      data(){
        let date = new Date();
        let yesterDate = new Date();
        yesterDate.setDate(date.getDate() - 1);
        let oldDate = new Date();
        oldDate.setDate(date.getDate() - 2);
        return {
          baseTime1: date - 10 * 1000,
          baseTime2: date - 60 * 45 * 1000,
          baseTime3: date - 60 * 70 * 1000,
          baseTime4: yesterDate,
          baseTime5: oldDate,

          baseTime6: date.getTime() + 10 * 1000,
          baseTime7: date.getTime() + 60 * 45 * 1000,
          baseTime8: date.getTime() + 2 * 60 * 60 * 1000,
          baseTime9: date.getTime() + 24 * 60 * 60 * 1000,
          baseTime10: date.getTime() + 48 * 60 * 60 * 1000,
        }
      }
    }
</script>
```
:::



:::demo type类型

type类型可取值`relative` `date` `datetime`

```html
<template>
    <Time :time="baseTime"></Time>
    <br>
    <Time :time="baseTime" type="date"></Time>
    <br>
    <Time :time="baseTime" type="datetime"></Time>
</template>
<script>
    export default {
      data(){
        let date = new Date();
        return {
          baseTime: date - 10 * 1000,
        }
      }
    }
</script>
```
:::


:::demo format格式化

format默认`yyyy-MM-dd hh:mm:ss`

```html
<template>
    <Time :time="baseTime" format="yyyy年MM月dd日 hh:mm"></Time>
    <br>
    <Time :time="baseTime2" format="yyyy年MM月dd日 hh:mm"></Time>
    <br>
    <Time :time="baseTime" type="date" format="yyyy年MM月dd日 hh:mm"></Time>
    <br>
    <Time :time="baseTime" type="datetime" format="yyyy年MM月dd日 hh:mm"></Time>
</template>
<script>
    export default {
      data(){
        let date = new Date();
        return {
          baseTime: date - 10 * 1000,
          baseTime2: date - 24 * 60 * 60 * 1000,
        }
      }
    }
</script>
```
:::


:::demo 自动更新时间

`interval`属性设置自动更新时间的间隔，单位：秒。

```html
<template>
    <Time :time="baseTime" :interval="1"></Time>
</template>
<script>
    export default {
      data(){
        return {
          baseTime: new Date()
        }
      }
    }
</script>
```
:::



## API

### Time props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| time | String、Date、Number | 必传参数，支持时间戳 | - |
| type | String | `relative` `date` `datetime`,`relative`类型时，默认一分钟之内显示为（..秒前），一小时之内显示（..分钟前），今天显示（时间点），昨天显示（昨天+时间点），昨天之前显示（时间点） | relative |
| interval | Number | 设置自动更新时间的间隔，单位：秒 | - |
| format | String | 格式化时间显示，`date` `datetime`时有效，`relative`时按照指定的时间格式显示日期和时间 | yyyy-MM-dd hh:mm:ss |

