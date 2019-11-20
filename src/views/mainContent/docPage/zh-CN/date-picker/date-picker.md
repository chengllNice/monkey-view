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
            <cl-date-picker placeholder="请选择日期"></cl-date-picker>
        </cl-col>
        <cl-col>
            <cl-date-picker type="daterange" placement="bottom-end" placeholder="请选择日期"></cl-date-picker>
        </cl-col>
    </cl-row>
</template>
```

:::


:::demo 年月选择

设置`type`类型为`year` `month`分别为年和月选择器。

```html
<template>
    <cl-row :gutter="16">
        <cl-col>
            <cl-date-picker type="year" placeholder="请选择年"></cl-date-picker>
        </cl-col>
        <cl-col>
            <cl-date-picker type="month" placeholder="请选择月"></cl-date-picker>
        </cl-col>
    </cl-row>
</template>
```

:::