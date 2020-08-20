<template>
    <div>
        <Form ref="form" show-required-icon label-width="100">
            <FormItem name="name" label="name" :rules="rules.name">
<!--                <template slot="label">Name</template>-->
                <Input v-model="name"></Input>
            </FormItem>
            <FormItem name="year" label="year" :rules="rules.year">
                <Select v-model="year" clearable>
                    <Option v-for="item in yearList" :key="item.value" :value="item.value" :label="item.label">{{item.label}}</Option>
                </Select>
            </FormItem>
            <FormItem name="selectMul" label="select多选" :rules="rules.year">
                <Select v-model="selectMul" multiple filterable>
                    <Option v-for="item in selectMulList" :key="item.value" :value="item.value" :label="item.label">{{item.label}}</Option>
                </Select>
            </FormItem>
            <FormItem name="date" label="date" :rules="rules.date">
                <!--                <template slot="label">Name</template>-->
                <DatePicker v-model="date"></DatePicker>
            </FormItem>
            <FormItem name="sex" label="性别" :rules="rules.sex">
                <RadioGroup v-model="sex">
                    <Radio label="0">男</Radio>
                    <Radio label="1">女</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem name="checkbox" label="水果" :rules="rules.checkbox">
                <CheckboxGroup v-model="checkbox">
                    <Checkbox label="apple">Apple</Checkbox>
                    <Checkbox label="orange">Orange</Checkbox>
                    <Checkbox label="banana">Banana</Checkbox>
                    <Checkbox label="melon">Melon</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem name="password" label="password" :rules="rules.password">
                <Input placeholder="placeholder" v-model="password">
                    <span slot="prepend">http://</span>
                    <span slot="append">.com</span>
                </Input>
            </FormItem>
            <FormItem name="des" label="des" :rules="rules.des">
                <Input placeholder="placeholder" type="textarea" v-model="des" />
            </FormItem>
            <FormItem name="slider" label="slider" :rules="rules.slider">
                <Slider v-model="slider"></Slider>
            </FormItem>
            <FormItem name="switch" label="switch" :rules="rules.switch">
                <cl-switch v-model="switchValue"></cl-switch>
            </FormItem>
            <FormItem name="upload" label="upload" :rules="rules.upload" :validator-value="upload">
                <Upload action="//jsonplaceholder.typicode.com/posts/"  :maxSize="500" :limit="5" :onSuccess="uploadSuccess" :onRemove="uploadRemove">
                    <Button>upload</Button>
                    <div slot="tip" class="cl-upload__tip">只能上传jpg/png文件，大小不能超过500kb</div>
                </Upload>
            </FormItem>
        </Form>

        <Button type="primary" @click="submit">Submit</Button>
        <Button type="primary" @click="validateField">validatorField</Button>
        <Button @click="reset">Reset</Button>



        <h4>FOR</h4>
        <Form ref="formFor" label-algin="right" show-required-icon layout="inline">
            <FormItem v-for="item in formList" :key="item.id" :name="item.id" :label="item.label" :rules="rules[item.id]">
                <Input placeholder="placeholder" v-model="item.value" />
            </FormItem>
        </Form>
        <Button type="primary" @click="submitFor">SubmitFor</Button>
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
                date: '',
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
                        {required: true, message: 'required', trigger: 'blur'},
                        {type: 'string', min: 4, message: 'min length 4', trigger: 'blur'},
                        {validator: validatorTest, trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: 'required', trigger: 'change'},
                    ],
                    year: [
                        {required: true, message: 'required', trigger: 'change'},
                    ],
                    date: [
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
