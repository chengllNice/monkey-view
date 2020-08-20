<template>
    <ValidationObserver :class="[
                            `${classPrefix}`,
                            `${classPrefix}--${layout}`
                         ]"
                        tag="div"
                        ref="form">
        <slot></slot>
    </ValidationObserver>
</template>

<script>
    import Config from 'main/config/config'
    import { ValidationObserver} from 'vee-validate'

    export default {
        name: "Form",
        props: {
            showRequiredIcon: {
                type: Boolean,
                default: true
            },//required的item是否需要*
            showLabelColon: {
                type: Boolean,
                default: false
            },//是否显示label后的冒号
            showMessage: {
              type: Boolean,
              default: true,
            },//是否显示表单校验的错误信息
            inlineMessage: {
                type: Boolean,
                default: false,
            },//是否以行内形式显示表单校验的错误信息(暂时保留)
            labelWidth: {
                type: [Number, String],
                default: 80
            },
            labelAlgin: {
                type: String,
                default: 'right',
                validator(value) {
                    return ['left', 'center', 'right'].includes(value);
                }
            },
            layout: {
                type: String,
                default: 'horizontal',
                validator(value){
                    return ['horizontal', 'vertical', 'inline'].includes(value);
                }
            },
            rules: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        provide() {
            return {
                form: this
            }
        },
        components: {
            ValidationObserver
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-form',
            }
        },
        methods: {
            validate(){
                return this.$refs.form.validate();
            },
            // 验证部分表单字段，根据表单item的name属性区分
            async validateField(names = []){
                let childrenItem = this.$children[0].$children;
                let validResult = {};
                for (let i = 0; i < childrenItem.length; i++){
                    if(names.includes(childrenItem[i].name)){
                        validResult[childrenItem[i].name] = await childrenItem[i].validateSilent();
                    }
                }
                return validResult;
            },
            reset(){
                return this.$refs.form.reset();
            }
        }
    }
</script>