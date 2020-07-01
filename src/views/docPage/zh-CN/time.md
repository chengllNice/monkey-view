# Time 相对时间


## 代码示例


:::demo 基础用法

默认类型时，一分钟之内显示为（..秒前），一小时之内显示（..分钟前），今天显示（时间点），昨天显示（昨天+时间点），昨天之前显示（时间点）

```html
<template>
    <h4>指定时间在当前时间点之前</h4>
    一分钟之内：<cl-time :time="baseTime1"></cl-time>
    <br>
    一小时之内：<cl-time :time="baseTime2"></cl-time>
    <br>
    今天：<cl-time :time="baseTime3"></cl-time>
    <br>
    昨天：<cl-time :time="baseTime4"></cl-time>
    <br>
    昨天之前：<cl-time :time="baseTime5"></cl-time>

    <h4>指定时间在当前时间点之后</h4>
    一分钟之内：<cl-time :time="baseTime6"></cl-time>
    <br>
    一小时之内：<cl-time :time="baseTime7"></cl-time>
    <br>
    今天：<cl-time :time="baseTime8"></cl-time>
    <br>
    明天：<cl-time :time="baseTime9"></cl-time>
    <br>
    明天之后：<cl-time :time="baseTime10"></cl-time>
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
    <cl-time :time="baseTime"></cl-time>
    <br>
    <cl-time :time="baseTime" type="date"></cl-time>
    <br>
    <cl-time :time="baseTime" type="datetime"></cl-time>
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

format默认`YYYY-MM-DD hh:mm:ss`

```html
<template>
    <cl-time :time="baseTime" format="YYYY年MM月DD日 hh:mm"></cl-time>
    <br>
    <cl-time :time="baseTime2" format="YYYY年MM月DD日 hh:mm"></cl-time>
    <br>
    <cl-time :time="baseTime" type="date" format="YYYY年MM月DD日 hh:mm"></cl-time>
    <br>
    <cl-time :time="baseTime" type="datetime" format="YYYY年MM月DD日 hh:mm"></cl-time>
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



## API

### Time props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| time | String、Date、Number | 必传参数，支持时间戳 | - |
| type | String | `relative` `date` `datetime`,`relative`类型时，默认一分钟之内显示为（..秒前），一小时之内显示（..分钟前），今天显示（时间点），昨天显示（昨天+时间点），昨天之前显示（时间点） | auto |
| format | String | 格式化时间显示，`date` `datetime`时有效，`relative`时按照指定的时间格式显示日期和时间 | YYYY-MM-DD hh:mm:ss |

