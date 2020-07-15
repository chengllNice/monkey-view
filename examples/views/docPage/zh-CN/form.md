# Form 表单

用以校验、提交表单数据。包含输入框、选择框、单选框、复选框等组件。

## 代码示例



:::demo 基础用法

表单基础用法。

`form`组件：`layout`属性可以设置表单布局类型,`label-width`属性设置label的宽度，`show-required-icon`设置是否显示必填项的星号。

`form-item`组件：`name`属性在设置form`rules`时是必须的。

```html
<template>
    <cl-form ref="form" layout="inline" :show-required-icon="false" label-width="0">
        <cl-form-item name="username" required>
            <cl-input placeholder="username" prefix="icon-user" v-model="username"></cl-input>
        </cl-form-item>
        <cl-form-item name="password" required>
            <cl-input placeholder="password" prefix="icon-password" v-model="password"></cl-input>
        </cl-form-item>
    </cl-form>
    <cl-button type="primary" @click="submit">SignIn</cl-button>
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
    <cl-form ref="form" :rules="rules" label-width="80" show-label-colon>
        <cl-form-item name="username" label="用户名">
            <cl-input placeholder="username" v-model="username"></cl-input>
        </cl-form-item>
        <cl-form-item name="email" label="邮箱">
            <cl-input placeholder="email" v-model="email"></cl-input>
        </cl-form-item>
        <cl-form-item name="region" label="地区">
            <cl-select v-model="region">
                <cl-option value="beijing">beijing</cl-option>
                <cl-option value="shanghai">shanghai</cl-option>
                <cl-option value="zhengzhou">zhengzhou</cl-option>
            </cl-select>
        </cl-form-item>
        <cl-form-item name="date" label="日期">
            <cl-date-picker v-model="date" placeholder="请选择日期"></cl-date-picker>
        </cl-form-item>
        <cl-form-item name="resource" label="来源">
            <cl-radio-group v-model="resource">
                <cl-radio label="network">网络</cl-radio>
                <cl-radio label="book">书籍</cl-radio>
                <cl-radio label="friend">朋友</cl-radio>
            </cl-radio-group>
        </cl-form-item>
        <cl-form-item name="like" label="爱好">
            <cl-checkbox-group v-model="like">
                <cl-checkbox label="music">音乐</cl-checkbox>
                <cl-checkbox label="snooker">斯诺克</cl-checkbox>
                <cl-checkbox label="football">足球</cl-checkbox>
            </cl-checkbox-group>
        </cl-form-item>
        <cl-form-item name="moveSend" label="实时推送">
            <cl-switch v-model="moveSend" size="large">
                <span slot="open">打开</span>
                <span slot="close">关闭</span>
            </cl-switch>
        </cl-form-item>
        <cl-form-item name="time" label="时长">
            <div class="doc-form-item-wrap">
                <cl-slider class="doc-form-item-slider" v-model="time" :max="24" :min="1"></cl-slider>
                <span class="doc-form-unit">月</span>
            </div>
        </cl-form-item>
        <cl-form-item name="avatar" label="头像" :validator-value="avatarList">
            <cl-upload action="//jsonplaceholder.typicode.com/posts/" 
                        drag 
                        listType="picture-card" 
                        :file-list="avatarList" 
                        :onPreview="handlerPreview" 
                        :onRemove="handlerRemove" 
                        :onSuccess="handlerSuccess">
                <i class="cl-icon-plus"></i>
                <div>上传文件</div>
            </cl-upload>
        </cl-form-item>
    </cl-form>
    <cl-modal v-model="modalVisible" footer-hide>
        <img :src="modalFile.url" width="100%" alt="" />
    </cl-modal>
    <cl-button type="primary" @click="submit">SignIn</cl-button>
    <cl-button @click="reset">Reset</cl-button>
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
    <cl-form ref="form" :layout="layout">
        <cl-form-item label="username">
            <cl-input placeholder="username" v-model="username"></cl-input>
        </cl-form-item>
        <cl-form-item label="password">
            <cl-input placeholder="password" v-model="password"></cl-input>
        </cl-form-item>
    </cl-form>
    <h4>表单布局</h4>
    <cl-select v-model="layout">
        <cl-option value="horizontal">horizontal</cl-option>
        <cl-option value="vertical">vertical</cl-option>
        <cl-option value="inline">inline</cl-option>
    </cl-select>
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
    <cl-form ref="form">
        <cl-form-item v-for="item in formList" :key="item.id" :name="item.id" :label="item.name" :rules="item.validate">
            <cl-input v-if="item.type === 'input'" :placeholder="item.placeholder" v-model="item.value"></cl-input>
            <cl-select v-if="item.type === 'select'" :placeholder="item.placeholder" v-model="item.value">
                <cl-option v-for="optionItem in item.option" :value="optionItem.value">{{optionItem.label}}</cl-option>
            </cl-select>
        </cl-form-item>
    </cl-form>
    <cl-button type="primary" icon="cl-icon-plus" @click="addForm">添加域名</cl-button>
    <cl-button type="primary" @click="submit">提交</cl-button>
    <cl-button @click="reset">重置</cl-button>
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
                        validate: []
                    },
                    {
                        id: 'email',
                        name: '邮箱',
                        placeholder: '请输入邮箱',
                        type: 'input',
                        value: '',
                        isShow: true,
                        validate: []
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

### Form props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| rules | Object | 表单验证的规则 | - |
| layout | String | 表单布局，可选值`horizontal` `vertical` `inline` | horizontal |
| labelAlgin | String | label水平方向的位置，可选值`left` `center` `right` | right |
| labelWidth | Number, String | label的宽度 | 80 |
| inlineMessage | Boolean | 是否以行内形式展示错误信息（暂时保留未用） | false |
| showMessage | Boolean | 是否显示验证错误信息 | true |
| showLabelColon | Boolean | 是否显示label后的冒号 | false |
| showRequiredIcon | Boolean | 是否显示required时label前的星号 | true |


### Form methods

| 名称 | 说明 | 参数 |
| ---- | ---- | ---- |
| validate | 表单验证的方法，返回promise | - |
| validateField | 验证表单部分字段，参数为`form-item`的name值数组 | [] |
| reset | 重置表单验证规则 | - |


### FormItem props

| 属性 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ---- |
| name | String | 表单`rules`时必须 | - |
| labelWidth | Number, String | label的宽度 | - |
| labelFor | String | 原生label的for属性（暂时保留未用） | - |
| label | String | 标签文本 | - |
| rules | Array | 表单验证规则 | [] |
| required | Boolean | 是否必填 | - |
| validatorValue | - | 当表单元素没有`v-model`属性绑定时需要验证的值 | - |


### FormItem slot

| 名称 | 说明 |
| ---- | ---- |
| label | 标签文本 |
