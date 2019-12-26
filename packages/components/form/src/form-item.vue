<template>
    <ValidationProvider tag="div" :mode="model" :name="props" :rules="localRules" v-slot="v">
        <div :class="[
            'cl-form-item',
            `cl-form-item--${form.labelAlgin}`,
            v.invalid && v.validated && 'cl-form-item--error'
        ]">
            <label class="cl-form-item__label" :style="labelStyle">
                <slot name="label">
                    <span class="cl-form-item__label-icon" v-if="form.requiredLabel">*</span>
                    <span class="cl-form-item__label-name">{{label}}</span>
                </slot>
            </label>
            <div class="cl-form-item__content">
                <slot></slot>
                <div v-if="v.invalid && v.validated" class="cl-form-item__error-tip">{{v.errors[0]}}</div>
            </div>
        </div>
    </ValidationProvider>
</template>

<script>
    import {ValidationProvider} from 'vee-validate'
    import {validator} from './validate'
    import {createRandom} from "../../../utils/global";

    export default {
        name: "ClFormItem",
        props: {
            props: {
                type: String,
                required: true
            },
            labelWidth: {
                type: [Number, String],
                default: 80
            },
            label: String,
            rules: {
                type: Array,
                default() {
                    return []
                }
            },
            required: Boolean,//是否为必填项
        },
        inject: ['form'],
        data() {
            return {
                localRules: {},
                trigger: '',
            }
        },
        components: {
            ValidationProvider
        },
        computed: {
            labelStyle(){
                return {
                    width: parseFloat(this.form.labelWidth) + 'px'
                }
            }
        },
        mounted() {
            this.initLocalRules();
        },
        methods: {
            initLocalRules() {
                let localRulesObj = {};
                this.rules.forEach(item => {
                    if (item.required || this.required) {
                        localRulesObj['required'] = {
                            message: item.message
                        };
                    } else if (item.type) {
                        localRulesObj[item.type] = {
                            min: item.min,
                            max: item.max,
                            message: item.message
                        };
                    }else if(item.validator && typeof item.validator === 'function'){
                        let validatorName = this.props+createRandom(6);
                        validator(validatorName, item.validator);
                        localRulesObj[validatorName] = true;
                    }
                });
                this.localRules = localRulesObj;
            },
            model(context){
                console.log(context,'context',context.value,context.errors,context.flags)
                return {
                    on: ['blur', 'change']
                };
            },
        }
    }
</script>
