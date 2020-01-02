<template>
    <div>

        <cl-form ref="form" show-required-icon label-width="100">
            <cl-form-item name="name" label="name" :rules="rules.name">
                <template slot="label">Name</template>
                <cl-input v-model="name"></cl-input>
            </cl-form-item>
            <cl-form-item name="year" label="year" :rules="rules.year">
                <cl-select v-model="year" clearable>
                    <cl-option v-for="item in yearList" :key="item.value" :value="item.value" :label="item.label">{{item.label}}</cl-option>
                </cl-select>
            </cl-form-item>
            <cl-form-item name="selectMul" label="select多选" :rules="rules.year">
                <cl-select v-model="selectMul" multiple filterable>
                    <cl-option v-for="item in selectMulList" :key="item.value" :value="item.value" :label="item.label">{{item.label}}</cl-option>
                </cl-select>
            </cl-form-item>
            <cl-form-item name="sex" label="性别" :rules="rules.sex">
                <cl-radio-group v-model="sex">
                    <cl-radio label="0">男</cl-radio>
                    <cl-radio label="1">女</cl-radio>
                </cl-radio-group>
            </cl-form-item>
            <cl-form-item name="checkbox" label="水果" :rules="rules.checkbox">
                <cl-checkbox-group v-model="checkbox">
                    <cl-checkbox label="apple">Apple</cl-checkbox>
                    <cl-checkbox label="orange">Orange</cl-checkbox>
                    <cl-checkbox label="banana">Banana</cl-checkbox>
                    <cl-checkbox label="melon">Melon</cl-checkbox>
                </cl-checkbox-group>
            </cl-form-item>
            <cl-form-item name="password" label="password" :rules="rules.password">
                <cl-input placeholder="placeholder" v-model="password">
                    <span slot="prepend">http://</span>
                    <span slot="append">.com</span>
                </cl-input>
            </cl-form-item>
            <cl-form-item name="des" label="des" :rules="rules.des">
                <cl-input placeholder="placeholder" type="textarea" v-model="des" />
            </cl-form-item>
            <cl-form-item name="slider" label="slider" :rules="rules.slider">
                <cl-slider v-model="slider"></cl-slider>
            </cl-form-item>
            <cl-form-item name="switch" label="switch" :rules="rules.switch">
                <cl-switch v-model="switchValue"></cl-switch>
            </cl-form-item>
            <cl-form-item name="upload" label="upload" :rules="rules.upload" :value="upload">
                <cl-upload action="//jsonplaceholder.typicode.com/posts/"  :maxSize="500" :limit="5" :onSuccess="uploadSuccess" :onRemove="uploadRemove">
                    <cl-button>upload</cl-button>
                    <div slot="tip" class="cl-upload__tip">只能上传jpg/png文件，大小不能超过500kb</div>
                </cl-upload>
            </cl-form-item>
        </cl-form>

        <cl-button type="primary" @click="submit">Submit</cl-button>
        <cl-button type="primary" @click="validateField">validatorField</cl-button>
        <cl-button @click="reset">Reset</cl-button>



        <h4>FOR</h4>
        <cl-form ref="formFor" label-algin="right" show-required-icon layout="inline">
            <cl-form-item v-for="item in formList" :key="item.id" :name="item.id" :label="item.label" :rules="rules[item.id]">
                <cl-input placeholder="placeholder" v-model="item.value" />
            </cl-form-item>
        </cl-form>
        <cl-button type="primary" @click="submitFor">SubmitFor</cl-button>
    </div>



</template>

<script>
    export default {
        name: "FormView",
        data(){
            const validatorTest = (value) => {
                if(value.length < 10){
                    return '长度不能小于10';
                }
                return true;
            };
            return {
                formList: [
                    {
                        id: 'name',
                        label: 'name',
                        value: '',
                    },
                    {
                        id: 'password',
                        label: 'password',
                        value: '',
                    },
                    {
                        id: 'des',
                        label: 'des',
                        value: '',
                    }
                ],
                name: '',
                password: '',
                year: '',
                selectMul: '',
                sex: '',
                checkbox: [],
                des: '',
                slider: 0,
                switchValue: false,
                upload: [],
                yearList: [
                    {
                        label: '2019',
                        value: '2019'
                    },
                    {
                        label: '2018',
                        value: '2018'
                    },
                    {
                        label: '2017',
                        value: '2017'
                    }
                ],
                selectMulList: [
                    {
                        label: '2019M',
                        value: '2019M'
                    },
                    {
                        label: '2018M',
                        value: '2018M'
                    },
                    {
                        label: '2017M',
                        value: '2017M'
                    }
                ],
                rules: {
                    name: [
                        {required: true, message: 'required', trigger: 'change'},
                        {type: 'string', min: 4, message: 'min length 4', trigger: 'change'},
                        {validator: validatorTest, trigger: 'change'},
                    ],
                    password: [
                        {required: true, message: 'required', trigger: 'change'},
                    ],
                    year: [
                        {required: true, message: 'required', trigger: 'change'},
                    ],
                    selectMul: [
                        {required: true, message: 'required', trigger: 'change'},
                    ],
                    sex: [
                        {required: true, message: 'required', trigger: 'change'},
                    ],
                    checkbox: [
                        {required: true, message: 'required', trigger: 'change'},
                    ],
                    des: [
                        {required: true, message: 'required', trigger: 'change'},
                    ],
                    slider: [
                        {required: true, message: 'required', trigger: 'change'},
                        {type: 'number', min: 4, trigger: 'change'},
                    ],
                    switch: [
                        {required: true, message: 'required', trigger: 'change'},
                    ],
                    upload: [
                        {required: true, message: 'required', trigger: 'change'},
                        {type: 'array', min: 4, message: 'array min length 4', trigger: 'change'},
                    ]
                }
            }
        },
        methods: {
            submit(){
                this.$refs.form.validate();
            },
            async validateField(){
                let result = await this.$refs.form.validateField(['name', 'year']);
                console.log(result,'===ddd')
            },
            reset(){
                this.$refs.form.reset();
            },
            submitFor(){
                this.$refs.formFor.validate();
            },
            uploadSuccess(res, file, fileList){
                this.upload = fileList;
            },
            uploadRemove(file, fileList){
                this.upload = fileList;
            }
        }
    }
</script>
