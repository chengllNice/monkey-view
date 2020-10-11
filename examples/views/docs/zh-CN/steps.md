# Steps 步骤条

引导用户按照流程完成任务。

## 代码示例


:::demo 基础用法

基础用法，会根据`active`属性自动判断各个步骤的状态。

```html
<template>
    <Steps :active="1">
        <Step title="填写申请" description="请填写基本信息"></Step>
        <Step title="上传证件" description="请上传证件信息"></Step>
        <Step title="开始审核" description="审核中，请耐心等待"></Step>
        <Step title="审核完成" description="已审核完成"></Step>
    </Steps>
</template>
```
:::

:::demo 自定义尺寸

设置`size`属性可以控制步骤条的尺寸大小，可选`default` `small`；另外也可以定义像素(px)。

```html
<template>
    <Steps :active="1" size="small">
        <Step title="填写申请" description="请填写基本信息"></Step>
        <Step title="上传证件" description="请上传证件信息"></Step>
        <Step title="开始审核" description="审核中，请耐心等待"></Step>
        <Step title="审核完成" description="已审核完成"></Step>
    </Steps>
</template>
```
:::


:::demo 带图标的步骤条

设置`Step`组件的`icon`属性可以指定图标。

```html
<template>
    <Steps :active="1">
        <Step title="填写申请" description="请填写基本信息" icon="edit"></Step>
        <Step title="上传证件" description="请上传证件信息" icon="upload"></Step>
        <Step title="开始审核" description="审核中，请耐心等待" icon="more-v"></Step>
        <Step title="审核完成" description="已审核完成" icon="success"></Step>
    </Steps>
</template>
```
:::


:::demo 步骤切换

点击下一步按钮切换当前进度状态。

```html
<template>
    <Steps :active="active">
        <Step title="填写申请" description="请填写基本信息" icon="edit"></Step>
        <Step title="上传证件" description="请上传证件信息" icon="upload"></Step>
        <Step title="开始审核" description="审核中，请耐心等待" icon="more-v"></Step>
        <Step title="审核完成" description="已审核完成" icon="success"></Step>
    </Steps>
    <Button type="primary" @click="handleClick">下一步</Button>
</template>
<script>
    export default {
        data(){
            return {
                active: 0
            }
        },
        methods: {
            handleClick(){
                this.active = this.active >= 3 ? 0 : this.active + 1
            }
        }
    }
</script>
```
:::


:::demo 垂直方向

设置`direction`属性控制步骤条的方向，可选值 `horizontal` `vertical`，默认`horizontal`。

```html
<template>
    <Steps :active="1" direction="vertical">
        <Step title="填写申请" description="请填写基本信息"></Step>
        <Step title="上传证件" description="请上传证件信息"></Step>
        <Step title="开始审核" description="审核中，请耐心等待"></Step>
        <Step title="审核完成" description="已审核完成"></Step>
    </Steps>
</template>
```
:::


:::demo 步骤条状态

设置`status`属性控制步骤条当前步骤的状态，可选值 `wait` `process` `finish` `error`。

```html
<template>
    <Steps :active="1" status="error">
        <Step title="填写申请" description="请填写基本信息"></Step>
        <Step title="上传证件" description="请上传证件信息"></Step>
        <Step title="开始审核" description="审核中，请耐心等待"></Step>
        <Step title="审核完成" description="已审核完成"></Step>
    </Steps>
</template>
```
:::


:::demo 点状步骤条

设置`type=dot`为点状步骤条。

```html
<template>
    <h4>水平</h4>
    <Steps :active="1" type="dot">
        <Step title="填写申请" description="请填写基本信息"></Step>
        <Step title="上传证件" description="请上传证件信息"></Step>
        <Step title="开始审核" description="审核中，请耐心等待"></Step>
        <Step title="审核完成" description="已审核完成"></Step>
    </Steps>

    <h4>垂直</h4>
    <Steps :active="1" type="dot" direction="vertical">
        <Step title="填写申请" description="请填写基本信息"></Step>
        <Step title="上传证件" description="请上传证件信息"></Step>
        <Step title="开始审核" description="审核中，请耐心等待"></Step>
        <Step title="审核完成" description="已审核完成"></Step>
    </Steps>
</template>
```
:::


:::demo 导航步骤条

设置`type=nav`为导航步骤条。

```html
<template>
    <h4>水平</h4>
    <Steps :active="1" type="nav">
        <Step title="填写申请" description="请填写基本信息"></Step>
        <Step title="上传证件" description="请上传证件信息"></Step>
        <Step title="开始审核" description="审核中，请耐心等待"></Step>
        <Step title="审核完成" description="已审核完成"></Step>
    </Steps>

    <h4>垂直</h4>
    <Steps :active="1" type="nav" direction="vertical">
        <Step title="填写申请" description="请填写基本信息"></Step>
        <Step title="上传证件" description="请上传证件信息"></Step>
        <Step title="开始审核" description="审核中，请耐心等待"></Step>
        <Step title="审核完成" description="已审核完成"></Step>
    </Steps>
</template>
```
:::


:::demo 带有进度的步骤条

设置`percent`属性控制当前步骤的进度，取值`0-100`。

```html
<template>
    <Steps :active="1" :percent="60">
        <Step title="填写申请" description="请填写基本信息"></Step>
        <Step title="上传证件" description="请上传证件信息"></Step>
        <Step title="开始审核" description="审核中，请耐心等待"></Step>
        <Step title="审核完成" description="已审核完成"></Step>
    </Steps>
</template>
```
:::


:::demo 文本位置

设置`label-placement`属性控制文本显示的位置，可选值`horizontal` `vertical`，默认`horizontal`。

只在`type="horizontal"`水平时有效。

```html
<template>
    <Steps :active="1" label-placement="vertical">
        <Step title="填写申请" description="请填写基本信息"></Step>
        <Step title="上传证件" description="请上传证件信息"></Step>
        <Step title="开始审核" description="审核中，请耐心等待"></Step>
        <Step title="审核完成" description="已审核完成"></Step>
    </Steps>
</template>
```
:::


:::demo 文本居中

设置`algin`属性控制水平位置，可选值 `left` `center`，默认`left`。

只在`label-placement="vertical"`文本垂直显示时有效。

```html
<template>
    <Steps :active="1" label-placement="vertical" algin="center">
        <Step title="填写申请" description="请填写基本信息"></Step>
        <Step title="上传证件" description="请上传证件信息"></Step>
        <Step title="开始审核" description="审核中，请耐心等待"></Step>
        <Step title="审核完成" description="已审核完成"></Step>
    </Steps>
</template>
```
:::


## API

### Steps props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | String | 步骤条类型，可选值 `default` `dot` `nav` | default |
| active | Number | 当前步骤 | 0 |
| size | String, Number | 设置步骤条的尺寸，可选值 `default` `small` 或者自定义设置像素大小 | default |
| direction | String | 步骤条的方向，可选值 `horizontal` `vertical` | horizontal |
| status | String | 当前步骤的状态，可选值 `wait` `process` `finish` `error` | - |
| label-placement | String | 文本显示的位置，可选值 `horizontal` `vertical` | horizontal |
| algin | String | 文本水平方向的位置，可选值 `left` `center` | left |
| percent | Number | 设置此值可以显示当前步骤的进度，取值`0-100` | - |


### Step props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| title | String | 标题 | - |
| description | String | 描述性文字 | - |
| icon | String | 图标 | - |
| status | String | 步骤条状态，如果不设置则自动判断，可选值 `wait` `process` `finish` `error` | - |


### Step Slot

| 名称 | 说明 |
| ---- | ---- |
| title | 标题 |
| description | 描述性文字 |
| icon | 图标 |
