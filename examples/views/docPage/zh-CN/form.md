# Form 表单

用以校验、提交表单数据。包含输入框、选择框、单选框、复选框等组件。

## 代码示例



:::demo 基础用法

表单基础用法。

`form`组件：`layout`属性可以设置表单布局类型,`label-width`属性设置label的宽度，`show-required-icon`设置是否显示必填项的星号。

`form-item`组件：`name`属性在设置form`rules`时是必须的。

```html
<template>
    <Form ref="form" layout="inline" :show-required-icon="false" label-width="0">
        <FormItem name="username" required>
            <Input placeholder="username" prefix="user" v-model="username"></Input>
        </FormItem>
        <FormItem name="password" required>
            <Input placeholder="password" prefix="password" v-model="password"></Input>
        </FormItem>
    </Form>
    <Button type="primary" @click="submit">SignIn</Button>
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
                        this.$Message.success('验证成功')
                    }else{
                        this.$Message.error('验证失败')
                    }
                });
            }
        }
    }
</script>

```

:::



:::demo 表单控件

`form`组件：`rules`属性设置表单验证规则,详细规则见API。表单验证基于`vee-validate`实现，但是已经经过封装。`reset`方法不会重置表单数据，只会重置验证规则。

`form-item`组件：会自动验证该域下`v-model`绑定的数据，如果没有`v-model`进行双向绑定则需要`validator-value`属性需要验证的表单值。

```html
<template>
    <Form ref="form" :rules="rules" label-width="80" show-label-colon>
        <FormItem name="username" label="用户名">
            <Input placeholder="username" v-model="username"></Input>
        </FormItem>
        <FormItem name="email" label="邮箱">
            <Input placeholder="email" v-model="email"></Input>
        </FormItem>
        <FormItem name="region" label="地区">
            <Select v-model="region">
                <Option value="beijing">beijing</Option>
                <Option value="shanghai">shanghai</Option>
                <Option value="zhengzhou">zhengzhou</Option>
            </Select>
        </FormItem>
        <FormItem name="date" label="日期">
            <DatePicker v-model="date" placeholder="请选择日期"></DatePicker>
        </FormItem>
        <FormItem name="resource" label="来源">
            <RadioGroup v-model="resource">
                <Radio label="network">网络</Radio>
                <Radio label="book">书籍</Radio>
                <Radio label="friend">朋友</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem name="like" label="爱好">
            <CheckboxGroup v-model="like">
                <Checkbox label="music">音乐</Checkbox>
                <Checkbox label="snooker">斯诺克</Checkbox>
                <Checkbox label="football">足球</Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem name="moveSend" label="实时推送">
            <cl-switch v-model="moveSend" size="large">
                <span slot="open">打开</span>
                <span slot="close">关闭</span>
            </cl-switch>
        </FormItem>
        <FormItem name="time" label="时长">
            <div class="doc-form-item-wrap">
                <Slider class="doc-form-item-slider" v-model="time" :max="24" :min="1"></Slider>
                <span class="doc-form-unit">月</span>
            </div>
        </FormItem>
        <FormItem name="avatar" label="头像" :validator-value="avatarList">
            <Upload action="//jsonplaceholder.typicode.com/posts/" 
                        drag 
                        listType="picture-card" 
                        :file-list="avatarList" 
                        :onPreview="handlerPreview" 
                        :onRemove="handlerRemove" 
                        :onSuccess="handlerSuccess">
                <Icon type="plus"></Icon>
                <div>上传文件</div>
            </Upload>
        </FormItem>
    </Form>
    <Modal v-model="modalVisible" footer-hide>
        <img :src="modalFile.url" width="100%" alt="" />
    </Modal>
    <Button type="primary" @click="submit">SignIn</Button>
    <Button @click="reset">Reset</Button>
</template>
<script>
    export default {
        data(){
            const usernameValid = (value) => {
                const reg = /^\D[0-9a-zA-Z-_]{5,19}$/;
                if(!reg.test(value)){
                    return '用户名必须为非数字开头，且由数字、字母、横线或者下划线组成'
                }
                return true;
            };
            return {
                username: '',
                email: '',
                region: '',
                resource: '',
                date: '',
                like: [],
                moveSend: false,
                time: 0,
                avatarList: [],
                modalFile: {},
                modalVisible: false,
                rules: {
                    username: [
                        {required: true, message: '必填项', trigger: 'change'},
                        {type: 'string', min: 6, max: 20, message: '长度在6-20位的字符串', trigger: 'change'},
                        {validator: usernameValid, trigger: 'change'},
                    ],
                    email: [
                        {required: true, message: '必填项', trigger: 'change'},
                        {type: 'email', message: '邮箱格式不正确', trigger: 'change'},
                    ],
                    region: [
                        {required: true, message: '必填项', trigger: 'change'},
                    ],
                    resource: [
                        {required: true, message: '必填项', trigger: 'change'},
                    ],
                    like: [
                        {required: true, message: '必填项', trigger: 'change'},
                        {type: 'array', min: 2, message: '最少选两个', trigger: 'change'},
                    ],
                    avatar: [
                        {required: true, message: '必填项', trigger: 'change'},
                        {type: 'array', max: 2, message: '最多上传两张', trigger: 'change'},
                    ]
                }
            }
        },
        methods: {
            submit(){
                this.$refs.form.validate().then(valid=>{
                    if(valid){
                        this.$Message.success('验证成功')
                    }else{
                        this.$Message.error('验证失败')
                    }
                });
            },
            reset(){
                this.$refs.form.reset();
            },
            handlerPreview(file) {
                this.modalFile = file;
                this.modalVisible = true;
            },
            handlerRemove(file, fileList){
              this.avatarList = fileList;
              this.$Message.info('删除成功');
            },
            handlerSuccess(res, file, fileList){
              this.avatarList.push(file);
            }
        }
    }
</script>

```

:::


:::demo 表单布局

`form`组件：`layout`属性可以设置表单布局类型。

```html
<template>
    <Form ref="form" :layout="layout">
        <FormItem label="username">
            <Input placeholder="username" v-model="username"></Input>
        </FormItem>
        <FormItem label="password">
            <Input placeholder="password" v-model="password"></Input>
        </FormItem>
    </Form>
    <h4>表单布局</h4>
    <Select v-model="layout">
        <Option value="horizontal">horizontal</Option>
        <Option value="vertical">vertical</Option>
        <Option value="inline">inline</Option>
    </Select>
</template>
<script>
    export default {
        data(){
            return {
                username: '',
                password: '',
                layout: 'horizontal'
            }
        },
    }
</script>

```

:::


:::demo 动态表单

动态表单。

```html
<template>
    <Form ref="form">
        <FormItem v-for="item in formList" :key="item.id" :name="item.id" :label="item.name" :rules="item.validate">
            <Input v-if="item.type === 'input'" :placeholder="item.placeholder" v-model="item.value"></Input>
            <Select v-if="item.type === 'select'" :placeholder="item.placeholder" v-model="item.value">
                <Option v-for="optionItem in item.option" :value="optionItem.value">{{optionItem.label}}</Option>
            </Select>
        </FormItem>
    </Form>
    <Button type="primary" icon="plus" @click="addForm">添加域名</Button>
    <Button type="primary" @click="submit">提交</Button>
    <Button @click="reset">重置</Button>
</template>
<script>
    export default {
        data(){
            return {
                addNum: 0,
                formList: [
                    {
                        id: 'username',
                        name: '用户名',
                        placeholder: '请输入用户名',
                        type: 'input',
                        value: '',
                        isShow: true,
                        validate: [
                            {required: true}
                        ]
                    },
                    {
                        id: 'email',
                        name: '邮箱',
                        placeholder: '请输入邮箱',
                        type: 'input',
                        value: '',
                        isShow: true,
                        validate: [
                            {required: true}
                        ]
                    },
                    {
                        id: 'region',
                        name: '地区',
                        placeholder: '请选择地区',
                        type: 'select',
                        value: '',
                        isShow: true,
                        option: [
                            {
                                value: 'beijing',
                                label: 'beijing'
                            },
                            {
                                value: 'shanghai',
                                label: 'shanghai'
                            }
                        ],
                        validate: []
                    }
                ]
            }
        },
        methods: {
            addForm(){
                this.addNum = this.addNum + 1;
                let newDomain = {
                    id: 'domain'+this.addNum,
                    name: '域名'+this.addNum,
                    placeholder: '请输入域名',
                    type: 'input',
                    value: '',
                    isShow: true,
                    validate: [
                        {required: true, message: '必填项',trigger: 'change'}
                    ]
                };
                this.formList.push(newDomain);
            },
            submit(){
                this.$refs.form.validate().then(valid=>{
                    if(valid){
                        this.$Message.success('验证成功')
                    }else{
                        this.$Message.error('验证失败')
                    }
                })
            },
            reset(){
                this.$refs.form.reset();
            }
        }
    }
</script>

```

:::


## API

### 内置的校验类型

`form`组件使用 [vee-validate](https://logaretm.github.io/vee-validate/) 进行表单验证

默认校验`form-item`组件下带有`v-model`属性的值，如果表单组件没有绑定`v-model`属性，可以使用`validator-value`绑定要校验的表单值。

`trigger`可选值有 `change` `blur`。

组件内扩展了部分常用验证类型：

| 类型 | 说明 |
| ---- | ---- |
| required | 必填项 |
| email | 邮箱验证 |
| string | 字符串类型，支持参数指定字符串长度的范围 `min` `max` |
| number | 数值类型，支持参数指定数值范围 `min` `max` |
| array | 数组类型，支持参数指定数组长度范围 `min` `max` |

### Form props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| rules | Object | 表单验证的规则 | - |
| layout | String | 表单布局，可选值`horizontal` `vertical` `inline` | horizontal |
| label-algin | String | label水平方向的位置，可选值`left` `center` `right` | right |
| label-width | Number, String | label的宽度 | 80 |
| inline-message | Boolean | 是否以行内形式展示错误信息（暂时保留未用） | false |
| show-message | Boolean | 是否显示验证错误信息 | true |
| show-label-colon | Boolean | 是否显示label后的冒号 | false |
| show-required-icon | Boolean | 是否显示required时label前的星号 | true |


### Form methods

| 名称 | 说明 | 参数 |
| ---- | ---- | ---- |
| validate | 表单验证的方法，返回promise | - |
| validate-field | 验证表单部分字段，参数为`form-item`的name值数组 | [] |
| reset | 重置表单验证规则 | - |


### FormItem props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| name | String | 表单`rules`时必须 | - |
| label-width | Number, String | label的宽度 | - |
| label-for | String | 原生 label 的 for 属性（暂时保留未用） | - |
| label | String | 标签文本 | - |
| rules | Array | 表单验证规则 | [] |
| required | Boolean | 是否必填 | - |
| validator-value | - | 当表单元素没有`v-model`属性绑定时需要验证的值 | - |


### FormItem slot

| 名称 | 说明 |
| ---- | ---- |
| - | 表单组件 |
| label | 标签文本 |
