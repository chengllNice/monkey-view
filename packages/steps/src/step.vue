<template>
    <div :class="stepClass">
        <div :class="[`${classPrefix}__tail`]" :style="tailStyle">
            <div :class="[`${classPrefix}__tail-inner`]"></div>
        </div>
        <div :class="[
            `${classPrefix}__node`,
            hasIcon && `${classPrefix}__node-icon`,
        ]">
            <Progress :class="[`${classPrefix}__node-progress`]" v-if="showProgress" :percent="stepsParent.percent" strokeWidth="2" :width="progressWidth" type="circle"><span></span></Progress>
            <div :class="[`${classPrefix}__node-inner`]" :style="nodeInnerStyle">
                <template v-if="stepsParent.type !== 'dot'">
                    <template v-if="!hasIcon">
                        <template v-if="isError"><Icon type="close" /></template>
                        <template v-else-if="isFinish"><Icon type="check" /></template>
                        <template v-else>{{index + 1}}</template>
                    </template>
                    <template v-else>
                        <slot name="icon"><Icon :type="icon"></Icon></slot>
                    </template>
                </template>
            </div>
        </div>
        <div :class="[`${classPrefix}__main`]" :style="mainStyle">
            <div :class="[`${classPrefix}__title`]" :style="titleStyle">
                <slot name="title">{{title}}</slot>
            </div>
            <div :class="[`${classPrefix}__description`]" v-if="$slots.description || description">
                <slot name="description">{{description}}</slot>
            </div>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Progress from 'packages/progress'

    export default {
        name: "Step",
        props: {
            title: String,
            description: String,
            icon: String,
            status: {
                type: String,
                validator(value){
                    return ['wait', 'process', 'finish', 'error'].includes(value)
                }
            },
        },
        data(){
            return {
                classPrefix: Config.classPrefix + '-step',
                index: null,// 该值由父级赋值
                stepsParent: this.$parent,
            }
        },
        computed: {
            stepClass(){
                const isSmall = this.stepsParent.size === 'small' || (this.customSize && parseInt(this.stepsParent.size) <= 24);
                return [
                    `${this.classPrefix}`,
                    isSmall ? `${this.classPrefix}--size-small` : `${this.classPrefix}--size-default`,
                    this.stepsParent.direction === 'horizontal' && `${this.classPrefix}--label-${this.stepsParent.labelPlacement}`,
                    `${this.classPrefix}--direction-${this.stepsParent.direction}`,
                    `${this.classPrefix}--type-${this.stepsParent.type}`,
                    `${this.classPrefix}--algin-${this.stepsParent.algin}`,
                    this.isFinish && `${this.classPrefix}--finish`,
                    this.isError && `${this.classPrefix}--error`,
                    this.isActive && `${this.classPrefix}--active`,
                ]
            },
            // 方向水平时 labelPlacement = 'vertical' 有效
            isLabelPlacement(){
                return this.stepsParent.direction === 'horizontal' && this.stepsParent.labelPlacement === 'vertical';
            },
            isFinish(){
                if(this.status) return this.status === 'finish';
                return this.index < this.stepsParent.active || (this.stepsParent.status === 'finish' && this.index === this.stepsParent.active);
            },
            isError(){
                if(this.status) return this.status === 'error';
                if(['process', 'finish', 'wait'].includes(this.stepsParent.status)) return ;
                return this.stepsParent.status === 'error' && this.index === this.stepsParent.active;
            },
            isActive(){
                if(this.status) return this.status === 'process';
                if(['finish', 'error', 'wait'].includes(this.stepsParent.status)) return ;
                return this.index === this.stepsParent.active;
            },
            showProgress(){
                return this.isActive && typeof this.stepsParent.percent === 'number'
            },
            progressWidth(){
               return  this.stepsParent.size === 'small' ? '32px' : '40px'
            },
            hasIcon(){
                return this.$slots.icon || this.icon
            },
            customSize(){
                if(!['default', 'small'].includes(this.stepsParent.size)) {
                    return parseInt(this.stepsParent.size);
                }
                return null;
            },
            nodeInnerStyle(){
                if(!this.customSize) return ;

                const size = this.customSize + 'px';
                const fontSize = (this.customSize / 2) + 'px';
                return {
                    width: size,
                    height: size,
                    fontSize: fontSize
                }
            },
            tailStyle(){
                if(!this.customSize) return ;

                const size = (this.customSize / 2 - 1) + 'px';
                let style = {};
                if(this.stepsParent.direction === 'horizontal'){
                    let paddingLeft = (this.customSize + 10) + 'px';
                    if(this.stepsParent.algin === 'center' && this.stepsParent.labelPlacement === 'vertical') {
                        paddingLeft = (this.customSize / 2) + 'px';
                        style = {
                            paddingRight: (this.customSize / 2 + 10) + 'px'
                        }
                    }
                    style = {
                        ...style,
                        top: size,
                        paddingLeft: paddingLeft
                    }
                }
                if(this.stepsParent.direction === 'vertical'){
                    const paddingTop = (this.customSize + 4) + 'px';
                    style = {
                        left: size,
                        paddingTop: paddingTop
                    }
                }

                return style
            },
            mainStyle(){
                if(this.isLabelPlacement) return ;
                if(!this.customSize || this.customSize > 24) return ;
                const size = -(24 - this.customSize) / 2 + 'px';

                return {
                    marginTop: size,
                }
            },
            titleStyle(){
                if(this.isLabelPlacement) return ;
                if(!this.customSize || this.customSize < 24) return ;

                const size = this.customSize  + 'px';

                return {
                    lineHeight: size,
                }
            }
        },
        components: {
            Progress
        }
    }
</script>
