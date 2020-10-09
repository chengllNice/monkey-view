<template>
    <div :class="[`${classPrefix}`]">
        <div :class="[`${classPrefix}__tail`]"></div>
        <div :class="nodeClass" :style="nodeStyle">
            <slot name="node"></slot>
        </div>
        <div :class="[`${classPrefix}__content`]">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'

    export default {
        name: "TimelineItem",
        props: {
            color: {
                type: String,
                default: '',// blue red green gray 或者自定义色值
            },
            nodeType: {
                type: String,
                default: 'circle',
                validator(value){
                    return ['circle', 'disc'].includes(value)
                }
            }
        },
        data(){
            return {
                classPrefix: Config.classPrefix + '-timeline-item',
                timelineParent: this.$parent,
            }
        },
        computed: {
            currentNodeType(){
                return this.$parent.nodeType ? this.$parent.nodeType : this.nodeType;
            },
            currentColor(){
                if(this.currentNodeType === 'circle' && !this.color){
                    return 'blue'
                }
                if(this.currentNodeType === 'disc' && !this.color){
                    return 'gray'
                }
                return this.color;
            },
            nodeClass(){
                return [
                    `${this.classPrefix}__node`,
                    `${this.classPrefix}__node-${this.currentNodeType}`,
                    ['blue', 'red', 'green', 'gray'].includes(this.currentColor) && `${this.classPrefix}__node-${this.currentColor}`,
                    this.$slots.node ? `${this.classPrefix}__node-custom` : `${this.classPrefix}__node-default`,
                ]
            },
            nodeStyle(){
                let style = {};
                if(!['blue', 'red', 'green', 'gray'].includes(this.currentColor)){
                    if(this.currentNodeType === 'circle') style = {borderColor: this.currentColor}
                    if(this.currentNodeType === 'disc') style = {backgroundColor: this.currentColor}
                }
                return style;
            }
        }
    }
</script>
