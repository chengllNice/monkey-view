<template>
    <div v-show="isShow"
         :class="[
             `${classPrefix}`,
            {
                'is-disabled': disabled,
                'is-selected': selected
            }
        ]">
        <div :class="[`${classPrefix}__title`]">
            <span v-if="!$slots.groupTitle">{{label}}</span>
            <slot name="groupTitle"></slot>
        </div>
        <div :class="[`${classPrefix}__wrap`]">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "OptionGroup",
        props: {
            label: {
                type: String,
                default: ''
            },
            disabled: Boolean,//暂时不用
            selected: Boolean,//暂时不用
            value: [String, Number],//暂时不用
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-option-group',
                componentName: 'OptionGroup',
                isShow: true
            }
        },
        computed: {},
        components: {},
        created() {
        },
        mounted() {
            this.$nextTick(this.setIsShow);
        },
        methods: {
            setIsShow() {
                let result;
                if (this.$slots.default) {
                    let optionShowArr = [];
                    for (let option of this.$slots.default) {
                        let cOption = option.componentInstance;
                        let tag = cOption.componentName || option.componentOptions.tag;
                        // todo
                        if (tag === 'Option') {
                            optionShowArr.push(cOption.isShow);
                        }
                    }
                    result = optionShowArr.includes(true)
                } else {
                    result = true;
                }
                this.isShow = result;
            }
        },
        updated() {
            this.$nextTick(this.setIsShow);
        }
    }
</script>
