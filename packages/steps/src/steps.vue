<template>
    <div :class="stepsClass">
        <slot></slot>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "Steps",
        props: {
            type: {
                type: String,
                default: 'default',
                validator(value){
                    return ['default', 'dot', 'nav'].includes(value)
                }
            },
            active: {
                type: Number,
                default: 0
            },
            // size 可以设置 default small 或者自定义尺寸
            size: {
                type: [String, Number],
                default: 'default'
            },
            direction: {
                type: String,
                default: 'horizontal',
                validator(value){
                    return ['vertical', 'horizontal'].includes(value)
                }
            },
            status: {
                type: String,
                validator(value){
                    return ['wait', 'process', 'finish', 'error'].includes(value)
                }
            },
            // label文字位置
            labelPlacement: {
                type: String,
                default: 'horizontal',
                validator(value){
                    return ['vertical', 'horizontal'].includes(value)
                }
            },
            algin: {
                type: String,
                default: 'left',
                validator(value){
                    return ['left', 'center'].includes(value)
                }
            },
            percent: Number
        },
        data(){
            return {
                classPrefix: Config.classPrefix + '-steps',
            }
        },
        computed: {
            stepsClass(){
                return [
                    `${this.classPrefix}`,
                    `${this.classPrefix}--${this.direction}`,
                ]
            }
        },
        mounted() {
            this.$nextTick(this.setChildrenStepIndex());
        },
        methods: {
            setChildrenStepIndex(){
                const childrenStepList = this.$children;
                if(childrenStepList && childrenStepList.length){
                    childrenStepList.forEach((item, index) => {
                        item.index = index;
                    })
                }
            }
        }
    }
</script>
