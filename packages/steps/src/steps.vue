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
            active: {
                type: Number,
                default: 0
            },
            size: {
                type: String,
                default: 'default',
                validator(value){
                    return ['default', 'small'].includes(value)
                }
            },
            direction: {
                type: String,
                default: 'horizontal',
                validator(value){
                    return ['vertical', 'horizontal'].includes(value)
                }
            }
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
