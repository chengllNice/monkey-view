<template>
    <ValidationObserver :class="[
                            'cl-form',
                            `cl-form--${layout}`
                         ]"
                        tag="div"
                        ref="form">
        <slot></slot>
    </ValidationObserver>
</template>

<script>
    import { ValidationObserver} from 'vee-validate'
    export default {
        name: "ClForm",
        props: {
            showRequiredIcon: Boolean,//required的item是否需要*
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
            return {}
        },

        mounted() {
        },
        methods: {
            validate(){
                return this.$refs.form.validate();
            },
            reset(){
                return this.$refs.form.reset();
            }
        }
    }
</script>