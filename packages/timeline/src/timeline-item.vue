<template>
    <div :class="[
        `${classPrefix}`,
        isLabel && `${classPrefix}--has-label`,
        contentPosition && !isLabel && `${classPrefix}--${contentPosition}-no-label`,
    ]">
        <div :class="[`${classPrefix}__tail`]" :style="tailStyle"></div>
        <div :class="nodeClass" :style="nodeStyle">
            <slot name="node"></slot>
        </div>
        <div v-if="isLabel"
             :class="[
                 `${classPrefix}__label`,
                 contentPosition === 'left' ? `${classPrefix}__label-right` : `${classPrefix}__label-left`,
             ]"
             :style="labelStyle">
            <slot name="label">{{label}}</slot>
        </div>
        <div :class="[
                 `${classPrefix}__content`,
                 `${classPrefix}__content-${contentPosition}`,
             ]"
             :style="contentStyle">
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
                default: 'hollow',
                validator(value){
                    return ['hollow', 'solid'].includes(value)
                }
            },
            label: String,
            // content 的位置 , label 位置相对
            position: {
                type: String,
                validator(value){
                    return ['left', 'right'].includes(value)
                }
            }
        },
        data(){
            return {
                classPrefix: Config.classPrefix + '-timeline-item',
            }
        },
        computed: {
            isLabel(){
                return !!(this.$slots.label || this.label)
            },
            contentPosition(){
                return this.position || this.$parent.position || 'right';
            },
            currentNodeType(){
                return this.$parent.nodeType ? this.$parent.nodeType : this.nodeType;
            },
            currentColor(){
                if(this.currentNodeType === 'hollow' && !this.color){
                    return 'blue'
                }
                if(this.currentNodeType === 'solid' && !this.color){
                    return 'gray'
                }
                return this.color;
            },
            //时间轴左侧宽度
            currentTimelineLeftWidth(){
                let leftWidth = this.$parent.leftWidth;
                let rightWidth = this.$parent.rightWidth;

                if(!this.isLabel) {
                    if(this.contentPosition === 'left') leftWidth = '100%';
                    if(this.contentPosition === 'right') leftWidth = 0;
                }else {
                    if(!leftWidth){
                        if(rightWidth){
                            leftWidth = `calc(100% - ${rightWidth})`;
                        }else {
                            leftWidth = '50%'
                        }
                    }else {
                        if(typeof leftWidth === 'number') leftWidth = parseInt(leftWidth) + 'px';
                        if(typeof leftWidth === 'string') leftWidth = leftWidth.includes('%') ? leftWidth : parseInt(leftWidth) + 'px';
                    }
                }
                return leftWidth;
            },
            //时间轴右侧宽度
            currentTimelineRightWidth(){
                let leftWidth = this.$parent.leftWidth;
                let rightWidth = this.$parent.rightWidth;

                if(!this.isLabel) {
                    if(this.contentPosition === 'left') rightWidth = 0;
                    if(this.contentPosition === 'right') rightWidth = '100%';
                }else {
                    if(leftWidth) {
                        rightWidth = `calc(100% - ${leftWidth})`;
                    }else if(rightWidth) {
                        if(typeof rightWidth === 'number') rightWidth = parseInt(rightWidth) + 'px';
                        if(typeof rightWidth === 'string') rightWidth = rightWidth.includes('%') ? rightWidth : parseInt(rightWidth) + 'px';
                    }else {
                        rightWidth = '50%';
                    }
                }
                return rightWidth;
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
                if(this.isLabel) {
                    style = {
                        left: this.currentTimelineLeftWidth
                    }
                }
                if(!['blue', 'red', 'green', 'gray'].includes(this.currentColor)){
                    if(this.currentNodeType === 'hollow') style = { ...style, borderColor: this.currentColor}
                    if(this.currentNodeType === 'solid') style = { ...style, backgroundColor: this.currentColor}
                }
                return style;
            },
            labelStyle(){
                if(!this.isLabel) return ;
                if(this.contentPosition === 'left') return { width: this.currentTimelineRightWidth, left: this.currentTimelineLeftWidth }
                if(this.contentPosition === 'right') return { width: this.currentTimelineLeftWidth, left: 0 }
                return {};
            },
            tailStyle(){
                if(!this.isLabel) return ;
                return {
                    left: this.currentTimelineLeftWidth
                };
            },
            contentStyle(){
                if(!this.isLabel) return ;
                if(this.contentPosition === 'left') return { left: 0, width: this.currentTimelineLeftWidth }
                if(this.contentPosition === 'right') return { left: this.currentTimelineLeftWidth, width: this.currentTimelineRightWidth }
                return {};
            }
        }
    }
</script>
