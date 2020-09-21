<template>
    <div :class="groupClass" v-show="show">
        <div :class="[`${classPrefix}__title`]">
            <slot name="groupTitle">{{label}}</slot>
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
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-option-group',
                componentName: 'OptionGroup',
                show: true,
            }
        },
        computed: {
            groupClass(){
                return [
                    `${this.classPrefix}`
                ]
            },
        },
        mounted() {
            this.$nextTick(this.setShow());
        },
        methods: {
            setShow() {
                let result = true;
                if (this.$slots.default) {
                    let childrenOptionShowArr = [];
                    for (let option of this.$slots.default) {
                        let Instance = option.componentInstance;
                        let Options = option.componentOptions;
                        let tag = (Instance && Instance.componentName) || (Options && Options.tag);
                        if (tag === 'Option') {
                            childrenOptionShowArr.push(Instance.show || false);
                        }
                    }
                    result = childrenOptionShowArr.includes(true)
                } else {
                    result = false;
                }
                this.show = result;
            }
        }
    }
</script>
