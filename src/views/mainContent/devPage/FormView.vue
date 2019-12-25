<template>
    <div>

        <cl-form>
            <cl-form-item props="name" label="name" :rules="rules.name">
                <cl-input v-model="name"></cl-input>
            </cl-form-item>
            <cl-form-item props="password" label="password" :rules="rules.password">
                <cl-input placeholder="placeholder" v-model="password">
                    <span slot="prepend">http://</span>
                    <span slot="append">.com</span>
                </cl-input>
            </cl-form-item>
        </cl-form>
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
                name: '',
                password: '',
                rules: {
                    name: [
                        {required: true, message: 'required', trigger: 'change'},
                        // {type: 'string', min: 4, message: 'min length 4', trigger: 'change'},
                        {validator: validatorTest, trigger: 'change'},
                    ],
                    password: [
                        {required: true, message: 'required', trigger: 'change'},
                    ]
                }
            }
        }
    }
</script>
