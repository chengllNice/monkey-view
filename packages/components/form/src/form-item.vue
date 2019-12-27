<template>
    <ValidationProvider tag="div" class="cl-form-item-wrap" :mode="mode" :name="props" :rules="currentLocalRules" v-slot="v">
        <div :class="[
            'cl-form-item',
            `cl-form-item--${form.labelAlgin}`,
            v.invalid && v.validated && 'cl-form-item--error'
        ]">
            <label class="cl-form-item__label" :style="labelStyle">
                <slot name="label">
                    <span class="cl-form-item__label-icon" v-if="form.showRequiredIcon">*</span>
                    <span class="cl-form-item__label-name">{{label}}</span>
                </slot>
            </label>
            <div class="cl-form-item__content" :style="contentStyle">
                <slot></slot>
                <transition name="slideUp">
                    <div v-if="v.invalid && v.validated" class="cl-form-item__error-tip">{{v.errors[0]}}</div>
                </transition>
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
        provide() {
            return {
                formItem: this,
            }
        },
        inject: ['form'],
        data() {
            return {
                localRules: {},//当前所有的规则
                currentLocalRules: {},//当前使用的规则
                trigger: 'blur',//当前触发方式
            }
        },
        components: {
            ValidationProvider
        },
        computed: {
            labelStyle() {
                return {
                    width: parseFloat(this.form.labelWidth) + 'px'
                }
            },
            contentStyle() {
                if (this.form.layout === 'vertical') {
                    return {};
                }
                return {
                    marginLeft: parseFloat(this.form.labelWidth) + 'px'
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
        },
        mounted() {
            this.initLocalRules();
            this.triggerValidate(this.trigger);
        },
        methods: {
            initLocalRules() {
                let localRulesObj = {};
                this.rules.forEach(item => {
                    let trigger = item.trigger;
                    if (!localRulesObj[trigger]) {
                        localRulesObj[trigger] = {};
                    }
                    if (item.required || this.required) {
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
                        let validatorName = this.props + createRandom(6);
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
            }
        }
    }
</script>
