<template>
    <ValidationProvider :mode="mode" :name="name" slim :rules="currentLocalRules" v-slot="v" ref="provider">
        <div :class="[
            `${classPrefix}`,
            `${classPrefix}--${form.labelAlgin}`,
            v.invalid && v.validated && `${classPrefix}--error`
        ]">
            <label :class="[`${classPrefix}__label`]" :style="labelStyle" v-if="isShowLabel">
                <slot name="label">
                    <span :class="[`${classPrefix}__label-icon`]" v-if="form.showRequiredIcon && isRequired">*</span>
                    <span :class="[
                            `${classPrefix}__label-name`,
                            form.showLabelColon && `${classPrefix}__label-name-colon`
                        ]">{{label}}</span>
                </slot>
            </label>
            <div :class="[`${classPrefix}__content`]" :style="contentStyle">
                <slot></slot>
                <transition name="slideUp">
                    <div v-if="form.showMessage && v.invalid && v.validated" :class="[`${classPrefix}__error-tip`]">{{v.errors[0]}}</div>
                </transition>
            </div>
        </div>
    </ValidationProvider>
</template>

<script>
    import Config from 'main/config/config'
    import {ValidationProvider} from 'vee-validate'
    import {validator} from './validate'
    import {createRandom} from "main/utils/global";

    export default {
        name: "FormItem",
        props: {
            validatorValue: {},//如果此字段值存在则根绝此值验证，在没有v-model时使用
            name: String,
            labelWidth: {
                type: [Number, String]
            },
            labelFor: {
                type: String,
                default: ''
            },//配合组件的name属性(保留属性)
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
                classPrefix: Config.classPrefix + '-form-item',
                componentName: 'FormItem',
                localRules: {},//当前所有的规则
                currentLocalRules: {},//当前使用的规则
                trigger: 'blur',//当前触发方式
                isRequired: false,//是否是required
            }
        },
        components: {
            ValidationProvider
        },
        computed: {
            labelStyle() {
                const labelWidth = parseInt(this.labelWidth) === 0 || this.labelWidth ? this.labelWidth : this.form.labelWidth;
                return {
                    width: parseInt(labelWidth) + 'px'
                }
            },
            contentStyle() {
                if (this.form.layout === 'vertical') {
                    return {};
                }
                const labelWidth = parseInt(this.labelWidth) === 0 || this.labelWidth ? this.labelWidth : this.form.labelWidth;
                return {
                    marginLeft: parseInt(labelWidth) + 'px'
                }
            },
            mode() {
                let trigger = this.trigger === 'blur' ? ['blur', 'change'] : [this.trigger];
                return function () {
                    return {
                        on: trigger
                    };
                }
            },
            isShowLabel(){
                const labelWidth = parseInt(this.labelWidth) === 0 || this.labelWidth ? this.labelWidth : this.form.labelWidth;
                return parseInt(labelWidth) > 0;
            }
        },
        mounted() {
            this.initLocalRules();
            this.triggerValidate(this.trigger);
        },
        methods: {
            initLocalRules() {
                let localRulesObj = {};
                let rules = [];
                this.isRequired = false;
                if(this.name && this.form.rules[this.name]){
                    rules = this.form.rules[this.name];
                }
                if(this.rules && this.rules.length){
                    rules = this.rules;
                }
                if(this.required){
                    this.isRequired = true;
                    rules.push({
                        required: true
                    })
                }
                rules.forEach(item => {
                    let trigger = item.trigger || this.trigger;
                    if (!localRulesObj[trigger]) {
                        localRulesObj[trigger] = {};
                    }
                    if (item.required || this.required) {
                        this.isRequired = true;
                        localRulesObj[trigger]['required'] = {
                            message: item.message
                        };
                    } else if (item.type) {
                        localRulesObj[trigger][item.type] = {
                            min: item.min,
                            max: item.max,
                            message: item.message
                        };
                    } else if (item.validator && typeof item.validator === 'function') {
                        let validatorName = this.name + createRandom(6);
                        validator(validatorName, item.validator);
                        localRulesObj[trigger][validatorName] = true;
                    }
                });
                this.localRules = localRulesObj;
            },
            filterRules(trigger) {
                if (trigger === 'blur') {
                    let currentLocalRules = {};
                    Object.keys(this.localRules).forEach(key => {
                        currentLocalRules = {
                            ...currentLocalRules,
                            ...this.localRules[key]
                        }
                    });
                    this.currentLocalRules = currentLocalRules;
                } else {
                    this.currentLocalRules = this.localRules[trigger] || {};
                }
                this.trigger = trigger;
            },
            triggerValidate(trigger) {
                if (!trigger) return;
                this.filterRules(trigger);
            },
            providerValidate(){
                this.$refs.provider.validate(this.validatorValue);
            },
            async validateSilent(){
                let result = await this.$refs.provider.validateSilent();
                this.$refs.provider.applyResult(result);
                return result;
            }
        },
        watch: {
            validatorValue(){
                this.providerValidate();
            }
        }
    }
</script>
