# Form 表单

用以校验、提交表单数据。包含输入框、选择框、单选框、复选框等组件。

## 代码示例



:::demo 基础用法

可以使用v-model实现双向数据绑定。默认宽度100%。

```html
<template>
    <cl-form ref="form" :show-required-icon="false" label-width="0">
        <cl-form-item name="username" required>
            <cl-input placeholder="username" v-model="username" style="width: 300px"></cl-input>
        </cl-form-item>
        <cl-form-item name="password" required>
            <cl-input placeholder="password" v-model="password" style="width: 300px"></cl-input>
        </cl-form-item>
    </cl-form>
    <cl-button type="primary" @click="submit">Login</cl-button>
</template>
<script>
    export default {
        data(){
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            submit(){
                this.$refs.form.validate().then(valid=>{
                    if(valid){
                    
                    }
                });
            }
        }
    }
</script>

```

:::



## API

### Input props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | String | 设置文本框的类型，可选值 `input` `number` `search` `password` `textarea` | input |
| name | String | 原生name属性 | - |
| value | String, Number | 绑定的值，可以使用v-model进行双向绑定 | - |
| disabled | Boolean | 禁用 | - |
| readonly | Boolean | 只读属性 | - |
| placeholder | String | 占位文本 | - |
| size | String | 尺寸，可选值 `mini` `small` `large`或者不设置 | - |
| step | Boolean, Number | type为number时，每次改变的步数，可以是小数。false时不显示控制按钮， true时显示控制按钮，默认显示左右按钮 | 1 |
| stepType | String | type为number时，控制按钮显示的位置。可选值`right` | 1 |
| min | Number | 最小值。type类型为number时有用，设置可输入的最小值 | - |
| max | Number | 最大值。type类型为number时有用，设置可输入的最大值 | - |
| precision | Number | 保留小数点位数。type类型为number时有用 | - |
| minLength | Number | 暂时不支持 | - |
| maxLength | Number | 可输入的最大字符长度.input和textarea时有效 | - |
| showLimitLabel | Boolean | 是否显示限制。为true时会在输入框或者textarea尾部显示当前字符长度和限制长度manLength。该值需要和maxLength配合使用。 | - |
| autosize | Boolean, Object | type为textarea时有效。自适应内容高度，可设置对象，如{minRows: 2, maxRows: 6} | - |
| rows | Number | type为textarea时有效。默认行数，超出时显示滚动条 | - |
| showPasswordIcon | Boolean, Object | type为password时尾部显示控制字符显示的icon图标。false时不显示。可设置对象，设置icon，如：{close: 'cl-icon-close', open: 'cl-icon-square-plus'} | true |
| suffix | String | 输入框尾部图标。textarea时无效。type为search时默认显示搜索图标 | - |
| prefix | Boolean, String | 输入框头部图标。textarea时无效 | - |
| suffixButton | String | type为search时有效。定义搜索按钮，true时显示纯图标的按钮，string时可定义按钮的文字 | false |
| clearable | Boolean | 显示清除图标。type为textarea时无效 | false |
| inputStyle | Object | 输入框的样式，type为textarea时无效 | false |
| resize | Boolean | 暂时不支持 | - |


### Input event

| 事件名 | 说明 | 返回值 |
| ---- | ---- | ---- |
| change | 数据改变时触发 | - |
| blur | 失去焦点时触发 | - |
| focus | 获取焦点时触发 | - |
| enter | 按下回车键时触发 | - |
| search | 按下搜索或回车键时触发。search状态下有用 | - |
| clear | 开始clearable时有用。点击清空按钮时触发 | - |



### Input slot

| 名称 | 说明 |
| ---- | ---- |
| prepend | 前置内容。type为textarea时无效 |
| prefix | 输入框头部内容。设置此项内容后内置的prefix无效。type为textarea时无效 |
| suffix | 输入框尾部内容。设置此项内容后会导致内置suffix的无效。type为textarea时无效 |
| append | 后置内容。设置此项内容后suffixButton无效。type为textarea时无效 |


### Input methods

| 名称 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 主动使input获取焦点 | - |
| blur | 主动使input失去焦点 | - |
